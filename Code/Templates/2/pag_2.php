<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 27/05/14
 * Time: 11:20
 */
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Gaviota</title>
    <?php include_once('include.clas.php'); ?>

</head>
<body style="margin:3%;margin-top:2%;" id="body">
<div class="sombra1">
<div class="cuerpo myfondo">
<!--==========================================Barra de Navegación===============================================-->
<nav class="navbar navbar-inverse  mas " role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php"><!--Cuba - Campismo Popular--></a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="activ1e"><a href="index.php"><b class="fa fa-home"></b> Inicio</a></li>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Contactenos</a></li>
            </ul>


            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><b
                            class="fa fa-comment"></b> Menú <b class="caret"></b></a>
                    <ul class="dropdown-menu dropdown menu " id="nav" style="width: auto;">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a>
                            <ul>
                                <div class="sub-menu">
                                    <li><a href="#">History</a></li>
                                    <li><a href="#">Team</a></li>
                                    <li><a href="#">Offices</a></li>
                                </div>
                            </ul>
                        </li>
                        <li><a href="#">Services</a>
                            <ul>
                                <div class="sub-menu">
                                    <li><a href="#">Web Design</a></li>
                                    <li><a href="#">Internet MarketingInternet Marketing</a></li>
                                    <li><a href="#">Hosting</a></li>
                                    <li><a href="#">Domain Names</a></li>
                                    <li><a href="#">Broadband</a></li>
                                </div>
                            </ul>
                        </li>
                        <li><a href="#">Contact Us Internet Marketing</a>
                            <ul>
                                <div class="sub-menu">
                                    <li><a href="#">United Kingdom</a></li>
                                    <li><a href="#">France</a></li>
                                    <li><a href="#">USA</a></li>
                                    <li><a href="#">Australia</a></li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div style="width: 100%;height: 300px;margin-top: -20px;margin-bottom: 22px">
    <div id="carousel-example-generic" style="width: 100%;height: 300px" class="carousel slide" data-ride="carousel">
        <div id="cambio">
            <ol class="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0"
                    class="active"></li>
                <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                <li data-target="#carousel-example-generic" data-slide-to="5"></li>
                <li data-target="#carousel-example-generic" data-slide-to="6"></li>
            </ol>
            <div class="carousel-inner">
                <div class="item active" style="background-color: #005f8d;height: 300px"><img height="300"src="img/carp0/1.jpg"></i>
                </div>
                <div class="item" style="background-color: #04519b;height: 300px"><img height="300"src="img/carp0/2.jpg">
                </div>
                <div class="item" style="background-color: seagreen;height: 300px"><img height="300"src="img/carp0/3.jpg">
                </div>
                <div class="item" style="background-color: #04519b;height: 300px"><img height="300"src="img/carp0/4.jpg">
                </div>
                <div class="item" style="background-color: seagreen;height: 300px"><img height="300"src="img/carp0/5.jpg">
                </div>
                <div class="item" style="background-color: #04519b;height: 300px"><img height="300"src="img/carp0/6.jpg">
                </div>
                <div class="item" style="background-color: seagreen;height: 300px"><img height="300"src="img/carp0/4.jpg">
                </div>
            </div>
        </div>
        <!--
                       <a class="right carousel-control" href="#carousel-example-generic" data-slide="next"><i class="fa fa-angle-double-right fa-2x"></i></span></a>
                        <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"><i class="fa fa-angle-double-left fa-2x"></i></span></a>
        -->
        <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
        </a>
        <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
        </a>
    </div>
</div>
<!--==========================================Barra de Navegación===============================================-->

