function SoliyAprob(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Solicitud de Eventos',
            id: 'SoliyAprob_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        Ext.require([
            'Ext.tip.*',
            'Ext.grid.*',
            'Ext.grid.plugin.*',
            'Ext.grid.features.*',
            'Ext.util.*',
            'Ext.toolbar.Paging',
            'Ext.ux.SlidingPager',
            'Ext.ux.PreviewPlugin',
            'Ext.ModelManager',
            'Ext.tip.QuickTipManager',
            'Ext.ux.form.ItemSelector',
            'Ext.ux.ajax.JsonSimlet',
            'Ext.ux.ajax.SimManager'
        ]);
        App.InsertMenuItem('Capacitación',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {

       this._store_combo_Cursos = App.BuildJsonStore('SoliyAprob.SoliyAprob.cursos',{
            fields: [{name: 'id'},
                     {name: 'nombre'}],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            sortInfo: {field: 'nombre',direction: 'ASC'},
            params:{$_start:0,$_limit:25},
            autoLoad: true
        });
       this.__data_store = App.BuildJsonStore('SoliyAprob.SoliyAprob.CargarDatos',{
                fields: [
                    {name: 'id_trabj'},
                    {name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                params:{$_start:0,$_limit:25},
                sorters: {property: 'agencia', direction: 'DESC'},
                autoLoad: true
            });
       this.panelupdCap_Trabajador = Ext.create('Ext.form.Panel', {
            xtype: 'plain-tabs',
            autoScroll : true,
            id:'trabajadores_cursos',
            name:'trabajadores_cursos',
            plain: true,
            margin: '5 5 5',
            defaults: {bodyPadding: 10,autoScroll: true},
            layout: 'column', // arrange fieldsets side by side
            items: [
               {    xtype:'fieldset',
                    columnWidth: 0.5,
                    width:'100%',
                    title: 'Cursos de Superacion ',
                    collapsible: false,
                    height:'100%',
                    id:'cursos',
                    name:'cursos',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[{
                            xtype: 'itemselector',
                            name: 'cursosqq_pasados',
                            id: 'cursosqq_pasados',
                            anchor: '100%',
                            height:410,
                            hideLabel:true,
                            autoScroll:true,
                            fieldLabel: 'ItemSelector',
                            imagePath: 'Framework/Client/ExtJs/src/ux/css/images/',
                            store:  this._store_combo_Cursos,
                            displayField: 'nombre',
                            valueField: 'id',
                            value:[],
                            allowBlank: false,
                            msgTarget: 'side',
                            fromTitle: 'Cursos Disponibles',
                            toTitle: 'Cursos Solicitados'
                        }]
                 },
                {height:5},
                {   xtype:'fieldset',
                    columnWidth: 0.5,
                    title: 'Trabajadores ',
                    collapsible: false,
                    id:'Trabajadores_cursos2',
                    height:'100%',
                    width:'100%',
                    name:'Trabajadores_cursos2',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[
                        {
                                xtype: 'itemselector',
                                name: 'Trabajadores2',
                                id: 'Trabajadores2',
                                anchor: '100%',
                                height:410,
                                hideLabel:true,
                                autoScroll:true,
                                fieldLabel: 'ItemSelector',
                                imagePath: 'Framework/Client/ExtJs/src/ux/css/images/',
                                store:  this.__data_store,
                                displayField: 'nombre',
                                valueField: 'id_trabj',
                                value:[],
                                allowBlank: false,
                                msgTarget: 'side',
                                fromTitle: 'Trabajadores',
                                toTitle: 'Trabajadores que solicitan Cursos  '
                        }
                    ]
                }
            ]
        });
       this._btn_Historial = Ext.create('Ext.Button', {
        text: 'Guardar',
        id: 'Cursos_id',
        tooltip : 'Todos los cursos inactivos',
        iconCls: 'modify',
        disabled: false,
        cls:'btn',
        handler: function(){
            var trabajadores = Ext.getCmp('Trabajadores2').getValue();
            var cursos = Ext.getCmp('cursosqq_pasados').getValue();
            var result = App.PerformSyncServerRequest('SoliyAprob.SoliyAprob.guardoaDatos',Ext.getCmp('trabajadores_cursos').getForm().getValues());
            if(result==true){
                App.InfoMessage('Información', 'Se han solicitados los cursos satisfactoriamente');
            }
            else{
                App.InfoMessage('Información', 'No se pudo  solicitados los cursos');
            }
            }

    });
       var tabs = Ext.create('Ext.tab.Panel', {
            activeTab: 0,
           height: App.GetDesktopHeigth()-30,
           width: App.GetDesktopWidth(),
            items: [
                {   title: 'Eventos Disponibles',
                    items:[this.panelupdCap_Trabajador],
                    bbar:[this._btn_Historial,('->'),{
                    xtype: 'button',
                    //text : 'Ayuda',
                    iconCls:'help',
                        cls:'btn',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'25%',
                            width:'55%',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El modulo <span class="label label-info">" Solicitud de cursos"</span>' +
                                    ' le permite gestionar las solicitudes de cursos por los trabajadores.<br>' +
                                    '<span class="label label-warning">Debe saber que :</span>' +
                                    '<br>No es necesario ir uniendo un curso y un trabajador sino que pud dar un rango de usuarios y asignarle un rango de cursos a los mismos.<br>' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
    }]
                },
                {
                    title: 'Solicitar Eventos',
                    items:[ {
                        xtype: 'htmleditor',
                        width: '100%',
                        height: 460,
                        id:'Scursos',
                        name:'Scursos',
                        hideLabel:true
                    }],
                    bbar:[{
                        xtype: 'button',
                        //text : 'Ayuda',
                        iconCls:'help',
                        cls:'btn',
						text : 'Guardar',
                        handler: function() {
                                               var datos = Ext.getCmp('Scursos').getValue();
                                               var cursos = App.PerformSyncServerRequest('SoliyAprob.SoliyAprob.guardoaDatosSolicitud',{datos:datos});
                                               if(cursos==true){
                                               App.InfoMessage('Información', 'Curso autorizado satisfactoriamente');
                                               }
                                               else{
                                                   App.InfoMessage('Información', 'No se pudo eliminar el curso solicitado');
                                               }
                                   },
                                           scope: this
                    },('->'),{
                        xtype: 'button',                      
                        iconCls:'help',
                        cls:'btn',
                        handler:function(){
                            Ext.create('Ext.window.Window', {
                                title: '¿Necesita Ayuda?',
                                height:'25%',
                                width:'55%',
                                iconCls:'help',modal:true,
                                autoScroll:true,
                                layout: 'anchor',
                                html:
                                    '<ul class="nav nav-list">' +
                                        '<li>El modulo <span class="label label-info">" Solicitud de cursos"</span>' +
                                        ' le permite gestionar las solicitudes de cursos por los trabajadores.<br>' +
                                        '<span class="label label-warning">Debe saber que :</span>' +
                                        '<br>No es necesario ir uniendo un curso y un trabajador sino que pud dar un rango de usuarios y asignarle un rango de cursos a los mismos.<br>' +
                                        '</li>' +
                                        '</ul>'

                            }).show();
                        }
                    }]
                }
            ]
        });
       var _panel = new Ext.Panel({
            title: 'Solicitud de Eventos',
            border: true,
            frame: true,
            layout: 'border',
            height: '500px',
            width: '500px',
            items: [tabs],
            listeners: {
                afterrender: function() {},
                scope : this
            }
        });
       return _panel;
    }
    // ========================================================================//
    this.Free = function()
    {
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('SoliyAprob', new SoliyAprob());