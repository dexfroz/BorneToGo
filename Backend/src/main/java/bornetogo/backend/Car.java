package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;
import java.sql.*;


public class Car extends Entry
{
	private String model = "";
	private String subscription = "";
	private double maxAutonomy; // in km
	private double currentAutonomy; // in km
	private double capacity; // in kWh
	private ArrayList<PowerConnector> powerConnectors = new ArrayList<PowerConnector>();

	// In reguards to the database:
	private int idCar;
	private int idBattery;


	public Car() {}


	// Used for user defined cars. 'idCar' and 'idBattery' are not searched.
	public Car(String model, double maxAutonomy, double currentAutonomy, String subscription,
		double capacity, ArrayList<PowerConnector> powerConnectors)
	{
		this.model = model;
		this.subscription = subscription;
		this.maxAutonomy = maxAutonomy;
		this.capacity = capacity;
		this.powerConnectors = powerConnectors;
		this.setCurrentAutonomy(currentAutonomy); // safer.
	}


	// For testing. Real cars come from the database.
	public Car(String model, double maxAutonomy, double currentAutonomy, String subscription)
	{
		this(model, maxAutonomy, currentAutonomy, subscription, 52., PowerConnector.mock()); // w/ mocking fields.
	}


	public Car query(ResultSet answer)
	{
		Car car = new Car();

		try {
			car.idCar = answer.getInt("idVoiture");
			car.idBattery = answer.getInt("idBatterie");
			car.model = Entry.sanitize(answer.getString("Modele"));
			// 'Chargement' is useless.

			// String row = "-> " + car.idCar + ", " + car.idBattery + ", " + car.model;
			// System.out.println(row);

			return car;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public Car copy()
	{
		Car car = new Car();

		car.idCar = this.idCar;
		car.idBattery = this.idBattery;
		car.model = this.model;
		car.subscription = this.subscription;
		car.maxAutonomy = this.maxAutonomy;
		car.currentAutonomy = this.currentAutonomy;
		car.capacity = this.capacity;
		car.powerConnectors = this.powerConnectors;

		return car;
	}


	public int getId()
	{
		return this.idCar;
	}


	public int getIdBattery()
	{
		return this.idBattery;
	}


	public String getModel()
	{
		return this.model;
	}


	public String getSubscription()
	{
		return this.subscription;
	}


	public double getMaxAutonomy()
	{
		return this.maxAutonomy;
	}


	public double getCurrentAutonomy()
	{
		return this.currentAutonomy;
	}


	public double getCapacity()
	{
		return this.capacity;
	}


	public ArrayList<PowerConnector> getPowerConnectors()
	{
		return this.powerConnectors;
	}


	public void setCapacity(Battery battery)
	{
		this.capacity = battery.getCapacity();
	}


	public void setMaxAutonomy(Battery battery)
	{
		this.maxAutonomy = battery.getAutonomy();
		this.currentAutonomy = this.maxAutonomy; // by default
	}


	// TODO: remove this, it is for testing only!
	public void setMaxAutonomy(double maxAutonomy)
	{
		this.maxAutonomy = maxAutonomy;
	}


	public void setCurrentAutonomy(double autonomy)
	{
		this.currentAutonomy = Math.max(0., Math.min(autonomy, this.maxAutonomy));
	}


	public String toString()
	{
		return "Car: " + this.model + "\nSubscription: " + this.subscription + "\nMax autonomy: " +
			this.maxAutonomy + " km\nCurrent autonomy: " + this.currentAutonomy + " km\nCapacity: " +
			this.capacity + " kWh\nPowerConnectors number: " + this.powerConnectors.size();
	}


	public void print()
	{
		System.out.println(this.toString());
	}


	// Find a car by its model, and set some fields. Returns null on failure:
	public static Car find(String model, double currentAutonomy, ArrayList<PowerConnector> presentPowerConnectors)
	{
		ArrayList<Car> allCars = DatabaseConnector.getCars();

		for (Car car : allCars) {
			if (car.getModel().equalsIgnoreCase(model)) {
				Car foundCar = car.copy(); // preventing side effects!
				foundCar.setCurrentAutonomy(currentAutonomy);
				foundCar.powerConnectors = presentPowerConnectors;
				return foundCar;
			}
		}

		System.err.println("\nError: no car matching the partially given one.\n");
		return null;
	}


	// 'idCar' and 'idBattery' are not searched. Returns null on failure.
	public static Car getFromJson(JsonObject json)
	{
		try
		{
			JsonObject carJson = json.getJsonObject("car");
			String model = carJson.getString("model");
			double currentAutonomy = carJson.getJsonNumber​("currentAutonomy").doubleValue(); // in km
			JsonArray powerConnectorArray = carJson.getJsonArray("courantConnecteurs");
			ArrayList<PowerConnector> powerConnectors = new ArrayList<PowerConnector>();

			if (powerConnectorArray.size() > 1) {
				System.err.println("Warning: a user defined car should have a unique 'courantConnecteur'.\n");
			}

			for (int i = 0; i < powerConnectorArray.size(); ++i)
			{
				JsonObject powerConnectorJson = powerConnectorArray.getJsonObject(i);
				String powerName = powerConnectorJson.getString("courant");
				String connectorName = powerConnectorJson.getString("connecteur");
				double wattage = powerConnectorJson.getJsonNumber​("puissance").doubleValue(); // in kW
				PowerConnector powerConnector = PowerConnector.find(powerName, connectorName, wattage);

				if (powerConnector != null) {
					powerConnectors.add(powerConnector);
					break; // must be a unique PowerConnector here.
				}
			}

			// Optional fields, if absent, some can be fetched from the database:
			try {
				String subscription = carJson.getString("subscription");
				double maxAutonomy = carJson.getJsonNumber​("maxAutonomy").doubleValue(); // in km
				double capacity = carJson.getJsonNumber​("capacity").doubleValue(); // in kWh
				return new Car(model, maxAutonomy, currentAutonomy, subscription, capacity, powerConnectors);
			}
			catch (Exception e) {
				System.out.println("\nWarning: incomplete car, trying to find a match...");
				return find(model, currentAutonomy, powerConnectors); // powerConnectors has 1 element.
			}
		}
		catch (Exception e) {
			System.err.println("\nError: could not extract a car from the following json:");
			GetJson.safeJsonPrinting(json);
			return null;
		}
	}


	public JsonObject toJson()
	{
		JsonArrayBuilder powerConnectorsBuilder = Json.createArrayBuilder();

		for (PowerConnector pc : this.powerConnectors) {
			powerConnectorsBuilder.add(pc.toJson());
		}

		JsonArray powerConnectorsArray = powerConnectorsBuilder.build();

		return Json.createObjectBuilder()
			.add("model", this.model)
			.add("subscription", this.subscription)
			.add("maxAutonomy", this.maxAutonomy)
			.add("currentAutonomy", this.currentAutonomy)
			.add("capacity", this.capacity)
			.add("courantConnecteurs", powerConnectorsArray)
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
