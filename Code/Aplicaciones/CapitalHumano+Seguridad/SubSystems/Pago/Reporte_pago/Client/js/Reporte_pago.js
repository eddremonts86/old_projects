function Reporte_pago(){
    this.__data_store = null;
    this._store_combo = null;
    this.Init = function()
    {                   
        var _menu_item_config_Reporte_pago =
        {
            text: 'Reporte de Pago',
            id: 'Reporte_pago_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Pago',_menu_item_config_Reporte_pago);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Reporte_pago.Reporte_pago.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'proyecto'},
            {name: 'mes'},
            {name: 'anno'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Reporte_pago_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Nombre del Reporte',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 5
                },{
                header: 'Proyecto',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'proyecto',
                flex: 5
            },{
                header: 'Mes',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'mes',
                flex: 5
            },
                {
                    header: 'Año',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'anno',
                    flex: 5
                }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Reporte_pago_tbar_id',
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
                            this.Disable('Reporte_pagoGestionar');
                        }
                        else
                        {
                          this.Enable('Reporte_pagoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Reporte de Pago',
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
App.RegisterModule('Reporte_pago', new Reporte_pago());