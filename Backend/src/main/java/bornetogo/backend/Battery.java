package main.java.bornetogo.backend;


public class Battery
{
	private int idBatterie;
	private double capacity;
	private double autonomy;


	public Battery(int idBatterie, double capacity, double autonomy)
	{
		this.idBatterie = idBatterie;
		this.capacity = capacity;
		this.autonomy = autonomy;
	}


	public int getID()
	{
		return this.idBatterie;
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
