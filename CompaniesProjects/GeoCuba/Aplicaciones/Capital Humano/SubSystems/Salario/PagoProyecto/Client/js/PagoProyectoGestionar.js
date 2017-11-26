function PagoProyectoGestionar() {
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function (Panel) {
        this._btn_add = Ext.create('Ext.Button', {
            text: 'Adicionar',
            id: 'add_PagoProyecto__bt_id',
            tooltip: 'Adiciona un  nuevo Clasificaci&oacute;n Cientifica',
            iconCls: 'add',
            cls: 'btn',
            handler: function () {

                this.__data_store_areas = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarAreas1', {
                    fields: [
                        {name: 'id'},
                        {name: 'trabajador_nombre_completo'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                this.__data_store_areas_inicio = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarAreas', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: true
                });
                this.__data_store_CCosto = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarCCosto', {
                    fields: [
                        {name: 'id'},
                        {name: 'c_costo'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                this.__data_store_CGasto = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarCGasto', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                this.__data_store_general = App.BuildJsonStore('PagoProyecto.PagoProyecto.Tomar_datos', {
                    fields: [
                        {name: 'trabajador_nombre_completo'},
                        {name: 'contratoid'},
                        {name: 'nombre_cargo'},
                        {name: 'id_tabaj'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                var cellEditing = new Ext.grid.plugin.CellEditing({
                    clicksToEdit: 2
                });
                var jd = Ext.define('ProductosCompra', {
                    extend: 'Ext.data.Model',
                    fields: [
                        {name: 'trabajador_nombre_completo'},
                        {name: 'contratoid'},
                        {name: 'id_tabaj'},
                        {name: 'nombre_cargo'}
                    ]
                });
                var _data_store_Productos_Compra = Ext.create('Ext.data.Store', {
                    model: 'ProductosCompra',
                    proxy: {
                        type: 'memory',
                        reader: {type: 'json'}
                    },
                    autoLoad: false
                });
                Ext.create('Ext.window.Window', {
                    title: 'Gestion de Proyectos',
                    height: 520,
                    width: 800,
                    modal: true,
                    id: 'ventana_s',
                    name: 'ventana_s',
                    autoScroll: true,
                    bodyPadding: 10,
                    layout: 'anchor',
                    items: [
                        {   layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'proyect',
                                    id: 'proyect',
                                    labelWidth: 150,
                                    fieldLabel: 'Nombre del Proyecto',
                                    allowBlank: false
                                },
                                {margin: 20},
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Area de Reporte',
                                    id: 'area',
                                    name: 'area',
                                    store: this.__data_store_areas_inicio,
                                    queryMode: 'local',
                                    displayField: 'nombre',
                                    valueField: 'id'
                                }
                            ]},
                        {layout: 'hbox',
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'jornada',
                                    id: 'jornada',
                                    labelWidth: 150,
                                    fieldLabel: 'Jornada Laboral',
                                    allowBlank: false
                                },
                                {margin: 20},
                                {
                                    xtype: 'textfield',
                                    id: 'estim',
                                    name: 'estim',
                                    fieldLabel: '% a Estimular',
                                    allowBlank: false,
                                }
                            ]},
                        {layout: 'hbox',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    labelWidth: 340,
                                    width: 479,
                                    boxLabel: 'Se crea fondo de salario segun salario certificado',
                                    name: 'topping',
                                    inputValue: '1',
                                    id: 'checkbox1',
                                    listeners: {
                                        change: function (This, newValue) {
                                            if (newValue == true) {
                                                Ext.getCmp('fondo').enable();
                                            }
                                            else {
                                                Ext.getCmp('fondo').reset();
                                                Ext.getCmp('fondo').disable();
                                            }
                                        }, scope: this
                                    }
                                },
                                {margin: 20},
                                {
                                    xtype: 'textfield',
                                    name: 'fondo',
                                    id: 'fondo',
                                    width: 80,
                                    labelWidth: 1,
                                    allowBlank: false,
                                    disabled: true
                                }
                            ]},
                        {layout: 'hbox',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Cerrar en este pago',
                                    name: 'crrear',
                                    inputValue: '1',
                                    width: 370,
                                    id: 'crrear'
                                },
                                {margin: 20},
                                {   xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Fecha',
                                    name: 'id_from_date',
                                    id: 'id_from_date',
                                    labelWidth: 100
                                }
                            ]},
                        {
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Centro de Costo',
                                    id: 'centro',
                                    name: 'centro',
                                    labelWidth: 150,
                                    store: this.__data_store_CCosto,
                                    queryMode: 'local',
                                    displayField: 'c_costo',
                                    valueField: 'id',
                                    width: 379,
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: 'Cuenta de Gasto',
                            id: 'cuentas',
                            name: 'cuentas',
                            labelWidth: 150,
                            store: this.__data_store_CGasto,
                            queryMode: 'local',
                            displayField: 'nombre',
                            valueField: 'id',
                            width: 379,
                        },
                        {   layout: 'hbox',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    title: 'Todos los trabajadores',
                                    region: 'west',
                                    id: 'proy_traba_grid_id',
                                    multiSelect: true,
                                    border: true,
                                    height: 200,
                                    width: 500,
                                    autoScroll: true,
                                    store: this.__data_store_general,
                                    columns: [
                                        { header: 'Nombre', dataIndex: 'trabajador_nombre_completo', flex: 10},
                                        { header: 'Cargo', dataIndex: 'nombre_cargo', flex: 5, hidden: false},
                                        { header: 'contratoid', dataIndex: 'contratoid', flex: 5, hidden: true},
                                        { header: 'id_tabaj', dataIndex: 'id_tabaj', flex: 5, hidden: true},
                                    ],
                                    enableDragDrop: true,
                                    viewConfig: {
                                        plugins: {
                                            ddGroup: 'prod-compra',
                                            ptype: 'gridviewdragdrop',
                                            enableDrop: true
                                        }
                                    },
                                    tbar: {
                                        id: 'proy_traba',
                                        items: [],
                                        height: 28
                                    }
                                },
                                {margin: 2},
                                {
                                    xtype: 'gridpanel',
                                    height: 200,
                                    width: 255,
                                    id: 'final',
                                    title: 'Trabajadores vinculados al proyecto',
                                    border: true,
                                    region: 'center',
                                    plugins: [cellEditing],
                                    store: _data_store_Productos_Compra,
                                    columns: [
                                        { header: 'Nombre', dataIndex: 'trabajador_nombre_completo', flex: 10},
                                        { header: 'Cargo', dataIndex: 'nombre_cargo', flex: 5, hidden: false},
                                        { header: 'contratoid', dataIndex: 'contratoid', flex: 5, hidden: true},
                                        { header: 'id_tabaj', dataIndex: 'id_tabaj', flex: 5, hidden: true}
                                    ],
                                    viewConfig: {
                                        plugins: {
                                            ddGroup: 'prod-compra',
                                            ptype: 'gridviewdragdrop',
                                            enableDrop: true
                                        }
                                    }
                                }
                            ]}
                    ],
                    fbar: [
                        {text: 'Aceptar',
                            handler: function () {
                                var proyect = Ext.getCmp('proyect').getValue();
                                var area = Ext.getCmp('area').getValue();
                                var jornada = Ext.getCmp('jornada').getValue();
                                var estim = Ext.getCmp('estim').getValue();
                                var fondo = Ext.getCmp('fondo').getValue();
                                var crrear = Ext.getCmp('crrear').getValue();
                                var centro = Ext.getCmp('centro').getValue();
                                var cuentas = Ext.getCmp('cuentas').getValue();
                                var date = Ext.getCmp('id_from_date').getValue();
                                var store = Ext.getCmp('final').store;
                                var my = new Array();
                                for (var i = 0; i < store.count(); i++) {
                                    my[i] = {
                                        contratoid: store.data.items[i].data.contratoid,
                                        Cargo: store.data.items[i].data.nombre_cargo,
                                        nombre: store.data.items[i].data.trabajador_nombre_completo,
                                        id_tabaj: store.data.items[i].data.id_tabaj
                                    }
                                }
                                var _result = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.Add_new',
                                    {data: Ext.encode(my), proyect: proyect, cuentas: cuentas, centro: centro, crrear: crrear, fondo: fondo, area: area, date: date, jornada: jornada, estim: estim});


                            }},
                        {text: 'Cancelar',
                            handler: function () {
                                Ext.getCmp('ventana_s').close();
                            }
                        }
                    ]
                }).show();
                this._store_combo = Ext.create('Ext.data.Store', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                    autoLoad: false
                });
                this.__data_store = Ext.create('Ext.data.Store', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                    autoLoad: false
                });
                var tbar1 = Ext.getCmp('proy_traba');
                tbar1.add({
                    xtype: 'checkbox',
                    id: 'select_unidad',
                    name: 'select_unidad',
                    hideEmptyLabel: false,
                    hideLabel: true,
                    layout: 'anchor',
                    anchor: '100%',
                    labelWidth: 55,
                    checked: true,
                    listeners: {
                        change: function (This, newValue) {
                            if (newValue == false) {
                                var result = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.CargarDatos1', {start: 0, limit: 25});
                                this._store_combo.loadData(result.rows);
                                Ext.getCmp('combo_value_id').enable();
                            }
                            else {
                                Ext.getCmp('proy_traba_grid_id').store.clearData(Ext.getCmp('proy_traba_grid_id').store);
                                Ext.getCmp('proy_traba_grid_id').store.load();
                                Ext.getCmp('combo_value_id').reset();
                                Ext.getCmp('combo_area_id').reset();
                                Ext.getCmp('combo_value_id').disable();
                                Ext.getCmp('combo_area_id').disable();
                            }

                        }, scope: this
                    }
                });
                tbar1.add('-');
                tbar1.add({
                    xtype: 'combobox',
                    name: 'combo_value_id',
                    id: 'combo_value_id',
                    store: this._store_combo,
                    displayField: 'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText: 'Seleccionar por Agencia',
                    selectOnFocus: true,
                    editable: false,
                    disabled: true,
                    listeners: {
                        change: function () {
                            var combo_value_id = Ext.getCmp('combo_value_id').getValue();
                            Ext.getCmp('proy_traba_grid_id').store.clearData(Ext.getCmp('proy_traba_grid_id').store);
                            var value = Ext.getCmp('combo_value_id').getValue();
                            var result = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.CargarAreas1', {value: value});
                            this.__data_store.loadData(result.rows);
                            var resultUnidad = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.Tomar_datos', {combo_value_id: combo_value_id, start: 0, limit: 25});
                            Ext.getCmp('proy_traba_grid_id').store.loadData(resultUnidad.rows);
                            Ext.getCmp('combo_area_id').enable();

                        }, scope: this
                    }
                });
                tbar1.add('-');
                tbar1.add({
                    xtype: 'combobox',
                    name: 'combo_area_id',
                    id: 'combo_area_id',
                    store: this.__data_store,
                    displayField: 'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText: 'Seleccionar por Área',
                    selectOnFocus: true,
                    editable: false,
                    disabled: true,
                    listeners: {
                        change: function () {
                            Ext.getCmp('proy_traba_grid_id').store.clearData(Ext.getCmp('proy_traba_grid_id').store);
                            var combo_value_id = Ext.getCmp('combo_value_id').getValue();
                            var combo_area_id = Ext.getCmp('combo_area_id').getValue();
                            var resultUnidadF = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.Tomar_datos', {combo_value_id: combo_value_id, combo_area_id: combo_area_id, start: 0, limit: 25});
                            Ext.getCmp('proy_traba_grid_id').store.loadData(resultUnidadF.rows);

                        }, scope: this
                    }
                });
            }
        });
        this._btn_del = Ext.create('Ext.Button', {
            text: 'Eliminar',
            id: 'del_PagoProyecto_btn_id',
            tooltip: 'Elimina Clasificaci&oacute;n Cientifica seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: function(){
                var _selectionModel = Ext.getCmp('Proyecto_grid_id').getSelectionModel();
                var _selected_rcd = _selectionModel.getLastSelected();
                var id_tpo = _selected_rcd.data.id;
                //alert(id_tpo);
                var _result = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.Eliminar',{id: id_tpo});
                Ext.getCmp('Proyecto_grid_id').store.load();
            }
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Configurar',
            id: 'mod_PagoProyecto_btn_id',
            tooltip: 'Modifica Clasificaci&oacute;n Cientifica seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: function () {
                var _selectionModel = Ext.getCmp('Proyecto_grid_id').getSelectionModel();
                var _selected_rcd = _selectionModel.getLastSelected();
                var id_tpo = _selected_rcd.data.id;
                var nombre = _selected_rcd.data.nombre;
                var jornada = _selected_rcd.data.jornada;
                var fondo_salario = _selected_rcd.data.fondo_salario;
                var estim = _selected_rcd.data.estim;
                this.__data_store_areas = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarAreas1', {
                    fields: [
                        {name: 'id'},
                        {name: 'trabajador_nombre_completo'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                this.__data_store_areas_inicio = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarAreas', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: true
                });
                this.__data_store_CCosto = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarCCosto', {
                    fields: [
                        {name: 'id'},
                        {name: 'c_costo'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                this.__data_store_CGasto = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarCGasto', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                this.__data_store_general = App.BuildJsonStore('PagoProyecto.PagoProyecto.Tomar_datos', {
                    fields: [
                        {name: 'id'},
                        {name: 'id_tabaj'},
                        {name: 'trabajador_nombre_completo'},
                        {name: 'identidad'},
                        {name: 'salario'},
                        {name: 'pago_adicion'},
                        {name: 'Anticipo', type: 'int'},
                        {name: 'cies', type: 'int'},
                        {name: 'cla', type: 'int'},
                        {name: 'horas_planV', type: 'int'},
                        {name: 'horas_realesV', type: 'int'},
                        {name: 'horaR', type: 'int'},
                        {name: 'CPL', type: 'int'},
                        {name: 'tnc', type: 'int'},
                        {name: 'otros', type: 'int'},
                        {name: 'contratoid'},
                        {name: 'antig_anios'},
                        {name: 'antig_neses'},
                        {name: 'Total', type: 'int'},
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    }, groupField: 'area',
                    autoLoad: true
                });
                this.__data_store_trbaj_proy = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarDatostrba', {
                    fields: [
                        {name: 'id_proy'},
                        {name: 'id_tabaj'},
                        {name: 'trabajador_nombre_completo'},
                        {name: 'identidad'},
                        {name: 'salario'},
                        {name: 'pago_adicion'},
                        {name: 'Anticipo', type: 'int'},
                        {name: 'cies', type: 'int'},
                        {name: 'cla', type: 'int'},
                        {name: 'horas_planV', type: 'int'},
                        {name: 'horas_realesV', type: 'int'},
                        {name: 'horaR', type: 'int'},
                        {name: 'CPL', type: 'int'},
                        {name: 'tnc', type: 'int'},
                        {name: 'otros', type: 'int'},
                        {name: 'Total', type: 'int'},
                        {name: 'contratoid'}
                    ],
                    params: {id_tpo: id_tpo},
                    proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                    autoLoad: true
                });
                Ext.create('Ext.window.Window', {
                    title: 'Gestion de Proyectos',
                    height: 600,
                    width: '95%',
                    modal: true,
                    id: 'ventana_s',
                    autoScroll: true,
                    bodyPadding: 10,
                    layout: 'anchor',
                    items: [

                        {layout: 'hbox',
                            items: [
                                {   xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Fecha',
                                    name: 'id_from_date_mod',
                                    id: 'id_from_date_mod',
                                    labelWidth: 100,
                                    listeners: {
                                         change: function (This, newValue, oldValue, eOpts) {
                                             var grid = Ext.getCmp('final1');
                                             var __data_store = App.BuildJsonStore('PagoProyecto.PagoProyecto.CargarDatostrba', {
                                                 fields: [
                                                     {name: 'id_proy'},
                                                     {name: 'id_tabaj'},
                                                     {name: 'trabajador_nombre_completo'},
                                                     {name: 'identidad'},
                                                     {name: 'salario'},
                                                     {name: 'pago_adicion'},
                                                     {name: 'Anticipo', type: 'int'},
                                                     {name: 'cies', type: 'int'},
                                                     {name: 'cla', type: 'int'},
                                                     {name: 'horas_plan', type: 'int'},
                                                     {name: 'horas_reales', type: 'int'},
                                                     {name: 'horaR', type: 'int'},
                                                     {name: 'CPL', type: 'int'},
                                                     {name: 'tnc', type: 'int'},
                                                     {name: 'otros', type: 'int'},
                                                     {name: 'Total', type: 'int'},
                                                     {name: 'contratoid'}
                                                 ],
                                                 params: {id_tpo: id_tpo,fecha:newValue},
                                                 proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                                                 autoLoad: false,
                                                 listeners:{
                                                     load:function(This, records, successful, eOpts)
                                                     {
                                                         if(This.data.length >0){
                                                            grid.reconfigure(This, [
                                                         Ext.create('Ext.grid.RowNumberer'),
                                                         { header: 'Nombre', dataIndex: 'trabajador_nombre_completo', flex: 10, renderer: pintar},
                                                         { header: '# Identidad', dataIndex: 'identidad', flex: 10, renderer: pintar},
                                                         { header: 'Salario', dataIndex: 'salario', flex: 5, renderer: pintar},
                                                         { header: 'Horas Plan', dataIndex: 'horas_plan', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                         { header: 'Horas Reales', dataIndex: 'horas_reales', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                         { header: 'Anticipo', menuDisabled: true, sortable: false, dataIndex: 'Anticipo', flex: 5, editor: {allowBlank: false}, renderer: cpl},
                                                         { header: 'cies', dataIndex: 'cies', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                                         { header: 'cla', dataIndex: 'cla', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                                         { header: 'otros', dataIndex: 'otros', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                         { header: 'Sub Total', dataIndex: 'Total', flex: 5, menuDisabled: true, sortable: false,
                                                             renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                                                                 var cies = record.get('cies');
                                                                 var cla = record.get('cla');
                                                                 var otros = record.get('otros');
                                                                 var Anticipo = record.get('Anticipo');
                                                                 var val = Anticipo + cies + cla + otros;
                                                                 var storeM = Ext.getCmp('final1').store;
                                                                 storeM.data.items[rowIdx].data.Total = val;
                                                                 return val;
                                                             }}

                                                     ]);
                                                            }
                                                         else {
                                                             grid.reconfigure(This, [
                                                                // Ext.create('Ext.grid.RowNumberer'),
                                                                 { header: 'Nombre', dataIndex: 'trabajador_nombre_completo', flex: 10, renderer: pintar},
                                                                 { header: '# Identidad', dataIndex: 'identidad', flex: 10, renderer: pintar},
                                                                 { header: 'Salario', dataIndex: 'salario', flex: 5, renderer: pintar},
                                                                 { header: 'Horas Plan', dataIndex: 'horas_planV', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                                 { header: 'Horas Reales', dataIndex: 'horas_realesV', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                                 { header: 'Anticipo', menuDisabled: true, sortable: false, dataIndex: 'Anticipo', flex: 5, editor: {allowBlank: false}, renderer: cpl},
                                                                 { header: 'cies', dataIndex: 'cies', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                                                 { header: 'cla', dataIndex: 'cla', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                                                 { header: 'otros', dataIndex: 'otros', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                                 { header: 'Sub Total', dataIndex: 'Total', flex: 5, menuDisabled: true, sortable: false,
                                                                     renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                                                                         var cies = record.get('cies');
                                                                         var cla = record.get('cla');
                                                                         var otros = record.get('otros');
                                                                         var Anticipo = record.get('Anticipo');
                                                                         var val = Anticipo + cies + cla + otros;
                                                                         var storeM = Ext.getCmp('final1').store;
                                                                         storeM.data.items[rowIdx].data.Total = val;
                                                                         return val;
                                                                     }}
                                                             ]);

                                                         }
                                                    }
                                                 }
                                             });
                                             __data_store.load({params: {start: 0, limit: 25}});

                                           /*  if(.results <0){
                                                grid.reconfigure(__data_store, [
                                                 Ext.create('Ext.grid.RowNumberer'),
                                                 { header: 'Nombre', dataIndex: 'trabajador_nombre_completo', flex: 10, renderer: pintar},
                                                 { header: '# Identidad', dataIndex: 'identidad', flex: 10, renderer: pintar},
                                                 { header: 'Salario', dataIndex: 'salario', flex: 5, renderer: pintar},
                                                 { header: 'Horas Plan', dataIndex: 'horas_plan', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                 { header: 'Horas Reales', dataIndex: 'horas_reales', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                 { header: 'Anticipo', menuDisabled: true, sortable: false, dataIndex: 'Anticipo', flex: 5, editor: {allowBlank: false}, renderer: cpl},
                                                 { header: 'cies', dataIndex: 'cies', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                                 { header: 'cla', dataIndex: 'cla', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                                 { header: 'otros', dataIndex: 'otros', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                                 { header: 'Sub Total', dataIndex: 'Total', flex: 5, menuDisabled: true, sortable: false,
                                                     renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                                                         var cies = record.get('cies');
                                                         var cla = record.get('cla');
                                                         var otros = record.get('otros');
                                                         var Anticipo = record.get('Anticipo');
                                                         var val = Anticipo + cies + cla + otros;
                                                         var storeM = Ext.getCmp('final1').store;
                                                         storeM.data.items[rowIdx].data.Total = val;
                                                         return val;
                                                     }}

                                             ]);
                                              //}*/
                                         },
                                        scope: this
                                    }
                                },
                                {margin: 20},
                                {
                                    xtype: 'checkboxfield',
                                    boxLabel: 'Cerrar en este pago',
                                    name: 'crrear',
                                    inputValue: '1',
                                    width: 337,
                                    id: 'crrear'
                                },
                            ]},
                           {layout: 'hbox',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    height: 200,
                                    width: '100%',
                                    id: 'final1',
                                    name: 'final1',
                                    title: 'Trabajadores vinculados al proyecto',
                                    border: true,
                                    multiSelect: true,
                                    store: this.__data_store_trbaj_proy,
                                    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                                    columns: [
                                        { header: 'Nombre', dataIndex: 'trabajador_nombre_completo', flex: 10, renderer: pintar},
                                        { header: '# Identidad', dataIndex: 'identidad', flex: 10, renderer: pintar},
                                        { header: 'Salario', dataIndex: 'salario', flex: 5, renderer: pintar},
                                        { header: 'Horas Plan', dataIndex: 'horas_planV', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                        { header: 'Horas Reales', dataIndex: 'horas_realesV', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                        { header: 'Anticipo', menuDisabled: true, sortable: false, dataIndex: 'Anticipo', flex: 5, editor: {allowBlank: false}, renderer: cpl},
                                        { header: 'cies', dataIndex: 'cies', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                        { header: 'cla', dataIndex: 'cla', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}, renderer: cpl},
                                        { header: 'otros', dataIndex: 'otros', flex: 5, menuDisabled: true, sortable: false, editor: {allowBlank: false}},
                                        { header: 'Sub Total', dataIndex: 'Total', flex: 5, menuDisabled: true, sortable: false,
                                            renderer: function (value, metaData, record, rowIdx, colIdx, store, view) {
                                                var cies = record.get('cies');
                                                var cla = record.get('cla');
                                                var otros = record.get('otros');
                                                var Anticipo = record.get('Anticipo');
                                                var val = Anticipo + cies + cla + otros;
                                                var storeM = Ext.getCmp('final1').store;
                                                storeM.data.items[rowIdx].data.Total = val;
                                                return val;
                                            }}
                                    ],
                                    viewConfig: {
                                        plugins: {
                                            ddGroup: 'prod-compra',
                                            ptype: 'gridviewdragdrop',
                                            enableDrop: true
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'Adicionar Trabajador',
                            columnWidth: 0.5,
                            id: 'final12',
                            name: 'final12',
                            checkboxToggle: true,
                            collapsed: false,
                            layout: 'anchor',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    title: 'Todos los trabajadores',
                                    region: 'west',
                                    id: 'proy_traba_grid_id',
                                    multiSelect: true,
                                    border: true,
                                    height: 200,
                                    width: '100%',
                                    autoScroll: true,
                                    store: this.__data_store_general,
                                    columns: [
                                        { header: 'Nombre', dataIndex: 'trabajador_nombre_completo', flex: 10}
                                    ],
                                    enableDragDrop: true,
                                    viewConfig: {
                                        plugins: {
                                            ddGroup: 'prod-compra',
                                            ptype: 'gridviewdragdrop',
                                            enableDrop: true
                                        }
                                    },
                                    tbar: {
                                        id: 'proy_traba',
                                        items: [],
                                        height: 28
                                    }
                                }
                            ]
                        }
                    ],
                    fbar: [
                        '->',
                        {text: 'Aceptar', handler: function () {
                            var crrear = Ext.getCmp('crrear').getValue();
                            var date = Ext.getCmp('id_from_date_mod').getValue();
                            var mydd = new Array();
                            mydd = Ext.getCmp('final1').getStore().getModifiedRecords();
                            _array = new Array();
                            var _selectionModel = Ext.getCmp('Proyecto_grid_id').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.id;
                            var fechaProy = _selected_rcd.data.fecha;
                            if (mydd.length === 0) {
                                App.InfoMessage('Información', 'No ha modificado fila');
                            }
                            else {
                                if( !date=="" || !date == null ){
                                for (var i = 0; i < mydd.length; i++) {
                                    _array.push(mydd[i].getData());
                                }
                                console.log(_array);
                                var _result = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.Add',
                                    {id: id, data: Ext.encode(_array),fechaProy:fechaProy, crrear: crrear,date: date});
                                }
                                else {App.InfoMessage('Información', 'Debe insertar una fecha valida.');}
                            }
                        }},
                        {text: 'Cancelar', handler: function () {
                            Ext.getCmp('ventana_s').close();
                        }
                        }
                    ]
                }).show();
                this._store_combo = Ext.create('Ext.data.Store', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                    autoLoad: false
                });
                this.__data_store = Ext.create('Ext.data.Store', {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                    autoLoad: false
                });
                function pintar(val2, met, record, a, b, c, d) {
                    met.style = 'font-style:italic !important;background: #7398FE;';
                    return val2;
                }
                function cpl(val2, met, record, a, b, c, d) {
                    met.style = 'font-style:italic !important;background: #51A351;';
                    return val2;
                }
                var tbar1 = Ext.getCmp('proy_traba');
                tbar1.add({
                    xtype: 'checkbox',
                    id: 'select_unidad',
                    name: 'select_unidad',
                    hideEmptyLabel: false,
                    hideLabel: true,
                    layout: 'anchor',
                    anchor: '100%',
                    labelWidth: 55,
                    checked: true,
                    listeners: {
                        change: function (This, newValue) {
                            if (newValue == false) {
                                var result = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.CargarDatos1', {start: 0, limit: 25});
                                this._store_combo.loadData(result.rows);
                                Ext.getCmp('combo_value_id').enable();
                            }
                            else {
                                Ext.getCmp('proy_traba_grid_id').store.clearData(Ext.getCmp('proy_traba_grid_id').store);
                                Ext.getCmp('proy_traba_grid_id').store.load();
                                Ext.getCmp('combo_value_id').reset();
                                Ext.getCmp('combo_area_id').reset();
                                Ext.getCmp('combo_value_id').disable();
                                Ext.getCmp('combo_area_id').disable();
                            }

                        }, scope: this
                    }
                });
                tbar1.add('-');
                tbar1.add({
                    xtype: 'combobox',
                    name: 'combo_value_id',
                    id: 'combo_value_id',
                    store: this._store_combo,
                    displayField: 'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText: 'Seleccionar por Agencia',
                    selectOnFocus: true,
                    editable: false,
                    disabled: true,
                    listeners: {
                        change: function () {
                            var combo_value_id = Ext.getCmp('combo_value_id').getValue();
                            Ext.getCmp('proy_traba_grid_id').store.clearData(Ext.getCmp('proy_traba_grid_id').store);
                            var value = Ext.getCmp('combo_value_id').getValue();
                            var result = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.CargarAreas1', {value: value});
                            this.__data_store.loadData(result.rows);
                            var resultUnidad = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.Tomar_datos', {combo_value_id: combo_value_id, start: 0, limit: 25});
                            Ext.getCmp('proy_traba_grid_id').store.loadData(resultUnidad.rows);
                            Ext.getCmp('combo_area_id').enable();

                        }, scope: this
                    }
                });
                tbar1.add('-');
                tbar1.add({
                    xtype: 'combobox',
                    name: 'combo_area_id',
                    id: 'combo_area_id',
                    store: this.__data_store,
                    displayField: 'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText: 'Seleccionar por Área',
                    selectOnFocus: true,
                    editable: false,
                    disabled: true,
                    listeners: {
                        change: function () {
                            Ext.getCmp('proy_traba_grid_id').store.clearData(Ext.getCmp('proy_traba_grid_id').store);
                            var combo_value_id = Ext.getCmp('combo_value_id').getValue();
                            var combo_area_id = Ext.getCmp('combo_area_id').getValue();
                            var resultUnidadF = App.PerformSyncServerRequest('PagoProyecto.PagoProyecto.Tomar_datos', {combo_value_id: combo_value_id, combo_area_id: combo_area_id, start: 0, limit: 25});
                            Ext.getCmp('proy_traba_grid_id').store.loadData(resultUnidadF.rows);

                        }, scope: this
                    }
                });
            }
        });
        this._btn_moddef = Ext.create('Ext.Button', {
            text: 'Definir GAstos',
            id: 'mod_PagoProyecto_btn_id_def',
            tooltip: 'Modifica Clasificaci&oacute;n Cientifica seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('PagoProyecto_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_class_cien',
            id: 'searchField_class_cien',
            enableKeyEvents: true,
            hideLabel: true,
            width: 200,
            emptyText: 'Clasificaci&oacute;n Cientifica...',
            listeners: {
                change: function () {
                    console.log(Ext.getCmp('PagoProyecto_grid_id').store);
                    Ext.getCmp('PagoProyecto_grid_id').store.clearFilter();
                    Ext.getCmp('PagoProyecto_grid_id').store.filter("nombre", Ext.getCmp('searchField_class_cien').getValue());
                }, scope: this
            }
        });
    }
    this.Enable = function () {
        this._btn_mod.enable();
        this._btn_del.enable();
        this._btn_moddef.enable();
    }
    this.Disable = function () {
        this._btn_mod.disable();
        this._btn_del.disable();
        this._btn_moddef.disable();
    }
}
App.RegisterFunction('PagoProyectoGestionar', new PagoProyectoGestionar());