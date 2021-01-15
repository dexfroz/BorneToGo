package main.java.bornetogo.backend;

import java.io.*;
import jakarta.json.*;


public class Car
{
	private String model;
	private String batteryType;
	private String connector;
	private double maxAutonomy; // in km
	private double currentAutonomy; // in km


	public Car(String model, String batteryType, String connector, double maxAutonomy, double currentAutonomy)
	{
		this.model = model;
		this.batteryType = batteryType;
		this.connector = connector;
		this.maxAutonomy = maxAutonomy;
		this.currentAutonomy = currentAutonomy;
	}


	public String getModel()
	{
		return this.model;
	}


	public String getBatteryType()
	{
		return this.batteryType;
	}


	public String getStationStatus()
	{
		return this.connector;
	}


	public double getMaxAutonomy()
	{
		return this.maxAutonomy;
	}


	public double getCurrentAutonomy()
	{
		return this.currentAutonomy;
	}


	public void setCurrentAutonomy(double autonomy)
	{
		this.currentAutonomy = Math.max(0, Math.min(autonomy, this.maxAutonomy));
	}


	public String toString()
	{
		return "Car: " + this.model + "\nBattery type: " + this.batteryType + "\nConnector: " + this.connector +
			"\nMax autonomy: " + this.maxAutonomy + " km\nCurrent autonomy: " + this.currentAutonomy + " km";
	}


	public void print()
	{
		System.out.println(this.toString());
	}


	public static Car getFromJson(JsonObject json)
	{
		return null;
	}


	public JsonObject toJson()
	{
		return Json.createObjectBuilder()
			.add("model", this.model)
			.add("batteryType", this.batteryType)
			.add("connector", this.connector)
			.add("maxAutonomy", this.maxAutonomy)
			.add("currentAutonomy", this.currentAutonomy)
			.build();
	}


	public static void main(String[] args)
	{
		Car car = new Car("Tesla cybertruck", "undefined", "undefined", 66, 30);
		System.out.println(car.toString());
	}
}
