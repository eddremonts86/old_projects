function Anno_Mes(){
    this.__data_store = null;
    this._store_combo_anno = null;
    this._store_combo_mes = null;
    this.Init = function()
    {                   
        var _menu_item_config_Anno_Mes =
        {
            text: 'Año_Mes',
            id: 'Anno_Mes_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Nomencladodres','Plano Tiempo', _menu_item_config_Anno_Mes);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Anno_Mes.Anno_Mes.CargarDatos',
        {
            fields: [
                {name:'id'},
            {name: 'valor'},
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
            id: 'Anno_Mes_grid_id',
            name: 'Anno_Mes_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Año',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'valor',
                flex: 5
                },{
                header: 'Mes',
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
                id: 'Anno_Mes_tbar_id',
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
                            this.Disable('Anno_MesGestionar');
                        }
                        else
                        {
                          this.Enable('Anno_MesGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Año_Mes',
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
App.RegisterModule('Anno_Mes', new Anno_Mes());