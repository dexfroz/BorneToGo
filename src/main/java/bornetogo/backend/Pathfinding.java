package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Pathfinding
{
	private static final double distBoundCoeff = 1.5; // unit less
	private static final double ellipseMargin = 20.; // in km
	private static final double rangeMargin = 0.; // in km


	// Gives a reasonable upper bound for the length of a route, given the straight line distance:
	private static double lengthUpperBound(double dist)
	{
		return distBoundCoeff * dist;
		// return dist; // for testing.
		// factorize lengthUpperBound o distance?
	}


	// Straight line, euclidean distance:
	public static double distance(Coord coord_1, Coord coord_2) // TODO: adapt this to a spherical geometry!
	{
		double deltaLat = coord_1.getLatitude() - coord_2.getLatitude();
		double deltaLong = coord_1.getLongitude() - coord_2.getLongitude();
		return Math.sqrt(deltaLat * deltaLat + deltaLong * deltaLong);
	}


	// Checks if the given point is inside the ellipse of focus 'ref_1' and 'ref_2',
	// and with major axis of length: distance(ref_1, ref_2) + 2. * ellipseMargin
	private static Boolean isInEllipse(Coord ref_1, Coord ref_2, Coord point)
	{
		return distance(ref_1, point) + distance(point, ref_2) <= distance(ref_1, ref_2) + 2. * ellipseMargin;
	}


	// For testing, the real version must query the route API.
	private static ArrayList<Double> getStepLengths(ArrayList<Coord> userSteps)
	{
		ArrayList<Double> stepLengths = new ArrayList<Double>();

		for (int i = 0; i < userSteps.size() - 1; ++i) {
			stepLengths.add(distance(userSteps.get(i), userSteps.get(i + 1)));
		}

		return stepLengths;
	}


	// Checks whether a destination is in the car's range, given the estimated length of the route:
	private static Boolean lengthReachable(Car car, double estimatedLength)
	{
		return estimatedLength + rangeMargin <= car.getCurrentAutonomy();
	}


	// Potential improvement: return a list of list of Coord, one for each subpath.
	private static ArrayList<Station> getRelevantStations(Car car, ArrayList<Coord> userSteps, ArrayList<Station> allStations)
	{
		ArrayList<Station> relevantStations = new ArrayList<Station>();

		for (Station station : allStations) {
			if (station.hasCompatibleChargingPoint(car)) {
				for (int i = 0; i < userSteps.size() - 1; ++i) {
					if (isInEllipse(userSteps.get(i), userSteps.get(i + 1), station)) {
						relevantStations.add(station);
						break;
					}
				}
			}
		}

		return relevantStations;
	}


	// Sorts 'coords' by increasing distance with 'refPoint':
	private static void sortByDistance(ArrayList<Coord> coords, Coord refPoint)
	{
		Comparator<Coord> customCompare = (Coord c1, Coord c2) ->
			Double.compare(distance(refPoint, c1), distance(refPoint, c2));
		Collections.sort(coords, customCompare);
	}


	private static Station chooseSafetyStation(ArrayList<Station> stations)
	{
		if (stations.isEmpty()) {
			return null;
		}

		return stations.get(0); // arbitrary, make a parameter out of this...
	}


	private static Station chooseBestStation(ArrayList<Station> stations)
	{
		if (stations.isEmpty()) {
			return null;
		}

		return stations.get(0); // nearest. TODO: improve on this!
	}


	// Used when it has been deemed safe to go to the next step:
	private static void goNextStep(Car car, ArrayList<Coord> path, double stepLength, Coord nextStep)
	{
		System.out.println("\n-> Going to step:\n\n" + nextStep.toString());
		path.add(nextStep);
		car.setCurrentAutonomy(car.getCurrentAutonomy() - stepLength);

		if (nextStep.isStation()) {
			System.out.println("\nLucky one!");
			car.setCurrentAutonomy(car.getMaxAutonomy()); // tell User!
		}

		// totalCost += cost(stepLength);
	}


	// Refilling the car. On success, returns the chosen station, which must be the new current step. Else, returns null.
	private static Coord goRefill(Car car, ArrayList<Station> relevantStations, ArrayList<Coord> path, Coord currentStep)
	{
		ArrayList<Station> reachableStations = new ArrayList<Station>();

		for (Station station : relevantStations) {
			if (lengthReachable(car, lengthUpperBound(distance(currentStep, station)))) {
				reachableStations.add(station);
			}
		}

		if (reachableStations.isEmpty()) {
			return null;
		}

		Station chosenStation = chooseBestStation(reachableStations);
		System.out.println("\n-> Refilling at station:\n\n" + chosenStation.toString());
		path.add(chosenStation);
		car.setCurrentAutonomy(car.getMaxAutonomy()); // tell User!

		return chosenStation;

		// totalCost += cost(length_upper_bound(distance(currentStep, chosenStation)));
		// length too big, use the API request!
	}


	// Returns null on failure.
	public static ArrayList<Coord> pathfinding(Car car, ArrayList<Coord> userSteps, ArrayList<Station> allStations)
	{
		if (userSteps.size() < 2) {
			System.err.println("\nUnsupported use case, as of now.");
			return null;
		}

		ArrayList<Double> stepLengths = getStepLengths(userSteps); // mocks API queries.

		if (stepLengths.size() != userSteps.size() - 1) {
			System.err.println("\nAn error happend while querying the route API.");
			return null;
		}

		ArrayList<Station> relevantStations = getRelevantStations(car, userSteps, allStations);

		Coord currentStep = userSteps.get(0), nextStep = userSteps.get(1);
		int stepIndex = 1;

		ArrayList<Coord> path = new ArrayList<Coord>();
		path.add(currentStep);

		while (true)
		{
			System.out.println("--------------------------------------------------");
			System.out.println("currentStep: " + currentStep.toString());
			System.out.println("\nnextStep: " + nextStep.toString());

			if (relevantStations.isEmpty()) {
				System.err.println("\nPathfinding failure.\n");
				System.err.println(car.toString());
				return null;
			}

			// Potential improvement: only work on the stations for this subpath...
			sortByDistance((ArrayList<Coord>) ((ArrayList<?>) relevantStations), nextStep); // causes a warning.

			double stepLength = stepLengths.get(stepIndex - 1);

			if (currentStep.isStation()) {
				stepLength = lengthUpperBound(distance(currentStep, nextStep));
			}

			System.out.println("\nstepLength: " + stepLength);

			Station safetyNext = chooseSafetyStation(relevantStations);

			if (lengthReachable(car, stepLength + lengthUpperBound(distance(nextStep, safetyNext))))
			{
				goNextStep(car, path, stepLength, nextStep);

				if (stepIndex + 1 == userSteps.size()) { // done.
					break;
				}

				currentStep = nextStep;
				nextStep = userSteps.get(stepIndex + 1);
				++stepIndex;
			}

			else
			{
				currentStep = goRefill(car, relevantStations, path, currentStep);

				if (currentStep == null) {
					System.err.println("\nPathfinding failure.\n");
					System.err.println(car.toString());
					return null;
				}
			}

			System.out.println("\nCurrent autonomy: " + car.getCurrentAutonomy());
		}

		System.out.println("\nCurrent autonomy: " + car.getCurrentAutonomy());
		System.out.println("\nDone.\n");
		return path;
	}


	// Computes the cost in time and money of the given path:
	public static double pathCost(ArrayList<Coord> path)
	{
		return 0;
	}


	public static void main(String[] args)
	{
		////////////////////////////////////////////////////////////
		// Sorting test:

		// ArrayList<Station> stations = new ArrayList<Station>();
		// stations.add(new Station(43.1, 5.9, "station_1"));
		// stations.add(new Station(42.5, 6.7, "station_2"));
		// stations.add(new Station(40.3, 7.2, "station_3"));

		// for (Station station : stations) {
		// 	System.out.println(station + "\n");
		// }

		// System.out.println("=== Sorting: ===\n");

		// Coord refPoint = new Coord(39.1, 8.5, "the_ref");

		// sortByDistance((ArrayList<Coord>) ((ArrayList<?>) stations), refPoint); // causes a warning, but ok!

		// for (Station station : stations) {
		// 	System.out.println(station + "\n");
		// }

		////////////////////////////////////////////////////////////
		// Pathfinding test:

		Car car = new Car("Tesla cybertruck", "undefined", "undefined", 66, 30);

		ArrayList<Coord> userSteps = new ArrayList<Coord>();
		userSteps.add(new Coord(0, 0, "A"));
		userSteps.add(new Coord(10, 0, "B"));
		userSteps.add(new Coord(60, 0, "C"));
		userSteps.add(new Coord(80, 0, "D"));
		userSteps.add(new Coord(120, 0, "E"));

		ArrayList<Station> allStations = new ArrayList<Station>();
		for (int i = 0; i < 50; ++i) {
			allStations.add(new Station(9 * i, 0, "X"));
		}

		ArrayList<Coord> path = pathfinding(car, userSteps, allStations);

		if (path == null) {
			System.err.println("null path");
		}

		else {
			for (Coord coord : path) {
				System.out.println(coord.toString() + "\n");
			}
		}

		////////////////////////////////////////////////////////////
	}
}

// // Finds the fastest route between coordinates in the supplied order:
// JsonObject json = QueryAPIs.queryRoute("route", routeCoordinates);
// safeJsonPrinting(json);
