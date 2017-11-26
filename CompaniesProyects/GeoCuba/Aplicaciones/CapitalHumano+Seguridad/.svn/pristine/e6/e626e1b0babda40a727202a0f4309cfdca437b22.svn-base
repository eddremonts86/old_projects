<?PHP
     session_start();

     require_once('../Config/app_config.php');
     require_once('../Config/db_access.php');

     require_once('../../Framework/Server/ServerManagment/FnCaller.php');
     require_once('../../Framework/Server/ServerManagment/ErrorManager.php');
     require_once('../../Framework/Server/ServerManagment/BaseModule.php');
     require_once('../../Framework/Server/Report/Report.php');
     require_once('../../Framework/Server/ServerManagment/Validator.php');
     
     require_once('../../Framework/Server/DataAccess/ConnectionsManager.php');
     require_once('../../Framework/Server/Security/LogsManager.php');
     require_once('../../Framework/Server/Security/SecurityManager.php');

     /// Params treatment  -----------------------------------------------------
     // Get params to call the function
     $_function = $_REQUEST['fn'];

     // Get passed parameters by the user
     $_params = array();
     foreach (array_keys($_REQUEST) as $key)
          if ($key != 'fn')
               $_params[$key] = str_replace("\\\"", "\"", $_REQUEST[$key]);

     // Insert the metadata of the parameters
     $_params['<METADATA>'] = array('POST' => array(), 'GET' => array());

     // Tratment of POST params
     foreach (array_keys($_POST) as $key)
          if ($key != 'fn')
               array_push($_params['<METADATA>']['POST'], $key);

     // Tratment of GET params
     foreach (array_keys($_GET) as $key)
          if ($key != 'fn')
               array_push($_params['<METADATA>']['GET'], $key);
     /// End of params treatment  ----------------------------------------------
          
     /// Invocation  -----------------------------------------------------------
     // Create an instance of a FnCaller
     $_caller = new FnCaller();
     $_result = array();
     
     // Create an instance of a security manager
     if(RUN_APP_MODE != DEBUG_MODE)
     $_sm_instance = SecurityManager::GetInstance();

     // Call the function
     $_success = $_caller->Execute($_function, $_params);
     if ($_success === false)
          $_result['errors'] = ErrorManager::GetErrorList();
     else
          $_result = $_caller->GetResult();
     /// End of invocation  ----------------------------------------------------

     // Restore the error handler function
     restore_error_handler();
     
     // Free the connection
     if(RUN_APP_MODE != DEBUG_MODE)
     $_sm_instance->FreeConnection();

     // Return the result
     $_result['success'] = $_success;
     echo json_encode($_result);
?>
