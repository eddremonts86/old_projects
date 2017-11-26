 <?PHP

class Evaluaciones extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadros_viol_control');
        $_data = $_table->GetRange($_limit, $_start);

        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();

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

    public function ValidateCobro(&$params){
        return true;
    }
    public function Cobro(&$params){
        $mes=$params['mes'];
        $anno=$params['anno'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = 25;
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadros_acobrar');
        $_data = $_table->GetRange($_limit, $_start,"mes='$mes' and anno='$anno'");

        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCobro1(&$params){
        return true;
    }
    public function Cobro1(&$params){
        $mes=$params['mes'];
        $anno=$params['anno'];
        $id=$params['id'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = 25;
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadros_acobrar');
        $_data = $_table->GetRange($_limit, $_start,"mes='$mes' and anno='$anno' and id_cuadro='$id'");

        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatesenal(&$params){
        return true;
    }
    public function senal(&$params){
        $id=$params['id'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = 25;
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadros_senal');
        $_data = $_table->GetRange($_limit, $_start,"id_cuaro = '$id'");

        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateAddsenal(&$params){
        return true;
    }
    public function Addsenal(&$params){
        $data = json_decode($params['data']);
        $datos=$this->_dbase->GetTable("cuadro.senalamientos");
        for($i=0;$i<count($data);$i++)
        {   $id = $data[$i]->id;
            $descr = $data[$i]->descr;
            $fecha = $data[$i]->fecha;
            $activo = $data[$i]->activo;
            $id_cuaro = $data[$i]->id_cuaro;
            if(isset($id)){$datosIns=$datos->Update(array('descr' => "'$descr'",'fecha' => "'$fecha'",'id_cuaro' => "'$id_cuaro'",'activo' => "'$activo'"),"id = '$id'");}
            else{$datosIns=$datos->InsertValues(array('descr' => "'$descr'",'fecha' => "'$fecha'",'id_cuaro' => "'$id_cuaro'",'activo' => "'$activo'"));}
        }
        return true;
    }

    public function Validatedelsenal(&$params) {
        $id=$params['id'];

        $datos=$this->_dbase->GetTable("capacitacion.formacion_profecional");
        $count = $datos->Contains(array('categoria_cientificaa_id' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Plan a eliminar esta siendo usado por Contrato.");
            return false;
        }
        return true;
    }
    public function delsenal(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id) {
            $datos=$this->_dbase->GetTable("cuadro.senalamientos");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else return false;
    }

    public function ValidateaddCpl(&$params){return true;}
    public function addCpl(&$params){
        $id = $params['id'];
        $cpl1 = $params['cpl1'];
        $cpl2 = $params['cpl2'];
        $cpl3 = $params['cpl3'];
        $cpl4 = $params['cpl4'];
        $cpl5 = $params['cpl5'];
        if ($id) {
            $datos=$this->_dbase->GetTable("cuadro.estimulacion");
            $result = $datos->Update(array(
                                            'cpl1' => "'$cpl1'",
                                            'cpl2' => "'$cpl2'",
                                            'cpl3' => "'$cpl3'",
                                            'cpl4' => "'$cpl4'",
                                            'cpl5' => "'$cpl5'",
                                            ), "id = '$id'");
            return true;
        }
        else return false;
    }

    public function Validateguardar_gen(&$params){return true;}
    public function guardar_gen(&$params){
        $data = json_decode($params['data']);
        $datos=$this->_dbase->GetTable("cuadro.estimulacion");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->id_conf;
            $pena = $data[$i]->pena;
            $cobrar = $data[$i]->cobrar;
            $categoria = $data[$i]->categoria;
            $cumplimiento = $data[$i]->cumplimiento;

            if(isset($id)){$datosIns=$datos->Update(array(
                'a_rebajar' => "'$pena'",
                'a_cobrar' => "'$cobrar'",
                'cat_eval' => "'$categoria'",
                'comportam' => "'$cumplimiento'"
            ),"id = '$id'");}

        }
        return true;
    }

};
?>
