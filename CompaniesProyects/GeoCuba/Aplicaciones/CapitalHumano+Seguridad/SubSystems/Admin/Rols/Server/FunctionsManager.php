<?php
class FunctionsManager extends Module
{
     public function __construct()
     {
          parent::__construct('common.ch');
          $this->_security_conn = SecurityConnections::GetInstance();
     }

     public function LinkFunctions()
     {
          $this->Link('main','LoadFunctions','AllowModule','AllowFunction');
     }

     public function ValidateLoadFunctions(&$params)
     {
          return true;
     }

     public function LoadFunctions(&$params)
     {
          $_data = array();
          $_count = 0;

          $_rol = $params['rol'];
          $_subsystem = $params['subsystem'];

          // Get data
          //$_str_query = "SELECT module_name, function_name FROM functions_by_subsystems WHERE rol_name = '$_rol_name' ORDER BY module_name, function_name;";
          /*$_str_query = "SELECT module_name as module, function_id, function_name, mod_description, fn_description, (user_id IS NOT NULL) as active FROM
                         ( SELECT function_id, function_name, functions.description as fn_description, module as module_name,  modules.description as mod_description 
                              FROM app_security.subsystems 
                              INNER JOIN app_security.modules USING (subsystem_id) 
                              INNER JOIN app_security.functions USING (module_id) 
                              WHERE subsystem = '$_subsystem') as main_data
                         LEFT JOIN
                         ( SELECT *
                         FROM app_security.users_access
                         LEFT JOIN app_security.subsystems USING (subsystem_id)
                         LEFT JOIN app_security.users USING (user_id)
                         WHERE subsystem = '$_subsystem' AND user_log = '$_rol') as other_data USING (function_id)
                         ORDER BY module_name, function_id, function_name;";*/

        $_str_query = "SELECT module_name as module, function_id, function_name, mod_description, fn_description,
          (rol_id IS NOT NULL) as active FROM (SELECT function_id, function_name, functions.description as fn_description,
          module as module_name,  modules.description as mod_description FROM app_security.subsystems INNER JOIN app_security.modules
          USING (subsystem_id) INNER JOIN app_security.functions USING (module_id) WHERE subsystem = '$_subsystem') as main_data
          LEFT JOIN (SELECT * FROM app_security.functions_subsystems_rols LEFT JOIN app_security.subsystems USING (subsystem_id)
          LEFT JOIN app_security.rols USING (rol_id) WHERE subsystem = '$_subsystem' AND rol_name = '$_rol') as other_data
          USING (function_id) ORDER BY module_name, function_id, function_name;";

//         print_r($_str_query); exit;

          $_selection = $this->_dbase->Select($_str_query);
          if(is_null($_selection))
          {
               $this->_dbase->Free();
               return false;
          }

          $_data = $_selection->GetAll();
          $_selection->Free();
          $this->_dbase->Free();

          $_data_tree = array();
          $_module_name = "";

          for($i = 0; $i < count($_data); $i++)
          {
               if($_data[$i]['module'] != $_module_name)
               {
                    $_module_name = $_data[$i]['module'];
                    array_push($_data_tree,array(
                         'item_name' => $_module_name,
                         'cls' => 'folder',
                         'id' => "_mod_$i",
                         'expanded' => false,
                         'checked' => ( $_data[$i]['active'] == 't' && $_data[$i]['function_name'] == 'main' ),
                         'description' => $_data[$i]['mod_description']
                    ));
               }

               if($_data[$i]['function_name'] == 'main')
                    continue;

               if( !array_key_exists('children', $_data_tree[(count($_data_tree) - 1)]))
                    $_data_tree[count($_data_tree) - 1]['children'] = array();

               array_push($_data_tree[count($_data_tree) - 1]['children'],array(
                    'item_name' => $_data[$i]['function_name'],
                    'id' => "_fun_$i",
                    'leaf' => true,
                    'checked' => ($_data[$i]['active'] == 't'),
                    'description' => '&nbsp;&nbsp;' . $_data[$i]['fn_description']
               ));
          }

          $result = array( 'success' => true, 'tree' => $_data_tree);

          return $result;
     }
     
