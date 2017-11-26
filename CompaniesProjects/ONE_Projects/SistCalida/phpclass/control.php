<?php
header("Content-Type:text/plain");
include 'ClassConect.php';
$_PUT = array();
if ($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
$idr = $_PUT['idr'];
if ($idr == 'user') {
    $name = $_PUT['Nombree'];
    $passw = md5($_PUT['Passwordd']);
    $user = $_PUT['Usuarioo'];
    $email = $_PUT['Correoo'];
    $useuarioroles = $_PUT['useuarioroless'];
    $fechaI = date("Y-m-d h:i:s");
    $params = 'admin_language=es-ES language=es-ES editor=tinymce helpsite=timezone=0';
    //$result = mysql_query("Select count(*) from jos_users where name = '$user'");

    if ($user != '' & $passw != '' & $email != '' & $name != '' & $result == 0) {
        $result = mysql_query("INSERT INTO jos_users
            ( `id` , `name`,`role`,`username` ,`email` ,`password` ,`usertype` ,`block` ,`sendEmail` ,`gid` ,`registerDate`,`lastvisitDate`,`activation`,`params`,`node_user_account`  )
            VALUES
            ('', '$user ','$useuarioroles','$name','$email','$passw','','0','0','25','$fechaI','','','$params','0')");
        if ($result) {
            $info = array('success' => true, 'msg' => 'Bienvenido el Sistema de Gestion de la Calidad(ONEI-PR)');
            echo json_encode($info);
            $exit = exit;
        } else {
            $info = array('failure' => false, 'msg' => 'Verifique sus credenciales e intentelo de nuevo');
            echo json_encode($info);
            exit;
        }
    } else {
        $info = array('failure' => false, 'msg' => 'Se encontraron errores al procesar los datos.<br> Esto se debe a que a dejado datos sin llenar o el usuario existe en el sistema.');
        echo json_encode($info);
        exit;
    }
}
if ($idr == 'node') {
    $Descricion = $_PUT['Descricion'];
    $usuario = $_PUT['useuarioExistente'];
    $catgall = $_PUT['catgall'];
    $NombreRegistro = $_PUT['NombreRegistro'];

    $BloqueNR = $_PUT['BloqueNR-checkbox'];
    $NombreNR = $_PUT['NombreNR'];
    $emailNR = $_PUT['emailNR'];
    $passwNR = md5($_PUT['passwNR']);
    $usuarioNR = $_PUT['usuarioNR'];

    $BloqueNA = $_PUT['BloqueNA-checkbox'];
    $NombreNA = $_PUT['NombreNA'];
    $emailNA = $_PUT['emailNA'];
    $passwNA = md5($_PUT['passwNA']);
    $usuarioNA = $_PUT['usuarioNA'];

    $usuarioresponsable = $_PUT['usuarioresponsable'];
    $datos = $_PUT['datos'];
    $fechaI = date("Y-m-d h:i:s");
    $GlobalNA;
    $globaNR;
    $role1 = $_PUT['role1'];
    $role = $_PUT['role'];
    $params = 'admin_language=es-ES language=es-ES editor=tinymce helpsite=timezone=0';

    if ($usuario == '' & $BloqueNR == 'on') {
        $GlobalNR = $usuarioNR;

        $result = mysql_query("INSERT INTO jos_users
            ( `id` , `name`,`role`,`username` ,`email` ,`password` ,`usertype` ,`block` ,`sendEmail` ,`gid` ,`registerDate`,`lastvisitDate`,`activation`,`params`,`node_user_account`  )
            VALUES
            ('', '$NombreNR ','$role','$usuarioNR','$emailNR','$passwNR','','0','0','25','$fechaI','','','$params','0')");
    } else {
        $GlobalNR = $usuario;
    }

    if ($usuarioresponsable == '' & $BloqueNA == 'on') {
        $GlobalNA = $usuarioNA;
        $result = mysql_query("INSERT INTO jos_users
            ( `id` , `name`,`role`,`username` ,`email` ,`password` ,`usertype` ,`block` ,`sendEmail` ,`gid` ,`registerDate`,`lastvisitDate`,`activation`,`params`,`node_user_account`  )
            VALUES
            ('', '$NombreNA ','$role1','$usuarioNA','$emailNA','$passwNA','','0','0','25','$fechaI','','','$params','0')");
    } else {
        $GlobalNA = $usuarioresponsable;
    }

    $result = mysql_query("INSERT INTO jos_registros
            ( `id`,`id_parent`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`checked`,`iconCls`,`tipoReg`)
            VALUES ('','$catgall','$NombreRegistro','NULL','$Descricion','$datos','$usuario','$usuarioresponsable','NULL','regu','1')");

    if ($result) {

        /* $result = mysql_query("INSERT INTO jos_registros
          ( `id`,`id_parent`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`checked`,`iconCls`,`tipoReg)
          VALUES('','$catgall','$NombreRegistro','NULL','$Descricion','$datos','$GlobalNR','$GlobalNA','NULL','regu','1')");

          $info = array('success' => true, 'msg' => 'Bienvenido a el sistema,<br> Usuario: "' . $usuario . '",<br>   Categoria: "' . $catgall . '",<br>   Nobre Reg: "' . $NombreRegistro . '",<br>
          Descipcon: "' . $Descricion . '",<br><br>   New Nombre: "' . $NombreNR . '",<br>   New Email: "' . $emailNR . '",<br>   New PAssw: "' . $passwNR . '",<br>   New Usaurio: "' . $usuarioNR . '",<br><br>
          NewA Nombre: "' . $NombreNA . '",<br>   NewA Passw: "' . $passwNA . '",<br>   NewA Email: "' . $emailNA . '",<br>   NewA Usuario:  "' . $usuarioNA . '",<br><br>   Usuario A:  "' . $usuarioresponsable . '",<br>
          Datos:  "' . $datos . '"<br> BloqueNA: "' . $BloqueNA . '",<br> BloqueNR: "' . $BloqueNR . '"'); */
     $info = array('success' => true, 'msg' => 'El registro ha sido agregado correctamente');
        echo json_encode($info);
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta.');
        echo json_encode($info);
    }
}
if ($idr == 'login') {
    $user = $_PUT['nombre'];
    $passw = $_PUT['passw'];
    if ($user != '' & $passw != '') {
        $result = mysql_query("Select count(*) from jos_users where name='$user'");
        $idRol = mysql_query("SELECT * FROM jos_users where name='$user'");

        while ($row = mysql_fetch_array($idRol)) {
            $id = $row["id"];
            $correo = $row["email"];
            $username = $row["username"];
            $passwbd = $row["password"];
            $name = $row["name"];
            $usertype = $row["usertype"];
        }
        if (md5($passw) === $passwbd) {
            $info = array('success' => true, 'msg' => 'Bienvenido el Sistema de Gestion de la Calidad(ONEI-PR)');
            echo json_encode($info);
            $exit = exit;
        }
        else {
            $info = array('failure' => false, 'msg' => 'Verifique sus credenciales e intentelo de nuevo');
            echo json_encode($info);
            exit;
        }
    }
    else {
        $info = array('failure' => false, 'msg' => 'Se encontraron errores al procesar los datos');
        echo json_encode($info);
        exit;
    }
}
if ($idr == 'categ') {
    $catgName = $_PUT['catgName'];
    $catgall = $_PUT['catgall'];
    $descrp = $_PUT['descrp'];
    if ($catgName != '') {
        if ($catgall == '' || $catgall == '0') {

            $result = mysql_query("INSERT INTO jos_registros
            ( `id` ,`id_parent`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`checked`,`iconCls`,`tipoReg`)
            VALUES
            ('','NULL','$catgName','NULL','$descrp','$descrp','NULL','NULL','NULL','deptu','0')");


            $info = array('success' => true, 'msg' => ' 1 "' . $catgName . '" y "' . $catgall . '" mas "' . $descrp . '" ');
            echo json_encode($info);
        } else {
            $result = mysql_query("INSERT INTO jos_registros
            ( `id` ,`id_parent`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`checked`,`iconCls`,`tipoReg`)
            VALUES
            ('','$catgall','$catgName',NULL,'$descrp','$descrp','NULL','NULL','NULL','deptu','0')");

            $info = array('success' => true, 'msg' => ' 2 "' . $catgName . '" y "' . $catgall . '"mas "' . $descrp . '" ');
            echo json_encode($info);
        }
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta.');
        echo json_encode($info);
    }
}
if ($idr == 'addrole') {
    $roleadd = $_PUT['roleadd'];
    $result = mysql_query("INSERT INTO jos_role ( `id` ,`name`)VALUES('','$roleadd')");
    if ($result) {
        $info = array('success' => true, 'msg' => 'Se ha agregado el role con exito ');
        echo json_encode($info);
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta "' . $roleadd . '" y "' . $idr . '"');
        echo json_encode($info);
    }
}
if ($idr == 'updaterole') {
    $Nombre = $_PUT['Nombre'];
    $idrole = $_PUT['idrole'];
    //$result = sprintf("UPDATE `calidad`.`jos_role` SET `name` = '$Nombre', WHERE `id` = '$idrole'",mysql_real_escape_string($id));
    $result = mysql_query("UPDATE `jos_role` SET `name` = '$Nombre' WHERE `id` = '$idrole'");
    if ($result) {
        $info = array('success' => true, 'msg' => 'Se ha agregado el role con exito "' . $Nombre . '"y "' . $idrole . '" ');
        echo json_encode($info);
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta "' . $Nombre . '" y "' . $idrole . '"');
        echo json_encode($info);
    }
}
if ($idr == 'updateproceso') {
    $Descipcion = $_PUT['Descipcion'];
    $Proceso = $_PUT['Proceso'];
    $idProceso = $_PUT['idProceso'];
    $result = mysql_query("UPDATE `jos_registros` SET  `category` = '$Proceso', `description` = '$Descipcion'  WHERE `id` = '$idProceso'");
    if ($result) {
        $info = array('success' => true, 'msg' => 'Se han modificado los datos con exito');
        echo json_encode($info);
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta');
        echo json_encode($info);
    }
}
if ($idr == 'updateuser') {
    $Nombre = $_PUT['Nombre'];
    $Usuario = $_PUT['Usuario'];
    $Correo = $_PUT['Correo'];
    $Password = md5($_PUT['Password']);
    $useuariorole = $_PUT['useuariorole'];
    $iduser = $_PUT['iduser'];
    $result = mysql_query("UPDATE `jos_users` SET  `username` = '$Nombre', `name` = '$Usuario', `email` = '$Correo', `password` = '$Password', `role` = '$useuariorole'  WHERE `id` = '$iduser'");
    if ($result) {
        $info = array('success' => true, 'msg' => 'Se han modificado los datos con exito');
        echo json_encode($info);
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta');
        echo json_encode($info);
    }
}
//=================================/Roles/========================================================//
else if ($_GET['termino'] == role) {
    $result = mysql_query("SELECT * FROM  jos_role ORDER BY id");
    $data = array();
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
    while ($row = mysql_fetch_array($result)) {
        array_push($data, array(
            "id" => $row["id"],
            "name" => $row["name"]
        ));
    }
    echo json_encode(array("success" => true, "total" => count($data), "data" => array_splice($data, $start, $limit)));
}
if ($_GET['termino'] == eliminarrole) {
    $_PUT = array();
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        parse_str(file_get_contents('php://input'), $_PUT);
    }
    //$equipo = $_PUT['Equipo'];
    $id = $_PUT['id'];
    $id = json_decode(stripslashes($_POST["data"]));
    $query = sprintf("DELETE FROM jos_role WHERE id = '$id'", mysql_real_escape_string($id));
    $rs = mysql_query($query);
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "msg" => mysql_errno() == 0 ? "Contact deleted successfully" : mysql_error()
    ));
}
//=================================/Nodes/========================================================//
else if ($_GET['termino'] == node) {
    $result = mysql_query("SELECT * FROM  jos_registros WHERE `tipoReg` = '1'  ORDER BY id");
    $data = array();
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
    while ($row = mysql_fetch_array($result)) {
        array_push($data, array(
            "id" => $row["id"],
            "category" => $row["category"],
            "description" => $row["description"],
            "user" => $row["user"],
            "user_test" => $row["user_test"],
            "node_html" => $row["node_html"]
        ));
    }
    echo json_encode(array("success" => true, "total" => count($data), "data" => array_splice($data, $start, $limit)));
}
if ($_GET['termino'] == eliminarnode) {
    $_PUT = array();
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        parse_str(file_get_contents('php://input'), $_PUT);
    }
    $id = $_PUT['id'];
    $id = json_decode(stripslashes($_POST["data"]));
    $query = sprintf("DELETE FROM jos_registros WHERE id = '$id'", mysql_real_escape_string($id));
    $rs = mysql_query($query);
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "msg" => mysql_errno() == 0 ? "Contact deleted successfully" : mysql_error()
    ));
}
//=================================/Procesos o  Categorias/========================================================//
else if ($_GET['termino'] == proces) {
    $result = mysql_query("SELECT * FROM  jos_registros  WHERE `tipoReg` = '0' ORDER BY id");
    $data = array();
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
    while ($row = mysql_fetch_array($result)) {
        array_push($data, array(
            "id" => $row["id"],
            "category" => $row["category"],
            "description" => $row["description"],
            "user" => $row["user"],
            "user_test" => $row["user_test"]
        ));
    }
    echo json_encode(array("success" => true, "total" => count($data), "data" => array_splice($data, $start, $limit)));
}
if ($_GET['termino'] == eliminarproces) {
    $_PUT = array();
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        parse_str(file_get_contents('php://input'), $_PUT);
    }
    $id = $_PUT['id'];
    $id = json_decode(stripslashes($_POST["data"]));
    $query = sprintf("DELETE FROM jos_registros WHERE id = '$id'", mysql_real_escape_string($id));
    $rs = mysql_query($query);
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "msg" => mysql_errno() == 0 ? "Contact deleted successfully" : mysql_error()
    ));
}
//===================================Usuarios=================================================//
else if ($_GET['termino'] == usuarios) {
    $result = mysql_query("SELECT * FROM  jos_users ORDER BY id");
    $data = array();
    $start = isset($_POST['start']) ? $_POST['start'] : 0;
    $limit = isset($_POST['limit']) ? $_POST['limit'] : 100;
    while ($row = mysql_fetch_array($result)) {
        array_push($data, array(
            "id" => $row["id"],
            "name" => $row["name"],
            "username" => $row["username"],
            "email" => $row["email"],
            "role" => $row["role"],
        ));
    }
    echo json_encode(array("success" => true, "total" => count($data), "data" => array_splice($data, $start, $limit)));
}
if ($_GET['termino'] == eliminarusuarios) {
    $_PUT = array();
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        parse_str(file_get_contents('php://input'), $_PUT);
    }
    $id = $_PUT['id'];
    $id = json_decode(stripslashes($_POST["data"]));
    $query = sprintf("DELETE FROM jos_users WHERE id = '$id'", mysql_real_escape_string($id));
    $rs = mysql_query($query);
    echo json_encode(array(
        "success" => mysql_errno() == 0,
        "msg" => mysql_errno() == 0 ? "Contact deleted successfully" : mysql_error()
    ));
}

