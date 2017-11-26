<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 15/05/14
 * Time: 13:32
 */
?>
<html>
<head></head>
<body>
    <div class="myfondo">
        <div class="sombra_externa">
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
                            <ul class="nav navbar-nav 1navbar-right">
                                   <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><b class="fa fa-comment"></b> Menú<b class="caret"></b></a>
                                       <ul class="dropdown-menu dropdown menu " >
                                           <li class="acordion">
                                               <a>Presentacion</a>
                                               <div class="submenu-acordion">
                                                   <ul>
                                                       <li><a>Mi presentacion</a></li>
                                                       <li><a>Mis Cosas</a></li>
                                                       <li><a>Entretenimiento</a></li>
                                                   </ul>
                                               </div>
                                           </li>
                                           <li class="acordion">
                                               <a>Administración</a>
                                               <div  class="submenu-acordion">
                                                   <ul>
                                                       <li><a>Administrar Sistema</a></li>
                                                       <li><a>Restaurar Seccion</a></li>
                                                       <li><a>Cerrar Seccion</a></li>
                                                   </ul>
                                               </div>
                                           </li>
                                       </ul>
                                   </li>
                               </ul>
                            <ul class="nav navbar-nav">
                                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"><b class="fa fa-comment"></b> Menú <b class="caret"></b></a>
                                    <ul  class="dropdown-menu dropdown menu " id="nav" style="width: auto;">
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
                            <ul class="nav navbar-nav navbar-right">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><b class="fa fa-circle-o"></b> Configuración <b class="caret"></b></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#" id="edit">Editar Template</a></li>
                                        <li><a href="#" id="cloceedit" style="display: none">Editar Template <span
                                                    class="label label-success">Cerrar</span></a></li>
                                        <li><a href="#" id="conf">Configurar Template</a></li>
                                        <li><a href="#" id="closeconf" style="display: none">Configurar Template <span
                                                    class="label label-success">Cerrar</span> </a></li>
                                        <li><a href="#" id="rets">Restaurar Configuración</a></li>
                                        <li class="divider"></li>
                                        <li><a href="admin.php">Administración</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <!--==========================================Cuerpo===============================================-->
                <div class="nave">
                    <div id="center">
                        <div id="center_inter">
                            <div class="column" id="Noti">
                                <div class="portlet">
                                    <div class="col-lg-1211">
                                        <div class="panel panel-default" id="panel_chart">
                                            <div class="panel-heading">
                                                <i class="fa fa-bar-chart-o fa-fw"></i> Registro
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
                                                                                               class="btn btn-info mas btn-sm"
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
                        <div id="menu_der_inter">
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
                        <div id="barra_der_inter">
                            <nav class="navbar navbar-inverse mas" role="navigation">
                                <div class="container-fluid">
                                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                        <ul class="nav navbar-nav navbar-right">

                                            <form class="navbar-form navbar-left" role="search">
                                                <div class="form-group">
                                                    <input type="text" class="form-control input-sm" placeholder="Search">
                                                </div>
                                                <button type="submit" class="btn btn-info btn-sm">Buscar</button>
                                            </form>

                                         </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div id="center_info">
                            <div id="center_der">
                                <div class="portlet">
                                    <div class="col-lg-1211">
                                        <div class="panel panel-success" style="text-shadow: none">
                                            <div class="panel-heading" style="margin: -1px;color: #ffffff !important;">
                                                <span class="badge1" style="float: right">2013-10-01 15:10:27</span><i class="fa fa-adn"></i>
                                                <ba> Este es el segundo evento</ba><br><i class="fa fa-android"></i>&nbsp;
                                                <ba>Caracter: </ba>Urgente<br><i class="fa fa-calendar"></i>&nbsp;
                                                <ba>Tipo: </ba>Eventos</div>
                                            <div class="panel-body" style="color: #555555">El sistema Eureka (Gestión de Recursos Humanos) está concebido con el objetivo
                                                de posibilitar una herramienta que permita la operatividad del flujo de información relacionado con
                                                los recursos humanos en la empresa de una forma más rápida y fiel además de garantizar la calidad de
                                                la misma. El objetivo de este trabajo fue crear un sistema que intercalara con la misma base de datos
                                                de las nóminas.</div>
                                            <div class="panel-footer">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        <i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span></button>
                                                    <ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">
                                                        <li><a href="#">Action</a></li><li><a href="#">Another action</a></li>
                                                        <li><a href="#">Something else here</a></li><li class="divider"></li>
                                                        <li><a href="#">Separated link</a></li></ul></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="portlet">
                                    <div class="col-lg-1211">
                                        <div class="panel panel-success" style="text-shadow: none">
                                            <div class="panel-heading" style="margin: -1px;color: #ffffff !important;">
                                                <span class="badge1" style="float: right">2013-10-01 15:10:27</span><i class="fa fa-adn"></i>
                                                <ba> Este es el segundo evento</ba><br><i class="fa fa-android"></i>&nbsp;
                                                <ba>Caracter: </ba>Urgente<br><i class="fa fa-calendar"></i>&nbsp;
                                                <ba>Tipo: </ba>Eventos</div>
                                            <div class="panel-body" style="color: #555555">El sistema Eureka (Gestión de Recursos Humanos) está concebido con el objetivo
                                                de posibilitar una herramienta que permita la operatividad del flujo de información relacionado con
                                                los recursos humanos en la empresa de una forma más rápida y fiel además de garantizar la calidad de
                                                la misma. El objetivo de este trabajo fue crear un sistema que intercalara con la misma base de datos
                                                de las nóminas.</div>
                                            <div class="panel-footer">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        <i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span></button>
                                                    <ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">
                                                        <li><a href="#">Action</a></li><li><a href="#">Another action</a></li>
                                                        <li><a href="#">Something else here</a></li><li class="divider"></li>
                                                        <li><a href="#">Separated link</a></li></ul></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="portlet">
                                    <div class="col-lg-1211">
                                        <div class="panel panel-success" style="text-shadow: none">
                                            <div class="panel-heading" style="margin: -1px;color: #ffffff !important;">
                                                <span class="badge1" style="float: right">2013-10-01 15:10:27</span><i class="fa fa-adn"></i>
                                                <ba> Este es el segundo evento</ba><br><i class="fa fa-android"></i>&nbsp;
                                                <ba>Caracter: </ba>Urgente<br><i class="fa fa-calendar"></i>&nbsp;
                                                <ba>Tipo: </ba>Eventos</div>
                                            <div class="panel-body" style="color: #555555">El sistema Eureka (Gestión de Recursos Humanos) está concebido con el objetivo
                                                de posibilitar una herramienta que permita la operatividad del flujo de información relacionado con
                                                los recursos humanos en la empresa de una forma más rápida y fiel además de garantizar la calidad de
                                                la misma. El objetivo de este trabajo fue crear un sistema que intercalara con la misma base de datos
                                                de las nóminas.</div>
                                            <div class="panel-footer">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        <i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span></button>
                                                    <ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">
                                                        <li><a href="#">Action</a></li><li><a href="#">Another action</a></li>
                                                        <li><a href="#">Something else here</a></li><li class="divider"></li>
                                                        <li><a href="#">Separated link</a></li></ul></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="center_izq">
                                <div class="portlet">
                                        <div class="col-lg-1211">
                                            <div class="panel panel-info" style="text-shadow: none">
                                                <div class="panel-heading" style="margin: -1px;color: #ffffff !important;">
                                                    <span class="badge1" style="float: right">2013-10-01 15:10:27</span><i class="fa fa-adn"></i>
                                                    <ba> Este es el segundo evento</ba><br><i class="fa fa-android"></i>&nbsp;
                                                    <ba>Caracter: </ba>Urgente<br><i class="fa fa-calendar"></i>&nbsp;
                                                    <ba>Tipo: </ba>Eventos</div>
                                                <div class="panel-body"style="color: #555555">El sistema Eureka (Gestión de Recursos Humanos) está concebido con el objetivo
                                                    de posibilitar una herramienta que permita la operatividad del flujo de información relacionado con
                                                    los recursos humanos en la empresa de una forma más rápida y fiel además de garantizar la calidad de
                                                    la misma. El objetivo de este trabajo fue crear un sistema que intercalara con la misma base de datos
                                                    de las nóminas.</div>
                                                <div class="panel-footer">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown">
                                                            <i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span></button>
                                                        <ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">
                                                            <li><a href="#">Action</a></li><li><a href="#">Another action</a></li>
                                                            <li><a href="#">Something else here</a></li><li class="divider"></li>
                                                            <li><a href="#">Separated link</a></li></ul></div></div>
                                            </div>
                                        </div>
                                    </div>
                                <div class="portlet">
                                    <div class="col-lg-1211">
                                        <div class="panel panel-info" style="text-shadow: none">
                                            <div class="panel-heading" style="margin: -1px;color: #ffffff !important;">
                                                <span class="badge1" style="float: right">2013-10-01 15:10:27</span><i class="fa fa-adn"></i>
                                                <ba> Este es el segundo evento</ba><br><i class="fa fa-android"></i>&nbsp;
                                                <ba>Caracter: </ba>Urgente<br><i class="fa fa-calendar"></i>&nbsp;
                                                <ba>Tipo: </ba>Eventos</div>
                                            <div class="panel-body" style="color: #555555">El sistema Eureka (Gestión de Recursos Humanos) está concebido con el objetivo
                                                de posibilitar una herramienta que permita la operatividad del flujo de información relacionado con
                                                los recursos humanos en la empresa de una forma más rápida y fiel además de garantizar la calidad de
                                                la misma. El objetivo de este trabajo fue crear un sistema que intercalara con la misma base de datos
                                                de las nóminas.</div>
                                            <div class="panel-footer">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        <i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span></button>
                                                    <ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">
                                                        <li><a href="#">Action</a></li><li><a href="#">Another action</a></li>
                                                        <li><a href="#">Something else here</a></li><li class="divider"></li>
                                                        <li><a href="#">Separated link</a></li></ul></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="portlet">
                                    <div class="col-lg-1211">
                                        <div class="panel panel-info" style="text-shadow: none">
                                            <div class="panel-heading" style="margin: -1px;color: #ffffff !important;">
                                                <span class="badge1" style="float: right">2013-10-01 15:10:27</span><i class="fa fa-adn"></i>
                                                <ba> Este es el segundo evento</ba><br><i class="fa fa-android"></i>&nbsp;
                                                <ba>Caracter: </ba>Urgente<br><i class="fa fa-calendar"></i>&nbsp;
                                                <ba>Tipo: </ba>Eventos</div>
                                            <div class="panel-body" style="color: #555555">El sistema Eureka (Gestión de Recursos Humanos) está concebido con el objetivo
                                                de posibilitar una herramienta que permita la operatividad del flujo de información relacionado con
                                                los recursos humanos en la empresa de una forma más rápida y fiel además de garantizar la calidad de
                                                la misma. El objetivo de este trabajo fue crear un sistema que intercalara con la misma base de datos
                                                de las nóminas.</div>
                                            <div class="panel-footer">
                                                <div class="btn-group">
                                                    <button type="button" class="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown">
                                                        <i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span></button>
                                                    <ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">
                                                        <li><a href="#">Action</a></li><li><a href="#">Another action</a></li>
                                                        <li><a href="#">Something else here</a></li><li class="divider"></li>
                                                        <li><a href="#">Separated link</a></li></ul></div></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="menu_der">
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

            </div>
        </div><!--
        <div id="footer"></div>-->
    </div>
</body>
</html>