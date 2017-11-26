<?php
class Condecoracion extends Module {

    public function  __construct() {
        parent::__construct('common.ch');
    }

    public function ValidateCargarnombre(&$params) {
        return true;
    }
    public function Cargarnombre(&$params) {
        $_data = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('nomencladores.condecoracion_tipo');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true,'rows' => $_data);
        return $result;
    }



    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        //$_table = $this->_dbase->GetTable('plantilla.condecoracion');
        $_table = $this->_dbase->Select("SELECT condecoracion.id, condecoracion.condecoracion_tipoid,
                condecoracion_tipo.nombre FROM nomencladores.condecoracion_tipo JOIN plantilla.condecoracion
                ON condecoracion_tipo.id = condecoracion.condecoracion_tipoid;");
        $_data = $_table->GetAll();
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
        $datos=$this->_dbase->GetTable("plantilla.trabajador_condecoracion");
        $count = $datos->Contains(array('condecoracionid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "La Condecoraci&oacute;n a eliminar está siendo usado por Condecoraci&oacute;n del Trabajador.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id) {
            $datos=$this->_dbase->GetTable("plantilla.condecoracion");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){

       if (!isset($params['id'])||!isset($params['combo_nombre_value_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $combo_nombre_value_id = $params['combo_nombre_value_id'];
        $combo_nombre_value_id= trim($combo_nombre_value_id);


        $condecoraciones = $this->_dbase->GetTable('plantilla.condecoracion');
        $count = $condecoraciones->Contains(array('condecoracion_tipoid' => "'$combo_nombre_value_id'"));



        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "La Condecoración ya existe.");
            return false;
        }

        return true;
    }

    public function Add(&$params){

        $combo_nombre_value_id=$params['combo_nombre_value_id'];
        $datos=$this->_dbase->GetTable("plantilla.condecoracion");
        return $data=$datos->InsertValues(array('condecoracion_tipoid' => "'$combo_nombre_value_id'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['id'])||!isset($params['combo_nombre_value_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $id = $params['id'];
        $combo_nombre_value_id = $params['combo_nombre_value_id'];

        $id = trim($id);
        $combo_nombre_value_id = trim($combo_nombre_value_id);

        $condecoraciones = $this->_dbase->GetTable('plantilla.condecoracion');
        $count = $condecoraciones->Contains(array('condecoracion_tipoid' => "'$combo_nombre_value_id'"));

        if ($count < 0)
            return false;

        elseif ($count >0) {
            $this->RegisterError('Operación no válida', "La Condecoración ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){

        $id = $params['id'];
        $condecoracion_tipoid = $params['combo_nombre_value_id'];

        $datos=$this->_dbase->GetTable("plantilla.condecoracion");
        $datos->Update(array('condecoracion_tipoid' => "'$condecoracion_tipoid'"),"id = '$id'");
        return true;
    }


}