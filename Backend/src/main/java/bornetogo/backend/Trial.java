package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


// Mocking the Core program, for benchmarking the pathfinding results:
public class Trial
{
	private static final boolean ENABLE_FIRST_QUERY = true;
	private static final double MIN_STEP_DIST = 500.; // in km
	private static final long COOLDOWN = 5000; // in ms


	private static ArrayList<Coord> generateUserSteps(int maxStepsNumber)
	{
		double latMin = 43., latMax = 50.;
		double longMin = 0., longMax = 8.;

		Random r = new Random();
		ArrayList<Coord> userSteps = new ArrayList<Coord>();
		int stepsNumber = 1 + r.nextInt(maxStepsNumber);

		for (int i = 0; i < stepsNumber; ++i)
		{
			Coord coord = null;
			do {
				double randomLat = latMin + (latMax - latMin) * r.nextDouble();
				double randomLong = longMin + (longMax - longMin) * r.nextDouble();
				coord = new Coord(randomLat, randomLong, "User step " + i, "Somewhere " + i);
			}
			while (i > 0 && Coord.distance(userSteps.get(i - 1), coord) < MIN_STEP_DIST);

			userSteps.add(coord);
		}

		return userSteps;
	}


	private static void run(int rounds, int maxStepsNumber)
	{
		try
		{
			System.out.println("\nStarting the trial.\n");

			Car car = new Car("Tesla cybertruck", 200, 100, "None");

			// ArrayList<Station> allStations = Station.bigMock();
			ArrayList<Station> allStations = DatabaseConnector.getStations(); // real deal.

			int pathSucessCount = 0;
			int pathValidityCount = 0;

			for (int round = 0; round < rounds; ++round)
			{
				Thread.sleep(COOLDOWN); // limiting the load on APIs.

				System.out.printf("\nRound %d:\n", round);

				ArrayList<Coord> userSteps = generateUserSteps(maxStepsNumber);

				// First route query, replacing mockLegsLengths():

				ArrayList<Coord> waypoints = userSteps;
				ArrayList<Double> legsLengths = null;

				if (ENABLE_FIRST_QUERY && userSteps.size() > 1) // querying the route API.
				{
					JsonObject firstQuery = QueryAPIs.queryRoute("route", userSteps, "&overview=false"); // without geometry.
					// GetJson.safeJsonPrinting(firstQuery);

					if (firstQuery == null) {
						System.err.println("Error in the first route request.");
						continue;
					}

					Thread.sleep(COOLDOWN);

					Route firstDraw = Route.getFromJson(firstQuery, car, userSteps, Route.AddingData.OFF);

					if (firstDraw == null) {
						System.err.println("Error while parsing 'firstQuery'.");
						continue;
					}

					waypoints = firstDraw.getWaypoints();
					legsLengths = firstDraw.getLegsLengths();
				}

				// Pathfinding:

				ArrayList<Coord> path = Pathfinding.find(allStations, car, waypoints, legsLengths);

				if (path == null) {
					System.err.println("Pathfinding failed.");
					continue;
				}

				++pathSucessCount;

				// Second route query, for getting the full path:

				JsonObject secondQuery = QueryAPIs.queryRoute("route", path, "&overview=full"); // with geometry.
				// GetJson.safeJsonPrinting(secondQuery);

				if (secondQuery == null) {
					System.err.println("Error in the second route request.");
					continue;
				}

				// Building the final route:

				Route foundRoute = Route.getFromJson(secondQuery, car, path, Route.AddingData.ON);

				if (foundRoute == null) {
					System.err.println("Failure to output the final route.");
					continue;
				}

				if (! foundRoute.getValidity()) {
					System.err.println("Invalid final route.");
					continue;
				}

				++pathValidityCount;
			}

			System.out.printf("\nResults:\n\nPathfinding success rate: %.3f %%\nPathfinding validity rate: %.3f %%\n",
				100. * pathSucessCount / rounds, 100. * pathValidityCount / rounds);
			System.out.println("\nEnding the trial.\n");

		}
		catch (Exception e) {
			e.printStackTrace();
			System.err.println("\nAn unknown error happened during the path trial...\n");
		}
	}


	public static void main(String[] args)
	{
		int rounds = 10, maxStepsNumber = 2;
		run(rounds, maxStepsNumber);
	}
}
