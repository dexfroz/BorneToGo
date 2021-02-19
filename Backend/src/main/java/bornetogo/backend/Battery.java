package main.java.bornetogo.backend;

import java.sql.*;


public class Battery extends Entry
{
	private int idBattery;
	private double capacity;
	private double autonomy;


	public Battery() {}


	public Battery query(ResultSet answer)
	{
		Battery b = new Battery();

		try {
			b.idBattery = answer.getInt("idBatterie");
			b.capacity = Entry.sanitize(answer.getDouble("Capacite"));
			b.autonomy = Entry.sanitize(answer.getDouble("Autonomie"));

			// String row = "-> " + b.idBattery + ", " + b.capacity + ", " + b.autonomy;
			// System.out.println(row);

			return b;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getId()
	{
		return this.idBattery;
	}


	public double getCapacity()
	{
		return this.capacity;
	}


	public double getAutonomy()
	{
		return this.autonomy;
	}
}
