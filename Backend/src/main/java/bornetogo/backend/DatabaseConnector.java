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


	public static String connect()
	{
		ArrayList<String> ipCandidates = new ArrayList<String>();
		ipCandidates.add("localhost");
		ipCandidates.add("127.0.0.1");
		ipCandidates.add("0.0.0.0");
		ipCandidates.add("mydb"); // from the container
		// ipCandidates.add("host.docker.internal");
		// ipCandidates.add("");

		String successfulIPs = "";

		String start = "jdbc:mysql://";

		// String end = "";
		String end = "?useSSL=false";

		int port = 3306;
		String database = "BorneToGo";
		String user = "root";
		String pwd = "aaa";

		for (String ip : ipCandidates)
		{
			try
			{
				String url = start + ip + ":" + port + "/" + database + end;
				System.out.println("-> Trying: " + url);
				Class.forName("com.mysql.cj.jdbc.Driver");
				Connection conn = DriverManager.getConnection(url, user, pwd);
				Statement stat = conn.createStatement();
				ResultSet res = stat.executeQuery("select idStation from Station order by idStation;");

				System.out.println("\nidStation(s):\n");

				while (res.next()) {
					System.out.println(res.getInt(1));
					break;
				}
				conn.close();

				System.out.println("\nWorked with IP: " + ip + "\n");
				successfulIPs += ip + ", ";
			}
			catch (Exception e) {
				// e.printStackTrace();
				System.err.println("\nCannot connect to the database (IP: " + ip + ").\n");
			}
		}

		return "Result: " + successfulIPs;
	}


	public static void main(String[] args)
	{
		String result = connect();
		System.out.println(result);
	}
}
