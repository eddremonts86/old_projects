 <?PHP

class Riesgos extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
// ========================================================================//
    public function ValidateCargarDatos(&$params) {return true;}
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('sst.riesgos');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
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
                $datos=$this->_dbase->GetTable("sst.riesgos");
                $result = $datos->Update(array('activo' => "'false'"),"id = '$id'");
                return true;
        }
        else
            return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        return true;
    }

    public function Add(&$params){
       $nombre=$params['nombre_riesgo'];
       $descrp=$params['descripcion'];
       $datos=$this->_dbase->GetTable("sst.riesgos");
       $data=$datos->InsertValues(array('nombre_riesgo' => "'$nombre'",'descripcion' => "'$descrp'",'activo' => "'t'"));
        if($data == null){
            $this->RegisterError('Operación no válida', "No se pudo insertar, existe un riesgo con ese nombre.");
            return false;
        }
        return true;
    }
    // ========================================================================//
    public function ValidateModid(&$params){
        return true;
    }

    public function Modid(&$params){
        $nombre=$params['nombre_riesgo'];
        $descrp=$params['descripcion'];
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("sst.riesgos");
        $datos->Update(array('nombre_riesgo' => "'$nombre'",'descripcion' => "'$descrp'",'activo' => "'t'"),"id = '$id'");
        return true;
    }

};
?>
