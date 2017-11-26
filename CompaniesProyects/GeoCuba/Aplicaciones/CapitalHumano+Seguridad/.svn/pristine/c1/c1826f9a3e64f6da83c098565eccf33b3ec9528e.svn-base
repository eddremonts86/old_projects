<?PHP

class Incidencias extends Module {

    public function __construct() {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_incidencias');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ========================================================================//
    public function ValidateEliminar(&$params) {

        $id = $params['id'];
        $datos = $this->_dbase->GetTable("nomencladores.agencia");
        $count = $datos->Contains(array('Incidenciasid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "La Incidencias  a eliminar esta siendo usado por Agencia.");
            return false;
        }
        return true;
    }

    public function Eliminar(&$params) {
        $id = $params['id'];
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("nomencladores.Incidencias");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else
            return false;
    }

// ========================================================================//
    public function ValidateAdd(&$params) {
        return true;
    }

    public function Add(&$params) {
        $name = $params['nombre_id'];
        $datos = $this->_dbase->GetTable("salario.incidencias_padicional");
        return $data = $datos->InsertValues(array('nombre' => "'$name'"));
    }

// ========================================================================//
    public function ValidateModid(&$params) {
        return true;
    }

    public function Modid(&$params) {
        $name = $params['nombre'];
        $ids = $params['id_Udt_id'];
        $datos = $this->_dbase->GetTable("salario.incidencias_padicional");
        $datos->Update(array('nombre' => "'$name'"), "id = '$ids'");
        return true;
    }

    public function ValidateAdd_conf(&$params) {
        return true;
    }

    public function Add_conf(&$params) {
        $id = $params['id'];
        $por_ciento = $params['por_ciento'];
        $condiciones_laborales = $params['condiciones_laborales'];
        if ($condiciones_laborales == '') {
            $condiciones_laborales = 'false';
        }
        $horario_irregular = $params['horario_irregular'];
        if ($horario_irregular == '') {
            $horario_irregular = 'false';
        }
        $Otros_Pagos = $params[' Otros_Pagos'];
        if ($Otros_Pagos == '') {
            $Otros_Pagos = 'false';
        }
        $resive_salario = $params['resive_salario'];
        if ($resive_salario == '') {
            $resive_salario = 'false';
        }
        $promedio_meses = $params['promedio_meses'];
        if ($promedio_meses == '') {
            $promedio_meses = 'false';
        }
        $licencia_maternidad = $params['licencia_maternidad'];
        if ($licencia_maternidad == '') {
            $licencia_maternidad = 'false';
        }
        $prestacion = $params['prestacion'];
        if ($prestacion == '') {
            $prestacion = 'false';
        }
        $subcidio = $params['subcidio'];
        if ($subcidio == '') {
            $subcidio = 'false';
        }
        $antiguedad = $params['antiguedad'];
        if ($antiguedad == '') {
            $antiguedad = 'false';
        }
        $estimulacion = $params['estimulacion'];
        if ($estimulacion == '') {
            $estimulacion = 'false';
        }
        $cap_compra = $params['cap_compra'];
        if ($cap_compra == '') {
            $cap_compra = 'false';
        }
        $vacacones = $params['vacacones'];
        if ($vacacones == '') {
            $vacacones = 'false';
        }
        $info_ausentismo = $params['info_ausentismo'];
        if ($info_ausentismo == '') {
            $info_ausentismo = 'false';
        }
        $indice_ausentismo = $params['indice_ausentismo'];
        if ($indice_ausentismo == '') {
            $indice_ausentismo = 'false';
        }
        $Integra_no_laborable = $params['Integra_no_laborable'];
        if ($Integra_no_laborable == '') {
            $Integra_no_laborable = 'false';
        }
        $Integra_tiempo_Perdido = $params['Integra_tiempo_Perdido'];
        if ($Integra_tiempo_Perdido == '') {
            $Integra_tiempo_Perdido = 'false';
        }
        $Integra_tiempo_de_vacaciones = $params['Integra_tiempo_de_vacaciones'];
        if ($Integra_tiempo_de_vacaciones == '') {
            $Integra_tiempo_de_vacaciones = 'false';
        }
        $devengado_mes = $params['devengado_mes'];
        if ($devengado_mes == '') {
            $devengado_mes = 'false';
        }
        $devengado_estdo = $params['devengado_estdo'];
        if ($devengado_estdo == '') {
            $devengado_estdo = 'false';
        }
        $Aportad_seguridad = $params['Aportad_seguridad'];
        if ($Aportad_seguridad == '') {
            $Aportad_seguridad = 'false';
        }
        $proximo_periodo = $params['proximo_periodo'];
        if ($proximo_periodo == '') {
            $proximo_periodo = 'false';
        }
        $se_excluye = $params['se_excluye'];
        if ($se_excluye == '') {
            $se_excluye = 'false';
        }
        $targetas_SNC225 = $params['targetas_SNC225'];
        if ($targetas_SNC225 == '') {
            $targetas_SNC225 = 'false';
        }

        $datos = $this->_dbase->GetTable("salario.incidencias_conf");
        $true = $datos->GetValueBy('id', array('id_incidencia' => "'$id'"));
        if ($true == '') {
            $data = $datos->InsertValues(array(
                'id_incidencia' => "'$id'",
                'condiciones_laborales_anormales' => "'$condiciones_laborales'",
                'horario_regular' => "'$horario_irregular'",
                'otros_pagos' => "'$Otros_Pagos'",
                'resive_salario' => "'$resive_salario'",
                'basao_promedio_anterior' => "'$promedio_meses'",
                'porciento_a_pagar' => "'$por_ciento'",
                'licencia_maternidad' => "'$licencia_maternidad'",
                'prestacion_social' => "'$prestacion'",
                'subsidio' => "'$subcidio'",
                'antiguedad' => "'$antiguedad'",
                'estimulacion' => "'$estimulacion'",
                'capacidad_compra' => "'$cap_compra'",
                'pago_vacaciones' => "'$vacacones'",
                'informar_en_ausentismo' => "'$info_ausentismo'",
                'afecta_ausentismo' => "'$indice_ausentismo'",
                'tiempo_no_laborable' => "'$Integra_no_laborable'",
                'tiempo_perdido' => "'$Integra_tiempo_Perdido'",
                'tiempo_vacaciones' => "'$Integra_tiempo_de_vacaciones'",
                'acumula_tajetasnc' => "'$targetas_SNC225'",
                'devengado_mes' => "'$devengado_mes'",
                'devengado_trabajado' => "'$devengado_estdo'",
                'aporta_seguriad_social' => "'$Aportad_seguridad'",
                'mantener_reporte' => "'$proximo_periodo'",
                'excluir_reporte' => "'$se_excluye'"
                    ));
            if ($data)
                return true;
            else
                return false;
        }
        else {
            $data = $datos->Update(array(
                'id_incidencia' => "'$id'",
                'condiciones_laborales_anormales' => "'$condiciones_laborales'",
                'horario_regular' => "'$horario_irregular'",
                'otros_pagos' => "'$Otros_Pagos'",
                'resive_salario' => "'$resive_salario'",
                'basao_promedio_anterior' => "'$promedio_meses'",
                'porciento_a_pagar' => "'$por_ciento'",
                'licencia_maternidad' => "'$licencia_maternidad'",
                'prestacion_social' => "'$prestacion'",
                'subsidio' => "'$subcidio'",
                'antiguedad' => "'$antiguedad'",
                'estimulacion' => "'$estimulacion'",
                'capacidad_compra' => "'$cap_compra'",
                'pago_vacaciones' => "'$vacacones'",
                'informar_en_ausentismo' => "'$info_ausentismo'",
                'afecta_ausentismo' => "'$indice_ausentismo'",
                'tiempo_no_laborable' => "'$Integra_no_laborable'",
                'tiempo_perdido' => "'$Integra_tiempo_Perdido'",
                'tiempo_vacaciones' => "'$Integra_tiempo_de_vacaciones'",
                'acumula_tajetasnc' => "'$targetas_SNC225'",
                'devengado_mes' => "'$devengado_mes'",
                'devengado_trabajado' => "'$devengado_estdo'",
                'aporta_seguriad_social' => "'$Aportad_seguridad'",
                'mantener_reporte' => "'$proximo_periodo'",
                'excluir_reporte' => "'$se_excluye'"
                    ), "id = '$true'");
            if ($data)
                return true;
            else
                return false;
        }
    }

    public function ValidateAdd_def(&$params) {
        return true;
    }

    public function Add_def(&$params) {
        $id = $params['id'];
        $id['incidencias_id']      = "'".$params['incidencias_id']."'";
        $valores['incidencias_id'] = "'".$params['incidencias_id']."'";
        $valores['c_costo']        = "'".$params['c_costo']."'";
        $valores['c_cuentas']      = "'".$params['c_cuentas']."'";
        if($params['aporta_sperf'] == 'true')
           $valores['aporta_sperf'] = "'t'"; 
        else 
           $valores['aporta_sperf'] = "'f'";
        if($params['aporta_fw'] == 'true')
           $valores['aporta_fw'] = "'t'"; 
        else 
           $valores['aporta_fw'] = "'f'";
        if($params['aporta_ss'] == 'true')
           $valores['aporta_ss'] = "'t'"; 
        else 
           $valores['aporta_ss'] = "'f'";
        if($params['solo_909'] == 'true' && $params['aporta_ss'] == 'true')
           $valores['solo_909'] = "'t'"; 
        else 
           $valores['solo_909'] = "'f'";
        
        if($params['p_salario'] != '')
            $valores['p_salario']      = "'".$params['p_salario']."'";
        if($params['p_pago_ad'] != '')
            $valores['p_pago_ad']      = "'".$params['p_pago_ad']."'";
        if($params['p_estimulacion'] != '')
            $valores['p_estimulacion'] = "'".$params['p_estimulacion']."'";
        if($params['p_cond_an'] != '')
            $valores['p_cond_an']      = "'".$params['p_cond_an']."'";
        if($params['p_otros_pag'] != '')
            $valores['p_otros_pag']    = "'".$params['p_otros_pag']."'";
        if($params['p_antig'] != '')
            $valores['p_antig']        = "'".$params['p_antig']."'";
        if($params['p_ss'] != '')
            $valores['p_ss']           = "'".$params['p_ss']."'";
        if($params['p_fzaw'] != '')
            $valores['p_fzaw']         = "'".$params['p_fzaw']."'";
        if($params['i_salario'] != '')
            $valores['i_salario']      = "'".$params['i_salario']."'";
        if($params['i_pago_ad'] != '')
            $valores['i_pago_ad']      = "'".$params['i_pago_ad']."'";
        if($params['i_estimulacion'] != '')
            $valores['i_estimulacion'] = "'".$params['i_estimulacion']."'";
        if($params['i_cond_an'] != '')
            $valores['i_cond_an']      = "'".$params['i_cond_an']."'";
        if($params['i_otros_pag'] != '')
            $valores['i_otros_pag']    = "'".$params['i_otros_pag']."'";
        if($params['i_antig'] != '')
            $valores['i_antig']        = "'".$params['i_antig']."'";
        if($params['i_ss'] != '')
            $valores['i_ss']           = "'".$params['i_ss']."'";
        if($params['i_fzaw'] != '')
            $valores['i_fzaw']         = "'".$params['i_fzaw']."'";        
//print_r($valores);die;
        $datos = $this->_dbase->GetTable("salario.incidencias_def");
        $true = $datos->GetValueBy('incidencias_id', array('incidencias_id' => "'".$params['incidencias_id']."'"));
        if ($true == '') {
            $data = $datos->InsertValues($valores);
            if ($data)
                return true;
            else
                return false;
        }
        else {
            $data = $datos->Update($valores, "incidencias_id = '".$params['incidencias_id']."'");
            if ($data)
                return true;
            else
                return false;
        }
    }
    
    public function ValidateObtDef(&$params) {
        return true;
    }

    public function ObtDef(&$params) {
        $id = $params['id'];
        $datos = $this->_dbase->GetTable("salario.incidencias_def");
        $true = $datos->GetAll("incidencias_id = '$id'");
        $result = array('success' => true, 'results' => count($true), 'rows' => $true);
        return $result;
    }
    
    public function ValidateObtElementosGastos(&$params) {
        return true;
    }

    public function ObtElementosGastos(&$params) {
        $id = $params['incidencias_id'];
        $datos = $this->_dbase->GetTable("salario.elementos_gastos");
        $_data = $datos->GetAll("activo = 't'");
        $result = array('success' => true, 'results' => count($_data), 'rows' => $_data);
        return $result;
    }
    
    public function ValidateObtCuentas(&$params) {
        return true;
    }

    public function ObtCuentas(&$params) {
        $id = $params['incidencias_id'];
        $datos = $this->_dbase->GetTable("salario.class_cuentas");
        $_data = $datos->GetAll("activo = 't'");
        $result = array('success' => true, 'results' => count($_data), 'rows' => $_data);
        return $result;
    }
    
    public function ValidateObtCentCost(&$params) {
        return true;
    }

    public function ObtCentCost(&$params){
        $id = $params['incidencias_id'];
        $datos = $this->_dbase->GetTable("salario.centros_costo");
        $_data = $datos->GetAll("activo = 't'");
        $result = array('success' => true, 'results' => count($_data), 'rows' => $_data);
        return $result;
    }

}

;
?>
