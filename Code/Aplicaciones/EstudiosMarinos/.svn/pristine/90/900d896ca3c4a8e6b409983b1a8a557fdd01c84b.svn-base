<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edd
 * Date: 15/02/14
 * Time: 14:03
 * To change this template use File | Settings | File Templates.
 */
include"../../../../App/Config/jq_includes.php";
$myvar = $_GET['termino'];
if($concctions){
        if($myvar=='info'){
            $SQL = " SELECT  * FROM gestion.historial_marea WHERE historial_marea.activo = true;";
            $datos = pg_query($concctions,$SQL);
            $arr = pg_fetch_all($datos);
            $total_rows=count($arr);
            $data[] = array('TotalRows' => $total_rows,'Rows' => $arr);
            echo json_encode($data);
        }
}