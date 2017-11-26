<?php
define('REGISTERING', 0);
define('CONNECTION_ERROR_ON_LOG', -1);
define('INSECTION_ERROR_ON_LOG', -2);
define('QUERYING_ERROR_ON_LOG', -3);

define('CONNECTION_ERROR_ON_ERROR', -4);
define('INSECTION_ERROR_ON_ERROR', -5);

define('CONNECTION_ERROR_ON_ACCESS', -6);
define('INSECTION_ERROR_ON_ACCESS', -7);

/*
 * LogsManager : Class that define the object responsible of the logs of the application. 
 *     It register:
 *        - The user access to the system
 *        - The server call from the client
 *        - The errors
 * 
 * Note: This class implements the singleton pattern
 */
final class LogsManager
{
    private $_security_conn;
    private $_call_id;
    private static $_instance = null;
    private $_sec_manager = null;

    private function  __construct()
    {
        $this->_security_conn = SecurityConnections::GetInstance();
        $this->_sec_manager = SecurityManager::GetInstance();
    }

    public static function GetInstance()
    {
        if(is_null(self::$_instance))
            self::$_instance = new LogsManager();

        return self::$_instance;
    }

    public function RegisterUserAccess($UserLog, $Subsystem)
    {
        if(LOGS_STATE == LOGS_OFF) return false;

        $this->_call_id = REGISTERING;

        $_dbase = $this->_sec_manager->GetConnection();
        if(is_null($_dbase))
        {
            $this->_call_id = CONNECTION_ERROR_ON_ACCESS;
            return false;
        }

        $_user_log = $UserLog;
        $_system = $Subsystem;

        Validator::ToCleanSQL($_user_log);
        Validator::ToCleanSQL($_system);

        $_access_attempts_table = $this->_security_conn->GetTableName('access_attempts');
        $_access_attempts = $_dbase->GetTable($_access_attempts_table);
        $_result = $_access_attempts->InsertValues(array(
            'user_log' => "'$_user_log'",
            'subsystem' => "'$_system'"
        ));

        if($_result < 0)
        {
            $this->_call_id = INSECTION_ERROR_ON_ACCESS;
            return false;
        }
        $server_calls_table = $this->_security_conn->GetTableName('server_calls');
        $server_calls_table = $_dbase->GetTable($server_calls_table);
        $_call_id = $server_calls_table->GetLastValue('call_id');
       // var_dump($_call_id);die;
        if(is_null($_call_id))
            $this->_call_id = QUERYING_ERROR_ON_LOG;

        $this->_call_id = $_call_id;

        return true;

    }

    public function RegisterLog($Subsystem, $Module, $Call, $Params)
    {
        if(LOGS_STATE == LOGS_OFF) return false;

        $this->_call_id = REGISTERING;

        $_user_id = $_SESSION['CUI'];
        $_dbase = $this->_sec_manager->GetConnection();
        if(is_null($_dbase))
        {
            $this->_call_id = CONNECTION_ERROR_ON_LOG;
            return $this->_call_id;
        }

        $_subsystem = $Subsystem;
        $_module = $Module;
        $_call = $Call;
        $_params = $Params;

        Validator::ToCleanSQL($_subsystem);
        Validator::ToCleanSQL($_module);
        Validator::ToCleanSQL($_call);
        Validator::ToCleanSQL($_params);

        $_server_calls_table = $this->_security_conn->GetTableName('server_calls');
        $_server_calls = $_dbase->GetTable($_server_calls_table);
        $_result = $_server_calls->InsertValues(array(
            'subsystem' => "'$_subsystem'",
            'module' => "'$_module'",
            'server_function' => "'$_call'",
            'params' => "'$_params'",
            'user_id' => "'$_user_id'"
        ));

        if($_result <= 0)
        {
            $this->_call_id = INSECTION_ERROR_ON_LOG;
            return $this->_call_id;
        }

        $_call_id = $_server_calls->GetLastValue('call_id');
        if(is_null($_call_id))
        {
            $this->_call_id = QUERYING_ERROR_ON_LOG;
            return $this->_call_id;
        }

        $this->_call_id = $_call_id;
        return $_call_id;

    }

    public function GetError()
    {
        return ($this->_call_id < 0) ? $this->_call_id : 0;
    }

    public function RegisterError($ErrorType, $Description)
    {
        if(LOGS_STATE == LOGS_OFF) return false;

        if($this->GetError() != 0)
            return false;

        $_dbase = $this->_sec_manager->GetConnection();
        if(is_null($_dbase))
        {
            $this->_call_id = CONNECTION_ERROR_ON_ERROR;
            return $this->_call_id;
        }

        $_error_type = $ErrorType;
        $_desc = $Description;

        Validator::ToCleanSQL($_error_type);
        Validator::ToCleanSQL($_desc);

        $_errors_table = $this->_security_conn->GetTableName('errors');
        $_errors = $_dbase->GetTable($_errors_table);
//          print_r($this->_call_id); exit;
        $_result = $_errors->InsertValues(array(
            'call_id' => $this->_call_id,
            'error_type' => "'$_error_type'",
            'description' => "'$_desc'"
        ));

        if($_result < 0)
        {
            $this->_call_id = INSECTION_ERROR_ON_ERROR;
            return $this->_call_id;
        }

        return $this->_call_id;
    }
}

?>
