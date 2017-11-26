<?php

class install
 {
    public $server;
    public $base;
    public $passw;
    public $user;
    public $puerto;

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
    public function IntemConfig($server,$user,$passw,$puerto,$base,$combo,$subsistem){}
    public function IsConect_PGSQL($server,$user,$passw,$puerto,$base){
        if($base != null){
            $connstr = "user=$user password=$passw host=$server port=$puerto dbname=$base";
            $dbh = @pg_connect($connstr);
            if ($dbh){
                $info = array('success' => true,'msg' => 'La coneccion es valida y la BD '.$base.' existe.');
                echo json_encode($info);
                @pg_close($dbh);
                return 0;
            }
            else {
                $connstr = "user=$user password=$passw host=$server port=$puerto";
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
        }
        else{
            $info = array('success' => true,'msg' => 'La coneccion es invalida y la BD '.$base.' no existe.');
            echo json_encode($info);
            return false;
            }

    }
    public function CreateBD_PGSQL($server,$user,$passw,$puerto,$base){
        $obj=new install();
        $obj->IsConect_PGSQL($server,$user,$passw,$puerto,$base);
        if($obj==1){
            $info = array('success' => true,'msg' => 'La base de datos '. $base .' ya existe');
            echo json_encode($info);
        }
        else if($obj==0){
            $connstrurir = "user=$user password=$passw host=$server port=$puerto";
            $crear = @pg_connect($connstrurir);
            $result = pg_query(" CREATE DATABASE $base OWNER $user");
            pg_close($crear);
            if ($result){$info = array('success' => true,'msg' => 'Se ha creado la base de datos '. $base .' exitosamente');}
            else {$info = array('success' => false,'msg' => 'Se encontraron errores al intentar crear la Base de datos');}
            echo json_encode($info);
        }
    }

    public function GlobalConfig($server,$user1,$passw,$puerto,$base,$combo){

        $content_file = "
            <?php
                final class CommonConnections extends ConnectionsStorage
                {
                    public \$type    = '$combo';
                    public \$host    = '$server';
                    public \$port    = '$puerto';
                    public \$user    = '$user1';
                    public \$pass    = '$passw';
                    public \$dbase   = '$base';

                    public function __construct()
                {
                    parent::__construct();".
                    '$this->connections_config[\'ark\'] = array();
                    $this->connections_config[\'ark\'][\'type\'] = $this->type;
                    $this->connections_config[\'ark\'][\'host\'] = $this->host;
                    $this->connections_config[\'ark\'][\'port\'] = $this->port;
                    $this->connections_config[\'ark\'][\'user\'] = $this->user;
                    $this->connections_config[\'ark\'][\'pass\'] = $this->pass;
                    $this->connections_config[\'ark\'][\'dbase\'] = $this->dbase;'
            ."}
                }?>
            ";
        chdir('../../App/Config');
        $dirNew=getcwd() . "/";
       // print_r($dirNew);
        $wraite = file_put_contents($dirNew."common_access.php", $content_file);

        if($wraite)
            return true;
        else
            return false;
    }
    public function Conf($state){
        $content_file= " ";
        if($state=='debug'){
            $content_file= "
                <?php
                        /// Modes of the application
                        define(DEBUG_MODE, 1);   // Building the application.
                                                 // In this state the application show the full description
                                                 // of internal errors and not registe logs.
                        define(TESTING_MODE, 2); // Testing with the security.
                                                 // In this state the application show the full description
                                                 // of internal errors and registe logs. Incorporate the security
                        define(RELEASE_MODE, 3); // Application in release mode.
                                                 // The application run as a release, does not show the description
                                                 // of the errors but they are registered into the database

                        /// Register logs and error
                        define(LOGS_ON, 1);      // It define that the logs treatment is active
                        define(LOGS_OFF, 2);     // It define that the logs treatment is not active

                        // Define the run mode of the applications
                        define(RUN_APP_MODE, DEBUG_MODE);
                        //define(RUN_APP_MODE, TESTING_MODE);
                        //define(RUN_APP_MODE, RELEASE_MODE);

                        // Define the treatment of logs and errors in database
                        //define(LOGS_STATE, LOGS_OFF);
                        define(LOGS_STATE, LOGS_ON);

                        // Define the default system in DEBUG_MODE
                        \$_SUBSYSTEM = 'Admin';
                 ?>
            ";
        }
        else if($state=='test'){
            $content_file= "
             <?php
                        /// Modes of the application
                        define(DEBUG_MODE, 1);   // Building the application.
                                                 // In this state the application show the full description
                                                 // of internal errors and not registe logs.
                        define(TESTING_MODE, 2); // Testing with the security.
                                                 // In this state the application show the full description
                                                 // of internal errors and registe logs. Incorporate the security
                        define(RELEASE_MODE, 3); // Application in release mode.
                                                 // The application run as a release, does not show the description
                                                 // of the errors but they are registered into the database

                        /// Register logs and error
                        define(LOGS_ON, 1);      // It define that the logs treatment is active
                        define(LOGS_OFF, 2);     // It define that the logs treatment is not active

                        // Define the run mode of the applications
                        //define(RUN_APP_MODE, DEBUG_MODE);
                        define(RUN_APP_MODE, TESTING_MODE);
                        //define(RUN_APP_MODE, RELEASE_MODE);

                        // Define the treatment of logs and errors in database
                        //define(LOGS_STATE, LOGS_OFF);
                        define(LOGS_STATE, LOGS_ON);

                        // Define the default system in DEBUG_MODE
                        //\$_SUBSYSTEM = 'Admin';
                 ?>
             ";
        }
        else if ($state=='relase'){
            $content_file= "
              <?php
                        /// Modes of the application
                        define(DEBUG_MODE, 1);   // Building the application.
                                                 // In this state the application show the full description
                                                 // of internal errors and not registe logs.
                        define(TESTING_MODE, 2); // Testing with the security.
                                                 // In this state the application show the full description
                                                 // of internal errors and registe logs. Incorporate the security
                        define(RELEASE_MODE, 3); // Application in release mode.
                                                 // The application run as a release, does not show the description
                                                 // of the errors but they are registered into the database

                        /// Register logs and error
                        define(LOGS_ON, 1);      // It define that the logs treatment is active
                        define(LOGS_OFF, 2);     // It define that the logs treatment is not active

                        // Define the run mode of the applications
                        //define(RUN_APP_MODE, DEBUG_MODE);
                        //define(RUN_APP_MODE, TESTING_MODE);
                        define(RUN_APP_MODE, RELEASE_MODE);

                        // Define the treatment of logs and errors in database
                        //define(LOGS_STATE, LOGS_OFF);
                        define(LOGS_STATE, LOGS_ON);

                        // Define the default system in DEBUG_MODE
                      //  \$_SUBSYSTEM = 'Admin';
                 ?>
             ";
        }
        chdir('../../App/Config');
        $dirNew=getcwd() . "/";
        $wraite = file_put_contents($dirNew."app_config.php", $content_file);

        if($wraite)return true;
        else return false;
    }
    public function CreateUser($correo_,$usuarior,$passwdr,$server,$user,$passw,$puerto,$base,$sitio,$desc)
    {
        $connstr = "user=$user password=$passw host=$server port=$puerto dbname=$base";
        $dbh = @pg_connect($connstr);
        // Get parameters
        $_user_name = $usuarior;
        $_user_log = $usuarior;
        $_user_pass =$passwdr;
        $_md5_log = md5($_user_log . ".." + md5($_user_log));
        $_sha_log = sha1($_user_log . ".." + sha1($_user_log));
        $_md5_pass = md5($_user_pass . ".." + md5($_user_pass));
        $_sha_pass = sha1($_user_pass . ".." + sha1($_user_pass));
        $_signing = crc32(sha1($_user_log) . md5($_user_pass));
        $_user_pass = md5($_user_pass);
        // Get the last id of users
        $_str_query = "SELECT max(user_id) as user_id FROM app_security.users;";
        $_str_query_all = "SELECT * FROM app_security.users;";
        $_selection = pg_query($dbh,$_str_query);
        $_selection_all = pg_query($dbh,$_str_query_all);
        if(is_null($_selection))
        {
            @pg_close($dbh);
            return false;
        }
        $_result = $_selection_all;
        $_last_user_id = $_result[0]['user_id'];

        // Generate the new id
        $_users_count = intval(substr($_last_user_id, strpos($_last_user_id, '-') + 1));
        $_user_id = 'Usr-' . str_pad(($_users_count+1), 4, '0', STR_PAD_LEFT);

        $mysql="INSERT INTO app_security.users (user_id, user_name,user_log,user_pwd,md5_log,sha_log,md5_pass,sha_pass,signing,active,rol_id,email)
                VALUES ('$_user_id','$_user_name','$_user_log','$_user_pass','$_md5_log','$_sha_log','$_md5_pass','$_sha_pass','$_signing','true','Rol-0003','$correo_');";
        $mysql1="INSERT INTO app_security.aplicacion_data (title,info) VALUES ('$sitio','$desc');";

        pg_query($dbh,$mysql1);
        $_selection = pg_query($dbh,$mysql);
        if(is_null($_selection))
        {
            @pg_close($dbh);
            return false;
        }

        @pg_close($dbh);
        return true;
    }
    public function ImportBD_PGSQL($server,$user,$passw,$puerto,$base,$sitio,$desc,$correo_,$usuarior,$passwdr,$resp,$state){
    $connstr = "user=$user password=$passw host=$server port=$puerto dbname=$base";
    $dbh = @pg_connect($connstr);
    $connstr1 = "user=$user password=$passw host=$server port=$puerto";
    $dbh1 = @pg_connect($connstr1);

       if ($dbh==true){
            $dir =getcwd();
            $mdr=$dir.'\Ark.sql';
            $sql = file_get_contents($mdr);
            pg_query($dbh,$sql);
            $this->CreateUser($correo_,$usuarior,$passwdr,$server,$user,$passw,$puerto,$base,$sitio,$desc);
            $combo='PostgreSQL';
            $this->GlobalConfig($server,$user,$passw,$puerto,$base,$combo);
            $this->Conf($state);
           return true;
        }
        else if ($dbh1==true){
            pg_query(" CREATE DATABASE $base OWNER $user");
            $connstr = "user=$user password=$passw host=$server port=$puerto dbname=$base";
            $dbh = @pg_connect($connstr);
            $dir =getcwd();
            $mdr=$dir.'\Ark.sql';
            $sql = file_get_contents($mdr);
            pg_query($dbh,$sql);
            $this->CreateUser($correo_,$usuarior,$passwdr,$server,$user,$passw,$puerto,$base,$sitio,$desc);
            $combo='PostgreSQL';
            $this->GlobalConfig($server,$user,$passw,$puerto,$base,$combo);
            $this->Conf($state);
            return true;
        }
        else return false;

    }

}


