function Nomina(){
    this.__data_store_datos = null;
    this.Init = function()
    {
        Ext.require( ['Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*', 'Ext.grid.feature.Grouping','Ext.form.*']);
        var _menu_item_config_Nomina ={
                    text: 'Nomina de los trabajadores',
                    id: '__nomina_menu_id1',
                    iconCls: 'nomencladores',
                    handler: Ext.Function.bind(this.ShowMainWindow, this)
                };
        App.InsertSubItemMenu('Operaciones', 'Nominas de Salario', _menu_item_config_Nomina);
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        var pen_esti, pen_ant, subtotal = 0;
        this.__data_store_datos = App.BuildJsonStore('Nomina.Nomina.Tomar_datos_generales', {
            fields: [
                {name: 'id_tabaj'},
                {name: 'id_prenomina',type: 'text'},
                {name: 'Incremento',type: 'number'},
                {name: 'inicio',type: 'number'},
                {name: 'identidad',type: 'number'},
                {name: 'ant_dinero',type: 'number'},
                {name: 'inc_diner',type: 'number'},
                {name: 'contratoid'},
                {name: 'empresa'},
                {name: 'tipo_contrato'},
                {name: 'agencia'},
                {name: 'area'},
                {name: 'dias_vacaciones',type: 'number'},
                {name: 'pent_ant',type: 'number'},
                {name: 'pent_ext',type: 'number'},
                {name: 'importe_vacaciones',type: 'number'},
                {name: 'trabajador_nombre_completo'},
                {name: 'nombre_cargo'},
                {name: 'nombre'},
                {name: 'salario', type: 'number'},
                {name: 'cla', type: 'number'},
                {name: 'subtotal', type: 'number'},
                {name: 'pago_adicion', type: 'number'},
                {name: 'cies', type: 'number'},
                {name: 'otos', type: 'number'},
                {name: 'tnc', type: 'number'},
                {name: 'ant', type: 'number'},
                {name: 'ext', type: 'number'},
                {name: 'estimulo', type: 'number'},
                {name: 'horas',type: 'number'},
                {name: 'horas_dias',type: 'number'},
                {name: 'total', type: 'number'},
                {name: 'debit', type: 'int'},
                {name: 'extiml', type: 'number'},
                {name: 'cpl', type: 'number', value: '1'},
                {name: 'check', type: 'number'},
                {name: 'cdt', type: 'number'},
                {name: 'check0', type: 'number'},
                {name: 'vaca_dias', type: 'number'},
                {name: 'vaca_dine', type: 'number'},
                {name: 'check1', type: 'boolean', value: 'false'}
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
            data : [['1','Enero'],['2','Febrero'],
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
                {header: '<span class="user_identity16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trabajadores</span>', menuDisabled: true, sortable: false, dataIndex: 'trabajador_nombre_completo', locked: true, width: 255},
                {header: 'Cargo', menuDisabled: true, sortable: false, dataIndex: 'nombre_cargo', width: 150, renderer: pintar},
                {header: 'Escala', menuDisabled: true, sortable: false, dataIndex: 'nombre', width: 60, renderer: pintar},
                {header: 'Salario <br> Escala ($)', menuDisabled: true, sortable: false, dataIndex: 'salario', width: 90, renderer: pintar},
                {header: 'Pago <br> Adicional ($)', menuDisabled: true, sortable: false,dataIndex: 'pago_adicion', width: 100, renderer: pintar},
                {header: 'CPL', menuDisabled: true, sortable: false, dataIndex: 'cpl', width: 60, renderer: cpl},
                {header: 'CIES ($)', menuDisabled: true, sortable: false, dataIndex: 'cies', width: 70, renderer: pintar},
                {header: 'CLA ($)', menuDisabled: true, sortable: false, dataIndex: 'cla', width: 60, renderer: pintar},
                {header: 'Exitimulación(%)',hideable : true, menuDisabled: true, sortable: false, dataIndex: 'estimulo', width: 120,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        return  value;}
                },
                {header: 'Horas', menuDisabled: true, dataIndex: 'horas', sortable: false, width: 80, align: 'right',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            if(value>190.6){value=190.6;}
                            var horas = record.get('horas');
                            var salario = record.get('salario');
                            var porciento = record.get('estimulo');
                            var pago_adicion = record.get('pago_adicion');
                            var cpl = record.get('cpl');
                            var cies = record.get('cies');
                            var cla = record.get('cla');
                            var inc_diner = record.get('inc_diner');
                            var ext = record.get('estimulo');
                            var tnc = record.get('tnc');
                            var ant = record.get('ant');
                            var Ext_ext = record.get('otos');
                            var check = record.get('check');
                            var cdt = record.get('cdt');
                            var ant_=record.get('ant_dinero');
                            var tipo_contrato = record.get('tipo_contrato');
                            var total;
                            var pent_ant;
                            var pent_ext;
                            var dias =(value*24)/190.6;
                            var vaca_dias = dias*0.09083333333333333;
                            var ant_real= (ant_ / 24) * dias;
                            var debit = record.get('debit');
                            var fin;
                            if (dias == '' || dias == 0 ){
                                var fin = Ext.util.Format.number(value, '0.00');
                                return  fin;
                            }
                            else{
                                total = ((((salario + pago_adicion + cies + cla + tnc)/ 24) * dias)+ant_real);

                                var estimulo = total*(porciento/100);
                                total = total + estimulo + Ext_ext;
                                if(cdt <'70' && cdt>'0'||cdt <70 && cdt>0){
                                    pent_ant = estimulo;
                                    pent_ext = ant_real;
                                }
                                else if(cdt >='70' && cdt <'80'||cdt >=70 && cdt <80){
                                    pent_ant = estimulo*0.2;
                                    pent_ext = ant_real*0.3;
                                }
                                else if(cdt >='80' && cdt <'90'||cdt >=80 && cdt <90){
                                    pent_ant = estimulo*0.1;
                                    pent_ext = ant_real*0.3;
                                }
                                else {
                                    pent_ant = 0;
                                    pent_ext = 0;
                                }
                                total = total - (pent_ant + pent_ext);
                                var vaca_dine = vaca_dias*(total/dias);
                                if(tipo_contrato=='DE_capital_humano_766'){total = total - vaca_dine;}
                                else {total = total + vaca_dine;}
                                var prim = total;
                                total=total+inc_diner;
                                total=total-(total*0.05);
                                subtotal=total;
                                total=(total-debit);
                                record.data.horas_dias = Ext.util.Format.number(dias, '0');
                                record.data.vaca_dias = Ext.util.Format.number(vaca_dias, '0.0');
                                record.data.extiml = Ext.util.Format.number(estimulo, '0.0');
                                record.data.vaca_dine = Ext.util.Format.number(vaca_dine, '0.0');
                                record.data.pent_ext = Ext.util.Format.number(pent_ant, '0.0');
                                record.data.pent_ant = Ext.util.Format.number(pent_ext, '0.0');
                                record.data.ant = ant_real;
                                record.data.subtotal = Ext.util.Format.number(prim, '0.0');
                                record.data.inicio  = Ext.util.Format.number(subtotal, '0.0');
                                record.data.total = Ext.util.Format.number(total, '0.0');
                                fin = Ext.util.Format.number(value, '0.00');
                                return  fin;
                            }

                    }
                },
                {header: 'Dias', menuDisabled: true, sortable: false, width: 125, dataIndex: 'horas_dias',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                       // metaData.style = 'font-style:italic !important;background: #7398FE;';
                        return  value;
                    }},
                {header: 'Estimulacion ($)', menuDisabled: true, sortable: false, width: 135, dataIndex: 'extiml',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                   // metaData.style = 'font-style:italic !important;background: #7398FE;';
                    return  value;
                }},
                {header: 'Vacaciones/Dias', menuDisabled: true, sortable: false, width: 125, dataIndex: 'vaca_dias',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        //metaData.style = 'font-style:italic !important;background: #7398FE;';
                        return  value;
                    }},
                {header: 'Vacaciones/9.09 ($)', menuDisabled: true, sortable: false,hidden:false, width: 135, dataIndex: 'vaca_dine',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                       // metaData.style = 'font-style:italic !important;background: #7398FE;';
                        var tipo_contrato = record.get('tipo_contrato');
                        if(tipo_contrato=='DE_capital_humano_766'){
                          // metaData.style = 'font-style:italic !important;background: #7398FE;color:red;';
                            metaData.style = 'font-style:italic !important;color:red;';
                        }
                        return value;
                   }
                },
                {header: 'CDT', menuDisabled: true, sortable: false, dataIndex: 'cdt', width: 100,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            return  value;}
                },
                {header: 'Penalizacion Ant ($)', menuDisabled: true, sortable: false, dataIndex: 'pent_ant', width: 160,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                       // metaData.style = 'font-style:italic !important;background: #7398FE;';
                        if(value!='0'||value!=0.0||value!=0){metaData.style = 'font-style:italic !important;background: #7398FE;color:red;';}
                        return value;
                    }
                },
                {header: 'Penalizacion Ext ($)', menuDisabled: true, sortable: false, dataIndex: 'pent_ext', width: 160,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                       // metaData.style = 'font-style:italic !important;background: #7398FE;';
                        if(value!='0'||value!=0.0||value!=0){metaData.style = 'font-style:italic !important;background: #7398FE;color:red;';}
                        return value;
                    }
                },
                {header: 'Antiguedad <br> Formada ($)',
                   menuDisabled: true, sortable: false, dataIndex: 'ant_dinero', renderer: pintar, width: 110},
                {header: 'Antiguedad <br> Real Mes ($)', menuDisabled: true, sortable: false, dataIndex: 'ant', width: 110,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                       // metaData.style = 'font-style:italic !important;background: #7398FE;';
                        return  Ext.util.Format.number(value, '0.0');
                    }},
                {header: 'Basico <br> Extra ($)',
                    menuDisabled: true, sortable: false, dataIndex: 'tnc', width: 90, renderer: pintar},
                {header: 'Estimulación Extra  <br> o Incremento ($)', menuDisabled: true, sortable: false, dataIndex: 'otos', width: 140,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            return  value;
                    }},
                {xtype: 'checkcolumn', text: 'Pago <br> Extra',width: 80},
                {text: 'Incidencias ($)', dataIndex: 'inc_diner', width: 130,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #3AA860;';
                        return  value;
                    }},
                {text: 'Sub-Total(Prenomina)', dataIndex: 'subtotal', width: 160,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #3AA860;';
                        return  value;
                    }},
                {text: 'Sub-Total ($) / 0.05', dataIndex: 'inicio', width: 150,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                       metaData.style = 'font-style:italic !important;background: #1C693B;';
                        return  value;
                    }},
                {text: 'Debito ($)', dataIndex: 'debit', width: 130,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #A8342E;';
                        return  value;
                    }},
                {text: 'Total ($)', dataIndex: 'total', width: 130,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #157FCC;';
                       return  value;
                    }}
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
                },
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
            title: 'Nominas de los trabajadores  por mes',
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
App.RegisterModule('Nomina', new Nomina());
function informacion(store){
    var mes = Ext.getCmp('mes').getValue();
    var anno= Ext.getCmp('anno').getValue();
    if(mes!='' && anno !=''&& mes!=null && anno !=null){
        var result = App.PerformSyncServerRequest('Nomina.Nomina.Cobro',{mes:mes,anno:anno});
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