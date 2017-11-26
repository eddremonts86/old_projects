<?php
/// Modes of the application
define(DEBUG_MODE, 1);   // Building the application. 
                         // In this state the application show the full description 
                         // of internal errors and not registe logs.
define(TESTING_MODE, 2); // Testing with the security.
                         // In this state the application show the full description 
                         // of internal errors and registe logs. Incorporate the security
define(RELEASE_MODE, 3); // Application in release mode.
                         // The application run as a release, does not show the description
                         // of the errors but they are registered into the database

/// Register logs and error 
define(LOGS_ON, 1);      // It define that the logs treatment is active
define(LOGS_OFF, 2);     // It define that the logs treatment is not active

// Define the run mode of the applications
define(RUN_APP_MODE, DEBUG_MODE);
//define(RUN_APP_MODE, TESTING_MODE);
//define(RUN_APP_MODE, RELEASE_MODE);

// Define the treatment of logs and errors in database
define(LOGS_STATE, LOGS_OFF);

// Define the default system in DEBUG_MODE
//$_SUBSYSTEM = 'Admin';
//$_SUBSYSTEM = 'SistemaBase';
//$_SUBSYSTEM = 'Plantilla';
//$_SUBSYSTEM = 'Capacitacion';
//$_SUBSYSTEM = 'Cuadro';
$_SUBSYSTEM = 'Salario';
?>