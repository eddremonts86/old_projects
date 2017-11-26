<?php
include 'config/configFile1.php';
$_SESSION["autentificado"];
if($_GET['termino']==login){
			$_PUT  = array();
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
			$passw =  $_PUT['passw'];
			$passwd=md5('$passw');
			$correo =  $_PUT['Email'];
			$name =  $_PUT['Nombre'];
			$result= mysql_query("Select count(*) from rpa_user where name='$name' and passw='$passw'");
			$idRol = mysql_query("SELECT * FROM rpa_user Where name='$name' and passw='$passw'");
			$row= mysql_fetch_array($idRol);
			$ya=$row["idro"];
			$count=	mysql_result($result,0,0);
				if($count>0){
						session_start();
						$_SESSION["autentificado"]= "1";						
						$info = array('success' => true,'msg' => 'Bienvenido '.$name.'. ');
				   }
				else{
				$info = array('success' => false,'msg' => 'No se encontraron coincidencias,Reescrba sus credenciales.');
					}
					echo json_encode($info);
		}
?>