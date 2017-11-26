<?php

class AdminConnections extends ConnectionsStorage
{
     public function __construct()
     {
          parent::__construct();
          
          $this->connections_config['admin'] = array();
          $this->connections_config['admin']['type'] = 'PostgreSQL';
         // $this->connections_config['admin']['host'] = '192.168.152.170';
          $this->connections_config['admin']['host'] = 'localhost';
          $this->connections_config['admin']['port'] = '5432';
          $this->connections_config['admin']['user'] = 'postgres';
          $this->connections_config['admin']['pass'] = 'postgres';
          $this->connections_config['admin']['dbase'] = 'capital_humano';

     }
}
?>