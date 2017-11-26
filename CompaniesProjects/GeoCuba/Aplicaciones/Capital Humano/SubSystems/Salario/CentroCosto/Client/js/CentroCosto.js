function CentroCosto(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_CentroCostos =
        {
            text: 'Centros de Costo',
            id: 'CentroCosto_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores', _menu_item_config_CentroCostos);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('CentroCosto.CentroCosto.CargarDatos',

        {
            fields: [
            {name: 'id', header:'ID'},
            {name: 'c_costo', header:'Centro Costo'},
            {name: 'nombre_agencia',header:'Agencia'},
            {name: 'agenciaid'},
            {name: 'nombre',header:'Area'},
            {name: 'id_area'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'CentroCosto_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Centro de Costo',menuDisabled: true,sortable : false,dataIndex: 'c_costo',flex: 5}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'CentroCosto_tbar_id',
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
                            this.Disable('CentroCostoGestionar');
                        }
                        else
                        {
                            this.Enable('CentroCostoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar CentroCosto',
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
App.RegisterModule('CentroCosto', new CentroCosto());