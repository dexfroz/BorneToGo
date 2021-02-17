package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.sql.*;


public class DatabaseConnector
{
	private static boolean areCarsLoaded = false;
	private static boolean areStationsLoaded = false;
	private static boolean areChargingPointsLoaded = false;

	// Those will be kept in memory:
	private static ArrayList<Car> cars = null;
	private static ArrayList<Station> stations = null;
	private static ArrayList<ChargingPoint> chargingPoints = null;


	public static ArrayList<Car> getCars()
	{
		if (! areCarsLoaded) {
			Table table = new Car();
			cars = table.loadTable("Voiture");
			areCarsLoaded = cars.size() > 0;

			if (areCarsLoaded) {
				// loadCarMissingData();
			}
			else {
				System.err.println("\nCould not get real cars, using mock data...\n");
				cars = Car.mock();
			}
		}

		return cars;
	}


	public static ArrayList<Station> getStations()
	{
		if (! areStationsLoaded) {
			Table table = new Station();
			stations = table.loadTable("Station");
			areStationsLoaded = stations.size() > 0;

			if (areStationsLoaded) {
				// loadStationChargingPoints(); // fetching the chargingPointsIDs.
			}
			else {
				System.err.println("\nCould not get real stations, using mock data...\n");
				// stations = Station.mock();
				stations = Station.bigMock();
			}
		}

		return stations;
	}


	public static ArrayList<ChargingPoint> getChargingPoints()
	{
		if (! areChargingPointsLoaded) {
			Table table = new ChargingPoint();
			chargingPoints = table.loadTable("Borne");
			areChargingPointsLoaded = chargingPoints.size() > 0;
		}

		return chargingPoints;
	}


	// TODO: save this?
	public static ArrayList<Battery> getBatteries()
	{
		Table table = new Battery();
		ArrayList<Battery> batteries = table.loadTable("Batterie");
		return batteries;
	}


	// TODO: save this?
	public static ArrayList<Status> getStatuses()
	{
		Table table = new Status();
		ArrayList<Status> statuses = table.loadTable("Status");
		return statuses;
	}


	// TODO: save this?
	public static ArrayList<Current> getCurrents()
	{
		Table table = new Current();
		ArrayList<Current> currents = table.loadTable("Courant");
		return currents;
	}


	// TODO: save this?
	public static ArrayList<Connector> getConnectors()
	{
		Table table = new Connector();
		ArrayList<Connector> connectors = table.loadTable("Connecteur");
		return connectors;
	}


	// TODO: save this?
	public static ArrayList<Payment> getPayments()
	{
		Table table = new Payment();
		ArrayList<Payment> payments = table.loadTable("Paiement");
		return payments;
	}


	// The result of this function should be closed at its end life.
	public static Connection getConnection()
	{
		String database = "BorneToGo";
		String user = "root";
		String pwd = "aaa"; // this could be dehardcoded.

		int port = 3306;
		String protocol = "jdbc:mysql://";
		String options = "?useSSL=false"; // necessary for requesting from the container.

		ArrayList<String> ipCandidates = new ArrayList<String>();
		ipCandidates.add("database"); // service name = container IP. Always checked first.
		ipCandidates.add("localhost"); // host IP.

		Connection connection = null;
		String warningStatus = "Warning";

		for (String ip : ipCandidates)
		{
			String url = protocol + ip + ":" + port + "/" + database + options;

			try
			{
				Class.forName("com.mysql.cj.jdbc.Driver");
				connection = DriverManager.getConnection(url, user, pwd); // Will raise an exception on failure!
				System.out.println("\n-> Successful connection to the database with URL: " + url + "\n");
				break;
			}
			catch (Exception e) {
				// e.printStackTrace();
				System.err.println("\n" + warningStatus + ": failed connection to the database with URL: " + url);
				warningStatus = "Error";
			}
		}

		return connection;
	}


