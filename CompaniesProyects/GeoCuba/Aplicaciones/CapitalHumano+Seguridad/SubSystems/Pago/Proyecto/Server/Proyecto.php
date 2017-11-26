 <?PHP

class Proyecto extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//

    public function ValidateCargarAnnos(&$params) {
        return true;
    }
    public function CargarAnnos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.area');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarcontratos(&$params) {
        return true;
    }
    public function Cargarcontratos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('pago.contratoooo');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.proyecto_vista');
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
    public function ValidateEliminar(&$params) {
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("pago.reporte_pago");
        $count = $datos->Contains(array('proyectoid' => "'$id'"));
       if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Proyecto a eliminar esta siendo usado por Reporte de Pago.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("pago.proyecto");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['monto_id'])&&!isset($params['descripcion_id'])
            &&!isset($params['combo_value_id'])&&!isset($params['codigo_id'])&&!isset($params['combo_contrato_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        /*$name=$params['nombre_id'];
        $monto=$params['monto_id'];
        $descripcion=$params['descripcion_id'];
        $area=$params['combo_value_id'];
        $codigo=$params['codigo_id'];
        $contrato=$params['combo_contrato_value_id'];*/
        $nombre = $params['nombre_id'];
        $monto = $params['monto_id'];
        $descripcion = $params['descripcion_id'];
        $codigo = $params['codigo_id'];

        $nombre = trim($nombre);
        $monto = trim($monto);
        $descripcion = trim($descripcion);
        $codigo = trim($codigo);


        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Proyecto incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($monto,1,20);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Monto  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($descripcion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Descripción  incorrecto.");
            return false;
        }

        $_valid = Validator::CheckStringSize($codigo, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Código  incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($monto);
        Validator::ToCleanSQL($descripcion);
        Validator::ToCleanSQL($codigo);
        //$params['new_nombre'] = $nombre;

        $actividades = $this->_dbase->GetTable('pago.proyecto');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Proyecto'$nombre' ya existe.");
            return false;
        }
        return true;
       }

    public function Add(&$params){
        $name=$params['nombre_id'];
        $monto=$params['monto_id'];

        $fechaIp=$params['fechaIp'];
        $fechaFp=$params['fechaFp'];

        $descripcion=$params['descripcion_id'];
        $area=$params['combo_value_id'];
        $codigo=$params['codigo_id'];
        $contrato=$params['combo_contrato_value_id'];

        $datos=$this->_dbase->GetTable("pago.proyecto");

       return $data=$datos->InsertValues(array('monto' => "'$monto'",'nombre' => "'$name'",
                                                'descripcion' => "'$descripcion'",'areaid' => "'$area'"
                                                ,'fecha_inicio' => "'$fechaIp'",'fecha_fin' => "'$fechaFp'"
                                                ,'codigo' => "'$codigo'",'contratooooid' => "'$contrato'"));
    }


    // ========================================================================//
    public function ValidateModif(&$params){

        if (!isset($params['nombre_id_upd'])&&!isset($params['old_name'])&&!isset($params['monto_id'])&&!isset($params['descripcion_id'])
            &&!isset($params['combo_value_id'])&&!isset($params['codigo_id'])&&!isset($params['combo_contrato_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        /*$name=$params['nombre_id'];
        $monto=$params['monto_id'];
        $descripcion=$params['descripcion_id'];
        $area=$params['combo_value_id'];
        $codigo=$params['codigo_id'];
        $contrato=$params['combo_contrato_value_id'];*/
        $nombre = $params['nombre_id_upd'];
        $monto = $params['monto_id'];
        $descripcion = $params['descripcion_id'];
        $codigo = $params['codigo_id'];

        $nombre = trim($nombre);
        $monto = trim($monto);
        $descripcion = trim($descripcion);
        $codigo = trim($codigo);


        //$_valid = Validator::CheckStringSize($nombre, 3, 200);
        //if (!$_valid) {
      //      $this->RegisterError('Parámetro incorrecto', "Nombre del Proyecto incorrecto.");
       //     return false;
       // }
        
        $_valid = Validator::CheckStringSize($monto,1,20);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Monto  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($descripcion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Descripción  incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($monto);
        Validator::ToCleanSQL($descripcion);
        Validator::ToCleanSQL($codigo);
        //$params['new_nombre'] = $nombre;

        //$old_nombre= $params['old_name'];

//        $actividades = $this->_dbase->GetTable('pago.proyecto');
//        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
//        if ($count==0)
//        {
//            return true;
//        }
//
//        else {
//            $this->RegisterError('Operación no válida', "El Proyecto '$nombre' ya existe.");
//            return false;
//             }
    }
    public function Modif(&$params){

        $nameold=$params['old_name'];
        $name=$params['nombre_id_upd'];
        $monto=$params['monto_id'];
        $descripcion=$params['descripcion_id'];
        $area=$params['combo_value_id'];
        $codigo=$params['codigo_id'];
        $fechaIp=$params['fechaIp'];
        $fechaFp=$params['fechaFp'];
        $contrato=$params['combo_contrato_value_id'];

        $datos=$this->_dbase->GetTable("pago.proyecto");
        return $data=$datos->Update(array('monto' => "'$monto'",'nombre' => "'$name'",'fecha_inicio' => "'$fechaIp'",'fecha_fin' => "'$fechaFp'",'descripcion' => "'$descripcion'",'areaid' => "'$area'"
        ,'codigo' => "'$codigo'",'contratooooid' => "'$contrato'"),"nombre='$nameold'");



    }

};
?>
