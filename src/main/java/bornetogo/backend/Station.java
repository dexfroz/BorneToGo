package main.java.bornetogo.backend;

import java.io.*;
import jakarta.json.*;


public class Station extends Coord
{
	// TODO: must contain a list of charging points, and other stats.


	public Station(double latitude, double longitude, String description, String address)
	{
		super(latitude, longitude, description, address);
		this.isStation = true;
	}


	// TODO: add stations specific data:
	public JsonObject getJsonData()
	{
		return Json.createObjectBuilder()
			// .add("things", 0)
			.build();
	}


	public Boolean hasCompatibleChargingPoint(Car car)
	{
		return true; // TODO, using the car and list of charging points.
	}


	public static void main(String[] args)
	{
		Station station = new Station(43.1, 5.9, "A station.", "");
		System.out.println(station.toString());
	}
}
