package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.sql.*;


public class DatabaseConnector
{
	// Those will be kept in memory:
	private static ArrayList<Car> cars = loadCars();
	private static ArrayList<Station> stations = loadStations();
	private static ArrayList<ChargingPoint> chargingPoints = loadChargingPoints();


	public static ArrayList<Car> getCars()
	{
		if (cars == null) {
			System.err.println("\nStatic resource 'cars' could not be loaded.\n");
		}

		return cars;
	}


	public static ArrayList<Station> getStations()
	{
		if (stations == null) {
			System.err.println("\nStatic resource 'stations' could not be loaded.\n");
		}

		return stations;
	}


	public static ArrayList<ChargingPoint> getChargingPoints()
	{
		if (chargingPoints == null) {
			System.err.println("\nStatic resource 'chargingPoints' could not be loaded.\n");
		}

		return chargingPoints;
	}


	private static ArrayList<Car> loadCars()
	{
		// TODO!

		// For testing:
		return Car.mock();
	}


	private static ArrayList<Station> loadStations()
	{
		// TODO!

		// For testing:
		// return Station.mock();
		return Station.bigMock();
	}


	private static ArrayList<ChargingPoint> loadChargingPoints()
	{
		// TODO!

		return null;
	}


	// Must fetch the car battery type and connector from its model:
	public static void fetchData(Car car)
	{
		return; // TODO!
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
		ipCandidates.add("mydb"); // container IP. Always checked first.
		ipCandidates.add("localhost"); // host IP.

		Connection connection = null;

		for (String ip : ipCandidates)
		{
			String url = protocol + ip + ":" + port + "/" + database + options;

			try
			{
				Class.forName("com.mysql.cj.jdbc.Driver");
				connection = DriverManager.getConnection(url, user, pwd); // Will raise an exception on failure!
				System.out.println("\nSuccessful connection to the database with URL: " + url + "\n");
				break;
			}
			catch (Exception e) {
				// e.printStackTrace();
				System.err.println("\nFailed connection to the database with URL: " + url + "\n");
			}
		}

		return connection;
	}


	// Returns the number of entries in the given table:
	public static String getTableSize(String table)
	{
		String query = "SELECT COUNT(*) AS entriesNumber FROM " + table + ";";
		String result = "Number of entries in table '" + table + "': ";

		try
		{
			Connection connection = getConnection();

			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next()) {
				result += String.valueOf(answer.getInt(1));
				break;
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


	public static void main(String[] args)
	{
		String result = getTableSize("Station");
		System.out.println(result);
	}
}
