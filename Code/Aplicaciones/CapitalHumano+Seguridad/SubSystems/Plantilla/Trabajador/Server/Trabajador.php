<?PHP

class Trabajador extends Module
{
    public function  __construct()
    {
        parent::__construct('common.ch');
    }

    // ========================================================================//

    public function ValidateCargarDatos_mbaja(&$params) {
        return true;
    }
    public function CargarDatos_mbaja(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.m_bajas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function Validateespecialidad(&$params) {
        return true;
    }
    public function especialidad(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.especialidades');
        $_data = $_table->GetRange($_limit, $_start,'activo = true');
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarDatos_dbajas(&$params) {
        return true;
    }
    public function CargarDatos_dbajas(&$params) {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.dbajas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    public function ValidateCargarFilter(&$params)
    {
        return true;
    }
    public function CargarFilter(&$params){
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $campo = $params['campo'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_vista');
        $_data = $_table->GetRange($_limit, $_start,"upper(translate(nombre::text,'áéíóúñÑÁÉÍÓÚäëïöüÄËÏÖÜ','aeiounNAEIOUaeiouAEIOU')) like upper(translate('%".$campo."%','áéíóúñÑÁÉÍÓÚäëïöüÄËÏÖÜ','aeiounNAEIOUaeiouAEIOU'))");
        $_count=$_table->GetRowsCount();
        if (is_null($_count))
            return false;
        $_count = count($_count);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }
//cargar Trabajador Inativo
    public function Validatetrabajador_inactivo(&$params)
    {
        return true;
    }

    public function trabajador_inactivo(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_vista_inact');
       /* $_data = $_table->GetAll('activo = false');*/
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
         $_count = $_table->GetRowsCount();
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

//Cargar Codigo
    public function ValidateCargarCodigo()
    {
        return true;
    }

    public function CargarCodigo()
    {
        $_data_result = $this->_dbase->Select("SELECT trabajador.codigo AS codigo FROM plantilla.trabajador ORDER BY trabajador.codigo DESC; ");
        $_data_result1 = $_data_result->getAll();
        $tabla = $this->_dbase->GetTable('plantilla.trabajador');
        $couenter = $tabla->GetRowsCount();
        // print_r($couenter);die;
        if ($couenter == 0) {
            $data = 1000;
            $result = array('success' => true, 'rows' => $data);
            return $result;
        } else {

            $data = $_data_result1[0]['codigo'] + 1;
            $result = array('success' => true, 'rows' => $data);
            return $result;
        }

    }

    //Cargo el sexo
    public function ValidateCargarSexo(&$params)
    {
        return true;
    }

    public function CargarSexo(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.sexo_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargar Motivo debaja
    public function ValidateMbaja(&$params)
    {
        return true;
    }

    public function Mbaja(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.mbajas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargar Destinos de baja
    public function Validatedbaja(&$params)
    {
        return true;
    }

    public function dbaja(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('nomencladores.dbajas');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo el color de piel
    public function ValidateCargarcolor_de_piel(&$params)
    {
        return true;
    }

    public function Cargarcolor_de_piel(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.color_de_piel_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

//cargo los valores tallas camisa_blusa
    public function ValidateCargartallas_camisas_blusas(&$params)
    {
        return true;
    }

    public function Cargartallas_camisas_blusas(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.talla_camisablusa_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo los valores tallas pantalon_salla
    public function ValidateCargartallas_pantalon_salla(&$params)
    {
        return true;
    }

    public function Cargartallas_pantalon_salla(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.talla_pantalonsaya_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo los valores tallas zapato
    public function ValidateCargartallas_zapato(&$params)
    {
        return true;
    }

    public function Cargartallas_zapato(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.talla_zapato_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

//cargo los repartos
    public function ValidateCargarrepartos(&$params)
    {
        return true;
    }

    public function Cargarrepartos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.reparto_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo lugar de procedencia
    public function ValidateCargarlugar_de_procedencia(&$params)
    {
        return true;
    }

    public function Cargarlugar_de_procedencia(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.lugar_procedencia_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo nivel cultural
    public function ValidateCargarnivel_cultural(&$params)
    {
        return true;
    }

    public function Cargarnivel_cultural(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_data_result =
            $this->_dbase->Select("SELECT
  nivel_cultural.nombre,
  nivel_cultural.id
FROM
  nomencladores.nivel_cultural", $_limit, $_start);
        $_data =
            $_data_result->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo integracion
    public function ValidateCargarintegracion(&$params)
    {
        return true;
    }

    public function Cargarintegracion(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_data_result =
            $this->_dbase->Select("SELECT
  integracion.nombre,
  integracion.id
FROM
  nomencladores.integracion", $_limit, $_start);
        $_data =
            $_data_result->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo ubicacion_exepcional
    public function ValidateCargarubicacionexep(&$params)
    {
        return true;
    }

    public function Cargarubicacionexep(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_data_result =
            $this->_dbase->Select("SELECT
  ubicacion_excepcional.id,
  ubicacion_excepcional.nombre
FROM
  nomencladores.ubicacion_excepcional", $_limit, $_start);
        $_data =
            $_data_result->GetAll();
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargo registro militar
    public function ValidateCargarregistro(&$params)
    {
        return true;
    }

    public function Cargarregistro(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.registro_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //Cargar estado civil
    public function ValidateCargarestado_civil(&$params)
    {
        return true;
    }

    public function Cargarestado_civil(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];
        $_table = $this->_dbase->GetTable('vistas_resumen.estado_civil_vista');
        $_data = $_table->GetRange($_limit, $_start);
        if (is_null($_data))
            return false;
        $_count = count($_data);
        if ($_count == -1)
            return false;
        $result = array('success' => true, 'results' => $_count, 'rows' => $_data);
        return $result;
    }

    //cargar trabajadores
    public function ValidateCargarDatos(&$params)
    {

        return true;
    }

    public function CargarDatos(&$params)
    {
        $_data = array();
        $_count = 0;
        $_start = ($params['start']) ? $params['start'] : 0;
        $_limit = $params['limit'];

        $_table = $this->_dbase->GetTable('vistas_resumen.trabajador_vista');
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
    public function ValidateEliminar(&$params)
    {
        $id = $params['id'];
        $datos = $this->_dbase->GetTable("plantilla.trabajador_condecoracion");
        $count = $datos->Contains(array('trabajadorid' => "'$id'"));
        if ($count > 0) {
            $datos->Update(array('activo' => "'false'"), "trabajadorid = '$id'");
            //return false;
        }
        $datos = $this->_dbase->GetTable("plantilla.ubicacion_defensa");
        $count = $datos->Contains(array('trabajadorid' => "'$id'"));
        if ($count > 0) {
            $datos->Update(array('activo' => "'false'"), "trabajadorid = '$id'");
            //return false;
        }

        $datos = $this->_dbase->GetTable("pago.contrato");
        $count = $datos->Contains(array('trabajadorid' => "'$id'"));
        $all = $datos->GetAll("trabajadorid = '$id'");
        //var_dump($all);die;
        $plan = $this->_dbase->GetTable("plantilla.plantilla");
        $LC = $this->_dbase->GetTable("plantilla.listado_cargos");

        if ($count > 0) {
            $datos->Update(array('activo' => "'false'"), "trabajadorid = '$id'");
            for ($i=0;$i<count($all);$i++)
            {
                $idcon=$all[$i]['id'];
                $lcargo=$all[$i]['listado_cargosid'];
                $datasaa = $LC->Update(array('existencia' => 'existencia + 1'),"id = '$lcargo'");
                $plan->Update(array('activo' => "'false'"), "contratoid = '$idcon'");

            }
        }
        $datos = $this->_dbase->GetTable("plantilla.oficial");
        $count = $datos->Contains(array('trabajadorid' => "'$id'"));
        if ($count > 0) {
            $datos->Update(array('activo' => "'false'"), "trabajadorid = '$id'");
        }
        return true;
    }

    public function Eliminar(&$params)
    {
        $id = $params['id'];
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("plantilla.trabajador");
            $result = $datos->Update(array('activo' => "'false'"), "id = '$id'");
            return true;
        } else return false;
    }


    // ========================================================================//
    public function ValidateActivar(&$params)
    {return true;}

    public function Activar(&$params)
    {
        $id = $params['id'];
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("plantilla.trabajador");
            return $data = $datos->Update(array('activo' => "'true'"), "id = '$id'");

        } else return false;
    }

    public function ValidateDesActivar(&$params)
    {return true;}

    public function DesActivar(&$params)
    {
        $id = $params['id'];
        $result = null;
        if ($id) {
            $datos = $this->_dbase->GetTable("plantilla.trabajador");
            return $data = $datos->Update(array('activo' => "'false'"), "id = '$id'");

        } else
            return false;
    }
    // ========================================================================//
    public function ValidateAdd(&$params)
    {
//        if (!isset($params['nombre_id'])||!isset($params['Direccion'])||!isset($params['Peso'])
//            ||!isset($params['Telefono'])||!isset($params['cod_nomina'])||!isset($params['estatura'])
//            ||!isset($params['identidad'])||!isset($params['PrimerApellido'])||!isset($params['SegundoApellido'])
//            ||!isset($params['madre'])||!isset($params['padre'])||!isset($params['combo_sexo_id'])||!isset($params['combo_estadicivil_value_id'])
//            ||!isset($params['combo_cpiel_value_id'])||!isset($params['combo_reparto_value_id'])||!isset($params['combo_lugarproced_value_id'])
//            ||!isset($params['combo_ncultural_value_id'])||!isset($params['combo_ubicacion_value_id'])||!isset($params['combo_integracion_value_id'])
//            ||!isset($params['combo_registro_value_id'])||!isset($params['combo_talla_camisa_value_id'])||!isset($params['combo_talla_pantalon_value_id'])
//            ||!isset($params['combo_talla_zapato_value_id']))

        $name = $params['nombre_id'];
        $codigo = $params['codigo_id'];
        $direccion = $params['Direccion'];
        $peso = $params['Peso'];
        $telefono = $params['Telefono'];
        $cod_nomina = $params['cod_nomina'];
        $estatura = $params['estatura'];
        $identidad = $params['identidad'];
        $papellido = $params['PrimerApellido'];
        $sapellido = $params['SegundoApellido'];
        $madre = $params['madre'];
        $padre = $params['padre'];

        $fecha_inicio = $params['fecha_inicio'];
        $meses = $params['meses'];

        $sexo = $params['combo_sexo_id'];
        $ecivil = $params['combo_estadicivil_value_id'];
        $cpiel = $params['combo_cpiel_value_id'];
        $reparto = $params['combo_reparto_value_id'];
        $procedencia = $params['combo_lugarproced_value_id'];
        $ncultural = $params['combo_ncultural_value_id'];
        $ubicacion = $params['combo_ubicacion_value_id'];
        $integracion = $params['combo_integracion_value_id'];
        $registro = $params['combo_registro_value_id'];
        $tallacami_blusa = $params['combo_talla_camisa_value_id'];
        $tall_pantalon_sall = $params['combo_talla_pantalon_value_id'];
        $tall_zapato = $params['combo_talla_zapato_value_id'];
        $fnacimiento = $params['fecha_nacimiento'];
        $sancionado = $params['Sancionado'];

        $fecha_inicio = trim($fecha_inicio);
        $meses = trim($meses);
        $nombre = trim($name);
        $codigo = trim($codigo);
        $direccion = trim($direccion);
        $peso = trim($peso);
        $telefono = trim($telefono);
        $cod_nomina = trim($cod_nomina);
        $identidad = trim($identidad);
        $papellido = trim($papellido);
        $sapellido = trim($sapellido);
        $madre = trim($madre);
        $padre = trim($padre);

        $_valid = Validator::CheckStringSize($fecha_inicio, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Fecha de inicio incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($meses, 0, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Meses incorrecto.");
            return false;
        }
//print_r('sin lio');die;
        if ($codigo == "") {
            $this->RegisterError('Parámetro incorrecto', "Código incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($codigo, 1, 10);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Código incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($papellido, 3, 11);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Primer primer apellido  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($sapellido, 3, 11);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Segundo segundo apellido incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($identidad, 11, 11);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Carnet de Identidad  incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($peso, 2, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Peso incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($cpiel, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Color de Piel incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($sexo, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Sexo  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($estatura, 2, 4);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Estatura  incorrecta.");
            return false;
        }
        $_valid = Validator::CheckStringSize($ecivil, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Estado Civil incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($fnacimiento, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Fecha de Nacimiento incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($telefono, 4, 15);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Teléfono  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($reparto, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Reparto incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($direccion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Dirección  incorrecta.");
            return false;
        }
        $_valid = Validator::CheckStringSize($ncultural, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nivel Cultural incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($madre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la madre incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($padre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del padre incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($procedencia, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Procedencia incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($registro, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Registro incorrecto.");
            return false;
        }
        
        if ($sancionado == "") {
            $this->RegisterError('Parámetro incorrecto', "Sancionado incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($tallacami_blusa, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Talla de Camisa/Blusa incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($tall_pantalon_sall, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Talla de Pantalón/Saya incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($tall_zapato, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Talla de Zapato incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($cod_nomina, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Código de Nómina  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($integracion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Integración incorrecta.");
            return false;
        }
        $_valid = Validator::CheckStringSize($ubicacion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Ubicación incorrecta.");
            return false;
        }


        $_valid = Validator::CheckStringSize($padre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del padre incorrecto.");
            return false;
        }


        Validator::ToCleanSQL($codigo);
        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($direccion);
        Validator::ToCleanSQL($peso);
        Validator::ToCleanSQL($telefono);
        Validator::ToCleanSQL($cod_nomina);
        Validator::ToCleanSQL($identidad);
        Validator::ToCleanSQL($papellido);
        Validator::ToCleanSQL($sapellido);
        Validator::ToCleanSQL($madre);
        Validator::ToCleanSQL($padre);

        Validator::ToCleanSQL($fecha_inicio);
        Validator::ToCleanSQL($meses);
        /*$nombre = trim($name);
        $direccion = trim($direccion);
        $peso = trim($peso);
        $telefono = trim($telefono);
        $cod_nomina = trim($cod_nomina);
        $identidad = trim($identidad);
        $papellido = trim($papellido);
        $sapellido = trim($sapellido);
        $madre = trim($madre);
        $padre = trim($padre);*/

        //$params['new_nombre'] = $nombre;
        $actividades = $this->_dbase->GetTable('plantilla.trabajador');
        $count = $actividades->Contains(array('no_identidad' => "'$identidad'"));
        if ($count < 0)
            return false;
        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El no_identidad '$identidad' ya existe.");
            return false;
        }
        $Codigos = $this->_dbase->GetTable('plantilla.trabajador');
        $count = $actividades->Contains(array('codigo' => "'$codigo'"));
        if ($count < 0)
            return false;
        elseif ($count > 0) {
            $this->RegisterError('Operación no válida', "El codigo '$codigo' ya existe.");
            return false;
        }
        return true;
    }

    public function Add(&$params)
    {

        $fecha_inicio = $params['fecha_inicio'];
        $meses = $params['meses'];
        $name = $params['nombre_id'];
        $idsexo = $params['combo_sexo_id'];
        $idestado_civil = $params['combo_estadicivil_value_id'];
        $idcolorpiel = $params['combo_cpiel_value_id'];
        $idreparto = $params['combo_reparto_value_id'];
        $idlugar_procedencia = $params['combo_lugarproced_value_id'];
        $idnivel_cultural = $params['combo_ncultural_value_id'];
        $iubicacion_excepcional = $params['combo_ubicacion_value_id'];
        $idintegracion = $params['combo_integracion_value_id'];
        $idregistro_militar = $params['combo_registro_value_id'];

        $talla_camisa = $params['combo_talla_camisa_value_id'];
        $talla_pantalon = $params['combo_talla_pantalon_value_id'];
        $talla_zapato = $params['combo_talla_zapato_value_id'];

        $direccion = $params['Direccion'];
        $sancion = 0;
        if ($params['Sancionado'] == 1) {
            $sancion = 1;
        } else {
            $sancion = 0;
        }
        $peso = $params['Peso'];
        $telefono = $params['Telefono'];
        $cod_nomina = $params['cod_nomina'];
        $estatura = $params['estatura'];
        $identidad = $params['identidad'];
        $papellido = $params['PrimerApellido'];
        $fnacimiento = $params['fecha_nacimiento'];
        $sapellido = $params['SegundoApellido'];
        $madre = $params['madre'];
        $padre = $params['padre'];
        $codigo = $params['codigo_id'];
        $defensa = $params['defensa'];
        $especialidad = $params['especialidad'];
        $nombre_completo= $name." ".$papellido." ".$sapellido;
        $imagen = base64_encode(file_get_contents($_FILES['fileup']['tmp_name']));

        $datos = $this->_dbase->GetTable("plantilla.trabajador");
        $data = $datos->InsertValues(array(
            'codigo_nomina' => "'$cod_nomina'",
            'nombre_completo' => "'$nombre_completo'",
            'no_identidad' => "'$identidad'",
            'nombre' => "'$name'",
            'apellido_1' => "'$papellido'",
            'apellido_2' => "'$sapellido'",
            'fecha_nacimiento' => "'$fnacimiento'",
            'nombre_padre' => "'$padre'",
            'estado_civilid' => "'$idestado_civil'",
            'sexoid' => "'$idsexo'",
            'color_pielid' => "'$idcolorpiel'",
            'estatura' => "'$estatura'",
            'peso' => "'$peso'",
            'talla_camisa_blusa' => "'$talla_camisa'",
            'talla_pantalon_saya' => "'$talla_pantalon'",
            'talla_zapato' => "'$talla_zapato'",
            'telefono' => "'$telefono'",
            'repartoid' => "'$idreparto'",
            'lugar_procedenciaid' => "'$idlugar_procedencia'",
            'direccion' => "'$direccion'",
            'nivel_culturalid' => "'$idnivel_cultural'",
            'integracionid' => "'$idintegracion'",
            'ubicacion_excepcionalid' => "'$iubicacion_excepcional'",
            'sancionado' => "'$sancion'",
            'registro_militarid' => "'$idregistro_militar'",
            'codigo' => "'$codigo'",
            'especialidad_id' => "'$especialidad'",
            'nombre_madre' => "'$madre'",
            'tiempo' => "'$meses'",
            'fecha_inicio' => "'$fecha_inicio'",
            'foto'=>"'$imagen'"));

        $gege=$datos->GetAll("nombre_completo = '$nombre_completo'");
        $idtrba=$gege[0]['id'];
        $datos1 = $this->_dbase->GetTable("plantilla.ubicacion_defensa");
        $datos1 = $datos1->InsertValues(array('trabajadorid'=>"'$idtrba'",'ubicacion_defensa_tipoid'=>"'$defensa'"));

        if ($datos1 && $data)
             return true;
    }

    // ========================================================================//
    public function ValidateModif(&$params)
    {
        //        if (!isset($params['nombre_id'])||!isset($params['Direccion'])||!isset($params['Peso'])
//            ||!isset($params['Telefono'])||!isset($params['cod_nomina'])||!isset($params['estatura'])
//            ||!isset($params['identidad'])||!isset($params['PrimerApellido'])||!isset($params['SegundoApellido'])
//            ||!isset($params['madre'])||!isset($params['padre'])||!isset($params['combo_sexo_id'])||!isset($params['combo_estadicivil_value_id'])
//            ||!isset($params['combo_cpiel_value_id'])||!isset($params['combo_reparto_value_id'])||!isset($params['combo_lugarproced_value_id'])
//            ||!isset($params['combo_ncultural_value_id'])||!isset($params['combo_ubicacion_value_id'])||!isset($params['combo_integracion_value_id'])
//            ||!isset($params['combo_registro_value_id'])||!isset($params['combo_talla_camisa_value_id'])||!isset($params['combo_talla_pantalon_value_id'])
//            ||!isset($params['combo_talla_zapato_value_id']))

        $name = $params['nombre_id'];
//        $codigo = $params['codigo_id'];
        $direccion = $params['Direccion'];
        $peso = $params['Peso'];
        $telefono = $params['Telefono'];
        $cod_nomina = $params['cod_nomina'];
        $estatura = $params['estatura'];
        $identidad = $params['identidad'];
        $papellido = $params['PrimerApellido'];
        $sapellido = $params['SegundoApellido'];
        $madre = $params['madre'];
        $padre = $params['padre'];

        $sexo = $params['combo_sexo_id'];
        $ecivil = $params['combo_estadicivil_value_id'];
        $cpiel = $params['combo_cpiel_value_id'];
        $reparto = $params['combo_reparto_value_id'];
        $procedencia = $params['combo_lugarproced_value_id'];
        $ncultural = $params['combo_ncultural_value_id'];
        $ubicacion = $params['combo_ubicacion_value_id'];
        $integracion = $params['combo_integracion_value_id'];
        $registro = $params['combo_registro_value_id'];
        $tallacami_blusa = $params['combo_talla_camisa_value_id'];
        $tall_pantalon_sall = $params['combo_talla_pantalon_value_id'];
        $tall_zapato = $params['combo_talla_zapato_value_id'];
        $fnacimiento = $params['fecha_nacimiento'];
        $sancionado = $params['Sancionado'];

        $nombre = trim($name);
//        $codigo = trim($codigo);
        $direccion = trim($direccion);
        $peso = trim($peso);
        $telefono = trim($telefono);
        $cod_nomina = trim($cod_nomina);
        $identidad = trim($identidad);
        $papellido = trim($papellido);
        $sapellido = trim($sapellido);
        $madre = trim($madre);
        $padre = trim($padre);


//        if ($codigo == "") {
//            $this->RegisterError('Parámetro incorrecto', "Código incorrecto.");
//            return false;
//        }
//        $_valid = Validator::CheckStringSize($codigo, 1, 10);
//        if (!$_valid) {
//            $this->RegisterError('Parámetro incorrecto', "Código incorrecto.");
//            return false;
//        }
        $_valid = Validator::CheckStringSize($nombre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($papellido, 3, 11);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Primer primer apellido  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($sapellido, 3, 11);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Segundo segundo apellido incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($identidad, 11, 11);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Carnet de Identidad  incorrecto.");
            return false;
        }
        $_valid = Validator::IsInt($peso, 2, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Peso incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($cpiel, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Color de Piel incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($sexo, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Sexo  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($estatura, 2, 4);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Estatura  incorrecta.");
            return false;
        }
        $_valid = Validator::CheckStringSize($ecivil, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Estado Civil incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($fnacimiento, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Fecha de Nacimiento incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($telefono, 4, 15);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Teléfono  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($reparto, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Reparto incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($direccion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Dirección  incorrecta.");
            return false;
        }
        $_valid = Validator::CheckStringSize($ncultural, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nivel Cultural incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($madre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre de la madre incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($padre, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Nombre del padre incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($procedencia, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Procedencia incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($registro, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Registro incorrecto.");
            return false;
        }
        if ($sancionado == "") {
            $this->RegisterError('Parámetro incorrecto', "Sancionado incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($tallacami_blusa, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Talla de Camisa/Blusa incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($tall_pantalon_sall, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Talla de Pantalón/Saya incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($tall_zapato, 1, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Talla de Zapato incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($cod_nomina, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Código de Nómina  incorrecto.");
            return false;
        }
        $_valid = Validator::CheckStringSize($integracion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Integración incorrecta.");
            return false;
        }
        $_valid = Validator::CheckStringSize($ubicacion, 3, 200);
        if (!$_valid) {
            $this->RegisterError('Parámetro incorrecto', "Ubicación incorrecta.");
            return false;
        }

        Validator::ToCleanSQL($nombre);
        Validator::ToCleanSQL($direccion);
        Validator::ToCleanSQL($peso);
        Validator::ToCleanSQL($telefono);
        Validator::ToCleanSQL($cod_nomina);
        Validator::ToCleanSQL($identidad);
        Validator::ToCleanSQL($papellido);
        Validator::ToCleanSQL($sapellido);
        Validator::ToCleanSQL($madre);
        Validator::ToCleanSQL($padre);
        /*$nombre = trim($name);
        $direccion = trim($direccion);
        $peso = trim($peso);
        $telefono = trim($telefono);
        $cod_nomina = trim($cod_nomina);
        $identidad = trim($identidad);
        $papellido = trim($papellido);
        $sapellido = trim($sapellido);
        $madre = trim($madre);
        $padre = trim($padre);*/
        //$params['new_nombre'] = $nombre;
        $old_nombre = $params['old_name'];
        $actividades = $this->_dbase->GetTable('plantilla.trabajador');
        $count = $actividades->Contains(array('no_identidad' => "'$identidad'"));
        if ($count == 0) {
            return true;
        } elseif ($old_nombre == $identidad) {
            // $this->RegisterError('Operación no válida', "El nombre '$nombre' ya existe.");
            return true;
        } else {
            $this->RegisterError('Operación no válida', "El numero de identidad '$old_nombre' ya existe.");
            return false;
        }

        return true;
    }

    public function Modif(&$params)
    {
         $Mbaja= $params['combo_Mbaja_value_id'];
         $Dbaja = $params['combo_Dbaja_value_id'];
         $Activo = $params['Activo'];

        $fecha_inicio = $params['fecha_inicio'];
        $meses = $params['meses'];

        if ($Activo==0){$Activo='f';}else {$Activo='t';}

        $name = $params['nombre_id'];
        $idsexo = $params['combo_sexo_id'];
        $idestado_civil = $params['combo_estadicivil_value_id'];
        $idcolorpiel = $params['combo_cpiel_value_id'];
        $idreparto = $params['combo_reparto_value_id'];
        $idlugar_procedencia = $params['combo_lugarproced_value_id'];
        $idnivel_cultural = $params['combo_ncultural_value_id'];
        $iubicacion_excepcional = $params['combo_ubicacion_value_id'];
        $idintegracion = $params['combo_integracion_value_id'];
        $idregistro_militar = $params['combo_registro_value_id'];
        $especialidad = $params['especialidad'];
        $talla_camisa = $params['combo_talla_camisa_value_id'];
        $talla_pantalon = $params['combo_talla_pantalon_value_id'];
        $talla_zapato = $params['combo_talla_zapato_value_id'];

        $direccion = $params['Direccion'];
        $sancion = 0;
        if ($params['Sancionado'] == 1) {
            $sancion = 1;
        } else {
            $sancion = 0;
        }
        $peso = $params['Peso'];
        $telefono = $params['Telefono'];
        $cod_nomina = $params['cod_nomina'];
        $estatura = $params['estatura'];
        $identidad = $params['identidad'];
        $papellido = $params['PrimerApellido'];
        $fnacimiento = $params['fecha_nacimiento'];
        $sapellido = $params['SegundoApellido'];
        $madre = $params['madre'];
        $padre = $params['padre'];
        $old_nombre = $params['old_name'];
        $nombre_completo= $name." ".$papellido." ".$sapellido;
        $datos = $this->_dbase->GetTable("plantilla.trabajador");

      if (isset($Dbaja)&& isset($Mbaja))
        {
            return $data = $datos->Update(array('codigo_nomina' => "'$cod_nomina'"
                , 'no_identidad' => "'$identidad'", 'nombre' => "'$name'"
                ,'apellido_1' => "'$papellido'", 'apellido_2' => "'$sapellido'", 'fecha_nacimiento' => "'$fnacimiento'"
                ,'nombre_padre' => "'$padre'", 'estado_civilid' => "'$idestado_civil'"
                ,'sexoid' => "'$idsexo'", 'color_pielid' => "'$idcolorpiel'", 'estatura' => "'$estatura'"
                ,'peso' => "'$peso'", 'talla_camisa_blusa' => "'$talla_camisa'", 'talla_pantalon_saya' => "'$talla_pantalon'"
                ,'talla_zapato' => "'$talla_zapato'", 'telefono' => "'$telefono'", 'repartoid' => "'$idreparto'"
                ,'lugar_procedenciaid' => "'$idlugar_procedencia'"
                ,'direccion' => "'$direccion'", 'nivel_culturalid' => "'$idnivel_cultural'", 'integracionid' => "'$idintegracion'",
                    'ubicacion_excepcionalid' => "'$iubicacion_excepcional'"
                ,'sancionado' => "'$sancion'", 'registro_militarid' => "'$idregistro_militar'", 'nombre_madre' => "'$madre'"
                ,'activo' => "'$Activo'",'nombre_completo' => "'$nombre_completo'"
                ,'tiempo' => "'$meses'", 'fecha_inicio' => "'$fecha_inicio'"),
                "no_identidad='$old_nombre'");

        }
      else{
          return $data = $datos->Update(array('codigo_nomina' => "'$cod_nomina'"
              , 'no_identidad' => "'$identidad'", 'nombre' => "'$name'"
              ,'apellido_1' => "'$papellido'", 'apellido_2' => "'$sapellido'", 'fecha_nacimiento' => "'$fnacimiento'"
              ,'nombre_padre' => "'$padre'", 'estado_civilid' => "'$idestado_civil'"
              ,'sexoid' => "'$idsexo'", 'color_pielid' => "'$idcolorpiel'", 'estatura' => "'$estatura'"
              ,'peso' => "'$peso'", 'talla_camisa_blusa' => "'$talla_camisa'", 'talla_pantalon_saya' => "'$talla_pantalon'"
              ,'talla_zapato' => "'$talla_zapato'", 'telefono' => "'$telefono'", 'repartoid' => "'$idreparto'"
              ,'lugar_procedenciaid' => "'$idlugar_procedencia'"
              ,'direccion' => "'$direccion'", 'nivel_culturalid' => "'$idnivel_cultural'", 'integracionid' => "'$idintegracion'",
                  'ubicacion_excepcionalid' => "'$iubicacion_excepcional'"
              ,'sancionado' => "'$sancion'", 'registro_militarid' => "'$idregistro_militar'", 'nombre_madre' => "'$madre'"
              ,'activo' => "'$Activo'",'dbaja' => "'$Dbaja'",'mbaja' => "'$Mbaja'",'nombre_completo' => "'$nombre_completo'"
              ,'tiempo' => "'$meses'", 'especialidad_id' => "'$especialidad'",'fecha_inicio' => "'$fecha_inicio'"),
              "no_identidad='$old_nombre'");

      }




        }


    public function Validatedefensa(&$params)
    {
        return true;
    }

    public function defensa(&$params)
    {
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



};
?>
