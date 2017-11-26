<?php
$valores = array();
$new=chdir('../../App/Config');
$dirNew=getcwd()."/";
//$subsistem = file_get_contents($dirNew."config.xml");
$subsistem =$dirNew."config.xml";
$xml  = simplexml_load_file($subsistem);
$app = $xml->subsystem;
foreach($app as $element => $attribute)
        {$valores[]=(strval($attribute[name]));}
//print_r($valores[1]);
echo json_encode($valores);



