 <?PHP

class Plan extends Module {
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
        $_table = $this->_dbase->GetTable('nomencladores.eventos');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
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
                $datos1=$this->_dbase->GetTable("capacitacion.plan_superacion");

                  $datos1->Update(array('activo' => "'false'"), "cap_plan = '$id'");
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
       $datos=$this->_dbase->GetTable("capacitacion.plan_superacion");
       for($i=0;$i<count($data);$i++)
       {    $id = $data[$i]->id;
            $nombre = $data[$i]->nombre;
            $denominacion = $data[$i]->denominacion;
            $fecha_inicio = date('Y-m-d',strtotime($data[$i]->fecha_inicio));
            $facha_fin = date('Y-m-d',strtotime($data[$i]->facha_fin));
            $participan = $data[$i]->participan;
            $frecuencia = $data[$i]->frecuencia;
            $salario_mn = $data[$i]->salario_mn;
            $otros_mn = $data[$i]->otros_mn;
            $cuc = $data[$i]->cuc;
            $inst_imparte = $data[$i]->inst_imparte;
            $cap_plan = $data[$i]->cap_plan;
           if(isset($id)){
               $datosIns=$datos->Update(array(
                                        'tipo_even_id' => "'$nombre'",
                                        'denominacion' => "'$denominacion'",
                                        'fecha_inicio' => "'$fecha_inicio'",
                                        'facha_fin' => "'$facha_fin'",
                                        'participan' => "'$participan'",
                                        'frecuencia' => "'$frecuencia'",
                                        'salario_mn' => "'$salario_mn'",
                                        'otros_mn' => "'$otros_mn'",
                                        'cuc' => "'$cuc'",
                                        'inst_imparte' => "'$inst_imparte'",
                                        'cap_plan' => "'$cap_plan'"
                                        ),"id = '$id'");
           }
           else{
               $cap=$datos->Contains(array('cap_plan' => "'$cap_plan'"));
               if ($cap<1){
                   $actividades = $this->_dbase->GetTable('capacitacion.plan_cumplimiento');
                   $eventoss = $this->_dbase->GetTable('nomencladores.eventos');
                   $_data = $eventoss->GetAll();
                   $defc = array('1er Trimestre','2do Trimestre','3er Trimestre','4to Trimestre');
                   for($i=0;$i<count($defc);$i++)
                   {
                       for($a=0;$a<count($_data);$a++)
                       {
                           $actividades->InsertValues(array('cap_plan' => "'$cap_plan'",'defc' => "'".$defc[$i]."'",'evento' => "'".$_data[$a]['nombre']."'"));
                       }
                   }
               }
               $datosIns=$datos->InsertValues(array('tipo_even_id' => "'$nombre'",
                                                   'denominacion' => "'$denominacion'",
                                                   'fecha_inicio' => "'$fecha_inicio'",
                                                   'facha_fin' => "'$facha_fin'",
                                                   'participan' => "'$participan'",
                                                   'frecuencia' => "'$frecuencia'",
                                                   'salario_mn' => "'$salario_mn'",
                                                   'otros_mn' => "'$otros_mn'",
                                                   'cuc' => "'$cuc'",
                                                   'inst_imparte' => "'$inst_imparte'",
                                                   'cap_plan' => "'$cap_plan'"));
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

    /*public function Validateaddplanif($cap_plan){if($cap_plan)return true;else return false;}
    public function addplanif($cap_plan){

        $actividades = $this->_dbase->GetTable('capacitacion.plan_cumplimiento');
        $eventoss = $this->_dbase->GetTable('nomencladores.eventos');
        $_data = $eventoss->GetAll();
        $defc = array('1er Trimestre','2do Trimestre','3er Trimestre','4to Trimestre');

        for($i=0;$i<count($defc);$i++)
        {
            for($a=0;$a<count($_data);$a++)
            {
                $actividades->InsertValues(array('cap_plan' => "'$cap_plan'",'defc' => "'".$defc[$i]."'",'evento' => "'".$_data[$a]['nombre']."'"));
              //print_r($_data[$a]['nombre']);
            }
        }



    }*/



};
?>
