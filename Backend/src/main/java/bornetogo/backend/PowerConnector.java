package main.java.bornetogo.backend;

import jakarta.json.*;
import java.sql.*;


public class PowerConnector extends Entry
{
	private Connector connector;
	private Power power;
	private double wattage; // in kW

	// In reguards to the database:
	private int idPowerConnector;
	private int idCar;
	private int idConnector;
	private int idPower;


	public PowerConnector() {}


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
}
