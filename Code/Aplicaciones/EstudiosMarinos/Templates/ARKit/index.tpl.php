<?php
/**
 * Created by JetBrains PhpStorm.
 * User: remonts
 * Date: 1/01/14
 * Time: 22:06
 * To change this template use File | Settings | File Templates.
 */
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
    <head>
        <title>ARKit 2.0</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link href="Templates/ARKit/twitter/docs/assets/css/bootstrap.css" rel="stylesheet" media="screen">
        <link href="Templates/ARKit/ext4.2/resources/css/ext-all.css" rel="stylesheet" media="screen">
        <link href="Templates/ARKit/ark_pak/css/style.css" rel="stylesheet" media="screen">
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/jquery.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-collapse.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/google-code-prettify/prettify.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-dropdown.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-alert.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-transition.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-modal.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-scrollspy.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-tab.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-tooltip.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-popover.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-button.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-carousel.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-typeahead.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/bootstrap-affix.js"></script>
        <script src="Templates/ARKit/twitter/docs/assets/js/application.js"></script>
        <script src="Templates/ARKit/ext4.2/ext-all.js"></script>
        <script src="Templates/ARKit/ark_pak/js/index.js"></script>

    </head>
    </head>
    <body  id="body" style="margin: 15px;padding: 15px; background-image: url('1Templates/ARKit/ark_pak/img/hr02.gif') !important;background-repeat: repeat;">
        <div class="container" style="width:95%;">
            <!----------------------------------------------------------------------------------------------------------------->
            <div class="navbar" style="position: static;">
                    <div class="navbar-inner">
                        <div class="container">
                            <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </a>
                           <a class="brand" href="#" rel="popover" data-placement="bottom" title="Arquitectura para desarrollo de Aplicaciones de Gestión en Ambiente Web" data-content="Le presentamos esta herramienta de desarrollo para sistemas de gestión integrados y optimisado para la implementación de solucuines web."><b>ARKit 2.0</b></a>
                           <ul class="nav pull-left" id="nav_inicio">
                               <li class="active" id="Inicio"><a href="?termino=Inicio"><i class="icon-home active"></i>Inicio</a></li>
                               <li class="" id="Cliente"><a href="?termino=Cliente"><i class="icon-user "></i>Cliente</a></li>
                               <li class="" id="Servidor"><a href="?termino=Servidor"><i class="icon-comment"></i>Servidor</a></li>
                               <li class="" id="Seguridad"><a href="?termino=Seguridad"><i class="icon-warning-sign"></i>Seguridad</a></li>
                               <li class="" id="Comunicación"><a href="?termino=Comunicación"><i class="icon-globe"></i>Comunicación C/S</a></li>
                               <li class="" id="Administración"><a href="?termino=Administración"><i class="icon-screenshot"></i>Administración</a></li>
                               <li class="" id="Nosotros"><a href="?termino=Nosotros"><i class="icon-briefcase"></i>Sobre Nosotros</a></li>
                               <li class="" id="Contactenos"><a href="?termino=Contactenos"><i class="icon-retweet"></i>Contactenos</a></li>
                           </ul>
                            <ul class="nav pull-right">
                               <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b>Framework de Ayuda</b><b class="caret"></b></a>
                                    <ul class="dropdown-menu">
                                        <li class="label label-info" style="margin-left: 10px"> EXT</li>
                                        <li><a href="Templates/ARKit/ext4.2/docs" target="_blank">Documentación EXT 4.2</a></li>
                                        <li><a href="Templates/ARKit/ext4.2/examples" target="_blank">Ejemplos EXT 4.2</a></li>
                                        <li class="label label-info"style="margin-left: 10px">CSS</li>
                                        <li><a href="Templates/ARKit/twitter/docs"target="_blank">twitter</a></li>
                                        <li><a href="Framework/Client/oxigen"target="_blank">Oxigen</a></li>
                                        <li class="label label-info"style="margin-left: 10px">Jquery</li>
                                        <li><a href="Templates/ARKit/jqapi/index.html"target="_blank">Jquery 1.9 </a></li> </ul>
                                </li>
                               <li class="divider-vertical">
                                </li>
                               <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="subs">
                                        <b>Entrar al Sistema</b>
                                        <b class="caret"></b>
                                    </a>
                                    <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                                        <li class="pull-right1 clearfix dropdown-submenu">
                                            <form class="navbar-form" method="post" action="App/Server/fn_call.php" onSubmit="tomarDatos()">
                                                <div class="btn-group" data-toggle="buttons-radio" id="subsistemas"></div><br>
                                                <div class="pull-right" style="margin-right: 10px">
                                                    <input type="text" id="user_log" class="span2" placeholder="Entre usuario" name="user_log" required="true">
                                                    <input type="password" id="user_pwd" class="span2" placeholder="Entre contreseña" name="user_pwd" required="true">
                                                    <input type="hidden" name="fn" value="App.Log.Log.LogUser">
                                                </div>
                                            </form>
                                        </li>
                                        <li class="divider"></li>
                                        <li class="active">
                                            <a href="#">Nota: <br> Recuerde que debe entrar usuario y contraseña <br>
                                                en los lugares indicados y dar clic sobre el sistema deseado.
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            <!----------------------------------------------------------------------------------------------------------------->
            <div id="center" class="Sbsist" style="height: 95%;z-index:auto;">
               <?php
               $how=$_GET['termino'];
               if($how=='Inicio'){include"ark_pak/tpl/index.tpl.php";}
               else if($how=='Cliente'){include"ark_pak/tpl/cliente.tpl.php";}
               else if($how=='Servidor'){include"ark_pak/tpl/servidor.tpl.php";}
               else if($how=='Seguridad'){include"ark_pak/tpl/index.tpl.php";}
               else if($how=='Comunicación'){include"ark_pak/tpl/index.tpl.php";}
               else if($how=='Administración'){include"ark_pak/tpl/index.tpl.php";}
               else if($how=='Nosotros'){include"ark_pak/tpl/index.tpl.php";}
               else if($how=='Contactenos'){include"ark_pak/tpl/index.tpl.php";}
               else {include"ark_pak/tpl/index.tpl.php";}
               ?>
            </div>
            <div class="footer borde sombra" style="height: 110px;">
                <p style="float: left; color:#ffffff;"><a href="#body" style="color:#ffffff;"><i class="icon-chevron-up icon-white"></i>Regresar Arriba</a></p>
                <p style="float: right">
                    ARKit 2.0 es diseñado e implementado por Agencia de Investigación y desarrollo (I+D)<br>
                    Code licensed under Apache License v2.0, documentation under CC BY 3.0.<br>
                    Glyphicons Free licensed under CC BY 3.0.<br>
                    2014
                </p>
            </div>
            <!----------------------------------------------------------------------------------------------------------------->
        </div>

    </body>
</html>
