<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 27/02/14
 * Time: 6:48
 */

$conn_string = "host= 127.0.0.1  port= 5432 dbname=emarinos  user=postgres password=postgres";
$concctions=pg_connect($conn_string);
$index=$_GET['index'];
if($index=='roll'){
    $SQL = " SELECT count(user_log)as total FROM app_security.users";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='rolls'){
    $SQL = " SELECT count(user_id),rols.rol_name  FROM app_security.users inner join app_security.rols on users.rol_id = rols.rol_id group by rols.rol_name;";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='avisos'){
    $SQL = " SELECT  * FROM app_security.event_info order by event_info.fecha DESC ;";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='cantAvisos'){
    $SQL = " SELECT count(id)as total FROM app_security.event_info";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='logs'){
    $SQL = "SELECT users.user_name as _user ,server_calls.subsystem,server_calls.module,server_calls.moment, server_calls.server_function
            FROM logs.server_calls, app_security.users WHERE server_calls.user_id = users.user_id order by server_calls.moment DESC;";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='cantlogs'){
    $SQL = " SELECT count(call_id)as total FROM logs.server_calls";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='mensajes'){
    $SQL = "SELECT *  FROM app_security.mensajes;";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='cantmensajes'){
    $SQL = " SELECT count(id)as total FROM app_security.mensajes;";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='grafic'){



    $_data = array();
    $_count = 0;
    $_start = ($params['start']) ? $params['start'] : 0;
    $_limit = $params['limit'];

    $lugar = $params['lugar'];
    $mes= $params['mes'];
    $anno= $params['anno'];

 //   $_table = $this->_dbase->GetTable('vistas.gestion_historial');
    $SQL = " SELECT *  FROM vistas.gestion_historial;";
    // $_data = $_table->GetAll("lugar='$lugar'");
   // $_data = $_table->GetAll("lugar='$lugar' and mes='$mes' and anno = '$anno'");
    $datos = pg_query($concctions,$SQL);
    $_data = pg_fetch_all($datos);
    $result = array();
    $line = array();
    $day = 0;
    foreach($_data as $row)
    {
        if($row['fecha'] != $day)
        {
            if($day != 0)
                array_push($result, $line);
            $day = $row['fecha'];
            $line = array('dia' => $day,'lugar' => $lugar);
        }
        $name = "hora".$row['hora'];
        $line[$name.'_A'] = $row['altura'];
        $line[$name.'_D'] = $row['direccion'];
        $line[$name.'_V'] = $row['velocidad'];
    }
    array_push($result, $line);
    echo json_encode($result);

}
if($index=='prov'){
    $SQL = " SELECT * FROM nomencladores.lugar";
    $datos = pg_query($concctions,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='info'){
        $SQL = " SELECT  * FROM gestion.historial_marea WHERE historial_marea.activo = true;";
        $datos = pg_query($concctions,$SQL);
        $arr = pg_fetch_all($datos);
        $total_rows=count($arr);
        $data[] = array('TotalRows' => $total_rows,'Rows' => $arr);
        echo json_encode($data);
    }
if($index=='tipo'){
    $conn_string = "host= 127.0.0.1  port= 5432 dbname=drupal  user=postgres password=postgres";
    $concctions_=pg_connect($conn_string);
    $SQL = " SELECT * FROM campismos_geoc.tipo_inst";
    $datos = pg_query($concctions_,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}
if($index=='save_tipe'){
    $conn_string = "host= 127.0.0.1  port= 5432 dbname=drupal  user=postgres password=postgres";
    $concctions_=pg_connect($conn_string);
    $nombre=$_GET['tips_inst'];
    $SQL = " INSERT INTO campismos_geoc.tipo_inst (nombre) VALUES ('$nombre');";
    $datos = pg_query($concctions_,$SQL);
    $arr = pg_fetch_all($datos);
    echo json_encode($arr);
}