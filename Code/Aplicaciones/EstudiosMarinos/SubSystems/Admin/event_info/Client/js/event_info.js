function event_info(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Información General',
            id: 'event_info_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Configuracion del Sistema','Cliente', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('event_info.event_info.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'fecha'},
            {name: 'caracter'},
            {name: 'titulo'},
            {name: 'tipo'},
            {name: 'cuerpo'},
            {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'Rows',totalProperty: 'TotalRows'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'event_info_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 5},
                {header: 'Caracter',menuDisabled: true,sortable : false,dataIndex: 'caracter',flex: 5},
                {header: 'Tipo',menuDisabled: true,sortable : false,dataIndex: 'tipo',flex: 5},
                {header: 'Fecha',menuDisabled: true,sortable : false,dataIndex: 'fecha',flex: 5},
                {header: 'Resumen',menuDisabled: true,sortable : false,dataIndex: 'titulo',flex: 5},
                {header: 'Cuerpo',menuDisabled: true,sortable : false,dataIndex: 'cuerpo',flex: 5}
                ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'event_info_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: Ext.create('Ext.toolbar.Paging', {
                pageSize: 25,
                store: 	this.__data_store,
                displayInfo: true,
                displayMsg: 'event_info: {0} - {1} de {2}',
                emptyMsg: "No existen Tipo de cargo miltar"
            }),
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('event_infoGestionar');
                        }
                        else
                        {
                          this.Enable('event_infoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Eventos, Regulaciones y Informacion General',
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
App.RegisterModule('event_info', new event_info());