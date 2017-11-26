<?PHP

class Resumenes extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ch');
    }

    // ===================Listado de trabajadores Contratados===========================================================//
    public function Validateinicio(&$params)
    {
        return true;
    }

    public function inicio(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('utiles.update_time');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantila_cargos(&$params)
    {
        return true;
    }

    public function plantila_cargos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantila_cargos');
        $_data = $_table->GetAll();
        for ($i = 0; $i < count($_data); $i++) {
            $_data[$i]["salario"] = "$" . $_data[$i]["salario"];
            //$_data[$i]["salario_total"] = "$" . $_data[$i]["salario_total"];
        }
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
// ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantilla_cargos_unidad(&$params)
    {
        return true;
    }

    public function plantilla_cargos_unidad(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_cargos_unidad ');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpPlantillaCargUnidad(&$params)
    {
        return true;
    }

    public function ImpPlantillaCargUnidad(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_cargos_unidad');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plantilla de Cargos por Unidad';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' rowspan='2' class='header'>Cargo</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Categor&iacute;a</td>                      
                        <td width='400' align='center' colspan='4' class='header'>Salario y Escala</td>                        
                    </tr>
                    <tr>
                        <td width='60' align='center' class='header'>Escala</td>
                        <td width='50' align='center' class='header'>Salario</td>
                        <td width='80' align='center' class='header'>Cantidad de Plazas</td>
                        <td width='80' align='center' class='header'>Salario Total</td>                 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if(!isset($areas[$valor['agencia']])){
                            $html .= "<tr><td colspan='14' class='group' align='left'>".$valor['agencia']."</td></tr>";
                            $areas[$valor['agencia']] = $valor['agencia'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['cargo']."</td>";                    
                            $html .= "<td>".$valor['categoria']."</td>";   
                            
                            $html .= "<td align='center'>".($valor['escala']!=''?$valor['escala']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['salario']!=''?$valor['salario']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['cant_plazas']!=''?$valor['cant_plazas']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['salario_total']!=''?$valor['salario_total']:'0')."</td>";
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }

// ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantilla_unidad_area(&$params)
    {
        return true;
    }

    public function plantilla_unidad_area(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_unidad_area ');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpPlantillaUnidadArea(&$params)
    {
        return true;
    }
    public function ImpPlantillaUnidadArea(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_unidad_area');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Cargos por Unidad y Área';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                padding-left:10px !important;
                                            }
                                            .group2{
                                                background-color:#eee;
                                                padding-left:20px !important;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' rowspan='2' class='header'>Trabajador</td>
                        <td width='200' align='center' rowspan='2' class='header'>Cargo</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Categor&iacute;a</td>                      
                        <td width='400' align='center' colspan='2' class='header'>Salario y Escala</td>                        
                    </tr>
                    <tr>
                        <td width='60' align='center' class='header'>Escala</td>
                        <td width='50' align='center' class='header'>Salario</td>              
                    </tr>";
                    $i = 1;
                    $areas = array();
                    $agencia = array();
                    foreach($_data as $valor){
                        $style = '';
                        if(!isset($agencia[$valor['agencia']])){
                            $html .= "<tr><td colspan='6' class='group' align='left'><b>".$valor['agencia']."</b></td></tr>";
                            $agencia[$valor['agencia']] = $valor['agencia'];
                        }
                        if(!isset($areas[$valor['nombre']])){
                            $html .= "<tr><td colspan='6' class='group2' align='left'><b>".$valor['nombre']."</b></td></tr>";
                            $areas[$valor['nombre']] = $valor['nombre'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre_completo']."</td>";                    
                            $html .= "<td>".$valor['cargo']."</td>";                    
                            $html .= "<td>".$valor['categoria']."</td>";   
                            
                            $html .= "<td align='center'>".($valor['escala']!=''?$valor['escala']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['salario']!=''?$valor['salario']:'0')."</td>";
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }

// ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantilla_plazas_vacantes(&$params)
    {
        return true;
    }

    public function plantilla_plazas_vacantes(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_vacante ');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpPlantillaPlazasVacantes(&$params)
    {
        return true;
    }

    public function ImpPlantillaPlazasVacantes(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_vacante');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plazas Vacantes';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                padding-left:10px !important;
                                            }
                                            .group2{
                                                background-color:#eee;
                                                padding-left:20px !important;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center'  class='header'>No.</td>
                        <td width='200' align='center'  class='header'>Cargo</td>
                        <td width='60' align='center'   class='header'>Plazas</td>
                        <td width='60'  align='center'  class='header'>Existencia</td>           
                        <td width='60'  align='center'  class='header'>Escala</td>           
                        <td width='60'  align='center'  class='header'>Salario Base</td>           
                        <td width='60'  align='center'  class='header'>Adicional</td>           
                        <td width='60'  align='center'  class='header'>Salario Total</td>           
                    </tr>";
                    $i = 1;
                    $areas = array();
                    $agencia = array();
                    foreach($_data as $valor){
                        $style = '';
                        if(!isset($agencia[$valor['agencia']])){
                            $html .= "<tr><td colspan='8' class='group' align='left'><b>".$valor['agencia']."</b></td></tr>";
                            $agencia[$valor['agencia']] = $valor['agencia'];
                        }
                        if(!isset($areas[$valor['area']])){
                            $html .= "<tr><td colspan='8' class='group2' align='left'><b>".$valor['area']."</b></td></tr>";
                            $areas[$valor['area']] = $valor['area'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['cargo']."</td>";                    
                            $html .= "<td>".$valor['cant_plasa']."</td>";                    
                            $html .= "<td>".$valor['existencia']."</td>";   
                            $html .= "<td>".$valor['nombre']."</td>";   
                            
                            $html .= "<td align='center'>".($valor['salario_base']!=''?$valor['salario_base']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['adicional']!=''?$valor['adicional']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['salario_total']!=''?$valor['salario_total']:'0')."</td>";
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }

// ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantilla_plazas_ocupadas(&$params)
    {
        return true;
    }

    public function plantilla_plazas_ocupadas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_ocupada ');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

        
    public function ValidateImpPlantillaPlazasOcupadas(&$params)
    {
        return true;
    }

    public function ImpPlantillaPlazasOcupadas(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_ocupada');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plazas Ocupadas';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                padding-left:10px !important;
                                            }
                                            .group2{
                                                background-color:#eee;
                                                padding-left:20px !important;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center'  class='header'>No.</td>
                        <td width='200' align='center'  class='header'>Trabajador</td>
                        <td width='200' align='center'  class='header'>Cargo</td>
                        <td width='60'  align='center'  class='header'>Categor&iacute;a</td>           
                        <td width='60'  align='center'  class='header'>Escala</td>           
                        <td width='60'  align='center'  class='header'>Salario Base</td>           
                        <td width='60'  align='center'  class='header'>Adicional</td>           
                        <td width='60'  align='center'  class='header'>Salario Total</td>           
                    </tr>";
                    $i = 1;
                    $areas = array();
                    $agencia = array();
                    foreach($_data as $valor){
                        $style = '';
                        if(!isset($agencia[$valor['agencia']])){
                            $html .= "<tr><td colspan='8' class='group' align='left'><b>".$valor['agencia']."</b></td></tr>";
                            $agencia[$valor['agencia']] = $valor['agencia'];
                        }
                        if(!isset($areas[$valor['area']])){
                            $html .= "<tr><td colspan='8' class='group2' align='left'><b>".$valor['area']."</b></td></tr>";
                            $areas[$valor['area']] = $valor['area'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre']."</td>";                    
                            $html .= "<td>".$valor['cargo']."</td>";                    
                            $html .= "<td>".$valor['categoria']."</td>";   
                            $html .= "<td>".$valor['escala']."</td>";   
                            
                            $html .= "<td align='center'>".($valor['salario_base']!=''?$valor['salario_base']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['adicional']!=''?$valor['adicional']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['total']!=''?$valor['total']:'0')."</td>";
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }
// ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantilla_cargos_area(&$params)
    {
        return true;
    }

    public function plantilla_cargos_area(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_cargos_area ');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpPlantillaCargArea(&$params)
    {
        return true;
    }

    public function ImpPlantillaCargArea(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_cargos_area');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plantilla de cargos por área(Oficial)';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' rowspan='2' class='header'>Cargo</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Categor&iacute;a</td>                        
                        <td width='400' align='center' colspan='4' class='header'>Salario y Escala</td>                        
                    </tr>
                    <tr>
                        <td width='60' align='center' class='header'>Escala</td>
                        <td width='50' align='center' class='header'>Salario</td>
                        <td width='80' align='center' class='header'>Cantidad de Plazas</td>
                        <td width='80' align='center' class='header'>Salario Total</td>                 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if(!isset($areas[$valor['area']])){
                            $html .= "<tr><td colspan='14' class='group' align='left'>".$valor['area']."</td></tr>";
                            $areas[$valor['area']] = $valor['area'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['cargo']."</td>";                    
                            $html .= "<td>".$valor['categoria']."</td>";   
                            
                            $html .= "<td align='center'>".($valor['escala']!=''?$valor['escala']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['salario']!=''?$valor['salario']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['cant_plazas']!=''?$valor['cant_plazas']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['salario_total']!=''?$valor['salario_total']:'0')."</td>";
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }

// ===================Listado de trabajadores Contratados=================ME QUEDE AQUI==========================================//
    public function Validateplantilla_caorgos_unidad(&$params)
    {
        return true;
    }

    public function plantilla_caorgos_unidad(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_caorgos_unidad ');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateImpPlantillaCargAreaG(&$params)
    {
        return true;
    }

    public function ImpPlantillaCargAreaG(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_caorgos_unidad');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plantilla de cargos por área';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' rowspan='2' class='header'>Trabajador</td>
                        <td width='200' align='center' rowspan='2' class='header'>Cargo</td>
                        <td width='80' align='center' rowspan='2' class='header'>Categor&iacute;a</td>                     
                        <td width='80'  align='center' rowspan='2' class='header'>Preparaci&oacute;n</td>                        
                        <td width='400' align='center' colspan='4' class='header'>Salario y Escala</td>                        
                    </tr>
                    <tr>
                        <td width='60' align='center' class='header'>Escala</td>
                        <td width='50' align='center' class='header'>Salario</td>
                        <td width='80' align='center' class='header'>Cantidad de Plazas</td>
                        <td width='80' align='center' class='header'>Salario Total</td>                 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if(!isset($areas[$valor['area']])){
                            $html .= "<tr><td colspan='14' class='group' align='left'>".$valor['area']."</td></tr>";
                            $areas[$valor['area']] = $valor['area'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre']."</td>";                    
                            $html .= "<td>".$valor['cargo']."</td>";                    
                            $html .= "<td>".$valor['categoria']."</td>";   
                            $html .= "<td>".$valor['preparacion']."</td>";   
                            
                            $html .= "<td align='center'>".($valor['escala']!=''?$valor['escala']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['salario']!=''?$valor['salario']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['cant_plazas']!=''?$valor['cant_plazas']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['salario_total']!=''?$valor['salario_total']:'0')."</td>";
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }
    // ===================Listado de trabajadores Contratados===========================================================//
    public function ValidatecompletamientoPlantilla(&$params)
    {
        return true;
    }

    public function completamientoPlantilla(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.completacion_pantilla');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpCompPlantilla(&$params)
    {
        return true;
    }

    public function ImpCompPlantilla(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.completacion_pantilla');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $content = 'Completamientos de Plantilla';
        if($params['reporte'] == 'sit_fuerza_laboral'){
            $content = 'Situación de la Fuerza Laboral';
        }
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: '".$content."';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200'  align='center' rowspan='2' class='header'>&Aacute;reas</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Plazas</td>";
                if($params['reporte'] != 'sit_fuerza_laboral'){
                    $html .= "<td width='77' align='center' rowspan='2' class='header'>Ocupadas</td>
                        <td width='80' align='center' rowspan='2' class='header'>Existencia</td>                        
                        <td width='110' align='center' rowspan='2' class='header'>% Cumplimiento</td>";
                    $colspan = 3;
                }
                        
                $html .= "<td width='230' align='center' colspan='4' class='header'>Otras clasificaciones</td>
                        <td width='390' align='center' colspan='6' class='header'>Tipos de contrato</td>
                        <td width='310' align='center' colspan='5' class='header'>Categor&iacute;a ocupacional</td>
                        
                    </tr>
                    <tr>
                        <td width='50' align='center' class='header'>Mujeres</td>
                        <td width='60' align='center' class='header'>Oficiales</td>
                        <td width='60' align='center' class='header'>Directos</td>
                        <td width='60' align='center' class='header'>Indirectos</td>
                        
                        <td width='80' align='center' class='header'>Indeterminado</td>
                        <td width='60' align='center' class='header'>Temporal</td>
                        <td width='60' align='center' class='header'>A prueba</td>
                        <td width='70' align='center' class='header'>Adiestrados</td>
                        <td width='60' align='center' class='header'>Disponibles</td>
                        <td width='60' align='center' class='header'>Domiciliar</td>
                        
                        <td width='60' align='center' class='header'>Operarios</td>
                        <td width='50' align='center' class='header'>T&eacute;cnicos</td>
                        <td width='60' align='center' class='header'>Dirigentes</td>
                        <td width='80' align='center' class='header'>Administrativos</td>
                        <td width='60' align='center' class='header'>Servicio</td>
                    </tr>";
                    $i = 1;
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre']."</td>";                    
                            $html .= "<td>".($valor['cantidad_plazas']!=''?$valor['cantidad_plazas']:'0')."</td>";
                            if($params['reporte'] != 'sit_fuerza_laboral'){
                                $html .= "<td>".($valor['trabajando']!=''?$valor['trabajando']:'0')."</td>";                     
                                $html .= "<td align='center'>".($valor['existencia']!=''?$valor['existencia']:'0')."</td>"; 
                                $html .= "<td align='center'>".$valor['por_ciento']."&nbsp;%</td>";  
                            }              
                            $html .= "<td align='center'>".($valor['woman']!=''?$valor['woman']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['oficial']!=''?$valor['oficial']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['directos']!=''?$valor['directos']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['indirectos']!=''?$valor['indirectos']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['indeterminados']!=''?$valor['indeterminados']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['temporales']!=''?$valor['temporales']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['a_prueba']!=''?$valor['a_prueba']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['adiestrados']!=''?$valor['adiestrados']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['disponibles']!=''?$valor['disponibles']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['domiciliar']!=''?$valor['domiciliar']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['operarrios']!=''?$valor['operarrios']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['tecnico']!=''?$valor['tecnico']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['dirigente']!=''?$valor['dirigente']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['administrativo']!=''?$valor['administrativo']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['servicio']!=''?$valor['servicio']:'0')."</td>"; 
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
//        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
//        return $result;
    }

    // ===================Listado de trabajadores Contratados por categorias============================================//
    public function Validateplantila_x_cateoria(&$params)
    {
        return true;
    }

    public function plantila_x_cateoria(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantila_x_cateoria');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpPlantillaCat(&$params)
    {
        return true;
    }

    public function ImpPlantillaCat(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantila_x_cateoria');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Fuerza laboral por ocupación';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' rowspan='2' class='header'>Tipo de contrato</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Trabajadores</td>
                        <td width='310' align='center' colspan='6' class='header'>Categor&iacute;a ocupacional</td>
                        <td width='230' align='center' colspan='5' class='header'>Otras clasificaciones</td>
                        
                        
                    </tr>
                    <tr>
                        <td width='60' align='center' class='header'>Operarios</td>
                        <td width='50' align='center' class='header'>T&eacute;cnicos</td>
                        <td width='60' align='center' class='header'>Directivo</td>
                        <td width='80' align='center' class='header'>Administrativos</td>
                        <td width='60' align='center' class='header'>Servicio</td>
                        <td width='60' align='center' class='header'>Sin Categor&iacute;a</td>
                        
                        <td width='50' align='center' class='header'>A&ntilde;os</td>
                        <td width='60' align='center' class='header'>Directos</td>
                        <td width='60' align='center' class='header'>Indirectos</td>
                        <td width='50' align='center' class='header'>Mujeres</td>
                        <td width='60' align='center' class='header'>Oficiales</td>                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if(!isset($areas[$valor['area']])){
                            $html .= "<tr><td colspan='14' class='group' align='left'>".$valor['area']."</td></tr>";
                            $areas[$valor['area']] = $valor['area'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre']."</td>";                    
                            $html .= "<td>".($valor['trabajador']!=''?$valor['trabajador']:'0')."</td>";    
                            
                            $html .= "<td align='center'>".($valor['operarios']!=''?$valor['operarios']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['tecnico']!=''?$valor['tecnico']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['directivo']!=''?$valor['directivo']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['administrativo']!=''?$valor['administrativo']:'0')."</td>";
                            $html .= "<td align='center'>".($valor['servicio']!=''?$valor['servicio']:'0')."</td>"; 
                            $html .= "<td align='center'>".($valor['sin_categoria']!=''?$valor['sin_categoria']:'0')."</td>"; 
                            
                            $html .= "<td align='center'>".($valor['annos']!=''?$valor['annos']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['directos']!=''?$valor['directos']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['indirectos']!=''?$valor['indirectos']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['woman']!=''?$valor['woman']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['oficial']!=''?$valor['oficial']:'0')."</td>";  
                            
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }

    // ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantilla_p2(&$params)
    {
        return true;
    }

    public function plantilla_p2(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_p2');
        $_data = $_table->GetAll();
        for ($i = 0; $i < count($_data); $i++) {
            $_data[$i]["salario"] = "$" . $_data[$i]["salario"];
            $_data[$i]["pago_adicional"] = "$" . $_data[$i]["pago_adicional"];
        }

        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpPlantillaP2(&$params)
    {
        return true;
    }

    public function ImpPlantillaP2(&$params)
    {

        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_p2');
        $_data = $_table->GetAll();        
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plantilla de personal (Oficial)';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' colspan='2' class='header'>Trabajadores y &Aacute;reas</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Cargos</td>
                        <td width='100' align='center' rowspan='2' class='header'>Categor&iacute;a</td>
                        <td width='100' align='center' rowspan='2' class='header'>Clasificaci&oacute;n</td>
                        <td width='180' align='center' colspan='3' class='header'>Pago y Salario</td>
                        
                        
                    </tr>
                    <tr>
                        <td width='100' align='center' class='header'>Nombre</td>
                        <td width='100' align='center' class='header'>&Aacute;reas</td>
                        <td width='60' align='center' class='header'>Salario</td>
                        <td width='60' align='center' class='header'>Pago Adicional</td>
                        <td width='60' align='center' class='header'>Escala</td>       
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre']."</td>";                    
                            $html .= "<td>".$valor['area']."</td>";    
                            
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                
                            $html .= "<td align='center'>".($valor['categoria'])."</td>";                
                            $html .= "<td align='center'>".($valor['clacificacion'])."</td>";
                            $html .= "<td align='center'>$ ".($valor['salario'])."</td>";
                            $html .= "<td align='center'>$ ".($valor['pago_adicional'])."</td>"; 
                            $html .= "<td align='center'>".($valor['escala'])."</td>";                             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }
    

    // ===================Listado de trabajadores Contratados===========================================================//
    public function Validateplantilla_p2_actual(&$params)
    {
        return true;
    }

    public function plantilla_p2_actual(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_p2_actual');
        $_data = $_table->GetAll();
        $data = array();
        for ($i = 0; $i < count($_data); $i++) {
            $val = null;
            $dd = $_data[$i]["tiempo"];

            if ($_data[$i]["contrato"] == 'DE_capital_humano_766') {
                $obj = new Resumenes();
                $dda = 0;
                $_data[$i]["tiempo"] = $obj->antiguedadsinsinvolo($dd, $dda);
                $_data[$i]["salario"] = $_data[$i]["salario"] + $_data[$i]["pago_adicional"];
                $_data[$i]["total"] = $_data[$i]["salario"] + $_data[$i]["tiempo"];
                $_data[$i]["tiempo"] = "$" . ($_data[$i]["tiempo"]);
                $_data[$i]["salario"] = "$" . ($_data[$i]["salario"]);
                $_data[$i]["total"] = "$" . ($_data[$i]["total"]);
            } 
            else {
                $val = 0;
                $_data[$i]["tiempo"] = "$" . $val;
                $_data[$i]["salario"] = $_data[$i]["salario"] + $_data[$i]["pago_adicional"];
                $_data[$i]["total"] = $_data[$i]["salario"] + $_data[$i]["tiempo"];
                $_data[$i]["salario"] = "$" . ($_data[$i]["salario"]);
                $_data[$i]["total"] = "$" . ($_data[$i]["total"]);
            }
        }

        foreach ($_data as $row) {
            array_push($data, array(
                "area" => $row["area"],
                "nombre" => $row["nombre"],
                "cargo" => $row["cargo"],
                "categoria" => $row["categoria"],
                "clacificacion" => $row["clacificacion"],
                "total" => $row["total"],
                "salario" => $row["salario"],
                "escala" => $row["escala"],
                "esperiecia" => $row["tiempo"]
            ));
        }

        if (is_null($data))
            return false;
        $_count = count($data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $data);
        return $result;
    }
    
    public function ValidateImpPlantillaP2Actual(&$params)
    {
        return true;
    }

    public function ImpPlantillaP2Actual(&$params)
    {
        
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_p2_actual');
        $_data = $_table->GetAll();
        $data = array();
//        for ($i = 0; $i < count($_data); $i++) {
//            $val = null;
//            $dd = $_data[$i]["tiempo"];
//
//            if ($_data[$i]["contrato"] == 'DE_capital_humano_766') {
//                $obj = new Resumenes();
//                $dda = 0;
//                $_data[$i]["tiempo"] = $obj->antiguedadsinsinvolo($dd, $dda);
//                $_data[$i]["salario"] = $_data[$i]["salario"] + $_data[$i]["pago_adicional"];
//                $_data[$i]["total"] = $_data[$i]["salario"] + $_data[$i]["tiempo"];
//                $_data[$i]["tiempo"] = "$" . ($_data[$i]["tiempo"]);
//                $_data[$i]["salario"] = "$" . ($_data[$i]["salario"]);
//                $_data[$i]["total"] = "$" . ($_data[$i]["total"]);
//            } else {
//                $val = 0;
//                $_data[$i]["tiempo"] = "$" . $val;
//                $_data[$i]["salario"] = $_data[$i]["salario"] + $_data[$i]["pago_adicional"];
//                $_data[$i]["total"] = $_data[$i]["salario"] + $_data[$i]["tiempo"];
//                $_data[$i]["salario"] = "$" . ($_data[$i]["salario"]);
//                $_data[$i]["total"] = "$" . ($_data[$i]["total"]);
//            }
//        }       

        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plantilla Actual de Personal';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' colspan='2' class='header'>Trabajadores y &Aacute;reas</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Cargos</td>
                        <td width='100' align='center' rowspan='2' class='header'>Categor&iacute;a</td>
                        <td width='100' align='center' rowspan='2' class='header'>Clasificaci&oacute;n</td>
                        <td width='180' align='center' colspan='5' class='header'>Pago y Salario</td>
                        
                        
                    </tr>
                    <tr>
                        <td width='100' align='center' class='header'>Nombre</td>
                        <td width='100' align='center' class='header'>&Aacute;reas</td>
                        <td width='60' align='center' class='header'>Salario</td>
                        <td width='60' align='center' class='header'>Antig&uuml;edad</td>
                        <td width='60' align='center' class='header'>Escala</td>       
                        <td width='60' align='center' class='header'>Total</td>       
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $obj = new Resumenes();
                        $antiguedad = 0;
                         if ($valor["contrato"] == 'DE_capital_humano_766')
                            $antiguedad = $obj->antiguedadsinsinvolo($valor['tiempo'],0);                         
                        $style = '';
                        $total = floatval($valor['salario'])+floatval($valor['pago_adicional']);
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre']."</td>";                    
                            $html .= "<td>".$valor['area']."</td>";    
                            
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                
                            $html .= "<td align='center'>".($valor['categoria'])."</td>";                
                            $html .= "<td align='center'>".($valor['clacificacion'])."</td>";
                            $html .= "<td align='center'>$ ".($total)."</td>";
                            $html .= "<td align='center'>$ ".($antiguedad)."</td>"; 
                            $html .= "<td align='center'>".($valor['escala'])."</td>";                             
                            $html .= "<td align='center'>$".($total + floatval($antiguedad))."</td>";                           
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
    }

    // ===================Listado de trabajadores Contratados===========================================================//
    public function ValidatecompletamientoPlantilla_x_contrato(&$params)
    {
        return true;
    }

    public function completamientoPlantilla_x_contrato(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_x_cotrato');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpCompPlantCont(&$params)
    {
        return true;
    }

    public function ImpCompPlantCont(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla_x_cotrato');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Plantilla de Cargos';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='200' align='center' rowspan='2' class='header'>&Aacute;reas</td>
                        <td width='60' align='center' rowspan='2' class='header'>Plazas</td>
                        <td width='60'  align='center' rowspan='2' class='header'>Ocupadas</td>
                        <td width='60' align='center' rowspan='2' class='header'>% Cumplimiento</td>
                        <td align='center' colspan='6' class='header'>Tipo de Contratos</td>
                        
                        
                    </tr>
                    <tr>
                        <td width='60' align='center' class='header'>Indeterminado</td>
                        <td width='60' align='center' class='header'>Temporal</td>
                        <td width='60' align='center' class='header'>A prueba</td>
                        <td width='60' align='center' class='header'>Adiestrados</td>
                        <td width='60' align='center' class='header'>Disponibles</td>
                        <td width='60' align='center' class='header'>Domiciliar</td>                    
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
                            $html .= "<td>".$valor['nombre']."</td>";                    
                            $html .= "<td>".($valor['cant_plazas']!=''?$valor['cant_plazas']:'0')."</td>";    
                            $html .= "<td align='center'>".($valor['trabajando']!=''?$valor['trabajando']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['porciento']!=''?$valor['porciento']:'0')."</td>";  
                            $html .= "<td align='center'>".($valor['indeterminados']!=''?$valor['indeterminados']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['temporales']!=''?$valor['temporales']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['a_prueba']!=''?$valor['a_prueba']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['adiestrados']!=''?$valor['adiestrados']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['disponibles']!=''?$valor['disponibles']:'0')."</td>";                
                            $html .= "<td align='center'>".($valor['domiciliar']!=''?$valor['domiciliar']:'0')."</td>";     
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados===============================================================//
    public function ValidateTcontratados(&$params)
    {
        return true;
    }

    public function Tcontratados(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateImpTrabajadoresContratados(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresContratados(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.plantilla');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                            $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados Indefinidaamente==============================================//
    public function ValidateTcontratadosIndefinidamente(&$params)
    {
        return true;
    }

    public function TcontratadosIndefinidamente(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_indefinido');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabContratadosIndefinidamente(&$params)
    {
        return true;
    }

    public function ImpTrabContratadosIndefinidamente(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_indefinido');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados Indefinidamente';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados Indefinidaamente==============================================//
    public function ValidateTcontratadosAprueba(&$params)
    {
        return true;
    }

    public function TcontratadosAprueba(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_a_prueba');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabContratadosAPrueba(&$params)
    {
        return true;
    }

    public function ImpTrabContratadosAPrueba(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_a_prueba');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados A Prueba';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados Indefinidaamente==============================================//
    public function ValidateTcontratadosTemporalmente(&$params)
    {
        return true;
    }

    public function TcontratadosTemporalmente(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_a_temporal');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabContratadosTemp(&$params)
    {
        return true;
    }

    public function ImpTrabContratadosTemp(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_a_temporal');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados Temporalmente';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados Indefinidaamente==============================================//
    public function ValidateTcontratadosAdiestrados(&$params)
    {
        return true;
    }

    public function TcontratadosAdiestrados(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_adiestramiento');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabContratadosAdiestrados(&$params)
    {
        return true;
    }

    public function ImpTrabContratadosAdiestrados(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_adiestramiento');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados Adiestrados';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados Indefinidaamente==============================================//
    public function ValidateTcontratadosDisponibles(&$params)
    {
        return true;
    }

    public function TcontratadosDisponibles(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_disponible');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabContratadosDisponibles(&$params)
    {
        return true;
    }

    public function ImpTrabContratadosDisponibles(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_disponible');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados Disponibles';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados Indefinidaamente==============================================//
    public function ValidateTcontratadosAdomicilio(&$params)
    {
        return true;
    }

    public function TcontratadosAdomicilio(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_domiciliar');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabContratadosDomiciliar(&$params)
    {
        return true;
    }

    public function ImpTrabContratadosDomiciliar(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_domiciliar');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados Domiciliar';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ===================Listado de trabajadores Contratados Indefinidaamente==============================================//
    public function ValidateTcontratadosVencidos(&$params)
    {
        return true;
    }

    public function TcontratadosVencidos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_vencidos');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabContratadosVencidos(&$params)
    {
        return true;
    }

    public function ImpTrabContratadosVencidos(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_contrato_vencidos');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Contratados Domiciliar';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>C. Identidad</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Fecha Inicio</td>                        
                        <td width='60'  align='center' class='header'>Fecha Final</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['identidad'])."</td>";                
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_final'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// =================Complrtamiento de Plantilla ========================================================================//
    public function ValidateComplePlantilla(&$params)
    {
        return true;
    }

    public function ComplePlantilla(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;

    }

// =====================================================================================================================//

    public function Validatetarbajador_sin_categoria(&$params)
    {
        return true;
    }

    public function tarbajador_sin_categoria(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.tarbajador_sin_categoria');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresSCategoria(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresSCategoria(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.tarbajador_sin_categoria');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores sin integración';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//-----------------------------------------------------------------------------------------------------------------------
    public function Validatetrabajador_de_ujc(&$params)
    {
        return true;
    }

    public function trabajador_de_ujc(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_de_ujc');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresUJC(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresUJC(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_de_ujc');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores miembros de la UJC';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    //--------------------------------------------------------------------------------------------------------------------------
    public function Validatetrabajador_del_pcc(&$params)
    {
        return true;
    }

    public function trabajador_del_pcc(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_del_pcc');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresPCC(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresPCC(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_del_pcc');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores miembros del PCC';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //--------------------------------------------------------------------------------------------------------------------------

    public function Validatetrabajador_nivel_12mo(&$params)
    {
        return true;
    }

    public function trabajador_nivel_12mo(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_12mo');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresN12(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresN12(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_12mo');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores con 12mo Grado';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //-------------------------------------------------------------------------------------------------------       

    public function Validatetrabajador_nivel_6to(&$params)
    {
        return true;
    }

    public function trabajador_nivel_6to(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_6to');
        $_data = $_table->GetAll();
        if (!is_array($_data))
            $_data = array();
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresN6to(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresN6to(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_6to');
        $_data = $_table->GetAll();
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores con 6to Grado';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //--------------------------------------------------------------------------------------------------------------------
    

    public function Validatetrabajador_nivel_9no(&$params)
    {
        return true;
    }

    public function trabajador_nivel_9no(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_9no');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresN9no(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresN9no(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_9no');
        $_data = $_table->GetAll();
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores con 9no Grado';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //---------------------------------------------------------------------------------------------------------------------------
    public function Validatetrabajador_nivel_ninguno(&$params)
    {
        return true;
    }

    public function trabajador_nivel_ninguno(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_ninguno');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresSinNivel(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresSinNivel(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_ninguno');
        $_data = $_table->GetAll();
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores con Sin Nivel';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //-------------------------------------------------------------------------------------------------------------------

    public function Validatetrabajador_nivel_obrero(&$params)
    {
        return true;
    }

    public function trabajador_nivel_obrero(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_obrero');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresNivelObrero(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresNivelObrero(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_obrero');
        $_data = $_table->GetAll();
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Obreros Calificados';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//------------------------------------------------------------------------------------------------------------------
    public function Validatetrabajador_nivel_superior(&$params)
    {
        return true;
    }

    public function trabajador_nivel_superior(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_superior');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresNivelSuperior(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresNivelSuperior(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_superior');
        $_data = $_table->GetAll();
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores con nivel Superior';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //--------------------------------------------------------------------------------------------------------

    public function Validatetrabajador_nivel_tecnico(&$params)
    {
        return true;
    }

    public function trabajador_nivel_tecnico(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_tecnico');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresNivelTecnico(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresNivelTecnico(&$params)
    {
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_nivel_tecnico');
        $_data = $_table->GetAll();
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores Técnicos Medios';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Nivel</td>
                        <td width='100' align='center' class='header'>Integraci&oacute;n</td>
                        <td width='100' align='center' class='header'>Cargo</td>                        
                        <td width='60'  align='center' class='header'>Inicio</td>                        
                        <td width='60'  align='center' class='header'>Tipo de contrato</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>".($valor['nivel'])."</td>";                
                            $html .= "<td align='center'>".($valor['intregracion'])."</td>";                 
                            $html .= "<td align='center'>".($valor['cargo'])."</td>";                 
                            $html .= "<td align='center'>".($valor['inicio'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_tipo'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// =====================================================================================================================//
    public function Validatelistado_ropa_trabajadores(&$params)
    {
        return true;
    }

    public function listado_ropa_trabajadores(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.listado_ropa_trabajadores');
        $_data = $_table->GetRange($_limit,$_start, null, 'nombre_completo');
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpListadoRopaTrabajadores(&$params)
    {
        return true;
    }

    public function ImpListadoRopaTrabajadores(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.listado_ropa_trabajadores');
        $_data = $_table->GetRange($_limit,$_start, null, 'nombre_completo');
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Listado de tallas';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Blusa o Camisa</td>
                        <td width='100' align='center' class='header'>Pantal&oacute;n o Saya</td>
                        <td width='100' align='center' class='header'>Zapatos</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['blusa_camisa'])."</td>";                
                            $html .= "<td align='center'>".($valor['pantalon_salla'])."</td>";                 
                            $html .= "<td align='center'>".($valor['zapatos'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    //--------------------------------------------------------------------------------------------------

    public function Validatelistador_ropa_trabajadores_femeninos(&$params)
    {
        return true;
    }

    public function listador_ropa_trabajadores_femeninos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.listador_ropa_trabajadores_femeninos');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpListadoRopaTrabajadoresF(&$params)
    {
        return true;
    }

    public function ImpListadoRopaTrabajadoresF(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.listador_ropa_trabajadores_femeninos');
        $_data = $_table->GetRange($_limit,$_start, null, 'nombre_completo');
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Listado de tallas femeninas';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Blusa o Camisa</td>
                        <td width='100' align='center' class='header'>Pantal&oacute;n o Saya</td>
                        <td width='100' align='center' class='header'>Zapatos</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['blusa_camisa'])."</td>";                
                            $html .= "<td align='center'>".($valor['pantalon_salla'])."</td>";                 
                            $html .= "<td align='center'>".($valor['zapatos'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //-----------------------------------------------------------------------------------------------------------------------

    public function Validatelistador_ropa_trabajadores_masculinos(&$params)
    {
        return true;
    }

    public function listador_ropa_trabajadores_masculinos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.listador_ropa_trabajadores_masculinos');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function ValidateImpListadoRopaTrabajadoresM(&$params)
    {
        return true;
    }

    public function ImpListadoRopaTrabajadoresM(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.listador_ropa_trabajadores_masculinos');
        $_data = $_table->GetRange($_limit,$_start, null, 'nombre_completo');
        if (!is_array($_data))
            $_data = array();
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Listado de tallas femeninas';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Blusa o Camisa</td>
                        <td width='100' align='center' class='header'>Pantal&oacute;n o Saya</td>
                        <td width='100' align='center' class='header'>Zapatos</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>".($valor['blusa_camisa'])."</td>";                
                            $html .= "<td align='center'>".($valor['pantalon_salla'])."</td>";                 
                            $html .= "<td align='center'>".($valor['zapatos'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//--------------------------------------------------------------------------------------------------------------------------
    public function Validatenecesidad_de_blusas_camisas(&$params)
    {
        return true;
    }

    public function necesidad_de_blusas_camisas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_blusas_camisas');
        $_data = $_table->GetAll();
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_zapatos');
        $_data1 = $_table->GetAll();
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_pantalon_saya');
        $_data2 = $_table->GetAll();
        
        if (!is_array($_data))
            $_data = array();
        if (!is_array($_data1))
            $_data1 = array();
        if (!is_array($_data2))
            $_data2 = array();
        $valores = array();
        $aux = array();
        $i = count($_data);
        $k = count($_data1);
        $j = count($_data2);
        if($i > $k){
            foreach($_data as $valor){ 
                if($k-1 >= 0)
                  $aux[]  = $valor + $_data1[--$k];
                else
                   $aux[]  = $valor;
            }        
        }else{
            foreach($_data1 as $valor){ 
                if($i-1 >= 0)
                  $aux[]  = $valor + $_data[--$i];
                else
                   $aux[]  = $valor;           
            }
        }
        if(count($aux) > $j){
            foreach($aux as $valor){ 
                if($j-1 >= 0)
                  $valores[]  = $valor + $_data2[--$j];
                else
                   $valores[]  = $valor;
            }        
        }else{
            $r = count($aux);
            foreach($_data2 as $valor){ 
                if($r-1 >= 0)
                  $valores[]  = $valor + $aux[--$r];
                else
                   $valores[]  = $valor;           
            } 
        }
        $_count = count($valores);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $valores);
        return $result;
    }
    
    public function ValidateImpListadoNecesidadTallas(&$params)
    {
        return true;
    }

    public function ImpListadoNecesidadTallas(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_blusas_camisas');
        $_data = $_table->GetAll();
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_zapatos');
        $_data1 = $_table->GetAll();
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_pantalon_saya');
        $_data2 = $_table->GetAll();
        
        if (!is_array($_data))
            $_data = array();
        if (!is_array($_data1))
            $_data1 = array();
        if (!is_array($_data2))
            $_data2 = array();
        $valores = array();
        $aux = array();
        $i = count($_data);
        $k = count($_data1);
        $j = count($_data2);
        if($i > $k){
            foreach($_data as $valor){ 
                if($k-1 >= 0)
                  $aux[]  = $valor + $_data1[--$k];
                else
                   $aux[]  = $valor;
            }        
        }else{
            foreach($_data1 as $valor){ 
                if($i-1 >= 0)
                  $aux[]  = $valor + $_data[--$i];
                else
                   $aux[]  = $valor;           
            }
        }
        if(count($aux) > $j){
            foreach($aux as $valor){ 
                if($j-1 >= 0)
                  $valores[]  = $valor + $_data2[--$j];
                else
                   $valores[]  = $valor;
            }        
        }else{
            $r = count($aux);
            foreach($_data2 as $valor){ 
                if($r-1 >= 0)
                  $valores[]  = $valor + $aux[--$r];
                else
                   $valores[]  = $valor;           
            } 
        }
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Necesidad de Tallas';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='100'  align='center' class='header'>Blusa o Camisa</td>
                        <td width='50'  align='center' class='header'>Cantidad</td>
                        <td width='100' align='center' class='header'>Pantal&oacute;n o Saya</td>
                        <td width='50'  align='center' class='header'>Cantidad</td>
                        <td width='100' align='center' class='header'>Zapatos</td> 
                        <td width='50'  align='center' class='header'>Cantidad</td>
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($valores as $valor){
                        $style = '';
                         if(!isset($areas[$valor['nombre']])){
                            $html .= "<tr><td colspan='7' class='group' align='left'>".$valor['nombre']."</td></tr>";
                            $areas[$valor['nombre']] = $valor['nombre'];
                        }
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";      
                            $html .= "<td align='center'>&nbsp;".($valor['blusa_camisa'])."</td>";                
                            $html .= "<td align='center'>&nbsp;".($valor['bcount'])."</td>";                
                            $html .= "<td align='center'>&nbsp;".($valor['pantalon'])."</td>";                 
                            $html .= "<td align='center'>&nbsp;".($valor['pcount'])."</td>";                 
                            $html .= "<td align='center'>&nbsp;".($valor['zapato'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['zcount'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//---------------------------------------------------------------------------------------------------------------------------
    public function Validatenecesidad_de_zapatos(&$params)
    {
        return true;
    }

    public function necesidad_de_zapatos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_zapatos');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatenecesidad_de_pantalon_saya(&$params)
    {
        return true;
    }

    public function necesidad_de_pantalon_saya(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.necesidad_de_pantalon_saya');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    // ===================Antiguedad de los traajadores===========================================================//

    public function Validatetrabajdores_antiguedad(&$params)
    {
        return true;
    }
    public function trabajdores_antiguedad(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajdores_antiguedad');
        $data = $_table->GetAll();
        for ($i = 0; $i < count($data); $i++) {
            $val = null;
            $dd = $data[$i]["antig"];
            if ($data[$i]["contrato_id"] == 'DE_capital_humano_766') {
                $obj = new Resumenes();
                $dda = 0;
                $data[$i]["pp"] = $obj->antiguedad($dd, $dda);
            } else {
                $val = 0;
                $data[$i]["tiempo"] = '$' . $val;
            }
            $val = $data[$i]["antig"];
            $val4 = $data[$i]["annos"];
            $val2 = $val . " años";
            $val3 = $val4 . " años";
            $data[$i]["antig"] = $val2;
            $data[$i]["annos"] = $val3;
        }
        if (is_null($data))
            return false;
        $_count = count($data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $data);
        return $result;
    }
    
    public function ValidateImpTrabajadoresAntiguedad(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresAntiguedad(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajdores_antiguedad');
        $_data = $_table->GetAll();        
        if (!is_array($_data))
            $_data = array();
        $valores = array();
        foreach ($_data as $dato) {
            $val = null;
            $dd = $dato["antig"];
            if ($dato["contrato_id"] == 'DE_capital_humano_766') {
                $obj = new Resumenes();
                $dda = 0;
                $dato["pp"] = $obj->antiguedad($dd, $dda);
            } else {
                $val = 0;
                $dato["tiempo"] = '$' . $val;
            }
            $val = $dato["antig"];
            $val4 = $dato["annos"];
            $val2 = $val . " años";
            $val3 = $val4 . " años";
            $dato["antig"] = $val2;
            $dato["annos"] = $val3;
            $valores[] = $dato;
        }
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores (Antigüedad)';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Sexo</td>
                        <td width='100' align='center' class='header'>Categor&iacute;a</td>
                        <td width='100' align='center' class='header'>Fecha Nacimiento</td> 
                        <td width='50' align='center' class='header'>Edad</td> 
                        <td width='100' align='center' class='header'>Fecha de Incorporaci&oacute;n</td> 
                        <td width='100' align='center' class='header'>Inicio de Contrato</td> 
                        <td width='100' align='center' class='header'>Final de Contrato</td> 
                        <td width='50' align='center' class='header'>Antig&uuml;edad</td> 
                        <td width='50' align='center' class='header'>Anti</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($valores as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>&nbsp;".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>&nbsp;".($valor['sexo'])."</td>";                
                            $html .= "<td align='center'>&nbsp;".($valor['categoria'])."</td>";                 
                            $html .= "<td align='center'>&nbsp;".($valor['cumple'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['annos'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_inicio'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_fi'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['contrato_ff'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['antig'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['pp'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//---------------------------------------------------------------------------------------------------------------------
    public function Validatetrabajdores_antiguedad_update(&$params)
    {
        return true;
    }
    public function trabajdores_antiguedad_update(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajdores_antiguedad_update');
        $data = $_table->GetAll();
        for ($i = 0; $i < count($data); $i++) {
            $val = null;
            $dd = $data[$i]["antig_neses"];
            $dda = $data[$i]["antig_anios"];
            if ($data[$i]["contrato_id"] == 'DE_capital_humano_766') {
                if ($dd == 11 || $dd == 59 || $dd == 119 || $dd == 179 || $dd == 239 || $dd == 299) {
                    $nuevovaloranno = $data[$i]["antig_nueva_annos"] = ($data[$i]["antig_anios"] + 1) . " años";
                    $nuevovalormes = $data[$i]["antig_nueva_meses"] = ($data[$i]["antig_neses"] + 1) . " meses";
                    $obj = new Resumenes();
                    $data[$i]["antig_nueva_valor"] = $obj->antiguedad($nuevovaloranno, $nuevovalormes);
                    $data[$i]["antig_viejo_valor"] = $obj->antiguedad($dda, $dd);
                    $data[$i]["antig_neses"] = ($data[$i]["antig_neses"]) . " meses";
                    $data[$i]["antig_anios"] = ($data[$i]["antig_anios"]) . " años";
                    $data[$i]["update"] = 1;
                }
            }
        }
        $_data = array();
        foreach ($data as $row) {
            if ($row["update"] == 1) {
                array_push($_data, array(
                    "nombre" => $row["nombre"],
                    "categoria" => $row["categoria"],
                    "annos" => $row["annos"],
                    "contrato_id" => $row["contrato_id"],
                    "contrato" => $row["contrato"],
                    "antig_neses" => $row["antig_neses"],
                    "antig_anios" => $row["antig_anios"],
                    "antig_nueva_valor" => $row["antig_nueva_valor"],
                    "antig_viejo_valor" => $row["antig_viejo_valor"],
                    "antig_nueva_meses" => $row["antig_nueva_meses"],
                    "antig_nueva_annos" => $row["antig_nueva_annos"]
                ));
            }
        }
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateImpTrabajadoresAntiguedadUpdate(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresAntiguedadUpdate(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajdores_antiguedad_update');
        $data = $_table->GetAll();        
        if (!is_array($data))
            $data = array();
        for ($i = 0; $i < count($data); $i++) {
            $val = null;
            $dd = $data[$i]["antig_neses"];
            $dda = $data[$i]["antig_anios"];
            if ($data[$i]["contrato_id"] == 'DE_capital_humano_766') {
                if ($dd == 11 || $dd == 59 || $dd == 119 || $dd == 179 || $dd == 239 || $dd == 299) {
                    $nuevovaloranno = $data[$i]["antig_nueva_annos"] = ($data[$i]["antig_anios"] + 1) . " años";
                    $nuevovalormes = $data[$i]["antig_nueva_meses"] = ($data[$i]["antig_neses"] + 1) . " meses";
                    $obj = new Resumenes();
                    $data[$i]["antig_nueva_valor"] = $obj->antiguedad($nuevovaloranno, $nuevovalormes);
                    $data[$i]["antig_viejo_valor"] = $obj->antiguedad($dda, $dd);
                    $data[$i]["antig_neses"] = ($data[$i]["antig_neses"]) . " meses";
                    $data[$i]["antig_anios"] = ($data[$i]["antig_anios"]) . " años";
                    $data[$i]["update"] = 1;
                }
            }
        }
        $_data = array();
        foreach ($data as $row) {
            if ($row["update"] == 1) {
                array_push($_data, array(
                    "nombre" => $row["nombre"],
                    "categoria" => $row["categoria"],
                    "annos" => $row["annos"],
                    "contrato_id" => $row["contrato_id"],
                    "contrato" => $row["contrato"],
                    "antig_neses" => $row["antig_neses"],
                    "antig_anios" => $row["antig_anios"],
                    "antig_nueva_valor" => $row["antig_nueva_valor"],
                    "antig_viejo_valor" => $row["antig_viejo_valor"],
                    "antig_nueva_meses" => $row["antig_nueva_meses"],
                    "antig_nueva_annos" => $row["antig_nueva_annos"]
                ));
            }
        }
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores (Cambio de Antigüedad)';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='50' align='center' class='header'>Edad</td> 
                        <td width='50' align='center' class='header'>Antig&uuml;edad</td> 
                        <td width='100' align='center' class='header'>Antig&uuml;edad Nueva</td> 
                        <td width='50' align='center' class='header'>Antig&uuml;edad</td> 
                        <td width='100' align='center' class='header'>Antig&uuml;edad Nueva</td> 
                        <td width='50' align='center' class='header'>Antig&uuml;edad</td> 
                        <td width='100' align='center' class='header'>Antig&uuml;edad Nueva</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>&nbsp;".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>&nbsp;".($valor['annos'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['antig_anios'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['antig_nueva_annos'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['antig_neses'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['antig_nueva_meses'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['antig_viejo_valor'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['antig_nueva_valor'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//-------------------------------------------------------------------------------------------------------------------    
    public function antiguedad($dda, $dd)
    {
        $vall = null;
        if ($dda <= 5 && $dda >= 1 || $dd <= 59 && $dd >= 12) {
            $vall = 10;
        } else if ($dda <= 10 && $dda > 5 || $dd <= 119 && $dd >= 60) {
            $vall = 20;
        } else if ($dda <= 15 && $dda > 10 || $dd <= 179 && $dd >= 120) {
            $vall = 30;
        } else if ($dda <= 20 && $dda > 15 || $dd <= 239 && $dd >= 180) {
            $vall = 45;
        } else if ($dda <= 25 && $dda > 20 || $dd <= 299 && $dd >= 240) {
            $vall = 60;
        } else if ($dda <= 30 && $dda > 25 || $dd <= 359 && $dd >= 300) {
            $vall = 75;
        } else if ($dda >= 30 || $dd >= 360) {
            $vall = 90;
        } else {
            $vall = 0;
        }
        return "$" . $vall;
    }
    public function antiguedadsinsinvolo($dda, $dd)
    {
        $vall = null;
        if ($dda <= 5 && $dda >= 1 || $dd <= 59 && $dd >= 12) {
            $vall = 10;
        } else if ($dda <= 10 && $dda > 5 || $dd <= 119 && $dd >= 60) {
            $vall = 20;
        } else if ($dda <= 15 && $dda > 10 || $dd <= 179 && $dd >= 120) {
            $vall = 30;
        } else if ($dda <= 20 && $dda > 15 || $dd <= 239 && $dd >= 180) {
            $vall = 45;
        } else if ($dda <= 25 && $dda > 20 || $dd <= 299 && $dd >= 240) {
            $vall = 60;
        } else if ($dda <= 30 && $dda > 25 || $dd <= 359 && $dd >= 300) {
            $vall = 75;
        } else if ($dda >= 30 || $dd >= 360) {
            $vall = 90;
        } else {
            $vall = 0;
        }
        return $vall;
    }

    public function Validatesegun_antiguedad(&$params)
    {
        return true;
    }
    public function segun_antiguedad(&$params)
    {
        $anno = $params['anno'];
        $todos = $params['todos'] == 'true' ? true : false;
        $superior = $params['superior'] == 'true' ? true : false;
        $inferior = $params['inferior'] == 'true' ? true : false;
        $contrato1 = $params['contrato1'] == 'true' ? true : false;
        $contrato1I = $params['contrato1I'] == 'true' ? true : false;
        $nacer = $params['nacer'] == 'true' ? true : false;


        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_data = array();
        $_table = $this->_dbase->GetTable('vistas_resumen.segun_antiguedad');

        if ($todos == true) {
            $_data = $_table->GetAll("contrato_id = 'DE_capital_humano_766'");
            if (is_null($_data))
                return false;
            $_count = count($_data);
            if ($_count == -1)
                return false;
        }
                elseif ($anno != null && $superior == true && $nacer==false && $contrato1I==false && $contrato1==false){
                    $_data = $_table->GetAll("tiempo >= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }
                elseif ($anno != null && $inferior == true && $nacer==false && $contrato1I==false && $contrato1==false){
                    $_data = $_table->GetAll("tiempo <= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }

                elseif ($anno != null && $inferior == true && $contrato1==true && $nacer==false && $contrato1I==false){}
                elseif ($anno != null && $superior == true && $contrato1==true && $contrato1==true && $nacer==false && $contrato1I==false){}
                elseif ($anno != null && $superior == false  && $inferior == false && $contrato1==true && $nacer==false && $contrato1I==false){}

                elseif ($anno != null && $inferior == true && $contrato1I==true && $nacer==false && $contrato1==false){}
                elseif ($anno != null && $superior == true && $contrato1I==true && $nacer==false && $contrato1==false ){}
                elseif ($anno != null && $superior == false  && $inferior == false &&  $contrato1==false && $nacer==false && $contrato1I==true){}

                elseif ($anno != null && $inferior == true && $nacer==true && $contrato1==false && $contrato1I==false){
                    $_data = $_table->GetAll("edad <= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }
                elseif ($anno != null && $superior == true && $nacer==true && $contrato1==false && $contrato1I==false){
                    $_data = $_table->GetAll("edad >= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }
                elseif ($anno != null && $superior == false  && $inferior == false &&  $contrato1==false && $nacer==true && $contrato1I==false){

                    $_data = $_table->GetAll("edad = $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }

        else if ($todos == false && $anno != null) {
            $_data= $_table->GetAll("tiempo='$anno' and contrato_id='DE_capital_humano_766'");
            if (is_null($_data))
                return false;
            $_count = count($_data);
            if ($_count == -1)
                return false;
        }
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;











    }
    
    public function ValidateImpTrabajadoresSegunAntiguedad(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresSegunAntiguedad(&$params)
    {
        $anno = $params['anno'];
        $todos = $params['todos'] == 'true' ? true : false;
        $superior = $params['superior'] == 'true' ? true : false;
        $inferior = $params['inferior'] == 'true' ? true : false;
        $contrato1 = $params['contrato1'] == 'true' ? true : false;
        $contrato1I = $params['contrato1I'] == 'true' ? true : false;
        $nacer = $params['nacer'] == 'true' ? true : false;
        
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_data = array();
        $_table = $this->_dbase->GetTable('vistas_resumen.segun_antiguedad');

        if ($todos == true) {
            $_data = $_table->GetAll("contrato_id = 'DE_capital_humano_766'");
            if (is_null($_data))
                return false;
            $_count = count($_data);
            if ($_count == -1)
                return false;
        }
                elseif ($anno != null && $superior == true && $nacer==false && $contrato1I==false && $contrato1==false){
                    $_data = $_table->GetAll("tiempo >= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }
                elseif ($anno != null && $inferior == true && $nacer==false && $contrato1I==false && $contrato1==false){
                    $_data = $_table->GetAll("tiempo <= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }

                elseif ($anno != null && $inferior == true && $contrato1==true && $nacer==false && $contrato1I==false){}
                elseif ($anno != null && $superior == true && $contrato1==true && $contrato1==true && $nacer==false && $contrato1I==false){}
                elseif ($anno != null && $superior == false  && $inferior == false && $contrato1==true && $nacer==false && $contrato1I==false){}

                elseif ($anno != null && $inferior == true && $contrato1I==true && $nacer==false && $contrato1==false){}
                elseif ($anno != null && $superior == true && $contrato1I==true && $nacer==false && $contrato1==false ){}
                elseif ($anno != null && $superior == false  && $inferior == false &&  $contrato1==false && $nacer==false && $contrato1I==true){}

                elseif ($anno != null && $inferior == true && $nacer==true && $contrato1==false && $contrato1I==false){
                    $_data = $_table->GetAll("edad <= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }
                elseif ($anno != null && $superior == true && $nacer==true && $contrato1==false && $contrato1I==false){
                    $_data = $_table->GetAll("edad >= $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }
                elseif ($anno != null && $superior == false  && $inferior == false &&  $contrato1==false && $nacer==true && $contrato1I==false){

                    $_data = $_table->GetAll("edad = $anno and contrato_id = 'DE_capital_humano_766'");
                    if (is_null($_data))
                        return false;
                    $_count = count($_data);
                    if ($_count == -1)
                        return false;
                }

        else if ($todos == false && $anno != null) {
            $_data= $_table->GetAll("tiempo='$anno' and contrato_id='DE_capital_humano_766'");
            if (is_null($_data))
                return false;
            $_count = count($_data);
            if ($_count == -1)
                return false;
        }    
//        print_r($_data);die;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores seg&uacute;n antigüedad ';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='50' align='center' class='header'>Edad</td> 
                        <td width='50' align='center' class='header'>Antig&uuml;edad</td> 
                        <td width='100' align='center' class='header'>&Aacute;rea</td> 
                        <td width='50' align='center' class='header'>Cargo</td> 
                        <td width='100' align='center' class='header'>Categor&iacute;a</td> 
                        <td width='50' align='center' class='header'>Clacificaci&oacute;n</td> 
                        <td width='100' align='center' class='header'>Salario</td> 
                        <td width='100' align='center' class='header'>Pago Adicional</td> 
                        <td width='100' align='center' class='header'>Escala</td> 
                        <td width='100' align='center' class='header'>Contrato</td> 
                        <td width='100' align='center' class='header'>Fecha inicio</td> 
                        <td width='100' align='center' class='header'>Fecha nacimiento</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>&nbsp;".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>&nbsp;".($valor['edad'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['tiempo'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['area'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['cargo'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['categoria'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['clacificacion'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['salario'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['pago_adicional'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['escala'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['contrato'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_inicio'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['fecha_nacimiento'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    
    // ===================Ubicacion de la DEfnsa===========================================================//

    public function ValidateSD_RegistroMilitar(&$params)
    {
        return true;
    }

    public function SD_RegistroMilitar(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.ubicacion_defensa_cantidad');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;

    }
    
    public function ValidateImpSDRegistroMilitar(&$params)
    {
        return true;
    }

    public function ImpSDRegistroMilitar(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.ubicacion_defensa_cantidad');
        $_data = $_table->GetAll();
        
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'SD - Registro MilitarSD - Registro Militar ';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='200'  align='center' class='header'>Nombre</td>
                        <td width='100'  align='center' class='header'>Cantidad</td>
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';                         
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";      
                            $html .= "<td align='left'>&nbsp;".($valor['nombre'])."</td>";                
                            $html .= "<td align='center'>&nbsp;".($valor['count'])."</td>";  
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateSD_RegistroMilitar_trabajadores(&$params)
    {
        return true;
    }

    public function SD_RegistroMilitar_trabajadores(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.ubicacion_defensa_trabajadores');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;

    }
    public function ValidateImpTrabajadoresUD(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresUD(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.ubicacion_defensa_trabajadores');
        $_data = $_table->GetAll();        
        if (!is_array($_data))
            $_data = array();
        
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'SD - Trabajadores';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='150' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Ubicaci&oacute;n</td>
                        <td width='100' align='center' class='header'>Tel&eacute;fono</td>
                        <td width='100' align='center' class='header'>No. Identidad</td> 
                        <td width='100' align='center' class='header'>Provincia</td> 
                        <td width='100' align='center' class='header'>Municipio</td> 
                        <td width='100' align='center' class='header'>Reparto</td> 
                        <td width='100' align='center' class='header'>Direcci&oacute;n</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>&nbsp;".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>&nbsp;".($valor['udefensa'])."</td>";                
                            $html .= "<td align='center'>&nbsp;".($valor['telefono'])."</td>";                 
                            $html .= "<td align='center'>&nbsp;".($valor['no_identidad'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['prov'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['munic'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['repart'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['dir'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    

    public function ValidateSD_RegistroMilitar_trabajadores_noinc(&$params)
    {
        return true;
    }

    public function SD_RegistroMilitar_trabajadores_noinc(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.ubicacion_defensa_trabajadores_noinc');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;

    }
    
    public function ValidateImpTrabajadoresSDNIncorporados(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresSDNIncorporados(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.ubicacion_defensa_trabajadores_noinc');
        $_data = $_table->GetAll();        
        if (!is_array($_data))
            $_data = array();
        //mkdir('hola');
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Trabajadores no incorporados';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='150' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Ubicaci&oacute;n</td>
                        <td width='100' align='center' class='header'>Tel&eacute;fono</td>
                        <td width='100' align='center' class='header'>No. Identidad</td> 
                        <td width='100' align='center' class='header'>Provincia</td> 
                        <td width='100' align='center' class='header'>Municipio</td> 
                        <td width='100' align='center' class='header'>Reparto</td> 
                        <td width='100' align='center' class='header'>Direcci&oacute;n</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>&nbsp;".$valor['nombre']."</td>";    
                            $html .= "<td align='center'>&nbsp;".($valor['udefensa'])."</td>";                
                            $html .= "<td align='center'>&nbsp;".($valor['telefono'])."</td>";                 
                            $html .= "<td align='center'>&nbsp;".($valor['no_identidad'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['prov'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['munic'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['repart'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['dir'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

//==============================Fluctuacion de a BD==================================================================
    public function Validatetodas_bajas(&$params)
    {
        return true;
    }
    public function todas_bajas(&$params)
    {

        $todos = $params['todos'] == 'true' ? true : false;
        $desde = $params['desde'];
        $hasta = $params['hasta'];
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_data = array();
        $_table = $this->_dbase->GetTable('vistas_resumen.todas_bajas');

        if ($todos == true) {
            $_data = $_table->GetAll();
            if (is_null($_data))
                return false;
            $_count = count($_data);
            if ($_count == -1)
                return false;
        }
        else if ($todos == false && $desde != null && $hasta != null) {
           // print_r('hdhd');die;
            $_data= $_table->GetAll("final >= '$desde' and final <= '$hasta' ");
            if (is_null($_data))
                return false;
            $_count = count($_data);
            if ($_count == -1)
                return false;
        }
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatebajas_categorias(&$params)
    {
        return true;
    }

    public function bajas_categorias(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.todas_bajas');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
   public function ValidateImpBajasCategorias(&$params)
    {
        return true;
    }

    public function ImpBajasCategorias(&$params)
    {//print_r($params);die;
        $_table = $this->_dbase->GetTable('vistas_resumen.todas_bajas');
        $where = array();
        if(isset($params['solicitud_propia']))
            $where['solicitud_propia'] = "'".$params['solicitud_propia']."'";
        if(isset($params['baja_a']))
            $where['baja_a'] = "'".$params['baja_a']."'";
        if(isset($params['licencia_a']))
            $where['licencia_a'] = "'".$params['licencia_a']."'";
        if(isset($params['nombre']))
            $where['nombre'] = "'".$params['nombre']."'";
        if(isset($params['mbaja']))
            $where['mbaja'] = "'".$params['mbaja']."'";
        if(isset($params['dbaja']))
            $where['dbaja'] = "'".$params['dbaja']."'";
        if(isset($params['area']))
            $where['area'] = "'".$params['area']."'";
        if(isset($params['agencia']))
            $where['agencia'] = "'".$params['agencia']."'";
        
        if(count($where) != 0)
            $where = implode(' AND ', $where);
        else
            $where = null;
        
        $_data = $_table->GetAll($where);
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Fluctuación de Plantilla';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='200' align='center' class='header'>Nombre</td>
                        <td width='100' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Solicitud</td>                        
                        <td width='60'  align='center' class='header'>Baja</td>                        
                        <td width='60'  align='center' class='header'>Licencia</td>                        
                        <td width='60'  align='center' class='header'>Fecha de Incorporaci&oacute;n</td>                        
                        <td width='60'  align='center' class='header'>Fecha de Baja</td>                        
                        <td width='60'  align='center' class='header'>Motivo</td>                        
                        <td width='60'  align='center' class='header'>Destino</td>                        
                        
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>".$valor['nombre']."</td>";                   
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>".($valor['solicitud_propia'])."</td>";                 
                            $html .= "<td align='center'>".($valor['baja_a'])."</td>";                 
                            $html .= "<td align='center'>".($valor['licencia_a'])."</td>";                 
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                            $html .= "<td align='center'>".($valor['fecha_baja'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['mbaja'])."</td>";             
                            $html .= "<td align='center'>&nbsp;".($valor['dbaja'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    } 

    public function Validatesolicitudes_bajas(&$params)
    {
        return true;
    }

    public function solicitudes_bajas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.solicitudes_bajas');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateImpSolicitudesBajas(&$params)
    {
        return true;
    }

    public function ImpSolicitudesBajas(&$params)
    {//print_r($params);die;
        $_table = $this->_dbase->GetTable('vistas_resumen.solicitudes_bajas');
        $where = array();
//        if(isset($params['solicitud_propia']))
//            $where['solicitud_propia'] = "'".$params['solicitud_propia']."'";
//        if(isset($params['baja_a']))
//            $where['baja_a'] = "'".$params['baja_a']."'";
        if(isset($params['licencia_a']))
            $where['licencia_a'] = "'".$params['licencia_a']."'";
        if(isset($params['nombre']))
            $where['nombre'] = "'".$params['nombre']."'";
//        if(isset($params['mbaja']))
//            $where['mbaja'] = "'".$params['mbaja']."'";
//        if(isset($params['dbaja']))
//            $where['dbaja'] = "'".$params['dbaja']."'";
        if(isset($params['area']))
            $where['area'] = "'".$params['area']."'";
        if(isset($params['agencia']))
            $where['agencia'] = "'".$params['agencia']."'";
        
        if(count($where) != 0)
            $where = implode(' AND ', $where);
        else
            $where = null;
        
        $_data = $_table->GetAll($where);
        if (is_null($_data))
            return false;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Estado de las Solicitudes(Bajas y Licencias)';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='80' align='center' class='header'>Tipo</td>
                        <td width='200' align='center' class='header'>Nombre</td>                        
                        <td width='200' align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>Area</td>                     
                        <td width='60'  align='center' class='header'>Fecha de Incorporaci&oacute;n</td>                             
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                             
                            if($valor['baja'] == 't')
                                $html .= "<td align='center'>Baja</td>";    
                            else
                                $html .= "<td align='center'>Licencia</td>";  
                            
                            $html .= "<td>".$valor['nombre']."</td>";   
                            $html .= "<td align='center'>".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>".($valor['area'])."</td>";                    
                            $html .= "<td align='center'>".($valor['fecha_inicio'])."</td>";             
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


    public function Validatembajas(&$params)
    {
        return true;
    }

    public function mbajas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.mbajas');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatedbajas(&$params)
    {
        return true;
    }

    public function dbajas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.dbajas');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


    public function Validateareas(&$params)
    {
        return true;
    }

    public function areas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.area');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateagencia(&$params)
    {
        return true;
    }

    public function agencia(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
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

    public function Validateconsultas(&$params)
    {
        return true;
    }

    public function consultas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.consultas');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateImpTrabajadoresConsultas(&$params)
    {
        return true;
    }

    public function ImpTrabajadoresConsultas(&$params)
    {
        $_start = $params['start'];
        $_limit = $params['limit'];
        $where = '';
        $tipo = 'por fecha de nacimiento';
        if(isset($params['id_especialidad'])){
            if($params['id_especialidad'] != ''){
                $where = " AND id_especialidad = '".$params['id_especialidad']."'"; 
            }
            $tipo = 'por especialidad';
        }
        if(isset($params['id_clasificacion'])){
            if($params['id_clasificacion'] != ''){
                $where = " AND id_clasificacion = '".$params['id_clasificacion']."'";
            }
            $tipo = 'por clasificación';
        }
        if(isset($params['id_procedencia'])){
            if($params['id_procedencia'] != ''){
                $where = " AND nombre = '".$params['id_procedencia']."'"; 
            }
            $tipo = 'por procedencia';
        }
        if(isset($params['sexo'])){
            if($params['sexo'] != ''){
                $where = " AND sex = '".$params['sexo']."'"; 
            }
            $tipo = 'de sexo '.$params['sexo'];
        }
        if(isset($params['mes'])){
            if($params['mes'] != ''){
                $mes = date('n');
                $where = " AND mes = '$mes'";
            }
            $tipo = 'por Cumpleaños(mes actual)';
        }
        $_table = $this->_dbase->GetTable('vistas_resumen.consultas');
        $_data = $_table->GetRange($_limit, $_start,"upper(translate(nombre_completo,'áéíóúñÑÁÉÍÓÚäëïöüÄËÏÖÜ','aeiounNAEIOUaeiouAEIOU')) like upper(translate('".$params['nombre_completo']."%','áéíóúñÑÁÉÍÓÚäëïöüÄËÏÖÜ','aeiounNAEIOUaeiouAEIOU')) $where");        
        if (!is_array($_data))
            $_data = array();
//        print_r($_data);die;
        $html = "<html><head><style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Listado de trabajadores $tipo';
                                                font-size: 12px;
                                                font-weight: bold;
                                                left: -1px;
                                                padding: 3px 7px;
                                                position: absolute;
                                                top: -1px; 
                                            }
                                            .contenedor {
                                                background-color: #FFFFFF;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 4px 4px 4px;
                                                margin: 15px 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                            }
                                           table.main tr td{
                                                font-size:x-small;
                                                border-right:1px solid Silver;
                                                border-bottom:1px solid Silver;
                                                padding-left:2px;
                                            }
                                            table tr td, h3{
                                                font-size:x-small;
                                                padding-left:2px
                                            }                                        
                                            table.main {
                                                border:1px solid #ccc;
                                                border-radius:5px 5px 5px 5px;
                                            }
                                            .header{
                                                background-color:#ccc;
                                                border-bottom:1px solid #777 !important;
                                                border-right:1px solid #777 !important;
                                            }                                            
                                            table.main tr td.header:last-child{
                                                border:none !important;
                                                border-bottom:1px solid #777 !important;
                                            }
                                            table.main tr td:last-child{
                                                border-right:none;
                                            }
                                            table.main tr:last-child td{
                                                border-bottom:none !important;
                                            }
                                            .group{
                                                background-color:#ddd;
                                                margin-left:20px ;
                                            }
                                        </style>
                                    <title>Reportes</title></head><body>";
                $colspan = 0;
                $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' class='header'>No.</td>
                        <td width='80' align='center' class='header'>Foto</td>
                        <td width='150' align='center' class='header'>Nombre</td>
                        <td width='60'  align='center' class='header'>Agencia</td>
                        <td width='100' align='center' class='header'>&Aacute;rea</td>
                        <td width='100' align='center' class='header'>Especialidad</td> 
                        <td width='100' align='center' class='header'>Clasificaci&oacute;n</td> 
                        <td width='100' align='center' class='header'>Cargo</td> 
                        <td width='100' align='center' class='header'>Fecha de Nacimiento</td> 
                        <td width='100' align='center' class='header'>Lugar de Procedencia</td> 
                    </tr>";
                    $i = 1;
                    $areas = array();
                    foreach($_data as $valor){
                        $style = '';
                        if($i%2 == 0)
				$style = "style='background-color:#f5f5f5'";
                        $html .= "<tr $style>";
                            $html .= "<td>".$i++."</td>";                            
//                            $html .= '<td><div style="border: 0;width: 70px; height: 70px; background: url(\'file://'.$_SESSION['APP_PATH'].'/SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;">&nbsp;</div></td>';                    
                            if($valor['foto'] == '' || $valor['foto'] == null)
                                $html .= '<td><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';                    
                            else
                                $html .= '<td><img width="70px" height="70px" src="data:image/png;base64,'.$valor['foto'].'"/></td>';                    
                            $html .= "<td>&nbsp;".$valor['nombre_completo']."</td>";    
                            $html .= "<td align='center'>&nbsp;".($valor['agencia'])."</td>";                
                            $html .= "<td align='center'>&nbsp;".($valor['area'])."</td>";                 
                            $html .= "<td align='center'>&nbsp;".($valor['especialidad'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['clasifi'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['cargo'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['fecha'])."</td>";
                            $html .= "<td align='center'>&nbsp;".($valor['nombre'])."</td>";
                        $html .= "</tr>";
                    }
                $html .= "</table></div></body></html>";
                $_data = array('html'=>$html);
                $result = array( 'success' => true, 'results' => count($_data), 'rows' => $_data);
                return $result;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    
    public function Validateconsultas_mes(&$params)
    {
        return true;
    }
    
    public function consultas_mes(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.consultas');
        $mes = date('n');
        //print_r($mes);die;
       // $mes=12;
        $_data = $_table->GetAll("mes = '$mes'");
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateespecialidad(&$params)
    {
        return true;
    }

    public function especialidad(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.especialidades');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCclass(&$params)
    {
        return true;
    }

    public function Cclass(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.clasificacion_d_i');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatelugar(&$params)
    {
        return true;
    }

    public function lugar(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.lugar_procedencia');
        $_data = $_table->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatesex(&$params)
    {
        return true;
    }
    public function sex(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.sexo');
        $_data = $_table->GetRange($_limit,$_start);
        if (is_null($_data))
            return false;
        $_count =  $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatepiel(&$params)
    {
        return true;
    }
    public function piel(&$params)
    {
        $_data = array();
        $_datanew = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.piel_trabj');
        $_data = $_table->GetRange($_limit,$_start);


        $_table1 = $this->_dbase->GetTable('nomencladores.color_piel');
        $Cpiel = $_table1->GetRange($_limit,$_start);


        for($i=0;$i < count($_data);$i++)
        {
            $_datanew[$i]['lugar']=$_data[$i]['agencia'].' - '.$_data[$i]['area'];
            $_datanew[$i]['piel']=$_data[$i]['piel'];
            $_datanew[$i]['cant']=$_data[$i]['cant'];


        }
        if (is_null($_data))
            return false;
        $_count =  $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_datanew);
        return $result;
    }

    public function Validatep4(&$params)
    {
        return true;
    }
    public function p4(&$params)
    {
        $_data = array();
        $_datanew = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.p4');
        $_data = $_table->GetRange($_limit,$_start);
        if (is_null($_data))
            return false;
        $_count =  $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatepromedioareas(&$params)
    {
        return true;
    }
    public function promedioareas(&$params)
    {
        $_data = array();
        $_datanew = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.prom_area');
        $_data = $_table->GetRange($_limit,$_start);
        if (is_null($_data))
            return false;
        $_count =  $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatepromedioagencia(&$params)
    {
        return true;
    }
    public function promedioagencia(&$params)
    {
        $_data = array();
        $_datanew = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.prom_agencia');
        $_data = $_table->GetRange($_limit,$_start);
        if (is_null($_data))
            return false;
        $_count =  $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validatepromedioempresa(&$params)
    {
        return true;
    }
    public function promedioempresa(&$params)
    {
        $_data = array();
        $_datanew = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.prom_empresa');
        $_data = $_table->GetRange($_limit,$_start);
        if (is_null($_data))
            return false;
        $_count =  $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


};
?>
