<?php
$connection= mysql_connect("localhost","edd","edd") or die("Connection Failed".mysql_error());  
	mysql_select_db("rpa",$connection)or die("Error loading the DataBase".mysql_error()); 
	header("Content-Type: text/plain");

$_PUT  = array();
if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
$Name =$_PUT['Name'];
$plan=$_PUT['coment'];
$dir=$_FILES['photo-path']['name'];
$result= mysql_query( "INSERT INTO `rpa_plan` (`idPl`,`plan`,`name`,`dir`)VALUES('','$plan','$Name','$dir')");



if(isset($_FILES['photo-path']) && is_uploaded_file($_FILES['photo-path']['tmp_name']))
{
 set_time_limit(0);
 $archivo = $_FILES['photo-path']['tmp_name'];
 $archivo_name = $_FILES['photo-path']['name'];
 copy($archivo, "datos/" . $archivo_name); 	 
//echo '{success:true, file:'.json_encode($_FILES['photo-path']['name']).'}';
unlink($archivo);
}
else echo '{success:false, file:'.json_encode($_FILES['photo-path']['name']).'}';
