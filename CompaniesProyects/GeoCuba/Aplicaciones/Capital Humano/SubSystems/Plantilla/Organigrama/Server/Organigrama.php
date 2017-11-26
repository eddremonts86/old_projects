 <?PHP

class Organigrama extends Module {
    public function  __construct() {
        parent::__construct('common.ch');
    }
//===================================================================================================================//
    public function ValidateCargarDatos(&$params)
    {

        return true;
    }
    public function CargarDatos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start'])? $params['start'] : 0;
        $_limit = ($params['limit']);
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_responsabilidad');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");

        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateDatos_Area(&$params) {return true;}
    public function Datos_Area(&$params) {
        $_data = array();
        $_count = 0;
        $areas=$params['area'];
        $_start = ($params['start'])? $params['start'] : 0;
        $_limit = ($params['limit']);
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_responsabilidad');
        $_data = $_table->GetAll("area = '$areas' and activo = 't'");
        $_count = $_table->GetRowsCount();
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;

    }

    public function ValidateDatos_Agencias(&$params) {return true;}
    public function Datos_Agencias(&$params) {
         $_data = array();
         $_count = 0;
         $agencia=$params['agencia'];
         $_start = ($params['start'])? $params['start'] : 0;
         $_limit = ($params['limit']);
         $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_responsabilidad');
         $_data = $_table->GetAll("agencia = '$agencia' and activo = 't'");
         $_count = $_table->GetRowsCount();
         $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
         return $result;

     }

    //-----------------------------------------------------------------//
    public function ValidateCargarAgencias(&$params){return true;}
    public function CargarAgencias(&$params){
        $_data = array();
        $_table = $this->_dbase->GetTable('nomencladores.agencia');
        $_data = $_table->GetAll();
        return $_data;
    }

