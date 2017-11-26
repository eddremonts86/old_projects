function Contrato(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Contratos =
        {
            text: 'Contrato',
            id: 'Contrato_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla', _menu_item_config_Contratos);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Contrato.Contrato.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'}


            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            groupField : 'tipo_contrato',
            autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Tipo de Contrato: {name} ' + ' ({rows.length})'
        });
        this._grid = new Ext.grid.Panel(
        {
            id: 'Contrato_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            features: [groupingFeature],
            store: this.__data_store,
            columns: [
                {
                    header: 'Trbajador',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'nombre_completo',
                    flex: 5
                },{
                header: 'Tipo de Contrato',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'tipo_contrato',
                flex: 5
                },{
                header: 'Fecha Inicio',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fecha_inicio',
                flex: 5
            },{
                    header: 'Fecha Final',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'fecha_final',
                    flex: 5
                }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Contrato_tbar_id',
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
                            this.Disable('ContratoGestionar');
                        }
                        else
                        {
                          this.Enable('ContratoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Contrato',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [this._grid],
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
App.RegisterModule('Contrato', new Contrato());