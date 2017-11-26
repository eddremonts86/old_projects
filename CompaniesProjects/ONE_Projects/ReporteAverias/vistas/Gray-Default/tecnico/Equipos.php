<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/resources/css/ext-all.css "/>
		<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/resources/css/xtheme-gray.css" />	
		<link rel='stylesheet' type='text/css' media='screen' href='../../../Jss/extjs/examples/form/forms.css' />		
		<script type="text/javascript" src="../../../Jss/extjs/adapter/ext/ext-base.js"></script>		
		<script type="text/javascript" src="../../../Jss/extjs/ext-all.js"></script>
		<script type="text/javascript" src="../../../Jss/extjs/src/locale/ext-lang-es.js"></script>
		<script type="text/javascript" src="../../../Jss/Personalizadas/tecnico/Equipos.js"></script>

<?php      	 
	$connection= mysql_connect("localhost","edd","edd") or die("Connection Failed".mysql_error());  
	mysql_select_db("rpa",$connection)or die("Error loading the DataBase".mysql_error()); 
	header("Content-Type: text/plain"); 
	//Support for the PUT method
	$_PUT  = array();
	if($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}	
	$equipo = $_PUT['Equipo'];
	$id =  $_PUT['id'];		
	if($_GET['termino']==agregar)
				  {
				$result= mysql_query("INSERT INTO `rpa_equipo` ( `idE` , `nombre`  )VALUES ( '', '$equipo' )");
				if(rand(0,1)===0){
					//header('HTTP/1.1 201 Created success');
					
					$info = array(
						'success' => true,
						'msg' => 'Se ha agregados el equipo "'.$equipo.'" a la lista'
					);
				   }
				else{
					//header('HTTP/1.1 501 Error saving the record');
					$info = array(
						'success' => false,
						'msg' => 'There was an error saving the record'
					);
					}
					echo json_encode($info);
		 }
		 
		 
	else if($_GET['termino']==eliminar)
			{	
				 $id = json_decode(stripslashes($_POST["data"])); //step 2  
   
				 //step 3  
				 $query = sprintf("DELETE FROM rpa_equipo WHERE idE = '$id'",mysql_real_escape_string($id));  
			   
				 $rs  = mysql_query($query);  
			   
				 //step 4  
				 echo json_encode(array(  
					 "success"   => mysql_errno() == 0,  
					 "msg"       => mysql_errno() == 0?"Contact deleted successfully":mysql_error()  
				 ));  			
		}		  
			
?>