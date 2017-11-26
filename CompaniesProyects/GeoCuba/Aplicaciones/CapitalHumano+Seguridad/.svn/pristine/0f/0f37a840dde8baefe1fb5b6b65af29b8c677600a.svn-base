<?PHP
	class Loader
	{
		private $xml_store;

		private $_module_list;

		private $_subsystem;

		public function __construct()
		{
			$this->_module_list = array();
		}

		public function LoadConfig($SubSystem)
		{
			$Source =  realpath(dirname(__FILE__)) . "/../../Subsystems/$SubSystem/Config/Server/config.xml";
			// Create the DOM Document
			$this->xml_store = new DOMDocument();
			// Load the xml document
			$this->xml_store->load($Source);

			$this->_subsystem = $SubSystem;

			// Get subsystem
			$_subsys_items = $this->xml_store->getElementsByTagName('subsystem');
			$_subsys_items_count = $_subsys_items->length;

		    $_current_subsys = $_subsys_items->item(0);

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

				$_module_tags = $_module_list->item($j)->childNodes;
				$_tags_length = $_module_tags->length;

				$_module_js_list = "";
				$_module_css = "";
				$_module_desc = "";
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
							for($i = 0; $i < $_functs_node->length; $i++)
								if($_functs_node->item($i)->nodeType == 3)
									continue;
								else
								{
									$_lst = $_functs_node->item($i)->attributes->getNamedItem('source')->nodeValue;
									$_fn_list[$_functs_node->item($i)->nodeName] = explode(',',$_lst);// $_functs_node->item($i)->attributes->getNamedItem('Source')->nodeValue;
								}
							break;
					}
				}

				$this->_module_list[$_module_name] = array(
					'js' => explode(',',$_module_js_list),
					'css' => $_module_css,
					'desc' => $_module_desc,
					'functions' => $_fn_list);
			}
		}

		public function GetJsList()
		{
			$js_list = array();
			$_subsys = $this->_subsystem;

			foreach( array_keys($this->_module_list) as $_module_name)
			{
				// List of js of the module
				$_js_list = $this->_module_list[$_module_name]['js'];
				foreach($_js_list as $_js)
				{
					$_js_file = "SubSystems/$_subsys/$_module_name/Client/js/$_js.js";
					array_push($js_list, $_js_file);
				}

				// List of js of the functions
				$_js_list = $this->_module_list[$_module_name]['functions'];
				foreach($_js_list as $_js_files)
				{
					foreach ($_js_files as $fn_name => $_js)
					{
						$_js_file = "SubSystems/$_subsys/$_module_name/Client/js/$_js.js";
						array_push($js_list, $_js_file);
					}
				}
			}

			return $js_list;
		}

	}
?>
