<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Campismo Popular</title>
    <?php include_once('include.clas.php'); ?>
</head>
<body style="margin:3%;margin-top:2%;" id="body">
<div class="sombra1">
<div class="cuerpo">
<!--==========================================Barra de Navegación===============================================-->
<div style="width: 100%;height: 150px"><img src="img/Imagenes%20mias/prueba2.png" style="width: 100%;height: 100%;"></div>
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
                <li class="activ1e"><a href="index.php">Inicio</a></li>
                <li><a href="#">Sobre</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Contactenos</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Configuración <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="#" id="edit">Editar Template</a></li>
                        <li><a href="#" id="cloceedit"style="display: none">Editar Template <span class="label label-success">Cerrar</span></a></li>
                        <li><a href="#" id="conf">Configurar Template</a></li>
                        <li><a href="#" id="closeconf" style="display: none">Configurar Template <span class="label label-success">Cerrar</span> </a></li>
                        <li><a href="#" id="rets">Restaurar Configuración</a></li>
                        <li class="divider"></li>
                        <li><a href="admin.php">Administración</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
<!--========================================== Todo el cuerpos =================================================-->
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
                            <a href="#" class="list-group-item"><i class="fa fa-shopping-cart fa-fw"></i> Portal Cuba</a>
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
   <div id="center">
    <div style="display: none" class="panel-heading panel_visible"><i class="fa fa-desktop fa-fw"></i> Panel Central
        <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">
                 <span id="up_dawn_left">
                     <i id="dawn_left" class="fa fa-chevron-circle-down fa-fw"></i>
                 </span>
                   <span><i class="fa fa-money fa-fw"></i> </span>
             </span>
    </div>
    <div class="column" id="Noti">
        <div class="portlet">
            <div class="col-lg-1211">
                <div class="panel panel-default" id="panel_map">
                    <div class="panel-heading">
                        <i class="fa fa-map-marker fa-fw"></i> Cuba en el mundo
                        <div>
                            <div style="float: right">
                                    <span style="float: right; margin-top:-25px;padding:3px 0 20px 40px; ">&nbsp;&nbsp;&nbsp;
                                    <button style="color: #033c73;" type="button" class="close" data-dismiss="modal" aria-hidden="true" id="boton_panel_map">×</button></span>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div id="Mymap" class="grande"></div>
                    </div>
                    <div class="panel-footer" class="grande">&nbsp;
                        <div style="float: none">
                            <span style="float: right; margin-top:-25px">&nbsp;<button type="submit" class="btn btn-success mas btn-sm" id="verMarea">Buscar </button></span>
                        <span style="float: right; width:250px;  margin-top:-25px ">
                            <select id="prov_id" onchange="OnSelectProv();" class="form-control input-sm">
                                <option value="-1">Seleccione Provincia</option>
                                <option value="-85.01592,22.92290,-83.11416,21.66353">Pinar del Río</option>
                                <option value="-83.37314,23.12898,-82.42354,22.49548">Artemisa</option>
                                <option value="-82.53430,23.22463,-82.06077,22.90789">La Habana</option>
                                <option value="-82.47654,23.26377,-81.52820,22.63154">Mayabeque</option>
                                <option value="-82.03982,23.24687,-80.54685,22.23379">Matanzas</option>
                                <option value="-80.87693,22.59316,-79.92605,21.96094">Cienfuegos</option>
                                <option value="-80.33484,22.65410,-79.38396,22.02187">Villa Clara</option>
                                <option value="-79.83337,22.30610,-78.88250,21.67896">Sancti Spíritus</option>
                                <option value="-79.11990,22.23105,-78.16902,21.60137">Ciego de Ávila</option>
                                <option value="-78.79744,22.04277,-76.89568,20.77832">Camaguey</option>
                                <option value="-77.43770,21.34907,-76.48816,20.71938">Las Tunas</option>
                                <option value="-76.77507,21.52231,-74.88093,20.25786">Holguín</option>
                                <option value="-77.78054,20.88921,-75.88894,19.62729">Granma</option>
                                <option value="-77.01501,20.79893,-75.11580,19.53193">Santiago de Cuba</option>
                                <option value="-75.67907,20.89602,-73.77731,19.59157">Guantánamo</option>
                                <option value="-83.35339,22.00937,-82.40251,21.37587">Isla de la Juventud</option>
                            </select>
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="portlet">
            <div class="col-lg-1211">
                <div class="panel panel-default" id="panel_chart">
                    <div class="panel-heading">
                        <i class="fa fa-bar-chart-o fa-fw"></i> Registro de Mareas
                    <span style="float: right; margin-top:0px;padding:3px 0 20px 40px; ">&nbsp;&nbsp;&nbsp;<button
                            style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                            aria-hidden="true" id="boton_panel_chart">×
                        </button></span>
                    </div>
                    <div class="panel-body">
                        <div id="morris-area-chart"></div>
                    </div>
                    <div class="panel-footer" class="grande">&nbsp;
                        <div style="float: none">
                            <span style="float: right; margin-top:-25px">&nbsp;<button type="submit"
                                                                                       class="btn btn-success mas btn-sm"
                                                                                       id="verMarea">Buscar
                                </button></span>
                            <span style="float: right; margin-top:-25px "><input type="month"
                                                                                 class="form-control input-sm"></span>
                            <span style="float: right; margin-top:-25px "><select class="form-control input-sm"
                                                                                  id="prov"></select></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!--==========================================Panel Derecho=====================================================-->
    <div id="right-side">
    <div style="display: none" class="panel-heading panel_visible"><i class="fa fa-chevron-right fa-fw"></i> Panel Derecho
        <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">
                 <div id="up_dawn_right">
                     <i id="dawn_right" class="fa fa-chevron-circle-down fa-fw"></i>
                 </div>
             </span>
    </div>
    <div class="column">
        <div class="portlet">
            <div class="panel panel-default" id="panel_izq_admin">
                <div class="panel-heading">
                    <i class="fa fa-adn fa-fw"></i> Encuesta
                        <span style="float: right; margin-top:-20px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq_admin">×
                            </button></span>
                </div>
                <div class="panel-body">
                    <p class="label label-success">¿ Que Opina sobre nuestro sitio ?</p>
                    <div class="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked>Bien
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">Regular
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3">Mal
                        </label>
                    </div>
                    <span style="float: none; margin-top:-25px">&nbsp;<button type="submit" class="btn btn-success mas btn-sm" id="verMarea">Votar
                        </button></span>
            </div>
        </div>
        </div>
        <div class="portlet">
            <div class="panel panel-default" id="panel_izq_admin">
                <div class="panel-heading">
                    <i class="fa fa-adn fa-fw"></i> Estado de las Reservas
                        <span style="float: right; margin-top:-20px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq_admin">×
                            </button></span>
                </div>
                <div class="panel-body">
                    <div class="list-group">
                        <a href="#" class="list-group-item">
                            <i class="fa fa-clock-o fa-fw"></i>El Cujemen<span>
                            <!--<button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>-->
                        <span class="text-muted space small"><em class="badge-danger" id="cantlogs1">69/72</em></span>
                        </a>
                        <a href="#" class="list-group-item">
                            <i class="fa fa-user-md fa-fw"></i> Rio Grande<span>
                            <!--<button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>-->
                        <span class="text-muted space small"><em class="badge-danger" id="U_todos1">50/55</em></span>
                        </a>
                        <a href="#" class="list-group-item">
                            <i class="fa fa-clock-o fa-fw"></i> El Salto<span>
                            <!--<button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>-->
                        <span class="text-muted space small"><em class="badge-warning" id="cantlogs1">70/80</em></span>
                        </a>
                        <a href="#" class="list-group-item">
                            <i class="fa fa-user-md fa-fw"></i> Bahia Azul<span>
                           <!-- <button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>-->
                        <span class="text-muted space small"><em class="badge-warning" id="U_todos1">55/63</em></span>
                        </a>
                        <a href="#" class="list-group-item">
                            <i class="fa fa-heart fa-fw"></i> Casa Verde<span>
                           <!-- <button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>-->
                        <span class="text-muted space small"><em class="badge-info" id="cantAvisos1">25/50</em></span>
                        </a>
                        <a href="#" class="list-group-item">
                            <i class="fa fa-mail-reply fa-fw"></i> Dos Hermanas<span>
                           <!-- <button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>-->
                        <span class="text-muted space small"><em class="badge-info" id="cantmensajes1">30/45</em></span>
                        </a>
                        <a href="#" class="list-group-item">
                            <i class="fa fa-mail-reply fa-fw"></i> Las Terrazas<span>
                           <!-- <button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>-->
                        <span class="text-muted space small"><em class="badge-succes"
                                                                 id="cantmensajes1">3/25</em></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
 </div>
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
                                <i style="float: left"  class="fa fa-home fa-4x"></i>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <p style="margin-top: -20px">
                                 <div style="float: left"  class="announcement-heading" id="">Información del Campismo</div>
                                    <span id="cantlogs1"></span><br>
                                 <div style="float: left"  id="campismo_name_id" class="announcement-text">Verano Azul</div>
                                </p>
                            </div>
                            <div class="col-xs-6 text-right">
                                <div  id="cerrar" style="float: right; cursor:pointer;color: #ffffff" class="badge badge-info" >x</div>
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
                                            <div class="item active" style="background-color: #005f8d;height: 300px"><img height="300" src="img/carp0/1.jpg"></i></div>
                                            <div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp0/2.jpg"></div>
                                            <div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp0/3.jpg"></div>
                                            <div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp0/4.jpg"></div>
                                            <div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp0/5.jpg"></div>
                                            <div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp0/6.jpg"></div>
                                            <div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp0/4.jpg"></div>
                                        </div>
                                    </div>
                                    <a class="left carousel-control" href="#carousel-example-generic"
                                       data-slide="prev">
                                        <i class="fa fa-angle-double-left fa-2x"></i></span>
                                    </a>
                                    <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                                    <i class="fa fa-angle-double-right fa-2x"></i></span>
                                    </a>
                                </div>
                            </div>
                            <br>
                            <br>
                            <div class="bs-example bs-example-tabs"
                                 style="height: auto; margin-left: 10px;margin-right: 15px">
                                <ul id="myTab" class="nav nav-tabs">
                                    <li class="active" id="info"><a href="#home" data-toggle="tab">Información General</a></li>
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
                            <a style="float: left" href="#">Visitar Sitio Oficial <i class="fa fa-arrow-circle-right"></i></a>
                            <button style="float: right" type="button" class="btn btn-success mas btn-sm"
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