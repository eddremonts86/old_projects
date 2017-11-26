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
        <link id="default" rel="stylesheet" media="screen"  href="Templates/Hoteles/css/bootstrap.css" >
        <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/event.css">
        <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs/resources/css/ext-all-neptune.css">
        <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/oxigen/16x16/icons16x16.css">
        <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/oxigen/48x48/icons48x48.css">
        <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/oxigen/64x64/icons64x64.css">
        <link href="Templates/Hoteles/css/style.css" rel="stylesheet" media="screen">
        <script src="Framework/Client/ExtJs/ext-all.js"></script>
        <script src="Framework/Client/FrKCss/js/html5shiv.js"></script>
        <script src="Framework/Client/FrKCss/js/bootstrap.min.js"></script>
        <script src="Framework/Client/FrKCss/js/bootstrap.js"></script>
        <script src="Framework/Client/FrKCss/js/jquery.js"></script>
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
        <script src="Templates/Hoteles/js/slider.js"></script>
        <script src="Templates/Hoteles/js/hotel.js"></script>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    </head>
    <body  id="body" style="margin: 7px;padding: 15px; background-image: url('Templates/Hoteles/img/hr02.gif') !important;background-repeat: repeat;">
        <div class="container" style="width:95%;">
            <!----------------------------------------------------------------------------------------------------------------->
            <div class="banner_Sup">
                <img style="float: right ;margin-right: 15px" src="Templates/Hoteles/img/user3.png " width="64px" height="64px">
                <h2 style="float: left;margin-left: 15px" >Estudios Marinos - Habana</h2>
            </div>
            <div class="navbar" style="position: static;">
                    <div class="navbar-inner">
                        <div class="container">
                            <a class="btn btn-navbar" data-toggle="collapse" data-target=".navbar-inverse-collapse">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </a>
                            <ul class="nav" id="nav_inicio">
                                <li><a href="#"></a></li>
                                <li id="inicio" class="active"><a href="#"><i class="icon-home"></i>Inicio</a></li>
                                <li id="Estudios"><a href="#"><i class="icon-signal"></i>Estudios Marinos</a></li>
                                <li id="Nosotros"><a href="#"><i class="icon-user"></i>Sobre Nosotros</a></li>
                                <li id="Contactenos"><a href="#"><i class="icon-comment"></i>Contactenos</a></li>
                                <li id="Help"><a href="#"><i class="icon-info-sign"></i>Help</a></li>
                                <li id="FAQ"><a href="#"><i class="icon-question-sign"></i>FAQ</a></li>
                            </ul>
                            <ul class="nav pull-right">
                                <li class="divider-vertical"></li>
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
            <div id="todo">
                <div class="banner_Inf"style="padding-bottom: 1px;margin-bottom: 2px;margin-top: -20px; width: 100%;height: 467px">
                    <div id="banner1" style="width: 60% !important;height:100%; float:left; border: 2px;background: #f5f5f5">
                        <div id="Carousel_img" class="carousel slide">
                            <div class="carousel-inner" id="Carousel_img_carrusel">
                            </div>
                        </div>
                    </div>
                    <div style="width: 40% !important;height:100%; float:right;border: 2px;background:#f5f5f5;padding: 7px">
                        <div id="myCarousel" class="carousel slide">
                            <!-- Carousel items -->
                            <div style="float:right">
                                <a class="carousel-controlq left" href="#myCarousel" data-slide="prev"><i class="icon-chevron-left"></i></a>
                                <a class="carousel-controlq right" href="#myCarousel" data-slide="next"><i class="icon-chevron-right"></i></a>
                            </div>
                            <div class="carousel-inner" id="carrusel">
                                 <div class="active item">
                                      <h3><img src='App/Client/img/logo/user3.png'>Sobre Hotel Via Mar</h3>
                                      <div class='label label-info'>Información :</div>
                                      <div>
                                          En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                          empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                          principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                          para su propio desarrollo. El sistema de gestión del capital humanoes un ejemplo de soluciones que se pueden realizar para
                                          avanzar en pos de la digitalización de los procesos.<br>
                                          En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                          empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                          principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                          para su propio desarrollo. El sistema de gestión del capital humano es un ejemplo de soluciones que se pueden realizar para
                                          avanzar en pos de la digitalización de los procesos.
                                          <br>
                                          En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                          empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                          principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                          para su propio desarrollo. El sistema de gestión del capital humano es un ejemplo de soluciones que se pueden realizar para
                                          avanzar en pos de la digitalización de los procesos.<br>
                                          <div class='label label-info'style="float: right">Leer más...</div>
                                      </div>
                                  </div>
                                <div class="item">
                                    <h3><img src='App/Client/img/logo/user3.png'>Información Importante</h3>
                                    <div class='label label-info'>Hermes y su uso:</div>
                                    <div>
                                        En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                        empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                        principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                        para su propio desarrollo. El sistema de gestión del capital humanoes un ejemplo de soluciones que se pueden realizar para
                                        avanzar en pos de la digitalización de los procesos.<br>
                                        En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                        empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                        principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                        para su propio desarrollo. El sistema de gestión del capital humano es un ejemplo de soluciones que se pueden realizar para
                                        avanzar en pos de la digitalización de los procesos.
                                        <br>
                                        En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                        empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                        principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                        para su propio desarrollo. El sistema de gestión del capital humano es un ejemplo de soluciones que se pueden realizar para
                                        avanzar en pos de la digitalización de los procesos.<br>
                                        <div class='label label-info' style="float: right">Leer más...</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <h3><img src='App/Client/img/logo/user3.png'>Encuesta</h3>
                                    <div class='label label-info'>Que impresión le deja Nuestro Hotel?</div>
                                    <div style="margin-left: 30px">
                                        <label class="radio">
                                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                                            Exelente
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                                           Muy bueno
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">
                                            Bueno
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                                           Regular
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1">
                                            Malo
                                        </label>
                                        <label class="radio">
                                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
                                           Inavitable
                                        </label>
                                        <p>
                                            <button class="btn btn-primary" type="button">Enviar</button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                </div>
               <div id="cuerpo" style="display: none"></div>
            <!--------------------------------------------------Footer oparte inferior--------------------------------------------------------------->
            <div class="footer borde sombra" style="height: 110px;margin-top: -10px">
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
