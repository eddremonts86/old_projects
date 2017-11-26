 <?PHP

class Sbajas extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
    // ========================================================================//
    public function ValidateCargarDatos_mbaja(&$params) {
        return true;
    }
    public function CargarDatos_mbaja(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.m_bajas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_dbajas(&$params) {
        return true;
    }
    public function CargarDatos_dbajas(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.dbajas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos(&$params)
    {

        return true;
    }
    public function CargarDatos(&$params)
    {
        $_data = array();
        $result = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $userid = $_SESSION['CUI'];
        $rol = $_SESSION['rol'];
        $idTraba = $this->_dbase->GetTable('app_security.users');
        $_data = $idTraba->GetAll("user_id = '$userid'");
        $trabid = $_data[0]['trabajador_id'];

        if($rol=='Rol-0001'||$rol=='Rol-0003'){
            $_table = $this->_dbase->GetTable('vistas_resumen.solicitud_bajas');
            $_data = $_table->GetRange($_limit, $_start);
            if (is_null($_data))return false;
            $_count =$_table->GetRowsCount();
            if ($_count == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        }
        else if($rol=='Rol-0002'){

            $_table = $this->_dbase->GetTable('vistas_resumen.aprobar_baja');
            $_data = $_table->GetAll("id = '$trabid'");

            $_table1 = $this->_dbase->GetTable('vistas_resumen.solicitud_bajas');

            for($i=0;$i<count($_data);$i++)
            {  if($_data[$i]['director_general']=='true'||$_data[$i]['director_unidad']=='true'||$_data[$i]['director_area']=='true')
             {
                $agencia = $_data[$i]['agencia'];
                $area = $_data[$i]['area'];
                //print_r($area."   ".$agencia);
                if ($_data[$i]['director_general']=='true'){
                    $_data1 = $_table1->GetAll();
                    $_count = count($_data1);
                    $result = array('success' => true, 'results' => $_count, 'rows' => $_data1);
                }
                else if ($_data[$i]['director_unidad']=='true'){
                    $_data1 = $_table1->GetAll("agencia = '$agencia'");
                    $_count = count($_data1);
                    $result = array('success' => true, 'results' => $_count, 'rows' => $_data1);
                }
                else if ($_data[$i]['director_area']=='true'){
                    $_data1 = $_table1->GetAll("area ='$area'");
                    $_count = count($_data1);
                    $result = array('success' => true, 'results' => $_count, 'rows' => $_data1);
                }

            }else {
                ///print_r($trabid);
                $_table1 = $this->_dbase->GetTable('vistas_resumen.solicitud_bajas');
                $_data1 = $_table1->GetAll("trabid ='$trabid'");
                $_count = count($_data1);
                $result = array('success' => true, 'results' => $_count, 'rows' => $_data1);
            }
          }
        }
        else {
            ///print_r($trabid);
            $_table1 = $this->_dbase->GetTable('vistas_resumen.solicitud_bajas');
            $_data1 = $_table1->GetAll("trabid ='$trabid'");
            $_count = count($_data1);
            $result = array('success' => true, 'results' => $_count, 'rows' => $_data1);
        }

        return $result;
    }

    public function ValidateBaja(&$params){return true;}
    public function Baja(&$params){

        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $datos->Update(array('baja' => "'true'"), "id = '$id'");
        return true;

    }
    public function ValidateDBaja(&$params){return true;}
    public function DBaja(&$params){

        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $datos->Update(array('baja' => "'false'"), "id = '$id'");
        return true;

    }
    public function Validatelicencia(&$params){return true;}
    public function licencia(&$params){

        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $datos->Update(array('licencia' => "'true'"), "id = '$id'");
        return true;

    }
    public function ValidateDlicencia(&$params){return true;}
    public function Dlicencia(&$params){

        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $datos->Update(array('licencia' => "'false'"), "id = '$id'");
        return true;

    }
};
?>
