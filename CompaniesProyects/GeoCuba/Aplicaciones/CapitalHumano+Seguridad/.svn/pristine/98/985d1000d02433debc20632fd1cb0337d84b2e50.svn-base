 <?PHP

class Descuentos extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_descuentos');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarDatos_cuentas(&$params) {
        return true;
    }
    public function CargarDatos_cuentas(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('salario.class_cuentas');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true' and naturaleza='Acreedora'");
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
                $datos=$this->_dbase->GetTable("salario.descuentos");
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
       $datosIns=null;
       $datos=$this->_dbase->GetTable("salario.descuentos");
       $criterios=$this->_dbase->GetTable("salario.class_cuentas");
       for($i=0;$i<count($data);$i++)
       {
           $descuentos_id = $data[$i]->descuentos_id;
           $cuentas_id = $data[$i]->cuentas_id;
           $nombre = $data[$i]->nombre;
           $limitado = $data[$i]->limitado;
           if ($limitado == '')$limitado='false';
           $nombre_cuenta = $data[$i]->nombre_cuenta;
           $id_cuentas =  $id_criterio_0=$criterios->GetValueBy('id',array('nombre' => "'$nombre_cuenta'"));

        if(!isset($descuentos_id)){

            $datos->Update(array('nombre' => "'$nombre'",'limitado' => "'$limitado'",'id_cuaenta' => "'$cuentas_id'"),"id = '$descuentos_id'"); }
        else{
            $datos->InsertValues(array('nombre' => "'$nombre'",'limitado' => "'$limitado'",'id_cuaenta' => "'$id_cuentas'"));}

       }
      return true;

    }
    // ========================================================================//






};
?>
