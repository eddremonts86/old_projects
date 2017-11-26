Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function Registro_Eventos(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Registro Eventos',
            id: 'Registro_Eventos_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {

       this.__data_store = App.BuildJsonStore('Registro_Eventos.Registro_Eventos.CargarDatos',{
            fields: [
                {name: 'id'},
                {name: 'nombre_completo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });
       this.cargos = App.BuildJsonStore('Registro_Eventos.Registro_Eventos.cargos',{
            fields: [
                {name: 'id'},
                {name: 'nombre'}

            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });
       this.states = App.BuildJsonStore('Registro_Eventos.Registro_Eventos.Cargareventos',{
            fields: [
                {name: 'id'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });
       this._grid_historial = App.BuildJsonStore('Registro_Eventos.Registro_Eventos.historial',{
            fields: [
                {name: 'titulo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'titulo', direction: 'DESC'},
            autoLoad: true
        });
        var combo = Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Evento',
        store:  this.states,
        queryMode: 'local',
        labelWidth:50,
        width: '20%',
        id:'evento',
        name:'evento',
        displayField: 'nombre',
        valueField: 'nombre'

    });
        var pane = Ext.create('Ext.form.Panel', {
            title: 'REGISTRO DE FORMACIÓN INTERNA Y EXTERNA',
            width:'100%',
            id:'panelee',
            name:'panelee',
            bodyPadding: 8,
            items: [
                {
                    xtype: 'checkboxgroup',
                    columns: 3,
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'name',
                            labelWidth:140,
                            width: '45%',
                            id:'inst',
                            name:'inst',
                            fieldLabel: 'Impartido por instructor',
                            allowBlank: false
                        },{
                            xtype: 'textfield',
                            labelWidth:190,
                            width: '35%',
                            id:'titulo',
                            allowBlank: false,
                            name:'titulo',
                            fieldLabel: 'Título de la formación impartida:'
                        },combo
                    ]
                },
                {
                    xtype: 'checkboxgroup',
                    columns: 3,
                    items: [
                        {
                            xtype: 'textfield',
                            id:'cargo_inst',
                            name:'cargo_inst',
                            labelWidth:140,allowBlank: false,
                            width: '60%',
                            fieldLabel: 'Cargo del instructor:'
                            },{
                            xtype: 'textfield',
                            id:'fi',
                            name:'fi',
                            labelWidth:190,allowBlank: false,
                            width: '20%',
                            fieldLabel: 'FI',
                            allowBlank: false  // requires a non-empty value
                        },{
                            xtype: 'textfield',
                            id:'ft',
                            name:'ft',
                            labelWidth:50,allowBlank: false,
                            width: '20%',
                            fieldLabel: 'FT',
                            vtype: 'email'  // requires value to be a valid email address format
                        }
                    ]
                }
           ]
        });
        var _grid = new Ext.grid.Panel({
            id:'cap',
            name:'cap',
            height:'90%',
            width: '99%',
            region: 'center',
            frame: true,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            store: this.__data_store1,
            columns: [
                {header: 'Trabajador',menuDisabled: true,sortable : false,flex: 1,dataIndex: 'nombre',
                    editor: new Ext.form.field.ComboBox({
                        triggerAction: 'all',
                        queryMode:'local',
                        store: this.__data_store,
                        displayField: 'nombre_completo',
                        valueField: 'nombre_completo'
                    })
                },
                {header: 'Cargo',menuDisabled: true,sortable : false,dataIndex: 'Cargo',flex: 1,editor: {allowBlank: false},
                    editor: new Ext.form.field.ComboBox({
                    triggerAction: 'all',
                    queryMode:'local',
                    store: this.cargos,
                    displayField: 'nombre',
                    valueField: 'nombre'
                })
                },
                {header: 'Unidad Estructural',menuDisabled: true,sortable : false,dataIndex: 'Unidad',flex: 1,editor: {allowBlank: false}},
                {text: 'Categorias',
                columns: [
                {header: 'C Cv',menuDisabled: true,sortable : false,dataIndex: 'Cv',width:80,editor: {allowBlank: false}},
                {header: 'C Tv',menuDisabled: true,sortable : false,dataIndex: 'tv',width:80,editor: {allowBlank: false}}
                    ]
                }

                ],
            viewConfig: {forceFit: true},
            tbar:pane,
            bbar:{
                id:'Registro_Eventos_tbar_id',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store:this.__data_store1,
                        displayInfo: true,
                        plugins: new Ext.ux.ProgressBarPager()
                    },
                    ('->'),
                    {
                        xtype: 'button',
                        iconCls:'help',
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
                                        '<li>El modulo <span class="label label-info">" Clacificaci&oacute;n Cientifica"</span>' +
                                        ' le permite gestionar las clacificaci&oacute;n cientifica de los trabajadores.<br>' +
                                        '</li>' +
                                        '</ul>'

                            }).show();
                        }
                    },
                    {
                        text: 'Adicionar',
                        id: 'boton',
                        name: 'boton',
                        tooltip : 'Adiciona un  nuevo Clasificaci&oacute;n Cientifica',
                        iconCls: 'add',
                        xtype:'button',
                        cls:'btn',
                        listeners:{
                            click:function( This, eOpts ){
                                Ext.define('FILA',{
                                    extend: 'Ext.data.Model',
                                    fields: [
                                        {name: 'nombre'},
                                        {name: 'Cargo'},
                                        {name: 'Unidad'},
                                        {name: 'Cv'},
                                        {name: 'tv'}
                                    ]
                                });
                                var record = new FILA({nombre:'',Cargo:'',Unidad:'',Cv:'',tv:''});
                                This.up('grid').getStore().add(record);
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        cls:'btn',
                        id: 'boton_guardar',
                        name: 'boton_guardar',
                        iconCls: 'save',
                        text : 'Guardar Información',
                        handler:function( This, eOpts){
                            var mydd =new Array();
                            _array = new Array();
                            var mydd = This.up('grid').getStore().getModifiedRecords();
                            if (mydd.length === 0)
                            { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                            else
                            {
                                for (var i = 0; i < mydd.length; i++)
                                {
                                    _array.push(mydd[i].getData());
                                }
                                var fnCallBack = function()   {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var evento = Ext.getCmp('evento').getValue();
                                    var inst = Ext.getCmp('inst').getValue();
                                    var titulo = Ext.getCmp('titulo').getValue();
                                    var cargo_inst = Ext.getCmp('cargo_inst').getValue();
                                    var fi = Ext.getCmp('fi').getValue();
                                    var ft = Ext.getCmp('ft').getValue();
                                    var form = Ext.getCmp('panelee');
                                      if(form.isValid()){
                                           var _result = App.PerformSyncServerRequest('Registro_Eventos.Registro_Eventos.Add',
                                                {data: Ext.encode(_array),evento:evento,ft:ft,fi:fi,inst:inst,cargo_inst:cargo_inst,titulo:titulo});
                                                App.HideMsgBox();
                                            if(_result)
                                            {
                                                Ext.getCmp('cap').getStore().load()
                                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                            }
                                            else
                                            {
                                                Ext.getCmp('cap').getStore().load()
                                                App.InfoMessage('Información', 'Ocurrio un error');
                                            }
                                          App.InfoMessage('Información', 'Bien');
                                      }
                                    else{
                                          App.InfoMessage('Información', 'Faltan datos por entrar');
                                          App.HideMsgBox();
                                      }
                                }
                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                            }


                        }
                    },
                    {
                        text: 'Eliminar',
                        id: 'Eliminar',
                        name: 'Eliminar',
                        tooltip : 'Eliminar una fila',
                        iconCls: 'del_item',
                        xtype:'button',
                        cls:'btn',
                        handler:function(This){
                            var _selectionModel = This.up('grid').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.id;
                            var cap_Registro_Eventos = _selected_rcd.data.cap_Registro_Eventos;
                            var record = _selected_rcd ;
                            if(id == null || id==''){
                                This.up('grid').store.remove(record);}
                            else{
                                var fnCallBack = function()   {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var _result = App.PerformSyncServerRequest('Registro_Eventos.Registro_Eventos.Eliminar', {id:id});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        This.up('grid').store.remove(record);
                                        App.InfoMessage('Información', 'Ha eliminado una acción del capitulo <b>"'+cap_Registro_Eventos+'"</b>');
                                    }
                                    else
                                    {
                                        Ext.getCmp('cap').getStore().load()
                                        App.InfoMessage('Información', 'Ocurrio un error');
                                    }
                                }
                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');




                            }
                        }
                    }
                ]
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('Registro_EventosGestionar');
                        }
                        else
                        {
                            this.Enable('Registro_EventosGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var _grid_historial = new Ext.grid.Panel({
            id:'grid_historial',
            name:'grid_historial',
            height:'100%',
            width: '99%',
            layout:'fit',
            store: this._grid_historial,
            columns: [
                {header: 'Titulo',menuDisabled: true,sortable : false,flex: 1,dataIndex: 'titulo'}
            ],
            viewConfig: {forceFit: true},
            bbar:{
                id:'Registro_Eventos_grid_historial_tbar_id',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store: this._grid_historial
                    }
                ]
            },
            listeners: {
                itemclick:{
                    fn:function(){
                        Ext.getCmp('print').show();
                        Ext.getCmp('plus').show();
                        Ext.getCmp('minus').show();
                    }
                }

            }

        });
        var lateral=Ext.create('Ext.panel.Panel', {
            title: 'Historial de eventos',
            width: 335,
            height:'100%',
            region: 'west',
            resizable :true,
            collapsed : true,
            collapsible : true,
            collapseDirection : 'right',
            layout:'fit',
            tools: [
                {
                    type:'print',
                    id:'print',
                    hidden:true,
                    handler:function(){}
                },
                {
                    type:'gear',
                    hidden:true,
                    id:'plus',
                    handler:function(){
                        var _selected_rcd = Ext.getCmp('grid_historial').getSelectionModel().getLastSelected();
                        var titulo =_selected_rcd.data.titulo;
                        this._grid_historial_titulo = App.BuildJsonStore('Registro_Eventos.Registro_Eventos.evento_por_hist',{
                            fields: [
                                {name: 'id'},
                                {name: 'nombre'},
                                {name: 'evento_nombre'},
                                {name: 'titulo'},
                                {name: 'nombre_inst'},
                                {name: 'cargo_inst'},
                                {name: 'fi'},
                                {name: 'ft'},
                                {name: 'cargo_trab'},
                                {name: 'unidad'},
                                {name: 'categoria_ccv'},
                                {name: 'categoria_tcv'}
                            ],
                            proxy: {
                                type: 'ajax',
                                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                            },
                            params:{titulo:titulo},
                            sorters: {property: 'nombre', direction: 'DESC'},
                            autoLoad: true
                        });
                        var griddd = Ext.create('Ext.grid.Panel', {
                            store:  this._grid_historial_titulo,
                            columns: [
                                { text: 'Nombre',  dataIndex: 'nombre',flex:2},
                                { text: 'Evento', dataIndex: 'evento_nombre',flex:2},
                                { text: 'Titulo', dataIndex: 'titulo',flex:2 },
                                { text: 'Instructor',  dataIndex: 'nombre_inst',flex:2 },
                                { text: 'Cargo del <br>Instructor', dataIndex: 'cargo_inst',flex:2},
                                { text: 'Fi', dataIndex: 'fi',flex:1 },
                                { text: 'Ft',  dataIndex: 'ft',flex:1 },
                                { text: 'Cargo del <br>Trabajador', dataIndex: 'cargo_trab',flex:2},
                                { text: 'Unidad', dataIndex: 'unidad' ,flex:2},
                                {text: 'Categorias',
                                columns: [
                                            { text: 'C cv', dataIndex: 'categoria_ccv' ,flex:1},
                                            { text: 'T cv', dataIndex: 'categoria_tcv',flex:1 }
                                        ]
                                }
                            ],
                            bbar:{
                                id:'Registro_Eventos_id',
                                height: 28,
                                items: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        pageSize: 10,
                                        store: this._grid_historial_titulo
                                    }
                                ]
                            },
                            height: '98%',
                            width: '100%'
                        });
                        Ext.create('Ext.window.Window', {
                            title: 'Participantes en el evento: '+titulo,
                            height: '90%',
                            width: '90%',
                            layout: 'fit',
                            modal:true,
                            items:griddd
                        }).show();

                    }
                },
                {
                    type:'minus',
                    hidden:true,
                    id:'minus',
                    handler:function(){
                        var _selected_rcd = Ext.getCmp('grid_historial').getSelectionModel().getLastSelected();
                        var titulo =_selected_rcd.data.titulo;
                        console.log(titulo);
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('Registro_Eventos.Registro_Eventos.Eliminarhs',{titulo:titulo});
                            App.HideMsgBox();
                            if(_result)
                            {
                                Ext.getCmp('grid_historial').getStore().load();
                                App.InfoMessage('Información', 'Se elimino satisfactoriamente el Evento');
                            }
                            else
                                App.InfoMessage('Información', 'Ocurrio un error');
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar  el Evento "'+ titulo +'"?');
                    }
                },
                {
                    type:'help',
                    handler:function(){}
                }
            ],
            items:_grid_historial
        });
        var _panel = new Ext.Panel({
            title: 'Registro Eventos de superacion',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items:[_grid,lateral],
            listeners: {
                afterrender: function(){},
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
App.RegisterModule('Registro_Eventos', new Registro_Eventos());