package main.java.bornetogo.backend;

import java.io.*;
import jakarta.json.*;


public class Coord
{
	public enum Format {
		LAT_LONG,
		LONG_LAT
	}

	private static final double DEG_TO_RAD = Math.PI / 180.;
	private static final double MEAN_EARTH_DIAMETER = 12742.0016; // in km
	private static final double EPSILON = 0.0001; // max error: 11.11 m

	protected String name;
	protected String address;
	protected Boolean isStation; // only Stations have this true. Do _not_ add a setter to modify it!

	// In decimal degrees:
	protected double latitude;
	protected double longitude;


	public Coord(double latitude, double longitude, String name, String address)
	{
		this.name = name;
		this.address = address;
		this.isStation = false;
		this.move(latitude, longitude);
	}


	public Coord(double latitude, double longitude)
	{
		this(latitude, longitude, "", "");
	}


	public void move(double latitude, double longitude)
	{
		this.latitude = latitude;
		this.longitude = longitude;
	}


	public String getName()
	{
		return this.name;
	}


	public String getAddress()
	{
		return this.address;
	}


	public Boolean isStation()
	{
		return this.isStation;
	}


	public double getLatitude()
	{
		return this.latitude;
	}


	public double getLongitude()
	{
		return this.longitude;
	}


	public void setName(String name)
	{
		this.name = name;
	}


	public void setAddress(String address)
	{
		this.address = address;
	}


	public String toString()
	{
		return "Coord:\nName: " + this.name + "\nAddress: " + this.address + "\nIs a station: " +
			this.isStation + "\nLatitude: " + this.latitude + ", longitude: " + this.longitude;
	}


	public void print()
	{
		System.out.println(this.toString());
	}


	// Not overriding the equals() method, for it should be followed by overriding
	// the hashCode() method too! This compares only the Coords position.
	public Boolean isAtSameSpot(Coord coord)
	{
		return Math.abs(this.longitude - coord.longitude) < EPSILON &&
			Math.abs(this.latitude - coord.latitude) < EPSILON;
	}


	// Great-circle distance between two points on the Earth, using the Haversine formula:
	public static double distance(Coord coord_1, Coord coord_2)
	{
		double a = Math.sin((coord_1.latitude - coord_2.latitude) * DEG_TO_RAD / 2.);
		double b = Math.sin((coord_1.longitude - coord_2.longitude) * DEG_TO_RAD / 2.);
		double c = Math.cos(coord_1.latitude * DEG_TO_RAD) * Math.cos(coord_2.latitude * DEG_TO_RAD);
		double h = a * a + c * b * b; // 0 <= h <= 1
		return MEAN_EARTH_DIAMETER * Math.asin(Math.sqrt(h));
	}


	// Safe version. Returns null on failure.
	public static Coord getFromJsonArray(JsonArray coordJsonArray, String name, String address, Format format)
	{
		try
		{
			double latitude = 0., longitude = 0.;

			if (format == Format.LAT_LONG) {
				latitude = coordJsonArray.getJsonNumber​(0).doubleValue();
				longitude = coordJsonArray.getJsonNumber​(1).doubleValue();
			}
			else { // Format.LONG_LAT
				latitude = coordJsonArray.getJsonNumber​(1).doubleValue();
				longitude = coordJsonArray.getJsonNumber​(0).doubleValue();
			}

			return new Coord(latitude, longitude, name, address);
		}
		catch (Exception e) {
			System.err.println("\nWarning: could not extract a Coord from a json.\n");
			return null;
		}
	}


	public JsonObject getJsonData()
	{
		return Json.createObjectBuilder().build(); // empty object by default.
	}


	public JsonArray toJsonSmall(Format format)
	{
		JsonArrayBuilder builder = Json.createArrayBuilder();

		if (format == Format.LAT_LONG) {
			builder.add(this.latitude);
			builder.add(this.longitude);
		}
		else { // Format.LONG_LAT
			builder.add(this.longitude);
			builder.add(this.latitude);
		}

		return (JsonArray) builder.build();
	}


	public JsonObject toJsonFull(Format format)
	{
		return Json.createObjectBuilder()
			.add("location", this.toJsonSmall(format))
			.add("name", this.name)
			.add("address", this.address)
			.add("isStation", this.isStation)
			.add("data", this.getJsonData())
			.build();
	}


	public static void main(String[] args)
	{
		Coord coordMarseille = new Coord(43.296482, 5.36978, "Vieux-Port", "Marseille");
		System.out.println("\n" + coordMarseille.toString());

		Coord coordToulon = new Coord(43.124228, 5.928, "Un endroit", "Toulon");
		System.out.println("\n" + coordToulon.toString());

		double dist = distance(coordMarseille, coordToulon);
		System.out.printf("\nDistance: %.3f km.\n\n", dist); // ok
	}
}
