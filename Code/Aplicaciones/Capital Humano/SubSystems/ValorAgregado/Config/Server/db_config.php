<?php

class AdminConnections extends ConnectionsStorage
{				
                public function __construct()
                {
                    parent::__construct();
                    $this->connections_config['ark'] = array();
                    $this->connections_config['ark']['type'] = $this->type;
                    $this->connections_config['ark']['host'] = $this->host;
                    $this->connections_config['ark']['port'] = $this->port;
                    $this->connections_config['ark']['user'] = $this->user;
                    $this->connections_config['ark']['pass'] = $this->pass;
                    $this->connections_config['ark']['dbase']= $this->dbase;
                }
}
?>