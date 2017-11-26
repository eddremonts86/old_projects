function Menu_inicio(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Menu_inicio =
        {
            text: 'Menu Inicio',
            id: 'Menu_inicio_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Configuracion del Sistema','Cliente',  _menu_item_config_Menu_inicio);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Menu_inicio.Menu_inicio.CargarDatos',{
            fields: [
            {name: 'titulo'},
            {name: 'orden'},
            {name: 'cuerpo'},
            {name: 'resumen'},
            {name: 'activo',type:'boolean'},
            {name: 'id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var _grid = new Ext.grid.Panel({
            id: 'Menu_inicio_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '40%',
            region: 'center',
            frame: true,
            plugins:[Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            store: this.__data_store,
            columns: [
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'titulo',flex: 5},
                {header: 'Orden',menuDisabled: true,sortable : false,dataIndex: 'orden',flex: 1, editor: {allowBlank: false}},
                {xtype: 'checkcolumn',text: 'Activo',dataIndex: 'activo',width: 55,
                listeners:{
                    checkchange:function( This, rowIndex, checked, eOpts ){
                    var _selectionModel = Ext.getCmp('Menu_inicio_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var id=_selected_rcd.data.id;
                    var valor;
                        if (checked)
                         valor=true;
                        else
                         valor=false;
                    var  _result = App.PerformSyncServerRequest('Menu_inicio.Menu_inicio.active',{id:id,valor:valor});
                    Ext.getCmp('Menu_inicio_grid_id').store.load();
                    }
                }
            }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Menu_inicio_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store
                //displayInfo: true,
                //plugins: new Ext.ux.ProgressBarPager()
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('Menu_inicioGestionar');
                        }
                        else
                        {
                          this.Enable('Menu_inicioGestionar');
                          var _selectionModel = Ext.getCmp('Menu_inicio_grid_id').getSelectionModel();
                          var _selected_rcd = _selectionModel.getLastSelected();
                          var resumen=_selected_rcd.data.resumen;
                          var cuerpo=_selected_rcd.data.cuerpo;
                          Ext.getCmp('cuerpo').setValue(cuerpo);
                          Ext.getCmp('resumen').setValue(resumen);
                        }
                    },
                    scope: this
                }
            }
        });
        var datos = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,
            width: '60%',
            title: 'Cuerpo y Resumen',
            region: 'east',
            collapsed : true,
            collapsible : true,
            items: [{
                xtype: 'htmleditor',
                hideLabel : true,
                width: '100%',
                id:'resumen',
                name:'resumen',
                value:'<h1>Resumen</h1>'
            }, {
                xtype: 'htmleditor',
                hideLabel : true,
                id:'cuerpo',
                name:'cuerpo',
                width: '100%',
                value:'<h1>Cuerpo Entero</h1>'
            }]
        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Menu de Inicio',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid,datos],
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
App.RegisterModule('Menu_inicio', new Menu_inicio());