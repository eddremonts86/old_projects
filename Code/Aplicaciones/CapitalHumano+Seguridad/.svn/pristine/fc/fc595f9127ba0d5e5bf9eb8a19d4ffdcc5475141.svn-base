<?PHP

class Targeta extends Module {

    public function  __construct()
    {parent::__construct('common.ch');}

    public function Validateplantila(&$params)
    {return true;}
    public function plantila(&$params)
    {   $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $userid = $_SESSION['CUI'];
        $rol = $_SESSION['rol'];
        $idTraba = $this->_dbase->GetTable('app_security.users');
        $_data = $idTraba->GetAll("user_id = '$userid'");
        $trabid = $_data[0]['trabajador_id'];
        $_table = $this->_dbase->GetTable('vistas_resumen.targeta');
        $valores = array();
        if($rol=='Rol-0001'||$rol=='Rol-0003'){
            $_data=$_table->GetRange($_limit,$_start);
        }
        else if($rol=='Rol-0002'){
            $_dataresponsabilidad=$_table->GetRange($_limit,$_start,"trabajadorid='$trabid'");
            for($i=0;$i<count($_dataresponsabilidad);$i++)
                {
                        $agencia = $_dataresponsabilidad[$i]['agenciaid'];
                        $area = $_dataresponsabilidad[$i]['areaid'];
                        if($_dataresponsabilidad[$i]['director_general']=='t'||$_dataresponsabilidad[$i]['director_unidad']=='t'||$_dataresponsabilidad[$i]['director_area']=='t')
                        {
                            if ($_dataresponsabilidad[$i]['director_general']=='t'){
                               $_data=$_table->GetRange($_limit,$_start);
                            }
                            else if ($_dataresponsabilidad[$i]['director_unidad']=='t'){
                                 $_data=$_table->GetRange($_limit,$_start,"agenciaid='$agencia'");
                            }
                            else if ($_dataresponsabilidad[$i]['director_area']=='t'){
                                $_data=$_table->GetRange($_limit,$_start,"areaid='$area'");
                            }
                        }
                    else
                        {
                            $_data=$_table->GetRange($_limit,$_start,"trabajadorid='$trabid' and director_general=false and director_unidad=false and director_area = false");
                        }
                        $valores = array_merge($valores,$_data);
                    }
           $_data=$valores;
        }
        else if($rol=='Rol-0004'||$rol=='Rol-0005'){
            $_data=$_table->GetRange($_limit,$_start,"trabajadorid='$trabid'");
        }
        if (count($_data) == 0)return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatetargeta_trab(&$params)
    {return true;}
    public function targeta_trab(&$params)
    {   $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id_contrato = $params['contrato_id'];
        $_table = $this->_dbase->GetTable('plantilla.targeta_jornal');
        $_data=$_table->GetRange($_limit,$_start,"contrato_id = '$id_contrato' and  activo =true");
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public  function Validatedia (){}
    public  function dia (){
        $dia=date('Y-m-d');
        date('H:i:s');
        return json_encode($dia) ;
    }

    public function Validatesalida(&$params){
        return true;
    }
    public function salida(&$params){
        $id = $params['id'];
        $hora_salida=date('H:i:s');
        $table=$this->_dbase->GetTable('plantilla.targeta_jornal');
        $data=$table->Update(array('hora_salida' => "'$hora_salida'"),"id ='$id'");
        return true;
    }

    public function Validateentrada(&$params){
        return true;
    }
    public function entrada(&$params){
        $hora_entrada = date('H:i:s');
        $mes=date('m');
        $anno=date('Y');
        $dia_mes=date('d');
        $dia=date('Y-m-d');
        $contrato = $params['contrato_id'];
        $table=$this->_dbase->GetTable('plantilla.targeta_jornal');
        $data=$table->InsertValues(array('dia' => "'$dia'",'contrato_id' => "'$contrato'",'hora_entrada' => "'$hora_entrada'",'mes' => "'$mes'",'anno' => "'$anno'",'dia_mes' => "'$dia_mes'"));
        return true;
    }

    public function ValidateCrear_Gestión(&$params){
    return true;
}
    public function Crear_Gestión(&$params){
        $hora_entrada = $params['H_entrada'];
        $H_salida = $params['H_salida'];
        $Descripción=$params['Descripción'];
        $dia=$params['dia'];
        $contrato = $params['contrato_id'];
        $fecha = explode('-',$dia);
        $anno=$fecha[0];
        $mes=$fecha[1];
        $dia_mes=$fecha[2];
        $table=$this->_dbase->GetTable('plantilla.targeta_jornal');
        $data=$table->InsertValues(array(
            'dia' => "'$dia'",
            'contrato_id' => "'$contrato'",
            'hora_entrada' => "'$hora_entrada'",
            'hora_salida' => "'$H_salida'",
            'observaciones' => "'$Descripción'",
            'mes' => "'$mes'",
            'anno' => "'$anno'",
            'dia_mes' => "'$dia_mes'"));
        if ($data){return true;}
        else return false;


    }

    public function ValidateMod_Gestión(&$params){
        return true;
    }
    public function Mod_Gestión(&$params){
        $hora_entrada = $params['H_entrada'];
        $H_salida = $params['H_salida'];
        $Descripción=$params['Descripción'];
        $dia=$params['dia'];
        $contrato = $params['contrato_id'];
        $id = $params['id'];
        $fecha = explode('-',$dia);
        $anno=$fecha[0];
        $mes=$fecha[1];
        $dia_mes=$fecha[2];
        $table=$this->_dbase->GetTable('plantilla.targeta_jornal');
        $data=$table->Update(array(
                                'dia' => "'$dia'",
                                'contrato_id' => "'$contrato'",
                                'hora_entrada' => "'$hora_entrada'",
                                'hora_salida' => "'$H_salida'",
                                'observaciones' => "'$Descripción'",
                                'mes' => "'$mes'",
                                'anno' => "'$anno'",
                                'dia_mes' => "'$dia_mes'"),"id = '$id'");
        if ($data){return true;}
        else return false;


    }

    public function ValidateEliminar(&$params) {
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        if ($id) {
            $datos=$this->_dbase->GetTable("plantilla.targeta_jornal");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else return false;
    }

};
?>
