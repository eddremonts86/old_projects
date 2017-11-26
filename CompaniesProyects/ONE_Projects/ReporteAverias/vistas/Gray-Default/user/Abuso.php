		<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/resources/css/ext-all.css "/>
		<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/resources/css/xtheme-gray.css" />	
		<link rel='stylesheet' type='text/css' media='screen' href='../../../Jss/extjs/examples/form/forms.css' />		
		<script type="text/javascript" src="../../../Jss/extjs/adapter/ext/ext-base.js"></script>		
		<script type="text/javascript" src="../../../Jss/extjs/ext-all.js"></script>
		<script type="text/javascript" src="../../../Jss/extjs/src/locale/ext-lang-es.js"></script>
		<script type="text/javascript" src="../../../Jss/Personalizadas/user/Abuso.js"></script>

		
<?php
if($_GET['termino'] ==abuso){
	header("Content-Type: text/plain"); 
	include '../../clases/user.php';
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
			'msg' => 'Sus datos han sido enviados'
		);
	}else{
		//header('HTTP/1.1 501 Error saving the record');
		$info = array(
			'success' => false,
			'msg' => 'Ocurri un error en el proceso de guardar los datos'
		);
	}
	echo json_encode($info);
	}
?>