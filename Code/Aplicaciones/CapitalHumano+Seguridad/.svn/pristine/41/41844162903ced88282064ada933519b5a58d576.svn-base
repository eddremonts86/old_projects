Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function Descuentos(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Descuentos(Deducciones)',
            id: 'Descuentos_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
       this.__data_store = App.BuildJsonStore('Descuentos.Descuentos.CargarDatos',{
            fields: [
                {name: 'nombre'},
                {name: 'limitado', type:'boolean'},
                {name: 'cuentas'},
                {name: 'nombre_cuenta'},
                {name: 'descuentos_id'},
                {name: 'cuentas_id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'nombre', direction: 'DESC'},
            autoLoad: true
        });
       this.__data_store_decs = App.BuildJsonStore('Descuentos.Descuentos.CargarDatos_cuentas',{
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
       var _grid = new Ext.grid.Panel({
            id:'Descuentos_tbar_idcap',
            name:'Descuentos_tbar_idcap',
            height:'90%',
            width: '99%',
            region: 'center',
            frame: true,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            store: this.__data_store,
            columns: [
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex:1,editor: {allowBlank: false}},
                {header: 'Limitada',menuDisabled: true,sortable : false,dataIndex: 'limitado',width:100, xtype: 'checkcolumn'},
                {header: 'Cta/SubCta',menuDisabled: true,sortable : false,dataIndex: 'cuentas',width:100},
                { text: 'Cuenta Acreedora', dataIndex: 'nombre_cuenta', flex: 1,
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
                id:'Descuentos_tbar_id',
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
                                        {name: 'nombre'},
                                        {name: 'limitado'},
                                        {name: 'cuentas'},
                                        {name: 'nombre_cuenta'},
                                        {name: 'descuentos_id'},
                                        {name: 'cuentas_id'}
                                    ]
                                });
                                var record = new FILA({nombre:'',limitado:'',cuentas:'',nombre_cuenta:'',descuentos_id:'',cuentas_id:''});
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
                                    var _result = App.PerformSyncServerRequest('Descuentos.Descuentos.Add',{data: Ext.encode(_array)});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        Ext.getCmp('Descuentos_tbar_idcap').getStore().load()
                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('Descuentos_tbar_idcap').getStore().load()
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
                            var id = _selected_rcd.data.descuentos_id;
                            var cap_Descuentos = _selected_rcd.data.cap_Descuentos;
                            var record = _selected_rcd ;
                            if(id == null || id==''){
                                This.up('grid').store.remove(record);}
                            else{
                                var fnCallBack = function()   {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var _result = App.PerformSyncServerRequest('Descuentos.Descuentos.Eliminar', {id:id});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        This.up('grid').store.remove(record);
                                        App.InfoMessage('Información', 'Se ha eliminado satisfactoriamente');
                                    }
                                    else
                                    {
                                        Ext.getCmp('Descuentos_tbar_idcap').getStore().load()
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
                            this.Disable('DescuentosGestionar');
                        }
                        else
                        {
                            this.Enable('DescuentosGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var _panel = new Ext.Panel({
            title: 'Descuentos(Deducciones)',
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
App.RegisterModule('Descuentos', new Descuentos());