	// Returns a string containing the list of tables:
	public static String getTables()
	{
		String query = "SHOW TABLES;";
		String result = "Tables:\n\n";

		try
		{
			Connection connection = DatabaseConnector.getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next()) {
				result += answer.getString(1) + "\n";
			}

			connection.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			result = "No tables found.\n";
			System.err.println("\n" + result + "\n");
		}

		return result;
	}


	// Returns the number of entries in the given table:
	public static String getTableSize(String table)
	{
		String query = "SELECT COUNT(*) AS entriesNumber FROM " + table + ";";
		String result = "Number of entries in table '" + table + "': ";

		try
		{
			Connection connection = DatabaseConnector.getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next()) {
				result += String.valueOf(answer.getInt(1));
			}

			connection.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			result = "No table '" + table + "' found.";
			System.err.println("\n" + result + "\n");
		}

		return result;
	}


	// // Checks if the Station table has entries of ID in increasing order,
	// // from 1, and without gaps, in order to activate the fast filling mode:
	// private static boolean checkStationsIDrange()
	// {
	// 	if (stations.get(0).getID() != 1) {
	// 		return false;
	// 	}

	// 	for (int i = 1; i < stations.size() - 1; ++i) {
	// 		if (stations.get(i + 1).getID() - stations.get(i).getID() != 1) { // gap detected.
	// 			return false;
	// 		}
	// 	}

	// 	return true;
	// }


	// private static void loadStationChargingPoints()
	// {
	// 	if (stations == null) {
	// 		System.err.println("\nCannot load the station-charging points IDs: null stations.\n");
	// 		return;
	// 	}

	// 	boolean stationsCheckResult = checkStationsIDrange();
	// 	System.out.println("Fast mode status: " + stationsCheckResult);

	// 	String query = "SELECT * FROM StationBorne;";
	// 	int count = 0;

	// 	try
	// 	{
	// 		Connection connection = getConnection();
	// 		Statement statement = connection.createStatement();
	// 		ResultSet answer = statement.executeQuery(query);

	// 		while (answer.next())
	// 		{
	// 			int idStationChargingPoint = answer.getInt("idStationBorne");
	// 			int idStation = answer.getInt("idStation");
	// 			int idChargingPoint = answer.getInt("idBorne");

	// 			// String row = "-> " + idStationChargingPoint + ", " + idStation + ", " + idChargingPoint;
	// 			// System.out.println(row);

	// 			boolean stationFound = false;

	// 			if (stationsCheckResult) // fast mode!
	// 			{
	// 				// This assumes 'idStation' values to be in increasing order, and without gaps:
	// 				if (1 <= idStation && idStation <= stations.size()) {
	// 					Station station = stations.get(idStation - 1);
	// 					station.getChargingPointsID().add(idChargingPoint);
	// 					stationFound = true;
	// 					++count;
	// 				}
	// 			}
	// 			else // This assumes nothing on stations IDs:
	// 			{
	// 				for (Station station : stations)
	// 				{
	// 					if (station.getID() == idStation) {
	// 						station.getChargingPointsID().add(idChargingPoint);
	// 						stationFound = true;
	// 						++count;
	// 						break;
	// 					}
	// 				}
	// 			}

	// 			if (! stationFound) {
	// 				System.err.println("Could not add a charging point ID for station of ID: " + idStation);
	// 			}
	// 		}

	// 		connection.close();
	// 	}
	// 	catch (Exception e) {
	// 		// e.printStackTrace();
	// 		System.err.println("\nInvalid SQL query: '" + query + "'\n");
	// 	}

	// 	System.out.println("Loaded " + count + " charging point IDs.\n");
	// }


	public static void main(String[] args)
	{
		long time_0 = System.nanoTime();

		System.out.println(getTables());
		System.out.println(getTableSize("Voiture"));
		getCars();
		getStations();
		getChargingPoints();

		// Waiting to be properly integrated:
		getBatteries();
		getStatuses();
		getCurrents();
		getConnectors();
		getPayments();

		long time_1 = System.nanoTime();
		Core.benchmark(time_0, time_1, "Loading everything.");
	}
}
