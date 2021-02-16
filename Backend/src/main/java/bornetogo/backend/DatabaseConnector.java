package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.sql.*;


public class DatabaseConnector
{
	private static boolean areCarsLoaded = false;
	private static boolean areStationsLoaded = false;
	private static boolean areChargingPointsLoaded = false;

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
				System.out.println("\n-> Successful connection to the database with URL: " + url + "\n");
				break;
			}
			catch (Exception e) {
				// e.printStackTrace();
				System.err.println("\nFailed connection to the database with URL: " + url);
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


	// Returns 0 for default values:
	private static int sanitize(int field)
	{
		if (field == -1) {
			return 0;
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
			result = "No tables found.\n";
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
				int idCar = answer.getInt("idVoiture");
				int idBattery = answer.getInt("idBatterie");
				String model = sanitize(answer.getString("Modele"));
				// 'Chargement' is useless.

				// String row = "-> " + model + ", " + idCar + ", " + idBattery;
				// System.out.println(row);

				Car car = new Car(idCar, idBattery, model);
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
				int idPayment = answer.getInt("idPaiement");
				String name = sanitize(answer.getString("Titre"));
				double latitude = answer.getDouble("Latitude");
				double longitude = answer.getDouble("Longitude");
				String address = sanitize(answer.getString("Adresse"));
				String city = sanitize(answer.getString("Ville"));
				String zipCode = sanitize(answer.getString("Codepostal"));

				// String row = "-> " + idStation + ", " + idPayment + ", " + name + ", " + latitude +
				// 	", " + longitude + ", " + address + ", " + city + ", " + zipCode;
				// System.out.println(row);

				String fullAddress = address + " " + city + " " + zipCode;
				Station station = new Station(idStation, idPayment, latitude, longitude, name, address);
				stations.add(station);
			}

			connection.close();
			areStationsLoaded = true;

			loadStationChargingPoints(); // fetching the chargingPointsIDs.
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


	// Checks if the Station table has entries of ID in increasing order,
	// from 1, and without gaps, in order to activate the fast filling mode:
	private static boolean checkStationsIDrange()
	{
		if (stations.get(0).getID() != 1) {
			return false;
		}

		for (int i = 1; i < stations.size() - 1; ++i) {
			if (stations.get(i + 1).getID() - stations.get(i).getID() != 1) { // gap detected.
				return false;
			}
		}

		return true;
	}


	private static void loadStationChargingPoints()
	{
		if (stations == null) {
			System.err.println("\nCannot load the station-charging points IDs: null stations.\n");
			return;
		}

		boolean stationsCheckResult = checkStationsIDrange();
		System.out.println("Fast mode status: " + stationsCheckResult);

		String query = "SELECT * FROM StationBorne;";
		int count = 0;

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				int idStationChargingPoint = answer.getInt("idStationBorne");
				int idStation = answer.getInt("idStation");
				int idChargingPoint = answer.getInt("idBorne");

				// String row = "-> " + idStationChargingPoint + ", " + idStation + ", " + idChargingPoint;
				// System.out.println(row);

				boolean stationFound = false;

				if (stationsCheckResult) // fast mode!
				{
					// This assumes 'idStation' values to be in increasing order, and without gaps:
					if (1 <= idStation && idStation <= stations.size()) {
						Station station = stations.get(idStation - 1);
						station.getChargingPointsID().add(idChargingPoint);
						stationFound = true;
						++count;
					}
				}
				else // This assumes nothing on stations IDs:
				{
					for (Station station : stations)
					{
						if (station.getID() == idStation) {
							station.getChargingPointsID().add(idChargingPoint);
							stationFound = true;
							++count;
							break;
						}
					}
				}

				if (! stationFound) {
					System.err.println("Could not add a charging point ID for station of ID: " + idStation);
				}
			}

			connection.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		System.out.println("Loaded " + count + " charging point IDs.\n");
	}


	// TODO: use this.
	private static void loadBatteries()
	{
		ArrayList<Battery> batteries = new ArrayList<Battery>();
		String query = "SELECT * FROM Batterie;";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				int idBattery = answer.getInt("idBatterie");
				double capacity = answer.getDouble("Capacite");
				double autonomy = answer.getDouble("Autonomie");

				// String row = "-> " + idBattery + ", " + capacity + ", " + autonomy;
				// System.out.println(row);

				Battery battery = new Battery(idBattery, capacity, autonomy);
				batteries.add(battery);
			}

			connection.close();
			// areBatteriesLoaded = true;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		if (batteries.size() == 0) {
			System.err.println("\nCould not load batteries.\n");
			// areBatteriesLoaded = false;
		}

		// return batteries;
	}


	// TODO: use this.
	private static void loadStatuses()
	{
		ArrayList<Status> statuses = new ArrayList<Status>();
		String query = "SELECT * FROM Status;";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				int idStatus = answer.getInt("idStatus");
				String name = answer.getString("titre");
				boolean isOperational = answer.getBoolean("isOperational");
				boolean isUserSelectable = answer.getBoolean("isUserSelectable");

				// String row = "-> " + idStatus + ", " + name + ", " + isOperational + ", " + isUserSelectable;
				// System.out.println(row);

				Status status = new Status(idStatus, name, isOperational, isUserSelectable);
				statuses.add(status);
			}

			connection.close();
			// areStatusesLoaded = true;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		if (statuses.size() == 0) {
			System.err.println("\nCould not load statuses.\n");
			// areStatusesLoaded = false;
		}

		// return statuses;
	}


	// TODO: use this.
	private static void loadCurrents()
	{
		ArrayList<Current> currents = new ArrayList<Current>();
		String query = "SELECT * FROM Courant;";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				int idCurrent = answer.getInt("idCourant");
				String name = answer.getString("Titre");
				String description = answer.getString("Description");

				// String row = "-> " + idCurrent + ", " + name + ", " + description;
				// System.out.println(row);

				Current current = new Current(idCurrent, name, description);
				currents.add(current);
			}

			connection.close();
			// areCurrentsLoaded = true;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		if (currents.size() == 0) {
			System.err.println("\nCould not load currents.\n");
			// areCurrentsLoaded = false;
		}

		// return currents;
	}


	// TODO: use this.
	private static void loadConnectors()
	{
		ArrayList<Connector> connectors = new ArrayList<Connector>();
		String query = "SELECT * FROM Connecteur;";

		try
		{
			Connection connection = getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				int idConnector = answer.getInt("idConnecteur");
				String title = answer.getString("Titre");
				String name = answer.getString("Name");

				// String row = "-> " + idConnector + ", " + title + ", " + name;
				// System.out.println(row);

				Connector connector = new Connector(idConnector, title, name);
				connectors.add(connector);
			}

			connection.close();
			// areConnectorsLoaded = true;
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		if (connectors.size() == 0) {
			System.err.println("\nCould not load connectors.\n");
			// areConnectorsLoaded = false;
		}

		// return connectors;
	}


	public static void main(String[] args)
	{
		long time_0 = System.nanoTime();

		System.out.println(getTables());
		System.out.println(getTableSize("Station"));
		System.out.println("Cars number: " + getCars().size());
		System.out.println("Charging Points number: " + getChargingPoints().size());
		System.out.println("Stations number: " + getStations().size() + "\n");

		// Waiting to be properly integrated:
		loadBatteries();
		loadStatuses();
		loadCurrents();
		loadConnectors();

		long time_1 = System.nanoTime();
		Core.benchmark(time_0, time_1, "Loading everything.");
	}
}
