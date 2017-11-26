<?PHP

class Cap_Trabajador extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ch');
    }
// ========================================================================//
    public function ValidateCargarDatoscursos(&$params)
    {return true;}
    public function CargarDatoscursos(&$params)
    {
        $user_id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cursos_trabajadores');
        $data = $_table->GetAll("trabajador = '$user_id'");
        $_data=array();
        for($i=0;$i < count($data) ;$i++){
            $_data[]=$data[$i]['id'];
        }
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//==============================================================================================//
    public function ValidateCargarDatoscursosNombre(&$params)
    {

        return true;
    }
    public function CargarDatoscursosNombre(&$params)
    {
        $user_id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cursos_trabajadores');
        $data = $_table->GetAll("trabajador = '$user_id'");
        $_data=array();
        $in=1;
        for($i=0;$i < count($data) ;$i++){
            $_data[]="</br>".$in."-".$data[$i]['curso_nombre'];
            $in++;
        }
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//==============================================================================================//
    public function ValidateCargarDatos(&$params)
    {

        return true;
    }
    public function CargarDatos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.formacion_tp_areasyagencias');
        $_data = $_table->GetAll();
        $_data2 = array();
        for($i=0;$i<count($_data);$i++)
        {
            $_elem = $_data[$i];
            if($_data[$i]['pais']=='t'){
                $_elem['pais']="Cuba";
            }
            else{$_elem['pais']="Extranjero";}
            $_data2[] = $_elem;
        }

        if (is_null($_data))
            return false;
        $_count = count($_data2);
        if ($_count == -1)
            return false;


        $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);
        return $result;
    }
