<?PHP
/*
 * Module : Abstract class to define a class that manipulate the main events of the application
 */
abstract class Event
{
	protected $_dbase;
	protected $_default_dbase;

	public function __construct($DefaultDBase = null)
	{
		$this->_default_dbase = ($DefaultDBase) ? $DefaultDBase : null;
	}

	public function Connect()
	{
		if(!is_null($this->_default_dbase))
		{
			$this->_dbase = ConnectionsManager::GetDatabase($this->_default_dbase);
               if(is_null($this->_dbase))
                    return false;
		}
		return true;
	}

	public function FreeConnection()
	{
		if(!is_null($this->_default_dbase))
			$this->_dbase->Free();
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
	
	public function OnBeforeLoad($params)
	{
		return true;
	}
	
	public function OnAfterLoad($params)
	{
		return true;
	}
	
	public function OnBeforeChange($params)
	{
		return true;
	}
	
	public function OnAfterChange($params)
	{
		return true;
	}
}
?>