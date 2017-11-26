 <?PHP

class Talla extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.talla_vista');
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
    public function ValidateCargarDatosCombo(&$params) {
        return true;
    }
    public function CargarDatosCombo(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.talla_tipo');
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
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("plantilla.trabajador");
        $count = $datos->Contains(array('talla_camisa_blusa' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "La Talla a eliminar esta siendo usado por  Trabajador.");
            return false;
        }
//        print_r($datos);
        $datos=$this->_dbase->GetTable("plantilla.trabajador");
        $count = $datos->Contains(array('talla_pantalon_saya' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "La Talla a eliminar esta siendo usado por  Trabajador.");
            return false;
        }
//        print_r($datos);
        $datos=$this->_dbase->GetTable("plantilla.trabajador");
        $count = $datos->Contains(array('talla_zapato' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "La Talla a eliminar esta siendo usado por Trabajador.");
            return false;
        }
//        print_r($datos);die;
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
                $data=$this->_dbase->GetTable("nomencladores.talla");
                $result = $data->Update(array('activo' => "'false'"), "id = '$id'");
                return true;

    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])||!isset($params['datos_UBT_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $tallaid = $params['datos_UBT_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la Talla incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


       $actividades = $this->_dbase->GetTable('nomencladores.talla');
        $count = $actividades->Contains(array('valor' => "'$nombre'",'talla_tipoid' => "'$tallaid'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "La Talla y el valor ya existe.");
            return false;
        }return true;

       }
    public function Add(&$params){
       $valor=$params['nombre_id'];
       $datos_UBT_id=$params['datos_UBT_id'];
       $datos=$this->_dbase->GetTable("nomencladores.talla");
       return $data=$datos->InsertValues(array('valor' => "'$valor'",'talla_tipoid' => "'$datos_UBT_id'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['valor_Udt_id'])||!isset($params['id_Udt_id'])||!isset($params['datos_UBT_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $newvalor = $params['valor_Udt_id'];
        $newtallaid= $params['datos_UBT_id'];

        $newvalor = trim($newvalor);
        $newtallaid= trim($newtallaid);

        $_valid = Validator::CheckStringSize($id, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la Talla incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($newvalor);
        $params['new_nombre'] = $newvalor;

        $actividades = $this->_dbase->GetTable('nomencladores.talla');
        $count = $actividades->Contains(array('valor' => "'$newvalor'",'talla_tipoid' => "'$newtallaid'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "La Talla y el valor ya existe.");
            return false;
        }return true;
    }
    public function Modid(&$params){
        $valor=$params['valor_Udt_id'];
        $ids=$params['id_Udt_id'];
        $datos_UBT_id=$params['datos_UBT_id'];
        $datos=$this->_dbase->GetTable("nomencladores.talla");
        $datos->Update(array('valor' => "'$valor'",'talla_tipoid' => "'$datos_UBT_id'"),"id = '$ids'");
        return true;
    }

};
?>
