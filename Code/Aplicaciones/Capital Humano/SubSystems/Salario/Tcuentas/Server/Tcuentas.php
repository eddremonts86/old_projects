 <?PHP

class Tcuentas extends Module {
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
        $_table = $this->_dbase->GetTable('salario.class_cuentas');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_desc(&$params) {
        return true;
    }
    public function CargarDatos_desc(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('salario.criterios_analisis');
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
    public function ValidateEliminar(&$params) {
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("salario.class_cuentas");
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
        $cuenta=$params['cuenta'];
        $nombre=$params['nombre'];
        $Deudora=$params['Deudora'];
        $Acreedora=$params['Acreedora'];
        $Obligaciones=$params['Obligaciones'];
        $Monedas=$params['Monedas'];
        $Submayor=$params['Submayor'];
        $data = json_decode($params['data']);
        if($Deudora=='true')$naturaleza='Deudora';
        else $naturaleza='Acreedora';
       $datos=$this->_dbase->GetTable("salario.class_cuentas");
       $criterios=$this->_dbase->GetTable("salario.criterios_analisis");
       $criterios_=$this->_dbase->GetTable("salario.cuentas_criterios");
       $id_criterio_0=null;
       $id_criterio_1=null;
       $id_criterio_2=null;
        for($i=0;$i<count($data);$i++)
        {
          $desc = $data[$i]->desc;

          if(isset($desc)&& $i==0 ){
              $id_criterio_0=$criterios->GetValueBy('ave',array('nombre' => "'$desc'"));

            }
            if(isset($desc)&& $i==1 ){
                $id_criterio_1=$criterios->GetValueBy('ave',array('nombre' => "'$desc'"));

            }
            if(isset($desc)&& $i==2 ){
                $id_criterio_2=$criterios->GetValueBy('ave',array('nombre' => "'$desc'"));

            }

        }
        $datosIns=$datos->InsertValues(array('cuentas' => "'$cuenta'",'nombre' => "'$nombre'",
                                             'naturaleza' => "'$naturaleza'",'oblig' => "'$Obligaciones'",
                                             'moneda' => "'$Monedas'",'submayor ' => "'$Submayor'",
                                             'crit_0_id ' => "'$id_criterio_0'",'crit_1_id ' => "'$id_criterio_1'",
                                             'crit_2_id ' => "'$id_criterio_2'"));
        return true;
    }
    // ========================================================================//
    public function ValidateModid(&$params){
        return true;
    }
    public function Modid(&$params){
        $cuenta=$params['cuenta'];
        $nombre=$params['nombre'];
        $Deudora=$params['Deudora'];
        $Acreedora=$params['Acreedora'];
        $Obligaciones=$params['Obligaciones'];
        $Monedas=$params['Monedas'];
        $Submayor=$params['Submayor'];
        $ids=$params['id'];
        $data = json_decode($params['data']);
        if($Deudora=='true')$naturaleza='Deudora';
        else $naturaleza='Acreedora';
        $datos=$this->_dbase->GetTable("salario.class_cuentas");
        $criterios=$this->_dbase->GetTable("salario.criterios_analisis");
        $criterios_=$this->_dbase->GetTable("salario.cuentas_criterios");
        $id_criterio_0=null;
        $id_criterio_1=null;
        $id_criterio_2=null;
        for($i=0;$i<count($data);$i++)
        {
            $desc = $data[$i]->desc;

            if(isset($desc)&& $i==0 ){
                $id_criterio_0=$criterios->GetValueBy('ave',array('nombre' => "'$desc'"));

            }
            if(isset($desc)&& $i==1 ){
                $id_criterio_1=$criterios->GetValueBy('ave',array('nombre' => "'$desc'"));

            }
            if(isset($desc)&& $i==2 ){
                $id_criterio_2=$criterios->GetValueBy('ave',array('nombre' => "'$desc'"));

            }

        }
        $datosIns=$datos->Update(array('cuentas' => "'$cuenta'",'nombre' => "'$nombre'",
            'naturaleza' => "'$naturaleza'",'oblig' => "'$Obligaciones'",
            'moneda' => "'$Monedas'",'submayor ' => "'$Submayor'",
            'crit_0_id ' => "'$id_criterio_0'",'crit_1_id ' => "'$id_criterio_1'",
            'crit_2_id ' => "'$id_criterio_2'"),"id = '$ids'");
        return true;
    }

};
?>
