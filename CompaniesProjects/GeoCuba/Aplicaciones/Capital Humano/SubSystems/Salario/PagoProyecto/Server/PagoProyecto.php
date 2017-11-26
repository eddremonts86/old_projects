 <?PHP
class PagoProyecto extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_proyectos');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatostrba(&$params) {
        return true;
    }
    public function CargarDatostrba(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id_tpo = $params['id_tpo'];
        $fecha = $params['fecha'];
        $arr2 = str_split($fecha);
        $mes=$arr2[5].$arr2[6];
        $anno=$arr2[0].$arr2[1].$arr2[2].$arr2[3];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_proyectos_casi');

        if(!$fecha=="" && !$fecha==null){
            $int = $_table->GetRowsCount("id_proy = '$id_tpo' and date_part('month'::text, fecha_make) = '$mes' and date_part('year'::text, fecha_make) = '$anno'");
            if($int==0){
                $_data = $_table->GetRange($_limit, $_start,"id_proy = '$id_tpo'");
            }
            else
            $_data = $_table->GetRange($_limit, $_start,"id_proy = '$id_tpo' and date_part('month'::text, fecha_make) = '$mes' and date_part('year'::text, fecha_make) = '$anno'");
        }
        else{$_data = $_table->GetRange($_limit, $_start,"id_proy = '$id_tpo'");}

        if (is_null($_data))return false;
        $_count = count($_data);
        if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarCCosto(&$params) {
        return true;
    }
    public function CargarCCosto(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('salario.centros_costo');
        $_data = $_table->GetRange($_limit, $_start,"activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarCGasto(&$params) {
        return true;
    }
    public function CargarCGasto(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('salario.class_cuentas');
        $_data = $_table->GetRange($_limit, $_start,"naturaleza = 'Deudora'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarAreas(&$params) {
        return true;
    }
    public function CargarAreas(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.area');
        $_data = $_table->GetRange($_limit, $_start,"activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_cuentas(&$params) {
        return true;
    }
    public function CargarDatos_cuentas(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('salario.class_cuentas');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true' and naturaleza='Acreedora'");
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
            $this->RegisterError('Operación no válida', "El Control_certificados a eliminar esta siendo usado por Contrato.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("salario.proyectos");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else
            return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
       return true;
       }
    public function Add(&$params){
       $data = json_decode($params['data']);
        $id = $params['id'];
        $date = $params['date'];
        $fechaProy  = $params['fechaProy'];
        $crrear = $params['crrear'];
        $datos=$this->_dbase->GetTable("salario.proyectos_trabajador");
        $fechaProy1=$fechaProy.'T00:00:00';
        if($date==$fechaProy1){
            for($i=0;$i<count($data);$i++)
            {
                $id_proy = $data[$i]->id_proy;
                $nombre_completo = $data[$i]->trabajador_nombre_completo;
                $identidad = $data[$i]->identidad;
                $salario = $data[$i]->salario;
                $pago_adicion = $data[$i]->pago_adicion;
                $Anticipo = $data[$i]->Anticipo;
                $cies = $data[$i]->cies;
                $cla = $data[$i]->cla;

                $horas_plan = $data[$i]->horas_planV;
                $horas_realesV = $data[$i]->horas_realesV;
                if($horas_plan==null && $horas_realesV==null){
                $horas_plan = $data[$i]->horas_plan;
                $horas_realesV = $data[$i]->horas_reales;
                }

                $CPL = $data[$i]->CPL;
                $tnc = $data[$i]->tnc;
                $otros = $data[$i]->otros;
                $Total = $data[$i]->Total;
                $contratoid = $data[$i]->contratoid;
                $trabajador_id = $data[$i]->id_tabaj;

                if($id_proy){
                    $datos->Update(array(
                        'id_proyecto' => "'$id'",
                        'contrato_id' => "'$contratoid'",
                        'horas_plan' => "'$horas_plan'",
                        'horas_reales' => "'$horas_realesV'",
                        'anticipo' => "'$Anticipo'",
                        'cies' => "'$cies'",
                        'cla' => "'$cla'",
                        'cpl' => "'$CPL'",
                        'otros' => "'$otros'",
                        'sub_total' => "'$Total'",
                        'contrato_id' => "'$contratoid'",
                        'fecha_make' => "'$date'",
                        'tnc' => "'$tnc'",
                    ),"fecha_make = '$fechaProy'::date and id_proyecto = '$id' and contrato_id ='$contratoid'");
                }
                else{
                    $datos->InsertValues(array(
                        'id_proyecto' => "'$id'",
                        'contrato_id' => "'$contratoid'",
                        'horas_plan' => "'$horas_plan'",
                        'horas_reales' => "'$horas_realesV'",
                        'anticipo' => "'$Anticipo'",
                        'trabajador_id' => "'$trabajador_id'",
                        'cies' => "'$cies'",
                        'cla' => "'$cla'",
                        'cpl' => "'$CPL'",
                        'otros' => "'$otros'",
                        'sub_total' => "'$Total'",
                        'fecha_make' => "'$date'",
                        'contrato_id' => "'$contratoid'",
                        'tnc' => "'$tnc'",
                    ));
                }
            }
        }
        else{

            for($i=0;$i<count($data);$i++)
            {
            $id_proy = $data[$i]->id_proy;
            $nombre_completo = $data[$i]->trabajador_nombre_completo;
            $identidad = $data[$i]->identidad;
            $salario = $data[$i]->salario;
            $pago_adicion = $data[$i]->pago_adicion;
            $Anticipo = $data[$i]->Anticipo;
            $cies = $data[$i]->cies;
            $cla = $data[$i]->cla;
            $horas_plan = $data[$i]->horas_planV;
            $horas_realesV = $data[$i]->horas_realesV;
            $trabajador_id = $data[$i]->id_tabaj;
            $CPL = $data[$i]->CPL;
            $tnc = $data[$i]->tnc;
            $otros = $data[$i]->otros;
            $Total = $data[$i]->Total;
            $contratoid = $data[$i]->contratoid;
            $datos->InsertValues(array(
                'id_proyecto' => "'$id'",
                'contrato_id' => "'$contratoid'",
                'horas_plan' => "'$horas_plan'",
                'horas_reales' => "'$horas_realesV'",
                'anticipo' => "'$Anticipo'",
                'trabajador_id' => "'$trabajador_id'",
                'cies' => "'$cies'",
                'cla' => "'$cla'",
                'cpl' => "'$CPL'",
                'otros' => "'$otros'",
                'sub_total' => "'$Total'",
                'fecha_make' => "'$date'",
                'contrato_id' => "'$contratoid'",
                'tnc' => "'$tnc'",
            ));
          }
        }
      return true;
    }

    public function ValidateAdd_new(&$params){
        return true;
    }
    public function Add_new(&$params){
        $data = json_decode($params['data']);
        $proyect = $params['proyect'];
        $area = $params['area'];
        $jornada = $params['jornada'];
        $estim = $params['estim'];
        $fondo = $params['fondo'];
        $crrear = $params['crrear'];
        if($crrear==true){$crrear='true';}else{$crrear='false';}
        $centro = $params['centro'];
        $cuentas = $params['cuentas'];
        $date = $params['date'];
        $proy=$this->_dbase->GetTable("salario.proyectos");
        $trab=$this->_dbase->GetTable("salario.proyectos_trabajador");
        $proy->InsertValues(array('nombre' => "'$proyect'",'jornada' => "'$jornada'",'area_id' => "'$area'",'close_proy' => "'$crrear'",'fecha' => "'$date'",
                                  'centro_costo_id' => "'$centro'",'cuenta_id' => "'$cuentas'",'estim' => "'$estim'",'fondo_salario' => "'$fondo'"));
        $id_= $proy->GetValueBy('id',array('nombre' => "'$proyect'",'jornada' => "'$jornada'",'area_id' => "'$area'",'close_proy' => "'$crrear'",
                                'centro_costo_id' => "'$centro'",'cuenta_id' => "'$cuentas'",'estim' => "'$estim'",'fondo_salario' => "'$fondo'"));
       for($i=0;$i<count($data);$i++)
        {
            $contratoid = $data[$i]->contratoid;
            $id_tabaj = $data[$i]->id_tabaj;
            $trab->InsertValues(array('id_proyecto' => "'$id_'",'contrato_id' => "'$contratoid'",'trabajador_id' => "'$id_tabaj'",'fecha_make' => "'$date'"));
        }
        return true;
    }
    // ========================================================================//

    public function ValidateCargarDatos1(&$params)
    {
        return true;
    }
    public function CargarDatos1(&$params)
    {
        $_data = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('nomencladores.agencia');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarAreas1(&$params)
    {

        return true;
    }
    public function CargarAreas1(&$params)
    {
        $_data = array();
        $_count = 0;
        $value = $params['value'];
        $_table = $this->_dbase->GetTable('nomencladores.area');
        $_data = $_table->GetAll("agenciaid= '$value'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateTomar_datos(&$params)
    {
        return true;
    }
    public function Tomar_datos(&$params)
    {
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $agencia_Unidad = $params['combo_value_id'];
        $area = $params['combo_area_id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_prenomina');
        if ($agencia_Unidad && !$area) {$_data = $_table->GetRange($_limit,$_start,"agenciaid = '$agencia_Unidad'");}
        elseif ($agencia_Unidad && $area) {$_data = $_table->GetRange($_limit,$_start,("agenciaid = '$agencia_Unidad' and  areaid ='$area'"));}
        elseif(!$agencia_Unidad && !$area){$_data = $_table->GetRange($_limit,$_start);}
        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
};
?>
