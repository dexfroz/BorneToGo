package main.java.bornetogo.backend;

import java.io.*;
import java.net.*;
import java.nio.charset.*;
import jakarta.json.*;


public class GetJson
{
	public static URL getUrlObject(String url)
	{
		try {
			return new URL(url);
		}
		catch (Exception e) {
			System.err.printf("\nInvalid url: '%s'.\n", url);
			return null;
		}
	}


	private static Reader readerFromInputStream(InputStream inputStream)
	{
		return new InputStreamReader(inputStream, StandardCharsets.UTF_8);
	}


	public static JsonObject jsonFromReader(Reader reader)
	{
		try	{
			JsonReader jsonReader = Json.createReader(reader);
			JsonObject json = jsonReader.readObject();
			jsonReader.close();
			return json;
		}
		catch (Exception e) {
			System.err.printf("\nCould not create a JsonObject from the given reader.\n");
			return null;
		}
	}


	public static JsonObject jsonFromString(String jsonString)
	{
		try	{
			return jsonFromReader(new StringReader(jsonString));
		}
		catch (Exception e) {
			System.err.printf("\nCould not create a JsonObject from the given string: '%s'.\n", jsonString);
			return null;
		}
	}


	public static JsonObject jsonFromUrl(String url)
	{
		URL urlObject = getUrlObject(url);

		try {
			return jsonFromReader(readerFromInputStream(urlObject.openStream()));
		}
		catch (Exception e) {
			System.err.printf("\nNo json at the given URL: '%s'.\n", url);
			return null;
		}
	}


	// Get the html content of the given web page. Returns null on invalid url, and "" on 404.
	public static String getHTMLcontent(String url)
	{
		URL urlObject = getUrlObject(url);
		String content = "";

		try (BufferedReader reader = new BufferedReader(readerFromInputStream(urlObject.openStream()))) {
			for (String line; (line = reader.readLine()) != null;) {
				content += line + "\n";
			}

			reader.close();
			return content;
		}
		catch (Exception e) {
			System.err.printf("\nPage '%s' not found.\n", url);
			return "";
		}
	}


	public static void main(String[] args)
	{
		String jsonString = FileContent.read("some_json.json");
		JsonObject json = jsonFromString(jsonString);
		System.out.println("\n" + json.toString() + "\n");
	}
}
