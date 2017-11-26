function Accidentes(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Accidentes',
            id: 'Accidentes_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Salud', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Accidentes.Accidentes.CargarDatos',

        {
            fields: [{name: 'id'},{name: 'lugar'},{name: 'fecha_suceso',typeOf:'date',dateFormat: 'Y-m-d'},{name: 'causa'},{name: 'evento'},{name: 'consecuencias'}],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
            });

        var _grid = new Ext.grid.Panel({
            id: 'Accidentes_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,            
            store: this.__data_store,
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<table class="table table-bordered mejorar" style="width:300px !important">' ,
                    '<tr class="info">',
                        '<td width="25%">Causa:</td>',
                        '<td>{causa}</td>',
                    '</tr>',
                    '<tr>',
                        '<td>Consecuencias</td>',
                        '<td>{consecuencias}</td>',
                    '</tr>',
                    '</table>'
                )
            }],
            columns: [{
                header: 'Lugar',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'lugar',
                flex:3
            },{
                header: 'Fecha Suceso',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fecha_suceso',
                flex: 6
            },{
                header: 'Evento',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'evento',
                flex: 6
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Accidentes_tbar_id',
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
                                '<li>El m&oacute;dulo <span class="label label-info">" Gestionar Accidentes"</span>' +
                                ' le permite conocer todos los Accidentes de Trabajo que estan presente en cualquier cargo' +
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
                            this.Disable('AccidentesGestionar');
                        }
                        else
                        {
                          this.Enable('AccidentesGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        });

        var _panel = new Ext.Panel({
            title: 'Gestionar Accidentes',
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
App.RegisterModule('Accidentes', new Accidentes());