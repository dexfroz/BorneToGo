package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.net.*;
import java.nio.charset.*;
import jakarta.json.*;


public class QueryAPIs
{
	// Each API key is to be stored in the src/main/resources/secret directory,
	// in a file with the service as name. This directory should be added to .gitignore.
	private static String loadAPIkey(String service)
	{
		try
		{
			String filename = "secret/" + service;
			String content = FileContent.read(filename);
			int endIndex = content.indexOf("\n");

			if (endIndex != -1) {
				content = content.substring(0, endIndex);
			}

			return content;
		}
		catch (Exception e) {
			System.err.println("\nNo API key found for the service: " + service + "\n");
			e.printStackTrace();
			return "";
		}
	}


	// Encode a string using UTF-8 encoding scheme:
	public static String encodeStringUTF8(String str)
	{
		try	{
			return URLEncoder.encode(str, StandardCharsets.UTF_8.toString());
		}
		catch (Exception e) {
			System.err.printf("\nERROR in 'encodeStringUTF8'!\n");
			return null;
		}
	}


	private static String encodeLocation(String location)
	{
		return encodeStringUTF8(location) + ",france";
	}


	private static String encodeCoord(String service, Coord coord)
	{
		String latitudeStr = Double.toString(coord.getLatitude());
		String longitudeStr = Double.toString(coord.getLongitude());
		char separator = service.equals("opencagedata") ? '+' : ',';
		return latitudeStr + separator + longitudeStr; // Lat, long format.
	}


	private static String formatCoordinateList(ArrayList<Coord> coordinates)
	{
		String answer = "";
		for (Coord coord : coordinates) {
			// Long, lat format!
			answer += Double.toString(coord.getLongitude()) + ',' + Double.toString(coord.getLatitude()) + ';';
		}

		return answer.substring(0, answer.length() - 1);
	}


	// Careful! Json structure will change depending on service!
	private static JsonObject queryGeocodingByBatch(String service, ArrayList<String> requests)
	{
		if (requests == null || requests.size() == 0) {
			System.err.println("No requests supplied in 'queryGeocodingByBatch'.");
			return null;
		}

		String apiKey = loadAPIkey(service);
		if (apiKey.equals("")) {
			return null;
		}

		if (service.equals("opencagedata"))
		{
			if (requests.size() > 1) {
				System.err.println("Warning! opencagedata does not support batch requests!");
				return null;
			}

			String request = requests.get(0);
			String options = "&pretty=0&no_annotations=1&limit=1";
			String url = "https://api.opencagedata.com/geocode/v1/json?key=" + apiKey + "&q=" + request + options;
			return GetJson.jsonFromUrl(url);
		}

		else if (service.equals("mapquestapi"))
		{
			String requestbatch = "";
			for (String request : requests) {
				requestbatch += "&location=" + request;
			}

			String options = "&thumbMaps=false&maxResults=1"; // no metadata, slightly faster.
			// String options = "&thumbMaps=false&includeNearestIntersection=true&includeRoadMetadata=true&maxResults=1";
			String url = "http://www.mapquestapi.com/geocoding/v1/batch?key=" + apiKey +
						 "&outFormat=json" + requestbatch + options;

			System.out.println("\n=> Geocoding query:\n\n-> " + url + "\n");
			return GetJson.jsonFromUrl(url);
		}

		else {
			System.err.println("Unsupported service supplied in 'queryGeocodingByBatch'.");
			return null;
		}
	}


	public static JsonObject queryFromLocation(String service, ArrayList<String> locations)
	{
		ArrayList<String> requests = new ArrayList<String>();

		for (String location : locations) {
			requests.add(encodeLocation(location));
		}

		return queryGeocodingByBatch(service, requests);
	}


	public static JsonObject queryFromCoord(String service, ArrayList<Coord> coords)
	{
		ArrayList<String> requests = new ArrayList<String>();

		for (Coord coord : coords) {
			requests.add(encodeCoord(service, coord));
		}

		return queryGeocodingByBatch(service, requests);
	}


