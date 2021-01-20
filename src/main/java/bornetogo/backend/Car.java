package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class Car
{
	private String model;
	private String subscription;
	private String batteryType;
	private double maxAutonomy; // in km
	private double currentAutonomy; // in km
	private double maxWattage; // in kW
	private ArrayList<String> connectors;


	public Car(String model, double maxAutonomy, double currentAutonomy, String subscription)
	{
		this.model = model;
		this.subscription = subscription;
		this.batteryType = "";
		this.maxAutonomy = maxAutonomy;
		this.currentAutonomy = currentAutonomy;
		this.maxWattage = 0.;
		this.connectors = new ArrayList<String>();

		// TODO: fill the empty fields with the following function:
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


	public String getSubscription()
	{
		return this.subscription;
	}


	public String getBatteryType()
	{
		return this.batteryType;
	}


	public double getMaxAutonomy()
	{
		return this.maxAutonomy;
	}


	public double getCurrentAutonomy()
	{
		return this.currentAutonomy;
	}


	public double getMaxWattage()
	{
		return this.maxWattage;
	}


	public ArrayList<String> getConnectors()
	{
		return this.connectors;
	}


	public void setCurrentAutonomy(double autonomy)
	{
		this.currentAutonomy = Math.max(0., Math.min(autonomy, this.maxAutonomy));
	}


	public String toString()
	{
		return "Car: " + this.model + "\nSubscription: " + this.subscription + "\nBattery type: " + this.batteryType +
			"\nMax autonomy: " + this.maxAutonomy + " km\nCurrent autonomy: " + this.currentAutonomy +
			" km\nmaxWattage: " + this.maxWattage + " kW\nConnectors number: " + this.connectors.size();
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
			JsonObject carJson = json.getJsonObject("car");
			String model = carJson.getString("model");
			String subscription = carJson.getString("subscription");
			double maxAutonomy = carJson.getJsonNumber​("maxAutonomy").doubleValue(); // in km
			double currentAutonomy = carJson.getJsonNumber​("currentAutonomy").doubleValue(); // in km

			// TODO: update the constructor to add those:
			String batteryType = carJson.getString("batteryType");
			double maxWattage = carJson.getJsonNumber​("maxWattage").doubleValue(); // in kW
			// ArrayList<String> connectors = carJson.getString("connectors"); // TODO

			return new Car(model, maxAutonomy, currentAutonomy, subscription);
		}
		catch (Exception e) {
			System.err.println("\nError while parsing a json: could not extract a car.\n");
			return null;
		}
	}


	public JsonObject toJson()
	{
		JsonArrayBuilder connectorsBuilder = Json.createArrayBuilder();

		for (String connector : this.connectors) {
			connectorsBuilder.add(connector);
		}

		JsonArray connectorsArray = connectorsBuilder.build();

		return Json.createObjectBuilder()
			.add("model", this.model)
			.add("subscription", this.subscription)
			.add("batteryType", this.batteryType)
			.add("maxAutonomy", this.maxAutonomy)
			.add("currentAutonomy", this.currentAutonomy)
			.add("maxWattage", this.maxWattage)
			.add("connectors", connectorsArray)
			.build();
	}


	// For testing only:
	public static ArrayList<Car> mock()
	{
		ArrayList<Car> allCars = new ArrayList<Car>();
		allCars.add(new Car("Renault Zoe", 66, 66, ""));
		allCars.add(new Car("Tesla cybertruck", 200, 200, ""));
		return allCars;
	}


	public static void main(String[] args)
	{
		Car car_1 = new Car("Renault Zoe", 66, 30, "None");
		System.out.println(car_1.toString() + "\n");

		String inputString = FileContent.read("input_example_singleStep.json");
		JsonObject input = GetJson.jsonFromString(inputString);
		Car car_2 = getFromJson(input);
		System.out.println(car_2.toString() + "\n");
	}
}