     public function ValidateSetFunction(&$params)
     {
          $_rol_name = $params['rol'];
          $_rol = $params['rol'];
          $_subsystem = $params['system'];
          $_system = $params['system'];
          
          // Clean the name
          Validator::ToCleanSQL($_rol_name);
          Validator::ToCleanSQL($_subsystem);
          
          $_rols_table = $this->_security_conn->GetTableName('rols');
          $_subsystems_table = $this->_security_conn->GetTableName('subsystems');
          $_subsystems_rols_table = $this->_security_conn->GetTableName('subsystems_rols');
          
          // Get the user_id
          $_rols = $this->_dbase->GetTable($_rols_table);
//          $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name' AND active = true");
          $_rol_id = $_rols->GetValueWhere('rol_id', "rol_name = '$_rol_name'");
          if(is_null($_rol_id))
          {
               $this->RegisterError('Operación no válida', "El rol '$_rol' no existe.");
               return false;
          }
          
          // Get the subsystem_id
          $_subsystems = $this->_dbase->GetTable($_subsystems_table);
          $_subsystem_id = $_subsystems->GetValueWhere('subsystem_id', "subsystem = '$_subsystem'");
          if(is_null($_subsystem_id))
          {
               $this->RegisterError('Operación no válida', "El sistema '$_system' no existe.");
               return false;
          }
          
          // Validate that the rol have not access to the subsystem
          $_subsystems_rols = $this->_dbase->GetTable($_subsystems_rols_table);
          $_count = $_subsystems_rols->Contains(array(
              'rol_id' => "'$_rol_id'",
              'subsystem_id' => "'$_subsystem_id'"
          ));
          
          if($_count < 0)
               return false;
          if($_count == 0)
          {
               $this->RegisterError('Operación no válida', "El rol '$_rol' no tiene acceso al sistema '$_system'.");
               return false;
          }
          
          $params['rol'] = $_rol_id;
          $params['system'] = $_subsystem_id;
          
          // Validate the selection as parameter
          $_selection = $params['selection'];
          if(!Validator::ToJSON($_selection, true))
          {
               $this->RegisterError('Parámetro no válido', "Los permisos seleccionados no son válidos.");
               return false;
          }
          // Validate the existence of each module and function
          $_fn_store = array();
          
          $_modules_table = $this->_security_conn->GetTableName('modules');
          $_modules = $this->_dbase->GetTable($_modules_table);
          
          $_functions_table = $this->_security_conn->GetTableName('functions');
          $_functions = $this->_dbase->GetTable($_functions_table);
          
          // Iterate each module
          foreach ($_selection['modules'] as $module) {
               $_module_id = $_modules->GetValueWhere('module_id', "module = '$module' AND subsystem_id = '$_subsystem_id'");
               if(is_null($_module_id))
                    return false;
               
               $_fn_id = $_functions->GetValueWhere('function_id', "function_name = 'main' AND module_id = '$_module_id'");
               if(is_null($_fn_id))
                    return false;
               
               array_push($_fn_store, $_fn_id);

               // Iterate each function of the module
               if(!$_selection['functions'][$module]) continue;
               
               foreach ($_selection['functions'][$module] as $fn)
               {
                    $_fn_id = $_functions->GetValueWhere('function_id', "function_name = '$fn' AND module_id = '$_module_id'");
                    if(is_null($_fn_id))
                         return false;

                    array_push($_fn_store, $_fn_id);
               }
          }
          
          $params['selection'] = $_fn_store;
          
          return true;
     }
     
     public function SetFunction(&$params)
     {
          $_rol = $params['rol'];
          $_subsystem = $params['system'];
          $_selection = $params['selection'];
          
          $_functions_subsystems_rols_table = $this->_security_conn->GetTableName('functions_subsystems_rols');
          $_functions_subsystems_rols = $this->_dbase->GetTable($_functions_subsystems_rols_table);
          
          $this->_dbase->BeginTransaction();
          
          $_count = $_functions_subsystems_rols->DeleteWhere("rol_id = '$_rol' AND subsystem_id = '$_subsystem'");
          if($_count < 0)
          {
               $this->_dbase->Rollback();
               return false;
          }
          
          foreach ($_selection as $fn_id) 
          {
               $_count = $_functions_subsystems_rols->InsertValues(array(
                   'rol_id' => "'$_rol'",
                   'subsystem_id' => "'$_subsystem'",
                   'function_id' => "'$fn_id'"
               ));
               
               if($_count <= 0)
               {
                    $this->_dbase->Rollback();
                    return false;
               }
          }
          
          $this->_dbase->Commit();
          return true;
     }

}
?>
