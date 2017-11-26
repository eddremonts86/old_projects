<?PHP

class SubsystemsManager extends Module
{
     private $_security_conn;
     private $_initial_path;
     public $proceso;
     public $total;

     public function __construct()
	{
        parent::__construct('common.ark');
        $this->_security_conn = SecurityConnections::GetInstance();
        $this->proceso=0;
    }

	public function LinkFunctions()
	{
		$this->Link('main','LoadData', 'LoadRols');
		$this->Link('Add','AddUser');
		$this->Link('Modify','ModifyUserData');
		$this->Link('ChangePassword','ChangeUserPassword');
		$this->Link('Delete','DeleteUser');
	}
     
     public function ValidateLoadSystems(&$params)
     {
          return true;
     }
     
     public function LoadSystems(&$params)
     {
          $_data = array();
          $_count = 0;

          $_start = ($params['start']) ? $params['start'] : 0;
          $_limit = $params['limit'];
          
          if(!Validator::ToInt($_start)) return false;
          if(!Validator::ToInt($_limit)) return false;
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_selection = $this->_dbase->Select("SELECT subsystem FROM $_subsystems_table ORDER BY subsystem", $_limit, $_start);
          if(is_null($_selection))
               return false;
          $_data = $_selection->GetAll();
          $_selection->Free();
          
          $_subsystems = $this->_dbase->GetTable($_subsystems_table);
          $_count = $_subsystems->GetRowsCount();

          $result = array( 'success' => true, 'results' => $_count, 'rows' => $_data);

          return $result;
     }
     
