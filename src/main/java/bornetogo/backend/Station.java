package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Station extends Coord
{
	// TODO: must contain a list of charging points, and other stats.


	public Station(double latitude, double longitude, String name, String address)
	{
		super(latitude, longitude, name, address);
		this.isStation = true;
	}


	public Station(Coord coord)
	{
		super(coord.latitude, coord.longitude, coord.name, coord.address);
		this.isStation = true;
	}


	// TODO: add stations specific data:
	public JsonObject getJsonData()
	{
		return Json.createObjectBuilder()
			// .add("things", 0)
			.build();
	}


	public Boolean hasCompatibleChargingPoint(Car car)
	{
		return true; // TODO, using the car and list of charging points.
	}


	// For testing only:
	public static ArrayList<Station> mockStations()
	{
		ArrayList<Station> allStations = new ArrayList<Station>();
		allStations.add(new Station(43.183331, 5.71667, "Station", "Saint Cyr-sur-Mer"));
		allStations.add(new Station(43.52916, 5.43638, "Station", "Aix-en-Provence"));
		allStations.add(new Station(43.96512, 4.81899, "Station", "Avignon"));
		allStations.add(new Station(44.54774, 4.78249, "Station", "Montélimar"));
		allStations.add(new Station(44.95311, 4.90094, "Station", "Valence"));
		allStations.add(new Station(45.36394, 4.83675, "Station", "Roussillon"));
		allStations.add(new Station(46.29772, 4.84272, "Station", "Mâcon"));
		allStations.add(new Station(47.04845, 4.81543, "Station", "Beaune"));
		allStations.add(new Station(47.58339, 5.20597, "Station", "Selongey"));
		allStations.add(new Station(47.86140, 5.34153, "Station", "Langres"));
		allStations.add(new Station(48.31764, 4.12017, "Station", "Troyes"));
		allStations.add(new Station(48.19592, 3.28644, "Station", "Sens"));
		allStations.add(new Station(48.37708, 3.00335, "Station", "Montereau"));
		allStations.add(new Station(48.53482, 2.66751, "Station", "Melun"));
		return allStations;
	}


	// For load testing only:
	public static ArrayList<Station> bigMockStations()
	{
		Random r = new Random();

		int stationNumber = 10000;
		double latMin = 43., latMax = 50.;
		double longMin = -0.5, longMax = 8.;

		ArrayList<Station> allStations = new ArrayList<Station>();

		for (int i = 0; i < stationNumber; ++i)
		{
			double randomLat = latMin + (latMax - latMin) * r.nextDouble();
			double randomLong = longMin + (longMax - longMin) * r.nextDouble();
			allStations.add(new Station(randomLat, randomLong, String.valueOf(i), ""));
		}

		return allStations;
	}


	public static void main(String[] args)
	{
		Station station = new Station(43.1, 5.9, "Station de Jacques", "Roquefort-la-Bédoule");
		System.out.println(station.toString());
	}
}
