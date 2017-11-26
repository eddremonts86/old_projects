<?php    //step 1  
   $connection= mysql_connect("localhost","edd","edd") or die("Connection Failed".mysql_error());  
    mysql_select_db("rpa",$connection)or die("Error loading the DataBase".mysql_error());   	 
    $result= mysql_query("SELECT * FROM rpa_roturas");    
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
	
?>