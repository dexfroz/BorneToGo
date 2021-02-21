package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;


public class Pathfinding
{
	private static final double DIST_BOUND_COEFF = 1.5; // unitless.
	private static final double ELLIPSE_RATIO = 1.5; // unitless, must be > 1.
	private static final double RANGE_MARGIN = 20.; // in km
	private static final int MIN_SAFETY_STATIONS_NUMBER = 1; // Must be > 0.
	private static final double MIN_PERCENTAGE_MAX_AUTONOMY_SUCCESS = 0.10; // greater than the one used in Route.


	// Gives a reasonable upper bound for the length of a route between two points:
	private static double lengthUpperBound(Coord coord_1, Coord coord_2)
	{
		return DIST_BOUND_COEFF * Coord.distance(coord_1, coord_2);
	}


	// Gives an estimation of the legs lengths, instead of querying the route API.
	// Used for testing, or when Core.enableFirstQuery is set to false.
	private static ArrayList<Double> mockLegsLengths(ArrayList<Coord> waypoints)
	{
		ArrayList<Double> legsLengths = new ArrayList<Double>();

		for (int i = 0; i < waypoints.size() - 1; ++i) {
			legsLengths.add(lengthUpperBound(waypoints.get(i), waypoints.get(i + 1)));
		}

		return legsLengths;
	}


	// Checks if the given point is inside the ellipse of focus 'ref_1' and 'ref_2',
	// and with major axis of length: distance(ref_1, ref_2) * ELLIPSE_RATIO
	private static boolean isInEllipse(Coord ref_1, Coord ref_2, Coord point)
	{
		return Coord.distance(ref_1, point) + Coord.distance(point, ref_2) <= Coord.distance(ref_1, ref_2) * ELLIPSE_RATIO;
	}


	// Checks whether a destination is in the car's range, given the estimated length of the route:
	private static boolean lengthReachable(Car car, double estimatedLength)
	{
		double autonomyLeft = car.getCurrentAutonomy() - estimatedLength - RANGE_MARGIN;
		return autonomyLeft >= MIN_PERCENTAGE_MAX_AUTONOMY_SUCCESS * car.getMaxAutonomy();
	}


	// Returns a list of stations having a charging point compatible with the user car:
	private static ArrayList<Station> getRelevantStations(ArrayList<Station> allStations, Car car)
	{
		ArrayList<Station> relevantStations = new ArrayList<Station>();

		for (Station station : allStations) {
			if (station.hasUsableCompatibleChargingPoint(car)) {
				relevantStations.add(station);
			}
		}

		return relevantStations;
	}


	// Returns a list of stations in the same area than the waypoints.
	// Potential improvement: return a list of list of Coord, one for each subpath.
	private static ArrayList<Station> areaFiltering(ArrayList<Station> relevantStations, ArrayList<Coord> waypoints)
	{
		ArrayList<Station> filteredStations = new ArrayList<Station>();

		for (Station station : relevantStations) {
			for (int i = 0; i < waypoints.size() - 1; ++i) {
				if (isInEllipse(waypoints.get(i), waypoints.get(i + 1), station)) {
					filteredStations.add(station);
					break;
				}
			}
		}

		return filteredStations;
	}


	// Sorts 'coords' by increasing distance with 'refPoint':
	private static void sortByDistance(ArrayList<Coord> coords, Coord refPoint)
	{
		Comparator<Coord> customCompare = (Coord c1, Coord c2) ->
			Double.compare(Coord.distance(refPoint, c1), Coord.distance(refPoint, c2));
		Collections.sort(coords, customCompare);
	}


	// Returns a station which have to be reachable from the next user step.
	private static Station chooseSafetyStation(ArrayList<Station> stations)
	{
		if (stations.isEmpty()) {
			return null;
		}

		int safetyRank = Math.min(stations.size(), MIN_SAFETY_STATIONS_NUMBER) - 1;
		return stations.get(safetyRank);
	}


	// Chooses the best station, according to the following criteria:
	// nearest, cheaper, and lowest recharging time.
	private static Station chooseBestStation(ArrayList<Station> stations)
	{
		if (stations.isEmpty()) {
			return null;
		}

		return stations.get(0); // nearest. TODO: expand on this: use cost & refill time...
	}


	// Used when it has been deemed safe to go to the next step:
	private static void goNextStep(Car car, ArrayList<Coord> path, double legLength, Coord nextStep)
	{
		// System.out.println("\n-> Going to step:\n\n" + nextStep.toString());
		path.add(nextStep);
		car.setCurrentAutonomy(car.getCurrentAutonomy() - legLength);

		if (nextStep.isStation()) {
			// System.out.println("\nLucky one!");
			car.setCurrentAutonomy(car.getMaxAutonomy());
		}
	}


	// Refilling the car. On success, returns the chosen station, which must be the new current step. Else, returns null.
	private static Station goRefill(Car car, ArrayList<Station> relevantStations, ArrayList<Coord> path, Coord currentStep)
	{
		ArrayList<Station> reachableStations = new ArrayList<Station>();

		for (Station station : relevantStations) {
			if (lengthReachable(car, lengthUpperBound(currentStep, station))) {
				reachableStations.add(station);
			}
		}

		if (reachableStations.isEmpty()) {
			return null;
		}

		Station chosenStation = chooseBestStation(reachableStations);
		// System.out.println("\n-> Refilling at station:\n\n" + chosenStation.toString());

		// Preventing an infinite loop, when the station has already been visited!
		if (currentStep.isAtSameSpot(chosenStation) && car.getCurrentAutonomy() == car.getMaxAutonomy()) {
			return null;
		}

		path.add(chosenStation);
		car.setCurrentAutonomy(car.getMaxAutonomy());
		return chosenStation;
	}


