function Incidencias(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Incidencias =
        {
            text: 'Incidencias y pagos adicionales',
            id: 'Incidencias_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_Incidencias);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Incidencias.Incidencias.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'id_conf'},
            {name: 'nombre'},
            {name: 'condiciones_laborales_anormales',type: 'boolean'},
            {name: 'horario_regular',type: 'boolean'},
            {name: 'otros_pagos',type: 'boolean'},
            {name: 'resive_salario',type: 'boolean'},
            {name: 'basao_promedio_anterior',type: 'boolean'},
            {name: 'porciento_a_pagar'},
            {name: 'licencia_maternidad',type: 'boolean'},
            {name: 'prestacion_social',type: 'boolean'},
            {name: 'subsidio',type: 'boolean'},
            {name: 'antiguedad',type: 'boolean'},
            {name: 'estimulacion',type: 'boolean'},
            {name: 'capacidad_compra',type: 'boolean'},
            {name: 'pago_vacaciones',type: 'boolean'},
            {name: 'informar_en_ausentismo',type: 'boolean'},
            {name: 'afecta_ausentismo',type: 'boolean'},
            {name: 'tiempo_no_laborable',type: 'boolean'},
            {name: 'tiempo_perdido',type: 'boolean'},
            {name: 'tiempo_vacaciones',type: 'boolean'},
            {name: 'acumula_tajetasnc',type: 'boolean'},
            {name: 'devengado_mes',type: 'boolean'},
            {name: 'devengado_trabajado',type: 'boolean'},
            {name: 'aporta_seguriad_social',type: 'boolean'},
            {name: 'mantener_reporte',type: 'boolean'},
            {name: 'excluir_reporte',type: 'boolean'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var _grid = new Ext.grid.Panel({
            id: 'Incidencias_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 5},
                {header: 'Estimulacion',menuDisabled: true,sortable : false,dataIndex: 'estimulacion',flex: 2,  xtype: 'booleancolumn',trueText: '<span class="label label-success">Si</span>',falseText: '<span class="label label-important">No</span>'},
                {header: 'Cap.Comp',menuDisabled: true,sortable : false,dataIndex: 'capacidad_compra',flex: 2,  xtype: 'booleancolumn',trueText: '<span class="label label-success">Si</span>',falseText: '<span class="label label-important">No</span>'},
                {header: 'Salario',menuDisabled: true,sortable : false,dataIndex: 'resive_salario',flex: 2,  xtype: 'booleancolumn',trueText: '<span class="label label-success">Si</span>',falseText: '<span class="label label-important">No</span>'},
                {header: 'Salario Prom',menuDisabled: true,sortable : false,dataIndex: 'basao_promedio_anterior',flex: 2,  xtype: 'booleancolumn',trueText: '<span class="label label-success">Si</span>',falseText: '<span class="label label-important">No</span>'},
                {header: '% a Pagar',menuDisabled: true,sortable : false,dataIndex: 'porciento_a_pagar',flex: 2}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Incidencias_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: [
                {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
                '->',
                { xtype: 'button', text: 'Configurar',handler:function(){
                    var nombre = null;
                    var id=null;
                    var _selectionModel = Ext.getCmp('Incidencias_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    nombre=_selected_rcd.data.nombre;
                    id=_selected_rcd.data.id;
                    var porciento_a_pagar=_selected_rcd.data.porciento_a_pagar;
                    var tab =  Ext.create('Ext.tab.Panel', {
                        width: 500,
                        height: 520,
                        items: [
                                {title: 'Pagos',
                                items:[
                                    {

                                        xtype:'fieldset',
                                        defaults: {anchor: '95%'},
                                        width:'95%',
                                        margin:'5px',
                                        layout: 'anchor',
                                        items :[
                                            {
                                                html: '<span class="label label-info" style="margin-top: 2px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Pago Adicional</span>'
                                            },
                                            {
                                            boxLabel  : 'Condiciones Laborales Anormales (Segun tiempo reportado)',
                                            xtype: 'checkboxfield',
                                            name: 'condiciones_laborales',
                                            id: 'condiciones_laborales'
                                             },
                                            {
                                            boxLabel  : 'Horario Irregular (Segun tiempo reportado)',
                                            xtype: 'checkboxfield',
                                            name: 'horario_irregular',
                                            id: 'horario_irregular'
                                            },
                                            {
                                                boxLabel  : 'Otros Pagos (Segun tiempo total reportado)',
                                                xtype: 'checkboxfield',
                                                name: 'Otros_Pagos',
                                                id: 'Otros_Pagos'
                                            }
                                        ]
                                    },
                                    {
                                        xtype:'fieldset',
                                        defaults: {anchor: '95%'},
                                        layout: 'anchor',
                                        width:'95%',
                                        margin:'5px',
                                        items :[
                                            {
                                                html: '<span class="label label-info" style="margin-top: 2px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Incidencias</span>'
                                            },
                                            {
                                                boxLabel  : 'Resibe salario (Segun tiempo reportado)',
                                                xtype: 'checkboxfield',
                                                name: 'resive_salario',
                                                id: 'resive_salario'
                                            },
                                            {
                                                boxLabel  : 'Basado en promedio meses anteriores',
                                                xtype: 'checkboxfield',
                                                name: 'promedio_meses',
                                                id: 'promedio_meses'
                                            },
                                            {
                                                xtype: 'textfield',
                                                forId: 'myFieldId',
                                                emptyText: '% a Aplicar ',
                                                margin: '10 0 0 10',
                                                name: 'por_ciento',
                                                id: 'por_ciento',
                                                value:porciento_a_pagar
                                            },
                                            {
                                                xtype: 'textfield',
                                                forId: 'myFieldId',
                                                emptyText: 'id',
                                                margin: '10 0 0 10',
                                                name: 'id',
                                                id: 'id',
                                                value:id,
                                                hidden:true
                                            },
                                            {
                                                boxLabel  : 'Licencia de maternidad(Salario en base a semanas)',
                                                xtype: 'checkboxfield',
                                                name: 'licencia_maternidad',
                                                id: 'licencia_maternidad',
                                                margin: '10 0 0 10'
                                            },
                                            {
                                                boxLabel  : 'Constituye prestacion social(Resolucion 22)',
                                                xtype: 'checkboxfield',
                                                name: 'prestacion',
                                                id: 'prestacion',
                                                margin: '10 0 0 10'
                                            },
                                            {
                                                boxLabel  : 'Constituye un subcidio(Decreto 238)',
                                                xtype: 'checkboxfield',
                                                name: 'subcidio',
                                                id: 'subcidio',
                                                margin: '10 0 0 10'
                                            }
                                        ]
                                    },
                                    {
                                        xtype:'fieldset',
                                        defaults: {anchor: '95%'},
                                        layout: 'anchor',
                                        width:'95%',
                                        margin:'5px',
                                        items :[
                                            {
                                                boxLabel  : 'Resive antiguedad',
                                                xtype: 'checkboxfield',
                                                name: 'antiguedada',
                                                id: 'antiguedad'
                                            },
                                            {
                                                boxLabel  : 'Resive Estimulacion',
                                                xtype: 'checkboxfield',
                                                name: 'estimulacion',
                                                id: 'estimulacion'
                                            },
                                            {
                                                boxLabel  : 'Resive capasidad de compra',
                                                xtype: 'checkboxfield',
                                                name: 'cap_compra',
                                                id: 'cap_compra'
                                            },
                                            {
                                                boxLabel  : 'Resive pago de Vacaciones(9.09)',
                                                xtype: 'checkboxfield',
                                                name: 'vacaciones',
                                                id: 'vacaciones'
                                            }
                                        ]
                                    }
                                    ]
                                },
                                {title: 'Fondo de Tiempo',
                                    items:[
                                        {

                                            xtype:'fieldset',
                                            defaults: {anchor: '95%'},
                                            width:'95%',
                                            margin:'5px',
                                            layout: 'anchor',
                                            items :[
                                                {
                                                    html: '<span class="label label-info" style="margin-top: 2px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Ausentismo</span>'
                                                },
                                                {
                                                    boxLabel  : 'Integra informe de ausentismo',
                                                    xtype: 'checkboxfield',
                                                    name: 'info_ausentismo',
                                                    id: 'info_ausentismo'
                                                },
                                                {
                                                    boxLabel  : 'Afecta al indice de Ausentismo',
                                                    xtype: 'checkboxfield',
                                                    name: 'indice_ausentismo',
                                                    id: 'indice_ausentismo',
                                                    margin: '10 0 0 10'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'fieldset',
                                            defaults: {anchor: '95%'},
                                            layout: 'anchor',
                                            width:'95%',
                                            margin:'5px',
                                            items :[
                                                {
                                                    html: '<span class="label label-info" style="margin-top: 2px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Promedio de Trabajadores</span>'
                                                },
                                                {
                                                    boxLabel  : 'Integra el fondo de tiempo no laborable',
                                                    xtype: 'checkboxfield',
                                                    name: 'Integra_no_laborable',
                                                    id: 'Integra_no_laborable'
                                                },
                                                {
                                                    boxLabel  : 'Integra el fondo de tiempo Perdido',
                                                    xtype: 'checkboxfield',
                                                    name: 'Integra_tiempo_Perdido',
                                                    id: 'Integra_tiempo_Perdido'
                                                },
                                                {
                                                    boxLabel  : 'Integra el fondo de tiempo de vacaciones',
                                                    xtype: 'checkboxfield',
                                                    name: 'Integra_tiempo_de_vacaciones',
                                                    id: 'Integra_tiempo_de_vacaciones'
                                                }
                                            ]
                                        }]
                                },
                                {title: 'Otros',
                                    items:[
                                        {

                                            xtype:'fieldset',
                                            defaults: {anchor: '95%'},
                                            width:'95%',
                                            margin:'5px',
                                            layout: 'anchor',
                                            items :[
                                                {
                                                    html: '<span class="label label-info" style="margin-top: 2px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Acumulados SNC225</span>'
                                                },
                                                {
                                                    boxLabel  : 'Se acumula en targetas SNC225',
                                                    xtype: 'checkboxfield',
                                                    name: 'targetas_SNC225',
                                                    id: 'targetas_SNC225'
                                                },
                                                {   xtype:'fieldset',
                                                    defaults: {anchor: '95%'},
                                                    width:'95%',
                                                    margin:'5px',
                                                    layout: 'anchor',
                                                    items:[
                                                        {
                                                            html: '<span class="label label-info" style="margin-top: 2px; margin-bottom: 10px;margin-right: 15px;margin-left: 0px">Salario a acumular para el calculo del Subsidio</span>'
                                                        },
                                                        {  boxLabel  : 'El realmente devengado en el mes',
                                                            xtype: 'radio',
                                                            name: 'field2',
                                                            id: 'devengado_mes',
                                                            margin: '10 0 0 10'
                                                        },
                                                        {  boxLabel  : 'El devengado de Haber estado Trabajando',
                                                            xtype: 'radio',
                                                            name: 'field2',
                                                            id: 'devengado_estdo',
                                                            margin: '10 0 0 10'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype:'fieldset',
                                            defaults: {anchor: '95%'},
                                            layout: 'anchor',
                                            width:'95%',
                                            margin:'5px',
                                            items :[
                                                {
                                                    boxLabel  : 'Aportad a la seguridad social por el sistema de perfeccionamiento empresarial',
                                                    xtype: 'checkboxfield',
                                                    name: 'Aportad_seguridad',
                                                    id: 'Aportad_seguridad'
                                                },
                                                {
                                                    boxLabel  : 'Mantener el reporte en el proximo periodo',
                                                    xtype: 'checkboxfield',
                                                    name: 'proximo_periodo',
                                                    id: 'proximo_periodo'
                                                },
                                                {
                                                    boxLabel  : 'Se excluye este reporte al ajustar los dias en la prenomina',
                                                    xtype: 'checkboxfield',
                                                    name: 'se_excluye',
                                                    id: 'se_excluye'
                                                }
                                            ]
                                        }]}
                               ],
                        listeners: {
                            'show': function(This, eOpts) {
                                Ext.getCmp('condiciones_laborales').focus(true, true);
                            },
                            afterrender:function(){
                                var _selectionModel = Ext.getCmp('Incidencias_grid_id').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();

                                var condiciones_laborales_anormales=_selected_rcd.data.condiciones_laborales_anormales;
                                var horario_regular=_selected_rcd.data.horario_regular;
                                var resive_salario=_selected_rcd.data.resive_salario;
                                var basao_promedio_anterior=_selected_rcd.data.basao_promedio_anterior;
                                var licencia_maternidad=_selected_rcd.data.licencia_maternidad;
                                var prestacion_social=_selected_rcd.data.prestacion_social;
                                var subsidio=_selected_rcd.data.subsidio;
                                var antiguedad=_selected_rcd.data.antiguedad;
                                var estimulacion=_selected_rcd.data.estimulacion;
                                var capacidad_compra=_selected_rcd.data.capacidad_compra;
                                var pago_vacaciones=_selected_rcd.data.pago_vacaciones;
                                var informar_en_ausentismo=_selected_rcd.data.informar_en_ausentismo;
                                var afecta_ausentismo=_selected_rcd.data.afecta_ausentismo;
                                var tiempo_no_laborable=_selected_rcd.data.tiempo_no_laborable;
                                var tiempo_perdido=_selected_rcd.data.tiempo_perdido;
                                var tiempo_vacaciones=_selected_rcd.data.tiempo_vacaciones;
                                var acumula_tajetasnc=_selected_rcd.data.acumula_tajetasnc;
                                var devengado_mes=_selected_rcd.data.devengado_mes;
                                var devengado_trabajado=_selected_rcd.data.devengado_trabajado;
                                var aporta_seguriad_social=_selected_rcd.data.aporta_seguriad_social;
                                var mantener_reporte=_selected_rcd.data.mantener_reporte;
                                var excluir_reporte=_selected_rcd.data.excluir_reporte;
                                var Otros_Pagos=_selected_rcd.data.otros_pagos;

                                if(condiciones_laborales_anormales==true){Ext.getCmp('condiciones_laborales').setValue(true);}
                                if(horario_regular==true){Ext.getCmp('horario_irregular').setValue(true);}
                                if(Otros_Pagos==true){Ext.getCmp('Otros_Pagos').setValue(true);}

                                if(resive_salario==true){Ext.getCmp('resive_salario').setValue(true);}
                                if(basao_promedio_anterior==true){Ext.getCmp('promedio_meses').setValue(true);}
                                if(licencia_maternidad==true){Ext.getCmp('licencia_maternidad').setValue(true);}
                                if(prestacion_social==true){Ext.getCmp('prestacion').setValue(true);}
                                if(subsidio==true){Ext.getCmp('subcidio').setValue(true);}

                                if(antiguedad==true){Ext.getCmp('antiguedad').setValue(true);}
                                if(estimulacion==true){Ext.getCmp('estimulacion').setValue(true);}
                                if(capacidad_compra==true){Ext.getCmp('cap_compra').setValue(true);}
                                if(pago_vacaciones==true){Ext.getCmp('vacaciones').setValue(true);}

                                if(informar_en_ausentismo==true){Ext.getCmp('info_ausentismo').setValue(true);}
                                if(afecta_ausentismo==true){Ext.getCmp('indice_ausentismo').setValue(true);}

                                if(tiempo_no_laborable==true){Ext.getCmp('Integra_no_laborable').setValue(true);}
                                if(tiempo_perdido==true){Ext.getCmp('Integra_tiempo_Perdido').setValue(true);}
                                if(tiempo_vacaciones==true){Ext.getCmp('Integra_tiempo_de_vacaciones').setValue(true);}

                                if(acumula_tajetasnc==true){Ext.getCmp('targetas_SNC225').setValue(true);}
                                if(devengado_mes==true){Ext.getCmp('devengado_mes').setValue(true);}
                                if(devengado_trabajado==true){Ext.getCmp('devengado_estdo').setValue(true);}
                                if(aporta_seguriad_social==true){Ext.getCmp('Aportad_seguridad').setValue(true);}
                                if(mantener_reporte==true){Ext.getCmp('proximo_periodo').setValue(true);}
                                if(excluir_reporte==true){Ext.getCmp('se_excluye').setValue(true);}


                                 }
                        }
                    });
                    var ventana = Ext.create('Ext.window.Window', {
                        title: 'Configurar: '+ nombre,
                        layout: 'anchor',
                        items: tab,
                        buttons: [
                            {
                                text: 'Guardar',
                                cls: 'btn btn-success',
                                formBind: true,
                                handler: function () {
                                    var _selectionModel = Ext.getCmp('Incidencias_grid_id').getSelectionModel();
                                    var _selected_rcd = _selectionModel.getLastSelected();
                                    var id_conf=_selected_rcd.data.id_conf;

                                    var condiciones_laborales = Ext.getCmp('condiciones_laborales').getValue();
                                    var horario_irregular = Ext.getCmp('horario_irregular').getValue();
                                    var Otros_Pagos = Ext.getCmp('Otros_Pagos').getValue();
                                    var resive_salario = Ext.getCmp('resive_salario').getValue();
                                    var promedio_meses = Ext.getCmp('promedio_meses').getValue();
                                    var por_ciento = Ext.getCmp('por_ciento').getValue();
                                    var id = Ext.getCmp('id').getValue();
                                    var licencia_maternidad = Ext.getCmp('licencia_maternidad').getValue();
                                    var prestacion = Ext.getCmp('prestacion').getValue();
                                    var subcidio = Ext.getCmp('subcidio').getValue();
                                    var antiguedad = Ext.getCmp('antiguedad').getValue();
                                    var estimulacion = Ext.getCmp('estimulacion').getValue();
                                    var cap_compra = Ext.getCmp('cap_compra').getValue();
                                    var vacacones = Ext.getCmp('vacaciones').getValue();
                                    var info_ausentismo = Ext.getCmp('info_ausentismo').getValue();
                                    var indice_ausentismo = Ext.getCmp('indice_ausentismo').getValue();
                                    var Integra_no_laborable = Ext.getCmp('Integra_no_laborable').getValue();
                                    var Integra_tiempo_Perdido = Ext.getCmp('Integra_tiempo_Perdido').getValue();
                                    var Integra_tiempo_de_vacaciones = Ext.getCmp('Integra_tiempo_de_vacaciones').getValue();
                                    var devengado_mes = Ext.getCmp('devengado_mes').getValue();
                                    var devengado_estdo = Ext.getCmp('devengado_estdo').getValue();
                                    var Aportad_seguridad = Ext.getCmp('Aportad_seguridad').getValue();
                                    var proximo_periodo = Ext.getCmp('proximo_periodo').getValue();
                                    var se_excluye = Ext.getCmp('se_excluye').getValue();
                                    var targetas_SNC225 = Ext.getCmp('targetas_SNC225').getValue();
                                    if (1==1){
                                        var _result = App.PerformSyncServerRequest('Incidencias.Incidencias.Add_conf',{
                                            condiciones_laborales:condiciones_laborales,
                                            horario_irregular:horario_irregular,
                                            Otros_Pagos:Otros_Pagos,
                                            resive_salario:resive_salario,
                                            promedio_meses:promedio_meses,
                                            por_ciento:por_ciento,
                                            id:id,
                                            id_conf:id_conf,
                                            licencia_maternidad:licencia_maternidad,
                                            prestacion:prestacion,
                                            subcidio:subcidio,
                                            antiguedad:antiguedad,
                                            estimulacion:estimulacion,
                                            cap_compra:cap_compra,
                                            vacacones:vacacones,
                                            info_ausentismo:info_ausentismo,
                                            indice_ausentismo:indice_ausentismo,
                                            Integra_no_laborable:Integra_no_laborable,
                                            Integra_tiempo_Perdido:Integra_tiempo_Perdido,
                                            Integra_tiempo_de_vacaciones:Integra_tiempo_de_vacaciones,
                                            devengado_mes:devengado_mes,
                                            devengado_estdo:devengado_estdo,
                                            Aportad_seguridad:Aportad_seguridad,
                                            proximo_periodo:proximo_periodo,
                                            targetas_SNC225:targetas_SNC225,
                                            se_excluye:se_excluye});
                                        if(_result)
                                        {
                                            Ext.getCmp('Incidencias_grid_id').store.load();
                                            App.InfoMessage('Información', 'Incidencias adicionada satisfactoriamente');
                                            ventana.close();
                                        }
                                    }
                                }
                            },
                            {
                                text: 'Cancelar', cls: 'btn btn-primary',
                                handler: function () {
                                    ventana.close();
                                }
                            }
                            ]
                    }).show();
                }},
                { xtype: 'button', text: 'Definir Datos',
                    handler: function () {
                        var _selectionModel = Ext.getCmp('Incidencias_grid_id').getSelectionModel();                        
                        var _selected_rcd = _selectionModel.getLastSelected();
                        var id =_selected_rcd.data.id;                                                
                        var element   = App.BuildJsonStore('Incidencias.Incidencias.ObtElementosGastos',{
                            fields: [
                                {name: 'id'},
                                {name: 'nombre_gasto'}
                            ],
                            proxy: {
                                type: 'ajax',
                                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                            },
                            autoLoad: true
                        });
                        var cuentas   = App.BuildJsonStore('Incidencias.Incidencias.ObtCuentas',{
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
                        var ccostos   = App.BuildJsonStore('Incidencias.Incidencias.ObtCentCost',{
                            fields: [
                                {name: 'id'},
                                {name: 'c_costo'}
                            ],
                            proxy: {
                                type: 'ajax',
                                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                            },
                            autoLoad: true
                        });
                        var nombre=_selected_rcd.data.nombre;
                        this.__data_store = App.BuildJsonStore('Incidencias.Incidencias.CargarDatos',{
                            fields: [
                                {name: 'id'},
                                {name: 'id_conf'},
                                {name: 'nombre'}
                            ],
                            proxy: {
                                type: 'ajax',
                                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                            },
                            autoLoad: true
                        });

                        var elementos =  Ext.create('Ext.tab.Panel', {
                            width: '100%',
                            height: '100%',
                            activeTab: 0,
                            bodyPadding: 10,
                            items: [
                                {
                                    title: 'Productivos',
                                   items:[
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Salario',
                                           emptyText:'Salario',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'p_salario',
                                           editable : false,
                                           name:'p_salario',
                                           width:400,
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Pago Adicional',
                                           emptyText:'Pago Adicional',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           id:'p_Adicional',
                                           editable : false,
                                           name:'p_Adicional',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Estimulaci&oacute;n',
                                           emptyText:'Estimulaci&oacute;n',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'p_Estimulacion',
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           editable : false,
                                           name:'p_Estimulacion',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Condiciones Anormales',
                                           emptyText:'Condiciones Anormales',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'p_Anormales',
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           editable : false,
                                           name:'p_Anormales',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Otros Pagos',
                                           emptyText:'Otros Pagos',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'p_Otros_Pagos',
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           editable : false,
                                           name:'p_Otros_Pagos',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Antig&uuml;edad',
                                           emptyText:'Antig&uuml;edad',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'p_Antiguedad',
                                           editable : false,
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           name:'p_Antiguedad',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Seguridad Social',
                                           emptyText:'Seguridad Social',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'p_Seguridad_Social',
                                           editable : false,
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           name:'p_Seguridad_Social',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                       {
                                           xtype:'combobox',
                                           fieldLabel: 'Fza de trabajo',
                                           emptyText:'Fza de trabajo',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'p_trabajo',
                                           editable : false,
                                           pageSize: 10,
                                           listConfig: {
                                               loadingText: 'Cargando...',
                                               emptyText: 'No existen datos.'
                                           },
                                           name:'p_trabajo',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       }

                                   ]
                                },
                                {
                                    title: 'Improductivos',
                                    items:[
                                        {
                                            xtype:'combobox',
                                            fieldLabel: 'Salario',
                                            emptyText:'Salario',
                                            labelWidth:'150px',
                                            //hideLabel:true,
                                            id:'i_salario',
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                            editable : false,
                                            name:'i_salario',
                                            width:400,
                                            store:  element,
                                            queryMode: 'local',
                                            displayField: 'nombre_gasto',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel: 'Pago Adicional',
                                            emptyText:'Pago Adicional',
                                            labelWidth:'150px',
                                            //hideLabel:true,
                                            id:'i_Adicional',
                                            editable : false,
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                            name:'i_Adicional',
                                            width:400,
                                            store:  element,
                                            queryMode: 'local',
                                            displayField: 'nombre_gasto',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel: 'Estimulaci&oacute;n',
                                            emptyText:'Estimulaci&oacute;n',
                                            labelWidth:'150px',
                                            //hideLabel:true,
                                            id:'i_Estimulacion',
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                            editable : false,
                                            name:'i_Estimulacion',
                                            width:400,
                                            store:  element,
                                            queryMode: 'local',
                                            displayField: 'nombre_gasto',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel: 'Condiciones Anormales',
                                            emptyText:'Condiciones Anormales',
                                            labelWidth:'150px',
                                            //hideLabel:true,
                                            id:'i_Anormales',
                                            editable : false,
                                            name:'i_Anormales',
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                            width:400,
                                            store:  element,
                                            queryMode: 'local',
                                            displayField: 'nombre_gasto',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel: 'Otros Pagos',
                                            emptyText:'Otros Pagos',
                                            labelWidth:'150px',
                                            //hideLabel:true,
                                            id:'i_Otros_Pagos',
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                            editable : false,
                                            name:'i_Otros_Pagos',
                                            width:400,
                                            store:  element,
                                            queryMode: 'local',
                                            displayField: 'nombre_gasto',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel: 'Antig&uuml;edad',
                                            emptyText:'Antig&uuml;edad',
                                            labelWidth:'150px',
                                            //hideLabel:true,
                                            id:'i_Antiguedad',
                                            editable : false,
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                            name:'i_Antiguedad',
                                            width:400,
                                            store:  element,
                                            queryMode: 'local',
                                            displayField: 'nombre_gasto',
                                            valueField: 'id'
                                        },
                                        {
                                            xtype:'combobox',
                                            fieldLabel: 'Seguridad Social',
                                            emptyText:'Seguridad Social',
                                            labelWidth:'150px',
                                            //hideLabel:true,
                                            id:'i_Seguridad_Social',
                                            editable : false,
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                            name:'i_Seguridad_Social',
                                            width:400,
                                            store:  element,
                                            queryMode: 'local',
                                            displayField: 'nombre_gasto',
                                            valueField: 'id'
                                        },
                                        {
                                           xtype:'combobox',
                                           fieldLabel: 'Fza de trabajo',
                                           emptyText:'Fza de trabajo',
                                           labelWidth:'150px',
//                                           hideLabel:true,
                                           id:'i_trabajo',
                                           editable : false,
                                            pageSize: 10,
                                            listConfig: {
                                                loadingText: 'Cargando...',
                                                emptyText: 'No existen datos.'
                                            },
                                           name:'i_trabajo',
                                           width:400,
                                           store:  element,
                                           queryMode: 'local',
                                           displayField: 'nombre_gasto',
                                           valueField: 'id'
                                       },
                                    ]
                                }
                            ]
                        });
                        var _result   = App.PerformSyncServerRequest('Incidencias.Incidencias.ObtDef',{id:id}); 
                        var miconf = Ext.create('Ext.tab.Panel', {
                            width: 500,
                            height: 400,
                            border:true,
                            listeners:{
                                afterrender:function(){
//                                    var _selectionModel = Ext.getCmp('Incidencias_grid_id').getSelectionModel();                        
//                                    var _selected_rcd = _selectionModel.getLastSelected();
//                                    var id =_selected_rcd.data.id;  
//                                    var _result   = App.PerformSyncServerRequest('Incidencias.Incidencias.ObtDef',{id:id}); 
                                    if(_result.rows != false){
                                        if(_result.rows[0].c_costo != ''){                                            
                                            Ext.getCmp('c_costo').setValue(true);
                                            Ext.getCmp('centro').setValue(_result.rows[0].c_costo);
                                        }
                                        if(_result.rows[0].c_cuentas != ''){
                                            Ext.getCmp('c_cuentas').setValue(true);
                                            Ext.getCmp('cuentas').setValue(_result.rows[0].c_cuentas);
                                        }
                                        if(_result.rows[0].aporta_sperf == 't')
                                            Ext.getCmp('Fuer_trab').setValue(true);
                                        if(_result.rows[0].aporta_fw == 't')
                                            Ext.getCmp('perf').setValue(true);
                                        if(_result.rows[0].aporta_ss == 't')
                                            Ext.getCmp('seguridad').setValue(true);
                                        if(_result.rows[0].solo_909 == 't')
                                            Ext.getCmp('aporta').setValue(true);

                                        Ext.getCmp('p_salario').setValue(_result.rows[0].p_salario);
                                        Ext.getCmp('p_Adicional').setValue(_result.rows[0].p_pago_ad);
                                        Ext.getCmp('p_Estimulacion').setValue(_result.rows[0].p_estimulacion);
                                        Ext.getCmp('p_Anormales').setValue(_result.rows[0].p_cond_an);
                                        Ext.getCmp('p_Otros_Pagos').setValue(_result.rows[0].p_otros_pag);
                                        Ext.getCmp('p_Antiguedad').setValue(_result.rows[0].p_antig);
                                        Ext.getCmp('p_Seguridad_Social').setValue(_result.rows[0].p_ss);
                                        Ext.getCmp('p_trabajo').setValue(_result.rows[0].p_fzaw);

                                        Ext.getCmp('i_salario').setValue(_result.rows[0].i_salario);
                                        Ext.getCmp('i_Adicional').setValue(_result.rows[0].i_pago_ad);
                                        Ext.getCmp('i_Estimulacion').setValue(_result.rows[0].i_estimulacion);
                                        Ext.getCmp('i_Anormales').setValue(_result.rows[0].i_cond_an);
                                        Ext.getCmp('i_Otros_Pagos').setValue(_result.rows[0].i_otros_pag);
                                        Ext.getCmp('i_Antiguedad').setValue(_result.rows[0].i_antig);
                                        Ext.getCmp('i_Seguridad_Social').setValue(_result.rows[0].i_ss);
                                        Ext.getCmp('i_trabajo').setValue(_result.rows[0].i_fzaw);
                                    }
                                }
                            },                            
                            buttons: [
                            {
                                text: 'Guardar',
                                cls: 'btn btn-success',
                                formBind: true,
                                handler: function () {
                                    var _selectionModel = Ext.getCmp('Incidencias_grid_id').getSelectionModel();
                                    var _selected_rcd = _selectionModel.getLastSelected();
                                    
                                    if(Ext.getCmp('c_costo').getValue() == true && Ext.getCmp('centro').getValue() == null){
                                        App.InfoMessage('Información', 'Debe llenar el centro de costo');
                                        return false;
                                    }
                                    if(Ext.getCmp('c_cuentas').getValue() == true && Ext.getCmp('cuentas').getValue() == null){
                                        App.InfoMessage('Información', 'Debe llenar las Cuentas y SubCuentas');
                                        return false;
                                    }
                                    var enviar = {
                                        incidencias_id:_selected_rcd.data.id,                                       
                                        aporta_sperf:Ext.getCmp('Fuer_trab').getValue(),
                                        aporta_fw:Ext.getCmp('perf').getValue(),
                                        aporta_ss:Ext.getCmp('seguridad').getValue(),
                                        solo_909:Ext.getCmp('aporta').getValue(),
                                        
                                        p_salario:Ext.getCmp('p_salario').getValue(),
                                        p_pago_ad:Ext.getCmp('p_Adicional').getValue(),
                                        p_estimulacion:Ext.getCmp('p_Estimulacion').getValue(),
                                        p_cond_an:Ext.getCmp('p_Anormales').getValue(),
                                        p_otros_pag:Ext.getCmp('p_Otros_Pagos').getValue(),
                                        p_antig:Ext.getCmp('p_Antiguedad').getValue(),
                                        p_ss:Ext.getCmp('p_Seguridad_Social').getValue(),
                                        p_fzaw:Ext.getCmp('p_trabajo').getValue(),
                                        i_salario:Ext.getCmp('i_salario').getValue(),
                                        i_pago_ad:Ext.getCmp('i_Adicional').getValue(),
                                        i_estimulacion:Ext.getCmp('i_Estimulacion').getValue(),
                                        i_cond_an:Ext.getCmp('i_Anormales').getValue(),
                                        i_otros_pag:Ext.getCmp('i_Otros_Pagos').getValue(),
                                        i_antig:Ext.getCmp('i_Antiguedad').getValue(),
                                        i_ss:Ext.getCmp('i_Seguridad_Social').getValue(),
                                        i_fzaw:Ext.getCmp('i_trabajo').getValue()
                                    };
                                    if(Ext.getCmp('c_costo').getValue() == true && Ext.getCmp('centro').getValue() != '')
                                            enviar.c_costo   = Ext.getCmp('centro').getValue();
                                    if(Ext.getCmp('c_cuentas').getValue() == true && Ext.getCmp('cuentas').getValue() != '')  
                                            enviar.c_cuentas = Ext.getCmp('cuentas').getValue();
                                    
                                    
                                    var _result = App.PerformSyncServerRequest('Incidencias.Incidencias.Add_def',enviar);
                                    if(_result)
                                    {
                                        Ext.getCmp('Incidencias_grid_id').store.load();
                                        App.InfoMessage('Información', 'Incidencias adicionada satisfactoriamente');
                                        definicion.close();
                                    }
                                    
                                }
                            },
                            {
                                text: 'Cancelar', cls: 'btn btn-primary',
                                handler: function () {
                                    definicion.close();
                                }
                            }],
                            items: [
                                {
                                 title: 'Pagos',
                                    items:[
                                     {
                                         xtype: 'fieldcontainer',
                                         fieldLabel: 'Centros de costo',
                                         labelStyle: 'font-weight:bold;padding:0;',
                                         layout: 'hbox',
                                         border:true,
                                         fieldDefaults: {labelAlign: 'top'},
                                         defaults: {anchor: '95%'},
                                         width:'95%',
                                         margin:'5px',
                                         items: [
                                             {
                                                 xtype:'checkboxfield',
                                                 name      : 'c_costo',
                                                 hideLabel:true,
                                                 inputValue: '3',
                                                 id        : 'c_costo',
                                                 listeners:{
                                                     change:function( This, newValue, oldValue, eOpts ){
                                                         if(newValue == true)
                                                            {Ext.getCmp('centro').setDisabled(false);
                                                             Ext.getCmp('centro').reset();
                                                            }
                                                         else
                                                            {Ext.getCmp('centro').setDisabled(true);
                                                             Ext.getCmp('centro').reset();
                                                            }
                                                     }

                                                 }
                                             },
                                             {
                                                 xtype:'combobox',
                                                 fieldLabel: 'Choose State',
                                                 emptyText:'Centro de costo',
                                                 hideLabel:true,
                                                 disabled:true,
                                                 id:'centro',
                                                 editable : false,
                                                 pageSize: 10,
                                                 listConfig: {
                                                     loadingText: 'Cargando...',
                                                     emptyText: 'No existen datos.'
                                                 },
                                                 name:'centro',
                                                 width:400,
                                                 store:  ccostos,
                                                 queryMode: 'local',
                                                 displayField: 'c_costo',
                                                 valueField: 'id'
                                             }
                                         ]
                                     },
                                     {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Cuentas y SubCuentas',
                                            labelStyle: 'font-weight:bold;padding:0;',
                                            layout: 'hbox',
                                            border:true,
                                            fieldDefaults: {labelAlign: 'top'},
                                            defaults: {anchor: '95%'},
                                            width:'95%',
                                            margin:'5px',
                                            items: [
                                                {
                                                    xtype:'checkboxfield',
                                                    name      : 'c_cuentas',
                                                    hideLabel:true,
                                                    inputValue: '3',
                                                    id        : 'c_cuentas',
                                                    listeners:{
                                                        change:function( This, newValue, oldValue, eOpts ){
                                                            if(newValue == true)
                                                            {Ext.getCmp('cuentas').setDisabled(false);
                                                                Ext.getCmp('cuentas').setValue('Cuentas y SubCuentas');
                                                            }
                                                            else
                                                            {Ext.getCmp('cuentas').setDisabled(true);
                                                                Ext.getCmp('cuentas').setValue('Activar opción');
                                                            }
                                                        }

                                                    }
                                                },
                                                {
                                                    xtype:'combobox',
                                                    fieldLabel: 'Choose State',
                                                    emptyText:'Cuentas y SubCuentas especificas',
                                                    hideLabel:true,
                                                    disabled:true,
                                                    id:'cuentas',
                                                    editable : false,
                                                    pageSize: 10,
                                                    listConfig: {
                                                        loadingText: 'Cargando...',
                                                        emptyText: 'No existen datos.'
                                                    },
                                                    name:'cuentas',
                                                    width:400,
                                                    store:  cuentas,
                                                    queryMode: 'local',
                                                    displayField: 'nombre',
                                                    valueField: 'id'
                                                }
                                            ]
                                        },
                                     {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Cuentas y SubCuentas',
                                            labelStyle: 'font-weight:bold;padding:0;',
                                            layout: 'vbox',
                                            border:true,
                                            fieldDefaults: {labelAlign: 'top'},
                                            defaults: {anchor: '100%'},
                                            width:'500px',
                                            margin:'5px',
                                            items: [
                                                    {
                                                        xtype:'checkboxfield',
                                                        boxLabel  : 'Aparta al Sistema de Perfeccionamiento Empresarial',
                                                        name      : 'perf',
                                                        inputValue: 'perf',
                                                        id        : 'perf',
                                                        width:'120%'
                                                    },
                                                    {
                                                        xtype:'checkboxfield',
                                                        boxLabel  : 'Aporta por la Utilizacion de la Fuerza de Trabajo',
                                                        name      : 'Fuer_trab',
                                                        inputValue: 'Fuer_trab',
                                                        id        : 'Fuer_trab',
                                                        width:'120%'
                                                    },
                                                    {
                                                        xtype:'checkboxfield',
                                                        boxLabel  : 'Aporta por la Seguridad social',
                                                        name      : 'seguridad',
                                                        hideLabel:true,
                                                        inputValue: 'seguridad',
                                                        id        : 'seguridad',
                                                        listeners:{
                                                            change:function( This, newValue, oldValue, eOpts ){
                                                                if(newValue == true)
                                                                {Ext.getCmp('aporta').setDisabled(false);}
                                                                else
                                                                {Ext.getCmp('aporta').setDisabled(true);}
                                                            }

                                                        },
                                                        width:'120%'
                                                    },
                                                    {
                                                        xtype:'checkboxfield',
                                                        boxLabel  : 'Solo el 9.09 aporta',
                                                        name      : 'aporta',
                                                        inputValue: 'aporta',
                                                        disabled:true,
                                                        id        : 'aporta',
                                                        width:'120%'
                                                    }
                                                 ]
                                        }
                                 ]
                                },
                                {
                                 title: 'Elementos de Gastos',
                                 items:[elementos]
                                }
                            ]
                        });
                        var definicion = Ext.create('Ext.window.Window', {
                            title: 'Definir datos para: '+nombre,
                            modal:true,
                            items:miconf,
                            layout: 'anchor'
                        }).show();

                    }
                }
            ],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('IncidenciasGestionar');
                        }
                        else
                        {
                          this.Enable('IncidenciasGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Incidencias',
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
App.RegisterModule('Incidencias', new Incidencias());