package main.java.bornetogo.backend;

import java.sql.*;


public class Payment extends Entry
{
	private int idPayment;
	private String name;
	private boolean isPayAtLocation;
	private boolean isMembershipRequired;
	private boolean isAccessKeyRequired;


	public Payment() {}


	public Payment query(ResultSet answer)
	{
		Payment p = new Payment();

		try {
			p.idPayment = answer.getInt("idPaiement");
			p.name = Entry.sanitize(answer.getString("Titre"));
			p.isPayAtLocation = answer.getBoolean("isPayAtLocation");
			p.isMembershipRequired = answer.getBoolean("isMembershipRequired");
			p.isAccessKeyRequired = answer.getBoolean("isAccessKeyRequired");

			// String row = "-> " + p.idPayment + ", " + p.name + ", " + p.isPayAtLocation +
			// 	", " + p.isMembershipRequired + ", " + p.isAccessKeyRequired;
			// System.out.println(row);

			return p;
		}
		catch (Exception e) {
			System.err.printf("\nInvalid fields in '%s' query.\n", this.getClass().getSimpleName());
			return null;
		}
	}


	public int getId()
	{
		return this.idPayment;
	}


	public String getName()
	{
		return this.name;
	}


	public boolean isPayAtLocation()
	{
		return this.isPayAtLocation;
	}


	public boolean isMembershipRequired()
	{
		return this.isMembershipRequired;
	}


	public boolean isAccessKeyRequired()
	{
		return this.isAccessKeyRequired;
	}
}
