<?php
final class ClientConfigReader
{
	private $xml_store;

	private $xml_app_store;

	private $_config_store;
	
	private $_subsystem;

	private static $_instance = 0;

	public function __construct()
	{
		$this->_subsystem = null;
		$this->_config_store = null;
		$this->_config_store = array();
	}

	public function ReadConfig($Subsystem)
	{
		$this->_subsystem = $Subsystem;
		$Source =  $_SESSION['APP_PATH'] . "/Subsystems/$Subsystem/Config/Client/config.xml";
		// Create the DOM Document
		$this->xml_store = new DOMDocument();
		// Load the xml document
		$this->xml_store->load($Source);

		// Get ccs
		$_css_item = $this->xml_store->getElementsByTagName('css')->item(0);
		$_css_list = $_css_item->nodeValue;
		$this->_config_store['css'] = ( ($_css_list == '0') ? array() : explode(',',$_css_list) );
		
		// Get icon
		$_icon_item = $this->xml_store->getElementsByTagName('icon')->item(0);
		$this->_config_store['icon'] = $_icon_item->nodeValue;
		
		// Get interface config
		$_interface_item = $this->xml_store->getElementsByTagName('interface')->item(0);
		$this->_config_store['interface'] = $_interface_item->nodeValue;
		
		// Get ext-theme
		$_theme_item = $this->xml_store->getElementsByTagName('ext-theme')->item(0);
		$this->_config_store['theme'] = $_theme_item->nodeValue;
		
		// Get title
		$_title_item = $this->xml_store->getElementsByTagName('title')->item(0);
		$this->_config_store['title'] = $_title_item->nodeValue;
	}
	
	public function GetCssList()
	{
		$css_list = array();
		$_subsys = $this->_subsystem;

		foreach( $this->_config_store['css'] as $_css )
		{
			$_css_file = "SubSystems/$_subsys/Config/Client/$_css.css";
			array_push($css_list, $_css_file);
		}
		return $css_list;
	}
	
	public function GetAppIcon()
	{
		$_subsys = $this->_subsystem;
		if($this->_config_store['icon'])
		{
			$_icon = $this->_config_store['icon'];
			return "<link rel='shortcut icon' type='image/ico' href='Subsystems/$_subsys/Config/Client/$_icon.ico'/>";
		}
		return '';
	}
        
        public function GetSystemIcon()
	{
		$_subsys = $this->_subsystem;
		if($this->_config_store['icon'])
		{
			$_icon = $this->_config_store['icon'];
			return "<img type='image/ico' src='SubSystems/$_subsys/Config/Client/$_icon.ico'/>";
		}
		return '';
	}
	
	public function GetInterfaceConfig()
	{
		return $this->_config_store['interface'];
	}
	
	public function GetExtTheme()
	{
		return $this->_config_store['theme'];
	}
	
	public function GetTitle()
	{
		return $this->_config_store['title'];
	}
}

?>
