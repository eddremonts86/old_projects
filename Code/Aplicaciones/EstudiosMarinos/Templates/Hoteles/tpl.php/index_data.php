<?php
include"../../include.php";
 if ($concctions){
     if($index=='cursos'){
     $SQL = " SELECT cursos.nombre as nombre,cursos.fecha_inicio as inicio,cursos.fecha_fin as fin,cursos.descripcion as desc FROM nomencladores.cursos WHERE cursos.activo = true;";
     $datos = pg_query($concctions,$SQL);
     $arr = pg_fetch_all($datos);
     echo json_encode($arr);
     }
     else if($index=='gst'){
         $SQL = " SELECT gestion_cursos.nombre as nombre,gestion_cursos.descripcion as desc FROM capacitacion.gestion_cursos WHERE gestion_cursos.activo = true;";
         $datos = pg_query($concctions,$SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if($index=='event'){
         $SQL = "SELECT * FROM app_security.event_info WHERE event_info.activo = true and tipo='Eventos';";
         $datos = pg_query($concctions,$SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if($index=='regul'){
         $SQL = "SELECT * FROM app_security.event_info WHERE event_info.activo = true and tipo='Regulaciones';";
         $datos = pg_query($concctions,$SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if($index=='info'){
         $SQL = "SELECT * FROM app_security.event_info WHERE event_info.activo = true and tipo='Informacion general';";
         $datos = pg_query($concctions,$SQL);
         $arr = pg_fetch_all($datos);
         echo json_encode($arr);
     }
     else if($index=='foto'){
        $imagen = base64_encode(file_get_contents($_FILES['fileup']['tmp_name']));
        $id=$_GET['id'];
        return $imagen;
     }
     else if($index=='sub'){
         $SQL = "SELECT * FROM app_security.subsystems;";
         $datos = pg_query($concctions,$SQL);
         $subs = pg_fetch_all($datos);
         echo json_encode($subs);
     }
     else if($index=='menu'){
         $SQL = "SELECT id,titulo FROM app_security.inicio_menu;";
         $datos = pg_query($concctions,$SQL);
         $subs = pg_fetch_all($datos);
         echo json_encode($subs);
     }
     else if($index=='text'){
         $id=$_GET['id'];
         $SQL = "SELECT * FROM app_security.inicio_menu where inicio_menu.id = '$id';";
         $datos = pg_query($concctions,$SQL);
         $subs = pg_fetch_all($datos);
         echo json_encode($subs);
     }
     else if($index=='datos_compact'){
         $SQL = "SELECT * FROM app_security.galerias;";
         $datos = pg_query($concctions,$SQL);
         $subs = pg_fetch_all($datos);
         echo json_encode($subs);
     }
 }
