package main.java.bornetogo.backend;

import java.util.*;
import jakarta.json.*;


public class Output
{
	// Returns null on failure.
	public static JsonObject build(ArrayList<Route> routes, Car car, long startTime)
	{
		try
		{
			// routesArray:

			JsonArrayBuilder routesBuilder = Json.createArrayBuilder();

			for (Route route : routes)
			{
				// Stats:

				JsonObject statsJson = Json.createObjectBuilder().build(); // TODO! Expand route.getStats()

				// "stats":
				// {
				// 	"moneySavings": 12.30,
				// 	"carbonEmissionSavings": 0.123,
				// 	"lightBulbsNumber": 3,
				// 	"wattage": 5,
				// 	"days": 12
				// }

				// waypoints:

				JsonArrayBuilder waypointsBuilder = Json.createArrayBuilder();

				for (Coord coord : route.getWaypoints()) {
					waypointsBuilder.add(coord.toJsonFull(Coord.Format.LONG_LAT, car));
				}

				JsonArray waypointsArray = waypointsBuilder.build();

				// legs:

				JsonArrayBuilder legsBuilder = Json.createArrayBuilder();

				for (int i = 0; i < route.getLegsLengths().size(); ++i)
				{
					JsonObject legJson = Json.createObjectBuilder()
						.add("length", route.getLegsLengths().get(i))
						.add("duration", route.getLegsDurations().get(i))
						.build();

					legsBuilder.add(legJson);
				}

				JsonArray legsArray = legsBuilder.build();

				// fullPathJson:

				JsonObject fullPathJson = Json.createObjectBuilder()
					.add("length", route.getLength())
					.add("duration", route.getDuration())
					.add("cost", route.getCost())
					.add("autonomyLeft", route.getAutonomyLeft())
					.add("legs", legsArray)
					.add("geometry", route.getGeometry())
					.build();

				// routeJson:

				JsonObject routeJson = Json.createObjectBuilder()
					.add("stats", statsJson)
					.add("waypoints", waypointsArray)
					.add("fullPath", fullPathJson)
					.build();

				routesBuilder.add(routeJson);
			}

			JsonArray routesArray = routesBuilder.build();

			// output:

			long endTime = System.nanoTime();
			double processingTime = (endTime - startTime) / 1e9; // in seconds.
			processingTime = Math.round(processingTime * 1000.) / 1000.; // rounding to 3 decimal places.

			JsonObject output = Json.createObjectBuilder()
				.add("type", "output")
				.add("status", "Ok")
				.add("processingTime", processingTime)
				.add("convention", "long-lat")
				.add("routes", routesArray)
				.build();

			return output;
		}
		catch (Exception e) {
			e.printStackTrace();
			System.err.println("\nError while building the output json.\n");
			return null;
		}
	}
}
