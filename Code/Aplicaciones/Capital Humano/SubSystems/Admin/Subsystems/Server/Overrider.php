<?PHP

class Overrider extends Module
{
     private $_security_conn;
     private $_initial_path;

     public function __construct()
	{
          parent::__construct();
          
          $this->_dbase = ConnectionsManager::GetSecurityDatabase();
          if(!is_null($this->_dbase)) $this->_default_dbase = 'security';
          $this->_security_conn = SecurityConnections::GetInstance();
	}
     
     private function ValidateAction(&$params)
     {
          $_system = $params['system'];
          $_sys = $params['system'];
          
          if($_sys == 'Admin')
          {
               $this->RegisterError("Acci�n no v�lida", "No es posible realizar esta operaci�n sobre el sistema de administraci�n");
               return false;
          }
          
          Validator::ToCleanSQL($_system);
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystem = $this->_dbase->GetTable($_subsystems_table);
          $_count = $_subsystem->Contains(array('subsystem' => "'$_system'"));
          if($_count < 0)
               return false;
          elseif($_count == 0)
          {
               $this->RegisterError("Par&aacute;metro incorrecto", "El sistema '$_sys' no est� registrado");
               return false;
          }
          
          $_dir = $_SESSION['APP_PATH'] . "/SubSystems/$_sys";
          if(!is_dir($_dir))
          {
               $this->RegisterError("IO Error", "No se pudo encontrar el sistema '$_sys'");
               return false;
          }
          
          return true;
     }
     
     private function AddDir($_hzip, $_dir)
     {
          $_current_dir = $this->_initial_path . '/' .$_dir;
          $_hdir = opendir($_current_dir);
          
          if(!$_hdir)
               return false;
          $_hzip->addEmptyDir($_dir);
          while (false !== ($file = readdir($_hdir)))
          {
               if($file == '.' || $file == '..') continue;
               $_entry = "$_dir/$file";
               $_current_entry = $_current_dir . '/' . $file;
               if(is_dir($_current_entry))
               {
                    if(!$this->AddDir($_hzip,$_entry)) return false;
               }
               elseif(is_file($_current_entry))
               {
                    if(!$_hzip->addFile($_current_entry, $_entry)) return false;
               }
          }
          closedir($_hdir);
          return true;
     }
     
     private function DelDir($_dir)
     {
          $_current_dir = $this->_initial_path . '/' .$_dir;
          $_hdir = opendir($_current_dir);
          if(!$_hdir)
               return false;
          while (false !== ($file = readdir($_hdir)))
          {
               if($file == '.' || $file == '..') continue;
               $_entry = "$_dir/$file";
               $_current_entry = $_current_dir . '/' . $file;
               if(is_dir($_current_entry))
               {
                    if(!$this->DelDir($_entry))return false;
               }
               elseif(is_file($_current_entry))
               {
                    if(!unlink($_current_entry)) return false;
               }
          }
          
          if(!rmdir($_current_dir))return false;
          closedir($_hdir);
          
          return true;
     }
     
     private function FreeFlag()
     {
          $_flag_table = $this->_security_conn->GetTableName('backup_flag');
          $_flag = $this->_dbase->GetTable($_flag_table);
          $_flag->Update(array('in_use' => 'FALSE'));
     }
     
     public function ValidateOverrideSystem(&$params)
     {
          $_can_override = $this->ValidateAction($params);
          if(!$_can_override)
               return false;
          
          $_flag_table = $this->_security_conn->GetTableName('backup_flag');
          $_flag = $this->_dbase->GetTable($_flag_table);
          $_in_use = $_flag->GetFirstValue('in_use');
          if(is_null($_in_use))
               return false;

          if($_in_use === true)
          {
               $this->RegisterError("Operaci� no v�lida", "Otro usuario est� sobrescribiendo un sistema. Por favor, espere un momento e intente de nuevo");
               return false;
          }
          
          $_name = $_FILES['zip_file']['name'];
          $_file_parts = explode('.', $_name);
          if( strtolower($_file_parts[1]) !== 'zip' || count ($_file_parts) != 2)
          {
               $this->RegisterError("Fichero no v�lido", "El fichero importado no es v�lido");
               return false;
          }
          return true;
     }

