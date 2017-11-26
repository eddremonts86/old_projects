<?PHP
/*
 * Module : Abstract class to define all the class that have methods waht are invoked from the client
 */
abstract class Module
{
     protected $_fn_matrix;


    /**
     * @var DataBase
     */
    protected $_dbase;

	protected $_default_dbase;

	public function __construct($DefaultDBase = null)
	{
		$this->_fn_matrix = array();
		$this->_default_dbase = ($DefaultDBase) ? $DefaultDBase : null;
	}

	protected function Link()
	{
		$_params = func_get_args();
		
		// The first argument of the function is the js functionality
		$_js_fn = array_shift($_params);
		
		// The others argument of the functions are the name of the functions
		// that the js functionality call
		$_server_fns = $_params;
		// Verify that the functionality was not register

		if(array_key_exists($_js_fn, $this->_fn_matrix))
		{
			$this->RegisterError("Implementation error", "The functionality $_js_fn already was registered");
			return;
		}
		
		// Verify that the functions that are called by the functionality are implemented
		// into the class
		$_errors = false;
		foreach ($_server_fns as $_fn)
		{
			if(!method_exists($this, $_fn))
			{
				$this->RegisterError('Implementation error',"The function: '$_fn' does not exists");
				$_errors = true;
			}
		}

		if($_errors)
			return;

		// Finally, link the functions
		$this->_fn_matrix[$_js_fn] = $_server_fns;
	}

	//public abstract function LinkFunctions();

	public function GetCallerOf($FunctionName)
	{
		$_callers = array();
		
		foreach( $this->_fn_matrix as $_js_fn => $_server_fn_array )
			if(in_array($FunctionName, $_server_fn_array) !== false)
				array_push($_callers, $_js_fn);
		return $_callers;
	}

	public function Connect() 
        {
            if (!is_null($this->_default_dbase))
            {
                if(strpos($this->_default_dbase, '.') != -1)
                {
                    $_tokens = explode('.', $this->_default_dbase);
                    if(strtolower($_tokens[0]) == 'common' )
                        $this->_dbase = ConnectionsManager::GetCommonDatabase($_tokens[1]);
                    else
                        $this->_dbase = ConnectionsManager::GetDatabase($this->_default_dbase);
                }
                else
                    $this->_dbase = ConnectionsManager::GetDatabase($this->_default_dbase);
                if (is_null($this->_dbase))
                    return false;
            }
            return true;
        }

	public function FreeConnection()
	{
		if(!is_null($this->_default_dbase))
			$this->_dbase->Free();
	}

	public final function Validate($FunctionName, &$Params)
	{
		$_validation_fn = "Validate$FunctionName";
		if(!method_exists($this, $_validation_fn))
		{
			$this->RegisterError('Error de implementación',"Función de validación: '$_validation_fn' no implementada");
			return false;
		}

		return $this->$_validation_fn($Params);
	}

	protected function RegisterError($ErrorType, $ErrorDescription)
	{
		ErrorManager::RegisterError(utf8_decode($ErrorType), utf8_decode($ErrorDescription));
	}

	protected function ToUTF8(&$_array)
	{
	    for($i = 0; $i < count($_array); $i++)
		foreach ($_array[$i] as $key => $value)
		    $_array[$i][$key] = utf8_encode($value);
	}
    
    public function convert_assoc_array($array,$index,$value){
          $arreglo = array();
          foreach($array as $nodo)$arreglo[$nodo[$index]] = $nodo[$value];
          return $arreglo;
        }
    
    protected function Invoke($fn, &$params)
        {
            $tokens = explode('.', $fn);
            $path = sprintf("%s/SubSystems/%s/%s/Server/%s.php",$_SESSION['APP_PATH'], $_SESSION['CUS'],$tokens[0] ,$tokens[1]);
            require_once ($path);
            
            $_class_name = $tokens[2];
            $_fn_name = $tokens[3];
            $_class = new $_class_name();
            return $_class->$_fn_name($params);
        }

	public function BuildTree($data, $levels, $fields)
    {
        $dict = array();
        $current;

        foreach($data as $row)
        {
            $current = &$dict;
            for($i = 0; $i < count($levels); $i++)
            {
                if(!array_key_exists($row[$levels[$i]], $current))
                    $current[$row[$levels[$i]]] = array();
                $current = &$current[$row[$levels[$i]]];
            }

            $current['text'] = $row[$levels[count($levels) - 1]];
            $current['leaf'] = true;

            foreach($fields as $field) $current[$field] = $row[$field];
            array_push($current, $row[$levels[count($levels) - 1]]);
        }
        return $dict;
    }

    public function BuildExtTree($name, $nodes)
    {
        $element = array();
        if(array_key_exists('leaf', $nodes))
            foreach($nodes as $key => $value)
                $element[$key] = $value;
        else
        {
            $element = array('text' => $name, 'leaf' => 'false', 'children' => array());

            foreach($nodes as $node_name => $items)
            {
                $node = $this->BuildExtTree($node_name, $items);
                array_push($element['children'], $node);
            }
        }
        return $element;
    }

}
?>