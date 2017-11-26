<?PHP
session_start();
include "App/Server/index_data.php";
/*$nombre_fichero='install/index.php';
$nombre_fichero1='install\index.php';
if(file_exists($nombre_fichero)||file_exists($nombre_fichero1)){header('Location:install/index.php');}*/
if(isset ($_SESSION['CUI']))
{
    unset($_SESSION['CUI']);
    unset($_SESSION['CUS']);
    unset($_SESSION['CSI']);
    unset($_SESSION['USER_NAME']);
    unset($_SESSION['USER_LOG']);
    unset($_SESSION['CONFIG']);
    unset($_SESSION['DOMAIN']);
}
if(isset($_SESSION['ENTRY']))
    unset($_SESSION['ENTRY']);
if(!isset($_SESSION['_AT']))
{
    $_hour = intval(date('G')) + rand(1,5);
    $_min = intval(date('i')) + rand(10, 25);
    $_seg = strval(intval(date('s')) + rand(10, 45));

    $_rigth = $_seg[0];
    $_left = $_seg[1];

    $_seg = $_rigth . '1' . $_left;

    $_time = date('yn.j') . "$_hour.$_min.$_seg";
    $_SESSION['_AT'] = $_time;
}
$cwd = getcwd();
$_cwd = str_replace('\\','/',$cwd);
$_SESSION['APP_PATH'] =  $_cwd;

// Read the client config
require_once('App/Server/ClientConfigReader.php');
$_cconf = new ClientConfigReader();
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <?PHP echo $_cconf->GetAppGeneralIcon(); ?>
    <title>Hermes-Sistema de Control del Capital Humano</title>

    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/resources/css/<?PHP echo $_cconf->GetExtTheme(); ?>.css"/>
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/src/ux/css/ItemSelector.css">
	<link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/resources/css/ext-all-neptune.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/font-awesome.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/event.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap-responsive.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/docs.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/sb-admin.css">

	<script src="Framework/Client/ExtJs/ext-all.js"></script>
    <script src="Framework/Client/FrKCss/js/jquery.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap.min.js"></script>
	<script src="Framework/Client/FrKCss/js/docs.min.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.core.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.widget.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.mouse.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.draggable.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.droppable.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.sortable.js"></script>
    <script src="Framework/Client/FrKCss/js/ui/jquery.ui.accordion.js"></script>

    <script src="App/Client/js/index.js"></script>
    <link rel='shortcut icon' type='image/png' href='SubSystems/Admin/Config/Client/icons/Admin.png'/>
</head>
<body data-spy="scroll" data-target=".bs-docs-sidebar" id="body">
<!-- Navbar
================================================== -->
<!-- div class="navbar navbar-fixed-top" id='hint'>
    <div class="bs-docs-examaple">
        <div class="navbar navbar-inverse1">
            <div class="navbar-inner">
                <div class="containqer">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-responsive-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <div class="nav-collapse collapse navbar-responsive-collapse">
                        <ul class="nav">
                            <li><a href="#"></a></li>
                            <li id="inicio" class="active"><a href="#"><i class="icon-home 1icon-white"></i>Inicio</a></li>
                            <li id="hermes"><a href="#"><i class="icon-signal 1icon-white"></i>Sobre Hermes</a></li>
                            <li id="nosotros"><a href="#"><i class="icon-user 1icon-white"></i>Sobre Nosotros</a></li>
                            <li id="contacto"><a href="#"><i class="icon-comment 1icon-white"></i>Contactenos</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Menu  -->
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
		<li id="inicio" class="active"><a href="#"><i class="icon-home 1icon-white"></i>Inicio</a></li>
		<li id="hermes"><a href="#"><i class="icon-signal 1icon-white"></i>Sobre Hermes</a></li>
		<li id="nosotros"><a href="#"><i class="icon-user 1icon-white"></i>Sobre Nosotros</a></li>
		<li id="contacto"><a href="#"><i class="icon-comment 1icon-white"></i>Contactenos</a></li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li class="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li class="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
		
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>


<!-- FIN Menu  -->

<!-- Docs nav================================================== -->
<div class="container-fluid" style="width:100%;height:100%">
  <div class="row-fluid" style="width:100%;height:100%">
      <div class="row" style="width:100%;height:100%">
          <div id="left-side" class="col-lg-3">
              <div class="well" style="max-width: 340px; padding: 8px 0;border:none">
                  <ul class="nav nav-pills nav-stacked">
                    <div class="alert alert-info">
                          <a href="#" class="alert-link">SISTEMAS</a>
                    </div>
                    <li class="active">
						<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Capacitación">Capacitación</a>
					</li>
						  <div id="Capacitación" class="accordion-body collapse">
                              <ul class="nav nav-pills nav-stacked">
                                  <li id="Icapacitacion"><a href="#">Introducción.</a></li>
                                  <li><a href="#">Cursos.</a></li>
                                  <li id="Cdisp"><a href="#">Disponibles</a></li>
                                  <li id="gest"><a href="#">En Gestion</a></li>
                              </ul>
						  </div>
                    <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Plantilla">Plantilla</a></li>
                          <div id="Plantilla" class="accordion-body collapse">
                              <ul class="nav nav-pills nav-stacked">
                                <li id="Iplantilla"><a href="#">Introducción.</a></li>
                              </ul>
                          </div>
                    <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Sistema">Sistema Base</a></li>
                          <div id="Sistema" class="accordion-body collapse">
                              <ul class="nav nav-pills nav-stacked">
                                <li id="ISistema"><a href="#">Introducción.</a></li>
                              </ul>
                          </div>
                    <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Administración">Administración</a></li>
                          <div id="Administración" class="accordion-body collapse">
                              <ul class="nav nav-pills nav-stacked">
                                <li class="accordion-innler" id="Iadmin"><a href="#">Introducción.</a></li>
                              </ul>
                          </div>

                    <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Asuntos">Otros Asuntos</a></li>
                      <div id="Asuntos" class="accordion-body collapse">
                          <ul class="nav nav-pills nav-stacked">
                              <li><a href="#" id="eventos">Proximos Eventos</a></li>
                              <li><a href="#" id="regul">Regulaciones</a></li>
                              <li><a href="#" id="info">Información General</a></li>
                              <li class="divider"></li>
                              <li><a href="#" id="help">Ayuda</a></li>
                          </ul>
                      </div>

                  </ul>
              </div>
          </div>

          <div id="center" class="col-lg-8 Sbsist sombra_simple_der" aling="center">
              <div id="cuerpo" style="height: 95%;overflow-y:auto;">
                  <span class=""><img src='App/Client/img/banner_Centro/medio.png'class="img-rounded"></span>
              </div>
          </div>

</div>
  </div></div>
</body>
</html>