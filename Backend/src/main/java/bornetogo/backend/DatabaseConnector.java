package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.sql.*;


public class DatabaseConnector
{
	private static Boolean areCarsLoaded = false;
	private static Boolean areStationsLoaded = false;
	private static Boolean areChargingPointsLoaded = false;

	// Those will be kept in memory:
	private static ArrayList<Car> cars = null;
	private static ArrayList<Station> stations = null;
	private static ArrayList<ChargingPoint> chargingPoints = null;


	public static ArrayList<Car> getCars()
	{
		if (! areCarsLoaded) {
			loadCars();
		}

		return cars;
	}


	public static ArrayList<Station> getStations()
	{
		if (! areStationsLoaded) {
			loadStations();
		}

		return stations;
	}


	public static ArrayList<ChargingPoint> getChargingPoints()
	{
		if (! areChargingPointsLoaded) {
			loadChargingPoints();
		}

		return chargingPoints;
	}


	// The result of this function should be closed at its end life.
	private static Connection getConnection()
	{
		String database = "BorneToGo";
		String user = "root";
		String pwd = "aaa"; // this could be dehardcoded.

		int port = 3306;
		String protocol = "jdbc:mysql://";
		String options = "?useSSL=false"; // necessary for requesting from the container.

		ArrayList<String> ipCandidates = new ArrayList<String>();
		ipCandidates.add("database"); // service name = container IP. Always checked first.
		ipCandidates.add("localhost"); // host IP.

		Connection connection = null;

		for (String ip : ipCandidates)
		{
			String url = protocol + ip + ":" + port + "/" + database + options;

			try
			{
				Class.forName("com.mysql.cj.jdbc.Driver");
				connection = DriverManager.getConnection(url, user, pwd); // Will raise an exception on failure!
				System.out.println("\nSuccessful connection to the database with URL: " + url + "\n");
				break;
			}
			catch (Exception e) {
				// e.printStackTrace();
				System.err.println("\nFailed connection to the database with URL: " + url + "\n");
			}
		}

		return connection;
	}


	// Returns an empty string for default values:
	private static String sanitize(String field)
	{
		if (field.equals("0") || field.equals("-1")) {
			return "";
		}

		return field;
	}


	// Returns 0. for default values:
	private static double sanitize(double field)
	{
		if (field == -1.) {
			return 0.;
		}

		return field;
	}


	// Returns a string containing the list of tables:
	public static String getTables()
	{
		String query = "SHOW TABLES;";
		String result = "Tables:\n\n";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next()) {
				result += answer.getString(1) + "\n";
			}

			connection.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			result = "\nNo tables found.\n";
			System.err.println("\n" + result + "\n");
		}

		return result;
	}


	// Returns the number of entries in the given table:
	public static String getTableSize(String table)
	{
		String query = "SELECT COUNT(*) AS entriesNumber FROM " + table + ";";
		String result = "Number of entries in table '" + table + "': ";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next()) {
				result += String.valueOf(answer.getInt(1));
			}

			connection.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			result = "No table '" + table + "' found.";
			System.err.println("\n" + result + "\n");
		}

		return result;
	}


	private static void loadCars()
	{
		cars = new ArrayList<Car>();
		String query = "SELECT * FROM Voiture;";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				String model = sanitize(answer.getString("Modele"));
				int idCar = answer.getInt("idVoiture");
				int idBattery = answer.getInt("idBatterie");
				// 'Chargement' is useless.

				// String row = "-> " + model + ", " + idCar + ", " + idBattery;
				// System.out.println(row);

				Car car = new Car(model, idCar, idBattery);
				cars.add(car);
			}

			connection.close();
			areCarsLoaded = true;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		if (cars.size() == 0) {
			System.err.println("\nCould not get real cars, using mock data...\n");
			areCarsLoaded = false;
			cars = Car.mock();
		}
	}


	private static void loadStations()
	{
		stations = new ArrayList<Station>();
		String query = "SELECT * FROM Station;";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				int idStation = answer.getInt("idStation");
				int idPaiement = answer.getInt("idPaiement");
				String name = sanitize(answer.getString("Titre"));
				double latitude = answer.getDouble("Latitude");
				double longitude = answer.getDouble("Longitude");
				String address = sanitize(answer.getString("Adresse"));
				String city = sanitize(answer.getString("Ville"));
				String zipCode = sanitize(answer.getString("Codepostal"));

				// String row = "-> " + idStation + ", " + idPaiement + ", " + name + ", " + latitude +
				// 	", " + longitude + ", " + address + ", " + city + ", " + zipCode;
				// System.out.println(row);

				String fullAddress = address + " " + city + " " + zipCode;
				Station station = new Station(latitude, longitude, name, fullAddress,
					String.valueOf(idPaiement), new ArrayList<Integer>()); // TODO: fetch the charging points ID!
				stations.add(station);
			}

			connection.close();
			areStationsLoaded = true;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		if (stations.size() == 0) {
			System.err.println("\nCould not get real stations, using mock data...\n");
			areStationsLoaded = false;
			// stations = Station.mock();
			stations = Station.bigMock();
		}
	}


	private static void loadChargingPoints()
	{
		chargingPoints = new ArrayList<ChargingPoint>();
		String query = "SELECT * FROM Borne;";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				int idChargingPoint = answer.getInt("idBorne");
				int idConnector = answer.getInt("idConnecteur");
				int idCurrent = answer.getInt("idCourant");
				int idStatus = answer.getInt("idStatus");
				double wattage = sanitize(answer.getDouble("Puissance"));

				// String row = "-> " + idChargingPoint + ", " + idConnector + ", " + idCurrent + ", " +
				// 	idStatus + ", " + wattage;
				// System.out.println(row);

				ChargingPoint chargingPoint = new ChargingPoint(idChargingPoint, idConnector,
					idCurrent, idStatus, wattage);
				chargingPoints.add(chargingPoint);
			}

			connection.close();
			areChargingPointsLoaded = true;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		if (chargingPoints.size() == 0) {
			System.err.println("\nCould not get real charging points, using mock data...\n");
			areChargingPointsLoaded = false;
		}
	}


	// Must fetch the car battery type and connector from its model:
	public static void fetchCarData(Car car)
	{
		return; // TODO!
	}


	public static void main(String[] args)
	{
		System.out.println(getTables());
		System.out.println(getTableSize("Station"));
		System.out.println("Cars number: " + getCars().size());
		System.out.println("Stations number: " + getStations().size());
		System.out.println("Charging Points number: " + getChargingPoints().size());
	}
}
