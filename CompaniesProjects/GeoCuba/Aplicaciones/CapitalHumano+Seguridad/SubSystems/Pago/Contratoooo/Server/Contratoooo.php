 <?PHP

class Contratoooo extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//

    public function ValidateCargarClientes(&$params) {
        return true;
    }
    public function CargarClientes(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('pago.cliente');
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
        $_table = $this->_dbase->GetTable('vistas_resumen.clientesscontratoss');
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
        $datos=$this->_dbase->GetTable("pago.proyecto");
        $count = $datos->Contains(array('contratooooid' => "'$id'"));
       if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Contratoooo a eliminar esta siendo usado por Proyecto.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("pago.Contratoooo");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['combo_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
//        $combo = $params['combo_value_id'];
        $nombre = trim($nombre);
//        $combo = trim($combo);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Contratoooo incorrecto.");
            return false;
        }
//
//        $_valid = Validator::CheckStringSize($combo, 3, 200);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nombre del Cliente incorrecto.");
//            return false;
//        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        $actividades = $this->_dbase->GetTable('pago.Contratoooo');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Contratoooo '$nombre' ya existe.");
            return false;
        }
        return true;
       }

    public function Add(&$params){
        $name=$params['nombre_id'];
        //$number=$params['numero_id'];
        $anno=$params['combo_value_id'];
//        $tabla=$this->_dbase->GetTable("pago.cliente");
//        $idanno=$tabla->GetValueWhere('id',"nombre='$anno'");
        $datos=$this->_dbase->GetTable("pago.contratoooo");

       return $data=$datos->InsertValues(array('clienteid' => "'$anno'",'nombre' => "'$name'"));

    }
    // ========================================================================//
    public function ValidateModif(&$params)
    {
        if (!isset($params['nombre_id_upd'])&&!isset($params['combo_value_id_upd']))
    {
        $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
        return false;
    }

        $nombre = $params['nombre_id_upd'];
        $combo = $params['combo_value_id_upd'];
        $nombre = trim($nombre);
        $combo = trim($combo);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Contratoooo incorrecto.");
            return false;
        }
//
//        $_valid = Validator::CheckStringSize($combo, 3, 200);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nombre del Cliente incorrecto.");
//            return false;
//        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        $actividades = $this->_dbase->GetTable('pago.contratoooo');
        $count = $actividades->Contains(array('nombre' => "'$nombre'",'clienteid' => "'$combo'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Contratooo ya existe.");
            return false;
        }
        return true;
    }
    public function Modif(&$params){

//        $nameold=$params['old_name'];
//        $datos=$this->_dbase->GetTable("pago.contratoooo");
//        $datos->DeleteWhere("nombre = '$nameold'");
//        return $data=$datos->InsertValues(array('clienteid' => "'$number'",'nombre' => "'$name'"));


        $name=$params['nombre_id_upd'];
        $number=$params['combo_value_id_upd'];
        $oldname=$params['old_name'];
        $oldnumber=$params['old_cliente'];

        $tablaanno=$this->_dbase->GetTable("vistas_resumen.clientesscontratoss");
        $idcontratoooo=$tablaanno->GetValueWhere('id',"clienteid <= '$oldnumber' AND nombre <= '$oldname'");

        $datos=$this->_dbase->GetTable("pago.contratoooo");
        $datos->Update(array('clienteid' => "'$number'",'nombre' => "'$name'"),"id = '$idcontratoooo'");

        if(!$datos)
        {
            return false;
        }
        return true;

    }

};
?>
