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
?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Hermes-Sistema de Control del Capital Humano</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/font-awesome.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/event.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap-responsive.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/docs.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/resources/css/ext-all-neptune.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/oxigen/16x16/icons16x16.css">

    <script src="Framework/Client/ExtJs/ext-all.js"></script>
    <script src="Framework/Client/FrKCss/js/jquery.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap.min.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-tooltip.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-alert.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-popover.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-button.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-dropdown.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-collapse.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-transition.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-modal.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-scrollspy.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-tab.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-carousel.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-typeahead.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-affix.js"></script>

    <script src="App/Client/js/index.js"></script>

</head>
<body data-spy="scroll" data-target=".bs-docs-sidebar" id="body">
<!-- Navbar
================================================== -->
<div class="navbar navbar-fixed-top" id='hint'>
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
                        <ul class="nav pull-right">
                            <li class="divider-vertical"></li>
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="subs"><b>Entrar al Sistema</b> <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li class="pull-right clearfix dropdown-menu-intern">
                                        <form class="navbar-form" method="post" action="App/Server/fn_call.php" onSubmit="enviarDatos()">
                                            <div class="btn-group" data-toggle="buttons-radio" id="subsistemas">
                                            </div>
                                            <div class="pull-right">

                                                <input type="text" style="border: 1px solid #cccccc;" id="user_log" class="span2" placeholder="Entre usuario" name="user_log" required="true">

                                                <input type="password" id="user_pwd" class="span2" style="border: 1px solid #cccccc;" placeholder="Entre contreseña" name="user_pwd" required="true">

                                            <input type="hidden" name="fn" value="App.Log.Log.LogUser">
                                            </div>
                                        </form>
                                    </li>
                                    <li class="divider"></li>
                                    <li class="active"><a href="#">Nota: <br> Recuerde que debe entrar usuario y contraseña <br>en los lugares indicados y dar clic sobre el sistema deseado.</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Docs nav================================================== -->
<div class="container-fluid" style="width:100%;height:100%">
  <div class="row-fluid" style="width:100%;height:100%">
      <div id="content" style="width:100%;height:100%">
          <div id="left-side" class="Sbsist sombra_simple_izq">
              <div class="well" style="max-width: 340px; padding: 8px 0;">
                  <ul class="nav nav-list">
                      <li class="nav-header">Sistemas</li>

                      <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Capacitación">Capacitación</a></li>
                      <div id="Capacitación" class="accordion-body collapse">
                          <div class="accordion-innler" id="Icapacitacion"><a href="#">Introducción.</a></div>
                          <li class="nav-header">Cursos</li>
                          <div class="accordaion-inner"id="Cdisp"><a href="#">Disponibles</a></div>
                          <div class="accordaion-inner"id="gest"><a href="#">En Gestion</a></div>
                      </div>
                      <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Plantilla">Plantilla</a></li>
                      <div id="Plantilla" class="accordion-body collapse">
                          <div class="accordion-innler" id="Iplantilla"><a href="#">Introducción.</a></div>
                      </div>
                      <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Sistema">Sistema Base</a></li>
                      <div id="Sistema" class="accordion-body collapse">
                          <div class="accordion-innler" id="ISistema"><a href="#">Introducción.</a></div>
                      </div>
                      <li class="active"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Administración">Administración</a></li>
                      <div id="Administración" class="accordion-body collapse">
                          <div class="accordion-innler" id="Iadmin"><a href="#">Introducción.</a></div>
                      </div>

                   <li class="nav-header">Otros Asuntos </li>
                          <li><a href="#" id="eventos">Proximos Eventos</a></li>
                          <li><a href="#"id="regul">Regulaciones</a></li>
                          <li><a href="#" id="info">Información General</a></li>
                          <li class="divider"></li>
                          <li><a href="#" id="help">Ayuda</a></li>
                  </ul>
              </div>
          </div>
          <div id="center" class="Sbsist sombra_simple_der" aling="center">
              <div id="cuerpo">
                  <span class=""><img src='App/Client/img/banner_Centro/medio.png'class="img-rounded"></span>
              </div>
          </div>

</div>
  </div></div>
</body>
</html>