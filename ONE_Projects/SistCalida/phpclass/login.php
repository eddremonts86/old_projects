<?php
        $local= "localhost";
	$user= "edd";
	$passw= "edd";
	$db="calidad";
	$connection= mysql_connect("$local","$user","$passw") or die("Connection Failed".mysql_error());
	mysql_select_db("$db",$connection)or die("Error loading the DataBase".mysql_error());
        
if ($_GET['termino'] == login) {
    $_PUT = array();
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {parse_str(file_get_contents('php://input'), $_PUT);}
    $user = $_PUT['nombre'];    $passw = $_PUT['passw'];
    if ($user != '' & $passw != '') {
        $result = mysql_query("Select count(*) from jos_users where name='$user'");
        $idRol = mysql_query("SELECT * FROM jos_users where name='$user'");
        while ($row = mysql_fetch_array($idRol)) {
            $id = $row["id"];               $correo = $row["email"];        $username = $row["username"];
            $passwbd = $row["password"];    $name = $row["name"];           $usertype = $row["usertype"];
             $role = $row["role"];
        }
        if (md5($passw) === $passwbd) {           
            if ($role == 'Administrador'){ 
                 $info = array('success' => true, 'msg' => 'Bienvenido ' . $user . '. ');
            }
            else if($role == 'Tecnico'){
                 $info = array('Tecnico' => true, 'msg' => 'Bienvenido ' . $user . '. ');
            }
            else if($role == 'Jefe Departamento'){
                 $info = array('Departamento' => true, 'msg' => 'Bienvenido ' . $user . '. ');
                }

           
        } else {            
            $info = array('failure' => false, 'msg' => 'No se encontraron coincidencias,intentelo de nuevo...');
        }
        echo json_encode($info);
    }
    }
?>