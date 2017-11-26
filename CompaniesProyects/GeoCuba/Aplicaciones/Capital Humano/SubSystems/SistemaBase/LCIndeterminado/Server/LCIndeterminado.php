 <?PHP

class LCIndeterminado extends Module {
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
        $_table = $this->_dbase->SELECT("SELECT ubicacion_defensa_tipo.nombre as ubicacion, 
                                                lugar_procedencia.nombre as procedencia, 
                                                ubicacion_defensa.ubicacion_defensa_tipoid, 
                                                contrato_tipo.nombre as tipo_contrato, 
                                                area.nombre as area, 
                                                agencia.nombre as agencia, 
                                                agencia.empresaid, 
                                                listado_cargos.areaid, 
                                                area.agenciaid, 
                                                cargo.nombre as cargo, 
                                                contrato.contrato_tipoid, 
                                                contrato.trabajadorid, 
                                                plantilla.listado_cargosid, 
                                                trabajador.lugar_procedenciaid, 
                                                trabajador.nombre, 
                                                trabajador.apellido_1, 
                                                trabajador.apellido_2, 
                                                trabajador.nombre || ' ' || trabajador.apellido_1 || ' ' || trabajador.apellido_2 as nombre_completo,
                                                trabajador.no_identidad, 
                                                trabajador.fecha_nacimiento
                                              FROM 
                                                plantilla.trabajador 
                                                INNER JOIN pago.contrato ON trabajador.id = contrato.trabajadorid
                                                INNER JOIN plantilla.plantilla ON contrato.id = plantilla.contratoid
                                                LEFT  JOIN plantilla.ubicacion_defensa ON trabajador.id = ubicacion_defensa.trabajadorid
                                                LEFT  JOIN nomencladores.ubicacion_defensa_tipo ON ubicacion_defensa.ubicacion_defensa_tipoid = ubicacion_defensa_tipo.id
                                                INNER JOIN nomencladores.lugar_procedencia ON trabajador.lugar_procedenciaid = lugar_procedencia.id  
                                                INNER JOIN plantilla.listado_cargos ON  plantilla.listado_cargosid = listado_cargos.id
                                                INNER JOIN plantilla.cargo ON listado_cargos.cargoid = cargo.id
                                                INNER JOIN nomencladores.area ON listado_cargos.areaid = area.id
                                                INNER JOIN nomencladores.agencia ON area.agenciaid = agencia.id
                                                INNER JOIN nomencladores.contrato_tipo ON contrato.contrato_tipoid = contrato_tipo.id
                                  ");
        $_data = $_table->GetAll();
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
