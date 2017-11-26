<?PHP
     final class FnCaller {
          // Array to store the result of the function
          private $_result;

          // Constructor of the object
          public function __construct() 
          {
               $this->_result = array();
          }
          
          // Function to validate the param fn, the invoked function
          private function ValidateFnParam($fn)
          {
               if(!fn) return false;
               // Split function into parts
               $_fn_parts = explode(".", $fn);
               // If there are less than 4 parts the function is not valid
               if(count($_fn_parts) < 4) return false;
               // Validate that each part have not white space at begining or at end
               for($i = 0; $i < count($_fn_parts); $i++)
                    if( trim($_fn_parts[$i]) != $_fn_parts[$i])
                         return false;

               return true;
          }

          private function RegisterLog($Subsystem, $Module, $Call, &$Params)
          {
               $_params = array(
                   'post' => array(),
                   'get' => array()
               );
              $_current_param = null;
               
               // Treat post parameters
              if(isset($Params['<METADATA>']['POST']))
               foreach ($Params['<METADATA>']['POST'] as $p)
               {
                    $_current_param = $Params[$p];
                    if(Validator::IsJSON($_current_param))
                         Validator::ToJSON ($_current_param, true);
                    $_params['post'][$p] = $_current_param;
               }

               // Treat get parameters
              if(isset($Params['<METADATA>']['GET']))
               foreach ($Params['<METADATA>']['GET'] as $p)
               {
                    $_current_param = $Params[$p];
                    if(Validator::IsJSON($_current_param))
                         Validator::ToJSON ($_current_param, true);
                    $_params['get'][$p] = $_current_param;
               }
               
               $_str_params = json_encode($_params);
               $_logs_manager = LogsManager::GetInstance();
               $_logs_manager->RegisterLog($Subsystem, $Module, $Call, $_str_params);
               
          }
          
          // Function to perform a user request
          public function Execute($StrFn, $Params) 
          {
               if(!$this->ValidateFnParam($StrFn))
                    ErrorManager::RegisterError('Params Error', 'Invocando función no válida');

               // fn structure: Module.File.Class.Function
               $_function = $StrFn;
               $_fn_parts = explode(".", $_function);

               // Take each part of the function
               $_module = $_fn_parts[0];
               $_file = $_fn_parts[1] . ".php";
               $_class = $_fn_parts[2];
               $_fn = $_fn_parts[3];
               $_subsystem = $_SESSION['CUS'];

               if ($_module == 'App') 
               {
                    // Build the url to load the file
                    $_url = "../../App/Server/$_file";
                    // Validate that the file exist
                    if (!file_exists($_url) || !is_readable($_url)) 
                    {
                         ErrorManager::RegisterError('IO Error', 'Error cargando fichero');
                         return false;
                    }
                    include_once($_url);
                    return $this->ExecuteAppFunction($_class, $_fn, $Params);
               }
               elseif($_module == 'AppEvent')
               {
                   $_event = $_fn;

                   require_once $_SESSION['APP_PATH'] ."/Framework/Server/Events/AppEvent.php";
                   require_once $_SESSION['APP_PATH']. "/Framework/Server/Events/EventsManager.php";
                   
                   $this->RegisterLog($_subsystem, $_module, $_fn, $Params);
                   return EventsManager::GetInstance()->ThrowEvent($_subsystem, $_event, $Params);
               }
               else 
               {
                    // If debugging or building the application, the logs are not stored
                    if(RUN_APP_MODE != DEBUG_MODE)
                    {
                         $_str_fn = $_fn_parts[2].".$_class.$_fn";
                         $this->RegisterLog($_subsystem, $_module, $_str_fn, $Params);
                    }

                    // Build the url to load the file
                    $_url = "../../SubSystems/$_subsystem/$_module/Server/$_file";
                    // Validate that the file exist
                    if (!file_exists($_url) || !is_readable($_url)) 
                    {
                         ErrorManager::RegisterError('IO Error', 'Error cargando fichero');
                         return false;
                    }
                    // Include the file
                    include_once($_url);
                    return $this->ExecuteModuleFunction($_module, $_class, $_fn, $Params);
               }
          }

          private function ExecuteAppFunction($ClassName, $FunctionName, $Params) 
          {
               // Validate that the existence of the class
               if (!@class_exists($ClassName, false)) 
               {
                    ErrorManager::RegisterError('Class Error', 'Error cargando clase');
                    return false;
               }
               // Create an instance of the class
               $_class = new $ClassName();

               // Validate that the class implements the requested function
               if (!@method_exists($_class, $FunctionName)) 
               {
                    ErrorManager::RegisterError('Implementation Error', 'Error la clase no implementa la función solicitada');
                    return false;
               }

               // Invoke the function
               $_result = $_class->$FunctionName($Params);
               //$_result = @call_user_method($FunctionName, $_class, $Params);
               if ($_result === false || ErrorManager::ExistsErrors()) 
               {
                    $this->_success = false;
                    return false;
               }
               else
               {
                    $this->_result = $_result;
                    return true;
               }
          }         

          private function ExecuteModuleFunction($ModuleName, $ClassName, $FunctionName, $Params)
          {
               // Validate that the existence of the class
               if (!@class_exists($ClassName, false))
               {
                    ErrorManager::RegisterError('Class Error', 'Error cargando clase');
                    return false;
               }

               // Create an instance of the class
               $_module = new $ClassName();
               // Validate that the class is a plugin
               if (!@is_subclass_of($_module, 'Module'))
               {
                    ErrorManager::RegisterError('Module Error', 'Error la clase no es un módulo');
                    return false;
               }

               // Validate that the class implements the requested function
               if (!@method_exists($_module, $FunctionName))
               {
                    ErrorManager::RegisterError('Implementation Error', 'Error la clase no implementa la función solicitada');
                    return false;
               }              

               // Connect to the default database
               $_connection_success = $_module->Connect();
               if(!$_connection_success)
               {
                    $this->_success = false;
                    return false;
               }

               // Invoke the validation function
               $_validation = $_module->Validate($FunctionName, $Params);
               if ($_validation === false || ErrorManager::ExistsErrors())
               {
                    $this->_success = false;
                    $_module->FreeConnection();
                    return false;
               }

               // Invoke the function
               $_result = $_module->$FunctionName($Params);
               if (!$_result || ErrorManager::ExistsErrors())
               {
                    $this->_success = false;
                    $_module->FreeConnection();
                    return false;
               }

               $this->_result[$ModuleName] = $_result;
               $_module->FreeConnection();

               return true;
          }

          public function GetResult()
          {
               return $this->_result;
          }
          
          public function BuildReport($StrFn, $Params)
          {
              if(!$this->ValidateFnParam($StrFn))
                    ErrorManager::RegisterError('Params Error', 'Invocando función no válida');

               // fn structure: Module.File.Class.Function
               $_function = $StrFn;
               $_fn_parts = explode(".", $_function);

               // Take each part of the function
               $_module = $_fn_parts[0];
               $_file = $_fn_parts[1] . ".php";
               $_class = $_fn_parts[2];
               $_fn = $_fn_parts[3];
               $_subsystem = $_SESSION['CUS'];

                // If debugging or building the application, the logs are not stored
                if(RUN_APP_MODE != DEBUG_MODE)
                {
                     $_str_fn = $_fn_parts[2].".$_class.$_fn";
                     $this->RegisterLog($_subsystem, $_module, $_str_fn, $Params);
                }

                // Build the url to load the file
                $_url = "../../SubSystems/$_subsystem/$_module/Server/$_file";
                // Validate that the file exist
                if (!file_exists($_url) || !is_readable($_url)) 
                {
                     ErrorManager::RegisterError('IO Error', 'Error cargando fichero');
                     return false;
                }
                // Include the file
                include_once($_url);
                
                // Validate that the existence of the class
               if (!@class_exists($_class, false))
               {
                    ErrorManager::RegisterError('Class Error', 'Error cargando clase');
                    return false;
               }

               // Create an instance of the class
               $_report = new $_class();
               // Validate that the class is a plugin
               if (!@is_subclass_of($_report, 'Report'))
               {
                    ErrorManager::RegisterError('Report Error', 'Error la clase no es un reporte');
                    return false;
               }
                
                $_result = $this->ExecuteModuleFunction($_module, $_class, $_fn, $Params);
                if($_result)
                    $this->_result = $this->_result[$_module];

                return $_result;
          }

     }

?>
