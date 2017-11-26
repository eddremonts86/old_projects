 <?PHP

class Oficial extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.oficialvista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarDatosCMilitar(&$params) {return true;}
    public function CargarDatosCMilitar(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.cargo_militar');
        $_data = $_table->GetRange($_limit, $_start,"cargo_militar.activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarDatosGmilitar(&$params) {return true;}
    public function CargarDatosGmilitar(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.grado_militar');
        $_data = $_table->GetRange($_limit, $_start,"grado_militar.activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarDatosTrabajador(&$params) {return true;}
    public function CargarDatosTrabajador(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.trabajador');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true'");
        if (is_null($_data))
            return false;
        $_count =$_table->GetRowsCount("activo = 'true'") ;
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
                $datos=$this->_dbase->GetTable("plantilla.oficial");
                $result = $datos->Update(array('activo' => "'false'"),"trabajadorid = '$id'");
                return true;
        }
        else
            return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){

        if (!isset($params['fecha'])||!isset($params['Trabajador_UBT_id'])||!isset($params['Gmilitar_UBT_id'])||!isset($params['Cmilitar_UBT_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        $Gmilitar_UBT_id = $params['Gmilitar_UBT_id'];
        $Gmilitar_UBT_id = trim($Gmilitar_UBT_id);
        Validator::ToCleanSQL($Gmilitar_UBT_id);
        $params['Gmilitar_UBT_id'] = $Gmilitar_UBT_id;

        $Cmilitar_UBT_id = $params['Cmilitar_UBT_id'];
        $Cmilitar_UBT_id = trim($Cmilitar_UBT_id);
        Validator::ToCleanSQL($Cmilitar_UBT_id);
        $params['Cmilitar_UBT_id'] = $Cmilitar_UBT_id;

        $fecha = $params['fecha'];
        $fecha = trim($fecha);
        Validator::ToCleanSQL($fecha);
        $params['fecha'] = $fecha;

        $Trabajador_UBT_id = $params['Trabajador_UBT_id'];
        $Trabajador_UBT_id = trim( $Trabajador_UBT_id);
        Validator::ToCleanSQL( $Trabajador_UBT_id);
        $params['Trabajador_UBT_id'] =  $Trabajador_UBT_id;

        $actividades = $this->_dbase->GetTable('plantilla.oficial');
        $count = $actividades->Contains(array('trabajadorid' => "'$Trabajador_UBT_id'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Oficial ya existe.");
            return false;
        }return true;
       }
    public function Add(&$params){
       $fecha=$params['fecha'];
       $Trabajador_UBT_id=$params['Trabajador_UBT_id'];
       $Gmilitar_UBT_id=$params['Gmilitar_UBT_id'];
       $Cmilitar_UBT_id=$params['Cmilitar_UBT_id'];
       $datos=$this->_dbase->GetTable("plantilla.oficial");
       return $data=$datos->InsertValues(array('fecha_ingreso' => "'$fecha'",'trabajadorid' => "'$Trabajador_UBT_id'",'grado_militarid' => "'$Gmilitar_UBT_id'",'cargo_militarid' => "'$Cmilitar_UBT_id'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['old_Trabajador_UBT_id'])||!isset($params['fecha'])||!isset($params['Trabajador_UBT_id'])||!isset($params['Gmilitar_UBT_id'])||!isset($params['Cmilitar_UBT_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        $Gmilitar_UBT_id = $params['Gmilitar_UBT_id'];
        $Gmilitar_UBT_id = trim($Gmilitar_UBT_id);
        Validator::ToCleanSQL($Gmilitar_UBT_id);
        $params['Gmilitar_UBT_id'] = $Gmilitar_UBT_id;

        $Cmilitar_UBT_id = $params['Cmilitar_UBT_id'];
        $Cmilitar_UBT_id = trim($Cmilitar_UBT_id);
        Validator::ToCleanSQL($Cmilitar_UBT_id);
        $params['Cmilitar_UBT_id'] = $Cmilitar_UBT_id;

        $fecha = $params['fecha'];
        $fecha = trim($fecha);
        Validator::ToCleanSQL($fecha);
        $params['fecha'] = $fecha;

        $old_Trabajador_UBT_id = $params['old_Trabajador_UBT_id'];
        $old_Trabajador_UBT_id = trim( $old_Trabajador_UBT_id);
        Validator::ToCleanSQL( $old_Trabajador_UBT_id);
        $params['old_Trabajador_UBT_id'] =  $old_Trabajador_UBT_id;

        $Trabajador_UBT_id = $params['Trabajador_UBT_id'];
        $Trabajador_UBT_id = trim( $Trabajador_UBT_id);
        Validator::ToCleanSQL( $Trabajador_UBT_id);
        $params['Trabajador_UBT_id'] =  $Trabajador_UBT_id;
    }
    public function Modid(&$params){
        $fecha=$params['fecha'];
        $Trabajador_UBT_id=$params['Trabajador_UBT_id'];
        $Gmilitar_UBT_id=$params['Gmilitar_UBT_id'];
        $Cmilitar_UBT_id=$params['Cmilitar_UBT_id'];
        $old_Trabajador_UBT_id = $params['old_Trabajador_UBT_id'];
        $datos=$this->_dbase->GetTable("plantilla.oficial");
        $datos->Update(array('fecha_ingreso' => "'$fecha'",
            'trabajadorid' => "'$Trabajador_UBT_id'",
            'grado_militarid' => "'$Gmilitar_UBT_id'",
            'cargo_militarid' => "'$Cmilitar_UBT_id'"),
            "trabajadorid = '$old_Trabajador_UBT_id'");
        return true;
    }

};
?>
