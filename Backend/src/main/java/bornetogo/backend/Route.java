package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Route
{
	private double length; // in km
	private double duration; // in sec
	private double cost; // in euros
	private double autonomyLeft; // in km
	private String stats;
	private ArrayList<Coord> waypoints; // size n
	private ArrayList<Double> legsLengths; // size n-1
	private ArrayList<Double> legsDurations; // size n-1
	private JsonObject geometry; // JsonObject containing the list of coordinates of the full path.
	// N.B: faster than doing the previous JsonObject -> ArrayList<Coord> -> JsonObject conversion.


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


	public ArrayList<Double> getLegsLengths()
	{
		return this.legsLengths;
	}


	public ArrayList<Double> getLegsDurations()
	{
		return this.legsDurations;
	}


	public JsonObject getGeometry()
	{
		return this.geometry;
	}


	public String toString()
	{
		return "Route:\nLength: " + this.length + " km\nDuration: " + this.duration + " s\nCost: " +
			this.cost + " €\nAutonomy left: " + this.autonomyLeft + " km\nStatistics: " + this.stats +
			"\nWaypoints number: " + this.waypoints.size() + "\nLegs number: " + this.legsLengths.size();
	}


	public void print()
	{
		System.out.println(this.toString());
	}


	// For testing, it isn't actually useful to parse this:
	private ArrayList<Coord> getFullPath()
	{
		try
		{
			ArrayList<Coord> fullPath = new ArrayList<Coord>();
			JsonArray coordsArray = this.geometry.getJsonArray("coordinates");

			for (int j = 0; j < coordsArray.size(); ++j)
			{
				JsonArray coordJson = coordsArray.getJsonArray(j);
				Coord coord = Coord.getFromJsonArray(coordJson, "", "", Coord.Format.LONG_LAT);
				fullPath.add(coord);

				if (coord == null) {
					System.err.println("\nInvalid coord found in the full path.\n");
					return null;
				}
			}

			return fullPath;
		}
		catch (Exception e) {
			System.err.println("\nError while parsing a json: could not extract the full path.\n");
			return null;
		}
	}


	// Will complete the received waypoints with previous metadata, and replace Coords with
	// Stations where needed. Note that received name and coordinates will be kept over the input ones!
	private void completedWaypoints(ArrayList<Coord> path)
	{
		for (int i = 0; i < path.size(); ++i)
		{
			Coord coord = path.get(i);
			if (coord.isStation()) {
				this.waypoints.set(i, new Station(this.waypoints.get(i)));
			}

			Coord waypoint = this.waypoints.get(i);
			waypoint.setAddress(coord.getAddress()); // a received waypoint have no address.

			if (waypoint.getName().equals("")) {
				waypoint.setName(coord.getName());
			}
		}
	}


	// Computes the duration of the given route, including the refilling time, in sec:
	private void computeDuration(Car car)
	{
		// Note: this.duration already contains the path duration, adding the refilling time:
		for (int i = 0; i < this.waypoints.size(); ++i)
		{
			Coord currentStep = this.waypoints.get(i);

			if (currentStep.isStation()) { // refilling!
				Station station = new Station(currentStep);
				this.duration += station.getChargingDuration(car);
			}
		}
	}


	// Computes the cost of the given route, in euros:
	private void computeCost(Car car)
	{
		for (int i = 0; i < this.waypoints.size(); ++i)
		{
			Coord currentStep = this.waypoints.get(i);

			if (currentStep.isStation()) { // refilling!
				Station station = new Station(currentStep);
				this.cost += station.getChargingCost(car);
			}
		}
	}


	// 'car' object was not modified by the pathfinding, since found lengths
	// are only estimates. Real autonomy left is computed here:
	private void computeAutonomyLeft(Car car)
	{
		this.autonomyLeft = car.getCurrentAutonomy();

		for (int i = 0; i < this.legsLengths.size(); ++i)
		{
			this.autonomyLeft -= this.legsLengths.get(i);
			Coord currentStep = this.waypoints.get(i + 1);

			if (currentStep.isStation()) { // refilling!
				this.autonomyLeft = car.getMaxAutonomy();
			}
		}

		this.autonomyLeft = Math.max(0., this.autonomyLeft); // to be sure.
	}


	// Returns null on failure.
	// To complete the route with additional data, i.e station status, route duration,
	// route cost and autonomy left, give the found path as arg. Else, left it to null.
	public static Route getFromJson(JsonObject json, Car car, ArrayList<Coord> path)
	{
		try
		{
			Route route = new Route();
			route.waypoints = new ArrayList<Coord>();
			route.legsLengths = new ArrayList<Double>();
			route.legsDurations = new ArrayList<Double>();

			String status = json.getString("code");

			if (! status.equals("Ok")) {
				System.err.println("\nWrong status found in routes json.\n");
				return null;
			}

			JsonArray waypointsArray = json.getJsonArray("waypoints");

			for (int i = 0; i < waypointsArray.size(); ++i)
			{
				JsonObject waypoint = waypointsArray.getJsonObject(i);
				String foundName = waypoint.getString("name");
				JsonArray coordJson = waypoint.getJsonArray("location");
				Coord foundCoord = Coord.getFromJsonArray(coordJson, foundName, "", Coord.Format.LONG_LAT);
				route.waypoints.add(foundCoord);

				if (foundCoord == null) {
					System.err.println("\nInvalid waypoint found in routes json.\n");
					return null;
				}
			}

			JsonArray routesArray = json.getJsonArray("routes");

			for (int i = 0; i < routesArray.size(); ++i)
			{
				if (i > 0) {
					System.err.println("\nThis json contains several routes. Not supported!\n");
					break;
				}

				JsonObject routeJson = routesArray.getJsonObject(i);
				JsonArray legsArray = routeJson.getJsonArray("legs");

				for (int j = 0; j < legsArray.size(); ++j) {
					JsonObject leg = legsArray.getJsonObject(j);
					double length = leg.getJsonNumber​("distance").doubleValue() / 1000.; // in km
					double duration = leg.getJsonNumber​("duration").doubleValue(); // in sec
					route.legsLengths.add(length);
					route.legsDurations.add(duration);
				}

				route.geometry = routeJson.getJsonObject("geometry"); // null if 'geometry' not found.

				if (route.geometry == null) {
					route.geometry = Json.createObjectBuilder().build(); // empty JsonObject.
				}

				route.length = routeJson.getJsonNumber​("distance").doubleValue() / 1000.; // in km
				route.duration = routeJson.getJsonNumber​("duration").doubleValue(); // in sec
				route.stats = "";
				// cost and autonomyLeft are left to default values.
			}

			if (path != null)
			{
				if (route.waypoints.size() != path.size()) {
					System.err.println("\nDifferent number of waypoints in route creation!\n");
					return null;
				}

				route.completedWaypoints(path); // to be done first!
				route.computeDuration(car);
				route.computeCost(car);
				route.computeAutonomyLeft(car);
			}

			return route;
		}
		catch (Exception e) {
			System.err.println("\nError while parsing a json: could not extract routes.\n");
			return null;
		}
	}


	public static void main(String[] args)
	{
		long startTime = System.nanoTime();

		ArrayList<Coord> path = new ArrayList<Coord>();
		path.add(new Coord(43.124228, 5.928, "Chez Patrick", "Toulon"));
		path.add(new Station(43.183331, 5.71667, "La station de Gégé", "Saint Cyr-sur-Mer"));
		path.add(new Coord(43.296482, 5.36978, "Chez Xavier", "Marseille"));

		Car car = new Car("Tesla cybertruck", 200, 50, "None");

		JsonObject routeQuery = QueryAPIs.queryRoute("route", path, "&overview=full");
		// safeJsonPrinting(routeQuery);

		if (routeQuery == null) {
			System.err.println("\nError in the first route request.\n");
			return;
		}

		Route route = Route.getFromJson(routeQuery, car, path);

		if (route == null) {
			System.err.println("\nError while parsing 'routeQuery'.\n");
			return;
		}

		route.print();

		ArrayList<Route> routes = new ArrayList<Route>();
		routes.add(route);
		JsonObject output = Output.build(routes, startTime);

		// Core.safeJsonPrinting(output); // lots of printing...
	}
}
