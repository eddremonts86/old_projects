function Canalisis(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Canalisiss =
        {
            text: 'Criterios de analisis',
            id: 'Canalisis_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores', _menu_item_config_Canalisiss);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Canalisis.Canalisis.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'ave'},
            {name: 'clase'},
            {name: 'formato'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var _grid = new Ext.grid.Panel({
            id: 'Canalisis_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Clase',menuDisabled: true,sortable : false,dataIndex: 'clase',flex: 1},
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 5},
                {header: 'Ave',menuDisabled: true,sortable : false,dataIndex: 'ave',flex: 1},
                {header: 'Formato',menuDisabled: true,sortable : false,dataIndex: 'formato',flex: 1}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Canalisis_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: [
                {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },'->',
                { xtype: 'button', text: 'Actualizar',
                  handler:function(){
                    var _selectionModel = Ext.getCmp('Canalisis_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var id =_selected_rcd.data.id;
                    var nombre_criterio =_selected_rcd.data.nombre;
                    this.__data_store_prod = App.BuildJsonStore('Canalisis.Canalisis.CargarDatos_geee',{
                        fields: [
                            {name: 'id'},
                            {name: 'id_canailisis'},
                            {name: 'nombre'}
                        ],
                        proxy: {
                            type: 'ajax',
                            reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                        },
                        sorters: {property: 'nombre', direction: 'DESC'},
                        params:{id:id},
                        autoLoad: true
                    });
                    var _grid_prod = new Ext.grid.Panel({
                        id:'componente_Canaisis',
                        name:'componente_Canaisis',
                        region: 'center',
                        frame: true,
                        plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                        store: this.__data_store_prod,
                        columns: [{ text: 'Descripcion', dataIndex: 'nombre', flex: 5,editor: {allowBlank: false}}],
                        viewConfig: {forceFit: true},
                        bbar:{
                            id:'ElementoGasto_tbar_id___grid_prod',
                            height: 28,
                            items: [
                                {
                                    xtype: 'pagingtoolbar',
                                    pageSize: 10,
                                    store:this.__data_store_prod
                                }
                            ]},
                        tbar:[
                                {
                                    text: 'Adicionar',
                                    id: 'boton__grid_prod',
                                    name: 'boton__grid_prod',
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
                                                    {name: 'id'}
                                                ]
                                            });
                                            var record = new FILA({nombre_gasto:'',id:'NULL'});
                                            Ext.getCmp('componente_Canaisis').getStore().add(record);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls:'btn',
                                    id: 'boton_guardar__grid_prod',
                                    name: 'boton_guardar__grid_prod',
                                    iconCls: 'save',
                                    text : 'Guardar Información',
                                    handler:function( This, eOpts){
                                        var mydd =new Array();
                                        _array = new Array();
                                        var mydd =Ext.getCmp('componente_Canaisis').getStore().getModifiedRecords();
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
                                                var _result = App.PerformSyncServerRequest('Canalisis.Canalisis.Add_comp',{data: Ext.encode(_array),id:id});
                                                App.HideMsgBox();
                                                if(_result)
                                                {
                                                    Ext.getCmp('componente_Canaisis').getStore().load()
                                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                }
                                                else
                                                {
                                                    Ext.getCmp('componente_Canaisis').getStore().load()
                                                    App.InfoMessage('Información', 'Ocurrio un error');
                                                }
                                            }
                                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                        }


                                    }
                                },
                                {
                                    text: 'Eliminar',
                                    id: 'Eliminar__grid_prod',
                                    name: 'Eliminar__grid_prod',
                                    tooltip : 'Eliminar una fila',
                                    iconCls: 'del_item',
                                    xtype:'button',
                                    cls:'btn',
                                    handler:function(This){
                                        var _selectionModel = This.up('grid').getSelectionModel();
                                        var _selected_rcd = _selectionModel.getLastSelected();
                                        var id = _selected_rcd.data.ElementoGasto_id;
                                        var cap_ElementoGasto = _selected_rcd.data.cap_ElementoGasto;
                                        var record = _selected_rcd ;
                                        if(id == null || id==''){
                                            Ext.getCmp('componente_Canaisis').store.remove(record);}
                                        else{
                                            var fnCallBack = function()   {
                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                var _result = App.PerformSyncServerRequest('Canalisis.Canalisis.Eliminar_comp',{id:id});
                                                App.HideMsgBox();
                                                if(_result)
                                                {
                                                    Ext.getCmp('componente_Canaisis').store.remove(record);
                                                    App.InfoMessage('Información', 'Se ha eliminado satisfactoriamente');
                                                }
                                                else
                                                {
                                                    Ext.getCmp('componente_Canaisis').getStore().load()
                                                    App.InfoMessage('Información', 'Ocurrio un error');
                                                }
                                            }
                                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');




                                        }
                                    }
                                }
                                ]
                    });
                    Ext.create('Ext.window.Window', {
                        title: 'Analisis: '+nombre_criterio,
                        height: '40%',
                        modal:true,
                        width: 700,
                        layout: 'fit',
                        items:_grid_prod
                    }).show();
                }
            }
            ],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('CanalisisGestionar');
                        }
                        else
                        {
                          this.Enable('CanalisisGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel({
            title: 'Gestionar Canalisis',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid],
            listeners: {
                afterrender: function() {
                    this.__data_store.load({
                        params:{
                            start:0, 
                            limit:25
                        }
                    });
                },
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
App.RegisterModule('Canalisis', new Canalisis());