function Proyecto() {
    this.__data_store = null;
    this._store_combo = null;
    this.Init = function () {
        var _menu_item_config_Proyecto =
        {
            text: 'Proyecto',
            id: 'Proyecto_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Pago', _menu_item_config_Proyecto);

    }
    // ========================================================================//
    this.BuildMainPanel = function (filterObj) {


        this.__data_store = App.BuildJsonStore('Proyecto.Proyecto.CargarDatos',
            {
                fields: [
                    {name: 'id'},
                    {name: 'nombre'},
                    {name: 'monto'},
                    {name: 'codigo'},
                    {name: 'descripcion'},
                    {name: 'area'},
                    {name: 'contratoooo'},
                    {name: 'fecha_inicio'},
                    {name: 'fecha_fin'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                }, groupField: 'area',
                autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: 'Area: {name} ' + ' ({rows.length})'
        });
        var _grid = new Ext.grid.Panel(
            {
                id: 'Proyecto_grid_id',
                height: App.GetDesktopHeigth() - 35,
                width: '100%',
                region: 'center',
                frame: true,
                features: [groupingFeature],
                store: this.__data_store,
                columns: [
                    {
                        header: 'Nombre',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'nombre',
                        flex: 5
                    },
                    {
                        header: 'Descripción',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'descripcion',
                        flex: 5
                    },
                    {
                        header: 'Monto',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'monto',
                        flex: 5
                    },
                    {
                        header: 'Código',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'codigo',
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
                        header: 'Contrato',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'contratoooo',
                        flex: 5
                    },
                    {
                        header: 'Fecha inicio',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'fecha_inicio',
                        flex: 5
                    },
                    {
                        header: 'Fecha fin',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'fecha_fin',
                        flex: 5
                    }
                ],
                viewConfig: {
                    forceFit: true
                },
                tbar: {
                    id: 'Proyecto_tbar_id',
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
                        fn: function (View, selections, options) {
                            if (selections.length == 0) {
                                this.Disable('ProyectoGestionar');
                            }
                            else {
                                this.Enable('ProyectoGestionar');
                            }

                        },
                        scope: this
                    }
                }
            });
        var _panel = new Ext.Panel(
            {
                title: 'Gestionar Proyecto',
                border: true,
                frame: true,
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
                items: [_grid],
                listeners: {
                    afterrender: function () {
                        this.__data_store.load({
                            params: {
                                start: 0,
                                limit: 25
                            }
                        });
                    },
                    scope: this
                }
            });

        return _panel;
    }
    // ========================================================================//
    this.Free = function () {
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function () {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Proyecto', new Proyecto());