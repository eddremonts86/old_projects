<?php
    session_start();
    
    if(!isset($_GET['format']))
        die("<h1>Invalid report !!!</h1>");
    
    if(!isset($_GET['report_name']))
        die("<h1>Invalid file !!!</h1>");
    
    $_format = strtolower($_GET['format']);
    
    // Identify the format
    switch ($_format) {
        case 'excel':
        case 'xls':
            header("Content-Type: application/vnd.ms-excel");
            header("Expires: 0");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            header("content-disposition: attachment;filename=" . $_GET['report_name']);
                break;
		case 'pdf':
			include_once ('../../Framework/Server/Report/html2fpdf/html2fpdf.php');
			break;
        default:
		
            break;
    }

    /// Invoke the function to build the body of the report
    /// ---------------------------------------------------
    
    require_once('../Config/app_config.php');
    require_once('../Config/db_access.php');

    require_once('../../Framework/Server/ServerManagment/FnCaller.php');
    require_once('../../Framework/Server/ServerManagment/ErrorManager.php');
    require_once('../../Framework/Server/ServerManagment/BaseModule.php');
    require_once('../../Framework/Server/Report/Report.php');
    require_once('../../Framework/Server/Report/HtmlItem.php');
    require_once('../../Framework/Server/ServerManagment/Validator.php');

    require_once('../../Framework/Server/DataAccess/ConnectionsManager.php');
    require_once('../../Framework/Server/Security/LogsManager.php');
    require_once('../../Framework/Server/Security/SecurityManager.php');
    
    /// Params treatment  -----------------------------------------------------
     // Get params to call the function
     $_function = $_GET['fn'];

     // Get passed parameters by the user
     $_params = array();
     foreach (array_keys($_GET) as $key)
          if ($key != 'fn')
               $_params[$key] = str_replace("\\\"", "\"", $_GET[$key]);
          
    // Insert the metadata of the parameters
     $_params['<METADATA>'] = array('GET' => array());
     
     // Tratment of GET params
     foreach (array_keys($_GET) as $key)
          if ($key != 'fn')
               array_push($_params['<METADATA>']['GET'], $key);
          
    /// Invocation  -----------------------------------------------------------
     // Create an instance of a FnCaller
     $_caller = new FnCaller();
     $_result = null;
     
     // Create an instance of a security manager
     if(RUN_APP_MODE != DEBUG_MODE)
     $_sm_instance = SecurityManager::GetInstance();

     // Call the function
     $_success = $_caller->BuildReport($_function, $_params);
     if ($_success === false)
     {
          $_result = ErrorManager::GetErrorList();
          $_str_result = "";
          foreach ($_result as $error) {
              $_str_result = '<b>' . $error['error'] . "</b><br>\n" . $error['description'] . "\n";
          }
          
          $_result = $_str_result;
     }
     else
          $_result = $_caller->GetResult();
     /// End of invocation  ----------------------------------------------------

     // Restore the error handler function
     restore_error_handler();
     
     // Free the connection
     if(RUN_APP_MODE != DEBUG_MODE)
     $_sm_instance->FreeConnection();

     $_head = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>' . $_GET['title'] . '</title>
</head><body>';
     
     $_end = "</body></html>";
     
     switch ($_format) {
        case 'excel':
        case 'xls':
            echo "$_head $_result $_end";
                break;
		case 'pdf':
			$pdf = new HTML2FPDF($orientation='P',$unit='mm',$format='letter');
			$name = $_GET['report_name'] . ".pdf";
			$pdf->AddPage();
			$pdf->WriteHTML("$_head $_result $_end");
			$pdf->Output($name,'D');
			break;
        default:
            echo "$_head $_result $_end";
            break;
    }
     
?>
