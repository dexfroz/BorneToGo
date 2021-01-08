package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.net.*;
import java.nio.charset.*;
import jakarta.json.*;


public class QueryAPIs
{
	public static final String GEOCODING_OPTION = "&pretty=1&no_annotations=0&limit=1";
	public static final String ROUTE_QUERY_OPTION = "alternatives=true&overview=full&geometries=geojson";


	// Encode a string using UTF-8 encoding scheme:
	public static String encodeString(String str)
	{
		try	{
			return URLEncoder.encode(str, StandardCharsets.UTF_8.toString());
		}
		catch (Exception e) {
			System.err.printf("\nERROR in 'encodeString'!\n");
			return null;
		}
	}


	// For geocoding queries:
	private static String encodeCoord(Double[] coord)
	{
		return Double.toString(coord[0]) + '+' + Double.toString(coord[1]);
	}


	// For queryRoute():
	private static String formatCoordinateList(ArrayList<Double[]> coordinates)
	{
		String answer = "";
		for (Double[] coord : coordinates) {
			answer += coord[0].toString() + ',' + coord[1].toString() + ';';
		}

		return answer.substring(0, answer.length() - 1);
	}


	public static JsonObject queryRoute(String routeMode, ArrayList<Double[]> coordinates, String options)
	{
		String url = "http://router.project-osrm.org/" + routeMode + "/v1/car/" + formatCoordinateList(coordinates) +
					 ".json?" + options;
		return GetJson.jsonFromUrl(url);
	}


	private static JsonObject queryGeocoding(String token, String request, String options)
	{
		String url = "https://api.opencagedata.com/geocode/v1/json?key=" + token + "&q=" + request + options;
		return GetJson.jsonFromUrl(url);
	}


	public static JsonObject queryFromCoord(String token, Double[] coord)
	{
		return queryGeocoding(token, encodeCoord(coord), GEOCODING_OPTION);
	}


	public static JsonObject queryFromLocation(String token, String searchedLocation)
	{
		return queryGeocoding(token, encodeString(searchedLocation), GEOCODING_OPTION);
	}


	public static void safeJsonPrinting(JsonObject jsonObject)
	{
		if (jsonObject != null) {
			System.out.println("\n" + jsonObject.toString() + "\n");
		}
	}


	// First arg must be the API key!
	public static void main(String[] args)
	{
		////////////////////////////////////////////////////////////////
		// URL encoding of a string:

		String baseUrl = "https://www.google.com/search?q=";
		String query = "Mer Méditerranée";

		String encodedQuery = encodeString(query); // Encoding a query string

		String completeUrl = baseUrl + encodedQuery;
		System.out.println("\n" + completeUrl + "\n");

		////////////////////////////////////////////////////////////////
		// Geocoding queries - from a place, and from coordinates:

		if (args.length >= 1)
		{
			String token = args[0];

			String searchedLocation = "Isen Toulon";
			Double[] target = {48.880931, 2.355323};

			JsonObject json_2 = queryFromLocation(token, searchedLocation);
			safeJsonPrinting(json_2);

			JsonObject json_3 = queryFromCoord(token, target);
			safeJsonPrinting(json_3);
		}

		////////////////////////////////////////////////////////////////
		// Finding a route data from a list of coordinates:

		String routeMode = "route";
		// String routeMode = "nearest";

		Double[] point_0 = {13.388860, 52.517037};
		Double[] point_1 = {13.397634, 52.529407};
		Double[] point_2 = {13.428555, 52.523219};

		ArrayList<Double[]> routeCoordinates = new ArrayList<Double[]>();
		routeCoordinates.add(point_0);
		routeCoordinates.add(point_1);
		routeCoordinates.add(point_2);

		JsonObject json_4 = queryRoute(routeMode, routeCoordinates, ROUTE_QUERY_OPTION);
		safeJsonPrinting(json_4);

		////////////////////////////////////////////////////////////////

		// Careful! In what precedes, a JsonObject may be null in case of failure, this
		// will need to be handled by the whole API!
	}
}
