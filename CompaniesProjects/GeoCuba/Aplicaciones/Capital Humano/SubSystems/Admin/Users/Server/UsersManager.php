<?PHP

class UsersManager extends Module
{
    private $_security_conn;

    public function __construct()
    {
      parent::__construct('admin');
      $this->_security_conn = SecurityConnections::GetInstance();
    }

    public function LinkFunctions()
    {
        $this->Link('main','LoadData', 'LoadRols');
        $this->Link('Add','AddUser');
        $this->Link('Modify','ModifyUserData');
        $this->Link('ChangePassword','ChangeUserPassword');
        $this->Link('Delete','DeleteUser');
    }
     
    public function ValidateLoadUsers(&$params)
    {
      return true;
    }
     
    public function LoadUsers(&$params)
    {
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        if(!Validator::ToInt($_start)) return false;
        if(!Validator::ToInt($_limit)) return false;

        /// Get data
        $sql = "SELECT user_name,
                       user_id,
                       trabajador.nombre_completo as  trabajador,
                       trabajador.foto as foto_trabj,
                        trabajador.id as id,
                       user_log,
                       rol_name
                FROM
                       app_security.users
                       inner join app_security.rols USING(rol_id)
                       left join plantilla.trabajador on trabajador.id = trabajador_id
                WHERE
                       active = true
                ORDER BY
                       user_name";

        $_selection = $this->_dbase->Select($sql, $_limit, $_start);
        if(is_null($_selection))
            return false;
        $_data = $_selection->GetAll();
        $_selection = $this->_dbase->Select($sql);
        $_count = $_selection->GetNumRows();

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);

