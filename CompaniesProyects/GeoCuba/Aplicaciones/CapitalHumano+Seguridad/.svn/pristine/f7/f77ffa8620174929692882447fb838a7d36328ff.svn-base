 <?PHP

class Control_certificados extends Module {
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
        $_table = $this->_dbase->GetTable('capacitacion.control_certificados');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
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

        $datos=$this->_dbase->GetTable("capacitacion.formacion_profecional");
        $count = $datos->Contains(array('categoria_cientificaa_id' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Control_certificados a eliminar esta siendo usado por Contrato.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("capacitacion.control_certificados");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }

    // ========================================================================//
    public function ValidateAdd(&$params){
       return true;
       }
    public function Add(&$params){
       $data = json_decode($params['data']);
       $datos=$this->_dbase->GetTable("capacitacion.control_certificados");
       for($i=0;$i<count($data);$i++)
       {
           $id = $data[$i]->id;
           $a_favor = $data[$i]->a_favor;
           $titulo = $data[$i]->titulo;
           $tomo = $data[$i]->tomo;
           $folio = $data[$i]->folio;
           $emision = $data[$i]->emision;
           $registro = $data[$i]->registro;


           if(isset($id)){
               $datosIns=$datos->Update(array(
                                        'a_favor' => "'$a_favor'",
                                        'titulo' => "'$titulo'",
                                        'tomo' => "'$tomo'",
                                        'folio' => "'$folio'",
                                        'emision' => "'$emision'",
                                        'registro' => "'$registro'"
                                        ),"id = '$id'");
           }
           else{
               $datosIns=$datos->InsertValues(array(  'a_favor' => "'$a_favor'",
                                                       'titulo' => "'$titulo'",
                                                       'tomo' => "'$tomo'",
                                                       'folio' => "'$folio'",
                                                       'emision' => "'$emision'",
                                                       'registro' => "'$registro'"
                                                        ));
           }
       }
       return true;
    }
    // ========================================================================//






};
?>
