package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Core
{
	public static Car getCarFromJson(JsonObject json)
	{
		return null;
	}


	public static ArrayList<Coord> getUserStepsFromJson(JsonObject json)
	{
		return null;
	}


	public static ArrayList<Station> getStationsFromJson(JsonObject json)
	{
		return null;
	}


	public static ArrayList<Double> getStepLengthsFromJson(JsonObject json)
	{
		return null;
	}


	public static ArrayList<Coord> getPathFromJson(JsonObject json)
	{
		return null;
	}


	public static JsonObject buildAnswer(ArrayList<Coord> fullPath, double duration, double cost)
	{
		return null;
	}


	public static void safeJsonPrinting(JsonObject jsonObject)
	{
		if (jsonObject != null) { // necessary check!
			System.out.println("\n" + jsonObject.toString() + "\n");
		}
	}


	public static JsonObject core(JsonObject input)
	{
		if (input == null) {
			System.err.println("\nCould not process a null input.\n");
			return null;
		}

		Car car = getCarFromJson(input);
		ArrayList<Coord> userSteps = getUserStepsFromJson(input);
		ArrayList<Station> stations = getStationsFromJson(input);

		if (car == null || userSteps == null || stations == null) {
			System.err.println("\nError while parsing the input json.\n");
			return null;
		}

		// Request 1 - replacing mockStepLengths():
		JsonObject stepLengthsJson = QueryAPIs.queryRoute("route", userSteps);
		// safeJsonPrinting(stepLengthsJson);

		if (stepLengthsJson == null) {
			System.err.println("\nError in the first route request.\n");
			return null;
		}

		ArrayList<Double> stepLengths = getStepLengthsFromJson(stepLengthsJson);

		if (stepLengths == null) {
			System.err.println("\nError while parsing 'stepLengthsJson'.\n");
			return null;
		}

		ArrayList<Coord> path = Pathfinding.pathfinding(car, userSteps, stations, stepLengths);

		if (path == null) {
			System.err.println("\nPathfinding failed.\n");
			return null;
		}

		// Request 2 - getting the full path:
		JsonObject fullPathJson = QueryAPIs.queryRoute("route", userSteps);
		// safeJsonPrinting(fullPathJson);

		if (fullPathJson == null) {
			System.err.println("\nError in the second route request.\n");
			return null;
		}

		ArrayList<Coord> fullPath = getPathFromJson(fullPathJson);

		if (fullPath == null) {
			System.err.println("\nError while parsing 'fullPathJson'.\n");
			return null;
		}

		double duration = Pathfinding.pathDuration(fullPath);
		double cost = Pathfinding.pathCost(fullPath);

		return buildAnswer(fullPath, duration, cost);
	}


	public static void main(String[] args)
	{
		String inputString = FileContent.read("input_example.json");
		JsonObject input = GetJson.jsonFromString(inputString);
		JsonObject output = core(input);
		safeJsonPrinting(output);
	}
}
