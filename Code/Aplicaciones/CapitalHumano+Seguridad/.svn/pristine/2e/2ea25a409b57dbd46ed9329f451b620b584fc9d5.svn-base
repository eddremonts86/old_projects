function Cumplimientos(){
    this.__data_store = null;
    this.Init = function()
    {
            var _menu_item_config_Cumplimientos =
        {
            text: 'Cumplimientos',
            id: 'Cumplimientos_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestion de Cuadros',_menu_item_config_Cumplimientos);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Cumplimientos.Cumplimientos.CargarDatos',{
            fields: [
            {name: 'nombre_completo'},
            {name: 'indicadoresid'},
            {name: 'id'},
            {name: 'id_sp'},
            {name: 'plan'},
            {name: '_real'},
            {name: 'cumpl'},
            {name: 'orden'},
            {name: 'obs'},
            {name: 'comportamiento'},
            {name: 'indicadoresid'},
            {name: 'indicador'},
            {name: 'sistema_pago'},
            {name: 'formador'},
            {name: 'cg'},
            {name: 'ce'},
            {name: 'trabajador_id'}
            ],
            groupField : 'sistema_pago',
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Sistema de Pago: {name} ' + ' ({rows.length})'
        });
        this.__data_store_cuadros = App.BuildJsonStore('Cumplimientos.Cumplimientos.CargarDatoscuadros',{
            fields: [
                {name: 'id'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        var _grid = new Ext.grid.Panel({
            id: 'Cumplimientos_grid_id',
            name: 'Cumplimientos_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            layout: 'anchor',
            region: 'center',
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})
            ],
            features: [groupingFeature],
            frame: true,
            store: this.__data_store,
            columns: [
                {hidden: true, dataIndex: 'indicadoresid'},
                {header: 'formador',  dataIndex: 'formador',hidden: true},
                {header: 'Nombre del Indicador', dataIndex: 'indicador', flex: 10},
                {header: 'Plan', dataIndex: 'plan', flex: 4, align: 'center', editor:
                {
                    allowBlank: false,
                    maskRe: /[0-9.]$/,
                    type: 'float',
                    id: '_plan',
                    name: '_plan',
                    listeners: {focus: function(This, eOpts) {
                        This.selectText();
                    }}
                }},
                {header: 'Real', dataIndex: '_real', flex: 4, align: 'center', editor:
                {
                    allowBlank: false,
                    maskRe: /[0-9.]$/,
                    type: 'float',
                    id: '_real',
                    name: '_real',
                    listeners: {focus: function(This, eOpts) {
                        This.selectText();
                    }}
                }},
                {header: '% Cumpl', dataIndex: 'cumpl', flex: 4, align: 'center', renderer: function(value, metaData, record)
                {
                    var v = record.data.orden
                    if(v == 5 && record.data.plan == 0 && record.data._real == 0||record.data.plan == '' && record.data._real == ''){
                        record.data.cumpl = '100%';
                        return '<span style="color:green;">100%</span>';
                    }
                    else{
                        value = record.data._real / record.data.plan * 100
                        record.data.cumpl = Ext.util.Format.round(value, 1);
                        if (value < 90)
                            return '<span style="color:red;">' + Ext.util.Format.round(value, 1) + ' %</span>';
                        if (value >= 90 && value < 100)
                            return '<span style="color:black;">' + Ext.util.Format.round(value, 1) + ' %</span>';
                        if (value >= 100)
                            return '<span style="color:green;">' + Ext.util.Format.round(value, 1) + ' %</span>';

                    }

                }},
                {header: 'Obs', dataIndex: 'obs', flex: 4, align: 'center', renderer: function(value, metaData, record)
                {
                    var orden = record.data.orden

                    if(orden == 1  && record.data.formador == true){
                        if (record.get('plan')== 0 && record.get('_real') == 0)
                            return null;
                        if (record.get('plan') <= record.get('_real'))
                        {
                            record.data.obs = 'No Penalizar';
                            return '<span style="color:green;">No Penalizar</span>';
                            console.log(v);
                        }
                        else
                        {
                            record.data.obs = 'Penalizar';
                            return '<span style="color:red;">Penalizar</span>';
                            console.log(v);
                        }
                    }
                     else if(orden == 1  && record.data.formador != true){
                        if (record.get('plan') == 0 && record.get('_real') == 0)
                            return null;
                        if (record.data.id_sp != 'DE_capital_humano_12147')
                        {
                            if (record.get('plan') <= record.get('_real'))
                            {
                                record.data.obs = 'Cumplido';
                                return '<span style="color:green;">Cumplido</span>';
                            }
                            else
                            {
                                record.data.obs = 'No Cumplido';
                                return '<span style="color:red;">No Cumplido</span>';
                            }
                        }
                        if (record.data.id_sp == 'DE_capital_humano_12147')
                        {
                            if (record.get('_real') >= 0.95)
                            {
                                record.data.obs = 'Cumplido';
                                return '<span style="color:green;">Cumplido</span>';
                            }
                            else
                            {
                                record.data.obs = 'No Cumplido';
                                return '<span style="color:red;">No Cumplido</span>';
                            }
                        }
                    }
                    if (orden == 2 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('cumpl')>= 90)
                        {
                            record.data.obs = 'Cumplido';
                            return '<span style="color:green;">Cumplido</span>';
                        }
                        else
                        {
                            record.data.obs = 'No Cumplido';
                            return '<span style="color:red;">No Cumplido</span>';
                        }
                    }
                    if (orden == 3 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('cumpl')>= 100)
                        {
                            record.data.obs = 'No Penalizar';
                            return '<span style="color:green;">No Penalizar</span>';
                        }
                        else
                        {
                            record.data.obs = 'Penalizar';
                            return '<span style="color:red;">Penalizar</span>';
                        }
                    }
                    if (orden == 4 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('cumpl') >= 100)
                        {
                            record.data.obs = '50%';
                            return '<span style="color:green;">50%</span>';
                        } else if (record.get('cumpl') > 98 && record.get('cumpl') < 100) {
                            record.data.obs = '45%';
                            return '<span style="color:green;">45%</span>';
                        } else if (record.get('cumpl') > 97 && record.get('cumpl') <= 98) {
                            record.data.obs = '40%';
                            return '<span style="color:green;">40%</span>';
                        } else if (record.get('cumpl') > 96 && record.get('cumpl') <= 97) {
                            record.data.obs = '35%';
                            return '<span style="color:green;">35%</span>';
                        } else if (record.get('cumpl') > 95 && record.get('cumpl') <= 96) {
                            record.data.obs = '30%';
                            return '<span style="color:green;">30%</span>';
                        } else if (record.get('cumpl') > 94 && record.get('cumpl') <= 95) {
                            record.data.obs = '25%';
                            return '<span style="color:green;">25%</span>';
                        } else if (record.get('cumpl') > 93 && record.get('cumpl') <= 94) {
                            record.data.obs = '20%';
                            return '<span style="color:green;">20%</span>';
                        } else if (record.get('cumpl') > 92 && record.get('cumpl') <= 93) {
                            record.data.obs = '15%';
                            return '<span style="color:green;">15%</span>';
                        } else if (record.get('cumpl') > 91 && record.get('cumpl') <= 92) {
                            record.data.obs = '10%';
                            return '<span style="color:green;">10%</span>';
                        } else if (record.get('cumpl') > 90 && record.get('cumpl') <= 91) {
                            record.data.obs = '5%';
                            return '<span style="color:green;">5%</span>';
                        } else {
                            record.data.obs = '0%';
                            return '<span style="color:green;">0%</span>';
                        }
                    }
                    if (orden == 5 ){
                        if (record.data.plan == 0 && record.data._real == 0) {
                            record.data.obs = '25%';
                            return '<span style="color:green;">25%</span>';
                        }
                        else {
                            record.data.obs = '-25%';
                            return '<span style="color:green;">-25%</span>';
                        }

                    }
                    if (orden == 8 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('plan') <= 100)
                        {
                            record.data.obs = 'Se cumple';
                            return '<span style="color:green;">Se cumple</span>';
                        }
                        else
                        {
                            record.data.obs = 'No se cumple';
                            return '<span style="color:red;">No se cumple</span>';
                        }
                    }
                    if (orden == 9 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('plan') <= 100)
                        {
                            record.data.obs = 'Estimular';
                            return '<span style="color:green;">Se cumple</span>';
                        }
                        else
                        {
                            record.data.obs = 'Penalizar';
                            return '<span style="color:red;">No se cumple</span>';
                        }
                    }
                    if (orden == 10 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('plan') <= 100)
                        {
                            record.data.obs = '25%';
                            return '<span style="color:green;">25%</span>';
                        }
                        else
                        {
                            record.data.obs = '-25%';
                            return '<span style="color:red;">- 25%</span>';
                        }
                    }
                    if (orden == 11 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('plan') <= 85)
                        {
                            record.data.obs = '25%';
                            return '<span style="color:green;">25%</span>';
                        }
                        else
                        {
                            record.data.obs = '-25%';
                            return '<span style="color:red;">- 25%</span>';
                        }
                    }
                    if (orden == 12 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('plan') <= 100)
                        {
                            record.data.obs = '25%';
                            return '<span style="color:green;">25%</span>';
                        }
                        else
                        {
                            record.data.obs = '-25%';
                            return '<span style="color:red;">- 25%</span>';
                        }
                    }
                    if (orden == 13 && record.data.plan != 0 && record.data._real != 0){
                        if (record.get('plan') <= 100)
                        {
                            record.data.obs = '25%';
                            return '<span style="color:green;">25%</span>';
                        }
                        else
                        {
                            record.data.obs = '-25%';
                            return '<span style="color:red;">- 25%</span>';
                        }
                    }
                    if(orden == 14 && record.get('plan')!= 0 && record.get('_real') != 0 ){
                        if (record.get('cumpl') >= 100)
                        {
                            record.data.obs = 'No Penalizar';
                            return '<span style="color:green;">No Penalizar</span>';
                        }
                        else
                        {
                            record.data.obs = 'Penalizar';
                            return '<span style="color:red;">Penalizar</span>';
                        }
                    }


                }},
                {hidden: true, dataIndex: 'comportamiento'}
            ],
            viewConfig: {
                forceFit: true
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager(),
                id: 'Cumplimientos_tbar_id',
                items: ['-'],
                height: 28
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('CumplimientosGestionar');
                        }
                        else
                        {
                          this.Enable('CumplimientosGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var panel_datos=Ext.create('Ext.form.Panel', {
            title: 'Control de cuadros',
            bodyPadding: 5,
            width: 350,
            collapsible:true,
            id:'Cumplimientos_cuadros_form',
            name:'Cumplimientos_cuadros_form',
            region: 'west',
            defaults: {anchor: '100%'},
            items: [
                {   xtype: 'grid',
                    id:'grid',
                    name:'grid',
                    border: false,
                    columns: [
                        {header: 'Cuadro',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 1}
                    ],
                    listeners: {
                        selectionchange: {
                            fn: function(View, selections, options) {
                                var _selectionModel = Ext.getCmp('grid').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                id=_selected_rcd.data.id;
                                this.__data_store.load({
                                    params:{
                                        id:id,
                                        start:0,
                                        limit:25
                                    }
                                });
                            },
                            scope: this
                        }
                    },
                    store: this.__data_store_cuadros
                }
            ]

        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Cumplimientos',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid,panel_datos],
            listeners: {
                afterrender: function() {

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
App.RegisterModule('Cumplimientos', new Cumplimientos());