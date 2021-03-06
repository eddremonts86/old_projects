<?PHP

class CentroCosto extends Module {

    public function __construct() {
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
        $_table = $this->_dbase->Select("SELECT centros_costo.*,area.nombre,area.agenciaid,agencia.nombre as nombre_agencia 
                                             FROM salario.centros_costo 
                                        left JOIN salario.rcent_area ON centros_costo.id = rcent_area.id_centro_costo
                                        left JOIN nomencladores.area ON rcent_area.id_area = area.id
                                        left JOIN nomencladores.agencia ON area.agenciaid = agencia.id WHERE centros_costo.activo = 't'");
//        $_table = $this->_dbase->GetTable('salario.centros_costo');
        $_data = $_table->GetAll("activo = 't'");
//        print_r($_table);die;
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ========================================================================//
    public function ValidateObtenerAreas(&$params) {
        return true;
    }

    public function ObtenerAreas(&$params) {
        $_data = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('nomencladores.area');
        $_data = $_table->GetAll("activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
// ========================================================================//
    public function ValidateObtenerAgencias(&$params) {
        return true;
    }

    public function ObtenerAgencias(&$params) {
        $_data = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('nomencladores.agencia');
        $_data = $_table->GetAll("activo = 't'");
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
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("salario.centros_costo");
            $datos->Update(array('activo' => 'false'), "id = '$id'");
            return true;
        }
        else
            return false;
    }

// ========================================================================//
    public function ValidateAdd(&$params) {
        return true;
    }

    public function Add(&$params) {
        //print_r($params['areas']);die;
        $valores['c_costo'] = "'".$params['c_costo']."'";
        $valores['id_area'] = "'".$params['area']."'";
        $datos = $this->_dbase->GetTable("salario.centros_costo");
        $data = $datos->InsertValues($valores);
        $id = $datos->GetValueBy('id', $valores);
        $relacion = $this->_dbase->GetTable("salario.rcent_area");
        $areas = explode(',',$params['areas']);
        //print_r($id);die;
        foreach($areas as $area){
            if($area != ''){
                $relacion->InsertValues(array('id_area'=>"'$area'",'id_centro_costo'=>"'$id'"));
            }
        }
        return true;
    }

// ========================================================================//
    public function ValidateModid(&$params) {
        return true;
    }

    public function Modid(&$params) {
        $valores['c_costo'] = "'".$params['c_costo']."'";
//        $valores['id_area'] = "'".$params['area']."'";
        $datos = $this->_dbase->GetTable("salario.centros_costo");
        $datos->Update($valores, "id = '".$params['id']."'");
        $relacion = $this->_dbase->GetTable("salario.rcent_area");
        $areas = explode(',',$params['areas']);
        $relacion->DeleteWhere("id_centro_costo = '".$params['id']."'");
        foreach($areas as $area){
            if($area != ''){
                $relacion->InsertValues(array('id_area'=>"'$area'",'id_centro_costo'=>"'".$params['id']."'"));
            }
        }
        return true;
    }
    
    public function ValidateAreasxCentro(&$params) {
        return true;
    }

    public function AreasxCentro(&$params) {
        $_table = $this->_dbase->Select("SELECT area.id,area.nombre,area.agenciaid FROM salario.rcent_area 
            INNER JOIN nomencladores.area ON rcent_area.id_area = area.id WHERE rcent_area.id_centro_costo = '".$params['id']."'");
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

}

;
?>
