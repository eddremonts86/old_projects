<?php/*
if ($_GET['termino'] ==Pendientes){
}
else if ($_GET['termino'] ==Pendientes){
}*/
header("Content-Type: text/plain"); 
	include 'user.php';
	$hard=new Usuario();
	// Support for the PUT method
	$_PUT  = array();
	if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
	
	$Nombre = $_PUT['Nombre'];
	$email =  $_PUT['Email'];	
	$comentario =  $_PUT['Coment'];	
	
	/*Guardar los datos en la BD*/
	 $a=$hard->Abusos($comentario,$Nombre,$email);
	 /*            Fin              */	
	if(rand(0,1)===0){
		//header('HTTP/1.1 201 Created success');
		$info = array(
			'success' => true,
			'msg' => 'Se a enviado su queja, le daremos respuesta en cuanto sea consultada'
		);
	}
	echo json_encode($info);
?>