     public function ValidateExport(&$params)
     {
          $_system = $params['system'];
          $_sys = $params['system'];
          
          if($_sys == 'Admin')
          {
               $this->RegisterError("Acción no válida", "No es posible realizar esta operación sobre el sistema de administración");
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
               $this->RegisterError("Parámetro incorrecto", "El sistema '$_sys' no está registrado");
               return false;
          }
          
          $_dir = $_SESSION['APP_PATH']."/SubSystems/$_sys";
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
     
     public function Export(&$params)
     {
          $_system = $params['system'];
          $this->_initial_path = $_SESSION['APP_PATH'] . "/Subsystems";
          $_hzip = new ZipArchive();
          $_result = $_hzip->open($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/ToExport/$_system.zip", ZipArchive::CREATE);
          if(!$_result)
          {
               $this->RegisterError('IO ERROR', "Error creando fichero compactado");
               return false;
          }
          $_result = $this->AddDir($_hzip, $_system);
          $_hzip->close();
          return $_result;
     }
     
     public function ValidateDeleteSystem(&$params)
     {
          return $this->ValidateExport($params);
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
     
     public function DeleteSystem(&$params)
     {
          $_system = $params['system'];
          
          $this->_dbase->BeginTransaction();
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystem = $this->_dbase->GetTable($_subsystems_table);
          $_count = $_subsystem->DeleteWhere("subsystem = '$_system'");
          if($_count < 0)
               return false;
          
          $this->_initial_path = $_SESSION['APP_PATH_CDA'] . "/Subsystems";
          $_result = $this->DelDir($_system);
          if(!$_result)
          {
               $this->_dbase->Rollback();
               $this->RegisterError("IO ERROR", "Error grave eliminando sistema !!!");
               return false;
          }
          
          $this->_dbase->Commit();
          return true;
     }
     
     public function ValidateImportSystem(&$params)
     {
          $_name = $_FILES['zip_file']['name'];
          $_file_parts = explode('.', $_name);
          if( strtolower($_file_parts[1]) !== 'zip' || count ($_file_parts) != 2)
          {
               $this->RegisterError("Fichero no v�lido", "El fichero importado no es v�lido");
               return false;
          }
          return true;
     }
     
     public function ImportSystem(&$params)
     {
          $_file_name = $_SESSION['APP_PATH_CDA'].'/SubSystems/Admin/Subsystems/Backup/Imported/'.$_FILES['zip_file']['name'];
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
               return $_file_parts[0];
          }
          else return false;
     }
     
     public function ValidateUnpackSystem(&$params)
     {
          $_system = $params['system'];
          $_sys = $params['system'];
          
          $_file_name = $_SESSION['APP_PATH_CDA'].'/SubSystems/Admin/Subsystems/Backup/Imported/' . $_sys . '.zip';
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
               return false;
          elseif($_count > 0)
          {
               $this->RegisterError("Par�metro incorrecto", "El sistema '$_sys' ya est� registrado");
               unlink($_file_name);
               return false;
          }
          
          $_dir = $_SESSION['APP_PATH_CDA'] . "/SubSystems/$_sys";
          if(is_dir($_dir))
          {
               $this->RegisterError("IO Error", "El sistema '$_sys' ya existe");
               unlink($_file_name);
               return false;
          }
          
          return true;
          
     }

     public function UnpackSystem(&$params)
     {
          $_system = $params['system'];
          $_file_name = $_SESSION['APP_PATH_CDA'].'/SubSystems/Admin/Subsystems/Backup/Imported/' . $_system . '.zip';
          $_destiny = $_SESSION['APP_PATH_CDA'].'/SubSystems/';
          $_hzip = new ZipArchive();
          $_result = $_hzip->open($_file_name);
          if($_result !== TRUE)
          {
               $this->RegisterError("IO ERROR", "Error leyendo fichero");
               unlink($_file_name);
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
               return false;
          }
     }

     public function ValidateRegisterSystem(&$params)
     {
          $_system = $params['system'];
          $_sys = $params['system'];

          // Validate that exist the folder
          $_folder = $_SESSION['APP_PATH_CDA'].'/SubSystems/' . $_system;
          if(!is_dir($_folder))
          {
               $this->RegisterError("IO Error", "Imposible encontrar el sistema '$_system'");
               return false;
          }

          // Validate that exists the config file
          $_config_file = $_SESSION['APP_PATH_CDA'].'/SubSystems/' . $_system . '/Config/Server/config.xml';
          if(!is_file($_config_file))
          {
               $this->RegisterError("IO Error", "Imposible encontrar el fichero de configuraci?n");
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
               $this->RegisterError("Par?metro incorrecto", "El sistema '$_sys' ya est? registrado");
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
          $_subsystem_id = $_subsystems->GetLastValue('subsystem_id');
          if(is_null($_subsystem_id))
          {
               if(ErrorManager::ExistsErrors())
               {
                    $this->_dbase->Rollback();
                    return false;
               }
               $_subsystem_id = 'Sub-0000';
          }
          $_tokens = explode('-', $_subsystem_id);
          $_id = intval($_tokens[1]);
          $_subsystem_id = 'Sub-' . str_pad(strval($_id + 1), 4, '0', STR_PAD_LEFT);
          
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
          
          // Insert the subsystem into the database
          $_result = $_subsystems->InsertValues(array(
              'subsystem_id' => "'$_subsystem_id'",
              'subsystem' => "'$_system'"
          ));
          
          if(ErrorManager::ExistsErrors())
          {
			$this->_dbase->RollBack();
               $this->DelDir($_system);
               return false;
		}
          
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

    public function ValidateExport_sistem(&$params)
    {return true;}

    public function Export_sistem(&$params)
    {
        $_system = $params['system'];
        $this->_initial_path = $_SESSION['APP_PATH'];
        $_hzip = new ZipArchive();
        $_result = $_hzip->open($_SESSION['APP_PATH'] ."/Subsystems/Admin/Subsystems/Backup/ToExport/Systema.zip", ZipArchive::CREATE);
        if(!$_result)
        {
            $this->RegisterError('IO ERROR', "Error creando fichero compactado");
            return false;
        }
        //$cant_file=$this->recorrerProyecto($_SESSION['APP_PATH']);
        $_result = $this->AddDirExport_sistem($_hzip, $_system,null);
        $_hzip->close();
        if( $_result){
            return true;
        }
        else return false;
    }

    public function recorrerProyecto($fichero) {
        $ficheros = 0;
        $datos = pathinfo($fichero);
        if ((filetype($fichero) == 'file') && ($datos['filename'] != '.' || $datos['filename'] != '..') )
            return 1;
        if ((filetype($fichero) == 'dir')) {
            $data = opendir($fichero);
            while ($file = readdir($data)) {
               //echo $fichero . '/' . $file.'<br>';
                if ($file != '.' && $file != '..') {
                    $ficheros +=  $this->recorrerProyecto($fichero . '/' . $file);//
                }
            }
            closedir($fichero);
        }
        return $ficheros;
    }
    private function AddDirExport_sistem($_hzip, $_dir,$cant_file)
    {
        $_current_dir = $this->_initial_path;
        $_hdir = opendir($_current_dir);
        if(!$_hdir)return false;
        $_hzip->addEmptyDir($_dir);
        $total=$cant_file;
        while (false !== ($file = readdir($_hdir)))
        {
            if($file == '.' || $file == '..') continue;
            $_entry = "$_dir/$file";
            $_current_entry = $_current_dir . '/' . $file;
            if(is_dir($_current_entry))
            {
                if(!$this->AddDir($_hzip,$_entry)){return false;}
            }
            elseif(is_file($_current_entry))
            {
                if(!$_hzip->addFile($_current_entry, $_entry)){return false;}
            }
        }
        closedir($_hdir);
        return true;
    }
    public function Validatevar_proceso(){
        return true;
    }
    public function var_proceso(){
        $_count=1;
        $_data = $this->proceso;
        $result = array( 'success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


    public function Validateinstall(){return true;}
    public function install(){
        $_sm = SecurityManager::GetInstance();
        $_sm->CleanSecurity();
        $fin = $_sm->InitSecurity();
        if($fin){
          $_sm->FreeConnection();
          return true;
        }
        else{
            $_sm->FreeConnection();
            return false;
        }
    }
    public function Validateupdate(){return true;}
    public function update(){
        $_sm = SecurityManager::GetInstance();
        $fin=$_sm->UpdateSecurity();
        if($fin){
            $_sm->FreeConnection();
            return true;
        }
        else{
            $_sm->FreeConnection();
            return false;
        }

    }
}
?>
