<?php
$fichero = getcwd().'/..'.str_replace('\\\\',"'\'" , ($_GET['cadena']));
//print_r($fichero);die;
$fichero = str_replace("'\''\'","'\'" , $fichero);
$fichero = str_replace('/',"'\'" , $fichero);
$fichero = str_replace("'\''\'","'\'" , $fichero);
$fichero = str_replace("'",'', $fichero);
$fichero = str_replace("___","+", $fichero);

$info = pathinfo(($fichero));
$fichero = $info['dirname'].'/'.$info['basename'];
$fichero = str_replace('/',"'\'" , $fichero);
$fichero = str_replace("'",'', $fichero);

if(isset($_GET['decode']))
   $fichero = utf8_decode($fichero);
   $info = pathinfo(($fichero));

//print_r($fichero);die;
header('Content-type:application/'.$info['extension'].'');
header('Content-Disposition: attachment; filename="'.$info['basename'].'"');
//PDF_open_pdi_document ($pdf,$fichero,'jsdd');
readfile($fichero);
