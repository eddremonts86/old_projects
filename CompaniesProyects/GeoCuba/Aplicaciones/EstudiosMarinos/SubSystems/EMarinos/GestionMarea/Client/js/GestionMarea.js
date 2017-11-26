function GestionMarea(){
    this.__data_store = null;
    this.Init = function()
    {

        Ext.require('Ext.chart.*');
        Ext.require(['Ext.Window', 'Ext.fx.target.Sprite', 'Ext.layout.container.Fit', 'Ext.window.MessageBox']);

        var _menu_item_config =
        {
            text: 'Gestión de Mareas',
            id: 'GestionMarea_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestión del Sistema', _menu_item_config);
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit: 1});
        Ext.create('Ext.data.Store', {
            storeId:'simpsonsStore',
            fields:['dia',
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
            id:'prueba',
            fields: ['Hora', 'Altura','Velocidad','Dirección']
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
            id: 'GestionMarea_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            buffered : 'true',
            id:'grid_ext',
            name:'grid_ext',
            frame: false,
            columnLines: true,
            plugins: [this.cellEditing],
            store: Ext.data.StoreManager.lookup('simpsonsStore'),
            columns: [
                {header: 'Dia',menuDisabled: true,sortable : false,dataIndex: 'dia',width: 40, locked: true},
                {
                    xtype:'actioncolumn',
                    width:75,
                    header: 'Grafica',
                    items: [{
                        iconCls:'view_statistics16',
                        tooltip: 'Aprobar',
                        tooltip: 'Ver grafico del dia (Altura).',
                        handler: function(grid, rowIndex, colIndex) {
                            var obj = grid.getStore().getAt(rowIndex).data;
                            var title = 'Gráfico del Dia: "Dia '+obj.dia+'"';
                            Ext.getCmp('chart_panel').setTitle(title);
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
                            console.log(data);
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
                                id:'chart',
                                name:'chart',
                                width: 600,
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
                                        fields: ['Altura','Velocidad','Dirección'],
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
                                        axis: 'left',
                                        smooth: true,
                                        fill: true,
                                        xField: 'Hora',
                                        yField: 'Velocidad',
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
                                                        data: storeItem.get('Velocidad')
                                                    }], i, l, html;

                                                this.setTitle("Velocidad :" + storeItem.get('Velocidad')+"<br>Hora :"+ storeItem.get('Hora'));
                                            }
                                        }
                                    },
                                    {
                                        type: 'line',
                                        axis: 'left',
                                        smooth: true,
                                        fill: true,
                                        xField: 'Hora',
                                        yField: 'Dirección',
                                        highlight: {
                                            size: 7,
                                            radius: 7
                                        },
                                        markerConfig: {
                                            type: 'cross',
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
                                                        data: storeItem.get('Dirección')
                                                    }], i, l, html;

                                                this.setTitle("Dirección :" + storeItem.get('Dirección')+"<br>Hora :"+ storeItem.get('Hora'));
                                            }
                                        }

                                    },
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
                            Ext.getCmp('chart_panel').removeAll();
                            Ext.getCmp('chart_panel').add(chart)

                        }
                    }]
                },
                {
                    text: 'Hora - 00',
                    columns: [
                        {
                        text     : 'Altura',
                        sortable : true,
                        dataIndex: 'hora0_A',
                        width: 60,
                        editor: {allowBlank: false}
                        },
                        {
                        text     : 'Velocidad',
                        sortable : true,
                        dataIndex: 'hora0_V',
                        width: 80,
                        editor: {allowBlank: false}
                        },
                        {
                        text     : 'Dirección',
                        sortable : true,  width: 80,
                        dataIndex: 'hora0_D',
                        editor: {allowBlank: false}
                    }]
                },
                {
                    text: 'Hora - 01',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora1_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora1_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora1_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 02',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora2_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora2_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora2_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 03',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora3_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora3_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora3_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 04',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora4_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora4_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora4_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 05',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora5_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora5_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora5_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 06',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora6_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora6_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora6_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 07',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora7_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora7_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora7_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 08',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora8_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora8_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora8_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 09',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora9_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora9_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora9_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 10',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora10_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora10_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora10_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 11',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora11_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora11_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora11_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 12',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora12_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora12_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora12_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 13',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora13_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora13_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora13_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 14',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora14_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora14_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora14_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 15',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora15_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora15_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora15_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 16',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora16_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora16_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora16_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 17',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora17_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora17_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora17_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 18',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora18_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora18_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora18_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 19',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora19_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora19_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora19_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 20',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora20_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora20_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora20_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 21',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora21_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora21_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora21_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 22',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora22_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora22_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora22_D',
                            editor: {allowBlank: false}
                        }]
                },
                {
                    text: 'Hora - 23',
                    columns: [
                        {
                            text     : 'Altura',
                            sortable : true,
                            dataIndex: 'hora23_A',
                            width: 60,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Velocidad',
                            sortable : true,
                            dataIndex: 'hora23_V',  width: 80,
                            editor: {allowBlank: false}
                        },
                        {
                            text     : 'Dirección',
                            sortable : true,  width: 80,
                            dataIndex: 'hora23_D',
                            editor: {allowBlank: false}
                        }]
                }
                ],
            viewConfig: {
                forceFit: true
            },
            bbar:{
                id: 'GestionMarea_tbar_id',
                items: [
                    Ext.create('Ext.toolbar.Paging', {
                            store: Ext.data.StoreManager.lookup('simpsonsStore'),
                            displayInfo: true,
                            pageSize: 31,
                            displayMsg: 'Dias: {0} - {1} de {2}',
                            emptyMsg: "No existen datos"
                    })]
                 },
            listeners: {
                itemdblclick:function(This, record, item, index, e, eOpts ){
                   var title = 'Gráfico del Dia: "Dia '+record.data.dia+'"';
                   Ext.getCmp('chart_panel').setTitle(title);
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
                    console.log(data);
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
                        id:'chart',
                        name:'chart',
                        width: 600,
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
                                fields: ['Altura','Velocidad','Dirección'],
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
                                axis: 'left',
                                smooth: true,
                                fill: true,
                                xField: 'Hora',
                                yField: 'Velocidad',
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
                                                data: storeItem.get('Velocidad')
                                            }], i, l, html;

                                        this.setTitle("Velocidad :" + storeItem.get('Velocidad')+"<br>Hora :"+ storeItem.get('Hora'));
                                    }
                                }
                            },
                            {
                                type: 'line',
                                axis: 'left',
                                smooth: true,
                                fill: true,
                                xField: 'Hora',
                                yField: 'Dirección',
                                highlight: {
                                    size: 7,
                                    radius: 7
                                },
                                markerConfig: {
                                    type: 'cross',
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
                                                data: storeItem.get('Dirección')
                                            }], i, l, html;

                                        this.setTitle("Dirección :" + storeItem.get('Dirección')+"<br>Hora :"+ storeItem.get('Hora'));
                                    }
                                }

                            },
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
                   Ext.getCmp('chart_panel').removeAll();
                   Ext.getCmp('chart_panel').add(chart)
                }
            }
        });
        var chart =  Ext.create('Ext.chart.Chart', {
            style: 'background:#fff',
            id:'chart',
            name:'chart',
            width: 600,
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
                    fields: ['Altura','Velocidad','Dirección'],
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
                    axis: 'left',
                    smooth: true,
                    fill: true,
                    xField: 'Hora',
                    yField: 'Velocidad',
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
                                    data: storeItem.get('Velocidad')
                                }], i, l, html;

                            this.setTitle("Velocidad :" + storeItem.get('Velocidad')+"<br>Hora :"+ storeItem.get('Hora'));
                        }
                    }
                },
                {
                    type: 'line',
                    axis: 'left',
                    smooth: true,
                    fill: true,
                    xField: 'Hora',
                    yField: 'Dirección',
                    highlight: {
                        size: 7,
                        radius: 7
                    },
                    markerConfig: {
                        type: 'cross',
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
                                    data: storeItem.get('Dirección')
                                }], i, l, html;

                            this.setTitle("Dirección :" + storeItem.get('Dirección')+"<br>Hora :"+ storeItem.get('Hora'));
                        }
                    }

                },
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
        var panelIz=Ext.create('Ext.panel.Panel', {
                        title: 'Gráfico del Dia: "Datos de Ejemplo"',
                        layout:'fit',
                        id:'chart_panel',
                        name:'chart_panel',
                        autoScroll:true,
                        resizable :true,
                        collapsed :true,
                        collapsible :true,
                        items:chart,
                        region :'east',
                        tools: [
                            {type:'maximize',
                            handler:function(){
                                var chart_mayor =  Ext.create('Ext.chart.Chart', {
                                    style: 'background:#fff',
                                    id:'chart_mayor',
                                    name:'chart_mayor',
                                    shadow: true,
                                    animate: true,
                                    theme: 'Category1',
                                    store: Ext.getCmp('chart').store,
                                    legend: {position: 'top'},
                                    axes: [
                                        {
                                            title: 'Valores',
                                            type: 'Numeric',
                                            position: 'left',
                                            fields: ['Altura','Velocidad','Dirección'],
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
                                            axis: 'left',
                                            smooth: true,
                                            fill: true,
                                            xField: 'Hora',
                                            yField: 'Velocidad',
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
                                                            data: storeItem.get('Velocidad')
                                                        }], i, l, html;

                                                    this.setTitle("Velocidad :" + storeItem.get('Velocidad')+"<br>Hora :"+ storeItem.get('Hora'));
                                                }
                                            }
                                        },
                                        {
                                            type: 'line',
                                            axis: 'left',
                                            smooth: true,
                                            fill: true,
                                            xField: 'Hora',
                                            yField: 'Dirección',
                                            highlight: {
                                                size: 7,
                                                radius: 7
                                            },
                                            markerConfig: {
                                                type: 'cross',
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
                                                            data: storeItem.get('Dirección')
                                                        }], i, l, html;

                                                    this.setTitle("Dirección :" + storeItem.get('Dirección')+"<br>Hora :"+ storeItem.get('Hora'));
                                                }
                                            }

                                        },
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
                                    title:  Ext.getCmp('chart_panel').title,
                                    height: '80%',
                                    modal:true,
                                    width: '80%',
                                    layout: 'fit',
                                    items:chart_mayor
                                }).show();

                            }},
                            {type:'maximize',
                             handler:function(){
                                 var chart_radio = Ext.create('Ext.chart.Chart', {
                                     style: 'background:#fff',
                                     theme: 'Category2',
                                     insetPadding: 20,
                                     animate: true,
                                     store: Ext.getCmp('chart').store,
                                     legend: {
                                         position: 'right'
                                     },
                                     axes: [{
                                         type: 'Radial',
                                         position: 'radial',
                                         label: {
                                             display: true
                                         }
                                     }],
                                     series: [{
                                         showInLegend: true,
                                         type: 'radar',
                                         xField: 'Hora',
                                         yField: 'Velocidad',
                                         style: {
                                             opacity: 0.4
                                         }
                                     },{
                                         showInLegend: true,
                                         type: 'radar',
                                         xField: 'Hora',
                                         yField: 'Dirección',
                                         style: {
                                             opacity: 0.4
                                         }
                                     },{
                                         showInLegend: true,
                                         type: 'radar',
                                         xField: 'Hora',
                                         yField: 'Altura',
                                         style: {
                                             opacity: 0.4
                                         }
                                     }]
                                 });
                                 Ext.create('Ext.window.Window', {
                                     title:  Ext.getCmp('chart_panel').title,
                                     height: '80%',
                                     modal:true,
                                     width: '80%',
                                     layout: 'fit',
                                     items:chart_radio
                                 }).show();


                             }}
                        ]

        });
        var _panel = new Ext.Panel({
            title: 'Gestión de Mareas',
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
App.RegisterModule('GestionMarea', new GestionMarea());