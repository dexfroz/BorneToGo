package main.java.bornetogo.backend;

import java.sql.*;


public class StationChargingPoint extends Entry
{
	private int idStationChargingPoint;
	private int idStation;
	private int idChargingPoint;


	public StationChargingPoint() {}


	public StationChargingPoint query(ResultSet answer)
	{
		StationChargingPoint s = new StationChargingPoint();

		try {
			s.idStationChargingPoint = answer.getInt("idStationBorne");
			s.idStation = answer.getInt("idStation");
			s.idChargingPoint = answer.getInt("idBorne");

			// String row = "-> " + s.idStationChargingPoint + ", " + s.idStation + ", " + s.idChargingPoint;
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
		return this.idStationChargingPoint;
	}


	public int getIdStation()
	{
		return this.idStation;
	}


	public int getIdChargingPoint()
	{
		return this.idChargingPoint;
	}
}
