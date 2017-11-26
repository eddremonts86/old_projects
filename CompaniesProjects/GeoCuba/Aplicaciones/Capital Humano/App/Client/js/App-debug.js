/*
 * Controler application:
 *	An App class controls all the application an contains
 *	an object for control the modules and an for control
 *	the interface.
 *
 *	The ModulesManager is an unique object for control all
 *	modules registered into the application.
 *
 *	The Interface class is an unique object for contol the
 *	interface of the application. This class contains an InsertSubItemMenu
 *	object for control the main menu of the application.
 *
 * Application performance:
 * 	A developer create a module and register into the
 *	ModulesManager object. The module must implement two
 *	functions:
 *	- Init(): This function is called when the application
 *			is initialized. In this function the module should
 *			create a menu item and put it into the menu bar.
 It can be done by the Interface object.
 *	- BuildMainPanel(filterObj): This function is called
 *			by the App object for show the main panel of the
 *			module. The own module cannot show it�s main panel
 *			it should by done by the App controler object.
 *
 * Important:
 *	When a new panel is show, the last panel is destroyed, that�s
 *	why each module must take care when create the main panel.
 */
Ext.require([
   'Ext.ux.TabCloseMenu',
   'Ext.ux.TabReorderer',
   'Ext.ux.TabScrollerMenu',
   'Ext.ux.GroupTabPanel',
   'Ext.ux.GroupTabRenderer'
]);
Ext.require([
    'Ext.tip.*',
    'Ext.Button',
    'Ext.window.MessageBox'
]);
Ext.onReady(function () {
    // Add the additional 'advanced' VTypes
    Ext.apply(Ext.form.field.VTypes, {
        daterange: function (val, field) {
            var date = field.parseDate(val);

            if (!date) {
                return false;
            }
            if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                var start = field.up('form').down('#' + field.startDateField);
                start.setMaxValue(date);
                start.validate();
                this.dateRangeMax = date;
            }
            else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                var end = field.up('form').down('#' + field.endDateField);
                end.setMinValue(date);
                end.validate();
                this.dateRangeMin = date;
            }
            return true;
        },
        daterangeText: 'Start date must be less than end date'
    });
});
/*function Timer() {
    document.getElementById('statusbar_timer').innerHTML = Ext.Date.format(new Date(), 'h:i:s A');
    //Ext.getCmp('statusbar_timer').setText(Ext.Date.format(new Date(), 'h:i:s A'));
    setTimeout('Timer();', 1000);
}*/
function TimerUsado(time) {
    var _time = parseInt(time);
    var second = _time % 60;
    var minute = Math.floor(_time / 60);
    var hour = Math.floor(_time / 3600);
    var _str_time = ((hour < 10) ? "0" + hour : hour) + ":" +
        ((minute < 10) ? "0" + minute : minute) + ":" +
        ((second < 10) ? "0" + second : second);
    Ext.getCmp('statusbar_timer_eten').setText(_str_time);
    _time = time + 1;
    setTimeout('TimerUsado('+ _time +');', 1000);
    var min = second%60000;
    //console.log(minute);
    if(min==0){
        var secceion='secceion';
        Ext.Ajax.request({
            url: 'SubSystems/Admin/Viewer/Server/block.php',
            params: {secceion:secceion},
            success: function(response){
                var text = response.responseText;
                if(text==true){win2.close();}
                else{alert("Credenciales Erroneas");}
            }
        });

    }
}
function createBox(t, s,tipo) {
    if(tipo == Ext.MessageBox.WARNING)
        return  "<div class='alert alert-warning alert-dismissable' style='opacity:0.9'>" +
                    "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
                    "<strong>"+t+"</strong>" +
                    "<div class='row'>" +
                        "<div class='col-xs-4'>" +
                            "<i class='fa fa-warning fa-5x'></i>" +
                        "</div>" +
                        "<div class='col-xs-8 text-right'>" +
                            "<p class='announcement-header'>"+ s +" </p>" +
                        "</div>" +
                    "</div>"+
                "</div>";

            ;
    if(tipo == Ext.MessageBox.OK)
        return  "<div class='alert alert-success alert-dismissable' style='opacity:0.9'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
            "<strong>"+t+"</strong>" +
            "<div class='row'>" +
            "<div class='col-xs-4'>" +
            "<i class='fa fa-check fa-5x'></i>" +
            "</div>" +
            "<div class='col-xs-8 text-right'>" +
            "<p class='announcement-header'>"+ s +" </p>" +
            "</div>" +
            "</div>"+
            "</div>";
    if(tipo == Ext.MessageBox.ERROR)
        return  "<div class='alert alert-danger alert-dismissable' style='opacity:0.9'>" +
            "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>" +
            "<strong>"+t+"</strong>" +
            "<div class='row'>" +
            "<div class='col-xs-4'>" +
            "<i class='fa fa-times fa-5x'></i>" +
            "</div>" +
            "<div class='col-xs-8 text-right'>" +
            "<p class='announcement-header'>"+ s +" </p>" +
            "</div>" +
            "</div>"+
            "</div>";

    ;
   /* return '<div class="label label-info">' +
                '<div style="font-size: 22px;color: #ffffff;margin: 10px;">' + t + '</div>' +
                '<p style="color: #f5f5f5;margin:10px;font-size:12px;">' + s + '</p>' +
            '</div>';*/
}
function closeBar(){
    Ext.getCmp('center_banner').hide();
    Ext.getCmp('clearButton').removeCls('show-hide_up');
    Ext.getCmp('clearButton').addCls('show-hide_down');
    Ext.getCmp('north_space').setHeight(Ext.getCmp('north_space').height - InterfaceConf.banner_heigth);
}
// Object for control the all application
// --------------------------------------
App = {
    //Raising details
    __raisingTpl: null,
    // Current panel opened
    __current_panel: null,
    // Id of the current panel opened
    __current_panel_id: null,
    // Current active module
    _arrayPrint:[],
    //arreglo de los prin falsos
    __current_module: null,
    // MessageBox for show a message
    __msg_box: null,
    // Name of the current module
    __current_module_name: null,
    __storage: [],
    // Object for manage the modules into the application
    // --------------------------------------------------
    __modules_manager: {
        // Array for store registered modules
        __modules_store: new Array(),
        // Function for register a module
        RegisterModule: function (module_name, module) {
            if (typeof(this.__modules_store[module_name]) == 'undefined') {
                this.__modules_store[module_name] = module;
                this.__modules_store[module_name].__module_name = module_name;
                this.__modules_store[module_name].GetName = function () {
                    return this.__module_name;
                };

                // Append fields and function for treat the functions
                this.__modules_store[module_name].__fn_store = new Array();
                this.__modules_store[module_name].Enable = function (FnName) {
                    if (typeof(this.__fn_store[FnName]) != 'undefined')
                        this.__fn_store[FnName].Enable();
                };

                this.__modules_store[module_name].Disable = function (FnName) {
                    if (typeof(this.__fn_store[FnName]) != 'undefined')
                        this.__fn_store[FnName].Disable();
                };

            }
            else
                alert('El módulo ' + module_name + 'ya fue registrado');
        },
        // Funtion for init all registered modules
        InitModules: function () {
            for (_module in this.__modules_store)
                if (typeof(this.__modules_store[_module]) != 'function') {
                    App.__current_module_name = _module;
                    this.__modules_store[_module].Init();
                }
            delete App.__current_module_name;
            App.__current_module_name = null;
        },
        // Return the instance of a module by it name
        GetInstanceOf: function (module_name) {
            return ( typeof (this.__modules_store[module_name]) != 'undefined' )
                ? this.__modules_store[module_name]
                : null;
        }
    },// End ModulesManager definition
    // Object for manage the interface of the application
    // --------------------------------------------------
    __interface: {
        //// FIELDS
        // Menu bar of the application
        __menu_bar: null,
        // Status bar of the application
        __status_bar: null,
        // Area of working space
        __working_space: null,
        // Final interface of the application
        __interface: null,

        // Object for control menu items of the application
        __menu_controler: {
            // Array for store the menu structure
            __menu_store: new Array(),
            /* Array structure:
             * 		[menu_name] -> Array [menu] = Ext.menu
             */
            // Insert a new menu item
            InsertMenuItem: function (menu, Ext_menu_item) {
                // If the menu items does not exist, create one
                if (typeof(this.__menu_store[menu]) == 'undefined')
                    this.__menu_store[menu] = new Array();

                // Get the text of the menu item
                var _menu_item_name = Ext_menu_item.text; // Review function name

                if (typeof(this.__menu_store[menu][_menu_item_name]) != 'undefined')
                    alert('El item ' + _menu_item_name + ' para el menu ' + menu + ' ya existe');
                else
                    this.__menu_store[menu][_menu_item_name] = Ext_menu_item;
            },
            // Insert a new submenu item
            InsertSubItemMenu: function (menu, menu_item_name, Ext_submenu_item) {
                // If the menu is not created
                if (typeof(this.__menu_store[menu]) == 'undefined')
                    this.__menu_store[menu] = new Array();

                // If the menu item does not exist, it is created.
                // Else is added
                if (typeof(this.__menu_store[menu][menu_item_name]) == 'undefined') {
                    this.__menu_store[menu][menu_item_name] = new Ext.menu.Item(
                        {
                            text: menu_item_name,
                            menu: [Ext_submenu_item]
                        });
                }
                else {
                    // Verify that the new submenu item does not exist
                    for (var i = 0; i < this.__menu_store[menu][menu_item_name].menu.items.getCount(); i++) {
                        var _item = this.__menu_store[menu][menu_item_name].menu.items.get(i);
                        if (_item.text == Ext_submenu_item.text) {
                            alert('Ya existe el item de menu ' + menu + ' \\ ' + menu_item_name + ' \\ ' + _item.text);
                            return;
                        }
                    }

                    // If subitem does not exist, add the subitem
                    this.__menu_store[menu][menu_item_name].menu.add(Ext_submenu_item);
                }
            },

            // Render the registered menu
            RenderMenu: function () {
                var _menu = null;
                // Iterate each menu
                for (_menu_name in this.__menu_store) {

                    if (typeof(this.__menu_store[_menu_name]) == 'function')
                        continue;

                    _menu = new Ext.menu.Menu();
                    // Iterate each menu item and insert it into the menu
                    for (_item in this.__menu_store[_menu_name]) {
                        if (typeof(this.__menu_store[_menu_name][_item]) == 'function')
                            continue;
                        _menu.add(this.__menu_store[_menu_name][_item]);
                    }

                    // Create a split button to insert it into the menu
                    var _split_button = new Ext.Button({
                        cls:'btn btn-primary btn-outline',
                        text: '<b>' + _menu_name + '</b>',
                        menu: _menu,
                        split: true,
                        id: 'menu_' + _menu_name + '_id'
                    });

                    // Insert the split button into the bar of menu
                    App.__interface.GetMenuBar().add(_split_button);
                    App.__interface.GetMenuBar().add('-');
                    App.__interface.GetMenuBar().doLayout();

                }
                var menu_items = [];
                var menu_items_bnt = [];
                for (var i = 0; i < subsystems.length; i++)
                menu_items.push({
                        text: subsystems[i],
                    name:subsystems[i],
                        listeners: {
                            click: function (item, event, options) {

                                if (!App.FireEvent('beforechange', item.text))
                                    return;
                                if (!App.ThrowServerEvent(item.text, 'beforechange', {subsystem: item.text}, true))
                                    return;
                                window.location = 'App/Server/fn_call.php?fn=App.Log.Log.SwapSystem&system=' + item.name;
                            }
                        }//,
                        //href : 'App/Server/fn_call.php?fn=App.Log.Log.SwapSystem&system=' + subsystems[i]
                    });
                menu_items.push({
                    text: '<font style="color:#1e58b9;font-weight: bold;">Ayuda</font>',
                   // href: "http://localhost/MsExtUFC/index.php",
                    iconCls:'ayuda',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: 'Hermes - Ayuda',
                            height:'99%',
                            id:'ayuda',
                            name:'ayuda',
                            modal:true,
                            padding:5,
                            width: '70%',
                            layout: 'anchor',
                            html:'<embed src="Help/Hermes.pdf" type="pdf" width="100%" height="100%"></embed>'

                        }).show();
                    }

                });
                menu_items.push({
                    text: '<font style="color:#1e58b9;font-weight: bold;">Bloquear Sistema</font>',
                    id:'Bsistem',
                    name:'Bsistem', iconCls:'bloqueo',
                    listeners:{
                        click: function () {
                            var simple = Ext.widget({
                                xtype: 'form',
                                layout: 'anchor',
                                id: 'bloqueo',
                                frame: false,
                                width: '95%',
                                height:'90%',
                                fieldDefaults: {msgTarget: 'side',labelWidth: 75, width: '95%',  padding:5},
                                defaultType: 'textfield',
                                items: [
                                    {
                                    fieldLabel: 'Usuario',
                                    name: 'Usuario',
                                    id:'Usuario',
                                    allowBlank: false,
                                    tooltip: 'Entre su Usuario'
                                    },{
                                    fieldLabel: 'Password',
                                    name: 'Password',
                                    id:'Password',
                                    emptyText: 'password',
                                    inputType: 'password',
                                    allowBlank: false,
                                    tooltip: 'Entre su Password'
                                    },
                                    {   xtype: 'tbtext',
                                        id: 'statusbar_timer_eten',
                                        name: 'statusbar_timer_eten',
                                        text: '00:00:00',
                                        readOnly: true,
                                        cls:'label label-info',
                                        width: 70

                                    }
                                ],

                                buttons: [
                                    {
                                    text: 'Desbloquear',
                                    cls:'btn btn-danger',
                                    formBind: true,
                                    handler: function() {
                                        var Usuario=Ext.getCmp('Usuario').getValue();
                                        var Password=Ext.getCmp('Password').getValue();
                                        Ext.Ajax.request({
                                            url: 'SubSystems/Admin/Viewer/Server/block.php',
                                            params: {Usuario:Usuario,Password:Password,user:user_log,pasw:psw},
                                            success: function(response){
                                               var text = response.responseText;
                                               if(text==true){win2.close();}
                                               else{alert("Credenciales Erroneas");}
                                            }
                                        });
                                    }
                                }
                                ]
                            });
                            var win2 =  Ext.create('Ext.window.Window', {
                                title: 'Sistema Bloquedo',
                                height: 170,
                                id:'win2',
                                closable:false,
                                padding:5,
                                animateTarget:'Bsistem',
                                modal:true,
                                width: 350,
                                items:simple,
                                layout: 'anchor',
                                listeners:{afterrender:function(){TimerUsado(0);}}
                            }).show();
                        }
                    }
                });
                menu_items.push({
                    text: '<font style="color:#1e58b9;font-weight: bold;">Salir del Sistema</font>',
                    href: "index.php", iconCls:'salir'
                });
                App.__interface.GetMenuBar().add(
                    {
                        xtype: 'button',
                        arrowCls: '',
                        text:'',
                        cls:'btn',
                        iconCls: 'win_btn',
                        menu: menu_items
                    });
                App.__interface.GetMenuBar().add(
                       '->',
                        {
                            id:'impButton',
                            name:'impButton',                            
                            cls:'smartimp',
                            style: {
                                'background-color': 'transparent !important'
                            },
                            handler:function(){
                               var store=App._arrayPrint;
                             //  console.log(store[App.__current_module_name].estado);
                               var starado = store[App.__current_module_name].estado;
                               if(starado == true){
                                var Print =  App.__current_module.Print();
                                    var a = window.open('','','menubar=yes');
                                    a.document.write(Print);
                                    a.document.close();
                                    a.print();
                                }
                                else{
                                    var fnCallBack = function() {print();}
                                    App.ConfirmMessage(fnCallBack, 'Este modulo no implementa la funcion de imprimir. ¿Desea obtener una captura de pantalla?');
                                }

                            }
                       },
                        {
                        id:'prtscr',
                        name:'prtscr',
                        cls:'prtscr',
                        style: {
                            'background-color': 'transparent !important'
                        },
                        handler:function(){
                            print();
                        }
                    }
                        /*{
                            cls:'show-hide_up',
                            id:'clearButton',
                            name:'clearButton',
                            xtype:'button',
                            style: {
                                padding: '4px !important',
                                'border-radius':'5px !important'
                            },
                            tooltip:{
                                width:350,
                                closable:true,
                                autoHide: false,
                                cls:'tooltipos',
                                title: 'Ocultar o Mostrar el panel superior (Banner)'
                            },
                            listeners: {
                                click: function() {
                                    if (Ext.getCmp('center_banner').isHidden())
                                        {
                                            Ext.getCmp('center_banner').show();
                                            Ext.getCmp('clearButton').removeCls('show-hide_down');
                                            Ext.getCmp('clearButton').addCls('show-hide_up');
                                            Ext.getCmp('north_space').setHeight(Ext.getCmp('north_space').height + InterfaceConf.banner_heigth);
                                        }
                                    else
                                        {
                                            Ext.getCmp('center_banner').hide();
                                            Ext.getCmp('clearButton').removeCls('show-hide_up');
                                            Ext.getCmp('clearButton').addCls('show-hide_down');
                                            Ext.getCmp('north_space').setHeight(Ext.getCmp('north_space').height - InterfaceConf.banner_heigth);
                                        }
                                }
                            }
                         }*/
                );
            },

            // Render the menu by a given order
            RenderMenuByOrder: function (_menu_order) {
                var _menu = null;
                var _menu_name = null;

                // Iterate each menu name of the order
                for (var i = 0; i < _menu_order.length; i++) {
                    _menu_name = _menu_order[i];

                    _menu = new Ext.menu.Menu();
                    // Iterate each menu item and insert it into the menu
                    if (typeof(this.__menu_store[menu]) == 'undefined')
                        continue;

                    for (_item in this.__menu_store[_menu_name])
                        _menu.add(this.__menu_store[_menu_name][_item]);

                    // Create a split button to insert it into the menu
                    var _split_button = new Ext.SplitButton({
                        text: '<b>' + _menu_name + '</b>',
                        menu: _menu,
                        split: false,
                        id: 'menu_' + _menu_name + '_id'
                    });

                    // Insert the split button into the bar of menu
                    App.__interface.GetMenuBar.add(_split_button);
                }

                var menu_items = [];

                menu_items.push({
                    text: '<font style="color:#1e58b9;font-weight: bold;">Ayuda</font>',
                    href: "http://"
                });

                for (i = 0; i < subsystems.length; i++)
                    menu_items.push({
                        text: subsystems[i],
                        href: 'App/Server/fn_call.php?fn=App.Log.Log.SwapSystem&system=' + subsystems[i]
                    });
                menu_items.push({
                    text: '<font style="color:#1e58b9;font-weight: bold;">Salir de nuevo</font>',
                    href: "index.php"
                });
                menu_items.push({
                    text: '<font style="color:#1e58b9;font-weight: bold;">Salir</font>',
                    href: "index.php"
                });

                App.__interface.GetMenuBar().add({
                    xtype: 'button',
                    arrowCls: '',
                    cls:'btn',
                    iconCls: 'win_btn',
                    menu: menu_items
                });
            }
        },

        //// FUNCTIONS
        // Return the bar of the application for the menu
        GetMenuBar: function () {
            return this.__menu_bar;
        },
        // Function for build the interface
        Build: function () {
            this.__menu_bar = new Ext.Toolbar(
                {
                    id: '_app_tbar_menu_id',
                    height: 40,
                    items: [
                        {
                            xtype: 'label',
                            id:'subsistemasGeneral',
                            html:"<div class='alert-info' style='padding:9px !important;cursor:pointer;border:1px dashed;border-radius:4px' onclick='generarSubsistems()'>" +
                                "<strong>"+subsystem+"</strong></div>"
                            //text:subsystem,
                            //cls:'btn btn-default navbar-btn'
                            //html:'<div class="btn btn-default dropdown-toggle" style="height:38px" onclick="generarSubsistems()">'+subsystem+'</div>'
                            /*html: ' <a class="brand" id="subsistemas" rel="popover" data-placement="bottom" title="Subsistema activo" ' +
                                  'data-content="Los subsistemas son diviciones logicas de la aplicacion compusteas de mudulos que satisfacen sus ' +
                                  'nececidads"><h4>'++'</h4></a>'*/
                        },'-'],
                    cls:'navbar navbar-default navbar-fixed-bottom'
                    });

	//---------------------------------------------------------------------------------------------------			
	function img(){
        if(foto==''){return '<img width="100px" height="100px" src="App/Client/img/logo/user3.png"/>'}
        else
        { return '<img width="100px" height="100px" src="data:image/png;base64,'+ foto +'"/>'}
    }
           //console.log(foto)
	this.panel=Ext.create('Ext.panel.Panel', {
        width: 450,
        height:200,
        padding:1,
        layout: 'anchor',
        items:[
           {html:'<h3>Información del Trabajador<img width="70px" height="70px" src="App/Client/img/logo/100.png"/></h3>'+
              '<table border="0" style="width:100%">' +
                 ' <tr>' +
                     '<td style="width:25%">'+
                         img()+
                     '</td>'+
                     '<td style="width:75%">' +
                            '<li>Usuario: '+user_log+'</li>' +
                            '<li>Trabajador: '+userName+'</li>'+
                            '<li>Cargo: '+cargo+'</li>'+
                     '</td>' +
                 '</tr>' +
              '</table>'}
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text:'Usuario Activo',
        cls:'btn',
        menu:[this.panel]
    });
				
	
	//---------------------------------------------------------------------------------------------------
	this.__status_bar = new Ext.Toolbar(
                {
                    id: '_app_status_bar_id',
                    items: [

                        '->', '-', ' ',
                        this.opc,{
                            xtype: 'tbtext',
                            id: 'statusbar_timer',
                            name: 'statusbar_timer',
                            text: '00:00:00',
                            readOnly: true,
                            width: 70
                        }, ' ', '-', ' ',
                        {
                            xtype: 'tbtext',
                            id: 'statusbar_date',
                            name: 'statusbar_date',
                            text: '00/00/00',
                            readOnly: true,
                            width: 70
                        }

                    ]
                });

            this.__raisingTplMarkup = [
                '<b>Fecha de inicio:</b> {fecha_inicio}<br/>',
                '<b>Fecha de fin:</b> {fecha_fin}<br/>',
                '<b>Provincia:</b> {provincia}<br/>',
                '<b>Empresa ejecutora:</b> {empresa_ejecutora}<br/>',
                '<b>Responsable:</b> {jefe_ejecutor}<br/>',
                '<b>Empresa certificadora:</b> {empresa_certificadora}<br/>',
                '<b>Responsable:</b> {jefe_certificador}<br/>',
                '<b>Descripción:</b> {descripcion}<br/>'
            ];

            App.__raisingTpl = new Ext.Template(this.__raisingTplMarkup);

            this.__interface = new Ext.Viewport(
                {
                    id: '_app_interface_id',
                    layout: 'border',
                    autoScroll: true,
                    items: [
                        /*{
                            xtype: 'panel',
                            height: 40+InterfaceConf.banner_heigth,
                            border: false,
                            id:'north_space',
                            frame: false,
                            region: 'north',
                            items: [
                                {
                                    region: 'center',
                                    id:'center_banner',
                                    name:'center_banner',
                                    hidden:false,
                                    html: '<table cellpading="0" cellspacing="0" width="100%" height="' + InterfaceConf.banner_heigth + '" border="0">' +
                                        '<tr>' +
                                        '<td width=' + InterfaceConf.left_image_width + ' background="SubSystems/' + subsystem + '/Config/Client/' + InterfaceConf.left_image + '"></td>' +
                                        '<td width="auto" height="' + InterfaceConf.banner_heigth + '"></td>' +
                                        '<td width=' + InterfaceConf.rigth_image_width + ' background="SubSystems/' + subsystem + '/Config/Client/' + InterfaceConf.rigth_image + '"></td>' +
                                        '</tr>' +
                                        '</table>'
                                },
                                {
                                    region: 'south',
                                    bbar:this.__menu_bar
                                }
                            ]
                        },*/
                        {
                            xtype: 'panel',
                            region: 'east',
                            hidden: subsystem == 'Inventario' ? false : true,
                            collapsible: true,
                            collapsed: subsystem == 'Inventario' ? true : false,
                            closable: false,
                            split: true,
                            width: 210,
                            minSize: 210,
                            maxSize: 210,
                            border: true,
                            title: 'Panel del usuario',
                            frame: true,
                            items: [
                                {
                                    xtype: 'panel',
                                    border: true,
                                    height: 80,
                                    //iconCls : 'user',
                                    frame: true,
                                    region: 'south',
                                    title: 'Acceso',
                                    items: [
                                        new Ext.form.Label({html: '<b>Bienvenido</b></br>'})
                                        //new Ext.form.Label({id: 'user_name', html : user_name + '</br>'})
                                    ]
                                },
                                {   xtype: 'label', html: '</br>'},
                                {
                                    xtype: 'panel',
                                    title: 'Detalles del levantamiento activo',
                                    id: 'raisingdetailPanel',
                                    frame: true,
                                    border: true,
                                    height: 200,
                                    html: 'Active un levantamiento para ver los detalles.'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            frame: false,
                            height:40,
                            region: 'south',
                            items:[
                                    {
                                    region: 'south',
                                    tbar:this.__menu_bar
                                }
                            ]

                            //tbar: this.__status_bar
                        },
                        {
                            region: 'center',
                            layout: 'fit',
                            xtype:'tabpanel',
                            height:'100%',
                            id:'center_app_space',
                            plugins: Ext.create('Ext.ux.TabCloseMenu',{
                                closeAllTabsText:'Cerrar todas',
                                closeOthersTabsText : 'Cerrar Otras',
                                closeTabText : 'Cerrar',
                                extraItemsTail: [
                                    '-',
                                    {
                                        text: 'Desactivar',
                                        checked: true,
                                        hideOnClick: true,
                                        handler: function (item) {
                                            currentItem.tab.setClosable(item.checked);
                                        }
                                    },
                                    '-',
                                    {
                                        text: 'Activar',
                                        checked: true,
                                        hideOnClick: true,
                                        handler: function(item) {
                                            currentItem.tab.setDisabled(!item.checked);
                                        }
                                    }
                                ],
                                listeners: {
                                    aftermenu: function () {
                                        currentItem = null;
                                    },
                                    beforemenu: function (menu, item) {
                                        var enabled = menu.child('[text="Activar"]');
                                        menu.child('[text="Desactivar"]').setChecked(item.closable);
                                        if (item.tab.active) {
                                            enabled.disable();
                                        } else {
                                            enabled.enable();
                                            enabled.setChecked(!item.tab.isDisabled());
                                        }

                                        currentItem = item;
                                    }
                                }
                            }),
                            listeners:{
                                tabchange:function(a,b,c){
                                    App.__current_module = b.initialConfig.listeners.scope;
//                                    App.__current_module.__data
                                   /* console.log(App.__current_module);
                                    console.log(b.initialConfig.items[0]);*/
                                },
                                remove:function(This){
                                    var items = Ext.getCmp('center_app_space').items.items;
                                    if(items.length == 0)
                                        Ext.getCmp('center_app_space').update('<div align="center" style="background-color:' + InterfaceConf.desktop_color + ';height:100%"><div><img src="Subsystems/' + subsystem + '/Config/Client/' + InterfaceConf.desktop_image + '" width="' + InterfaceConf.desktop_image_width + '" height="' + InterfaceConf.desktop_image_height + '" /></div></div>');
                                },
                                add:function(){
                                    var items = Ext.getCmp('center_app_space').items.items;
                                    if(items.length == 1);
                                        Ext.getCmp('center_app_space').update('');
                                }
                            },
                            html: '<div align="center" style="height:100%;background-color:' + InterfaceConf.desktop_color + ';">' +
                                  '<div style="height:100%" id="centrio"><img src="Subsystems/' + subsystem + '/Config/Client/' + InterfaceConf.desktop_image + '" width="' + InterfaceConf.desktop_image_width + '" height="' + InterfaceConf.desktop_image_height + '" />' +
                                  '</div></div>'
                        }
                    ],
                    listeners: {
                        resize: {
                            fn: function () {
                                if (this.__current_module != null && this.__current_panel != null) {
                                    this.__current_panel.setHeight(this.GetDesktopHeigth());
                                    this.__current_panel.setWidth(this.GetDesktopWidth());
                                    this.__current_panel.doLayout();
                                }
                            },
                            scope: App
                        }
                    }
                });
        },

        // Insert a new menu item
        InsertMenuItem: function (menu, Ext_menu_item) {
            this.__menu_controler.InsertMenuItem(menu, Ext_menu_item);
        },

        // Insert a new sub menu item
        InsertSubItemMenu: function (menu, menu_item_name, Ext_submenu_item) {
            this.__menu_controler.InsertSubItemMenu(menu, menu_item_name, Ext_submenu_item);
        },

        // Render the interface
        Render: function () {
//               this.__interface.render(document.body);
            this.__menu_controler.RenderMenu();
            //Ext.getCmp('statusbar_date').setText(Ext.Date.format(new Date(), 'd/m/Y'));
            //Timer();
        },

        // Render the main panel into the working space
        RenderMainPanel: function (panel) {
//            panel.setHeight(Ext.get('_working_space_id').getHeight());
//            panel.closable = true;
//            panel.on('destroy', App.CloseCurrentPanel, App);
//            panel.render('_working_space_id');
            panel.doLayout();
            panel.closable = true;//            panel.on('beforeclose',function(){
//                console.log(this);
//            })
//            console.log(panel);
            var existe = false;
            var items = Ext.getCmp('center_app_space').items.items;
            for(var i = 0;i<items.length;i++){
                if(items[i].initialConfig.listeners.scope.__module_name == panel.initialConfig.listeners.scope.__module_name)
                    existe = true;
            }
            if(!existe){
                Ext.getCmp('center_app_space').add(panel).show();
                Ext.getCmp('center_app_space').setActiveTab(panel);
                App.__current_module_name = panel.initialConfig.listeners.scope.__module_name;
            }
            else{
                console.log(panel);
                Ext.getCmp('center_app_space').setActiveTab(Ext.getCmp(panel.id));
            }
        },
        // Hide the main panel
        HideMainPanel: function () {
//            document.getElementById('_working_space_id').innerHTML = '';
        }

    }, // End Interface definition
    // Object to manage the events of the client size
    EventManager: {
        // Before load event
        onBeforeLoad: null,
        // After load event
        onAfterLoad: null,
        // Before change event
        onBeforeChange: null,
        // After change event
        onAfterChange: null,
        // Function to register events
        on: function (event, callback_fn) {
            switch (event.toString().toLowerCase()) {
                case 'onbeforeload':
                case 'beforeload':
                case 'before_load':
                    this.onBeforeLoad = callback_fn;
                    break;

                case 'onafterload':
                case 'afterload':
                case 'after_load':
                    this.onAfterLoad = callback_fn;
                    break;

                case 'onbeforechange':
                case 'beforechange':
                case 'before_change':
                    this.onBeforeChange = callback_fn;
                    break;

                case 'onafterchange':
                case 'afterchange':
                case 'after_change':
                    this.onAfterChange = callback_fn;
                    break;
            }
        },
        // Function to fire an event
        fireEvent: function (event, args) {
            switch (event.toString().toLowerCase()) {
                case 'onbeforeload':
                case 'beforeload':
                case 'before_load':
                    if (typeof(this.onBeforeLoad) == 'function')
                        return this.onBeforeLoad(args);
                    return true;
                    break;

                case 'onafterload':
                case 'afterload':
                case 'after_load':
                    if (typeof(this.onAfterLoad) == 'function')
                        return this.onAfterLoad(args);
                    return true;
                    break;

                case 'onbeforechange':
                case 'beforechange':
                case 'before_change':
                    if (typeof(this.onBeforeChange) == 'function')
                        return this.onBeforeChange(args);
                    return true;
                    break;

                case 'onafterchange':
                case 'afterchange':
                case 'after_change':
                    if (typeof(this.onAfterChange) == 'function')
                        return this.onAfterChange(args);
                    return true;
                    break;
            }
            return true;
        }
    }, // End of EventManager definition
    // --------------------------------------------------
    // Function for register an event


    Print:function(){},
    PrintModel:function(store,title){
        console.log(InterfaceConf.left_image_width);
        var itcant = store.data.items.length;
        var cant   = store.data.items[0].fields.items.length;
        var html = "";
        if(title==""||title==null||title==undefined)
        {
            for(var j = 0; j < itcant; j++){
            if(html == ''){
                html = "<html><head><link id='default' rel='stylesheet' type='text/css' href='App/Client/css/App.css'>\n\
                          <title>Reportes</title></head><body>\n\
                            <div width=" + InterfaceConf.left_image_width + " style='height:85px'>\n\
                                    <div>\n\
                                        <img src='SubSystems/" + subsystem + "/Config/Client/" + InterfaceConf.left_image + "'/>\n\
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                                        <img src='App/Client/img/appImages/geocuba.png'/>\n\
                                    </div>\n\
                                    <div><hr style='float:left' width='100%'></div>\n\
                                </div>\n\
                                <table cellspacing='0' cellpadding='0' border='0' class='main'><tr>";
                for(var i = 0;i<cant;i++){
                    if(store.data.items[j].fields.items[i].header != undefined)
                        html += "<td class='header'>"+store.data.items[j].fields.items[i].header+"</td>";
                }
                html += "</tr>";
            }
            html += "<tr>";
            for(var i = 0;i<cant;i++){
                if(store.data.items[j].fields.items[i].header != undefined){
                    if(store.data.items[j].data[store.data.items[j].fields.items[i].name] != null){
                        //console.log(Ext.typeOf(store.data.items[j].data[store.data.items[j].fields.items[i].name]));
                        if(Ext.typeOf(store.data.items[j].data[store.data.items[j].fields.items[i].name]) == 'date')
                            html += "<td>"+Ext.Date.format(store.data.items[j].data[store.data.items[j].fields.items[i].name],'d/m/Y')+"</td>";
                        else
                            html += "<td>"+store.data.items[j].data[store.data.items[j].fields.items[i].name]+"</td>";
                    }
                    else
                        html += "<td>&nbsp;</td>";
                }
            }
            html += "</tr>";
        }
            html += "</table></body></html>";
        }
        else{
         for(var j = 0; j < itcant; j++){

              if(html == ''){
                  html = "<html><head><link id='default' rel='stylesheet' type='text/css' href='App/Client/css/App.css'>\n\
                          <title>Reportes</title></head><body>\n\
                            <div  style='width:100%;height:85px'>\n\
                                    <div>\n\
                                        <img src='SubSystems/" + subsystem + "/Config/Client/" + InterfaceConf.left_image + "'/>\n\
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                                        <img src='App/Client/img/appImages/geocuba.png'/>\n\
                                    </div>\n\
                                    <div><hr style='float:left' width='100%'></div>\n\
                                </div>\n\
                            <div class='contenedor' style='width:98%' height='100%'>\n\
                                <div class='contenedor_head'>"+title+"</div>\n\
                                <table cellspacing='0' cellpadding='0' border='0' class='main'><tr>";
                  for(var i = 0;i<cant;i++){
                      if(store.data.items[j].fields.items[i].header != undefined)
                        html += "<td class='header'>"+store.data.items[j].fields.items[i].header+"</td>";
                  }
                  html += "</tr>";
              }
              html += "<tr>";
              for(var i = 0;i<cant;i++){
                  if(store.data.items[j].fields.items[i].header != undefined){
                      if(store.data.items[j].data[store.data.items[j].fields.items[i].name] != null && store.data.items[j].data[store.data.items[j].fields.items[i].name] != '')                         {
                            if(Ext.typeOf(store.data.items[j].data[store.data.items[j].fields.items[i].name]) == 'date')
                                html += "<td>"+Ext.Date.format(store.data.items[j].data[store.data.items[j].fields.items[i].name],'d/m/Y')+"</td>";
                            else
                                html += "<td>"+store.data.items[j].data[store.data.items[j].fields.items[i].name]+"</td>";
                      }
                      else
                         html += "<td>&nbsp;</td>"; 
                 }
              }
              html += "</tr>";
        }
            html += "</table></div></body></html>";
        }




        var a = window.open('','','menubar=yes');
        a.document.write(html);
        a.document.close();
        a.print();
    },
    PrintStore:function(grid){
        console.log(grid);
        var columns = grid.columns;
        var itcant = grid.store.data.items.length;
//        var cant   = store.data.items[0].fields.items.length;
        var cant   = columns.length;
        var html = "";
        var titulo = '';
        if(grid.title != undefined){
            titulo = "<div class='contenedor_head'>"+grid.title+"</div>";
        }
        for(var j = 0; j < itcant; j++){
              if(html == ''){
                  html = "<html><head><link id='default' rel='stylesheet' type='text/css' href='App/Client/css/App.css'>\n\
                          <title>Reportes</title></head><body>\n\
                            <div width=//" + InterfaceConf.left_image_width + " style='height:85px'>\n\
                                    <div>\n\
                                        <img src='SubSystems///" + subsystem + "/Config/Client/" + InterfaceConf.left_image + "'/>\n\
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                                        <img src='App/Client/img/appImages/geocuba.png'/>\n\
                                    </div>\n\
                                    <div><hr style='float:left' width='740px'></div>\n\
                                </div>\n\
                                <div class='contenedor' style='width:700px' height='100%'>" +
                                titulo
                                +"<table cellspacing='0' cellpadding='0' border='0' class='main'><tr>";
                  for(var i = 0;i<cant;i++){
                      if(columns[i].dataIndex != undefined && columns[i].dataIndex != '')
                        html += "<td class='header'>"+columns[i].text+"</td>";
                  }
                  html += "</tr>";
              }
              html += "<tr>";
              for(var i = 0;i<cant;i++){
                  console.log(grid.store.data.items[j].data);
                  if(columns[i].dataIndex != undefined && columns[i].dataIndex != ''){
                      if(grid.store.data.items[j].data[columns[i].dataIndex] != null && grid.store.data.items[j].data[columns[i].dataIndex] != ''){
                            if(Ext.typeOf(grid.store.data.items[j].data[columns[i].dataIndex]) == 'date')
                                html += "<td>"+Ext.Date.format(grid.store.data.items[j].data[columns[i].dataIndex],'d/m/Y')+"</td>";
                            else
                                html += "<td>"+grid.store.data.items[j].data[columns[i].dataIndex]+"</td>";
                      }
                      else
                         html += "<td>&nbsp;</td>"; 
                 }
              }
              html += "</tr>";
        }
        html += "</table></div></body></html>";
        




        var a = window.open('','','menubar=yes');
        a.document.write(html);
        a.document.close();
        a.print();
    },
    PrintData:function(store,HTML){
        if(store!=="" &&  store!=null && store!=undefined){
            var itcant = store.data.items.length;
            var cant   = store.data.items[0].fields.items.length;
            var html = "";
            for(var j = 0; j < itcant; j++){
                if(html == ''){
                    html = "<html><head><link id='default' rel='stylesheet' type='text/css' href='App/Client/css/App.css'>\n\
                          <title>Reportes</title></head><body>\n\
                            <div width=" + InterfaceConf.left_image_width + " style='height:85px'>\n\
                                    <div>\n\
                                        <img src='SubSystems/" + subsystem + "/Config/Client/" + InterfaceConf.left_image + "'/>\n\
                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                                        <img src='App/Client/img/appImages/geocuba.png'/>\n\
                                    </div>\n\
                                    <div><hr style='float:left' width='740px'></div>\n\
                                </div>\n\
                                <table cellspacing='0' cellpadding='0' border='0' class='main1'><tr>";
                    for(var i = 0;i<cant;i++){
                        if(store.data.items[j].fields.items[i].header != undefined)
                            html += "<td class='header1'>"+store.data.items[j].fields.items[i].header+"</td>";
                    }
                    html += "</tr>";
                }
                html += "<tr>";
                for(var i = 0;i<cant;i++){
                    if(store.data.items[j].fields.items[i].header != undefined){
                        if(store.data.items[j].data[store.data.items[j].fields.items[i].name] != null)
                            html += "<td>"+store.data.items[j].data[store.data.items[j].fields.items[i].name]+"</td>";
                        else
                            html += "<td>&nbsp;</td>";
                    }
                }
                html += "</tr>";
            }
            html += "</table></body></html>";

            var a = window.open('','','menubar=yes');
            a.document.write(html);
            a.document.close();
            a.print();
        }
        else if(HTML!="" && HTML!=null && HTML!=undefined){
            var a = window.open('','','menubar=yes');
            a.document.write("<link id='default' rel='stylesheet' type='text/css' href='App/Client/css/App.css'>"+HTML);
            a.document.close();
            a.print();
        }
    },
    PrintModelGruping:function(store,title){
        var itcant = store.groups.items.length; // grupos
        var cant   = store.groups.items[0].records[0].fields.items.length; // campos
        var html = "";

        if(title==""||title==null||title==undefined)
        {
            for(var j = 0; j < itcant; j++){
                if(html == ''){
                    html = "<html><head><link id='default' rel='stylesheet' type='text/css' href='App/Client/css/App.css'>\n\
                      <title>Reportes</title></head><body>\n\
                        <div width=" + InterfaceConf.left_image_width + " style='height:85px'>\n\
                                <div>\n\
                                    <img src='SubSystems/" + subsystem + "/Config/Client/" + InterfaceConf.left_image + "'/>\n\
                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                                    <img src='App/Client/img/appImages/geocuba.png'/>\n\
                                </div>\n\
                                <div><hr style='float:left' width='740px'></div>\n\
                            </div>\n\
                            <table cellspacing='0' cellpadding='0' border='0' class='main'><tr>";
                    for(var i = 0;i<cant;i++){
                        if(store.groups.items[j].records[0].fields.items[i].header != undefined)
                            html += "<td class='header'>"+store.groups.items[j].records[0].fields.items[i].header+"</td>";
                    }
                    html += "</tr>";
                }
                html += "<tr><td style= 'font:bold;background: #00b3ee' colspan="+cant+" >"+ store.groups.items[j].key+"</td></tr>";
                for(var k = 0; k < store.groups.items[j].records.length; k++)
                {
                    html += "<tr>";
                    for(var i = 0;i<cant;i++){
                        if(store.groups.items[j].records[0].fields.items[i].header != undefined){
                            if(store.groups.items[j].records[k].data[store.groups.items[j].records[0].fields.items[i].name] != null)
                            {
                                if(Ext.typeOf(store.data.items[j].data[store.data.items[j].fields.items[i].name]) == 'date')
                                    html += "<td style='padding-left: 10px'>"+Ext.Date.format(store.groups.items[j].records[k].data[store.groups.items[j].records[0].fields.items[i].name],'d/m/Y')+"</td>";
                                else
                                    html += "<td style='padding-left: 10px'>"+store.groups.items[j].records[k].data[store.groups.items[j].records[0].fields.items[i].name]+"</td>";
                            }
                            else
                                html += "<td>&nbsp;</td>";
                        }
                    }
                    html += "</tr>";
                }
            }
            html += "</table></body></html>";
        }
        else{
            for(var j = 0; j < itcant; j++){/// imagen <div width=" + InterfaceConf.left_image_width + " style='height:85px'>\n\
                if(html == ''){
                    html = "<html><head><link id='default' rel='stylesheet' type='text/css' href='App/Client/css/App.css'>\n\
                      <title>Reportes</title></head><body>\n\
                        <div width=" + InterfaceConf.left_image_width + " style='height:85px'>\n\
                                <div>\n\
                                    <img src='SubSystems/" + subsystem + "/Config/Client/" + InterfaceConf.left_image + "'/>\n\
                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n\
                                    <img src='App/Client/img/appImages/geocuba.png'/>\n\
                                </div>\n\
                                <div><hr style='float:left' width='740px'></div>\n\
                            </div>\n\
                            <div class='contenedor' style='width:700px' height='100%'>\n\
                            <div class='contenedor_head'>"+title+"</div>\n\
                            <table cellspacing='0' cellpadding='0' border='0' class='main'><tr>";
                    for(var i = 0;i<cant;i++){
                        if(store.groups.items[j].records[0].fields.items[i].header != undefined)
                            html += "<td class='header'>"+store.groups.items[j].records[0].fields.items[i].header+"</td>";
                    }
                    html += "</tr>";
                }
                html += "<tr><td style= 'font:bold;background: #00b3ee' colspan="+cant+" >"+ store.groups.items[j].key+"</td></tr>";
                for(var k = 0; k < store.groups.items[j].records.length; k++)
                {
                    html += "<tr>";
                    for(var i = 0;i<cant;i++){
                        if(store.groups.items[j].records[0].fields.items[i].header != undefined){
                            if(store.groups.items[j].records[k].data[store.groups.items[j].records[0].fields.items[i].name] != null)
                            {
                                if(Ext.typeOf(store.data.items[j].data[store.data.items[j].fields.items[i].name]) == 'date')
                                    html += "<td style='padding-left: 10px'>"+Ext.Date.format(store.groups.items[j].records[k].data[store.groups.items[j].records[0].fields.items[i].name],'d/m/Y')+"</td>";
                                else
                                    html += "<td style='padding-left: 10px'>"+store.groups.items[j].records[k].data[store.groups.items[j].records[0].fields.items[i].name]+"</td>";
                            }
                            else
                                html += "<td>&nbsp;</td>";
                        }
                    }
                    html += "</tr>";
                }
            }
            html += "</table></div></body></html>";
        }

        var a = window.open('','','menubar=yes');
        a.document.write(html);
        a.document.close();
        a.print();
    },


    On: function (event, callback_fn) {
        this.EventManager.on(event, callback_fn);
    },
    // --------------------------------------------------
    // Functio to fire an aplication event
    FireEvent: function (event, args) {
        return this.EventManager.fireEvent(event, args);
    },
    // --------------------------------------------------
    // Function for register a module
    RegisterModule: function (module_name, module) {
        this.__current_module_name = module_name;
        this.__modules_manager.RegisterModule(module_name, module);
		 if (typeof(module.Print) != 'function') {
            App._arrayPrint[App.__current_module_name]={estado: false};}
        else{App._arrayPrint[App.__current_module_name]={estado: true};}
    },
    // --------------------------------------------------
    // Function for register a module
    ActivateLm: function (record) {
        var detailPanel = Ext.getCmp('raisingdetailPanel');
        App.__raisingTpl.overwrite(detailPanel.body, record.data);
    },
    // --------------------------------------------------
    // Function to get the instance of a module given the name
    GetModule: function (module) {
        return this.__modules_manager.GetInstanceOf(module);
    },               
    // --------------------------------------------------
    // Function for register a function
    RegisterFunction: function (function_name, FnInstance) {
        var _module = this.__modules_manager.GetInstanceOf(this.__current_module_name);
        // Validate that the module exists
        if (_module == null) {
            alert('Error interno registrando una funcionalidad');
            return;
        }
        // Validate that the function was not registered before
        if (typeof(_module.__fn_store[function_name]) != 'undefined') {
            alert("'La funcionalidad '" + function_name + "' ya fue registrada en el modulo " + this.__current_module_name);
            return;
        }
        // Validate that the function implements the three basic functions.
        // Render, Enable and Disable
        if (typeof(FnInstance.Render) != 'function') {
            alert("'La funcionalidad '" + function_name + "' no implementa la funcion 'Render'");
            return;
        }
        if (typeof(FnInstance.Enable) != 'function') {
            alert("'La funcionalidad '" + function_name + "' no implementa la funcion 'Enable'");
            return;
        }
        if (typeof(FnInstance.Disable) != 'function') {
            alert("'La funcionalidad '" + function_name + "' no implementa la funcion 'Disable'");
            return;
        }
		FnInstance.Owner = _module;
        _module.__fn_store[function_name] = FnInstance;
    },
    //======================================================================================================================
    // --------------------------------------------------
    // Insert a new menu item
    InsertMenuItem: function (menu, MenuConfig) {
        var _str_module = App.__current_module_name + "";
        MenuConfig.handler = Ext.Function.createInterceptor(MenuConfig.handler, function () {
            App.ActivateModule(_str_module);
            return true;
        }, App);
        this.__interface.InsertMenuItem(menu, new Ext.menu.Item(MenuConfig));
    },
    // --------------------------------------------------
    // Insert a new sub menu item
    InsertSubItemMenu: function (menu, menu_item_name, SubMenuConfig) {
        var _str_module = App.__current_module_name + "";

        if (SubMenuConfig.handler)
            SubMenuConfig.handler = Ext.Function.createInterceptor(SubMenuConfig.handler, function () {
                App.ActivateModule(_str_module);
                return true;
            }, App);

        this.__interface.InsertSubItemMenu(menu, menu_item_name, new Ext.menu.Item(SubMenuConfig));
    },
    // --------------------------------------------------
    // Show the main panel of a module
    ShowMainPanel: function (filterObj) {
        if (this.__current_panel != null) {
            this.CloseCurrentPanel();
        }
        //this.__current_module = this.__modules_manager.GetInstanceOf //module;
        this.__current_panel = this.__current_module.BuildMainPanel(filterObj);
        this.__interface.RenderMainPanel(this.__current_panel);
        // Render each functionality of the module
        for (fnName in this.__current_module.__fn_store)
            this.__current_module.__fn_store[fnName].Render(this.__current_panel);

    },
    //======================================================================================================================
    // --------------------------------------------------
    // Activate a module but not show the main window
    ActivateModule: function (module) {
        if (this.__current_panel != null)
            this.CloseCurrentPanel();
        this.__current_module = this.__modules_manager.GetInstanceOf(module);
    },
    // --------------------------------------------------
    // Close the current panel opened into the application
    CloseCurrentPanel: function () {
        //this.__current_panel.destroy();
//        delete this.__current_panel;
//        this.__interface.HideMainPanel();
//
//        this.__current_panel = null;
//        this.__current_module.Free();
//        this.__current_module = null;
    },
    ShowServerError: function (ErrorText) {
        var _win_error = Ext.create('Ext.window.Window', {
            title: 'Error',
            //height: 200,
            width: 450,
            plain: true,
            modal: true,
            resizable: false,
            items: [
                {
                    xtype: 'panel',
                    height: '100%',
                    width: '100%',
//                    border: true,
                    frame: true,
//                    autoScroll: true,
                    html: '<div class="alert alert-dismissable alert-danger" style="height:100%">'+ErrorText+'</div>'
                }
            ],
            closable: true,
            closeAction: 'destroy',
            buttonAlign: 'center',
            buttons: [
                {
                    text: 'OK',
                    handler: function () {
                        _win_error.close();
                    }
                }
            ]
        });
        _win_error.show();
    },
    ShowErrors: function (Errors) {
        var _html_error = '';
        for (var i = 0; i < Errors.length; i++)
            _html_error += '<div style="float:left;height:100%"><i class="fa fa-times fa-5x"></i></div>\n\
                <div style="float:left;height:50px">&nbsp;</div>\n\
                <div style="height:100%"><strong>' + Errors[i].error + '</strong>' +
                '<br><i>' + Errors[i].description + '</i><br></div>';

        App.ShowServerError(_html_error);
    },
    // Set filter to store
    FilterStore: function (DataStore, Params) {
        var _url = DataStore.getProxy().url;
        var _index = _url.indexOf('&', 0);
        _url = (_index != -1) ? _url.substr(0, _index) : _url;
        var _params = Ext.Object.toQueryString(Params);
        _url += '&' + _params;

        DataStore.getProxy().url = _url;
    },
    // --------------------------------------------------
    // Build a JsonStore for load data from a module
    BuildJsonStore: function (ServerRequest, JsonConfigObj) {
        var _module = this.__current_module.GetName();
        // Build the url
        var _url = 'App/Server/fn_call.php?fn=' + _module + '.' + ServerRequest;
        // Set the url
        if (JsonConfigObj.params) {
            var _params = Ext.Object.toQueryString(JsonConfigObj.params);
            _url += '&' + _params;
        }

        // Set the url
        JsonConfigObj.proxy.url = _url;

        // Set the root of the request
        if (typeof(JsonConfigObj.proxy.reader.root) == 'undefined')
            JsonConfigObj.proxy.reader.root = _module;
        else
            JsonConfigObj.proxy.reader.root = _module + '.' + JsonConfigObj.proxy.reader.root;

        // Set the total property
        if (typeof(JsonConfigObj.proxy.reader.totalProperty) != 'undefined')
            JsonConfigObj.proxy.reader.totalProperty = _module + '.' + JsonConfigObj.proxy.reader.totalProperty;

        return new Ext.data.Store(JsonConfigObj);
    },
    FilterStore : function(DataStore, Params)    {
        var _url = DataStore.getProxy().url;
        var _index = _url.indexOf('&',0);
        _url = (_index != -1) ?  _url.substr(0, _index ) : _url;
        var _params = Ext.Object.toQueryString(Params);
        _url += '&' + _params;

        DataStore.getProxy().url = _url;
    },
    BuildCommonJsonStore: function (ServerRequest, JsonConfigObj) {
        // Build the url
        var _url = 'App/Server/fn_call.php?fn=Common.' + ServerRequest;
        // Set the url
        if (JsonConfigObj.params) {
            var _params = Ext.Object.toQueryString(JsonConfigObj.params);
            _url += '&' + _params;
        }

        // Set the url
        JsonConfigObj.proxy.url = _url;

        // Set the root of the request
        if (typeof(JsonConfigObj.proxy.reader.root) == 'undefined')
            JsonConfigObj.proxy.reader.root = 'Common';
        else
            JsonConfigObj.proxy.reader.root = 'Common.' + JsonConfigObj.proxy.reader.root;

        // Set the total property
        if (typeof(JsonConfigObj.proxy.reader.totalProperty) != 'undefined')
            JsonConfigObj.proxy.reader.totalProperty = 'Common.' + JsonConfigObj.proxy.reader.totalProperty;

        return new Ext.data.Store(JsonConfigObj);
    },
    PerformServerRequest: function (ServerRequest, Params, CallbackFn, OnError, AppHandleError) {
        var _module = this.__current_module.GetName();
        //var _params = (Params == null) ? {fn : ''} : Params;

        var _params = {};
        if (Params != null) for (item in Params) _params[item] = Params[item];
        _params.fn = _module + '.' + ServerRequest;

        Ext.Ajax.request(
            {
                url: 'App/Server/fn_call.php',
                method: 'post',
                params: _params,
                callback: function (options, success, response) {
                    var _response = 0;
                    try {
                        _response = Ext.decode(response.responseText, true);
                        if (_response == null) {
                            App.ShowServerError(response.responseText);
                            return false;
                        }

                        if (_response.success)
                            CallbackFn(eval("_response." + _module));
                        else {
                            if (OnError) {
                                OnError(_response);
                                if (AppHandleError)
                                    App.ShowErrors(_response.errors);
                            }
                            else
                                App.ShowErrors(_response.errors);
                        }
                    }
                    catch (error) {
                        Ext.Msg.alert('Error en el cliente', error);
                    }
                }
            });
    },
    PerformSyncServerRequest: function (ServerRequest, Params, AppHandleError) {
        var _module = this.__current_module.GetName();
        var _params = (Params == null) ? {
            fn: ''
        } : Params;
        _params.fn = _module + '.' + ServerRequest;
        _params = Ext.Object.toQueryString(_params);

        var connection = new Ext.data.Connection();
        var xhr = connection.getXhrInstance();

        xhr.open('POST', 'App/Server/fn_call.php', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(_params);

        try {
            var _response = Ext.decode(xhr.responseText, true);
            // Error from the server
            if (_response == null) {
                App.ShowServerError(xhr.responseText);
                return false;
            }

            if (_response.success)
                return _response[_module];
            else {
                if (typeof(AppHandleError) == 'undefined' || AppHandleError === true)
                    App.ShowErrors(_response.errors);

                return false;
            }
        }
        catch (error) {
            Ext.Msg.alert('Error en el cliente', error);
            return false;
        }
    },
    UploadFile: function (ServerRequest, ExtBasicForm, CallbackFn, ErrorFn) {
        var _form_params = ExtBasicForm.getValues(false, false, false, true);
        var _module = this.__current_module.GetName();
        var _str_fn = _module + '.' + ServerRequest;

        ExtBasicForm.submit(
            {
                clientValidation: true,
                url: 'App/Server/fn_call.php',
                params: {
                    fn: _str_fn
                },
                method: 'POST',
                success: function (form, action) {
                    try {
                        _response = Ext.decode(action.response.responseText, false);

                        if (_response.success)
                            CallbackFn(form, _response[_module]);
                        else
                            Ext.Msg.alert(_response.errors[0].error, _response.errors[0].description);
                    }
                    catch (error) {
                        Ext.Msg.alert('Error en el cliente', error);
                    }
                },
                failure: function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.Action.CLIENT_INVALID:
                            Ext.Msg.alert("Error", "Valores no validos en el formulario");
                            break;
                        case Ext.form.Action.CONNECT_FAILURE:
                            Ext.Msg.alert("Error", "Error de conexion");
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            _response = Ext.decode(action.response.responseText, false);
                            Ext.Msg.alert(_response.errors[0].error, _response.errors[0].description);
                            break;
                    }
                    if (typeof(ErrorFn) != 'undefined')
                        ErrorFn();
                }
            });
    },
    UploadFileAdvanced: function (ServerRequest, ExtBasicForm, Params,CallbackFn, ErrorFn) {
        var _form_params = ExtBasicForm.getValues(false, false, false, true);
        var _module = this.__current_module.GetName();
        var _str_fn = _module + '.' + ServerRequest;

        ExtBasicForm.submit(
            {
                clientValidation: true,
                url: 'App/Server/fn_call.php',
                params: Params,
                method: 'POST',
                success: function (form, action) {
                    try {
                        _response = Ext.decode(action.response.responseText, false);

                        if (_response.success)
                            CallbackFn(form, _response[_module]);
                        else
                            Ext.Msg.alert(_response.errors[0].error, _response.errors[0].description);
                    }
                    catch (error) {
                        Ext.Msg.alert('Error en el cliente', error);
                    }
                },
                failure: function (form, action) {
                    switch (action.failureType) {
                        case Ext.form.Action.CLIENT_INVALID:
                            Ext.Msg.alert("Error", "Valores no validos en el formulario");
                            break;
                        case Ext.form.Action.CONNECT_FAILURE:
                            Ext.Msg.alert("Error", "Error de conexion");
                            break;
                        case Ext.form.Action.SERVER_INVALID:
                            _response = Ext.decode(action.response.responseText, false);
                            Ext.Msg.alert(_response.errors[0].error, _response.errors[0].description);
                            break;
                    }
                    if (typeof(ErrorFn) != 'undefined')
                        ErrorFn(form, action);
                }
            });
    },
    PerformCommonServerRequest: function (ServerRequest, Params, CallbackFn, OnError, AppHandleError) {
        var _params = {};
        if (Params != null) for (item in Params) _params[item] = Params[item];
        _params.fn = 'Common.' + ServerRequest;

        Ext.Ajax.request(
            {
                url: 'App/Server/fn_call.php',
                method: 'post',
                params: _params,
                callback: function (options, success, response) {
                    var _response = 0;
                    try {
                        _response = Ext.decode(response.responseText, true);
                        if (_response == null) {
                            App.ShowServerError(response.responseText);
                            return false;
                        }

                        if (_response.success)
                            CallbackFn(eval(_response.Common));
                        else {
                            if (OnError) {
                                OnError(_response);
                                if (AppHandleError)
                                    App.ShowErrors(_response.errors);
                            }
                            else
                                App.ShowErrors(_response.errors);
                        }
                    }
                    catch (error) {
                        Ext.Msg.alert('Error en el cliente', error);
                    }
                }
            });
    },
    PerformCommonSyncServerRequest: function (ServerRequest, Params, AppHandleError) {
        var _params = (Params == null) ? {
            fn: ''
        } : Params;
        _params.fn = 'Common.' + ServerRequest;
        _params = Ext.Object.toQueryString(_params);

        var connection = new Ext.data.Connection();
        var xhr = connection.getXhrInstance();

        xhr.open('POST', 'App/Server/fn_call.php', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(_params);

        try {
            var _response = Ext.decode(xhr.responseText, true);
            // Error from the server
            if (_response == null) {
                App.ShowServerError(xhr.responseText);
                return false;
            }

            if (_response.success)
                return _response['Common'];
            else {
                if (typeof(AppHandleError) == 'undefined' || AppHandleError === true)
                    App.ShowErrors(_response.errors);

                return false;
            }
        }
        catch (error) {
            Ext.Msg.alert('Error en el cliente', error);
            return false;
        }
    },
    ThrowServerEvent: function (SubSystem, Event, Params, AppHandleError) {
        var _params = (Params == null) ? {
            fn: ''
        } : Params;
        _params.fn = 'AppEvent.Throw.' + SubSystem + '.' + Event;
        _params = Ext.Object.toQueryString(_params);

        var connection = new Ext.data.Connection();
        var xhr = connection.getXhrInstance();

        xhr.open('POST', 'App/Server/fn_call.php', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(_params);

        try {
            var _response = Ext.decode(xhr.responseText, true);
            // Error from the server
            if (_response == null) {
                App.ShowServerError(xhr.responseText);
                return false;
            }

            if (_response.success)
                return _response;
            else {
                if (typeof(AppHandleError) == 'undefined' || AppHandleError === true)
                    App.ShowErrors(_response.errors);

                return false;
            }
        }
        catch (error) {
            Ext.Msg.alert('Error en el cliente', error);
            return false;
        }
    },
    ShowReport: function (ServerRequest, Params, ReportName, Type) {
        var _module = this.__current_module.GetName();

        var _params = (Params == null) ? {
            fn: ''
        } : Params;
        _params.fn = _module + '.' + ServerRequest;
        _params.format = Type;
        _params.report_name = ReportName;
        _params = Ext.Object.toQueryString(_params);

        // Build the url
        var _url = 'App/Server/report_builder.php?&' + _params;
        window.open(_url, ReportName);
    },
    msgCt: null,
    InfoMessage: function (title, format, tipo) {
        if (!this.msgCt) {
            this.msgCt = Ext.core.DomHelper.insertFirst(document.body, {id: 'msg-div'}, true);
        }
        var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
        var m = Ext.core.DomHelper.append(this.msgCt, createBox(title, s, tipo), true);
        m.hide();
        m.slideIn('t').ghost("t", {delay: 4000, remove: true});
    },
    ConfirmMessage: function (fnCallBack, msg) {
        Ext.MessageBox.confirm('Confirmaci&oacute;n', msg, function (btn) {
            if (btn == 'yes')
                fnCallBack();
        });
    },
    ShowMsgBox: function (Ext_MsgBox) {
        this.__msg_box = Ext_MsgBox;
    },
    HideMsgBox: function () {
        this.__msg_box.hide();
    },
    // --------------------------------------------------
    // Init the application
    Init: function () {
        this.__interface.Build();
        this.__modules_manager.InitModules();
        this.__interface.Render();
    },
    // --------------------------------------------------
    // PROPERTIES
    // --------------------------------------------------
    // Return the height of the desktop
    GetDesktopHeigth: function () {
        return Ext.get('center_app_space').getComputedHeight();
    },
    // --------------------------------------------------
    // Return the width of the desktop
    GetDesktopWidth: function () {
        return Ext.get('center_app_space').getComputedWidth();
    },
    GetDesktopPosition: function () {
        return {
            x: Ext.get('center_app_space').getX(),
            y: Ext.get('center_app_space').getY()
        };
    },
    RegisterValue: function (Key, Value) {
        this.__storage[Key] = Value;
    },
    GetRegisteredValue: function (Key) {
        if (typeof(this.__storage[Key]) != 'undefined')
            return this.__storage[Key];

        return null;
    },
    DeleteRegisteredValue: function (Key) {
        if (typeof(this.__storage[Key]) != 'undefined') {
            delete this.__storage[Key];
            this.__storage[Key] = null;
        }
    },
    ClearRegistry: function () {
        delete this.__storage;
        this.__storage = null;
        this.__storage = new Array();
    },
	  UpBanner:function(){
        if(Ext.getCmp('center_banner').isHidden()==false)
        {
            console.log('ddddd');
            Ext.getCmp('center_banner').hide();
            Ext.getCmp('clearButton').removeCls('show-hide_up');
            Ext.getCmp('clearButton').addCls('show-hide_down');
            Ext.getCmp('north_space').setHeight(Ext.getCmp('north_space').height - InterfaceConf.banner_heigth);
        }
    }
}

function generarSubsistems(){
    console.log(subsystems);
    console.log(_clases);
    var _html = '';
    var j = 0;
    Ext.getCmp('center_app_space').removeAll();
    for(var i = 0;i<subsystems.length;i++){
        if(j == 0)
            _html+= '<div class="row" style="margin-left: 5px">';
            _html += '<div class="col-lg-4">' +
                        '<div class="panel panel-info">' +
                            '<div class="panel-heading">' +
                                '<div class="row">' +
                                    '<div class="col-xs-6">' +
                                        '<i class="'+_clases[subsystems[i]]+'"></i>' +
                                    '</div>' +
                                    '<div class="col-xs-6 text-right">' +
                                        '<p class="announcement-heading">'+subsystems[i]+'</p>' +
                                        '<p class="announcement-text">New Mentions!</p>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '<a href="App/Server/fn_call.php?fn=App.Log.Log.SwapSystem&system='+subsystems[i]+'">' +
                                '<div class="panel-footer announcement-bottom">' +
                                    '<div class="row">' +
                                        '<div class="col-xs-6">' +
                                            'View Mentions' +
                                        '</div>' +
                                        '<div class="col-xs-6 text-right">' +
                                            '<i class="fa fa-arrow-circle-right"></i>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</a>' +
                        '</div>' +
                    '</div>';
        j++;
        if(j == 3){
            _html += '</div>';
            j = 0;
        }
    }
    if($('#center_app_space-body')[0] != undefined)
        $('#center_app_space-body').html(_html);
    else
        $('#centrio').html(_html);

}