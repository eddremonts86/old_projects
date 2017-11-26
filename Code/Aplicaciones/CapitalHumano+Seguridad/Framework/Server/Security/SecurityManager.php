<?php
require_once(realpath(dirname(__FILE__)) . '../../../../App/Server/ConfigReader.php');

/*
 * SecurityManager : Class that define the object responsible of the security of the application. 
 *     It manage:
 *        - The user logging
 *        - The user access
 *        - The user domain
 *        - The session variables for security
 */
final class SecurityManager
{
	private $_security_conn;
	private $_error;
     private static $_instance = 0;
     private $_dbase;

	private function  __construct()
	{
		$this->_security_conn = SecurityConnections::GetInstance();
        $this->_error = '';
          $this->_dbase = ConnectionsManager::GetSecurityDatabase();
	}
     
     public static function GetInstance()
     {

          if(self::$_instance === 0)
               self::$_instance = new SecurityManager();

          return self::$_instance;
     }
     
     public function GetConnection()
     {
          return $this->_dbase;
     }
     
     public function FreeConnection()
     {
          $this->_dbase->Free();
     }

	private function RegisterError($Error)
	{
		$this->_error = $Error;
	}
	
	public function GetError()
	{
		return $this->_error;
	}
	
	/** Security initialization and cleanning **/
	public function InitSecurity()
	{   //return false;die;
		$_subsystem_table = $this->_security_conn->GetTableName('subsystems');
		$_modules_table = $this->_security_conn->GetTableName('modules');
		$_functions_table = $this->_security_conn->GetTableName('functions');
          
		$_subsystems = $this->_dbase->GetTable($_subsystem_table);
		$_modules = $this->_dbase->GetTable($_modules_table);
		$_functions = $this->_dbase->GetTable($_functions_table);

		// Begin the transaction for fill the tables
		$this->_dbase->BeginTransaction();

		// Subsystems
		//--------------------
		$_config_reader = ConfigReader::GetInstance();
		$_config_reader->ReadFullConfig();

		$_subsys = $_config_reader->GetSubsystems();

		$_mod_index = 1;
		$_fn_index = 1;

		// Iterate for each subsystem
		for($i = 0; $i < count($_subsys); $i++)
		{
			// Build the id of the subsystem
			$_subsys_id = 'Sub-' . str_pad(strval($i + 1), 4, '0', STR_PAD_LEFT);
			// Get the name of the subsystem
			$_subsys_name = $_subsys[$i];

			// Insert the subsystem into the database
			$_result = $_subsystems->Insert("'$_subsys_id'","'$_subsys_name'");
			if(ErrorManager::ExistsErrors())
				break;

			// Iterate for each module and insert it
			$_mods = $_config_reader->GetModulesOf($_subsys_name);
			for($j = 0; $j < count($_mods); $j++)
			{
				// Build the id of the module
				$_mod_id = 'Mod-' . str_pad(($_mod_index++), 4, '0', STR_PAD_LEFT);
				// Get the name of the module
				$_mod_name = $_mods[$j];
				// Get all the configuration of the module
				$_module_config = $_config_reader->ConfigOfModule($_subsys_name, $_mod_name);

				//Insert the module
				$_result = $_modules->Insert("'$_mod_id'", "'$_mod_name'", "'". $_module_config['desc'] ."'", "'$_subsys_id'");
//				$_result = $_modules->Insert("'$_mod_id'", "'$_mod_name'", "'". $_module_config['desc'] ."'", "'"$_subsys_id"'",);
				if(ErrorManager::ExistsErrors())
					break;
				
				// Insert the default functionality of the module (view)
				// ----------------------------
				// Build the id of the function
				$_fn_id = 'Fn-' . str_pad(($_fn_index++), 5, '0', STR_PAD_LEFT);
                    // Get the source of the module
                    $_source = $_module_config['js'];
                    $_module_source = implode(',', $_source);

				$_result = $_functions->Insert("'$_fn_id'", "'main'", "'$_module_source'", "'Default functionality of the module (show)'", "'$_mod_id'");
//				$_result = $_functions->Insert("'$_fn_id'", "'$_mod_id'", "'main'", "'$_module_source'", "'Default functionality of the module (show)'");
				if(ErrorManager::ExistsErrors())
					break;

				// Iterate for each function and insert it
				$_fns = $_config_reader->GetFunctionsOf($_subsys_name, $_mod_name);
                for($k = 0; $k < count($_fns); $k++)
				{
					// Build the id of the function
					$_fn_id = 'Fn-' . str_pad(($_fn_index++), 5, '0', STR_PAD_LEFT);
					// Get the name of the function
					$_fn_name = $_fns[$k];
					// Get the description of the function
					$_fn_desc = $_module_config['functions'][$_fn_name]['desc'];
                         // Get the source of the function
					$_source = $_module_config['functions'][$_fn_name]['source'];
                         $_fn_source = implode(',', $_source);



					$_result = $_functions->Insert("'$_fn_id'", "'$_fn_name'", "'$_fn_source'", "'$_fn_desc'", "'$_mod_id'");
//					$_result = $_functions->Insert("'$_fn_id'", "'$_mod_id'", "'$_fn_name'", "'$_fn_source'", "'$_fn_desc'");
					if(ErrorManager::ExistsErrors())
						break;
				}
				if(ErrorManager::ExistsErrors())
					break;
			}
			if(ErrorManager::ExistsErrors())
				break;
		}

		// Commit or abort the transaction
		if(ErrorManager::ExistsErrors())
		{
			$this->_dbase->RollBack();
		    return false;
        }
		else{
			$this->_dbase->Commit();
	        return true;
        }
    }
	public function UpdateSecurity()
	{
		$_subsystem_table = $this->_security_conn->GetTableName('subsystems');
		$_modules_table = $this->_security_conn->GetTableName('modules');
		$_functions_table = $this->_security_conn->GetTableName('functions');

		$_subsystems = $this->_dbase->GetTable($_subsystem_table);
		$_modules = $this->_dbase->GetTable($_modules_table);
		$_functions = $this->_dbase->GetTable($_functions_table);

		// Begin the transaction for fill the tables
		$this->_dbase->BeginTransaction();

		// Subsystems
		//--------------------
		$_config_reader = ConfigReader::GetInstance();
		$_config_reader->ReadFullConfig();
		$_subsys = $_config_reader->GetSubsystems();

		$_mod_index = 1;
		$_fn_index = 1;

		// Iterate for each subsystem
		for($i = 0; $i < count($_subsys); $i++)
		{
			// Build the id of the subsystem
			$_subsys_id = 'Sub-' . str_pad(strval($i + 1), 4, '0', STR_PAD_LEFT);
			// Get the name of the subsystem
			$_subsys_name = $_subsys[$i];
			// Insert the subsystem into the database
            $comp=$_subsystems->GetFirstValue('subsystem',"subsystem = '$_subsys_name'");
            if(!$comp){
                $comp=$_subsystems->GetLastValue('subsystem_id');
                $ee = explode('-',$comp);
                $comp_id=$ee[0]."-000".(intval($ee[1])+1);
               // print_r($comp_id);
                $_result = $_subsystems->Insert( "'$comp_id'","'$_subsys_name'");
            }
			if(ErrorManager::ExistsErrors())break;
			// Iterate for each module and insert it
			$_mods = $_config_reader->GetModulesOf($_subsys_name);
			for($j = 0; $j < count($_mods); $j++)
			{
				// Build the id of the module
				$_mod_id = 'Mod-' . str_pad(($_mod_index++), 4, '0', STR_PAD_LEFT);
				// Get the name of the module
				$_mod_name = $_mods[$j];
				// Get all the configuration of the module
				$_module_config = $_config_reader->ConfigOfModule($_subsys_name, $_mod_name);

				//Insert the module
                $comp=$_modules->GetFirstValue('subsystem_id',"module = '$_mod_name' and subsystem_id = '$_subsys_id'");
                if(!$comp){
                    $comp=$_modules->GetLastValue('module_id');
                    $ee = explode('-',$comp);
                    $comp_id=$ee[0]."-0".(intval($ee[1])+1);
                    //print_r($comp_id);
                 $_result = $_modules->Insert("'$comp_id'", "'$_mod_name'", "'". $_module_config['desc'] ."'", "'$_subsys_id'");
//				$_result = $_modules->Insert("'$_mod_id'", "'$_mod_name'", "'". $_module_config['desc'] ."'", "'"$_subsys_id"'",);
                }
                    if(ErrorManager::ExistsErrors())
					break;

				// Insert the default functionality of the module (view)
				// ----------------------------
				// Build the id of the function
				$_fn_id = 'Fn-' . str_pad(($_fn_index++), 5, '0', STR_PAD_LEFT);
                    // Get the source of the module
                    $_source = $_module_config['js'];
                    $_module_source = implode(',', $_source);
                $comp=$_functions->GetFirstValue('source',"source = '$_module_source' and module_id = '$_mod_id'");
                //print_r($comp);die;
                if(!$comp){
                    $comp=$_functions->GetLastValue('function_id');
                    $ee = explode('-',$comp);
                    $comp_id=$ee[0]."-0".(intval($ee[1])+1);
                  //  print_r($comp_id);
				$_result = $_functions->Insert("'$comp_id'", "'main'", "'$_module_source'", "'Default functionality of the module (show)'", "'$_mod_id'");
//				$_result = $_functions->Insert("'$_fn_id'", "'$_mod_id'", "'main'", "'$_module_source'", "'Default functionality of the module (show)'");
                }
                if(ErrorManager::ExistsErrors())
					break;

				// Iterate for each function and insert it
				$_fns = $_config_reader->GetFunctionsOf($_subsys_name, $_mod_name);
                for($k = 0; $k < count($_fns); $k++)
				{
					// Build the id of the function
					$_fn_id = 'Fn-' . str_pad(($_fn_index++), 5, '0', STR_PAD_LEFT);
					// Get the name of the function
					$_fn_name = $_fns[$k];
					// Get the description of the function
					$_fn_desc = $_module_config['functions'][$_fn_name]['desc'];
                         // Get the source of the function
					$_source = $_module_config['functions'][$_fn_name]['source'];
                    $_fn_source = implode(',', $_source);
                    $comp_mod=$_functions->GetFirstValue('module_id',"source = '$_fn_source' and description='$_fn_desc' and function_name='$_fn_name' and module_id = '$_mod_id'");
                    //print_r($comp);die;
                    if(!$comp){
                    $comp=$_functions->GetLastValue('function_id');
                    $ee = explode('-',$comp);
                        $comp_id=$ee[0]."-0".(intval($ee[1])+1);
                      //  print_r($comp_id);
					$_result = $_functions->Insert("'$comp_id'", "'$_fn_name'", "'$_fn_source'", "'$_fn_desc'", "'$comp_mod'");
//					$_result = $_functions->Insert("'$_fn_id'", "'$_mod_id'", "'$_fn_name'", "'$_fn_source'", "'$_fn_desc'");
                    }
					if(ErrorManager::ExistsErrors())
						break;
				}
				if(ErrorManager::ExistsErrors())
					break;
			}
			if(ErrorManager::ExistsErrors())
				break;
		}
		// Commit or abort the transaction
		if(ErrorManager::ExistsErrors())
		{
			$this->_dbase->RollBack();
            return false;
		}
		else {
            $this->_dbase->Commit();
            return true;
        }
	}
	public function CleanSecurity()
	{
		$this->_dbase = ConnectionsManager::GetSecurityDatabase();
          // Begin the transaction for fill the tables
          $this->_dbase->BeginTransaction();
          $_users_table = $this->_security_conn->GetTableName('users');
          $_users = $this->_dbase->GetTable($_users_table);
          $_users->Clean();

          /*$_rols_table = $this->_security_conn->GetTableName('rols');
          $_rols = $this->_dbase->GetTable($_rols_table);
          $_rols->Clean();*/

          $_subsystem_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystems = $this->_dbase->GetTable($_subsystem_table);
          $_subsystems->Clean();

          // Commit or abort the transaction
        if(ErrorManager::ExistsErrors())
        {
            $this->_dbase->RollBack();
            return false;
        }
        else{
            $this->_dbase->Commit();
            return true;
        }
	}
	/** End of user managment **/

