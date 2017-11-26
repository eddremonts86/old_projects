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
        $('#Servidor').addClass('active');
    });
</script>
<br>
    <div class="alert alert-block">
        <div id="ark_b_1" style="float: right"><i class="icon-chevron-up"></i></div>
        <h2>Configuración de la parte servidor de los subsistemas</h2>
        <div id="ark_1">
        <p>
            Es evidente que es necesario definir la configuración interna de cada subsistema, o sea,
            definir los módulos y las funcionalidades de los módulos. Para ello entra en juego la
            configuración de la parte servidor de los subsistemas.
            <br>
            El fichero de configuración de la parte servidor de cada subsistema se encuentra ubicado
            en SubSystems\<Subsistema>\Config\Server\config.xml. Básicamente la estructura del
                archivo XML consiste en un nodo subsystem donde se define el nombre del subsistema.
                Dentro de dicho nodo están los nodos module donde se definen los módulos que contiene
                el subsistema, estos nodos tiene la descripción del módulo que definen. Cada nodo que
                define el módulo tiene otros dos nodos: js y functions. El contenido del nodo js no es más
                que la lista de ficheros js (sin la extensión js y separados por coma sin espacio entre ellos)
                que requieren ser incluidos a la hora de cargar el módulo. El contenido del nodo functions
                son las funcionalidades asociadas al módulo donde para cada funcionalidad se define su
                nombre, los ficheros que deben cargarse en la aplicación para su funcionamiento y su
                descripción.<br>
                A continuación se muestra un ejemplo de un fichero de configuración de la parte servidor
                de un subsistema.

        </p>
        <div id="ejemplo2"><span class="label label-info">Ver Ejemplo:</span></div>
        <div id="ejemplo2_1" hidden="true">
            <div class="contenedorB">
                <div class="contenedor_Blue" style="width: 430px">Ejemplo: SubSystems\ &lt;Subsistema>\Config\Server\config.xml.</div>
                         <pre class="prettyprint linenums">

