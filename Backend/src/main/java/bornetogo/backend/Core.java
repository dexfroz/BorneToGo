package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Core
{
	// Allows for a more precise pathfinding when true (default),
	// but makes the core function a bit slower:
	private static final boolean ENABLE_FIRST_QUERY = true;

	private JsonObject output = null;
	private String message = "";


	private Core(JsonObject output, String message)
	{
		this.output = output;
		this.message = message;

		if (! this.message.equals("")) {
			System.err.println("\n" + this.message + "\n");
		}
	}


	public JsonObject getOuput()
	{
		return this.output;
	}


	public String getMessage()
	{
		return this.message;
	}


	public static void benchmark(long startTime, long endTime, String comment)
	{
		double elapsedTime = (endTime - startTime) / 1e9;
		System.out.printf("- Duration for '%s':\n-> %.3f s.\n\n", comment, elapsedTime);
	}


	// Main function of the Backend.
	public static Core answer(JsonObject input)
	{
		try
		{
			long time_0 = System.nanoTime();

			if (input == null) {
				return new Core(null, "Could not process a null input.");
			}

			// Collecting the stations and the car:

			ArrayList<Station> allStations = DatabaseConnector.getStations(); // only loaded once!

			if (allStations == null) {
				return new Core(null, "Could not obtain the stations.");
			}

			Car car = Car.getFromJson(input);

			if (car == null) {
				return new Core(null, "Could not obtain the car.");
			}

			long time_1 = System.nanoTime();

			// Collecting the user steps:

			ArrayList<Coord> userSteps = UserStepsLoader.load(input);

			if (userSteps == null) {
				return new Core(null, "Could not obtain the user steps.");
			}

			long time_2 = System.nanoTime();

			// First route query, replacing mockLegsLengths():

			ArrayList<Coord> waypoints = userSteps;
			ArrayList<Double> legsLengths = null;

			if (ENABLE_FIRST_QUERY && userSteps.size() > 1) // querying the route API.
			{
				JsonObject firstQuery = QueryAPIs.queryRoute("route", userSteps, "&overview=false"); // without geometry.
				// GetJson.safeJsonPrinting(firstQuery);

				if (firstQuery == null) {
					return new Core(null, "Error in the first route request.");
				}

				Route firstDraw = Route.getFromJson(firstQuery, car, userSteps, Route.AddingData.OFF);

				if (firstDraw == null) {
					return new Core(null, "Error while parsing 'firstQuery'.");
				}

				waypoints = firstDraw.getWaypoints();
				legsLengths = firstDraw.getLegsLengths();
			}

			long time_3 = System.nanoTime();

			// Pathfinding:

			ArrayList<Coord> path = Pathfinding.find(allStations, car, waypoints, legsLengths);

			if (path == null) {
				return new Core(null, "Pathfinding failed.");
			}

			long time_4 = System.nanoTime();

			// Second route query, for getting the full path:

			JsonObject secondQuery = QueryAPIs.queryRoute("route", path, "&overview=full"); // with geometry.
			// GetJson.safeJsonPrinting(secondQuery);

			if (secondQuery == null) {
				return new Core(null, "Error in the second route request.");
			}

			long time_5 = System.nanoTime();

			// Building the final route:

			Route foundRoute = Route.getFromJson(secondQuery, car, path, Route.AddingData.ON);

			if (foundRoute == null) {
				return new Core(null, "Failure to output the final route.");
			}

			if (! foundRoute.getValidity()) {
				return new Core(null, "Invalid final route.");
			}

			ArrayList<Route> routes = new ArrayList<Route>();
			routes.add(foundRoute); // only 1 route for now.

			// Building the output:

			JsonObject output = Output.build(routes, car, time_0);

			long time_6 = System.nanoTime();

			// Benchmarking results:
			benchmark(time_0, time_1, "DatabaseConnector.getStations(), Car.getFromJson()");
			benchmark(time_1, time_2, "UserStepsLoader.load()");
			benchmark(time_2, time_3, "QueryAPIs.queryRoute() + Route.getFromJson(), if needed");
			benchmark(time_3, time_4, "Pathfinding.find()");
			benchmark(time_4, time_5, "QueryAPIs.queryRoute()");
			benchmark(time_5, time_6, "Route.getFromJson() + Output.build()");
			benchmark(time_0, time_6, "Total");

			return new Core(output, ""); // leave message empty!
		}
		catch (Exception e) {
			e.printStackTrace();
			return new Core(null, "Unknown Backend error :(");
		}
	}


	public static void main(String[] args)
	{
		// String inputString = FileContent.read("input_example.json");
		String inputString = FileContent.read("input_example_singleStep.json");

		JsonObject input = GetJson.jsonFromString(inputString);
		Core answer = answer(input);

		// GetJson.safeJsonPrinting(answer.getOuput()); // lots of printing...
	}
}
