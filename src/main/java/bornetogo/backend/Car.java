package main.java.bornetogo.backend;

import java.io.*;
import jakarta.json.*;


public class Car
{
	private String model;
	private double maxAutonomy; // in km
	private double currentAutonomy; // in km
	private String batteryType;
	private String connector;
	private String subscription;


	public Car(String model, double maxAutonomy, double currentAutonomy, String subscription)
	{
		this.model = model;
		this.maxAutonomy = maxAutonomy;
		this.currentAutonomy = currentAutonomy;
		this.batteryType = "";
		this.connector = "";
		this.subscription = "";

		DatabaseConnector.fetchData(this);
	}


	public Car copy()
	{
		return new Car(this.model, this.maxAutonomy, this.currentAutonomy, this.subscription);
	}


	public String getModel()
	{
		return this.model;
	}


	public double getMaxAutonomy()
	{
		return this.maxAutonomy;
	}


	public double getCurrentAutonomy()
	{
		return this.currentAutonomy;
	}


	public String getBatteryType()
	{
		return this.batteryType;
	}


	public String getConnector()
	{
		return this.connector;
	}


	public String getSubscription()
	{
		return this.subscription;
	}


	public void setCurrentAutonomy(double autonomy)
	{
		this.currentAutonomy = Math.max(0., Math.min(autonomy, this.maxAutonomy));
	}


	public String toString()
	{
		return "Car: " + this.model + "\nMax autonomy: " + this.maxAutonomy + " km\nCurrent autonomy: " +
			this.currentAutonomy + " km\nBattery type: " + this.batteryType + "\nConnector: " + this.connector +
			"\nSubscription: " + this.subscription;
	}


	public void print()
	{
		System.out.println(this.toString());
	}


	// Returns null on failure.
	public static Car getFromJson(JsonObject json)
	{
		try
		{
			String model = json.getString("carModel");
			double maxAutonomy = json.getJsonNumber​("maxAutonomy").doubleValue(); // in km
			double currentAutonomy = json.getJsonNumber​("currentAutonomy").doubleValue(); // in km
			String subscription = json.getString("subscription");
			// Not known by the User:
			// String batteryType = json.getString("batteryType");
			// String connector = json.getString("connector");

			return new Car(model, maxAutonomy, currentAutonomy, subscription);
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nError while parsing a json: could not extract a car.\n");
			return null;
		}
	}


	public JsonObject toJson()
	{
		return Json.createObjectBuilder()
			.add("model", this.model)
			.add("maxAutonomy", this.maxAutonomy)
			.add("currentAutonomy", this.currentAutonomy)
			.add("batteryType", this.batteryType)
			.add("connector", this.connector)
			.add("subscription", this.subscription)
			.build();
	}


	public static void main(String[] args)
	{
		Car car = new Car("Tesla cybertruck", 66, 30, "None");
		System.out.println(car.toString());
	}
}
