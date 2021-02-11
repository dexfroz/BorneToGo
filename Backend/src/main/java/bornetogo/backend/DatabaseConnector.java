package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;

import java.sql.*;


public class DatabaseConnector
{
	// Those will be kept in memory:
	private static ArrayList<Car> cars = loadCars();
	private static ArrayList<Station> stations = loadStations();


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


	// Must fetch the car battery type and connector from its model:
	public static void fetchData(Car car)
	{
		return; // TODO!
	}


	public static String connect()
	{
		Connection conn = null;
		Statement stat = null;
		ResultSet res = null;

		ArrayList<String> ipCandidates = new ArrayList<String>();
		ipCandidates.add("localhost");
		ipCandidates.add("127.0.0.1");
		ipCandidates.add("0.0.0.0");
		ipCandidates.add("mydb"); // from the container
		ipCandidates.add("host.docker.internal");

		String successfulIP = "";

		String start = "jdbc:mysql://"; // ok
		// String start = "http://"; // nope

		int port = 3306;
		String user = "root";
		String pwd = "aaa";

		for (String ip : ipCandidates)
		{
			try
			{
				Class.forName("com.mysql.cj.jdbc.Driver");
				conn = DriverManager.getConnection(start + ip + ":" + port + "/BorneToGo", user, pwd);
				stat = conn.createStatement();
				res = stat.executeQuery("select idStation from Station order by idStation");

				System.out.println("\nidStation(s):\n");

				while (res.next()) {
					System.out.println(res.getInt(1));
					break;
				}
				conn.close();

				System.out.println("\nWorked with IP: " + ip + "\n");
				successfulIP += ip + ", ";
			}
			catch (Exception e) {
				// e.printStackTrace();
				System.err.println("\nCannot connect to the database (IP: " + ip + ").\n");
			}
		}

		return successfulIP;
	}


	public static void main(String[] args)
	{
		String result = connect();
		System.out.println(result);
	}
}
