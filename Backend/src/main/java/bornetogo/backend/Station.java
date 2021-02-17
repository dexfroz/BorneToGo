package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;
import java.sql.*;


// TODO: fetch payment data from 'idPayment'. Note that this is probably
// useless as of now, since the 'Paiement' table contains nothing useful.

public class Station extends Coord
{
	private int idStation;
	private int idPayment;
	private String paymentStatus = "";
	private ArrayList<Integer> chargingPointsID = new ArrayList<Integer>(); // more memory efficient to store IDs.


	public Station()
	{
		super(0, 0, "", "");
		this.isStation = true;
	}


	// For testing. Real stations come from the database.
	public Station(double latitude, double longitude, String name, String address)
	{
		super(latitude, longitude, name, address);
		this.isStation = true;
	}


	public Station query(ResultSet answer)
	{
		Station s = new Station();

		try	{
			s.idStation = answer.getInt("idStation");
			s.idPayment = answer.getInt("idPaiement");
			s.name = Table.sanitize(answer.getString("Titre"));
			s.latitude = answer.getDouble("Latitude");
			s.longitude = answer.getDouble("Longitude");
			String address = Table.sanitize(answer.getString("Adresse"));
			String city = Table.sanitize(answer.getString("Ville"));
			String zipCode = Table.sanitize(answer.getString("Codepostal"));
			s.address = address + " " + city + " " + zipCode;

			// String row = "-> " + s.idStation + ", " + s.idPayment + ", " + s.name + ", " + s.latitude +
			// 	", " + s.longitude + ", " + address + ", " + city + ", " + zipCode;
			// System.out.println(row);

			return s;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getID()
	{
		return this.idStation;
	}


	public int getIDPayment()
	{
		return this.idPayment;
	}


	public String getPaymentStatus()
	{
		return this.paymentStatus;
	}


	public ArrayList<Integer> getChargingPointsID()
	{
		return this.chargingPointsID;
	}


	// Loads on demand the charging points for this station.
	// This is not to be kept in memory for all stations at all times.
	public ArrayList<ChargingPoint> getChargingPoints()
	{
		ArrayList<ChargingPoint> allChargingPoints = DatabaseConnector.getChargingPoints();
		ArrayList<ChargingPoint> stationChargingPoints = new ArrayList<ChargingPoint>();

		if (this.chargingPointsID == null) {
			System.err.println("\nCould not get the charging points of a station: null 'chargingPointsID'.\n");
			return stationChargingPoints;
		}

		if (allChargingPoints == null) {
			System.err.println("\nCould not get the charging points of a station: database loading failed.\n");
			return stationChargingPoints;
		}

		for (int id : this.chargingPointsID)
		{
			// This does not assume any good property on IDs:
			for (ChargingPoint c : allChargingPoints)
			{
				if (c.getID() == id) {
					stationChargingPoints.add(c);
					break;
				}
			}
		}

		if (stationChargingPoints.size() != this.chargingPointsID.size()) {
			System.err.println("\nSome charging points IDs where invalid.\n");
		}

		return stationChargingPoints;
	}


	public JsonObject getJsonData(Car car)
	{
		// The backend needs to output all compatible charging points - available or not!
		ArrayList<ChargingPoint> compatibleChargingPoints = getCompatibleChargingPoints(car);

		JsonArrayBuilder chargingPointsBuilder = Json.createArrayBuilder();

		for (ChargingPoint chargingPoint : compatibleChargingPoints) {
			chargingPointsBuilder.add(chargingPoint.toJson());
		}

		JsonArray chargingPointsArray = chargingPointsBuilder.build();

		return Json.createObjectBuilder()
			.add("paymentStatus", this.paymentStatus)
			.add("bornes", chargingPointsArray)
			.build();
	}


	public boolean hasUsableCompatibleChargingPoint(Car car)
	{
		return true; // TODO, using the car and list of charging points.
	}


	// This must _not_ filter charging points on availability:
	public ArrayList<ChargingPoint> getCompatibleChargingPoints(Car car)
	{
		// TODO, using the car and list of charging points.
		return this.getChargingPoints();
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
