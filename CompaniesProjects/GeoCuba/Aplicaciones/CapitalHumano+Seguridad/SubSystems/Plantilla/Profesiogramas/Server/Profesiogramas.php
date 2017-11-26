<?PHP

class Profesiogramas extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//
    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data2 = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.profesiograma');
        $_data = $_table->GetRange($_limit, $_start);
        for($i=0;$i<count($_data);$i++)
        {
            $_elem = "<div class='success'><div class='label label-info'><b>".$_data[$i]['nombre_completo']."</div></b><br/><b>Agencia:</b> ".$_data[$i]['agencia']."<br/><b>Area:</b> ".$_data[$i]['area']."<br><b>Cargo:</b> ".$_data[$i]['cargo']."</div>";
            $_data[$i]['compuesto']=$_elem;

        }
        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


    public function Validatecualidades(&$params) {
        return true;
    }
    public function cualidades(&$params) {
        $_data = array();
        $_count = 0;
        $info = $params['info'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('capacitacion.cualidades_deficiencias');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true'and contrato_id = '$info'");
        if (is_null($_data))
            return false;
        if(!is_array($_data))
            $_data = array();
        $_count = count($_data);;
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateNecesidades(&$params) {
        return true;
    }
    public function Necesidades(&$params) {
        $_data = array();
        $_count = 0;
        $info = $params['info'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('capacitacion.nesecidad_aprendisaje');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true' and contrato_id = '$info'");
        if (is_null($_data))
            return false;
        if(!is_array($_data))
            $_data = array();
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


    public function ValidateCargarDatosPro(&$params) {
        return true;
    }
    public function CargarDatosPro(&$params) {
        $id=$params["contrato"];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.historial_profeciograma');
        $_data = $_table->GetRange($_limit, $_start,"contrato_id = '$id' and activo='true'");
        if (is_null($_data)){return false;}
        $_count = $_table->GetRowsCount();
        if ($_count == -1){return false;}
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
        $datos=$this->_dbase->GetTable("plantilla.historial_profeciograma");
        $result = $datos->Update(array('activo' =>"'false'"),"id = '$id'");
        if ($result) {
            return true;
        }
        else
            return false;
    }
    // ========================================================================//
    public function ValidateAdicionar(){
        return true;
    }
    public function Adicionar(&$params) {
        // Get parameters
        $html=$params['html'];
        $contrato=$params['id'];
        $fecha=date('Y-m-d');
        $datos=$this->_dbase->GetTable("plantilla.historial_profeciograma");
        $data=$datos->InsertValues(array('fecha' => "'$fecha'",'profeciograma' => "'$html'",'contrato_id'=>"'$contrato'"));
        if ($data)
            return  true;
        else
            return false;

    }
    // ========================================================================//
    public function ValidateModid(&$params){
        return true;
    }
    public function Modid(&$params){
        $html=$params['html'];
        $id=$params['id'];
        if($html != '' && $id != '')
        {
            $datos=$this->_dbase->GetTable("plantilla.historial_profeciograma");
            $datos->Update(array('profeciograma' => "'$html'"),"id = '$id'");
            return true;
        }
        else
        return false;
    }
    //=============================================================================================//

    public function ValidateEliminarNecs(&$params) {
        return true;
    }
    public function EliminarNecs(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id) {
            $datos=$this->_dbase->GetTable("capacitacion.nesecidad_aprendisaje");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else return false;
    }

    public function ValidateAddNesc(&$params){
        return true;
    }
    public function AddNesc(&$params){
        $data = json_decode($params['data']);
        $datos=$this->_dbase->GetTable("capacitacion.nesecidad_aprendisaje");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->id;
            $lugar = $data[$i]->lugar;
            $acciones = $data[$i]->acciones;
            $necesidades = $data[$i]->necesidades;
            $contrato_id = $data[$i]->contrato_id;
            $fecha_inicio = date('Y-m-d',strtotime($data[$i]->inicio));
            $facha_fin = date('Y-m-d',strtotime($data[$i]->terminacion));

            if(isset($id)){
                $datosIns=$datos->Update(array(
                    'lugar  ' => "'$lugar'",
                    'necesidades' => "'$necesidades'",
                    'contrato_id' => "'$contrato_id'",
                    'acciones' => "'$acciones'",
                    'inicio' => "'$fecha_inicio'",
                    'terminacion' => "'$facha_fin'"
                ),"id = '$id'");
            }
            else{
                $datosIns=$datos->InsertValues(array(
                    'lugar  ' => "'$lugar'",
                    'necesidades' => "'$necesidades'",
                    'contrato_id' => "'$contrato_id'",
                    'acciones' => "'$acciones'",
                    'inicio' => "'$fecha_inicio'",
                    'terminacion' => "'$facha_fin'"
                ));
            }
        }
        return true;
    }
    // ========================================================================//

    public function ValidateEliminarCual(&$params) {
        return true;
    }
    public function EliminarCual(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id) {
            $datos=$this->_dbase->GetTable("capacitacion.cualidades_deficiencias");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else return false;
    }

    public function ValidateAddCual(&$params){
        return true;
    }
    public function AddCual(&$params){
        $data = json_decode($params['data']);
        $datos=$this->_dbase->GetTable("capacitacion.cualidades_deficiencias");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->id;
            $nombre = $data[$i]->nombre;
            $tipo = $data[$i]->tipo;
            $contrato_id = $data[$i]->contrato_id;
            if(isset($id)){
                $datosIns=$datos->Update(array(
                    'nombre  ' => "'$nombre'",
                    'tipo' => "'$tipo'",
                    'contrato_id' => "'$contrato_id'"
                ),"id = '$id'");
            }
            else{
                $datosIns=$datos->InsertValues(array(
                    'nombre  ' => "'$nombre'",
                    'tipo' => "'$tipo'",
                    'contrato_id' => "'$contrato_id'"
                ));
            }
        }
        return true;
    }

};
?>