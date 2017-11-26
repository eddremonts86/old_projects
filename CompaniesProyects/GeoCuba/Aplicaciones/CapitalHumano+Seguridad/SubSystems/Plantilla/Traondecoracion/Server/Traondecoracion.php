<?PHP

class Traondecoracion extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ch');
    }

    // ========================================================================//
    public function ValidateCargarDatos(&$params)
    {
        return true;
    }

    public function CargarDatos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_condec_vista');
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
    public function ValidateCargarDatosDeftip(&$params)
    {
        return true;
    }

    public function CargarDatosDeftip(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.condecoracion_vista');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //===================================================================================
    public function ValidateCargarDatostraid(&$params)
    {
        return true;
    }

    public function CargarDatostraid(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.trabajador');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //====================================================================================
    public function ValidateEliminar(&$params)
    {
        return true;
    }

    public function Eliminar(&$params)
    {
        $id = $params['id'];
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("plantilla.trabajador_condecoracion");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        } else return false;
    }

    // ========================================================================//
    public function ValidateAdd(&$params)
    {

        if (!isset($params['datos_deftip']) || !isset($params['datos_trabajador'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['datos_deftip'];
        $nombre1 = $params['datos_trabajador'];

        $nombre = trim($nombre);
        $nombre1 = trim($nombre1);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Trabajador incorrecto.");
            return false;
        }

        $_valid = Validator::CheckStringSize($nombre1, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la Condecoración incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['datos_deftip'] = $nombre;
        Validator::ToCleanSQL($nombre1);
        $params['datos_trabajador'] = $nombre1;

        return true;
       }
   /* public function Add(&$params){
       $nameT=$params['datos_trabajador'];
       $nameU=$params['datos_deftip'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_data_result = $this->_dbase->Select(
            "SELECT id FROM plantilla.condecoracion WHERE condecoracion_tipoid = "."'$nameU'",$_limit,$_start);

    }*/

    public function Add(&$params)
    {
        $nameT = $params['datos_trabajador'];
          $nameU = $params['datos_deftip'];
            $_start = ($params['start']) ? $params['start'] : 0;
            $_limit = $params['limit'];
          $_data_result = $this->_dbase->Select("SELECT id FROM plantilla.condecoracion WHERE condecoracion_tipoid = " . "'$nameU'", $_limit, $_start);

        $_data = $_data_result->GetAll();

        if (is_null($_data))
            return false;
           $_count = count($_data);
        if ($_count == -1)
            return false;
        else

        $idN = $_data[0]['id'];
          $datos = $this->_dbase->GetTable("plantilla.trabajador_condecoracion");
        $datos->InsertValues(array('trabajadorid' => "'$nameT'", 'condecoracionid' => "'$idN'"));

        return true;
    }

    // ========================================================================//
    public function ValidateModid(&$params)
    {

        if (!isset($params['datos_deftip']) || !isset($params['datos_trabajador'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['datos_deftip'];
        $nombre1 = $params['datos_trabajador'];
        $nombre = trim($nombre);
        $nombre1 = trim($nombre1);
        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Trabajador incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($nombre1, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la Condecoración incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['datos_deftip'] = $nombre;
        Validator::ToCleanSQL($nombre1);
        $params['datos_trabajador'] = $nombre1;

        return true;
    }

    public function Modid(&$params)
    {
        $nameT = $params['datos_trabajador'];
        $nameU = $params['datos_deftip'];
        $id = $params['id_Udt_id'];

        $_data_result = $this->_dbase->Select("SELECT id FROM plantilla.condecoracion WHERE condecoracion_tipoid = " . "'$nameU'");
        $_data = $_data_result->GetAll();
        $idN = $_data[0]['id'];

        $datos = $this->_dbase->GetTable("plantilla.trabajador_condecoracion");
        $datos->Update(array('trabajadorid' => "'$nameT'", 'condecoracionid' => "'$idN'"), "id = '$id'");
        return true;
    }

};
?>
