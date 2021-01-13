package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Pathfinding
{
	private static final double distBoundCoeff = 1.5; // unit less
	private static final double ellipseMargin = 20.; // in km .......... geometrically enough?
	private static final double rangeMargin = 0.; // in km


	private static double lengthUpperBound(double dist)
	{
		// return distBoundCoeff * dist;
		return dist; // for testing.
	}


	// Straight line, euclidean distance:
	public static double distance(Coord coord_1, Coord coord_2) // TODO: adapt this to a spherical geometry!
	{
		double deltaLat = coord_1.getLatitude() - coord_2.getLatitude();
		double deltaLong = coord_1.getLongitude() - coord_2.getLongitude();
		return Math.sqrt(deltaLat * deltaLat + deltaLong * deltaLong);
	}


	// ... explain this ...
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


	public static double pathCost(ArrayList<Coord> path)
	{
		return 0;
	}


	// Returns null on failure.
	public static ArrayList<Coord> pathfinding(Car car, ArrayList<Coord> userSteps, ArrayList<Station> allStations)
	{
		return null;
	}


	public static void main(String[] args)
	{
		;
	}
}

// Car car = new Car("Tesla cybertruck", "undefined", "undefined", 66, 30);
// car.getMaxAutonomy();
// car.getCurrentAutonomy();

// Coord coord = new Coord(43.1, 5.9, "Somewhere.");
// coord.getStationStatus();

// Station station = new Station(43.1, 5.9, "A station");
// station.hasCompatibleChargingPoint(car);


// ArrayList<Coord> routeCoordinates = new ArrayList<Coord>();
// routeCoordinates.add(new Coord(52.517037, 13.388860));
// routeCoordinates.add(new Coord(52.529407, 13.397634));
// routeCoordinates.add(new Coord(52.523219, 13.428555));

// // Finds the fastest route between coordinates in the supplied order:
// JsonObject json = QueryAPIs.queryRoute("route", routeCoordinates);
// safeJsonPrinting(json);

