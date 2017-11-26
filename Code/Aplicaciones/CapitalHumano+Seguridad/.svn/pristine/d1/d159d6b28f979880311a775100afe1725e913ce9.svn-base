<?PHP	
class SPControler extends Module
{
    public function __construct()
    {
       // parent::__construct();
        parent::__construct('common.ch');
    }
    public function LinkFunctions()
    {
            $this->Link('main','LoadData');
            $this->Link('AddSistemaPago','AddSistemaPago');
//            $this->Link('Modify','ModifyUserData');
//            $this->Link('ChangePassword','ChangeUserPassword');
//            $this->Link('Delete','DeleteUser');
    }
    public function ValidateLoadData()
    {
        return true;
    }
    public function LoadData($params)
    {
        $_data = array();
        $_select_indicadores=$this->_dbase->GetTable("cuadro.sist_pago_cuadros");
        $_selection_cuadros=$this->_dbase->GetTable("vistas_resumen.cuadros");
        if(is_null($_select_indicadores))
        {
                $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                //$_dbase->Free();
                return false;
        }
        if(is_null($_selection_cuadros))
        {
                $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                //$_dbase->Free();
                return false;
        }
        $_data_indicadores = $_select_indicadores->GetAll("activo = 'true'");
        $_data_cuadros = $_selection_cuadros->GetAll();
        $result = array( 'success' => true, 'results' => 1, 'sp' => $_data_indicadores,'cuadros'=> $_data_cuadros);
        return $result;
    }

    public function ValidateLoadData_cuadors()
    {
        return true;
    }
    public function LoadData_cuadors($params)
    {
        $_data = array();
        $_select_indicadores=$this->_dbase->GetTable("cuadro.sist_pago_cuadros");
        $_selection_cuadros=$this->_dbase->GetTable("vistas_resumen.cuadros");
        if(is_null($_select_indicadores))
        {
            $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
            //$_dbase->Free();
            return false;
        }
        if(is_null($_selection_cuadros))
        {
            $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
            //$_dbase->Free();
            return false;
        }
        $_data_indicadores = $_select_indicadores->GetAll("activo = 'true'");
        $_data_cuadros = $_selection_cuadros->GetAll();
        $result = array( 'success' => true, 'results' => 1, 'rows' =>$_data_cuadros);
        return $result;
    }

