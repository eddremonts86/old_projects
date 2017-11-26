<?PHP

class ValorAg extends Module
{

    public function __construct()
    {
        parent::__construct('common.ch');
    }

    // ========================================================================//
    public function ValidateTomar_datos_generales(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales(&$params)
    {
            /* $_table = $this->_dbase->ExecuteFunction(fmd);*/
            $conn_string = "host= localhost  port= 5432 dbname=sconpte  user=postgres password=postgres";
            $concctions=pg_connect($conn_string);
            $mes = date('m');
            $anno= date('Y');
            $SQL = " SELECT * FROM nomencladores.agencia where activo=true order by id";
            $datos = pg_query($concctions,$SQL);
            $arr = pg_fetch_all($datos);
            array_push($arr,[id=>'null',nombre=>'EMPRESA',siglas=>'EMP',productiva=>'t']);
            $pb =0;
            $arr0 = "";$arr1 = "";$arr2 = "";$arr3 = "";$arr4 = "";$arr5 = "";$arr6 = "";$arr7 = "";$arr8 = "";
            $SQL0 = "";$SQL1 = "";$SQL2 = "";$SQL3 = "";$SQL4 = "";$SQL5 = "";$SQL6 = "";$SQL7 = "";$SQL8 = "";
            for($i=0;$i <count($arr);$i++){
                $id = $arr[$i]['id'];
                if($id != 'null'){
                    //Total plan
                    $SQL0 = "SELECT
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias where
                    id_unidad='$id'
                    and orden <= $mes and anno='$anno'
                    and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                    and id_tipo = 'emp18' group by id_unidad
                   ";
                    //Total real
                    $SQL1 = "SELECT
                         id_unidad,
                         sum(total)as total,
                         sum(cuc)as cuc
                         FROM datos._view_datos_pte_agencias
                         where
                          id_unidad='$id'
                         and orden <= $mes and anno='$anno'
                         and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                         and id_tipo = 'emp20' group by id_unidad
                  ";
                    //Total PPI
                    $SQL2 = "
                     SELECT
                     id_unidad,
                     sum(total)as total,
                     sum(cuc)as cuc
                     FROM datos._view_datos_pte_agencias
                     where
                     id_unidad='$id' and orden <= $mes and anno='$anno'
                     and (orden_indicador = 52)
                     and id_tipo = 'emp20'
                     group by id_unidad
                  ";
                    //Total PPF
                    $SQL3 = "
                     SELECT
                     id_unidad,
                     sum(total)as total,
                     sum(cuc)as cuc
                     FROM datos._view_datos_pte_agencias
                     where   id_unidad='$id' and orden <= $mes and anno='$anno'
                     and (orden_indicador = 53)
                     and id_tipo = 'emp20'
                     group by id_unidad
                  ";
                    //Total PTI
                    $SQL4 = "SELECT
                         id_unidad,
                         sum(total)as total,
                         sum(cuc)as cuc
                         FROM datos._view_datos_pte_agencias
                         where  id_unidad='$id' and orden <= $mes and anno='$anno'
                         and (orden_indicador = 50)
                         and id_tipo = 'emp20'
                         group by id_unidad
                        ";
                    //Total PTF
                    $SQL5 = "SELECT
                         id_unidad,
                         sum(total)as total,
                         sum(cuc)as cuc
                         FROM datos._view_datos_pte_agencias
                         where  id_unidad='$id' and orden <= $mes and anno='$anno'
                         and (orden_indicador = 51)
                         and id_tipo = 'emp20'
                         group by id_unidad
                     ";

                    $SQL6="
                        SELECT
                        sum(total)as total,sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where
                        id_unidad='$id' and
                        orden <= '$mes' and
                        anno='$anno'
                        and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13)
                        and id_tipo = 'emp20'
                        group by id_unidad
                 ";
                    $SQL7 = " SELECT

                            id_unidad,
                            sum(total)as total,sum(cuc)as cuc
                            FROM datos._view_datos_pte_agencias
                            where  id_unidad='$id'  and orden <= '$mes' and anno='$anno'
                            and ( orden_indicador = 21 or orden_indicador = 24)
                            and id_tipo = 'emp20'
                            group by id_unidad ";
                    $SQL8 = " SELECT

                        id_unidad,
                        sum(total)as total,sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where
                        id_unidad='$id'
                        and orden <= '$mes' and anno='$anno'
                        and (orden_indicador = 14)
                        and id_tipo = 'emp20'
                        group by id_unidad ";


                }
                else {
                    $SQL0 = "SELECT
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias where
                    id_unidad is null
                    and orden <= $mes and anno='$anno'
                    and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                    and id_tipo = 'emp18' group by id_unidad
                   ";
                    //print_r($SQL0);
                    //Total real
                    $SQL1 = "SELECT
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias where
                    id_unidad is null
                    and orden <= $mes and anno='$anno'
                    and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                    and id_tipo = 'emp20' group by id_unidad";
                    //Total PPI
                    $SQL2 = "
                SELECT
                id_unidad,
                sum(total)as total,
                sum(cuc)as cuc
                FROM datos._view_datos_pte_agencias
                where
                id_unidad is null and
                orden <= $mes and anno='$anno'
                and (orden_indicador = 52)
                and id_tipo = 'emp20'
                group by id_unidad
             ";
                    //Total PPF
                    $SQL3 = "
                SELECT
                id_unidad,
                sum(total)as total,
                sum(cuc)as cuc
                FROM datos._view_datos_pte_agencias
                where
                id_unidad is null and
                orden <= $mes and anno='$anno'
                and (orden_indicador = 53)
                and id_tipo = 'emp20'
                group by id_unidad
             ";
                    //Total PTI
                    $SQL4 = "SELECT
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad is null and
                    orden <= $mes and anno='$anno'
                    and (orden_indicador = 50)
                    and id_tipo = 'emp20'
                    group by id_unidad
                   ";
                    //Total PTF
                    $SQL5 = "SELECT
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                     id_unidad is null and
                     orden <= $mes and anno='$anno'
                    and (orden_indicador = 51)
                    and id_tipo = 'emp20'
                    group by id_unidad
                ";
                    $SQL6="
                        SELECT
                        sum(total)as total,sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where
                        id_unidad is null and
                        orden <= '$mes' and
                        anno='$anno'
                        and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13)
                        and id_tipo = 'emp20'
                        group by  id_unidad
                 ";
                    $SQL7 = " SELECT

                        id_unidad,
                        sum(total)as total,sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where
                        id_unidad is null
                        and orden <= '$mes' and anno='$anno'
                        and ( orden_indicador = 21 or orden_indicador = 24)
                        and id_tipo = 'emp20'
                        group by id_unidad ";
                    $SQL8 = " SELECT

                        id_unidad,
                        sum(total)as total,sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where
                        id_unidad is null
                        and orden <= '$mes' and anno='$anno'
                        and (orden_indicador = 14)
                        and id_tipo = 'emp20'
                        group by id_unidad ";
                }
                $datos0 = pg_query($concctions,$SQL0);  $datos1 = pg_query($concctions,$SQL1);
                $datos2 = pg_query($concctions,$SQL2);  $datos3 = pg_query($concctions,$SQL3);
                $datos4 = pg_query($concctions,$SQL4);  $datos5 = pg_query($concctions,$SQL5);
                $datos6 = pg_query($concctions,$SQL6);  $datos7 = pg_query($concctions,$SQL7);
                $datos8 = pg_query($concctions,$SQL8);
                $arr0 = pg_fetch_all($datos0);          $arr1 = pg_fetch_all($datos1);
                $arr2 = pg_fetch_all($datos2);          $arr3 = pg_fetch_all($datos3);
                $arr4 = pg_fetch_all($datos4);          $arr5 = pg_fetch_all($datos5);
                $arr6= pg_fetch_all($datos6);           $arr7= pg_fetch_all($datos7);
                $arr8= pg_fetch_all($datos8);
                $arr[$i]['plan_a']=$arr0[0]['total'];
                $arr[$i]['real_a']=$arr1[0]['total'];
                $SC_a=$arr7[0]['total'];            $GM_a=$arr6[0]['total'];
                $real_a=$arr1[0]['total'];          $salario =$arr8[0]['total'];
                $PPI_a =$arr2[0]['total'];          $PTI_a=$arr4[0]['total'];
                $PPF_a=$arr3[0]['total'];           $PTF_a=$arr5[0]['total'];
                $pb =  $real_a + ( $PPF_a-$PPI_a + $PTF_a-$PTI_a);
                $VA=$pb - $SC_a -$GM_a;
                $arr[$i]['PB']= $pb;
                $arr[$i]['VA']=$VA;
                $arr[$i]['SVA']=$salario/$VA;
            }
            pg_close($concctions);

//========================seguridad============================
        $user = $_SESSION[CUI];
        $datos=$this->_dbase->GetTable("system.seguridad");
        $id_agencia = $datos->GetValueWhere(id_agen,"id_traba = '$user'");
        $final=array();
        if($id_agencia == 'syst_All'){
            if (is_null($arr))return false;
            $_count= count($arr);
            if ($arr == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $arr);
            return $result;
        }
        else {
            for($i=0;$i<count($arr);$i++){
                if($arr[$i]['id']==$id_agencia ){
                    array_unshift($final,$arr[$i]);
                    //print_r($final);
                }
            }
            if (is_null($final))return false;
            $_count= count($final);
            if ($final == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $final);
            return $result;
        }

    }

    public function ValidateBuscar(&$params)
    {
        return true;
    }
    public function Buscar(&$params)
    {   $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $anno = $params['anno'];
        $mes = $params['mes'];
        $_table = $this->_dbase->GetTable('system.pronostico_view');
        $_data = $_table->GetAll("mes='$mes' and anno = '$anno'");
        if($_data){
            $conn_string = "host= localhost  port= 5432 dbname=sconpte  user=postgres password=postgres";
                $concctions=pg_connect($conn_string);
                $pb =0;
                $arr0 = "";
                $arr1 = "";
                $arr2 = "";
                $arr3 = "";
                $arr4 = "";
                $arr5 = "";
                $arr6 = "";
                $arr7 = "";
                $arr8 = "";

                $SQL0 = "";
                $SQL1 = "";
                $SQL2 = "";
                $SQL3 = "";
                $SQL4 = "";
                $SQL5 = "";
                $SQL6 = "";
                $SQL7 = "";
                $SQL8 = "";

                for($i=0;$i <count($_data);$i++){
                    $id = $_data[$i]['id'];
                    if($id != 'null'){
                        //Total plan
                        $SQL0 = "SELECT
                        id_unidad,
                        sum(total)as total,
                        sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias where
                        id_unidad='$id'
                        and orden <= $mes and anno='$anno'
                        and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                        and id_tipo = 'emp18' group by id_unidad
                       ";

                        //Total real
                        $SQL1 = "SELECT
                             id_unidad,
                             sum(total)as total,
                             sum(cuc)as cuc
                             FROM datos._view_datos_pte_agencias
                             where
                              id_unidad='$id'
                             and orden <= $mes and anno='$anno'
                             and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                             and id_tipo = 'emp20' group by id_unidad
                      ";
                        //Total PPI
                        $SQL2 = "
                         SELECT
                         id_unidad,
                         sum(total)as total,
                         sum(cuc)as cuc
                         FROM datos._view_datos_pte_agencias
                         where
                         id_unidad='$id' and orden <= $mes and anno='$anno'
                         and (orden_indicador = 52)
                         and id_tipo = 'emp20'
                         group by id_unidad
                      ";
                        //Total PPF
                        $SQL3 = "
                         SELECT
                         id_unidad,
                         sum(total)as total,
                         sum(cuc)as cuc
                         FROM datos._view_datos_pte_agencias
                         where   id_unidad='$id' and orden <= $mes and anno='$anno'
                         and (orden_indicador = 53)
                         and id_tipo = 'emp20'
                         group by id_unidad
                      ";
                        //Total PTI
                        $SQL4 = "SELECT
                             id_unidad,
                             sum(total)as total,
                             sum(cuc)as cuc
                             FROM datos._view_datos_pte_agencias
                             where  id_unidad='$id' and orden <= $mes and anno='$anno'
                             and (orden_indicador = 50)
                             and id_tipo = 'emp20'
                             group by id_unidad
                            ";
                        //Total PTF
                        $SQL5 = "SELECT
                             id_unidad,
                             sum(total)as total,
                             sum(cuc)as cuc
                             FROM datos._view_datos_pte_agencias
                             where  id_unidad='$id' and orden <= $mes and anno='$anno'
                             and (orden_indicador = 51)
                             and id_tipo = 'emp20'
                             group by id_unidad
                         ";

                        $SQL6="
                            SELECT
                            sum(total)as total,sum(cuc)as cuc
                            FROM datos._view_datos_pte_agencias
                            where
                            id_unidad='$id' and
                            orden <= '$mes' and
                            anno='$anno'
                            and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13)
                            and id_tipo = 'emp20'
                            group by id_unidad
                     ";

                        $SQL7 = " SELECT

                                id_unidad,
                                sum(total)as total,sum(cuc)as cuc
                                FROM datos._view_datos_pte_agencias
                                where  id_unidad='$id'  and orden <= '$mes' and anno='$anno'
                                and ( orden_indicador = 21 or orden_indicador = 24)
                                and id_tipo = 'emp20'
                                group by id_unidad ";

                        $SQL8 = " SELECT

                            id_unidad,
                            sum(total)as total,sum(cuc)as cuc
                            FROM datos._view_datos_pte_agencias
                            where
                            id_unidad='$id'
                            and orden <= '$mes' and anno='$anno'
                            and (orden_indicador = 14)
                            and id_tipo = 'emp20'
                            group by id_unidad ";


                    }
                    else {
                        $SQL0 = "SELECT
                        id_unidad,
                        sum(total)as total,
                        sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias where
                        id_unidad is null
                        and orden <= $mes and anno='$anno'
                        and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                        and id_tipo = 'emp18' group by id_unidad
                       ";
                        //print_r($SQL0);
                        //Total real
                        $SQL1 = "SELECT
                        id_unidad,
                        sum(total)as total,
                        sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias where
                        id_unidad is null
                        and orden <= $mes and anno='$anno'
                        and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                        and id_tipo = 'emp20' group by id_unidad";
                        //Total PPI
                        $SQL2 = "
                    SELECT
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad is null and
                    orden <= $mes and anno='$anno'
                    and (orden_indicador = 52)
                    and id_tipo = 'emp20'
                    group by id_unidad
                 ";
                        //Total PPF
                        $SQL3 = "
                    SELECT
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad is null and
                    orden <= $mes and anno='$anno'
                    and (orden_indicador = 53)
                    and id_tipo = 'emp20'
                    group by id_unidad
                 ";
                        //Total PTI
                        $SQL4 = "SELECT
                        id_unidad,
                        sum(total)as total,
                        sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where
                        id_unidad is null and
                        orden <= $mes and anno='$anno'
                        and (orden_indicador = 50)
                        and id_tipo = 'emp20'
                        group by id_unidad
                       ";
                        //Total PTF
                        $SQL5 = "SELECT
                        id_unidad,
                        sum(total)as total,
                        sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where
                         id_unidad is null and
                         orden <= $mes and anno='$anno'
                        and (orden_indicador = 51)
                        and id_tipo = 'emp20'
                        group by id_unidad
                    ";
                        $SQL6="
                            SELECT
                            sum(total)as total,sum(cuc)as cuc
                            FROM datos._view_datos_pte_agencias
                            where
                            id_unidad is null and
                            orden <= '$mes' and
                            anno='$anno'
                            and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13)
                            and id_tipo = 'emp20'
                            group by  id_unidad
                     ";
                        $SQL7 = " SELECT

                            id_unidad,
                            sum(total)as total,sum(cuc)as cuc
                            FROM datos._view_datos_pte_agencias
                            where
                            id_unidad is null
                            and orden <= '$mes' and anno='$anno'
                            and ( orden_indicador = 21 or orden_indicador = 24)
                            and id_tipo = 'emp20'
                            group by id_unidad ";
                        $SQL8 = " SELECT

                            id_unidad,
                            sum(total)as total,sum(cuc)as cuc
                            FROM datos._view_datos_pte_agencias
                            where
                            id_unidad is null
                            and orden <= '$mes' and anno='$anno'
                            and (orden_indicador = 14)
                            and id_tipo = 'emp20'
                            group by id_unidad ";

                    }

                    $datos0 = pg_query($concctions,$SQL0);
                    $datos1 = pg_query($concctions,$SQL1);
                    $datos2 = pg_query($concctions,$SQL2);
                    $datos3 = pg_query($concctions,$SQL3);
                    $datos4 = pg_query($concctions,$SQL4);
                    $datos5 = pg_query($concctions,$SQL5);
                    $datos6 = pg_query($concctions,$SQL6);
                    $datos7 = pg_query($concctions,$SQL7);
                    $datos8 = pg_query($concctions,$SQL8);

                    $arr0 = pg_fetch_all($datos0);
                    $arr1 = pg_fetch_all($datos1);
                    $arr2 = pg_fetch_all($datos2);
                    $arr3 = pg_fetch_all($datos3);
                    $arr4 = pg_fetch_all($datos4);
                    $arr5 = pg_fetch_all($datos5);
                    $arr6= pg_fetch_all($datos6);
                    $arr7= pg_fetch_all($datos7);
                    $arr8= pg_fetch_all($datos8);

                    $_data[$i]['plan_a']=$arr0[0]['total'];
                    $_data[$i]['real_a']=$arr1[0]['total'];

                    $SC_a=$arr7[0]['total'];
                    $GM_a=$arr6[0]['total'];
                    $real_a=$arr1[0]['total'];
                    $salario =$arr8[0]['total'];
                    $PPI_a =$arr2[0]['total'];
                    $PTI_a=$arr4[0]['total'];
                    $PPF_a=$arr3[0]['total'];
                    $PTF_a=$arr5[0]['total'];

                    $pb =  $real_a + ( $PPF_a-$PPI_a + $PTF_a-$PTI_a);

                   /* print_r($SC_a);
                    print_r('-------');
                    print_r($GM_a);*/

                    $VA=$pb - $SC_a -$GM_a;

                    //print_r($PTI_a.'--');
                    $_data[$i]['PB']= $pb;
                    $_data[$i]['VA']=$VA;
                    $_data[$i]['SVA']=$salario/$VA;


                }
        }

        //========================seguridad=======================================
        $user = $_SESSION[CUI];
        $datos=$this->_dbase->GetTable("system.seguridad");
        $id_agencia = $datos->GetValueWhere(id_agen,"id_traba = '$user'");
        $final=array();
        if($id_agencia == 'syst_All'){
            if (is_null($_data))return false;
            $_count= count($_data);
            if ($_data == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
            return $result;
        }
        else {
        for($i=0;$i<count($_data);$i++){
            if($_data[$i]['id']==$id_agencia ){
                array_unshift($final,$_data[$i]);
                //print_r($final);
            }
        }
            if (is_null($final))return false;
            $_count= count($final);
            if ($final == -1)return false;
            $result = array('success' => true, 'results' => $_count, 'rows' => $final);
            return $result;
        }

        //==========================================================================

    }

    public function ValidateBuscar_unidad(&$params)
    {
        return true;
    }
    public function Buscar_unidad(&$params)
    {   $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $anno = $params['anno'];
        $mes = $params['mes'];
        $id = $params['id'];
        $_table = $this->_dbase->GetTable('system.pronostico_view');
        $_data = $_table->GetAll("mes='$mes' and id='$id' and anno = '$anno'");
        //print_r($_data);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateTomar_datos_generales_(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales_(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $id = $params['id'];
        $conn_string = "host= localhost  port= 5432 dbname=sconpte  user=postgres password=postgres";
        $concctions=pg_connect($conn_string);

        if ($id == 'null'){
            $SQL = " SELECT orden,
                    id_indicador,
                    orden_indicador,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where id_unidad is null and orden = '$mes' and anno='$anno'
                    and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13 or orden_indicador = 14)
                    and id_tipo = 'emp18'
                    group by orden, id_indicador,orden_indicador,id_unidad ";

        }
        else {
           $SQL = " SELECT orden,
                    id_indicador,
                    orden_indicador,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where id_unidad='$id' and orden = '$mes' and anno='$anno'
                    and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13 or orden_indicador = 14)
                    and id_tipo = 'emp18'
                    group by orden, id_indicador,orden_indicador,id_unidad ";
        }

        $datos = pg_query($concctions,$SQL);
        $arr = pg_fetch_all($datos);

        if (is_null($arr))
            return false;
        $_count= count($arr);
        if ($arr == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $arr);
        pg_close($concctions);
        return $result;
    }

    public function ValidateTomar_datos_generales_SC(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales_SC(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $id = $params['id'];

        $conn_string = "host= localhost  port= 5432 dbname=sconpte  user=postgres password=postgres";
        $concctions=pg_connect($conn_string);

        if ($id == 'null'){
            $SQL = " SELECT
                    orden,
                    id_unidad,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where id_unidad is null and orden = '$mes' and anno='$anno'
                    and ( orden_indicador = 21 or orden_indicador = 24)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";
        }
        else {
        $SQL = " SELECT
                    orden,
                    id_unidad,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where id_unidad='$id' and orden = '$mes' and anno='$anno'
                    and ( orden_indicador = 21 or orden_indicador = 24)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";
        }

        $datos = pg_query($concctions,$SQL);
        $arr = pg_fetch_all($datos);

        if (is_null($arr))
            return false;
        $_count= count($arr);
        if ($arr == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $arr);
        pg_close($concctions);
        return $result;
    }


    public function ValidateTomar_datos_generales_TV(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales_TV(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $id = $params['id'];

        $conn_string = "host= 192.168.152.3  port= 5432 dbname=sconpte2.0.1  user=postgres password=postgres";
        $concctions=pg_connect($conn_string);
        if ($id == 'null'){
        $SQL = " SELECT
                    orden,
                    id_unidad,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where id_unidad is null and orden = '$mes' and anno='$anno'
                    and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";
        print_r($SQL);
        }
        else {
            $SQL = " SELECT
                    orden,
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc

                    FROM datos._view_datos_pte_agencias
                    where id_unidad='$id' and orden = '$mes' and anno='$anno'
                    and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";

        }
        $datos = pg_query($concctions,$SQL);
        $arr = pg_fetch_all($datos);

        if (is_null($arr))
            return false;
        $_count= count($arr);
        if ($arr == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $arr);
        pg_close($concctions);
        return $result;
    }


    public function ValidateTomar_datos_generales_PPI(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales_PPI(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $id = $params['id'];

        $conn_string = "host= localhost  port= 5432 dbname=sconpte  user=postgres password=postgres";
        $concctions=pg_connect($conn_string);
        if ($id == 'null'){
        $SQL = " SELECT
                    orden,
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc

                    FROM datos._view_datos_pte_agencias
                    where id_unidad is null and orden = '$mes' and anno='$anno'
                    and (orden_indicador = 52)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";
        }else{
            $SQL = " SELECT
                    orden,
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc

                    FROM datos._view_datos_pte_agencias
                    where id_unidad='$id' and orden = '$mes' and anno='$anno'
                    and (orden_indicador = 52)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";
            //print_r($SQL);
        }
        $datos = pg_query($concctions,$SQL);
        $arr = pg_fetch_all($datos);

        if (is_null($arr))
            return false;
        $_count= count($arr);
        if ($arr == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $arr);
        pg_close($concctions);
        return $result;
    }

    public function ValidateTomar_datos_generales_PTI(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales_PTI(&$params)
    {
        $mes = $params['mes'];
        $anno = $params['anno'];
        $id = $params['id'];

        $conn_string = "host= localhost  port= 5432 dbname=sconpte  user=postgres password=postgres";
        $concctions=pg_connect($conn_string);
        if ($id == 'null'){
        $SQL = " SELECT

                    orden,
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc

                    FROM datos._view_datos_pte_agencias
                    where id_unidad is null  and orden = '$mes' and anno='$anno'
                    and (orden_indicador = 50)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";
        }
        else {
            $SQL = " SELECT
                    orden,
                    id_unidad,
                    sum(total)as total,
                    sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where id_unidad='$id' and orden = '$mes' and anno='$anno'
                    and (orden_indicador = 50)
                    and id_tipo = 'emp18'
                    group by orden,id_unidad ";
        }

        $datos = pg_query($concctions,$SQL);
        $arr = pg_fetch_all($datos);

        if (is_null($arr))
            return false;
        $_count= count($arr);
        if ($arr == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $arr);
        pg_close($concctions);
        return $result;
    }


    public function ValidateTomar_datos_generales_acum(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales_acum(&$params)
    {
        $id = $params['id'];
        $conn_string = "host= localhost  port= 5432 dbname=sconpte  user=postgres password=postgres";
        $concctions=pg_connect($conn_string);
        $mes = date('m');
        $anno= date('Y');
/*
        $SQL = " SELECT * FROM nomencladores.agencia where activo=true order by id";
        $datos = pg_query($concctions,$SQL);
        $arr = pg_fetch_all($datos);
        array_push($arr,[id=>'null',nombre=>'EMPRESA',siglas=>'EMP',productiva=>'t']);*/
        $pb =0;
        $arr0 = "";
        $arr1 = "";
        $arr2 = "";
        $arr3 = "";
        $arr4 = "";
        $arr5 = "";
        $arr6 = "";
        $arr7 = "";
        $arr8 = "";

        $SQL0 = "";
        $SQL1 = "";
        $SQL2 = "";
        $SQL3 = "";
        $SQL4 = "";
        $SQL5 = "";
        $SQL6 = "";
        $SQL7 = "";
        $SQL8 = "";

        /*for($i=0;$i <count($arr);$i++){*/
            /*  print_r($i.'-');
              print_r($arr[$i]['id'].',');
              print_r('total'.count($arr).'/-');*/
            if($id != 'null'){
                //Total plan
                $SQL0 = "SELECT
                id_unidad,
                sum(total)as total,
                sum(cuc)as cuc
                FROM datos._view_datos_pte_agencias where
                id_unidad='$id'
                and orden <= $mes and anno='$anno'
                and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                and id_tipo = 'emp18' group by id_unidad
               ";
                //Total real
                $SQL1 = "SELECT
                     id_unidad,
                     sum(total)as total,
                     sum(cuc)as cuc
                     FROM datos._view_datos_pte_agencias
                     where
                      id_unidad='$id'
                     and orden <= $mes and anno='$anno'
                     and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                     and id_tipo = 'emp20' group by id_unidad
              ";
                //Total PPI
                $SQL2 = "
                 SELECT
                 id_unidad,
                 sum(total)as total,
                 sum(cuc)as cuc
                 FROM datos._view_datos_pte_agencias
                 where
                 id_unidad='$id' and orden <= $mes and anno='$anno'
                 and (orden_indicador = 52)
                 and id_tipo = 'emp20'
                 group by id_unidad
              ";
                //Total PPF
                $SQL3 = "
                 SELECT
                 id_unidad,
                 sum(total)as total,
                 sum(cuc)as cuc
                 FROM datos._view_datos_pte_agencias
                 where   id_unidad='$id' and orden <= $mes and anno='$anno'
                 and (orden_indicador = 53)
                 and id_tipo = 'emp20'
                 group by id_unidad
              ";
                //Total PTI
                $SQL4 = "SELECT
                     id_unidad,
                     sum(total)as total,
                     sum(cuc)as cuc
                     FROM datos._view_datos_pte_agencias
                     where  id_unidad='$id' and orden <= $mes and anno='$anno'
                     and (orden_indicador = 50)
                     and id_tipo = 'emp20'
                     group by id_unidad
                    ";
                //Total PTF
                $SQL5 = "SELECT
                     id_unidad,
                     sum(total)as total,
                     sum(cuc)as cuc
                     FROM datos._view_datos_pte_agencias
                     where  id_unidad='$id' and orden <= $mes and anno='$anno'
                     and (orden_indicador = 51)
                     and id_tipo = 'emp20'
                     group by id_unidad
                 ";

                $SQL6="
                    SELECT
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad='$id' and
                    orden <= '$mes' and
                    anno='$anno'
                    and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13)
                    and id_tipo = 'emp20'
                    group by id_unidad
             ";
                $SQL7 = " SELECT

                        id_unidad,
                        sum(total)as total,sum(cuc)as cuc
                        FROM datos._view_datos_pte_agencias
                        where  id_unidad='$id'  and orden <= '$mes' and anno='$anno'
                        and ( orden_indicador = 21 or orden_indicador = 24)
                        and id_tipo = 'emp20'
                        group by id_unidad ";
                $SQL8 = " SELECT

                    id_unidad,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad='$id'
                    and orden <= '$mes' and anno='$anno'
                    and (orden_indicador = 14)
                    and id_tipo = 'emp20'
                    group by id_unidad ";


            }
            else {
                $SQL0 = "SELECT
                id_unidad,
                sum(total)as total,
                sum(cuc)as cuc
                FROM datos._view_datos_pte_agencias where
                id_unidad is null
                and orden <= $mes and anno='$anno'
                and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                and id_tipo = 'emp18' group by id_unidad
               ";
                //print_r($SQL0);
                //Total real
                $SQL1 = "SELECT
                id_unidad,
                sum(total)as total,
                sum(cuc)as cuc
                FROM datos._view_datos_pte_agencias where
                id_unidad is null
                and orden <= $mes and anno='$anno'
                and (orden_indicador = 1 or orden_indicador = 2 or orden_indicador = 3 or orden_indicador = 4 or orden_indicador = 5 or orden_indicador = 6)
                and id_tipo = 'emp20' group by id_unidad";
                //Total PPI
                $SQL2 = "
            SELECT
            id_unidad,
            sum(total)as total,
            sum(cuc)as cuc
            FROM datos._view_datos_pte_agencias
            where
            id_unidad is null and
            orden <= $mes and anno='$anno'
            and (orden_indicador = 52)
            and id_tipo = 'emp20'
            group by id_unidad
         ";
                //Total PPF
                $SQL3 = "
            SELECT
            id_unidad,
            sum(total)as total,
            sum(cuc)as cuc
            FROM datos._view_datos_pte_agencias
            where
            id_unidad is null and
            orden <= $mes and anno='$anno'
            and (orden_indicador = 53)
            and id_tipo = 'emp20'
            group by id_unidad
         ";
                //Total PTI
                $SQL4 = "SELECT
                id_unidad,
                sum(total)as total,
                sum(cuc)as cuc
                FROM datos._view_datos_pte_agencias
                where
                id_unidad is null and
                orden <= $mes and anno='$anno'
                and (orden_indicador = 50)
                and id_tipo = 'emp20'
                group by id_unidad
               ";
                //Total PTF
                $SQL5 = "SELECT
                id_unidad,
                sum(total)as total,
                sum(cuc)as cuc
                FROM datos._view_datos_pte_agencias
                where
                 id_unidad is null and
                 orden <= $mes and anno='$anno'
                and (orden_indicador = 51)
                and id_tipo = 'emp20'
                group by id_unidad
            ";
                $SQL6="
                    SELECT
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad is null and
                    orden <= '$mes' and
                    anno='$anno'
                    and ( orden_indicador = 11 or orden_indicador = 12 or orden_indicador = 13)
                    and id_tipo = 'emp20'
                    group by  id_unidad
             ";
                $SQL7 = " SELECT

                    id_unidad,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad is null
                    and orden <= '$mes' and anno='$anno'
                    and ( orden_indicador = 21 or orden_indicador = 24)
                    and id_tipo = 'emp20'
                    group by id_unidad ";
                $SQL8 = " SELECT

                    id_unidad,
                    sum(total)as total,sum(cuc)as cuc
                    FROM datos._view_datos_pte_agencias
                    where
                    id_unidad is null
                    and orden <= '$mes' and anno='$anno'
                    and (orden_indicador = 14)
                    and id_tipo = 'emp20'
                    group by id_unidad ";

            }

            $datos0 = pg_query($concctions,$SQL0);
            $datos1 = pg_query($concctions,$SQL1);
            $datos2 = pg_query($concctions,$SQL2);
            $datos3 = pg_query($concctions,$SQL3);
            $datos4 = pg_query($concctions,$SQL4);
            $datos5 = pg_query($concctions,$SQL5);
            $datos6 = pg_query($concctions,$SQL6);
            $datos7 = pg_query($concctions,$SQL7);
            $datos8 = pg_query($concctions,$SQL8);
            $arr0 = pg_fetch_all($datos0);
            $arr1 = pg_fetch_all($datos1);
            $arr2 = pg_fetch_all($datos2);
            $arr3 = pg_fetch_all($datos3);
            $arr4 = pg_fetch_all($datos4);
            $arr5 = pg_fetch_all($datos5);
            $arr6= pg_fetch_all($datos6);
            $arr7= pg_fetch_all($datos7);
            $arr8= pg_fetch_all($datos8);
            $arr[0]['plan_a']=$arr0[0]['total'];
            $arr[0]['real_a']=$arr1[0]['total'];
            $SC_a=$arr7[0]['total'];
            $GM_a=$arr6[0]['total'];
            $real_a=$arr1[0]['total'];
            $salario =$arr8[0]['total'];
            $PPI_a =$arr2[0]['total'];
            $PTI_a=$arr4[0]['total'];
            $PPF_a=$arr3[0]['total'];
            $PTF_a=$arr5[0]['total'];
            $pb =  $real_a + ( $PPF_a-$PPI_a + $PTF_a-$PTI_a);
            $VA=$pb - $SC_a -$GM_a;
            //print_r($PTI_a.'--');
            $arr[0]['PB']= $pb;
            $arr[0]['VA']=$VA;
            $arr[0]['SVA']=$salario/$VA;
            $arr[0]['salario']=$salario;
        pg_close($concctions);
        if (is_null($arr))return false;
        $_count= count($arr);
        if ($arr == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $arr);


        return $result;
    }

    public  function ValidateGuardar(&$params){return true;}
    public  function Guardar (&$params)  {
        $id=$params['id'];
        $anno = $params['anno'];
        $mes = $params['mes'];
        $PB = $params['PB'];
        $VA = $params['VA'];
        $SVA = $params['SVA'];
        $porcientoC = $params['porcientoC'];
        $nombre = $params['nombre'];
        $total_inc = $params['total_inc'];
        $real = $params['real'];
        $PP1_inc = $params['PP1_inc'];
        $PP2 = $params['PP2'];
        $PT1_inc = $params['PT1_inc'];
        $PT2 = $params['PT2'];
        $GM = $params['GM'];
        $SC = $params['SC'];
        $PGS = $params['PGS'];
        $productiva = $params['productiva'];

        $fc = $params['fc'];
        $comb = $params['comb'];
        $elec = $params['elec'];
        $matr = $params['matr'];

        $datos=$this->_dbase->GetTable("system.pronostico");
        $ids = $datos->GetValueWhere(id,"id_agencia = '$id' and anno = '$anno'and mes = '$mes'");
        if(!$ids) {
         $datos->InsertValues(array(
                        'id_agencia' => "'$id'",
                        'anno' => "'$anno'",
                        'mes' => "'$mes'",
                        'pb' => "'$PB'",
                        'va' => "'$VA'",
                        'sva' => "'$SVA'",
                         'fc' => "'$fc'",
                         'comb' => "'$comb'",
                         'elec' => "'$elec'",
                         'matr' => "'$matr'",
                        'porcientoC' => "'$porcientoC'",
                        'total_inc' => "'$total_inc'",
                        'reale' => "'$real'",
                        'pp1_inc' => "'$PP1_inc'",
                        'pp2' => "'$PT2'",
                        'gm' => "'$GM'",
                        'sc' => "'$SC'",
                        'nombre' => "'$nombre'",
                        'productiva' => "'$productiva'",
                        'porc' => "'$PGS'"));
            return true;
        }
        else{
            $datos->Update(array(
                'id_agencia' => "'$id'",
                'anno' => "'$anno'",
                'mes' => "'$mes'",
                'pb' => "'$PB'",
                'va' => "'$VA'",
                'sva' => "'$SVA'",
                'fc' => "'$fc'",
                'comb' => "'$comb'",
                'elec' => "'$elec'",
                'matr' => "'$matr'",
                'porcientoC' => "'$porcientoC'",
                'total_inc' => "'$total_inc'",
                'reale' => "'$real'",
                'pp1_inc' => "'$PP1_inc'",
                'nombre' => "'$nombre'",
                'pp2' => "'$PT2'",
                'gm' => "'$GM'",
                'productiva' => "'$productiva'",
                'sc' => "'$SC'",
                'porc' => "'$PGS'"),"id = '$ids'" );
            return true;
        }
    }
};
?>
