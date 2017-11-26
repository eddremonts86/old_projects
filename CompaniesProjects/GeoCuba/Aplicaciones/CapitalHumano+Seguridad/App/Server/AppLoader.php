<?PHP

session_start();

require_once(realpath(dirname(__FILE__)) . '/ConfigReader.php');
require_once(realpath(dirname(__FILE__)) . '/../../Framework/Server/Security/SecurityManager.php');

class Loader
{
     private $_error;
     
     public function __construct()
     {
          $this->_error = '';
     }
     
     public function GetJsList()
	{
		$_js_list = array();
		
		$_security_manager = SecurityManager::GetInstance();
		$_user_access = $_security_manager->GetCurrentUserAcess();

          if($_user_access === false)
          {
               $this->_error = $_security_manager->GetError();
               return false;
          }
          
          $SubSystem = $_SESSION['CUS'];
		
		// Iterate for each module that the user have access
		foreach ($_user_access as $module => $source_list)
			// Iterate for each function
			foreach ($source_list as $_js)
                    // Build the js file and insert into the list
                    array_push($_js_list, "SubSystems/$SubSystem/$module/Client/js/$_js.js");

		return $_js_list;
	}
     
     public function GetError()
     {
          return $this->_error;
     }
}
?>