	// Careful! Json structure will change depending on routeMode!
	public static JsonObject queryRoute(String routeMode, ArrayList<Coord> coordinates, String additionalOptions)
	{
		if (coordinates == null || coordinates.size() == 0) {
			System.err.println("No coordinates supplied in 'queryRoute'.");
			return null;
		}

		String fullOptions = "";

		// Finds the fastest route between coordinates in the supplied order:
		if (routeMode.equals("route")) {
			fullOptions = "geometries=geojson&alternatives=false" + additionalOptions;
		}

		// Snaps a coordinate to the street network and returns the nearest n matches (n forced to 1):
		else if (routeMode.equals("nearest")) {
			fullOptions = "number=1";

			if (coordinates.size() > 1) {
				System.err.println("Route mode 'nearest' only supports 1 coordinate!");
				return null;
			}
		}

		// The trip plugin solves the Traveling Salesman Problem using a greedy heuristic:
		else if (routeMode.equals("trip")) {
			fullOptions = "geometries=geojson&steps=true&overview=false&annotations=true";
		}

		else {
			System.err.println("Unsupported service supplied in 'queryRoute'.");
			return null;
		}

		String url = "http://router.project-osrm.org/" + routeMode + "/v1/car/" +
					 formatCoordinateList(coordinates) + ".json?" + fullOptions;

		System.out.println("\n=> Route query:\n\n-> " + url + "\n");
		return GetJson.jsonFromUrl(url);
	}


	public static void main(String[] args)
	{
		////////////////////////////////////////////////////////////////
		// URL encoding of a string:

		String baseUrl = "https://www.google.com/search?q=";
		String query = "Mer Méditerranée";

		String encodedQuery = encodeStringUTF8(query); // Encoding a query string.

		String completeUrl = baseUrl + encodedQuery;
		System.out.println("\n" + completeUrl + "\n");

		////////////////////////////////////////////////////////////////
		// Finding a route data from a list of coordinates:

		// ArrayList<Coord> routeCoordinates = new ArrayList<Coord>();
		// routeCoordinates.add(new Coord(43.124228, 5.928, "Départ", "Toulon"));
		// routeCoordinates.add(new Station(43.183331, 5.71667, "La station de Gégé", "Saint Cyr-sur-Mer"));
		// routeCoordinates.add(new Coord(43.296482, 5.36978, "Arrivée", "Marseille"));

		// // The trip plugin solves the Traveling Salesman Problem using a greedy heuristic:
		// JsonObject json_1 = queryRoute("trip", routeCoordinates, "");
		// GetJson.safeJsonPrinting(json_1);

		// // Finds the fastest route between coordinates in the supplied order:
		// JsonObject json_2 = queryRoute("route", routeCoordinates, "&overview=full");
		// GetJson.safeJsonPrinting(json_2);

		// ArrayList<Coord> onlyOneCoord = new ArrayList<Coord>();
		// onlyOneCoord.add(new Coord(47.34083, 5.05015, "Le barathon", "Dijon"));

		// // Snaps a coordinate to the street network and returns the nearest match:
		// JsonObject json_3 = queryRoute("nearest", onlyOneCoord, "");
		// GetJson.safeJsonPrinting(json_3);

		////////////////////////////////////////////////////////////////
		// Geocoding queries - from a place, and from coordinates:

		ArrayList<String> searchedLocations = new ArrayList<String>();
		searchedLocations.add("Isen Toulon");
		JsonObject json_4 = queryFromLocation("mapquestapi", searchedLocations);
		GetJson.safeJsonPrinting(json_4);

		ArrayList<Coord> searchedCoords = new ArrayList<Coord>();
		searchedCoords.add(new Coord(48.85661, 2.3499, "Pâtisserie Montmartre", "Paris"));
		JsonObject json_5 = queryFromCoord("opencagedata", searchedCoords);
		GetJson.safeJsonPrinting(json_5);

		////////////////////////////////////////////////////////////////

		// Careful! In what precedes, a JsonObject may be null in case of failure,
		// this will need to be handled case by case by the whole App!
	}
}

// APIs documentations:
// - https://opencagedata.com/api
// - https://developer.mapquest.com/documentation/geocoding-api
// - http://project-osrm.org/docs/v5.5.1/api/#general-options