    public function ValidateAddSistemaPago($params)
    {
            return true;
    }
    public function AddSistemaPago($params)
    {
            $_nombre = $params['nombre'];
            $_indicadores = json_decode(utf8_decode($params['listado']));
            $_table = $this->_dbase->GetTable('cuadro.sist_pago_cuadros');
            $_result = $_table->InsertValues(array('nombre' => "'$_nombre'"));
            if(is_null($_result))
            {
                    $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                    $this->_dbase->Free();
                    return false;
            }
            $_id = $_table->GetAll("nombre = '$_nombre'");
            $a = $_id[0]['id'];
            $_table_indi = $this->_dbase->GetTable('cuadro.indicadores');
            for ($i = 0; $i < count($_indicadores); $i++)
            {
                $_nombre = $_indicadores[$i]->nombre;
                $_orden = $_indicadores[$i]->orden;
                $_result_indi = $_table_indi->InsertValues(array('nombre' => "'$_nombre'",'sist_pago_id' => "'$a'", 'orden' => "$_orden"));
                if(is_null($_result_indi))
                {
                        $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                    $this->_dbase->Free();
                        return false;
                }
            }
            $_todo = $_table_indi->GetAll("sist_pago_id = '$a'");
            $result = array( 'success' => true,'sp_id' => $a,'list_indi'=>$_todo);
            return $result;
    }
    public function ValidateConfIndicadoresCuadros($params)
    {
        $_cuadro = json_decode(utf8_decode($params['cuadro']));
        $_indicadores = json_decode(utf8_decode($params['listado']));
        if($_cuadro &&  count($_indicadores) >= 1)
          {
            return true;
          }
        return false;
    }
    public function ConfIndicadoresCuadros($params)
    {

        $cuadro=$this->_dbase->GetTable("cuadro.trabajador_sist_pago");
        $_indicadores_tabla=$this->_dbase->GetTable("cuadro.trabajador_indicadores");
        $_cuadro = $params['cuadro'];
        $_indicadores = json_decode(utf8_decode($params['listado']));
        $_id_sp = $_indicadores[0]->sistema_pagoid;

        $result=$cuadro->Contains(array('trabajador_id' => "'$_cuadro'",'sist_pago' => "'$_id_sp'"));
        if ($result==0)
        {
            $cuadro->InsertValues(array('trabajador_id'=>"'$_cuadro'",'sist_pago'=>"'$_id_sp'"));
        }

        for($o=0;$o < count($_indicadores);$o++)
        {
            $_id = $_indicadores[$o]->id;
            $_formador = $_indicadores[$o]->formador;
            $_cg = $_indicadores[$o]->cg;
            $_ce = $_indicadores[$o]->ce;


            if($_formador==''){$_formador='false';} else {$_formador = 'true';}
            if($_cg==''){$_cg='false';} else {$_cg = 'true';}
            if($_ce==''){$_ce='false';} else {$_ce = 'true';}



            $result1=$_indicadores_tabla->Contains(array('trabajador_id' => "'$_cuadro'",'ind_id' => "'$_id'"));
            if($result1==0){
                $_indicadores_tabla->InsertValues(array(
                    'trabajador_id'=>"'$_cuadro'",
                    'formador'=>"'$_formador'",
                    'cg '=>"'$_cg'",
                    'ce'=>"'$_ce'",
                    'ind_id' => "'$_id'"));
            }
            else {
                $_indicadores_tabla->Update(array(
                    'trabajador_id'=>"'$_cuadro'",
                    'formador'=>"'$_formador'",
                    'cg '=>"'$_cg'",
                    'ce'=>"'$_ce'",
                    'ind_id' => "'$_id'"),"id = '$_id' and trabajador_id = '$_cuadro'");
            }

        }
        $_new_data = $this->LoadData($params);
        $result_data = array('success' => true,'cuadros'=> $_new_data['cuadros'],'sp'=> $_new_data['sp']);
        return $result_data;
    }

    public function ValidateLoadConfIndicadorCuadro($params)
    {
        if($params['id_cuadro'])
            return true;
        return false;
    }
    public function LoadConfIndicadorCuadro($params)
    {
        $cuadro = $params['id_cuadro'];
        $sp = $params['id_sp'];

        $_str_query = "SELECT * FROM gestion.trab_sist_pago_indicador WHERE id = $cuadro AND id_sp = $sp;";

        $_selection = $this->_dbase->Select($_str_query);
        if(is_null($_selection))
            {
 //               $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
               // $_dbase->Free();
                return false;
            }
        $_datos = $_selection->GetAll();
       // $_selection->Free();

        if($_datos)
            $result = array( 'success' => true,'result' => $_datos);
        else
            $result = false;

        return $result;
    }
    public function ValidateLoadDatosSP($params)
    {
        return true;
    }
    public function LoadDatosSP($params)
    {
        $_sp = $params['id_sp'];
        
        $_dbase = ConnectionsManager::GetDatabase('evac');
        if( ErrorManager::ExistsErrors() )
        {
                $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                return false;
        }
        
        $_str_sp = "SELECT nombre FROM gestion.sistema_pago WHERE id = $_sp;";
        $_str_indi = "SELECT id, nombre, sistema_pagoid FROM gestion.indicadores WHERE sistema_pagoid = $_sp;";
        $_selection_sp = $_dbase->Select($_str_sp);
        $_selection_indi = $_dbase->Select($_str_indi);
        if(is_null($_selection_sp)||is_null($_selection_indi))
            {
                $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                $_dbase->Free();
                return false;
            }
         $_datos_sp = $_selection_sp->GetAll();
         $_datos_indi = $_selection_indi->GetAll();
         $_selection_sp->Free();
         $_selection_indi->Free();

         $result = array( 'success' => true,'sp' => $_datos_sp[0],'indicadores'=>$_datos_indi);

         return $result;

    }
    public function ValidateLoadDataCuadros($params)
    {
        return true;
    }
    public function LoadDataCuadros($params)
    {
        $_data = array();
        // Connect
        $_dbase = ConnectionsManager::GetDatabase('evac');
        if( ErrorManager::ExistsErrors() )
        {
                $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                return false;
        }

        $id_sp = $params['id_sp'];
//         Get data
        $_str_query_cuadros = "SELECT * FROM (
                                            SELECT id, nombre||' '||apellidos as nombre,eee.sistema_pagoid
                                            FROM gestion.trabajador
                                            JOIN gestion.cuadro ON (gestion.trabajador.id = gestion.cuadro.trabajadorid)
                                            left JOIN (SELECT trabajadorid,sistema_pagoid
                                            FROM gestion.trabajador
                                            JOIN gestion.trabajador_sistema_pago on (trabajador.id = trabajador_sistema_pago.trabajadorid)
                                            WHERE trabajador_sistema_pago.activo = true )eee on (trabajador.id = eee.trabajadorid)
                                            WHERE trabajador.activo = true AND cuadro.activo = true
                                            ORDER BY nombre ASC) AS o
                                            where
                                            sistema_pagoid <> $id_sp or
                                            sistema_pagoid is null;";

