<?php
	header("Content-Type: text/plain"); 
    include '../../user.php';
	$user = new Usuario();	
	// Support for the PUT method
	$_PUT  = array();
	if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);	}
	$local = $_PUT['Localidad'];
	$prov =  $_PUT['Provincia'];
	$munc = $_PUT['Municipio'];
	$area = $_PUT['Area'];	
	$equip = $_PUT['Equipo'];	
	$codigo = $_PUT['Codigo'];	
	$nombre = $_PUT['Nombre'];	
	$email = $_PUT['email'];	
	$comentario = $_PUT['comentario'];	
	$estado=0;
	$fecha = date("Y-m-d");
	//save your data here in your data base or whatever you want ;)	
	$a=$usuario->Realizar($equip,$comentario,$prov,$munc,$area,$fecha,$codigo,$estado);               			 
	if(rand(0,1)===0){
		//header('HTTP/1.1 201 Created success');
		$info = array(
			'success' => true,
			'msg' => 'Todos los datos fueron guardados satisfactoriamente'
		);
	}else{
		//header('HTTP/1.1 501 Error saving the record');
		$info = array(
			'success' => false,
			'msg' => 'Ha ocurrido un error en el proceso de envio'
		);
	}
	echo json_encode($info);
?>
