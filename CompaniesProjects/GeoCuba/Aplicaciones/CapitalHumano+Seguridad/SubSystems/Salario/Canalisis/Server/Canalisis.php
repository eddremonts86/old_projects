 <?PHP

class Canalisis extends Module {
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
        $_table = $this->_dbase->GetTable('salario.criterios_analisis');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
        if (is_null($_data))return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_geee(&$params) {
        return true;
    }
    public function CargarDatos_geee(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('salario.canalisis_compl');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true' and id_canailisis = '$id' ");
        if (is_null($_data))return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
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
                $datos=$this->_dbase->GetTable("salario.criterios_analisis");
                $datos->Update(array('activo' => 'false'),"id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){

        $datos=$this->_dbase->GetTable("salario.criterios_analisis");


        if (!isset($params['nombre'])||!isset($params['ave'])||!isset($params['clase'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre'];
        $ave = $params['ave'];
        $clase = $params['clase'];

        $nombre = trim($nombre);
        $clase = trim($clase);
        $ave = trim($ave);

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;
        Validator::ToCleanSQL($ave);
        $params['ave'] = $ave;
        Validator::ToCleanSQL($clase);
        $params['clase'] = $clase;


        $actividades = $this->_dbase->GetTable('salario.criterios_analisis');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
        $count1 = $actividades->Contains(array('ave' => "'$ave'"));
        $count2 = $actividades->Contains(array('clase' => "'$clase'"));

        if ($count < 0||$count1 < 0||$count2 < 0)
            return false;

        elseif ($count > 0||$count1 > 0||$count2 > 0)
        {
            $this->RegisterError('Operación no válida', "El Nombre '$nombre',la Abreviatura '$ave' o la clase '$clase' ya existe.");
            return false;
        }
        return true;






         return true;
       }
    public function Add(&$params){
       $nombre=$params['nombre'];
       $ave=$params['ave'];
       $formato=$params['formato'];
        $clase=$params['clase'];
       $datos=$this->_dbase->GetTable("salario.criterios_analisis");
       return $data=$datos->InsertValues(array('nombre' => "'$nombre'",'ave ' => "'$ave'",'formato' => "'$formato'",'clase' => "'$clase'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){


        return true;
    }
    public function Modid(&$params){
        $id_tpo=$params['id_tpo'];
        $nombre=$params['nombre'];
        $ave=$params['ave'];
        $formato=$params['formato'];
        $clase=$params['clase'];
        $datos=$this->_dbase->GetTable("salario.criterios_analisis");
        $datos->Update(array('nombre' => "'$nombre'",'ave ' => "'$ave'",'formato' => "'$formato'",'clase' => "'$clase'"),"id = '$id_tpo'");
        return true;
    }

    public function ValidateAdd_comp(&$params){
        return true;
    }
    public function Add_comp(&$params){
        $data = json_decode($params['data']);
        $id = $params['id'];
        $datos=$this->_dbase->GetTable("salario.canalisis_compl");
        for($i=0;$i<count($data);$i++)
        {
            $id_comp = $data[$i]->id;
            $nombre = $data[$i]->nombre;
           if(!$id_comp == 'NULL'){$datos->Update(array('nombre' => "'$nombre'",'id_canailisis' => "'$id'"),"id = '$id_comp'");}
           else{$datos->InsertValues(array('nombre' => "'$nombre'",'id_canailisis' => "'$id'"));}
        }
        return true;
    }

    public function ValidateEliminar_comp(&$params) {
        $id=$params['id'];

        $datos=$this->_dbase->GetTable("capacitacion.formacion_profecional");
        $count = $datos->Contains(array('categoria_cientificaa_id' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Control_certificados a eliminar esta siendo usado por Contrato.");
            return false;
        }
        return true;
    }
    public function Eliminar_comp(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id) {
            $datos=$this->_dbase->GetTable("salario.canalisis_compl");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else return false;
    }
    // ========================================================================//


};
?>
