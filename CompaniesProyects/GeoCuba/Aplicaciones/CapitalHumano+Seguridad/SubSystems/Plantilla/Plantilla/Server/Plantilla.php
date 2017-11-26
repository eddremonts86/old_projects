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
        $_data = $_table->GetRange($_limit, $_start);
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
        $_data = $_table->GetRange($_limit, $_start);
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
        $_data = $_table->GetRange($_limit, $_start);
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
        $_data = $_table->GetRange($_limit, $_start);
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
        $_data = $_table->GetAll();
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
        else
            $cuadro1='false';

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
           $data1= $datacontrato->GetAll("trabajadorid= '$trabajador' AND contrato_tipoid= '$contrato'");
           $id_contrato = $data1[0]['id'];
           $datos = $this->_dbase->GetTable("plantilla.plantilla");
           return $data = $datos->InsertValues(array('resrva' => "'$resrva1'",'cuadro' => "'$cuadro1'",'director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",'contratoid' => "'$id_contrato'",'listado_cargosid' => "'$lcargo'",'htrabajo_id' => "'$horario'",'fpago_id' => "'$forma'",'spago_id' => "'$Sistema'"));
          }
       else{
        $datacontrato = $this->_dbase->GetTable("pago.contrato");
        $data = $datacontrato->InsertValues(array('trabajadorid' => "'$trabajador'",'fecha_final' => "'$fin'",'fecha_inicio' => "'$inicio'",'contrato_tipoid' => "'$contrato'"));
        $data1= $datacontrato->GetAll("trabajadorid= '$trabajador' AND contrato_tipoid= '$contrato'");
        $id_contrato = $data1[0]['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        return $data = $datos->InsertValues(array('resrva' => "'$resrva1'",'cuadro' => "'$cuadro1'",'director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",'contratoid' => "'$id_contrato'",'listado_cargosid' => "'$lcargo'",'htrabajo_id' => "'$horario'",'fpago_id' => "'$forma'",'spago_id' => "'$Sistema'"));

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
};
?>