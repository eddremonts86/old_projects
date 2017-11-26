 <?PHP

class ConfArea extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//
    public function ValidateCargarAnnos(&$params) {
        return true;
    }
    public function CargarAnnos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.agenciayempresas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargartrba(&$params) {
        return true;
    }
    public function Cargartrba(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.agenciayempresas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarCGasto(&$params) {
        return true;
    }
    public function CargarCGasto(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('salario.class_cuentas');
        $_data = $_table->GetRange($_limit, $_start,"naturaleza = 'Deudora'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_inc(&$params) {
        return true;
    }
    public function CargarDatos_inc(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];

        $_table = $this->_dbase->GetTable('vistas_resumen.conf_unidad');
        //$_data = $_table->GetAll();
        $_data = $_table->GetAll("id_unidad = '$id'");

        if (is_null($_data))return false;
        $_count = count($_data);if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    // ========================================================================//
    public function ValidateEliminar(&$params) {
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("nomencladores.area");
        $count = $datos->Contains(array('agenciaid' => "'$id'"));
       if ($count > 0) {
            $this->RegisterError('Operación no válida', "La Unidad Empresarial de Base a eliminar esta siendo usada por Área.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.agencia");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['numero_id'])&&!isset($params['combo_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $numero = $params['numero_id'];
        $nombre = trim($nombre);
        $numero = trim($numero);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la Unidad Empresarial de Base incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($numero,1);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Código de la Unidad Empresarial de Base incorrecto.");
            return false;
        }
        $actividades = $this->_dbase->GetTable('nomencladores.agencia');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "La Unidad Empresarial de Base '$nombre' ya existe.");
            return false;
        }
        return true;
       }
    public function Add(&$params){
        $name=$params['nombre_id'];
        $number=$params['numero_id'];
        $idemp=$params['combo_value_id'];
        $datos=$this->_dbase->GetTable("nomencladores.agencia");

       return $data=$datos->InsertValues(array('empresaid' => "'$idemp'",'codigo' => "'$number'",'nombre' => "'$name'"));

    }
    // ========================================================================//
    public function ValidateAdd_conf(&$params){

        return true;
       }
    public function Add_conf(&$params){
        $ant=$params['ant'];
        $id=$params['id'];
        $o_poa=$params['o_poa'];
        $estim=$params['estim'];
        $combo1=$params['combo1'];
        $combo2=$params['combo2'];
        $combo3=$params['combo3'];
        $combo4=$params['combo4'];
        $combo5=$params['combo5'];
        $combo6=$params['combo6'];
        $combo7=$params['combo7'];
        $combo8=$params['combo8'];
        $combo9=$params['combo9'];
        $combo10=$params['combo10'];
        $combo11=$params['combo11'];
        $combo12=$params['combo12'];
        $datos=$this->_dbase->GetTable("salario.conf_agencias");
        $miid=$datos->GetValueBy('id',array('id_unidad'=>"'$id'"));

        //print_r($miid);

        if($miid !=null){
            return $data=$datos->Update(array('antigu' => "'$ant'",'o_pagos' => "'$o_poa'",'cpl_estim' => "'$estim'",
                'p_elab' => "'$combo1'",'p_realiz' => "'$combo2'",'p_aprob' => "'$combo3'",
                'n_elab' => "'$combo7'",'n_realiz' => "'$combo8'",'n_aprob' => "'$combo9'",'n_contab' => "'$combo12'",
                'c_elab' => "'$combo4'",'c_realiz' => "'$combo5'",'c_aprob' => "'$combo6'",
                'unidad' => "'$combo10'",'cuenta_d' => "'$combo11'",'id_unidad' => "'$id'"),"id='$miid'");
        }
        else{
            return $data=$datos->InsertValues(array('antigu' => "'$ant'",'o_pagos' => "'$o_poa'",'cpl_estim' => "'$estim'",
                'p_elab' => "'$combo1'",'p_realiz' => "'$combo2'",'p_aprob' => "'$combo3'",
                'n_elab' => "'$combo7'",'n_realiz' => "'$combo8'",'n_aprob' => "'$combo9'",'n_contab' => "'$combo12'",
                'c_elab' => "'$combo4'",'c_realiz' => "'$combo5'",'c_aprob' => "'$combo6'",
                'unidad' => "'$combo10'",'cuenta_d' => "'$combo11'",'id_unidad' => "'$id'"));

        }
    }
    // ========================================================================//
    public function ValidateModif(&$params){

        if (!isset($params['nombre_id_upd'])&&!isset($params['numero_id_upd'])&&!isset($params['combo_value_id_upd']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        $nombre = $params['nombre_id_upd'];
        $numero = $params['numero_id_upd'];

        $nombre = trim($nombre);
        $numero = trim($numero);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la Unidad Empresarial de Base incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($numero,1);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Código de la Unidad Empresarial de Base incorrecto.");
            return false;
        }


        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($numero);
        $params['new_nombre'] = $nombre;

        $old_nombre= $params['old_name'];
        $actividades = $this->_dbase->GetTable('nomencladores.agencia');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
        if ($count==0)
        {
            return true;
        }
        elseif ($old_nombre==$nombre) {
            // $this->RegisterError('Operación no válida', "El nombre '$nombre' ya existe.");
            return true;
        }
        else {
            $this->RegisterError('Operación no válida', "La Unidad Empresarial de Base '$nombre' ya existe.");
            return false;
        }
        return true;
    }
    public function Modif(&$params){
        $nameold=$params['old_name'];
        $name=$params['nombre_id_upd'];
        $number=$params['numero_id_upd'];
        $idemp=$params['combo_value_id_upd'];
        $datos=$this->_dbase->GetTable("nomencladores.agencia");
        return $data=$datos->Update(array('empresaid' => "'$idemp'",'codigo' => "'$number'",'nombre' => "'$name'"),"nombre='$nameold'");
}

};
?>
