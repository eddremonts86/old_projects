 <?php
include 'ClassConect.php';
include 'TreeExtJs.class.php';
$usuarios=usuarios;
$categorias=categorias;
if($_GET['termino']==$usuarios) {
    $result= mysql_query("SELECT * FROM  jos_users ORDER BY name");
    $data= array();
    $start = isset($_POST['start'])?$_POST['start']:0;
    $limit = isset($_POST['limit'])?$_POST['limit']:100;
    while($row= mysql_fetch_array($result)) {
        array_push($data,array(
            "id"    => $row["id"],
            "nombre" => $row["name"],
            "username" => $row["username"],
            "email" => $row["email"]

        ));
    }
    echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
}
if($_GET['termino']==role) {
    $result= mysql_query("SELECT * FROM jos_role  ORDER BY name");
    $data= array();
    $start = isset($_POST['start'])?$_POST['start']:0;
    $limit = isset($_POST['limit'])?$_POST['limit']:100;
    while($row= mysql_fetch_array($result)) {
        array_push($data,array(
            "id"    => $row["id"],
            "nombre" => $row["name"]
            ));
    }
    echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
}
if($_GET['termino']==$categorias) {
    $result= mysql_query("SELECT * FROM  jos_registros  WHERE `tipoReg` = '0' ORDER BY id_parent");
    $data= array();
    $start = isset($_POST['start'])?$_POST['start']:0;
    $limit = isset($_POST['limit'])?$_POST['limit']:100;
    while($row= mysql_fetch_array($result)) {
        array_push($data,array(
            "id"    => $row["id"],
            "id_parent" => $row["id_parent"],
            "category" => $row["category"],
            "description" => $row["description"]

        ));
    }
    echo json_encode(array("success" => true,"total"=>count($data), "data" => array_splice($data,$start,$limit)));
}

 ?>
