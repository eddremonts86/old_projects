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
$cwd = getcwd();
$_cwd = str_replace('\\', '/', $cwd);
$_SESSION['APP_PATH'] = $_cwd;
$_subsystems = array();
if (RUN_APP_MODE == DEBUG_MODE) {
    $_SESSION['CUS'] = $_SUBSYSTEM;
    require_once('App/Server/DebugLoader.php');

    $_loader = new Loader();
    $_loader->LoadConfig($_SESSION['CUS']);
    define(LOGS_STATE, LOGS_OFF);
} else {
    if (!isset ($_SESSION['CUI']) || !(isset ($_SESSION['_AT']) || isset ($_SESSION['ENTRY'])) || !isset ($_SESSION['CUS']) || !isset ($_SESSION['CSI'])) {
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
// Read the client config
require_once('App/Server/ClientConfigReader.php');
$_cconf = new ClientConfigReader();
$_cconf->ReadConfig($_SESSION['CUS']);
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
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <?PHP echo $_cconf->GetAppIcon(); ?>
    <title><?PHP echo $_cconf->GetTitle(); ?></title>
    <style type="text/css">
        <!--
        .Estilo3 {
            font-size: 11px
        }

        -->
    </style>
</head>
<body bottommargin="0" leftmargin="0" rightmargin="0" topmargin="0">
<?PHP
if ($_js_list === false) {
    $_error = $_loader->GetError();
    echo "<b>$_error</b>";
}
?>

</body>
<div id="presentation">
    <div id="loading_div" role="presentation" 
         style="position:absolute;left:40%;top:45%;padding:2px;z-index:31001;height:auto;width:auto;background-color:#fff;border:1px solid Silver;border-radius:8;background-image: -moz-linear-gradient(top, #fff, #4eb8fe);">
        <table width="auto" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td id="BgImage" class="img-rounded" align="left" valign="middle">
                    <div id="MessagesImage" class="x-btn-text"
                         style="font:bold 13px tahoma,arial,helvetica;padding:10px;margin:0;height:auto;width:auto;">
                        <?PHP echo $_cconf->GetSystemIcon(); ?>&nbsp;&nbsp;&nbsp;<br/>Sistema : <?PHP echo $_SESSION['CUS'].'<br/>'.'Usuario : '.$_SESSION[USER_NAME];?>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
				<span class="x-btn-text Estilo3" id="loading_div-msg">
		    		Cargando imágenes y estilos...
				</span>
                </td>
            </tr>
        </table>
    </div>
</div>
<link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/src/ux/css/CheckHeader.css"/>
<link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/resources/css/chooser.css"/>
<link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/resources/css/data-view.css"/>
<link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/src/ux/grid/css/GridFilters.css"/>
<link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/src/ux/grid/css/RangeMenu.css"/>
<link id="default" rel="stylesheet" type="text/css" href="App/Client/css/App.css"/>
<script language="javascript" src="SubSystems/<?PHP echo $_SESSION['CUS']; ?>/Config/Client/<?PHP echo $_cconf->GetInterfaceConfig(); ?>.js"></script>
<?php //print_r($_SESSION);die;?>
<script language="javascript">

    var userName = '<?PHP if(isset($_SESSION['USER_NAME'])) echo $_SESSION['USER_NAME'];?>';
    var psw = "<?PHP echo $_SESSION['psw'];?>";
    var APP_PATH = "<?PHP echo $_SESSION['APP_PATH'];?>";
    var user_log = "<?PHP echo $_SESSION['USER_LOG'];?>";
    var dominio = "<?PHP echo $_SESSION['DOMAIN'];?>";
    var CONFIG = "<?PHP echo $_SESSION['CONFIG'];?>";
    var cargo = "<?PHP echo $_SESSION['cargo'];?>";
    var subsystem = '<?PHP echo $_SESSION['CUS'];?>';
    var foto = "<?PHP echo $_SESSION['foto'];?>";
    var subsystems = <?PHP echo json_encode($_subsystems);?>;

    if (document.images) {
        document.desktop = new Image;
        document.desktop.width = InterfaceConf.desktop_image_width;
        document.desktop.height = InterfaceConf.desktop_image_height;
        document.desktop.src = 'SubSystems/' + subsystem + '/Config/Client/' + InterfaceConf.desktop_image;

        document.left_banner = new Image;
        document.left_banner.width = InterfaceConf.left_image_width;
        document.left_banner.height = InterfaceConf.banner_heigth;
        document.left_banner.src = 'SubSystems/' + subsystem + '/Config/Client/' + InterfaceConf.left_image;

        document.rigth_banner = new Image;
        document.rigth_banner.width = InterfaceConf.rigth_image_width;
        document.rigth_banner.height = InterfaceConf.banner_heigth;
        document.rigth_banner.src = 'SubSystems/' + subsystem + '/Config/Client/' + InterfaceConf.rigth_image;

        document.center_banner = new Image;
        document.center_banner.height = InterfaceConf.banner_heigth;
        document.center_banner.src = 'SubSystems/' + subsystem + '/Config/Client/' + InterfaceConf.center_image;
    }
</script>

<?PHP
//Print all css files
$_css_list = $_cconf->GetCssList();
echo "
";
foreach ($_css_list as $_css)
    echo "<link rel='stylesheet' type='text/css' href='$_css'/>
";
?>

<script type="text/javascript">document.getElementById('loading_div-msg').innerHTML = 'Cargando API...';</script>


<script language="javascript" src="Framework/Client/ExtJs/<?PHP echo((RUN_APP_MODE == RELEASE_MODE) ? 'ext-all' : 'ext-all-debug-w-comments'); ?>.js"></script>
<script language="javascript" src="Framework/Client/ExtJs/ext-theme-neptune-dev.js"></script>
<script language="javascript" src="Framework/Client/ExtJs/locale/ext-lang-es.js"></script>
<script language="javascript" src="App/Client/js/App-debug.js"></script>
<?PHP
if (is_file($_SESSION['APP_PATH'] . "/SubSystems/" . $_SESSION['CUS'] . "/AppEvents/Client/ClientEvents.js"))
    echo '<script language="javascript" src="SubSystems/' . $_SESSION['CUS'] . '/AppEvents/Client/ClientEvents.js"> </script>';
?>
<script type="text/javascript">App.FireEvent('beforeload');</script>

<script
    type="text/javascript">document.getElementById('loading_div-msg').innerHTML = 'Cargando m&oacute;dulos...';</script>

<?PHP
//Print all js plugins files
$_js_list = $_loader->GetJsList();

if ($_js_list !== false) {
    echo "
     ";
    foreach ($_js_list as $_js)
        echo "<script type='text/javascript' src='$_js'></script>
     ";
}
?>

<script type="text/javascript">document.getElementById('loading_div-msg').innerHTML = 'Inicializando...';</script>
<script type="text/javascript">
    Ext.onReady(function () {
        Ext.Loader.setConfig({enabled: true});
        Ext.Loader.setPath('Ext.ux', 'Framework/Client/ExtJs/src/ux');
        Ext.Loader.setPath('Common', 'SubSystems/' + subsystem + '/Common/Client/js');
        Ext.require(['Ext.ux.RowExpander', 'Ext.ux.ProgressBarPager']);
        Ext.QuickTips.init();

        App.Init();
        document.getElementById('presentation').innerHTML = '';
        //document.getElementById('loading_div').class = '';
        //document.getElementById('loading_div').style = 'visibility:hidden;position:absolute;left:0;top:0;z-index:0;height:0;';
        App.FireEvent('afterload');
    });
</script>
</html>
<?PHP
$_caller = new FnCaller();

if (isset($_SESSION['SWAP_APP']))
$_caller->Execute("AppEvent.Throw." . $_SESSION['CUS'] . ".afterchange", null);
$_caller->Execute("AppEvent.Throw." . $_SESSION['CUS'] . ".afterload", null);

//include('update.php');
// EventsManager::GetInstance()->ThrowEvent($_SESSION['CUS'], 'afterchange');
//EventsManager::GetInstance()->ThrowEvent($_SESSION['CUS'], 'afterload');

?>