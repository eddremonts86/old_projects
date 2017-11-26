<?php
$host = 'localhost';$port = '5432';$user = 'postgres';$pass = 'postgres';$dbase = 'capital_humano';
$conn_string = "host=$host  port=$port dbname=$dbase user=$user password=$pass";
$dbconn = pg_connect($conn_string);
$index=$_GET['index'];

 if ($dbconn){
     if($index=='cursos'){
     $SQL = " SELECT cursos.nombre as nombre,cursos.fecha_inicio as inicio,cursos.fecha_fin as fin,cursos.descripcion as desc FROM nomencladores.cursos WHERE cursos.activo = true;";
     $datos = pg_query($SQL);
     $arr = pg_fetch_all($datos);
     echo json_encode($arr);
     }
     else if($index=='gst'){
         $SQL = " SELECT gestion_cursos.nombre as nombre,gestion_cursos.descripcion as desc FROM capacitacion.gestion_cursos WHERE gestion_cursos.activo = true;";
         $datos = pg_query($SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if($index=='event'){
         $SQL = "SELECT * FROM app_security.event_info WHERE event_info.activo = true and tipo='Eventos';";
         $datos = pg_query($SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if($index=='regul'){
         $SQL = "SELECT * FROM app_security.event_info WHERE event_info.activo = true and tipo='Regulaciones';";
         $datos = pg_query($SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if($index=='info'){
         $SQL = "SELECT * FROM app_security.event_info WHERE event_info.activo = true and tipo='Informacion general';";
         $datos = pg_query($SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if ($index=='foto'){
        $imagen = base64_encode(file_get_contents($_FILES['fileup']['tmp_name']));
        $id=$_GET['id'];
        return $imagen;

     }
     else if ($index=='sub'){
         $SQL = "SELECT * FROM app_security.subsystems;";
         $datos = pg_query($SQL);
         $subs = pg_fetch_all($datos);
         echo json_encode($subs);
     }
 }