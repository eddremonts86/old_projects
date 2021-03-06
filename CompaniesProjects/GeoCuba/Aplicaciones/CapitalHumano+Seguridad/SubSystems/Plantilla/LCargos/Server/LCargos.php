 <?PHP

class LCargos extends Module {
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
        $_table = $this->_dbase->GetTable('vistas_resumen.listado_de_cargos ');
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
        $datos=$this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('listado_cargosid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Tipo de Cargo a eliminar está siendo usado por Plantilla.");
            return false;
        }

        return true;
    }
    public function Eliminar(&$params) {
        $id=$params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("plantilla.listado_cargos");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
/*
        if (!isset($params['plazas'])||!isset($params['Area'])||!isset($params['Cargo'])||!isset($params['Resolución'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $plazas = $params['plazas'];
        $plazas = trim($plazas);

        $_valid = Validator::CheckStringSize($plazas, 1, 5);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Parametos incorrectos");
            return false;
        }

        Validator::ToCleanSQL($plazas);
        $params['plazas'] = $plazas;*/
        return true;

       }
    public function Add(&$params){
        $data= json_decode($params['data']);
        $datos=$this->_dbase->GetTable("plantilla.listado_cargos");
        for ($i=0; $i<count($data);$i++)
            {
                $Area=$data[$i]->AreaId;
                $plazas=$data[$i]->plazas;
                $Cargo=$data[$i]->id;
                $Resolución=$data[$i]->resId;
                $exist=$data[$i]->existencia;
                $id = $datos->GetValueWhere('id',"areaid = '$Area' AND cargoid = '$Cargo' AND resolucionid = '$Resolución'" );
                if($id == '' || $id == null)
                    $datos->InsertValues(array('areaid' => "'$Area'",'existencia' => "'$exist'",'cargoid' => "'$Cargo'",'resolucionid' => "'$Resolución'",'cantidad_plazas' => "'$plazas'"));
                else
                    $datos->Update(array('areaid' => "'$Area'",'existencia' => "'$exist'",'cargoid' => "'$Cargo'",'resolucionid' => "'$Resolución'",'cantidad_plazas' => "'$plazas'"),"id = '$id'");
          }
        return true;
    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['plazas'])||!isset($params['Area'])||!isset($params['Cargo'])||!isset($params['id'])||!isset($params['Resolución'])) {
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
    public function Modid(&$params){
        $Area=$params['Area'];
        $Cargo=$params['Cargo'];
        $Resolución=$params['Resolución'];
        $plazas=$params['plazas'];
        $exit=$params['exit'];
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("plantilla.listado_cargos");
        $a =  $datos->GetValueWhere('id',"areaid='$Area' and cargoid ='$Cargo' and resolucionid = '$Resolución'");
        if(!$a){
            $datos->Update(array('areaid' => "'$Area'",'cargoid' => "'$Cargo'",'existencia' => "'$exit'",'resolucionid' => "'$Resolución'",'cantidad_plazas' => "'$plazas'"),"id = '$id'");
        }
        else{
            $this->RegisterError('Error', "Ese cargo para esa resoluci&oacute;n en esa area ya existe.");
            return false;
        }
        
        return true;
    }
    //========================================================================//
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
    //=========================================================================//
    public function ValidateCargarDatosCargo(&$params) {
        return true;
    }
    public function CargarDatosCargo(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('plantilla.cargo');
        $_data = $_table->GetRange($_limit, $_start);
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
    //=========================================================================//
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


    public function ValidateCargarDatosA(&$params) {

        return true;
    }
    public function CargarDatosA(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cargo_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarAreas(&$params)
    {

        return true;
    }
    public function CargarAreas(&$params)
    {
        $_data = array();
        $_count = 0;
        $value = $params['value'];
        $_table = $this->_dbase->GetTable('nomencladores.area');
        $_data = $_table->GetAll("agenciaid= '$value'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
};
?>
