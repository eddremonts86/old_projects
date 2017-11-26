<?php
header("Content-Type:text/plain");
include 'ClassConect.php';
$_PUT = array();
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
$idr = $_PUT['idr'];

if($_REQUEST['termino'] == "Estado") {
	$report =$_REQUEST['reporte'];

    if(0<=11) {
        $info = array('success' => true, 'msg' => 'Se ha agregado(registros)');
        echo json_encode($info);
    }
    else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta');
        echo json_encode($info);
    }
} 


















?>
