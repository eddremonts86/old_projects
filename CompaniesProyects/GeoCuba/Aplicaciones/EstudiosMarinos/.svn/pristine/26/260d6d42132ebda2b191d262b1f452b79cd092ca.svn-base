 <?PHP

class Gallery extends Module {
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
        $_table = $this->_dbase->GetTable('app_security.galerias');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargartype(&$params) {
        return true;
    }
    public function Cargartype(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('app_security.gallery_type');
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
    public function ValidateEliminar(&$params) {

        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("app_security.themes");
                $result = $datos->DeleteWhere("id = '$id'");
                return true;
        }
        else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params){
        return true;
       }
    public function Add(&$params){
       $name=$params['nombre_id'];
       $Orden=$params['orden'];
       $Activo=$params['Activo'];
       $resumen_add=$params['resumen_add'];
       $cuerpo_add=$params['cuerpo_add'];
       $datos=$this->_dbase->GetTable("app_security.gallery");
       return $data=$datos->InsertValues(array(
           'titulo' => "'$name'",
           'orden' => "'$Orden'",
           'cuerpo' => "'$cuerpo_add'",
           'resumen' => "'$resumen_add'",
           'activo' => "'$Activo'"
       ));

    }
    public function ValidateAddType(&$params){
        return true;
    }
    public function AddType(&$params){
        $name=$params['nombre'];
        $datos=$this->_dbase->GetTable("app_security.gallery_type");
        return $data=$datos->InsertValues(array('typo' => "'$name'"));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        return true;
    }
    public function Modid(&$params){
        $ids=$params['id'];
        $discr=$params['discr'];
        $imagen = base64_encode(file_get_contents($_FILES['fileup_theme']['tmp_name']));
        $nombre_id=$params['nombre_id'];
        $dir=$params['dir'];
        $datos = $this->_dbase->GetTable("app_security.themes");
        $datos->Update(array('img'=>"'$imagen'",'discr'=>"'$discr'",'theme'=>"'$nombre_id'",'dir'=>"'$dir'"),"id = '$ids'");
        if ($datos)
            return true;
        else
            return false;
    }

    public function Validateactive(&$params){return true;}
    public function active(&$params){
        $ids=$params['id'];
        $valor=$params['valor'];
        $datos=$this->_dbase->GetTable("app_security.themes");
        $datos->Update(array('activador' => "'$valor'"),"id = '$ids'");
        return true;
    }

    public function Validatefoto(){return true;}
    public function foto(&$params){
        $imagen = base64_encode(file_get_contents($_FILES['fileup_theme']['tmp_name']));
        $nombre_id=$params['galeria_type'];
        $datos = $this->_dbase->GetTable("app_security.gallery");
        $data = $datos->InsertValues(array('img'=>"'$imagen'",'typo'=>"'$nombre_id'"));
        if ($data)
            return true;
        else
            return false;

    }

};
?>
