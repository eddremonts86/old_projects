 <?PHP

class Cargo extends Module {
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
        $_table = $this->_dbase->GetTable('nomencladores.norma_juridica');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarcontratos(&$params) {
        return true;
    }
    public function Cargarcontratos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.categoria_ocupacional');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarniveles(&$params) {
        return true;
    }
    public function Cargarniveles(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.nivel_preparacion');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarclasif(&$params) {
        return true;
    }
    public function Cargarclasif(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.clasificacion_d_i');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarescala(&$params) {
        return true;
    }
    public function Cargarescala(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.grupo_escala');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
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
    // ========================================================================//
    public function ValidateEliminar(&$params) {
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("plantilla.listado_cargos");
        $count = $datos->Contains(array('cargoid' => "'$id'"));
       if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cargo a eliminar esta siendo usado por Tipos de Cargo.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("plantilla.cargo");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['combo_value_id'])&&!isset($params['combo_contrato_value_id'])
            &&!isset($params['combo_nivel_value_id'])&&!isset($params['combo_clasif_value_id'])&&!isset($params['combo_escala_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];
        $combo = $params['combo_value_id'];
        $combo2 = $params['combo_contrato_value_id'];
        $combo3 = $params['combo_nivel_value_id'];
        $combo4 = $params['combo_clasif_value_id'];
        $combo5 = $params['combo_escala_value_id'];


        $nombre = trim($nombre);
       // $combo = trim($combo);
        //$combo2 = trim($combo2);


        $_valid = Validator::CheckStringSize($nombre, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cargo incorrecto.");
            return false;
        }
//        $_valid = Validator::CheckStringSize($combo, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Norma Jurídica del Cargo incorrecta");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo2, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Categoría Ocupacional del Cargo incorrecta");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo3, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nivel de Preparación del Cargo incorrecto");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo4, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Clasificación del Cargo incorrecta");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo5, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Grupo de Escala del Cargo incorrecto");
//            return false;
//        }

        Validator::ToCleanSQL($nombre);
        //$params['new_nombre'] = $nombre;
        $actividades = $this->_dbase->GetTable('plantilla.cargo');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cargo '$nombre' ya existe.");
            return false;
        }
        return true;
       }
    public function Add(&$params){
        $name=$params['nombre_id'];
        $idnormajurid=$params['combo_value_id'];
        $idcatocup=$params['combo_contrato_value_id'];
        $idnivelprep=$params['combo_nivel_value_id'];
        $idclasif=$params['combo_clasif_value_id'];
        $idescala=$params['combo_escala_value_id'];
        $responsabilidad  =$params['Responsabilidad'];
        $autoidad  =$params['Autoridad'];
        $funciones  =$params['Especiales'];
        $competencia  =$params['Competencia'];
        $condiciones  =$params['Condiciones'];
        $requisitos  =$params['Requisitos'];
        $equi_util_herram =$params['Equipos'];
        $impacto=$params['Impacto'];
        $cies  =$params['cies'];
        $cla  =$params['cla'];
        $tec  =$params['tec'];
        $otros =$params['otros'];
        $Esperiencia =$params['Esperiencia'];
        $datos=$this->_dbase->GetTable("plantilla.cargo");
       return $data=$datos->InsertValues(array(
                                               'responsabilidad'  => "'$responsabilidad'",
                                               'autoidad'  =>"'$autoidad'",
                                               'funciones' =>"'$funciones'",
                                               'competencia'  =>"'$competencia'",
                                               'condiciones'  =>"'$condiciones'",
                                               'requisitos'  =>"'$requisitos'",
                                               'equi_util_herram' =>"'$equi_util_herram'",
                                               'esperiencia' =>"'$Esperiencia'",
                                               'norma_juridicaid' => "'$idnormajurid'",
                                               'categoria_ocupacionalid' => "'$idcatocup'",
                                               'nivel_preparacionid' => "'$idnivelprep'",
                                               'clasificacion_d_iid' => "'$idclasif'",
                                               'grupo_escalaid' => "'$idescala'",
                                               'impacto'=>"'$impacto'",
                                               'cies' => "'$cies'",
                                               'cla' => "'$cla'",
                                               'tnc' => "'$tec'",
                                               'otros'=>"'$otros'",
                                               'nombre' => "'$name'"));


    }
    // ========================================================================//
    public function ValidateModif(&$params){
        if (!isset($params['nombre_id'])&&!isset($params['combo_value_id'])&&!isset($params['combo_contrato_value_id'])
            &&!isset($params['combo_nivel_value_id'])&&!isset($params['combo_clasif_value_id'])&&!isset($params['combo_escala_value_id']))
        {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        /* $name=$params['nombre_id'];
        $normajuridica=$params['combo_value_id'];
        $catocup=$params['combo_contrato_value_id'];
        $nivelprep=$params['combo_nivel_value_id'];
        $clasif=$params['combo_clasif_value_id'];
        $escala=$params['combo_escala_value_id'];*/

        $nombre = $params['nombre_id'];
//        $combo = $params['combo_value_id'];
//        $combo2 = $params['combo_contrato_value_id'];
//        $combo3 = $params['combo_nivel_value_id'];
//        $combo4 = $params['combo_clasif_value_id'];
//        $combo5 = $params['combo_escala_value_id'];


        $nombre = trim($nombre);
        // $combo = trim($combo);
        //$combo2 = trim($combo2);


        $_valid = Validator::CheckStringSize($nombre, 3, 255);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Cargo incorrecto.");
            return false;
        }
//        $_valid = Validator::CheckStringSize($combo, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Norma Jurídica del Cargo incorrecta");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo2, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Categoría Ocupacional del Cargo incorrecta");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo3, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Nivel de Preparación del Cargo incorrecto");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo4, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Clasificación del Cargo incorrecta");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($combo5, 3, 255);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Grupo de Escala del Cargo incorrecto");
//            return false;
//        }

//        Validator::ToCleanSQL($nombre);
//        //$params['new_nombre'] = $nombre;
//        $old_nombre= $params['old_name'];
//
//        $actividades = $this->_dbase->GetTable('plantilla.cargo');
//        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
//        if ($count==0)
//        {
//            return true;
//        }
//        elseif ($old_nombre==$nombre) {
//            // $this->RegisterError('Operación no válida', "El Cargo '$nombre' ya existe.");
//            return true;
//        }
//        else {
//            $this->RegisterError('Operación no válida', "El Cargo '$nombre' ya existe.");
//            return false;
//        }

        return true;
    }
    public function Modif(&$params){
        $id=$params['id'];
        $name=$params['nombre_id'];
        $idnormajurid=$params['combo_value_id'];
        $idcatocup=$params['combo_contrato_value_id'];
        $idnivelprep=$params['combo_nivel_value_id'];
        $idclasif=$params['combo_clasif_value_id'];
        $idescala=$params['combo_escala_value_id'];
        $responsabilidad  =$params['Responsabilidad'];
        $autoidad  =$params['Autoridad'];
        $funciones  =$params['Especiales'];
        $competencia  =$params['Competencia'];
        $condiciones  =$params['Condiciones'];
        $requisitos  =$params['Requisitos'];
        $equi_util_herram =$params['Equipos'];
        $cies  =$params['cies'];
        $cla  =$params['cla'];
        $tec  =$params['tec'];
        $otros =$params['otros'];
        $impacto=$params['Impacto'];
        $Esperiencia =$params['Esperiencia'];
        $datos=$this->_dbase->GetTable("plantilla.cargo");
        return $data=$datos->Update(array(  'responsabilidad'  => "'$responsabilidad'",
                                            'autoidad'  =>"'$autoidad'",
                                            'funciones' =>"'$funciones'",
                                            'competencia'  =>"'$competencia'",
                                            'condiciones'  =>"'$condiciones'",
                                            'requisitos'  =>"'$requisitos'",
                                            'equi_util_herram' =>"'$equi_util_herram'",
                                            'norma_juridicaid' => "'$idnormajurid'",
                                            'norma_juridicaid' => "'$idnormajurid'",
                                            'esperiencia' => "'$Esperiencia'",
                                            'categoria_ocupacionalid' => "'$idcatocup'",
                                            'nivel_preparacionid' => "'$idnivelprep'",
                                            'clasificacion_d_iid' => "'$idclasif'",'impacto'=>"'$impacto'",
                                            'grupo_escalaid' => "'$idescala'",
                                            'cies' => "'$cies'",
                                            'cla' => "'$cla'",
                                            'tnc' => "'$tec'",
                                            'otros'=>"'$otros'",
                                            'nombre' => "'$name'"),
                                            "id='$id'");
    }

};
?>