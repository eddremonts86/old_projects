Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function Deduciones(){
    this.__data_store_datos = null;
    this.Init = function()
    {
        var deduciones =
        {
            text: 'Deducciones',
            id: 'deduciones',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Operaciones',deduciones);
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store_datos = App.BuildJsonStore('Deduciones.Deduciones.Tomar_datos_generales',{
            fields: [
                {name: 'empresa'},
                {name: 'debit',type:'int'},
                {name: 'agencia'},
                {name: 'area'},
                {name: 'id_trabajador'},
                {name: 'id_contrato'},
                {name: 'trabajador_nombre_completo'},
                {name: 'nombre_cargo'},
                {name: 'tipo_contrato'},
                {name: 'contrato_ff'},
                {name: 'contrato_fi'},
                {name: 'sist_pago'},
                {name: 'forma_pago'},
                {name: 'horario_trabajo'}

            ],
            groupField : 'area',
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
            autoLoad: false
        });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{startCollapsed:true, groupHeaderTpl: 'Área: {name}' + ' ({rows.length})'});
        var _grid = new Ext.grid.Panel({
                id: 'Deduciones_grid_id',
                height: App.GetDesktopHeigth() - 35,
                width: '100%',
                region: 'center',
                frame: true,
                selType: 'rowmodel',
                enableColumnResize: true,
                sortableColumns : false,
                columnLines:true,
                features: [groupingFeature],
                store: this.__data_store_datos,
                columns: [
                    {
                        header: 'Trabajador',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'trabajador_nombre_completo',
                        flex: 5
                    },
                    {
                        header: 'Manto a <br> Reducir',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'debit',
                        width:80
                    },
                    {
                        header: 'Cargo',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'nombre_cargo',
                        flex: 5
                    },
                    {
                        header: 'Agencia',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'agencia',
                        flex: 5
                    },
                    {
                        header: 'Área',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'area',
                        flex: 5
                    },
                    {
                        header: 'Dedución',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'area',
                        flex: 2
                    },
                    {
                        xtype:'actioncolumn',
                        width:55,
                        header: 'Editar',
                        items: [{
                            iconCls:'run_build_file16',
                            tooltip: 'Editar deduciones',
                            handler: function(grid, rowIndex, colIndex) {
                                var info = grid.store.data.items[rowIndex].data;
                                this.__data_store_datos1 = App.BuildJsonStore('Deduciones.Deduciones.CargarDatosDeducciones',{
                                    fields: [
                                        {name: 'nombre'},
                                        {name: 'limitado', type:'boolean'},
                                        {name: 'cuentas'},
                                        {name: 'cuenta'},
                                        {name: 'descuentos_id'},
                                        {name: 'primera',type:'int'},
                                        {name: 'descuento',type:'int'},
                                        {name: 'segunda',type:'int'},
                                        {name: 'codigo'}
                                    ],
                                    params:{id_trabaj:info.id_trabajador,id_cont:info.id_contrato},
                                    proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                                    autoLoad: false
                                });
                                this.__data_store_datos2 = App.BuildJsonStore('Deduciones.Deduciones.CargarDeducciones',{
                                    fields: [
                                        {name: 'id'},
                                        {name: 'cuentas'},
                                        {name: 'nombre'},
                                        {name: 'descuentos_id'},
                                        {name: 'primera',type:'int'},
                                        {name: 'descuento',type:'int'},
                                        {name: 'segunda',type:'int'}

                                    ],
                                    proxy: {type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                                    autoLoad: false
                                });
                                this.__data_store_datos1.load({params:{start:0,limit:25}});
                                this.__data_store_datos2.load({params:{start:0,limit:25}});
                                this.cellEditing1 = new Ext.grid.plugin.CellEditing({clicksToEdit: 1});
                                this.cellEditing2 = new Ext.grid.plugin.CellEditing({clicksToEdit: 1});
                                var general= Ext.create('Ext.grid.Panel', {
                                    title:'Todas las Cuentas',
                                    id:'general',
                                    columnWidth: 0.5,
                                    name:'general',
                                    store: this.__data_store_datos2,
                                    columns: [
                                        {header: 'Cta/SubCta',menuDisabled: true,sortable : false,dataIndex: 'cuentas',width:100},
                                        {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex:5},
                                        {header: '1ra Quincena',menuDisabled: true,sortable : false,dataIndex: 'primera',flex:1,editor: {allowBlank: false}},
                                        {header: '2da Quincena',menuDisabled: true,sortable : false,dataIndex: 'segunda',flex:1,editor: {allowBlank: false}},
                                        {header: 'Por Descontar',menuDisabled: true,sortable : false,dataIndex:'descuento',flex:2,editor: {allowBlank: false}}
                                    ],
                                    plugins: [this.cellEditing1],
                                    border:true,
                                    tbar:[
                                        {
                                            text : 'Guadar',
                                            handler:function(){
                                                var _array = new Array();
                                                var mydd = Ext.getCmp('general').getStore().getModifiedRecords();
                                                if (mydd.length === 0)
                                                {
                                                    App.InfoMessage('Información', 'No ha modificado fila alguna');
                                                }
                                                else
                                                {
                                                    for (var i = 0; i < mydd.length; i++) {
                                                        var elemento = mydd[i].getData();
                                                        _array.push(elemento);
                                                    }
                                                    var fnCallBack = function() {
                                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                                var _result = App.PerformSyncServerRequest('Deduciones.Deduciones.add_decd',
                                                                                {data: Ext.encode(_array),id_trabaj:info.id_trabajador,id_cont:info.id_contrato});
                                                                App.HideMsgBox();
                                                                if (_result)
                                                                {
                                                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                                    Ext.getCmp('general').store.load();
                                                                    Ext.getCmp('personal').store.load();
                                                                    Ext.getCmp('Deduciones_grid_id').store.load();
                                                                }
                                                                else
                                                                {
                                                                    App.InfoMessage('Información', 'Ocurrio un error');
                                                                    Ext.getCmp('general').store.load();
                                                                    Ext.getCmp('personal').store.load();
                                                                    Ext.getCmp('Deduciones_grid_id').store.load();
                                                                }
                                                            }
                                                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                                }
                                            }
                                        }
                                    ]
                                });
                                var personal= Ext.create('Ext.grid.Panel', {
                                    border:true,
                                    title:'Todas las Cuentas de:'+info.trabajador_nombre_completo,
                                    id:'personal',
                                    columnWidth: 0.5,
                                    name:'personal',
                                    store: this.__data_store_datos1,
                                    columns: [
                                        {header: 'Cta/SubCta',menuDisabled: true,sortable : false,dataIndex: 'cuentas',width:100},
                                        {header: 'Nombre',menuDisabled: true,sortable : true,dataIndex: 'nombre',flex:5},
                                        {header: '1ra Quincena',menuDisabled: true,sortable : false,dataIndex: 'primera',flex:1,editor: {allowBlank: false}},
                                        {header: '2da Quincena',menuDisabled: true,sortable : false,dataIndex: 'segunda',flex:1,editor: {allowBlank: false}},
                                        {header: 'Por Descontar',menuDisabled: true,sortable : false,dataIndex:'descuento',flex:2,editor: {allowBlank: false}}
                                    ],
                                    plugins: [this.cellEditing2],
                                    tbar:[
                                        {
                                            text : 'Actualizar',
                                            handler:function(){
                                                var _array = new Array();
                                                var mydd = Ext.getCmp('personal').getStore().getModifiedRecords();
                                                if (mydd.length === 0)
                                                {
                                                    App.InfoMessage('Información', 'No ha modificado fila alguna');
                                                }
                                                else
                                                {
                                                    for (var i = 0; i < mydd.length; i++) {
                                                        var elemento = mydd[i].getData();
                                                        _array.push(elemento);
                                                    }
                                                    var fnCallBack = function() {
                                                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                        var _result = App.PerformSyncServerRequest('Deduciones.Deduciones.upd_decd',{data: Ext.encode(_array)});
                                                        App.HideMsgBox();
                                                        if (_result)
                                                        {
                                                            App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                            Ext.getCmp('general').store.load();
                                                            Ext.getCmp('personal').store.load();
                                                            Ext.getCmp('Deduciones_grid_id').store.load();
                                                        }
                                                        else
                                                        {
                                                            App.InfoMessage('Información', 'Ocurrio un error');
                                                            Ext.getCmp('general').store.load();
                                                            Ext.getCmp('personal').store.load();
                                                            Ext.getCmp('Deduciones_grid_id').store.load();
                                                        }
                                                    }
                                                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                                }
                                                }
                                        },{
                                    text : 'Eliminar',
                                    handler:function(){
                                        var _selectionModel = Ext.getCmp('personal').getSelectionModel();
                                        var _selected_rcd = _selectionModel.getLastSelected();
                                        var id=_selected_rcd.data.id;
                                        var fnCallBack = function() {
                                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                            var _result = App.PerformSyncServerRequest('Deduciones.Deduciones.del_decd',{id:id});
                                            App.HideMsgBox();
                                            if (_result)
                                            {
                                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                Ext.getCmp('general').store.load();
                                                Ext.getCmp('personal').store.load();
                                                Ext.getCmp('Deduciones_grid_id').store.load();
                                            }
                                            else
                                            {
                                                App.InfoMessage('Información', 'Ocurrio un error');
                                                Ext.getCmp('general').store.load();
                                                Ext.getCmp('personal').store.load();
                                                Ext.getCmp('Deduciones_grid_id').store.load();
                                            }
                                        }
                                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');

                                        }
                                      }
                                    ]
                                });
                                Ext.create('Ext.window.Window', {
                                    title: 'Definir Deducciones para : '+info.trabajador_nombre_completo,
                                    height: '80%',
                                    modal:true,
                                    width: '80%',
                                    layout: 'fit',
                                    items:[
                                           {xtype:'panel',
                                            layout:'column',
                                            height:'100%',
                                            items:[general,personal]
                                            }
                                    ]
                                }).show();
                            }
                        }]
                    }

                ],
                viewConfig: {
                    forceFit: true
                },
                tbar: {
                    id: 'Deduciones_tbar_id',
                    items: ['-'],
                    height: 28
                },
                bbar: {
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store:  this.__data_store_datos,
                    displayInfo: true,
                    plugins: new Ext.ux.ProgressBarPager()
                },
                listeners: {
                    selectionchange: {
                        fn: function (View, selections, options) {
                            if (selections.length == 0) {
                                this.Disable('Puestos_trabajo_por_areaGestionar');
                            }
                            else {
                                this.Enable('Puestos_trabajo_por_areaGestionar');
                            }
                        },
                        scope: this
                    }
                }
            });
        var _panel = new Ext.Panel({
                title: 'Gestionar Deducciones por trabajador',
                border: true,
                frame: true,
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
                items: [_grid],
                listeners: {
                    afterrender: function() {
                        this.__data_store_datos.load({
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
        this.__data_store_datos.removeAll(true);
        delete this.__data_store_datos;
        this.__data_store_datos = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Deduciones', new Deduciones());