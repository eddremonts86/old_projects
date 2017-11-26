 <?PHP

class Preparacion extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadro_Preparacion');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCyR(&$params) {
        return true;
    }
    public function CyR(&$params){
        $id = $params['id'];
        $_data = array();
        $_count = 0;
        //," tprepa_id ='$id'"
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $cuadros = $this->_dbase->GetTable('vistas_resumen.cuadros');
        $reservas = $this->_dbase->GetTable('vistas_resumen.reservas');
        $_data_cua = $cuadros->GetRange($_limit, $_start);
        $_data_re = $reservas->GetRange($_limit, $_start);
        if (is_null($_data_cua))return false;
        $_count = count($_data_cua);if ($_count == -1)return false;
         if (is_null($_data_re))return false;
        $_count1 = count($_data_re);if ($_count == -1)return false;

        $result = array('success' => true, 'results' => $_count, 'cuadros' => $_data_cua, 'results1' => $_count1, 'resrvas' => $_data_re);
        return $result;
    }

    public function ValidatePrep_cuadros(&$params) {
        return true;
    }
    public function Prep_cuadros(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.prep_prep_compl');
        $_data = $_table->GetRange($_limit, $_start,"tprepa_id='$id'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidatePrep_eserv(&$params) {
        return true;
    }
    public function Prep_eserv(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.prep_prep_reserv');
        $_data = $_table->GetRange($_limit, $_start,"tprepa_id='$id'");
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

    public function ValidatetPreparacion(&$params) {
        return true;
    }
    public function tPreparacion(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('cuadro.tpreparacion');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatereserva(&$params) {
        return true;
    }
    public function reserva(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadros_reservas');
        $_data = $_table->GetRange($_limit, $_start,"cuadro_id ='$id'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateprepa(&$params) {
        return true;
    }
    public function prepa(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadro_prepa');
        $_data = $_table->GetRange($_limit, $_start,"cuadro_id ='$id'");
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
                $datos=$this->_dbase->GetTable("cuadro.tpreparacion");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
/*
        if (!isset($params['nombre_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cliente incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('pago.cliente');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cliente '$nombre' ya existe.");
            return false;
        }*/return true;
       }
    public function ValidateAdd_control(&$params){

     /*   if (!isset($params['nombre_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cliente incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('pago.cliente');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cliente '$nombre' ya existe.");
            return false;
        }*/return true;
       }

    public function Add(&$params){
       $Prep=$params['Prep'];
       $from_date=$params['from_date_Prep'];
       $datos=$this->_dbase->GetTable("cuadro.tpreparacion");
       return $data=$datos->InsertValues(array('fecha' => "'$from_date'",'nombre' => "'$Prep'"));

    }
    public function Add_control(&$params){
        //print_r($params);die;
        $id=$params['id'];
        $cuadro=$params['cuadro'];
        $fecha=$params['fecha'];
        $mensaje=$params['mensaje'];
       $datos=$this->_dbase->GetTable("cuadro.cuadro_Preparacion");
       return $data=$datos->InsertValues(array(
                                        'Preparacion_id' => "'$id'",'descripcion' => "'$mensaje'",
                                        'fecha_re' => "'$fecha'",'cuadro_id' => "'$cuadro'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        /*if (!isset($params['nombre_Udt_id'])||!isset($params['id_Udt_id'])) {
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
        }*/

        return true;
    }
    public function Modid(&$params){
        $prepa=$params['prepa'];
        $from_date=$params['from_date'];
        $id=$params['id_Udt_id'];
        $tviolacion=$params['tviolacion'];
        $datos=$this->_dbase->GetTable("cuadro.tpreparacion");
        $datos->Update(array('fecha' => "'$from_date'",'nombre' => "'$prepa'"),"id = '$id'");
        return true;
    }
    //========================================================================//
    public function Validateasignar(&$params){

        return true;
    }
    public function asignar(&$params){
        $id=$params['id'];
        $data = json_decode(utf8_decode($params['data']));
        $datos=$this->_dbase->GetTable("cuadro.cuadro_preparacion");
        for ($i = 0; $i < count($data); $i++)
        {   $id_cuadro = $data[$i]->id;
            $_result_indi = $datos->InsertValues(array('cuadro_id' => "'$id_cuadro'",'tprepa_id' => "'$id'"));

        }
        return true;
    }
    public function Validateasignar_res(&$params){

        return true;
    }
    public function asignar_res(&$params){
        $id=$params['id'];
        $data = json_decode(utf8_decode($params['data']));
        $datos=$this->_dbase->GetTable("cuadro.cuadro_preparacion");
        for ($i = 0; $i < count($data); $i++)
        {   $id_cuadro = $data[$i]->id;
            $_result_indi = $datos->InsertValues(array('cuadro_id' => "'$id_cuadro'",'tprepa_id' => "'$id'"));

        }
        return true;
    }
};
?>