<?php
class ConfSalario extends Module {

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
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_conf_salario');
        $_data = $_table->GetRange($_limit, $_start);
        $_count=$_table->GetRowsCount();
        if (is_null($_data))
            return false;
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

        return true;
    }
    public function Add(&$params){
        $data = json_decode($params['data']);
        $datos=$this->_dbase->GetTable("salario.conf_salario");
        for($i=0;$i<count($data);$i++){
            $ft_fza = $data[$i]->ft_fza;
            $ft_ext = $data[$i]->ft_ext;
            $fdo_sl = $data[$i]->fdo_sl;
            $prom_tab = $data[$i]->prom_tab;
            $fdo_estim = $data[$i]->fdo_estim;
            $fdo_admon = $data[$i]->fdo_admon;
            $prod_plan = $data[$i]->prod_plan;
            $id_area = $data[$i]->id_area;
            $prod_real = $data[$i]->prod_real;
            $id = $data[$i]->id;
            if(!isset($id)){
                $datos->InsertValues(array('ft_fza' => "'$ft_fza'",
                                             'ft_ext' => "'$ft_ext'",
                                             'fdo_sl' => "'$fdo_sl'",
                                             'prom_tab' => "'$prom_tab'",
                                             'fdo_estim' => "'$fdo_estim'",
                                             'fdo_admon' => "'$fdo_admon'",
                                             'prod_plan' => "'$prod_plan'",
                                             'id_area' => "'$id_area'",
                                             'prod_real' => "'$prod_real'"));
            }
            else{
                $datos->Update(array('ft_fza' => "'$ft_fza'",
                                    'ft_ext' => "'$ft_ext'",
                                    'fdo_sl' => "'$fdo_sl'",
                                    'prom_tab' => "'$prom_tab'",
                                    'fdo_estim' => "'$fdo_estim'",
                                    'fdo_admon' => "'$fdo_admon'",
                                    'prod_plan' => "'$prod_plan'",
                                    'id_area' => "'$id_area'",
                                    'prod_real' => "'$prod_real'"),"id = '$id'");
                }
        }
        return true;
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