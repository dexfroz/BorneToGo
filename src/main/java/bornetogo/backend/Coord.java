package main.java.bornetogo.backend;

import java.io.*;


public class Coord
{
	// In decimal degrees:
	protected double latitude;
	protected double longitude;
	protected String description;
	protected Boolean isStation; // default to false


	public Coord(double latitude, double longitude)
	{
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = "";
		this.isStation = false;
	}


	public Coord(double latitude, double longitude, String description)
	{
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = description;
		this.isStation = false;
	}


	public double getLatitude()
	{
		return this.latitude;
	}


	public double getLongitude()
	{
		return this.longitude;
	}


	public Boolean isStation()
	{
		return this.isStation;
	}


	public String toString()
	{
		return "Coord of: " + description + "\n" + "Is a station: " + this.isStation +
			"\nLatitude: " + Double.toString(this.latitude) + ", longitude: " + Double.toString(this.longitude);
	}


	public static void main(String[] args)
	{
		Coord coord = new Coord(43.1, 5.9, "Somewhere.");
		System.out.println(coord.toString());
	}
}
