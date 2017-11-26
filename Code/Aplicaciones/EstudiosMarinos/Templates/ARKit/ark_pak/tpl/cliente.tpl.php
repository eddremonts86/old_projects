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
        $('#Cliente').addClass('active');
    });
</script>
<br>
    <div class="alert alert-info alert-block">
        <div id="ark_b_1" style="float: right"><i class="icon-chevron-up"></i></div>
        <h2>Configuración de la parte cliente de los subsistemas</h2><br>
        <div id="ark_1">
        <div class="contenedorB">
            <div class="contenedor_Blue">Subsistemas (parte cliente)</div>
            <p>Teniendo en cuenta que cada subsistema puede verse de forma diferente,
                entonces es necesario tener en cuenta este aspecto y por ello entra en juego la
                configuración de la parte visual de cada subsistema. Para ello existen dos archivos,
                el primero config.xml y el segundo Interface.conf.js (el nombre del segundo puede cambiar).
            </p><p>
                El archivo config.xml define la hoja de estilo propia del subsistema que se usa mayormente para establecer
                los ícono del sistema, el ícono del sistema, el título que aparecerá en el navegador cuando el usuario
                final acceda a él, la apariencia del Framework Ext Js y el nombre del archivo de configuración de la
                interface visual (Interface.conf.js).
            <p>
            <p>


        </div>
            El archivo se encuentra en Subsystems\&lt;Subsistema&gt;\Config\Client\config.xml
            y su estructura se muestra a continuación.
        </p>
        <div id="ejemplo4"><span class="label label-info">Ver Ejemplo:</span></div>
        <div id="ejemplo4_1" hidden="true">
            <div class="contenedorB">
                <div class="contenedor_Blue" style="width: 430px">Ejemplo: Subsystems\&lt;Subsistema>\Config\Client\config.xml </div>
                         <pre class="prettyprint linenums">
 &lt;?xml version="1.0" encoding="iso-8859-1"?>
 &lt;subsystem name="RecursosHumanos">
     &lt;!—Ubicación de la hoja de estilo (\Config\Client\css\images.css), en caso de ser 0 no se carga el css -->
     &lt;css>css/images&lt;/css>
     &lt;!—Ubicación del icono (\Config\Client\icon\Icono.ico), en caso de ser 0 no se carga el icono-->
     &lt;icon>icon/Icono</icon>
     &lt;!— Archivo de configuración de la interface visual (\Config\Client\ Interface.conf.js) -->
     &lt;interface>Interface.conf</interface>
     &lt;!— Apariencia del Framework Ext Js (Framework/Client/ExtJs/resources/css/ext-all.css)-->
     &lt;ext-theme>ext-all&lt;/ext-theme>
     &lt;!—Título que se mostrará en el navegador -->
     &lt;title>Control de la produccion Ver 1.0&lt;/title>
 &lt;/subsystem>
 </pre>
                Nota:Este archivo de configuración no puede tener comentarios<br>
            </div>
        </div>
        <p>
            El otro fichero que interviene en la interface visual del sistema es Interface.conf.js.
            En este fichero aparece la configuración del banner de la aplicación y de la configuración del
            área de trabajo. A continuación se muestra una imagen de un sistema realizado, tomando como base
            la arquitectura que se presenta, donde aparecen las partes de la aplicación en su parte visual.
        </p>
        <div id="ejemplo2"><span class="label label-info">Ver Imagen:</span></div>
        <div id="ejemplo2_1" hidden="true">
            <div class="contenedorB">
                <div class="contenedor_Blue" style="width: 430px">Captura de aplicacion "Hermes" en subsistema de administrador</div>
                <img src="Templates/ARKit/ark_pak/img/ark.png"  style="width: 100%; height:500px; padding-right: 5px">
            </div>
        </div>

        <p>La estructura que debe tener el fichero se muestra a continuación:</p>
        <div id="ejemplo1"><span class="label label-info">Ver Ejemplo:</span></div>
        <div id="ejemplo1_1" hidden="true">
            <div class="contenedorB">
                <div class="contenedor_Blue" style="width: 430px">Ejemplo:InterfaceConf  </div>
                         <pre class="prettyprint linenums">
 InterfaceConf = {
 // Anchura de la imagen de la izquierda del banner
 left_image_width : 507,
 // Imagen de la izquierda del banner
 left_image : 'Images/Izq.png',
 // Imagen del centro del banner
center_image : 'Images/BG.png',
// Anchura de la imagen de la derecha del banner
rigth_image_width : 507,
// Imagen de la derecha del banner
rigth_image : 'Images/Der.png',
// Altura del banner
banner_heigth : 80,
  // Color de fondo del área de trabajo
desktop_color : '#515344',
  // Imagen del centro del área de trabajo
 desktop_image : 'Images/Desktop.png',
// Anchura de la imagen del centro del área de trabajo
 desktop_image_width : 560,
// Altura de la imagen del centro del área de trabajo
 desktop_image_height : 440
}

 </pre>
    </div>
 </div>





    </div> </div>
    <div class="alert alert-info alert-block">
        <div id="ark_b_2" style="float: right"><i class="icon-chevron-up"></i></div>
        <h2>La parte cliente de la arquitectura</h2>
        <div id="ark_2">
        <div class="contenedorB">
            <div class="contenedor_Blue">ARKit</div>
            <p>La arquitectura basa su funcionamiento en la parte cliente sobre le Framework de
                JavaScript Ext en su versión 4.0.3. Con el objetivo de agilizar el desarrollo de las
                aplicaciones y estandarizar el trabajo se propone una filosofía de trabajo para la parte
                cliente.<br>

                Se establece como regla que un módulo realiza la mayor parte de su trabajo en un panel
                principal, el cual se muestra en el área de trabajo y no es posible tener dos paneles
                principales de distintos módulos abiertos a la vez en el área de trabajo. Otra regla que se
                establece es que la parte cliente de un módulo sólo puede llamar a una función en la parte
                servidor de él mismo.<br>

                Bajo esta filosofía entran a jugar tres elementos, el objeto App, el Módulo en la parte
                cliente y la Funcionalidad en la parte cliente.<br>
            </p>
        </div>
        <h3> El objeto App.</h3>
        <p>El objeto App (definido en el fichero App\Client\js\App.js) es la clase controladora de la
            aplicación en la parte cliente. Dicha clase se encarga de manipular los módulos que se
            cargan en la aplicación así como sus funcionalidades, de realizar las llamadas al servidor
            y construir la parte visual de la aplicación. Para ello cuenta internamente con:<br>
            <li> Un manejador de módulos: Este objeto se encarga de manejar los módulos que se cargan en la aplicación.</li>
            <li> Un controlador de la interface visual: Este objeto se encarga de construir la aplicación en el navegador. Internamente maneja:</li>
                1. La barra de menú<br>
                2. La barra de estados<br>
                3. El banner de la aplicación<br>
                4. El área de trabajo<br>
             Además cuenta con un objeto encargado de manejar los ítems de menú que son puestos por los módulos al iniciarse la aplicación.
            <li>Un grupo de funciones para que los módulos interactúen con el objeto App.
                Existen funciones para registrar módulos y funcionalidades, para insertar ítems de
                menú, para realizar la comunicación con el servidor entre otras. </li>
        </p>
        <div id="ejemplo3"><span class="label label-important">Ver Obj APP: Funciones para interactuar con el cliente </span></div>
        <div id="ejemplo3_1" hidden="true">
        <div class="contenedorR">
        <div class="contenedor_Red" style="width: 350px">Funciones para interactuar con el cliente</div>
            <p>El objeto App brinda una serie de métodos para que los módulos y funcionalidades puedan interactuar con la aplicación en forma general. Estos son: </p>

            <li><b>RegisterModule ( module_name, module ): </b><br>Esta función registra un módulo (o
                controlador de un módulo en la clase cliente) bajo un nombre. Este nombre tiene
                que ser el mismo de la carpeta donde está definido el módulo. </li><br>
            <li><b>GetModule ( module_name ): </b>Esta función retorna una instancia del módulo cuyo
                nombre se pasa por parámetro.
            </li><br>
            <li><b>RegisterFunction ( function_name, FnInstance ): </b><br>Esta función registra una
                funcionalidad. El primer parámetro es el nombre de la funcionalidad y el segundo
                una instancia de la misma. </li><br>
            <li><b>InsertMenuItem (menu, MenuConfig ): </b><br>Esta función inserta un ítem de menú en el
                menú principal de la aplicación. El primer parámetro es el nombre del menú y el
                segundo es un objeto de configuración de un ítem de menú según Ext Js. Es
                necesario que tenga definido el atributo "handler", que es la función que maneja el
                evento clic sobre el ítem. </li><br>
            <li><b> InsertSubItemMenu (menu, menu_item_name, SubMenuConfig ): </b><br>Esta función
                inserta un ítem en un submenú dentro de un menú en la barra de menú de la
                aplicación. El primer parámetro es el nombre del menú en el que se colocará el
                ítem de menú cuyo nombre es el segundo parámetro y el tercer parámetro es un
                objeto de configuración de un ítem de menú según Ext Js. Es necesario que tenga
                definido el atributo "handler", que es la función que maneja el evento clic sobre el
                ítem. </li><br>
            <li><b>ShowMainPanel ( filterObj ): </b><br>Esta función indica al objeto App que debe mostrar el
                panel principal que corresponde al módulo actualmente activo.
            </li><br>
            <li><b>InfoMessage ( title, message ):</b> <br>Esta función muestra una pequeña notificación al
                usuario en la parte superior del navegador que se desvanece en un segundo. El
                primer parámetro es el título del mensaje y el segundo es el mensaje que se
                mostrará. Se recomienda que sean mensajes cortos.
            </li><br>
            <li><b>ShowMsgBox (Ext_MsgBox ):</b><br> Esta función muestra un mensaje de los que tiene
                definido Ext. El parámetro que se le pasa es una instancia de este mensaje.
            </li><br>
            <li><b>HideMsgBox :</b><br>Esta función oculta el mensaje que fue mostrado con ShowMsgBox.
            </li><br>
            <li><b>GetDesktopHeigth: </b><br>Esta función retorna el alto del área de trabajo
            </li><br>
            <li><b>GetDesktopWidth: </b><br>Esta función retorna el ancho del área de trabajo
            </li><br>
            <li><b>RegisterValue ( Key, Value ): </b><br>Esta función registra una variable bajo un nombre
                determinado. Su mayor uso es para compartir variables entre módulos.
            </li><br>
            <li><b>GetRegisteredValue (Key): </b><br>Esta función devuelve el valor registrado bajo la llave
                pasada como parámetro.
            </li><br>
            <li><b>DeleteRegisteredValue (Key):</b><br> Esta función elimina el valor registrado bajo la llave
                pasada como parámetro.
            </li><br>
            <li><b>ClearRegistry:</b><br>Esta función elimina todos los valores registrados. </li><br>

        </div>
        </div>

        <div id="ejemplo5"><span class="label label-important">Ver Obj APP: Funciones para la comunicación con el servidor </span></div>
        <div id="ejemplo5_1" hidden="true">
            <div class="contenedorR">
                <div class="contenedor_Red" style="width: 400px">Funciones para la comunicación con el servidor</div>
                <p>Como se explicó previamente, un módulo sólo puede invocar funciones implementadas en
                    el servidor dentro del mismo módulo. Para realizar esta comunicación el objeto App brinda
                    una serie de funciones destinada principalmente a tres acciones, construir un objeto de
                    tipo JSonStore para almacenar datos pedidos al servidor, realizar peticiones al servidor
                    para ejecutar acciones y cargar ficheros hacia el servidor.<br>
                    Toda llamada al servidor se tiene que realizar a una función de una clase. El nombre de la
                    función a invocar tiene que estar compuesto por el nombre del fichero que contiene la
                    clase, punto, el nombre de la clase contenida en el fichero y que contiene la función,
                    punto, el nombre de la función a invocar.<br><br>
                    Ejemplo: "Productos.ManejadorDeProductos.ListarProductos". El elemento antes del
                    primer punto (Productos) indica en qué fichero está la clase definida en el elemento
                    después del segundo punto (ManejadorDeProductos) y el tercero (ListarProductos) la
                    función que se desea invocar. Más claro, Invocar la función ListarProductos de la clase
                    ManejadorDeProductos que está definida en el fichero Productos.php.<br>

                    Se incluye el nombre del fichero dentro de la llamada por dos razones. La primera es que
                    un módulo puede tener muchas funciones en la parte servidor y por un problema de
                    organización y comodidad necesitar más de un fichero. La segunda razón es no obligar a
                    poner un nombre específico, así el programador puede escoger el nombre que desee
                    para el fichero.<br>

                    También se separa el nombre de la clase del nombre del fichero para no atar al
                    programador a que el mismo nombre de la clase sea el mismo que el del fichero, lo cual
                    es una buena práctica, y como segunda razón es que un fichero puede tener definida más
                    de una clase.<br>
                    Bajo esta filosofía de llamadas al servidor y para realizar las acciones anteriormente vistas
                    se definen las funciones siguientes:
                </p>
                 <li><b>BuildJsonStore ( ServerRequest, JsonConfigObj ):</b><br> Esta función construye un
                     objeto de tipo Ext.data.JSonStore. El primer parámetro es la función que debe ser
                     invocada y el segundo es el objeto de configuración con el que se crea un Store de
                     tipo JSonStore en Ext pero sin la URL. Si se quiere pasar parámetros a la función
                     que se invoca en el servidor se le pone el campo params al parámetro
                     JsonConfigObj. El campo params debe ser un objeto.
                 </li><br>
                 <li><b>PerformServerRequest ( ServerRequest, Params, CallbackFn, OnError,AppHandleError ):</b><br>
                     Esta función realiza una petición al servidor utilizando la
                     implementación de Ajax que contiene Ext. El primer parámetro es la función que se
                     invoca en el servidor. El segundo parámetro es un objeto que contiene los
                     parámetros que se le pasan a la función que se invoca. El tercer parámetro es la
                     función que se invoca una vez que retorne la respuesta del servidor, esta función
                     recibe como parámetro el objeto que se retorna del servidor. El tercer parámetro
                     es opcional y es una función para el tratamiento de errores en caso de un error en
                     la parte del servidor, si no es pasada como parámetro el objeto App realiza su
                     propio tratamiento. El último parámetro que también es opcional es para indicar si
                     la aplicación maneja el error o no. Esta función se utiliza para llamadas asíncronas
                     al servidor.
                 </li><br>
                 <li>
                    <b> PerformSyncServerRequest (ServerRequest, Params, AppHandleError):</b><br> Esta
                     función se utiliza para realizar llamadas síncronas al servidor. El primer parámetro
                     es la función que se invoca en el servidor. El segundo parámetro es un objeto que
                     contiene los parámetros que se le pasan a la función que se invoca. El tercer
                     parámetro es opcional e indica si la aplicación maneja el error en caso de fallar en
                     el servidor. Esta función devuelve el objeto que fue retornado desde el servidor en
                     caso satisfactorio. En caso contrario, o sea, si ocurrió un error retorna false.<br>
                 </li><br>
                 <li>
                     <b>UploadFile ( ServerRequest, ExtBasicForm, CallbackFn, ErrorFn ):</b><br> Esta función
                     permite cargar ficheros para el servidor. El primer parámetro es la función que se
                     invoca en el servidor. El segundo parámetro es el formulario contenido en un
                     objeto Ext.form.Panel de Ext Js. El tercer parámetro es la función que se invoca
                     una vez que se complete la petición al servidor de forma satisfactoria. Si ocurrió
                     algún error se ejecuta la función pasada en el cuarto parámetro (es opcional).<br>
                 </li><br>

            </div>
        </div>







    </div></div>
    <div class="alert alert-info alert-block">
        <div id="ark_b_3" style="float: right"><i class="icon-chevron-up"></i></div>
     <h2>Definición de módulos en la parte cliente</h2> <div id="ark_3">
        <p>La definición de la parte cliente de un módulo no es más que una clase que tiene que implementar obligatoriamente tres funciones:
        <ol>1. Init: Función en la que se inicializa el módulo. Generalmente es utilizada para
            construir el ítem de menú que activa el módulo y realizar inicializaciones
            necesarias para el trabajo del módulo.
        </ol>
        <ol>2. BuildMainPanel: Esta función se encarga de construir el panel que va a ser
            mostrado en el área de trabajo de la aplicación. </ol>
        <ol>3. Free: Esta función se encarga de “liberar” la memoria utilizada por el módulo.
            Ejemplo de esto puede ser la destrucción de las variables de tipo Ext.data.Store u
            otras variables creadas en durante el proceso de trabajo con el módulo. </ol>
        <br>
        Una vez terminada la definición de la clase del módulo es necesario registrar una
        instancia de la misma en el objeto App mediante la invocación de la función
        App.RegisterModule, que recibe como parámetros el nombre del módulo y una instancia
        de la clase anteriormente definida.<br>

        Ejemplo de la definición y registro de un módulo:
        </p>
        <div id="ejemplo6"><span class="label label-info">Ver ejemplo </span></div>
        <div id="ejemplo6_1" hidden="true">
            <div class="contenedor_Blue" style="width: 430px">Ejemplo: SubSystems\ &lt;Subsistema>\Config\Server\config.xml.  </div>
                <pre class="prettyprint linenums">

