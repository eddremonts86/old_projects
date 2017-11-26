<?php

class FeatureBD extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ark');
    }

    public function ValidateLeer(&$params)
    {return true;}
    public function Leer(&$params)
    {
        $dir=$params['dir'];
        chdir('../../');
        $dirNew=getcwd();
        $nombre_archivo = $dirNew.'\index.php';
        $gestor = fopen($nombre_archivo, 'a+');
        $cont=file_get_contents($nombre_archivo);
        $record= json_encode($cont);
        return array('success' => true,'rows' => $record);


    }

    public function Validatereload(&$params)
    {return true;}
    public function reload(&$params)
    {
        $dir=$params['dir'];
        chdir('../../');
        $dirNew=getcwd();
        $nombre_archivo = $dirNew.'\prueba.txt';
        $gestor = fopen($nombre_archivo, 'a+');
        $cont=file_get_contents($nombre_archivo);
        $record= json_encode($cont);
        return array('success' => true,'rows' => $record);
    }

    public function ValidateEscribir(&$params)
    {return true;}
    public function Escribir(&$params)
    {   $cuerpo=$params['cuerpo'];
        $dir=$params['dir'];
        chdir('../../');
        $dirNew=getcwd();
        $nombre_archivo = $dirNew.'\prueba.txt';
        $gestor = fopen($nombre_archivo, 'w');
        fwrite($gestor, $cuerpo);
        fclose($gestor);
        $cont=file_get_contents($nombre_archivo);
        $record= json_encode($cont);
        return array('success' => true,'rows' => $record);


    }

    public function ValidateLoadInitialData(&$params){
        return TRUE;
    }
    public function LoadInitialData(&$params){
        $_data = array();
        $_data_cc = array();
        $_data_mes = array();
        $_data_tree = array();
        $_data_tree_mes = array();
        $siglas_dominio = $_SESSION['sigla'];
        $agency_id = $_SESSION['agency_id'];

        //**** Create tree unidades **************************************
        //Get data unidades
        $_table = $this->_dbase->GetTable('nomencladores._view_agencias');
        if($siglas_dominio == 'emp') {
            $_data = $_table->GetAll("activo = true", "id");

            //A�adimos el nodo Empresa al Tree
            array_push($_data_tree,array(
                'text' => 'EMPRESA',
                'id' => 'EMP-GEO-2',
                'id_agencia' => 'EMP-GEO-2',
                'productiva' => null,
                'expanded' => false,
                'leaf' => true,
                'iconCls' =>  'agency_prod'
            ));
        }
        else
            $_data = $_table->GetAll("id = '$agency_id' AND activo = true ", "id");

        if ( is_null($_data) )
            return FALSE;

        for ($index = 0; $index < count($_data); $index++) {
            array_push($_data_tree,array(
                'text' => $_data[$index]['nombre'],
                'id' => $_data[$index]['id'],
                'id_agencia' => $_data[$index]['id'],
                'productiva' => $_data[$index]['productiva'],
                'total_costosestotal_gastos'=>$_data[$index]['costos_total_costos'],
//                    'expanded' => false,
                'leaf' => false,
                'iconCls' => $_data[$index]['productiva'] == 't' ? 'agency_prod' : 'agency_noprod'
            ));

            //Get data centros de costos
            $_table = $this->_dbase->GetTable('nomencladores._view_centro_costo');
            $_id_agency = $_data[$index]['id'];
            if($siglas_dominio == 'emp' || $siglas_dominio == 'ag')
                $_data_cc = $_table->GetAll("id_agencia = '$_id_agency' AND activo = true AND inproductivo_de_otro= false ", "id_centrocosto");
            else{
                $centro_costo_id = $_SESSION['id_centro'];
                $_data_cc = $_table->GetAll("id_agencia = '$_id_agency' AND id_centrocosto = '$centro_costo_id' AND activo = true ");
            }
            if ( is_null($_data_cc) )
                return FALSE;

            if( !array_key_exists('children', $_data_tree[(count($_data_tree) - 1)]))
                $_data_tree[count($_data_tree) - 1]['children'] = array();

            for($i= 0; $i < count($_data_cc); $i++)
                array_push($_data_tree[count($_data_tree) - 1]['children'],array(
                    'text' => $_data_cc[$i]['nombre_centrocosto'],
                    'id' => $_data_cc[$i]['id_centrocosto'],
                    'id_centrocosto' => $_data_cc[$i]['id_centrocosto'],
                    'productivo' => $_data_cc[$i]['productivo'],
                    'total_costosestotal_gastos'=>$_data_tree[count($_data_tree) - 1]['total_costosestotal_gastos'],
                    'expanded' => false,
                    'leaf' => true,
                    'iconCls' => $_data_cc[$i]['productivo'] == 't' ? 'cc_prod' : 'cc_noprod',
                    'qtip'=>"Centro de costo:{$_data_cc[$i]['nombre_centrocosto']}"
                ));
        }

        //**** Create tree meses **************************************
        //Get Data meses
        $_table = $this->_dbase->GetTable('nomencladores.mes');
        $_data_mes = $_table->GetAll(null, 'orden');
        if ( is_null($_data_mes))
            return FALSE;

        for ($index = 0; $index < count($_data_mes); $index++) {

            array_push($_data_tree_mes,array(
                'text' => $_data_mes[$index]['nombre_mes'],
                'id_mes' => $_data_mes[$index]['id_mes'],
                'orden_mes' => $_data_mes[$index]['orden'],
                'leaf' => true,
                'iconCls' => 'mes'
            ));
        }

        $array_temp= array();
//            eliminamos del final del arreglo de los meses el anno
        $array_temp= array_pop($_data_tree_mes);
//              poner al inicio del arreglo de los meses el anno eliminado anteriormente
        array_unshift($_data_tree_mes,$array_temp);
        $result = array('success' => true, 'tree_agencia' => $_data_tree,'tree_meses' => $_data_tree_mes);
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
        $_table = $this->_dbase->GetTable('app_security.event_info');
        $_data = $_table->GetRange($_limit, $_start,"activo='true'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


    function Validatetreefre(){return true;}
    function treefre(){

        $query = "SELECT * FROM information_schema.columns
                           WHERE table_schema <> 'information_schema' AND table_schema <> 'pg_catalog' AND
                                 table_schema <> 'public' AND table_schema <> 'logs' AND
                                 table_schema <> 'clone' AND table_schema <> 'utiles'
                           ORDER BY table_catalog, table_schema, table_name, data_type, column_name,dtd_identifier;";

        $_selection = $this->_dbase->Select($query);
        if(is_null($_selection))return false;
        $data = $_selection->GetAll();
        $_count = $_selection->GetNumRows();

        $result = $this->BuildExtTree('root',$this->BuildTree($data,
            array('table_catalog', 'table_schema', 'table_name'/*, 'data_type'*/, 'column_name'),
            array('is_nullable', 'udt_name', 'dtd_identifier',)
            )
        );
    if ($result){
        $result = array('success' => true, 'results' => $_count, 'rows' => $result);
        return $result;
      }
    }
}
?>
