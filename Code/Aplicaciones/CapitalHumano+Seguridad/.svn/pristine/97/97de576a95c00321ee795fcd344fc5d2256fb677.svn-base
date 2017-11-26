 <?PHP

class Anno_Mes extends Module {
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
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarMes(&$params) {
        return true;
    }
    public function CargarMes(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.mes');
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
        $_table = $this->_dbase->GetTable('vistas_resumen.anno_mes_vista');
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
        $count = $datos->Contains(array('anno_mesid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Año_Mes a eliminar esta siendo usado por Reporte_Pago.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['combo_value_id_anno']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        if (!isset($params['combo_value_id_mes']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['combo_value_id_anno'];
        $numero = $params['combo_value_id_mes'];


        $nombre = trim($nombre);
        $numero = trim($numero);

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($numero);
        $params['new_nombre'] = $nombre;
//
//        $tabla_annos=$this->_dbase->GetTable("nomencladores.anno");
//        $idanno=$tabla_annos->GetValueWhere('id',"valor=$nombre");
//
//        $tabla_mes=$this->_dbase->GetTable("nomencladores.mes");
//        $idmes=$tabla_mes->GetValueWhere('id',"nombre='$numero'");
        $idanno_mes=null;
        $tablaanno=$this->_dbase->GetTable("nomencladores.anno_mes");
        $count=$tablaanno->Contains(array('annoid' =>"'$nombre'" , 'mesid'=> "'$numero'"));

//        $actividades = $this->_dbase->GetTable('nomencladores.anno_mes');
//        $count = $actividades->Contains(array('annoid' => "'$nombre'"));
//        $count2 = $actividades->Contains(array('mesid' => "'$numero'"));

        if ($count > 0) {
            $this->RegisterError('Operación no válida',"El Año_Mes ya existe.");
            return false;
        }
        elseif($count < 0)
        {
            return false;
        }
        return true;
       }

    public function Add(&$params){
        $anno=$params['combo_value_id_anno'];
        $mes=$params['combo_value_id_mes'];
//
//        $tabla_annos=$this->_dbase->GetTable("nomencladores.anno");
//        $idanno=$tabla_annos->GetValueWhere('id',"valor=$anno");
//
//        $tabla_mes=$this->_dbase->GetTable("nomencladores.mes");
//        $idmes=$tabla_mes->GetValueWhere('id',"nombre='$mes'");

        $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
        return $data=$datos->InsertValues(array('annoid' => "'$anno'",'mesid' => "'$mes'"));

    }
    // ========================================================================//
    public function ValidateModif(&$params){
        if (!isset($params['combo_value_id_anno_upd']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        if (!isset($params['combo_value_id_mes_upd']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['combo_value_id_anno_upd'];
        $numero = $params['combo_value_id_mes_upd'];


        $nombre = trim($nombre);
        $numero = trim($numero);

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($numero);
        $params['new_nombre'] = $nombre;

//        $old_nombre= $params['old_name'];


//        $tablaanno=$this->_dbase->GetTable("nomencladores.anno");
//        $idanno=$tablaanno->GetValueWhere('id',"valor=$nombre");

        $actividades = $this->_dbase->GetTable('nomencladores.anno_mes');
        $count=$actividades->Contains(array('annoid' =>"'$nombre'" , 'mesid'=> "'$numero'"));
        if ($count > 0)
        {
            $this->RegisterError('Operación no válida', "El nombre Año_Mes ya existe.");
            return false;
        }
        elseif($count < 0)
        {
            return false;
        }
            return true;

    }


    public function Modif(&$params){
        $anno=$params['combo_value_id_anno_upd'];
        $mes=$params['combo_value_id_mes_upd'];
        $old_mes=$params['old_mes'];
        $old_anno=$params['old_anno'];


        $tablaanno=$this->_dbase->GetTable("vistas_resumen.anno_mes_vista");
        $idanno_mes=$tablaanno->GetValueWhere('id',"valor <= '$old_anno' AND nombre <= '$old_mes'");

//        $tablaanno=$this->_dbase->GetTable("nomencladores.anno");
//        $idannold=$tablaanno->GetValueWhere('id',"valor=$old_dupla");

//        $tablames=$this->_dbase->GetTable("nomencladores.mes");
//        $idmes=$tablames->GetValueWhere('id',"nombre='$mes'");



        $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
        $datos->Update(array('annoid' => "'$anno'",'mesid' => "'$mes'",'id' => "'$idanno_mes'"),"id = '$idanno_mes'");

        if(!$datos)
        {
           return false;
        }
        return true;
    }

    public function ValidateAddannos(&$params){

        if(!isset($params['nombre_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre,1 , 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Año incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('nomencladores.anno');
        $count = $actividades->Contains(array('valor' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Año_Mes '$nombre' ya existe.");
            return false;
        }return true;
    }

    public function Addannos(&$params){
        $name=$params['nombre_id'];
        $datos=$this->_dbase->GetTable("nomencladores.anno");
        return $data=$datos->InsertValues(array('valor' => "'$name'"));

    }

    public function ValidateAddmes(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['numero_id'])&&!isset($params['combo_value_id_anno']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $numero = $params['numero_id'];
        $combo = $params['combo_value_id_anno'];

        $nombre = trim($nombre);
        $numero = trim($numero);
//        $combo = trim($combo);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Año incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($numero,1);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Mes incorrecto.");
            return false;
        }
//        $_valid = Validator::CheckStringSize($combo, 3, 200);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Mes incorrecto.");
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
            $this->RegisterError('Operación no válida', "El Año_Mes '$nombre' ya existe.");
            return false;
        }
        return true;
    }

    public function Addmes(&$params){
        $name=$params['nombre_id'];
        $number=$params['numero_id'];
        $anno=$params['combo_value_id_anno'];
//        $tabla=$this->_dbase->GetTable("nomencladores.anno");
//        $idanno=$tabla->GetValueWhere('id',"valor=$anno");
        $datos=$this->_dbase->GetTable("nomencladores.mes");

        return $data=$datos->InsertValues(array('nombre' => "'$name'",'numero' => "'$number'",'annoid' => "'$anno'"));

    }




};
?>
