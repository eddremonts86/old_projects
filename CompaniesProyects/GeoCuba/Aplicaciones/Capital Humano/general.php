<?PHP
session_start();

require_once('App/Config/app_config.php');
require_once('App/Config/db_access.php');

require_once('Framework/Server/ServerManagment/FnCaller.php');
require_once('Framework/Server/ServerManagment/ErrorManager.php');
require_once('Framework/Server/ServerManagment/Validator.php');

require_once('Framework/Server/DataAccess/ConnectionsManager.php');
require_once('Framework/Server/Security/LogsManager.php');
require_once('Framework/Server/Security/SecurityManager.php');
require_once('Framework/Server/Events/EventsManager.php');
//print_r('hola');die;
$cwd = getcwd();
$_cwd = str_replace('\\', '/', $cwd);
$_SESSION['APP_PATH'] = $_cwd;
//print_r($_SESSION);die;
$_subsystems = array();
if (RUN_APP_MODE == DEBUG_MODE) {
    $_SESSION['CUS'] = $_SUBSYSTEM;
    require_once('App/Server/DebugLoader.php');

    $_loader = new Loader();
    $_loader->LoadConfig($_SESSION['CUS']);
    define(LOGS_STATE, LOGS_OFF);
} else {

//if (!isset ($_SESSION['CUI']) || !(isset ($_SESSION['_AT']) || isset ($_SESSION['ENTRY'])) || !isset ($_SESSION['CUS']) || !isset ($_SESSION['CSI'])) {
    if (!isset ($_SESSION['CUI'])) {
        header("Location:index.php");
    } else {
        unset($_SESSION['_AT']);
        $_SESSION['ENTRY'] = true;
        require_once('App/Server/AppLoader.php');
        $_loader = new Loader();

        $_sm = SecurityManager::GetInstance();
        $_subsystems = $_sm->GetAllowedSystems();
    }
}

require_once('App/Server/ClientConfigReader.php');
$_cconf = new ClientConfigReader();
?>
<html xmlns="http://www.w3.org/1999/xhtml ">
<head>
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/resources/css/<?PHP echo $_cconf->GetExtTheme(); ?>.css"/>
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/src/ux/css/ItemSelector.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/font-awesome.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/event.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap-responsive.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/docs.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/sb-admin.css">

    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/oxigen/16x16/icons16x16.css">
    <link id="icons22x22" rel="stylesheet" type="text/css" href="Framework/Client/oxigen/22x22/icons22x22.css">

    <script src="Framework/Client/FrKCss/js/jquery.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap.min.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-tooltip.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-alert.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-popover.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.core.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.widget.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.mouse.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.draggable.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.droppable.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.sortable.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.accordion.js"></script>
    <script src="App/Client/js/index.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <?PHP echo $_cconf->GetAppGeneralIcon(); ?>
    <title>Interfaz General</title>
    <style type="text/css">
        <!--
        .Estilo3 {
            font-size: 11px
        }

        -->
    </style>
</head>
<body bottommargin="0" leftmargin="0" rightmargin="0" topmargin="0">
<div style="width:100%;height:90%;display: none" align="center" id="main_panel">
    <div id="center" class="Sbsist sombra_simple_der" aling="center">
        <div id="cuerpo">
            <?php
            //$conf = simplexml_load_file('App/Config/config.xml');
            $xml_app_store = new DOMDocument();
            $xml_app_store->load('App/Config/config.xml');
            $_subsys_items = $xml_app_store->getElementsByTagName('subsystem');
            $_subsys_items_count = $_subsys_items->length;
            $j = 0;
            for($i = 0; $i < $_subsys_items_count; $i++)
            {
                $_current_subsys = $_subsys_items->item($i);
                $_name = $_current_subsys->attributes->getNamedItem('name')->nodeValue;
                if(in_array($_name,$_subsystems)){
                    if($j == 0)
                        echo '<div class="row">';
                        echo '<div class="col-lg-4">
                            <div class="panel panel-info">
                              <div class="panel-heading">
                                <div class="row">
                                  <div class="col-xs-6">
                                    <i class="'.$_subsys_items->item($i)->nodeValue.'"></i>
                                  </div>
                                  <div class="col-xs-6 text-right">
                                    <p class="announcement-heading">'.$_name.'</p>
                                    <p class="announcement-text">New Mentions!</p>
                                  </div>
                                </div>
                              </div>
                              <a href="App/Server/fn_call.php?fn=App.Log.Log.SwapSystem&system='.$_name.'">
                                <div class="panel-footer announcement-bottom">
                                  <div class="row">
                                    <div class="col-xs-6">
                                            View Mentions
                                    </div>
                                    <div class="col-xs-6 text-right">
                                      <i class="fa fa-arrow-circle-right"></i>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                        </div>';
                    $j++;
                    if($j == 3){
                        echo '</div>';
                        $j = 0;
                    }
                }
            }

            ?>
        </div>
    </div>
</div>
</body>
</html>
