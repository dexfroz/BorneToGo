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
			p.name = Entry.sanitize(answer.getString("Titre"));
			p.description = Entry.sanitize(answer.getString("Description"));

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


	// For testing only:
	public static Power mock()
	{
		Power power = new Power();
		power.idPower = 0;
		power.name = "AC (Three-Phase)";
		power.description = "";
		return power;
	}
}
