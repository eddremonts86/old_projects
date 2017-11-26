<?php
session_start();

class Log
{
	public function  __construct()
	{
		require_once('../../Framework/Server/Events/AppEvent.php');
		require_once('../../Framework/Server/Events/EventsManager.php');
	}
	
	// Function to control how many times the user try to enter into the system
	private function CheckAccessTime()
	{
		$_a = true;

		$_hour = intval(date('G')) + rand(1,5);
		$_min = intval(date('i')) + rand(10, 25);
		$_seg = strval(intval(date('s')) + rand(10, 45));
		
		$_rigth = $_seg[0];
		$_left = $_seg[1];
		
		if(isset($_SESSION['_AT']))
		{
			$_t = $_SESSION['_AT'];
			$_tt = intval($_t[ strlen($_t) - 2 ]);
			// The count of access times are between 1 and 5, no problem.
			if($_tt >= 1 && $_tt <= 5)
				$_seg = $_rigth . intval($_tt) + 1 . $_left;
			// If is 0 or bigger, then there are problem. Goto home
			else
			{
				$_k = strval(rand(6,10));
				$_l = $_k[ strlen($_k) - 1 ];
				$_seg = $_rigth . $_l . $_left;
				$_a = false;
			}
			
			$_time = date('yn.j') . "$_hour.$_min.$_seg";
			$_SESSION['_AT'] = $_time;
		}
		else
			$_a = false;

		return $_a;
	}

	public function LogUser(&$params)
	{

		$_logging_filed_page = '../../index.php';
		$_logging_sucess_page = '../../main.php';
        $_logging_general_page = '../../general.php';

		$_redirect_page = '';

		$_user_log = $params['user_log'];
		$_user_pwd = $params['user_pwd'];
		$_subsystem = $params['subsystem'];

		// Control the access times
		if(!$this->CheckAccessTime())
		{
			$_redirect_page = $_logging_filed_page;
			$_SESSION['LOG_ERROR'] = 'Acceso denegado';
		}
		else
		{

			$_security_manager = SecurityManager::GetInstance();

			$_result = $_security_manager->LogUser($_user_log, $_user_pwd, $_subsystem);
            //print_r($params);die;
			if($_result === false)
			{
				$_error = $_security_manager->GetError();
				$_SESSION['LOG_ERROR'] = $_error;

				$_redirect_page = $_logging_filed_page;
			}
			else
			{
				$_SESSION['CUI'] = $_result['user_id']; // CUI, Current User Id
				$_SESSION['USER_NAME'] = $_result['user_name'];
				$_SESSION['USER_LOG'] = $_result['user_log'];
				//$_SESSION['CUS'] = $_subsystem; // CUS, Current User Subsystem
				//$_SESSION['CSI'] = $_result['subsystem_id']; // CUSI, Current Subsystem Id
                $_SESSION['rol'] = $_result['rol_id']; // CUSI, Current Subsystem Id
                $_SESSION['psw'] = $_result['psw']; // psw, passw of user
                $_SESSION['foto'] = $_result['foto']; // picture of user
                $_SESSION['cargo'] = $_result['cargo']; // cargo

				// Throw the OnBeforeLoad event
                                //$_caller = new FnCaller();
                               // $result =  $_caller->Execute("AppEvent.Throw." . $_SESSION['CUS'] . ".beforeload", null);
                $_redirect_page = $_logging_general_page;
                //print_r($_SESSION);die;
				/*if($_result)
					$_redirect_page = $_logging_sucess_page;
				else
				{
					$_redirect_page = $_logging_filed_page;
					$_errors = ErrorManager::GetErrorList();
                    $_error = $_errors[0]['description'];
					$_SESSION['LOG_ERROR'] = $_error;
				}*/
			}
		}

		header("Location: ". $_redirect_page);
	}
     
    public function SwapSystem($params)
     {

        $_security_manager = SecurityManager::GetInstance();
        $_security_manager->SwapSubsystem($params['system']);
        $_SESSION['_AT'] = 'AT';
        $_SESSION['ENTRY'] = true;
        // print_r($_SESSION);die;
        $_redirect_page = '../../main.php';

        header("Location: ". $_redirect_page);
     }
}

?>
