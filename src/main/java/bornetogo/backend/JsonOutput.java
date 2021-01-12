package main.java.bornetogo.backend;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import jakarta.json.*;
import java.util.*;



public class JsonOutput
{
	public static JsonObject test(String[] list)
	{
		JsonArrayBuilder builder = Json.createArrayBuilder();

		for (String s : list) {
			builder.add(s);
		}

		JsonArray array = builder.build();

		JsonObject obj = Json.createObjectBuilder()
			.add("élément1", list[0])
			.add("reste des éléments", array)
			.build();

		return obj;

	}
	public static void main(String[] args)
	{
		System.out.println("HELLO WORLD");
		String[] testoune = {"élément 1","reste","des","éléments"};
		JsonObject obj = JsonOutput.test(testoune);
		System.out.println(obj.getJsonArray("reste des éléments"));
	}



}
