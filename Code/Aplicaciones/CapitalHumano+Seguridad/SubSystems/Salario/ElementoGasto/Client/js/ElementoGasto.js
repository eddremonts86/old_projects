Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function ElementoGasto(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Elementos de Gasto',
            id: 'ElementoGasto_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store_prod = App.BuildJsonStore('ElementoGasto.ElementoGasto.CargarDatos_prod',{
            fields: [
                {name: 'id'},
                {name: 'prod_improd', type:'boolean'},
                {name: 'nombre_gasto'},
                {name: 'cuentas'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });
        this.__data_store_improd = App.BuildJsonStore('ElementoGasto.ElementoGasto.CargarDatos_improd',{
            fields: [
                {name: 'id'},
                {name: 'prod_improd', type:'boolean'},
                {name: 'nombre_gasto'},
                {name: 'cuentas'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });

        this.__data_store_decs = App.BuildJsonStore('ElementoGasto.ElementoGasto.CargarDatos_cuentas',{
            fields: [
                {name: 'id'},
                {name: 'nombre'},
                {name: 'cuentas'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });

        var _grid_prod = new Ext.grid.Panel({
            id:'ElementoGasto_tbar_idcap___grid_prod',
            name:'ElementoGasto_tbar_idcap___grid_prod',
            title: 'Elementos de Gasto(Productivos)',
            height:'90%',
            width: '99%',
            region: 'center',
            frame: true,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            store: this.__data_store_prod,
            columns: [
                {header: 'nombre_gasto',menuDisabled: true,sortable : false,dataIndex: 'nombre_gasto',flex:1,editor: {allowBlank: false}},
                { text: 'Cuenta Acreedora', dataIndex: 'nombre', flex: 1,
                    editor: new Ext.form.field.ComboBox({
                        typeAhead: true,
                        triggerAction: 'all',
                        selectOnTab: true,
                        store:this.__data_store_decs,
                        lazyRender: true,
                        displayField: 'nombre',
                        valueField: 'nombre',
                        listClass: 'x-combo-list-small'
                    })}
            ],
            viewConfig: {forceFit: true},
            bbar:{
                id:'ElementoGasto_tbar_id___grid_prod',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store:this.__data_store_prod,
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
                                        {name: 'id'},
                                        {name: 'nombre_gasto'},
                                        {name: 'prod_improd'}
                                    ]
                                });
                                var record = new FILA({nombre_gasto:'',id:'',prod_improd:'true',nombre:''});
                                Ext.getCmp('ElementoGasto_tbar_idcap___grid_prod').getStore().add(record);
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
                            var mydd =Ext.getCmp('ElementoGasto_tbar_idcap___grid_prod').getStore().getModifiedRecords();
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
                                    var _result = App.PerformSyncServerRequest('ElementoGasto.ElementoGasto.Add',{data: Ext.encode(_array)});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap___grid_prod').getStore().load()
                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap___grid_prod').getStore().load()
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
                                Ext.getCmp('ElementoGasto_tbar_idcap___grid_prod').store.remove(record);}
                            else{
                                var fnCallBack = function()   {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var _result = App.PerformSyncServerRequest('ElementoGasto.ElementoGasto.Eliminar', {id:id});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap___grid_prod').store.remove(record);
                                        App.InfoMessage('Información', 'Se ha eliminado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap___grid_prod').getStore().load()
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
                            this.Disable('ElementoGastoGestionar');
                        }
                        else
                        {
                            this.Enable('ElementoGastoGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var _grid_impro = new Ext.grid.Panel({
            id:'ElementoGasto_tbar_idcap',
            name:'ElementoGasto_tbar_idcap',
            title: 'Elementos de Gasto(Improductivos)',
            height:'90%',
            width: '99%',
            region: 'center',
            frame: true,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            store: this.__data_store_improd,
            columns: [
                {header: 'nombre_gasto',menuDisabled: true,sortable : false,dataIndex: 'nombre_gasto',flex:1,editor: {allowBlank: false}},
                { text: 'Cuenta Acreedora', dataIndex: 'nombre', flex: 1,
                    editor: new Ext.form.field.ComboBox({
                        typeAhead: true,
                        triggerAction: 'all',
                        selectOnTab: true,
                        store:this.__data_store_decs,
                        lazyRender: true,
                        displayField: 'nombre',
                        valueField: 'nombre',
                        listClass: 'x-combo-list-small'
                    })}
            ],
            viewConfig: {forceFit: true},
            bbar:{
                id:'ElementoGasto_tbar_id',
                height: 28,
                items: [
                    {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store:this.__data_store_improd,
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
                                        {name: 'nombre'},  {name: 'id'},
                                        {name: 'nombre_gasto'},
                                        {name: 'prod_improd'}
                                    ]
                                });
                                var record = new FILA({nombre_gasto:'',id:'',prod_improd:'false',nombre:''});
                               Ext.getCmp('ElementoGasto_tbar_idcap').getStore().add(record);
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
                            var mydd = Ext.getCmp('ElementoGasto_tbar_idcap').getStore().getModifiedRecords();
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
                                    var _result = App.PerformSyncServerRequest('ElementoGasto.ElementoGasto.Add',{data: Ext.encode(_array)});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap').getStore().load()
                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap').getStore().load()
                                        App.InfoMessage('Información', 'Ocurrio un error');
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
                            var _selectionModel = Ext.getCmp('ElementoGasto_tbar_idcap').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.ElementoGasto_id;
                            var cap_ElementoGasto = _selected_rcd.data.cap_ElementoGasto;
                            var record = _selected_rcd ;
                            if(id == null || id==''){
                                Ext.getCmp('ElementoGasto_tbar_idcap').store.remove(record);}
                            else{
                                var fnCallBack = function()   {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var _result = App.PerformSyncServerRequest('ElementoGasto.ElementoGasto.Eliminar', {id:id});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap').store.remove(record);
                                        App.InfoMessage('Información', 'Se ha eliminado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('ElementoGasto_tbar_idcap').getStore().load()
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
                            this.Disable('ElementoGastoGestionar');
                        }
                        else
                        {
                            this.Enable('ElementoGastoGestionar');
                        }

                    },
                    scope: this
                }
            }
        });

        var _panel = new Ext.tab.Panel({
            title: 'Elementos de Gasto',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items:[_grid_prod,_grid_impro],
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
App.RegisterModule('ElementoGasto', new ElementoGasto());