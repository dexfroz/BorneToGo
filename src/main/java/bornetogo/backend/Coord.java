package main.java.bornetogo.backend;

import java.io.*;


public class Coord
{
	private static final double DEG_TO_RAD = Math.PI / 180.;
	private static final double MEAN_EARTH_DIAMETER = 12742.0016; // in km
	private static final double EPSILON = 0.000001; // max error: 11 cm

	// In decimal degrees:
	protected double latitude;
	protected double longitude;

	// In radians:
	private double latRadian;
	private double longRadian;

	protected Boolean isStation; // default to false
	protected String description;


	public Coord(double latitude, double longitude, String description)
	{
		this.latitude = latitude;
		this.longitude = longitude;
		this.latRadian = DEG_TO_RAD * this.latitude;
		this.longRadian = DEG_TO_RAD * this.longitude;
		this.isStation = false;
		this.description = description;
	}


	public Coord(double latitude, double longitude)
	{
		this(latitude, longitude, "");
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


	// Not overriding the equals() method, for it should be followed
	// by overriding the hashCode() method too!
	public Boolean isEqual(Coord coord)
	{
		return Math.abs(this.longitude - coord.longitude) < EPSILON &&
			Math.abs(this.latitude - coord.latitude) < EPSILON;
	}


	// Great-circle distance between two points on the Earth, using the Haversine formula:
	public static double distance(Coord coord_1, Coord coord_2)
	{
		double a = Math.sin((coord_1.latRadian - coord_2.latRadian) / 2.);
		double b = Math.sin((coord_1.longRadian - coord_2.longRadian) / 2.);
		double c = Math.cos(coord_1.latRadian) * Math.cos(coord_2.latRadian);
		double h = a * a + c * b * b; // 0 <= h <= 1
		return MEAN_EARTH_DIAMETER * Math.asin(Math.sqrt(h));
	}


	public static void main(String[] args)
	{
		Coord coordMarseille = new Coord(43.296482, 5.36978, "Marseille");
		System.out.println("\n" + coordMarseille.toString());

		Coord coordToulon = new Coord(43.124228, 5.928, "Toulon");
		System.out.println("\n" + coordToulon.toString());

		double dist = distance(coordMarseille, coordToulon);
		System.out.printf("\nDistance: %.3f km.\n\n", dist); // ok
	}
}
