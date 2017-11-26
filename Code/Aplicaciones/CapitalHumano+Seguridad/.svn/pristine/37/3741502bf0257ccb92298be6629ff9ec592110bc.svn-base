 <?PHP

class Registro_Eventos extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatecargos(&$params) {
        return true;
    }
    public function cargos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.cargo');
        $_data = $_table->GetRange($_limit, $_start,'activo= true');
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargareventos(&$params) {
        return true;
    }
    public function Cargareventos(&$params) {
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

    public function Validatehistorial(&$params) {
        return true;
    }
    public function historial(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.eventos_cumplidos_titulos');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateevento_por_hist(&$params) {
        return true;
    }
    public function evento_por_hist(&$params) {
        $_data = array();
        $_count = 0;
        $titulo=$params['titulo'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('capacitacion.eventos_cumplidos');
        $_data = $_table->GetRange($_limit, $_start,"activo = 'true' and titulo = '$titulo'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    // ========================================================================//
    public function ValidateCargarDatos1(&$params) {
        return true;
    }
    public function CargarDatos1(&$params) {
        $_data = array();
        $_count = 0;
        $area = $params['area'] ;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('capacitacion.eventos_cumplidos');
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
        $id=$params['id'];

        $datos=$this->_dbase->GetTable("capacitacion.formacion_profecional");
        $count = $datos->Contains(array('categoria_cientificaa_id' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Registro_Eventos a eliminar esta siendo usado por Contrato.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("capacitacion.eventos_cumplidos");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }


    public function ValidateEliminarhs(&$params) {
        return true;
    }
    public function Eliminarhs(&$params) {
        $titulo = $params['titulo'];
        $result=null;
        if ($titulo){
            $datos=$this->_dbase->GetTable("capacitacion.eventos_cumplidos");
            $result = $datos->Update(array('activo' => "'false'"), "titulo = '$titulo'");
            if($result )return true;
            else return false;
        }
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
       return true;
       }
    public function Add(&$params){
       $data = json_decode($params['data']);
        $evento=$params['evento'];
        $ft=$params['ft'];
        $fi=$params['fi'];
        $inst=$params['inst'];
        $cargo_inst=$params['cargo_inst'];
        $titulo=$params['titulo'];
       $datos=$this->_dbase->GetTable("capacitacion.eventos_cumplidos");
       for($i=0;$i<count($data);$i++)
       {
           $id = $data[$i]->id;
           $nombre = $data[$i]->nombre;
           $Cargo = $data[$i]->Cargo;
           $Unidad = $data[$i]->Unidad;
           $Cv = $data[$i]->Cv;
           $tv = $data[$i]->tv;


           if(isset($id)){
               $datosIns=$datos->Update(array(
                                        'nombre' => "'$nombre'",
                                        'evento_nombre' => "'$evento'",
                                        'titulo' => "'$titulo'",
                                        'nombre_inst' => "'$inst'",
                                        'cargo_inst' => "'$cargo_inst'",
                                        'fi' => "'$fi'",
                                        'ft' => "'$ft'",
                                        'cargo_trab' => "'$Cargo'",
                                        'unidad' => "'$Unidad'",
                                        'categoria_ccv' => "'$Cv'",
                                        'categoria_tcv' => "'$tv'",
                                        ),"id = '$id'");
           }
           else{
               $datosIns=$datos->InsertValues(array(  'nombre' => "'$nombre'",
                                                       'evento_nombre' => "'$evento'",
                                                       'titulo' => "'$titulo'",
                                                       'nombre_inst' => "'$inst'",
                                                       'cargo_inst' => "'$cargo_inst'",
                                                       'fi' => "'$fi'",
                                                       'ft' => "'$ft'",
                                                       'cargo_trab' => "'$Cargo'",
                                                       'unidad' => "'$Unidad'",
                                                       'categoria_ccv' => "'$Cv'",
                                                       'categoria_tcv' => "'$tv'"
                                                    ));
           }
       }
       return true;
    }
    // ========================================================================//






};
?>
