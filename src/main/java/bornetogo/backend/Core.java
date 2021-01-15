package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Core
{
	public static void safeJsonPrinting(JsonObject jsonObject)
	{
		if (jsonObject != null) { // necessary check!
			System.out.println("\n" + jsonObject.toString() + "\n");
		}
	}


	public static ArrayList<Coord> getUserStepsFromJson(JsonObject json)
	{
		return null;
	}


	public static ArrayList<Station> getStationsFromJson(JsonObject json)
	{
		return null;
	}


	public static JsonObject buildAnswer(ArrayList<Route> routes)
	{
		// routesArray:

		JsonArrayBuilder routesBuilder = Json.createArrayBuilder();

		for (Route route : routes)
		{
			// waypoints:

			JsonArrayBuilder waypointsBuilder = Json.createArrayBuilder();

			for (Coord coord : route.getWaypoints()) {
				// {
				// 	"location": [
				// 		52.517033,
				// 		13.388798
				// 	],
				// 	"name": "Friedrichstraße",
				// 	"isStation": false
				// },

				// waypointsBuilder.add(coord.toJson()); // full info
			}

			JsonArray waypointsArray = waypointsBuilder.build();

			// legs:

			JsonArrayBuilder legsBuilder = Json.createArrayBuilder();
				// add legs
			JsonArray legsArray = legsBuilder.build();

			// coordinates:

			JsonArrayBuilder coordsBuilder = Json.createArrayBuilder();
				// add coords // light info!
			JsonArray coordsArray = coordsBuilder.build();

			// geometry:

			JsonObject geometry = Json.createObjectBuilder()
				.add("coordinates", coordsArray)
				.build();

			// fullPathJson:

			JsonObject fullPathJson = Json.createObjectBuilder()
				.add("length", 4830.9)
				.add("duration", 623.7)
				.add("cost", 44.50)
				.add("autonomyLeft", 65.8)
				.add("stats", "not_done")
				.add("legs", legsArray)
				.add("geometry", geometry)
				.build();

			// routeJson:

			JsonObject routeJson = Json.createObjectBuilder()
				.add("waypoints", waypointsArray)
				.add("fullPath", fullPathJson)
				.build();

			routesBuilder.add(routeJson);
		}

		JsonArray routesArray = routesBuilder.build();

		// answer:

		JsonObject answer = Json.createObjectBuilder()
			.add("type", "output")
			.add("status", "ok")
			.add("convention", "lat-long")
			.add("routes", routesArray)
			.build();

		return answer;
	}


	public static JsonObject core(JsonObject input)
	{
		if (input == null) {
			System.err.println("\nCould not process a null input.\n");
			return null;
		}

		Car car = Car.getFromJson(input);
		ArrayList<Coord> userSteps = getUserStepsFromJson(input);
		ArrayList<Station> stations = getStationsFromJson(input);

		if (car == null || userSteps == null || stations == null) {
			System.err.println("\nError while parsing the input json.\n");
			return null;
		}

		// Query 1 - replacing mockStepLengths():
		JsonObject firstQuery = QueryAPIs.queryRoute("route", userSteps); // no need of all coordinates here!
		// safeJsonPrinting(firstQuery);

		if (firstQuery == null) {
			System.err.println("\nError in the first route request.\n");
			return null;
		}

		Route firstDraw = Route.getFromJson(firstQuery);

		if (firstDraw == null) {
			System.err.println("\nError while parsing 'firstQuery'.\n");
			return null;
		}

		ArrayList<Double> legLengths = firstDraw.getLegsLengths();

		if (legLengths == null) {
			System.err.println("\nCould not get the legs length.\n");
			return null;
		}

		ArrayList<Coord> path = Pathfinding.pathfinding(car, userSteps, stations, legLengths);

		if (path == null) {
			System.err.println("\nPathfinding failed.\n");
			return null;
		}

		// Query 2 - for getting the full path:
		JsonObject secondQuery = QueryAPIs.queryRoute("route", userSteps);
		// safeJsonPrinting(secondQuery);

		if (secondQuery == null) {
			System.err.println("\nError in the second route request.\n");
			return null;
		}

		Route foundRoute = Route.getFromJson(secondQuery);

		if (foundRoute == null) {
			System.err.println("\nIncorrect found route.\n");
			return null;
		}

		foundRoute.updateCurrentAutonomy(car);
		foundRoute.computeDuration();
		foundRoute.computeCost();

		ArrayList<Route> routes = new ArrayList<Route>();
		routes.add(foundRoute); // only 1 route for now.
		return buildAnswer(routes);
	}


	public static void main(String[] args)
	{
		String inputString = FileContent.read("input_example.json");
		JsonObject input = GetJson.jsonFromString(inputString);
		JsonObject output = core(input);
		safeJsonPrinting(output);
	}
}

// TODO:
// get json in car, from input
// support inputs either in addresses, or GPS coord...
// chosen convention in json!
// JsonOutput.java useless...
// taux recharge
// requ nombre routes
// safeJsonPrinting() location?
// geocoding part?
// unformated_output to rename.
// input and output files to update
// description -> name + address
// in waypoints: "data": {}
// filter user steps?
