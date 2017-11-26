Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function PlanVacacion(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'PlanVacacion',
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
            {name: 'nombre'},
            {name: 'dias_vacaciones'},
            {name: 'anno'},
            {name: 'salir1'},
            {name: 'salir2'},
            {name: 'salir3'},
            {name: 'salir4'},
            {name: 'salir5'},
            {name: 'salir6'},
            {name: 'salir7'},
            {name: 'salir8'},
            {name: 'salir9'},
            {name: 'salir10'},
            {name: 'salir11'},
            {name: 'salir12'},
            {name: 'cmplid1', type: 'bool'},
            {name: 'cmplid2', type: 'bool'},
            {name: 'cmplid3', type: 'bool'},
            {name: 'cmplid4', type: 'bool'},
            {name: 'cmplid5', type: 'bool'},
            {name: 'cmplid6', type: 'bool'},
            {name: 'cmplid7', type: 'bool'},
            {name: 'cmplid8', type: 'bool'},
            {name: 'cmplid9', type: 'bool'},
            {name: 'cmplid10',type: 'bool'},
            {name: 'cmplid11',type: 'bool'},
            {name: 'cmplid12',type: 'bool'}



            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
            });
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit: 1});
        var _grid = new Ext.grid.Panel({
            id: 'Estimulos_grid_id',
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
                { text: 'Name',  dataIndex: 'nombre',width:250,lockable:true,locked:true },
                { text: 'Acumulado', dataIndex: 'dias_vacaciones',width:100},

                { text: 'Enero',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir1',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid1', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Febrero',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir2',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid2', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Marzo',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir3',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid3', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Abril',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir4',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid4', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Mayo',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir5',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid5', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Junio',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir6',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid6', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Julio',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir7',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid7', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Agosto',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir8',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid8', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Septiembre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir9',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid9', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Obtubre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir10',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid10', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Noviembre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir11',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid11', xtype: 'checkcolumn'}
                    ]
                },
                { text: 'Diciembre',flex: 3,
                    columns:[
                        { text: 'Fecha',width:170,dataIndex: 'salir12',editor: {allowBlank: false}},
                        { text: 'Cumpl',width:70, dataIndex: 'cmplid12', xtype: 'checkcolumn'}
                    ]
                }

            ],
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