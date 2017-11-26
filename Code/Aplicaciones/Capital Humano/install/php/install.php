<?php

class install
 {
    public $server;
    public $base;
    public $passw;
    public $user;
    public $pueto;

    public function upfile($_FILES){
        $dir =getcwd();
        if(!is_dir ($dir.'/bd'))
        {$mdr=mkdir($dir.'/bd', 0777);}
        $mdr=$dir.'/bd/';
        $uploadfile = $mdr.basename($_FILES['SQL']['name']);
        $basedir="$uploadfile";
        $basename= $_FILES['SQL']['name'];
        if (!move_uploaded_file($_FILES['SQL']['tmp_name'], $uploadfile)) {
            $this->RegisterError('Error', 'El archivo '. $_FILES['SQL']['name'] . ' no pudo ser subido al servidor');
            return false;
        }
        $sql = file_get_contents($uploadfile);
        return $sql;
    }
    public function ReadSubsistem(){
        $new=chdir('../../App/Config');
        $dirNew=getcwd()."/";
        $subsistem = file_get_contents($dirNew."config.xml");
        $sub=explode('<subsystem name="',$subsistem);
        $separado_por_comas = implode(" ", $sub);
        $sub1=explode('"/>',$separado_por_comas);
        /*for($i=0;$i<count($sub1)-1;$i++){echo $i.$sub1[$i];echo "<br>" ;}*/
        if (is_null($sub1))
            return false;
        $_count = count($sub1);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $sub1);
        return $result;

    }
    public function GlobalConfig($server,$user,$passw,$pueto,$base,$combo){

        $content_file = "
            <?php
                final class CommonConnections extends ConnectionsStorage
                {
                public function __construct()
                {
                parent::__construct();".
            '$this->connections_config[\'ch\'] = array();
                $this->connections_config[\'ch\'][\'type\'] = \''.$combo.'\';
                $this->connections_config[\'ch\'][\'host\'] = \''.$server.'\';
                $this->connections_config[\'ch\'][\'port\'] = \''.$pueto.'\';
                $this->connections_config[\'ch\'][\'user\'] = \''.$user.'\';
                $this->connections_config[\'ch\'][\'pass\'] = \''.$passw.'\';
                $this->connections_config[\'ch\'][\'dbase\'] = \''.$base.'\';'
            ."}
                }
            ?>";
        chdir('../App/Config');
        $dirNew=getcwd() . "/";
        $wraite = file_put_contents($dirNew."common_access.php", $content_file);
    }
    public function IntemConfig($server,$user,$passw,$pueto,$base,$combo,$subsistem){}
    public function IsConect_PGSQL($server,$user,$passw,$pueto,$base){
        if($base != null){
            $connstr = "user=$user password=$passw host=$server port=$pueto dbname=$base";
            $dbh = @pg_connect($connstr);
            if ($dbh){
                $info = array('success' => true,'msg' => 'La coneccion es valida y la BD '.$base.' existe.');
            }
            else {
                $info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');
            }
            echo json_encode($info);
            @pg_close($dbh);
            return 1;
        }
        else if ($base == null){
            $connstr = "user=$user password=$passw host=$server port=$pueto";
            $dbh = @pg_connect($connstr);
            if ($dbh){
                $info = array('success' => true,'msg' => 'La coneccion es valida');
            }
            else {
                $info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');
            }
            echo json_encode($info);
            @pg_close($dbh);
            return 0;
        }
        else{
            $info = array('success' => true,'msg' => 'La coneccion es invalida y la BD '.$base.' no existe.');
            echo json_encode($info);
            return false;
            }

    }
    public function CreateBD_PGSQL($server,$user,$passw,$pueto,$base){
        $obj=new install();
        $obj->IsConect_PGSQL($server,$user,$passw,$pueto,$base);
        if($obj==1){
            $info = array('success' => true,'msg' => 'La base de datos '. $base .' ya existe');
            echo json_encode($info);
        }
        else if($obj==0){
            $connstrurir = "user=$user password=$passw host=$server port=$pueto";
            $crear = @pg_connect($connstrurir);
            $result = pg_query(" CREATE DATABASE $base OWNER $user");
            pg_close($crear);
            if ($result){$info = array('success' => true,'msg' => 'Se ha creado la base de datos '. $base .' exitosamente');}
            else {$info = array('success' => false,'msg' => 'Se encontraron errores al intentar crear la Base de datos');}
            echo json_encode($info);
        }
    }
    public function ImportBD_PGSQL($server,$user,$passw,$pueto,$base,$file){
       $obj=new install();
       $obj->IsConect_PGSQL($server,$user,$passw,$pueto,$base);
       if ($obj==0){
           $obj->CreateBD_PGSQL($server,$user,$passw,$pueto,$base);
           $sql=$obj->upfile($file);
           $connstrurir = "user=$user password=$passw host=$server port=$pueto dbname=$base";
           $revizar = @pg_connect($connstrurir);
           $result = pg_query($revizar,$sql);
           if ($result)
           {$info = array('success' => true,'msg' => 'Se han importado los datos con exito');}
           else {$info = array('success' => false,'msg' => 'Se encontraron errores al procesar los datos');}
           echo json_encode($info);
           pg_close($revizar);
       }





   }

}
