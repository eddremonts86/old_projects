 <?PHP

class GeneralMes extends Module {
    public function  __construct() {
        parent::__construct('common.ark');
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
        $_table = $this->_dbase->GetTable('app_security.event_info');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'TotalRows' => $_count, 'Rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatoslugar(&$params) {
        return true;
    }
    public function CargarDatoslugar(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.lugar');
        $_data = $_table->GetRange($_limit, $_start);
        $_count=$_table->GetRowsCount();
        if (is_null($_data))
            return false;
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
	  public function Validatefilter(&$params) {
        return true;
    }
    public function filter(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
		
        $lugar = $params['lugar'];
        $mes= $params['mes'];
        $anno= $params['anno'];

        $_table = $this->_dbase->GetTable('vistas.gestion_historial');
        $_data = $_table->GetAll("lugar='$lugar' and mes='$mes' and anno = '$anno'");

        $result = array();
        $line = array();
        $day = 0;
        $maxPre=0;
        $minPre=0;
        $maxBaj=0;
        $minBaj=0;
        $HmaxPre=0;
        $HminPre=0;
        $HmaxBaj=0;
        $HminBaj=0;
        foreach($_data as $row)
        {
            if($row['fecha'] != $day)
            {
                if($day != 0)
                    array_push($result, $line);
                $day = $row['fecha'];
                $line = array('dia' => $day,'lugar' => $lugar);
                $maxPre=$row['altura'];
                $minBaj=$row['altura'];
                $minPre=$row['altura'];
                $maxBaj=$row['altura'];
                $HmaxPre=$row['hora'];
                $HminPre=$row['hora'];
                $HmaxBaj=$row['hora'];
                $HminBaj=$row['hora'];
            }
            $name = "hora".$row['hora'];

            if($maxPre<$row['altura'])
            {
                $maxPre=$row['altura']; $HmaxPre=$row['hora'];
            }
            if($minBaj>$row['altura'])
            {
                $minBaj=$row['altura']; $HminBaj=$row['hora'];
            }
            if($minPre<$row['altura']&& $row['altura']+1<$row['altura']&& $row['altura']-1<$row['altura'])
            {
                $minPre=$row['altura']; $HminPre=$row['hora'];
            }
            if($maxBaj>$row['altura']&& $row['altura']+1>$row['altura']&& $row['altura']-1>$row['altura'])
            {
                $maxBaj=$row['altura']; $HmaxBaj=$row['hora'];
            }
            $line['MaxP'] = $maxPre;   $line['HMaxP'] = $HmaxPre;
            $line['MaxB'] = $maxBaj;   $line['HMaxB'] = $HmaxBaj;
            $line['MinB'] = $minBaj;   $line['HMinB'] = $HminBaj;
            $line['MinP'] = $minPre;   $line['HMinP'] = $HminPre;

            $line[$name.'_A'] = $row['altura'];
            $line[$name.'_D'] = $row['direccion'];
            $line[$name.'_V'] = $row['velocidad'];
        }
        array_push($result, $line);
        if (is_null($result))
            return false;
        $_count = count($result);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $result);
        return $result;
    }
	
	// ========================================================================//
    public function ValidateEliminar(&$params) {
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("app_security.event_info");
                $result = $datos->DeleteWhere("id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){

       if (!isset($params['nombre_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('nomencladores.cargo_militar');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El cargo miltar '$nombre' ya existe.");
            return false;
        }
        return true;
       }
    public function Add(&$params){
        $Nombre=$params['Nombre'];
        $titulo=$params['titulo'];
        $caracter=$params['caracter'];
        $Cuerpo=$params['Cuerpo'];
        $tipo=$params['tipo'];
        $fecha = date('Y-m-d H:m:s');
        $datos=$this->_dbase->GetTable("app_security.event_info");
        return $data=$datos->InsertValues(array(
                                        'fecha' => "'$fecha'",
                                        'caracter' => "'$caracter'",
                                        'titulo' => "'$titulo'",
                                        'cuerpo' => "'$Cuerpo'",
                                        'tipo' => "'$tipo'",
                                        'nombre' => "'$Nombre'"
                                         ));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['nombre'])||!isset($params['id_Udt_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre'];
        $id = $params['id_Udt_id'];

        $nombre = trim($nombre);
        $id = trim($id);

        $_valid = Validator::CheckStringSize($id, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        $actividades = $this->_dbase->GetTable('nomencladores.cargo_militar');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El cargo miltar '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){
        $Nombre=$params['Nombre'];
        $titulo=$params['titulo'];
        $caracter=$params['caracter'];
        $Cuerpo=$params['Cuerpo'];
        $tipo=$params['tipo'];
        $ids=$params['id_tpo'];
        $datos=$this->_dbase->GetTable("app_security.event_info");
        $datos->Update(array(  'caracter' => "'$caracter'",
                                'titulo' => "'$titulo'",
                                'cuerpo' => "'$Cuerpo'",
                                'tipo' => "'$tipo'",
                                'nombre' => "'$Nombre'"),
                               "id = '$ids'");
        return true;
    }
};

?>