     public function OverrideSystem(&$params)
     {
          $_file_name = $_SESSION['APP_PATH'].'/SubSystems/Admin/Subsystems/Backup/Imported/'.$_FILES['zip_file']['name'];
          // Upload the file
          if( move_uploaded_file($_FILES['zip_file']['tmp_name'], $_file_name))
          {
               $_hzip = new ZipArchive();
     
               $_result = $_hzip->open("$_file_name", ZipArchive::CHECKCONS);
               if($_result !== TRUE)
               {
                    $this->RegisterError("IO ERROR", "Error leyendo fichero");
                    unlink($_file_name);
                    return false;
               }

               $_name = $_hzip->getNameIndex(0);
               $_hzip->close();
               $_file_parts = explode('/', $_name);
               if($_file_parts[0] != $params['system'])
               {
                    $this->RegisterError("Error de archivo", "El archivo compactado no contiene el sistema que desea sobrescribir");
                    unlink($_file_name);
                    return false;
               }
               
               $_flag_table = $this->_security_conn->GetTableName('backup_flag');
               $_flag = $this->_dbase->GetTable($_flag_table);
               $_result = $_flag->Update(array('in_use' => 'TRUE'));
               if($_result < 0)
                    return false;

               return true;
          }
          else return false;
     }
     
     public function ValidateCreateBackup(&$params)
     {
          if($this->ValidateAction($params))
               return true;
          $this->FreeFlag();
          return false;
     }
     
