<?php

class Features extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ark');
    }

    public function ValidateLeer(&$params)
    {return true;}
    public function Leer(&$params)
    {
        $dir=$params['dir'];
        chdir('../../');
        $dirNew=getcwd();
        $nombre_archivo = $dirNew.'\index.php';
        $gestor = fopen($nombre_archivo, 'a+');
        $cont=file_get_contents($nombre_archivo);
        $record= json_encode($cont);
        return array('success' => true,'rows' => $record);


    }

    public function Validatereload(&$params)
    {return true;}
    public function reload(&$params)
    {
        $dir=$params['dir'];
        chdir('../../');
        $dirNew=getcwd();
        $nombre_archivo = $dirNew.'\prueba.txt';
        $gestor = fopen($nombre_archivo, 'a+');
        $cont=file_get_contents($nombre_archivo);
        $record= json_encode($cont);
        return array('success' => true,'rows' => $record);
    }

    public function ValidateEscribir(&$params)
    {return true;}
    public function Escribir(&$params)
    {   $cuerpo=$params['cuerpo'];
        $dir=$params['dir'];
        chdir('../../');
        $dirNew=getcwd();
        $nombre_archivo = $dirNew.'\prueba.txt';
        $gestor = fopen($nombre_archivo, 'w');
        fwrite($gestor, $cuerpo);
        fclose($gestor);
        $cont=file_get_contents($nombre_archivo);
        $record= json_encode($cont);
        return array('success' => true,'rows' => $record);


    }
}
?>
