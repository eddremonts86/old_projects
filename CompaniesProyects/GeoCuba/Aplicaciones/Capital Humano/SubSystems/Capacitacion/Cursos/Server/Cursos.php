 <?PHP

class Cursos extends Module {
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

        $dia=date("Y-m-d");
        $datos=$this->_dbase->GetTable("nomencladores.cursos");
        $datos->Update(array('activo' => "'false'"),"fecha_fin < '$dia'");

        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cursosyeventos');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatosEventos(&$params) {
        return true;
    }
    public function CargarDatosEventos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.eventos');
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
    public function ValidateCargarDatoscursos(&$params) {
        return true;
    }
    public function CargarDatoscursos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.cursos');
        $_data = $_table->GetAll("activo='false'");
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
/*
        $datos=$this->_dbase->GetTable("capacitacion.curso_trabajador");
        $count = $datos->Contains(array('curso_id' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cursos a eliminar esta siendo usado por Contrato.");
            return false;
        }*/

//        $datos=$this->_dbase->GetTable("nomencladores.anno_mes");
//        $count2 = $datos->Contains(array('annoid' => "'$id'"));
//        if ($count2 > 0) {
//            $this->RegisterError('Operación no válida', "El Cursos a eliminar esta siendo usado por anno_mes.");
//            return false;
//        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.cursos");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
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
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cursos incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('nomencladores.cursos');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cursos o Evento '$nombre' ya existe.");
            return false;
        }return true;
       }
    public function Add(&$params){
       $name=$params['nombre_id'];
       $inicio=$params['inicio'];
       $fin=$params['fin'];
       $combo=$params['combo'];
        $descripcion=$params['descrip'];
       $datos=$this->_dbase->GetTable("nomencladores.cursos");
       return $data=$datos->InsertValues(array('eventos_id' => "'$combo'",'nombre' => "'$name'",'fecha_inicio' => "'$inicio'",'descripcion' => "'$descripcion'",'fecha_fin' => "'$fin'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['nombre_Udt_id'])||!isset($params['id_Udt_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        $nombre = $params['nombre_Udt_id'];
        $id = $params['id_Udt_id'];

        $nombre = trim($nombre);
        $id = trim($id);

        $_valid = Validator::CheckStringSize($id, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cursos o Evento es  incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_Udt_id'];
        $ids=$params['id_Udt_id'];
        $inicio=$params['inicio'];
        $fin=$params['fin'];
        $combo=$params['combo'];
        $descripcion=$params['descrip'];
        $datos=$this->_dbase->GetTable("nomencladores.cursos");
        $datos->Update(array('eventos_id' => "'$combo'",'nombre' => "'$name'",'fecha_inicio' => "'$inicio'",'fecha_fin' => "'$fin'",'descripcion' => "'$descripcion'"),"id = '$ids'");
        return true;
    }
    // ========================================================================//
    public function Validateactivar(&$params){ return true;}
    public function activar(&$params){
        $ids=$params['id'];

        $inicio=$params['inicio'];
        $inicio=explode('T00:00:00',$inicio);

        $fin=$params['fin'];
        $fin=explode('T00:00:00',$fin);


        $datos=$this->_dbase->GetTable("nomencladores.cursos");
        $datos->Update(array('fecha_inicio' => "'$inicio[0]'",'fecha_fin' => "'$fin[0]'",'activo' => "'true'"),"id = '$ids'");
        return true;
    }
};
?>
