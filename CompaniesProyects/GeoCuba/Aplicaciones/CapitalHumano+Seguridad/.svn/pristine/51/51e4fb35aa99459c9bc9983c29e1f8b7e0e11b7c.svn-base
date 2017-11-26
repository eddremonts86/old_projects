<?php

final class SecurityConnections
{
     private $_tables;
     private $connections_config;
     private static $_instance = 0;

     private function __construct()
     {
          // Define the parameters of connection with the database that manage the security
          $this->connections_config['security'] = array();
          $this->connections_config['security']['type'] = 'PostgreSQL';
          $this->connections_config['security']['host'] = '192.168.152.170';
          $this->connections_config['security']['port'] = '5432';
          $this->connections_config['security']['user'] = 'postgres';
          $this->connections_config['security']['pass'] = 'postgres';
          $this->connections_config['security']['dbase'] = 'capital_humano';

          // Define the name of the tables for the security
          $this->_tables = array();
          $this->_tables['domains'] = 'app_security.domains';
          $this->_tables['functions'] = 'app_security.functions';
          $this->_tables['functions_subsystems_rols'] = 'app_security.functions_subsystems_rols';
          $this->_tables['modules'] = 'app_security.modules';
          $this->_tables['rols'] = 'app_security.rols';
          $this->_tables['subsystems'] = 'app_security.subsystems';
          $this->_tables['subsystems_rols'] = 'app_security.subsystems_rols';
          $this->_tables['users'] = 'app_security.users';

         /*
         $this->_tables = array();
         $this->_tables['subsystems'] = 'app_security.subsystems';
         $this->_tables['modules'] = 'app_security.modules';
         $this->_tables['functions'] = 'app_security.functions';
         $this->_tables['subsystems_access'] = 'app_security.subsystems_access';
         $this->_tables['users'] = 'app_security.users';
         $this->_tables['users_access'] = 'app_security.users_access';
         $this->_tables['users_domain'] = 'app_security.users_domain';
         */

          // Define the name of the tables for the logs managment
          $this->_tables['access_attempts'] = 'logs.access_attempts';
          $this->_tables['errors'] = 'logs.errors';
          $this->_tables['server_calls'] = 'logs.server_calls';
          
          // Define the name of the tables for the override process
          $this->_tables['backup_users_access'] = 'backup.users_access';
          $this->_tables['backup_functions'] = 'backup.functions';
          $this->_tables['backup_modules'] = 'backup.modules';
          $this->_tables['backup_flag'] = 'backup.flag';
     }

     public static function GetInstance()
     {
          if(self::$_instance == 0)
               self::$_instance = new SecurityConnections ();
          
          return self::$_instance;
     }
     public function GetConnectionParams($ConnectionName)
     {
          return $this->connections_config[$ConnectionName];
     }
     public function GetTableName($Table)
     {
          return $this->_tables[$Table];
     }
}
?>
