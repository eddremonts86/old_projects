function Traondecoracion(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Condecoración del Trabajador',
            id: 'Traondecoracion_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Codificadores','Títulos Honoríficos', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Traondecoracion.Traondecoracion.CargarDatos',

        {
       fields: [{name: 'id'},{name: 'nombrecond'},{name: 'nombretrab'},{name: 'nombre_completo'}],
       sorters: {property: 'nombrecond', direction: 'ASC'},
       proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},autoLoad: false});

        var _grid = new Ext.grid.Panel(
        {
            id: 'Traondecoracion_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Condecoración',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombrecond',
                flex: 5
                },{
                header: 'Trabajador',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre_completo',
                flex: 5
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Traondecoracion_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar:[ {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },('->'),{
        xtype: 'button',
            //text : 'Ayuda',
            iconCls:'help',
            handler:function(){
            Ext.create('Ext.window.Window', {
                title: '¿Necesita Ayuda?',
                height:'25%',
                width:'50%',modal:true,
                iconCls:'help',
                autoScroll:true,
                layout: 'anchor',
                html:
                    '<ul class="nav nav-list">' +
                        '<li>El m&oacute;dulo <span class="label label-info">" Gestionar Condecoración del Trabajador"</span>' +
                        ' le permite conocer y gestionar las condecoraciones de los trabajadores de la empresa.<br>' +
                        'Dando la opci&oacute;n de filtrado por  <span class="label label-warning">Condecoración</span> y <span class="label label-warning">Trabajadores</span>'+
                        '</li>' +
                        '</ul>'

            }).show();
        }
    }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('TraondecoracionGestionar');
                        }
                        else
                        {
                          this.Enable('TraondecoracionGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Condecoración del Trabajador',
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
App.RegisterModule('Traondecoracion', new Traondecoracion());