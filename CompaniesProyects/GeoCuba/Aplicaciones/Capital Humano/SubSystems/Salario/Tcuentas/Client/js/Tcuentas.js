function Tcuentas(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Tcuentas =
        {
            text: 'Clasificador de cuentas/subcuentas',
            id: 'Tcuentas_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_Tcuentas);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Tcuentas.Tcuentas.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'cuentas'},
            {name: 'nombre'},
            {name: 'naturaleza'},
            {name: 'oblig'},
            {name: 'moneda'},
            {name: 'crit_0_id'},
            {name: 'crit_1_id'},
            {name: 'crit_2_id'},
            {name: 'submayor'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var _grid = new Ext.grid.Panel({
            id: 'Tcuentas_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Cuenta',menuDisabled: true,sortable : false,dataIndex: 'cuentas',flex: 1},
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 5},
                {header: 'Naturaleza',menuDisabled: true,sortable : false,dataIndex: 'naturaleza',flex: 1},
                {header: 'Criterio 1',menuDisabled: true,sortable : false,dataIndex: 'crit_0_id',flex: 1},
                {header: 'Criterio 2',menuDisabled: true,sortable : false,dataIndex: 'crit_1_id',flex: 1},
                {header: 'Criterio 3',menuDisabled: true,sortable : false,dataIndex: 'crit_2_id',flex: 1},
                {header: 'Obligaciones',menuDisabled: true,sortable : false,dataIndex: 'oblig',flex: 1},
                {header: 'moneda',menuDisabled: true,sortable : false,dataIndex: 'moneda',flex: 1},
                {header: 'submayor',menuDisabled: true,sortable : false,dataIndex: 'submayor',flex: 1}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Tcuentas_tbar_id',
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
                            this.Disable('TcuentasGestionar');
                        }
                        else
                        {
                          this.Enable('TcuentasGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Tcuentas',
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
App.RegisterModule('Tcuentas', new Tcuentas());