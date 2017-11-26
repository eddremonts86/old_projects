 <?PHP

class PlanVacacion extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    public function ValidateCargarDatoscuadros(&$params) {
        return true;
    }
    public function CargarDatoscuadros(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadro_vacaciones');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


};
?>
