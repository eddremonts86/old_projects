 <?PHP

class GEscala extends Module {
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
        $_table = $this->_dbase->GetTable('nomencladores.grupo_escala');
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
        $datos=$this->_dbase->GetTable("plantilla.cargo");
        $count = $datos->Contains(array('grupo_escalaid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Grupo de Escala a eliminar está siendo usado por Cargo.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.grupo_escala");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){

        if (!isset($params['nombre_id'])&&!isset($params['Salario'])&&!isset($params['Pago'])) {

            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $Salario = $params['Salario'];
        $pago=$params['Pago'];

        $nombre = trim($nombre);
        $Salario = trim($Salario);
        $pago = trim($pago);

        $_valid = Validator::CheckStringSize($nombre, 1, 5);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Grupo de Escala incorrecto.");
            return false;
        }
       $_valid = Validator::CheckStringSize($Salario, 1,4);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Salario del Grupo de Escala incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($pago, 1,4);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Pago del Grupo de Escala incorrecto.");
            return false;
        }
        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;
        Validator::ToCleanSQL($Salario);
        $Salario['new_nombre'] = $Salario;
        Validator::ToCleanSQL($pago);
        $pago['Pago'] = $pago;

        $actividades = $this->_dbase->GetTable('nomencladores.grupo_escala');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Grupo de Escala '$nombre' ya existe.");
            return false;
        }return true;
       }
    public function Add(&$params){

       $name=$params['nombre_id'];
        $Salario = $params['Salario'];
        $Pago = $params['Pago'];
       $datos=$this->_dbase->GetTable("nomencladores.grupo_escala");
       return $data=$datos->InsertValues(array('nombre' => "'$name'",'salario' => "'$Salario'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['nombre_Udt_id'])||!isset($params['id_Udt_id'])||!isset($params['Salario'])||!isset($params['Pago'])) {

            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_Udt_id'];
        $id = $params['id_Udt_id'];
        $Salario = $params['Salario'];
        $pago=$params['Pago'];
        $pago = trim($pago);
        $nombre = trim($nombre);
        $id = trim($id);
        $Salario = trim($Salario);
        $_valid = Validator::CheckStringSize($id, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Grupo de Escala incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($Salario, 1,4);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Salario del Grupo de Escala incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($pago, 1,4);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Pago del Grupo de Escala incorrecto.");
            return false;
        }
        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($Salario);
        $Salario['new_nombre'] = $Salario;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;
        Validator::ToCleanSQL($pago);
        $pago['Pago'] = $pago;
        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_Udt_id'];
        $ids=$params['id_Udt_id'];
        $Salario = $params['Salario'];
        $Pago = $params['Pago'];
        $datos=$this->_dbase->GetTable("nomencladores.grupo_escala");
        $datos->Update(array('salario' => "'$Salario'",'nombre' => "'$name'"),"id = '$ids'");
        return true;
    }
};
?>
