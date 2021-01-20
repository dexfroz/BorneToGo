package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Core
{
	// Allows for a more precise pathfinding when true (default), but makes the core function a bit slower:
	public static final Boolean enableFirstQuery = true;


	public static void safeJsonPrinting(JsonObject jsonObject)
	{
		if (jsonObject != null) { // necessary check!
			System.out.println("\n" + jsonObject.toString() + "\n");
		}
	}


	public static void benchmark(long startTime, long endTime, String comment)
	{
		double elapsedTime = (endTime - startTime) / 1e9;
		System.out.printf("- Duration for '%s':\n-> %.3f s.\n\n", comment, elapsedTime);
	}


	// Returns null on failure:
	private static ArrayList<Coord> getUserStepsFromJson(JsonObject input)
	{
		try
		{
			ArrayList<Coord> userSteps = new ArrayList<Coord>();
			JsonArray stepsArray = input.getJsonArray("userSteps");

			for (int i = 0; i < stepsArray.size(); ++i)
			{
				JsonObject step = stepsArray.getJsonObject(i);
				String name = step.getString("name");
				String address = step.getString("address");
				JsonArray coordJson = step.getJsonArray("location");

				try {
					Coord coord = Coord.getFromJsonArray(coordJson, name, address, Coord.Format.LONG_LAT);
					userSteps.add(coord);
				}
				catch (Exception e)
				{
					if (name.equals("") || address.equals("")) {
						System.err.println("\nTotally empty location in the input json!\n");
						return null;
					}
					else
					{
						System.err.println("\nTODO: batch geocoding request!\n");
						// TODO: send BATCH requests to the geocoding API, to retrieve the location
						// coordinates from the name and addresse.
						return null;
					}
				}
			}

			if (userSteps.size() == 0) {
				System.err.println("\nAt least 1 user step is needed in the input json.\n");
				return null;
			}

			return userSteps;
		}
		catch (Exception e) {
			System.err.println("\nError while parsing a json: could not extract user steps.\n");
			return null;
		}
	}


	public static JsonObject core(JsonObject input)
	{
		long time_0 = System.nanoTime();

		// Collecting the input resources:

		if (input == null) {
			System.err.println("\nCould not process a null input.\n");
			return null;
		}

		ArrayList<Station> stations = DatabaseConnector.getStations(); // already loaded in memory!
		Car car = Car.getFromJson(input);
		ArrayList<Coord> userSteps = getUserStepsFromJson(input);

		if (stations == null || car == null || userSteps == null) {
			System.err.println("\nError while parsing the input json.\n");
			return null;
		}

		long time_1 = System.nanoTime();

		// First route query, replacing mockLegsLengths():

		ArrayList<Coord> waypoints = userSteps;
		ArrayList<Double> legsLengths = new ArrayList<Double>(); // need to be != null.

		if (enableFirstQuery && userSteps.size() > 1) // querying the route API.
		{
			JsonObject firstQuery = QueryAPIs.queryRoute("route", userSteps, "&overview=false"); // without geometry.
			// safeJsonPrinting(firstQuery);

			if (firstQuery == null) {
				System.err.println("\nError in the first route request.\n");
				return null;
			}

			Route firstDraw = Route.getFromJson(firstQuery, car, null);

			if (firstDraw == null) {
				System.err.println("\nError while parsing 'firstQuery'.\n");
				return null;
			}

			waypoints = firstDraw.getWaypoints();
			legsLengths = firstDraw.getLegsLengths();
		}

		long time_2 = System.nanoTime();

		// Pathfinding:

		ArrayList<Coord> path = Pathfinding.find(stations, car, waypoints, legsLengths);

		if (path == null) {
			System.err.println("\nPathfinding failed.\n");
			return null;
		}

		long time_3 = System.nanoTime();

		// Second route query, for getting the full path:

		JsonObject secondQuery = QueryAPIs.queryRoute("route", path, "&overview=full"); // with geometry.
		// safeJsonPrinting(secondQuery);

		if (secondQuery == null) {
			System.err.println("\nError in the second route request.\n");
			return null;
		}

		long time_4 = System.nanoTime();

		// Building the final route:

		Route foundRoute = Route.getFromJson(secondQuery, car, path);

		if (foundRoute == null) {
			System.err.println("\nIncorrect found route.\n");
			return null;
		}

		ArrayList<Route> routes = new ArrayList<Route>();
		routes.add(foundRoute); // only 1 route for now.

		// Building the output:

		JsonObject output = Output.build(routes, time_0);

		long time_5 = System.nanoTime();

		// Benchmarking results:
		benchmark(time_0, time_1, "DatabaseConnector.getStations(), Car.getFromJson(), getUserStepsFromJson()");
		benchmark(time_1, time_2, "QueryAPIs.queryRoute() + Route.getFromJson(), if (enableFirstQuery && userSteps.size() > 1)");
		benchmark(time_2, time_3, "Pathfinding.find()");
		benchmark(time_3, time_4, "QueryAPIs.queryRoute()");
		benchmark(time_4, time_5, "Route.getFromJson() + Output.build()");

		return output;
	}


	public static void main(String[] args)
	{
		String inputString = FileContent.read("input_example.json");
		// String inputString = FileContent.read("input_example_singleStep.json");

		JsonObject input = GetJson.jsonFromString(inputString);
		JsonObject output = core(input);

		// safeJsonPrinting(output); // lots of printing...
	}
}