//==============================================================================================//
    public function ValidateCargarNcultura(&$params)
    {

        return true;
    }
    public function CargarNcultura(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('nomencladores.nivel_cultural');
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
    public function ValidateCargarespecialidades(&$params)
    {

        return true;
    }
    public function Cargarespecialidades(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('nomencladores.especialidades');
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
    public function ValidateCargardocentes(&$params)
    {

        return true;
    }
    public function Cargardocentes(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('nomencladores.categoria_docente');
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
    public function ValidateCargarCcientifica(&$params)
    {

        return true;
    }
    public function CargarCcientifica(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('nomencladores.categoria_cientifica');
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
    public function ValidateCargargrado(&$params)
{

return true;
}
    public function Cargargrado(&$params)
{
    $_data = array();
    $_count = 0;
    $_start = ($params['start']) ? $params['start'] : 0;
    $_limit = $params['limit'];

    $_table = $this->_dbase->GetTable('nomencladores.grado_cientifico');
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
    public function Validatecursos(&$params)
    {

        return true;
    }
    public function cursos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cursos_cumplidos');
        $_data = $_table->GetAll("trabajador_id='$id'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
// ========================================================================//
    public function ValidateModif(&$params)
    {

        $Fecha = $params['Fecha'];
        $ciencia = $params['ciencia_cmb'];
        $cultura = $params['cultura_cmb'];
        $cursos = $params['cursos_pasados'];
        $diplomas = $params['diplomas'];
        $docente = $params['docente_cmb'];
        $especialidad = $params['especialidad_cmb'];
        $esperiencia = $params['esperiencia'];
        $eventos = $params['eventos'];
        $grado = $params['grado_cmb'];
        $investigacion = $params['investigacion'];
        $publicaciones = $params['publicaciones'];
        $lugar = $params['lugar'];

        $Fecha = trim($Fecha);
        $ciencia = trim($ciencia);
        $cultura = trim($cultura);
        $cursos = trim($cursos);
        $diplomas = trim($diplomas);
        $docente = trim($docente);
        $especialidad = trim($especialidad);
        $esperiencia = trim($esperiencia);
        $eventos = trim($eventos);
        $grado = trim($grado);
        $investigacion = trim($investigacion);
        $publicaciones = trim($publicaciones);
        $lugar = trim($lugar);

        Validator::ToCleanSQL($Fecha);
        Validator::ToCleanSQL($ciencia);
        Validator::ToCleanSQL($cultura);
        Validator::ToCleanSQL($cursos);
        Validator::ToCleanSQL($diplomas);
        Validator::ToCleanSQL($docente);
        Validator::ToCleanSQL($especialidad);
        Validator::ToCleanSQL($esperiencia);
        Validator::ToCleanSQL($eventos);
        Validator::ToCleanSQL($grado);
        Validator::ToCleanSQL($investigacion);
        Validator::ToCleanSQL($publicaciones);
        Validator::ToCleanSQL($lugar);

        $_valid = Validator::CheckStringSize($lugar, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Lugar de graduacion  incorrecto.");
            return false;
        }

        return true;
    }
    public function Modif(&$params)
    {
        $cursos = $params['cursos_pasados'];
        $pieces = explode(',', $cursos);
        $pais = $params['Pais'];
        if ($pais==1){$pais='true';}else{$pais='false';}
        $Fecha = $params['Fecha'];
        $lugar = $params['lugar'];
        $user_id = $params['user_id'];
        $ciencia = $params['ciencia_cmb'];
        $cultura = $params['cultura_cmb'];
        $docente = $params['docente_cmb'];
        $especialidad = $params['especialidad_cmb'];
        $grado = $params['grado_cmb'];
        $esperiencia = $params['esperiencia'];
        $eventos = $params['eventos'];
        $investigacion = $params['investigacion'];
        $publicaciones = $params['publicaciones'];
        $diplomas = $params['diplomas'];

        $_table = $this->_dbase->GetTable('capacitacion.formacion_profecional');
        $data = $_table->GetAll("trabajador_id = '$user_id'");
        if (!is_array($data))
        {
            $data = $_table->InsertValues(array('lugar' => "'$lugar'",
                                                'fecha_graduado' => "'$Fecha'",
                                                'pais' => "'$pais'",
                                                'nivel_id' => "'$cultura'",
                                                'esspecialidad_id' => "'$especialidad'",
                                                'categoria_docente_id' => "'$docente'",
                                                'categoria_cientificaa_id' => "'$ciencia'",
                                                'grado_cientifico_id' => "'$grado'",
                                                'esperiencia_profecional' => "'$esperiencia'",
                                                'trabajador_id' => "'$user_id'",
                                                'eventos' => "'$eventos'",
                                                'publicaciones' => "'$publicaciones'",
                                                'invesctigaciones' => "'$investigacion'",
                                                'diplomas_trabajaos' => "'$diplomas'"));
            $_table1 = $this->_dbase->GetTable('capacitacion.curso_trabajador');
            for($i=0;$i<count($data);$i++){
                $data1 = $_table1->DeleteWhere("trbajador_id = '$user_id'");
            }
            for($i=0;$i<count($pieces);$i++){
            $data1 = $_table1->InsertValues(array('trbajador_id' => "'$user_id'",'curso_id' => "'$pieces[$i]'"));
            }
            return true;
        }
        else{
            $data = $_table->Update(array(  'lugar' => "'$lugar'",
                                            'fecha_graduado' => "'$Fecha'",
                                            'pais' => "'$pais'",
                                            'nivel_id' => "'$cultura'",
                                            'esspecialidad_id' => "'$especialidad'",
                                            'categoria_docente_id' => "'$docente'",
                                            'categoria_cientificaa_id' => "'$ciencia'",
                                            'grado_cientifico_id' => "'$grado'",
                                            'esperiencia_profecional' => "'$esperiencia'",
                                            'trabajador_id' => "'$user_id'",
                                            'eventos' => "'$eventos'",
                                            'publicaciones' => "'$publicaciones'",
                                            'invesctigaciones' => "'$investigacion'",
                                            'diplomas_trabajaos' => "'$diplomas'"),"trabajador_id = '$user_id'");
            $_table1 = $this->_dbase->GetTable('capacitacion.curso_trabajador');
            $data = $_table->GetAll("trabajador_id = '$user_id'");
            for($i=0;$i<count($data);$i++){
                $data1 = $_table1->DeleteWhere("trbajador_id = '$user_id'");
            }
            for($i=0;$i<count($pieces);$i++){
                $data1 = $_table1->InsertValues(array('trbajador_id' => "'$user_id'",'curso_id' => "'$pieces[$i]'"));
            }
            return true;
        }

    }
};
?>