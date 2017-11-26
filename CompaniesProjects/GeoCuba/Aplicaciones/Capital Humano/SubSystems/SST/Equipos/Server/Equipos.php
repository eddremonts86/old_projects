<?PHP

class Equipos extends Module {

    public function __construct() {
        parent::__construct('common.ch');
    }

    public function ValidateCargarDatos(&$params) {
        return true;
    }

    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.equipos_proteccion');
        $_data = $_table->GetRange($_limit, $_start, "activo = 'true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateEliminar(&$params) {
        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('listado_cargosid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Tipo de Cargo a eliminar está siendo usado por Plantilla.");
            return false;
        }

        return true;
    }

    public function Eliminar(&$params) {
        $id = $params['id'];
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("sst.equipos_proteccion");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else
            return false;
    }

    public function ValidateAdd(&$params) {       
        return true;
    }

    public function Add(&$params) {
//        print_r($params);die;
        $datos = $this->_dbase->GetTable("sst.equipos_proteccion");
        $relacion = $this->_dbase->GetTable("sst.equipos_cargos");
//        'cant'=>"'".$params['cant']."'", AND cant = '".$params['cant']."'
        $datos->InsertValues(array('nombre_equipo'=>"'".$params['nombre_equipo']."'",'vida_util'=>"'".$params['vida_util']."'"));
        $id = $datos->GetValueWhere('id', "nombre_equipo = '".$params['nombre_equipo']."' AND vida_util = '".$params['vida_util']."'",'fecha_registro','desc');
        $data = json_decode($params['data']);
//        print_r(($data));die;
        if ($id != '' && $id != null)
            for ($i = 0; $i < count($data); $i++) {   
                 $relacion->InsertValues(array('id_equipo' => "'$id'", 'cant' => "'".$data[$i]->cant."'", 'id_cargo' => "'".$data[$i]->id."'"));
            }
        return true;
    }

