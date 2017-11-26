function Udefensa(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Ubicación de la Defensa',
            id: 'Udefensa_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Udefensa.Udefensa.CargarDatos',

        {
            fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'trabajador'},
            {name: 'nombre_completo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Udefensa_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Trabajador',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre_completo',
                flex: 5
                },{
                header: 'Ubicación de la Defensa',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'ubicacion',
                flex: 5
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Udefensa_tbar_id',
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
                height:'30%',
                width:'50%',
                iconCls:'help',modal:true,
                autoScroll:true,
                layout: 'anchor',
                html:
                    '<ul class="nav nav-list">' +
                        '<li>El modulo <span class="label label-info">" Gestionar Ubicación de la Defensa"</span>' +
                        ' le permite conocer y gestionar la ubicacion de la defensa de los trabajadores.<br>' +
                        '<span class="label label-important">Nota:</span> <br> Recuerde que un trabajador puede tener ' +
                        'mas de una ubicacion de la defensa<br>(Tiempos de paz y tiempos de guerra)'+
                        '</li>' +
                        '</ul>'

            }).show();
        }
    }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('UdefensaGestionar');
                        }
                        else
                        {
                          this.Enable('UdefensaGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Ubicación de la Defensa',
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
                /*beforerender:function(){
                    var panel = Ext.getCmp('center_app_space');
                    panel.removeAll();
                },*/
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
App.RegisterModule('Udefensa', new Udefensa());