&lt;?xml version="1.0" encoding="iso-8859-1"?>
&lt;subsystem name="RecursosHumanos">
&lt;!—El atributo name tiene con coincidir con el nombre del subsistema y el nombre de la carpeta donde está el subsistema-->
&lt;module name="Agencias" desc="Módulo para administrar las agencias de una empresa">
&lt;js>Agencias&lt;/js>
&lt;functions>
&lt;Adicionar source="Adicionar" desc="Función para crear una nueva agencia"/>
&lt;Modificar source="Modificar" desc="Función para modificar una agencia"/>
&lt;Eliminar source="Eliminar" desc="Función para eliminar una agencia"/>
&lt;/functions>
&lt;/module>
&lt;module name="Empleados" desc="Módulo para administrar los empleados de las agencias">
&lt;js>Empleados&lt;/js>
&lt;functions>
&lt;Adicionar source="Adicionar" desc="Función para adicionar un empleado"/>
&lt;Modificar source="Modificar" desc="Función para modificar los datos de unempleado"/>
&lt;Eliminar source="Eliminar" desc="Función para eliminar un empleado"/>
&lt;/functions>
&lt;/module>
&lt;/subsystem>
 </pre>
                Nota:Este archivo de configuración no puede tener comentarios<br>
            </div>
        </div>
        <br>
        <h4>Configuración del acceso a datos en la parte servidor de los subsistemas </h4>
        <p>Para definir las conexiones a bases de datos que se empleen en un subsistema se utiliza
            el fichero Subsystems\<Subsistema>\Config\Server\db_access.php. En este fichero se
                debe definir al menos una clase que hereda de ConnectionsStorage y su nombre tiene
                que ser el nombre del subsistema seguido de la palabra „Connections‟ (sin espacios). Por
                ejemplo, para definir las conexiones que se utilizarán en el subsistema SistGest de debe
                implementar la clase SistGestConnections y esta tiene que heredar de
                ConnectionsStorage.<br>
                En el constructor de esta clase se definen las conexiones y sus parámetros. Siempre debe
                llamarse al constructor de la clase padre y después definir los parámetros de conexión
                sobre la variable connections_config. Para esto se trata a connections_config como una
                matriz asociativa donde la primera llave es el nombre de la conexión y las llaves
                secundarias son los parámetros de conexión.<br>
                A continuación se muestra un ejemplo de este fichero.<br>
        </p>
        <div id="ejemplo1"><span class="label label-info">Ver Ejemplo:</span></div>
        <div id="ejemplo1_1" hidden="true"><div class="contenedorB">
                <div class="contenedor_Blue" style="width: 430px">Ejemplo: SubSystems\ &lt;Subsistema>\Config\Server\config.xml.  </div>
                <pre class="prettyprint linenums">
        &lt;?php
            class InquestConnections extends ConnectionsStorage
            {
                public function __construct()
                {
                    // Se invoca el constructor de la clase padre
                    parent::__construct();

                    $this->connections_config[„sistgest‟] = array();
                      $this->connections_config['sistgest']['type'] = 'PostgreSQL';
                      $this->connections_config['sistgest']['host'] = 'localhost';
                      $this->connections_config['sistgest']['user'] = 'postgres';
                      $this->connections_config['sistgest']['port'] = '5432';
                      $this->connections_config['sistgest']['pass'] = 'postgres';
                      $this->connections_config['sistgest']['dbase'] = 'sistgest';
                 }
            }
        ?>
                 </pre>
            </div></div>
        <br>
        <h4>Configuración del acceso a datos </h4>
        <p>
            Hasta el momento se han visto dos archivos en los cuales se establecen los parámetros
            de conexión que se utilizan en la parte servidor. Siempre se sigue la misma filosofía, una
            matriz asociativa donde la primera llave es el nombre de la conexión y las llaves
            secundarias son los parámetros de conexión. En este momento definiremos cuáles son
            los parámetros que se necesitan establecer para cada tipo de conexión.
        </p>
        <br>
        <table>
        <tr><td>
        <ul><b> Conexión con PostgreSQL:</b>
        <li> type : Tipo de conexión. Tiene que ser 'PostgreSQL' </li>
            <li> host: Servidor al que se conecta </li>
            <li> port: Puerto por el cuál se conecta</li>
            <li> user: Nombre de usuario bajo el cual se conecta</li>
            <li> pass: Contraseña</li>
            <li> dbase: Nombre de la base de datos a la que se desea conectar</li>
        </ul>
            </td>
            <td>
                <ul><b>Conexión con Microsoft Access:</b>
                    <li>type: Tipo de conexión. Tiene que ser 'Access'</li>
                    <li>driver: Driver que se utiliza para establecer la conexión. Puede ser empleado</li>
                    'DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=%s'</li>
                    <li>location: Dirección física de la base de datos</li>
                    <li>user: Nombre de usuario bajo el cual se conecta</li>
                    <li>pass: Contraseña</li>
                </ul>
            </td></tr>
        <tr><td>
        <ul><b>Conexión con Microsoft SQL Server:</b>
        <li>type: Tipo de conexión. Tiene que ser 'MsSQL'</li>
        <li>host: Servidor al que se conecta</li>
        <li>user: Nombre de usuario bajo el cual se conecta</li>
        <li>pass: Contraseña</li>
        <li>dbase: Nombre de la base de datos a la que se desea conectar</li>
        </ul>
        </td><td>
                <ul><b> Conexión con MySQL:</b>
                    <li> type: Tipo de conexión. Tiene que ser 'MySQL'</li>
                    <li> host: Servidor al que se conecta</li>
                    <li> user: Nombre de usuario bajo el cual se conecta</li>
                    <li>pass: Contraseña</li>
                    <li>dbase: Nombre de la base de datos a la que se desea conectar</li>
                </ul>


        </td></tr>  </table>
    </div>
    </div>

    <div class="alert alert-block">
    <div id="ark_b_2" style="float: right"><i class="icon-chevron-up"></i></div>
    <h2>Configuración de la parte servidor de los subsistemas</h2>
    <div id="ark_2">
        Los datos
    </div>
    </div>

    <div class="alert alert-block">
    <div id="ark_b_3" style="float: right"><i class="icon-chevron-up"></i></div>
    <h2>Configuración de la parte servidor de los subsistemas</h2>
    <div id="ark_3">
        Los datos
    </div>
    </div>

    <div class="alert alert-block">
    <div id="ark_b_4" style="float: right"><i class="icon-chevron-up"></i></div>
    <h2>Configuración de la parte servidor de los subsistemas</h2>
    <div id="ark_4">
        Los datos
    </div>
    </div>

<br>


