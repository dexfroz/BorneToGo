package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;
import java.sql.*;


public class PowerConnector extends Entry
{
	private Power power;
	private Connector connector;
	private double wattage; // in kW

	// In reguards to the database:
	private int idPowerConnector;
	private int idCar;
	private int idPower;
	private int idConnector;


	public PowerConnector() {}


	// Used with user given names. Returns null on failure.
	public static PowerConnector find(String powerName, String connectorName, double wattage)
	{
		try
		{
			ArrayList<PowerConnector> powerConnectors = DatabaseConnector.getPowerConnectors();

			if (powerConnectors == null) {
				System.err.println("null 'powerConnectors' in PowerConnector()\n");
				return null;
			}

			for (PowerConnector pc : powerConnectors) {
				if (pc != null && pc.getWattage() == wattage && pc.getPower().getName().equals(powerName) &&
					pc.getConnector().getName().equals(connectorName)) {
						return pc;
				}
			}
		}
		catch (Exception e) {
			System.err.println("\nError while building a PowerConnector from user given names.\n");
		}

		return null;
	}


	public PowerConnector query(ResultSet answer)
	{
		PowerConnector p = new PowerConnector();

		try {
			p.idPowerConnector = answer.getInt("idVCC");
			p.idCar = answer.getInt("idVoiture");
			p.idConnector = answer.getInt("idConnecteur");
			p.idPower = answer.getInt("idCourant");
			p.wattage = Entry.sanitize(answer.getDouble("Puissance"));

			// String row = "-> " + p.idPowerConnector + ", " + p.idCar + ", " + p.idConnector
			// 	+ ", " + p.idPower + ", " + p.wattage;
			// System.out.println(row);

			return p;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getId()
	{
		return this.idPowerConnector;
	}


	public int getIdCar()
	{
		return this.idCar;
	}


	public int getIdConnector()
	{
		return this.idConnector;
	}


	public int getIdPower()
	{
		return this.idPower;
	}


	public Connector getConnector()
	{
		return this.connector;
	}


	public Power getPower()
	{
		return this.power;
	}


	public double getWattage()
	{
		return this.wattage;
	}


	public void setConnector(Connector c)
	{
		this.connector = c;
	}


	public void setPower(Power p)
	{
		this.power = p;
	}


	public JsonObject toJson()
	{
		String powerName = this.power == null ? "" : this.power.getName();
		String connectorName = this.connector == null ? "" : this.connector.getName();

		return Json.createObjectBuilder()
			.add("courant", powerName)
			.add("connecteur", connectorName)
			.add("puissance", this.wattage)
			.build();
	}


	// For testing only:
	public static ArrayList<PowerConnector> mock()
	{
		ArrayList<PowerConnector> powerConnectors = new ArrayList<PowerConnector>();
		PowerConnector powerConnector = new PowerConnector();

		powerConnector.power = Power.mock();
		powerConnector.connector = Connector.mock();
		powerConnector.wattage = 22.;
		powerConnector.idPowerConnector = 0;
		powerConnector.idCar = 0;
		powerConnector.idPower = 0;
		powerConnector.idConnector = 0;

		powerConnectors.add(powerConnector);
		return powerConnectors;
	}
}
