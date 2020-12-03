package bornetogo.backend;

import java.io.*;


public class FileContent
{
	// Returns the content of the given file as a String, assuming it is
	// located in '/src/main/resources/'. Returns null on failure.
	public static String getFileContent(String filename)
	{
		try // getResourceAsStream() method used in order to have a unified
		{   // framework between 'local' testing, and usage in the REST API.
			FileContent handler = new FileContent();
			InputStream inputStream = handler.getClass().getResourceAsStream("/" + filename);

			if (inputStream == null) {
				System.out.printf("\nFile '%s' not found.\n\n", filename);
				return null;
			}

			ByteArrayOutputStream result = new ByteArrayOutputStream();
			byte[] buffer = new byte[1024];
			int length;
			while ((length = inputStream.read(buffer)) != -1) {
				result.write(buffer, 0, length);
			}

			inputStream.close(); // 'result' need not to be closed.
			return result.toString("UTF-8");
		}
		catch (IOException e)
		{
			System.out.printf("\nAn error happened while reading the file '%s'.\n\n", filename);
			e.printStackTrace();
			return null;
		}
	}


	public static void main(String[] args)
	{
		System.out.println("\nHello world!\n");

		for (String arg : args) {
			System.out.println(arg);
		}

		String filename = "some_text_file.txt";
		// String filename = "not_existing_file.txt";

		String content = getFileContent(filename);
		System.out.println("\nFile content: " + content);
	}
}
