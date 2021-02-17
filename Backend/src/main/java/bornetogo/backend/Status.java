package main.java.bornetogo.backend;

import java.sql.*;


public class Status extends Entry
{
	private int idStatus;
	private String name;
	private boolean isOperational;
	private boolean isUserSelectable;


	public Status() {}


	public Status query(ResultSet answer)
	{
		Status s = new Status();

		try {
			s.idStatus = answer.getInt("idStatus");
			s.name = Entry.sanitize(answer.getString("titre"));
			s.isOperational = answer.getBoolean("isOperational");
			s.isUserSelectable = answer.getBoolean("isUserSelectable");

			// String row = "-> " + s.idStatus + ", " + s.name + ", " + s.isOperational + ", " + s.isUserSelectable;
			// System.out.println(row);

			return s;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getID()
	{
		return this.idStatus;
	}


	public String getName()
	{
		return this.name;
	}


	public boolean isOperational()
	{
		return this.isOperational;
	}


	public boolean isUserSelectable()
	{
		return this.isUserSelectable;
	}
}
