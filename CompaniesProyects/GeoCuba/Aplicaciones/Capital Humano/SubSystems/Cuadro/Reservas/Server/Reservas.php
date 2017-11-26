 <?PHP

class Reservas extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.reservas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateniveles(&$params) {
        return true;
    }
    public function niveles(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('cuadro.nivel');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatetrbaj(&$params) {
        return true;
    }
    public function trbaj(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trab_plantilla');
        $_data = $_table->GetRange($_limit, $_start);
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

    public function Validatetviolaciones(&$params) {
        return true;
    }
    public function tviolaciones(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('cuadro.tviolacion');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
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
                $datos=$this->_dbase->GetTable("cuadro.niveles_reserv");
                $datos=$this->_dbase->GetTable("plantilla.plantilla");
                //$datos->Update(array('resrva' => "'true'"),"id = '$id'");
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
       $Nivel=$params['Nivel'];
       $trbaj=$params['trabajadorid'];
       $id=$params['plantilla_id'];
       $contrato_id=$params['contrato_id'];
       $datos1=$this->_dbase->GetTable("cuadro.niveles_reserv");
       $datos=$this->_dbase->GetTable("plantilla.plantilla");
       $datos->Update(array('resrva' => "'true'"),"id = '$id'");
       return $data=$datos1->InsertValues(array('nivel' => "'$Nivel'",'trabajador_id' => "'$trbaj'"));
    }

    public function Add_control(&$params){
        $id=$params['id'];
        $cuadro=$params['cuadro'];
        $fecha=$params['fecha'];
        $mensaje=$params['mensaje'];
       $datos=$this->_dbase->GetTable("cuadro.cuadro_reserva");
       return $data=$datos->InsertValues(array('reserva_id' => "'$id'",'observacion' => "'$mensaje'",'fecha' => "'$fecha'",'cuadro_id' => "'$cuadro'"));
    }
    // ========================================================================//
    public function ValidateModid(&$params){
        return true;
    }
    public function Modid(&$params){
        $data = json_decode($params['data']);
        $datos=$this->_dbase->GetTable("cuadro.niveles_reserv");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->niveles_reserv_id;
            $trabajador_id = $data[$i]->id;
            $nivel = $data[$i]->nivel;
            if(isset($id)){
                $datosIns=$datos->Update(array('trabajador_id' => "'$trabajador_id'",'nivel' => "'$nivel'"),"id = '$id'");
            }
            else{
                $datosIns=$datos->InsertValues(array(  'trabajador_id' => "'$trabajador_id'",'nivel' => "'$nivel'"));
            }
        }
        return true;

    }

};
?>
