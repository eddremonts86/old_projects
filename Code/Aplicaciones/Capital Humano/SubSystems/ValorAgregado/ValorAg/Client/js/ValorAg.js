function ValorAg(){
    this.__data_store_datos = null;
    this.Init = function()
    {
        Ext.require( ['Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*', 'Ext.grid.feature.Grouping','Ext.form.*']);
        var _menu_item_config_ValorAg ={
                    text: 'Valor Agregado',
                    id: '__nomina_menu_id1',
                    iconCls: 'nomencladores',
                    handler: Ext.Function.bind(this.ShowMainWindow, this)
                };
        App.InsertMenuItem('Operaciones', _menu_item_config_ValorAg);
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        var pen_esti, pen_ant, subtotal = 0;
        this.__data_store_datos = App.BuildJsonStore('ValorAg.ValorAg.Tomar_datos_generales', {
            fields: [
                {name: 'mes', type: 'int'},
                {name: 'anno', type: 'int'},
                {name: 'nombre', type: 'string', value: '1',header:'Agencia'},

                {name: 'plan_a', type: 'number',header:'Plan(Anual)'},
                {name: 'real_a', type: 'number',header:'Real(Acumulado)'},
                {name: 'PB', type: 'number',header:'PB(Acumulado)'},
                {name: 'VA', type: 'number',header:'VA(Acumulado)'},
                {name: 'SVA', type: 'number',header:'SVA(Acumulado)'},

                {name: 'total_inc', type: 'number',header:'Plan(Mensual)'},
                {name: 'reale', type: 'number',header:'Real(Mensual)'},
                {name: 'pb', type: 'number',header:'PB(Mensual)'},
                {name: 'va', type: 'number',header:'VA(Mensual)'},
                {name: 'sva', type: 'number',header:'SVA(Mensual)'},
                {name: 'porcientoc', type: 'number',header:'% Cumplimiento'},
                {name: 'porc', type: 'number'},
                {name: 'siglas', type: 'string', value: '1'},
                {name: 'id', type: 'string'},
                {name: 'productiva', type: 'string'},
                {name: 'PPI_a', type: 'number'},
                {name: 'PPI_a', type: 'number'},
                {name: 'PPF_a', type: 'number'},
                {name: 'PTF_a', type: 'number'},
                {name: 'GM_a', type: 'number'},
                {name: 'SC_a', type: 'number'},
                {name: 'salario', type: 'number'},
                {name: 'pp1_inc', type: 'number'},
                {name: 'pp2', type: 'number'},
                {name: 'gm', type: 'number'},
                {name: 'sc', type: 'number'}
            ],
            sorters: [{
                property: 'trabajador_nombre_completo',
                direction: 'ASC'
            }],
            groupField: 'agencia',
            proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            autoLoad: false
        });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {startCollapsed: true,
            groupHeaderTpl:'<div class="gohome16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agencia : {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})</div>',
            hideGroupedHeader: true,
            startCollapsed: true,
            id: 'restaurantGrouping',
            name: 'restaurantGrouping'
            });
        function pintar(val2, met, record, a, b, c, d) {
            //met.style = 'font-style:italic !important;background: #7398FE;';
            return val2;
        }
        function cpl(val2, met, record, a, b, c, d) {
            //met.style = 'font-style:italic !important;background: #51A351;';
            return val2;
        }
        var meses = new Ext.data.SimpleStore({
            fields: ['id', 'mes'],
            data : [['1','Enero'],
                    ['2','Febrero'],
					['3','Marzo'],['4','Abril'],
					['5','Mayo'],['6','Junio'],
					['7','Julio'],['8','Agosto'],
					['9','Septiembre'],['10','Octubre'],
					['11','Noviembre'],['12','Diciembre']]
        });
        var mes =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose State',
            queryMode: 'local',
            width:150,
            id:'mes',
            name:'mes',
            store:meses,
            displayField: 'mes',
            valueField: 'id',
            hideLabel:true

        });
        var anno =  new Ext.form.field.Number({
            anchor: '100%',
            name: 'anno',
            id: 'anno',
            hideLabel:true,
            width:150,
            fieldLabel: 'Bottles of Beer',
            value:2014,
            maxValue: 2025,
            minValue: 2007
        });
        var _grid = new Ext.grid.Panel({
            id: 'prenom_grid',
            name: 'prenom_grid',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            selType: 'rowmodel',
            lockable: true,
            columnLines: true,
            //features: [groupingFeature],
            resizable: true,
            viewConfig: {stripeRows: true, forceFit: true},
            enableColumnMove: true,
            enableColumnResize: true,
            sortableColumns: true,
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            store: this.__data_store_datos,
            columns: [
                {xtype: 'rownumberer'},
                {header: '<span class="user_identity16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Áreas</span>',
                    menuDisabled: true, sortable: false, dataIndex: 'nombre', locked: true, width: 325},
                {
                    text: '<span style="color: darkgreen">Acumulado</span>',
                    columns: [
                        { text: 'Plan  ', dataIndex: 'plan_a',width: 100,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var fin = Ext.util.Format.number(value, '0.000');
                                return  fin;
                            }
                        },
                        { text: 'Plan(Real)', dataIndex: 'real_a',width: 150,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var fin = Ext.util.Format.number(value, '0.000');
                                return  fin;
                            }
                        },
                        { text: 'Producción Bruta(Real)', dataIndex: 'PB',width: 200,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var fin = Ext.util.Format.number(value, '0.000');
                                return  fin;
                            }
                        },
                        { text: 'Valos Agregado(Real)', dataIndex: 'VA',width: 200,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var fin = Ext.util.Format.number(value, '0.000');
                                return  fin;
                            }
                        },
                        { text: 'Salario / V Agregado(Real)', dataIndex: 'SVA',width: 200,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var fin = Ext.util.Format.number(value, '0.000');
                                return  fin;
                            }
                        }
                        ]},
                {
                    text: 'Datos Mensuales',
                columns: [
                { text: 'Plan  ', dataIndex: 'total_inc',width: 100,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        var fin = Ext.util.Format.number(value, '0.000');
                        return  fin;
                    }
                },
                { text: 'Plan(Real)', dataIndex: 'reale',width: 100,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        var fin = Ext.util.Format.number(value, '0.000');
                        return  fin;
                    }
                },
                { text: 'Producción Bruta', dataIndex: 'pb',width: 150,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        var fin = Ext.util.Format.number(value, '0.000');
                        return  fin;
                    }
                },
                { text: 'Valos Agregado', dataIndex: 'va',width: 150,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        var fin = Ext.util.Format.number(value, '0.000');
                        return  fin;
                    }
                },
                { text: 'Salario / V Agregado', dataIndex: 'sva',width: 170,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        var fin = Ext.util.Format.number(value, '0.000');
                        return  fin;
                    }
                }
                ]}

            ],
            tbar: {
                id: 'Puestos_trabajo_por_area_tbar_id',
                items: ['-'],
                height: 32
            },
            bbar: [
                {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_datos,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
                },'->',
                mes,
                anno,
                {  xtype: 'button',
                    text : 'Buscar',
                    hideLabel:true,
                    iconCls:'edit_find_user16',
                    handler:function(){
                        var store  = Ext.getCmp('prenom_grid').store;
                        informacion(store);

                    }

                }
            ],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if (selections.length == 0) {
                            this.Disable('Puestos_trabajo_por_areaGestionar');
                        }
                        else {
                            this.Enable('Puestos_trabajo_por_areaGestionar');
                        }
                    },
                    scope: this
                },
                afterrender:function(){
                }
            }
        });
        var _panel = new Ext.Panel({
            title: 'Valor Agregado',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid],
            listeners: {
                afterrender: function() {
                    this.__data_store_datos.load({
                        params: {
                            start: 0,
                            limit: 25
                        }
                    });
                },
                scope: this
            }
        });
        return _panel;
    }
    // ========================================================================//
    this.Free = function()
    {
        this.__data_store_datos.removeAll(true);
        delete this.__data_store_datos;
        this.__data_store_datos = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('ValorAg', new ValorAg());
function informacion(store){
    var mes = Ext.getCmp('mes').getValue();
    var anno= Ext.getCmp('anno').getValue();
    if(mes!='' && anno !=''&& mes!=null && anno !=null){
         // = App.PerformSyncServerRequest('ValorAg.ValorAg.Cobro',{mes:mes,anno:anno});
        var result  = App.PerformSyncServerRequest('ValorAg.ValorAg.Buscar', {anno:anno,mes:mes});
        if(result.rows!=false){
            Ext.getCmp('prenom_grid').store.loadData(result.rows,false);
            Ext.getCmp('prenom_grid').getView().refresh();
        }
        else{
            App.InfoMessage('Información', 'No existen datos en este rango de tiempo');
        }
    }
    else{
        App.InfoMessage('Información', 'Debe dar una fecha valida');
    }
}
