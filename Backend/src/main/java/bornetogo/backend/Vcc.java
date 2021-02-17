package main.java.bornetogo.backend;

import java.sql.*;


public class Vcc extends Entry
{
	private int idVcc;
	private int idCar;
	private int idConnector;
	private int idCurrent;
	private double wattage;


	public Vcc() {}


	public Vcc query(ResultSet answer)
	{
		Vcc v = new Vcc();

		try {
			v.idVcc = answer.getInt("idVCC");
			v.idCar = answer.getInt("idVoiture");
			v.idConnector = answer.getInt("idConnecteur");
			v.idCurrent = answer.getInt("idCourant");
			v.wattage = Entry.sanitize(answer.getDouble("Puissance"));

			// String row = "-> " + v.idVcc + ", " + v.idCar + ", " + v.idConnector
			// 	+ ", " + v.idCurrent + ", " + v.wattage;
			// System.out.println(row);

			return v;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getID()
	{
		return this.idVcc;
	}


	public int getIdCar()
	{
		return this.idCar;
	}


	public int getIdConnector()
	{
		return this.idConnector;
	}


	public int getIdCurrent()
	{
		return this.idCurrent;
	}


	public double getWattage()
	{
		return this.wattage;
	}
}
