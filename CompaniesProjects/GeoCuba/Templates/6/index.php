<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>Estudios Marinos</title>
    <link href="cerulean/bootstrap.css" rel="stylesheet">
    <link href="jq_mainPanel.css" rel="stylesheet">
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="../Ark/Framework/Client/ExtJs/resources/ext-theme-neptune/ext-theme-neptune-all.css">
    <link href="css/plugins/morris/morris-0.4.3.min.css" rel="stylesheet">
    <link href="css/plugins/timeline/timeline.css" rel="stylesheet">
    <link href="js/openlayers/theme/default/google.css" rel="stylesheet">
    <script src="js/jquery-1.10.2.js"></script>
    <script src="../Ark/Framework/Client/ExtJs/ext-all.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js+boostrat/tab.js"></script>
    <script src="js+boostrat/carousel.js"></script>
    <script src="js+boostrat/dropdown.js"></script>
    <script src="js+boostrat/modal.js"></script>
    <!-- Page Specific Plugins -->
    <script src="js/tablesorter/jquery.tablesorter.js"></script>
    <script src="js/tablesorter/tables.js"></script>
    <script src="jq_mainPanel.js"></script>
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
    <!-- Page-Level Plugin Scripts - Tables -->
    <script src="js/plugins/dataTables/jquery.dataTables.js"></script>
    <script src="js/plugins/dataTables/dataTables.bootstrap.js"></script>

    <!-- Core Scripts - Include with every page -->
    <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>

    <!-- Page-Level Plugin Scripts - Dashboard -->
    <script src="js/plugins/morris/raphael-2.1.0.min.js"></script>
    <script src="js/plugins/morris/morris.js"></script>

    <script src="js/openlayers/OpenLayers.js"></script>


    <script src="js/jq_ui/jquery.ui.core.js"></script>
    <script src="js/jq_ui/jquery.ui.widget.js"></script>
    <script src="js/jq_ui/jquery.ui.mouse.js"></script>
    <script src="js/jq_ui/jquery.ui.draggable.js"></script>
    <script src="js/jq_ui/jquery.ui.droppable.js"></script>
    <script src="js/jq_ui/jquery.ui.effect-drop.js"></script>
    <script src="js/jq_ui/jquery.ui.sortable.js"></script>


    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

</head>
<body style="margin:3%;" id="body">
<div class="sombra1">
<div class="cuerpo">
<nav class="navbar navbar-default mas" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">Estudios Marinos</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="activ1e"><a href="index.php">Inicio</a></li>
                <li><a href="#">Sobre E-Marinos</a></li>
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Contactenos</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Configuración <b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <li><a href="#" id="edit">Editar Template</a></li>
                        <li><a href="#" id="conf">Configurar Template</a></li>
                        <li><a href="#" id="rets">Restaurar Configuración</a></li>
                        <li class="divider"></li>
                        <li><a href="admin.php">Administración</a></li>
                        <li class="divider"></li>
                        <li><a href="#">One more separated link</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div id="cuerpo" class="cuerpo">
