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
			// .add("things", 0) // add this station data...
			.build();
	}


	public Boolean hasCompatibleChargingPoint(Car car)
	{
		return true; // TODO, using the car and list of charging points.
	}


	// In seconds.
	public double getChargingDuration(Car car)
	{
		return 0.; // TODO
	}


	// In euros.
	public double getChargingCost(Car car)
	{
		return 0.; // TODO
	}


	// For testing only:
	public static ArrayList<Station> mock()
	{
		ArrayList<Station> allStations = new ArrayList<Station>();
		allStations.add(new Station(43.18333, 5.71667, "Station 0", "Saint Cyr-sur-Mer"));
		allStations.add(new Station(43.52916, 5.43638, "Station 1", "Aix-en-Provence"));
		allStations.add(new Station(43.96512, 4.81899, "Station 2", "Avignon"));
		allStations.add(new Station(44.54774, 4.78249, "Station 3", "Montélimar"));
		allStations.add(new Station(44.95311, 4.90094, "Station 4", "Valence"));
		allStations.add(new Station(45.36394, 4.83675, "Station 5", "Roussillon"));
		allStations.add(new Station(46.29772, 4.84272, "Station 6 ", "Mâcon"));
		allStations.add(new Station(47.04845, 4.81543, "Station 7", "Beaune"));
		allStations.add(new Station(47.58339, 5.20597, "Station 8", "Selongey"));
		allStations.add(new Station(47.86140, 5.34153, "Station 9", "Langres"));
		allStations.add(new Station(48.31764, 4.12017, "Station 10", "Troyes"));
		allStations.add(new Station(48.19592, 3.28644, "Station 11", "Sens"));
		allStations.add(new Station(48.37708, 3.00335, "Station 12", "Montereau"));
		allStations.add(new Station(48.53482, 2.66751, "Station 13", "Melun"));
		return allStations;
	}


	// For load testing only:
	public static ArrayList<Station> bigMock()
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
			allStations.add(new Station(randomLat, randomLong, "Station " + i, "Somewhere " + i));
		}

		return allStations;
	}


	public static void main(String[] args)
	{
		Station station = new Station(43.1, 5.9, "Station de Jacques", "Roquefort-la-Bédoule");
		System.out.println(station.toString());
	}
}
