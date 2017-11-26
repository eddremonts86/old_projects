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
                {name: 'Incremento',type: 'number'},
                {name: 'identidad',type: 'number'},
                {name: 'ant_dinero',type: 'number'},
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
            met.style = 'font-style:italic !important;background: #7398FE;';
            return val2;
        }
        function cpl(val2, met, record, a, b, c, d) {
            met.style = 'font-style:italic !important;background: #51A351;';
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
                {header: 'CPL', menuDisabled: true, sortable: false, dataIndex: 'cpl', width: 60, renderer: cpl,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0,
                        decimalPrecision:0,
                        decimalSeparator : '.',
                        maxValue: 2}
                },
                {header: 'CIES ($)', menuDisabled: true, sortable: false, dataIndex: 'cies', width: 70, renderer: pintar},
                {header: 'CLA ($)', menuDisabled: true, sortable: false, dataIndex: 'cla', width: 60, renderer: pintar},
                {header: 'Exitimulación(%)',hideable : true, menuDisabled: true, sortable: false, dataIndex: 'estimulo', width: 120,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0.0,
                        decimalPrecision:2,
                        decimalSeparator : '.',
                        maxValue: 100},
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        return  value;}
                },
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
                        var horas = record.get('horas');
                        var salario = record.get('salario');
                        var porciento = record.get('estimulo');
                        var pago_adicion = record.get('pago_adicion');
                        var cpl = record.get('cpl');
                        var cies = record.get('cies');
                        var cla = record.get('cla');
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
                        if (dias == '' || dias == 0 ){
                            var fin = Ext.util.Format.number(value, '0.00');
                            return  fin;
                        }
                        else{
                            total = ((((salario + pago_adicion + cies + cla + tnc)/ 24) * dias)+ant_real);
                            console.log(
                                    'salario ='+salario+'\n'+
                                    'ant_ ='+ant_+'\n'+
                                    'pago_adicion ='+pago_adicion+'\n' +'tnc ='+tnc+'\n' +'ant ='+ant+'\n' +
                                    'dias ='+dias+'\n' +'ant_real ='+ant_real+'\n' +'cies ='+cies+'\n' +'cla ='+cla+'\n');
                            console.log(total);
                            var estimulo = total * (porciento/100);
                            total = total + estimulo + Ext_ext;
                            console.log("--------------------------------------")
                            console.log('estimulo = '+estimulo+'\n'+'porciento = '+porciento+'\n' +'Ext_ext = '+Ext_ext+'\n');
                            console.log(total);
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
                            console.log("--------------------------------------")
                            console.log(vaca_dine)
                            console.log(total)
                            console.log("-------------------------------------->>>>>>>>>>>")
                            record.data.horas_dias = Ext.util.Format.number(dias, '0');
                            record.data.vaca_dias = Ext.util.Format.number(vaca_dias, '0.0');
                            record.data.extiml = Ext.util.Format.number(estimulo, '0.0');
                            record.data.vaca_dine = Ext.util.Format.number(vaca_dine, '0.0');
                            record.data.pent_ext = Ext.util.Format.number(pent_ant, '0.0');
                            record.data.pent_ant = Ext.util.Format.number(pent_ext, '0.0');
                            record.data.ant = ant_real;
                            record.data.total = Ext.util.Format.number(total, '0.0');
                            var fin = Ext.util.Format.number(value, '0.00');
                            return  fin;
                        }
                    }
                },
                {header: 'Dias', menuDisabled: true, sortable: false, width: 125, dataIndex: 'horas_dias',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        return  value;
                    }},
                {header: 'Estimulacion ($)', menuDisabled: true, sortable: false, width: 135, dataIndex: 'extiml',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                    metaData.style = 'font-style:italic !important;background: #7398FE;';
                    return  value;
                }},
                {header: 'Vacaciones/Dias', menuDisabled: true, sortable: false, width: 125, dataIndex: 'vaca_dias',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        return  value;
                    }},
                {header: 'Vacaciones/9.09 ($)', menuDisabled: true, sortable: false,hidden:false, width: 135, dataIndex: 'vaca_dine',
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        var tipo_contrato = record.get('tipo_contrato');
                        if(tipo_contrato=='DE_capital_humano_766'){
                            metaData.style = 'font-style:italic !important;background: #7398FE;color:red;';
                        }
                        return value;
                   }
                },
                {header: 'CDT', menuDisabled: true, sortable: false, dataIndex: 'cdt', width: 100,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0,
                        decimalPrecision:0,
                        decimalSeparator : '.',
                        maxValue: 100},
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            return  value;}
                },
                {header: 'Penalizacion Ant ($)', menuDisabled: true, sortable: false, dataIndex: 'pent_ant', width: 160,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        if(value!='0'||value!=0.0||value!=0){metaData.style = 'font-style:italic !important;background: #7398FE;color:red;';}
                        return value;
                    }
                },
                {header: 'Penalizacion Ext ($)', menuDisabled: true, sortable: false, dataIndex: 'pent_ext', width: 160,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        if(value!='0'||value!=0.0||value!=0){metaData.style = 'font-style:italic !important;background: #7398FE;color:red;';}
                        return value;
                    }
                },
                {header: 'Basico <br> Extra ($)', menuDisabled: true, sortable: false, dataIndex: 'tnc', width: 90, renderer: pintar},
                {header: 'Antiguedad <br> Formada ($)', menuDisabled: true, sortable: false, dataIndex: 'ant_dinero', renderer: pintar, width: 110},
                {header: 'Antiguedad <br> Real Mes ($)', menuDisabled: true, sortable: false, dataIndex: 'ant', width: 110,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #7398FE;';
                        return  Ext.util.Format.number(value, '0.0');;
                    }},
                {header: 'Estimulación Extra  <br> o Incremento ($)', menuDisabled: true, sortable: false, dataIndex: 'otos', width: 140,
                    editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0.0,
                        decimalPrecision:2,
                        decimalSeparator : '.'
                        },
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            return  value;
                    }},
                {text: 'Sub-Total ($)', dataIndex: 'total', width: 130,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        metaData.style = 'font-style:italic !important;background: #DFF2FE;';
                       return  value;
                    }},
                {xtype: 'checkcolumn', text: 'Pago <br> Extra',width: 80},
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
                                        {name: 'id_prenom_inc'},
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
                                        {name: 'Sub_Total',type: 'number'},
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
                                var contratoid = rec.data.contratoid;
                                var trab_nomb = rec.data.trabajador_nombre_completo;
                                var horas = rec.data.horas;
                                var meses1 = new Ext.data.SimpleStore({
                                    fields: ['id', 'mes'],
                                    data : [['1','Enero'],['2','Febrero'],
                                        ['3','Marzo'],['4','Abril'],
                                        ['5','Mayo'],['6','Junio'],
                                        ['7','Julio'],['8','Agosto'],
                                        ['9','Septiembre'],['10','Octubre'],
                                        ['11','Noviembre'],['12','Diciembre']]
                                });
                                var mes1 =  Ext.create('Ext.form.ComboBox', {
                                    fieldLabel: 'Choose State',
                                    queryMode: 'local',
                                    width:150,
                                    id:'mes1',
                                    name:'mes1',
                                    store:meses1,
                                    displayField: 'mes',
                                    valueField: 'id',
                                    hideLabel:true

                                });
                                var anno1 =  new Ext.form.field.Number({
                                    anchor: '100%',
                                    name: 'anno1',
                                    id: 'anno1',
                                    hideLabel:true,
                                    width:150,
                                    fieldLabel: 'Bottles of Beer',
                                    value:2014,
                                    maxValue: 2025,
                                    minValue: 2007
                                });
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
                                                    {
                                                        xtype: 'fieldset',
                                                        title: 'Calcular el Salario Acumulado segun pagos realizados',
                                                        checkboxToggle: true,
                                                        collapsed: false,
                                                        id:'collap',
                                                        name:'collap',
                                                        width: '98%',
                                                        margin: 2,
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
                                                                            id:'name_html',
                                                                            name:'name_html',
                                                                            title:'Debe hacer clic sobre alguna incidencia.'
                                                                           },
                                                                        {
                                                                            id:'name_id',
                                                                            name:'name_id',
                                                                            xtype:'textfield',
                                                                            hidden:true
                                                                        },
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
                                                                                    var i = Ext.getCmp('name_id').getValue();
                                                                                    This.focus(true, true);
                                                                                    if (dias_acu == '' || This.value == '') {
                                                                                        Ext.getCmp('S_prom_Trabj70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                       prom = This.value / (dias_acu/24);
                                                                                       Ext.getCmp('S_prom_Trabj70').setValue(prom);
                                                                                       var storeM = Ext.getCmp('incidencias_conf').store;
                                                                                       console.log(storeM);
                                                                                       var id_stoter = storeM.data.items[i].data.id;
                                                                                       var dias_stoter = storeM.data.items[i].data.dias;
                                                                                       var cla = storeM.data.items[i].data.cla;
                                                                                       var pagos = storeM.data.items[i].data.pagos;
                                                                                       var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                       var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                       var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                       var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                       var total_stoter = storeM.data.items[i].data.Sub_Total;
                                                                                       var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                       var cal = Ext.util.Format.number(ppp, '0.00');
                                                                                       storeM.data.items[i].data.Sub_Total = cal;
                                                                                       Ext.getCmp('incidencias_conf').getView().refresh();
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
                                                                                    var i = Ext.getCmp('name_id').getValue();
                                                                                    if (S_acum == '' || This.value  == '') {
                                                                                        Ext.getCmp('S_prom_Trabj70').setValue(0);
                                                                                    }
                                                                                    else {
                                                                                            var uuu = Ext.util.Format.round(parseFloat(This.value  / 24), 0);
                                                                                            prom = S_acum / uuu;
                                                                                            Ext.getCmp('S_prom_Trabj70').setValue(prom);
                                                                                            var storeM = Ext.getCmp('incidencias_conf').store;
                                                                                            var dias_stoter = storeM.data.items[i].data.dias;
                                                                                            var cla = storeM.data.items[i].data.cla;
                                                                                            var pagos = storeM.data.items[i].data.pagos;
                                                                                            var antig = storeM.data.items[i].data.antiguedad_new;
                                                                                            var estim = storeM.data.items[i].data.estimulacion_new;
                                                                                            var basic = storeM.data.items[i].data.basao_promedio_anterior_new;
                                                                                            var porciento = storeM.data.items[i].data.porciento_a_pagar;
                                                                                            var ppp = (((prom / 24) * (porciento / 100)) * dias_stoter) + cla + pagos + antig + estim + basic;
                                                                                            var cal = Ext.util.Format.number(ppp, '0.00');
                                                                                            storeM.data.items[i].data.Sub_Total = cal;
                                                                                            Ext.getCmp('incidencias_conf').getView().refresh();
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
                                        {
                                            region: 'center',
                                            xtype: 'grid',
                                            border: true,
                                            id: 'incidencias_conf',
                                            name: 'incidencias_conf',
                                            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
                                            columns: [
                                                {header: 'id', dataIndex: 'id', width: 290,hidden:true},
                                                {xtype: 'actioncolumn',
                                                    text: 'Editar',
                                                    width: 50,
                                                    items: [{
                                                    iconCls: 'user_properties16',
                                                    tooltip: 'Edit',
                                                    handler: function(grid, rowIndex, colIndex,record ) {
                                                        var stor = Ext.getCmp('incidencias_conf').store;
                                                        var pagos = stor.data.items[rowIndex].data.porciento_a_pagar;
                                                        var nombre = stor.data.items[rowIndex].data.nombre;
                                                        Ext.getCmp('name_html').setTitle('Incidencia: '+nombre);
                                                        var i=rowIndex;
                                                        Ext.getCmp('name_id').setValue(i);
                                                        Ext.getCmp('S_acum_Trabj70').setValue(0);
                                                        Ext.getCmp('D_acum_Trabj70').setValue(0);
                                                        Ext.getCmp('S_prom_Trabj70').setValue(0);

                                                    }
                                                    }]
                                                },
                                                {header: 'Incidencia', dataIndex: 'nombre', flex:1},
                                                {header: 'Dias', dataIndex: 'dias',  width: 50, editor: {allowBlank: false},
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        //console.log(rec.data.dias_vacaciones);
                                                         if(record.data.id == 'DE_capital_humano_12362'){
                                                           /* if(rec.data.dias_vacaciones>0 && record.data.dias == 0){
                                                                var fnCallBack = function(){
                                                                    console.log(rec.data.dias_vacaciones);
                                                                    record.data.dias = Ext.util.Format.round(parseFloat(rec.data.dias_vacaciones),0);
                                                                    record.data.Sub_Total = Ext.util.Format.round(parseFloat(record.data.dias)/parseFloat(rec.data.dias_vacaciones)*parseFloat(rec.data.importe_vacaciones),2);
                                                                    console.log(record.data.dias);
                                                                    return record.data.dias;
                                                                 }
                                                                App.ConfirmMessage(fnCallBack, 'Los dias aviles de vacaciones que tiene <b>'+rec.data.trabajador_nombre_completo+'</b> son <b> '+rec.data.dias_vacaciones+'</b>¿Desea realizar su liquidación?');

                                                                //return value;
                                                            }
                                                            else*/
                                                            if(rec.data.dias_vacaciones < value){
                                                                record.data.dias = Ext.util.Format.round(parseFloat(rec.data.dias_vacaciones),0);
                                                                record.data.Sub_Total = Ext.util.Format.round(parseFloat(record.data.dias)/parseFloat(rec.data.dias_vacaciones)*parseFloat(rec.data.importe_vacaciones),2);
                                                                record.data.porciento_a_pagar = '100';
                                                                value = record.data.dias
                                                                return value
                                                            }
                                                            else { return value;}
                                                         }
                                                         else {
                                                             return value;
                                                         }
                                                    }
                                                },
                                                {header: 'CLA', dataIndex: 'cla',  width: 90, editor: {allowBlank: false},
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
                                                {header: 'Otros Pagos', dataIndex: 'pagos',  width: 150, editor: {allowBlank: false},
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
                                                {header: 'Antiguedad', dataIndex: 'antiguedad_new',  width: 100, editor: {allowBlank: false},
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
                                                {header: 'Estimulación', dataIndex: 'estimulacion_new',  width: 100, editor: {allowBlank: false},
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
                                                {header: 'Basico', dataIndex: 'basao_promedio_anterior_new',  width: 90, editor: {allowBlank: false},
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
                                                {header: '% Pago', dataIndex: 'porciento_a_pagar',  width: 80, hidden: false,
                                                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        metaData.style = 'font-style:italic !important;background: #f5f5f5;margin:1px;';
                                                        if(record.data.id == 'DE_capital_humano_12362'){
                                                                record.data.porciento_a_pagar = '100';
                                                                return record.data.porciento_a_pagar
                                                        }
                                                            else
                                                                return value;
                                                    }},
                                                {header: 'Sub-Total', dataIndex: 'Sub_Total',  width: 80, hidden: false,
                                                  editor: {
                                                        xtype: 'numberfield',
                                                        allowBlank: false,
                                                        minValue: 0.00,
                                                        decimalPrecision:3,
                                                        decimalSeparator : '.'
                                                    },
                                                  renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                                        metaData.style = 'font-style:italic !important;background: #7398FE;margin:1px;';
                                                        if(record.data.id == 'DE_capital_humano_12362'){
                                                            record.data.Sub_Total = Ext.util.Format.round(parseFloat(record.data.dias)/parseFloat(rec.data.dias_vacaciones)*parseFloat(rec.data.importe_vacaciones),2);
                                                            return record.data.Sub_Total;
                                                        }
                                                        else
                                                            return value;
                                                    }},
                                                {xtype: 'checkcolumn', text: 'Pago Extra', dataIndex: 'adicional', width: 100},
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
                                                    items: [
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            pageSize: 100,
                                                            store: this.__data_store_incidencias,
                                                            displayInfo: true,
                                                            plugins: new Ext.ux.ProgressBarPager()
                                                        },
                                                        '->', mes1,anno1,
                                                        {  xtype: 'button',
                                                            text : 'Buscar',
                                                            hideLabel:true,
                                                            iconCls:'edit_find_user16',
                                                            handler:function(){
                                                                var mes = Ext.getCmp('mes1').getValue();
                                                                var anno= Ext.getCmp('anno1').getValue();
                                                                if(mes!='' && anno !=''&& mes!=null && anno !=null){
                                                                    var store_gen  = Ext.getCmp('prenom_grid').store;
                                                                    var store  = Ext.getCmp('incidencias_conf').store;
                                                                    var id_cont = store_gen.data.items[rowIndex].data.contratoid;
                                                                    var result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.incView',{mes:mes,anno:anno,id_cont:id_cont});
                                                                    for(var i=0;i<store.count();i++){
                                                                        store.data.items[i].data.dias = 0;
                                                                        store.data.items[i].data.extim = 0;
                                                                        store.data.items[i].data.antiguedad = 0;
                                                                        store.data.items[i].data.basico = 0;
                                                                        store.data.items[i].data.cla = 0;
                                                                        store.data.items[i].data.o_pagos = 0;
                                                                        store.data.items[i].data.porcientos_pagos = 0;
                                                                        store.data.items[i].data.Sub_Total = 0;
                                                                        store.data.items[i].data.id_prenom_inc = '';
                                                                    }
                                                                    if(result.rows!=false){
                                                                        for(var i=0;i<store.count();i++){
                                                                            var id_stote_contratoid = store.data.items[i].data.id;
                                                                            for(var e=0; e < result.rows.length;e++){
                                                                                if(id_stote_contratoid == result.rows[e].incid_id)
                                                                                {
                                                                                    store.data.items[i].data.dias = result.rows[e].dias;
                                                                                    store.data.items[i].data.extim = result.rows[e].extim;
                                                                                    store.data.items[i].data.antiguedad = result.rows[e].antiguedad;
                                                                                    store.data.items[i].data.basico = result.rows[e].basico;
                                                                                    store.data.items[i].data.cla = result.rows[e].cla;
                                                                                    store.data.items[i].data.o_pagos = result.rows[e].o_pagos;
                                                                                    store.data.items[i].data.porcientos_pagos = result.rows[e].porcientos_pagos;
                                                                                    store.data.items[i].data.Sub_Total = result.rows[e].total;
                                                                                    store.data.items[i].data.id_prenom_inc = result.rows[e].id;
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                        Ext.getCmp('incidencias_conf').getView().refresh();
                                                                    }
                                                                    else{
                                                                        App.InfoMessage('Información', 'No existen datos en este rango de tiempo');
                                                                        Ext.getCmp('incidencias_conf').store.load();
                                                                    }
                                                                }
                                                                else{
                                                                    App.InfoMessage('Información', 'Debe dar una fecha valida');
                                                                }
                                                               Ext.getCmp('update').show();
                                                               Ext.getCmp('Terminar').hide();
                                                            }
                                                        }
                                                    ],
                                                    height: 35
                                                  },
                                            listeners:{}
                                        }],
                                    buttons: [
                                        {xtype: 'button',
                                            iconCls: 'document_save_all16',
                                            id:'Terminar',
                                            name:'Terminar',
                                            text: 'Terminar',
                                            handler:function(){
//                                              var mydd =new Array();
                                                var _array = new Array();
                                                var mes1 = Ext.getCmp('mes').getValue();
                                                var anno1 = Ext.getCmp('anno').getValue();
                                                var mydd = Ext.getCmp('incidencias_conf').getStore().getModifiedRecords();

                                                if (mydd.length === 0){
                                                    App.InfoMessage('Información', 'No ha modificado fila alguna para las incidencias de:' + trab_nomb);
                                                }
                                                else{
                                                    var misHoras='';
                                                    for (var i = 0; i < mydd.length; i++) {
                                                        var elemento = mydd[i].getData();
                                                        elemento.contratoid = rec.data.contratoid;
                                                        _array.push(elemento);
                                                    }
                                                    for(var i =0; i<elemento.length;i++){
                                                        misHoras+=_array[i].dias;
                                                    }
                                                    var fnCallBack = function() {
                                                        var _result_bus = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Buscar', {contratoid: contratoid,mes:mes1,anno:anno1});
                                                        if (_result_bus.results > 0) {
                                                            var fnCallBack_after = function() {
                                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

                                                                var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add_inc', {data: Ext.encode(_array),mes:mes1,anno:anno1, contratoid: contratoid});
                                                                App.HideMsgBox();
                                                                if (_result){
                                                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                                }
                                                                else{
                                                                    App.InfoMessage('Información', 'Ocurrio un error');
                                                                }
                                                            }
                                                            App.ConfirmMessage(fnCallBack_after, 'Ya se ha calculado las incidencias para el trabajador ' + trab_nomb + '. ¿Está seguro que desea recalcular los datos? Se perderan los datos almacenados anteriormente.');
                                                        }
                                                        else {
                                                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

                                                            var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add_inc', {data: Ext.encode(_array),mes:mes1,anno:anno1, contratoid: contratoid});
                                                            App.HideMsgBox();
                                                            if (_result){
                                                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                            }
                                                            else{
                                                                App.InfoMessage('Información', 'Ocurrio un error');
                                                            }
                                                        }
                                                    }
                                                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                                }

                                            }
                                        },
                                        {   text: 'Actualizar',
                                            cls:'btn-warning',
                                            iconCls: 'document_save_all16',
                                            hidden:true,
                                            id:'update',
                                            name:'update',
                                            handler:function(){
//                                                  var mydd =new Array();
                                                    var _array = new Array();
                                                    var mes1 = Ext.getCmp('mes1').getValue();
                                                    var anno1 = Ext.getCmp('anno1').getValue();
                                                    var mydd = Ext.getCmp('incidencias_conf').getStore().getModifiedRecords();

                                                    if (mydd.length === 0){
                                                        App.InfoMessage('Información', 'No ha modificado fila alguna para las incidencias de:' + trab_nomb);
                                                    }
                                                    else{
                                                        var misHoras='';
                                                        for (var i = 0; i < mydd.length; i++) {
                                                            var elemento = mydd[i].getData();
                                                            elemento.contratoid = rec.data.contratoid;
                                                            _array.push(elemento);
                                                        }
                                                        for(var i =0; i<elemento.length;i++){
                                                            misHoras+=_array[i].dias;
                                                        }
                                                        var fnCallBack = function() {
                                                            var _result_bus = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Buscar', {contratoid: contratoid,mes:mes1,anno:anno1});
                                                            if (_result_bus.results > 0) {
                                                                var fnCallBack_after = function() {
                                                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

                                                                    var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add_inc', {data: Ext.encode(_array),mes:mes1,anno:anno1, contratoid: contratoid});
                                                                    App.HideMsgBox();
                                                                    if (_result){
                                                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                                    }
                                                                    else{
                                                                        App.InfoMessage('Información', 'Ocurrio un error');
                                                                    }
                                                                }
                                                                App.ConfirmMessage(fnCallBack_after, 'Ya se ha calculado las incidencias para el trabajador ' + trab_nomb + '. ¿Está seguro que desea recalcular los datos? Se perderan los datos almacenados anteriormente.');
                                                            }
                                                            else {
                                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

                                                                var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add_inc', {data: Ext.encode(_array),mes:mes1,anno:anno1, contratoid: contratoid});
                                                                App.HideMsgBox();
                                                                if (_result){
                                                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                                }
                                                                else{
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
                                        }
                                    ]
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
                            for(var i=0;i<store.count();i++){
                                store.data.items[i].data.horas = 0;
                                store.data.items[i].data.id_prenomina = '';
                                store.data.items[i].data.otos = 0;
                                store.data.items[i].data.estimulo = 0;
                                store.data.items[i].data.cdt = 0;
                            }
                            if(result.rows!=false){
                                for(var i = 0; i < result.rows.length; i++){
                                    for(var j = 0; j < store.count(); j++){
                                        var id_stote_contratoid = store.data.items[j].data.contratoid;
                                        var id_stote = store.data.items[j].data.id_tabaj;
                                        if(   id_stote_contratoid == result.rows[i].id_contrato && id_stote == result.rows[i].trabajador_id)
                                        {
                                            store.data.items[j].data.horas = result.rows[i].horas;
                                            store.data.items[j].data.id_prenomina = result.rows[i].id;
                                            store.data.items[j].data.otos = result.rows[i].otos;
                                            store.data.items[j].data.estimulo = result.rows[i].estimulo;
                                            store.data.items[j].data.cdt = result.rows[i].cdt;
                                            break;
                                        }
                                    }
                                }

                                Ext.getCmp('prenom_grid').getView().refresh();
                            }
                            else{
                                App.InfoMessage('Información', 'No existen datos en este rango de tiempo');
                                Ext.getCmp('prenom_grid').store.load();
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
                }
            }
        });
        var _panel = new Ext.Panel({
            title: 'Gestion de Prenomina por Indiadores',
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
