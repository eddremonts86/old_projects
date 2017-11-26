Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function Control_certificados(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Control certificados',
            id: 'Control_certificados_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {

       this.__data_store = App.BuildJsonStore('Control_certificados.Control_certificados.CargarDatos',{
            fields: [
                {name: 'id'},
                {name: 'a_favor'},
                {name: 'titulo'},
                {name: 'tomo'},
                {name: 'folio'},
                {name: 'emision'},
                {name: 'registro'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });
        var _grid = new Ext.grid.Panel({
            id:'Control_certificados_tbar_idcap',
            name:'Control_certificados_tbar_idcap',
            height:'90%',
            width: '99%',
            region: 'center',
            frame: true,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            store: this.__data_store,
            columns: [
                {header: 'Acreditado a favor de:',menuDisabled: true,sortable : false,dataIndex: 'a_favor',flex:1,editor: {allowBlank: false}},
                {header: 'Título de la formación recibida',menuDisabled: true,sortable : false,dataIndex: 'titulo',flex:1,editor: {allowBlank: false}},
                {header: 'Tomo',menuDisabled: true,sortable : false,dataIndex: 'tomo',width:100,editor: {allowBlank: false}},
                {header: 'Folio',menuDisabled: true,sortable : false,dataIndex: 'folio',width:100,editor: {allowBlank: false}},
                {header: 'Fecha de emisión',menuDisabled: true,sortable : false,dataIndex: 'emision',width:150,editor: {allowBlank: false}},
                {header: 'Registro elaborado por:',menuDisabled: true,sortable : false,dataIndex: 'registro',flex:1,editor: {allowBlank: false}}
            ],
            viewConfig: {forceFit: true},
            bbar:{
                id:'Control_certificados_tbar_id',
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
                                        {name: 'a_favor'},
                                        {name: 'titulo'},
                                        {name: 'tomo'},
                                        {name: 'folio'},
                                        {name: 'emision'},
                                        {name: 'registro'}
                                    ]
                                });
                                var record = new FILA({a_favor:'',titulo:'',tomo:'',folio:'',emision:'',registro:''});
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
                                    var _result = App.PerformSyncServerRequest('Control_certificados.Control_certificados.Add',{data: Ext.encode(_array)});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        Ext.getCmp('Control_certificados_tbar_idcap').getStore().load()
                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('Control_certificados_tbar_idcap').getStore().load()
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
                            var _selectionModel = This.up('grid').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.id;
                            var cap_Control_certificados = _selected_rcd.data.cap_Control_certificados;
                            var record = _selected_rcd ;
                            if(id == null || id==''){
                                This.up('grid').store.remove(record);}
                            else{
                                var fnCallBack = function()   {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var _result = App.PerformSyncServerRequest('Control_certificados.Control_certificados.Eliminar', {id:id});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        This.up('grid').store.remove(record);
                                        App.InfoMessage('Información', 'Se ha eliminado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('Control_certificados_tbar_idcap').getStore().load()
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
                            this.Disable('Control_certificadosGestionar');
                        }
                        else
                        {
                            this.Enable('Control_certificadosGestionar');
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
}
App.RegisterModule('Control_certificados', new Control_certificados());