	public function LogUser($UserLog, $UserPass, $Subsystem)
	{
		// TODO: Implement the user logging
		$_users_table = $this->_security_conn->GetTableName('users');

		$_user_log = $UserLog;
		$_user_pass = $UserPass;
		$_subsystem = $Subsystem;
          
        LogsManager::GetInstance()->RegisterUserAccess($UserLog, $Subsystem);

        $conf = simplexml_load_file('../../App/Config/configuracion.xml');
        $ds = ldap_connect('ldap://'.$conf->ldap_ip);

        ldap_set_option($ds, LDAP_OPT_PROTOCOL_VERSION, 3);
        $r = @ldap_bind($ds, $UserLog.'@'.$conf->dominio, $UserPass);
        @ldap_close($ds);

        if($UserPass == ''){
            session_destroy();
            header("Location:".$_SERVER['HTTP_REFERER']);
        }

        $_users = $this->_dbase->GetTable($_users_table);
        if($r == 1)
        {
            $_user_id = $_users->GetValueWhere('user_id', "user_log = '$_user_log' and active = true");
        }
        else
        {
            // Security fields
            $_md5_log = md5($_user_log . ".." + md5($_user_log));
            $_sha_log = sha1($_user_log . ".." + sha1($_user_log));

            $_md5_pass = md5($_user_pass . ".." + md5($_user_pass));
            $_sha_pass = sha1($_user_pass . ".." + sha1($_user_pass));

            $_signing = crc32(sha1($_user_log) . md5($_user_pass));


            // Verify that the crypted user have the crypted password
            $_result = $_users->Contains(array(
                'md5_log' => "'$_md5_log'",
                'sha_log' => "'$_sha_log'",
                'md5_pass' => "'$_md5_pass'",
                'sha_pass' => "'$_sha_pass'",
                'signing' => "'$_signing'"
            ));

            if($_result == -1)
            {
                   $this->RegisterError('Error de autenticaci&oacute;n 2');
                return false;
            }
            elseif($_result == 0)
            {
                $this->RegisterError('Acceso denegado 1');
                return false;
            }

            // Now I know that the user with the passwor may exists in the table
            // Clean the user log of sql inyection
            Validator::ToCleanSQL($_user_log);
		
            $_pass = md5($_user_pass);
            $_result = $_users->Contains(array(
                'user_log' => "'$_user_log'",
                'user_pwd' => "'$_pass'"
            ));
            if($_result < 0)
            {
                $this->RegisterError('Error de autenticaci&oacute;n 3');
                return false;
            }
            elseif($_result == 0)
            {
                $this->RegisterError('Acceso denegado 2');
                return false;
            }
            $_user_id = $_users->GetValueWhere('user_id', "user_log = '$_user_log' AND user_pwd = '$_pass' and active = true");
        }
		// Get the user_id and user_name

		$_user_name = $_users->GetValueWhere('user_name', "user_id = '$_user_id'");
        $rol_id = $_users->GetValueWhere('rol_id', "user_id = '$_user_id'");
        $md5_pass = $_users->GetValueWhere('user_pwd', "user_id = '$_user_id'");
        $user_log = $_users->GetValueWhere('user_log', "user_id = '$_user_id'");
        $trabajador_id = $_users->GetValueWhere('trabajador_id', "user_id = '$_user_id'");
        $trabajo =$this->_dbase->GetTable('plantilla.trabajador');
        $foto= $trabajo->GetValueWhere('foto', "id = '$trabajador_id'");
        $cargoBD =$this->_dbase->GetTable('vistas_resumen.plantilla');
        $cargo= $cargoBD->GetValueWhere('cargo', "trabajadorid = '$trabajador_id'");

        //var_dump($user_log);die;
		// Validate the existence of the subsystem
		// Clean the subsystem parameter of SQL inyection
		Validator::ToCleanSQL($_subsystem);
		
		$_subsystems_table = $this->_security_conn->GetTableName('subsystems');
		$_subsystems = $this->_dbase->GetTable($_subsystems_table);
		$_result = $_subsystems->Contains(array(
			'subsystem' => "'$_subsystem'"
		));

        if($_result < 0)
		{
			$this->RegisterError('Error de autenticaci&oacute;n 4');
			return false;
		}
		elseif($_result == 0)
		{
			$this->RegisterError('Acceso denegado 3');
			return false;
		}
		// Get the subsystem_id
		$_subsystem_id = $_subsystems->GetValueWhere('subsystem_id', "subsystem = '$_subsystem'");


        $_result = array(
			'user_id' => $_user_id,
			'user_name' => $_user_name,
			'user_log' => $_user_log,
			'subsystem_id' => $_subsystem_id,
			'subsystem' => $_subsystem,
            'rol_id'=>$rol_id,
            'psw'=>$md5_pass,
            'foto'=>$foto,
            'cargo'=>$cargo,
		);

		return $_result;
	}
     
