package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;


public class UserStepsLoader
{
	private static final boolean enableUserStepsFiltering = true;

	private ArrayList<Coord> userSteps;
	private ArrayList<Integer> indexesCoordsToComplete;
	private ArrayList<String> searchedLocations;


	private UserStepsLoader()
	{
		this.userSteps = new ArrayList<Coord>();
		this.indexesCoordsToComplete = new ArrayList<Integer>();
		this.searchedLocations = new ArrayList<String>();
	}


	// Sets this.userSteps to null on failure.
	private void getFromJson(JsonObject input)
	{
		try
		{
			JsonArray stepsArray = input.getJsonArray("userSteps");

			for (int i = 0; i < stepsArray.size(); ++i)
			{
				JsonObject step = stepsArray.getJsonObject(i);
				String name = step.getString("name");
				String address = step.getString("address");
				JsonArray coordJson = step.getJsonArray("location");

				Coord coord = Coord.getFromJsonArray(coordJson, name, address, Coord.Format.LONG_LAT);

				if (coord != null) {
					this.userSteps.add(coord);
				}
				else if (name.equals("") && address.equals(""))
				{
					System.err.println("\nTotally empty location in the input json!\n");
					this.userSteps = null;
					break;
				}
				else
				{
					System.err.println("Warning: user step at index " + i + " is missing coordinates.\n");
					coord = new Coord(0., 0., name, address);
					this.userSteps.add(coord);
					this.indexesCoordsToComplete.add(i);
					this.searchedLocations.add(name + "," + address);
				}
			}
		}
		catch (Exception e) {
			System.err.println("\nError: could not extract user steps from the following json:");
			GetJson.safeJsonPrinting(input);
			this.userSteps = null;
		}
	}


	// Sets this.userSteps to null on failure.
	private void completeUserSteps()
	{
		if (this.userSteps == null || this.searchedLocations.size() == 0) {
			return; // getFromJson() failed or coords already complete.
		}

		try
		{
			// Sending BATCH requests to the geocoding API, to retrieve the location coordinates from the name and address:
			System.out.println("=> Completing user steps.\n");
			JsonObject answerJson = QueryAPIs.queryFromLocation("mapquestapi", this.searchedLocations);
			JsonArray resultsArray = answerJson.getJsonArray("results");

			for (int i = 0; i < this.searchedLocations.size(); ++i)
			{
				JsonObject currentResult = resultsArray.getJsonObject(i);
				JsonArray locationsArray = currentResult.getJsonArray("locations");
				JsonObject firstLocation = locationsArray.getJsonObject(0); // always the first result!
				JsonObject latLngJson = firstLocation.getJsonObject("latLng");

				double latitude = latLngJson.getJsonNumber​("lat").doubleValue();
				double longitude = latLngJson.getJsonNumber​("lng").doubleValue();

				int indexTofill = this.indexesCoordsToComplete.get(i);
				Coord coordToComplete = this.userSteps.get(indexTofill);
				coordToComplete.move(latitude, longitude);
			}
		}
		catch (Exception e) {
			System.err.println("\nFailure while trying to complete the user steps.\n");
			this.userSteps = null;
		}
	}


	// Used to remove consecutive duplicates:
	private void filterUserSteps()
	{
		if (!enableUserStepsFiltering || this.userSteps == null || this.userSteps.size() == 0) {
			return;
		}

		ArrayList<Coord> filteredUserSteps = new ArrayList<Coord>();
		filteredUserSteps.add(this.userSteps.get(0));

		for (Coord currentCoord : this.userSteps)
		{
			Coord lastAddedcoord = filteredUserSteps.get(filteredUserSteps.size() - 1);

			if (! currentCoord.isAtSameSpot(lastAddedcoord)) {
				filteredUserSteps.add(currentCoord);
			}
		}

		this.userSteps = filteredUserSteps;
	}


	// Returns null on failure:
	public static ArrayList<Coord> load(JsonObject input)
	{
		UserStepsLoader loader = new UserStepsLoader();
		loader.getFromJson(input);
		loader.completeUserSteps();
		loader.filterUserSteps();

		if (loader.userSteps == null || loader.userSteps.size() == 0) {
			System.err.println("\nAt least 1 user step is needed in the input json.\n");
			return null;
		}

		return loader.userSteps;
	}


	public static void main(String[] args)
	{
		String inputString = FileContent.read("input_example.json");
		// String inputString = FileContent.read("input_example_singleStep.json");

		JsonObject input = GetJson.jsonFromString(inputString);
		ArrayList<Coord> userSteps = load(input);

		for (Coord coord : userSteps) {
			System.out.println(coord.toString() + "\n");
		}
	}
}
