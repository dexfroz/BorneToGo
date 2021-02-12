package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class ChargingPoint
{
	private int id; // used to avoid reundancies.
	private Boolean isUsable;
	private ArrayList<String> connectors;
	private ArrayList<String> currents;


	public int getID()
	{
		return this.id;
	}


	public Boolean isUsable()
	{
		return this.isUsable;
	}


	public ArrayList<String> getConnectors()
	{
		return this.connectors;
	}


	public ArrayList<String> getCurrents()
	{
		return this.currents;
	}


	// TODO
	public JsonObject getJsonData()
	{
		return Json.createObjectBuilder()
			// .add("things", 0.)
			.build();
	}
}
