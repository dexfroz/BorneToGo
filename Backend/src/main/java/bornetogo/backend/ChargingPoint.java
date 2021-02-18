package main.java.bornetogo.backend;

import java.io.*;
import jakarta.json.*;
import java.sql.*;


// TODO: Load connector, current, and status status data (thus building isUsable).

public class ChargingPoint extends Entry
{
	private boolean isUsable = true;
	private double wattage;
	private String connector = "";
	private String current = "";

	// In reguards to the database:
	private int idChargingPoint; // used to avoid reundancies in Stations.
	private int idConnector;
	private int idCurrent;
	private int idStatus;


	public ChargingPoint() {}


	public ChargingPoint query(ResultSet answer)
	{
		ChargingPoint c = new ChargingPoint();

		try	{
			c.idChargingPoint = answer.getInt("idBorne");
			c.idConnector = answer.getInt("idConnecteur");
			c.idCurrent = answer.getInt("idCourant");
			c.idStatus = answer.getInt("idStatus");
			c.wattage = Entry.sanitize(answer.getDouble("Puissance"));

			// String row = "-> " + c.idChargingPoint + ", " + c.idConnector + ", " + c.idCurrent + ", " +
			// 	c.idStatus + ", " + c.wattage;
			// System.out.println(row);

			return c;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public boolean isUsable()
	{
		return this.isUsable;
	}


	public String getConnector()
	{
		return this.connector;
	}


	public String getCurrent()
	{
		return this.current;
	}


	public double getWattage()
	{
		return this.wattage;
	}


	public int getId()
	{
		return this.idChargingPoint;
	}


	public int getIdConnector()
	{
		return this.idConnector;
	}


	public int getIdCurrent()
	{
		return this.idCurrent;
	}


	public int getIdStatus()
	{
		return this.idStatus;
	}


	public void setUsability(boolean b)
	{
		this.isUsable = b;
	}


	public JsonObject toJson()
	{
		return Json.createObjectBuilder()
			.add("status", this.isUsable)
			.add("puissance", this.wattage)
			.add("connecteur", this.connector)
			.add("courant", this.current)
			.build();
	}
}
