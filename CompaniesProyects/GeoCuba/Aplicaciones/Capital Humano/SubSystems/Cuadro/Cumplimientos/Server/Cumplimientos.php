 <?PHP

class Cumplimientos extends Module {
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
        $_limit = $params['limit']; $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuardros_indc_sal');
        $_data = $_table->GetRange($_limit, $_start,"trabajador_id = '$id'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_hist(&$params) {
        return true;
    }
    public function CargarDatos_hist(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit']; $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadro_historial');
        $_data = $_table->GetRange($_limit, $_start,"id_trab = '$id'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatoscuadros(&$params) {
        return true;
    }
    public function CargarDatoscuadros(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadros');
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

        $datos=$this->_dbase->GetTable("pago.contratoooo");
        $count = $datos->Contains(array('clienteid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cliente a eliminar esta siendo usado por Contrato.");
            return false;
        }

//        $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
//        $count2 = $datos->Contains(array('annoid' => "'$id'"));
//        if ($count2 > 0) {
//            $this->RegisterError('Operación no válida', "El Cliente a eliminar esta siendo usado por anno_mes.");
//            return false;
//        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("cuadro.controles");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
       return true;
       }
    public function ValidateAdd_control(&$params){
     return true;
       }
    public function Add(&$params){
        $cumpl=$this->_dbase->GetTable("cuadro.cumplimiento");
        $estim=$this->_dbase->GetTable("cuadro.estimulacion");
        $fecha = date('Y-m-d');
        $data = json_decode($params['data']);
        $formada = $params['formada'];
        $h = $data[0]->trabajador_id;
       $estim->InsertValues(array('formada' => "'$formada'",'a_cobrar' => "'$formada'",'id_cuadro' => "'$h'",'fecha' => "'$fecha'"));
       for($i=0;$i<count($data);$i++)
        {
            $id_ind = $data[$i]->id;
            $id_trab = $data[$i]->trabajador_id;
            $plan = $data[$i]->plan;
            $compli = $data[$i]->cumpl;
            $real = $data[$i]->_real;
            $observ = $data[$i]->obs;
            $cumpl->InsertValues(array( 'id_ind' => "'$id_ind'",'id_trab' => "'$id_trab'",'plan' => "'$plan'",'plan_real' => "'$real'",'compli' => "'$compli'",'observ' => "'$observ'",'fecha' => "'$fecha'"));
        }
        return true;

    }

    public function Add_control(&$params){
        //print_r($params);die;
        $id=$params['id'];
        $cuadro=$params['cuadro'];
        $fecha=$params['fecha'];
        $mensaje=$params['mensaje'];
       $datos=$this->_dbase->GetTable("cuadro.cuadro_control");
       return $data=$datos->InsertValues(array(
                                        'control_id' => "'$id'",
                                        'descrip' => "'$mensaje'",
                                        'fecha_reactivacion' => "'$fecha'",
                                        'cuadro_id' => "'$cuadro'")
                                        );

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
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cliente incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        $actividades = $this->_dbase->GetTable('pago.cliente');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cliente '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_Udt_id'];
        $ejecurto=$params['ejecurto'];
        $from_date=$params['from_date'];
        $ids=$params['id_Udt_id'];
        $datos=$this->_dbase->GetTable("cuadro.controles");
        $datos->Update(array('nombre' => "'$name'",'fecha' => "'$from_date'",'ejecutor' => "'$ejecurto'"),"id = '$ids'");
        return true;
    }

};
?>
