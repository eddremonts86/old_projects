function Area(){
    this.__data_store = null;
    this._store_combo = null;
    this.Init = function()
    {                   
        var _menu_item_config_Area =
        {
            text: 'Área',
            id: 'Area_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };

        App.InsertSubItemMenu('Codificadores','Áreas',_menu_item_config_Area);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Area.Area.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            //{name: 'codigo'},
            {name: 'nombre_agencia'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Area_grid_id',
            name:'Area_grid_id',
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
                },{
                header: 'Unidad Empresarial de Base',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre_agencia',
                flex: 5
            }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Area_tbar_id',
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
                            this.Disable('AreaGestionar');
                        }
                        else
                        {
                          this.Enable('AreaGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Área',
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
App.RegisterModule('Area', new Area());