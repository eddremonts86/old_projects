function TipoExamen(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Tipo de Examen',
            id: 'TipoExamen_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Salud', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('TipoExamen.TipoExamen.CargarDatos',

        {
            fields: [
            {name: 'id'},{name: 'nombre_examen'},{name: 'fisico'},{name: 'activo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'TipoExamen_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,            
            store: this.__data_store,
            columns: [{
                header: 'Tipo de Examen',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre_examen',
                flex: 3
            },{
                header: 'F&iacute;sico',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fisico',
                flex: 6,renderer:function(value, metaData, record, rowIdx, colIdx, store, view){
                    if(value == 't'){
                        metaData.style = 'font-style:italic !important;background: skyblue;';
                        return "Si";
                    }
                    metaData.style = 'font-style:italic !important;background: indianred;';
                    return "No";
                }
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'TipoExamen_tbar_id',
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
                                '<li>El m&oacute;dulo <span class="label label-info">" Gestionar Tipo de Examen"</span>' +
                                ' le permite conocer todos los tipos de examenes que se realizan en cualquier empresa,' +
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
                            this.Disable('TipoExamenGestionar');
                        }
                        else
                        {
                          this.Enable('TipoExamenGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Tipo Examen',
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
App.RegisterModule('TipoExamen', new TipoExamen());