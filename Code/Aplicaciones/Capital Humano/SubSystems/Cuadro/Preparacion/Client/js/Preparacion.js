function Preparacion(){
    this.__data_store = null;
    this.Init = function()
    {
            var _menu_item_config_Preparacion =
        {
            text: 'Preparación',
            id: 'Preparacion_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestion de Cuadros',_menu_item_config_Preparacion);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        var _sm = Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'});
        var _sm_p = Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'});

        this.__data_store = App.BuildJsonStore('Preparacion.Preparacion.tPreparacion',{
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'fecha'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        this.__data_store_cuadros = App.BuildJsonStore('Preparacion.Preparacion.CyR',{
            fields: [
                {name: 'id'},
                {name: 'activo',type:'boolean'},
                {name: 'id_cuadro'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'cuadros',totalProperty: 'results'}
            },
            autoLoad: true
        });
        this.__data_store_reservas = App.BuildJsonStore('Preparacion.Preparacion.CyR',{
            fields: [
                {name: 'id'},
                {name: 'nombre'},
                {name: 'id_reservas'},
                {name: 'activo',type:'boolean'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'resrvas',totalProperty: 'results1'}
            },
            autoLoad: true
        });

        var _grid = new Ext.grid.Panel({
            id: 'Preparacion_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            layout: 'anchor',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Fecha',menuDisabled: true,sortable : false,dataIndex: 'fecha',flex: 1},
                {header: 'Preparación',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 5},
                {
                    xtype:'actioncolumn',
                    width:100,
                    header: 'Ver Cuadros',
                    items: [{
                        iconCls:'list16',
                        tooltip: 'Edit',
                        handler: function(grid, rowIndex, colIndex) {
                            var _selectionModel =grid.getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.id;
                            this.__data_store_cuadros_prep = App.BuildJsonStore('Preparacion.Preparacion.Prep_cuadros',{
                                fields: [
                                    {name: 'id'},
                                    {name: 'nombre_completo'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                params:{id:id},
                                autoLoad: true
                            });
                            Ext.create('Ext.window.Window',{
                                title: 'Cuadros',
                                height: 500,
                                width: 600,
                                modal:true,
                                layout: 'fit',
                                items: {
                                    xtype: 'grid',
                                    border: false,
                                    columns: [{header: 'Nombre Completo',menuDisabled: true,sortable : false,dataIndex: 'nombre_completo',flex: 1}],
                                    store:this.__data_store_cuadros_prep
                                }
                            }).show();
                        }
                    }]
                },
                {
                    xtype:'actioncolumn',
                    header: 'Ver Reservas',
                    width:100,
                    items: [{
                        iconCls:'preferences_desktop_user16',
                        tooltip: 'Edit',
                        handler: function(grid, rowIndex, colIndex) {
                            var _selectionModel =grid.getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.id;
                            this.__data_store_cuadros_prep = App.BuildJsonStore('Preparacion.Preparacion.Prep_eserv',{
                                fields: [
                                    {name: 'id'},
                                    {name: 'nombre_completo'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                params:{id:id},
                                autoLoad: true
                            });
                            Ext.create('Ext.window.Window',{
                                title: 'Reservas',
                                height: 500,
                                width: 600,
                                modal:true,
                                layout: 'fit',
                                items: {
                                    xtype: 'grid',
                                    border: false,
                                    columns: [{header: 'Nombre Completo',menuDisabled: true,sortable : false,dataIndex: 'nombre_completo',flex: 1}],
                                    store:this.__data_store_cuadros_prep
                                }
                            }).show();
                        }
                    }]
                }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Preparacion_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('PreparacionGestionar');
                        }
                        else
                        {
                          this.Enable('PreparacionGestionar');
                        }

                    },
                    scope: this
                },
                itemclick:function( This, record, item, index, e, eOpts ){
                    //var id = record.data.id;
                    //this.__data_store()

                }
            }
        });
        var _grid_cuadros = new Ext.grid.Panel({
            id: 'Preparacion_grid_id_cuadro',
            width: '100%',
            layout: 'fit',
            selModel:_sm_p,
            frame: true,
            store: this.__data_store_cuadros,
            columns: [
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 1}
            ],
            bbar: [
                {xtype: 'button',iconCls:'document_save16',
                 handler:function(){

                         var _me = this,
                         _array = new Array(),
                         _selection = Ext.getCmp('Preparacion_grid_id_cuadro').getSelectionModel().getSelection();

                         var _selectionModel =Ext.getCmp('Preparacion_grid_id').getSelectionModel();
                         var _selected_rcd = _selectionModel.getLastSelected();
                         var id = _selected_rcd.data.id;


                     if (_selection.length === 0)
                     {App.InfoMessage('Informacion','¡Debe seleccionar algún Cargo!')}
                     else
                     {
                         for (var i = 0; i < _selection.length; i++)
                         {
                             _array.push(_selection[i].getData());
                         }
                         // console.log(_array);
                         var fnCallBack = function() {
                             App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                             var _result = App.PerformSyncServerRequest('Preparacion.Preparacion.asignar', {id:id,data: Ext.encode(_array)});
                             App.HideMsgBox();

                             if(_result)
                             {
                                 Ext.getCmp('panel').getForm().reset();
                                 Ext.getCmp('LCargos_grid_id').store.load();
                                 App.InfoMessage('Información', 'Tipo de Cargo adicionado satisfactoriamente');
                             }
                         }
                         App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                     }





                 }

                },
                {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_cuadros
            }
           ],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('PreparacionGestionar');
                        }
                        else
                        {
                            this.Enable('PreparacionGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var _grid_reservas = new Ext.grid.Panel({
            id: 'Preparacion_grid_id_reserva',
            selModel:_sm,
            width: '100%',
            layout: 'fit',
            frame: true,
            store: this.__data_store_reservas,
            columns:    [
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 1}
            ],
            viewConfig: {
                forceFit: true
            },
            bbar: [{
                    xtype: 'button',
                    iconCls:'document_save16',
                handler:function(){

                    var _me = this,
                        _array = new Array(),
                        _selection = Ext.getCmp('Preparacion_grid_id_reserva').getSelectionModel().getSelection();

                    var _selectionModel =Ext.getCmp('Preparacion_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var id = _selected_rcd.data.id;


                    if (_selection.length === 0)
                    {App.InfoMessage('Informacion','¡Debe seleccionar algún Cargo!')}
                    else
                    {
                        for (var i = 0; i < _selection.length; i++)
                        {
                            _array.push(_selection[i].getData());
                        }
                        // console.log(_array);
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('Preparacion.Preparacion.asignar_res', {id:id,data: Ext.encode(_array)});
                            App.HideMsgBox();

                            if(_result)
                            {
                                Ext.getCmp('panel').getForm().reset();
                                Ext.getCmp('LCargos_grid_id').store.load();
                                App.InfoMessage('Información', 'Tipo de Cargo adicionado satisfactoriamente');
                            }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                    }
                }
            },{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_reservas
            }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('PreparacionGestionar');
                        }
                        else
                        {
                            this.Enable('PreparacionGestionar');
                        }

                    },
                    scope: this
                }
            }
        });

        var cuadro =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Cuadros',
            name: 'Cuadros_Preparacion',
            id: 'Cuadros_Preparacion',
            store:this.__data_store_cuadros,
            queryMode: 'local',
            displayField: 'nombre',
            valueField: 'id'
        });
        var panel_datos =  Ext.create('Ext.tab.Panel', {
            width: 400,
            region: 'east',
            title:'Otorgar preparación ',
            collapsible:true,
            height: 400,
            bodyPadding:3,
            items: [ {
                title: 'Cuadros',
                layout: 'fit',
                items:_grid_cuadros
                },{
                title: 'Reservas',
                layout: 'fit',
                items:_grid_reservas
                }]
        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Preparación',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [
                    _grid,
                    panel_datos
                   ],
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
App.RegisterModule('Preparacion', new Preparacion());