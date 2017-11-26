Ext.require([
             'Ext.layout.container.HBox',
             'Ext.selection.CellModel',
             'Ext.grid.*',
             'Ext.data.*',
             'Ext.util.*',
             'Ext.form.*'
            ]);
function PagoProyecto(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Prenomina por Proyectos',
            id: 'PagoProyecto_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Operaciones', 'Nominas de Salario',_menu_item_config_cliente);
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarDatos',{
            fields: [
                {name: 'id'},
                {name: 'fecha'},
                {name: 'nombre'},
                {name: 'cuenta_id'},
                {name: 'cuenta_nombre'},
                {name: 'natur'},
                {name: 'estim'},
                {name: 'fondo_salario'},
                {name: 'jornada'},
                {name: 'areas'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json', root: 'rows', totalProperty: 'results'}
            }, groupField: 'areas',
            autoLoad: false
        });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: 'Areas: {name} ' + ' ({rows.length})'
        });
        var _grid = new Ext.grid.Panel({
            id: 'Proyecto_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            features: [groupingFeature],
            store: this.__data_store,
            columns: [
                {
                    header: 'Nombre del proyecto',
                    menuDisabled: true,
                    sortable: false,
                    dataIndex: 'nombre',
                    flex: 5
                },
                {
                    header: 'Cta/SubCta',
                    menuDisabled: true,
                    sortable: false,
                    dataIndex: 'cuenta_id',
                    flex: 3
                } ,
                {
                    header: 'Nombre de cuenta',
                    menuDisabled: true,
                    sortable: false,
                    dataIndex: 'cuenta_nombre',
                    flex: 3
                },
                {
                    header: 'Fecha de Inicio',
                    menuDisabled: true,
                    sortable: false,
                    dataIndex: 'fecha',
                    flex: 1
                }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'PagoProyecto_tbar_id',
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
                            this.Disable('PagoProyectoGestionar');
                        }
                        else {
                            this.Enable('PagoProyectoGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var _panel = new Ext.Panel({
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
App.RegisterModule('PagoProyecto', new PagoProyecto());