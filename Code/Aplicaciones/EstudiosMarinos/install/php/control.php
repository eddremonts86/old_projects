<?php
  //print_r($_POST);
  //print_r($_FILES);
    include"install.php";
    $functions=$_GET['test'];

    $sitio=$_GET['sitio'];
    $desc=$_GET['desc'];
    $state=$_GET['state'];

    $correo_=$_GET['correo_'];
    $usuarior=$_GET['usuario_'];
    $passwdr=$_GET['password'];

    $user=$_GET['Datos_'];
    $passw=$_GET['BD_pass'];
    $server=$_GET['Hospedaje_'];
    $puerto=$_GET['puerto_'];
    $base=$_GET['Base_'];
    $resp=$_GET['resp'];

    $objIntall=new install();
    if($functions=='importar') {
      //  if(){}
           $resultBD=$objIntall->ImportBD_PGSQL($server,$user,$passw,$puerto,$base,$sitio,$desc,$correo_,$usuarior,$passwdr,$resp,$state);
           if($resultBD){
               $info = array('success' => false,'msg' => 'Se termino el proceso satisfactoriamente');
               echo json_encode($info);
           }
           else{
               $info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');
               echo json_encode($info);
           }
       }
       else {
           $info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');
           echo json_encode($info);
       }

