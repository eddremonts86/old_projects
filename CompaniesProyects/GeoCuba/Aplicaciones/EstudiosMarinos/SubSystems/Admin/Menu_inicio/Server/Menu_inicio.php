 <?PHP

class Menu_inicio extends Module {
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
        $_table = $this->_dbase->GetTable('app_security.inicio_menu_general');
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
                $datos=$this->_dbase->GetTable("app_security.menu_inicio");
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
       $datos=$this->_dbase->GetTable("app_security.menu_inicio");
       return $data=$datos->InsertValues(array(
           'titulo' => "'$name'",
           'orden' => "'$Orden'",
           'cuerpo' => "'$cuerpo_add'",
           'resumen' => "'$resumen_add'",
           'activo' => "'$Activo'"
       ));

    }
    // ========================================================================//
    public function ValidateModid(&$params){

        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_id'];
        $Orden=$params['orden'];
        $Activo=$params['Activo'];
        $resumen_add=$params['resumen_add'];
        $cuerpo_add=$params['cuerpo_add'];
        $ids=$params['id_Udt_id'];
        $datos=$this->_dbase->GetTable("app_security.menu_inicio");
        $datos->Update(array(
            'titulo' => "'$name'",
            'orden' => "'$Orden'",
            'cuerpo' => "'$cuerpo_add'",
            'resumen' => "'$resumen_add'",
            'activo' => "'$Activo'"),
            "id = '$ids'");
        return true;
    }

    public function Validateactive(&$params){return true;}
    public function active(&$params){
        $ids=$params['id'];
        $valor=$params['valor'];

        $datos=$this->_dbase->GetTable("app_security.menu_inicio");
        $datos->Update(array('activo' => "'$valor'"),"id = '$ids'");
        return true;
    }

};
?>
