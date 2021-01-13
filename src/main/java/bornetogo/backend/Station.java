package main.java.bornetogo.backend;

import java.io.*;


public class Station extends Coord
{
	// private String name;
	// private Coord position;
	// also contains a list of charging points.


	public Station(double latitude, double longitude, String description)
	{
		super(latitude, longitude, description);
		this.isStation = true;
	}


	public Boolean hasCompatibleChargingPoint(Car car)
	{
		return true; // TODO, using the car and list of charging points.
	}


	public static void main(String[] args)
	{
		Station station = new Station(43.1, 5.9, "A station.");
		System.out.println(station.toString());
	}
}
