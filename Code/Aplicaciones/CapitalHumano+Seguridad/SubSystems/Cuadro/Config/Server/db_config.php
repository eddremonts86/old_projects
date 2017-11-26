<?php

class PlantillaConnections extends ConnectionsStorage
{
    public function __construct()
    {
        parent::__construct();

        $this->connections_config['nomencladores'] = array();
        $this->connections_config['nomencladores']['type'] = 'PostgreSQL';
        $this->connections_config['nomencladores']['host'] = '192.168.152.170';
        $this->connections_config['nomencladores']['port'] = '5432';
        $this->connections_config['nomencladores']['user'] = 'postgres';
        $this->connections_config['nomencladores']['pass'] = 'postgres';
        $this->connections_config['nomencladores']['dbase'] ='capital_humano';
    }
}

?>
