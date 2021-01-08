package main.java.bornetogo.backend;

import java.io.*;


public class Coord
{
	// In decimal degrees:
	private double latitude;
	private double longitude;
	private String description;


	public Coord(double latitude, double longitude)
	{
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = "";
	}


	public Coord(double latitude, double longitude, String description)
	{
		this.latitude = latitude;
		this.longitude = longitude;
		this.description = description;
	}


	public double getLatitude()
	{
		return this.latitude;
	}


	public double getLongitude()
	{
		return this.longitude;
	}


	public String toString()
	{
		return "lat: " + Double.toString(this.latitude) + ", long: " + Double.toString(this.longitude);
	}
}