     public function CreateBackup(&$params)
     {
          // Create the backup for the files
          $_system = $params['system'];
          date_default_timezone_set('UTC');
          $_date = date('d-m-Y');
          $this->_initial_path = $_SESSION['APP_PATH'] . "/Subsystems";
          $_hzip = new ZipArchive();
          mkdir($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/" . $_date);
          $_result = $_hzip->open($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date/$_system.zip", ZipArchive::CREATE);
          if(!$_result)
          {
               $this->RegisterError('IO ERROR', "Error creando fichero compactado");
               $this->FreeFlag();
               return false;
          }
          $_result = $this->AddDir($_hzip, $_system);
          $_hzip->close();
          
          if(!$_result)
          {
               unlink($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date/$_system.zip");
               rmdir($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date");
               $this->FreeFlag();
               return false;
          }
          
          // Create the backup into the database
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystem = $this->_dbase->GetTable($_subsystems_table);
          $_subsystem_id = $_subsystem->GetValueWhere('subsystem_id', "subsystem = '$_system'");
          
          $this->_dbase->BeginTransaction();
          
          // Backup the user access
          $_backup_users_access_table = $this->_security_conn->GetTableName('backup_users_access');
          $_users_access_table = $this->_security_conn->GetTableName('users_access');
          
          $_str_query = "INSERT INTO $_backup_users_access_table SELECT * FROM $_users_access_table WHERE subsystem_id = '$_subsystem_id'";
          $_result = $this->_dbase->Select($_str_query);
          if(is_null($_result))
          {
               $this->_dbase->Rollback();
               unlink($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date/$_system.zip");
               rmdir($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date");
               $this->FreeFlag();
               return false;
          }
          $_result->Free();
          
          // Backup the modules
          $_backup_modules_table = $this->_security_conn->GetTableName('backup_modules');
          $_modules_table = $this->_security_conn->GetTableName('modules');
          
          $_str_query = "INSERT INTO $_backup_modules_table SELECT * FROM $_modules_table WHERE subsystem_id = '$_subsystem_id'";
          $_result = $this->_dbase->Select($_str_query);
          if(is_null($_result))
          {
               $this->_dbase->Rollback();
               unlink($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date/$_system.zip");
               rmdir($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date");
               $this->FreeFlag();
               return false;
          }
          $_result->Free();
          
          // Backup the functions
          $_backup_functions_table = $this->_security_conn->GetTableName('backup_functions');
          $_functions_table = $this->_security_conn->GetTableName('functions');
          
          $_str_query = "INSERT INTO $_backup_functions_table SELECT * FROM $_functions_table WHERE module_id IN (SELECT module_id FROM $_backup_modules_table)";
          $_result = $this->_dbase->Select($_str_query);
          if(is_null($_result))
          {
               $this->_dbase->Rollback();
               unlink($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date/$_system.zip");
               rmdir($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/Store/$_date");
               $this->FreeFlag();
               return false;
          }
          $_result->Free();
          
          return true;
     }
     
     public function ValidateCleanSystem(&$params)
     {
          if($this->ValidateAction($params))
               return true;
          $this->FreeFlag();
          return false;
     }
     
     public function CleanSystem(&$params)
     {
          $_system = $params['system'];
          
          $this->_dbase->BeginTransaction();
          $_users_access_table = $this->_security_conn->GetTableName('users_access');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_users_access = $this->_dbase->GetTable($_users_access_table);
          $_count = $_users_access->DeleteWhere("subsystem_id = (SELECT subsystem_id FROM $_subsystems_table WHERE subsystem = '$_system')");
          // ************************
          // Falta quitar los modulos
          // ************************
          if($_count < 0)
          {
               $this->FreeFlag();
               return false;
          }
          
          $this->_initial_path = $_SESSION['APP_PATH'] . "/Subsystems";
          $_result = $this->DelDir($_system);
          if(!$_result)
          {
               $this->_dbase->Rollback();
               $this->RegisterError("IO ERROR", "Error grave eliminando sistema !!!");
               $this->FreeFlag();
               return false;
          }

          $this->_dbase->Commit();
          return true;
     }
     
     public function ValidateUnpackSystem(&$params)
     {
          $_system = $params['system'];
          $_sys = $params['system'];
          
          $_file_name = $_SESSION['APP_PATH'].'/SubSystems/Admin/Subsystems/Backup/Imported/' . $_sys . '.zip';
          if(!is_file($_file_name))
          {
               $this->RegisterError("IO ERROR", "No fue posible encontrar el sistema compactado");
               return false;
          }
          
          Validator::ToCleanSQL($_system);
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystem = $this->_dbase->GetTable($_subsystems_table);
          $_count = $_subsystem->Contains(array('subsystem' => "'$_system'"));
          if($_count < 0)
          {
               $this->FreeFlag();
               return false;
          }
          elseif($_count == 0)
          {
               $this->RegisterError("Par�metro incorrecto", "El sistema '$_sys' no est� registrado");
               unlink($_file_name);
               $this->FreeFlag();
               return false;
          }
          
          $_dir = $_SESSION['APP_PATH'] . "/SubSystems/$_sys";
          if(is_dir($_dir))
          {
               $this->RegisterError("IO Error", "El sistema '$_sys' a�n existe");
               unlink($_file_name);
               $this->FreeFlag();
               return false;
          }
          
          return true;
          
     }
     
     public function UnpackSystem(&$params)
     {
          $_system = $params['system'];
          $_file_name = $_SESSION['APP_PATH'].'/SubSystems/Admin/Subsystems/Backup/Imported/' . $_system . '.zip';
          $_destiny = $_SESSION['APP_PATH'].'/SubSystems/';
          $_hzip = new ZipArchive();
          $_result = $_hzip->open($_file_name);
          if($_result !== TRUE)
          {
               $this->RegisterError("IO ERROR", "Error leyendo fichero");
               unlink($_file_name);
               $this->FreeFlag();
               return false;
          }
          if($_hzip->extractTo($_destiny))
          {
               $_hzip->close();
               return true;
          }
          else
          {
               $this->RegisterError("IO ERROR", "Error descompactando fichero");
               $_hzip->close();
               unlink($_file_name);
               $this->FreeFlag();
               return false;
          }
     }
     
     public function ValidateRegisterSystem(&$params)
     {
          $_system = $params['system'];
          $_sys = $params['system'];
          
          // Validate that exist the folder
          $_folder = $_SESSION['APP_PATH'].'/SubSystems/' . $_system;
          if(!is_dir($_folder))
          {
               $this->RegisterError("IO Error", "Imposible encontrar el sistema '$_system'");
               return false;
          }
          
          // Validate that exists the config file
          $_config_file = $_SESSION['APP_PATH'].'/SubSystems/' . $_system . '/Config/Server/config.xml';
          if(!is_file($_config_file))
          {
               $this->RegisterError("IO Error", "Imposible encontrar el fichero de configuraci�n");
               return false;
          }
          
          // Validate that the system is not registered into the database
          Validator::ToCleanSQL($_system);
          $params['system'] = $_system;
          
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystem = $this->_dbase->GetTable($_subsystems_table);
          $_count = $_subsystem->Contains(array('subsystem' => "'$_system'"));
          if($_count < 0)
               return false;
          elseif($_count > 0)
          {
               $this->RegisterError("Par�metro incorrecto", "El sistema '$_sys' ya est� registrado");
               return false;
          }
          
          $_config_reader = ConfigReader::GetInstance();
          $_config_reader->ReadConfig($_system);
          if(ErrorManager::ExistsErrors())
               return false;

          return true;
     }

     public function RegisterSystem(&$params)
     {
          $_system = $params['system'];
          
          $_subsystem_table = $this->_security_conn->GetTableName('subsystems');
		$_modules_table = $this->_security_conn->GetTableName('modules');
		$_functions_table = $this->_security_conn->GetTableName('functions');
          
		
		$_subsystems = $this->_dbase->GetTable($_subsystem_table);
		$_modules = $this->_dbase->GetTable($_modules_table);
		$_functions = $this->_dbase->GetTable($_functions_table);

		// Begin the transaction for fill the tables
		$this->_dbase->BeginTransaction();
          
          // Get the last system id and generate the next
          $_subsystem_id = $_subsystems->GetValueWhere('subsystem_id',"subsystem = '$_system'");
          if(is_null($_subsystem_id))
          {
               $this->_dbase->Rollback();
               $this->FreeFlag();
               return false;
          }

          // Get the last module id and generate the next
          $_module_id = $_modules->GetLastValue('module_id');
          if(is_null($_module_id))
          {
               if(ErrorManager::ExistsErrors())
               {
                    $this->_dbase->Rollback();
                    return false;
               }
               $_module_id = 'Mod-0000';
          }
          $_tokens = explode('-', $_module_id);
          $_mod_index = intval($_tokens[1]);
          $_mod_index++;
                    
          // Get the last function id and generate the next
          $_function_id = $_functions->GetLastValue('function_id');
          if(is_null($_function_id))
          {
               if(ErrorManager::ExistsErrors())
               {
                    $this->_dbase->Rollback();
                    return false;
               }
               $_function_id = 'Fn-0000';
          }
          $_tokens = explode('-', $_function_id);
          $_fn_index = intval($_tokens[1]);
          $_fn_index++;
                   
          // Iterate for each module and insert it
          $_config_reader = ConfigReader::GetInstance();
          $_mods = $_config_reader->GetModulesOf($_system);
          for($j = 0; $j < count($_mods); $j++)
          {
               // Build the id of the module
               $_mod_id = 'Mod-' . str_pad(($_mod_index++), 4, '0', STR_PAD_LEFT);
               // Get the name of the module
               $_mod_name = $_mods[$j];
               // Get all the configuration of the module
               $_module_config = $_config_reader->ConfigOfModule($_system, $_mod_name);

               //Insert the module
               $_result = $_modules->Insert("'$_mod_id'","'$_subsystem_id'","'$_mod_name'","'". $_module_config['desc'] ."'");
               if(ErrorManager::ExistsErrors())
                    break;

               // Insert the default functionality of the module (view)
               // ----------------------------
               // Build the id of the function
               $_fn_id = 'Fn-' . str_pad(($_fn_index++), 5, '0', STR_PAD_LEFT);
               // Get the source of the module
               $_source = $_module_config['js'];
               $_module_source = implode(',', $_source);

               $_result = $_functions->Insert("'$_fn_id'","'$_mod_id'","'main'","'$_module_source'","'Default functionality of the module (show)'");
               if(ErrorManager::ExistsErrors())
                    break;

               // Iterate for each function and insert it
               $_fns = $_config_reader->GetFunctionsOf($_system, $_mod_name);
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

                    $_result = $_functions->Insert("'$_fn_id'","'$_mod_id'","'$_fn_name'","'$_fn_source'","'$_fn_desc'");
                    if(ErrorManager::ExistsErrors())
                         break;
               }
               if(ErrorManager::ExistsErrors())
                    break;
          }
          if(ErrorManager::ExistsErrors())
		{
			$this->_dbase->RollBack();
               $this->DelDir($_system);
               return false;
		}
		
          $this->_dbase->Commit();
          return true;
     }
     
     public function ValidateRestoreSecurity(&$params)
     {
          
     }
     
     public function RestoreSecurity(&$params)
     {
          
     }
}
?>
