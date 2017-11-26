 <?PHP

class Udefensa extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.ubicaciondfensa');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    // ========================================================================//
    public function ValidateCargarDatosDeftip(&$params) {
        return true;
    }
    public function CargarDatosDeftip(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.ubicacion_defensa_tipo');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //===================================================================================
    public function ValidateCargarDatostraid(&$params) {
        return true;
    }
    public function CargarDatostraid(&$params) {
        $_data = array();
        $filtro = '';
        if(isset($params['modif']))
            $filtro = 'AND id IN ( SELECT trabajador.id
                                    FROM plantilla.trabajador
                                    LEFT JOIN plantilla.ubicacion_defensa ON trabajador.id::text = ubicacion_defensa.trabajadorid::text
                                    LEFT JOIN nomencladores.ubicacion_defensa_tipo ON ubicacion_defensa_tipo.id::text = ubicacion_defensa.ubicacion_defensa_tipoid::text
                                    LEFT JOIN pago.contrato ON trabajador.id::text = contrato.trabajadorid::text
                                    LEFT JOIN plantilla.plantilla ON contrato.id::text = plantilla.contratoid::text
                                   WHERE trabajador.activo = true AND plantilla.activo = true AND ubicacion_defensa.activo = true)';
        $_count = 0;
        
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.trabajador');
        $_data = $_table->GetRange($_limit, $_start,"activo='true' $filtro");
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount("activo='true' $filtro");
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
   //====================================================================================
    public function ValidateEliminar(&$params) {
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("plantilla.ubicacion_defensa");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
       /* if (!isset($params['datos_deftip'])||!isset($params['datos_trabajador'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['datos_deftip'];
        $nombre1 = $params['datos_trabajador'];
        $nombre = trim($nombre);
        $nombre1 = trim($nombre1);
        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Ubicación de la Defensa incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($nombre1, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Ubicación de la Defensa incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;
        Validator::ToCleanSQL($nombre1);
        $params['new_nombre1'] = $nombre1;*/
       return true;
       }
    public function Add(&$params){
       $nameT=$params['datos_trabajador'];
       $nameU=$params['datos_deftip'];
       $datos=$this->_dbase->GetTable("plantilla.ubicacion_defensa");
       $a =  $datos->GetValueWhere('ubicacion_defensa_tipoid',"ubicacion_defensa_tipoid='$nameU' and trabajadorid ='$nameT'");
        if(!$a){
            return $datos->InsertValues(array('ubicacion_defensa_tipoid' => "'$nameU'",'trabajadorid' => "'$nameT'"));
        }
        else{
            return false;
        }
    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['datos_deftip'])||!isset($params['datos_trabajador'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['datos_deftip'];
        $nombre1 = $params['datos_trabajador'];
        $nombre = trim($nombre);
        $nombre1 = trim($nombre1);
        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Ubicación de la Defensa incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($nombre1, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Ubicación de la Defensa incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;
        Validator::ToCleanSQL($nombre1);
        $params['new_nombre1'] = $nombre1;

        return true;
    }
    public function Modid(&$params){
        $nameT=$params['new_nombre1'];
        $nameU=$params['new_nombre'];
        $id = $params['id_Udt_id'];
        $datos=$this->_dbase->GetTable("plantilla.ubicacion_defensa");
        $datos->Update(array('ubicacion_defensa_tipoid' => "'$nameU'",'trabajadorid' => "'$nameT'"),"id = '$id'");
        return true;
    }
};
?>