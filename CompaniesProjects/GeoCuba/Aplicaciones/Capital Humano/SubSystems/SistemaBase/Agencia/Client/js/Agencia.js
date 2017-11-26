function Agencia(){
    this.__data_store = null;
    this._store_combo = null;
    this.Init = function()
    {                   
        var _menu_item_config_Agencia =
        {
            text: 'Unidad Empresarial de Base',
            id: 'Agencia_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Codificadores','Áreas',_menu_item_config_Agencia);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Agencia.Agencia.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'codigo'},
            {name: 'empresaid'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Agencia_grid_id',
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
                header: 'Código',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'codigo',
                flex: 5
            },{
                header: 'Empresa',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'empresaid',
                flex: 5
            }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Agencia_tbar_id',
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
                            this.Disable('AgenciaGestionar');
                        }
                        else
                        {
                          this.Enable('AgenciaGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Unidad Empresarial de Base',
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
App.RegisterModule('Agencia', new Agencia());