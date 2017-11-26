function UdefensaT(){
    this.__data_store = null;
    this.__data_store_lolo = null;
    this.Init = function()
    {                   
        var _menu_item_config_Ubicacón =
        {
            text: 'Tipo de Ubicación de la Defensa',
            id: 'UdefensaT_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Nomencladodres','Plano Personal', _menu_item_config_Ubicacón);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('UdefensaT.UdefensaT.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'activo'},
            {name:'ubicacion_defensa_tipoid'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        this.__data_store.sort('id','ASC');
        var _grid = new Ext.grid.Panel({
            id: 'UdefensaT_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: App.GetDesktopWidth(),
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Ubicación de Procedencia',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 5
                },{
                header: 'Ubicación de Procedencia',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'ubicacion_defensa_tipoid',
                flex: 5,
                hidden:true
                 }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'UdefensaT_tbar_id',
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
                            this.Disable('UdefensaTGestionar');
                        }
                        else
                        {
                          this.Enable('UdefensaTGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        });
//======================================================================================================================

        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Tipo de Ubicación de la Defensa',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: App.GetDesktopWidth(),
            items: [_grid],
            listeners: {
                afterrender: function() {this.__data_store.load({params:{start:0, limit:25}});},
                scope : this
            }
        });
        return _panel;
    }
    // ========================================================================//
    this.Free = function()
    {
        if(this.__data_store){
            this.__data_store.removeAll(true);
            delete this.__data_store;
            this.__data_store = null;
        }

        if(this.__data_store_lolo){
            this.__data_store_lolo.removeAll(true);
            delete this.__data_store_lolo;
            this.__data_store_lolo= null;
        }

    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('UdefensaT', new UdefensaT());