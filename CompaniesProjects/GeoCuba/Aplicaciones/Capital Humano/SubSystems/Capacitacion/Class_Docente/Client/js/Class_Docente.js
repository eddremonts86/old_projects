function Class_Docente(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Categoría Docente',
            id: 'Class_Docente_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Class_Docente.Class_Docente.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Class_Docente_grid_id',
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
            tbar: {
                id: 'Class_Docente_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: [{
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
                width:'55%',modal:true,
                iconCls:'help',
                autoScroll:true,
                layout: 'anchor',
                html:
                    '<ul class="nav nav-list">' +
                        '<li>El modulo <span class="label label-info">" Categoría Docente"</span>' +
                        ' le permite gestionar la clacificaci&oacute;n docente de los trabajadores.<br>' +
                        '</li>' +
                        '</ul>'

            }).show();
        }
    }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('Class_DocenteGestionar');
                        }
                        else
                        {
                          this.Enable('Class_DocenteGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Categoria Docente',
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
App.RegisterModule('Class_Docente', new Class_Docente());