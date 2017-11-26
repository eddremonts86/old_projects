function Trabajador_proyecto(){
    this.__data_store = null;
    this._store_combo = null;
    this.Init = function()
    {                   
        var _menu_item_config_Trabajador_proyecto =
        {
            text: 'Proyecto del Trabajador',
            id: 'Trabajador_proyecto_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla',_menu_item_config_Trabajador_proyecto);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Trabajador_proyecto.Trabajador_proyecto.CargarDatos',
        {
            fields: [
                    {name: 'id'},
                    {name: 'proyecto'},
                    {name: 'nombre'},
                    {name: 'fecha'},
                    {name: 'nombre_completo'}
            ],groupField : 'proyecto',
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Proyecto: {name} ' + ' ({rows.length})'
        });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Trabajador_proyecto_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            features: [groupingFeature],
            store: this.__data_store,
            columns: [{
                header: 'Trabajador',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre_completo',
                flex: 5
                },{
                header: 'Proyecto',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'proyecto',
                flex: 5
            },{
                header: 'Fecha de Inicio',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fecha',
                flex: 5
            }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Trabajador_proyecto_tbar_id',
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
                            this.Disable('Trabajador_proyectoGestionar');
                        }
                        else
                        {
                          this.Enable('Trabajador_proyectoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Proyecto del Trabajador',
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
App.RegisterModule('Trabajador_proyecto', new Trabajador_proyecto());