<?PHP
require_once(realpath(''.dirname(__FILE__)).'' . '/Classes/PHPExcel/IOFactory.php');
class Resolucion extends Module {
    public function  __construct() {
        parent::__construct('common.ark');
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
        $_table = $this->_dbase->GetTable('gestion.historial_marea');
        $_data = $_table->GetRange($_limit, $_start);

        if (is_null($_data))
            return false;
        $_count =$_table->GetRowsCount() ;
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarDatosLugar(&$params) {
        return true;
    }
    public function CargarDatosLugar(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.lugar');
        $_data = $_table->GetRange($_limit, $_start);

        if (is_null($_data))
            return false;
        $_count =$_table->GetRowsCount() ;
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
        $dir = trim($params['dir'].$params['nombre_file']);
        $nombre_file=$params['nombre_file'];
        $result=null;
        if ($id) {
            $cambio=chmod($dir,0777);
            $borrar=unlink($dir);
            $datos=$this->_dbase->GetTable("plantilla.resolucion");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        }
        else
            return false;
    }
    // ========================================================================//
    public function ValidateAdicionar(){
        return true;
    }
    public function Adicionar(&$params) {
        // Get parameters
        $anno='2013';
        $lugar=$params['Lugar'];
        $uploaddir = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/';
        if(!is_dir ($uploaddir.$anno)){$mdr=mkdir($uploaddir.$anno, 0777);}
        $uploaddir = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/'.$anno.'/';
        $uploadfile = $uploaddir .basename($_FILES['fileup']['name']);
        $basedir="$uploadfile";
        $basename=$_FILES['fileup']['name'];
        if (!move_uploaded_file($_FILES['fileup']['tmp_name'], $uploadfile)) {
            $this->RegisterError('Error', 'El archivo '. $_FILES['fileup']['name'] . ' no pudo ser subido al servidor');
            return false;
        }
        else
        {
            $datos=$this->_dbase->GetTable("gestion.historial_marea");
            //print_r($basedir);die;
            $objPHPExcel = PHPExcel_IOFactory::load($basedir);
            $objWorksheet = $objPHPExcel->getActiveSheet();
            $highestRow = $objWorksheet->getHighestRow();
            $highestColumn = $objWorksheet->getHighestColumn();
            $highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn); //Cantidad de columnas del excel
           $fecha = '';
           $aux = '';
           for ($row = 2; $row <= $highestRow; ++$row) {
               $fecha = $objWorksheet->getCellByColumnAndRow(0, $row)->getValue();
                if (!empty($fecha))
                    $aux = $fecha;  //Si no cambia de o0rigen se mantiene el mismo
                $hora = $objWorksheet->getCellByColumnAndRow(1, $row)->getValue();
                $altura = $objWorksheet->getCellByColumnAndRow(2, $row)->getValue();
                $direccion = $objWorksheet->getCellByColumnAndRow(3, $row)->getValue();
                $velocidad = $objWorksheet->getCellByColumnAndRow(4, $row)->getValue();
                $propertyValue = date('Y-m-d',strtotime('1900-01-01 + '.($aux-2).' day'));
                $fecha1= $propertyValue;
               if (!empty($altura) && !empty($fecha1)){
                   //Se chequea que el registro completo no este vacío
                   $hora = $hora*24;
                   $data=$datos->InsertValues(array('fecha' => "'$fecha1'",'hora' => "'$hora'",
                                                    'altura' => "'$altura'",'direccion' => "'$direccion'",
                                                    'velocidad' => "'$velocidad'",'lugar' => "'$lugar'"));
                }
            }
            unlink($basedir); //Borramos el fichero del lugar al que fue movido al servidor
            if (is_null($data)) return false;
            else return true;
           }


    }
    // ========================================================================//
    public function ValidateModid(&$params){

        if (!isset($params['nombre_Udt_id'])||!isset($params['id_tpo'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_Udt_id'];
        $id = $params['id_tpo'];

        $nombre = trim($nombre);
        $id = trim($id);

        $_valid = Validator::CheckStringSize($id, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Resolución incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        $actividades = $this->_dbase->GetTable('nomencladores.talla');
        $count = $actividades->Contains(array('valor' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "La Resolución '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){
        $anno=$params['anno'];
        $anno_old=$params['anno_old'];
        $nombre=$params['nombre_Udt_id'];
        $descripcion_mod=$params['descripcion_mod'];
        $id_tpo=$params['id_tpo'];
        $nombre_file=$params['nombre_file'];
        if($anno==$anno_old)
        {
            $datos=$this->_dbase->GetTable("plantilla.resolucion");
            $datos->Update(array('nombre' => "'$nombre'",'descripcion' => "'$descripcion_mod '"),"id = '$id_tpo'");
            return true;
        }
        else{
            $_result =$this->_dbase->Select("SELECT resolucion.anno FROM plantilla.resolucion WHERE resolucion.anno = '".$anno."'");
            if(!isset($_result)){
                $uploaddir = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/'.$anno.'/'.$nombre_file.'';
                print_r($uploaddir);die;
                $uploaddir_old = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/'.$anno_old.'/'.$nombre_file.'';
                $uploaddirCopiada = '/Resoluciones/'.$anno.'/';
                rename($uploaddir_old, $uploaddir);
                $datos=$this->_dbase->GetTable("plantilla.resolucion");
                $datos->Update(array('nombre' => "'$nombre'",'anno' => "'$anno'",'dir'=>"'$uploaddirCopiada'",'descripcion' => "'$descripcion_mod '"),"id = '$id_tpo'");
                print_r("Si exite en BD");die;

            }else{
                $uploaddir = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/';
                if(!is_dir ($uploaddir.$anno)){
                    $mdr = mkdir($uploaddir.$anno, 0777);                    
                }
                $uploaddir = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/'.$anno.'/'.$nombre_file.'';
                $uploaddir_old = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/'.$anno_old.'/'.$nombre_file.'';
                $uploaddirCopiada = '/Resoluciones/'.$anno.'/';
                rename($uploaddir_old, $uploaddir);
                $datos=$this->_dbase->GetTable("plantilla.resolucion");
                $datos->Update(array('nombre' => "'$nombre'",'anno' => "'$anno'",'dir'=>"'$uploaddirCopiada'",'descripcion' => "'$descripcion_mod '"),"id = '$id_tpo'");
                print_r("No exite en BD");die;
                print_r($uploaddir);die;
            }
        }
        return true;
    }
    //=============================================================================================//

};
?>