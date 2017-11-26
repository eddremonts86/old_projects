<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 27/02/14
 * Time: 6:48
 */

$conn_string = "host= localhost  port= 5432 dbname=emarinos  user=postgres password=postgres";
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
    $SQL = " SELECT event_info.nombre, event_info.fecha, event_info.caracter, event_info.tipo FROM app_security.event_info order by event_info.fecha DESC ;";
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