<div id="cuerpo" class="cuerpo">
<div class="Sbsist">
<!--==========================================Panel Izquierdo===================================================-->
<div id="left-side">
    <div style="display: none" class="panel-heading panel_visible">
        <i class="fa fa-chevron-left fa-fw"></i> Panel Izquierdo
             <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">
                 <div id="up_dawn_left">
                     <i id="dawn_left" class="fa fa-chevron-circle-up fa-fw"></i>
                 </div>
             </span>
    </div>
    <div style="min-width: 100%">
        <div class="column">
            <div class="portlet">
                <div class="panel panel-default" id="panel_izq">
                    <div class="panel-heading">
                        <i class="fa fa-bell fa-fw"></i> Menu Principal
                        <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq">×
                            </button></span>
                    </div>
                    <div class="panel-body">
                        <div class="list-group">
                            <a href="#" class="list-group-item"><i class="fa fa-comment fa-fw"></i> Inicio</a>
                            <a href="#" class="list-group-item"><i class="fa fa-twitter fa-fw"></i> Quienes Somos</a>
                            <a href="#" class="list-group-item"><i class="fa fa-envelope fa-fw"></i> Actividadtes</a>
                            <a href="#" class="list-group-item"><i class="fa fa-tasks fa-fw"></i> Alojamientos</a>
                            <a href="#" class="list-group-item"><i class="fa fa-twitter fa-fw"></i> Varadero</a>
                            <a href="#" class="list-group-item"><i class="fa fa-envelope fa-fw"></i> Cuba</a>
                            <a href="#" class="list-group-item"><i class="fa fa-twitter fa-fw"></i> Eventos</a>
                            <a href="#" class="list-group-item"><i class="fa fa-envelope fa-fw"></i> Vuelos</a>
                            <a href="#" class="list-group-item"><i class="fa fa-twitter fa-fw"></i> FAQ</a>
                            <a href="#" class="list-group-item"><i class="fa fa-envelope fa-fw"></i> Mapa del Sitio</a>
                            <a href="#" class="list-group-item"><i class="fa fa-envelope fa-fw"></i> Galeria</a>
                            <a href="#" class="list-group-item"><i class="fa fa-envelope fa-fw"></i> Contacto</a>
                        </div>

                        <!-- <button class="btn btn-success mas btn-sm" data-toggle="modal" data-target="#myModal">
                             Informacion
                             Adicional
                         </button>-->
                    </div>
                </div>
            </div>
            <div class="portlet">
                <div class="panel panel-default" id="panel_izq_gestion">
                    <div class="panel-heading">
                        <i class="fa fa-archive fa-fw"></i> Enlases Externos
                        <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq_gestion">×
                            </button></span>
                    </div>
                    <div class="panel-body">
                        <div class="list-group">

                            <a href="#" class="list-group-item"><i class="fa fa-upload fa-fw"></i> Min de Turismo</a>
                            <a href="#" class="list-group-item"><i class="fa fa-shopping-cart fa-fw"></i>Cuba Autentica</a>
                            <a href="#" class="list-group-item"><i class="fa fa-shopping-cart fa-fw"></i> Portal
                                Cuba</a>
                            <a href="#" class="list-group-item"><i class="fa fa-shopping-cart fa-fw"></i> CubaWeb</a>
                            <a href="#" class="list-group-item"><i class="fa fa-money fa-fw"></i> Cubadebate</a>
                            <a href="#" class="list-group-item"><i class="fa fa-money fa-fw"></i> InfoTur</a>
                            <a href="#" class="list-group-item"><i class="fa fa-money fa-fw"></i> Aduana General</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--==========================================Panel Central=====================================================-->
