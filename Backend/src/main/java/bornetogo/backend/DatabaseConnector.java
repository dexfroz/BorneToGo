package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.sql.*;


public class DatabaseConnector
{
	private static boolean areCarsLoaded = false;
	private static boolean areStationsLoaded = false;
	private static boolean areChargingPointsLoaded = false;
	private static boolean arePowerConnectorsLoaded = false;
	private static boolean areStationChargingPointsLoaded = false;
	private static boolean areBatteriesLoaded = false;
	private static boolean areStatusesLoaded = false;
	private static boolean arePowersLoaded = false;
	private static boolean areConnectorsLoaded = false;
	private static boolean arePaymentsLoaded = false;

	// Those will be kept in memory:
	private static ArrayList<Car> allCars = null;
	private static ArrayList<Station> allStations = null;
	private static ArrayList<ChargingPoint> allChargingPoints = null;
	private static ArrayList<PowerConnector> allPowerConnectors = null;
	private static ArrayList<StationChargingPoint> allStationChargingPoints = null;
	private static ArrayList<Battery> allBatteries = null;
	private static ArrayList<Status> allStatuses = null;
	private static ArrayList<Power> allPowers = null;
	private static ArrayList<Connector> allConnectors = null;
	private static ArrayList<Payment> allPayments = null;


	public static ArrayList<Car> getCars()
	{
		if (! areCarsLoaded) {
			Entry entry = new Car();
			allCars = entry.loadTable("Voiture");
			areCarsLoaded = allCars.size() > 0;

			if (areCarsLoaded) {
				completeCars(); // only done once!
			}
			else {
				System.err.println("\nCould not get real cars, using mock data...\n");
				allCars = Car.mock();
			}
		}

		return allCars;
	}


	public static ArrayList<Station> getStations()
	{
		if (! areStationsLoaded) {
			Entry entry = new Station();
			allStations = entry.loadTable("Station");
			areStationsLoaded = allStations.size() > 0;

			if (areStationsLoaded) {
				completeStations(); // only done once!
			}
			else {
				System.err.println("\nCould not get real stations, using mock data...\n");
				// allStations = Station.mock();
				allStations = Station.bigMock();
			}
		}

		return allStations;
	}


	public static ArrayList<ChargingPoint> getChargingPoints()
	{
		if (! areChargingPointsLoaded) {
			Entry entry = new ChargingPoint();
			allChargingPoints = entry.loadTable("Borne");
			areChargingPointsLoaded = allChargingPoints.size() > 0;

			if (areChargingPointsLoaded) {
				completeChargingPoints(); // only done once!
			}
		}

		return allChargingPoints;
	}


	private static ArrayList<PowerConnector> getPowerConnectors()
	{
		if (! arePowerConnectorsLoaded) {
			Entry entry = new PowerConnector();
			allPowerConnectors = entry.loadTable("VCC");
			arePowerConnectorsLoaded = allPowerConnectors.size() > 0;

			if (arePowerConnectorsLoaded) {
				completePowerConnectors(); // only done once!
			}
		}

		return allPowerConnectors;
	}


	private static ArrayList<StationChargingPoint> getStationChargingPoints()
	{
		if (! areStationChargingPointsLoaded) {
			Entry entry = new StationChargingPoint();
			allStationChargingPoints = entry.loadTable("StationBorne");
			areStationChargingPointsLoaded = allStationChargingPoints.size() > 0;
		}

		return allStationChargingPoints;
	}


	private static ArrayList<Battery> getBatteries()
	{
		if (! areBatteriesLoaded) {
			Entry entry = new Battery();
			allBatteries = entry.loadTable("Batterie");
			areBatteriesLoaded = allBatteries.size() > 0;
		}

		return allBatteries;
	}


	private static ArrayList<Status> getStatuses()
	{
		if (! areStatusesLoaded) {
			Entry entry = new Status();
			allStatuses = entry.loadTable("Status");
			areStatusesLoaded = allStatuses.size() > 0;
		}

		return allStatuses;
	}


	private static ArrayList<Power> getPowers()
	{
		if (! arePowersLoaded) {
			Entry entry = new Power();
			allPowers = entry.loadTable("Courant");
			arePowersLoaded = allPowers.size() > 0;
		}

		return allPowers;
	}


	private static ArrayList<Connector> getConnectors()
	{
		if (! areConnectorsLoaded) {
			Entry entry = new Connector();
			allConnectors = entry.loadTable("Connecteur");
			areConnectorsLoaded = allConnectors.size() > 0;
		}

		return allConnectors;
	}


	private static ArrayList<Payment> getPayments()
	{
		if (! arePaymentsLoaded) {
			Entry entry = new Payment();
			allPayments = entry.loadTable("Paiement");
			arePaymentsLoaded = allPayments.size() > 0;
		}

		return allPayments;
	}


