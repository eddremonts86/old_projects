 <?PHP

class Cmilitar extends Module {
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
        $_table = $this->_dbase->GetTable('nomencladores.cargo_militar');
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
        $id=$params['id'];

        $datos=$this->_dbase->GetTable("plantilla.oficial");
        $count = $datos->Contains(array('cargo_militarid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cargo Militar a eliminar esta siendo usado por Oficial.");
            return false;
        }

        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.cargo_militar");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){

        if (!isset($params['nombre_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];

        $nombre = trim($nombre);

//        $_valid = Validator::CheckStringSize($nombre, 3, 200);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
//            return false;
//        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('nomencladores.cargo_militar');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0)
            {
            $this->RegisterError('Operación no válida', "El Cargo Militar '$nombre' ya existe.");
            return false;
            }
            return true;
       }
       
    public function Add(&$params){
       $name=$params['nombre_id'];
       $datos=$this->_dbase->GetTable("nomencladores.cargo_militar");
       return $data=$datos->InsertValues(array('nombre' => "'$name'"));

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

//        $_valid = Validator::CheckStringSize($id, 3, 200);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
//            return false;
//        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        $actividades = $this->_dbase->GetTable('nomencladores.cargo_militar');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cargo Militar '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_Udt_id'];
        $ids=$params['id_Udt_id'];
        $datos=$this->_dbase->GetTable("nomencladores.cargo_militar");
        $datos->Update(array('nombre' => "'$name'"),"id = '$ids'");
        return true;
    }

};
?>
