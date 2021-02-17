package main.java.bornetogo.backend;

import java.sql.*;


public class Current extends Entry
{
	private int idCurrent;
	private String name;
	private String description;


	public Current() {}


	public Current query(ResultSet answer)
	{
		Current c = new Current();

		try {
			c.idCurrent = answer.getInt("idCourant");
			c.name = answer.getString("Titre");
			c.description = answer.getString("Description");

			// String row = "-> " + c.idCurrent + ", " + c.name + ", " + c.description;
			// System.out.println(row);

			return c;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getID()
	{
		return this.idCurrent;
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
