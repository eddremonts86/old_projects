 <?PHP

class Contrato extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.contratos_activos');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateHistorial(&$params) {
        return true;
    }
    public function Historial(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.historial_contratos');
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
        $_table = $this->_dbase->GetTable('nomencladores.contrato_tipo');
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
        $datos=$this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('contratoid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Contrato a eliminar está siendo usado por Plantilla.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {

                $datos=$this->_dbase->GetTable("plantilla.plantilla");
                $result = $datos->Update(array( 'activo' => "'false'"),"contratoid = '$id'");

                $datos=$this->_dbase->GetTable("pago.contrato");
                $result = $datos->Update(array( 'activo' => "'false'"),"id = '$id'");
                return true;
        }
        else return false;
    }

    public function ValidateDesactivar(&$params) {
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('contratoid' => "'$id'"));
        if ($count > 0) {
            $result = $datos->DeleteWhere("contratoid = '$id'");
            return true;
        }
        return true;
    }
    public function Desactivar(&$params) {
        $id = $params['id'];
        $result=null;

        if ($id) {
            //me quedo con el id de usuario en contrato----------
            $datos=$this->_dbase->GetTable("pago.Contrato");
            $user=$datos->GetAll("id= '$id'");
            $userid=$user[0]['trabajadorid'];

            //cuento cuantos contratos tiene el trabajador--------
            $usercontrato=$this->_dbase->GetTable("pago.contrato");
            $valor=$usercontrato->Contains(array('trabajadorid' => "'$userid'",'activo'=>"'true'"));

            //Lo inactivo si solo tiene un contrato--------
                if($valor<2){
                    $userG=$this->_dbase->GetTable("plantilla.trabajador");
                    $userG->Update(array('activo' => "'false'"),"id = '$userid'");
                }
            //pongo el contrato en inactivo
            $datos=$this->_dbase->GetTable("pago.contrato");
            $datos->Update(array('activo' => "'false'"),"id = '$id'");

            // actualizo la cantidad de plazas en listado de cargos

            $datos=$this->_dbase->GetTable("plantilla.plantilla");
            $user=$datos->GetAll("contratoid= '$id'");
            $userid=$user[0]['listado_cargosid'];

            $Lcargos = $this->_dbase->GetTable("plantilla.listado_cargos");
            $datos = $Lcargos->Update(array('existencia' => 'existencia + 1'),"id = '$userid'");

            // pongo el contrato en plantilla inactivo
            $fecha=date("Y-m-d");
            $datos = $this->_dbase->GetTable("plantilla.plantilla");
            $result = $datos->Update(array('activo' => "'false'",'fecha_baja'=>"'$fecha'"),"contratoid = '$id'");

            return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])||!isset($params['datos_UBT_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        $nombre = $params['nombre_id'];
        $tipo_contrato = $params['datos_UBT_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Contrato incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($tipo_contrato, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Contrato incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('pago.contrato');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Contrato '$nombre' ya existe.");
            return false;
        }return true;
       }
    public function Add(&$params){
       $name=$params['nombre_id'];
       $datos_upd_id=$params['datos_UBT_id'];
       $datos=$this->_dbase->GetTable('pago.contrato');
       return $data=$datos->InsertValues(array('nombre' => "'$name'",'contrato_tipoid' => "'$datos_upd_id'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){
        /*if (isset($params['old_name'])||isset($params['datos_upd_id'])||isset($params['fecha_inicio']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }*/

        $old_name=$params['old_name'];
        $datos_upd_id = $params['datos_upd_id'];
        $fechaI=$params['fecha_inicio'];
        $fechaF=$params['fecha_fin'];

        $_valid = Validator::CheckStringSize($old_name, 3, 100);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Contrato incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($datos_upd_id, 3, 30);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Contrato incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($datos_upd_id);
        $params['datos_upd_id'] = $datos_upd_id;
               return true;
    }
    public function Modid(&$params){


        $id=$params['old_name'];
        $cargo=$params['datos_upd_id'];
        $fechaI=$params['fecha_inicio'];
        $fechaF=$params['fecha_fin'];


        $datos=$this->_dbase->GetTable("pago.Contrato");

        if($fechaF==null){
            $indefinido = "01/01/0001";
            return $data = $datos->Update(array( 'fecha_final' => "'$indefinido'",'fecha_inicio' => "'$fechaI'",'contrato_tipoid' => "'$cargo'"),"id = '$id'");
        }
        else{
           return $data = $datos->Update(array('fecha_final' => "'$fechaF'",'fecha_inicio' => "'$fechaI'",'contrato_tipoid' => "'$cargo'"),"id = '$id'");


        }


        return false;
    }

};
?>
