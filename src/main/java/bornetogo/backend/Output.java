package main.java.bornetogo.backend;

import java.util.*;
import jakarta.json.*;


public class Output
{
	public static JsonObject buildAnswer(ArrayList<Route> routes)
	{
		// routesArray:

		JsonArrayBuilder routesBuilder = Json.createArrayBuilder();

		for (Route route : routes)
		{
			// waypoints:

			JsonArrayBuilder waypointsBuilder = Json.createArrayBuilder();

			for (Coord coord : route.getWaypoints()) {
				waypointsBuilder.add(coord.toJsonFull()); // full info
			}

			JsonArray waypointsArray = waypointsBuilder.build();

			// legs:

			JsonArrayBuilder legsBuilder = Json.createArrayBuilder();

			for (Double[] leg : route.getLegs())
			{
				JsonObject legJson = Json.createObjectBuilder()
					.add("length", leg[0])
					.add("duration", leg[1])
					.build();

				legsBuilder.add(legJson);
			}

			JsonArray legsArray = legsBuilder.build();

			// coordinates:

			JsonArrayBuilder coordsBuilder = Json.createArrayBuilder();

			for (Coord coord : route.getFullPath()) {
				coordsBuilder.add(coord.toJsonSmall());
			}

			JsonArray coordsArray = coordsBuilder.build();

			// geometry:

			JsonObject geometry = Json.createObjectBuilder()
				.add("coordinates", coordsArray)
				.build();

			// fullPathJson:

			JsonObject fullPathJson = Json.createObjectBuilder()
				.add("length", route.getLength())
				.add("duration", route.getDuration())
				.add("cost", route.getCost())
				.add("autonomyLeft", route.getAutonomyLeft())
				.add("stats", route.getStats())
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
}
