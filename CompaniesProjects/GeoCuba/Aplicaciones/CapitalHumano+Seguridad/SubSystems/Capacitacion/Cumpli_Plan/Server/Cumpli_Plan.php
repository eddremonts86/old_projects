 <?PHP

class Cumpli_Plan extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//
    public function Validateprimer(&$params) {
        return true;
    }
    public function primer(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.primer_semestre');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        //$_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatesegundo(&$params) {
        return true;
    }
    public function segundo(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.segundo_trimester');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        //$_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatetercer(&$params) {
        return true;
    }
    public function tercer(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.tercer_trimestre');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
      $_count = $_table->GetRowsCount();
        //$_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatecuarto(&$params) {
        return true;
    }
    public function cuarto(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.cuarto_trimestre');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        //$_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateresumenes(&$params) {
        return true;
    }
    public function resumenes(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.resumen_anual');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        //$_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    // ========================================================================//
    public function ValidateCargarDatos1(&$params) {
        return true;
    }
    public function CargarDatos1(&$params) {
        $_data = array();
        $_count = 0;
        $area = $params['area'] ;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plan');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true' and cap_plan = '$area'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    // ========================================================================//
    public function Validatecapitulos(&$params) {
        return true;
    }
    public function capitulos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.capitulos');
        $_data = $_table->GetAll();
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

        $datos=$this->_dbase->GetTable("capacitacion.formacion_profecional");
        $count = $datos->Contains(array('categoria_cientificaa_id' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Plan a eliminar esta siendo usado por Contrato.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("capacitacion.plan_superacion");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }

    public function ValidatedelCap(&$params) {
        return true;
    }
    public function delCap(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("capacitacion.plan_superacion");
                $result = $datos->Update(array('activo' => "'false'"), "cap_plan = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
       return true;
       }
    public function Add(&$params){
       $data = json_decode($params['data']);
       $datos=$this->_dbase->GetTable("capacitacion.plan_cumplimiento");
       for($i=0;$i<count($data);$i++)
       {
            $id = $data[$i]->id;

            $cap_plan = $data[$i]->cap_plan;
                         if($cap_plan==''){$cap_plan=0;}
            $acciones = $data[$i]->acciones;
                         if($acciones==''){$acciones=0;}
            $part_cuadros = $data[$i]->part_cuadros;
                         if($part_cuadros==''){$part_cuadros=0;}
            $part_trabaj = $data[$i]->part_trabaj;
                         if($part_trabaj==''){$part_trabaj=0;}
            $acciones_terminadas = $data[$i]->acciones_terminadas;
                         if($acciones_terminadas==''){$acciones_terminadas=0;}
            $part_term_real_cuadros = $data[$i]->part_term_real_cuadros;
                         if($part_term_real_cuadros==''){$part_term_real_cuadros=0;}
            $part_term_real_trabaj = $data[$i]->part_term_real_trabaj;
                         if($part_term_real_trabaj==''){$part_term_real_trabaj=0;}
            $acciones_continuan = $data[$i]->acciones_continuan;
                         if($acciones_continuan==''){$acciones_continuan=0;}
            $part_acci_real_cuadros = $data[$i]->part_acci_real_cuadros;
                         if($part_acci_real_cuadros==''){$part_acci_real_cuadros=0;}
            $part_acci_real_trabj = $data[$i]->part_acci_real_trabj;
                         if($part_acci_real_trabj==''){$part_acci_real_trabj=0;}
            $accion_extrapolan = $data[$i]->accion_extrapolan;
                         if($accion_extrapolan==''){$accion_extrapolan=0;}
            $part_accion_ext_cuadros = $data[$i]->part_accion_ext_cuadros;
                         if($part_accion_ext_cuadros==''){$part_accion_ext_cuadros=0;}
            $part_accion_ext_trabj = $data[$i]->part_accion_ext_trabj;
                         if($part_accion_ext_trabj==''){$part_accion_ext_trabj=0;}
           if(isset($id)){
               $datosIns=$datos->Update(array(
                                        'acciones' => "'$acciones'",
                                        'part_cuadros' => "'$part_cuadros'",
                                        'part_trabaj' => "'$part_trabaj'",
                                        'acciones_terminadas' => "'$acciones_terminadas'",
                                        'part_term_real_cuadros' => "'$part_term_real_cuadros'",
                                        'part_term_real_trabaj' => "'$part_term_real_trabaj'",
                                        'acciones_continuan' => "'$acciones_continuan'",
                                        'part_acci_real_cuadros' => "'$part_acci_real_cuadros'",
                                        'part_accion_ext_trabj' => "'$part_accion_ext_trabj'",
                                        'part_acci_real_trabj' => "'$part_acci_real_trabj'",
                                        'accion_extrapolan' => "'$accion_extrapolan'",
                                        'part_accion_ext_cuadros' => "'$part_accion_ext_cuadros'"
                                        ),"id = '$id'");
           }

       }
       return true;
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
            $this->RegisterError('Parámetro incorrecto', "Nombre del Plan incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        $actividades = $this->_dbase->GetTable('nomencladores.Plan');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Plan '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_Udt_id'];
        $ids=$params['id_Udt_id'];
        $datos=$this->_dbase->GetTable("nomencladores.Plan");
        $datos->Update(array('nombre' => "'$name'"),"id = '$ids'");
        return true;
    }

};
?>
