<?php
	$local= "localhost";
	$user= "edd";
	$passw= "edd";
	$db="calidad";
	$connection= mysql_connect("$local","$user","$passw") or die("Connection Failed".mysql_error());
	mysql_select_db("$db",$connection)or die("Error loading the DataBase".mysql_error());
?>

