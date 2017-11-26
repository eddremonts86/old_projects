<?php include ('clases/start.php');
	if ($_SESSION["autentificado"] != "1" || $_SESSION["autentificado"] != "0"){	
		header ("Location: ../../../index.php");	
		exit();
		}
	else if($_SESSION["autentificado"] == "0") {	
		header ("Location: ../../../index3.php");	
		exit(); 
		}	
?>