package main.java.bornetogo.backend;

import java.io.*;
import java.util.*;
import jakarta.json.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;


// N.B: Do not put a main function here, it can't be run.

@Path("/")
public class RequestHandler
{
	@GET
	public Response helloWorld()
	{
		JsonObject obj = Json.createObjectBuilder().add("hello", "world").build();
		return Response.ok(obj).build();
	}


	@GET
	@Path("get/{param}")
	public Response answerGETrequest(@PathParam("param") String request)
	{
		String answer = "GET answer: " + request;
		return Response.ok(answer).build();
	}


	@POST
	@Path("post")
	// @Consumes(MediaType.TEXT_PLAIN)
	// @Produces(MediaType.TEXT_PLAIN)
	public Response answerPOSTrequest(String request)
	{
		String answer = "POST answer: " + request;
		return Response.ok().entity(answer).build(); // alternative syntax
	}


	@GET
	@Path("file")
	public Response answerFileRequest()
	{
		String filename = "some_text_file.txt";
		// String filename = "not_existing_file.txt";

		String content = FileContent.read(filename);
		String answer = "File content: " + content; // all '\n' are ignored!

		// Equivalent to 404 / 200:
		Response.Status status = content == null ? Response.Status.NOT_FOUND : Response.Status.OK;
		return Response.status(status).entity(answer).build();
	}


	@GET
	@Path("cars")
	public Response getCars()
	{
		try
		{
			ArrayList<Car> allCars = DatabaseConnector.getCars();

			if (allCars == null) {
				return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity("Cars could not be loaded by the backend.").build();
			}

			JsonArrayBuilder carsBuilder = Json.createArrayBuilder();

			for (Car car : allCars) {
				carsBuilder.add(car.toJson());
			}

			JsonArray carsArray = carsBuilder.build();

			JsonObject carsJson = Json.createObjectBuilder()
				.add("cars", carsArray)
				.build();

			return Response.ok(carsJson).build();
		}
		catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
				.entity("Unknown error.").build();
		}
	}


	@GET
	@Path("mockpath")
	public Response mockOutput()
	{
		try
		{
			// String inputString = FileContent.read("input_example.json");
			String inputString = FileContent.read("input_example_singleStep.json");

			JsonObject input = GetJson.jsonFromString(inputString);
			JsonObject output = Core.core(input);

			if (output == null) {
				return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity("Core program failed to output a path.").build();
			}

			return Response.ok(output).build();
		}
		catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
				.entity("Unknown error.").build();
		}
	}


	@POST
	@Path("path")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response backendOutput(String stringQuery)
	{
		try
		{
			JsonReader reader = Json.createReader(new StringReader(stringQuery));
			JsonObject input = reader.readObject();
			reader.close();

			JsonObject output = Core.core(input);

			if (output == null) {
				return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity("Core program failed to output a path.").build();
			}

			return Response.ok(output).build();
		}
		catch (Exception e) {
			return Response.status(Response.Status.BAD_REQUEST)
				.entity("Wrong request.").build();
		}
	}


	@GET
	@Path("database")
	public Response testDatabaseConnectivity()
	{
		try
		{
			String result = DatabaseConnector.connect();
			return Response.ok(result).build();
		}
		catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
				.entity("Error while trying to connect to the database.").build();
		}
	}
}