	private static void completeCars()
	{
		if (! areCarsLoaded) {
			return;
		}

		// Batteries:

		Entry entry = new Battery();
		ArrayList<Battery> batteries = getBatteries();

		for (Car car : allCars) {
			Battery battery = entry.findEntryID(batteries, car.getIdBattery(), false);
			if (battery != null) {
				car.setMaxAutonomy(battery);
				car.setCapacity(battery);
			}
		}

		// Adding PowerConnectors:

		entry = new Car();
		ArrayList<PowerConnector> powerConnectors = getPowerConnectors();

		for (PowerConnector pc : powerConnectors) {
			Car car = entry.findEntryID(allCars, pc.getIdCar(), false);
			if (car != null) {
				car.getPowerConnectors().add(pc);
			}
		}

		System.out.println("-> Added batteries and powerConnectors to all cars.\n");
	}


	private static void completeStations()
	{
		if (! areStationsLoaded) { // no need to have loaded chargingPoints yet!
			return;
		}

		// Payments:

		Entry entry = new Payment();
		ArrayList<Payment> payments = getPayments();

		for (Station station : allStations) {
			Payment payment = entry.findEntryID(payments, station.getIdPayment(), false);
			if (payment != null) {
				station.setPayment(payment);
			}
		}

		// ChargingPoints IDs:

		entry = new Station();
		boolean stationsCheck = entry.checkEntriesIDrange(allStations); // used for speed!
		ArrayList<StationChargingPoint> stationChargingPoints = getStationChargingPoints();

		for (StationChargingPoint scp : stationChargingPoints) {
			Station station = entry.findEntryID(allStations, scp.getIdStation(), stationsCheck);
			if (station != null) {
				station.getChargingPointsID().add(scp.getIdChargingPoint());
			}
		}

		System.out.println("-> Added payments and charging points IDs to all stations.\n");
	}


	private static void completeChargingPoints()
	{
		if (! areChargingPointsLoaded) {
			return;
		}

		// Statuses:

		Entry entry = new Status();
		ArrayList<Status> statuses = getStatuses();

		for (ChargingPoint cp : allChargingPoints) {
			Status status = entry.findEntryID(statuses, cp.getIdStatus(), false);
			if (status != null) {
				cp.setUsability(status);
			}
		}

		// Connectors:

		entry = new Connector();
		ArrayList<Connector> connectors = getConnectors();

		for (ChargingPoint cp : allChargingPoints) {
			Connector connector = entry.findEntryID(connectors, cp.getIdConnector(), false);
			if (connector != null) {
				cp.setConnector(connector);
			}
		}

		// Powers:

		entry = new Power();
		ArrayList<Power> powers = getPowers();

		for (ChargingPoint cp : allChargingPoints) {
			Power power = entry.findEntryID(powers, cp.getIdPower(), false);
			if (power != null) {
				cp.setPower(power);
			}
		}

		System.out.println("-> Added statuses, connectors, and powers to all charging points.\n");
	}


	private static void completePowerConnectors()
	{
		if (! arePowerConnectorsLoaded) {
			return;
		}

		// Connectors:

		Entry entry = new Connector();
		ArrayList<Connector> connectors = getConnectors();

		for (PowerConnector pc : allPowerConnectors) {
			Connector connector = entry.findEntryID(connectors, pc.getIdConnector(), false);
			if (connector != null) {
				pc.setConnector(connector);
			}
		}

		// Powers:

		entry = new Power();
		ArrayList<Power> powers = getPowers();

		for (PowerConnector pc : allPowerConnectors) {
			Power power = entry.findEntryID(powers, pc.getIdPower(), false);
			if (power != null) {
				pc.setPower(power);
			}
		}

		System.out.println("-> Added connectors and powers to all PowerConnectors.\n");
	}


	// The result of this function should be closed at its end life.
	public static Connection getConnection()
	{
		String database = "BorneToGo";
		String user = "root";
		String pwd = "aaa"; // this could be dehardcoded.

		String protocol = "jdbc:mysql://";
		String options = "?useSSL=false"; // necessary for requesting from the container.

		ArrayList<String> ipCandidates = new ArrayList<String>();
		ipCandidates.add("database:3306"); // service name = container IP. Always checked first.
		ipCandidates.add("localhost:3456"); // host IP and port.

		Connection connection = null;
		String warningStatus = "Warning";

		for (String ip : ipCandidates)
		{
			String url = protocol + ip + "/" + database + options;

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
		getPowers();
		getConnectors();
		getPayments();
		getPowerConnectors();
		getStationChargingPoints();

		// Entry search:
		Entry entry = new Car();
		ArrayList<Car> cars = getCars();
		boolean carsCheck = entry.checkEntriesIDrange(cars); // for speed.
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
