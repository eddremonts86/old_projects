<?php
final class ConfigReader
{
	private $xml_store;

	private $xml_app_store;

	private $_config_store;

	private static $_instance = null;

	private function __construct()
	{
		$Source =  realpath(dirname(__FILE__)) . '/../Config/config.xml';
		$this->xml_app_store = new DOMDocument();

		// Load the xml document
		$this->xml_app_store->load($Source);

		$this->_config_store = array();
	}

	public static function GetInstance($Clear = false)
	{
		if(self::$_instance == null)
			self::$_instance = new ConfigReader();

		if($Clear)
               self::$_instance->Clear();
		return self::$_instance;
	}

	private function Clear()
	{
		$this->_config_store = null;
		$this->_config_store = array();
	}

	public function ReadFullConfig()
	{
		// Get subsystems
		$_subsys_items = $this->xml_app_store->getElementsByTagName('subsystem');
		$_subsys_items_count = $_subsys_items->length;

		// Iterate each subsystem to read
		for($i = 0; $i < $_subsys_items_count; $i++)
		{
			$_current_subsys = $_subsys_items->item($i);
			// Get the name of the subsystem
			$_name = $_current_subsys->attributes->getNamedItem('name')->nodeValue;
			// Read each subsystem
			$this->ReadConfig($_name);
		}
	}

	public function ReadConfig($Subsystem)
	{
		$Source =  realpath(dirname(__FILE__)) . "/../../Subsystems/$Subsystem/Config/Server/config.xml";
		// Create the DOM Document
		$this->xml_store = new DOMDocument();
		// Load the xml document
		$this->xml_store->load($Source);

		// Get subsystem
		$_subsys_items = $this->xml_store->getElementsByTagName('subsystem');

		$_current_subsys = $_subsys_items->item(0);
		// Get the name of the subsystem
		$_name = $_current_subsys->attributes->getNamedItem('name')->nodeValue;

		$this->_config_store[$_name] = array();

		// Get module list
		$_module_list = $_current_subsys->childNodes;
		// Get module count
		$_module_list_count = $_module_list->length;

		// Iterate each row
		for($j = 0; $j < $_module_list_count; $j++)
		{
			if(($_module_name = $_module_list->item($j)->nodeType) == 3)
				continue;

			$_module_name = $_module_list->item($j)->attributes->getNamedItem('name')->nodeValue;
			$_module_desc = $_module_list->item($j)->attributes->getNamedItem('desc')->nodeValue;

			$_module_tags = $_module_list->item($j)->childNodes;
			$_tags_length = $_module_tags->length;

			$_module_js_list = "";
			$_module_css = "";
			$_fn_list = array();

			for($k = 0; $k < $_tags_length; $k++)
			{
				if($_module_tags->item($k)->nodeType == 3)
					continue;

				$_node_name = $_module_tags->item($k)->nodeName;
				switch ($_node_name)
				{
					case 'js':
						$_module_js_list = $_module_tags->item($k)->nodeValue;
						break;

					case 'css':
						$_module_css = $_module_tags->item($k)->nodeValue;
						break;

					case 'desc':
						$_module_desc = $_module_tags->item($k)->nodeValue;
						break;

					// Iterate for each function
					case 'functions':
						$_functs_node = $_module_tags->item($k)->childNodes;
						for($p = 0; $p < $_functs_node->length; $p++)
							if($_functs_node->item($p)->nodeType == 3)
								continue;
							else
							{
								$_lst = $_functs_node->item($p)->attributes->getNamedItem('source')->nodeValue;
								$_fn_list[$_functs_node->item($p)->nodeName] = array();
								$_fn_list[$_functs_node->item($p)->nodeName]['source'] = explode(',',$_lst);
								$_fn_list[$_functs_node->item($p)->nodeName]['desc'] = $_lst = $_functs_node->item($p)->attributes->getNamedItem('desc')->nodeValue;
							}
						break;
				}
			}

			$this->_config_store[$_name][$_module_name] = array(
				'js' => explode(',',$_module_js_list),
				'css' => $_module_css,
				'desc' => $_module_desc,
				'functions' => $_fn_list);
		}

	}

	public function GetSubsystems()
	{
		return array_keys($this->_config_store);
	}

	public function GetModulesOf($Subsystem)
	{
		if(array_key_exists($Subsystem, $this->_config_store))
			return array_keys($this->_config_store[$Subsystem]);

		return null;
	}

	public function GetFunctionsOf($Subsystem, $Module)
	{
		if(array_key_exists($Subsystem, $this->_config_store))
			if(array_key_exists($Module,$this->_config_store[$Subsystem]))
				return array_keys($this->_config_store[$Subsystem][$Module]['functions']);
		return null;
	}

	public function ConfigOfModule($Subsystem, $Module)
	{
		if(array_key_exists($Subsystem, $this->_config_store))
			if(array_key_exists($Module,$this->_config_store[$Subsystem]))
				return $this->_config_store[$Subsystem][$Module];
		return null;
	}

}

?>
