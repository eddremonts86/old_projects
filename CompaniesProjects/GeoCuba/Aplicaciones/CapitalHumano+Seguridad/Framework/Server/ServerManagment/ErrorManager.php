<?php
require_once(realpath(dirname(__FILE__)) . '../../Security/LogsManager.php');
require_once(realpath(dirname(__FILE__)) . '../../ServerManagment/Validator.php');

final class ErrorManager
{
        private static $error_list = array();

        private static $errors = array (
                E_ERROR              => 'Error',
                E_WARNING            => 'Advertencia',
                E_PARSE              => 'Error de Intérprete',
                E_NOTICE             => 'Anotación',
                E_CORE_ERROR         => 'Error de Núcleo',
                E_CORE_WARNING       => 'Advertencia de Núcleo',
                E_COMPILE_ERROR      => 'Error de Compilación',
                E_COMPILE_WARNING    => 'Advertencia de Compilación',
                E_USER_ERROR         => 'Error de Usuario',
                E_USER_WARNING       => 'Advertencia de Usuario',
                E_USER_NOTICE        => 'Anotación de Usuario',
                E_STRICT             => 'Anotación de tiempo de ejecución',
                E_RECOVERABLE_ERROR => 'Error Fatal Atrapable'
                );

        
        public static function RegisterError($errorType, $errorDescription)
        {
               $_server_error = (array_key_exists($errorType, self::$errors)) ? true : false;
			$errorType = ($_server_error) ? self::$errors[$errorType] : $errorType;
			
               $_logs_manager = LogsManager::GetInstance();
               
               if(RUN_APP_MODE == DEBUG_MODE)
                    array_push(self::$error_list, 
						array('error' => utf8_encode($errorType),
						'description' => utf8_encode($errorDescription) . '<br>'));
               elseif(RUN_APP_MODE == TESTING_MODE)
               {
                    $_logs_manager->RegisterError($errorType, $errorDescription . '<br>');
                    array_push(self::$error_list, 
						array('error' => utf8_encode($errorType),
						'description' => utf8_encode($errorDescription) . '<br>'));
               }
               else
               {
                    $_logs_manager->RegisterError($errorType, $errorDescription . '<br>');
                    if($_server_error)
                         array_push(self::$error_list, 
						array('error' => "Server error",
						'description' => "Internal server error. Please contact the administrator"));
                    else
                         array_push(self::$error_list, 
						array('error' => utf8_encode($errorType),
						'description' => utf8_encode($errorDescription) . '<br>'));
               }
        }

        public static function GetErrorList()
        {
                return ErrorManager::$error_list;
        }
        
        public static function ExistsErrors()
        {
                return (count(ErrorManager::$error_list) > 0);
        }
}

/// Error treatment  ------------------------------------------------------
function ServerErrorHandler($ErrorType, $ErrorMessage, $File, $Line, $Context) 
{
     if ($ErrorType == E_NOTICE)
          return;

     $desc = str_replace('"', "'", $ErrorMessage);
     $errorDescription = "Error: $desc<br>\n Fichero:  $File<br>\n Linea: $Line";
     ErrorManager::RegisterError($ErrorType, $errorDescription);  
}

$prev_errors_handler = set_error_handler("ServerErrorHandler");
/// End of error treatment  -----------------------------------------------

?>
