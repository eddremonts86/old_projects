<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 8/04/14
 * Time: 10:30
 */
?>
<html>
    <head>
        <title>Gaviota</title>
        <?php include_once('include.clas.php'); ?>
    </head>
    <body style="margin:3%;margin-top:2%;" class="myfondo" id="body">
        <div class="portlet">
            <div class="col-lg-1211">
                <div class="panel panel-default " id="panel_chart">
                    <div class="panel-heading">
                        <i class="fa fa-bar-chart-o fa-fw"></i> Gestionar informacion de Campismo
                    </div>
                    <div class="panel-body">
                        <div class="inf" style="float: left;height: auto; width:25%;">
                            <div class="form-group input-group">
                                <span class="input-group-btn dropdown">
                                         <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"><i
                                                 class="fa fa-upload"></i></button>
                                        <ul class="dropdown-menu">
                                            <p style="color: #000000">
                                                Todas la instituciones( Campismos,Casas matrices,Puntos de recogida,Instancias
                                                extrahoteleras ) existentes.
                                            </p>
                                        </ul>
                                        <!--<ul class="dropdown-menu myfondo">
                                             <p>
                                                 Si existen nuevas instituciones aqui <br>puede hacer la importacion de dichas areas.
                                             </p>
                                             <li style="background-color: #ffffff;margin-bottom: -6px;margin-left: -1px;margin-right: -1px" class="borde_fino2 pull-right clearfix dropdown-menu-intern">
                                                 <form class="navbar-form" method="post" action="App/Server/fn_call.php" onSubmit="tomarDatos()">
                                                     <div class="btn-group" data-toggle="buttons-radio" id="subsistemas">

                                                     </div>
                                                     <div class="pull-right">
                                                         <input type="file" style="border: 0px solid #cccccc;color:#000000;display:block" id="user_log1" class="span2" placeholder=" Nuevo Tipo1" name="user_log" required="true">
                                                         <br><button type="submit"class="btn btn-info mas btn-xs"id="verMarea1"><i class="fa fa-upload"></i> Importar Datos</button>
                                                         <br>
                                                         <br>
                                                     </div>
                                                 </form>
                                             </li>
                                         </ul>-->
                                    </span>
                                <select style="height: 32px" class="form-control input-sm" id="prov"></select>
                            </div>
                            <div class="form-group input-group">
                                    <span class="input-group-btn dropdown">
                                         <button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"><i
                                                 class="fa fa-plus"></i></button>
                                         <ul class="dropdown-menu">
                                             <li class="pull-right clearfix dropdown-menu-intern">
                                                 <form class="navbar-form">
                                                     <div class="btn-group" data-toggle="buttons-radio" id="subsistemas"></div>
                                                     <div class="pull-right">
                                                         <input type="text"
                                                                style="border: 1px solid #cccccc;color:#000000;width: 250px"
                                                                id="tips_inst" class="span2" placeholder=" Nuevo Tipo"
                                                                name="user_log" required="true">
                                                         <button type="submit" class="btn btn-info mas1 btn-xs" id="tip_save">
                                                             Guardar
                                                         </button>
                                                         <br>
                                                         <br>
                                                     </div>
                                                 </form>
                                             </li>
                                         </ul>
                                    </span>
                                <select style="height: 32px" class="form-control input-sm" id="prov1"></select>
                            </div>
                            <div>
                                <div class="label label-info">Categoria</div>
                                <br><br>
                                <img style="margin-top: -5px" src="img/categorias/1.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/2.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/3.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/4.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/5.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <br>
                                <img style="margin-top: -5px" src="img/categorias/1e.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/2e.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/3e.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <br>
                                <br>

                                <div class="label label-info">Tipo de Turismo</div>
                                <br><br>
                                <img style="margin-top: -5px" src="img/categorias/i.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/n.jpg"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <br>
                                <br>

                                <div class="label label-info">Tipo de Cabañas</div>
                                <br><br>
                                <img style="margin-top: -5px" src="img/categorias/cabanna_con_banno_interior.jpg"> <input
                                    type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <img style="margin-top: -5px" src="img/categorias/cabanna_sin_banno_interior.jpg"> <input
                                    type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                <br>
                                <br>

                                <div class="label label-info">Informacion de Contacto</div>
                                <br>
                                <br>
                                <textarea style="color:#000000;" id="descripcion" name="descripcion" cols="48"
                                          rows="5"></textarea>
                                <br>
                                <br>
                            </div>
                        </div>
                        <div style="float: right;height: auto; width:75%">
                            <div class="bs-example bs-example-tabs"
                                 style="height: auto; margin-left: 10px;margin-right: 15px">
                                <ul id="myTab" class="nav nav-tabs">
                                    <li class="active" id="info"><a href="#home" data-toggle="tab">Servicios que se Ofertan</a>
                                    </li>
                                    <li id="int0"><a href="#infG" data-toggle="tab">Informacion General</a></li>
                                    <li id="int0"><a href="#Lint" data-toggle="tab">Lugares de Interes</a></li>
                                    <li id="Mapa"><a href="#Mapatext" data-toggle="tab">Mapa</a></li>
                                </ul>
                                <div id="myTabContent" class="tab-content">
                                    <div class="tab-pane fade in active" id="home">
                                        <br>

                                        <div class="alert alert-success" style="margin: 5px">
                                            <img src="img/servicio/actividad_de_buceo.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/administracion.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/aire_acondicionado.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/alojamiento.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/alquiler_bicicletas.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/alquiler_caballos.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/alquiler_de_medios_nauticos.gif"> <input type="checkbox"
                                                                                                            id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/area_de_banno.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/banno_de_hombres.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <br>
                                            <br>
                                            <img src="img/servicio/banno_de_mujeres.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/bannos_mixtos.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/bar_o_snack_bar.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/cabina_audio.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/cafeteria.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/caminatas.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/numeros_cabannas.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/carpeta.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/centro_de_computacion_e_informacion.gif"> <input
                                                type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <br>
                                            <br>
                                            <img src="img/servicio/contenedores_basura.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/custodia_valores.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/desconocido_1.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/desconocido_2.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/dormitorio_hombres.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/dormitorio_mujeres.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/estacionamiento.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/minusvalidos.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/parque_infantil.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <br>
                                            <br>
                                            <img src="img/servicio/prestamos_de_libros.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/programas_animacion.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/proximidad_a_playa_o_costa.gif"> <input type="checkbox"
                                                                                                           id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/proximidad_a_rio.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/proximidad_presa_embalse.gif"> <input type="checkbox"
                                                                                                         id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/restaurante.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/ropa_de_cama.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/sala_de_tv_y_video.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/sala_juegos.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <br>
                                            <br>
                                            <img src="img/servicio/piscina.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/pista_baile.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/sitio_de_interes_historico.gif"> <input type="checkbox"
                                                                                                           id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/telefono_publico.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/tienda_souvenirs.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/tv_por_cable.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/ventilador.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/zona_acampada.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <img src="img/servicio/centro_elaboracion.gif"> <input type="checkbox" id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <br>
                                            <br>
                                            <img src="img/servicio/cocina_rustica_o_colectiva.gif"> <input type="checkbox"id="nac">&nbsp;&nbsp;&nbsp;&nbsp;
                                            <br>
                                            <br>
                                        </div>
                                    </div>
                                    <div class="tab-pane fade" id="infG">
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
                                    <div class="tab-pane fade" id="Lint">
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
                    </div>
                    <div class="panel-footer" class="grande">&nbsp;
                        <div style="float: none">
                                <span style="float: right; margin-top:-25px">&nbsp;
                                 <button type="submit" class="btn btn-info mas btn-sm" id="verMarea">Guardar</button>
                                </span>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    </body>
</html>