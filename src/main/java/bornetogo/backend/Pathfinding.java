package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;


public class Pathfinding
{
	private static final double distBoundCoeff = 1.5; // unitless
	private static final double ellipseMargin = 20.; // in km
	private static final double rangeMargin = 0.; // in km


	// Gives a reasonable upper bound for the length of a route between two points:
	private static double lengthUpperBound(Coord coord_1, Coord coord_2)
	{
		return distBoundCoeff * Coord.distance(coord_1, coord_2);
		// return Coord.distance(coord_1, coord_2); // for testing.
	}


	// For testing only, the real version must query the route API.
	private static ArrayList<Double> mockStepLengths(ArrayList<Coord> userSteps)
	{
		ArrayList<Double> stepLengths = new ArrayList<Double>();

		for (int i = 0; i < userSteps.size() - 1; ++i) {
			stepLengths.add(lengthUpperBound(userSteps.get(i), userSteps.get(i + 1)));
		}

		return stepLengths;
	}


	// Checks if the given point is inside the ellipse of focus 'ref_1' and 'ref_2',
	// and with major axis of length: distance(ref_1, ref_2) + 2. * ellipseMargin
	private static Boolean isInEllipse(Coord ref_1, Coord ref_2, Coord point)
	{
		return Coord.distance(ref_1, point) + Coord.distance(point, ref_2) <= Coord.distance(ref_1, ref_2) + 2. * ellipseMargin;
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
			Double.compare(Coord.distance(refPoint, c1), Coord.distance(refPoint, c2));
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
			car.setCurrentAutonomy(car.getMaxAutonomy()); // tell the User!
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
		System.out.println("\n-> Refilling at station:\n\n" + chosenStation.toString());

		if (currentStep.isEqual(chosenStation)) {
			return null;
		}

		path.add(chosenStation);
		car.setCurrentAutonomy(car.getMaxAutonomy()); // tell the User!
		return chosenStation;
	}


	// Returns null on failure.
	public static ArrayList<Coord> pathfinding(Car car, ArrayList<Coord> userSteps,
		ArrayList<Station> allStations, ArrayList<Double> stepLengths)
	{
		if (userSteps.size() < 2) {
			System.err.println("\nUnsupported use case, as of now.");
			return null;
		}

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
			System.out.println("------------------------------------------");
			System.out.println("currentStep: " + currentStep.toString());
			System.out.println("\nnextStep: " + nextStep.toString());

			if (relevantStations.isEmpty()) {
				System.out.printf("\nCurrent autonomy: %.3f km.\n", car.getCurrentAutonomy());
				System.err.println("\n-> Pathfinding failure.\n");
				printPath(path);
				return null;
			}

			// Potential improvement: only work on the stations for this subpath...
			sortByDistance((ArrayList<Coord>) ((ArrayList<?>) relevantStations), nextStep); // causes a warning.

			Station safetyNext = chooseSafetyStation(relevantStations);

			double stepLength = stepLengths.get(stepIndex - 1);

			if (currentStep.isStation()) {
				stepLength = lengthUpperBound(currentStep, nextStep);
			}

			System.out.printf("\nstepLength: %.3f km\n", stepLength);

			if (lengthReachable(car, stepLength + lengthUpperBound(nextStep, safetyNext)))
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
					System.out.printf("\nCurrent autonomy: %.3f km.\n", car.getCurrentAutonomy());
					System.err.println("\n-> Pathfinding failure.\n");
					printPath(path);
					return null;
				}
			}

			System.out.printf("\nCurrent autonomy: %.3f km.\n", car.getCurrentAutonomy());
		}

		System.out.printf("\nCurrent autonomy: %.3f km.\n", car.getCurrentAutonomy());
		System.out.println("\n-> Done.\n");
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
		Car car = new Car("Tesla cybertruck", "undefined", "undefined", 200, 50);

		ArrayList<Coord> userSteps = new ArrayList<Coord>();
		userSteps.add(new Coord(43.124228, 5.928, "Toulon"));
		userSteps.add(new Coord(43.296482, 5.36978, "Marseille"));
		userSteps.add(new Coord(45.76404, 4.83566, "Lyon"));
		userSteps.add(new Coord(47.34083, 5.05015, "Dijon"));
		userSteps.add(new Coord(48.85661, 2.3499, "Paris"));

		ArrayList<Station> allStations = new ArrayList<Station>();
		allStations.add(new Station(43.18196, 5.70365, "Station Saint Cyr-sur-Mer"));
		allStations.add(new Station(43.52916, 5.43638, "Station Aix-en-Provence"));
		allStations.add(new Station(43.96512, 4.81899, "Station Avignon"));
		allStations.add(new Station(44.54774, 4.78249, "Station Montélimar"));
		allStations.add(new Station(44.95311, 4.90094, "Station Valence"));
		allStations.add(new Station(45.36394, 4.83675, "Station Roussillon"));
		allStations.add(new Station(46.29772, 4.84272, "Station Mâcon"));
		allStations.add(new Station(47.04845, 4.81543, "Station Beaune"));
		allStations.add(new Station(47.58339, 5.20597, "Station Selongey"));
		allStations.add(new Station(47.86140, 5.34153, "Station Langres"));
		allStations.add(new Station(48.31764, 4.12017, "Station Troyes"));
		allStations.add(new Station(48.19592, 3.28644, "Station Sens"));
		allStations.add(new Station(48.37708, 3.00335, "Station Montereau"));
		allStations.add(new Station(48.53482, 2.66751, "Station Melun"));
		// Should be enough, for a max autonomy of 200 km.

		ArrayList<Double> stepLengths = mockStepLengths(userSteps); // mocks API queries.
		ArrayList<Coord> path = pathfinding(car, userSteps, allStations, stepLengths);
		printPath(path);
	}
}
