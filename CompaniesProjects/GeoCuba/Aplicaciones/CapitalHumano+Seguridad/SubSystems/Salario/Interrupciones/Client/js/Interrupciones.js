function Interrupciones(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Interrupcioness =
        {
            text: 'Interrupciones',
            id: 'Interrupciones_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores', _menu_item_config_Interrupcioness);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Interrupciones.Interrupciones.CargarDatos',

        {
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'clase'},
            {name: 'resibe_salario' , type :'boolean'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Interrupciones_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {
                    header: 'Clase',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'clase',
                    flex: 1
                },{
                header: 'Nombre',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 5
                },{
                header: 'Resibe salario',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'resibe_salario',
                xtype: 'checkcolumn',
                flex: 1
                },],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Interrupciones_tbar_id',
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
                            this.Disable('InterrupcionesGestionar');
                        }
                        else
                        {
                          this.Enable('InterrupcionesGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Interrupciones',
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
App.RegisterModule('Interrupciones', new Interrupciones());