<div id="Scuerpo" class="Sbsist">
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
                            <i class="fa fa-bell fa-fw"></i> Menu Inicial
                        <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq">×
                            </button></span>
                        </div>
                        <div class="panel-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-comment fa-fw"></i> New Comment
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73; margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73; margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-envelope fa-fw"></i> Message Sent
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73; margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-tasks fa-fw"></i> New Task
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73;margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                            </div>

                            <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal">Informacion
                                Adicional
                            </button>
                        </div>
                    </div>
                </div>
                <div class="portlet">
                    <div class="panel panel-default" id="panel_izq">
                        <div class="panel-heading">
                            <i class="fa fa-bell fa-fw"></i> Otro Menu
                        <span style="float: right; margin-top:0px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq">×
                            </button></span>
                        </div>
                        <div class="panel-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-comment fa-fw"></i> New Comment
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73; margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-twitter fa-fw"></i> 3 New Followers
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73; margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-envelope fa-fw"></i> Message Sent
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73; margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-tasks fa-fw"></i> New Task
                                        <span class="pull-right text-muted small"><em>
                                                <button style="color: #033c73;margin-top: 0px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
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
                        <div class="panel-footer" style="height:40px">&nbsp;
                            <div style="float: none">
                                <span style="float: right; margin-top:-25px">&nbsp;<button type="submit"class="btn btn-primary btn-sm"id="verMarea">Buscar</button></span>
                                <span style="float: right; margin-top:-25px "><input type="month"class="form-control input-sm"></span>
                                <span style="float: right; margin-top:-25px "><select class="form-control input-sm"id="prov"></select></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portlet">
                <div class="col-lg-1211">
                    <div class="panel panel-default" id="panel_map">
                        <div class="panel-heading">
                            <i class="fa fa-map-marker fa-fw"></i> Cuba en el mundo
                            <div>
                                <div style="float: right">
                                <span style="float: right; margin-top:-25px;padding:3px 0 20px 40px; ">&nbsp;&nbsp;&nbsp;<button
                                        style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true" id="boton_panel_map">×
                                    </button></span>
                                </div>
                            </div>
                        </div>
                        <div class="panel-body">
                            <div id="Mymap" style="width: 100%;height:400px"></div>
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
                 <div id="up_dawn_left">
                     <i id="dawn_left" class="fa fa-chevron-circle-down fa-fw"></i>
                 </div>
             </span>
        </div>
        <div class="column">
            <div class="portlet">
                <div class="col-lg-1211">
                    <div class="panel panel-default" id="panel_izq_gestion">
                        <div class="panel-heading">
                            <i class="fa fa-archive fa-fw"></i> Panel de Gestión
                        <span style="float: right; margin-top:-20px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq_gestion">×
                            </button></span>
                        </div>
                        <div class="panel-body">
                            <div class="list-group">

                                <a href="#" class="list-group-item">
                                    <i class="fa fa-upload fa-fw"></i> Server Rebooted
                                    <span><button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button>
                                        </span>
                                    <br>
                                    <span class="pull-left text-muted small"><em>11:32 AM &nbsp;</em></span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-bolt fa-fw"></i> Server Crashed!
                                        <span class="pull-right text-muted small"><em>11:13 AM &nbsp;
                                                <button style="color: #033c73;margin-top: -20px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-warning fa-fw"></i> Not Responding
                                        <span class="pull-right text-muted small"><em>10:57 AM &nbsp;
                                                <button style="color: #033c73;margin-top: -20px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-shopping-cart fa-fw"></i> New Order Placed
                                        <span class="pull-right text-muted small"><em>9:49 AM &nbsp;
                                                <button style="color: #033c73;margin-top: -20px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-money fa-fw"></i> Payment Received
                                        <span class="pull-right text-muted small"><em>Yesterday &nbsp;
                                                <button style="color: #033c73;margin-top: -20px;" type="button" class="close"
                                                        data-dismiss="modal" aria-hidden="true">×
                                                </button>
                                            </em>
                                        </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="portlet">
                <div class="col-lg-1211">
                    <div class="panel panel-default" id="panel_izq_admin">
                        <div class="panel-heading">
                            <i class="fa fa-adn fa-fw"></i> Información de Administración
                        <span style="float: right; margin-top:-20px;margin-right:5px;margin-left:50px; ">&nbsp;&nbsp;&nbsp;<button
                                style="color: #033c73;" type="button" class="close" data-dismiss="modal"
                                aria-hidden="true" id="boton_panel_izq_admin">×
                            </button></span>
                        </div>
                        <div class="panel-body">
                            <div class="list-group">

                                <a href="#" class="list-group-item">
                                    <i class="fa fa-user-md fa-fw"></i> Usuarios
                                    <span>&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;<button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>
                                    <span class="pull-right text-muted small"><em class="badge-info" id="U_todos">&nbsp;&nbsp;</em></span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-heart fa-fw"></i> Avisos
                                    &nbsp;&nbsp<span><button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>
                                    <span class="pull-right text-muted small"><em class="badge-info" id="cantAvisos">&nbsp;&nbsp;</em></span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-mail-reply fa-fw"></i> Mensajes
                                    &nbsp;&nbsp<span><button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>
                                    <span class="pull-right text-muted small"><em class="badge-info" id="cantmensajes">&nbsp;&nbsp;</em></span>
                                </a>
                                <a href="#" class="list-group-item">
                                    <i class="fa fa-clock-o fa-fw"></i> Historial
                                    &nbsp;&nbsp<span><button style="color: #033c73;margin-top: 0px; float: right" type="button" class="close"data-dismiss="modal" aria-hidden="true">×</button></span>
                                    <span class="pull-right text-muted small"><em class="badge-info" id="cantlogs">&nbsp;&nbsp;</em></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>
<!--===================================Barra para los Hoteles===================================================-->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-body">
            <div style="width: 100%;height: 100%; margin: 10px;">
                <div class="panel panel-info">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-6">
                                <i class="fa fa-home fa-5x"></i>
                            </div>
                            <div class="col-xs-6 text-right">
                                <p class="announcement-heading" id="">Información del Hotel<span
                                        id="cantlogs1"></span></p>

                                <p class="announcement-text">Verano Azul</p>
                                &nbsp;&nbsp;&nbsp;
                                <button style="color:#ffffff" type="button" class="close" data-dismiss="modal"
                                        aria-hidden="true">×
                                </button>

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
                                            <div class="item active"
                                                 style="background-color: #005f8d;height: 300px"><img height="300"
                                                                                                      src="img/carp0/1.jpg"></i>
                                            </div>
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
                                 style="height: 250px; margin-left: 10px;margin-right: 15px">
                                <ul id="myTab" class="nav nav-tabs">
                                    <li class="active" id="info"><a href="#home" data-toggle="tab">Información
                                            General</a></li>
                                    <li id="int0"><a href="#profile" data-toggle="tab">Interes</a></li>
                                    <li id="int1"><a href="#dropdown1" data-toggle="tab">Interes1</a></li>
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
                                    <div class="tab-pane fade" id="dropdown1">
                                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out
                                            mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade.
                                            Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard
                                            locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR
                                            banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg
                                            banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy
                                            retro mlkshk vice blog. Scenester cred you probably haven't heard of
                                            them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth
                                            chambray yr.</p>
                                    </div>
                                    <div class="tab-pane fade" id="Mapatext">
                                        <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out
                                            mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade.
                                            Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard
                                            locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR
                                            banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg
                                            banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy
                                            retro mlkshk vice blog. Scenester cred you probably haven't heard of
                                            them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth
                                            chambray yr.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-right">
                            <a style="float: left" href="#">Visitar Sitio Oficial <i
                                    class="fa fa-arrow-circle-right"></i></a>
                            <button style="float: right" type="button" class="btn btn-primary btn-sm"
                                    data-dismiss="modal">Close
                            </button>
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
</body>
</html>