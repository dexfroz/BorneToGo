package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;


public class DatabaseConnector
{
	// Those will be kept in memory:
	private static ArrayList<Car> cars = loadCars();
	private static ArrayList<Station> stations = loadStations();


	public static ArrayList<Car> getCars()
	{
		// if (cars == null) {
		// 	System.err.println("\nStatic resource 'cars' could not be loaded.\n");
		// 	throw new RuntimeException();
		// }

		return cars;
	}


	public static ArrayList<Station> getStations()
	{
		// if (stations == null) {
		// 	System.err.println("\nStatic resource 'stations' could not be loaded.\n");
		// 	throw new RuntimeException();
		// }

		return stations;
	}


	private static ArrayList<Car> loadCars()
	{
		return null; // TODO!
	}


	private static ArrayList<Station> loadStations()
	{
		return null; // TODO!
	}


	public static void main(String[] args)
	{
		;
	}
}
