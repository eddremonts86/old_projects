 <?PHP

class Reporte_pago extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//

    public function ValidateCargarAnnos(&$params) {
        return true;
    }
    //cargo los proyectos
    public function CargarAnnos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('pago.proyecto');
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
        $_table = $this->_dbase->GetTable('vistas_resumen.mes_vista');
        $_data = $_table->GetRange($_limit, $_start);

        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo los annos
    public function ValidateCargarCargarannos(&$params) {
        return true;
    }
    public function CargarCargarannos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.anno_vista');
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
        $_table = $this->_dbase->GetTable('vistas_resumen.reporte_pago_vista');
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
//        $datos=$this->_dbase->GetTable("pago.reporte_pago");
//        $count = $datos->Contains(array('Reporte_pagoid' => "'$id'"));
//       if ($count > 0) {
//            $this->RegisterError('Operación no válida', "La Reporte_pago a eliminar esta siendo usada reporte_pago.");
//            return false;
//        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("pago.reporte_pago");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['combo_value_id'])&&!isset($params['combo_contrato_value_id'])
            &&!isset($params['combo_ano_value_id']))
        {//combo_ano_value_id
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        /* $name=$params['nombre_id'];
        $area=$params['combo_value_id'];
        $contrato=$params['combo_contrato_value_id'];*/
        $nombre = $params['nombre_id'];
        $combo = $params['combo_value_id'];
        $combo2 = $params['combo_contrato_value_id'];
        $combo3=$params['combo_anno_value_id'];
        $nombre = trim($nombre);
        $combo = trim($combo);
        $combo2 = trim($combo2);
        $combo3 = trim($combo3);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Reporte incorrecto.");
            return false;
        }

        $_valid = Validator::CheckStringSize($combo, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Proyecto incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($combo2, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Mes incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($combo2, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Año incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);

        //$params['new_nombre'] = $nombre;

        $actividades = $this->_dbase->GetTable('pago.reporte_pago');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Reporte_Pago '$nombre' ya existe.");
            return false;
        }
        return true;
       }

    public function Add(&$params){
        $name=$params['nombre_id'];

        $idproyecto=$params['combo_value_id'];

        $proyecto=$params['combo_value_id'];
        $mes=$params['combo_contrato_value_id'];
        $anno=$params['combo_anno_value_id'];

        $anno_id =$params['combo_anno_value_id'];
        $mes_id=$params['combo_contrato_value_id'];


        $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
        $idanno_mes=$datos->GetValueWhere('id',"mesid='$mes_id'AND annoid='$anno_id'");

        if(!$idanno_mes)
        {
            $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
            $data=$datos->InsertValues(array('annoid' => "'$anno_id'",'mesid' => "'$mes_id'"));
            $tabla_mes=$this->_dbase->GetTable("nomencladores.anno_mes");
            $idanno_mes=$tabla_mes->GetValueWhere('id',"mesid='$mes_id'");
       }

       $datos=$this->_dbase->GetTable("pago.reporte_pago");
       return $data=$datos->InsertValues(array('proyectoid' => "'$idproyecto'"
       ,'anno_mesid' => "'$idanno_mes'",'nombre' => "'$name'"));



//proyectoid, anno_mesid, activo, nombre
    }
    // ========================================================================//
    public function ValidateModif(&$params){

        if (!isset($params['nombre_id_upd'])&&!isset($params['combo_value_id'])&&!isset($params['combo_contrato_value_id'])
            &&!isset($params['combo_ano_value_id']))
        {//combo_ano_value_id
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        /* $name=$params['nombre_id'];
        $area=$params['combo_value_id'];
        $contrato=$params['combo_contrato_value_id'];*/
        $nombre = $params['nombre_id_upd'];
        $combo = $params['combo_value_id'];
        $combo2 = $params['combo_contrato_value_id'];
        $combo3=$params['combo_anno_value_id'];
        $nombre = trim($nombre);
        $combo = trim($combo);
        $combo2 = trim($combo2);
        $combo3 = trim($combo3);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Reporte incorrecto.");
            return false;
        }

        $_valid = Validator::CheckStringSize($combo, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', " Proyecto incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($combo2, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Mes incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($combo3, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Año incorrecto.");
            return false;
        }
        Validator::ToCleanSQL($nombre);

        //$params['new_nombre'] = $nombre;

        $old_nombre= $params['old_name'];

        $actividades = $this->_dbase->GetTable('pago.reporte_pago');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
        if ($count==0)
        {
            return true;
        }
        elseif ($old_nombre==$nombre) {
            // $this->RegisterError('Operación no válida', "El nombre '$nombre' ya existe.");
            return true;
        }
        else {
            $this->RegisterError('Operación no válida', "El Reporte_Pago '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modif(&$params){

        $nameold=$params['old_name'];
        $name=$params['nombre_id_upd'];
        $idproyecto=$params['combo_value_id'];

        $anno_id =$params['combo_anno_value_id'];
        $mes_id=$params['combo_contrato_value_id'];

        $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
        $idanno_mes=$datos->GetValueWhere('id',"mesid='$mes_id'AND annoid='$anno_id'");

        if(!$idanno_mes)
        {
            $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
            $data=$datos->InsertValues(array('annoid' => "'$anno_id'",'mesid' => "'$mes_id'"));
            $tabla_mes=$this->_dbase->GetTable("nomencladores.anno_mes");
            $idanno_mes=$tabla_mes->GetValueWhere('id',"mesid='$mes_id'");
        }
        $datos=$this->_dbase->GetTable("pago.Reporte_pago");
        return $data=$datos->Update(array('proyectoid' => "'$idproyecto'"
        ,'anno_mesid' => "'$idanno_mes'",'nombre' => "'$name'"),"nombre='$nameold'");
    }

};
?>
