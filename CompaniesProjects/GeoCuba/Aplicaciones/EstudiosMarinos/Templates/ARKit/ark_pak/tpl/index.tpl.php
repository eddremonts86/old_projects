<?php
/**
 * Created by JetBrains PhpStorm.
 * User: remonts
 * Date: 1/01/14
 * Time: 22:06
 * To change this template use File | Settings | File Templates.
 */
?>
     <script type="text/javascript" >
         $(document).ready(function() {
             $('#nav_inicio li').removeClass('active');
             $('#Inicio').addClass('active');
         });
     </script>
      <br>
        <div class="alert alert-success alert-block">
                    <div id="ark_b_1" style="float: right"><i class="icon-chevron-up"></i></div>
                    <h4>¿Qué es ARKit 2.0?</h4><br>
                    <div id="ark_1">
                    <div class="contenedorG">
                        <div class="contenedor_Green">ARKit 2.0</div>
                    <b>ARKit</b> es un conjunto de carpetas y clases que le brindan al
                    programador una forma de estructurar y desarrollar de manera rápida y
                    eficiente aplicaciones seguras para la gestión en ambiente web.<br>
                        <b>Requisitos previos</b><br>
                        <b>ARKit</b> requiere de los siguientes requisitos para su funcionamiento:<br>
                        <li> Computadora Pentium III 1024Mhz o superior.</li>
                        <li> Memoria RAM 512 ó Superior</li>
                        <li> Espacio libre en disco duro 128 MB ó Superior.</li>
                        <li> Sistema Operativo Windows XP, superior ó LINUX.</li>
                        <li> Navegador Web (Moxilla Firefox preferiblemente).</li>
                        <li> Servidor Web instalado (XAMPP, MapServer, AppServer).</li>
                    </div>
                    <br>
                    <div id="importante">Debe saber que...</div>
                    <div id="cuerpo"></div>
            </div>
                </div>
        <div  class="alert alert-success alert-block">
                        <div id="ark_b_2" style="float: right"><i class="icon-chevron-up"></i></div>
                        <h4>Filosofía general</h4>
                        <div id="ark_2">
                        La arquitectura está concebida para que sea un gran sistema que contenga o maneje varios subsistemas.<br>
                        <span class="label label-info">Ejemplo:</span>  un subsistema para el control de la producción, otro para el control de la contratación, otro para el control de los recursos humanos, en fin tantos como se quiera.<br>
                        Cada subsistema está compuesto por módulos. <br>
                        <span class="label label-info">Ejemplo:</span> el subsistema del control de la producción tiene un módulo para gestionar los productos que se realizan, uno para controlar la calidad de los productos, uno para controlar la cantidad de productos, etc.<br>
                        Finalmente cada módulo tiene un conjunto de funcionalidades.<br>
                        <span class="label label-info"> Ejemplo:</span> el módulo que gestiona los productos del subsistema del control de la producción permite adicionar, modificar y eliminar los productos.<br>
                        Bajo esta filosofía de organizar la aplicación en subsistemas que contienen módulos y a su vez estos tienen funcionalidades se desarrolla la arquitectura que se presenta.<br>
                        Además se incluye un subsistema para la administración de usuarios. Conjuntamente se registran los intentos de autenticación y las llamadas al servidor así como los errores.<br>
                    </p><br>
                    </div></div>
        <div   class="alert alert-success alert-block">
            <div id="ark_b_3" style="float: right"><i class="icon-chevron-up"></i></div>
                    <h4>Estructura de directorios</h4>
                    <div id="ark_3">
                    <table>
                        <tr>
                            <td style="width: 150px; height:90%; padding-right: 5px" > <img src="Templates/ARKit/ark_pak/img/estructura.png"></td>
                            <td>
                                <p>La estructura inicial de directorios de <b>ARKit</b>  cuenta básicamente con seis carpetas y tres ficheros.<br>
                                    La carpeta <b>App</b> almacena las clases controladoras de la aplicación en general, esta se divide en parte cliente y parte servidor.<br>
                                    La carpeta <b>Framework</b> almacena en su parte cliente los Frameworks
                                    <li>Ext Js v4.2.1</li>
                                    <li>FrKCss v1.1 (contiene a su vez Jquery v1.9 y Bootstrap v2.3.0)</li>
                                    <li>Oxigen v1.0</li>
                                     y en su parte servidor contiene las clases que intervienen en el acceso a datos, el manejo de módulos y la seguridad de la aplicación.<br>
                                    La carpeta <b>Help</b> contiene algun tipo de ayuda especiica de la aplicacion que se realizara con <b>ARKit</b>.<br>
                                    La carpeta <b>install</b> nos provee de un wizard de instalacion de la aplicación para la gestion de bases de datos y usuarios de <b>ARKit</b>.<br>

                                    La carpeta <b>Subsystems</b>,contiene los subsistemas que soporta la aplicación en general. El nombre de los subsistemas tiene que coincidir con el nombre de
                                    las carpetas por ello se recomienda que el nombre solo contenga letras, sin espacio ni puntos ni tildes. Cada subsistema contiene una
                                    carpeta (Config) para la configuración del mismo y una carpeta para cada módulo que contiene el subsistema. Cada carpeta de los
                                    módulos tiene también una parte cliente (Client) y una parte servidor (Server). También el nombre de la carpeta del módulo tiene que
                                    coincidir con el nombre del módulo.<br>
                                    La carpeta <b>Templates</b> contiene los temas de inicio de <b>ARKit</b> y los personalizados para la aplicación realizada.<br>
                                    Finalmente cuenta con dos ficheros, <b>index.php</b> que es la página para que el usuario se autentique
                                    para entrar al sistema y <b>main.php</b> que es
                                    la página donde se carga el sistema la que se accede.
                                </p>

                            </td>
                        </tr>
                    </table>
                </div> </div>
        <div   class="alert alert-success alert-block">
            <div id="ark_b_4" style="float: right"><i class="icon-chevron-up"></i></div>
                      <h4>Archivos de configuración.</h4>
            <div id="ark_4">
                         <p>Con el objetivo de hacer flexible la aplicación se necesitan ficheros que definan la configuración de determinados elementos del sistema en su conjunto.
                             <br>Primero, es necesario definir tres elementos en la aplicación general, los subsistemas que contiene, el modo en tiempo de ejecución y el acceso a datos a la base de datos que interviene en la seguridad de la aplicación.
                             <br>Segundo, es necesario definir para cada subsistema dos ficheros que intervienen en la visualización de la aplicación y un tercer fichero donde se definen las conexiones a base de datos.</p>
                     <h5>Subsistemas integrados a la aplicación (config.xml)</h5>
                         El archivo donde se definen los subsistemas de la aplicación se localiza en App\Config\config.xml y su estructura se la siguiente:
                         <div id="ejemplo1"><span class="label label-info">Ver Ejemplo:</span></div>
                         <div id="ejemplo1_1" hidden="true">
                            <div class="contenedorB">
                                <div class="contenedor_Blue"id="ejemplo1">Ejemplo: config.xml</div>
                                <pre class="prettyprint linenums">
  &lt;?xml version="1.0" encoding="iso-8859-1"?&gt;
     &lt;App&gt;
        &lt;subsystem name="Admin"/&gt;
        &lt;subsystem name="RecursosHumanos"/&gt;
     &lt;/App&gt;
                                </pre>
                                Nota: Este archivo de configuración no puede tener comentarios.<br>
                                Donde el valor de la propiedad “name” de la etiqueta “subsystem” indica el nombre del subsistema, de esta forma se puede definir tantos subsistemas como se desee.
                            </div>
                            </div>
                     <h5>Modo de ejecución de la aplicación (app_config.php)</h5>
                            <p>
                                Pensando en el proceso de desarrollo, se decidió que la aplicación pueda correr en de tres formas:
                                <br> 1. Construcción (DEBUG): Este modo de correr de la aplicación es para el momento en el que el programador está desarrollando la aplicación. En este modo la aplicación le muestra al desarrollador los errores generados en la parte servidor, ya sea en el acceso a datos o en la lógica de la programación. No se realiza el registro llamadas al servidor.
                                <br> 2. Prueba (TESTING): Este modo de correr de la aplicación es para probar la aplicación teniendo en cuenta la seguridad de la misma, o sea, permitiendo a cada usuario ver y hacer lo que se estableció. (Ver más adelante la administración de la aplicación). Se realiza el registro de llamadas al servidor y se muestra al usuario la descripción completa del error.
                                <br> 3. Ejecución (RELEASE): Este es el modo de correr de la aplicación cuando esta está lista. Se realiza el registro de llamadas y errores cuando ocurre un error interno se notifica al usuario un mensaje de error muy general.

                            </p>
                         El fichero contiene esta configuración se localiza en App\Config\app_config.php y su estructura es la siguiente:
                         <div id="ejemplo2"><span class="label label-info">Ver Ejemplo:</span></div>
                         <div id="ejemplo2_1" hidden="true">
                         <div class="contenedorB">
                             <div class="contenedor_Blue">Ejemplo: app_config.php</div>
                             <pre class="prettyprint linenums">
  &lt;?php
      define(DEBUG_MODE, 1); // Modo de construcción
      define(TESTING_MODE, 2); // Modo de prueba
      define(RELEASE_MODE, 3); // Modo de ejecución.
     // Define el modo en que se ejecuta la aplicación.
      define(RUN_APP_MODE, DEBUG_MODE);
     // Define el sistema que se carga en el modo de construcción.
      //$_SUBSYSTEM = 'Admin';
      $_SUBSYSTEM = 'RecursosHumanos';
  ?&gt;
                         </pre>
                         Nota: Es necesario notar que la última línea define el subsistema que se cargará por defecto estando la aplicación en modo de construcción y que el programador debe entrar directamente a la página main.php.
                         </div>
                         </div>
                     <h5>Configuración de acceso a la base de datos de la seguridad (db_access.php)</h5>
                        <p>
                            Teniendo en cuenta que la aplicación final puede estar montado en varios sistemas gestores de base de datos (hasta el momento PostgreSQL, MySQL, Microsoft SQL Server y Microsoft Access) es posible también montar la seguridad en alguno de estos gestores, incluso puede ser que el programador quiera darle distintos nombres a las tablas o puede que el sistema gestor de base de datos no soporte schemas como el PostgreSQL y por consiguiente el nombre de las tablas cambia.
                        </p>
                         <div class="contenedorY">
                             <div class="contenedor_Yelow">Nota</div>
                             Puede cambiar el sistema gestor de base de datos, puede cambiar el nombre de las tablas que intervienen en la seguridad pero no pueden cambiar los nombres de los campos de las tablas ni las relaciones entre estos.
                         </div><br>
                        <p>
                            Para paliar este posible conflicto se define en el fichero App\Config\db_access.php la clase SecurityConnections. En esta se definen los parámetros de conexión a base de datos y los nombres de las tablas que intervienen en la seguridad de la aplicación. A continuación se muestra el fichero.
                        </p>
                         <div id="ejemplo3"><span class="label label-info">Ver Ejemplo:</span></div>
                         <div id="ejemplo3_1" hidden="true">
                         <div class="contenedorB">
                         <div class="contenedor_Blue">Ejemplo: db_access.php</div>
                             <pre class="prettyprint linenums">
 &lt;?php
    final class SecurityConnections
       {
       private $_tables;
       private $connections_config;
       private static $_instance = null;
       private function __construct() {
       // Define los parámetros de conexión a la base de datos que interviene en la seguridad
       // La llave „security‟ del arreglo asociativo no puede ser cambiada.
       $this->connections_config['security'] = array();
       $this->connections_config['security']['type'] = 'PostgreSQL';
       $this->connections_config['security']['host'] = 'localhost';
       $this->connections_config['security']['user'] = 'postgres';
       $this->connections_config['security']['port'] = '5432';
       $this->connections_config['security']['pass'] = 'postgres';
       $this->connections_config['security']['dbase'] = 'security';
       // Define los nombres de las tablas que tienen que ver con la seguridad.
       $this->_tables = array();
       // Tabla donde se almacenan los subsistemas registrados en la aplicación
       $this->_tables['subsystems'] = 'app_security.subsystems';
       // Módulos que contienen los subsistemas
       $this->_tables['modules'] = 'app_security.modules';
       // Funciones que tienen los módulos
       $this->_tables['functions'] = 'app_security.functions';
       // Tabla que almacena le acceso de los usuarios a los subsistemas
       $this->_tables['subsystems_access'] = 'app_security.subsystems_access';
       // Tabla que almacena los usuarios registrados en la aplicación
       $this->_tables['users'] = 'app_security.users';
       // Tabla que almacena las funciones a las que tienen acceso los usuarios
       $this->_tables['users_access'] = 'app_security.users_access';
       }
       public static function GetInstance() {
       if(self::$_instance == null) self::$_instance = new SecurityConnections ();
       return self::$_instance;
       }
       public function GetConnectionParams($ConnectionName) {
       return $this->connections_config[$ConnectionName];
       }
       public function GetTableName($Table) {
       return $this->_tables[$Table];
       }
       }
 ?&gt;
                         </pre>
                         Nota:Mas adelante se abordarán los parámetros de conexión que se establecen para cada tipo de sistema gestor de base de datos que soporta la
                              arquitectura y se mostrará el modelo de base de datos de las tablas que intervienen en la seguridad de la aplicación.<br>
                         </div>
                     </div>
                     <h5>Configuraciones de los subsistemas</h5>
                         <p>
                             Cada subsistema tiene su configuración, tanto de la parte cliente como de la parte servidor. En la parte cliente se define mayormente parte de la interface visual de la aplicación. Se tienen en cuenta elementos como el banner, el área de trabajo, el ícono del sistema, el título y la apariencia del Framework Ext. En la parte servidor se definen los módulos del subsistema y las funcionalidades de cada módulo.
                         <br>Esta información se le da en los apartados <a href="?termino=Cliente"><span class="label label-success">Cliente</span></a>y  <a href="?termino=Servidor"><span class="label label-success">Servidor</span></a>  respectivamente.
                         </p>
                     </div></div>
      <br>

