function LCIndeterminado(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Reportes =
        {
            text: 'Todos los Reportes',
            id: 'LCIndeterminado_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Reportes', _menu_item_config_Reportes);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('LCIndeterminado.LCIndeterminado.CargarDatos',
        {
            fields: [{name: 'id'},{name: 'nombre_completo'}],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
        });

        var _grid = new Ext.grid.Panel(
        {
            id: 'LCIndeterminado_grid_id',
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
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('LCIndeterminadoGestionar');
                        }
                        else
                        {
                          this.Enable('LCIndeterminadoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Listado de Contratos Indeterminados',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            tbar: [{
                xtype:'splitbutton',
                text: 'Completamiento de Plantilla',
                iconCls: 'add',
                menu: [{text: 'Menu Button 1'}]
            },'-',{
                xtype:'splitbutton',
                text: 'Trabajadores Contratados',
                iconCls: 'add',
                menu: [{text: 'Cut Menu Item'}]
            },{
                text: 'Copy',
                iconCls: 'add',
                menu: [{text: 'Paste Menu Item'}]
            },{
                text: 'Paste',
                iconCls: 'add',
                menu: [{text: 'Paste Menu Item'}]
            },'-',{
                text: 'Format',
                iconCls: 'add',
                menu: [{text: 'Paste Menu Item'}]
            }],
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
App.RegisterModule('LCIndeterminado', new LCIndeterminado());