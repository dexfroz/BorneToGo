package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.sql.*;


public abstract class Table
{
	public abstract <T> T query(ResultSet answer);


	public <T> ArrayList<T> loadTable(String tableName)
	{
		ArrayList<T> entries = new ArrayList<T>();
		String query = "SELECT * FROM " + tableName + ";";

		try
		{
			Connection connection = DatabaseConnector.getConnection();
			Statement statement = connection.createStatement();
			ResultSet answer = statement.executeQuery(query);

			while (answer.next())
			{
				T entry = query(answer);

				if (entry == null) {
					System.err.printf("null entry for class '%s': query() method failed!\n",
						this.getClass().getSimpleName());
					return entries;
				}

				entries.add(entry);
			}

			connection.close();
		}
		catch (Exception e) {
			// e.printStackTrace();
			System.err.println("\nInvalid SQL query: '" + query + "'\n");
		}

		System.out.println("Loaded " + entries.size() + " entries from '" + tableName + "'.\n");
		return entries;
	}


	// Returns an empty string for default values:
	public static String sanitize(String field)
	{
		if (field.equals("0") || field.equals("-1")) {
			return "";
		}

		return field;
	}


	// Returns 0. for default values:
	public static double sanitize(double field)
	{
		if (field == -1.) {
			return 0.;
		}

		return field;
	}


	// Returns 0 for default values:
	public static int sanitize(int field)
	{
		if (field == -1) {
			return 0;
		}

		return field;
	}
}
