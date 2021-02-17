package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import java.sql.*;


public abstract class Entry
{
	public abstract int getID();

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


	// Checks if the entries table has IDs in increasing order, from 1,
	// and without gaps, in order to activate the fast search:
	public <T extends Entry> boolean checkEntriesIDrange(ArrayList<T> entries)
	{
		if (entries == null || entries.size() == 0 || entries.get(0).getID() != 1) {
			return false;
		}

		for (int i = 1; i < entries.size() - 1; ++i) {
			if (entries.get(i + 1).getID() - entries.get(i).getID() != 1) { // gap detected.
				return false;
			}
		}

		return true;
	}


	// 'idCheck' must have been computed beforehand for the current entries using checkEntriesIDrange(),
	// potentially giving access to a faster method. A value of false may be used by default.
	// Returns null on failure.
	public <T extends Entry> T findEntryID(ArrayList<T> entries, int id, boolean idCheck)
	{
		if (idCheck) // fast mode!
		{
			// Using the knowledge that ID values are in increasing order, without gaps:
			if (1 <= id && id <= entries.size()) {
				return entries.get(id - 1);
			}
		}
		else // This assumes nothing on entries IDs:
		{
			for (T entry : entries)
			{
				if (entry.getID() == id) {
					return entry;
				}
			}
		}

		System.err.printf("No entry of class '%s' found for id %d.\n",
			this.getClass().getSimpleName(), id);
		return null;
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
