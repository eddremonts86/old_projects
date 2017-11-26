function Oficial(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config =
        {
            text: 'Oficial',
            id: 'Oficial_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla', _menu_item_config);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Oficial.Oficial.CargarDatos',

        {
            fields: [
            {name: 'fecha'},{name: 'cmilitar'},{name: 'gmilitar'},{name: 'trabador'},{name: 'id'},{name: 'nombre_completo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });

        var _grid = new Ext.grid.Panel(
        {
            id: 'Oficial_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,            
            store: this.__data_store,
            columns: [{
                header: 'Cargo Militar',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'cmilitar',
                flex: 5
            },{
                header: 'Grado Militar',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'gmilitar',
                flex: 5
            },{
                header: 'Trabajador',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre_completo',
                flex: 5
            },{
                header: 'Fecha de Incorporacion',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fecha',
                flex: 5
            },{
                header: 'id',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'idoficial',
                hidden:true,
                flex: 5
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Oficial_tbar_id',
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
                                '<li>El modulo <span class="label label-info">" Gestionar Oficial"</span>' +
                                ' le permite conocer todos los trabajadores que fueron oficiales de las FAR o MININT de la empresa,' +
                                'los cargos que ocuparon , el grado alcanzado, ademas de la fecha de incorporación a la entidad correspondiente' +
                                '<p> En los campos de texto con nombres <span class="label label-warning">Cargo,Grado,Trabajador</span> podemos filtrar los datos de la tabla central para buscar ' +
                                'coincidencias en una o mas categorias.'+
                                '</li>' +
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
                            this.Disable('OficialGestionar');
                        }
                        else
                        {
                          this.Enable('OficialGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Oficial',
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
App.RegisterModule('Oficial', new Oficial());