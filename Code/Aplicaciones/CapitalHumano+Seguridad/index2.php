<?PHP
	session_start();

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
<body>
    <table style="width: 99%; height: 95%;" border="0px">
        <tr>
            <td style="width: 25%; height: 5%;"></td>
            <td style="width: 50%; height: 5%;">
            </td>
            <td style="width: 25%; height: 5%;"></td>
        </tr>
            <tr>
                <td style="width: 25%; height: 80%;"></td>
                <td style="width: 50%; height: 80%;">
                    <div id="center_index2" class="Sbsist sombra" aling="center">
                        <div id="cabeza" style="height: 100px; border-bottom: 1px;">
                            <span class=""><img src='App/Client/img/banner_Centro/banner.png'class="img-rounded">
                            <div style="float:right">
                                <a class="carousel-controlq left" href="#myCarousel" data-slide="prev"><i class="icon-circle-arrow-left"></i></a>
                                <a class="carousel-controlq right" href="#myCarousel" data-slide="next"><i class="icon-circle-arrow-right"></i></a>
                            </div>
                            </span>
                            <ul class="nav pull-righ2t">
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
                                                <div class="btn-group" data-toggle="buttons-radio" id="subsistemas"></div>
                                                <div class="pull-right">
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
                        <div id="cuerpo" style="height: 100%; border-bottom: 1px;">
                            <div id="myCarousel" class="carousel slide">
                                <!-- Carousel items -->
                                <div class="carousel-inner">
                                    <div class="active item">
                                        <h1><img src='App/Client/img/logo/user3.png'>Sobre Hermes</h1>
                                        <div class='label label-info'>Hermes y su uso:</div>
                                        <div>
                                            En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                            empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                            principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                            para su propio desarrollo. El sistema de gestión del capital humano
                                            <div class='label label-info'> “Hermes” </div> es un ejemplo de soluciones que se pueden realizar para
                                            avanzar en pos de la digitalización de los procesos.
                                        </div>
                                    </div>
                                    <div class="item">
                                        <h1>Sobre Nosotros</h1>
                                            ¿Quienes somos? <br> Se incrementan los desarrollos de software aplicados
                                            a los productos y servicios de GEOCUBA en el ámbito de la Cartografía Digital (CD),
                                            los Sistemas de Información Geográfica (SIG), la Infraestructura de Datos Espaciales (IDE), la fotogrametría, la geodesia y la topografía, el
                                            catastro, los estudios medioambientales y los estudios marinos.
                                            Se desarrollan los sistemas informáticos de gestión bajo estándares definidos y soportados bajo una misma arquitectura.
                                            Se alcanza una dirección integrada de proyectos " +
                                            informáticos y se posee un personal capacitado y competente para el desarrollo de los sistemas.
                                            <br>Se cuenta con un Centro de Datos que asegura el
                                            almacenamiento y publicación de datos y metadatos que crea la Empresa GEOCUBA Pinar del Río, así como la provisión de soluciones geoespaciales
                                            propias y otras asociadas a los servicios que oferta la Empresa a sus clientes.
                                            Se desarrollan soluciones de software con un alto valor innovativo agregado que utilizan
                                            e integran tecnologías avanzadas e inteligencia de negocios en el contexto geoespacial.<br>
                                            Los productos y servicios Geomáticos expanden su uso mediante la integración e interoperabilidad entre ellos para
                                            ofrecer servicios integrados y soluciones múltiples para diferentes usuarios con un interés común.
                                            <br>Se incrementa la provisión de dichas soluciones hacia el exterior. La provisión de productos Geomáticos
                                            han pasado a ser soluciones independientes para convertirse en productos únicos, integrando servicios y aplicaciones.
                                    </div>
                                    <div class="item">
                                        <h1><img src='App/Client/img/logo/user3.png'>Sobre Hermes</h1>
                                        <div class='label label-info'>Hermes y su uso:</div>
                                        <div>
                                            En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una
                                            empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje
                                            principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos
                                            para su propio desarrollo. El sistema de gestión del capital humano
                                            <div class='label label-info'> “Hermes” </div> es un ejemplo de soluciones que se pueden realizar para
                                            avanzar en pos de la digitalización de los procesos.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td style="width: 25%; height: 80%;"></td>
            </tr>
        <tr>
            <td style="width: 25%; height: 5%;"></td>
            <td style="width: 50%; height: 5%;"></td>
            <td style="width: 25%; height: 5%;"></td>
        </tr>
     </table>



</body>
</html>