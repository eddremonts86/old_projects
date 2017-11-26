<?PHP

class Deduciones extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ch');
    }

    public function ValidateTomar_datos_generales(&$params)
    {
        return true;
    }
    public function Tomar_datos_generales(&$params)
    {
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_debitoytrabajadores');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarDatosDeducciones(&$params) {
        return true;
    }
    public function CargarDatosDeducciones(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id_trabaj = $params['id_trabaj'];
        $id_cont = $params['id_cont'];
        $_table = $this->_dbase->GetTable('vistas_resumen.salario_deduciones');
        $_data = $_table->GetRange($_limit, $_start,"id_contrato='$id_cont' and id_trabajador ='$id_trabaj' and activo = 'true'");
        $_count=$_table->GetRowsCount("id_contrato='$id_cont' and id_trabajador ='$id_trabaj' and activo = 'true'");
        if (is_null($_data))return false;
        if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    public function ValidateCargarDeducciones(&$params) {
        return true;
    }
    public function CargarDeducciones(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $id_trabaj = $params['id_trabaj'];
        $id_cont = $params['id_cont'];
        $_table = $this->_dbase->GetTable('salario.class_cuentas');
        $_data = $_table->GetRange($_limit, $_start);
        $_count=$_table->GetRowsCount();
        if (is_null($_data))return false;
        if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    // ========================================================================//
    public function ValidateTomar_datos(&$params)
    {
        return true;
    }
    public function Tomar_datos(&$params)
    {
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $agencia_Unidad = $params['combo_value_id'];
        $area = $params['combo_area_id'];

        $_table = $this->_dbase->GetTable('vistas_resumen.caorgos_unidad_general');

        if ($agencia_Unidad && !$area) {$_data = $_table->GetRange($_limit,$_start,"agenciaid = '$agencia_Unidad'");}
        elseif ($agencia_Unidad && $area) {$_data = $_table->GetRange($_limit,$_start,("agenciaid = '$agencia_Unidad' and  areaid ='$area'"));}

        if (is_null($_data))return false;
        $_count = $_table->GetRowsCount();
        if ($_count == -1)return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
    //tomo el nombre  del trabajador
    public function ValidateTomar_trabajador(&$params)
    {

        return true;
    }
    public function Tomar_trabajador(&$params)
    {
        $id = $params['id'];
        $consulta = "SELECT   trabajador.nombre ||' '|| trabajador.apellido_1 ||' '||   trabajador.apellido_2
FROM   plantilla.plantilla,   plantilla.trabajador
WHERE   plantilla.trabajadorid = trabajador.id and plantilla.listado_cargosid='$id'";
        $consult = $this->_dbase->Select($consulta);

        $_data = $consult->GetAll();
        if (!$_data) {
            $this->RegisterError('', "El Cargo seleccionado no ha sido asignado a ningún Trabajador.");
            return false;
        }

        $result = $_data[0]['?column?'];

        return $result;
    }
    public function ValidateCargarAreas(&$params)
    {

        return true;
    }
    public function CargarAreas(&$params)
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
    //cargo las agencias
    public function ValidateCargarDatos(&$params)
    {
        return true;
    }
    public function CargarDatos(&$params)
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
    // ========================================================================//
    public function ValidateEliminar(&$params)
    {
        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.plantilla");
        $count = $datos->Contains(array('listado_cargosid' => "'$id'"));
        if ($count > 0) {
            $this->RegisterError('Operación no válida', "El Cargos a eliminar esta siendo en plantilla.");
            return false;
        }

        return true;
    }
    public function Eliminar(&$params)
    {
        $id = $params['id'];
        $result = null;
        if ($id) {
//                $tabla=$this->_dbase->GetTable("plantilla.listado_cargos");
//                $idcargo=$tabla->GetValueWhere('cargoid',"id='$id'");

            $datos = $this->_dbase->GetTable("plantilla.listado_cargos");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");

//                $datos=$this->_dbase->GetTable("plantilla.cargo");
//                $result = $datos->DeleteWhere("id = '$idcargo'");

            return true;
        } else return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params)
    {

        return true;
    }
    public function Add(&$params)
    {
        $id = $params['id'];
        $nombre_cargo = $params['cargo'];
        $area = $params['area'];
        //escala del cargo
        //$escala=$params['escala'];

        //tomo  el id  del cargo
        $tabla = $this->_dbase->GetTable("plantilla.listado_cargos");
        $idcargo = $tabla->GetValueWhere('cargoid', "id='$id'");
        //tomo su norma juridica
        $tabla = $this->_dbase->GetTable("plantilla.cargo");
        $norma_juridicaid = $tabla->GetValueWhere('norma_juridicaid', "id='$idcargo'");
        //tomo su catocup
        $tabla = $this->_dbase->GetTable("plantilla.cargo");
        $categoria_ocupacionalid = $tabla->GetValueWhere('categoria_ocupacionalid', "id='$idcargo'");
        //tomo su nivel_preparacion
        $tabla = $this->_dbase->GetTable("plantilla.cargo");
        $nivel_preparacionid = $tabla->GetValueWhere('nivel_preparacionid', "id='$idcargo'");
        //tomo su clasificacion
        $tabla = $this->_dbase->GetTable("plantilla.cargo");
        $clasificacionid = $tabla->GetValueWhere('clasificacion_d_iid', "id='$idcargo'");
        //tomo el id de la escala
        $tabla = $this->_dbase->GetTable("plantilla.cargo");
        $grupo_escalaid = $tabla->GetValueWhere('grupo_escalaid', "id='$idcargo'");

        $datos = $this->_dbase->GetTable("plantilla.cargo");
        $data = $datos->InsertValues(array('norma_juridicaid' => "'$norma_juridicaid'",
            'categoria_ocupacionalid' => "'$categoria_ocupacionalid'"
        , 'nivel_preparacionid' => "'$nivel_preparacionid'",
            'clasificacion_d_iid' => "'$clasificacionid'", 'grupo_escalaid' => "'$grupo_escalaid'"
        , 'nombre' => "'$nombre_cargo'"));

        //tomo  la resolucion
        $tabla = $this->_dbase->GetTable("plantilla.listado_cargos");
        $resolucionid = $tabla->GetValueWhere('resolucionid', "id='$id'");
        //tomo  la  cantidad de plazas
        $tabla = $this->_dbase->GetTable("plantilla.listado_cargos");
        $cantidad_plazas = $tabla->GetValueWhere('cantidad_plazas', "id='$id'");
        //tomo el area
        $tabla = $this->_dbase->GetTable("plantilla.listado_cargos");
        $areaid = $tabla->GetValueWhere('areaid', "id='$id'");

        $datos = $this->_dbase->GetTable("plantilla.listado_cargos");
        return $data = $datos->InsertValues(array('areaid' => "'$areaid'", 'cargoid' => "'$idcargo'"
        , 'resolucionid' => "'$resolucionid'", 'cantidad_plazas' => "'$cantidad_plazas'"));
    }
    // ========================================================================//
    public function ValidateModif(&$params)
    {

        if (!isset($params['nombre_id_upd']) && !isset($params['numero_id_upd']) && !isset($params['combo_value_id_upd'])) {
            $this->RegisterError('Parámetro incorrecto', "Parámetro no definido o nulo.");
            return false;
        }
        $nombre = $params['nombre_id_upd'];
        $numero = $params['numero_id_upd'];
        $combo = $params['combo_value_id_upd'];

        $nombre = trim($nombre);
        $numero = trim($numero);
        $combo = trim($combo);

        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del Puesto por Área incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($numero, 1);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($combo, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la condecoración incorrecto.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($numero);
        $params['new_nombre'] = $nombre;

        $old_nombre = $params['old_name'];
        $actividades = $this->_dbase->GetTable('nomencladores.Puestos_trabajo_por_area');
        $count = $actividades->Contains(array('nombre' => "'$nombre'"));
        if ($count == 0) {
            return true;
        } elseif ($old_nombre == $nombre) {
            // $this->RegisterError('Operación no válida', "El nombre '$nombre' ya existe.");
            return true;
        } else {
            $this->RegisterError('Operación no válida', "El nombre '$nombre' ya existe.");
            return false;
        }
        return true;
    }
    public function Modif(&$params)
    {

        $nameold = $params['old_name'];
//        $datos=$this->_dbase->GetTable("nomencladores.Puestos_trabajo_por_area");
//        $result = $datos->DeleteWhere("id = '$nameold'");
        $name = $params['nombre_id_upd'];
        $number = $params['numero_id_upd'];
        $anno = $params['combo_value_id_upd'];
        $tabla = $this->_dbase->GetTable("nomencladores.empresa");
        $idanno = $tabla->GetValueWhere('id', "nombre='$anno'");
        $datos = $this->_dbase->GetTable("nomencladores.Puestos_trabajo_por_area");
        return $data = $datos->Update(array('empresaid' => "'$idanno'", 'codigo' => "'$number'", 'nombre' => "'$name'"), "nombre='$nameold'");


    }

    public function Validateadd_decd(&$params){return true;}
    public function add_decd(&$params){
        $data = json_decode($params['data']);
        $trabaj = $params['id_trabaj'];
        $contrato = $params['id_cont'];
        $datos=$this->_dbase->GetTable("salario.deducciones");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->id;
            $primera = $data[$i]->primera;
            $descuento = $data[$i]->descuento;
            $segunda = $data[$i]->segunda;
            $datos->InsertValues(array('primera' => "'$primera'",
                                       'id_deduccion' => "'$id'",
                                       'descuento' => "'$descuento'",
                                       'segunda' => "'$segunda'",
                                       'id_trabajador' => "'$trabaj'",
                                       'id_contrato' => "'$contrato'"
            ));

        }
        return true;
    }

    public function Validateupd_decd(&$params){return true;}
    public function upd_decd(&$params){
        $data = json_decode($params['data']);

        $datos=$this->_dbase->GetTable("salario.deducciones");
        for($i=0;$i<count($data);$i++)
        {
            $id = $data[$i]->id;
            $primera = $data[$i]->primera;
            $descuento = $data[$i]->descuento;
            $segunda = $data[$i]->segunda;
            $datos->Update(array( 'descuento' => "'$descuento'",'segunda' => "'$segunda'",'primera' => "'$primera'"),"id = '$id'");

        }
        return true;
    }

    public function Validatedel_decd(&$params){return true;}
    public function del_decd(&$params){
        $id = $params['id'];
        $datos=$this->_dbase->GetTable("salario.deducciones");
        $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
        return true;
    }


};?>