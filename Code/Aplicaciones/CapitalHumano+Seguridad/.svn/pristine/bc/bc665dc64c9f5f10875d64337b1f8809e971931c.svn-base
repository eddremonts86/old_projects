function ConfSalario(){
    this.__data_store = null;
    this._store_combo_ConfSalario = null;
    this.Init = function()
    {
        var _menu_item_config_conf =
        {
            text: 'Condecoración',
            id: '_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Configuración', _menu_item_config_conf);

    }
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('ConfSalario.ConfSalario.CargarDatos',{
                fields: [
                    {name: 'id'},
                    {name: 'id_area'},
                    {name: 'agencia'},
                    {name: 'area'},
                    {name: 'ft_fza'},
                    {name: 'ft_ext'},
                    {name: 'fdo_sl'},
                    {name: 'prom_tab'},
                    {name: 'fdo_estim'},
                    {name: 'fdo_admon'},
                    {name: 'prod_plan'},
                    {name: 'prod_real'}

                ],
                groupField : 'agencia',
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{startCollapsed:true, groupHeaderTpl: 'Unidad: {name}' + ' ({rows.length})'});
        var _grid = new Ext.grid.Panel({
                id: 'ConfSalario_grid_id',
                height: App.GetDesktopHeigth() - 35,
                width: '100%',
                region: 'center',
                frame: true,
                rowLines:true,
                columnLines: true,
                store: this.__data_store,
                features: [groupingFeature],
                plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                columns: [
                        {header: 'Nombre de Area',menuDisabled: true,sortable : false,dataIndex: 'area',flex: 5},
                        {header: 'FT Fza Event',menuDisabled: true,sortable : false,dataIndex: 'ft_fza',flex: 2,editor: {allowBlank: false}},
                        {header: 'FT Extra',menuDisabled: true,sortable : false,dataIndex: 'ft_ext',flex: 2,editor: {allowBlank: false}},
                        {header: 'Fdo Salario',menuDisabled: true,sortable : false,dataIndex: 'fdo_sl',flex: 2,editor: {allowBlank: false}},
                        {header: 'Prom Trab',menuDisabled: true,sortable : false,dataIndex: 'prom_tab',flex: 2,editor: {allowBlank: false}},
                        {header: 'Fdo Extim',menuDisabled: true,sortable : false,dataIndex: 'fdo_estim',flex: 2,editor: {allowBlank: false}},
                        {header: 'Fdo Admon',menuDisabled: true,sortable : false,dataIndex: 'fdo_admon',flex: 2,editor: {allowBlank: false}},
                        {header: 'Ptvdad Plan',menuDisabled: true,sortable : false,dataIndex: 'prod_plan',flex: 2,editor: {allowBlank: false}},
                        {header: 'Ptvdad Real',menuDisabled: true,sortable : false,dataIndex: 'prod_real',flex: 2,editor: {allowBlank: false}}
                ],
                viewConfig: {
                    forceFit: true
                },
                tbar: {
                    id: 'ConfSalario_tbar_id',
                    items: ['-'],
                    height: 28
                },
                bbar:[{
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store:this.__data_store,
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
                                    ' le permite gestionar las ConfSalarioes existentes para los trabajadores de la empresa.<br>' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
                }],
                listeners: {
                    selectionchange: {
                        fn: function(View, selections, options) {
                            if(selections.length == 0){
                                this.Disable('ConfSalarioGestionar');
                            }
                            else
                            {
                                this.Enable('ConfSalarioGestionar');
                            }

                        },
                        scope: this
                    }
                }
            });
        var _panel = new Ext.Panel({
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
App.RegisterModule('ConfSalario', new ConfSalario());
