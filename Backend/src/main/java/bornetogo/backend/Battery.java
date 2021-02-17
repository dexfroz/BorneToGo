package main.java.bornetogo.backend;

import java.sql.*;


public class Battery extends Table
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
			b.capacity = Table.sanitize(answer.getDouble("Capacite"));
			b.autonomy = Table.sanitize(answer.getDouble("Autonomie"));

			// String row = "-> " + b.idBattery + ", " + b.capacity + ", " + b.autonomy;
			// System.out.println(row);

			return b;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getID()
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