        $_str_query_indi = "SELECT id,nombre FROM gestion.indicadores WHERE sistema_pagoid = $id_sp order by orden ASC;";

        $_selection_cuadros = $_dbase->Select($_str_query_cuadros);
        $_selection_indi = $_dbase->Select($_str_query_indi);

        if(is_null($_selection_cuadros))
        {
                $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                $_dbase->Free();
                return false;
        }
        if(is_null($_selection_indi))
        {
                $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
                $_dbase->Free();
                return false;
        }

        $_data_cuadros = $_selection_cuadros->GetAll();
        $_data_indi = $_selection_indi->GetAll();

        $_selection_cuadros->Free();
        $_selection_indi->Free();

        $result = array( 'success' => true,'cuadros'=> $_data_cuadros,'indi'=>$_data_indi);

        return $result;
    }
    public function ValidateAddTrabToSP($params)
    {
        return true;
    }
    public function AddTrabToSP($params)
    {
        $temp = str_replace("\\","",$params);
        $result = $this->ConfIndicadoresCuadros($temp);
        if($result)
           $_new_data = $this->LoadData($params);

        $result = array('success' => true,'cuadros'=> $_new_data['cuadros'],'sp'=> $_new_data['sp']);

        return $result;
    }
    public function ValidateModTrabToSP($params) {
        return true;
    }
    public function ModTrabToSP($params) {
        // Connect
        $_dbase = ConnectionsManager::GetDatabase('evac');
        if( ErrorManager::ExistsErrors() )
        {
            $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
            return false;
        }

        $_temp = str_replace("\\", "",$params['listado']);
        $_listado = json_decode(utf8_decode($_temp));
        $_id_sp = $_listado[0]->sistema_pagoid;
        $_id_cuadro = $_listado[0]->cuadro_id;

        $_str_query = "SELECT gestion.fn_clean_indicadores_cuadro_sp($_id_cuadro);";
        $_selection  = $_dbase->Select($_str_query);


//        var_dump($_str_query);

        foreach ($_listado as $_value) {
            $_indicador = $_value->id_indi;
            $_formador = $_value->formador == true ? 'true' : 'false';
            $_cg = $_value->cg == true ? 'true' : 'false';
            $_ce = $_value->ce == true ? 'true' : 'false';
            $_str_query = "SELECT gestion.fn_update_indicadores_cuadro_sp($_id_cuadro, $_indicador,  $_formador::boolean, $_cg::boolean, $_ce::boolean);";
            $_selection  = $_dbase->Select($_str_query);
        }

        $_new_data = $this->LoadData($params);
        $result = array('success' => true,'cuadros'=> $_new_data['cuadros'],'sp'=> $_new_data['sp']);
        return $result;
    }
    public function ValidateLoadDataIndCuadro($params) {
        return true;
    }
    public function LoadDataIndCuadro($params) {
        $cuadro = $params['_id_cuadro'];
        $sp = $params['id_sp'];
        $_datos = array();

        // Connect
        $_dbase = ConnectionsManager::GetDatabase('evac');
        if( ErrorManager::ExistsErrors() )
        {
            $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
            return false;
        }

        $_str_query = "SELECT trab_sist_pago_indicador.id, indicadores.nombre, id_indi,
	case when formador = true then 'true' else 'false' end as formador,
	case when cg = true then 'true' else 'false' end as cg,
	case when ce = true then 'true' else 'false' end as ce, id_sp
	FROM gestion.trab_sist_pago_indicador
	inner join gestion.indicadores on indicadores.id = trab_sist_pago_indicador.id_indi
	WHERE trab_sist_pago_indicador.id = $cuadro AND id_sp = $sp
UNION
select null as id, nombre, id as id_indi, 'false' as formador, 'false' as cg, 'false' as ce, sistema_pagoid as id_sp from gestion.indicadores where sistema_pagoid = $sp and
	id not in (SELECT id_indi FROM gestion.trab_sist_pago_indicador
		inner join gestion.indicadores on indicadores.id = trab_sist_pago_indicador.id_indi
		WHERE trab_sist_pago_indicador.id = $cuadro AND id_sp = $sp);";

//        var_dump($_str_query);
        $_selection = $_dbase->Select($_str_query);
        if(is_null($_selection))
        {
            $this->RegisterDBaseErrors(ErrorManager::GetErrorList());
            $_dbase->Free();
            return false;
        }
        $_datos = $_selection->GetAll();
        $_selection->Free();

        if($_datos)
            $result = array( 'success' => true,'rows' => $_datos);
        else
            $result = false;

        return $result;
    }

    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $id_SP = $params['id_SP'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('cuadro.indicadores');
        $_data = $_table->GetRange($_limit, $_start , "activo = 'true' and sist_pago_id = '$id_SP' ");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidatemodSP_Ind(&$params){
        return true;
    }
    public function modSP_Ind(&$params){
        $data = json_decode($params['data']);
        $nombre=$params['nombre'];
        $id_SP=$params['id_SP'];
        $datos=$this->_dbase->GetTable("cuadro.indicadores");
        $datos1=$this->_dbase->GetTable("cuadro.sist_pago_cuadros");
        $datosIns=$datos1->Update(array('nombre' => "'$nombre'"),"id = '$id_SP'");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->id;
            $nombre = $data[$i]->nombre;
            $orden = $data[$i]->orden;
            if(isset($id)){
             $datosIns=$datos->Update(array('nombre' => "'$nombre'",'orden' => "'$orden'"),"id = '$id'");
            }
            else{
                $datosIns=$datos->InsertValues(array('nombre' => "'$nombre'",'orden' => "'$orden'",'sist_pago_id' => "'$id_SP'"));
            }
        }
        return true;
    }

    public function ValidateEliminarhs(&$params) {
        return true;
    }
    public function Eliminarhs(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id){
            $datos=$this->_dbase->GetTable("cuadro.indicadores");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            if($result )return true;
            else return false;
        }
    }

    public function ValidateEliminarSP(&$params) {
        return true;
    }
    public function EliminarSP(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id){
            $datos=$this->_dbase->GetTable("cuadro.sist_pago_cuadros");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            if($result )return true;
            else return false;
        }
    }
    public function ValidateEliminarSP_inc(&$params) {
        return true;
    }
    public function EliminarSP_inc(&$params) {
        $id = $params['id'];
        $result=null;
        if ($id){
            $datos=$this->_dbase->GetTable("cuadro.trabajador_indicadores");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            if($result )return true;
            else return false;
        }
    }

    public function Validateindicadores(&$params){return true;}
    public function indicadores(&$params){

        $sp = $params['sist'];
        $user_id = $params['cuad'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $ind_cuadro = $this->_dbase->GetTable('vistas_resumen.indicadores_cuados');
        $indcs = $this->_dbase->GetTable('cuadro.indicadores');

        $_data = $ind_cuadro->GetRange($_limit, $_start,"trabajador_id = '$user_id' and sit_pago = '$sp'");
        $_data1 = $indcs->GetRange($_limit, $_start,"sist_pago_id = '$sp'");

        $_count = $ind_cuadro->GetRowsCount("trabajador_id = '$user_id' and sit_pago = '$sp'");
        $_count1 = $indcs->GetRowsCount("sist_pago_id = '$sp'");

        $result = array('success' => true, 'results' => $_count,'results1' => $_count1, 'rows' => $_data,'rows1' => $_data1);
        return $result;



    }


    public function ValidateAdd_indicadores(&$params){return true;}
    public function Add_indicadores(&$params){
        $ind_cuadro = $this->_dbase->GetTable('vistas_resumen.indicadores_cuados');
        $indcs = $this->_dbase->GetTable('cuadro.indicadores');
        $cua_ind = $this->_dbase->GetTable('cuadro.trabajador_indicadores');
        $nevos = json_decode(utf8_decode($params['nevos']));
        $data = json_decode(utf8_decode($params['data']));
        $sp = $params['sist'];
        $user_id = $params['cuad'];
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        for ($i = 0; $i < count($nevos); $i++)
        {
            $id = $nevos[$i]->id;
            $_nombre = $nevos[$i]->nombre;
            $formador = $nevos[$i]->formador;
            $cg = $nevos[$i]->cg;
            $ce = $nevos[$i]->ce;

            if($formador==1){$formador='true';}else{$formador='false';}
            if($cg==1){$cg='true';}else{$cg='false';}
            if($ce==1){$ce='true';}else{$ce='false';}

            $cant= $cua_ind->GetFirstValue('id',"trabajador_id = '$user_id' and ind_id = '$id' and activo='true'");
           if(!isset($cant))
           { $_result_indi = $cua_ind->InsertValues(array('trabajador_id' => "'$user_id'",'ind_id' => "'$id'",'formador' => "$formador",'cg' => "$cg",'ce' => "$ce"));
            if(is_null($_result_indi))
            {
                $this->_dbase->Free();
                return false;
            }
           }
        }
        for ($i = 0; $i < count($data); $i++)
        {
            $indc_id = $data[$i]->indc_id;
            $id = $data[$i]->id;
            $sit_pago = $data[$i]->sit_pago;
            $nombre = $data[$i]->nombre;
            $trabajador_id = $data[$i]->trabajador_id;
            $formador = $data[$i]->formador;
            $cg = $data[$i]->cg;
            $ce = $data[$i]->ce;
            if($formador==1){$formador='true';}else{$formador='false';}
            if($cg==1){$cg='true';}else{$cg='false';}
            if($ce==1){$ce='true';}else{$ce='false';}
            $_result_indi=$cua_ind->Update(array('ind_id'=>"'$indc_id'",'formador'=>"'$formador'",'cg'=>"'$cg'",'ce'=>"'$ce'",'trabajador_id' => "'$trabajador_id'"),"id = '$id'");
            if(is_null($_result_indi))
            {
                $this->_dbase->Free();
                return false;
            }
        }
        $_data = $ind_cuadro->GetRange($_limit, $_start,"trabajador_id = '$user_id' and sit_pago = '$sp'");
        $_data1 = $indcs->GetRange($_limit, $_start,"sist_pago_id = '$sp'");
        $_count = $ind_cuadro->GetRowsCount("trabajador_id = '$user_id' and sit_pago = '$sp'");
        $_count1 = $indcs->GetRowsCount("sist_pago_id = '$sp'");
        $result = array('success' => true, 'results' => $_count,'results1' => $_count1, 'rows' => $_data,'rows1' => $_data1);
        return $result;
    }
}
?>
