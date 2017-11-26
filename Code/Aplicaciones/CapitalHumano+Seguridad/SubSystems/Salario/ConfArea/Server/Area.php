 <?PHP

class Area extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//

    public function ValidateCargarAnnos(&$params) {
        return true;
    }
    public function CargarAnnos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.agencia');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.agencia_vista');
        $_data = $_table->GetRange($_limit, $_start);
//        $_data_result = $this->_dbase->Select("SELECT
//  area.id,
//  agencia.nombre as nombre_agencia,
//  area.nombre
//FROM
//  nomencladores.area,
//  nomencladores.agencia
//WHERE
//  area.agenciaid = agencia.id",$_limit,$_start);
//        $_data = $_data_result->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_inc(&$params) {
        return true;
    }
    public function CargarDatos_inc(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.conf_unidad');
        $_data = $_table->GetRange($_limit, $_start,"id_unidad='$id'");
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
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("plantilla.listado_cargos");
        $count = $datos->Contains(array('areaid' => "'$id'"));
       if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Área a eliminar esta siendo usada por Listado de Cargos.");
            return false;
        }
        $datos=$this->_dbase->GetTable("pago.proyecto");
        $count = $datos->Contains(array('areaid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Área a eliminar esta siendo usada por Proyecto.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.Area");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['combo_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $combo = $params['combo_value_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Área incorrecta.");
            return false;
        }

        $actividades = $this->_dbase->GetTable('nomencladores.area');
        $count = $actividades->Contains(array('nombre' => "'$nombre'",'agenciaid' => "'$combo'"));

        if ($count < 0)
            return false;
        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Área con la Unidad Empresarial de Base ya existe.");
            return false;
                   }
        else
            return true;
       }
    public function Add(&$params){
        $name=$params['nombre_id'];
        $anno=$params['combo_value_id'];
        $datos=$this->_dbase->GetTable("nomencladores.area");

       return $data=$datos->InsertValues(array('agenciaid' => "'$anno'",'nombre' => "'$name'"));

    }
    // ========================================================================//
    public function ValidateModif(&$params){

        if (!isset($params['nombre_id_upd'])&&!isset($params['combo_value_id_upd'])&&!isset($params['old_name']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id_upd'];
        $nombre = trim($nombre);

        $combo = $params['combo_value_id_upd'];

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Área incorrecta.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        $actividades = $this->_dbase->GetTable('nomencladores.area');
        $count = $actividades->Contains(array('nombre' => "'$nombre'",'agenciaid' => "'$combo'"));

        if ($count < 0)
            return false;
        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Área con la Unidad Empresarial de Base ya existe.");
            return false;
        }
        else
            return true;
    }
    public function Modif(&$params){

        $nameold=$params['old_name'];
        $idanno = $params['combo_value_id_upd'];

        $name=$params['nombre_id_upd'];
        $datos=$this->_dbase->GetTable("nomencladores.area");
        return $data=$datos->Update(array('agenciaid' => "'$idanno'",'nombre' => "'$name'"),"nombre='$nameold'");



    }

};
?>
