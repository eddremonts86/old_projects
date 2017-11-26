Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function PlanVacacion(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Plan de Vacaciones',
            id: 'PlanVacacion_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('PlanVacacion.PlanVacacion.CargarDatoscuadros',{
            fields: [
            {name: 'id'},
            {name: 'id_trabaj'},
            {name: 'nombre',header:'Nombre'},
            {name: 'dias_vacaciones',header:'Dias'},
            {name: 'anno'},
            {name: 'enero',header:'Enero'},
                {name: 'enero_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'febrero',header:'Febrero'},
                {name: 'febrero_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'marzo',header:'Marzo'},
                {name: 'marzo_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'abril',header:'Abrir'},
                {name: 'abril_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'mayo',header:'Mayo'},
                {name: 'mayo_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'junio',header:'Junio'},
                {name: 'junio_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'julio',header:'Julio'},
                {name: 'julio_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'agosto',header:'Agosto'},
                {name: 'agosto_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'sept',header:'Septiembre'},
                {name: 'sept_cumpl', type: 'bool',header:'Cumpl'},
            {name: 'oct',header:'Obtubre'},
                {name: 'otc_cumpl',type: 'bool',header:'Cumpl'},
            {name: 'nov',header:'Noviembre'},
                {name: 'nov_cumpl',type: 'bool',header:'Cumpl'},
            {name: 'dic',header:'Diciembre'},
                {name: 'dic_cumpl',type: 'bool',header:'Cumpl'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
            });
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit: 1});
        var _grid = new Ext.grid.Panel({
            id: 'PlanVacacion_tbar_id_grid',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            plugins: [this.cellEditing],
            layout: 'anchor',
            region: 'center',
            columnLines: true,
            frame: true,
            store: this.__data_store,
            columns: [
                {xtype: 'rownumberer'},
                { text: 'Trabajador',  dataIndex: 'nombre',width:250,lockable:true,locked:true },
                { text: 'Acumulado', dataIndex: 'dias_vacaciones',width:100},
                { text: 'Enero',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'enero',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'enero_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Febrero',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'febrero',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'febrero_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Marzo',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'marzo',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'marzo_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Abril',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'abril',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'abril_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Mayo',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'mayo',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'mayo_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Junio',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'junio',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'junio_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Julio',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'julio',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'julio_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Agosto',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'agosto',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'agosto_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Septiembre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'sept',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'sept_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Obtubre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'oct',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'otc_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Noviembre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'nov',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'nov_cumpl', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Diciembre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'dic',editor: {xtype: 'numberfield',allowBlank: false,minValue: 0,maxValue: 31}},
                        { text: 'Cumpl',width:70, dataIndex: 'dic_cumpl', xtype: 'checkcolumn'}
                    ]
                }

            ],
            tbar: {
                id: 'PlanVacacion_tbar_id',
                items: ['-'],
                height: 28
            },
            viewConfig: {
                forceFit: true
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('EstimulosGestionar');
                        }
                        else
                        {
                            this.Enable('EstimulosGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        function pintar(val2, met, record, a, b, c, d) {
            met.style = 'font-style:italic !important;background: #7398FE;';
            return val2;
        }
        var _panel = new Ext.Panel({
            title: 'Plan de Vacaciones',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items:_grid,
            listeners: {
                afterrender: function(){},
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
App.RegisterModule('PlanVacacion', new PlanVacacion());