if ($_GET['termino'] == registro) {
    $editor = $_POST['editor'];
    $idreg = $_POST['idreg'];
    $descricion = $_POST['descricion'];
    $usuario = $_POST['usuario'];
    $password = $_POST['password'];
    $observaciones = $_POST['observaciones'];
    $proceso = $_POST['proceso'];
    $text = $_POST['textname'];
    $fecha = date("Y-m-d h:i:s");
    $anno = date("Y");
    $mes = date("F");
	
///busacar usuario
    $idRol = mysql_query("SELECT * FROM jos_registros where user_test='$usuario' and id='$idreg'");
    while ($row = mysql_fetch_array($idRol)){$category = $row["category"];$user = $row["user"];}	
    if (!$category == ''){}
	else {
        $info = array('failure' => true, 'msg' => 'El usuario no existe "'.$category.'" ');
        echo json_encode($info);
    }
    
/////buscar anno existente
    $annoexist = mysql_query("SELECT * FROM jos_registros_terminados where category='$anno'");
    while ($row = mysql_fetch_array($annoexist)){$idanno = $row["id"];}
    if (!$idanno == ''){1+2;}
    else{
        $result = mysql_query("INSERT INTO jos_registros_terminados ( `id`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`observacion`,`iconCls`,`fecha`,`fechaActulizacion`)VALUES ('','$anno','NULL','','','','','','anno','0000-00-00','0000-00-00')");       
		$annoexist = mysql_query("SELECT * FROM jos_registros_terminados where category='$anno'");
		while ($row = mysql_fetch_array($annoexist)){$idanno = $row["id"];} 
	}

/////buscar mes existente
    $meses = mysql_query("SELECT * FROM jos_registros_terminados where category='$mes'and id_parent='$idanno'");
    while ($row = mysql_fetch_array($meses)) {$idmes = $row["id"];}
    if (!$idmes == ''){2*6;}
    else{
        $result = mysql_query("INSERT INTO jos_registros_terminados( `id`,`id_parent`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`observacion`,`iconCls`,`fecha`,`fechaActulizacion`)VALUES ('','$idanno','$mes','NULL','','','','','','mes','0000-00-00','0000-00-00')");
		$meses = mysql_query("SELECT * FROM jos_registros_terminados where category='$mes'and id_parent='$idanno'");
		while ($row = mysql_fetch_array($meses)) {$idmes = $row["id"];}
	}	
	
/////buscar proceso existente    
	
	$prcs = mysql_query("SELECT * FROM jos_registros where id=' $proceso'");
     while ($row = mysql_fetch_array($prcs)){$nombre = $row["category"];}
	$prcs = mysql_query("SELECT * FROM jos_registros_terminados where category='$nombre'and id_parent ='$idmes'");	
    while ($row = mysql_fetch_array($prcs)){$idprocs = $row["id"];}    
	if (!$idprocs == ''){2*6;}
    else{
        $result = mysql_query("INSERT INTO jos_registros_terminados
		( `id`,`id_parent`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`observacion`,`iconCls`,`fecha`,`fechaActulizacion`)
		VALUES ('','$idmes','$nombre','NULL','','','','','','dept','0000-00-00','0000-00-00')");
		$meses = mysql_query("SELECT * FROM jos_registros_terminados where category='$nombre'and id_parent='$idmes'");
		while ($row = mysql_fetch_array($meses)) {$idprocs = $row["id"];}
	}	
	
//Agregar el registro
		$namereg = mysql_query("SELECT * FROM jos_registros_terminados where category='$text'and id_parent='$idprocs'");
		while ($row = mysql_fetch_array($namereg)){$idregname = $row["id"];}
		if (!$idregname == ''){
		$result = mysql_query("UPDATE `jos_registros_terminados` SET  `fechaActulizacion` = '$fecha',`node_html` = '$editor' WHERE `id` = '$idregname'");   
       }
		else{
		 $result = mysql_query("INSERT INTO jos_registros_terminados
		 ( `id`,`id_parent`,`category`,`order_number`,`description`,`node_html`,`user`,`user_test`,`observacion`,`iconCls`,`fecha`,`fechaActulizacion`)
		 VALUES ('','$idprocs','$text','NULL','$descricion','$editor','$usuario','$usuario','$observaciones','regu','$fecha','0000-00-00')");
		}



}


if ($_GET['termino'] == adminregistro) {
    $idreg = $_POST['idreg'];
    $adminregistro = $_POST['adminregistro'];
    $fecha = date("Y-m-d h:i:s");
    $result = mysql_query("UPDATE `jos_registros_terminados` SET  `fechaActulizacion` = '$fecha',`node_html` = '$adminregistro' WHERE `id` = '$idreg'");
    if ($result) {
        $info = array('success' => true, 'msg' => 'Se ha modificado el registro');
        echo json_encode($info);
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta  ');
        echo json_encode($info);
    }
}
if ($_GET['termino'] == modregistro) {
    $intro = $_POST['intro'];
    $editor = $_POST['editor'];
    $idreg = $_POST['idreg'];
    $usuario = $_POST['usuario'];
    $usuarioA = $_POST['usuarioA'];
    $proceso = $_POST['proceso'];
    $result = mysql_query("UPDATE `jos_registros` SET `node_html` = '$editor', `description` = '$intro',`user` = '$usuario',`user_test` = '$usuarioA', `id_parent` = '$proceso' WHERE `id` = '$idreg'");
    if ($result) {
        $info = array('success' => true, 'msg' => 'Se ha modificado el registro');
        echo json_encode($info);
    } else {
        $info = array('failure' => true, 'msg' => 'Ha ocurrido algun error en la consulta  ');
        echo json_encode($info);
    }
}
?>