    public function ValidateCargarAreas_A(&$params)
    {

        return true;
    }
    public function CargarAreas_A(&$params)
    {
        $_data = array();
        $_count = 0;
        $value = $params['value'];
        $_table = $this->_dbase->GetTable('nomencladores.area');
        $_data = $_table->GetAll("agenciaid= '$value'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

     public function ValidateCargarAgenciasJson(&$params){return true;}
     public function CargarAgenciasJson(&$params){
         $_data = array();
         $_table = $this->_dbase->GetTable('nomencladores.agencia');
         $_data = $_table->GetAll();
         $result = array('success' => true, 'results' => count($_data), 'rows' => $_data);
         return $result;
     }
//===================================================================================================================//
     public function ValidateCargarAreas(&$params){
         return true;}
     public function CargarAreas(&$params){
         $_data = array();
         $_table = $this->_dbase->GetTable('nomencladores.area');
         $_data = $_table->GetAll();
         return $_data;
     }

    public function ValidateCargarAnnos(&$params)
    {
        return true;
    }
    public function CargarAnnos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.contrato_tipo');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarFpago(&$params)
    {
        return true;
    }
    public function CargarFpago(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.forma_pago');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarSpago(&$params)
    {
        return true;
    }
    public function CargarSpago(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.sistema_pago');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarHtrabajo(&$params)
    {
        return true;
    }
    public function CargarHtrabajo(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.horario_trabajo');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarAgencia(&$params)
    {
        return true;
    }
    public function CargarAgencia(&$params)
    {
        $_data = array();
        $_count = 0;
        $_table = $this->_dbase->GetTable('nomencladores.agencia');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarAreasxCargo(&$params)
    {

        return true;
    }
    public function CargarAreasxCargo(&$params)
    {
        $_data = array();
        $_count = 0;
        $value = $params['value'];
        $consulta = "SELECT
                        cargo.nombre,
                        listado_cargos.id AS id
                    FROM
                        plantilla.listado_cargos,
                        plantilla.cargo
                    WHERE
                        cargo.id = listado_cargos.cargoid
                        AND listado_cargos.existencia >= 1
                        AND listado_cargos.areaid ='" . $value . "' ";

        $consult = $this->_dbase->Select($consulta);
        $_data = $consult->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

//cargo los  trabajadores
     public function ValidateCargarcontratos(&$params)
     {
         return true;
     }
     public function Cargarcontratos(&$params)
     {
         $_data = array();
         $_count = 0;
         $_start = ($params['start']) ? $params['start'] : 0;
         $_limit = $params['limit'];
         $_table = $this->_dbase->GetTable('plantilla.trabajador');
         $_data = $_table->GetRange($_limit, $_start);
         if (is_null($_data))
             return false;
         $_count = count($_data);
         if ($_count == -1)
             return false;
         $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
         return $result;
     }

//cargo los listados de contrato
     public function ValidateCargarniveles(&$params)
     {
         return true;
     }
     public function Cargarniveles(&$params)
     {
         $_data = array();
         $_count = 0;
         $_start = ($params['start']) ? $params['start'] : 0;
         $_limit = $params['limit'];
         $_table = $this->_dbase->GetTable('vistas_resumen.listado_de_cargos');
         $_data = $_table->GetRange($_limit, $_start);
         if (is_null($_data))
             return false;
         $_count = count($_data);
         if ($_count == -1)
             return false;
         $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
         return $result;
     }


//===================================================================================================================//

     public function ValidateResponsabilidad(&$params){return true;}
     public function Responsabilidad(&$params){
         $directorG='';$directorU='';$directorA='';
         $dirir=$params['dirir']; //responsabilidad asignada
         $respon= $params['respon'];
         $id= $params['id'];
         if($dirir==1){
             $directorG='true';
             $directorU='false';
             $directorA='false';
         }else if($dirir==2){
             $directorG='false';
             $directorU='true';
             $directorA='false';
         }else if($dirir==3){
             $directorG='false';
             $directorU='false';
             $directorA='true';
         }else{
             $directorG='false';
             $directorU='false';
             $directorA='false';
              }

         if($respon==true){
             $Lcargos = $this->_dbase->GetTable("plantilla.plantilla");
             $datas = $Lcargos->Update(array('director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'"),"id = '$id'");
            return true;
         }

     }
      // ========================================================================//
       public function ValidateAdd(&$params)
       {
           return true;
       }
       public function Add(&$params)
       {

           $id=$params['id']; //id de plantilla actual
           $dirir=$params['dirir']; //responsabilidad asignada
           $contrato_id=$params['contrato_id']; //id del contrato anterior
           $cargoid= $params['cargoid'];  //id de listado de cargos
           $idTra= $params['idTra']; //id del trabajador

           $Tipocontrato=$params['combo_value_id'];   //nuevo Tipo contrato
           $agencia= $params['combo_value_id_agencias'];
           $area= $params['combo_nivel_value_id_area'];
           $Tcargo= $params['combo_nivel_value'];

           $Spago= $params['combo_Sistema_value'];
           $Fpago= $params['combo_Forma_value'];
           $Htrabajo= $params['combo_Horario_value'];

           $inicio= $params['fecha_inicio'];
           $fin= $params['fecha_fin'];
           $respon= $params['respon'];

           $directorG='';$directorU='';$directorA='';
           if($dirir==1){
               $directorG='true';
               $directorU='false';
               $directorA='false';
           }
           else if($dirir==2){
               $directorG='false';
               $directorU='true';
               $directorA='false';
           }
           else if($dirir==3){
               $directorG='false';
               $directorU='false';
               $directorA='true';
           }
           else{$directorG='false';
               $directorU='false';
               $directorA='false'; }

           if($respon!=null){
               $Lcargos = $this->_dbase->GetTable("plantilla.plantilla");
               $datas = $Lcargos->Update(array('director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'"),"id = '$id'");
           }
           else{
               
               $conrato=$this->_dbase->GetTable("pago.Contrato");
               $plantilla=$this->_dbase->GetTable("plantilla.plantilla");
               $lcargosss=$this->_dbase->GetTable("plantilla.listado_cargos");
               $datacontrato = $this->_dbase->GetTable("pago.contrato");

               $datas = $conrato->Update(array('activo' => "'false'"),"id = '$contrato_id'");
               $datas = $plantilla->Update(array('activo' => "'false'"),"id = '$id'");
               if($cargoid != $Tcargo)
               {
                  
                   $datas = $lcargosss->Update(array('existencia' => 'existencia + 1'),"id = '$cargoid'");
                   $datos = $lcargosss->Update(array('existencia' => 'existencia - 1'),"id = '$Tcargo'");
               }

               if ($fin!=null){
 
                   $data = $datacontrato->InsertValues(array('trabajadorid' => "'$idTra'",'fecha_inicio' => "'$inicio'",
                                                             'fecha_final' => "'$fin'",'contrato_tipoid' => "'$Tipocontrato'"));
                   $data1= $datacontrato->GetAll("trabajadorid= '$idTra' AND contrato_tipoid= '$Tipocontrato'");
                   $id_contrato = $data1[0]['id'];

                   return $data = $plantilla->InsertValues(array('director_general' => "'$directorG'",
                                                                'director_unidad' => "'$directorU'",
                                                                'director_area' => "'$directorA'",
                                                                'contratoid' => "'$id_contrato'",
                                                                'listado_cargosid' => "'$Tcargo'",
                                                                'htrabajo_id' => "'$Htrabajo'",
                                                                'fpago_id' => "'$Fpago'",
                                                                'spago_id' => "'$Spago'"));
                }
               else{
                    $fin = "01/01/0001";
                   $datacontrato = $this->_dbase->GetTable("pago.contrato");
                   $data = $datacontrato->InsertValues(array('trabajadorid' => "'$idTra'",
                                                             'fecha_inicio' => "'$inicio'",
                                                             'contrato_tipoid' => "'$Tipocontrato'"));

                   $data1= $datacontrato->GetAll("trabajadorid= '$idTra' AND contrato_tipoid = '$Tipocontrato'");
                   $id_contrato = $data1[0]['id'];

                   $datos = $this->_dbase->GetTable("plantilla.plantilla");
                   return $data = $datos->InsertValues(array('director_general' => "'$directorG'",'director_unidad' => "'$directorU'",'director_area' => "'$directorA'",'contratoid' => "'$id_contrato'",'listado_cargosid' => "'$Tcargo'",'htrabajo_id' => "'$Htrabajo'",'fpago_id' => "'$Fpago'",'spago_id' => "'$Spago'"));
               }

           }
       }
//===================================================================================================================//
    public function ValidateDibujarOrganigrama(&$params)
    {
        return true;
    }
    
    public function DibujarOrganigrama(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $str_query = "SELECT nombre_empresa,nombre_agencia,area,clacificacion,count(clacificacion) as ocupadas
                        FROM vistas_resumen.plantilla_caorgos_unidad
                      GROUP BY area,nombre_empresa,nombre_agencia,clacificacion
                      ORDER BY area";
        $_table = $this->_dbase->Select($str_query);
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        $empresas = array();
        $unidades = array();
        $areas = array();
        $organigrama = '';
        $pintura = '';
        $directos_t   = 0;
        $indirectos_t = 0;
        $height = 0;
        foreach($_data as $valor){
            if(!isset($empresas[$valor['nombre_empresa']]))
                $empresas[$valor['nombre_empresa']] = $valor['nombre_empresa'];
            if(!isset($unidades[$valor['nombre_agencia']])){
                $unidades[$valor['nombre_agencia']]['nombre'] = $valor['nombre_agencia'];           
                $unidades[$valor['nombre_agencia']]['directos'] = 0;
                $unidades[$valor['nombre_agencia']]['indirect'] = 0;
            }
            if($valor['clacificacion'] == 'Directos')
                    $unidades[$valor['nombre_agencia']]['directos'] += $valor['ocupadas'];
                else
                    $unidades[$valor['nombre_agencia']]['indirect'] += $valor['ocupadas']; 
            if(!isset($areas[$valor['nombre_agencia']][$valor['area']])){
                $areas[$valor['nombre_agencia']][$valor['area']]['nombre'] = $valor['area'];                 
                $areas[$valor['nombre_agencia']][$valor['area']]['directos'] = 0;                 
                $areas[$valor['nombre_agencia']][$valor['area']]['indirect'] = 0;                 
            }
            if($valor['clacificacion'] == 'Directos')
                    $areas[$valor['nombre_agencia']][$valor['area']]['directos'] += intval($valor['ocupadas']);
                else
                    $areas[$valor['nombre_agencia']][$valor['area']]['indirect'] += intval($valor['ocupadas']);   
            if($valor['clacificacion'] == 'Directos')
                $directos_t   += $valor['ocupadas'];
            else
                $indirectos_t += $valor['ocupadas'];            
        }
        $x = 10;
        $y = 10;
        $width  = (count($unidades))*220;
        $centro = $width/(count($empresas)*2);
        //print_r($centro);die;
        $transform = '';

        $i = 0;
        $gy = $y+120;
        foreach($empresas as $empresa){
            $i++;
            $x = $centro*($i*2-1)-100;
            $dI = '<div align="center" class="di_empresa" style="border-bottom: 1px solid red; width: 100px; transform: rotate(90deg) translate(30.5px, -110px);"><div class="d">&nbsp;'.$directos_t.'</div> <div class="i">&nbsp;'.$indirectos_t.'</div> </div>';
            $transform = 'transform:translate('.($x+205).'px,'.$y.'px);-o-transform:translate('.($x+205).'px,'.$y.'px);-moz-transform:translate('.($x+205).'px,'.$y.'px);-webkit-transform:translate('.($x+205).'px,'.$y.'px);';
            //M$x,$x   S$x,$x-50 $x+50,$x-50 L$x+2*50,$x-50  S$x+3*50,$x-50 $x+3*50,$x  M$x+3*50,$x  S$x+3*50,$x+50 $x+2*50,$x+50   L$x+50,$x+50 S $x,$x+50 $x,$x
            $organigrama .= '<div><div class="empresa" style="'.$transform.'">'.$dI.$empresa.'</div></div>';    
            $pintura .= '<line x1="'.($x+300).'" y1="'.($y+100).'" x2="'.($x+300).'" y2="'.($gy).'" style="stroke:black;stroke-width:1"/>';
            
//            $organigrama .= '<g class="mover" width="200px">
//                                    <path fill="none" stroke="red" d="M'.$x.','.$y.' S'.$x.','.($y-50).' '.($x+50).','.($y-50).' L'.
//                                    ($x+2*50+60).','.($y-50).' S'.($x+3*50+60).','.($y-50).' '.($x+3*50+60).','.$y.' M'.($x+3*50+60).','.$y.' S'.
//                                    ($x+3*50+60).','.($y+50).' '.($x+2*50+60).','.($y+50) .' L'.($x+50).','.($y+50).' S'.($x).','.($y+50).' '.($x).','.$y.'"/>
//                                    '.$this->arreglarPalabras($empresa, ($x+20), $y-20, 15,50).'
//                            </g>';
//            print_r(($empresa));die;
        }
        //;
        $y += 100;
        $cu = count($unidades);
        $centro = $width/($cu*2);
        $gx = ($cu*400)-300;
        if($cu == 1)
            $gx = $x+300;

        $pintura .= '<line x1="'.(160).'" y1="'.($gy).'" x2="'.($gx).'" y2="'.($gy).'" style="stroke:black;stroke-width:1"/>';
        $pintura .= '<path d="M160,'.$gy.' S110,'.$gy.' 110,'.($gy+50).' L110,'.($gy+80).'" fill="none" stroke="black"/>';
        if($cu > 1)
            $pintura .= '<path d="M'.($gx).','.$gy.' S'.($gx+50).','.$gy.' '.($gx+50).','.($gy+50).' L'.($gx+50).','.($gy+80).'" fill="none" stroke="black"/>';
        $j = 0;
       
        foreach($unidades as $empresa){
            $j++;
            $x = $centro*($j*2-1)-100;
            $gx = ($j*420)-300;
            $dI = '<div align="center" class="di_unidad" style="border-bottom: 1px solid red; width: 100px; transform: rotate(90deg) translate(40.5px, -100px);"><div class="d">&nbsp;'.$empresa['directos'].'</div><div class="i">&nbsp;'.$empresa['indirect'].'</div> </div>';
            $transform = 'transform:translate('.$x.'px,'.$y.'px);-o-transform:translate('.$x.'px,'.$y.'px);-moz-transform:translate('.$x.'px,'.$y.'px);-webkit-transform:translate('.$x.'px,'.$y.'px);';
             $organigrama .= '<div style="width:200px;float:left"><div class="unidad" style="'.$transform.';">'.$dI.$empresa['nombre'].'</div>';                       
             if($j != 1 && $j != count($unidades))
                $pintura .= '<line x1="'.($gx-10).'" y1="'.($gy).'" x2="'.($gx-10).'" y2="'.($gy+80).'" style="stroke:black;stroke-width:1"/>';
//            $organigrama .= '<g class="mover" width="200px">
//                                    <path fill="none" stroke="red" d="M'.$x.','.$y.' S'.$x.','.($y-50).' '.($x+50).','.($y-50).' L'.
//                                    ($x+2*50).','.($y-50).' S'.($x+3*50).','.($y-50).' '.($x+3*50).','.$y.' M'.($x+3*50).','.$y.' S'.
//                                    ($x+3*50).','.($y+50).' '.($x+2*50).','.($y+50) .' L'.($x+50).','.($y+50).' S'.($x).','.($y+50).' '.($x).','.$y.'"/>
//                                    '.$this->arreglarPalabras($empresa['nombre'], ($x+20), $y-20, 15,50).'
//                            </g>';
             $aux = $areas[$empresa['nombre']];
             $coordy = $y;
             $ca = count($aux);
             $r = 0;             
             foreach($aux as $area){
                 $dI = '<div align="center" class="di_area" style="border-bottom: 1px solid red; width: 80px; transform: rotate(90deg) translate(20.5px, -75px);"><div class="d">&nbsp;'.$area['directos'].'</div> <div class="i">&nbsp;'.$area['indirect'].'</div> </div>';
                 $coordy += 50;
                 $transform = 'transform:translate('.($x+20).'px,'.$coordy.'px);-o-transform:translate('.($x+20).'px,'.$coordy.'px);-moz-transform:translate('.($x+20).'px,'.$coordy.'px);-webkit-transform:translate('.($x+20).'px,'.$coordy.'px);';
                 $acty = ($gy+120+(++$r*130));
                 $organigrama .= '<div class="area" style="'.$transform.'">'.$dI.$area['nombre'].'</div>';
                 if($ca != $r)
                    $pintura .= '<line x1="'.($gx-110).'" y1="'.($acty+20).'" x2="'.($gx-90).'" y2="'.($acty+20).'" style="stroke:black;stroke-width:1"/>';
             }
             $organigrama .= '</div>';
             $acty = ($gy+120+($ca*130));
             $pintura .= '<line x1="'.($gx-110).'" y1="'.($gy+130).'" x2="'.($gx-110).'" y2="'.($acty).'" style="stroke:black;stroke-width:1"/>';
             $pintura .= '<path d="M'.($gx-110).','.($acty).' S'.($gx-110).','.($acty+20).' '.($gx-90).','.($acty+20).'" fill="none" stroke="black"/>';
             $pintura .= '<path  d="M'.($gx-109).','.($gy+125).' S'.($gx-114).','.($gy+125).' '.($gx-114).','.($gy+130).' M'.($gx-114).','.($gy+130).' S'.($gx-114).','.($gy+135).' '.($gx-109).','.($gy+135).' L'.($gx-109).','.($gy+125).'" fill="black"/>';
             if($height<($gy+130+($ca*180)))
                 $height=($gy+130+($ca*180));
        }
        
        $result = array('organigrama'=>$organigrama,'svg'=>$pintura,'width'=>$width*2,'height'=>$height);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => 1, 'rows' => $result);
        return $result;
    }
    
    public function ValidateImpDibujarOrganigrama(&$params)
    {
        return true;
    }
    
    public function ImpDibujarOrganigrama(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $str_query = "SELECT nombre_empresa,nombre_agencia,area,clacificacion,count(clacificacion) as ocupadas
                        FROM vistas_resumen.plantilla_caorgos_unidad
                      GROUP BY area,nombre_empresa,nombre_agencia,clacificacion
                      ORDER BY area";
        $_table = $this->_dbase->Select($str_query);
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        $empresas = array();
        $unidades = array();
        $areas = array();
        $organigrama = '';
        $pintura = '';
        $directos_t   = 0;
        $indirectos_t = 0;
        $height = 0;
        foreach($_data as $valor){
            if(!isset($empresas[$valor['nombre_empresa']]))
                $empresas[$valor['nombre_empresa']] = $valor['nombre_empresa'];
            if(!isset($unidades[$valor['nombre_agencia']])){
                $unidades[$valor['nombre_agencia']]['nombre'] = $valor['nombre_agencia'];           
                $unidades[$valor['nombre_agencia']]['directos'] = 0;
                $unidades[$valor['nombre_agencia']]['indirect'] = 0;
            }
            if($valor['clacificacion'] == 'Directos')
                    $unidades[$valor['nombre_agencia']]['directos'] += $valor['ocupadas'];
                else
                    $unidades[$valor['nombre_agencia']]['indirect'] += $valor['ocupadas']; 
            if(!isset($areas[$valor['nombre_agencia']][$valor['area']])){
                $areas[$valor['nombre_agencia']][$valor['area']]['nombre'] = $valor['area'];                 
                $areas[$valor['nombre_agencia']][$valor['area']]['directos'] = 0;                 
                $areas[$valor['nombre_agencia']][$valor['area']]['indirect'] = 0;                 
            }
            if($valor['clacificacion'] == 'Directos')
                    $areas[$valor['nombre_agencia']][$valor['area']]['directos'] += intval($valor['ocupadas']);
                else
                    $areas[$valor['nombre_agencia']][$valor['area']]['indirect'] += intval($valor['ocupadas']);   
            if($valor['clacificacion'] == 'Directos')
                $directos_t   += $valor['ocupadas'];
            else
                $indirectos_t += $valor['ocupadas'];            
        }
        $x = 10;
        $y = 10;
        $width  = (count($unidades))*220;
        $centro = $width/(count($empresas)*2);
        //print_r($centro);die;
        $transform = '';
        $i = 0;
        $gy = $y+120;
        foreach($empresas as $empresa){
            $i++;
            $x = $centro*($i*2-1)-100;
            $dI = '<div align="center" class="di_empresa" style="width:100px;border-bottom: 1px solid red;transform: rotate(90deg) translate(30.5px, -110px);"><div class="d">&nbsp;'.$directos_t.'</div> <div class="i">&nbsp;'.$indirectos_t.'</div> </div>';
            $transform = 'transform:translate('.($x+205).'px,'.$y.'px);-o-transform:translate('.($x+205).'px,'.$y.'px);-moz-transform:translate('.($x+205).'px,'.$y.'px);-webkit-transform:translate('.($x+205).'px,'.$y.'px);';
            //M$x,$x   S$x,$x-50 $x+50,$x-50 L$x+2*50,$x-50  S$x+3*50,$x-50 $x+3*50,$x  M$x+3*50,$x  S$x+3*50,$x+50 $x+2*50,$x+50   L$x+50,$x+50 S $x,$x+50 $x,$x
            $organigrama .= '<div><div class="empresa" style="height:80px !important; width: 140px !important; '.$transform.'">'.$dI.$empresa.'</div></div>';    
            $pintura .= '<line x1="'.($x+300).'" y1="'.($y+100).'" x2="'.($x+300).'" y2="'.($gy).'" style="stroke:black;stroke-width:1"/>';
            
//            $organigrama .= '<g class="mover" width="200px">
//                                    <path fill="none" stroke="red" d="M'.$x.','.$y.' S'.$x.','.($y-50).' '.($x+50).','.($y-50).' L'.
//                                    ($x+2*50+60).','.($y-50).' S'.($x+3*50+60).','.($y-50).' '.($x+3*50+60).','.$y.' M'.($x+3*50+60).','.$y.' S'.
//                                    ($x+3*50+60).','.($y+50).' '.($x+2*50+60).','.($y+50) .' L'.($x+50).','.($y+50).' S'.($x).','.($y+50).' '.($x).','.$y.'"/>
//                                    '.$this->arreglarPalabras($empresa, ($x+20), $y-20, 15,50).'
//                            </g>';
//            print_r(($empresa));die;
        }
        //;
        $y += 100;
        $cu = count($unidades);
        $centro = $width/($cu*2);
        $gx = ($cu*400)-300;
        $pintura .= '<line x1="'.(160).'" y1="'.($gy).'" x2="'.($gx).'" y2="'.($gy).'" style="stroke:black;stroke-width:1"/>';
        $pintura .= '<path d="M160,'.$gy.' S110,'.$gy.' 110,'.($gy+50).' L110,'.($gy+80).'" fill="none" stroke="black"/>';
        $pintura .= '<path d="M'.($gx).','.$gy.' S'.($gx+50).','.$gy.' '.($gx+50).','.($gy+50).' L'.($gx+50).','.($gy+80).'" fill="none" stroke="black"/>';
        $j = 0;
       
        foreach($unidades as $empresa){
            $j++;
            $x = $centro*($j*2-1)-100;
            $gx = ($j*420)-300;
            $dI = '<div align="center" class="di_unidad" style="width:100px;border-bottom: 1px solid red;transform: rotate(90deg) translate(40.5px, -100px);"><div class="d">&nbsp;'.$empresa['directos'].'</div><div class="i">&nbsp;'.$empresa['indirect'].'</div> </div>';
            $transform = 'transform:translate('.$x.'px,'.$y.'px);-o-transform:translate('.$x.'px,'.$y.'px);-moz-transform:translate('.$x.'px,'.$y.'px);-webkit-transform:translate('.$x.'px,'.$y.'px);';
             $organigrama .= '<div style="width:200px;float:left"><div class="unidad" style="height:88px !important;width: 130px !important;'.$transform.';">'.$dI.$empresa['nombre'].'</div>';                       
             if($j != 1 && $j != count($unidades))
                $pintura .= '<line x1="'.($gx-10).'" y1="'.($gy).'" x2="'.($gx-10).'" y2="'.($gy+80).'" style="stroke:black;stroke-width:1"/>';
//            $organigrama .= '<g class="mover" width="200px">
//                                    <path fill="none" stroke="red" d="M'.$x.','.$y.' S'.$x.','.($y-50).' '.($x+50).','.($y-50).' L'.
//                                    ($x+2*50).','.($y-50).' S'.($x+3*50).','.($y-50).' '.($x+3*50).','.$y.' M'.($x+3*50).','.$y.' S'.
//                                    ($x+3*50).','.($y+50).' '.($x+2*50).','.($y+50) .' L'.($x+50).','.($y+50).' S'.($x).','.($y+50).' '.($x).','.$y.'"/>
//                                    '.$this->arreglarPalabras($empresa['nombre'], ($x+20), $y-20, 15,50).'
//                            </g>';
             $aux = $areas[$empresa['nombre']];
             $coordy = $y;
             $ca = count($aux);
             $r = 0;             
             foreach($aux as $area){
                 $dI = '<div align="center" class="di_area" style="width:80px;border-bottom: 1px solid red;transform: rotate(90deg) translate(20.5px, -75px);"><div class="d">&nbsp;'.$area['directos'].'</div> <div class="i">&nbsp;'.$area['indirect'].'</div> </div>';
                 $coordy += 50;
                 $transform = 'transform:translate('.($x+20).'px,'.$coordy.'px);-o-transform:translate('.($x+20).'px,'.$coordy.'px);-moz-transform:translate('.($x+20).'px,'.$coordy.'px);-webkit-transform:translate('.($x+20).'px,'.$coordy.'px);';
                 $acty = ($gy+120+(++$r*130));
                 $organigrama .= '<div class="area" style=" height:58px !important;width: 115px !important;'.$transform.'">'.$dI.$area['nombre'].'</div>';
                 if($ca != $r)
                    $pintura .= '<line x1="'.($gx-110).'" y1="'.($acty+20).'" x2="'.($gx-90).'" y2="'.($acty+20).'" style="stroke:black;stroke-width:1"/>';
             }
             $organigrama .= '</div>';
             $acty = ($gy+120+($ca*130));
             $pintura .= '<line x1="'.($gx-110).'" y1="'.($gy+130).'" x2="'.($gx-110).'" y2="'.($acty).'" style="stroke:black;stroke-width:1"/>';
             $pintura .= '<path d="M'.($gx-110).','.($acty).' S'.($gx-110).','.($acty+20).' '.($gx-90).','.($acty+20).'" fill="none" stroke="black"/>';
             $pintura .= '<path  d="M'.($gx-109).','.($gy+125).' S'.($gx-114).','.($gy+125).' '.($gx-114).','.($gy+130).' M'.($gx-114).','.($gy+130).' S'.($gx-114).','.($gy+135).' '.($gx-109).','.($gy+135).' L'.($gx-109).','.($gy+125).'" fill="black"/>';
             if($height<($gy+130+($ca*180)))
                 $height=($gy+130+($ca*180));
        }
        
        
          $organigrama = '<link id="default" rel="stylesheet" type="text/css" href="Subsystems/Plantilla/Config/Client/css/admin.css"/>
                  <div style="z-index:100">'.
                 '<div style="width:'.($width*2).'px;height:'.$height.'px;">'.
                   $organigrama
                .'</div><svg id="mi_org" width="'.($width*2).'" height="'.$height.'" style="z-index:50;transform:translate(0,-'.($height-2).
                'px);-moz-transform:translate(0,-'.($height-2).
                'px);-o-transform:translate(0,-'.($height-2).
                'px);-webkit-transform:translate(0,-'.($height-2).
                'px);">'.$pintura.'</svg></div>';
         
        $result = array('organigrama'=>$organigrama);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => 1, 'rows' => $result);
        return $result;
    }
    
    public function arreglarPalabras($string,$x,$y,$aumento, $cantidad = 50) {
        $peq     = array('f' => 'f', 'i' => 'i', 'l' => 'l', 't' => 't', 'r' => 'r', '1' => '1');
        $gra     = array('w' => 'w', 'm' => 'm');
        $vocales = array('a' => 'a', 'e' => 'e', 'i' => 'i', 'o' => 'o', 'u' => 'u','A'=>'A','E'=>'E','I'=>'I','O'=>'O','U'=>'U');
        $cant    = strlen($string);
        $cont    = $ultima_consonante = $cant_vocales = $ultimo_espacio = 0;
        $heuG    = 1 + $heuM = 1 + $heuP = 1;
        $die = false;
        $resultante = '';
        $cordy = $y;
        for ($i = 0; $i <= $cant; $i++) {
            $apuntador = substr($string, $i, 1);

            if ($apuntador != ' ' && $apuntador != '') {
                if(!array_key_exists($apuntador, $vocales))
                {
                  $ultima_consonante = $i;
                }
                else{
                  $cant_vocales++;
                  if($cant_vocales >= 4){
                      $ultima_consonante = $i;
                      $cant_vocales = 0;
                  }
                }
                if(array_key_exists($apuntador, $peq))
                  $cont += $heuP;
                elseif(array_key_exists($apuntador, $gra))
                     $cont += $heuG;
                else
                     $cont += $heuM;
                if($cont >= $cantidad)
                {
                    
                        $resultante .= '<text transform="matrix(1 0 0 1 '.($x+5).' '.($cordy).')" font-size="15" fill="red" width="200px">'.substr($string, $ultimo_espacio,$ultima_consonante - $ultimo_espacio).'</text>';
                        $ultimo_espacio = $ultima_consonante;
                        $cont = 0;
                        $cant_vocales = 0;
                        for($j = $ultima_consonante;$j<$i;$j++)
                        {
                            $apuntador = substr($string, $j, 1);
                            if(array_key_exists($apuntador, $peq))
                                 $cont += $heuP;
                            elseif(array_key_exists($apuntador, $gra))
                                 $cont += $heuG;
                            else
                                 $cont += $heuM;
                        }

                    $cordy += $aumento;
                }
                
            }
            elseif($apuntador == '')
            {
                $resultante .= '<text transform="matrix(1 0 0 1 '.($x+5).' '.($cordy + $aumento).')" font-size="15" fill="red" width="200px">'.substr($string, $ultimo_espacio,$i - $ultimo_espacio).'</text>';
//                $resultante .= substr($string, $ultimo_espacio,$i - $ultimo_espacio);
                break;
            }
            else
            {
                
                $resultante .= '<text transform="matrix(1 0 0 1 '.($x+5).' '.($cordy + $aumento).')" font-size="15" fill="red" width="200px">'.substr($string, $ultimo_espacio, $i - $ultimo_espacio).'</text>';
//                $resultante .= substr($string, $ultimo_espacio, $i - $ultimo_espacio);
                $ultimo_espacio = $i;
                $cont = 0;
                $cordy += $aumento;
            }
            
        }
        if($resultante == '')
        {
            $resultante = '<text transform="matrix(1 0 0 1 '.($x+5).' '.($y).')" font-size="15" fill="red" width="200px">'.$string.'</text>';
            //$resultante = $string;
        }
        return $resultante;
    }

};
?>
