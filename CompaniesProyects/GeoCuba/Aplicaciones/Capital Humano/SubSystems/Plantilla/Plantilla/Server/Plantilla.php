<?PHP

class Plantilla extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ch');
    }

    // ========================================================================//
    //cargo los contratos
    public function ValidateCargarAnnos(&$params)
    {
        return true;
    }
    public function CargarAnnos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.contrato_tipo');
        $_data = $_table->GetRange($_limit, $_start,"contrato_tipo.activo = true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarFpago(&$params)
    {
        return true;
    }
    public function CargarFpago(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.forma_pago');
        $_data = $_table->GetRange($_limit, $_start,"forma_pago.activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarSpago(&$params)
    {
        return true;
    }
    public function CargarSpago(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.sistema_pago');
        $_data = $_table->GetRange($_limit, $_start,"sistema_pago.activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarHtrabajo(&$params)
    {
        return true;
    }
    public function CargarHtrabajo(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.horario_trabajo');
        $_data = $_table->GetRange($_limit, $_start,"horario_trabajo.activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarAgencia(&$params)
    {
        return true;
    }
    public function CargarAgencia(&$params)
    {
        $_data = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('nomencladores.agencia');
        $_data = $_table->GetAll("agencia.activo=true");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

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

    public function ValidateCargarAreasxCargo(&$params)
    {

        return true;
    }
    public function CargarAreasxCargo(&$params)
    {
        $_data = array();
        $_count = 0;
        $value = $params['value'];
        $consulta = "SELECT
                        cargo.nombre,
                        listado_cargos.id AS id
                    FROM
                        plantilla.listado_cargos,
                        plantilla.cargo
                    WHERE
                        cargo.id = listado_cargos.cargoid
                        AND listado_cargos.existencia >= 1
                        AND listado_cargos.areaid ='" . $value . "' ";

        $consult = $this->_dbase->Select($consulta);
        $_data = $consult->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

//cargo los  trabajadores
    public function ValidateCargarcontratos(&$params)
    {
        return true;
    }
    public function Cargarcontratos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.trabajador');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount("activo='true'");
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

//cargo los listados de contrato
    public function ValidateCargarniveles(&$params)
    {
        return true;
    }
    public function Cargarniveles(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.listado_de_cargos');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos(&$params)
    {

        return true;
    }
    public function CargarDatos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_vista');
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
    public function ValidateEliminar(&$params)
    {

        $trabajadorid = $params['trabajadorid'];
        $datos = $this->_dbase->GetTable("pago.trabajador_proyecto");
        $count = $datos->Contains(array('trabajadorid' => "'$trabajadorid'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "Este trabajador esta en un proyecto. Eliminelo antes de dar baja.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params)
    {
        $id = $params['id'];
        $result = null;
        $trabajadorid = $params['trabajadorid'];
        $lcargo = $params['value'];

        $data = $this->_dbase->GetTable("plantilla.listado_cargos");
        $datas = $data->Update(array('existencia' => 'existencia + 1'),"id = '$lcargo'");

        $userG=$this->_dbase->GetTable("pago.contrato");
        $userG->Update(array('activo' => "'false'"),"trabajadorid = '$trabajadorid'");

        $usercontrato=$this->_dbase->GetTable("pago.contrato");
        $valor=$usercontrato->Contains(array('trabajadorid' => "'$trabajadorid'",'activo'=>"'true'"));
        if ($valor<2){
        $userGeneral=$this->_dbase->GetTable("plantilla.trabajador");
        $userGeneral->Update(array('activo' => "'false'"),"id = '$trabajadorid'");
        }
        if ($id) {
            $fecha=date("Y-m-d");
            $datos = $this->_dbase->GetTable("plantilla.plantilla");
            $result = $datos->Update(array('activo' => "'false'",'fecha_baja'=>"'$fecha'"),"id = '$id'");
            return true;
        } else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params)
    {
        if (!isset($params['combo_value_id']) && !isset($params['combo_value_id']) &&
            !isset($params['combo_contrato_value_id'])&& !isset($params['combo_nivel_value_id'])
            && !isset($params['combo_clasif_value_id']) && !isset($params['combo_escala_value_id'])
            && !isset($params['combo_Forma_value'])&& !isset($params['combo_Horario_value'])
            && !isset($params['combo_Sistema_value'])
        ){
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $forma = $params['combo_Forma_value'];
        $horario = $params['combo_Horario_value'];
        $Sistema = $params['combo_Sistema_value'];

        $contrato = $params['combo_value_id'];
        $trabajador = $params['combo_contrato_value'];
        $lcargo = $params['combo_nivel_value'];

        $_valid = Validator::CheckStringSize($contrato, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Contrato incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($trabajador, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Trabajador incorrecto");
            return false;
        }
        $_valid = Validator::CheckStringSize($lcargo, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Tipo de Cargo incorrecto");
            return false;
        }

        $_valid = Validator::CheckStringSize($forma, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Contrato incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($horario, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Trabajador incorrecto");
            return false;
        }
        $_valid = Validator::CheckStringSize($Sistema, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Tipo de Cargo incorrecto");
            return false;
        }

        //Validator::ToCleanSQL($nombre);
        //$params['new_nombre'] = $nombre;
       /* $actividades = $this->_dbase->GetTable('plantilla.plantilla');
        $count = $actividades->Contains(array('trabajadorid' => "'$trabajador'"));
        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Trabajador a emplantillar ya tiene su Plantilla.");
            return false;
        }*/
        return true;
    }
    public function Add(&$params)
    {
        $lcargo = $params['combo_nivel_value'];
        $contrato = $params['combo_value_id'];
        $trabajador = $params['combo_contrato_value'];
        $forma = $params['combo_Forma_value'];
        $horario = $params['combo_Horario_value'];
        $Sistema = $params['combo_Sistema_value'];
        $area = $params['combo_nivel_value_area'];
        $fin = $params['fecha_fin'];
        $inicio = $params['fecha_inicio'];
        $inicio1 = $inicio;
        $cuadro = $params['cuadro'];
        $reserva= $params['reserva'];
        $dir= $params['dir'];
        $Lcargos = $this->_dbase->GetTable("plantilla.listado_cargos");
        $datas = $Lcargos->Update(array('existencia' => 'existencia - 1'),"id = '$lcargo'");
        $directorG='';
        $directorU='';
        $directorA='';
        $resrva1='';
        $cuadro1='';
        if($cuadro=='1')
        {
         $cuadro1='true';
        }
        else $cuadro1='false';

        if($reserva=='2')
        {
            $resrva1='true';
        }
        else{
            $resrva1='false';
        }

        if($dir==1){
            $directorG='true';
            $directorU='false';
            $directorA='false';
        }
        else if($dir==2){
            $directorG='false';
            $directorU='true';
            $directorA='false';
        }
        else if($dir==3){
            $directorG='false';
            $directorU='false';
            $directorA='true';
        }
        else{$directorG='false';
            $directorU='false';
            $directorA='false';
        }

        if($fin==null){
           $indefinido = "01/01/0001";
           $datacontrato = $this->_dbase->GetTable("pago.contrato");
           $data = $datacontrato->InsertValues(array('trabajadorid' => "'$trabajador'",'fecha_final' => "'$indefinido'",'fecha_inicio' => "'$inicio'",'contrato_tipoid' => "'$contrato'"));
           $data1= $datacontrato->GetAll("trabajadorid= '$trabajador' AND contrato_tipoid= '$contrato' and fecha_inicio ='$inicio'::TIMESTAMP");
           $id_contrato = $data1[0]['id'];
         //  print_r($id_contrato);
           $datos = $this->_dbase->GetTable("plantilla.plantilla");
           return $data = $datos->InsertValues(array('resrva' => "'$resrva1'",'cuadro' => "'$cuadro1'",'director_general' => "'$directorG'",
                                                    'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",'contratoid' => "'$id_contrato'",
                                                    'listado_cargosid' => "'$lcargo'",'htrabajo_id' => "'$horario'",'fpago_id' => "'$forma'",'spago_id' => "'$Sistema'"));
          }
       else{
        $datacontrato = $this->_dbase->GetTable("pago.contrato");
        $data = $datacontrato->InsertValues(array('trabajadorid' => "'$trabajador'",'fecha_final' => "'$fin'",'fecha_inicio' => "'$inicio'",
                                                   'contrato_tipoid' => "'$contrato'"));
        $data1= $datacontrato->GetAll("trabajadorid= '$trabajador' AND contrato_tipoid= '$contrato' and fecha_inicio ='$inicio'::TIMESTAMP");
        $id_contrato = $data1[0]['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        return $data = $datos->InsertValues(array('resrva' => "'$resrva1'",'cuadro' => "'$cuadro1'",'director_general' => "'$directorG'",
                                                  'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",'contratoid' => "'$id_contrato'",
                                                  'listado_cargosid' => "'$lcargo'",'htrabajo_id' => "'$horario'",'fpago_id' => "'$forma'",'spago_id' => "'$Sistema'"));

        }

    }
    // ========================================================================//
    public function ValidateModif(&$params)
    {

        return true;

    }
    public function Modif(&$params)
    {
        $agencias= $params['agencias'];
        $dir= $params['dir'];
        $area= $params['area'];
        $cargo= $params['cargo'];
        $contrato= $params['contrato'];
        $old_cargo_id= $params['old_cargo_id'];
        $formaPago= $params['formaPago'];
        $hrarioTrabajo= $params['hrarioTrabajo'];
        $sistemaPago= $params['sistemaPago'];
        $plantilla_id= $params['id'];
        $trbajador_id=$params['trbajador_id'];
        $fin = $params['fecha_fin'];
        $inicio = $params['fecha_inicio'];
        $contrato_id= $params['contrato_id'];
        $contrato_tabla_id= $params['contrato_tabla_id'];
        $cuadro = $params['cuadro'];
        $reserva= $params['reserva'];

        $anno=Date("Y");
        $mes=Date("m");
        $dia=Date("d");
        $final= $dia."/".$mes."/".$anno;

        $conrato=$this->_dbase->GetTable("pago.Contrato");
        $plantilla=$this->_dbase->GetTable("plantilla.plantilla");

        $directorG='';
        $directorU='';
        $directorA='';
        if($dir==1){
            $directorG='true';
            $directorU='false';
            $directorA='false';
        }
        else if($dir==2){
            $directorG='false';
            $directorU='true';
            $directorA='false';
        }
        else if($dir==3){
            $directorG='false';
            $directorU='false';
            $directorA='true';
        }
        else{$directorG='false';
            $directorU='false';
            $directorA='false'; }

        if($cuadro=='1')
        {
            $cuadro1='true';
        }
        else
            $cuadro1='false';

        if($reserva=='2')
        {
            $resrva1='true';
        }
        else{
            $resrva1='false';
        }

        // 'director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",



        if($old_cargo_id != $cargo)
        {
            $Lcargos = $this->_dbase->GetTable("plantilla.listado_cargos");
            $datas = $Lcargos->Update(array('existencia' => 'existencia + 1'),"id = '$old_cargo_id'");
            $datos = $Lcargos->Update(array('existencia' => 'existencia - 1'),"id = '$cargo'");
        }
        if ($contrato_id == $contrato){
            if($fin==null){
                $indefinido = "01/01/0001";
                $contraosss = $conrato->Update(array( 'fecha_final' => "'$indefinido'",'fecha_inicio' => "'$inicio'",'contrato_tipoid' => "'$contrato'"),"trabajadorid = '$trbajador_id'");
                $Plantillaas= $plantilla->Update(array( 'resrva' => "'$resrva1'",'cuadro' => "'$cuadro1'",'director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",'contratoid' => "'$contrato_tabla_id'",'listado_cargosid' => "'$cargo'",'fpago_id' => "'$formaPago'",'spago_id' => "'$sistemaPago'",'htrabajo_id' => "'$hrarioTrabajo'"),"id = '$plantilla_id'");
            }
            else{
              $contraosss = $conrato->Update(array( 'fecha_final' => "'$fin '",'fecha_inicio' => "'$inicio'",'contrato_tipoid' => "'$contrato'"),"trabajadorid = '$trbajador_id'");
              $Plantillaas= $plantilla->Update(array('resrva' => "'$resrva1'",'cuadro' => "'$cuadro1'",'director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'", 'contratoid' => "'$contrato_tabla_id'",'listado_cargosid' => "'$cargo'",'fpago_id' => "'$formaPago'",'spago_id' => "'$sistemaPago'",'htrabajo_id' => "'$hrarioTrabajo'"),"id = '$plantilla_id'");
            }

        }
        else
        {
           if($fin==null){
                $indefinido = "01/01/0001";
                $contraosss = $conrato->Update(array('fecha_final' => "'$final'",'activo' => "'false'"),"trabajadorid = '$trbajador_id'");
                $data = $conrato->InsertValues(array('trabajadorid' => "'$trbajador_id'",'fecha_final' => "'$indefinido'",'fecha_inicio' => "'$inicio'",'contrato_tipoid' => "'$contrato'"));
                $data1= $conrato->GetAll("trabajadorid= '$trbajador_id' AND contrato_tipoid= '$contrato' AND fecha_final='$fin' AND  fecha_inicio='$inicio'");
                $id_contrato = $data1[0]['id'];
                $Plantillaas= $plantilla->Update(array( 'director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",
                                                        'contratoid' => "'$id_contrato'",'listado_cargosid' => "'$cargo'",'fpago_id' => "'$formaPago'",
                                                        'spago_id' => "'$sistemaPago'",'htrabajo_id' => "'$hrarioTrabajo'"),"id = '$plantilla_id'");
                if($contraosss && $data && $data1 && $id_contrato && $Plantillaas)
                {return true;}
                else
                {return false;}
            }
            else{
                $contraosss = $conrato->Update(array('fecha_final' => "'$final'",'activo' => "'false'"),"trabajadorid = '$trbajador_id'");
                $data = $conrato->InsertValues(array('trabajadorid' => "'$trbajador_id'",'fecha_final' => "'$fin'",'fecha_inicio' => "'$inicio'",'contrato_tipoid' => "'$contrato'"));
                $data1= $conrato->GetAll("trabajadorid= '$trbajador_id' AND contrato_tipoid= '$contrato' AND fecha_final='$fin' AND  fecha_inicio='$inicio'");
                $id_contrato = $data1[0]['id'];
                $Plantillaas= $plantilla->Update(array('director_general' => "'$directorG'",'director_unidad' => "'$directorU'",
                                                        'director_area' => "'$directorA'", 'contratoid' => "'$id_contrato'",'listado_cargosid' => "'$cargo'",
                                                        'fpago_id' => "'$formaPago'",'spago_id' => "'$sistemaPago'",'htrabajo_id' => "'$hrarioTrabajo'"),
                                                        "id = '$plantilla_id'");
                if($contraosss && $data && $data1&& $id_contrato && $Plantillaas)
                {return true;}
                else
                {return false;}
            }
        }
    }

    public function ValidatePrintFicha(&$params){return true;}
    public function PrintFicha(&$params){
        $id= $params['id'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_ficha');
        $_data = $_table->GetAll("id_trab = '$id'");
        $foto=$_data[0]['foto'];
        $result = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #2778dc;
                                                border-right:1px solid #2778dc;
                                                color: #FFFFFF;
                                                content: 'Empresa Geocuba - Ficha del Trabajador';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 2px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor1:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Personales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor1 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }

                                            .contenedor2:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Integracion Politca y Grado Militar';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor2 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }

                                            .contenedor3:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Profesionales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor3 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }

                                            .contenedor4:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Talla Personal';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor4 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 19px 14px;
                                                position: relative;
                                            }
                                            table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head>";
        $result.="<body style='width: 85%;margin-right: 5%;margin-left: 5%;'><div class='contenedor'>";
        $result .=" <div class='contenedor1'>";
        if($foto == '' || $foto== null)
            $result .= '<img style="float: right" src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/>';
        else
            $result .= '<img style="float: right" width="70px" height="70px" src="data:image/png;base64,'.$foto.'"/>';
        $result .="
                    <b>Codigo No</b>: " .$_data[0]['codigo']." <b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CI</b>: " .$_data[0]['no_identidad']." <br>
                    <b>Nombre y Apellidos</b>: " .$_data[0]['nombre_completo']."&nbsp;&nbsp;&nbsp;<br>
                    <b>Fecha de Nac </b>: " .$_data[0]['fecha_nacimiento']."  &nbsp;&nbsp;&nbsp;<br>
                    <b>Nombre de la Madre </b>:  " .$_data[0]['nombre_madre']." &nbsp;&nbsp;&nbsp; <br><b>Nombre de Padre </b>: " .$_data[0]['nombre_padre']."&nbsp;&nbsp;&nbsp;<br><b>Telefono </b>:  " .$_data[0]['telefono']." <br>
                     <b>Estatura(cm) </b>:  " .$_data[0]['estatura']." &nbsp;&nbsp;&nbsp;<b>Peso(KG) </b>:  " .$_data[0]['peso']." &nbsp;&nbsp;&nbsp;<b>Sexo  </b>: " .$_data[0]['sexo']."  &nbsp;&nbsp;&nbsp;<b>Raza </b>: " .$_data[0]['piel']."  <br>
                    <b>Direción </b>:  " .$_data[0]['direccion']." <br>
                    <b>Tipo de contrato  </b>:  " .$_data[0]['contrato_tipo']." <br>
                    </div>
                    <div class='contenedor2'>
                    <b>Integración </b>: " .$_data[0]['integracion']."  <br>
                    <b>Fuente de Procedencia </b>:  " .$_data[0]['lugar_procedencia']." <br>
                    <b>Ubicacion Defensa</b>:  " .$_data[0]['ubicacion_exe']." <br>
                    <b>Ubicacion Defensa</b>:  " .$_data[0]['reg_militar']." <br>
                    <b>Grado Militar  </b>:  " .$_data[0]['gradoMil']." <br>
                    <b>Cargo Militar  </b>:  " .$_data[0]['cargoMil']." <br>
                    </div>
                    <div class='contenedor3'>
                    <b>Nivel Cultural  </b>:  " .$_data[0]['nivel_cultural']." <br>
                    <b>Lugar de Graduado </b>:  " .$_data[0]['lugar_de_grad']." <br>
                    <b>Fecha de Graduado  </b>:  " .$_data[0]['fecha_graduado']." <br>
                    <b>Especialidad </b>:  " .$_data[0]['especialidad']." <br>
                    <b>Pais de Graduado</b>:  " .$_data[0]['pais']." <br>
                    <b>Categoria Científica  </b>:  " .$_data[0]['catCient']." <br>
                    <b>Categoria Docente  </b>:  " .$_data[0]['categoriaDoc']." <br>
                    <b>Grado Científico  </b>:  " .$_data[0]['gradoCient']." <br>
                    </div>
                    <div class='contenedor4'>
                    &nbsp;&nbsp;<b>Camisa(Blusa)  </b>:  " .$_data[0]['camisa_blusa']." <br>
                    &nbsp;&nbsp;<b>Pantalon(Saya)  </b>:  " .$_data[0]['pantalo_salla']." <br>
                    &nbsp;&nbsp;<b>Zapatos  </b>:  " .$_data[0]['zapato']." <br>
                    </div>

                    </div>
                </body>
                <html>
                ";
        return $result;
    }

    public function ValidatePrintContrato(&$params){return true;}
    public function PrintContrato(&$params){
        $id= $params['id'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_ficha');
        $_data = $_table->GetAll("id_trab = '$id'");
        $foto=$_data[0]['foto'];
        $result = "<html>
                        <head>
                             <style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #2778dc;
                                                border-right:1px solid #2778dc;
                                                color: #FFFFFF;
                                                content: 'Empresa Geocuba - Contrato del Trabajador';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 2px 0;
                                                padding: 39px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor1:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Personales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor1 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor2:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Integracion Politca y Grado Militar';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor2 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor3:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Profesionales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor3 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor4:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Talla Personal';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor4 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 19px 14px;
                                                position: relative;
                                            }
                                            table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title>
                        </head>
                        <body style='width: 94%;margin-right: 2%;margin-left: 2%;'>
                    <div class='contenedor'>";
//        if($foto == '' || $foto== null){$result .= '<img style="float: right" src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/>';}
//        else{$result .= '<img style="float: right ;border:2px" width="70px" height="70px" src="data:image/png;base64,'.$foto.'"/>';}
        $total=($_data[0]['pago_adicion']+$_data[0]['salario']);
        $inicio=$_data[0]['inicio'];
        $fin=$_data[0]['fecha_final'];
        if ($fin=='0001-01-01 00:00:00'){$fin = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';}
        $result .="
                Al efecto de suscribir el presente Contrato de Trabajo, el que tiene toda la fuerza legal que en derecho se requiere, comparecen:<br>
                DE UNA PARTE: ________________________________________ que ocupa el cargo
                de ____________________________________________________<br> a nombre y en representacióna
                de &nbsp; <u><i>" .$_data[0]['empresa']."</u></i> &nbsp;a los efectos del presente documento, <br> se denominará la ADMINISTRACIÓN.
                DE OTRA PARTE:&nbsp; <u><i> " .$_data[0]['nombre_completo']."&nbsp; </u></i> quien concurre por su propio derecho y cuyos datos personales son:<br>
                No. CARNET DE IDENTIDAD:&nbsp; <u><i> " .$_data[0]['no_identidad']."&nbsp;</u></i> FECHA DE NACIMIENTO: &nbsp; <u><i> " .$_data[0]['fecha_nacimiento']."&nbsp;</u></i> <br>
                PROFESIÓN U OFICIO: &nbsp;<u><i> " .$_data[0]['especialidad']."&nbsp;</u></i> <br>
                DIRECCIÓN PARTICULAR:&nbsp; <u><i> " .$_data[0]['direccion']." &nbsp;</u></i><br>
                PRIMERO: Suscribir el presente Contrato: <u><i> " .$_data[0]['contrato_tipo']." &nbsp;</u></i><br>
                con una duración de desde &nbsp; <u><i> " .$inicio." </u></i> &nbsp; hasta &nbsp; <u><i> " .$fin." </u></i><br>
                Cuya jornada laboral será de 44 horas semanales y un horario de:&nbsp; <u><i> " .$_data[0]['horario']."&nbsp; </u></i><br>

                SEGUNDO: EL TRABAJADOR prestará sus servicios en la Unidad &nbsp;<u><i> " .$_data[0]['agencia']." &nbsp;</u></i><br>
                bajo los siguientes principios:<br>
                Cargo para el que se contrata &nbsp; <u><i> " .$_data[0]['cargo']." &nbsp;</u></i><br>
                Grupo profesional: &nbsp; <u><i> " .$_data[0]['escala']."&nbsp; </u></i>   Salario Escala: &nbsp; <u><i> " .$_data[0]['salario']." &nbsp;</u></i>  Pago Adicional: &nbsp; <u><i> " .$_data[0]['pago_adicion']." &nbsp;</u></i>   Total: &nbsp; <u><i> " .$total."&nbsp; </u></i><br>
                Perteneciente a la categoría laboral de &nbsp;<u><i> " .$_data[0]['cat_ocupa']."&nbsp; </u></i><br>
                Cuya función principal aparece en el Profesiograma que se Anexa.<br>
                Y cuya forma de pago es: &nbsp;<u><i> " .$_data[0]['for_pag']."&nbsp; </u></i><br>

                EL TRABAJADOR  durante  el  desempeño de su  cargo disfrutará  de  los  beneficios  de  las  vacaciones<br>
                anuales  pagadas y de la seguridad  social,  siempre  que  en  ambos  casos  se  cumplan  los  requisitos <br>
                establecidos por  las  disposiciones vigentes sobre estas materias y tendrá los demás derechos laborales<br>
                enmarcados en la legislación vigente.<br>
                EL  TRABAJADOR  podrá realizar otras  funciones  que  le  puedan  ser  asignadas  dentro  de  su  jornada<br>
                laboral, siempre que por sus conocimientos pueda desarrollar o se le capacite para ello.<br>
                TERCERO: Para ser trabajador de esta entidad y para el desempeño de las funciones que por el presente<br>
                Contrato se establecen, el TRABAJADOR está en la obligación de cumplir las siguientes condiciones de Idoneidad:<br>
                GENERALES<br>
                _ Poseer  y mantener las condiciones  políticas  y  morales  acordes  con  los  principios  de  la  revolución.<br>
                _ Demostrar  realmente la calificación necesaria para el desarrollo de  la  función por  la  cual  fue  contratado<br>
                _ Cumplir con alta responsabilidad todas las tareas que se le asignen, ser laborioso, eficiente y disciplinado<br>
                _ Cumplir con las normas del Secreto Militar<br>
                _ Cumplir con las órdenes y demás disposiciones generales que rigen la vida en las FAR<br><br>
                </div><br><br><br><br><div class='contenedor'>
                _ Realizar otras labores que resulten necesarias para la entidad, siempre que por sus conocimientos pueda realizar o se pueda capacitar para ello <br>
                PARTICULARES<br>
                Aparecen contenidas en el Profesiograma que se anexa a este Contrato.<br>
                Convenio de Trabajo, el Reglamento Disciplinario de las FAR e interno de la calidad, asi como  las  demás<br>
                ESPECIFICAS<br>
                Aparecen contenidas en el Profesiograma que se anexa a este Contrato.<br>
                CUARTO: EL TRABAJADOR ha sido adiestrado y ha demostrado en la práctica las reglas de <br>
                Protección e Higiene para el puesto que se especifica<br>
                QUINTO: ELTRABAJADOR se compromete a cumplir con el contenido de trabajo , a obedeser las<br>
                órdenes que le sean impartidas por los superiores que están debidamente facultados  para ello,  acatar  el<br>
                disposiciones vigentes que rijan la vida laboral<br>
                SEXTO: La  administración  se  compromete  a  abonar su salario de la forma  establecida  en  el  presente<br>
                Contrato  y  a  cumplir con las normas de  Protección  e  Higiene,  Seguridad  Social,  vacaciones  anuales<br>
                pagadas y las demás disposiciones vigentes en material laboral<br>
                SEPTIMO: La administarción está facultada para trasladar provicionalmente  al  trabajador  a  otra  ocupación<br>
                distinta a la que es objeto de su contrato, que está apto para desempeñar sólo en los casos  que  prevé la<br>
                legislación vigente en material laboral<br>
                OCTAVO: Las causas de suspensión y terminación del presente  ccontrato  quedan  sujetas  a  lo dispuesto<br>
                en la legislación vigente en materia laboral<br>
                NOVENO: A la terminación del contrato el trabajador tiene  derecho  a  recibir  la renumeración  proporcional<br>
                al descanso no disfrutado, correspondiente al último periodo anual<br>
                DECIMO: Ambas partes convienen en lo expresado en el presente documento,  comprometiéndose  en  su más estricto cumplimiento<br>
                Y para que así conste se subscribe el presente Contrato de Trabajo que subscribe de común acuerdo en la &nbsp; <u><i>" .$_data[0]['empresa']." &nbsp;</u></i> <br>
                la cual entrara en vigor el día ____  del mes de ______ del________.<br><br><br><br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________________________  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________________________
                <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La Administracion
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;El Trabajador<br><br><br>
        ";
        $result .="</div></body><html>";
        return $result;
    }

    public function ValidatePrintContratoAnexo(&$params){return true;}
    public function PrintContratoAnexo(&$params){
        $id= $params['id'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_ficha');
        $_data = $_table->GetAll("id_trab = '$id'");
        $foto=$_data[0]['foto'];
        $result = "<html>
                        <head>
                             <style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #2778dc;
                                                border-right:1px solid #2778dc;
                                                color: #FFFFFF;
                                                content: 'Empresa Geocuba - Anexo de contrato del Trabajador';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 2px 0;
                                                padding: 39px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor1:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Personales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor1 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor2:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Integracion Politca y Grado Militar';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor2 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor3:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Profesionales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor3 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor4:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Talla Personal';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor4 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 19px 14px;
                                                position: relative;
                                            }
                                            table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title>
                        </head>
                        <body style='width: 94%;margin-right: 2%;margin-left: 2%;'>
                    <div class='contenedor'>";
//        if($foto == '' || $foto== null){$result .= '<img style="float: right" src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/>';}
//        else{$result .= '<img style="float: right ;border:2px" width="70px" height="70px" src="data:image/png;base64,'.$foto.'"/>';}
        $total=($_data[0]['pago_adicion']+$_data[0]['salario']);

        $inicio=$_data[0]['inicio'];
        $fin=$_data[0]['fecha_final'];
        if ($fin=='0001-01-01 00:00:00'){$fin = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';}

        $result .=" Por una parte:_____________________________ que ocupa el cargo de __________________
                    a nombre de la empresa:&nbsp; <u><i>" .$_data[0]['empresa']."</u></i> &nbsp;, que a los efectos legales del presente documento
                    se denomina LA ADMINISTRACION.<br>
                    De otra parte:&nbsp; <u><i>" .$_data[0]['nombre_completo']."</u></i> &nbsp; por su propio derecho y que en lo sucesivo y a los
                    efectos del presente anexso al contrato original se denomina EL TRABAJADOR.
                <br><br>
                    Convienen
                    <br><br>
                    Primero:EL TRABAJADOR presentara sus servicios en la unidad Organizativa &nbsp;<u><i> " .$_data[0]['agencia']." </u></i>&nbsp;
                    bajo los principios siguientes:<br>
                    Cargo para el que contrata:  &nbsp; <u><i> " .$_data[0]['cargo']."</u></i>&nbsp;<br>
                    Grupo profesional: &nbsp; <u><i> " .$_data[0]['escala']."&nbsp; </u></i>
                    Salario Escala: &nbsp; <u><i> " .$_data[0]['salario']." &nbsp;</u></i>
                    Pago Adicional: &nbsp; <u><i> " .$_data[0]['pago_adicion']." &nbsp;</u></i>
                    Total: &nbsp; <u><i> " .$total."&nbsp; </u></i><br>
                    Categoria Ocupacional: &nbsp;<u><i> " .$_data[0]['cat_ocupa']."&nbsp; </u></i><br>
                    Cuya funcion principal se anexa an el Profeciograma y cuya forma de pago es: &nbsp;<u><i> " .$_data[0]['for_pag']."&nbsp;</u></i> <br>
                    EL TRABAJADOR recibira _________ pesos mensuales por concepto de condiciones laborales anormales.
                <br><br>
                    SEGUNDO: Para ser trabajador de esta entidad y para el desempeño de las funciones que
                    por el presente anexo se establecen, EL TRABAJADOR esta en la obligacion de cumplir
                    las condiciones de idoniedad particulares y especificas que se adjuntan en
                    Profesiograma anexo al presente documento.
                <br><br>
                    TERCERO: EL TRABAJADOR ha sido adiestrado y ha demostrado en la practica conocer las
                    reglas de Proteccion e Higiene del Trabaja para el puesto que se especifica.
                <br><br>
                    CUARTO: Ambas partes convienen en lo expresado en el presente documento
                    comprometiendose en su mas estricto cumplimiento.
                <br><br>
                    Y para que asi conste se suscribe el presente Contrato de Trabajo
                    que subscribe de comun acuerdo en la empresa &nbsp; <u><i>" .$_data[0]['empresa']."</u></i> &nbsp;,<br>
                    el cual entrara en vigor  el dia _______ de __________ del ___________<br><br><br><br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________________________  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____________________________
                <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La Administracion
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;El Trabajador
                <br><br><br>";
        $result .="</div></body><html>";
        return $result;
    }

    public function ValidatePrintMovN(&$params){return true;}
    public function PrintMovN(&$params){
        $id= $params['id'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_movnomina');
        $_data = $_table->GetAll("trabajador_id ='$id'");
        //var_dump($_data);die;
        $foto=$_data[0]['foto'];

//        if($foto == '' || $foto== null){$result .= '<img style="float: right" src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/>';}
//        else{$result .= '<img style="float: right ;border:2px" width="70px" height="70px" src="data:image/png;base64,'.$foto.'"/>';}
        $total=($_data[0]['pago_adicion']+$_data[0]['salario']);

        $inicio=$_data[0]['inicio'];
        $fin=$_data[0]['fecha_final'];
        if ($fin=='0001-01-01 00:00:00'){$fin = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';}
        $sexof="";
        $sexom="";
        if($_data[0]['sexo']=='Masculino'){$sexom="X";}
        else{$sexof = "X";}
        $cant=count($_data);

        $result = "<html>
                        <head>
                             <style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #2778dc;
                                                border-right:1px solid #2778dc;
                                                color: #FFFFFF;
                                                content: 'Empresa Geocuba - Anexo de contrato del Trabajador';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 2px 0;
                                                padding: 39px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor1:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Personales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor1 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor2:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Integracion Politca y Grado Militar';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor2 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor3:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Datos Profesionales';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor3 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 9px 4px;
                                                position: relative;
                                            }
                                            .contenedor4:after{
                                                background-color: #3aa860;
                                                border: 1px solid #3aa860;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #3aa860;
                                                border-right:1px solid #3aa860;
                                                color: #FFFFFF;
                                                content: 'Talla Personal';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px;
                                            }
                                            .contenedor4 {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 5px 0;
                                                padding: 22px 19px 14px;
                                                position: relative;
                                            }
                                            table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title>
                        </head>
                        <body style='width: 94%;margin-right: 2%;margin-left: 2%;'>
                    <div class='contenedor'>";
        $result .= "<div class=WordSection1>
<table class=main border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none'>
<tr>
    <td width=391 colspan=8 valign=top style='width:293.2pt;border:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Empresa</b><b><span lang=EN-US>:&nbsp; <ou><i> " .$_data[$cant-2]['empresa']." &nbsp;</u></i>
                      </span></b></p>
    </td>
    <td width=219 colspan=6 rowspan=3 valign=top style='width:163.95pt;
                      border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Movimiento Nomina</b></p>
    </td>
    <td width=176 colspan=6 rowspan=3 valign=top style='width:132.1pt;border:
                      solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Expediente Laboral:</b>&nbsp; <ou><i>CI/ " .$_data[$cant-2]['no_identidad']." &nbsp;</u></i></p>
    </td>
</tr>
<tr>
    <td width=391 colspan=8 valign=top style='width:293.2pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Código:</b> &nbsp; <ou><i> " .$_data[$cant-2]['codigo_nomina']." &nbsp;</u></i>
        </p>
    </td>
</tr>
<tr>
    <td width=391 colspan=8 valign=top style='width:293.2pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Dirección Empresa:</b>&nbsp; <ou><i> " .$_data[$cant-2]['agencia']." &nbsp;</u></i></p>
    </td>
</tr>
<tr>
    <td width=156 colspan=2 valign=top style='width:117.1pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Alta</b></p>
    </td>
    <td width=132 colspan=3 valign=top style='width:99.2pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Reubicación</b></p>
    </td>
    <td width=130 colspan=5 valign=top style='width:97.5pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Baja</b></p>
    </td>
    <td width=191 colspan=4 valign=top style='width:143.35pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Fecha Efectiva del Movimiento</b></p>
    </td>
    <td width=56 colspan=2 valign=top style='width:41.7pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Día</b></p>
    </td>
    <td width=59 colspan=3 valign=top style='width:44.05pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Mes</b></p>
    </td>
    <td width=62 valign=top style='width:46.35pt;border-top:none;border-left:
                      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Año</b></p>
    </td>
</tr>
<tr>
    <td width=225 colspan=4 rowspan=2 valign=top style='width:168.5pt;border:
                      solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Nombre:</b>&nbsp; <ou><i> " .$_data[$cant-2]['nombre']." &nbsp;</u></i></p>
    </td>
    <td width=194 colspan=6 rowspan=2 valign=top style='width:145.3pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Primer Apellido:</b>&nbsp; <ou><i> " .$_data[$cant-2]['apellido_1']." &nbsp;</u></i></p>
    </td>
    <td width=191 colspan=4 rowspan=2 valign=top style='width:143.35pt;
                      border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
                      border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Segundo Apellido:</b>&nbsp; <ou><i> " .$_data[$cant-2]['apellido_2']." &nbsp;</u></i></p>
    </td>
    <td width=56 colspan=2 rowspan=2 valign=top style='width:41.7pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Sexo</b></p>
    </td>
    <td width=59 colspan=3 valign=top style='width:44.05pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>M</b></p>
    </td>
    <td width=62 valign=top style='width:46.35pt;border-top:none;border-left:
                      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>F</b></p>
    </td>
</tr>
<tr>
    <td width=59 colspan=3 valign=top style='width:44.05pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> ".$sexom." &nbsp;</u></i></b></p>
    </td>
    <td width=62 valign=top style='width:46.35pt;border-top:none;border-left:
                      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$sexof." &nbsp;</u></i></b></p>
    </td>
</tr>


<tr>
    <td width=786 colspan=20 valign=top style='width:589.25pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Situación</b><b><span lang=EN-US>(IO)</span></b></p>
    </td>
</tr>


<tr>
    <td width=387 colspan=7 valign=top style='width:290.2pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Actual</b></p>
    </td>
    <td width=19 colspan=2 rowspan=7 valign=top style='width:14.1pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>&nbsp;</b></p>
    </td>
    <td width=380 colspan=11 valign=top style='width:284.95pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Nueva</b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Puesto de Trabajo</b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>código</b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Puesto de Trabajo</b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>código</b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-2]['cargo']." &nbsp;</u></i></b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b><ou><i> " .$_data[$cant-2]['cargo']." &nbsp;</u></i></b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b><ou><i> " .$_data[$cant-1]['cargo']." &nbsp;</u></i></b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b><ou><i> " .$_data[$cant-1]['cargo']." &nbsp;</u></i></b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b> Área de Trabajo</b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp;</b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Área de Trabajo</b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp;</b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-2]['area']." &nbsp;</u></i></b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-2]['area']." &nbsp;</u></i></b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-1]['area']." &nbsp;</u></i></b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-1]['area']." &nbsp;</u></i></b></p>
    </td>
</tr>
<tr>
    <td width=68 valign=top style='width:51.1pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Básico:</b>&nbsp; <ou><i> " .$_data[$cant-2]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=88 valign=top style='width:66.0pt;border-top:none;border-left:none;
                      border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Antigüedad:</b>&nbsp; <ou><i> " .$_data[$cant-2]['ant_dinero']." &nbsp;</u></i></p>
    </td>
    <td width=132 colspan=3 valign=top style='width:99.2pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Otros Pagos:</b>&nbsp; <ou><i> " .$_data[$cant-2]['pago_adicion']." &nbsp;</u></i></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Total:</b>&nbsp; <ou><i> " .($_data[$cant-2]['salario']+$_data[$cant-2]['pago_adicion'])." &nbsp;</u></i></p>
    </td>
    <td width=92 colspan=3 valign=top style='width:69.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Básico:</b>&nbsp; <ou><i> " .$_data[$cant-1]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=88 valign=top style='width:66.0pt;border-top:none;border-left:none;
                      border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Antigüedad:</b>&nbsp; <ou><i> " .$_data[$cant-1]['ant_dinero']." &nbsp;</u></i></p>
    </td>
    <td width=131 colspan=5 valign=top style='width:98.35pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Otros Pagos:</b>&nbsp; <ou><i> " .$_data[$cant-1]['pago_adicion']." &nbsp;</u></i></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Total:</b>&nbsp; <ou><i> " .($_data[$cant-1]['salario']+$_data[$cant-1]['pago_adicion'])." &nbsp;</u></i></p>
    </td>
</tr>
<tr>
    <td width=68 valign=top style='width:51.1pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Grupo:</b>&nbsp; <ou><i> " .$_data[$cant-2]['escala']." &nbsp;</u></i></p>
    </td>
    <td width=132 colspan=2 valign=top style='width:98.7pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Escala:</b>&nbsp; <ou><i> " .$_data[$cant-2]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=187 colspan=4 valign=top style='width:140.4pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Categoría:</b>&nbsp; <ou><i> " .$_data[$cant-2]['catup']." &nbsp;</u></i></p>
    </td>
    <td width=92 colspan=3 valign=top style='width:69.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Grupo:</b>&nbsp; <ou><i> " .$_data[$cant-1]['escala']." &nbsp;</u></i></p>
    </td>
    <td width=130 colspan=3 valign=top style='width:97.75pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Escala:</b>&nbsp; <ou><i> " .$_data[$cant-1]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=157 colspan=5 valign=top style='width:117.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Categoría:</b>&nbsp; <ou><i> " .$_data[$cant-1]['catup']." &nbsp;</u></i></p>
    </td>
</tr>

<tr>
    <td width=786 colspan=20 valign=top style='width:589.25pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Observaciones </b></p>
    </td>
</tr>
<tr>
    <td width=156 colspan=2 rowspan=2 valign=top style='width:117.1pt;border:
                      solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Hecho por:</b></p>
    </td>
    <td width=301 colspan=9 valign=top style='width:225.95pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Para uso de trabajo</b></p>
    </td>
    <td width=244 colspan=6 valign=top style='width:183.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Para uso de nomina</b></p>
    </td>
    <td width=84 colspan=3 rowspan=2 valign=top style='width:62.9pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Número :</b></p>
    </td>
</tr>
<tr>
    <td width=153 colspan=4 valign=top style='width:114.7pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Aprobado por:</b></p>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp;</b></p>
    </td>
    <td width=148 colspan=5 valign=top style='width:111.25pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Registrado por :</b></p>
    </td>
    <td width=244 colspan=6 valign=top style='width:183.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Registrado por:</b></p>
    </td>
</tr>
<tr height=0>
    <td width=66 style='border:none'></td>
    <td width=90 style='border:none'></td>
    <td width=42 style='border:none'></td>
    <td width=24 style='border:none'></td>
    <td width=57 style='border:none'></td>
    <td width=20 style='border:none'></td>
    <td width=69 style='border:none'></td>
    <td width=4 style='border:none'></td>
    <td width=14 style='border:none'></td>
    <td width=13 style='border:none'></td>
    <td width=36 style='border:none'></td>
    <td width=36 style='border:none'></td>
    <td width=90 style='border:none'></td>
    <td width=18 style='border:none'></td>
    <td width=19 style='border:none'></td>
    <td width=34 style='border:none'></td>
    <td width=34 style='border:none'></td>
    <td width=14 style='border:none'></td>
    <td width=7 style='border:none'></td>
    <td width=60 style='border:none'></td>
</tr>
</table>";
        $result .="</div></div><br><hr><br>";
        $result .= "<div class='contenedor'>";
        $result .= "<div class=WordSection1>
<table class=main border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none'>
<tr>
    <td width=391 colspan=8 valign=top style='width:293.2pt;border:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Empresa</b><b><span lang=EN-US>:&nbsp; <ou><i> " .$_data[$cant-2]['empresa']." &nbsp;</u></i>
                      </span></b></p>
    </td>
    <td width=219 colspan=6 rowspan=3 valign=top style='width:163.95pt;
                      border:solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Movimiento Nomina</b></p>
    </td>
    <td width=176 colspan=6 rowspan=3 valign=top style='width:132.1pt;border:
                      solid windowtext 1.0pt;border-left:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Expediente Laboral:</b>&nbsp; <ou><i>CI/ " .$_data[$cant-2]['no_identidad']." &nbsp;</u></i></p>
    </td>
</tr>
<tr>
    <td width=391 colspan=8 valign=top style='width:293.2pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Código:</b> &nbsp; <ou><i> " .$_data[$cant-2]['codigo_nomina']." &nbsp;</u></i>
        </p>
    </td>
</tr>
<tr>
    <td width=391 colspan=8 valign=top style='width:293.2pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Dirección Empresa:</b>&nbsp; <ou><i> " .$_data[$cant-2]['agencia']." &nbsp;</u></i></p>
    </td>
</tr>
<tr>
    <td width=156 colspan=2 valign=top style='width:117.1pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Alta</b></p>
    </td>
    <td width=132 colspan=3 valign=top style='width:99.2pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Reubicación</b></p>
    </td>
    <td width=130 colspan=5 valign=top style='width:97.5pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Baja</b></p>
    </td>
    <td width=191 colspan=4 valign=top style='width:143.35pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Fecha Efectiva del Movimiento</b></p>
    </td>
    <td width=56 colspan=2 valign=top style='width:41.7pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Día</b></p>
    </td>
    <td width=59 colspan=3 valign=top style='width:44.05pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Mes</b></p>
    </td>
    <td width=62 valign=top style='width:46.35pt;border-top:none;border-left:
                      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Año</b></p>
    </td>
</tr>
<tr>
    <td width=225 colspan=4 rowspan=2 valign=top style='width:168.5pt;border:
                      solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Nombre:</b>&nbsp; <ou><i> " .$_data[$cant-2]['nombre']." &nbsp;</u></i></p>
    </td>
    <td width=194 colspan=6 rowspan=2 valign=top style='width:145.3pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Primer Apellido:</b>&nbsp; <ou><i> " .$_data[$cant-2]['apellido_1']." &nbsp;</u></i></p>
    </td>
    <td width=191 colspan=4 rowspan=2 valign=top style='width:143.35pt;
                      border-top:none;border-left:none;border-bottom:solid windowtext 1.0pt;
                      border-right:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Segundo Apellido:</b>&nbsp; <ou><i> " .$_data[$cant-2]['apellido_2']." &nbsp;</u></i></p>
    </td>
    <td width=56 colspan=2 rowspan=2 valign=top style='width:41.7pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Sexo</b></p>
    </td>
    <td width=59 colspan=3 valign=top style='width:44.05pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>M</b></p>
    </td>
    <td width=62 valign=top style='width:46.35pt;border-top:none;border-left:
                      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>F</b></p>
    </td>
</tr>
<tr>
    <td width=59 colspan=3 valign=top style='width:44.05pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> ".$sexom." &nbsp;</u></i></b></p>
    </td>
    <td width=62 valign=top style='width:46.35pt;border-top:none;border-left:
                      none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$sexof." &nbsp;</u></i></b></p>
    </td>
</tr>


<tr>
    <td width=786 colspan=20 valign=top style='width:589.25pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Situación</b><b><span lang=EN-US>(IO)</span></b></p>
    </td>
</tr>


<tr>
    <td width=387 colspan=7 valign=top style='width:290.2pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Actual</b></p>
    </td>
    <td width=19 colspan=2 rowspan=7 valign=top style='width:14.1pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>&nbsp;</b></p>
    </td>
    <td width=380 colspan=11 valign=top style='width:284.95pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Nueva</b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Puesto de Trabajo</b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>código</b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Puesto de Trabajo</b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>código</b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-2]['cargo']." &nbsp;</u></i></b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b><ou><i> " .$_data[$cant-2]['cargo']." &nbsp;</u></i></b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b><ou><i> " .$_data[$cant-1]['cargo']." &nbsp;</u></i></b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b><ou><i> " .$_data[$cant-1]['cargo']." &nbsp;</u></i></b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b> Área de Trabajo</b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp;</b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Área de Trabajo</b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp;</b></p>
    </td>
</tr>
<tr>
    <td width=288 colspan=5 valign=top style='width:216.3pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-2]['area']." &nbsp;</u></i></b></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-2]['area']." &nbsp;</u></i></b></p>
    </td>
    <td width=312 colspan=9 valign=top style='width:233.65pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-1]['area']." &nbsp;</u></i></b></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp; <ou><i> " .$_data[$cant-1]['area']." &nbsp;</u></i></b></p>
    </td>
</tr>
<tr>
    <td width=68 valign=top style='width:51.1pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Básico:</b>&nbsp; <ou><i> " .$_data[$cant-2]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=88 valign=top style='width:66.0pt;border-top:none;border-left:none;
                      border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Antigüedad:</b>&nbsp; <ou><i> " .$_data[$cant-2]['ant_dinero']." &nbsp;</u></i></p>
    </td>
    <td width=132 colspan=3 valign=top style='width:99.2pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Otros Pagos:</b>&nbsp; <ou><i> " .$_data[$cant-2]['pago_adicion']." &nbsp;</u></i></p>
    </td>
    <td width=99 colspan=2 valign=top style='width:73.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Total:</b>&nbsp; <ou><i> " .($_data[$cant-2]['salario']+$_data[$cant-2]['pago_adicion'])." &nbsp;</u></i></p>
    </td>
    <td width=92 colspan=3 valign=top style='width:69.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Básico:</b>&nbsp; <ou><i> " .$_data[$cant-1]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=88 valign=top style='width:66.0pt;border-top:none;border-left:none;
                      border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Antigüedad:</b>&nbsp; <ou><i> " .$_data[$cant-1]['ant_dinero']." &nbsp;</u></i></p>
    </td>
    <td width=131 colspan=5 valign=top style='width:98.35pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Otros Pagos:</b>&nbsp; <ou><i> " .$_data[$cant-1]['pago_adicion']." &nbsp;</u></i></p>
    </td>
    <td width=68 colspan=2 valign=top style='width:51.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Total:</b>&nbsp; <ou><i> " .($_data[$cant-1]['salario']+$_data[$cant-1]['pago_adicion'])." &nbsp;</u></i></p>
    </td>
</tr>
<tr>
    <td width=68 valign=top style='width:51.1pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Grupo:</b>&nbsp; <ou><i> " .$_data[$cant-2]['escala']." &nbsp;</u></i></p>
    </td>
    <td width=132 colspan=2 valign=top style='width:98.7pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Escala:</b>&nbsp; <ou><i> " .$_data[$cant-2]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=187 colspan=4 valign=top style='width:140.4pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Categoría:</b>&nbsp; <ou><i> " .$_data[$cant-2]['catup']." &nbsp;</u></i></p>
    </td>
    <td width=92 colspan=3 valign=top style='width:69.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Grupo:</b>&nbsp; <ou><i> " .$_data[$cant-1]['escala']." &nbsp;</u></i></p>
    </td>
    <td width=130 colspan=3 valign=top style='width:97.75pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Escala:</b>&nbsp; <ou><i> " .$_data[$cant-1]['salario']." &nbsp;</u></i></p>
    </td>
    <td width=157 colspan=5 valign=top style='width:117.9pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Categoría:</b>&nbsp; <ou><i> " .$_data[$cant-1]['catup']." &nbsp;</u></i></p>
    </td>
</tr>

<tr>
    <td width=786 colspan=20 valign=top style='width:589.25pt;border:solid windowtext 1.0pt;
                      border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Observaciones </b></p>
    </td>
</tr>
<tr>
    <td width=156 colspan=2 rowspan=2 valign=top style='width:117.1pt;border:
                      solid windowtext 1.0pt;border-top:none;padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Hecho por:</b></p>
    </td>
    <td width=301 colspan=9 valign=top style='width:225.95pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Para uso de trabajo</b></p>
    </td>
    <td width=244 colspan=6 valign=top style='width:183.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal align=center style='margin-bottom:0cm;margin-bottom:.0001pt;
                      text-align:center;line-height:normal'><b>Para uso de nomina</b></p>
    </td>
    <td width=84 colspan=3 rowspan=2 valign=top style='width:62.9pt;border-top:
                      none;border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Número :</b></p>
    </td>
</tr>
<tr>
    <td width=153 colspan=4 valign=top style='width:114.7pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Aprobado por:</b></p>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>&nbsp;</b></p>
    </td>
    <td width=148 colspan=5 valign=top style='width:111.25pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Registrado por :</b></p>
    </td>
    <td width=244 colspan=6 valign=top style='width:183.3pt;border-top:none;
                      border-left:none;border-bottom:solid windowtext 1.0pt;border-right:solid windowtext 1.0pt;
                      padding:0cm 5.4pt 0cm 5.4pt'>
        <p class=MsoNormal style='margin-bottom:0cm;margin-bottom:.0001pt;line-height:
                      normal'><b>Registrado por:</b></p>
    </td>
</tr>
<tr height=0>
    <td width=66 style='border:none'></td>
    <td width=90 style='border:none'></td>
    <td width=42 style='border:none'></td>
    <td width=24 style='border:none'></td>
    <td width=57 style='border:none'></td>
    <td width=20 style='border:none'></td>
    <td width=69 style='border:none'></td>
    <td width=4 style='border:none'></td>
    <td width=14 style='border:none'></td>
    <td width=13 style='border:none'></td>
    <td width=36 style='border:none'></td>
    <td width=36 style='border:none'></td>
    <td width=90 style='border:none'></td>
    <td width=18 style='border:none'></td>
    <td width=19 style='border:none'></td>
    <td width=34 style='border:none'></td>
    <td width=34 style='border:none'></td>
    <td width=14 style='border:none'></td>
    <td width=7 style='border:none'></td>
    <td width=60 style='border:none'></td>
</tr>
</table>

";
        $result .="</div></body><html>";


        return $result;
    }




};
?>
