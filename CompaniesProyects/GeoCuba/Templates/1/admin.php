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


    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

</head>
<body style="margin:3%;" id="body"
">
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
                        <li><a href="#">Configurar Template</a></li>
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
<div class="Sbsist">
    <div class="row">
        <div class="col-lg-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <i class="fa fa-users fa-5x"></i>
                        </div>
                        <div class="col-xs-6 text-right">
                            <p class="announcement-heading">Cantidad total de Usuarios <span id="U_todos"></span></p>

                            <p class="announcement-text">Mis Usuarios!</p>
                        </div>
                    </div>
                </div>
                <br>

                <div class="list-group" id="list_roles"></div>
            </div>
        </div>
        <div class="col-lg-3">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <i class="fa fa-money fa-5x"></i>
                        </div>
                        <div class="col-xs-6 text-right">
                            <p class="announcement-heading">18</p>

                            <p class="announcement-text">Mis Invitados</p>
                        </div>
                    </div>
                </div>

                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover table-striped tablesorter">
                            <thead>
                            <tr>
                                <th>Order # <i class="fa fa-sort"></i></th>
                                <th>Order Date <i class="fa fa-sort"></i></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>3326</td>
                                <td>10/21/2013</td>

                            </tr>
                            <tr>
                                <td>3325</td>
                                <td>10/21/2013</td>

                            </tr>
                            <tr>
                                <td>3324</td>
                                <td>10/21/2013</td>

                            </tr>
                            <tr>
                                <td>3319</td>
                                <td>10/21/2013</td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel panel-info">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <i class="fa fa-clock-o fa-5x"></i>
                        </div>
                        <div class="col-xs-6 text-right">
                            <p class="announcement-heading">18</p>

                            <p class="announcement-text">Usuarios Activos</p>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="list-group">
                        <a href="#" class="list-group-item">
                            <span class="badge">just now</span>
                            <i class="fa fa-calendar"></i> Calendar updated
                        </a>
                        <a href="#" class="list-group-item">
                            <span class="badge">4 minutes ago</span>
                            <i class="fa fa-comment"></i> Commented on a post
                        </a>
                        <a href="#" class="list-group-item">
                            <span class="badge">23 minutes ago</span>
                            <i class="fa fa-truck"></i> Order 392 shipped
                        </a>
                        <a href="#" class="list-group-item">
                            <span class="badge">46 minutes ago</span>
                            <i class="fa fa-money"></i> Invoice 653 has been paid
                        </a>
                    </div>
                </div>
            </div>
        </div>


    </div>
    <!-- /.row -->
    <div class="row">
        <div class="col-lg-6">
            <div class="panel panel-warning">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <i class="fa fa-check fa-5x"></i>
                        </div>
                        <div class="col-xs-6 text-right">
                            <p class="announcement-heading">Cantidad total de Avisos <span id="cantAvisos"></span></p>

                            <p class="announcement-text">Ultimos Avisos</p>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="list-group" id="avisos_completops"></div>
                    <div class="text-right">
                        <a href="#">Ver todas <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <i class="fa fa-comments fa-5x"></i>
                        </div>
                        <div class="col-xs-6 text-right">
                            <p class="announcement-heading">Cantidad total de Contactos y Sujerencias <span
                                    id="cantmensajes"></span></p>

                            <p class="announcement-text">Contactos y Sujerencias!</p>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="list-group" id="mensajes"></div>
                    <div class="text-right">
                        <a href="#">Ver todas <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-danger">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <i class="fa fa-tasks fa-5x"></i>
                        </div>
                        <div class="col-xs-6 text-right">
                            <p class="announcement-heading" id="">Cantidad total de Avisos <span id="cantlogs"></span>
                            </p>

                            <p class="announcement-text">Actividad y Logs</p>
                        </div>
                    </div>
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover" id="dataTables-example">
                            <thead>
                            <tr>
                                <th>Usuario <i class="fa fa-sort"></i></th>
                                <th>Sistema<i class="fa fa-sort"></i></th>
                                <th>Modulo<i class="fa fa-sort"></i></th>
                                <th>Hora <i class="fa fa-sort"></i></th>
                                <th>Función <i class="fa fa-sort"></i></th>
                            </tr>
                            </thead>
                            <tbody id="logs"></tbody>
                        </table>
                    </div>
                    <div class="text-right">
                        <a href="#">Ver todas <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <!-- /.row -->
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