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
		return Station.mock();
		// return Station.bigMock();
	}


	// Must fetch the car battery type and connector from its model:
	public static void fetchData(Car car)
	{
		return; // TODO!
	}


	public static void main(String[] args)
	{
		;
	}
}
