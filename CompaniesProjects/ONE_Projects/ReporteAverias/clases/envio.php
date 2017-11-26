<?php   
 include 'config/configFile1.php';
// Tecnico - Reportes =========================================>
	if($_GET['termino'] ==Equipos){
	$result= mysql_query("SELECT * FROM rpa_equipo ORDER BY nombre");    
					$data= array(); 
					$start = isset($_POST['start'])?$_POST['start']:0;
					$limit = isset($_POST['limit'])?$_POST['limit']:10;	
					while($row= mysql_fetch_array($result)){  
						array_push($data,array(  
							"id"    => $row["idE"], 							 
							"nombre" => $row["nombre"]
						));  
					}    
					echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}
	else if ($_GET['termino'] ==ReportesHard){
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE estadoS = '0' and tipoRPA='$rpa' ORDER BY cod_Mun");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;
			$esta='Realizada';	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$esta, 
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==PendientesHard){
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE estadoS = '2'  and tipoRPA='$rpa' ORDER BY cod_Mun");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
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
	else if ($_GET['termino'] ==ReportesSoft){
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE estadoS = '0' and tipoRPA='$rpa' ORDER BY cod_Mun");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;
			$esta='Realizada';	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$esta,//$row["estadoS"],
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==PendientesSoft){
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE estadoS = '2'  and tipoRPA='$rpa' ORDER BY cod_Mun");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
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
// Comunes (User/Tec/J'dep) - Reportes =========================================>
	else if($_GET['termino'] ==Area){
	$result= mysql_query("SELECT * FROM rpa_deptamentos ");    
					$data= array(); 
					$start = isset($_POST['start'])?$_POST['start']:0;
					$limit = isset($_POST['limit'])?$_POST['limit']:10;	
					while($row= mysql_fetch_array($result)){  
						array_push($data,array(  
							"id"    => $row["idD"], 							 
							"nombre" => $row["dept"]
						));  
					}    
					echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}
	else if($_GET['termino'] ==Abuso){
		  $result= mysql_query("SELECT * FROM  rpa_abusos ");    
					$data= array(); 
					$start = isset($_POST['start'])?$_POST['start']:0;
					$limit = isset($_POST['limit'])?$_POST['limit']:10;	
					while($row= mysql_fetch_array($result)){  
						array_push($data,array(  
							"id"    => $row["ida"], 							 
							"nombre" => $row["nombreU"],
							"emil"=>$row["emailU"],
							"comentarioU"=>$row["comentarioU"]
						));  
					}    
					echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}
	else if($_GET['termino'] ==Plan){
		  $result= mysql_query("SELECT * FROM  rpa_plan ");    
					$data= array(); 
					$start = isset($_POST['start'])?$_POST['start']:0;
					$limit = isset($_POST['limit'])?$_POST['limit']:10;	
					while($row= mysql_fetch_array($result)){  
						array_push($data,array(  
							"id"=> $row["idPl"],
							"plan"=>$row["plan"],
							"dir"=>$row["dir"],
							"name"=>$row["name"]
						));  
					}    
					echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}
	else if ($_GET['termino'] ==Estadisticas){
			$result= mysql_query("SELECT * FROM rpa_roturas ORDER BY fechaI");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
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
	else if($_GET['termino'] ==Avisos){
		  $result= mysql_query("SELECT * FROM  rpa_avisos  ");    
					$data= array(); 
					$start = isset($_POST['start'])?$_POST['start']:0;
					$limit = isset($_POST['limit'])?$_POST['limit']:10;	
					while($row= mysql_fetch_array($result)){  
						array_push($data,array(  
							"id"    => $row["idAv"], 							 
							"comentarioU"=>$row["aviso"]
						));  
					}    
					echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}
	else if($_GET['termino'] ==consejo){
          $result= mysql_query("SELECT * FROM  rpa_consejos ");    
					$data= array(); 
					$start = isset($_POST['start'])?$_POST['start']:0;
					$limit = isset($_POST['limit'])?$_POST['limit']:10;	
					while($row= mysql_fetch_array($result)){  
						array_push($data,array(  
							"id"    => $row["idCo"], 							 
							"comentarioU"=>$row["consejo"]
						));  
					}    
					echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}				
	else if($_GET['termino'] ==Comentario){
          $result= mysql_query("SELECT * FROM  rpa_contacto ");    
					$data= array(); 
					$start = isset($_POST['start'])?$_POST['start']:0;
					$limit = isset($_POST['limit'])?$_POST['limit']:10;	
					while($row= mysql_fetch_array($result)){  
						array_push($data,array(  
							"id"    => $row["idc"], 							 
							"nombre" => $row["nombreU"],
							"emil"=>$row["emailU"],
							"comentarioU"=>$row["comentarioU"]
						));  
					}    
					echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
				}			
// J'Departamento - Estadisticas =========================================>
	else if ($_GET['termino'] ==MensualesHard){
			$fecha = date("Y-m-d");
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' ORDER BY fechaI");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Realizada';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==MensualesHardSoluc){
			$fecha = date("Y-m-d");
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' and estadoS=1  ORDER BY fechaI");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Solucionada';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==MensualesSoftSoluc){
			$fecha = date("Y-m-d");
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa'  and estadoS=1 ORDER BY fechaI");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Solucionada';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}	
	else if ($_GET['termino'] ==MensualesHardPend){
			$fecha = date("Y-m-d");
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' and estadoS=2  ORDER BY fechaI");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Pendiente';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==MensualesSoftPend){
			$fecha = date("Y-m-d");
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' and estadoS=2 ORDER BY fechaI");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;
			$estad='Pendiente'	;
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}	
	else if ($_GET['termino'] ==MensualesSoft){
			$fecha = date("Y-m-d");
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE estadoS=0  and  tipoRPA='$rpa' ORDER BY cod_Mun");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;
			$estad='Realizada';	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	
	else if ($_GET['termino'] ==MensualesHard1){
			$fecha = date("Y-m-d");
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' and fechaI = '$fecha' ORDER BY fechaI");    
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Realizada';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==MensualesHardSoluc1){
			$fecha = date("Y-m-d");
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' , fechaI = '$fecha' and estadoS=1  ORDER BY fechaI");
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Solucionada';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==MensualesSoftSoluc1){
			$fecha = date("Y-m-d");
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' , fechaI = '$fecha'   and estadoS=1 ORDER BY fechaI");
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Solucionada';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}	
	else if ($_GET['termino'] ==MensualesHardPend1){
			$fecha = date("Y-m-d");
			$rpa='Hardware';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' , fechaI = '$fecha'  and estadoS=2  ORDER BY fechaI");
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;	
			$estad='Pendiente';
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	else if ($_GET['termino'] ==MensualesSoftPend1){
			$fecha = date("Y-m-d");
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' , fechaI = '$fecha'  and estadoS=2 ORDER BY fechaI");
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;
			$estad='Pendiente'	;
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}	
	else if ($_GET['termino'] ==MensualesSoft1){
			$fecha = date("Y-m-d");
			$rpa='Software';
			$result= mysql_query("SELECT * FROM rpa_roturas WHERE tipoRPA='$rpa' , fechaI = '$fecha' ORDER BY fechaI");
			$data= array(); 
			$start = isset($_POST['start'])?$_POST['start']:0;
			$limit = isset($_POST['limit'])?$_POST['limit']:10;
			$estad='Realizada';	
			while($row= mysql_fetch_array($result)){  
				array_push($data,array(  
					"id"    => $row["idR"],  
					"cod" => $row["codigo"],  
					"mun"  => $row["cod_Mun"],  
					"fechai" => $row["fechaI"],  
					"dep"   => $row["cod_Dep"],  
					"nombre" => $row["nombreU"],
					"equ" => $row["idE"],			
					"local"=>$row["id_localidad"],
					"Pro"=>$row["cod_Pro"],
					"comU"=>$row["comentarioU"],
					"RPA"=>$row["tipoRPA"],
					"comT"=>$row["comentarioT"],
					"fechap"=>$row["fechaP"],
					"fechaf"=>$row["fechaF"],
					"estado"=>$estad,
					"DMR"=>$row["tipoDMR"],
					"emil"=>$row["emailU"]  
				));  
			}    
			echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
	}
	?>
