 
Ext.require([
    'Ext.form.Panel',
    'Ext.ux.form.MultiSelect',
    'Ext.ux.form.ItemSelector',
    'Ext.tip.QuickTipManager',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);
Ext.onReady(function () {
    var lugar = 1;
    var navigate = function (panel, direction) {
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        Ext.getCmp('move-next').setDisabled(!layout.getNext());
    };
    var tool=Ext.create('Ext.toolbar.Toolbar', {
        width   : 500,
        items: [
            '->',
            {   cls:'btn btn-small',
                iconCls:'comp',
                // text: 'comprobar',
                handler: function(){
                    var testin = 'testin';
                    var form = Ext.getCmp('formulario').getForm();
                    if(form.isValid()){
                        var mask = new Ext.LoadMask(Ext.get('_gst_Add_win_id'), {msg:'Comprobando la coneccion. Por Favor espere...'});
                        mask.show();
                        form.submit({
                            url: 'php/control.php',
                            params:{test:testin },
                            method:'POST',
                            success: function(form,action){
                                mask.hide();
                                Ext.Msg.alert('Estado de concccion',action.result.msg);
                            },
                            failure: function(form,action){
                                mask.hide();
                                switch (action.failureType) {
                                    case Ext.form.Action.CLIENT_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', 'El formulario presenta datos incorrectos');
                                        break;
                                    case Ext.form.Action.CONNECT_FAILURE:
                                        Ext.Msg.alert('Fallo de concccion', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                                        break;
                                    case Ext.form.Action.SERVER_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', action.result.msg);
                                        break;
                                    default:
                                        Ext.Msg.alert('Fallo de concccion',action.result.msg);
                                }
                            }
                        });
                    }
                }

            },
            '-',
            {   cls:'btn btn-small',
                iconCls:'add',
                // text: 'Crear BD',
                handler: function(){
                    var crearla = 'crearla';
                    var form = Ext.getCmp('formulario').getForm();
                    if(form.isValid()){
                        var mask = new Ext.LoadMask(Ext.get('_gst_Add_win_id'), {msg:'Comprobando la coneccion. Por Favor espere...'});
                        mask.show();
                        form.submit({
                            url: 'php/control.php',
                            params:{test:crearla },
                            method:'POST',
                            success: function(form,action){
                                mask.hide();
                                Ext.Msg.alert('Estado de concccion',action.result.msg);
                            },
                            errors: function(form,action){
                                mask.hide();
                                switch (action.failureType) {
                                    case Ext.form.Action.CLIENT_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', 'El formulario presenta datos incorrectos');
                                        break;
                                    case Ext.form.Action.CONNECT_FAILURE:
                                        Ext.Msg.alert('Fallo de concccion', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                                        break;
                                    case Ext.form.Action.SERVER_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', action.result.msg);
                                        break;
                                    default:
                                        Ext.Msg.alert('Fallo de concccion',action.result.msg);
                                }
                            }

                        });
                    }
                }
            },
            '-',
            {   cls:'btn btn-small',
                iconCls:'import',
                // text: 'Importar BD',
                formBind: true,
                handler: function(){
                    var importar = 'importar';
                    var form = Ext.getCmp('formulario').getForm();
                    if(form.isValid()){
                        var mask = new Ext.LoadMask(Ext.get('_gst_Add_win_id'), {msg:'Comprobando la coneccion. Por Favor espere...'});
                        mask.show();
                        form.submit({
                            url: 'php/control.php',
                            params:{test:importar},
                            method:'POST',
                            success: function(form,action){
                                mask.hide();
                                Ext.Msg.alert('Estado de concccion',action.result.msg);
                            },
                            errors: function(form,action){
                                mask.hide();
                                switch (action.failureType) {
                                    case Ext.form.Action.CLIENT_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', 'El formulario presenta datos incorrectos');
                                        break;
                                    case Ext.form.Action.CONNECT_FAILURE:
                                        Ext.Msg.alert('Fallo de concccion', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                                        break;
                                    case Ext.form.Action.SERVER_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', action.result.msg);
                                        break;
                                    default:
                                        Ext.Msg.alert('Fallo de concccion',action.result.msg);
                                }
                            }

                        });
                    }
                }

            }


        ]
    });
    var states = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"PostgreSQL", "name":"PostgreSQL"},
            {"abbr":"MySQL", "name":"MySQL"},
            {"abbr":"MsSQL", "name":"MsSQL"},
            {"abbr":"Access", "name":"Access"}
        ]
    });
    var combo= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Tipo de coneccion',
        store: states,
        id:'combo',
        name:'combo',
        labelWidth: 140,
        queryMode: 'local',
        editable:false,
        displayField: 'name',
        valueField: 'abbr'
    });
    var panel = Ext.create('Ext.form.Panel', {
        width: '100%',
        id:'formulario',
        cls: 'fondo',
        height: '100%',
        labelWidth: 140,
        layout: 'card',
        bodyStyle: 'padding:15px',
        defaults: {border: false},
        bbar: [
            {
                id: 'move-prev',
                text: 'Back',
                cls: 'btn btn-bar',
                iconCls:'atras',
                listeners: {click: function () {
                    lugar = lugar - 1;
                    Ext.getCmp('pasos').update('<p><abbr title="Pasos de la instalacion" class="initialism"><small>' + lugar + ' de 3 </small></p></abbr>');
                }, scope: this},
                handler: function (btn) {
                    navigate(btn.up("panel"), "prev");
                },
                disabled: true
            },
            '->',
            {   cls: 'btn btn-link',
                id: 'pasos',
                html: '<p><abbr title="Pasos de la instalacion" class="initialism"><small>' + lugar + ' de 3 </small></p></abbr>'},
            '->',
            {
                id: 'move-next',
                text: 'Next',
                cls: 'btn btn-bar',
                iconCls:'adelante',
                listeners: {click: function () {
                    lugar = lugar + 1;
                    Ext.getCmp('pasos').update('<p><abbr title="Pasos de la instalacion" class="initialism"><small>' + lugar + ' de 3 </small></p></abbr>');
                }, scope: this},
                handler: function (btn) {
                    navigate(btn.up("panel"), "next");
                }

            }
        ],
        items: [
            {id: 'card-0',
                html: '<table width="100%" height="100%" border="0">' +
                        '<tr >' +
                            '<td colspan="2"  height="8%" class="span9"> ' +
                            '<div class="navbar navbar-inverse" style = "margin:2 !important">'+
                            '<div class="navbar-inner">'+
                            '<a class="brand" href="#">Bienvenido a Hermes</a>'+
                            '<ul class="nav"><li class="divider-vertical"></li>'+
                            '<li><a href="#" id="hhh" rel="popover" data-html="true" data-placement="bottom" data-content="<span class=\'label label-success\'>Hermes</span></a> es el <b>Sistema para la Gestión del Capital Humano</b> de una empresa. En el se gestiona todo lo referente a:<br>' +
                            '<span class=\'label label-info\'>1-</span> Capital Humano.<br>' +
                            '<span class=\'label label-info\'>2-</span> Salarios.<br>'+
                            '<span class=\'label label-info\'>3-</span> Seguridad y Salud.<br>' +
                            '<span class=\'label label-info\'>4-</span> Trabajo de Cuadros.<br>'+
                            '<span class=\'label label-info\'>5-</span> Capacitación." ' +
                            'title="Debes Saber que!" onclick="$(\'#hhh\').popover(\'toggle\')">Que debo saber</a></li>'+
                            '<li><a href="#" id="hhh2" rel="popover" data-placement="bottom" data-content="Vivamus sagittis lacus ." ' +
                            'title="Popover on bottom" onclick="$(\'#hhh2\').popover(\'toggle\')">Contactenos</a></li>'+
                            '</ul></div></div>' +
                            '</td>' +
                         '</tr>' +

                        '<tr>' +
                           /* '<td rowspan="3" border="0" width="14%" height="100%" class="alert alert-info">' +
                            '<img src="img/img-sist/Izq2.png" width="100%"/>'+
                             '</td>' +*/
                            '<td border="0" width="100%" height="100%" class="btn1">' +
                            'Uno de los grandes retos a los que nos enfrentamos al intentar utilizar ' +
                            'las nuevas tecnologias en la vida diaria de una empresa es sin duda ' +
                            'el equipamiento necesario para implantralas.'+
                            '<br>I+D(Geocuba-Pinar del Rio) es, sin duda, una opcion para todos aquellos ' +
                            'que hoy lo intentan, aun mas si es por primera vez.<br>' +
                            'En esta ocacion les presentamos <span class="label label-success">Hermes</span> (Sistema para la gestion del capital humano),' +
                            ' confiable,rapido y de buen gusto son algunos de los ' +
                            'comentarios sobre esta nueva aplicacion de gestion que hoy ponemos a su dispocicion.<br><br> ' +
                            '<span class="label label-info">Requerimientos del Sistema(Sevidor) :</span><br>' +
                            '<span class=\'label label-info\'>1-</span> Capital Humano.<br>' +
                            '<span class=\'label label-info\'>2-</span> Salarios.<br>'+
                            '<span class=\'label label-info\'>3-</span> Seguridad y Salud.<br>' +
                            '<span class=\'label label-info\'>4-</span> Trabajo de Cuadros.<br>'+
                            '<span class=\'label label-info\'>5-</span> Capacitación.<br><br>' +
                            '<span class="label label-important">Requerimientos del Sistema (Cliente):</span><br>' +
                            '<span class=\'label label-important\'>1-</span> Capital Humano.<br>' +
                            '<span class=\'label label-important\'>2-</span> Salarios.<br>'+
                            '<span class=\'label label-important\'>3-</span> Seguridad y Salud.<br>' +
                            '<span class=\'label label-important\'>4-</span> Trabajo de Cuadros.<br>'+
                            '<span class=\'label label-important\'>5-</span> Capacitación.' +
                        '</tr>' +
                    '</table>'
            },
            {   id: 'card-1',
                autoScroll:true,
                layout: 'column',
                items: [
                    {
                        xtype: 'fieldset',
                        id: 'usersist',
                        defaults: {anchor: '100%', labelWidth: 150},
                        columnWidth: 0.30,
                        width: '100%',
                        height: '100%',
                        autoScroll:true,
                        cls:'alert alert-info',
                        items:[
                            Ext.create('Ext.Component', {loader: {url: 'php/subs.php',autoLoad: true}})
                        ]
                    },
                    {
                        xtype: 'component',
                        width: 5,
                        margin: '5 0 40'
                    },
                    {
                        xtype: 'fieldset',
                        id: 'userbd',
                        //cls:'alert alert-info',
                        columnWidth: 0.70,
                        width: '100%', autoScroll:true,
                        height: '99%',
                        defaults: { labelWidth: 140, anchor: '100%'},
                        items: [
                            {html:' <br>'},
                            {xtype: 'fieldset',
                                id: 'userffbd',
                                columnWidth: 0.50,
                                defaults: { labelWidth: 140, anchor: '100%'},
                                items: [
                                    {html:'Trabajo con los usuarios del sistema<p>'},
                                    {
                                        fieldLabel: 'Usuario del Sistema',
                                        name: 'Usuarior',
                                        xtype: 'textfield',
                                        emptyText: 'user',
                                        allowBlank: false,
                                        tooltip: 'Usuario del Sistema'
                                    },
                                    {
                                        fieldLabel: 'Password del Sistema',
                                        name: 'passwordr',
                                        xtype: 'textfield',
                                        emptyText: 'password',
                                        inputType: 'password',
                                        allowBlank: false,
                                        tooltip: 'Password del Sistema'
                                    },
                                    {html:'Nota: El usuario que se esta crando es el <b>administrador</b> sel sistema<p><p>'}
                                ]},
                            {
                                xtype: 'fieldset',
                                id: 'usessrbd',
                                columnWidth: 0.70,
                                defaults: { labelWidth: 140, anchor: '100%'},
                                items: [
                                    {html:'Trabajo con los usuarios de Base Datos<p>'},
                                    {
                                        fieldLabel: 'Usuario del BD',
                                        name: 'Usuario',
                                        id: 'Usuario',
                                        xtype: 'textfield',
                                        emptyText: 'user',
                                        allowBlank: false,
                                        tooltip: 'Enter your first name'
                                    },
                                    {
                                        fieldLabel: 'Password del BD',
                                        name: 'password',
                                        xtype: 'textfield',
                                        allowBlank: false,
                                        id: 'password',
                                        emptyText: 'password',
                                        inputType: 'password',
                                        tooltip: 'Enter your last name'
                                    },
                                    combo,
                                    {
                                        fieldLabel: 'Sevidor',
                                        xtype: 'textfield',
                                        name: 'Sever',
                                        id: 'Sever',
                                        emptyText: 'servidor(localhost/10.0.0.1)',
                                        tooltip: "Enter your employer's name"
                                    },
                                    {
                                        fieldLabel: 'Base de Datos',
                                        xtype: 'textfield',
                                        name: 'base',
                                        id: 'base',
                                        emptyText: 'capital_humano',
                                        tooltip: "Enter your employer's name"
                                    },
                                    {
                                        fieldLabel: 'Puerto',
                                        xtype: 'textfield',
                                        name: 'Puerto',
                                        id: 'Puerto',
                                        emptyText: 'puerto(5432)',
                                        allowBlank: false,
                                        tooltip: 'Enter your email address'
                                    },
                                    {
                                        xtype: 'filefield',
                                        name: 'SQL',
                                        fieldLabel: 'Fichero SQL',
                                        labelWidth: 140,
                                        msgTarget: 'side',
                                        allowBlank: false,
                                        emptyText: 'base_datos.sql',
                                        anchor: '100%',
                                        buttonText: 'SQL...',
                                        id: 'SQL',
                                        padding: '0 0 10 0',
                                        listeners: {
                                            change: function (UFile, value, options) {
                                                if (value == undefined) return;
                                                var _dot_ptr = value.lastIndexOf('.');
                                                var _ext = value.substr(_dot_ptr + 1);
                                                _ext = _ext.toLowerCase();
                                                if (_ext != 'sql') {
                                                    UFile.reset();
                                                    UFile.setValue(undefined);
                                                    UFile.setRawValue(undefined);
                                                    Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
                                                }
                                            }
                                        }


                                    },tool
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                id: 'card-2',
                html: '<table width="100%" height="100%" border="0" class="btn1">' +
                    '<tr >' +
                    '<td colspan="2"  height="8%" class="span9"> ' +
                    '<div class="navbar navbar-inverse" style = "margin:2 !important">'+
                    '<div class="navbar-inner">'+
                    '<a class="brand" href="#">Bienvenido a Hermes</a>'+
                    '<ul class="nav"><li class="divider-vertical"></li>'+
                    '<li><a href="#" id="hhh" rel="popover" data-html="true" data-placement="bottom" data-content="<span class=\'label label-success\'>Hermes</span></a> es el <b>Sistema para la Gestión del Capital Humano</b> de una empresa. En el se gestiona todo lo referente a:<br>' +
                    '<span class=\'label label-info\'>1-</span> Capital Humano.<br>' +
                    '<span class=\'label label-info\'>2-</span> Salarios.<br>'+
                    '<span class=\'label label-info\'>3-</span> Seguridad y Salud.<br>' +
                    '<span class=\'label label-info\'>4-</span> Trabajo de Cuadros.<br>'+
                    '<span class=\'label label-info\'>5-</span> Capacitación." ' +
                    'title="Debes Saber que!" onclick="$(\'#hhh\').popover(\'toggle\')">Que debo saber</a></li>'+
                    '<li><a href="#" id="hhh2" rel="popover" data-placement="bottom" data-content="Vivamus sagittis lacus ." ' +
                    'title="Popover on bottom" onclick="$(\'#hhh2\').popover(\'toggle\')">Contactenos</a></li>'+
                    '</ul></div></div>' +
                    '</td>' +
                    '</tr>' +

                    '<tr>' +
                    '<td rowspan="3" border="0" width="14%" height="100%" class="Sbsist">' +
                    '<img src="img/img-sist/Izq2.png" width="100%"/>'+
                    '</td>' +

                    '<td border="0" width="86%" height="100%" class="btn1">' +
                    'Uno de los grandes retos a los que nos enfrentamos al intentar utilizar ' +
                    'las nuevas tecnologias en la vida diaria de una empresa es sin duda ' +
                    'el equipamiento necesario para implantralas.'+
                    '<br>I+D(Geocuba-Pinar del Rio) es, sin duda, una opcion para todos aquellos ' +
                    'que hoy lo intentan, aun mas si es por primera vez.<br>' +
                    'En esta ocacion les presentamos <span class="label label-success">Hermes</span> (Sistema para la gestion del capital humano),' +
                    ' confiable,rapido y de buen gusto son algunos de los ' +
                    'comentarios sobre esta nueva aplicacion de gestion que hoy ponemos a su dispocicion.<br><br> ' +
                    '<span class="label label-info">Requerimientos del Sistema(Sevidor) :</span><br>' +
                    '<span class=\'label label-info\'>1-</span> Capital Humano.<br>' +
                    '<span class=\'label label-info\'>2-</span> Salarios.<br>'+
                    '<span class=\'label label-info\'>3-</span> Seguridad y Salud.<br>' +
                    '<span class=\'label label-info\'>4-</span> Trabajo de Cuadros.<br>'+
                    '<span class=\'label label-info\'>5-</span> Capacitación.<br><br>' +
                    '<span class="label label-important">Requerimientos del Sistema (Cliente):</span><br>' +
                    '<span class=\'label label-important\'>1-</span> Capital Humano.<br>' +
                    '<span class=\'label label-important\'>2-</span> Salarios.<br>'+
                    '<span class=\'label label-important\'>3-</span> Seguridad y Salud.<br>' +
                    '<span class=\'label label-important\'>4-</span> Trabajo de Cuadros.<br>'+
                    '<span class=\'label label-important\'>5-</span> Capacitación.' +
                    '</tr>' +
                    '</table>'
            }
        ]
    });
    var _gst_winaddAgencia = new Ext.Window({
        title:'Panel de Instalación',
        id: '_gst_Add_win_id',
        name: '_gst_Add_win_id',
        height: 610,
        width: 780,
        autoScroll:true,
        closable:false,
        maximizable:true,
        closable:true,
        tools:[
            {
                type:'help',
                tooltip: '¿Necesita Ayuda?',
                handler: function(event, toolEl, panel){
                    Ext.create('Ext.window.Window', {
                        title: '¿Necesita Ayuda?',
                        height:'40%',
                        iconCls:'help',
                        width:'50%',modal:true,
                        autoScroll:true,
                        layout: 'anchor',
                        html:
                            '<ul class="nav nav-list">' +
                                '<li>La ventana de <span class="label label-info">" Configuracion manual"</span>' +
                                ' Nos brinda la posibilidad de configurar los subsistemas de la aplicacion por separado, dado que cada subsistema ' +
                                'funciona como una aplicacion en si misma puede que necesite parametros unicos.</li><br>' +
                                '<li><span class="label label-important">Nota:</span><br>' +
                                'Notece que se pueden dejar subsistemas sin configura, pero debe entonces haber configurado' +
                                ' el sistema globalmente para que estos funcionen correctamente.' +
                                '</li>' +
                                '</ul>'

                    }).show();
                }
            }],
        plain: true,
        layout: 'fit',
        modal: true,
        resizable: false,
        items: [panel]
    });
    _gst_winaddAgencia.show();
})
function confWind2(){
    var arreglo=[];
    this.mio=[];
    var states = Ext.create('Ext.data.Store', {
        fields: ['abbr', 'name'],
        data : [
            {"abbr":"PostgreSQL", "name":"PostgreSQL"},
            {"abbr":"MySQL", "name":"MySQL"},
            {"abbr":"MsSQL", "name":"MsSQL"},
            {"abbr":"Access", "name":"Access"}
        ]
    });
    var mios = Ext.Ajax.request({url: 'php/arre.php',success: function(response){
        this.mio = Ext.decode(response.responseText);
        for (ind=0;ind<(this.mio).length;ind++){
            var sistema =this.mio[ind];
            arreglo[ind]={
                xtype:'fieldset',
                title: 'Subsistema: '+sistema,
                checkboxToggle: true,
                collapsed: true,
                id:'sistema_'+sistema,
                name:'sistema_'+sistema,
                defaults: {anchor: '85%', labelWidth: 140},
                layout: 'anchor',
                items :[
                    {width:'5px'},
                    {
                        fieldLabel: 'Tipo de coneccion',
                        store: states,
                        id:'combo_'+sistema,
                        xtype:'combo',
                        name:'combo_'+sistema,
                        labelWidth: 140,
                        queryMode: 'local',
                        editable:false,
                        displayField: 'name',
                        valueField: 'abbr'
                    },
                    {
                        fieldLabel: 'subsis',
                        xtype:'textfield',
                        name: 'subsis_'+sistema,
                        id:'subsis_'+sistema,
                        value:sistema,
                        hidden:true
                    },
                    {
                        fieldLabel: 'Usuario',
                        xtype:'textfield',
                        name: 'Usuario_'+sistema,
                        id:'Usuario_'+sistema
                    },
                    {
                        fieldLabel: 'Passw',
                        xtype:'textfield',
                        name: 'Passw_'+sistema,
                        id:'Passw_'+sistema
                    },
                    {
                        fieldLabel: 'Host',
                        xtype:'textfield',
                        name: 'Host_'+sistema,
                        id:'Host_'+sistema
                    },
                    {
                        fieldLabel: 'Puerto',
                        xtype:'textfield',
                        name: 'Puerto_'+sistema,
                        id:'Puerto_'+sistema
                    },
                    {
                        fieldLabel: 'Nombre BD',
                        xtype:'textfield',
                        name: 'Nbase_'+sistema,
                        id:'Nbase_'+sistema
                    },
                    {
                        xtype: 'filefield',
                        name: 'SQL_'+sistema,
                        fieldLabel: 'Fichero SQL',
                        msgTarget: 'side',
                        allowBlank: false,
                        emptyText: 'base_datos.sql',
                        buttonText: 'SQL...',
                        id: 'SQL_'+sistema,
                        padding: '0 0 10 0',
                        listeners: {
                            change: function (UFile, value, options) {
                                if (value == undefined) return;
                                var _dot_ptr = value.lastIndexOf('.');
                                var _ext = value.substr(_dot_ptr + 1);
                                _ext = _ext.toLowerCase();
                                if (_ext != 'sql') {
                                    UFile.reset();
                                    UFile.setValue(undefined);
                                    UFile.setRawValue(undefined);
                                    Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
                                }
                            }
                        }
                    }
                ]
            }}
        var form=Ext.create('Ext.form.Panel', {
            layout: 'anchor',
            id:'form',
            name:'form',
            items:arreglo
            });
        var confWind2 = new Ext.Window({
            title: 'Configuración Manual',
            id: 'confWind2',
            name: 'confWind2',
            height: 400,
            width: 500,
            autoScroll:true,
            closable:false,
            maximizable:true,
            plain: true,
            paddingLeft:10,closable:true,
            layout: 'anchor',
            modal: true,
            resizable: true,
            tools:[
                {
                    type:'help',
                    tooltip: '¿Necesita Ayuda?',
                    handler: function(event, toolEl, panel){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'40%',
                            iconCls:'help',
                            width:'50%',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>La ventana de <span class="label label-info">" Configuracion manual"</span>' +
                                    ' Nos brinda la posibilidad de configurar los subsistemas de la aplicacion por separado, dado que cada subsistema ' +
                                    'funciona como una aplicacion en si misma puede que necesite parametros unicos.</li><br>' +
                                    '<li><span class="label label-important">Nota:</span><br>' +
                                    'Notece que se pueden dejar subsistemas sin configura, pero debe entonces haber configurado' +
                                    ' el sistema globalmente para que estos funcionen correctamente.' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
                }],
            items:{
                xtype: 'fieldset',
                id: 'subs',
                margin:'10px',
                title:'Todos los Sistemas',
                defaults: { labelWidth: 140, anchor: '100%'},
                layout: 'anchor',
                items :form
            },
            bbar:['->',{
                xtype: 'button',
                cls:'btn',
                text : 'Enviar',
                handler: function(){
                    var manual = 'manual';
                    var form = Ext.getCmp('form').getForm().getValues();
                   /* if(form.isValid()){*/
                        var mask = new Ext.LoadMask(Ext.get('_gst_Add_win_id'), {msg:'Comprobando la coneccion. Por Favor espere...'});
                        mask.show();
                        form.submit({
                            url: 'php/control.php',
                            params:{test:manual},
                            method:'POST',
                            success: function(form,action){
                                mask.hide();
                                Ext.Msg.alert('Estado de concccion',action.result.msg);
                            },
                            errors: function(form,action){
                                mask.hide();
                                switch (action.failureType) {
                                    case Ext.form.Action.CLIENT_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', 'El formulario presenta datos incorrectos');
                                        break;
                                    case Ext.form.Action.CONNECT_FAILURE:
                                        Ext.Msg.alert('Fallo de concccion', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                                        break;
                                    case Ext.form.Action.SERVER_INVALID:
                                        Ext.Msg.alert('Fallo de concccion', action.result.msg);
                                        break;
                                    default:
                                        Ext.Msg.alert('Fallo de concccion',action.result.msg);
                                }
                            }

                        });
                    //}
                }


            }]

        });
        confWind2.show();
        },scope:this});
}