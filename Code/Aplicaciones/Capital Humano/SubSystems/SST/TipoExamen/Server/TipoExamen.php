 <?PHP

class TipoExamen extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.tipo_examen');
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
                $datos=$this->_dbase->GetTable("sst.tipo_examen");
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
        $fisico = 'f';
        if(isset($params['fisico']))
            $fisico='t';
        $tipo_examen=$params['tipo_examen'];
       $datos=$this->_dbase->GetTable("sst.tipo_examen");
       return $data=$datos->InsertValues(array('fisico' => "'$fisico'",'nombre_examen' => "'$tipo_examen'",'activo' => "'t'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){
        return true;
    }

    public function Modid(&$params){
        $fisico = 'f';
        if(isset($params['fisico']))
            $fisico='t';
        $tipo_examen=$params['tipo_examen'];
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("sst.tipo_examen");
        $datos->Update(array('fisico' => "'$fisico'",'nombre_examen' => "'$tipo_examen'",'activo' => "'t'"),"id = '$id'");
        return true;
    }

};
?>
