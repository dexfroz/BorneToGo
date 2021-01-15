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


	public static JsonObject core(JsonObject input)
	{
		if (input == null) {
			System.err.println("\nCould not process a null input.\n");
			return null;
		}

		ArrayList<Station> stations = DatabaseConnector.getStations(); // TODO: must be kept loaded!
		Car car = Car.getFromJson(input);
		ArrayList<Coord> userSteps = getUserStepsFromJson(input);

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
		JsonObject secondQuery = QueryAPIs.queryRoute("route", path);
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
		return Output.buildAnswer(routes);
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
// chosen convention in json (input + output)
// taux recharge
// request: routes number option
// geocoding part?
// input and output files to update!
// filter user steps?
// reset to null values in core?
// warnings?
// update readme

