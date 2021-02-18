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
			Entry entry = new Car();
			cars = entry.loadTable("Voiture");
			areCarsLoaded = cars.size() > 0;

			if (areCarsLoaded) {
				completeCars();
			}
			else {
				System.err.println("\nCould not get real cars, using mock data...\n");
				cars = Car.mock();
			}
		}

		return cars;
	}


	public static ArrayList<Station> getStations()
	{
		if (! areStationsLoaded) {
			Entry entry = new Station();
			stations = entry.loadTable("Station");
			areStationsLoaded = stations.size() > 0;

			if (areStationsLoaded) {
				addChargingPointsID();
			}
			else {
				System.err.println("\nCould not get real stations, using mock data...\n");
				// stations = Station.mock();
				stations = Station.bigMock();
			}
		}

		return stations;
	}


	public static ArrayList<ChargingPoint> getChargingPoints()
	{
		if (! areChargingPointsLoaded) {
			Entry entry = new ChargingPoint();
			chargingPoints = entry.loadTable("Borne");
			areChargingPointsLoaded = chargingPoints.size() > 0;
		}

		if (areChargingPointsLoaded) {
			completeChargingPoints();
		}

		return chargingPoints;
	}


	// TODO: save this?
	private static ArrayList<Battery> getBatteries()
	{
		Entry entry = new Battery();
		ArrayList<Battery> batteries = entry.loadTable("Batterie");
		return batteries;
	}


	// TODO: save this?
	private static ArrayList<Status> getStatuses()
	{
		Entry entry = new Status();
		ArrayList<Status> statuses = entry.loadTable("Status");
		return statuses;
	}


	// TODO: save this?
	private static ArrayList<Current> getCurrents()
	{
		Entry entry = new Current();
		ArrayList<Current> currents = entry.loadTable("Courant");
		return currents;
	}


	// TODO: save this?
	private static ArrayList<Connector> getConnectors()
	{
		Entry entry = new Connector();
		ArrayList<Connector> connectors = entry.loadTable("Connecteur");
		return connectors;
	}


	// TODO: save this?
	private static ArrayList<Payment> getPayments()
	{
		Entry entry = new Payment();
		ArrayList<Payment> payments = entry.loadTable("Paiement");
		return payments;
	}


	// TODO: save this?
	private static ArrayList<StationChargingPoint> getStationChargingPoints()
	{
		Entry entry = new StationChargingPoint();
		ArrayList<StationChargingPoint> stationChargingPoints = entry.loadTable("StationBorne");
		return stationChargingPoints;
	}


	// TODO: save this?
	private static ArrayList<CurrentConnector> getCurrentConnector()
	{
		Entry entry = new CurrentConnector();
		ArrayList<CurrentConnector> currentConnectors = entry.loadTable("VCC");
		return currentConnectors;
	}


	private static void addChargingPointsID()
	{
		if (! areStationsLoaded) { // no need to have loaded chargingPoints yet!
			return;
		}

		Entry entry = new Station();
		boolean stationsCheck = entry.checkEntriesIDrange(stations); // used for speed!
		ArrayList<StationChargingPoint> stationChargingPoints = getStationChargingPoints();

		for (StationChargingPoint scp : stationChargingPoints) {
			Station station = entry.findEntryID(stations, scp.getIdStation(), stationsCheck);
			if (station != null) {
				station.getChargingPointsID().add(scp.getIdChargingPoint());
			}
		}

		System.out.println("-> Added charging points to all stations.\n");
	}


	private static void completeChargingPoints()
	{
		if (! areChargingPointsLoaded) {
			return;
		}

		// Statuses:

		Entry entry = new Status();
		ArrayList<Status> statuses = getStatuses();

		for (ChargingPoint cp : chargingPoints) {
			Status status = entry.findEntryID(statuses, cp.getIdStatus(), false);
			if (status != null) {
				cp.setUsability(status);
			}
		}

		// Connectors:

		entry = new Connector();
		ArrayList<Connector> connectors = getConnectors();

		for (ChargingPoint cp : chargingPoints) {
			Connector connector = entry.findEntryID(connectors, cp.getIdConnector(), false);
			if (connector != null) {
				cp.setConnector(connector);
			}
		}

		// Currents:

		entry = new Current();
		ArrayList<Current> currents = getCurrents();

		for (ChargingPoint cp : chargingPoints) {
			Current current = entry.findEntryID(currents, cp.getIdCurrent(), false);
			if (current != null) {
				cp.setCurrent(current);
			}
		}

		System.out.println("-> Added data to all charging points.\n");
	}


	private static void completeCars()
	{
		if (! areCarsLoaded) {
			return;
		}

		// Batteries:

		Entry entry = new Battery();
		ArrayList<Battery> batteries = getBatteries();

		for (Car car : cars) {
			Battery battery = entry.findEntryID(batteries, car.getIdBattery(), false);
			if (battery != null) {

				car.setMaxAutonomy(battery);
				car.setCapacity(battery);
			}
		}

		// ArrayList<CurrentConnector> currentConnectors = getCurrentConnector();
		// car.setMaxWattage(currentConnector); // ISSUE! several instances!




		// // Connectors:

		// entry = new Connector();
		// ArrayList<Connector> connectors = getConnectors();

		// for (ChargingPoint cp : chargingPoints) {
		// 	Connector connector = entry.findEntryID(connectors, cp.getIdConnector(), false);
		// 	if (connector != null) {
		// 		cp.setConnector(connector);
		// 	}
		// }

		// // Currents:

		// entry = new Current();
		// ArrayList<Current> currents = getCurrents();

		// for (ChargingPoint cp : chargingPoints) {
		// 	Current current = entry.findEntryID(currents, cp.getIdCurrent(), false);
		// 	if (current != null) {
		// 		cp.setCurrent(current);
		// 	}
		// }

		System.out.println("-> Added data to all cars.\n");
	}





	// The result of this function should be closed at its end life.
	public static Connection getConnection()
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
		String warningStatus = "Warning";

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
				System.err.println("\n" + warningStatus + ": failed connection to the database with URL: " + url);
				warningStatus = "Error";
			}
		}

		return connection;
	}


	// Returns a string containing the list of tables:
	public static String getTables()
	{
		String query = "SHOW TABLES;";
		String result = "Tables:\n\n";

		try
		{
			Connection connection = DatabaseConnector.getConnection();
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
	public static String getTableSize(String tableName)
	{
		String query = "SELECT COUNT(*) AS entriesNumber FROM " + tableName + ";";
		String result = "Number of entries in table '" + tableName + "': ";

		try
		{
			Connection connection = DatabaseConnector.getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next()) {
				result += String.valueOf(answer.getInt(1));
			}

			connection.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			result = "No table '" + tableName + "' found.";
			System.err.println("\n" + result + "\n");
		}

		return result;
	}


	public static void main(String[] args)
	{
		long time_0 = System.nanoTime();

		System.out.println(getTables());
		System.out.println(getTableSize("Voiture"));
		System.out.println("-> Cars number: " + getCars().size());
		System.out.println("-> Charging Points number: " + getChargingPoints().size());
		System.out.println("-> Stations number: " + getStations().size() + "\n");

		getBatteries();
		getStatuses();
		getCurrents();
		getConnectors();
		getPayments();
		getCurrentConnector();
		getStationChargingPoints();

		// Entry search:
		Entry entry = new Car();
		boolean carsCheck = entry.checkEntriesIDrange(cars);
		System.out.println("Check result for cars: " + carsCheck + "\n");
		int id = 1;
		Car car = entry.findEntryID(cars, id, carsCheck); // null object returned on failure!
		if (car != null) {
			System.out.println(car.toString() + "\n");
		}

		long time_1 = System.nanoTime();
		Core.benchmark(time_0, time_1, "Loading everything.");
	}
}
