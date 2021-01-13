package main.java.bornetogo.backend;

import java.io.*;


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


	public String toString()
	{
		return "Car: " + model + "\nBattery type: " + batteryType + "\nConnector: " + connector +
			"\nMax autonomy: " + maxAutonomy + " km\nCurrent autonomy: " + currentAutonomy + " km";
	}


	public static void main(String[] args)
	{
		Car car = new Car("Tesla cybertruck", "undefined", "undefined", 66, 30);
		System.out.println(car.toString());
	}
}
