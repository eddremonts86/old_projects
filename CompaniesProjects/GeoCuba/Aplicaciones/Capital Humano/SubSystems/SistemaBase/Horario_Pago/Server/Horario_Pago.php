 <?PHP

class Horario_Pago extends Module {
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
        $_table = $this->_dbase->GetTable('nomencladores.horario_trabajo');
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
                $datos=$this->_dbase->GetTable("nomencladores.horario_trabajo");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){

        if (!isset($params['Horario_Pago_nombre_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['Horario_Pago_nombre_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['Horario_Pago_nombre_id'] = $nombre;


        $actividades = $this->_dbase->GetTable('nomencladores.horario_trabajo');
        $count = $actividades->Contains(array('tipo' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El cargo miltar '$nombre' ya existe.");
            return false;
        }return true;
       }
    public function Add(&$params){
       $name=$params['Horario_Pago_nombre_id'];
       $datos=$this->_dbase->GetTable("nomencladores.horario_trabajo");
       return $data=$datos->InsertValues(array('tipo' => "'$name'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['nombre_Udt_id'])||!isset($params['id_Udt_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_Udt_id'];
        $id = $params['id_Udt_id'];

        $nombre = trim($nombre);
        $id = trim($id);

        $_valid = Validator::CheckStringSize($id, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        $actividades = $this->_dbase->GetTable('nomencladores.horario_trabajo');
        $count = $actividades->Contains(array('tipo' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El cargo miltar '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_Udt_id'];
        $ids=$params['id_Udt_id'];
        $datos=$this->_dbase->GetTable("nomencladores.horario_trabajo");
        $datos->Update(array('tipo' => "'$name'"),"id = '$ids'");
        return true;
    }

};
?>
