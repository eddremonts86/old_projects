function Talla(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Talla =
        {
            text: 'Talla',
            id: 'Talla_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Codificadores','Vestuario', _menu_item_config_Talla);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Talla.Talla.CargarDatos',

        {
            fields: [
            {name: 'id'},
            {name: 'valor'},
            {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            groupField : 'nombre',
            autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Prendas: {name} ' + ' ({rows.length})'
        });
        var _grid = new Ext.grid.Panel(
        {
            id: 'Talla_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            features: [groupingFeature],
            columns: [
                {
                    header: 'Tipo de Talla',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'nombre',
                    flex: 5
                },
                {
                header: 'Valor',
                menuDisabled: true,
                sortable : false,
                id:'valor',
                name:'valor',
                dataIndex: 'valor',
                flex: 5
                }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Talla_tbar_id',
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
                            this.Disable('TallaGestionar');
                        }
                        else
                        {
                          this.Enable('TallaGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Talla',
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
App.RegisterModule('Talla', new Talla());