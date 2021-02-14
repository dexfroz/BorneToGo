package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Station extends Coord
{
	public Station(double latitude, double longitude, String name, String address,
		String paymentStatus, ArrayList<Integer> chargingPointsID)
	{
		super(latitude, longitude, name, address);
		this.isStation = true;
		this.paymentStatus = paymentStatus;
		this.chargingPointsID = chargingPointsID;
	}


	// For testing. Real stations come from the database.
	public Station(double latitude, double longitude, String name, String address)
	{
		this(latitude, longitude, name, address, "", new ArrayList<Integer>());
	}


	public Station(Coord coord)
	{
		this(coord.latitude, coord.longitude, coord.name, coord.address, coord.paymentStatus, coord.chargingPointsID);
	}


	public String getPaymentStatus()
	{
		return this.paymentStatus;
	}


	public ArrayList<ChargingPoint> getChargingPoints()
	{
		ArrayList<ChargingPoint> allChargingPoints = DatabaseConnector.getChargingPoints();
		ArrayList<ChargingPoint> chargingPoints = new ArrayList<ChargingPoint>();

		if (allChargingPoints == null) {
			System.err.println("\nCould not get the charging points of a station: database loading failed.\n");
			return chargingPoints;
		}

		for (int id : this.chargingPointsID)
		{
			// This does not assume any good property on IDs.

			for (ChargingPoint c : allChargingPoints)
			{
				if (c.getID() == id) {
					chargingPoints.add(c);
					break;
				}
			}

			// // Assuming IDs starts from 1 and have no gaps... 

			// if (id < 1 || id > allChargingPoints.size()) {
			// 	System.err.println("\nIncorrect charging point ID.\n");
			// 	break;
			// }

			// chargingPoints.add(allChargingPoints.get(id - 1));
		}

		if (chargingPoints.size() != this.chargingPointsID.size()) {
			System.err.println("\nSome charging point IDs where invalid.\n");
		}

		return chargingPoints;
	}


	// TODO: in station data (json), return all compatible stations (available or not).
	public JsonObject getJsonData()
	{
		return Json.createObjectBuilder()
			.add("paymentStatus", this.paymentStatus)
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
