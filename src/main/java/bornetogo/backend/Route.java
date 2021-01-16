package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Route
{
	private double length;
	private double duration; // in sec
	private double cost;
	private double autonomyLeft;
	private String stats;
	private ArrayList<Coord> waypoints;
	private ArrayList<Double[]> legs; // each leg: length + duration.
	private ArrayList<Coord> fullPath;


	public double getLength()
	{
		return this.length;
	}


	public double getDuration()
	{
		return this.duration;
	}


	public double getCost()
	{
		return this.cost;
	}


	public double getAutonomyLeft()
	{
		return this.autonomyLeft;
	}


	public String getStats()
	{
		return this.stats;
	}


	public ArrayList<Coord> getWaypoints()
	{
		return this.waypoints;
	}


	public ArrayList<Double[]> getLegs()
	{
		return this.legs;
	}


	public ArrayList<Coord> getFullPath()
	{
		return this.fullPath;
	}


	public void updateCurrentAutonomy(Car car)
	{
		this.autonomyLeft = car.getCurrentAutonomy();
	}


	public String toString()
	{
		return "Route:\nLength: " + Double.toString(this.length) + " km\nDuration: " + Double.toString(this.duration) +
			" s\nCost: " + Double.toString(this.cost) + " €\nAutonomy left: " + Double.toString(this.autonomyLeft) +
			" km\nStatistics: " + this.stats + "\nWaypoints number: " + Integer.toString(this.waypoints.size()) + "\nLegs number: " +
			Integer.toString(this.legs.size()) + "\nTotal points number: " + Integer.toString(this.fullPath.size());
	}


	public void print()
	{
		System.out.println(this.toString());
	}


	// Computes the duration of the given route, in sec:
	public void computeDuration()
	{
		return; // TODO.
	}


	// Computes the cost of the given route:
	public void computeCost()
	{
		return; // TODO.
	}


	public ArrayList<Double> getLegsLengths()
	{
		if (this == null) {
			System.err.println("\nCannot extract legs length from a null route.\n");
			return null;
		}

		ArrayList<Double[]> legs = this.legs;
		ArrayList<Double> stepLengths = new ArrayList<Double>();

		for (Double[] leg : legs)
		{
			if (leg.length < 2) {
				System.err.println("\nIncorrect leg.\n");
				return null;
			}

			stepLengths.add(leg[0]);
		}

		return stepLengths;
	}


	// Returns null on failure.
	public static Route getFromJson(JsonObject json)
	{
		try
		{
			Route route = new Route();
			route.waypoints = new ArrayList<Coord>();
			route.legs = new ArrayList<Double[]>();
			route.fullPath = new ArrayList<Coord>();

			String status = json.getString("code");

			if (!status.equals("Ok")) {
				System.err.println("\nWrong status found in routes json.\n");
				return null;
			}

			JsonArray waypointsArray = json.getJsonArray("waypoints");

			for (int i = 0; i < waypointsArray.size(); ++i)
			{
				JsonObject waypoint = waypointsArray.getJsonObject(i);
				String name = waypoint.getString("name");
				JsonArray coordJson = waypoint.getJsonArray("location");
				Coord coord = Coord.getFromJsonArray(coordJson, name, "", Coord.Format.LONG_LAT);
				route.waypoints.add(coord);
			}

			JsonArray routesArray = json.getJsonArray("routes");

			for (int i = 0; i < routesArray.size(); ++i)
			{
				if (i > 0) {
					System.err.println("\nThis json contains several routes!\n");
					break;
				}

				JsonObject routeJson = routesArray.getJsonObject(i);
				JsonArray legsArray = routeJson.getJsonArray("legs");

				for (int j = 0; j < legsArray.size(); ++j) {
					JsonObject leg = legsArray.getJsonObject(j);
					double length = leg.getJsonNumber​("distance").doubleValue() / 1000.; // in km
					double duration = leg.getJsonNumber​("duration").doubleValue(); // in sec
					Double[] legContent = new Double[] {length, duration};
					route.legs.add(legContent);
				}

				JsonObject geometry = routeJson.getJsonObject("geometry");
				JsonArray coordsArray = geometry.getJsonArray("coordinates");

				for (int j = 0; j < coordsArray.size(); ++j)
				{
					JsonArray coordJson = coordsArray.getJsonArray(j);
					Coord coord = Coord.getFromJsonArray(coordJson, "", "", Coord.Format.LONG_LAT);
					route.fullPath.add(coord);
				}

				route.length = routeJson.getJsonNumber​("distance").doubleValue() / 1000.; // in km
				route.duration = routeJson.getJsonNumber​("duration").doubleValue(); // in sec
				route.stats = "";
				// cost and autonomyLeft are left to default values.
			}

			return route;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nError while parsing a json: could not extract routes.\n");
			return null;
		}
	}


	public static void main(String[] args)
	{
		ArrayList<Coord> userSteps = new ArrayList<Coord>();

		userSteps.add(new Coord(43.124228, 5.928, "Toulon", ""));
		userSteps.add(new Coord(43.183331, 5.71667, "La station de Gégé", "Saint Cyr-sur-Mer"));
		userSteps.add(new Coord(43.124228, 5.928, "Toulon", ""));

		JsonObject routeQuery = QueryAPIs.queryRoute("route", userSteps);
		// safeJsonPrinting(routeQuery);

		if (routeQuery == null) {
			System.err.println("\nError in the first route request.\n");
			return;
		}

		Route route = Route.getFromJson(routeQuery);

		if (route == null) {
			System.err.println("\nError while parsing 'routeQuery'.\n");
			return;
		}

		route.print();

		// // This is quite long to print:
		// ArrayList<Route> routes = new ArrayList<Route>();
		// routes.add(route);
		// JsonObject json = Output.buildAnswer(routes);
		// Core.safeJsonPrinting(json);
	}
}
