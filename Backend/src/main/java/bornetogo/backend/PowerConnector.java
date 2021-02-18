package main.java.bornetogo.backend;

import java.sql.*;


public class PowerConnector extends Entry
{
	private int idPowerConnector;
	private int idCar;
	private int idConnector;
	private int idPower;
	private double wattage;


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


	public double getWattage()
	{
		return this.wattage;
	}
}
