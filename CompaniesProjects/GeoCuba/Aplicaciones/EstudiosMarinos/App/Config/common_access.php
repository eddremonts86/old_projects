          <?php
     final class CommonConnections extends ConnectionsStorage
            {

                public $type= 'PostgreSQL';
                public $host= 'localhost';
                public $port= '5432';
                public $user= 'postgres';
                public $pass= 'postgres';
                public $dbase= 'emarinos';

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
