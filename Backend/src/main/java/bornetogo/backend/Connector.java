package main.java.bornetogo.backend;

import java.sql.*;


public class Connector extends Entry
{
	private int idConnector;
	private String title;
	private String name;


	public Connector() {}


	public Connector query(ResultSet answer)
	{
		Connector c = new Connector();

		try {
			c.idConnector = answer.getInt("idConnecteur");
			c.title = Entry.sanitize(answer.getString("Titre"));
			c.name = Entry.sanitize(answer.getString("Name"));

			// String row = "-> " + c.idConnector + ", " + c.title + ", " + c.name;
			// System.out.println(row);

			return c;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getId()
	{
		return this.idConnector;
	}


	public String getTitle()
	{
		return this.title;
	}


	public String getName()
	{
		return this.name;
	}
}