<div id="center" style="width:79.5%">
    <div style="display: none" class="panel-heading panel_visible"><i class="fa fa-desktop fa-fw"></i> Panel Central
        <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">
                 <span id="up_dawn_left">
                     <i id="dawn_left" class="fa fa-chevron-circle-down fa-fw"></i>
                 </span>
                   <span><i class="fa fa-money fa-fw"></i> </span>
             </span>
    </div>
    <div class="column" id="Noti" >
                        <div class="portlet" >
                            <div class="col-lg-1211">
                                <div class="panel panel-info">
                                    <div class="panel-heading" style="margin: -1px;color: #ffffff !important;">
                                        <span class="badge1" style="float: right">15/5/2014  </span>
                                        <i class="fa fa-adn"></i><ba> Paradisus Resorts</ba><br>
                                        <i class="fa fa-android"></i>&nbsp;<ba>Caracter: </ba>Importante
                                        <br><i class="fa fa-calendar"></i>&nbsp;<ba>Tipo: </ba> Noticias
                                    </div>
                                    <div class="panel-body">
                                        <img src="img/carp0/1.jpg" height="30%" width="45%"><br> <p style="float: right">
                                            Hoteles vacacionales de categoría Cinco Estrellas, ubicados en lugares
                                            exóticos, donde privilegiados parajes envuelven al cliente en un entorno
                                            paradisíaco. Su original y único estilo arquitectónico se integra armoniosamente
                                            al entorno natural, por lo que se les considera auténticos
                                            eco-resorts. Servicio Ultra Todo Incluido para disfrutar sin límites de
                                            una extensa oferta de restaurantes temáticos, bares, programas de entretenimiento,
                                            deportes y espectáculos organizados profesionalmente.</p>
                                        <b>Descripción :</b>
                                        <p>
                                            Resort de playa Ultra Todo Incluido de categoría
                                            Cinco Estrellas Plus, que abarca un área de 56 000 m².
                                            Su diseño arquitectónico se integra armoniosamente a
                                            la naturaleza circundante, por lo que se le considera
                                            un auténtico eco-resort. Bungalows de dos plantas, de
                                            corte horizontal y diseño elegante, con 429 habitaciones
                                            modernas estilo occidental, toque cálido y tropical, con
                                            ventanas y balcones, y decorado con pinturas murales
                                            cubanas. (para el Invierno 09-10 serán 510 habitciones)

                                        </p>
                                        <b>Recomendado para:</b>
                                        <p>Bodas, lunas de miel, eventos, convenciones, grupos,viajes de incentivo y familias.</p>
                                       <b>Se distingue por</b>
                                        • Ubicado en primera línea de playa, en Punta Francés, unas de las mejores<br>
                                        zonas de Varadero.
                                        • Ambiente abierto, espacioso, tranquilo y con diseño fino, fresco y tropical.<br>
                                        • Rodeado por la reserva ecológica Varahicacos.
                                        • Playa excelente todo el año y ubicada en zona exclusiva para el hotel, ofrece
                                        un bello jardín de palmeras y espacios para recrearse.<br>
                                        • Lobby abierto, muy fresco, ambientado con vegetación tropical, espejos
                                        de agua y vista a la playa.<br>
                                        • Habitaciones Juniors Suites y Suites con terrazas, todas decoradas
                                        con pinturas tropicales.<br>
                                        • Exclusivas Garden Villas.<br>
                                        • Gran piscina rodeada por abundante vegetación y palapas de descanso.
                                        • Áreas abiertas, palapas, espejos de agua y caminos con bellos jardines
                                        que comunican e invitan a pasear.<br>
                                        • Programa infantil y facilidades para niños.<br>
                                        • Sitio para acceso a Internet en el lobby (ciber café) y Wi-Fi en zona especial.
                                        • Gran variedad de restaurantes a la carta, bares y cafeterías.<br>
                                        • Cóctel de bienvenida.<br>
                                        • Servicio 24 hrs de Tea Time y Room Service.<br>
                                        • Pool & Beach Concierge.<br>
                                        • Diversidad de ambientes nocturnos con show y música en vivo.<br>
                                        • Restaurantes a la carta ubicados en zona especial rodeados por espejos de agua y privados romáticos en palapas.<br>
                                        • Buceo incluido ilimitado.<br>
                                        • Servicio de salones y banquetes.<br>
                                        • SPA & Wellness (próxima apertura).<br>
                                        • Servicio Real (próxima apertura).<br>
                                       <b> Áreas especiales</b>
                                        • Gazebos y palapas exteriores para bodas y celebraciones.<br>
                                        • Área ZEN (yoga y tai-chi).<br>
                                        • Palapas exteriores de descanso con servicio de cava.<br>
                                        • Life Enriching Activities (clases de cata de vino, sushi, artesanía,salsa, etc).<br>
                                        • Espacios para eventos de tipo variado en la playa, piscina, salones, etc.<br>

                                    </div>
                                    <div class="panel-footer">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown">
                                                <i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">
                                                <li><a href="#">Leer mas</a>
                                                </li>
                                                <li><a href="#">Ver sitio Oficial</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

<!--==========================================Panel Derecho=====================================================-->
 </div></div>
<!--==========================================Footer=============================================================-->
<div class="footer borde sombra" style="height: 110px;margin-top: 2px">
    <p style="float: left; color:#0079d2;">
        <a href="#body" style="color:#0079d2;">Regresar Arriba</a></p>

    <p style="float: right">
        ARKit 2.0 es diseñado e implementado por Agencia de Investigación y desarrollo (I+D)<br>
        Code licensed under Apache License v2.0, documentation under CC BY 3.0.<br>
        Glyphicons Free licensed under CC BY 3.0.<br>
        2014
    </p>
