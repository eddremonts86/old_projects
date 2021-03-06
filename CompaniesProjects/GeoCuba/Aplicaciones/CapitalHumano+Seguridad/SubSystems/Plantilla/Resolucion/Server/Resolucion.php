<?PHP

class Resolucion extends Module {
    public function  __construct() {
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
        $_table = $this->_dbase->GetTable('plantilla.resolucion');
        $_data = $_table->GetRange($_limit, $_start,"activo = 't'");
        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $files = array();
        if(!is_array($_data))
            $_data = array();
        foreach($_data as $dato){
            $info = pathinfo(($dato['nombre_file']));
            $dato['extension'] = $info['extension'];
            $files[] = $dato;
        }
        $result = array('success' => true, 'results' => $_count, 'rows' => $files);
        return $result;
    }
    // ========================================================================//
    public function ValidateEliminar(&$params) {
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $dir = trim($params['dir'].$params['nombre_file']);
//        print_r($dir);die;
        $nombre_file=$params['nombre_file'];
        $result=null;
        if ($id) {
            $cambio=chmod($_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion'.$dir,0777);
            $borrar=unlink($_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion'.$dir);
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
        $anno=$params['anno'];
        $nombre=$params['nombre_id'];
        $descrip=$params['descripcion'];

        $uploaddir = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/';
//        print_r($uploaddir);die;
        if(!is_dir ($uploaddir.$anno)){
            $mdr=mkdir($uploaddir.$anno, 0777);
        }
        $uploaddir = $_SESSION['APP_PATH'].'/SubSystems/'.$_SESSION['CUS'].'/Resolucion/Resoluciones/'.$anno.'/';

        $uploadfile = $uploaddir .basename($_FILES['fileup']['name']);
        $basedir="$uploadfile";
        $basename=$_FILES['fileup']['name'];

        if (!move_uploaded_file($_FILES['fileup']['tmp_name'], $uploadfile)) {
            $this->RegisterError('Error', 'El archivo '. $_FILES['fileup']['name'] . ' no pudo ser subido al servidor');
            return false;
        }
        else
        {  //Ingresar datos para la BD
            $datos=$this->_dbase->GetTable("plantilla.resolucion");
            $nom=$datos->GetValueBy('nombre',array('nombre'=>"'$nombre'",'anno'=>"'$anno'",'nombre_file'=>"'$basename'"));
            if($nom==''||$nom==null){
                $data=$datos->InsertValues(array('anno' => "'$anno'",'nombre' => "'$nombre'",'descripcion' => "'$descrip'",'dir' => "'/Resoluciones/$anno/'",'nombre_file' => "'$basename'"));
                if (is_null($data))
                    return false;
                else
                    return true;
            }
            else{
                $this->RegisterError('Error', 'El documento ya existe');
                return false;
            }
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
