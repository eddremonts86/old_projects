<?PHP

class Vacaciones extends Module {

    public function __construct() {
        parent::__construct('common.ch');
    }

    // ========================================================================//
    public function ValidateCargarDatos(&$params) {
        return true;
    }

    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.vista_submayor_vacaciones');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $meses[1]  = 'Enero';
        $meses[2]  = 'Febrero';
        $meses[3]  = 'Marzo';
        $meses[4]  = 'Abril';
        $meses[5]  = 'Mayo';
        $meses[6]  = 'Junio';
        $meses[7]  = 'Julio';
        $meses[8]  = 'Agosto';
        $meses[9]  = 'Septiembre';
        $meses[10] = 'Octubre';
        $meses[11] = 'Noviembre';
        $meses[12] = 'Diciembre';
        $html = "<style type='text/css'>
                                            .contenedor:after{
                                                background-color: #157FCC;
                                                border: 1px solid #157FCC;
                                                border-radius: 4px 0 4px 0;
                                                border-bottom:1px solid #000;
                                                border-right:1px solid #000;
                                                color: #FFFFFF;
                                                content: 'Submayor de Vacaciones';
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
                                                margin: 0;
                                                padding: 39px 19px 14px;
                                                position: relative;
                                                overflow-y:scroll;
                                                height:100%
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
                                        </style>";
        $colspan = 0;
        $html .= "<div class='contenedor'><table cellspacing='0' cellpadding='0' border='0' class='main'>
                    <tr>
                        <td width='20'  align='center' rowspan='2' class='header'>No.</td>
                        <td width='50'  align='center' rowspan='2' class='header'>Foto</td>
                        <td width='100' align='center' rowspan='2' class='header'>Mes</td>
                        <td width='50'  align='center' rowspan='2' class='header'>A&ntilde;o</td>
                        <td width='400' align='center' colspan='3' class='header'>Vacaciones Acumuladas</td>                      
                        <td width='400' align='center' colspan='2' class='header'>Vacaciones Utilizadas</td>                        
                    </tr>
                    <tr>
                        <td width='60' align='center' class='header'>Dias</td>
                        <td width='50' align='center' class='header'>Acumuladas</td>
                        <td width='50' align='center' class='header'>Importe</td>
                        <td width='80' align='center' class='header'>Dias</td>
                        <td width='80' align='center' class='header'>Importe</td>                 
                    </tr>";
        $i = 1;
        $j = 1;
        $areas = array();
        $trabajadores = array();
        $actual = '';
        $total = count($_data);
        foreach ($_data as $valor) {
            $total--;
            $style = '';

            if ($actual != $valor['id'] && $actual != '') {
                for ($r = $trabajadores[$actual]; $r < 12; $r++) {
                    $j++;
                    $style = '';
                    if ($j % 2 == 0)
                        $style = "style='background-color:#f5f5f5'";
                    $html .= "<tr $style><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
                }
                $trabajadores[$valor['id']] = 0;
            }
            $trabajadores[$valor['id']]++;
            //$actual = $valor['trab_id'];
            $j++;
            if ($j % 2 == 0)
                $style = "style='background-color:#f5f5f5'";
            $html .= "<tr $style>";
            if ($actual != $valor['id']) {
                $html .= "<td rowspan='12'>" . $i++ . "</td>";
                if ($valor['foto'] == '' || $valor['foto'] == null)
                    $html .= '<td rowspan="12"><img src="./SubSystems/Plantilla/Config/Client/icons/user3.png" width= "70px" height="70px"/></td>';
                else
                    $html .= '<td rowspan="12"><img width="70px" height="70px" src="data:image/png;base64,' . $valor['foto'] . '"/></td>';
                $actual = $valor['id'];
            }
            $html .= "<td>" . $meses[$valor['mes']] . "&nbsp;</td>";
            $html .= "<td>" . $valor['anno'] . "&nbsp;</td>";
            $html .= "<td>" . $valor['dias_vacaciones'] . "&nbsp;</td>";
            $html .= "<td>" . $valor['importe_vacaciones'] . "</td>";
            $html .= "<td>" . $valor['importe_vacaciones'] . "</td>";
            $html .= "<td>" . $valor['dias_vacaciones']. "</td>";
            $html .= "<td>" . $valor['importe_vacaciones'] . "</td>";

            $html .= "</tr>";
            if ($total == 0 && $trabajadores[$valor['id']] < 12) {
                for ($r = $trabajadores[$actual]; $r < 12; $r++) {
                    $j++;
                    $style = '';
                    if ($j % 2 == 0)
                        $style = "style='background-color:#f5f5f5'";
                    $html .= "<tr $style><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
                }
            }
        }
        $html .= "</table></div>";
        $arreglo = array('html' => $html);
        /* foreach($_data as $data){

          } */

        $result = array('success' => true, 'results' => $_count, 'rows' => $arreglo);
        return $result;
    }
    
