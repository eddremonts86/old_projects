function Condecoracion(){

    this.__data_store = null;
    this._store_combo_condecoracion = null;

    this.Init = function()
    {
        var _menu_item_config_Condecoracion =
        {
            text: 'Condecoración',
            id: 'Condecoracion_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Codificadores','Títulos Honoríficos', _menu_item_config_Condecoracion);

    }


    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Condecoracion.Condecoracion.CargarDatos',

            {
                fields: [
                    {name: 'id'},
                    {name: 'condecoracion_tipoid'},
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
                id: 'Condecoracion_grid_id',
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
                    id: 'Condecoracion_tbar_id',
                    items: ['-'],
                    height: 28
                },
                bbar:[{
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
                            width:'50%',
                            iconCls:'help',
                            autoScroll:true,
                            layout: 'anchor',modal:true,
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El m&oacute;dulo <span class="label label-info">" Gestionar Condecoración"</span>' +
                                    ' le permite gestionar las condecoraciones existentes para los trabajadores de la empresa.<br>' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
                }],
                listeners: {
                    selectionchange: {
                        fn: function(View, selections, options) {
                            if(selections.length == 0){
                                this.Disable('CondecoracionGestionar');
                            }
                            else
                            {
                                this.Enable('CondecoracionGestionar');
                            }

                        },
                        scope: this
                    }
                }
            });
        var _panel = new Ext.Panel(
            {
                title: 'Gestionar Condecoración',
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

App.RegisterModule('Condecoracion', new Condecoracion());