 <?PHP

class Trabajador_proyecto extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//

    //cargo los trabajadore emplantillados
    public function ValidateCargarAnnos(&$params) {
        return true;
    }
    public function CargarAnnos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_enplantilla_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//cargo los  proyectos
    public function ValidateCargarcontratos(&$params) {
        return true;
    }
    public function Cargarcontratos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.proyectotodo_vista');
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
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_proyecto_vista');
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
//        $id=$params['id'];
//        $datos=$this->_dbase->GetTable("pago.trabajador_proyecto");
//        $count = $datos->Contains(array('Trabajador_proyectoid' => "'$id'"));
//       if ($count > 0) {
//            $this->RegisterError('Operación no válida', "El Proyecto del Trabajador a eliminar esta siendo usado por Trabajador_Proyecto.");
//            return false;
//        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("pago.trabajador_proyecto");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['combo_value_id'])&&!isset($params['combo_contrato_value_id'])
            &&!isset($params['fecha']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
/*$nombenplantilla = $params['combo_value_id'];
        $proyecto = $params['combo_contrato_value'];
        $fecha = $params['fecha'];*/

        $nombenplantilla = $params['combo_value_id'];
        $proyecto = $params['combo_contrato_value_id'];
        $fecha = $params['fecha'];

//        $_valid = Validator::CheckStringSize($nombenplantilla, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Valor Persona en Plantilla  incorrecto.");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($proyecto, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Proyecto incorrecto");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($fecha, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Fecha del Proyecto del Trabajador incorrecto");
//            return false;
//        }

        $proyectos = $this->_dbase->GetTable('pago.trabajador_proyecto');
        $count = $proyectos->Contains(array('trabajadorid' => "'$nombenplantilla'",'proyectoid' => "'$proyecto'"));
        if ($count > 0)
        {
            $this->RegisterError('Operación no válida', "El Trabajador y el Proyecto mencionados ya están vinculados.");
            return false;
        }
        else
            return true;
       }
    public function Add(&$params){
        $nombenplantilla = $params['combo_value_id'];
        $proyecto = $params['combo_contrato_value_id'];
        $fecha = $params['fecha'];

        $datos=$this->_dbase->GetTable("pago.trabajador_proyecto");
       return $data=$datos->InsertValues(
           array('trabajadorid' => "'$nombenplantilla'",
               'proyectoid' => "'$proyecto'",'fecha' => "'$fecha'"));

//ipago.trabajador_proyecto(
           // id, plantillaid, proyectoid, fecha, activo)
          //  clasificacion_d_iid, grupo_escalaid, activo, nombre
    }
    // ========================================================================//
    public function ValidateModif(&$params){
//        if (!isset($params['combo_value_id'])&&!isset($params['combo_contrato_value_id'])
//            &&!isset($params['fecha']))
//        {
//            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
//            return false;
//        }
//        /*$nombenplantilla = $params['combo_value_id'];
//      $proyecto = $params['combo_contrato_value'];
//      $fecha = $params['fecha'];*/
//
//        $nombenplantilla = $params['combo_value_id'];
//        $proyecto = $params['combo_contrato_value_id'];
//        $fecha = $params['fecha'];
//
//        $_valid = Validator::CheckStringSize($nombenplantilla, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Valor Persona en plantilla  incorrecto.");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($proyecto, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Proyecto incorrecto");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($fecha, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Fecha del Proyecto del Trabajador incorrecto");
//            return false;
//        }
//
//

    }

    public function Modif(&$params){
        $nombenplantilla = $params['combo_value_id'];
        $proyecto = $params['combo_contrato_value'];
        $fecha = $params['fecha'];
        $id=$params['old_name'];
        $datos=$this->_dbase->GetTable("pago.trabajador_proyecto");
        return $data=$datos->Update(
            array('trabajadorid' => "'$nombenplantilla'",
                'proyectoid' => "'$proyecto'",'fecha' => "'$fecha'"),"id='$id'");

    }

};
?>
