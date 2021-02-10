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


	public static void connect()
	{
		Connection conn = null;
		Statement stat = null;
		ResultSet res = null;

		try
		{
			int port = 3306;
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:" + port + "/BorneToGo", "root", "");
			stat = conn.createStatement();
			res = stat.executeQuery("select idStation from Station");

			while (res.next()) {
				System.out.println(res.getInt(1));
			}
			conn.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nCannot connect to the database.\n");
		}
	}


	public static void main(String[] args)
	{
		connect();
	}
}