     public function SwapSubsystem($Subsystem)
     {
          $_user_id = $_SESSION['CUI_CDA'];
          $_subsystem = $Subsystem;
          Validator::ToCleanSQL($_subsystem);
          
          $_subsystems_access_table = $this->_security_conn->GetTableName('subsystems_access');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          
          $_user_id = $_SESSION['CUI_CDA'];
          
          $_selection = $this->_dbase->Select("SELECT $_subsystems_access_table.subsystem_id
                    FROM $_subsystems_access_table 
                    INNER JOIN $_subsystems_table ON ($_subsystems_access_table.subsystem_id = $_subsystems_table.subsystem_id)
                    WHERE user_id = '$_user_id' AND subsystem = '$_subsystem'");

          if(is_null($_selection))
               return false;
          
          $_result = $_selection->GetAll();
          $_subsystem_id = $_result[0]['subsystem_id'];

          $_selection->Free();

          $_SESSION['CUS_CDA'] = $Subsystem;
          $_SESSION['CSI_CDA'] = $_subsystem_id;

         $_security_manager = SecurityManager::GetInstance();
         $_domain = $_security_manager->GetDomain($_user_id, $_subsystem_id);
         $_SESSION['DOMAIN_CDA'] = $_domain;

          $_logs_manager = LogsManager::GetInstance();
          $_logs_manager->RegisterUserAccess($_SESSION['USER_LOG_CDA'], $Subsystem);

          return true;
     }

	public function GetCurrentUserAcess()
	{
		$_data = array();

		$_user_id = $_SESSION['CUI'];
		$_subsystem_id = $_SESSION['CSI'];
          
         /* $_users_access_table = $this->_security_conn->GetTableName('users_access');
          $_functions_table = $this->_security_conn->GetTableName('functions');
          $_modules_table = $this->_security_conn->GetTableName('modules');*/

		// Get data
		/*$_str_query = "SELECT module, function_name, source
                         FROM (
                                   SELECT * 
                                   FROM $_users_access_table  
                                   WHERE user_id = '$_user_id' AND subsystem_id = '$_subsystem_id'
                         ) as users_access
                         LEFT JOIN $_functions_table USING (function_id)
                         LEFT JOIN $_modules_table USING (module_id)
                         ORDER BY function_id";*/

        $_str_query = "SELECT module, function_name, source FROM (
                        SELECT rol_id FROM app_security.users WHERE user_id = '$_user_id' ) as rol
                        INNER JOIN (SELECT * FROM app_security.functions_subsystems_rols WHERE subsystem_id = '$_subsystem_id') as rols_fn USING (rol_id)
                        INNER JOIN app_security.functions USING (function_id)
                        INNER JOIN app_security.modules USING (module_id)
                        ORDER BY module_id, function_id";
		$_selection = $this->_dbase->Select($_str_query);
		if(is_null($_selection))
		{
               $this->RegisterError('Insernal Server Error');
			return false;
		}

		$_data = $_selection->GetAll();
        $_count = $_selection->GetNumRows();
		$_selection->Free();

		$_data_access = array();
		$_module_name = "";
          $_source_list = null;

		for($i = 0; $i < $_count; $i++)
		{
               $_source_list = explode(',',$_data[$i]['source']);
			if($_data[$i]['function_name'] == 'main')
			{
				$_module_name = $_data[$i]['module'];
				$_data_access[$_module_name] = array();
			}
            foreach ($_source_list as $js) {
                array_push($_data_access[$_module_name], $js);
            }
		}

		return $_data_access;
	}
     
