function Sistema_Pago(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Sistema de Pago',
            id: 'Sistema_Pago_nombre_id_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Nomencladodres','Pago', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Sistema_Pago.Sistema_Pago.CargarDatos',

        {
            fields: [
            {name: 'id'},
            {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Sistema_Pago_grid_id',
            name:'Sistema_Pago_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Nombre',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 5
                }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Sistema_Pago_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: Ext.create('Ext.toolbar.Paging', {
                pageSize: 25,
                store: 	this.__data_store,
                displayInfo: true,
                displayMsg: 'Sistema_Pago: {0} - {1} de {2}',
                emptyMsg: "No existen Tipo de cargo miltar"
            }),
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('Sistema_PagoGestionar');
                        }
                        else
                        {
                          this.Enable('Sistema_PagoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Sistema de Pago',
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
App.RegisterModule('Sistema_Pago', new Sistema_Pago());