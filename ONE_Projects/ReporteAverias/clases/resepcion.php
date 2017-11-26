<?php      	 
	include 'config/configFile1.php';
	header("Content-Type: text/plain");
	//Support for the PUT method	
    if($_GET['termino']==createEquipo){
				  $_PUT  = array();
				  if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
				  $equipo = $_PUT['Equipo'];
				  $id =  $_PUT['id'];	
				  $result= mysql_query("INSERT INTO `rpa_equipo` ( `idE` , `nombre`  )VALUES ( '', '$equipo' )");
				if($result){
						$info = array(
						'success' => true,
						'msg' => 'Se ha agregados el equipo "'.$equipo.'" a la lista');
				   }
				else{					 
						$info = array(
						'success' => false,
						'msg' => 'Se encontraron errores al procesar los datos');
					}
					echo json_encode($info);
				}	
	else if($_GET['termino']==eliminarEquipo){	
				 $_PUT  = array();
				 if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			     $equipo = $_PUT['Equipo'];
				 $id =  $_PUT['id'];				 
				 $id = json_decode(stripslashes($_POST["data"]));			 
				 $query = sprintf("DELETE FROM rpa_equipo WHERE idE = '$id'",mysql_real_escape_string($id));  
			   	 $rs  = mysql_query($query); 			
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
				}
	else if($_GET['termino']==createArea){
				  $_PUT  = array();
				  if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
				  $equipo = $_PUT['Equipo'];
				  $id =  $_PUT['id'];	
				  $result= mysql_query("INSERT INTO `rpa_deptamentos` ( `idD` , `dept`  )VALUES ( '', '$equipo' )");
				if($result){
						$info = array(
						'success' => true,
						'msg' => 'Se ha agregados el equipo "'.$equipo.'" a la lista');
				   }
				else{					 
						$info = array(
						'success' => false,
						'msg' => 'Se encontraron errores al procesar los datos');
					}
					echo json_encode($info);
				}		
	else if($_GET['termino']==eliminarArea){	
				 $_PUT  = array();
				 if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			     $equipo = $_PUT['Equipo'];
				 $id =  $_PUT['id'];				 
				 $id = json_decode(stripslashes($_POST["data"]));			 
				 $query = sprintf("DELETE FROM rpa_deptamentos WHERE idD = '$id'",mysql_real_escape_string($id));  
			   	 $rs  = mysql_query($query); 			
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
				}			
	else if($_GET['termino']==eliminarAbuso){	
				 $_PUT  = array();
				 if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			     $equipo = $_PUT['Equipo'];
				 $id =  $_PUT['id'];				 
				 $id = json_decode(stripslashes($_POST["data"]));			 
				 $query = sprintf("DELETE FROM rpa_abusos WHERE ida = '$id'",mysql_real_escape_string($id));  
			   	 $rs  = mysql_query($query); 			
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
				}			
	else if($_GET['termino']==eliminarComentario){	
				 $_PUT  = array();
				 if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			     $equipo = $_PUT['Equipo'];
				 $id =  $_PUT['id'];				 
				 $id = json_decode(stripslashes($_POST["data"]));			 
				 $query = sprintf("DELETE FROM rpa_contacto WHERE idc = '$id'",mysql_real_escape_string($id));  
			   	 $rs  = mysql_query($query); 			
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
				}	
	else if($_GET['termino']==eliminarSolicitud){	
		$_PUT  = array();
		if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
		$id =  $_PUT['id'];				 
		$id = json_decode(stripslashes($_POST["data"]));			 
		$query = sprintf("DELETE FROM rpa_roturas WHERE idR = '$id'",mysql_real_escape_string($id));  
		$rs  = mysql_query($query); 			
		echo json_encode(array(  
		"success"   => mysql_errno() == 0,  
		"msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
		 ));  			
		}
	else if($_GET['termino']==modificarSolicitud){	
				 $_PUT  = array();
				 if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			     $equipo = $_PUT['Equipo'];
				 $id =  $_PUT['id'];				 
				 $id = json_decode(stripslashes($_POST["data"]));			 
				 $query = sprintf("DELETE FROM rpa_equipo WHERE idE = '$id'",mysql_real_escape_string($id));  
			   	 $rs  = mysql_query($query); 			
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
				}			
	else if($_GET['termino']==BajaSolicitud){	
				 $_PUT  = array();
				 if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			     $equipo = $_PUT['Equipo'];
				 $id =  $_PUT['id'];				 
				 $id = json_decode(stripslashes($_POST["data"]));			 
				 $query = sprintf("DELETE FROM rpa_equipo WHERE idE = '$id'",mysql_real_escape_string($id));  
			   	 $rs  = mysql_query($query); 			
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
				}
	else if($_GET['termino']==AltaSolicitud){	
				 $_PUT  = array();
				 if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			     $equipo = $_PUT['Equipo'];
				 $id =  $_PUT['id'];				 
				 $id = json_decode(stripslashes($_POST["data"]));			 
				 $query = sprintf("DELETE FROM rpa_equipo WHERE idE = '$id'",mysql_real_escape_string($id));  
			   	 $rs  = mysql_query($query); 			
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
				}				
    else if($_GET['termino']==insertarHard){
			$_PUT  = array();
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
			$Nombre = $_PUT['Nombre'];
			$email =  $_PUT['Email'];
			$codigo =  $_PUT['Codigo'];
			$Localidad =  $_PUT['Localidad'];
			$provincias =  $_PUT['Provincia'];
			$municipio =  $_PUT['Municipio'];
			$departamento =  $_PUT['Area'];
			$comentario =  $_PUT['Coment'];	
			$equipo=  $_PUT['Equipo'];		
			$estado=0;
			$fecha = date("Y-m-d");
			$tipoRPA='Hardware';	
			
			$result= mysql_query("INSERT INTO `rpa_roturas` 
		   (`idR`,`idE`,`comentarioU`,`cod_Pro`,`cod_Mun`,`cod_Dep`,`fechaI`,`codigo`,`estadoS`,`fechaF`,`comentarioT`,`tipoRPA`,`nombreU`,`emailU`,`id_localidad`,`fechaP`,`tipoDMR`)
			VALUES ('','$equipo','$comentario','$provincias','$municipio','$departamento','$fecha','$codigo','$estado','','No,por el momento','$tipoRPA','$Nombre','$email','$Localidad','','No,por el momento')");
			//$result1= mysql_query("SELECT * FROM rpa_roturas Where fechaI='$fecha',codigo='$codigo' and estadoS='$estado' ");		 		  
			//$row= mysql_fetch_array($result1);$ya=$row["idR"];
			if($result){$info = array('success' => true,'msg' => ' 		
		  <b>Localidad : </b> "' .$Localidad.'"<br>					
		  <b>Provincia:</b>  "' .$provincias.'"<br>
		  <b>Municipio:</b>  "' .$municipio .'"<br>
		  <b>Departamento:</b>  "' .$departamento.'"<br>
		  <b>Mumbre:</b>  "' .$Nombre.'"<br>
		 <b> Correo:</b>  "' .$email .'"<br> 
		  <b>Num Inventario:</b> "' .$codigo.'"<br> 	
		  <b>Equipo:</b>  "' .$equipo.'"<br>
			<br>Se ha enviado su solicitud.<br> Le damos el  numero de reporte <b> ("'.$ya.'")</b>  para tareas futuras ');}
			else{	$info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');}
				
				echo json_encode($info);
				}
	else if($_GET['termino']==insertarSoftw){
				  $_PUT  = array();
				  if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
				    $Nombre = $_PUT['Nombre'];
					$email =  $_PUT['Email'];
					$codigo = '_ _ _ _ _ _';
					$Localidad =  $_PUT['Localidad'];
					$provincias =  $_PUT['Provincia'];
					$municipio =  $_PUT['Municipio'];
					$departamento =  $_PUT['Area'];
					$comentario =  $_PUT['Coment'];	
					$equipo=  $_PUT['Equipo'];		
					$estado=0;
					$fecha = date("Y-m-d");	
					$tipoRPA='Software';
				    $result= mysql_query( "INSERT INTO `rpa_roturas` (`idR`,`idE`,`comentarioU`,`cod_Pro`,`cod_Mun`,`cod_Dep`,`fechaI`,`codigo`,`estadoS`,`fechaF`,`comentarioT`,`nombreU`,`emailU`,`id_localidad`,`fechaP`,`tipoDMR`,`tipoRPA`)
						   VALUES('','Problema de Software','$comentario','$provincias','$municipio','$departamento','$fecha','$codigo','$estado','0000','No,por el momento','$Nombre','$email','$Localidad','0000','No,por el momento','$tipoRPA')"
						 );
				
				
				//$result1= mysql_query("SELECT * FROM rpa_roturas WHERE fechaI = '$fecha' , estadoS=0  and  tipoRPA='$rpa' ");		 		  
			if($result){$info = array('success' => true,'msg' => ' 		
		  <b>Localidad : </b> "' .$Localidad.'"<br>					
		  <b>Provincia:</b>  "' .$provincias.'"<br>
		  <b>Municipio:</b>  "' .$municipio .'"<br>
		  <b>Departamento:</b>  "' .$departamento.'"<br>
		  <b>Mumbre:</b>  "' .$Nombre.'"<br>
		  <b> Correo:</b>  "' .$email .'"<br> 		   
			<br>Se ha enviado su solicitud.<br> Le damos el  numero de reporte <b> ("'.$result1["idR"].'")</b>  para tareas futuras ');}
			else{	$info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');}
					echo json_encode($info);
				}
	else if ($_REQUEST['termino'] == "Estado"){			
				
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}				
			$report =$_REQUEST['reporte'];
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE idR = '$report'"); 	
			/*if($report){$info = array('success' => true,'msg' => '<b>Reporte : </b> "' .$report.'"<br>');}		
		  	else{$info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');}
			echo json_encode($info);	*/		
			
			if (!$report){		  
				$data= array(); 
				$start = isset($_POST['start'])?$_POST['start']:0;
				$limit = isset($_POST['limit'])?$_POST['limit']:10;	
				$n='<b>-- No disponible --</b>';
				 array_push($data,array(  
						"id"=>$n,  
						"cod"=>$n,  
						"mun"=>$n,  
						"fechai"=>$n,  
						"dep"=>$n,  
						"nombre"=>$n,
						"equ"=> $n,			
						"local"=>$n,
						"Pro"=>$n,
						"comU"=>$n,
						"RPA"=>$n,
						"comT"=>$n,
						"fechap"=>$n,
						"fechaf"=>$n,
						"estado"=>$n,
						"DMR"=>$n,
						"emil"=>$n  
					)); 
						echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}    
			else {			   
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"=> $row["idR"],  
					"cod"=> $row["codigo"],  
					"mun"=> $row["cod_Mun"],  
					"fechai"=> $row["fechaI"],  
					"dep"=> $row["cod_Dep"],  
					"nombre"=> $row["nombreU"],
					"equ"=> $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$row["estadoS"],
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
			}		
			
		}
	else if($_GET['termino']==insertarSolicitud){
				  $_PUT  = array();
				  if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}						  
					  $Nombre = $_PUT['nombre']; 		
					  $idr = $_PUT['idr'];				
					  $email =  $_PUT['Email']; 		
					  $codigo = $_PUT['codigo'];				
				  	  $provincias =  $_PUT['prov'];					  
					  $municipio =  $_PUT['munc']; //
					  $departamento =  $_PUT['deptamento'];	//		 	
					  $equipo=  $_PUT['Equipo']; 		//
					  $TPA=  $_PUT['RPA'];
					  $result= mysql_query("UPDATE `rpa`.`rpa_roturas` SET `emailU` = '$email',`nombreU`='$Nombre',`tipoRPA`='$TPA', `codigo` = '$codigo',
									`cod_Pro`='$provincias', `cod_Mun` = '$municipio',`cod_Dep`='$departamento',`idE` = '$equipo' WHERE `idR` = '$idr'"); 
							   		
				if($result){
					$info = array(
					'success' => true,
					'msg' => 'Se han agregados los datos<br> 
					<b> "'.$Nombre.'"<br></b>
					<b> "'.$idr.'"<br></b>
					<b> "'.$email.'"<br></b>
					<b> "'.$codigo.'"<br></b>
					<b> "'.$provincias.'"<br></b>
					<b> "'.$municipio.'"<br></b>
					<b> "'.$departamento.'"<br></b>
					<b> "'.$equipo.'"<br></b>'
						);
					   }
				else{					 
					$info = array(
					'success' => false,
					'msg' => 'Se encontraron errores al procesar los datos <br>
					 <b> "'.$Nombre.'"<br></b>
					 <b> "'.$idr.'"<br></b>
					 <b> "'.$email.'"<br></b>
					 <b> "'.$codigo.'"<br></b>
					 <b> "'.$provincias.'"<br></b>
					 <b> "'.$municipio.'"<br></b>
					 <b> "'.$departamento.'"<br></b>
					 <b> "'.$equipo.'"<br></b>
					  ');
					}
				  echo json_encode($info);
				}
	else if($_GET['termino']==DarAlta){
				      $_PUT  = array();
					  if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}		 					
					  $idr = $_PUT['idr1'];				  		 	
					  $comentarioT=  $_PUT['Coment']; 	
					  $uno=1;
					  $fechaF=date("Y-m-d");	
					  $result= mysql_query("UPDATE `rpa`.`rpa_roturas` SET `comentarioT` = '$comentarioT',`estadoS`='$uno',`fechaF`='$fechaF'	 WHERE `idR` = '$idr'"); 		   		
					if(rand(0,1)===0){
					$info = array(
					'success' => true,
					'msg' => 'Se han agregados los datos<br>
						 <b> "'.$idr.'"<br></b>
						  <b> "'.$uno.'"<br></b>
						  <b> "'.$fechaF.'"<br></b>
						<b> "'.$comentarioT.'"<br></b>
						');
					   }
				else{					 
					$info = array(
					'success' => false,
			'msg' => 'Se encontraron errores al procesar los datos <br>
						<b> "'.$idr.'"<br></b>
						 <b> "'.$uno.'"<br></b>
						 <b> "'.$fechaF.'"<br></b>
						<b> "'.$comentarioT.'"<br></b>
			');
					}
				  echo json_encode($info);
				}
	else if($_GET['termino']==DarPendiente){
				      $_PUT  = array();
					  if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}		 					
					  $idr = $_PUT['idr1'];				  		 	
					  $comentarioT=  $_PUT['Comenta']; 	
					  $uno=2;
					  $fechaF=date("Y-m-d");	
					  $result= mysql_query("UPDATE `rpa`.`rpa_roturas` SET `comentarioT` = '$comentarioT',`estadoS`='$uno',`fechaF`='$fechaF'	 WHERE `idR` = '$idr'"); 		   		
					if($result){
					$info = array(
					'success' => true,
					'msg' => 'Se han agregados los datos<br>
						 <b> "'.$idr.'"<br></b>
						  <b> "'.$uno.'"<br></b>
						  <b> "'.$fechaF.'"<br></b>
						<b> "'.$comentarioT.'"<br></b>
						');
					   }
				else{					 
					$info = array(
					'success' => false,
			'msg' => 'Se encontraron errores al procesar los datos <br>
						<b> "'.$idr.'"<br></b>
						 <b> "'.$uno.'"<br></b>
						 <b> "'.$fechaF.'"<br></b>
						<b> "'.$comentarioT.'"<br></b>
			');
					}
				  echo json_encode($info);
				}
	else if($_GET['termino']==Rabuso){ 
				  $_PUT  = array();
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
					$Nombre = $_PUT['Nombre'];
					$email =  $_PUT['Email'];	
					$comentario =  $_PUT['Coment'];	
			$result= mysql_query("INSERT INTO `rpa_abusos` ( `ida` , `nombreU`, `emailU`, `comentarioU`  )
						VALUES ( '', '$Nombre', '$email' , '$comentario')");
				
				if($result){
						$info = array(
						'success' => true,
						'msg' => 'Sus quejas han sido enviadas,intentaremos dar la mejor respuesta en breve');
				   }
				else{					 
						$info = array(
						'success' => false,
						'msg' => 'Se encontraron errores al procesar los datos');
					}
					echo json_encode($info);
				}	
	else if($_GET['termino']==plan){ 
				  $_PUT  = array();
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
					$Nombre = $_PUT['Nombre'];
					$email =  $_PUT['Email'];	
					$comentario =  $_PUT['Coment'];	
			$result= mysql_query("INSERT INTO `rpa_abusos` ( `ida` , `nombreU`, `emailU`, `comentarioU`  )
						VALUES ( '', '$Nombre', '$email' , '$comentario')");
				
				if($result){
						$info = array(
						'success' => true,
						'msg' => 'Sus quejas han sido enviadas,intentaremos dar la mejor respuesta en breve');
				   }
				else{					 
						$info = array(
						'success' => false,
						'msg' => 'Se encontraron errores al procesar los datos');
					}
					echo json_encode($info);
				}	
	else if($_GET['termino']==concejos){ 
				  $_PUT  = array();
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
					$Nombre = $_PUT['Nombre'];
					$email =  $_PUT['Email'];	
					$comentario =  $_PUT['Coment'];	
				$result= mysql_query("INSERT INTO `rpa_consejos` ( `idCo` , `consejo`  ) VALUES ( '', '$comentario')");				
				if($result){
						$info = array(
						'success' => true,
						'msg' => 'Nuevo concejo a el usuario enviado');
				   }
				else{					 
						$info = array(
						'success' => false,
						'msg' => 'Se encontraron errores al procesar los datos');
					}
					echo json_encode($info);
				}	
	else if($_GET['termino']==avisos){ 
			$_PUT  = array();
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
			$comentario =  $_PUT['Coment'];	
			$result= mysql_query("INSERT INTO `rpa_avisos` ( `idAv` , `aviso`  )	VALUES ( ' ',  '$comentario')");				
				if($result){
						$info = array(
						'success' => true,
						'msg' => 'Se a agregados a la lista de avisos ');
				   }
				else{					 
						$info = array(
						'success' => false,
						'msg' => 'Se encontraron errores al procesar los datos');
					}
					echo json_encode($info);
				}	
	else if($_GET['termino']==Contact){ 
				  $_PUT  = array();
			if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
					$Nombre = $_PUT['Nombre'];
					$email =  $_PUT['Email'];	
					$comentario =  $_PUT['Coment'];	
					$result= mysql_query("INSERT INTO `rpa_contacto` ( `idc` , `nombreU`, `emailU`, `comentarioU`  ) VALUES ( '', '$Nombre', '$email' , '$comentario')");
				if($result){
						$info = array(
						'success' => true,
						'msg' => 'Gracias por contactarnos');
				   }
				else{					 
						$info = array(
						'success' => false,
						'msg' => 'Se encontraron errores al enviar los datos');
					}
					echo json_encode($info);
				}				
?>
