
function ReporteIndicadores(){
    this.__data_store_datos = null;
    this.Init = function()
    {
        Ext.require( ['Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*', 'Ext.grid.feature.Grouping','Ext.form.*']);
        var _menu_item_config_ReporteIndicadores ={
                    text: 'Editar Reportes por Indicadores y Norma de rendimineto',
                    id: 'Cargos_por_area_menu_id1',
                    iconCls: 'nomencladores',
                    handler: Ext.Function.bind(this.ShowMainWindow, this)
                };
        App.InsertSubItemMenu('Operaciones', 'Nominas de Salario', _menu_item_config_ReporteIndicadores);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        var pen_esti, pen_ant, subtotal = 0;
        this.__data_store_datos = App.BuildJsonStore('ReporteIndicadores.ReporteIndicadores.Tomar_datos_generales', {
            fields: [
                {name: 'id_tabaj'},
                {name: 'id_prenomina'},
                {name: 'Incremento',type: 'int'},
                {name: 'identidad'},
                {name: 'ant_dinero',type: 'int'},
                {name: 'contratoid'},
                {name: 'empresa'},
                {name: 'agencia'},
                {name: 'area'},
                {name: 'dias_vacaciones',type: 'int'},
                {name: 'importe_vacaciones',type: 'int'},
                {name: 'trabajador_nombre_completo'},
                {name: 'nombre_cargo'},
                {name: 'nombre'},
                {name: 'salario', type: 'int'},
                {name: 'cla', type: 'int'},
                {name: 'pago_adicion', type: 'int'},
                {name: 'cies', type: 'int'},
                {name: 'otros', type: 'int'},
                {name: 'tnc', type: 'int'},
                {name: 'ant', type: 'int'},
                {name: 'ext', type: 'int'},
                {name: 'Ext_ext', type: 'int'},
                {name: 'dias', type: 'number'},
                {name: 'horas',type: 'number'},
                {name: 'total', type: 'number'},
                {name: 'cpl', type: 'int', value: '1'},
                {name: 'check', type: 'int'},
                {name: 'CDT', type: 'int'},
                {name: 'check0', type: 'int'},
                {name: 'vaca_dias', type: 'int'},
                {name: 'vaca_dine', type: 'int'},
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
            met.style = 'font-style:italic !important;background: #7398FE;';
            return val2;
        }
        function cpl(val2, met, record, a, b, c, d) {
            met.style = 'font-style:italic !important;background: #51A351;';
            return val2;
        }
        function vaca(val2, met, record, a, b, c, d) {
            met.style = 'font-style:italic !important;background: #7398FE;';
            var salario = record.data.salario;
            var pago_adicion = record.data.pago_adicion;
            val2 = (salario + pago_adicion) * 0.909;

            var dias = record.data.dias;
            var bajas = record.data.baja;

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
               // {header: 'id_prenomina', menuDisabled: true, sortable: false, dataIndex: 'id_prenomina', width: 150, renderer: pintar},
                {header: 'Escala', menuDisabled: true, sortable: false, dataIndex: 'nombre', width: 60, renderer: pintar},
                {header: 'Salario <br> Escala', menuDisabled: true, sortable: false,  renderer: Ext.util.Format.usMoney, dataIndex: 'salario', width: 80, renderer: pintar},
                {header: 'Pago <br> Adicional', menuDisabled: true, sortable: false, renderer: Ext.util.Format.usMoney,dataIndex: 'pago_adicion', width: 90, renderer: pintar},
                {header: 'CPL', menuDisabled: true, sortable: false, dataIndex: 'cpl', width: 50, renderer: cpl, editor: {allowBlank: false}},
                {header: 'CIES', menuDisabled: true, sortable: false, dataIndex: 'cies', width: 50, renderer: pintar},
                {header: 'CLA', menuDisabled: true, sortable: false, dataIndex: 'cla', width: 50, renderer: pintar},
                {header: 'Horas', menuDisabled: true, dataIndex: 'horas', sortable: false, width: 80, align: 'right',
                    editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0.0,
                            decimalPrecision:2,
                            decimalSeparator : '.',
                            maxValue: 190.6},
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        if(value>190.6){value=190.6;}
                        var fin = Ext.util.Format.number(value, '0.00');
                        return  fin;
                    }
                },
                {header: 'Vacaciones/Dias', menuDisabled: true, sortable: false, width: 125, dataIndex: 'vaca_dias',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        var dias= (record.get('horas'))*24/190.6;
                        var fin = Ext.util.Format.number((dias * 0.09083333333333333), '0.00') + ' dias';
                        if (fin>=2.18){return 2.18}
                        else
                        return  fin;
                    }
                },
                {header: 'Vacaciones/9.09', menuDisabled: true, sortable: false,hidden:true, width: 125, dataIndex: 'vaca_dine',
                   renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                       if(subtotal!=0 && subtotal!=null){
                        var fin = Ext.util.Format.number((subtotal * 0.0909), '0.000') + ' $';
                        return  fin;
                         }
                       else{
                           return value;
                       }
                   }
                },
                //{header: '<span class="kpercentage16">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Estimulación</span>', menuDisabled: true, sortable: false, dataIndex: 'ext', width: 115, editor: {allowBlank: false}},
                {header: 'Incremento', menuDisabled: true, sortable: false, dataIndex: 'Incremento', width: 100, renderer: cpl, editor: {allowBlank: false}},
                {header: 'Basico <br> Extra', menuDisabled: true, sortable: false, dataIndex: 'tnc', width: 80, renderer: cpl, editor: {allowBlank: false}},
                {header: 'Antiguedad <br> Formada', menuDisabled: true, sortable: false, dataIndex: 'ant_dinero', renderer: pintar, width: 100},
                {header: 'Antiguedad <br> Real Mes', menuDisabled: true, sortable: false, dataIndex: 'ant', width: 100,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        var dias= (record.get('horas'))*24/190.6;
                        var fin = Ext.util.Format.number(((record.get('ant_dinero') / 24) * dias), '0.00') + ' $';
                        return  fin;
                    }
                },
                {header: 'Estimulacion <br>  Extra', menuDisabled: true, sortable: false, dataIndex: 'Ext_ext', renderer: cpl, width: 100, editor: {allowBlank: false}},
                {text: 'Sub-Total', dataIndex: 'total', width: 120,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #DFF2FE;';
                        var salario = record.get('salario');
                        var pago_adicion = record.get('pago_adicion');
                        var cpl = record.get('cpl');
                        var cies = record.get('cies');
                        var cla = record.get('cla');
                        var dias =(record.get('horas'))*24/190.6;
                        var ext = record.get('ext');
                        var otros = record.get('Incremento');
                        var tnc = record.get('tnc');
                        var ant = record.get('ant');
                        var Ext_ext = record.get('Ext_ext');
                        var check = record.get('check');
                        if (dias == '' || dias == 0 )
                        {
                            total = 0.00 + '$';
                            return  total;
                        }
                        else
                        {
                            var total = ((((salario + pago_adicion + cies + cla + tnc + ant + Ext_ext)/ 24) * dias)+((record.get('ant_dinero') / 24) * dias))+otros;
                        }
                        subtotal = total;
                       // var vacaciones = Ext.util.Format.number((subtotal * 0.0909), '0.000') + ' $';
                       // store.data.items[rowIdx].data.vaca_dine = vacaciones;
                        total = Ext.util.Format.number(total, '0.00');
                        store.data.items[rowIdx].data.total = total;
                       return  total;
                    }},
                {xtype: 'checkcolumn', text: 'Pago <br> Extra', dataIndex: 'check1', width: 80},
                {
                    xtype: 'actioncolumn',
                    text: 'Editar <br> Incidencias',
                    width: 100,
                    items: [{
                            iconCls: 'user_properties16',
                            tooltip: 'Edit',
                            handler: function(grid, rowIndex, colIndex) {

                                this.__data_store_incidencias = App.BuildJsonStore('ReporteIndicadores.ReporteIndicadores.CargarDatos_inc', {
                                    fields: [
                                        {name: 'id'},
                                        {name: 'dias', type: 'int'},
                                        {name: 'adicional', type: 'boolean', value: 'false'},
                                        {name: 'id_conf'},
                                        {name: 'nombre'},
                                        {name: 'condiciones_laborales_anormales', type: 'boolean'},
                                        {name: 'horario_regular', type: 'boolean'},
                                        {name: 'otros_pagos', type: 'boolean'},
                                        {name: 'resive_salario', type: 'boolean'},
                                        {name: 'basao_promedio_anterior', type: 'boolean'},
                                        {name: 'porciento_a_pagar'},
                                        {name: 'licencia_maternidad', type: 'boolean'},
                                        {name: 'prestacion_social', type: 'boolean'},
                                        {name: 'subsidio', type: 'boolean'},
                                        {name: 'antiguedad', type: 'boolean'},
                                        {name: 'estimulacion', type: 'boolean'},
                                        {name: 'capacidad_compra', type: 'boolean'},
                                        {name: 'pago_vacaciones', type: 'boolean'},
                                        {name: 'informar_en_ausentismo', type: 'boolean'},
                                        {name: 'afecta_ausentismo', type: 'boolean'},
                                        {name: 'tiempo_no_laborable', type: 'boolean'},
                                        {name: 'tiempo_perdido', type: 'boolean'},
                                        {name: 'tiempo_vacaciones', type: 'boolean'},
                                        {name: 'acumula_tajetasnc', type: 'boolean'},
                                        {name: 'devengado_mes', type: 'boolean'},
                                        {name: 'devengado_trabajado', type: 'boolean'},
                                        {name: 'aporta_seguriad_social', type: 'boolean'},
                                        {name: 'mantener_reporte', type: 'boolean'},
                                        {name: 'cla', type: 'int'},
                                        {name: 'Sub_Total'},
                                        {name: 'pagos', type: 'int'},
                                        {name: 'antiguedad_new', type: 'int'},
                                        {name: 'estimulacion_new', type: 'int'},
                                        {name: 'basao_promedio_anterior_new', type: 'int'},
                                        {name: 'excluir_reporte', type: 'boolean'}
                                    ],
                                    pageSize: 100,
                                    proxy: {
                                        type: 'ajax',
                                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                                    },
                                    autoLoad: true
                                });
                                var rec = grid.getStore().getAt(rowIndex);
                              //  console.log(rec);
                                var contratoid = rec.data.contratoid
                                var trab_nomb = rec.data.trabajador_nombre_completo
                                var horas = rec.data.horas
                                var mywin_dos_ = Ext.create('Ext.window.Window', {
                                    title: 'Incidencias referentes al trabajador:' + trab_nomb,
                                    closable: true,
                                    width: '98%',
                                    minWidth: 350,
                                    modal: true,
                                    height: '95%',
                                    tools: [{type: 'pin'}],
                                    layout: 'border',
                                    id:'window_incidencias',
//                                    layout: {type: 'border'},
                                    items: [
                                        {
                                            region: 'west',
                                            title: 'Base de Cálculo',
                                            width: 400,
                                            autoScroll: true,
                                            border: true,
                                            collapsible: true,
                                            collapsed: true,
                                            floatable: false,
                                            items: [

                                                //========Accidente de Trabajo(80%)==========================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Trabajo(80%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_Trabj80',
                                                                            id: 'S_acum_Trabj80',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_Trabj80').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_Trabj80').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_Trabj80').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;
                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12315')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_Trabj80',
                                                                            id: 'D_acum_Trabj80',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_Trabj80').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_Trabj80').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_Trabj80').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12315')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_Trabj80',
                                                                            id: 'S_prom_Trabj80',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },
                                                //========Accidente de Trabajo(70%)==========================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Trabajo(70%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_Trabj70',
                                                                            id: 'S_acum_Trabj70',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                blur: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    var dias_acu = Ext.getCmp('D_acum_Trabj70').getValue();
                                                                                    This.focus(true, true);
                                                                                    if (dias_acu == '' || This.value == '') {
                                                                                        Ext.getCmp('S_prom_Trabj70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = This.value / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_Trabj70').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12317')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_Trabj70',
                                                                            id: 'D_acum_Trabj70',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                blur: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_Trabj70').getValue();
                                                                                    if (S_acum == '' || This.value  == '') {
                                                                                        Ext.getCmp('S_prom_Trabj70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        var uuu = Ext.util.Format.round(parseFloat(This.value  / 24), 0);
                                                                                        prom = S_acum / uuu;
                                                                                        Ext.getCmp('S_prom_Trabj70').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;
                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            if (id_stoter == 'DE_capital_humano_12317')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_Trabj70',
                                                                            id: 'S_prom_Trabj70',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            decimalSeparator: '.',
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },

                                                //========Enfermedades de mas de 3 dias 60%==================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Enfermedad mas de 3 dias(60%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum',
                                                                            id: 'S_acum',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12318')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum',
                                                                            id: 'D_acum',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12318')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom',
                                                                            id: 'S_prom',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },
                                                //========Enfermedades de mas de 3 dias 50%==================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Enfermedad mas de 3 dias(50%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_50',
                                                                            id: 'S_acum_50',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_50').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_50').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_50').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12319')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_50',
                                                                            id: 'D_acum_50',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_50').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_50').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_50').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12319')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_50',
                                                                            id: 'S_prom_50',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },

                                                //========Accidente de Trayecto(70%)=========================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Trayecto(70%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                       {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_Trayect70',
                                                                            id: 'S_acum_Trayect70',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_Trayect70').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_Trayect70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_Trayect70').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12340')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_Trayect70',
                                                                            id: 'D_acum_Trayect70',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_Trayect70').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_Trayect70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_Trayect70').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12340')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_Trayect70',
                                                                            id: 'S_prom_Trayect70',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },
                                                //========Accidente de Trayecto(80%)=========================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Trayecto(80%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_Trayect80',
                                                                            id: 'S_acum_Trayect80',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_Trayect80').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_Trayect80').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_Trayect80').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12339')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_Trayect80',
                                                                            id: 'D_acum_Trayect80',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_Trayect80').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_Trayect80').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_Trayect80').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12339')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_Trayect80',
                                                                            id: 'S_prom_Trayect80',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },

                                                //========Accidente de Equiparado(70%)=======================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Equiparado(70%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_equip70',
                                                                            id: 'S_acum_equip70',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_equip70').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_equip70').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12342')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_equip70',
                                                                            id: 'D_acum_equip70',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_equip70').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_equip70').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12342')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_equip70',
                                                                            id: 'S_prom_equip70',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },
                                                //========Accidente de Equiparado(80%)=======================//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Equiparado(80%)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_equip80',
                                                                            id: 'S_acum_equip80',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_equip80').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip80').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_equip80').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12341')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_equip80',
                                                                            id: 'D_acum_equip80',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_equip80').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip80').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_equip80').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12341')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_equip80',
                                                                            id: 'S_prom_equip80',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },

                                                //========Accidente de Equiparado(80% Anticipado)============//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Equiparado(80% Anticipado)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_equip80_A',
                                                                            id: 'S_acum_equip80_A',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_equip80_A').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip80_A').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_equip80_A').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12391')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_equip80_A',
                                                                            id: 'D_acum_equip80_A',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_equip80_A').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip80_A').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_equip80_A').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12391')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_equip80_A',
                                                                            id: 'S_prom_equip80_A',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },
                                                //========Accidente de Trayecto (80% Anticipado)=============//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Trayecto (80% Anticipado)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_equip80_AZ',
                                                                            id: 'S_acum_equip80_AZ',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_equip80_AZ').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip80_AZ').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_equip80_AZ').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12382')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_equip80_AZ',
                                                                            id: 'D_acum_equip80_AZ',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_equip80_AZ').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip80_AZ').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_equip80_AZ').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12382')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_equip80_AZ',
                                                                            id: 'S_prom_equip80_AZ',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                },
                                                //========Accidente de Trayecto (70% Anticipado)=============//
                                                {
                                                    xtype: 'fieldset',
                                                    title: 'Accidente de Trayecto (70% Anticipado)',
                                                    checkboxToggle: true,
                                                    collapsed: true,
                                                    width: '98%',
                                                    margin: 2,
                                                    layout: 'anchor',
                                                    items: [
                                                        {
                                                            xtype: 'fieldset',
                                                            columnWidth: 0.5,
                                                            title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                            checkboxToggle: true,
                                                            collapsed: true,
                                                            defaultType: 'numberfield',
                                                            //defaults: {anchor: '100%'},
                                                            layout: 'anchor',
                                                            items: [
                                                                {
                                                                    xtype: 'panel',
                                                                    layout: {
                                                                        type: 'vbox',
                                                                        align: 'stretch'
                                                                    },
                                                                    items: [
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Acumulado',
                                                                            name: 'S_acum_equip70_AZ',
                                                                            id: 'S_acum_equip70_AZ',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var dias_acu = Ext.getCmp('D_acum_equip70_AZ').getValue();
                                                                                    if (dias_acu == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip70_AZ').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = newValue / (dias_acu / 24);
                                                                                        Ext.getCmp('S_prom_equip70_AZ').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12382')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }

                                                                                    }
                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Dias Acumulado',
                                                                            name: 'D_acum_equip70_AZ',
                                                                            id: 'D_acum_equip70_AZ',
                                                                            hideLabel: false,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3,
                                                                            listeners: {
                                                                                change: function(This, newValue, oldValue, eOpts) {
                                                                                    var prom = 0;
                                                                                    This.focus(true, true);
                                                                                    var S_acum = Ext.getCmp('S_acum_equip70_AZ').getValue();
                                                                                    if (S_acum == '' || newValue == '') {
                                                                                        Ext.getCmp('S_prom_equip70_AZ').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                        prom = S_acum / (newValue / 24);
                                                                                        Ext.getCmp('S_prom_equip70_AZ').setValue(prom);
                                                                                        var storeM = Ext.getCmp('incidencias_conf').store;

                                                                                        for (var i = 0; i < storeM.count(); i++) {
                                                                                            var id_stoter = storeM.data.items[i].data.id;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                            if (id_stoter == 'DE_capital_humano_12382')
                                                                                            {
                                                                                                var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                                var cal = Ext.util.Format.number(ppp, '0.00')
                                                                                                storeM.data.items[i].data.Sub_Total = cal;
                                                                                                Ext.getCmp('incidencias_conf').getView().refresh();
                                                                                            }
                                                                                        }
                                                                                    }

                                                                                }
                                                                            }
                                                                        },
                                                                        {
                                                                            xtype: 'numberfield',
                                                                            fieldLabel: 'Salario Promedio',
                                                                            name: 'S_prom_equip70_AZ',
                                                                            id: 'S_prom_equip70_AZ',
                                                                            hideLabel: false,
                                                                            disable: true,
                                                                            labelWidth: 150,
                                                                            width: 145,
                                                                            margin: 3
                                                                        }
                                                                    ]
                                                                }

                                                            ]
                                                        }
                                                    ]
                                                }


                                            ]
                                        },
                                        {
                                            region: 'center',
                                            xtype: 'grid',
                                            border: true,
                                            id: 'incidencias_conf',
                                            name: 'incidencias_conf',
                                            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
                                            columns: [
                                                {header: 'id', dataIndex: 'id', width: 290},
                                                {header: 'Incidencia', dataIndex: 'nombre', width: 290,locked: true},
                                                {header: 'Dias', dataIndex: 'dias', flex:1, editor: {allowBlank: false},
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        if(record.data.id == 'DE_capital_humano_12362'){
                                                            if(rec.data.dias_vacaciones < value){
                                                                record.data.dias = Ext.util.Format.round(parseFloat(rec.data.dias_vacaciones),0);
                                                                record.data.Sub_Total = Ext.util.Format.round(parseFloat(record.data.dias)/parseFloat(rec.data.dias_vacaciones)*parseFloat(rec.data.importe_vacaciones),2);
                                                                record.data.porciento_a_pagar = '100';
                                                                return record.data.dias//rec.data.dias_vacaciones;
                                                            }
                                                            else
                                                                return value;
                                                        } 
                                                        else
                                                                return value;
                                                    }},
                                                {header: 'CLA', dataIndex: 'cla', flex:1, editor: {allowBlank: false},
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        var mio = record.get('condiciones_laborales_anormales');
                                                        if (mio == true) {
                                                            metaData.style = 'font-style:italic !important;background: #51A351;margin:1px;';
                                                            return  value;
                                                        }
                                                        else {
                                                            metaData.style = 'font-style:italic !important;background: #f5f5f5;margin:0px;';
                                                        }

                                                    }},
                                                {header: 'Otros Pagos', dataIndex: 'pagos', flex: 2, editor: {allowBlank: false},
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        var mio = record.get('otros_pagos');
                                                        if (mio == true) {
                                                            metaData.style = 'font-style:italic !important;background: #51A351;margin:1px;';
                                                            return  value;
                                                        }
                                                        else {
                                                            metaData.style = 'font-style:italic !important;background: #f5f5f5;margin:0px;';
                                                        }

                                                    }},
                                                {header: 'Antiguedad', dataIndex: 'antiguedad_new', flex: 2, editor: {allowBlank: false},
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        var mio = record.get('antiguedad');
                                                        if (mio == true) {
                                                            metaData.style = 'font-style:italic !important;background: #51A351;margin:1px;';
                                                            return  value;
                                                        }
                                                        else {
                                                            metaData.style = 'font-style:italic !important;background: #f5f5f5;margin:0px;';
                                                        }

                                                    }},
                                                {header: 'Estimulación', dataIndex: 'estimulacion_new', flex: 2, editor: {allowBlank: false},
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        var mio = record.get('estimulacion');
                                                        if (mio == true) {
                                                            metaData.style = 'font-style:italic !important;background: #51A351;margin:1px;';
                                                            return  value;
                                                        }
                                                        else {
                                                            metaData.style = 'font-style:italic !important;background: #f5f5f5;margin:0px;';
                                                        }

                                                    }},
                                                {header: 'Basico', dataIndex: 'basao_promedio_anterior_new', flex: 1, editor: {allowBlank: false},
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        var mio = record.get('basao_promedio_anterior');
                                                        if (mio == true) {
                                                            metaData.style = 'font-style:italic !important;background: #51A351;margin:1px;';
                                                            return  value;
                                                        }
                                                        else {
                                                            metaData.style = 'font-style:italic !important;background: #f5f5f5;margin:0px;';
                                                        }

                                                    }},
                                                {header: '% Pago', dataIndex: 'porciento_a_pagar', flex: 1, hidden: false,
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        metaData.style = 'font-style:italic !important;background: #f5f5f5;margin:1px;';
                                                        if(record.data.id == 'DE_capital_humano_12362'){                                                                                                                           
                                                                record.data.porciento_a_pagar = '100';
                                                                return record.data.porciento_a_pagar                                                            
                                                        }
                                                            else
                                                                return value;
                                                    }},
                                                {header: 'Sub-Total', dataIndex: 'Sub_Total', flex: 2, hidden: false, decimalSeparator: '.',
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        metaData.style = 'font-style:italic !important;background: #7398FE;margin:1px;';
                                                        if(record.data.id == 'DE_capital_humano_12362'){                                                               
                                                            record.data.Sub_Total = Ext.util.Format.round(parseFloat(record.data.dias)/parseFloat(rec.data.dias_vacaciones)*parseFloat(rec.data.importe_vacaciones),2);
                                                            return record.data.Sub_Total;
                                                        }
                                                        else
                                                            return value;
                                                    }},
                                                {xtype: 'checkcolumn', text: 'Pago <br> Extra', dataIndex: 'adicional', width: 60},
                                                //=================================================================
                                                {header: 'CLA', dataIndex: 'condiciones_laborales_anormales', hidden: true},
                                                {header: 'Otros Pagos', dataIndex: 'otros_pagos', hidden: true},
                                                {header: 'Antiguedad', dataIndex: 'antiguedad', hidden: true},
                                                {header: 'Estimulación', dataIndex: 'estimulacion', hidden: true},
                                                {header: 'Basico', dataIndex: 'basao_promedio_anterior', hidden: true}
                                                //=================================================================
                                            ],
                                            store: this.__data_store_incidencias,
                                            bbar: {
                                                id: 'bbar_inc',
                                                items: [{
                                                        xtype: 'pagingtoolbar',
                                                        pageSize: 100,
                                                        store: this.__data_store_incidencias,
                                                        displayInfo: true,
                                                        plugins: new Ext.ux.ProgressBarPager()
                                                    }],
                                                height: 35
                                            }
                                        }],
                                    buttons: [
                                        {xtype: 'button',
                                            iconCls: 'document_save_all16',
                                            text: 'Terminar',
                                            handler:function(){
//                                              var mydd =new Array();
                                                var _array = new Array();
                                                var mydd = Ext.getCmp('incidencias_conf').getStore().getModifiedRecords();
                                                if (mydd.length === 0)
                                                {
                                                    App.InfoMessage('Información', 'No ha modificado fila alguna para las incidencias de:' + trab_nomb);
                                                }
                                                else
                                                {
                                                    var misHoras='';
                                                    for (var i = 0; i < mydd.length; i++) {
                                                        var elemento = mydd[i].getData();
                                                        elemento.contratoid = rec.data.contratoid;
                                                        _array.push(elemento);
                                                    }
                                                    for(var i =0; i<elemento.length;i++){
                                                        misHoras+=_array[i].dias;
                                                    }
                                                   var aa=  misHoras+horas;
                                                    console.log(_array);
                                                    console.log(aa);
                                                    var fnCallBack = function() {
                                                        var _result_bus = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Buscar', {contratoid: contratoid});
                                                        if (_result_bus.results > 0) {
                                                            var fnCallBack_after = function() {
                                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                                var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add_inc', {data: Ext.encode(_array), contratoid: contratoid});
                                                                App.HideMsgBox();
                                                                if (_result)
                                                                {
                                                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                                }
                                                                else
                                                                {
                                                                    App.InfoMessage('Información', 'Ocurrio un error');
                                                                }
                                                            }
                                                            App.ConfirmMessage(fnCallBack_after, 'Ya se ha calculado las incidencias para el trabajador ' + trab_nomb + '. ¿Está seguro que desea recalcular los datos? Se perderan los datos almacenados anteriormente.');
                                                        }
                                                        else {
                                                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                            var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add_inc', {data: Ext.encode(_array), contratoid: contratoid});
                                                            App.HideMsgBox();
                                                            if (_result)
                                                            {
                                                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                            }
                                                            else
                                                            {
                                                                App.InfoMessage('Información', 'Ocurrio un error');
                                                            }
                                                        }
                                                    }
                                                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                                }

                                            }
                                        },
                                        {text: 'Cancelar', handler: function() {
                                                mywin_dos_.close();
                                            }
                                        }]
                                });
                                mywin_dos_.show();
                            }
                        }]
                }
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
                        var mes = Ext.getCmp('mes').getValue();
                        var anno= Ext.getCmp('anno').getValue();
                        if(mes!='' && anno !=''&& mes!=null && anno !=null){
                            var result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Cobro',{mes:mes,anno:anno});
                            var store  = Ext.getCmp('prenom_grid').store;
                            if(result.rows!=false){
                                for(var i=0;i<store.count();i++){
                                    var id_stote_contratoid = store.data.items[i].data.contratoid;
                                    var id_stote = store.data.items[i].data.id_tabaj;
                                    store.data.items[i].data.horas ='0';
                                    for(var e=0; e < result.rows.length;e++){
                                      if(   id_stote_contratoid == result.rows[e].id_contrato && id_stote == result.rows[e].trabajador_id)
                                        {
                                            store.data.items[i].data.horas = result.rows[e].horas;
                                            store.data.items[i].data.id_prenomina = result.rows[e].id;
                                        }
                                    }
                                }
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
                    console.log(Ext.getCmp('prenom_grid'));/*
                    Ext.getCmp('prenom_grid').collapseAll();*/
                }
            }
        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Puesto por Área',
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
App.RegisterModule('ReporteIndicadores', new ReporteIndicadores());