package main.java.bornetogo.backend;

import java.sql.*;

public class Bdd_connector{

	public static void main(String args[]){
		
		Connection conn = null;
		Statement stat = null;
		ResultSet res = null;

		try{
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/BorneToGo","root","");
			stat = conn.createStatement();
			res = stat.executeQuery("select idStation from Station");

			 while(res.next()){
				System.out.println(res.getInt(1));
			}
		conn.close();

		}
		catch(Exception e){e.printStackTrace();}		
	}
	
}
