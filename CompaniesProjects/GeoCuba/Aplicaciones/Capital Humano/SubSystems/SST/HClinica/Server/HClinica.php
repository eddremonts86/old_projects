<?PHP

class HClinica extends Module {

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
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_historia_clinica');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
/*************************************************************************/
//Examenes Medicos...
/*************************************************************************/
    public function ExamenesMedicos($params){
        $id = $params['id'];
        $_table = $this->_dbase->Select("SELECT DISTINCT * FROM sst.tipo_examen
                                            INNER JOIN sst.examenes_medicos ON tipo_examen.id = examenes_medicos.id_tipo_examen
                                            WHERE activo = 't' AND id_trabajador = '$id';");
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateExamenesMedicos(&$params) {
        return true;
    }

    public function TipoExamenes($params){
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('sst.tipo_examen');
        $_data = $_table->GetAll("activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateTipoExamenes(&$params) {
        return true;
    }

    public function ValidateEliminarExamenes(&$params) {
        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('listado_cargosid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Tipo de Cargo a eliminar está siendo usado por Plantilla.");
            return false;
        }

        return true;
    }

    public function EliminarExamenes(&$params) {
        $id = $params['id'];
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("sst.examenes_medicos");
            $result = $datos->DeleteWhere("id = '$id'");
            return true;
        }
        else
            return false;
    }

    public function ValidateSalvarExamenes(&$params){
        return true;
    }

    public function SalvarExamenes(&$params){
        $datos=$this->_dbase->GetTable("sst.examenes_medicos");
        $datas = explode(';',$params['examenes']);

        foreach($datas as $data){
            if($data != ''){
                $valores = explode('|',$data);
                $insertar = array(
                    'id_trabajador'=>"'".$params['id']."'",
                    'id_tipo_examen'=>"'".$valores[1]."'",
                    'resultado'=>"'".$valores[2]."'",
                    'fecha_emision'=>"'".date('Y-m-d',strtotime($valores[3]))."'"
                );

                if($valores[0] == ''){
                    $datosIns = $datos->InsertValues($insertar);
                    if($datosIns == null){
                        $this->RegisterError('Operación no válida', "No se pudo insertar el examen.");
                        return false;
                    }
                }
                else{
                    $datos->Update($insertar,"id = '".$valores[0]."'");
                }
            }

        }

        return true;
    }
/*************************************************************************/
//Vacunacion...
/*************************************************************************/
    public function ValidateGuardarVacunacion(&$params){
        return true;
    }

    public function GuardarVacunacion(&$params){
        $datos=$this->_dbase->GetTable("sst.historia_clinica");
        $count = $datos->Contains(array('id_trabajador' => "'".$params['id']."'"));
        if ($count <= 0) {
           $datos->InsertValues(array('id_trabajador' => "'".$params['id']."'",'vacunacion'=>"'".$params['vacunacion']."'"));
            return true;
        }
        else{
            $datos->Update(array('vacunacion'=>"'".$params['vacunacion']."'"), "id_trabajador = '".$params['id']."'");
            return true;
        }

        return true;
    }

    public function ValidateGuardarOtros(&$params){
        return true;
    }

    public function GuardarOtros(&$params){
        $datos=$this->_dbase->GetTable("sst.historia_clinica");
        $count = $datos->Contains(array('id_trabajador' => "'".$params['id']."'"));
        if ($count <= 0) {
            $datos->InsertValues(array('id_trabajador' => "'".$params['id']."'",'app'=>"'".$params['app']."'",'apf'=>"'".$params['apf']."'",'i_d'=>"'".$params['i_d']."'"));
            return true;
        }
        else{
            $datos->Update(array('app'=>"'".$params['app']."'",'apf'=>"'".$params['apf']."'",'i_d'=>"'".$params['i_d']."'"), "id_trabajador = '".$params['id']."'");
            return true;
        }

        return true;
    }

    public function ValidateGuardarHabitos(&$params){
        return true;
    }

    public function GuardarHabitos(&$params){
        $datos=$this->_dbase->GetTable("sst.historia_clinica");
        //print_r($params);die;
        $count = $datos->Contains(array('id_trabajador' => "'".$params['id']."'"));
        if ($count <= 0) {
            $datos->InsertValues(array('id_trabajador' => "'".$params['id']."'",'dispen'=>"'".$params['disp']."'",'cafe'=>"'".$params['cafe']."'",'alcohol'=>"'".$params['alcohol']."'",'fumar'=>"'".$params['fumar']."'"));
            return true;
        }
        else{
            $datos->Update(array('id_trabajador' => "'".$params['id']."'",'dispen'=>"'".$params['disp']."'",'cafe'=>"'".$params['cafe']."'",'alcohol'=>"'".$params['alcohol']."'",'fumar'=>"'".$params['fumar']."'"), "id_trabajador = '".$params['id']."'");
            return true;
        }

        return true;
    }
}

;
?>
