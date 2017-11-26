 <?PHP

class Interrupciones extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//
    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_interrupciones');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    // ========================================================================//
    public function ValidateCargarDatosCombo(&$params) {
        return true;
    }

    public function CargarDatosCombo(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.provincia');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    // ========================================================================//
    public function ValidateEliminar(&$params) {

        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("salario.interrupciones");
                $datos->Update(array('activo' => 'false'),"id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
         return true;
       }
    public function Add(&$params){
       $Clase=$params['Clase'];
       $Descipcion=$params['Descipcion'];
       $salario=$params['salario'];
       if (!$salario) $salario='false';
       $datos=$this->_dbase->GetTable("salario.interrupciones");
       return $data=$datos->InsertValues(array('nombre' => "'$Descipcion'",'clase' => "'$Clase'",'resibe_salario' => "'$salario'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){


        return true;
    }
    public function Modid(&$params){
        $id_tpo=$params['id_tpo'];
        $Clase=$params['Clase'];
        $Descipcion=$params['Descipcion'];
        $salario=$params['salario'];
        if (!$salario) $salario='false';
        $datos=$this->_dbase->GetTable("salario.interrupciones");
        $datos->Update(array('nombre' => "'$Descipcion'",'clase' => "'$Clase'",'resibe_salario' => "'$salario'"),"id = '$id_tpo'");
        return true;
    }

};
?>
