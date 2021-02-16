package main.java.bornetogo.backend;


public class Connector
{
	private int idConnector;
	private String title;
	private String name;


	public Connector(int idConnector, String title, String name)
	{
		this.idConnector = idConnector;
		this.title = title;
		this.name = name;
	}


	public int getID()
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
