 <?PHP

class Accidentes extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
// ========================================================================//
    public function ValidateCargarDatos(&$params) {return true;}
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->Select("SELECT id, lugar, date(fecha_suceso) as fecha_suceso, evento, causa, consecuencias, activo,
                                                fecha_registro FROM sst.accidentes WHERE activo = 't';");
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
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("sst.accidentes");
                $result = $datos->Update(array('activo' => "'false'"),"id = '$id'");
                return true;
        }
        else
            return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        return true;
    }
    public function Add(&$params){
        //print_r($params);die;
        $datos=$this->_dbase->GetTable("sst.accidentes");
        $valores = array(
            'lugar' => "'".$params['lugar']."'",
            'fecha_suceso' => "'".$params['fecha_suceso']."'",
            'causa' => "'".$params['causa']."'",
            'consecuencias' => "'".$params['consecuencias']."'",
            'evento' => "'".$params['evento']."'",
            'activo' => "'t'"
        );
        $data=$datos->InsertValues($valores);

        if($data == null){
            $this->RegisterError('Operación no válida', "No se pudo insertar, existe un riesgo con ese nombre.");
            return false;
        }

        $riesgos = explode(';',$params['riesgos']);
        $id = $datos->GetValueBy('id',$valores,'fecha_registro desc');

        $datos=$this->_dbase->GetTable("sst.riesgos_accidente");

        for ($i = 0; $i < count($riesgos); $i++) {
            if($riesgos[$i] != '')
                $datos->InsertValues(array('id_accidente'=>"'".$id."'",'id_riesgo'=>"'".$riesgos[$i]."'"));
        }

        $afectados = explode(';',$params['trabajadores']);
        $datos=$this->_dbase->GetTable("sst.afectados_accidentes");
        foreach($afectados as $afectado){
            if($afectado != ''){
                $dat = explode('|',$afectado);
                $datos->InsertValues(array('id_accidente'=>"'".$id."'",'id_trabajador'=>"'".$dat[0]."'",'dias'=>"'".$dat[1]."'"));
            }
        }

        return true;
    }
    // ========================================================================//
    public function ValidateModid(&$params){
        return true;
    }
    public function Modid(&$params){
        $valores = array(
            'lugar' => "'".$params['lugar']."'",
            'fecha_suceso' => "'".$params['fecha_suceso']."'",
            'causa' => "'".$params['causa']."'",
            'consecuencias' => "'".$params['consecuencias']."'",
            'evento' => "'".$params['evento']."'",
            'activo' => "'t'"
        );
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("sst.accidentes");
        $datos->Update($valores,"id = '$id'");

        $riesgos = explode(';',$params['riesgos']);
        $id = $datos->GetValueBy('id',$valores,'fecha_registro desc');

        $datos=$this->_dbase->GetTable("sst.riesgos_accidente");
        $datos->DeleteWhere("id_accidente = '$id'");
        for ($i = 0; $i < count($riesgos); $i++) {
            if($riesgos[$i] != '')
                $datos->InsertValues(array('id_accidente'=>"'".$id."'",'id_riesgo'=>"'".$riesgos[$i]."'"));
        }

        $afectados = explode(';',$params['trabajadores']);
        $datos=$this->_dbase->GetTable("sst.afectados_accidentes");
        $datos->DeleteWhere("id_accidente = '$id'");
        foreach($afectados as $afectado){
            if($afectado != ''){
                $dat = explode('|',$afectado);
                $datos->InsertValues(array('id_accidente'=>"'".$id."'",'id_trabajador'=>"'".$dat[0]."'",'dias'=>"'".$dat[1]."'"));
            }
        }

        return true;
    }

    public function ValidateObtenerTrabajadores(){
        return true;
    }

    public function ObtenerTrabajadores(){
        $_data = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_vista');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateObtenerRiesgos(&$params) {return true;}

    public function ObtenerRiesgos(&$params) {
         $_data = array();
         $_count = 0;
         $_start = ($params['start']) ? $params['start'] : 0;
         $_limit = $params['limit'];
         $_table = $this->_dbase->GetTable('sst.riesgos');
         $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
         if (is_null($_data))
             return false;
         $_count = count($_data);
         if ($_count == -1)
             return false;
         $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
         return $result;
     }

//*************Modificar
    public function ValidateObtenerTrabajadoresReal(&$params){
         return true;
    }

    public function ObtenerTrabajadoresReal(&$params){
        $not = '';
        if($params['not'] == 't')
            $not = 'NOT';
         $_table = $this->_dbase->Select("SELECT DISTINCT * FROM vistas_resumen.trabajador_vista
         LEFT JOIN sst.afectados_accidentes ON trabajador_vista.id = afectados_accidentes.id_trabajador AND id_accidente = '".$params['id']."'
         WHERE id $not IN (SELECT id_trabajador FROM sst.afectados_accidentes WHERE id_accidente = '".$params['id']."')");
         $_data = $_table->GetAll("");
         if (is_null($_data))
             return false;
         $_count = count($_data);
         if ($_count == -1)
             return false;
         $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
         return $result;
    }
//************
    public function ValidateObtenerRiesgosReal(&$params) {return true;}

    public function ObtenerRiesgosReal(&$params) {
        $not = '';
        if($params['not'] == 't')
            $not = 'NOT';
         $_table = $this->_dbase->GetTable('sst.riesgos');
        $_data = $_table->GetAll("activo = 't' AND id $not IN (SELECT id_riesgo FROM sst.riesgos_accidente WHERE id_accidente = '".$params['id']."')");
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