	// Finds a route going through each waypoints, in the same order, while optimizing some criteria.
	// 'waypoints' essentially are the user steps, possibly slightly corrected by the route API.
	// This returns null on failure. The car is not modified, indeed autonomy computations are only estimates here.
	public static ArrayList<Coord> find(ArrayList<Station> allStations, Car userCar,
		ArrayList<Coord> waypoints, ArrayList<Double> legsLengths)
	{
		System.out.println("\n=> Starting the pathfinding computation.\n");

		if (waypoints == null || waypoints.isEmpty()) {
			System.err.println("\nAt least 1 waypoint is needed for the pathfinding.\n");
			return null;
		}

		if (legsLengths == null) { // using an estimation of the legs lengths.
			legsLengths = mockLegsLengths(waypoints);
		}

		if (legsLengths.size() != waypoints.size() - 1) {
			System.err.println("\nIncoherent legs length, could not start the pathfinding.");
			return null;
		}

		Car car = userCar.copy(); // preventing side effects.
		boolean singleWaypoint = waypoints.size() == 1;

		ArrayList<Station> relevantStations = getRelevantStations(allStations, car); // no 'area' filtering here!

		if (! singleWaypoint) {
			relevantStations = areaFiltering(relevantStations, waypoints);
		}

		if (relevantStations.isEmpty()) {
			System.err.printf("\nNo relevant station for the given car:\n\n%s\n", car.toString());
			System.err.println("\n-> Pathfinding failure.\n");
			return null;
		}

		Coord currentStep = waypoints.get(0), nextStep = waypoints.get(singleWaypoint ? 0 : 1);
		int stepIndex = 1;

		ArrayList<Coord> path = new ArrayList<Coord>();
		path.add(currentStep);

		while (true)
		{
			// System.out.println("------------------------------------------");
			// System.out.println("currentStep: " + currentStep.toString());
			// System.out.println("\nnextStep: " + nextStep.toString());

			// Potential improvement: only work on the stations for this subpath...
			sortByDistance((ArrayList<Coord>) ((ArrayList<?>) relevantStations), nextStep); // causes a warning.

			Station safetyNext = chooseSafetyStation(relevantStations);

			double legLength = singleWaypoint ? 0. : legsLengths.get(stepIndex - 1);
			legLength = currentStep.isStation() ? lengthUpperBound(currentStep, nextStep) : legLength;

			// System.out.printf("\nlegLength: %.3f km\n", legLength);

			if (! singleWaypoint && lengthReachable(car, legLength + lengthUpperBound(nextStep, safetyNext)))
			{
				goNextStep(car, path, legLength, nextStep);

				if (stepIndex + 1 == waypoints.size()) { // done.
					break;
				}

				currentStep = nextStep;
				nextStep = waypoints.get(stepIndex + 1);
				++stepIndex;
			}

			else
			{
				currentStep = goRefill(car, relevantStations, path, currentStep);

				if (currentStep == null) {
					System.err.println("\nNo station close enough for refilling.\n");
					System.err.printf("\nCurrent autonomy (estimate): %.3f km.\n", car.getCurrentAutonomy());
					System.err.println("\n-> Pathfinding failure.\n");
					printPath(path);
					return null;
				}

				if (singleWaypoint) { // done.
					break;
				}
			}

			// System.out.printf("\nCurrent autonomy (estimate): %.3f km.\n", car.getCurrentAutonomy());
		}

		// System.out.printf("\nCurrent autonomy (estimate): %.3f km.\n", car.getCurrentAutonomy());
		// System.out.println("\n-> Successfull pathfinding.\n");
		return path;
	}


	public static void printPath(ArrayList<Coord> path)
	{
		if (path == null) {
			System.err.println("null path");
		}

		else {
			System.out.println("Found path:\n");
			for (Coord coord : path) {
				System.out.println(coord.toString() + "\n");
			}
		}
	}


	public static void main(String[] args)
	{
		// ArrayList<Station> allStations = Station.mock(); // Won't be enough.
		ArrayList<Station> allStations = Station.bigMock(); // Will do it!
		// There should be enough mock stations, for a max autonomy of 200 km.

		Car car = new Car("Tesla cybertruck", 200, 50, "None");

		ArrayList<Coord> waypoints = new ArrayList<Coord>();
		waypoints.add(new Coord(43.124228, 5.928, "A", "Toulon"));
		waypoints.add(new Coord(43.296482, 5.36978, "B", "Marseille"));
		waypoints.add(new Coord(45.76404, 4.83566, "C", "Lyon"));
		waypoints.add(new Coord(47.34083, 5.05015, "D", "Dijon"));
		waypoints.add(new Coord(48.85661, 2.3499, "E", "Paris"));

		ArrayList<Double> legsLengths = mockLegsLengths(waypoints); // mocks API queries.

		ArrayList<Coord> path = find(allStations, car, waypoints, legsLengths);
		printPath(path);
	}
}
