function Riesgos(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Riesgos',
            id: 'Riesgos_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Salud', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Riesgos.Riesgos.CargarDatos',

        {
            fields: [
            {name: 'id'},{name: 'nombre_riesgo'},{name: 'descripcion'},{name: 'activo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Riesgos_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,            
            store: this.__data_store,
            columns: [{
                header: 'Riesgo',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre_riesgo',
                flex: 3
            },{
                header: 'Descripci&oacute;n',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'descripcion',
                flex: 6
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Riesgos_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar:[ {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },('->'),
                {
                xtype: 'button',
                text : 'Ayuda',
                iconCls:'help',
                handler:function(){
                    Ext.create('Ext.window.Window', {
                        title: '¿Necesita Ayuda?',
                        height:'25%',
                        width:'45%',
                        iconCls:'help',modal:true,
                        autoScroll:true,
                        layout: 'anchor',
                        html:
                            '<ul class="nav nav-list">' +
                                '<li>El m&oacute;dulo <span class="label label-info">" Gestionar Riesgos"</span>' +
                                ' le permite conocer todos los riesgos de Trabajo que estan presente en cualquier cargo' +
                                '</li>' +
                            '</ul>'
                    }).show();
                }
            }
            ],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('RiesgosGestionar');
                        }
                        else
                        {
                          this.Enable('RiesgosGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Riesgos',
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
App.RegisterModule('Riesgos', new Riesgos());