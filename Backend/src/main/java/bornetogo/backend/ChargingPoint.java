package main.java.bornetogo.backend;

import java.io.*;
import jakarta.json.*;


public class ChargingPoint
{
	private Boolean isUsable;
	private double wattage;
	private String connector = "";
	private String current = "";

	// In reguards to the database:
	private int idChargingPoint; // used to avoid reundancies in Stations.
	private int idConnector;
	private int idCurrent;
	private int idStatus;


	public ChargingPoint(int idChargingPoint, int idConnector, int idCurrent, int idStatus, double wattage)
	{
		this.idChargingPoint = idChargingPoint;
		this.idConnector = idConnector;
		this.idCurrent = idCurrent;
		this.idStatus = idStatus;
		this.wattage = wattage;

		// TODO: Load connector, current, and status status data (thus building isUsable).
	}


	public int getID()
	{
		return this.idChargingPoint;
	}


	public Boolean isUsable()
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
