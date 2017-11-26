<?php
include 'ClassConect.php';
include 'TreeExtJs.class.php';
if(isset($_POST["updateOrder"])) {	
    $nodes = $_POST["nodes"];		
    $ids = explode(",",$nodes);
    $idParent = (int)$_POST["parent"];	
    for($i=0;$i<count($ids);$i++) {
        $id = (int)$ids[$i];
        $query = sprintf("UPDATE jos_registros SET order_number = %d,id_parent = %d WHERE id = %d",
            $i,$idParent,$id);	
        mysql_query($query);		
    }
}
else if($_GET['termino']==admin) {
    $result = mysql_query("SELECT * FROM jos_registros_terminados order by id_parent,order_number asc") or die(mysql_error());
    $data = array();
    while($row = mysql_fetch_array( $result )){
	array_push($data,array(
		"id" => $row["id"],
		"idParent" => $row["id_parent"],
		"text" => $row["category"],
		"orderNumber" => $row["order_number"],
		"description" => $row["description"],
                "html" => $row["node_html"],
                "user" => $row["user"],
                "user_test" => $row["user_test"],
                "observacion" => $row["observacion"],
                "iconCls" => $row["iconCls"],
                "fecha" => $row["fecha"],
                "fechaA" => $row["fechaActulizacion"]
	));
}

/* Creating the Tree*/
    $tree = new TreeExtJS();
    for($i=0;$i<count($data);$i++) {
        $category = $data[$i];
        $tree->addChildadmin($category,$category["idParent"]);
    }

    echo $tree->toJson();
}


else {
    $result = mysql_query("SELECT * FROM jos_registros order by id_parent,order_number asc") or die(mysql_error());
    $data = array();
    $leaf='true';
    while($row = mysql_fetch_array( $result )) {
        array_push($data,array(
            "id" => $row["id"],
            "idParent" => $row["id_parent"],
            "text" => $row["category"],
            "orderNumber" => $row["order_number"],
            "description" => $row["description"],
            "html" => $row["node_html"],
            "checked" => $row["checked"],
            "iconCls" => $row["iconCls"],
            "leaf"=>$row[$leaf]));
    }
/* Creating the Tree*/
    $tree = new TreeExtJS();
    for($i=0;$i<count($data);$i++) {
        $category = $data[$i];
        $tree->addChild($category,$category["idParent"]);
    }

    echo $tree->toJson();
}


?>
