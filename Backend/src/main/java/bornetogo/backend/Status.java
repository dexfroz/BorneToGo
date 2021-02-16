package main.java.bornetogo.backend;


public class Status
{
	private int idStatus;
	private String name;
	private boolean isOperational;
	private boolean isUserSelectable;


	public Status(int idStatus, String name, boolean isOperational, boolean isUserSelectable)
	{
		this.idStatus = idStatus;
		this.name = name;
		this.isOperational = isOperational;
		this.isUserSelectable = isUserSelectable;
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