// Definición de la clase que define el módulo para la administración de los usuarios
function AdministrarUsuarios() {
 // Variables para almacenar los usuarios y roles registrados en la base de datos
 this.__data_store = null;
 this.__rols = null;

 // Función para inicializar el módulo
this.Init = function() {

  // Configuración del ítem de menú que se encargará de activar el módulo y mostrar
el panel principal del módulo en el área de trabajo de la aplicación
  var _menu_item_config = {
   text:'Usuarios',
   id: 'users_menu_id',
   iconCls : 'user',
   handler: Ext.Function.bind(this.ShowMainWindow,this)
  };
  // Insertar el ítem de menú bajo el menú Administrar
  App.InsertMenuItem('Administrar',_menu_item_config);
 }
                    // Función para construir el panel principal del módulo que será mostrado en el área de
trabajo de la aplicación
 this.BuildMainPanel = function(filterObj)
 {
this.__data_store = App.BuildJsonStore('UsersManager.UsersManager.LoadData',
{...});

  this.__rols = App.BuildJsonStore('UsersManager.UsersManager.LoadRols',{...});

  this.__rols.load();

  var _grid = new Ext.grid.GridPanel({...});

// Construcción del panel que será mostrado en el área de trabajo.
  var _panel = new Ext.Panel(
  {
   title : 'Gestionar Usuarios',
   border : true,
   frame : true,
   layout : 'fit',
   height : App.GetDesktopHeigth(),
   width : '100%',
   items : [_grid],
   listeners : {afterrender : function()
       {
    this.__data_store.load({params:{start:0, limit:25}});
       }, scope : this
   }
  });

// Se retorna el panel.
  return _panel;
 }

 // Función para liberar la memoria utilizada en almacenar los datos traídos de la base de
datos de los usuarios y los roles
 this.Free = function()
 {  this.__data_store.removeAll(true);
  delete this.__data_store;
  this.__data_store = null;

  this.__rols.removeAll(true);
  delete this.__rols;
  this.__rols = null;
 }

 // Función que se invoca al oprimir el botón del ítem de menú
 this.ShowMainWindow = function()
 {
  // Función que indica al objeto App que debe mostrar el panel principal del módulo
en el área de trabajo
  App.ShowMainPanel(null);
 }
}
// Registro del módulo
App.RegisterModule('Usuarios', new AdministrarUsuarios ());
                 </pre>
        </div>
    </div> </div>

    <div class="alert alert-info alert-block">
        <div id="ark_b_4" style="float: right"><i class="icon-chevron-up"></i></div>
    <h2>Definición de funcionalidades en la parte cliente</h2>  <div id="ark_4">
        <p>
            Con el objetivo de mostrarle al usuario sólo lo que él tiene acceso a ver en cuanto a
            operaciones que se pueden realizar con un módulo se introduce el concepto de
            funcionalidad. Para este caso específico es necesario definir dos elementos. Primero,
            mediante qué componente visual se realiza la acción que define la funcionalidad. Por
            ejemplo, si para adicionar un producto necesariamente hay que oprimir un botón que
            muestra una ventana donde se recogen los datos del nuevo producto. El primer elemento
            al que se hace referencia es al botón en sí. El segundo elemento son las funciones que
            realiza el módulo tras oprimir el botón. Según el ejemplo citado anteriormente sería la
            acción de mostrar un formulario donde se introduzcan los datos del nuevo producto.
            Concretando lo anteriormente expuesto decimos que para definir una funcionalidad se
            define:
        <li>Una clase para construir el componente que desencadena las acciones que
            requiere dicha funcionalidad. Esta clase tiene que implementar tres funciones:<br>
            1. Render: Función para dibujar el componente que desencadena las
            acciones de la funcionalidad.<br>
            2. Enable: Función para habilitar el componente.<br>
            3. Disable: Función para deshabilitar el componente.<br>
            Estas dos últimas funcionalidades tienen el objetivo de habilitar o
            deshabilitar los componentes de las funcionalidades según la lógica del
            negocio de la aplicación en cuanto a la interacción del usuario con ella.
        </li>
        <li>La extensión de las funciones del módulo mediante el recurso de JavaScript
            prototype.
        </li>
        A continuación se muestra un ejemplo de la definición de una funcionalidad.
        </p>
        <div id="ejemplo7"><span class="label label-info">Ver ejemplo </span></div>
        <div id="ejemplo7_1" hidden="true">
            <div class="contenedor_Blue" style="width: 430px">Ejemplo: SubSystems\ &lt;Subsistema>\Config\Server\config.xml.  </div>
                <pre class="prettyprint linenums">
