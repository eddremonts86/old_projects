
            <?php
                final class CommonConnections extends ConnectionsStorage
                {
                public function __construct()
                {
                parent::__construct();$this->connections_config['ch'] = array();
                $this->connections_config['ch']['type'] = 'PostgreSQL';
                //$this->connections_config['ch']['host'] = '192.168.152.170';
                $this->connections_config['ch']['host'] = 'localhost';
                $this->connections_config['ch']['port'] = '5432';
                $this->connections_config['ch']['user'] = 'postgres';
                $this->connections_config['ch']['pass'] = 'postgres';
                $this->connections_config['ch']['dbase'] = 'capital_humano';}
                }
            ?>