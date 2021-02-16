package main.java.bornetogo.backend;


public class Current
{
	private int idCurrent;
	private String name;
	private String description;


	public Current(int idCurrent, String name, String description)
	{
		this.idCurrent = idCurrent;
		this.name = name;
		this.description = description;
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
