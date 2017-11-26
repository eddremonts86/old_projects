<?PHP

class RolsManager extends Module
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
     
     public function ValidateLoadRols(&$params)
     {
          return true;
     }
     
     public function LoadRols(&$params)
     {
          $_data = array();
          $_count = 0;

          $_start = ($params['start']) ? $params['start'] : 0;
          $_limit = $params['limit'];
          
          if(!Validator::ToInt($_start)) return false;
          if(!Validator::ToInt($_limit)) return false;
          
          $_rols_table = $this->_security_conn->GetTableName('rols');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystems_rols_table = $this->_security_conn->GetTableName('subsystems_rols');

          /// Get data
          // Get each user
          $_selection = $this->_dbase->Select("SELECT rol_id, rol_name, rol_description FROM $_rols_table ORDER BY rol_name", $_limit, $_start);
          if(is_null($_selection))
               return false;
          
          // Iterate for each user to get the subsystems that can access
          $_iterator = $_selection->GetIterator();
          $_iterator->Reset();
          while($_iterator->Next())
          {
               // Get the current user
               $_row = $_iterator->GetCurrent();
               $_rol_id = $_row['rol_id'];
               // Get the values of the question
               $_sub_selection = $this->_dbase->Select("SELECT subsystem, CASE WHEN rol_id IS NULL THEN 'denied' ELSE 'allowed' END as rol_access
                                                       FROM $_subsystems_table
                                                       LEFT JOIN (SELECT * FROM $_subsystems_rols_table
                                                       LEFT JOIN $_rols_table USING (rol_id) WHERE rol_id = '$_rol_id' ) as admin_data USING (subsystem_id)");
               if(is_null($_sub_selection))
                    return false;
               // Put the values according to Ext
               $_subsystems = $_sub_selection->GetAll();
               // Push the result into the array
               array_push($_data, array('rol_id' => $_row['rol_id'], 'rol_name' => $_row['rol_name'], 'rol_description' => $_row['rol_description'], 'subsystems' => $_subsystems));
               
               $_count++;
          }

          $result = array('success' => true, 'results' => $_count, 'rows' => $_data);

          return $result;
     }
     
     public function ValidateCreateRol(&$params)
     {
          $_log = $params['rol_name'];
         /* $_user_name = $params['user_name'];
          $_user_log = $params['user_log'];*/

          if(!Validator::CheckStringSize($_log, 4, 64))
          {
               $this->RegisterError('Operaci�n no v�lida', "La cantidad de caracteres del identificador del usuario tiene que estar entre 4 y 64.");
               return false;
          }

          /*if(!Validator::CheckStringSize($_user_name, -1, 128))
          {
               $this->RegisterError('Operaci�n no v�lida', "La cantidad de caracteres del nombre del usuario no puede exceder los 128.");
               return false;
          }*/

          Validator::ToCleanSQL($_log);

          $_rols_table = $this->_security_conn->GetTableName('rols');
          $_rols = $this->_dbase->GetTable($_rols_table);
          $count = $_rols->Contains(array('rol_name' => "'$_log'"));

          // If the result is less than 0, an error success
          if($count < 0)
               return false;
          // If the count is bigger than 0, then exists
          elseif ($count > 0)
          {
               $this->RegisterError('Operaci�n no v�lida', "El Rols '$_log' ya fue registrado.");
               return false;
          }

          $params['rol_name'] = $_log;
          return true;
          
     }
     
     public function CreateRol(&$params)
    {
        // Get parameters
		$_rol_name = $params['rol_name'];
		$_rol_description = $params['rol_description'];

        $_rols_table = $this->_security_conn->GetTableName('rols');
        $_rols = $this->_dbase->GetTable($_rols_table);

        // Get the last id of users
        $_str_query = "SELECT max(rol_id) as rol_id FROM $_rols_table;";
        $_selection = $this->_dbase->Select($_str_query);
        if(is_null($_selection))
        {
            $this->_dbase->Free();
            return false;
        }
        $_result = $_selection->GetAll();
        $_selection->Free();
        $_last_rol_id = $_result[0]['rol_id'];

        // Generate the new id
        $_rols_count = intval(substr($_last_rol_id, strpos($_last_rol_id, '-') + 1));
        $_rol_id = 'Rol-' . str_pad(($_rols_count+1), 4, '0', STR_PAD_LEFT);

        $_result = $_rols->InsertValues(array(
            'rol_id' => "'$_rol_id'",
            'rol_name' => "'$_rol_name'",
            'rol_description' => "'$_rol_description'"
        ));

        if(is_null($_result))
        {
            $this->_dbase->Free();
            return false;
        }

        $this->_dbase->Free();
        return true;

        /*$_result = $this->_dbase->ExecuteFunction('app_security.add_rol', "'$_rol_name'", "'$_rol_descripcion'");

        return !is_null($_result);*/
	}

     public function ValidateAllowAccess(&$params)
    {
        $_rol_name = $params['rol'];
        $_rol = $params['rol'];
        $_subsystem = $params['system'];
        $_system = $params['system'];

        // Clean the name
        Validator::ToCleanSQL($_rol_name);
        Validator::ToCleanSQL($_subsystem);

        $_rols_table = $this->_security_conn->GetTableName('rols');
        $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
        $_subsystems_rols_table = $this->_security_conn->GetTableName('subsystems_rols');

        // Get the rol_id
        $_rols = $this->_dbase->GetTable($_rols_table);
//          $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name' AND active = true");
        $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name'");
        if(is_null($_rol_id))
        {
            $this->RegisterError('Operación no válida', "El rol '$_rol' no existe.");
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

        // Validate that the rol have not access to the subsystem
        $_subsystems_rols = $this->_dbase->GetTable($_subsystems_rols_table);
        $_count = $_subsystems_rols->Contains(array(
            'rol_id' => "'$_rol_id'",
            'subsystem_id' => "'$_subsystem_id'"
        ));

        if($_count < 0)
            return false;
        if($_count > 0)
        {
            $this->RegisterError('Operación no válida', "El rol '$_rol' ya tiene acceso al sistema '$_system'.");
            return false;
        }

        $params['rol'] = $_rol_id;
        $params['system'] = $_subsystem_id;

        return true;
    }

    public function AllowAccess(&$params)
    {
        $_rol_id = $params['rol'];
        $_subsystem_id = $params['system'];

        $_subsystems_rols_table = $this->_security_conn->GetTableName('subsystems_rols');
        $_subsystems_rols = $this->_dbase->GetTable($_subsystems_rols_table);

        $_success = $_subsystems_rols->InsertValues(array(
            'rol_id' => "'$_rol_id'",
            'subsystem_id' => "'$_subsystem_id'"
        ));

        if(!$_success)
            return false;
        return true;
    }
     
     public function ValidateDeniedAccess(&$params)
     {
          $_rol_name = $params['rol'];
          $_rol = $params['rol'];
          $_subsystem = $params['system'];
          $_system = $params['system'];
          
          // Clean the name
          Validator::ToCleanSQL($_rol_name);
          Validator::ToCleanSQL($_subsystem);
          
          $_rols_table = $this->_security_conn->GetTableName('rols');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystems_rols_table = $this->_security_conn->GetTableName('subsystems_rols');
          
          // Get the user_id
          $_rols = $this->_dbase->GetTable($_rols_table);
//          $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name' AND active = true");
          $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name'");
          if(is_null($_rol_id))
          {
               $this->RegisterError('Operación no válida', "El rol '$_rol' no existe.");
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
          $_subsystems_rols = $this->_dbase->GetTable($_subsystems_rols_table);
          $_count = $_subsystems_rols->Contains(array(
              'rol_id' => "'$_rol_id'",
              'subsystem_id' => "'$_subsystem_id'"
          ));
          
          if($_count < 0)
               return false;
          if($_count == 0)
          {
               $this->RegisterError('Operación no válida', "El rol '$_rol' no tiene acceso al sistema '$_system'.");
               return false;
          }
          
          $params['rol'] = $_rol_id;
          $params['system'] = $_subsystem_id;
          
          return true;
     }
     
     public function DeniedAccess(&$params)
     {
          $_rol_id = $params['rol'];
          $_subsystem_id = $params['system'];
          
          $_subsystems_rols_table = $this->_security_conn->GetTableName('subsystems_rols');
          $_subsystems_rols = $this->_dbase->GetTable($_subsystems_rols_table);
          
          $_success = $_subsystems_rols->DeleteWhere("rol_id = '$_rol_id' AND subsystem_id = '$_subsystem_id'");
          
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
          
          if($_SESSION['USER_LOG'] == $_user_log || $_user_log == $_log)
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

          $this->_dbase->BeginTransaction();

          $_users_table = $this->_security_conn->GetTableName('users');
          
          $_users_domain = $this->_security_conn->GetTableName('users_domain');
          $_domain = $this->_dbase->GetTable($_users_domain);
          $_count = $_domain->DeleteWhere("user_id = (SELECT user_id FROM $_users_table WHERE user_log = '$_user_log')");
          if($_count < 0) 
          {
               $this->_dbase->Rollback();
               return false;
          }
          
          $_users_access = $this->_security_conn->GetTableName('users_access');
          $_access = $this->_dbase->GetTable($_users_access);
          $_count = $_access->DeleteWhere("user_id = (SELECT user_id FROM $_users_table WHERE user_log = '$_user_log')");
          if($_count < 0) 
          {
               $this->_dbase->Rollback();
               return false;
          }
          
          $_md5_user = md5($_user_log . date('Ymd:His') . session_id());
          $_users = $this->_dbase->GetTable($_users_table);
          
          $_count = $_users->Update(array(
              'user_name' => "user_name || ' (' || user_log || ') '",
              'user_log' => "'$_md5_user'",
              'user_pwd' => "'000000000000000000000000'",
              'md5_log' => "'000000000000000000000000'",
              'sha_log' => "'000000000000000000000000'",
              'md5_log' => "'000000000000000000000000'",
              'md5_pass' => "'000000000000000000000000'",
              'sha_pass' => "'000000000000000000000000'",
              'signing' => "'000000000000000000000000'",
              'active' => 'false'
          ), "user_log = '$_user_log'");

          if($_count <= 0) 
          {
               $this->_dbase->Rollback();
               return false;
          }
          
          $this->_dbase->Commit();

          return true;
     }

     public function ValidateLoadProv(&$params)
     {
         return true;
     }
     public function LoadProv(&$params)
     {
        $_dbase = ConnectionsManager::GetCommonDatabase('triade');
        if( ErrorManager::ExistsErrors() )
        {
            $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
            return false;
        }
//        Obtengo la tabla configuracion
        $tabla = $_dbase->GetTable('utiles.configuracion');
        $terr = $tabla->GetFirstValue('territorio');

        $tabla = $_dbase->GetTable('nomencladores.get_provincias');
        if($terr != 'n')
            $data = $tabla->GetAll("prefijo ='$terr'");
        else
            $data = $tabla->GetAll();
        
        $result = array('success' => true, 'provincias' => $data);
        
        return $result;
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

    public function ValidateLoadUsers(&$params)
    {
        return true;
    }
    public function LoadUsers(&$params)
    {
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $rol_id = $params['rol_id'];
        if(!Validator::ToInt($_start)) return false;
        if(!Validator::ToInt($_limit)) return false;
        /// Get data
        $sql = "SELECT user_name,
                       user_id,
                       user_log,
                       rol_name,
                       CASE
                       WHEN users.rol_id = '$rol_id' THEN 'true'::text
                       ELSE 'false'::text
                       END AS activo
                FROM
                       app_security.users
                       inner join app_security.rols USING(rol_id)
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


    public function ValidateAdd(&$params){
        return true;
    }
    public function Add(&$params){
        $data = json_decode($params['data']);
        $rol_id = $params['rol_id'];
        $datos=$this->_dbase->GetTable("app_security.users");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->user_id;
            $activo = $data[$i]->activo;

            if(isset($id) && $activo == 'true'){
                $datos->Update(array('rol_id' => "'$rol_id'"),"user_id = '$id'");
            }
            if (isset($id) && $activo == ''){
                $datos->Update(array('rol_id' => "'Rol-0005'"),"user_id = '$id'");
            }
        }
        return true;
    }

    public function ValidateModid(&$params){
        return true;
    }
    public function Modid(&$params){
        $rol_description=$params['rol_description'];
        $rol_name=$params['rol_name'];
        $id=$params['id'];
        if ($id != 'Rol-0005') {
        $datos=$this->_dbase->GetTable("app_security.rols");
        $datos->Update(array('rol_description' => "'$rol_description'",'rol_name' => "'$rol_name'"),"rol_id = '$id'");
        return true;
        }
        else return false;
    }

    public function ValidateEliminar(&$params) {
               return true;
    }
    public function Eliminar(&$params) {
        $id = $params['rol_id'];
        $result=null;
        $result1=null;
        if ($id != 'Rol-0005') {
            $user=$this->_dbase->GetTable("app_security.users");
            $user->Update(array('rol_id' => "'Rol-0005'"),"rol_id = '$id'");

            $rol=$this->_dbase->GetTable("app_security.rols");
            $rol->DeleteWhere("rol_id = '$id'");
            return true;
        }
        else return false;
    }


}
?>
