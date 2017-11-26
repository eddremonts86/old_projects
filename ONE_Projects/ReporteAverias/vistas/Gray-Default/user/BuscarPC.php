		<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/resources/css/ext-all.css "/>
		<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/resources/css/xtheme-gray.css" />	
		<link rel='stylesheet' type='text/css' media='screen' href='../../../Jss/extjs/examples/form/forms.css' />		
		<script type="text/javascript" src="../../../Jss/extjs/adapter/ext/ext-base.js"></script>		
		<script type="text/javascript" src="../../../Jss/extjs/ext-all.js"></script>
		<script type="text/javascript" src="../../../Jss/extjs/src/locale/ext-lang-es.js"></script>
		<script type="text/javascript" src="../../../Jss/Personalizadas/user/BuscarPC.js"></script>
<?php
 
if($_GET['termino']==buscarpc){
	header("Content-Type: text/plain"); 
	$connection= mysql_connect("localhost","edd","edd") or die("Connection Failed".mysql_error());  
	mysql_select_db("rpa",$connection)or die("Error loading the DataBase".mysql_error()); 
	$_PUT  = array();
	if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
			$id = $_PUT['cod'];
			
		$result= mysql_query("SELECT * FROM rpa_roturas WHERE fechai='$fecha' and tipoRPA='$rpa' ORDER BY fechaI");    
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
?>