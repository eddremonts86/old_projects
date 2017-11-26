<?PHP

class AprobS extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ch');
    }

    // ========================================================================//
    public function ValidateCargarDatoscursos(&$params)
    {

        return true;
    }
    public function CargarDatoscursos(&$params)
    {
        $user_id = $params['id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cursos_trabajadores');

        $data = $_table->GetRange("trabajador = '$user_id'");
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

	public function ValidateSolicitud(&$params)
    {return true;}
    public function Solicitud(&$params)
    {    $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('capacitacion.superacion_personal');
        $data = $_table->GetRange($_limit,$_start,"activo = 'true'");
        if (is_null($data))return false;
        $_count =  $_table->GetRowsCount();
        if ($data == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $data);
        return $result;
    }

    public function ValidateCargarDatosEventos(&$params) {
        return true;
    }
    public function CargarDatosEventos(&$params) {
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

	public function ValidateGestion_Solicitud(&$params)
    {return true;}
    public function Gestion_Solicitud(&$params)
    {
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('capacitacion.gestion_cursos');
        $data = $_table->GetRange($_limit,$_start,"activo = 'true'");
        if (is_null($data))return false;
        $_count = count($data);
        if ($data == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $data);
        return $result;
    }

    //cargar trabajadores
    public function ValidateCargarDatos(&$params)
    {

        return true;
    }
    public function CargarDatos(&$params)
    {
        $_data = array();
        $_count = 0;
        $result=array();
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $userid = $_SESSION['CUI'];
        $rol = $_SESSION['rol'];
        $idTraba = $this->_dbase->GetTable('app_security.users');
        $_data = $idTraba->GetAll("user_id = '$userid'");
        $trabid = $_data[0]['trabajador_id'];
        if ($rol=='Rol-0001'||$rol=='Rol-0002'||$rol=='Rol-0003'){
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
            if (is_null($_data))return false;
            $_count = count($_data2);
            if ($_count == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);
        }
        else if ($rol=='Rol-0004'||$rol=='Rol-0005'){
            $_table = $this->_dbase->GetTable('vistas_resumen.formacion_tp_areasyagencias');
            $_data = $_table->GetAll("id_trabj = '$trabid'");
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
            if (is_null($_data))return false;
            $_count = count($_data2);
            if ($_count == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);
            }
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

        $_table = $this->_dbase->GetTable('nomencladores.cursos');
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

    public function ValidateguardoaDatos(&$params){
        return true;
    }
    public function guardoaDatos(&$params){
        $trabajadoresss = $params['Trabajadores2'];
        $cursosss = $params['cursosqq_pasados'];
        $trabajadores = explode(',', $trabajadoresss);
        $cursos = explode(',', $cursosss);
        $data1="";
        $_table = $this->_dbase->GetTable('capacitacion.curso_solicitud');
       /* for($i=0;$i<count($trabajadores);$i++){
            $data = $_table->DeleteWhere("trabajador_id = '$trabajadores[$i]'");
        }*/

        for($i=0;$i<count($trabajadores);$i++){
                for($z=0;$z<count($cursos);$z++){
            $data1 = $_table->InsertValues(array('trabajador_id' => "'$trabajadores[$i]'",'curso_id' => "'$cursos[$z]'"));
            }
        }
        if ($data1){
            return true;
        }
        else{
            return false;

        }
    }

    public function Validatetrabajadores_solicitud_cursos(&$params){
        return true;
    }
    public function trabajadores_solicitud_cursos(&$params){
        $_data = array();
        $_data1= array();
        $_data2 = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajadores_solicitud_cursos');
        $userid = $_SESSION['CUI'];
        $rol = $_SESSION['rol'];
        $idTraba = $this->_dbase->GetTable('app_security.users');
        $_data = $idTraba->GetAll("user_id = '$userid'");
        $trabid = $_data[0]['trabajador_id'];
        if ($rol=='Rol-0001'||$rol=='Rol-0003'){
            $_data = $_table->GetAll();
            for($i=0;$i<count($_data);$i++){
                $_elem = "<div class='success'><div class='btn btn-info'><b>".$_data[$i]['nombre_completo']."</div></b> "."<br/><b>Agencia:</b> ".$_data[$i]['agencias']." "."<br/><b>Area:</b> ".$_data[$i]['areas']."</div>";
                $_elem2=$_data[$i]['contato_id'];
                $_data2[$i]['nombre_completo'] = $_elem;
                $_data2[$i]['id_trabj'] = $_elem2;
                $_data2[$i]['filtro']=$_data[$i]['nombre_completo'];
            }
            if (is_null($_data))return false;
            $_count = count($_data2);
            if ($_count == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);
        }
        else if($rol=='Rol-0002'){
            $_table = $this->_dbase->GetTable('vistas_resumen.aprobar_baja');
            $_data = $_table->GetAll("id = '$trabid'");
            //print_r($_data[]);die;
            $_table1 = $this->_dbase->GetTable('vistas_resumen.trabajadores_solicitud_cursos');
            for($i=0;$i<count($_data);$i++)
            {   $agencia = $_data[$i]['agencia'];
                $area = $_data[$i]['area'];
                if ($_data[$i]['director_general']=='true'){
                    $_data = $_table1->GetAll();
                    for($i=0;$i<count($_data);$i++){
                        $_elem = "<div class='success'><div class='btn btn-info'><b>".$_data[$i]['nombre_completo']."</div></b> "."<br/><b>Agencia:</b> ".$_data[$i]['agencias']." "."<br/><b>Area:</b> ".$_data[$i]['areas']."</div>";
                        $_elem2=$_data[$i]['contato_id'];
                        $_data2[$i]['nombre_completo'] = $_elem;
                        $_data2[$i]['id_trabj'] = $_elem2;
                        $_data2[$i]['filtro']=$_data[$i]['nombre_completo'];
                    }
                    if (is_null($_data))return false;
                    $_count = count($_data2);
                    if ($_count == -1)return false;
                    $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);

                }
                else if ($_data[$i]['director_unidad']=='true'){
                    $_data  = $_table1->GetAll("agencia = '$agencia'");
                    for($i=0;$i<count($_data);$i++){
                        $_elem = "<div class='success'><div class='btn btn-info'><b>".$_data[$i]['nombre_completo']."</div></b> "."<br/><b>Agencia:</b> ".$_data[$i]['agencias']." "."<br/><b>Area:</b> ".$_data[$i]['areas']."</div>";
                        $_elem2=$_data[$i]['contato_id'];
                        $_data2[$i]['nombre_completo'] = $_elem;
                        $_data2[$i]['id_trabj'] = $_elem2;
                        $_data2[$i]['filtro']=$_data[$i]['nombre_completo'];
                    }
                    if (is_null($_data))return false;
                    $_count = count($_data2);
                    if ($_count == -1)return false;
                    $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);
                }
                else if ($_data[$i]['director_area']=='true'){
                    $_data = $_table1->GetAll("area ='$area'");
                    for($i=0;$i<count($_data);$i++){
                        $_elem = "<div class='success'><div class='btn btn-info'><b>".$_data[$i]['nombre_completo']."</div></b> "."<br/><b>Agencia:</b> ".$_data[$i]['agencias']." "."<br/><b>Area:</b> ".$_data[$i]['areas']."</div>";
                        $_elem2=$_data[$i]['contato_id'];
                        $_data2[$i]['nombre_completo'] = $_elem;
                        $_data2[$i]['id_trabj'] = $_elem2;
                        $_data2[$i]['filtro']=$_data[$i]['nombre_completo'];
                    }
                    if (is_null($_data))return false;
                    $_count = count($_data2);
                    if ($_count == -1)return false;
                    $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);
                }

                else if($_data[$i]['director_area']=='false'&&$_data[$i]['director_unidad']=='false'&&$_data[$i]['director_general']=='false') {
                    $_data = $_table1->GetAll("id = '$trabid'");
                    for($i=0;$i<count($_data);$i++){
                        $_elem = "<div class='success'><div class='btn btn-info'><b>".$_data[$i]['nombre_completo']."</div></b> "."<br/><b>Agencia:</b> ".$_data[$i]['agencias']." "."<br/><b>Area:</b> ".$_data[$i]['areas']."</div>";
                        $_elem2=$_data[$i]['contato_id'];
                        $_data2[$i]['nombre_completo'] = $_elem;
                        $_data2[$i]['id_trabj'] = $_elem2;
                        $_data2[$i]['filtro']=$_data[$i]['nombre_completo'];
                    }
                    if (is_null($_data))return false;
                    $_count = count($_data2);
                    if ($_count == -1)return false;
                    $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);

                }
            }
        }
        else if ($rol=='Rol-0004'||$rol=='Rol-0005'){

            $_data = $_table->GetAll("id_trabj = '$trabid'");
            $_data2 = array();
            for($i=0;$i<count($_data1);$i++)
            {
                $_elem = "<div class='success'><div class='btn btn-info'><b>".$_data1[$i]['nombre']."</div></b> "."<br/><b>Agencia:</b> ".$_data1[$i]['agencia'].", "."<br/><b>Area:</b> ".$_data1[$i]['area']."</div>";
                $_elem2=$_data[$i]['contrato_id'];
                $_data1[$i]['nombre'] = $_elem;
                $_data1[$i]['id_trabj'] = $_elem2;
            }
            if (is_null($_data))return false;
            $_count = count($_data2);
            if ($_count == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $_data2);
        }
        return $result;
    }


    public function Validatetrabajadores_solicitud_cursos_descript(&$params){
        return true;
    }
    public function trabajadores_solicitud_cursos_descript(&$params){
        $_data = array();
        $_count = 0;
        $trabaj = $params['trabajador_id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajadores_solicitud_cursos_descript');
        $_data = $_table->GetAll("contato_id='$trabaj'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;

        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateautorizar(&$params){return true;}
    public function Validatenoautorizar(&$params){return true;}
    public function autorizar(&$params){
        $trabajador_id = $params['trabajador_id'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('capacitacion.curso_solicitud');
        $data=$_table->Update(array('activo' => "'true'"),"contato_id = '$trabajador_id' and id='$id'");
       if ($data){ return true;}
        else {return false;}
    }
    public function noautorizar(&$params){

        $trabajador_id = $params['trabajador_id'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('capacitacion.curso_solicitud');
        $data = $_table->DeleteWhere("contato_id = '$trabajador_id' and id='$id'");
        if ($data){ return true;}
        else {return false;}
    }

    public function ValidatesolicitudesRealizadas(&$params){return true;}
    public function solicitudesRealizadas(&$params){
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('capacitacion.superacion_personal');
        $data=$_table->Update(array('activo' => "'false'")," id='$id'");
        if ($data){ return true;}
        else {return false;}
    }

    public function ValidateCrear_Gestión(&$params){return true;}
    public function Crear_Gestión(&$params){
        $Cursos = $params['Cursos'];
        $Descripción = $params['Descripción'];
        $_table = $this->_dbase->GetTable('capacitacion.gestion_cursos');
        $data = $_table->InsertValues(array('nombre' => "'$Cursos'",'descripcion' => "'$Descripción'"));
        if ($data){ return true;}
        else {return false;}
    }

    public function ValidateModificar_Gestión(&$params){return true;}
    public function Modificar_Gestión(&$params){
        $id = $params['id'];
        $Cursos = $params['Cursos'];
        $Descripción = $params['Descripción'];
        $_table = $this->_dbase->GetTable('capacitacion.gestion_cursos');
        $data=$_table->Update(array('nombre' => "'$Cursos'",'descripcion' => "'$Descripción'")," id='$id'");
        if ($data){ return true;}
        else {return false;}
    }

    public function ValidateAprobar_Gestión(&$params){return true;}
    public function Aprobar_Gestión(&$params){
        $id = $params['id'];
        $Cursos = $params['Cursos'];
        $Descripción = $params['Descripción'];

        $Hasta = $params['Hasta'];
        $Desde = $params['Desde'];
        $combo=$params['combo'];

        $_table = $this->_dbase->GetTable('capacitacion.gestion_cursos');
        $data1=$_table->Update(array('activo' => "'false'")," id='$id'");

        $_table = $this->_dbase->GetTable('nomencladores.cursos');
        $data = $_table->InsertValues(array('eventos_id' => "'$combo'",'nombre' => "'$Cursos'",'descripcion' => "'$Descripción'",'fecha_inicio' => "'$Desde'",'fecha_fin' => "'$Hasta'"));
        if ($data & $data1){ return true;}
        else {return false;}
    }

    //========================================Necesidades======================================================//
    public function ValidateNecesidades(&$params) {
        return true;
    }
    public function Necesidades(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidades_desc');
        $_data = $_table->GetRange($_limit,$_start,"atendida='false'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateatencion(&$params){return true;}
    public function atencion(&$params){
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('capacitacion.nesecidad_aprendisaje');
        $data=$_table->Update(array('atendida' => "'true'")," id='$id'");
        if ($data){ return true;}
        else {return false;}
    }


};
?>
