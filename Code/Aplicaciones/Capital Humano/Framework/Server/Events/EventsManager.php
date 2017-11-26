<?php

class EventsManager
{
    // Unique instance of the class
    private static $_instance = 0;
        
    // Constructor of the class
    public function __construct(){}
    
    // Function to get the unique instance of the application
    public static function GetInstance()
    {
        if(!self::$_instance)
            self::$_instance = new EventsManager();

        return self::$_instance;
    }
    
    // Private function to load the file that treat the events
    private function LoadFile($_subsystem)
    {
        include_once('AppEvent.php');
        
        $_url = $_SESSION['APP_PATH'] . "/SubSystems/$_subsystem/AppEvents/Server/ServerEvents.php";
        $_class = $_SESSION['CUS'] . "ServerEvents";
        
        // Loading the file
        if(!file_exists($_url) || !is_readable($_url))
            return false;
        
        include_once($_url);
		
        // Creating the class
        if (!@class_exists($_class, false))
        {
            //echo('Error cargando clase');
            ErrorManager::RegisterError('Class Event Error', 'Error cargando clase');
            return false;
        }
        
        // Create an instance of the class
        $_server_events = new $_class();
        // Validate that the class is a plugin
        if (!@is_subclass_of($_server_events, 'Event'))
        {
            //echo('Error la clase no es un manejador de eventos');
            ErrorManager::RegisterError('Event Error', 'Error la clase no es un manejador de eventos');
            return false;
        }
        
        return true;
    }
    
    public function ThrowEvent($_subsystem, $event, &$params = null)
    {
        if(!$this->LoadFile($_subsystem))
        {
            if (ErrorManager::ExistsErrors())
                return false;	
            return true;
        }

        $retval = false;
        
        $_class_name = $_SESSION['CUS'] . "ServerEvents";
        $_event_manager = new $_class_name();

        switch (strtolower($event))
        {
            case "onbeforeload":
            case "beforeload":
            case "before_load":
                $retval = $_event_manager->OnBeforeLoad($params);
                break;
            
            case "onafterload":
            case "afterload":
            case "after_load":
                $retval = $_event_manager->OnAfterLoad($params);
                break;
            
            case "onbeforechange":
            case "beforechange":
            case "before_change":
                $_SESSION['SWAP_APP'] = true;
                $retval = $_event_manager->OnBeforeChange($params);
                break;
            
            case "onafterchange":
            case "afterchange":
            case "after_change":
                $retval = $_event_manager->OnAfterChange($params);
                unset($_SESSION['SWAP_APP']);
                break;

            default:
                return true;
                break;
        }
       
        return $retval;
    }
}

?>