// Definición de la clase que detalla la funcionalidad adicionar del módulo de los usuarios
function ModificarEmpleado()
{
// Variable para almacenar el componente visual que desencadena la funcionalidad del
módulo
 this._btn = null;

 // Función para dibujar el component visual
 this.Render = function(Panel) {
  this._btn = Ext.create('Ext.Button', {
   text : 'Modificar',
   id : 'mod_us_btn_id',
   iconCls : 'mod',
   handler : Ext.Function.bind(this.Owner. OnModificar,this.Owner)
  });

  var tbar = Ext.getCmp('users_tbar_id');
  tbar.add(this._btn);
 }
                     // Función para habilitar el componente visual
 this.Enable = function()  {
  this._btn.enable();
 }

 // Función para deshabilitar el componente visual
 this.Disable = function() {
  this._btn.disable();
 }
}
// Se registra la funcionalidad para adicionar el usuario
App.RegisterFunction('ModificarEmpleado', new ModificarEmpleado());

// Extensión de las funciones de la clase “AdministrarUsuarios” mediante el recurso de JavaScript
// prototype.
AdministrarEmpleados.prototype.OnModificar = function()
{
 var _mod_panel = new Ext.form.Panel({ ... });

 var _mod_win = new Ext.Window( {
title : 'Modificar los datos de un empleado',
  ...
  items : [_mod_panel],
  buttons:[ {    text:'Modificar',
       handler : this. ModificarEmpleado
   },{   text: 'Cerrar',
       handler: function(){_mod_win.close();}
   }]
 });

 _mod_win.show();
}

