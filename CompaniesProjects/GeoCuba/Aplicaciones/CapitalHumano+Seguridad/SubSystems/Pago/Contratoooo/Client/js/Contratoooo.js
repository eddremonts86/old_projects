function Contratoooo(){
    this.__data_store = null;
    this._store_combo = null;
    this.Init = function()
    {                   
        var _menu_item_config_Contratoooo =
        {
            text: 'Contrato Externo',
            id: 'Contratoooo_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Pago', _menu_item_config_Contratoooo);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Contratoooo.Contratoooo.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'clienteid'},
            {name: 'nombre'}
           // {name: 'annoid'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Contratoooo_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Cliente',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'clienteid',
                flex: 5
                },{
                header: 'Nombre del Contrato',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 5
            }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Contratoooo_tbar_id',
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
                            this.Disable('ContratooooGestionar');
                        }
                        else
                        {
                          this.Enable('ContratooooGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Contratos Externos',
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
App.RegisterModule('Contratoooo', new Contratoooo());