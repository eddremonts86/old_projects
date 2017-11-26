 <?PHP

class Mes extends Module {
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
        $_table = $this->_dbase->GetTable('nomencladores.anno');
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
    // ========================================================================//
    public function ValidateEliminar(&$params) {
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
        $count = $datos->Contains(array('mesid' => "'$id'"));
       if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Mes a eliminar esta siendo usado por Año_Mes.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.mes");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['numero_id'])&&!isset($params['combo_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $numero = $params['numero_id'];
        $combo = $params['combo_value_id'];

        $nombre = trim($nombre);
        $numero = trim($numero);
        $combo = trim($combo);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Mes incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($numero,1);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Mes incorrecto.");
            return false;
        }
//        $_valid = Validator::CheckStringSize($combo, 3, 200);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
//            return false;
//        }

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($numero);
        $params['new_nombre'] = $nombre;

        $actividades = $this->_dbase->GetTable('nomencladores.mes');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Mes '$nombre' ya existe.");
            return false;
        }
        return true;
       }

    public function Add(&$params){
        $name=$params['nombre_id'];
        $number=$params['numero_id'];
        //$anno=$params['combo_value_id'];
//        $tabla=$this->_dbase->GetTable("nomencladores.anno");
//        $idanno=$tabla->GetValueWhere('id',"valor=$anno");
        $datos=$this->_dbase->GetTable("nomencladores.mes");
       return $data=$datos->InsertValues(array('nombre' => "'$name'",'numero' => "'$number'"));

    }
    // ========================================================================//
    public function ValidateModif(&$params){
        if (!isset($params['nombre_id_upd'])&&!isset($params['numero_id_upd'])&&!isset($params['combo_value_id_upd']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        $nombre = $params['nombre_id_upd'];
        $numero = $params['numero_id_upd'];
        //$combo = $params['combo_value_id_upd'];

        $nombre = trim($nombre);
        $numero = trim($numero);
        //$combo = trim($combo);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Mes incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($numero,1);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Mes incorrecto.");
            return false;
        }
//        $_valid = Validator::CheckStringSize($combo, 3, 200);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
//            return false;
//        }

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($numero);
        $params['new_nombre'] = $nombre;
        $old_nombre= $params['old_name'];

        $actividades = $this->_dbase->GetTable('nomencladores.mes');
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
            $this->RegisterError('Operación no válida', "El Mes '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modif(&$params){

        $nameold=$params['old_name'];
//        $datos=$this->_dbase->GetTable("nomencladores.mes");
//        $result = $datos->DeleteWhere("id = '$nameold'");
        $name=$params['nombre_id_upd'];
        $number=$params['numero_id_upd'];
        //$anno=$params['combo_value_id_upd'];
//        $tabla=$this->_dbase->GetTable("nomencladores.anno");
//        $idanno=$tabla->GetValueWhere('id',"valor=$anno");
        $datos=$this->_dbase->GetTable("nomencladores.mes");
        return $data=$datos->Update(array('nombre' => "'$name'",'numero' => "$number"),"nombre='$nameold'");



    }

};
?>
