Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function CuadroNivel(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Niveles',
            id: 'CuadroNivel_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestion de Cuadros',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {

       this.__data_store = App.BuildJsonStore('CuadroNivel.CuadroNivel.CargarDatos',{
            fields: [
                {name: 'id'},
                {name: 'trabajador_id'},
                {name: 'nombre_completo'},
                {name: 'nombre'},
                {name: 'cargo_id'},
                {name: 'nivel'},
                {name: 'nivel_id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });
        this.__data_store_nivel = App.BuildJsonStore('CuadroNivel.CuadroNivel.CargarDatosNivel',{
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
        var _grid = new Ext.grid.Panel({
            id:'CuadroNivel_tbar_idcap',
            name:'CuadroNivel_tbar_idcap',
            height:'90%',
            width: '99%',
            region: 'center',
            frame: true,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            store: this.__data_store,
            columns: [
                {header: 'Trabajador',menuDisabled: true,sortable : false,dataIndex: 'nombre_completo',flex:3},
                {header: 'Cargo',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex:3},
                {header: 'Nivel',menuDisabled: true,sortable : false,flex: 1,dataIndex: 'nivel',
                 editor: new Ext.form.field.ComboBox({
                        triggerAction: 'all',
                        queryMode:'local',
                        store: this.__data_store_nivel,
                        displayField: 'nombre',
                        valueField: 'id'
                    })
                }
            ],
            viewConfig: {forceFit: true},
            bbar:{
                id:'CuadroNivel_tbar_id',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store:this.__data_store,
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
                                    var _result = App.PerformSyncServerRequest('CuadroNivel.CuadroNivel.Add',{data: Ext.encode(_array)});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        Ext.getCmp('CuadroNivel_tbar_idcap').getStore().load()
                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('CuadroNivel_tbar_idcap').getStore().load()
                                        App.InfoMessage('Información', 'Ocurrio un error');
                                    }
                                }
                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                            }


                        }
                    }
                ]
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('CuadroNivelGestionar');
                        }
                        else
                        {
                            this.Enable('CuadroNivelGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var _panel = new Ext.Panel({
            title: 'Control certificados',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items:[_grid],
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
    this.Print = function(){
        return 'dfnkdfn dlfksd fdlf ';}
}
App.RegisterModule('CuadroNivel', new CuadroNivel());