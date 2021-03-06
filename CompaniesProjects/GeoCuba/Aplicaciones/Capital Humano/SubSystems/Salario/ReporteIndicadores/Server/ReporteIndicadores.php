<?PHP

class ReporteIndicadores extends Module
{

    public function __construct()
    {
        parent::__construct('common.ch');
    }

    // ========================================================================//
    public function ValidateTomar_datos_generales(&$params)
    {
        return true;
    }

    public function Tomar_datos_generales(&$params)
    {
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_antiguedad_prenomina');
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
    public function ValidateCargarDatos_inc(&$params)
    {
        return true;
    }

    public function CargarDatos_inc(&$params)
    {
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

    public function Validateinfo(&$params)
    {
        return true;
    }

    public function info(&$params)
    {
        $_data = array();
        $show = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $mes = $params['mes'];
        $anno = $params['anno'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_prenomina_resumen');
        $show = $_table->GetAll("month = '$mes' and  year ='$anno'");
        $h = 0;
        $p = 0;
        $area = null;
        while ($h < count($show)) {
            if ($area != $show[$h]['area']) {
                $_data[$p]['datos'] = '<div class="contenedor">
                    <div class="contenedor_head" style="height:22px;width: auto;">Prenomina de Area: <b>' . $show[$h]['area'] . '</b></div>
                    <table class="table table-bordered">
                          <thead class="fondoProf">
                            <tr>
                              <th>Nombre y Apellidos</th>
                              <th>Carnet Identidad</th>
                              <th>Escala</th>
                              <th>Antiguedad</th>
                              <th>Dias</th>
                              <th>Horas</th>
                              <th>Salario Basico</th>
                              <th>P.Adicional</th>
                              <th>CLA</th>
                              <th>Otros Pagos</th>
                              <th>Estimulación</th>
                              <th>Subtotal</th>
                              <th>0.09</th>
                            </tr>
                          </thead>
                          <tbody>';
                for ($i = 0; $i < count($show); $i++) {
                    if ($show[$i]['area'] == $show[$h]['area'])
                        $_data[$p]['datos'] .= '<tr><td>' . $show[$i]['trabajador'] . '</td>
                                  <td>' . $show[$i]['identidad'] . '</td>
                                  <td>' . $show[$i]['escala'] . '</td>
                                  <td>' . $show[$i]['antig'] . '</td>
                                  <td>' . $show[$i]['dias'] . '</td>
                                  <td>' . $show[$i]['horas'] . '</td>
                                  <td>' . $show[$i]['sal_basico'] . '</td>
                                  <td>' . $show[$i]['pago_adic'] . '</td>
                                  <td>' . $show[$i]['cla'] . '</td>
                                  <td>' . $show[$i]['otos'] . '</td>
                                  <td>' . $show[$i]['estimulo'] . '</td>
                                  <td>' . $show[$i]['salario_total'] . '</td>
                                  <td>' . $show[$i]['vacaciones'] . '</td></tr>';
                }

                $_data[$p]['datos'] .= '</tbody></table>';
                $agenciaid=$show[$h]['agenciaid'];
                $conf = $this->_dbase->GetTable('vistas_resumen."salario_confAgencias"');
                $show1 = $conf->GetAll("id_unidad = '$agenciaid'");
                $_data[$p]['datos'] .= '<br><table style="border: 0px;width: 100%;margin-left: 20px;margin-right: 20px;margin-top: 5px">
	                                    <tr>
                                        <td>Elaborado por: <b><i><u>'.$show1[0]['p_elab'].'</b></td>
                                        <td>Aprobado por: <b><i><u>'.$show1[0]['p_aprob'].'</b></td>
                                        </tr>
                                        <tr>
                                        <td>Revisado por: <b><i><u>'.$show1[0]['p_realiz'].'</b></td>
                                        <td></td>
                                        </tr>
                                        </table></div>';
                $area = $show[$h]['area'];
                $p++;
            }
            $h++;
        }
        if (is_null($_data)) return false;
        $result = array("success" => true, "results" => count($_data), "rows" => array_splice($_data, $_start, $_limit));
        return $result;
    }

    public function Validateinfo_inc(&$params)
    {
        return true;
    }

    public function info_inc(&$params)
    {
        $_data = array();
        $show = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $mes = $params['mes'];
        $anno = $params['anno'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_incidencias_mes');
        $show = $_table->GetAll("month = '$mes' and  year ='$anno'");
        $h = 0;
        $p = 0;
        $area = null;
        while ($h < count($show)) {
            if ($area != $show[$h]['nombre']) {
                $_data[$p]['datos'] = '<div class="contenedor" style="width: 100%">
                    <div class="contenedor_head" style="height:22px;width: auto;">Prenomina de Area: <b>' . $show[$h]['nombre'] . '</b></div>
                    <table class="table table-bordered" style=" width: 100%;">
                          <thead class="fondoProf">
                            <tr>
                              <th>Nombre y Apellidos</th>
                              <th>Carnet Identidad</th>
                              <th>Fecha</th>
                               <th>Dias afectados</th>
                              <th>CLA</th>
                              <th>Pago adicional</th>
                              <th>Antiguedad</th>
                              <th>Estimulacion</th>
                              <th>Basico</th>
                              <th>% de pago</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>';
                for ($i = 0; $i < count($show); $i++) {
                    if ($show[$i]['nombre'] == $show[$h]['nombre'])
                        $_data[$p]['datos'] .= '<tr style="text-align: center">
                                  <td>' . $show[$i]['nombre_completo'] . '</td>
                                  <td>' . $show[$i]['no_identidad'] . '</td>
                                  <td>' . $show[$i]['fecha'] . '</td>
                                  <td>' . $show[$i]['dias'] . '</td>
                                  <td>' . $show[$i]['cla'] . '</td>
                                  <td>' . $show[$i]['o_pagos'] . '</td>
                                  <td>' . $show[$i]['antiguedad'] . '</td>
                                  <td>' . $show[$i]['extim'] . '</td>
                                  <td>' . $show[$i]['basico'] . '</td>
                                  <td>' . $show[$i]['porcientos_pagos'] . '</td>

                                  <td>' . $show[$i]['total'] . '</td>
                                </tr>
                             ';
                }
                $_data[$p]['datos'] .= '</tbody></table></div>';
                $area = $show[$h]['nombre'];
                $p++;
            }
            $h++;
        }
        $result = array("success" => true, "results" => count($_data), "rows" => array_splice($_data, $_start, $_limit));
        return $result;
    }

    // ========================================================================//
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

        if ($agencia_Unidad && !$area) {
            $_data = $_table->GetRange($_limit, $_start, "agenciaid = '$agencia_Unidad'");
        } elseif ($agencia_Unidad && $area) {
            $_data = $_table->GetRange($_limit, $_start, ("agenciaid = '$agencia_Unidad' and  areaid ='$area'"));
        }

        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    // ========================================================================//
    //tomo el nombre  del trabajador
    public function ValidateTomar_trabajador(&$params)
    {

        return true;
    }

    public function Tomar_trabajador(&$params)
    {
        $id = $params['id'];
        $consulta = "SELECT   trabajador.nombre ||' '|| trabajador.apellido_1 ||' '||   trabajador.apellido_2
                        FROM   plantilla.plantilla,   plantilla.trabajador
                        WHERE   plantilla.trabajadorid = trabajador.id and plantilla.listado_cargosid='$id'";
        $consult = $this->_dbase->Select($consulta);

        $_data = $consult->GetAll();
        if (!$_data) {
            $this->RegisterError('', "El Cargo seleccionado no ha sido asignado a ningún Trabajador.");
            return false;
        }

        $result = $_data[0]['?column?'];

        return $result;
    }

    // ========================================================================//
    public function ValidateCargarAreas(&$params)
    {

        return true;
    }

    public function CargarAreas(&$params)
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

    // ========================================================================//
    //cargo las agencias
    public function ValidateCargarDatos(&$params)
    {
        return true;
    }

    public function CargarDatos(&$params)
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

    // ========================================================================//
    public function ValidateEliminar(&$params)
    {
        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('listado_cargosid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cargos a eliminar esta siendo en plantilla.");
            return false;
        }

        return true;
    }

    public function Eliminar(&$params)
    {
        $id = $params['id'];
        $result = null;
        if ($id) {
//                $tabla=$this->_dbase->GetTable("plantilla.listado_cargos");
//                $idcargo=$tabla->GetValueWhere('cargoid',"id='$id'");

            $datos = $this->_dbase->GetTable("plantilla.listado_cargos");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");

//                $datos=$this->_dbase->GetTable("plantilla.cargo");
//                $result = $datos->DeleteWhere("id = '$idcargo'");

            return true;
        } else
            return false;
    }

    // ========================================================================//
    public function ValidateAdd(&$params)
    {
        return true;
    }

    public function Add(&$params)
    {
        $data = json_decode($params['data']);
        $mes = $params['mes'];
        $anno = $params['anno'];
        $pre_nomina = $this->_dbase->GetTable("salario.pre_nomina");
        $subVaca = $this->_dbase->GetTable("salario.submayor_vacaciones");
        $Acumul = $this->_dbase->GetTable("salario.acumulado_vacaciones");
        $fecha = $anno . '-' . $mes . '-1';
        $fecha = date('Y-m-d', strtotime($fecha));
        $acumulado = $Acumul->GetAll();
        $acumulados = $this->convert_assoc_array_multiple($acumulado, 'id_contrato', 'dias', 'importe');
        for ($i = 0; $i < count($data); $i++) {
            $id_tabaj = $data[$i]->id_tabaj;
            $nombre = $data[$i]->trabajador_nombre_completo;
            $escala = $data[$i]->nombre;
            $id_prenomina = $data[$i]->id_prenomina;
            $Incremento = str_replace(',','.',$data[$i]->Incremento);
            $identidad = $data[$i]->identidad;
            $ant_dinero = str_replace(',','.',$data[$i]->ant_dinero);
            $contratoid = $data[$i]->contratoid;
            $dias_vacaciones = str_replace(',','.',$data[$i]->dias_vacaciones);
            $pent_ant = str_replace(',','.',$data[$i]->pent_ant);
            $pent_ext = str_replace(',','.',$data[$i]->pent_ext);
            $importe_vacaciones = str_replace(',','.',$data[$i]->importe_vacaciones);
            $salario = str_replace(',','.',$data[$i]->salario);
            $cla = str_replace(',','.',$data[$i]->cla);
            $pago_adicion = str_replace(',','.',$data[$i]->pago_adicion);
            $cies = str_replace(',','.',$data[$i]->cies);
            $tnc = str_replace(',','.',$data[$i]->tnc);
            $ant = str_replace(',','.',$data[$i]->ant);
            $estimulo = str_replace(',','.',$data[$i]->estimulo);
            $otos = str_replace(',','.',$data[$i]->otos);
            $horas = str_replace(',','.',$data[$i]->horas);
            $salario_total = str_replace(',','.',$data[$i]->total);
            $extiml = str_replace(',','.',$data[$i]->extiml);
            $cpl = $data[$i]->cpl;
            $check = $data[$i]->check;
            $cdt = $data[$i]->cdt;
            $check0 = $data[$i]->check0;
            $vaca_dias = round(str_replace(',','.',$data[$i]->vaca_dias), 2);
            $vaca_dine =round(str_replace(',','.',$data[$i]->vaca_dine),2);
            $check1 = $data[$i]->check1;
            $tipo_contrato = $data[$i]->tipo_contrato;
            $dias = ($horas * 24) / 190.6;
            $total = $pre_nomina->Contains(array("date_part('year'::text, pre_nomina.fecha)" => "'$anno'",
                                                 "date_part('month'::text, pre_nomina.fecha)" => "'$mes'",
                                                 "id_contrato" => "'$contratoid'"));
            if ($id_prenomina) {
                $pre_nomina->Update(array(
                        'nombre' => "'$nombre'",
                        'escala' => "'$escala'",
                        'salario_total' => "'$salario_total'",
                        'antig' => "'$ant'",
                        'dias' => "'$dias'",
                        'horas' => "'$horas'",
                        'sal_basico' => "'$salario'",
                        'pago_adic' => "'$pago_adicion'",
                        'cla' => "'$cla'",
                        'otos' => "'$otos'",
                        'estimulo' => "'$estimulo'",
                        'vacaciones' => "'$vaca_dias'",
                        'trabajador_id' => "'$id_tabaj'",
                        'identidad' => "'$identidad'",
                        'fecha' => "'$fecha'",
                        'id_contrato' => "'$contratoid'",
                        'cpl' => "'$cpl'",
                        'cdt' => "'$cdt'"
                    ), "id='$id_prenomina'
                    AND '".$mes."' = date_part('month'::text, pre_nomina.fecha)
                    AND '".$anno."' = date_part('year'::text, pre_nomina.fecha)");
                if($contratoid=='DE_capital_humano_766'){
                $datos_ant = $this->_dbase->Select("SELECT vacaciones,importe_vacaciones FROM salario.submayor_vacaciones
                                                    WHERE id_contrato = '" . $contratoid . "'
                                                    AND '".$mes."' = date_part('month'::text, submayor_vacaciones.fecha)
                                                    AND '".$anno."' = date_part('year'::text, submayor_vacaciones.fecha)");
                $antes = $datos_ant->GetAll();
                if (!is_array($antes)) {
                    $antes[0]['vacaciones'] = 0;
                    $antes[0]['importe_vacaciones'] = 0;
                    $subVaca->InsertValues(array('vacaciones' => "'$vaca_dias'",
                                                 'importe_vacaciones' => "'$vaca_dine'",
                                                 'fecha' => "'$fecha'",
                                                 'id_contrato' => "'$contratoid'"));
                }
                else {
                    $subVaca->Update(array('vacaciones' => "'$vaca_dias'",
                                            'importe_vacaciones' => "'$vaca_dine'"),
                                            "id_contrato = '" . $contratoid . "'
                                            AND '".$mes."' = date_part('month'::text, submayor_vacaciones.fecha)
                                            AND '".$anno."' = date_part('year'::text, submayor_vacaciones.fecha)");
                }
                $dias_acumulados = $acumulados[$contratoid]['dias'] + $vaca_dias - $antes[0]['vacaciones'];
                $importe_acumulados = $acumulados[$contratoid]['importe'] + $vaca_dine - $antes[0]['importe_vacaciones'];
                if (!isset($acumulados[$contratoid])){
                    $Acumul->InsertValues(array('id_contrato' => "'$contratoid'", 'dias' => "'$dias_acumulados'", 'importe' => "'$importe_acumulados'"));
                }
                else{
                    $Acumul->Update(array('dias' => "'$dias_acumulados'", 'importe' => "'$importe_acumulados'"), "id_contrato = '$contratoid'");
                }
                }

            }
            else {
                $pre_nomina->InsertValues(array(
                    'nombre' => "'$nombre'",
                    'escala' => "'$escala'",
                    'salario_total' => "'$salario_total'",
                    'antig' => "'$ant'",
                    'dias' => "'$dias'",
                    'horas' => "'$horas'",
                    'sal_basico' => "'$salario'",
                    'pago_adic' => "'$pago_adicion'",
                    'cla' => "'$cla'",
                    'otos' => "'$otos'",
                    'estimulo' => "'$estimulo'",
                    'vacaciones' => "'$vaca_dias'",
                    'trabajador_id' => "'$id_tabaj'",
                    'identidad' => "'$identidad'",
                    'fecha' => "'$fecha'",
                    'id_contrato' => "'$contratoid'",
                    'cdt' => "'$cdt'",
                    'cpl' => "'$cpl'",
                ));
                if($contratoid=='DE_capital_humano_766'){
                $datos_ant = $this->_dbase->Select("SELECT vacaciones,importe_vacaciones FROM salario.submayor_vacaciones
                                                    WHERE id_contrato = '" . $contratoid . "'
                                                    AND '".$mes."' = date_part('month'::text, submayor_vacaciones.fecha)
                                                    AND '".$anno."' = date_part('year'::text, submayor_vacaciones.fecha)");
                $antes = $datos_ant->GetAll();
                if (!is_array($antes)) {
                    $antes[0]['vacaciones'] = 0;
                    $antes[0]['importe_vacaciones'] = 0;
                    $subVaca->InsertValues(array('vacaciones' => "'$vaca_dias'",
                        'importe_vacaciones' => "'$vaca_dine'",
                        'fecha' => "'$fecha'",
                        'id_contrato' => "'$contratoid'"));
                }
                else {
                    $subVaca->Update(array('vacaciones' => "'$vaca_dias'",
                            'importe_vacaciones' => "'$vaca_dine'"),
                        "id_contrato = '" . $contratoid . "'
                                            AND '".$mes."' = date_part('month'::text, submayor_vacaciones.fecha)
                                            AND '".$anno."' = date_part('year'::text, submayor_vacaciones.fecha)");
                }
                $dias_acumulados = $acumulados[$contratoid]['dias'] + $vaca_dias - $antes[0]['vacaciones'];
                $importe_acumulados = $acumulados[$contratoid]['importe'] + $vaca_dine - $antes[0]['importe_vacaciones'];
                if (!isset($acumulados[$contratoid])){
                    $Acumul->InsertValues(array('id_contrato' => "'$contratoid'", 'dias' => "'$dias_acumulados'", 'importe' => "'$importe_acumulados'"));
                }
                else{
                    $Acumul->Update(array('dias' => "'$dias_acumulados'", 'importe' => "'$importe_acumulados'"), "id_contrato = '$contratoid'");
                }
                }
            }

        }
        return true;
    }

    public function ValidateBuscar2(&$params)
    {
        return true;
    }

    public function Buscar2(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_prenomina_resumen');
        $show = $_table->Contains(array("year" => "'$anno'", "month" => "'$mes'"));
        $result = array('success' => true, 'results' => $show);
        return $result;
    }

    // ========================================================================//
    public function ValidateAdd_inc(&$params)
    {
        return true;
    }

    public function Add_inc(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $contratoid = $params['contratoid'];
        $fecha = $anno . '-' . $mes . '-1';
        $fecha = date('Y-m-d', strtotime($fecha));
        $data = json_decode($params['data']);
        $pre_nomina = $this->_dbase->GetTable("salario.pre_nomina_inciden");
        $sql = "SELECT
                count (pre_nomina_inciden.id)
        FROM
                salario.pre_nomina_inciden
        where
                pre_nomina_inciden.contrato_id= '$contratoid'
                AND '$mes' = date_part('month'::text, pre_nomina_inciden.fecha)
                AND '$anno' = date_part('year'::text, pre_nomina_inciden.fecha)";
        $datos = pg_query($sql);
        $arr = pg_fetch_all($datos);
        $total = $arr[0]['count'];
        if ($total > 0) {
            $sql = "DELETE  FROM  salario.pre_nomina_inciden
        where
                pre_nomina_inciden.contrato_id= '$contratoid'
                AND '$mes' = date_part('month'::text, pre_nomina_inciden.fecha)
                AND '$anno' = date_part('year'::text, pre_nomina_inciden.fecha)
        ";
           //$datos = pg_query($sql);
        }
        for ($i = 0; $i < count($data); $i++) {
            $id = $data[$i]->id;
            $id_prenom_inc = $data[$i]->id_prenom_inc;
            $dias = $data[$i]->dias;
            $porcien = $data[$i]->porciento_a_pagar;
            $cla = $data[$i]->cla;
            $otros_pagos = $data[$i]->pagos;
            $antiguedad_new = $data[$i]->antiguedad_new;
            $estimulacion_new = $data[$i]->estimulacion_new;
            $basao_promedio_anterior_new = $data[$i]->basao_promedio_anterior_new;
            $Sub_Total =$data[$i]->Sub_Total;
            $Sub_Total = str_replace(',','.',$Sub_Total);

            if (isset($contratoid) && ($id_prenom_inc==''||$id_prenom_inc==null)) {
                $pre_nomina->InsertValues(array(
                    'contrato_id' => "'$contratoid'",
                    'fecha' => "'$fecha'",
                    'dias' => "'$dias'",
                    'cla' => "'$cla'",
                    'o_pagos' => "'$otros_pagos'",
                    'antiguedad' => "'$antiguedad_new'",
                    'extim' => "'$estimulacion_new'",
                    'basico' => "'$basao_promedio_anterior_new'",
                    'porcientos_pagos' => "'$porcien'",
                    'total' => "'$Sub_Total'",
                    'incid_id' => "'$id'"));
                if ($data[$i]->id == 'DE_capital_humano_12362') {
                    $vacaciones = $this->_dbase->GetTable("salario.submayor_vacaciones");
                    $result = $vacaciones->GetValueWhere('id_contrato,extraido,importe_extraido', "id_contrato = '" . $contratoid . "' AND date_part('month'::text, now()::date) = date_part('month'::text, submayor_vacaciones.fecha)
                    AND date_part('year'::text, now()) = date_part('year'::text, submayor_vacaciones.fecha)");
                    $acumuladas = $this->_dbase->GetTable("salario.acumulado_vacaciones");
                    $result2 = $acumuladas->GetValueWhere('id_contrato, dias, importe', "id_contrato = '" . $contratoid . "'");
                    $importe_total = 0;
                    if ($result2 != null) {
                        $importe_total = ($dias / $result2['dias']) * $result2['importe'];
                    }
                    if ($result == null) {
                        $vacaciones->InsertValues(array('fecha' => "'$fecha'", 'id_contrato' => "'$contratoid'", 'extraido' => $dias, 'importe_extraido' => "'$importe_total'"));
                        $acumuladas->Update(array('extraido' => "'$dias'", 'importe_extraido' => "'$importe_total'"), "id_contrato = '" . $contratoid . "'");
                    } else {
                        $vacaciones->Update(array('extraido' => "'" . $dias . "'", 'importe_extraido' => "'$importe_total'"), "id_contrato = '" . $contratoid . "' AND date_part('month'::text, now()::date) = date_part('month'::text, submayor_vacaciones.fecha)
                            AND date_part('year'::text, now()) = date_part('year'::text, submayor_vacaciones.fecha)");
                        $acumuladas->Update(array('dias' => "'" . ($result2['dias'] + $result['extraido'] - $dias) . "'", 'importe' => "'" . ($result2['importe'] + $result['importe_extraido'] - $importe_total) . "'"), "id_contrato = '" . $contratoid . "'");
                    }
                }
            }
           else  if ($id_prenom_inc != '' && $id_prenom_inc != null){
                $pre_nomina->Update(array(
                    'contrato_id' => "'$contratoid'",
                    'fecha' => "'$fecha'",
                    'dias' => "'$dias'",
                    'cla' => "'$cla'",
                    'o_pagos' => "'$otros_pagos'",
                    'antiguedad' => "'$antiguedad_new'",
                    'extim' => "'$estimulacion_new'",
                    'basico' => "'$basao_promedio_anterior_new'",
                    'porcientos_pagos' => "'$porcien'",
                    'total' => "'$Sub_Total'",
                    'incid_id' => "'$id'"),"id='$id_prenom_inc'");
                if ($data[$i]->id == 'DE_capital_humano_12362') {
                    $vacaciones = $this->_dbase->GetTable("salario.submayor_vacaciones");
                    $result = $vacaciones->GetValueWhere('id_contrato,extraido,importe_extraido', "id_contrato = '" . $contratoid . "' AND date_part('month'::text, now()::date) = date_part('month'::text, submayor_vacaciones.fecha)
                    AND date_part('year'::text, now()) = date_part('year'::text, submayor_vacaciones.fecha)");
                    $acumuladas = $this->_dbase->GetTable("salario.acumulado_vacaciones");
                    $result2 = $acumuladas->GetValueWhere('id_contrato, dias, importe', "id_contrato = '" . $contratoid . "'");
                    $importe_total = 0;
                    if ($result2 != null) {
                        $importe_total = ($dias / $result2['dias']) * $result2['importe'];
                    }
                    if ($result == null) {
                        $vacaciones->InsertValues(array('fecha' => "'$fecha'", 'id_contrato' => "'$contratoid'", 'extraido' => $dias, 'importe_extraido' => "'$importe_total'"));
                        $acumuladas->Update(array('extraido' => "'$dias'", 'importe_extraido' => "'$importe_total'"), "id_contrato = '" . $contratoid . "'");
                    } else {
                        $vacaciones->Update(array('extraido' => "'" . $dias . "'", 'importe_extraido' => "'$importe_total'"), "id_contrato = '" . $contratoid . "' AND date_part('month'::text, now()::date) = date_part('month'::text, submayor_vacaciones.fecha)
                            AND date_part('year'::text, now()) = date_part('year'::text, submayor_vacaciones.fecha)");
                        $acumuladas->Update(array('dias' => "'" . ($result2['dias'] + $result['extraido'] - $dias) . "'", 'importe' => "'" . ($result2['importe'] + $result['importe_extraido'] - $importe_total) . "'"), "id_contrato = '" . $contratoid . "'");
                    }
                }
            }
        }
        return true;
    }

    public function ValidateBuscar(&$params)
    {
        return true;
    }

    public function Buscar(&$params)
    {
        $contratoid = $params['contratoid'];
        $sql = "SELECT
                count (pre_nomina_inciden.id)
        FROM
                salario.pre_nomina_inciden
        where
                pre_nomina_inciden.contrato_id= '$contratoid'
                AND date_part('month'::text, now()::date) = date_part('month'::text, pre_nomina_inciden.fecha)
                AND date_part('year'::text, now()) = date_part('year'::text, pre_nomina_inciden.fecha)
        ";
        $datos = pg_query($sql);
        $arr = pg_fetch_all($datos);
        $total = $arr[0]['count'];
        // echo json_encode($total);
        $result = array('success' => true, 'results' => $total);
        return $result;
    }

    // ========================================================================//
    public function Validatecobro(&$params)
    {
        return true;
    }

    public function cobro(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = 25;
        $_table = $this->_dbase->GetTable('vistas_resumen.salarop_cobro_prenomina');
        $_data = $_table->GetRange($_limit, $_start, "mes='$mes' and anno='$anno'");
        if (is_null($_data)) return false;
        $_count = $_table->GetRowsCount("mes='$mes' and anno='$anno'");
        if ($_count == -1) return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;

    }

    public function ValidateincView(&$params)
    {
        return true;
    }

    public function incView(&$params)
    {
        $id_cont = $params['id_cont'];
        $mes = $params['mes'];
        $anno = $params['anno'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = 25;
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_inc_prenomina');
        $_data = $_table->GetRange($_limit, $_start, "mes='$mes' and anno='$anno' and contrato_id='$id_cont'");
        if (is_null($_data)) return false;
        $_count = $_table->GetRowsCount("mes='$mes' and anno='$anno' and contrato_id='$id_cont'");
        if ($_count == -1) return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;

    }

};
?>