AdministrarEmpelados.prototype.ModificarEmpleado = function()
{
 var _form = Ext.getCmp('_mod_employee_panel_id').getForm();
 if(_form.isValid())
 { ...
  function Callback(response)
{ ...
 this.Disable('ModificarEmpleado');
 }

  App.PerformServerRequest('Empleados.Empleados.ModificarEmpeado',
     _form.getValues(), Ext.Function.bind(Callback,this) );
 }
}
        </pre>
        </div>
        <p> <b>Veamos algunos detalles del ejemplo que se mostró.</b><br> La primera parte define una clase
            con tres métodos como se especificó, Render, Enable y Disable. Lo primero que
            necesitamos notar es que en la función Render se crea el botón que desencadena la
            funcionalidad. Nótese que el campo handler del objeto de configuración con que se crea
            el botón hace referencia a this.Owner. Esta es la forma en la que se accede directamente
            al módulo que contiene la funcionalidad y una vez que se acceda al módulo se accede a
            todos sus campos y funciones.<br>

            Hay una línea intermedia donde se registra la funcionalidad usando la función
            <b>"App.RegisterFunction"</b>. Como se ve el primer parámetro es el nombre de la funcionalidad
            y la segunda es una instancia de la misma. Cuando sea necesario habilitar esta
            funcionalidad en el módulo simplemente se invoca <b>this.Enable(Funcionalidad)</b> y para
            deshabilitarla <b>this.Disable(funcionalidad)</b>. Un ejemplo del uso de esto se evidencia en la
            función Callback dentro de la función ModificarUsuario en donde se invoca
            <b>this.Disable('ModificarUsuario')</b>.<br>

            <b> Nota: </b>Téngase en cuenta que la funcionalidad se deshabilita en el módulo<br>

            La otra parte del fichero es la extensión de las funciones del objeto AdministrarEmpleados
            mediante el recurso de JavaScript prototype.<br>

            De esta forma se define una funcionalidad en un módulo en la parte cliente.<br>
        </p>


    </div> </div>


    <br>

