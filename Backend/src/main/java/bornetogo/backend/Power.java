package main.java.bornetogo.backend;

import java.sql.*;


public class Power extends Entry
{
	private int idPower;
	private String name = "";
	private String description = "";


	public Power() {}


	public Power query(ResultSet answer)
	{
		Power p = new Power();

		try {
			p.idPower = answer.getInt("idCourant");
			p.name = answer.getString("Titre");
			p.description = answer.getString("Description");

			// String row = "-> " + p.idPower + ", " + p.name + ", " + p.description;
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
		return this.idPower;
	}


	public String getName()
	{
		return this.name;
	}


	public String getDescription()
	{
		return this.description;
	}
}
