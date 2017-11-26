 <?PHP

class Violaciones extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadro_violaciones');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;
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

    public function Validatetviolaciones1(&$params) {
        return true;
    }
    public function tviolaciones1(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadro_violacines');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'and cuadro_id ='$id'");
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
                $datos=$this->_dbase->GetTable("cuadro.violaciones");
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
       $Causa=$params['Causa'];
       $tviolacion=$params['tviolacion'];
       $from_date=$params['from_date_Causa'];
       $datos=$this->_dbase->GetTable("cuadro.violaciones");
       return $data=$datos->InsertValues(array('tipo' => "'$tviolacion'",'fecha' => "'$from_date'",'causa' => "'$Causa'"));

    }
    public function Add_control(&$params){
        //print_r($params);die;
        $id=$params['id'];
        $cuadro=$params['cuadro'];
        $fecha=$params['fecha'];
        $mensaje=$params['mensaje'];
       $datos=$this->_dbase->GetTable("cuadro.cuadro_violaciones");
       return $data=$datos->InsertValues(array(
                                        'violaciones_id' => "'$id'",'descripcion' => "'$mensaje'",
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
        $Causa=$params['Causa'];
        $from_date=$params['from_date'];
        $id_Udt_id=$params['id_Udt_id'];
        $tviolacion=$params['tviolacion'];
        $datos=$this->_dbase->GetTable("cuadro.violaciones");
        $datos->Update(array('tipo' => "'$tviolacion'",'fecha' => "'$from_date'",'causa' => "'$Causa'"),"id = '$id_Udt_id'");
        return true;
    }

};
?>