    public function ValidateDatosXPersona(&$params) {
        return true;
    }

    public function DatosXPersona(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.vista_submayor_vacaciones');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $meses[1]  = 'Enero';
        $meses[2]  = 'Febrero';
        $meses[3]  = 'Marzo';
        $meses[4]  = 'Abril';
        $meses[5]  = 'Mayo';
        $meses[6]  = 'Junio';
        $meses[7]  = 'Julio';
        $meses[8]  = 'Agosto';
        $meses[9]  = 'Septiembre';
        $meses[10] = 'Octubre';
        $meses[11] = 'Noviembre';
        $meses[12] = 'Diciembre';
        
        $colspan = 0;
        
        $i = 1;
        $j = 1;
        $areas = array();
        $trabajadores = array();
        $actual = '';
        $total = count($_data);
        foreach ($_data as $valor) {
            $html = "";            
            $html .= "<tr>";            
                $html .= "<td align='center' class='header'>" . $meses[$valor['mes']] . "&nbsp;</td>";
                $html .= "<td align='center' class='header'>" . $valor['anno'] . "&nbsp;</td>";
                $html .= "<td align='center' class='header'>" . round($valor['dias_vacaciones'],4) . "&nbsp;</td>";
                $html .= "<td align='center' class='header'>" . round($valor['importe_vacaciones'],4) . "</td>";
                $html .= "<td align='center' class='header'>" . round($valor['extraido'],4). "</td>";
                $html .= "<td align='center' class='header'>" . round($valor['importe_extraido'],4) . "</td>";
            $html .= "</tr>";
//            $html .= "</table></div>";
            $arreglo[$valor['id_contrato']][] = $html;
        }       
        
        $array   = array();
        foreach($arreglo as $key => $value){
            $html = "<style type='text/css'>                                            
                                           table tr td.header{
                                                font-size:x-small;
                                                border-right:1px solid #3892D3;
                                                border-bottom:1px solid #3892D3;
                                                padding-left:2px;
                                            }                                            
                                            table tr td.header:last-child{
                                                border-right:none;
                                            }
                                        </style><div>
                    <table cellspacing='0' cellpadding='0' border='0' width='100%'>
                    <tr>
                        <td width='10%' align='center' rowspan='2' class='header'>Mes</td>
                        <td width='10%' align='center' rowspan='2' class='header'>A&ntilde;o</td>
                        <td width='40%' align='center' colspan='2' class='header'>Vacaciones Acumuladas</td>                      
                        <td width='40%' align='center' colspan='2' class='header'>Vacaciones Utilizadas</td>                        
                    </tr>
                    <tr>
                        <td width='20%' align='center' class='header'>Dias</td>
                        <td width='20%' align='center' class='header'>Acumuladas</td>
                        <td width='20%' align='center' class='header'>Dias</td>
                        <td width='20%' align='center' class='header'>Importe</td>                 
                    </tr>";
            foreach($value as $valor){
               $html .= $valor; 
            }
            $html .= "</table></div>";
            $array[] = array('html'=>$html,'key'=>$key);
        } 

        $result = array('success' => true, 'results' => count($array), 'rows' => $array);
        return $result;
    }
    
    public function ValidateLoadData(&$params) {
        return true;
    }

    public function LoadData(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.vista_acumulado_vacaciones');

        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

// ========================================================================//
    
    public function DefinirVacaciones(&$params){
        return true;
    }
    
    public function ValidateDefinirVacaciones(&$params){
        return true;
    }
}

;
?>