        return $result;
     }
     
    public function ValidateCreateUser(&$params)
    {
        $_log = $params['user_log'];
        $_user_name = $params['user_name'];
        $_user_log = $params['user_log'];
        $_rol = $params['rol'];
        $_rol_name = $params['rol'];

        if(!Validator::CheckStringSize($_log, 4, 64))
        {
            $this->RegisterError('Operación no válida', "La cantidad de caracteres del identificador del usuario tiene que estar entre 4 y 64.");
            return false;
        }

        if(!Validator::CheckStringSize($_user_name, -1, 128))
        {
            $this->RegisterError('Operación no válida', "La cantidad de caracteres del nombre del usuario no puede exceder los 128.");
            return false;
        }

        Validator::ToCleanSQL($_log);
        Validator::ToCleanSQL($_rol_name);

        $_users_table = $this->_security_conn->GetTableName('users');
        $_users = $this->_dbase->GetTable($_users_table);
        $count = $_users->Contains(array(
            'user_log' => "'$_log'"
        ));

        // If the result is less than 0, an error success
        if($count < 0)
            return false;
        // If the count is bigger than 0, then exists
        elseif ($count > 0)
        {
            $this->RegisterError('Operación no válida', "El usuario '$_user_log' ya fue registrado.");
            return false;
        }

        // Get the rol_id
        $_rols_table = $this->_security_conn->GetTableName('rols');
        $_rols = $this->_dbase->GetTable($_rols_table);
//          $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name' AND active = true");
        $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name'");
        if(is_null($_rol_id))
        {
            $this->RegisterError('Operación no válida', "El rol '$_rol' no existe.");
            return false;
        }

        $params['user_log'] = $_log;
        $params['rol'] = $_rol_id;

        return true;
    }

    public function CreateUser(&$params)
    {
        // Get parameters
        $_user_name = $params['user_name'];
        $_user_log = $params['user_log'];
        $_user_pass = $params['user_pass'];
        $_rol_id = $params['rol'];

        // Clean the name
        Validator::ToCleanSQL($_user_name);

        // Insertion
        $_md5_log = md5($_user_log . ".." + md5($_user_log));
        $_sha_log = sha1($_user_log . ".." + sha1($_user_log));

        $_md5_pass = md5($_user_pass . ".." + md5($_user_pass));
        $_sha_pass = sha1($_user_pass . ".." + sha1($_user_pass));

        $_signing = crc32(sha1($_user_log) . md5($_user_pass));

        $_user_pass = md5($_user_pass);

        // Get the last id of users
        $_users_table = $this->_security_conn->GetTableName('users');
        $_users = $this->_dbase->GetTable($_users_table);
        $_str_query = "SELECT max(user_id) as user_id FROM $_users_table;";
        $_selection = $this->_dbase->Select($_str_query);
        if(is_null($_selection))
        {
            $this->_dbase->Free();
            return false;
        }
        $_result = $_selection->GetAll();
        $_selection->Free();
        $_last_user_id = $_result[0]['user_id'];

        // Generate the new id
        $_users_count = intval(substr($_last_user_id, strpos($_last_user_id, '-') + 1));
        $_user_id = 'Usr-' . str_pad(($_users_count+1), 4, '0', STR_PAD_LEFT);

        $_result = $_users->InsertValues(array(
            'user_id' => "'$_user_id'",
            'user_name' => "'$_user_name'",
            'user_log' => "'$_user_log'",
            'user_pwd' => "'$_user_pass'",
            'md5_log' => "'$_md5_log'",
            'sha_log' => "'$_sha_log'",
            'md5_pass' => "'$_md5_pass'",
            'sha_pass' => "'$_sha_pass'",
            'signing' => $_signing,
            'active' => 'true',
            'rol_id' => "'$_rol_id'"
        ));

        if(is_null($_result))
        {
            $this->_dbase->Free();
            return false;
        }

        $this->_dbase->Free();
        return true;
    }

    public function ValidateAllowAccess(&$params)
    {
      $_user_log = $params['user'];
      $_user = $params['user'];
      $_subsystem = $params['system'];
      $_system = $params['system'];

      // Clean the name
      Validator::ToCleanSQL($_user_log);
      Validator::ToCleanSQL($_subsystem);

      $_users_table = $this->_security_conn->GetTableName('users');
      $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
      $_subsystems_access_table = $this->_security_conn->GetTableName('subsystems_access');

      // Get the user_id
      $_users = $this->_dbase->GetTable($_users_table);
      $_user_id = $_users->GetValueWhere('user_id', "user_log = '$_user_log' AND active = true");
      if(is_null($_user_id))
      {
           $this->RegisterError('Operación no válida', "El usuario '$_user' no existe.");
           return false;
      }

      // Get the subsystem_id
      $_subsystems = $this->_dbase->GetTable($_subsystems_table);
      $_subsystem_id = $_subsystems->GetValueWhere('subsystem_id', "subsystem = '$_subsystem'");
      if(is_null($_subsystem_id))
      {
           $this->RegisterError('Operación no válida', "El sistema '$_system' no existe.");
           return false;
      }

      // Validate that the user have not access to the subsystem
      $_subsystems_access = $this->_dbase->GetTable($_subsystems_access_table);
      $_count = $_subsystems_access->Contains(array(
          'user_id' => "'$_user_id'",
          'subsystem_id' => "'$_subsystem_id'"
      ));

      if($_count < 0)
           return false;
      if($_count > 0)
      {
           $this->RegisterError('Operación no válida', "El usuario '$_user' ya tiene acceso al sistema '$_system'.");
           return false;
      }

      $params['user'] = $_user_id;
      $params['system'] = $_subsystem_id;

      return true;
    }

    public function AllowAccess(&$params)
    {
      $_user_id = $params['user'];
      $_subsystem_id = $params['system'];

      $_subsystems_access_table = $this->_security_conn->GetTableName('subsystems_access');
      $_subsystems_access = $this->_dbase->GetTable($_subsystems_access_table);

      $_success = $_subsystems_access->InsertValues(array(
          'user_id' => "'$_user_id'",
          'subsystem_id' => "'$_subsystem_id'"
      ));

      if(!$_success)
           return false;
      return true;
    }

    public function ValidateDeniedAccess(&$params)
    {
      $_user_log = $params['user'];
      $_user = $params['user'];
      $_subsystem = $params['system'];
      $_system = $params['system'];

      // Clean the name
      Validator::ToCleanSQL($_user_log);
      Validator::ToCleanSQL($_subsystem);

      $_users_table = $this->_security_conn->GetTableName('users');
      $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
      $_subsystems_access_table = $this->_security_conn->GetTableName('subsystems_access');

      // Get the user_id
      $_users = $this->_dbase->GetTable($_users_table);
      $_user_id = $_users->GetValueWhere('user_id', "user_log = '$_user_log' AND active = true");
      if(is_null($_user_id))
      {
           $this->RegisterError('Operación no válida', "El usuario '$_user' no existe.");
           return false;
      }

      // Get the subsystem_id
      $_subsystems = $this->_dbase->GetTable($_subsystems_table);
      $_subsystem_id = $_subsystems->GetValueWhere('subsystem_id', "subsystem = '$_subsystem'");
      if(is_null($_subsystem_id))
      {
           $this->RegisterError('Operación no válida', "El sistema '$_system' no existe.");
           return false;
      }

      // Validate that the user have not access to the subsystem
      $_subsystems_access = $this->_dbase->GetTable($_subsystems_access_table);
      $_count = $_subsystems_access->Contains(array(
          'user_id' => "'$_user_id'",
          'subsystem_id' => "'$_subsystem_id'"
      ));

      if($_count < 0)
           return false;
      if($_count == 0)
      {
           $this->RegisterError('Operación no válida', "El usuario '$_user' no tiene acceso al sistema '$_system'.");
           return false;
      }

      $params['user'] = $_user_id;
      $params['system'] = $_subsystem_id;

      return true;
    }

    public function DeniedAccess(&$params)
    {
      $_user_id = $params['user'];
      $_subsystem_id = $params['system'];

      $_subsystems_access_table = $this->_security_conn->GetTableName('subsystems_access');
      $_subsystems_access = $this->_dbase->GetTable($_subsystems_access_table);

      $_success = $_subsystems_access->DeleteWhere("user_id = '$_user_id' AND subsystem_id = '$_subsystem_id'");

      if(!$_success)
           return false;

      return true;
    }

    public function ValidateModifyUserData(&$params)
    {
      $_user_log = $params['user_log'];
      $_old_log = $params['old_log'];
      $_old = $params['old_log'];

      // Clean the params
      Validator::ToCleanSQL($_user_log);
      Validator::ToCleanSQL($_old_log);

      // Validate that the old user exists
      $_users_table = $this->_security_conn->GetTableName('users');
      $_users = $this->_dbase->GetTable($_users_table);
      $_count = $_users->Contains(array(
          'user_log' => "'$_old_log'",
          'active' => 'true'
      ));
      if($_count < 0) return false;
      if($_count == 0)
      {
           $this->RegisterError('Operaci�n no v�lida', "El usuario '$_old' no existe.");
           return false;
      }

      if( $params['user_log'] == $params['old_log'] ) return true;

      // Validate that the new user does not exists
      $_count = $_users->Contains(array(
          'user_log' => "'$_user_log'"
      ));
      if($_count < 0) return false;
      if($_count > 0)
      {
           $this->RegisterError('Operaci�n no v�lida', "El usuario '$_user_log' ya existe.");
           return false;
      }

      return true;
    }

    public function ModifyUserData(&$params)
    {
      $_user_log = $params['user_log'];
      $_user_name = $params['user_name'];
      $_old_log = $params['old_log'];
      $_rol = $params['rol'];

      // Clean the params
      Validator::ToCleanSQL($_user_log);
      Validator::ToCleanSQL($_old_log);
      Validator::ToCleanSQL($_user_name);

       // Validate that the old user exists
      $_users_table = $this->_security_conn->GetTableName('users');
      $_users = $this->_dbase->GetTable($_users_table);

      $_md5_log = md5($_user_log . ".." + md5($_user_log));
    $_sha_log = sha1($_user_log . ".." + sha1($_user_log));
      $_user_pass = $_users->GetValueWhere('user_pwd', "user_log = '$_old_log'");
      $_signing = crc32(sha1($_user_log) . $_user_pass);

      $_count = $_users->Update(array(
           'user_log' => "'$_user_log'",
           'user_name' => "'$_user_name'",
           'md5_log' => "'$_md5_log'",
           'sha_log' => "'$_sha_log'",
           'rol_id' => "'$_rol'",
           'signing' => $_signing),
            "user_log = '$_old_log'");

      if($_count <= 0) return false;

      return true;
    }

    public function ValidateChangeUserPassword(&$params)
    {
      $_user_log = $params['user_log'];
      $_log = $params['user_log'];
      $_user_pass = $params['user_pass'];

      if(!Validator::CheckStringSize($_user_pass, 2, 128))
      {
           $this->RegisterError('Operaci�n no v�lida', "La cantidad de caracteres de la contrase�a tiene que estar entre 4 y 128.");
           return false;
      }

      Validator::ToCleanSQL($_user_log);
      $params['user_log'] = $_user_log;

      // Validate that the old user exists
      $_users_table = $this->_security_conn->GetTableName('users');
      $_users = $this->_dbase->GetTable($_users_table);
      $_count = $_users->Contains(array(
          'user_log' => "'$_user_log'",
          'active' => 'true'
      ));
      if($_count < 0) return false;
      if($_count == 0)
      {
           $this->RegisterError('Operaci�n no v�lida', "El usuario '$_log' no existe.");
           return false;
      }

      return true;
    }

    public function ChangeUserPassword(&$params)
    {
      $_user_log = $params['user_log'];
      $_user_pass = $params['user_pass'];

      $_md5_pass = md5($_user_pass . ".." + md5($_user_pass));
    $_sha_pass = sha1($_user_pass . ".." + sha1($_user_pass));

    $_signing = crc32(sha1($_user_log) . md5($_user_pass));

      $_user_pass = md5($_user_pass);

      $_users_table = $this->_security_conn->GetTableName('users');
      $_users = $this->_dbase->GetTable($_users_table);

      $_count = $_users->Update(array(
           'user_pwd' => "'$_user_pass'",
           'md5_pass' => "'$_md5_pass'",
           'sha_pass' => "'$_sha_pass'",
           'signing' => $_signing),
      "user_log = '$_user_log'");

      if($_count <= 0) return false;

      return true;

    }

    public function ValidateDeleteUser(&$params)
    {
      $_user_log = $params['user_log'];
      $_log = $params['user_log'];
      if($_SESSION['USER_LOG'] == $_user_log)
      {
           $this->RegisterError('Operación no válida', "No es posible eliminar el usuario activo.");
           return false;
      }

      // Clean the entry
      Validator::ToCleanSQL($_user_log);
      $params['user_log'] = $_user_log;

      // Validate that the old user exists
      $_users_table = $this->_security_conn->GetTableName('users');
      $_users = $this->_dbase->GetTable($_users_table);
      $_count = $_users->Contains(array(
          'user_log' => "'$_user_log'",
          'active' => 'true'
      ));
      if($_count < 0) return false;
      if($_count == 0)
      {
           $this->RegisterError('Operación no válida', "El usuario '$_log' no existe.");
           return false;
      }

      return true;
    }

    public function DeleteUser(&$params)
    {
      $_user_log = $params['user_log'];
        //print_r($params);die;
        if ($_user_log) {
            $datos=$this->_dbase->GetTable("app_security.users");
            $result = $datos->DeleteWhere("user_log = '$_user_log'");
            return true;
        }
      return true;
    }

    public function ValidateLoadDomain(&$params)
    {
     return true;
    }

    public function LoadDomain(&$params)
    {
    $user = $params['user'];
    $subsistem = $params['subsistem'];

    $sm = SecurityManager::GetInstance();
    $a = $sm->GetUserDomain("$user","$subsistem");

    $arr = array();
    if($a !== false)
        {
            $temp  = explode("'", $a);
            foreach ($temp as $value) {
                if(is_numeric($value))
                    array_push($arr, $value);
            }
        }
    if($a === FALSE)
        $arr = FALSE;

    $result = array('success' => true,'domain'=> $arr);

    return $result;
    }

    public function ValidateSetDToUser(&$params)
    {
     $_valid = Validator::ExistsParams(array('dom','user','subsistem'), $params);
     if(!$_valid)
     {
         $this->RegisterError('Parámetro carente', 'No estan todos los datos necesarioa para definir el dominio');
         return false;
     }
     $dom = $params['dom'];
     $user = $params['user'];
     $subsistem = $params['subsistem'];
     if($dom != 'null')
     {
        $_valid = Validator::ToJSON($dom,true);
        if(!$_valid)
        {
            $this->RegisterError('Parámetro incorrecto','El dominio no es válido');
            return false;
        }
        $params['dom'] = $dom;
     }

     $user = trim($user);
     Validator::ToCleanSQL($user);
     $params['user'] = $user;

     $subsistem = trim($subsistem);
     Validator::ToCleanSQL($subsistem);
     $params['subsistem'] = $subsistem;

     return true;
    }

    public function SetDToUser(&$params)
    {
     $dom = $params['dom'];
     $user = $params['user'];
     $subsistem = $params['subsistem'];
     $_str_where = "";

    //         if($dom != 'null')
    //         {
        for ($i = 0; $i < count($dom); $i++)
        {
            $str = $dom[$i]['cod'];
            if($i == 0)
               $_str_where .= "provincia_cod = '$str'";
            else
               $_str_where .= " OR  provincia_cod = '$str'";
        }
    //         }
     $sm = SecurityManager::GetInstance();
     $sm->SetDomainToUser("$user","$_str_where", $subsistem);
     return true;
    }

    public function ValidateCheckConfig(&$params)
    {
     return true;
    }

    public function CheckConfig(&$params)
    {
     $_dbase = ConnectionsManager::GetCommonDatabase('triade');
    if( ErrorManager::ExistsErrors() )
    {
        $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
        return false;
    }
    //        Obtengo la tabla configuracion
    $tabla = $_dbase->GetTable('utiles.configuracion');
    //        cuanto las filas que tiene la tabla
    $count = $tabla->GetRowsCount();

    $result = array('success' => true, 'cant' => $count);

    return $result;
    }

    public function ValidateLoadRols()
    {
    return true;
    }

    public function LoadRols()
    {
    $_result = false;

    $_rols_table = $this->_security_conn->GetTableName('rols');
    $_selection = $this->_dbase->Select("SELECT rol_id, rol_name FROM $_rols_table;");
    if(is_null($_selection))
        return false;
    $_data = $_selection->GetAll();

    if(!is_null($_data))
        $_result = array('success' => true, 'rows' => $_data);

    return $_result;
    }

    public function ValidateImportarUsuariosLdap($params)
    {
        return true;
    }

    public function ImportarUsuariosLdap($params){

        $conf = simplexml_load_file('../../App/Config/configuracion.xml');
        $ds = ldap_connect('ldap://'.$conf->ldap_ip);
        ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
        $r = @ldap_bind($ds, $params['usuario'].'@'.$conf->dominio,$params['pass']);
        if($r != 1){
            ldap_close($ds);
            return false;
        }else
        {
            $atributos = array("mail", "userprincipalname","displayname","name","samaccountname","objectcategory","distinguishedname","objectclass");
            $sr = @ldap_search($ds, "$conf->cn_usuario", "displayname=*",$atributos);
            $a = @ldap_get_entries($ds, $sr);
            $personas = array();
            foreach($a as $usuario){
                if(is_array($usuario) && !isset($usuario['objectclass'][4])){
                    $persona['usuario'] = $usuario['samaccountname'][0];
                    $persona['nombre_completo'] = ($usuario['displayname'][0]);
                    $personas[] = $persona;
                }
            }
            ldap_close($ds);
//                        print_r($personas);die;
        }

        $_str_query = "SELECT * FROM app_security.users WHERE active = 't' ORDER BY user_name";

        $_selection = $this->_dbase->Select($_str_query);
        if(is_null($_selection))
        {
            $this->_dbase->Rollback();
            return false;
        }

        $_data = $_selection->GetAll();
        $reales = $this->convert_assoc_array($_data, 'user_log', 'user_name');
        $_table = $this->_dbase->GetTable('app_security.users');
        foreach($personas as $persona){

            // Insertion
            $_user_log = $persona['usuario'];
            $_user_pass = $persona['usuario'] . 'a';

            $_md5_log = md5($_user_log . ".." + md5($_user_log));
            $_sha_log = sha1($_user_log . ".." + sha1($_user_log));

            $_md5_pass = md5($_user_pass . ".." + md5($_user_pass));
            $_sha_pass = sha1($_user_pass . ".." + sha1($_user_pass));

            $_signing = crc32(sha1($_user_log) . md5($_user_pass));

            $_user_pass = md5($_user_pass);

            if(isset($reales[$persona['usuario']])){
                $_table->Update(array('user_name'=>"'".$persona['nombre_completo']."'"), "user_log = '".$persona['usuario']."'");
            }
            else{
                $_table->InsertValues(array('user_name'=>"'".$persona['nombre_completo']."'",
                                            'user_log'=>"'".$persona['usuario']."'",
                                            'user_pwd'=>"'".$_user_pass."'",
                                            'md5_log'=>"'".$_md5_log."'",
                                            'sha_log'=>"'".$_sha_log."'",
                                            'md5_pass'=>"'".$_md5_pass."'",
                                            'sha_pass'=>"'".$_sha_pass."'",
                                            'signing'=>"'".$_signing."'"
                ));
            }
        }


        return true;
    }

    public function Validatetrabajadores(&$params)
    {

        return true;
    }

    public function trabajadores(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateunir(&$params){return true;}
    public function unir(&$params){
        $user_id=$params['user_id'];
        $idtrabajador=$params['idtrabajador'];

        $datos=$this->_dbase->GetTable("app_security.users");
        return $data=$datos->Update(array( 'trabajador_id' => "'$idtrabajador'"),"user_id='$user_id'");

    }

    public function Validatefoto(){return true;}
    public function foto(&$params){
       // print_r($_FILES);
        $imagen = base64_encode(file_get_contents($_FILES['fileup']['tmp_name']));
        $id=$params['id'];
        $datos = $this->_dbase->GetTable("plantilla.trabajador");
        $data = $datos->Update(array('foto'=>"'$imagen'"),"id='$id'");
        if ($data)
            return true;
        else
            return false;

    }
}
?>