</div>
</div>
</div>
</div>
<!--===================================Barra para la informacion de los Hoteles=================================-->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="width: 70%;height: 40%">
        <div class="modal-body">
            <div style="width: 100%;height: 100%; margin: 10px;">
                <div class="panel panel-info">
                    <div class="panel-heading" style="height:75px; margin:-1px">
                        <div class="row">
                            <div class="col-xs-6">
                                <i style="float: left" class="fa fa-home fa-4x"></i>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p style="margin-top: -20px">

                                <div style="float: left" class="announcement-heading" id="">Información del Campismo
                                </div>
                                <span id="cantlogs1"></span><br>

                                <div style="float: left" id="campismo_name_id" class="announcement-text">Verano Azul
                                </div>
                                </p>
                            </div>
                            <div class="col-xs-6 text-right">
                                <div id="cerrar" style="float: right; cursor:pointer;color: #ffffff"
                                     class="badge badge-info">x
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="panel panel-default">
                            <div class="bs-example" style="width: 100%;height: 300px">
                                <div id="carousel-example-generic" style="width: 100%;height: 300px"
                                     class="carousel slide" data-ride="carousel">
                                    <div id="cambio">
                                        <ol class="carousel-indicators">
                                            <li data-target="#carousel-example-generic" data-slide-to="0"
                                                class="active"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="5"></li>
                                            <li data-target="#carousel-example-generic" data-slide-to="6"></li>
                                        </ol>
                                        <div class="carousel-inner">
                                            <div class="item active" style="background-color: #005f8d;height: 300px">
                                                <img height="300" src="img/carp0/1.jpg"></i></div>
                                            <div class="item" style="background-color: #04519b;height: 300px"><img
                                                    height="300" src="img/carp0/2.jpg"></div>
                                            <div class="item" style="background-color: seagreen;height: 300px"><img
                                                    height="300" src="img/carp0/3.jpg"></div>
                                            <div class="item" style="background-color: #04519b;height: 300px"><img
                                                    height="300" src="img/carp0/4.jpg"></div>
                                            <div class="item" style="background-color: seagreen;height: 300px"><img
                                                    height="300" src="img/carp0/5.jpg"></div>
                                            <div class="item" style="background-color: #04519b;height: 300px"><img
                                                    height="300" src="img/carp0/6.jpg"></div>
                                            <div class="item" style="background-color: seagreen;height: 300px"><img
                                                    height="300" src="img/carp0/4.jpg"></div>
                                        </div>
                                    </div>
                                    <a class="left carousel-control" href="#carousel-example-generic"
                                       data-slide="prev">
                                        <i class="fa fa-angle-double-left fa-2x"></i></span>
                                    </a>
                                    <a class="right carousel-control" href="#carousel-example-generic"
                                       data-slide="next">
                                        <i class="fa fa-angle-double-right fa-2x"></i></span>
                                    </a>
                                </div>
                            </div>
                            <br>
                            <br>

                            <div class="bs-example bs-example-tabs"
                                 style="height: auto; margin-left: 10px;margin-right: 15px">
                                <ul id="myTab" class="nav nav-tabs">
                                    <li class="active" id="info"><a href="#home" data-toggle="tab">Información
                                            General</a></li>
                                    <li id="int0"><a href="#profile" data-toggle="tab">Lugares de Interes</a></li>
                                    <li id="Mapa"><a href="#Mapatext" data-toggle="tab">Mapa</a></li>
                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div class="tab-pane fade in active" id="home">
                                        <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt
                                            tofu stumptown aliqua, retro synth master cleanse. Mustache cliche
                                            tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                                            keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry
                                            richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan
                                            aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                                    </div>
                                    <div class="tab-pane fade" id="profile">
                                        <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla
                                            single-origin coffee squid. Exercitation +1 labore velit, blog sartorial
                                            PBR leggings next level wes anderson artisan four loko farm-to-table
                                            craft beer twee. Qui photo booth letterpress, commodo enim craft beer
                                            mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud
                                            organic, assumenda labore aesthetic magna delectus mollit. Keytar
                                            helvetica VHS salvia yr, vero magna velit sapiente labore stumptown.
                                            Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts
                                            beard ut DIY ethical culpa terry richardson biodiesel. Art party
                                            scenester stumptown, tumblr butcher vero sint qui sapiente accusamus
                                            tattooed echo park.</p>
                                    </div>
                                    <div class="tab-pane fade" id="Mapatext">
                                        <div id="mapasssss"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <a style="float: left" href="#">Visitar Sitio Oficial <i
                                    class="fa fa-arrow-circle-right"></i></a>
                            <button style="float: right" type="button" class="btn btn-info mas btn-sm"
                                    data-dismiss="modal">Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