     public function GetAllowedSystems()
     {
          $_subsystems_access_table = $this->_security_conn->GetTableName('subsystems_access');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          
          $_user_id = $_SESSION['CUI_CDA'];

         $_selection = $this->_dbase->Select("SELECT subsystem
                                              FROM
                                              (
                                                  SELECT rol_id FROM  app_security.users WHERE user_id = '$_user_id'
                                              ) AS usser_acces
                                            INNER JOIN app_security.subsystems_rols USING(rol_id)
                                            INNER JOIN app_security.subsystems USING(subsystem_id)");
          if(is_null($_selection))
               return false;
          
          $_data = $_selection->GetAll();
          $_selection->Free();
          
          $_result = array();
          
          for($i = 0; $i < count($_data); $i++)
               if($_data[$i]['subsystem'] != $_SESSION['CUS_CDA'])
                    array_push ($_result, $_data[$i]['subsystem']);

          return $_result;
     }
	
     /** Functions for manage domain **/
//     devuelve el listado de los usario con permiso para el subsistema en el que estoy registrado oe en el que se le pas eor parametros
     public function GetAllowedUsers($Subsystem = null)
     {
          $_users_access_table = $this->_security_conn->GetTableName('users_access');
          $_users_table = $this->_security_conn->GetTableName('users');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          
          $_subsystem_id = null;
          
          if(is_null($Subsystem))
            $_subsystem_id = $_SESSION['CSI_CDA'];
          else
          {
                $_subsystems_table = $this->_dbase->GetTable($_subsystems_table);
                $_subsystem_id = $_subsystems_table->GetValueWhere('subsystem_id',"subsystem = '$Subsystem'");
                if(is_null($_subsystem_id))
                {
                    ErrorManager::RegisterError('Parametro incorrecto', "El sistema '$Subsystem' no existe");
                    return false;
                }
          }
          
          $_str_quesy = "SELECT user_log, user_name FROM $_users_table WHERE user_id IN (SELECT user_id FROM $_users_access_table WHERE subsystem_id = '$_subsystem_id')";
          $_selection = $this->_dbase->Select($_str_quesy);
          if(is_null($_selection))
          {
               return false;
          }
          
          $_result = $_selection->GetAll();
          $_selection->Free();
		return $_result;
     }
     
     public function SetDomainToUser($UserLog, $DomainId, $Subsystem = null)
     {
          $_users_domain_table = $this->_security_conn->GetTableName('users_domain');
          $_users_table = $this->_security_conn->GetTableName('users');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          
          $_user_log = $UserLog;
          Validator::ToCleanSQL($_user_log);
          $_domain = $DomainId;
          Validator::ToCleanSQL($_domain);
          
          $_subsystem_id = null;
          
          if(is_null($Subsystem))
            $_subsystem_id = $_SESSION['CSI_CDA'];
          else
          {
                $_subsystems_table = $this->_dbase->GetTable($_subsystems_table);
                $_subsystem_id = $_subsystems_table->GetValueWhere('subsystem_id',"subsystem = '$Subsystem'");
                if(is_null($_subsystem_id))
                {
                    ErrorManager::RegisterError('Parametro incorrecto', "El sistema '$Subsystem' no existe");
                    return false;
                }
          }
          
          // Get the user_id and verify it's existence
          $_users = $this->_dbase->GetTable($_users_table);
          $_user_id = $_users->GetValueWhere('user_id', "user_log = '$_user_log'");
          if(is_null($_user_id))
          {
               ErrorManager::RegisterError('Parametro incorrecto', "El usuario '$UserLog' no existe");
               return false;
          }
          
          // If the user have not a domain defined then, the tuple in inserted into the table.
          // Else, the value of the domain is updated
          $_users_domain = $this->_dbase->GetTable($_users_domain_table);
          $_count = $_users_domain->Contains(array(
              'user_id' => "'$_user_id'",
              'subsystem_id' => "'$_subsystem_id'"
          ));
          if($_count < 0) return false;

          elseif($_count == 0)
          {
               $_result = $_users_domain->InsertValues(array(
                   'user_id' => "'$_user_id'",
                   'subsystem_id' => "'$_subsystem_id'",
                   'domain_id' => "'$_domain'"
               ));
               if($_result <= 0) return false;
          }
          else
          {
               $_result = $_users_domain->Update( array('domain_id' => "'$_domain'"),
                   "user_id = '$_user_id' AND subsystem_id = '$_subsystem_id'");
               if($_result <= 0) return false;
          }
          return true;
     }
     
     public function DeniedDomainToUser($UserLog, $Subsystem = null)
     {
          $_users_domain_table = $this->_security_conn->GetTableName('users_domain');
          $_users_table = $this->_security_conn->GetTableName('users');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          
          $_user_log = $UserLog;
          Validator::ToCleanSQL($_user_log);
//          $_domain = $DomainId;
          Validator::ToCleanSQL($_domain);
          
          $_subsystem_id = null;
          if(is_null($Subsystem))
            $_subsystem_id = $_SESSION['CSI_CDA'];
          else
          {
                $_subsystems_table = $this->_dbase->GetTable($_subsystems_table);
                $_subsystem_id = $_subsystems_table->GetValueWhere('subsystem_id',"subsystem = '$Subsystem'");
                if(is_null($_subsystem_id))
                {
                    ErrorManager::RegisterError('Parametro incorrecto', "El sistema '$Subsystem' no existe");
                    return false;
                }
          }
          
          // Get the user_id and verify it's existence
          $_users = $this->_dbase->GetTable($_users_table);
          $_user_id = $_users->GetValueWhere('user_id', "user_log = '$_user_log'");
          if(is_null($_user_id))
          {
               ErrorManager::RegisterError('Parametro incorrecto', "El usuario '$UserLog' no existe");
               return false;
          }
          
          // If the user have not a domain defined then, the tuple in inserted into the table.
          // Else, the value of the domain is updated
          $_users_domain = $this->_dbase->GetTable($_users_domain_table);
          $_count = $_users_domain->Contains(array(
              'user_id' => "'$_user_id'",
              'subsystem_id' => "'$_subsystem_id'"
          ));
          if($_count < 0) return false;
          elseif($_count == 0)
          {
               ErrorManager::RegisterError('Operaci�n no v�lida', "El usuario '$UserLog' no tiene dominio en este sistema");
               return false;
          }
          else
          {
               $_result = $_users_domain->DeleteWhere("user_id = '$_user_id' AND subsystem_id = '$_subsystem_id'");
               if($_result <= 0) return false;
          }
          
		return true;
     }
     
     public function GetUserDomain($UserLog, $Subsystem = null)
     {
          $_users_domain_table = $this->_security_conn->GetTableName('users_domain');
          $_users_table = $this->_security_conn->GetTableName('users');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          
          $_user_log = $UserLog;
          Validator::ToCleanSQL($_user_log);
          $_domain_id = false;
                    
          $_subsystem_id = null;
          if(is_null($Subsystem))
            $_subsystem_id = $_SESSION['CSI_CDA'];
          else
          {
                $_subsystems_table = $this->_dbase->GetTable($_subsystems_table);
                $_subsystem_id = $_subsystems_table->GetValueWhere('subsystem_id',"subsystem = '$Subsystem'");
                if(is_null($_subsystem_id))
                {
                    ErrorManager::RegisterError('Parametro incorrecto', "El sistema '$Subsystem' no existe");
                    return false;
                }
          }
          // Get the user_id and verify it's existence
          $_users = $this->_dbase->GetTable($_users_table);
          $_user_id = $_users->GetValueWhere('user_id', "user_log = '$_user_log'");
          if(is_null($_user_id))
          {
               ErrorManager::RegisterError('Parametro incorrecto', "El usuario '$UserLog' no existe");
               return false;
          }
          
          // If the user have not a domain defined then, the tuple in inserted into the table.
          // Else, the value of the domain is updated
          $_users_domain = $this->_dbase->GetTable($_users_domain_table);
          $_count = $_users_domain->Contains(array(
              'user_id' => "'$_user_id'",
              'subsystem_id' => "'$_subsystem_id'"
          ));
          if($_count < 0) return false;
          elseif($_count == 0)
          {
               //ErrorManager::RegisterError('Operaci�n no v�lida', "El usuario '$UserLog' no tiene dominio en este sistema");
               return false;
          }
          else
          {
               $_domain_id = $_users_domain->GetValueWhere('domain_id', "user_id = '$_user_id' AND subsystem_id = '$_subsystem_id'");
               if(is_null($_domain_id))return false;
          }
          
		return $_domain_id;
     }

     public function GetDomain($_user, $_subsystem) {
         $_data = array();
         $_users_domain_table = $this->_security_conn->GetTableName('users_domain');
         $_table = $this->_dbase->GetTable($_users_domain_table);
         $_data = $_table->GetAll("user_id = '$_user' AND subsystem_id = '$_subsystem'");
         if (is_null($_data))
             return false;

         return $_data[0]['domain_id'];
     }
     
     /** End of functions for manage domain **/
     
	public static function GetCurrentUserId()
	{
		return $_SESSION['CUI_CDA'];
	}
	
	public static function GetCurrentUserLog()
	{
		return $_SESSION['USER_LOG_CDA'];
	}
	
	public static function GetCurrentUserName()
	{
		return $_SESSION['USER_NAME_CDA'];
	}
	
	public static function GetCurrentSubsystem()
	{
		return $_SESSION['CUS_CDA'];
	}
	
	public static function GetCurrentSubsystemId()
	{
		return $_SESSION['CSI_CDA'];
	}
     
     public static function SetCurrentUserDomain($Domain)
     {
          $_SESSION['CUD_CDA'] = $Domain;
     }
     
     public static function GetCurrentUserDomain()
     {
          return $_SESSION['CUD_CDA'];
     }
     
     public function GetIdBySubSystem($sub)
     {
         $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
         
         $tabla = $_subsystems_table = $this->_dbase->GetTable($_subsystems_table);
         $_data = $tabla->GetValueWhere('subsystem_id',"subsystem = '$sub'");
         
         return $_data;
     }
}

?>
