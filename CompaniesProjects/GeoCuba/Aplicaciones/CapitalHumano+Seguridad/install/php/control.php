<?php
  //print_r($_POST);
  //print_r($_FILES);
    include"install.php";

    $functions=$_POST['test'];
    $combo=$_POST['combo'];

    $usuarior=$_POST['Usuarior'];
    $passwdr=$_POST['passwordr'];

    $user=$_POST['Usuario'];
    $passw=$_POST['password'];
    $server=$_POST['Sever'];
    $puerto=$_POST['Puerto'];
    $base=$_POST['base'];
    $objIntall=new install();


   if($combo=='PostgreSQL') {
       if($functions=='testin'){
           $objIntall->IsConect_PGSQL($server,$user,$passw,$puerto,$base);
       }
       elseif($functions=='crearla'){
           $objIntall->CreateBD_PGSQL($server,$user,$passw,$puerto,$base);
       }
       elseif($functions=='importar') {
           $objIntall->ImportBD_PGSQL($server,$user,$passw,$puerto,$base,$_FILES['SQL']);
       }
       else {
           $info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos1');
           echo json_encode($info);
       }
   }
   if($functions=='manual'){echo "Llegamos he!";}


