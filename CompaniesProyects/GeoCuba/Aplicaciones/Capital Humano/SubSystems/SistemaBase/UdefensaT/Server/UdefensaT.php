 <?PHP
include 'TreeExtJs.php';
class UdefensaT extends Module {

        public function  __construct() {
            parent::__construct('common.ch');
    }

//=====================================================================================================================
    public function ValidateTreeAdd(){return true;}
    public function TreeAdd(){
        $treeConect = $this->_dbase->GetTable('nomencladores.ubicacion_defensa_tipo');
        $result=$treeConect->GetAll('activo = true','ubicacion_defensa_tipoid desc');
        $data = array();
        $datavariable=array();
        $datos=array();
        $leaf='false';
        foreach($result as $row)
        {array_push($data,array(
            "id" => $row["id"],
            "text" => $row["nombre"],
            "idParent" => $row["ubicacion_defensa_tipoid"],
            "leaf"=>$row[$leaf]
           ));
        }
        for($i=0;$i<count($data);$i++)
        {if ($data[$i]['idParent']==null)
            {
             $datos[0]=$data[$i];
            }
            else{
             $data[$i]['leaf']=true;
                $datos[$i]=$data[$i];
            }
        }
       /* for($i=0;$i<count($data);$i++)
        {if ($data[$i]['idParent']!= null)
        {

        }
        }

        /*$tree = new TreeExtJS();
        for($i=0;$i<count($data);$i++){
            $category = $data[$i];
            $tree->addChild($category,$category["idParent"]);
        }*/
       return $datos;
    }
//=====================================================================================================================
    public function ValidateCargarDatos(&$params) {
        return true;
    }
    public function CargarDatos(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.ubicacion_defensa_tipo');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }


//=====================================================================================================================
    public function ValidateEliminar(&$params) {
        $id=$params['id'];
        $datos=$this->_dbase->GetTable("nomencladores.ubicacion_defensa_tipo");
        $count = $datos->Contains(array('ubicacion_defensa_tipoid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Tipo de Ubicación de la Defensa a eliminar está siendo usado por Ubicación de la Defensa.");
            return false;
        }
        return true;
    }
    public function Eliminar(&$params) {
        $id = $params['id'];
        $result=null;
            if ($id) {
                $datos=$this->_dbase->GetTable("nomencladores.ubicacion_defensa_tipo");
                $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
                return true;
        }
        else return false;
    }
//=====================================================================================================================
    public function ValidateAdd(&$params){

        if (!isset($params['nombre_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_id'];

        $nombre = trim($nombre);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Tipo de Ubicación de la Defensa incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;


        $actividades = $this->_dbase->GetTable('nomencladores.ubicacion_defensa_tipo');
        /*$count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Tipo de Ubicación de la Defensa '$nombre' ya existe.");
            return false;
        }*/
        return true;
       }
    public function Add(&$params){
       $name=$params['nombre_id'];
        $datosUBT=$params['datos_UBT_id'];
       if ($datosUBT == '')
            {
             $datos=$this->_dbase->GetTable("nomencladores.ubicacion_defensa_tipo");
             $_count = $datos->Contains(array("nombre"=> "'Unidades de Defensa'"));
             if($_count == 0){
                $data=$datos->InsertValues(array('nombre' => "'Unidades de Defensa'"));
                $idBase=$datos->GetFirstValue("id","nombre = 'Unidades de Defensa'");
                $data=$datos->InsertValues(array('nombre' => "'$name'",'ubicacion_defensa_tipoid' => "'$idBase'"));
                return "1";
             }
             else{
                $idBase=$datos->GetFirstValue("id","nombre = 'Unidades de Defensa'");
                $data=$datos->InsertValues(array('nombre' => "'$name'",'ubicacion_defensa_tipoid' => "'$idBase'"));
                 return "2";
             }
            }
        else{
           $datos=$this->_dbase->GetTable("nomencladores.ubicacion_defensa_tipo");
           $data=$datos->InsertValues(array('nombre' => "'$name'",'ubicacion_defensa_tipoid' => "'$datosUBT'"));
           return "3";
            }
     }
//=====================================================================================================================
    public function ValidateModid(&$params){

        if (!isset($params['nombre_Udt_id'])||!isset($params['id_Udt_id'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }

        $nombre = $params['nombre_Udt_id'];
        $id = $params['id_Udt_id'];

        $nombre = trim($nombre);
        $id = trim($id);

        $_valid = Validator::CheckStringSize($id, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Tipo de Ubicación de la Defensa incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        $params['new_nombre'] = $nombre;

        Validator::ToCleanSQL($id);
        $params['new_nombre'] = $id;

        $actividades = $this->_dbase->GetTable('nomencladores.ubicacion_defensa_tipo');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));

        if ($count < 0)
            return false;

        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El Tipo de Ubicación de la Defensa '$nombre' ya existe.");
            return false;
        }

        return true;
    }
    public function Modid(&$params){
        $name=$params['nombre_Udt_id'];
        $ids=$params['id_Udt_id'];
        $datosUBT=$params['datos_UBT_id'];
        $datos=$this->_dbase->GetTable("nomencladores.ubicacion_defensa_tipo");
        $datos->Update(array('nombre' => "'$name'",'ubicacion_defensa_tipoid' => "'$datosUBT'"),"id = '$ids'");
        return true;
    }
//=====================================================================================================================
};
?>
