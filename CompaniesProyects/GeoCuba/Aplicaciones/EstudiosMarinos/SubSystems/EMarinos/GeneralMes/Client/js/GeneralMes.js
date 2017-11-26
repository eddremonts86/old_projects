function GeneralMes(){
    this.__data_store = null;
    this.Init = function()
    {
        Ext.require('Ext.chart.*');
        Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);
        var _menu_item_config_general =
        {
            text: 'Pleamar y Bajamar',
            id: 'GeneralMes_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestión del Sistema', _menu_item_config_general);
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit: 5});
        Ext.create('Ext.data.Store', {
            storeId:'_simpsonsStore1',
            fields:[
                {name:'dia',header:'Dia'},
                {name: 'HMaxP',header:'Hora de PlenaMar-Maximo',type: 'float'},
                {name: 'MaxP',header:'PlenaMar-Maximo',type: 'float'},

                {name: 'HMinB',header:'Hora de PlenaMar-Minimo',type: 'float'},
                {name: 'MinB',header:'PlenaMar-Minimo',type: 'float'},

                {name: 'HMaxB',header:'Hora de BajaMar-Maximo',type: 'float'},
                {name: 'MaxB',header:'BajaMar-Maximo',type: 'float'},

                {name: 'HMinP',header:'Hora de BajaMar-Minimo',type: 'float'},
                {name: 'MinP',header:'BajaMar-Minimo',type: 'float'},

                {name: 'hora0_A',type: 'int'},{name: 'hora0_V',type: 'int'},{name: 'hora0_D',type: 'int'},
                {name: 'hora1_A',type: 'int'},{name: 'hora1_V',type: 'int'},{name: 'hora1_D',type: 'int'},
                {name: 'hora2_A',type: 'int'},{name: 'hora2_V',type: 'int'},{name: 'hora2_D',type: 'int'},
                {name: 'hora3_A',type: 'int'},{name: 'hora3_V',type: 'int'},{name: 'hora3_D',type: 'int'},
                {name: 'hora4_A',type: 'int'},{name: 'hora4_V',type: 'int'},{name: 'hora4_D',type: 'int'},
                {name: 'hora5_A',type: 'int'},{name: 'hora5_V',type: 'int'},{name: 'hora5_D',type: 'int'},
                {name: 'hora6_A',type: 'int'},{name: 'hora6_V',type: 'int'},{name: 'hora6_D',type: 'int'},
                {name: 'hora7_A',type: 'int'},{name: 'hora7_V',type: 'int'},{name: 'hora7_D',type: 'int'},
                {name: 'hora8_A',type: 'int'},{name: 'hora8_V',type: 'int'},{name: 'hora8_D',type: 'int'},
                {name: 'hora9_A',type: 'int'},{name: 'hora9_V',type: 'int'},{name: 'hora9_D',type: 'int'},
                {name: 'hora10_A',type: 'int'},{name: 'hora10_V',type: 'int'},{name: 'hora10_D',type: 'int'},
                {name: 'hora11_A',type: 'int'},{name: 'hora11_V',type: 'int'},{name: 'hora11_D',type: 'int'},
                {name: 'hora12_A',type: 'int'},{name: 'hora12_V',type: 'int'},{name: 'hora12_D',type: 'int'},
                {name: 'hora13_A',type: 'int'},{name: 'hora13_V',type: 'int'},{name: 'hora13_D',type: 'int'},
                {name: 'hora14_A',type: 'int'},{name: 'hora14_V',type: 'int'},{name: 'hora14_D',type: 'int'},
                {name: 'hora15_A',type: 'int'},{name: 'hora15_V',type: 'int'},{name: 'hora15_D',type: 'int'},
                {name: 'hora16_A',type: 'int'},{name: 'hora16_V',type: 'int'},{name: 'hora16_D',type: 'int'},
                {name: 'hora17_A',type: 'int'},{name: 'hora17_V',type: 'int'},{name: 'hora17_D',type: 'int'},
                {name: 'hora18_A',type: 'int'},{name: 'hora18_V',type: 'int'},{name: 'hora18_D',type: 'int'},
                {name: 'hora19_A',type: 'int'},{name: 'hora19_V',type: 'int'},{name: 'hora19_D',type: 'int'},
                {name: 'hora20_A',type: 'int'},{name: 'hora20_V',type: 'int'},{name: 'hora20_D',type: 'int'},
                {name: 'hora21_A',type: 'int'},{name: 'hora21_V',type: 'int'},{name: 'hora21_D',type: 'int'},
                {name: 'hora22_A',type: 'int'},{name: 'hora22_V',type: 'int'},{name: 'hora22_D',type: 'int'},
                {name: 'hora23_A',type: 'int'},{name: 'hora23_V',type: 'int'},{name: 'hora23_D',type: 'int'}
            ],
            data:{'items':[
                { 'dia': '1'},
                { 'dia': '2'},
                { 'dia': '3'},
                { 'dia': '4'},
                { 'dia': '5'},
                { 'dia': '6'},
                { 'dia': '7'},
                { 'dia': '8'},
                { 'dia': '9'},
                { 'dia': '10'},
                { 'dia': '11'},
                { 'dia': '12'},
                { 'dia': '13'},
                { 'dia': '14'},
                { 'dia': '15'},
                { 'dia': '16'},
                { 'dia': '17'},
                { 'dia': '18'},
                { 'dia': '19'},
                { 'dia': '20'},
                { 'dia': '21'},
                { 'dia': '22'},
                { 'dia': '23'},
                { 'dia': '24'},
                { 'dia': '25'},
                { 'dia': '26'},
                { 'dia': '27'},
                { 'dia': '28'},
                { 'dia': '29'},
                { 'dia': '30'},
                { 'dia': '31'}

            ]},
            pageSize: 31,
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        Ext.define('User', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'hora', type: 'string'},
                {name: 'altura',type: 'int'},
                {name: 'velocidad',type: 'int'},
                {name: 'dir',type: 'int'}
            ],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        Ext.define('WeatherPoint', {
            extend: 'Ext.data.Model',
            id:'prueba1',
            fields: [
                {name:'Hora',type: 'float'},
                {name:'Altura',type: 'float'},
                {name:'Velocidad',type: 'float'},
                {name:'Dirección',type: 'float'}]
        });
        this.store1 = Ext.create('Ext.data.Store', {
            model: 'WeatherPoint',
            data :[
                { 'Hora':0,  "Altura":-23,  "Velocidad":78, "Dirección":65},
                { 'Hora':1,  "Altura":21,  "Velocidad":45, "Dirección":76},
                { 'Hora':2,  "Altura":12,  "Velocidad":56, "Dirección":78},
                { 'Hora':3,  "Altura":84,  "Velocidad":54, "Dirección":65},
                { 'Hora':4,  "Altura":74,  "Velocidad":78, "Dirección":41},
                { 'Hora':5,  "Altura":21,  "Velocidad":95, "Dirección":74},
                { 'Hora':6,  "Altura":-95,  "Velocidad":41, "Dirección":32},
                { 'Hora':7,  "Altura":35,  "Velocidad":85, "Dirección":54},
                { 'Hora':8,  "Altura":74,  "Velocidad":65, "Dirección":95},
                { 'Hora':9,  "Altura":48,  "Velocidad":4, "Dirección":12},
                { 'Hora':10,  "Altura":85,  "Velocidad":35, "Dirección":24},
                { 'Hora':11,  "Altura":32,  "Velocidad":65, "Dirección":25},
                { 'Hora':12,  "Altura":-14,  "Velocidad":26, "Dirección":87},
                { 'Hora':13,  "Altura":23,  "Velocidad":78, "Dirección":65},
                { 'Hora':14,  "Altura":21,  "Velocidad":45, "Dirección":76},
                { 'Hora':15,  "Altura":12,  "Velocidad":56, "Dirección":78},
                { 'Hora':16,  "Altura":84,  "Velocidad":54, "Dirección":65},
                { 'Hora':17,  "Altura":-74,  "Velocidad":78, "Dirección":41},
                { 'Hora':18,  "Altura":21,  "Velocidad":95, "Dirección":74},
                { 'Hora':19,  "Altura":95,  "Velocidad":41, "Dirección":32},
                { 'Hora':20,  "Altura":35,  "Velocidad":85, "Dirección":54},
                { 'Hora':21,  "Altura":-74,  "Velocidad":65, "Dirección":95},
                { 'Hora':22,  "Altura":48,  "Velocidad":4, "Dirección":12},
                { 'Hora':23,  "Altura":85,  "Velocidad":35, "Dirección":24}
            ]
        });
        var _grid = new Ext.grid.Panel({
            id: 'general_grid_id',
            name: 'general_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            buffered : 'true',          
            frame: false,
            columnLines: true,
            plugins: [this.cellEditing],
            store: Ext.data.StoreManager.lookup('_simpsonsStore1'),
            columns: [
                {header: 'Dia',menuDisabled: true,sortable : false,dataIndex: 'dia',width: 90, locked: true},
                {
                    text: 'PLEAMAR',
                    columns: [
                        {
                            text: 'Mas Alta',
                            columns: [  {
                                text     : 'Tiempo(horas)',
                                sortable : true,
                                dataIndex: 'HMaxP',
                                width: 105,
                                editor: {allowBlank: false}
                            },
                                {
                                    text     : 'Altura(cm)',
                                    sortable : true,
                                    dataIndex: 'MaxP',
                                    width: 85,
                                    editor: {allowBlank: false},
                                    summaryType: 'max',
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        return 'Max: '+value;
                                    }
                                }
                            ]
                        },
                        {
                            text: 'Mas Baja',
                            columns: [  {
                                text     : 'Tiempo(horas)',
                                sortable : true,
                                dataIndex: 'HMinP',
                                width: 105,
                                editor: {allowBlank: false}
                            },
                                {
                                    text     : 'Altura(cm)',
                                    sortable : true,
                                    dataIndex: 'MinP',
                                    width: 85,
                                    editor: {allowBlank: false},
                                    summaryType: 'min',
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        return 'Min: '+value;
                                    }
                                }
                            ]
                        }

                    ]
                },
                {
                    text: 'BAJAMAR',
                    columns: [
                        {
                            text: 'Mas Alta',
                            columns: [  {
                                text     : 'Tiempo(horas)',
                                sortable : true,
                                dataIndex: 'HMaxB',
                                width: 105,
                                editor: {allowBlank: false}
                            },
                                {
                                    text     : 'Altura(cm)',
                                    sortable : true,
                                    dataIndex: 'MaxB',
                                    width: 85,
                                    editor: {allowBlank: false},
                                    summaryType: 'max',
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        return 'Max: '+value;
                                    }
                                }
                            ]
                        },
                        {
                            text: 'Mas Baja',
                            columns: [  {
                                text     : 'Tiempo(horas)',
                                sortable : true,
                                dataIndex: 'HMinB',
                                width: 105,
                                editor: {allowBlank: false}
                            },
                                {
                                    text     : 'Altura(cm)',
                                    sortable : true,
                                    dataIndex: 'MinB',
                                    width: 85,
                                    editor: {allowBlank: false},
                                    summaryType: 'min',
                                    summaryRenderer: function(value, summaryData, dataIndex) {
                                        return 'Min: '+value;
                                    }
                                }
                            ]
                        }

                    ]
                },
                {
                        xtype:'actioncolumn',
                        width:55,
                        header: 'Grafica',
                        items: [{
                            iconCls:'view_statistics16',
                            tooltip: 'Aprobar',
                            tooltip: 'Ver grafico del dia (Altura).',
                            handler: function(grid, rowIndex, colIndex) {
                                var obj = grid.getStore().getAt(rowIndex).data;
                                console.log(obj);
                                var title = 'Gráfico del Dia: "Dia '+obj.dia+'"';
                                Ext.getCmp('chart_panel1').setTitle(title);
                                var data = [
                                    { 'Hora':0,  "Altura":parseFloat(obj.hora0_A),  "Velocidad":parseFloat(obj.hora0_V), "Dirección":parseFloat(obj.hora0_D)},
                                    { 'Hora':1,  "Altura":parseFloat(obj.hora1_A),  "Velocidad":parseFloat(obj.hora1_V), "Dirección":parseFloat(obj.hora1_D)},
                                    { 'Hora':2,  "Altura":parseFloat(obj.hora2_A),  "Velocidad":parseFloat(obj.hora2_V), "Dirección":parseFloat(obj.hora2_D)},
                                    { 'Hora':3,  "Altura":parseFloat(obj.hora3_A),  "Velocidad":parseFloat(obj.hora3_V), "Dirección":parseFloat(obj.hora3_D)},
                                    { 'Hora':4,  "Altura":parseFloat(obj.hora4_A),  "Velocidad":parseFloat(obj.hora4_V), "Dirección":parseFloat(obj.hora4_D)},
                                    { 'Hora':5,  "Altura":parseFloat(obj.hora5_A),  "Velocidad":parseFloat(obj.hora5_V), "Dirección":parseFloat(obj.hora5_D)},
                                    { 'Hora':6,  "Altura":parseFloat(obj.hora6_A),  "Velocidad":parseFloat(obj.hora6_V), "Dirección":parseFloat(obj.hora6_D)},
                                    { 'Hora':7,  "Altura":parseFloat(obj.hora7_A),  "Velocidad":parseFloat(obj.hora7_V), "Dirección":parseFloat(obj.hora7_D)},
                                    { 'Hora':8,  "Altura":parseFloat(obj.hora8_A),  "Velocidad":parseFloat(obj.hora8_V), "Dirección":parseFloat(obj.hora8_D)},
                                    { 'Hora':9,  "Altura":parseFloat(obj.hora9_A),  "Velocidad":parseFloat(obj.hora9_V), "Dirección":parseFloat(obj.hora9_D)},
                                    { 'Hora':10,  "Altura":parseFloat(obj.hora10_A),  "Velocidad":parseFloat(obj.hora10_V), "Dirección":parseFloat(obj.hora10_D)},
                                    { 'Hora':11,  "Altura":parseFloat(obj.hora11_A),  "Velocidad":parseFloat(obj.hora11_V), "Dirección":parseFloat(obj.hora11_D)},
                                    { 'Hora':12,  "Altura":parseFloat(obj.hora12_A),  "Velocidad":parseFloat(obj.hora12_V), "Dirección":parseFloat(obj.hora12_D)},
                                    { 'Hora':13,  "Altura":parseFloat(obj.hora13_A),  "Velocidad":parseFloat(obj.hora13_V), "Dirección":parseFloat(obj.hora13_D)},
                                    { 'Hora':14,  "Altura":parseFloat(obj.hora14_A),  "Velocidad":parseFloat(obj.hora14_V), "Dirección":parseFloat(obj.hora14_D)},
                                    { 'Hora':15,  "Altura":parseFloat(obj.hora15_A),  "Velocidad":parseFloat(obj.hora15_V), "Dirección":parseFloat(obj.hora15_D)},
                                    { 'Hora':16,  "Altura":parseFloat(obj.hora16_A),  "Velocidad":parseFloat(obj.hora16_V), "Dirección":parseFloat(obj.hora16_D)},
                                    { 'Hora':17,  "Altura":parseFloat(obj.hora17_A),  "Velocidad":parseFloat(obj.hora17_V), "Dirección":parseFloat(obj.hora17_D)},
                                    { 'Hora':18,  "Altura":parseFloat(obj.hora18_A),  "Velocidad":parseFloat(obj.hora18_V), "Dirección":parseFloat(obj.hora18_D)},
                                    { 'Hora':19,  "Altura":parseFloat(obj.hora19_A),  "Velocidad":parseFloat(obj.hora19_V), "Dirección":parseFloat(obj.hora19_D)},
                                    { 'Hora':20,  "Altura":parseFloat(obj.hora20_A),  "Velocidad":parseFloat(obj.hora20_V), "Dirección":parseFloat(obj.hora20_D)},
                                    { 'Hora':21,  "Altura":parseFloat(obj.hora21_A),  "Velocidad":parseFloat(obj.hora21_V), "Dirección":parseFloat(obj.hora21_D)},
                                    { 'Hora':22,  "Altura":parseFloat(obj.hora22_A),  "Velocidad":parseFloat(obj.hora22_V), "Dirección":parseFloat(obj.hora22_D)},
                                    { 'Hora':23,  "Altura":parseFloat(obj.hora23_A),  "Velocidad":parseFloat(obj.hora23_V), "Dirección":parseFloat(obj.hora23_D)},
                                    { 'Hora':23,  "Altura":parseFloat(obj.hora23_A),  "Velocidad":parseFloat(obj.hora23_V), "Dirección":parseFloat(obj.hora23_D)}

                                ];
                                var data_new = Ext.create('Ext.data.JsonStore', {
                                    fields: [
                                        {name: 'Hora', type: 'int'},
                                        {name: 'Altura', type: 'Numeric'},
                                        {name: 'Velocidad', type: 'Numeric'},
                                        {name: 'Dirección', type: 'Numeric'}
                                    ],
                                    data: data
                                });
                                var chart =  Ext.create('Ext.chart.Chart', {
                                    style: 'background:#fff',
                                    id:'chart1',
                                    name:'chart1',
                                    width: 490,
                                    height:'100%',
                                    shadow: true,
                                    animate: true,
                                    theme: 'Category1',
                                    store: data_new,
                                    legend: {position: 'top'},
                                    axes: [
                                        {
                                            title: 'Valores',
                                            type: 'Numeric',
                                            position: 'left',
                                            fields: ['Altura'],
                                            minorTickSteps: 1,
                                            grid: {
                                                odd: {
                                                    opacity: 1,
                                                    fill: '#ddd',
                                                    stroke: '#bbb',
                                                    'stroke-width': 0.5
                                                }
                                            }
                                        },
                                        {
                                            title: 'Horas del dia',
                                            type: 'Numeric',
                                            position: 'bottom',
                                            fields: ['Hora'],
                                            dateFormat: 'ga',
                                            minimum: 0,
                                            maximum: 24
                                        }
                                    ],
                                    series: [
                                        {
                                            type: 'line',
                                            xField: 'Hora',
                                            yField: 'Altura',
                                            smooth: true,
                                            fill: true,
                                            highlight: {
                                                size: 7,
                                                radius: 7
                                            },
                                            markerConfig: {
                                                type: 'circle',
                                                size: 4,
                                                radius: 4,
                                                'stroke-width': 0
                                            },
                                            tips: {
                                                trackMouse: true,
                                                width: 120,
                                                height: 50,
                                                layout: 'fit',
                                                renderer: function(klass, item) {
                                                    var storeItem = item.storeItem,
                                                        data = [{
                                                            name: 'Hora',
                                                            data: storeItem.get('Altura')
                                                        }], i, l, html;

                                                    this.setTitle("Altura :" + storeItem.get('Altura')+"<br>Hora :"+ storeItem.get('Hora'));
                                                }
                                            }
                                        }
                                    ]

                                });
                                Ext.getCmp('chart_panel1').removeAll();
                                Ext.getCmp('chart_panel1').add(chart)

                            }
                    }]
                }

            ],
            viewConfig: {
                forceFit: true
            },
            bbar:{
                id: 'general_tbar_id',
                items: [
                    Ext.create('Ext.toolbar.Paging', {
                        store: Ext.data.StoreManager.lookup('_simpsonsStore1'),
                        displayInfo: true,
                        pageSize: 31,
                        displayMsg: 'Dias: {0} - {1} de {2}',
                        emptyMsg: "No existen datos"
                    })]
            },
            features: [{ftype: 'summary'}],
            listeners: {
                itemdblclick:function(This, record, item, index, e, eOpts ){
                    var title = 'Gráfico del Dia: "Dia '+record.data.dia+'"';
                    Ext.getCmp('chart_panel1').setTitle(title);
                    var obj=record.data;
                    var data = [
                        { 'Hora':0,  "Altura":parseFloat(obj.hora0_A),  "Velocidad":parseFloat(obj.hora0_V), "Dirección":parseFloat(obj.hora0_D)},
                        { 'Hora':1,  "Altura":parseFloat(obj.hora1_A),  "Velocidad":parseFloat(obj.hora1_V), "Dirección":parseFloat(obj.hora1_D)},
                        { 'Hora':2,  "Altura":parseFloat(obj.hora2_A),  "Velocidad":parseFloat(obj.hora2_V), "Dirección":parseFloat(obj.hora2_D)},
                        { 'Hora':3,  "Altura":parseFloat(obj.hora3_A),  "Velocidad":parseFloat(obj.hora3_V), "Dirección":parseFloat(obj.hora3_D)},
                        { 'Hora':4,  "Altura":parseFloat(obj.hora4_A),  "Velocidad":parseFloat(obj.hora4_V), "Dirección":parseFloat(obj.hora4_D)},
                        { 'Hora':5,  "Altura":parseFloat(obj.hora5_A),  "Velocidad":parseFloat(obj.hora5_V), "Dirección":parseFloat(obj.hora5_D)},
                        { 'Hora':6,  "Altura":parseFloat(obj.hora6_A),  "Velocidad":parseFloat(obj.hora6_V), "Dirección":parseFloat(obj.hora6_D)},
                        { 'Hora':7,  "Altura":parseFloat(obj.hora7_A),  "Velocidad":parseFloat(obj.hora7_V), "Dirección":parseFloat(obj.hora7_D)},
                        { 'Hora':8,  "Altura":parseFloat(obj.hora8_A),  "Velocidad":parseFloat(obj.hora8_V), "Dirección":parseFloat(obj.hora8_D)},
                        { 'Hora':9,  "Altura":parseFloat(obj.hora9_A),  "Velocidad":parseFloat(obj.hora9_V), "Dirección":parseFloat(obj.hora9_D)},
                        { 'Hora':10,  "Altura":parseFloat(obj.hora10_A),  "Velocidad":parseFloat(obj.hora10_V), "Dirección":parseFloat(obj.hora10_D)},
                        { 'Hora':11,  "Altura":parseFloat(obj.hora11_A),  "Velocidad":parseFloat(obj.hora11_V), "Dirección":parseFloat(obj.hora11_D)},
                        { 'Hora':12,  "Altura":parseFloat(obj.hora12_A),  "Velocidad":parseFloat(obj.hora12_V), "Dirección":parseFloat(obj.hora12_D)},
                        { 'Hora':13,  "Altura":parseFloat(obj.hora13_A),  "Velocidad":parseFloat(obj.hora13_V), "Dirección":parseFloat(obj.hora13_D)},
                        { 'Hora':14,  "Altura":parseFloat(obj.hora14_A),  "Velocidad":parseFloat(obj.hora14_V), "Dirección":parseFloat(obj.hora14_D)},
                        { 'Hora':15,  "Altura":parseFloat(obj.hora15_A),  "Velocidad":parseFloat(obj.hora15_V), "Dirección":parseFloat(obj.hora15_D)},
                        { 'Hora':16,  "Altura":parseFloat(obj.hora16_A),  "Velocidad":parseFloat(obj.hora16_V), "Dirección":parseFloat(obj.hora16_D)},
                        { 'Hora':17,  "Altura":parseFloat(obj.hora17_A),  "Velocidad":parseFloat(obj.hora17_V), "Dirección":parseFloat(obj.hora17_D)},
                        { 'Hora':18,  "Altura":parseFloat(obj.hora18_A),  "Velocidad":parseFloat(obj.hora18_V), "Dirección":parseFloat(obj.hora18_D)},
                        { 'Hora':19,  "Altura":parseFloat(obj.hora19_A),  "Velocidad":parseFloat(obj.hora19_V), "Dirección":parseFloat(obj.hora19_D)},
                        { 'Hora':20,  "Altura":parseFloat(obj.hora20_A),  "Velocidad":parseFloat(obj.hora20_V), "Dirección":parseFloat(obj.hora20_D)},
                        { 'Hora':21,  "Altura":parseFloat(obj.hora21_A),  "Velocidad":parseFloat(obj.hora21_V), "Dirección":parseFloat(obj.hora21_D)},
                        { 'Hora':22,  "Altura":parseFloat(obj.hora22_A),  "Velocidad":parseFloat(obj.hora22_V), "Dirección":parseFloat(obj.hora22_D)},
                        { 'Hora':23,  "Altura":parseFloat(obj.hora23_A),  "Velocidad":parseFloat(obj.hora23_V), "Dirección":parseFloat(obj.hora23_D)},
                        { 'Hora':23,  "Altura":parseFloat(obj.hora23_A),  "Velocidad":parseFloat(obj.hora23_V), "Dirección":parseFloat(obj.hora23_D)}

                    ];
                    var data_new = Ext.create('Ext.data.JsonStore', {
                        fields: [
                            {name: 'Hora', type: 'int'},
                            {name: 'Altura', type: 'float'},
                            {name: 'Velocidad', type: 'float'},
                            {name: 'Dirección', type: 'float'}
                        ],
                        data: data
                    });
                    var chart1 =  Ext.create('Ext.chart.Chart', {
                        style: 'background:#fff',
                        id:'chart1',
                        name:'chart1',
                        width: 490,
                        height:'100%',
                        shadow: true,
                        animate: true,
                        theme: 'Category1',
                        store: data_new,
                        legend: {position: 'top'},
                        axes: [
                            {
                                title: 'Valores',
                                type: 'Numeric',
                                position: 'left',
                                fields: ['Altura'],
                                minorTickSteps: 1,
                                grid: {
                                    odd: {
                                        opacity: 1,
                                        fill: '#ddd',
                                        stroke: '#bbb',
                                        'stroke-width': 0.5
                                    }
                                }
                            },
                            {
                                title: 'Horas del dia',
                                type: 'Numeric',
                                position: 'bottom',
                                fields: ['Hora'],
                                dateFormat: 'ga',
                                minimum: 0,
                                maximum: 24
                            }
                        ],
                        series: [
                            {
                                type: 'line',
                                xField: 'Hora',
                                yField: 'Altura',
                                smooth: true,
                                fill: true,
                                highlight: {
                                    size: 7,
                                    radius: 7
                                },
                                markerConfig: {
                                    type: 'circle',
                                    size: 4,
                                    radius: 4,
                                    'stroke-width': 0
                                },
                                tips: {
                                    trackMouse: true,
                                    width: 120,
                                    height: 50,
                                    layout: 'fit',
                                    renderer: function(klass, item) {
                                        var storeItem = item.storeItem,
                                            data = [{
                                                name: 'Hora',
                                                data: storeItem.get('Altura')
                                            }], i, l, html;

                                        this.setTitle("Altura :" + storeItem.get('Altura')+"<br>Hora :"+ storeItem.get('Hora'));
                                    }
                                }
                            }
                        ]

                    });
                    Ext.getCmp('chart_panel1').removeAll();
                    Ext.getCmp('chart_panel1').add(chart1)
                }
            }
        });
        var chart1 = Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            id:'chart1',
            name:'chart1',
            width: 490,
            height:'100%',
            shadow: true,
            animate: true,
            theme: 'Category1',
            store: this.store1,
            legend: {position: 'top'},
            axes: [
                {
                    title: 'Valores',
                    type: 'Numeric',
                    position: 'left',
                    fields: ['Altura'],
                    minorTickSteps: 1,
                    grid: {
                        odd: {
                            opacity: 1,
                            fill: '#ddd',
                            stroke: '#bbb',
                            'stroke-width': 0.5
                        }
                    }
                },
                {
                    title: 'Horas del dia',
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['Hora'],
                    dateFormat: 'ga',
                    minimum: 0,
                    maximum: 24
                }
            ],
            series: [
                {
                    type: 'line',
                    xField: 'Hora',
                    yField: 'Altura',
                    smooth: true,
                    fill: true,
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    markerConfig: {
                        type: 'circle',
                        size: 4,
                        radius: 4,
                        'stroke-width': 0
                    },
                    tips: {
                        trackMouse: true,
                        width: 120,
                        height: 50,
                        layout: 'fit',
                        renderer: function(klass, item) {
                            var storeItem = item.storeItem,
                                data = [{
                                    name: 'Hora',
                                    data: storeItem.get('Altura')
                                }], i, l, html;

                            this.setTitle("Altura :" + storeItem.get('Altura')+"<br>Hora :"+ storeItem.get('Hora'));
                        }
                    }
                }
            ]

        });
        var panelIz= Ext.create('Ext.panel.Panel', {
            title: 'Gráfico del Dia: "Datos de Ejemplo"',
            layout:'fit',
            id:'chart_panel1',
            name:'chart_panel1',
            autoScroll:true,
            collapsed :false,
            collapsible :true,
            items:chart1,
            resizable :true,
            region :'east',
            tools: [
                {type:'maximize',
                    handler:function(){
                        var chart_mayor1 =  Ext.create('Ext.chart.Chart', {
                            style: 'background:#fff',
                            id:'chart_mayor1',
                            name:'chart_mayor1',
                            shadow: true,
                            animate: true,
                            theme: 'Category1',
                            store: Ext.getCmp('chart1').store,
                            legend: {position: 'top'},
                            axes: [
                                {
                                    title: 'Valores',
                                    type: 'Numeric',
                                    position: 'left',
                                    fields: ['Altura'],
                                    minorTickSteps: 1,
                                    grid: {
                                        odd: {
                                            opacity: 1,
                                            fill: '#ddd',
                                            stroke: '#bbb',
                                            'stroke-width': 0.5
                                        }
                                    }
                                },
                                {
                                    title: 'Horas del dia',
                                    type: 'Numeric',
                                    position: 'bottom',
                                    fields: ['Hora'],
                                    dateFormat: 'ga',
                                    minimum: 0,
                                    maximum: 24
                                }
                            ],
                            series: [
                                {
                                    type: 'line',
                                    xField: 'Hora',
                                    yField: 'Altura',
                                    smooth: true,
                                    fill: true,
                                    highlight: {
                                        size: 7,
                                        radius: 7
                                    },
                                    markerConfig: {
                                        type: 'circle',
                                        size: 4,
                                        radius: 4,
                                        'stroke-width': 0
                                    },
                                    tips: {
                                        trackMouse: true,
                                        width: 120,
                                        height: 50,
                                        layout: 'fit',
                                        renderer: function(klass, item) {
                                            var storeItem = item.storeItem,
                                                data = [{
                                                    name: 'Hora',
                                                    data: storeItem.get('Altura')
                                                }], i, l, html;

                                            this.setTitle("Altura :" + storeItem.get('Altura')+"<br>Hora :"+ storeItem.get('Hora'));
                                        }
                                    }
                                }
                            ]
                        });
                        Ext.create('Ext.window.Window', {
                            title:  Ext.getCmp('chart_panel1').title,
                            height: '80%',
                            modal:true,
                            width: '80%',
                            layout: 'fit',
                            items:chart_mayor1,
                            maximizable:true
                        }).show();

                    }}
            ]

        });
        var _panel = new Ext.Panel({
            title: 'Pleamar y Bajamar',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid,panelIz],
            listeners: {
                afterrender: function() {
                    //this.__data_store.load({params:{start:0,limit:25}});
                    App.UpBanner();
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
App.RegisterModule('GeneralMes', new GeneralMes());