    public function ValidateModid(&$params) {

        if (!isset($params['plazas']) || !isset($params['Area']) || !isset($params['Cargo']) || !isset($params['id']) || !isset($params['Resolución'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $plazas = $params['plazas'];

        $plazas = trim($plazas);

        $_valid = Validator::CheckStringSize($plazas, 1, 5);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cargo incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($plazas);
        $params['plazas'] = $plazas;
        return true;
    }

    public function Modid(&$params) {
        $datos = $this->_dbase->GetTable("sst.equipos_proteccion");
        $relacion = $this->_dbase->GetTable("sst.equipos_cargos");
        $id = $params['id'];
//        'cant'=>"'".$params['cant']."'", AND cant = '".$params['cant']."'
        $datos->Update("nombre_equipo = '".$params['nombre_equipo']."' AND vida_util = '".$params['vida_util']."'","id = '$id'");
        
        $data = json_decode($params['data']);
        $relacion->DeleteWhere("id = '$id'");
//        print_r(($data));die;
        if ($id != '' && $id != null)
            for ($i = 0; $i < count($data); $i++) {   
                 $relacion->InsertValues(array('id_equipo' => "'$id'", 'cant' => "'".$data[$i]->cant."'", 'id_cargo' => "'".$data[$i]->id."'"));
            }
        return true;
    }

    public function ValidateCargarDatosArea(&$params) {
        return true;
    }

    public function CargarDatosArea(&$params) {
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

    public function ValidateCargarDatosCargo(&$params) {
        return true;
    }

    public function CargarDatosCargo(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->Select("SELECT DISTINCT id,resolucion,id_area,cargo, id_agencia, nombre_agencia, id_cargo FROM vistas_resumen.listado_de_cargos WHERE activo = 't';");
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatosUnidad(&$params) {
        return true;
    }

    public function CargarDatosUnidad(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.agencia');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatosResolucion(&$params) {
        return true;
    }

    public function CargarDatosResolucion(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.resolucion');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatosCargoModificar(&$params) {

        return true;
    }

    public function CargarDatosCargoModificar(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id_equipo'];
        $_table = $this->_dbase->Select("SELECT DISTINCT id,resolucion,id_area,cargo, id_agencia, nombre_agencia,
            id_cargo FROM vistas_resumen.listado_de_cargos WHERE activo = 't' AND id_cargo NOT IN (SELECT id_cargo FROM sst.equipos.cargos WHERE id_equipo ='$id');");
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatosCargoExistente(&$params) {

        return true;
    }

    public function CargarDatosCargoExistente(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id_equipo'];
        $_table = $this->_dbase->Select("SELECT DISTINCT id,resolucion,id_area,cargo, id_agencia, nombre_agencia
                                                id_cargo,cant FROM vistas_resumen.listado_de_cargos 
                                            LEFT JOIN sst.equipos_cargos ON equipos_cargos.id_cargo = id
                                            WHERE activo = 't' AND id_equipo = '$id';");
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateCargarContratoExistente(&$params) {

        return true;
    }

    public function CargarContratoExistente(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.contratos_activos');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateCargarDatosEquipo(&$params) {

        return true;
    }

    public function CargarDatosEquipo(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id_c = $params['id_contrato'];
        $id_cargo = $params['id_cargo'];
        $str = "SELECT equipos_proteccion.nombre_equipo, listado_de_cargos.resolucion,
                                                equipos_proteccion.id, 
                                                equipos_proteccion.cant as total, 
                                                equipos_cargos.cant,
                                                equipos_cargos.id_cargo,
                                                equipos_proteccion.vida_util
                                              FROM 
                                                sst.equipos_cargos 
                                                INNER JOIN sst.equipos_proteccion ON equipos_proteccion.id = equipos_cargos.id_equipo
                                                INNER JOIN vistas_resumen.listado_de_cargos ON listado_de_cargos.id = equipos_cargos.id_cargo
                                              WHERE equipos_proteccion.activo = 't' AND equipos_cargos.id_cargo = '$id_cargo' AND equipos_proteccion.id NOT IN (SELECT id_equipo FROM sst.asignaciones WHERE id_contrato = '$id_c')";
//        print_r($str);die;
        $_table = $this->_dbase->Select($str);
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateCargarDatosEquipoExistentes(&$params) {

        return true;
    }

    public function CargarDatosEquipoExistentes(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id_c = $params['id_contrato'];
        $id_cargo = $params['id_cargo'];
        $filtro = "";
        if($id_cargo != '' && $id_c != ''){
            $filtro = "equipos_cargos.id_cargo = '$id_cargo' AND id_contrato = '$id_c' AND";
        }
        $str = "SELECT equipos_proteccion.nombre_equipo, listado_de_cargos.resolucion,
                       equipos_proteccion.id, 
                       equipos_proteccion.cant as total, 
                       equipos_cargos.cant,
                       equipos_cargos.id_cargo,
                       asignaciones.cantidad,
                       equipos_proteccion.vida_util
                     FROM 
                       sst.equipos_cargos 
                       INNER JOIN sst.equipos_proteccion ON equipos_proteccion.id = equipos_cargos.id_equipo
                       INNER JOIN vistas_resumen.listado_de_cargos ON listado_de_cargos.id = equipos_cargos.id_cargo
                       INNER JOIN sst.asignaciones ON asignaciones.id_cargo = equipos_cargos.id_cargo AND asignaciones.id_equipo = equipos_cargos.id_equipo
                     WHERE $filtro equipos_proteccion.activo = 't'";
//        print_r($str);die;
        $_table = $this->_dbase->Select($str);
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function AssociarEquiposAPersonas(&$params){        
        $datos = $this->_dbase->GetTable("sst.asignaciones");
        $relacion = $this->_dbase->GetTable("sst.equipos_cargos");
        $persona = json_decode($params['persona']);
        
        //$id = $datos->GetValueWhere('id', "nombre_equipo = '".$params['nombre_equipo']."' AND vida_util = '".$params['vida_util']."'",'fecha_registro','desc');
        $data = json_decode($params['data']);
        //if ($id != '' && $id != null)
        for ($i = 0; $i < count($data); $i++) {   
             $datos->InsertValues(array('id_equipo'=>"'".$data[$i]->id."'",'id_contrato'=>"'".$persona->id."'",'id_cargo'=>"'".$persona->id_list_cargos."'",'cantidad'=>"'".$data[$i]->cantidad."'"));
        }
        return true;
    }
    
    public function ValidateAssociarEquiposAPersonas(&$params){
        return true;
    }

    public function ValidateCargarDatosEquipoRelacionados(&$params) {

        return true;
    }

    public function CargarDatosEquipoRelacionados(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id_c = $params['id_contrato'];
        $id_cargo = $params['id_cargo'];
        $filtro = "";
        if($id_cargo != '' && $id_c != ''){
            $filtro = "equipos_cargos.id_cargo = '$id_cargo' AND id_contrato = '$id_c' AND";
        }
        $str = "SELECT trabajador.nombre_completo,equipos_proteccion.nombre_equipo, listado_de_cargos.resolucion,
                       equipos_proteccion.id,
                       equipos_proteccion.cant as total,
                       equipos_cargos.cant,
                       equipos_cargos.id_cargo,
                       asignaciones.cantidad,
                       date(asignaciones.fecha_asignacion) as fecha_asignacion,
                       equipos_proteccion.vida_util,id_agencia,id_area,asignaciones.*
                     FROM
                       sst.equipos_cargos
                       INNER JOIN sst.equipos_proteccion ON equipos_proteccion.id = equipos_cargos.id_equipo
                       INNER JOIN vistas_resumen.listado_de_cargos ON listado_de_cargos.id = equipos_cargos.id_cargo
                       INNER JOIN sst.asignaciones ON asignaciones.id_cargo = equipos_cargos.id_cargo AND asignaciones.id_equipo = equipos_cargos.id_equipo
                       INNER JOIN pago.contrato ON asignaciones.id_contrato::text = contrato.id::text
		               INNER JOIN plantilla.trabajador ON trabajador.id::text = contrato.trabajadorid::text
                     WHERE $filtro equipos_proteccion.activo = 't'";
//        print_r($str);die;
        $_table = $this->_dbase->Select($str);
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateEliminarAsociacion(&$params) {
        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('listado_cargosid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Tipo de Cargo a eliminar está siendo usado por Plantilla.");
            return false;
        }

        return true;
    }

    public function EliminarAsociacion(&$params) {
        print_r($params);die;
        $id_contrato = $params['id_contrato'];
        $id_cargo    = $params['id_cargo'];
        $id_equipo   = $params['id_equipo'];
        $result = null;
        $datos = $this->_dbase->GetTable("sst.asignaciones");
        $result = $datos->DeleteWhere("id_contrato = '$id_contrato' AND id_cargo = '$id_cargo' AND id_equipo = '$id_equipo'");
        return $result;
    }

}


?>
