 <?PHP

class PlanVacacion extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }

    public function ValidateCargarDatoscuadros(&$params) {
        return true;
    }
    public function CargarDatoscuadros(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.cuadro_plan_vac');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidatePlanVacacion_update (&$params){return true;}
    public function  PlanVacacion_update(&$params){
        $data = json_decode($params['data']);
        $PlanVacacion = $this->_dbase->GetTable("cuadro.plan_vaca");
        $fin='';
        for ($i = 0; $i < count($data); $i++) {
            $id = $data[$i]->id;
            $idT = $data[$i]->id_trabaj;

            $enero = $data[$i]->enero;
            $enero_cumpl = $data[$i]->enero_cumpl;
            if($enero_cumpl==true||$enero_cumpl=='1'){$enero_cumpl='true';}else{$enero_cumpl='false';}

            $febrero = $data[$i]->febrero;
            $febrero_cumpl = $data[$i]->febrero_cumpl;
            if($febrero_cumpl==true||$febrero_cumpl=='1'){$febrero_cumpl='true';}else{$febrero_cumpl='false';}

            $marzo = $data[$i]->marzo;
            $marzo_cumpl = $data[$i]->marzo_cumpl;
            if($marzo_cumpl==true||$marzo_cumpl=='1'){$marzo_cumpl='true';}else{$marzo_cumpl='false';}

            $abril = $data[$i]->abril;
            $abril_cumpl = $data[$i]->abril_cumpl;
            if($abril_cumpl==true||$abril_cumpl=='1'){$abril_cumpl='true';}else{$abril_cumpl='false';}

            $mayo = $data[$i]->mayo;
            $mayo_cumpl = $data[$i]->mayo_cumpl;
            if($mayo_cumpl==true||$mayo_cumpl=='1'){$mayo_cumpl='true';}else{$mayo_cumpl='false';}

            $junio = $data[$i]->junio;
            $junio_cumpl = $data[$i]->junio_cumpl;
            if($junio_cumpl==true||$junio_cumpl=='1'){$junio_cumpl='true';}else{$junio_cumpl='false';}

            $julio = $data[$i]->julio;
            $julio_cumpl = $data[$i]->julio_cumpl;
            if($julio_cumpl==true||$julio_cumpl=='1'){$julio_cumpl='true';}else{$julio_cumpl='false';}

            $agosto = $data[$i]->agosto;
            $agosto_cumpl = $data[$i]->agosto_cumpl;
            if($agosto_cumpl==true||$agosto_cumpl=='1'){$agosto_cumpl='true';}else{$agosto_cumpl='false';}

            $sept = $data[$i]->sept;
            $sept_cumpl = $data[$i]->sept_cumpl;
            if($sept_cumpl==true||$sept_cumpl=='1'){$sept_cumpl='true';}else{$sept_cumpl='false';}

            $oct = $data[$i]->oct;
            $otc_cumpl = $data[$i]->otc_cumpl;
            if($otc_cumpl==true||$otc_cumpl=='1'){$otc_cumpl='true';}else{$otc_cumpl='false';}

            $nov = $data[$i]->nov;
            $nov_cumpl = $data[$i]->nov_cumpl;
            if($nov_cumpl==true||$nov_cumpl=='1'){$nov_cumpl='true';}else{$nov_cumpl='false';}

            $dic = $data[$i]->dic;
            $dic_cumpl = $data[$i]->dic_cumpl;
            if($dic_cumpl==true||$dic_cumpl=='1'){$dic_cumpl='true';}else{$dic_cumpl='false';}
            if($id=="" || $id==null){
              $fin =  $PlanVacacion->InsertValues(array(
                                            'id_trabaj' => "'$idT'",
                                            'enero' => "'$enero'",
                                            'enero_cumpl' => "'$enero_cumpl'",
                                            'febrero' => "'$febrero'",
                                            'febrero_cumpl' => "'$febrero_cumpl'",
                                            'marzo' => "'$marzo'",
                                            'marzo_cumpl' => "'$marzo_cumpl'",
                                            'abril' => "'$abril'",
                                            'abril_cumpl' => "'$abril_cumpl'",
                                            'mayo' => "'$mayo'",
                                            'mayo_cumpl' => "'$mayo_cumpl'",
                                            'junio' => "'$junio'",
                                            'junio_cumpl' => "'$junio_cumpl'",
                                            'agosto' => "'$agosto'",
                                            'agosto_cumpl' => "'$agosto_cumpl'",
                                            'sept' => "'$sept'",
                                            'sept_cumpl' => "'$sept_cumpl'",
                                            'oct' => "'$oct'",
                                            'otc_cumpl' => "'$otc_cumpl'",
                                            'nov' => "'$nov'",
                                            'nov_cumpl' => "'$nov_cumpl'",
                                            'dic' => "'$dic'",
                                            'dic_cumpl' => "'$dic_cumpl'",
                                            'julio' => "'$julio'",
                                            'julio_cumpl' => "'$julio_cumpl'"
                ));
            }
            else{
              $fin =  $PlanVacacion->Update(array(
                    'id_trabaj' => "'$idT'",
                    'enero' => "'$enero'",
                    'enero_cumpl' => "'$enero_cumpl'",
                    'febrero' => "'$febrero'",
                    'febrero_cumpl' => "'$febrero_cumpl'",
                    'marzo' => "'$marzo'",
                    'marzo_cumpl' => "'$marzo_cumpl'",
                    'abril' => "'$abril'",
                    'abril_cumpl' => "'$abril_cumpl'",
                    'mayo' => "'$mayo'",
                    'mayo_cumpl' => "'$mayo_cumpl'",
                    'junio' => "'$junio'",
                    'junio_cumpl' => "'$junio_cumpl'",
                    'agosto' => "'$agosto'",
                    'agosto_cumpl' => "'$agosto_cumpl'",
                    'sept' => "'$sept'",
                    'sept_cumpl' => "'$sept_cumpl'",
                    'oct' => "'$oct'",
                    'otc_cumpl' => "'$otc_cumpl'",
                    'nov' => "'$nov'",
                    'nov_cumpl' => "'$nov_cumpl'",
                    'dic' => "'$dic'",
                    'dic_cumpl' => "'$dic_cumpl'",
                    'julio' => "'$julio'",
                    'julio_cumpl' => "'$julio_cumpl'"
                ),"id = '".$id."'");
            }
        }
        if($fin){return true;}
        else{return false;}
    }
};
?>
