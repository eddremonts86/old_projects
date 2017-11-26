function PlantillaGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Plantilla_btn_id',
            tooltip : 'Adiciona una nueva Plantilla',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddPlantilla, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Plantilla_btn_id',
            tooltip : 'Elimina la Plantilla seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Plantilla_btn_id',
            tooltip : 'Modifica la Plantilla seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdPlantilla, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Plantilla_tbar_id');
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
            name: 'searchField_plantilla',
            id:'searchField_plantilla',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
                change:function(){
                    Ext.getCmp('Plantilla_grid_id').store.clearFilter();
                    Ext.getCmp('Plantilla_grid_id').store.filter("trabajador", Ext.getCmp('searchField_plantilla').getValue());
                    Ext.getCmp('Plantilla_grid_id').store.filter("nombre", Ext.getCmp('searchField_plantilla1').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_plantilla1',
            id:'searchField_plantilla1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Tipo de contrato...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Plantilla_grid_id').store);
                    Ext.getCmp('Plantilla_grid_id').store.clearFilter();
                    Ext.getCmp('Plantilla_grid_id').store.filter("nombre", Ext.getCmp('searchField_plantilla1').getValue());
                    Ext.getCmp('Plantilla_grid_id').store.filter("trabajador", Ext.getCmp('searchField_plantilla').getValue());
                },scope:this
            }
        });
    }

    this.Enable = function(){
        this._btn_mod.enable();
        this._btn_del.enable();
    }
    this.Disable = function(){
        this._btn_mod.disable();
        this._btn_del.disable();
    }
}
App.RegisterFunction('PlantillaGestionar', new PlantillaGestionar());
this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
Plantilla.prototype.winaddPlantilla = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('Plantilla.Plantilla.CargarAnnos',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_Trabajador= App.BuildJsonStore('Plantilla.Plantilla.Cargarcontratos',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'nombre_completo'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                pageSize: 10,
                autoLoad: false
            });
        this._store_combo_areas= App.BuildJsonStore('Plantilla.Plantilla.area',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_preparacion= App.BuildJsonStore('Plantilla.Plantilla.Cargarniveles',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_preparacion_CargarFpago= App.BuildJsonStore('Plantilla.Plantilla.CargarFpago',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_preparacion_CargarSpago= App.BuildJsonStore('Plantilla.Plantilla.CargarSpago',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_preparacion_CargarHtrabajo= App.BuildJsonStore('Plantilla.Plantilla.CargarHtrabajo',
            {
                fields: [
                    {name: 'tipo'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_agencias= App.BuildJsonStore('Plantilla.Plantilla.CargarAgencia',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });

        this.paneladdPlantilla = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'paneladdPlantilla',
            name:'paneladdPlantilla',
            defaults: {anchor: '100%',labelWidth:150},
           items: [
               {
                   xtype:'combobox',
                   name:'combo_value_id',
                   id:'combo_value_id',
                   fieldLabel: 'Contrato',
                   store: this._store_combo,
                   displayField:'nombre',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   allowBlank: false

               },
               {
                   xtype:'combobox',
                   name:'combo_contrato_value',
                   id:'combo_contrato_value_id',
                   fieldLabel: 'Trabajador',
                   store: this._store_combo_Trabajador,
                   displayField:'nombre_completo',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   allowBlank: false,
                   pageSize: 10,
                   listConfig: {
                       loadingText: 'Cargando...',
                       emptyText: 'No existen datos.',
                       getInnerTpl: function() {return  '{nombre_completo}';}
                   }
               },
               {
                   xtype: 'combobox',
                   name: 'combo_value_id_agencias',
                   id: 'combo_value_id_agencias',
                   fieldLabel: 'Agencia',
                   store: this._store_combo_agencias,
                   displayField: 'nombre',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText: 'Seleccionar por Agencia',
                   selectOnFocus: true,
                   editable: true,
                   listeners: {
                       change:function(){
                           var value = Ext.getCmp('combo_value_id_agencias').getValue() ;
                           var result = App.PerformSyncServerRequest('Plantilla.Plantilla.CargarAreas',{value:value});
                           this._store_combo_areas.loadData(result.rows);
                           Ext.getCmp('combo_nivel_value_id_area').enable();

                       },scope:this
                   }
               },
               {
                   xtype:'combobox',
                   name:'combo_nivel_value_area',
                   id:'combo_nivel_value_id_area',
                   fieldLabel: 'Areas',
                   store: this._store_combo_areas,
                   displayField:'nombre',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   disabled:true,
                   allowBlank: false,
                   listeners:{
                       change:function(){
                           Ext.getCmp('combo_nivel_value_id').store.clearData();
                           var value = Ext.getCmp('combo_nivel_value_id_area').getValue() ;
                           var resultUnidad = App.PerformSyncServerRequest('Plantilla.Plantilla.CargarAreasxCargo',{value:value});
                           Ext.getCmp('combo_nivel_value_id').store.loadData(resultUnidad.rows);
                           Ext.getCmp('combo_nivel_value_id').enable();
                           Ext.getCmp('combo_Sistema_value_id').enable();
                           Ext.getCmp('combo_Forma_value_id').enable();
                           Ext.getCmp('combo_Horario_value_id').enable();
                           Ext.getCmp('fecha_inicio').enable();
                           Ext.getCmp('fecha_fin').enable();


                       },scope:this

                   }
               },
               {
                   xtype:'combobox',
                   name:'combo_nivel_value',
                   id:'combo_nivel_value_id',
                   fieldLabel: 'Tipo de Cargo',
                   store: this._store_combo_preparacion,
                   displayField:'nombre',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   disabled:true,
                   allowBlank: false
               },
               {
                   xtype:'combobox',
                   name:'combo_Sistema_value',
                   id:'combo_Sistema_value_id',
                   fieldLabel: 'Sistema de Pago',
                   store: this._store_combo_preparacion_CargarSpago,
                   displayField:'nombre',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   disabled:true,
                   allowBlank: false
               },
               {
                   xtype:'combobox',
                   name:'combo_Forma_value',
                   id:'combo_Forma_value_id',
                   fieldLabel: 'Forma de pago',
                   store: this._store_combo_preparacion_CargarFpago,
                   displayField:'nombre',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   disabled:true,
                   allowBlank: false
               },
               {
                   xtype:'combobox',
                   name:'combo_Horario_value',
                   id:'combo_Horario_value_id',
                   fieldLabel: 'Horario de trabajo',
                   store: this._store_combo_preparacion_CargarHtrabajo,
                   displayField:'tipo',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   disabled:true,
                   allowBlank: false
               },
               {
                   xtype: 'datefield',
                   fieldLabel: 'Fecha de inicio',
                   name: 'fecha_inicio',
                   id: 'fecha_inicio',
                   allowBlank: false,
                   editable: false,
                   disabled:true

               },
               {
                   xtype: 'datefield',
                   fieldLabel: 'Fecha de Fin',
                   name: 'fecha_fin',
                   id: 'fecha_fin',
                   allowBlank: true,
                   disabled:true,
                   editable: false

               },
               {
                   xtype: 'fieldset',
                   checkboxToggle: true,
                   collapsed: true,
                   flex: 1,
                   height:170,
                   title: 'Datos Opcionales',
                   layout: 'column',
                   defaults: {
                       anchor: '100%',
                       hideEmptyLabel: false,
                       labelWidth:150
                   },
                   items: [
                       {
                           // Fieldset in Column 1 - collapsible via toggle button
                           xtype:'fieldset',
                           columnWidth: 0.6,
                           height:125,
                           title: 'Responsabilidad',
                           collapsible: false,
                           id:'trabajadores4',
                           name:'trabajadores4',
                           defaults: {anchor: '100%'},
                           layout: 'anchor',
                           items :[{
                               xtype:'radio',
                               boxLabel: 'Director General (Empresa)',
                               name: 'dir',
                               inputValue: '1'
                           },
                               {
                                   boxLabel: 'Director Unidad/Agencia',
                                   name: 'dir',
                                   xtype:'radio',
                                   inputValue: '2'
                               },
                               {
                                   boxLabel: 'Director Area/Jefe Departamento',
                                   name: 'dir',
                                   xtype:'radio',
                                   inputValue: '3'
                               }
                           ]
                       },
                       {
                           // Fieldset in Column 1 - collapsible via toggle button
                           xtype:'fieldset',
                           columnWidth: 0.4,
                           title: 'Cuadros y Reseva',
                           collapsible: false,
                           id:'trabajad',
                           name:'trabajad',height:125,
                           defaults: {anchor: '100%',defaultType: 'radio'},
                           layout: 'anchor',
                           items :[{
                               boxLabel: 'Cuadro',
                               name: 'cuadro',
                               xtype:'checkbox',
                               inputValue: '1'
                               },
                               {
                                   boxLabel: 'Reserva',
                                   name: 'reserva',
                                   xtype:'checkbox',
                                   inputValue: '2'
                               }
                           ]
                       }
                   ]
               }
           ]
        });
        var _gst_winaddPlantilla = new Ext.Window({
                title:'Adicionar una Plantilla.',
                id: '_gst_AddPlantilla_win_id',
                name: '_gst_AddPlantilla_win_id',
                height: 580,
                width: 520,
                resizable:true,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.paneladdPlantilla],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-primary',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winaddPlantilla.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                       // Ext.getCmp('nombre_id').focus(true, true);
                        console.log("entro");
                        this._store_combo.load();
                        this._store_combo_Trabajador.load();
                        this._store_combo_areas.load();
                        this._store_combo_preparacion.load();

                    }, scope: this
                }
            });
        _gst_winaddPlantilla.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Plantilla.prototype.winupdPlantilla = function(_paccion){
    var _selectionModel = Ext.getCmp('Plantilla_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var _value_nom_oll=_selected_rcd.data.valor;
    var id_tpo=_selected_rcd.data.id;
    var old_cargo_id=_selected_rcd.data.cargo_id;
    var trbajador_id=_selected_rcd.data.trabajadorid;
    var nombre_completo=_selected_rcd.data.nombre_completo;
    var contrato_id=_selected_rcd.data.contrato_id;contrato_tabla_id
    var contrato_tabla_id=_selected_rcd.data.contrato_tabla_id;
    var _value_nom = null;
    if(_paccion == 'upd')
    {
        this._store_combo= App.BuildJsonStore('Plantilla.Plantilla.CargarAnnos',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_Trabajador= App.BuildJsonStore('Plantilla.Plantilla.Cargarcontratos',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'nombre_completo'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                pageSize: 10,
                autoLoad: false
            });
        this._store_combo_areas= App.BuildJsonStore('Plantilla.Plantilla.area',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_preparacion= App.BuildJsonStore('Plantilla.Plantilla.Cargarniveles',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_preparacion_CargarFpago= App.BuildJsonStore('Plantilla.Plantilla.CargarFpago',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_preparacion_CargarSpago= App.BuildJsonStore('Plantilla.Plantilla.CargarSpago',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_preparacion_CargarHtrabajo= App.BuildJsonStore('Plantilla.Plantilla.CargarHtrabajo',
            {
                fields: [
                    {name: 'tipo'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_agencias= App.BuildJsonStore('Plantilla.Plantilla.CargarAgencia',
            {
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });


        this.paneladdPlantillaUpdate = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'paneladdPlantilla',
            name:'paneladdPlantilla',
            defaults: {anchor: '100%',labelWidth:150},
            items: [
                {
                    xtype:'textfield',
                    name:'id',
                    id:'id',
                    hidden:true,
                    value:id_tpo
                },
                {
                    xtype:'textfield',
                    name:'contrato_tabla_id',
                    id:'contrato_tabla_id',
                    hidden:true,
                    value:contrato_tabla_id
                },
                {
                    xtype:'textfield',
                    name:'contrato_id',
                    id:'contrato_id',
                    hidden:true,
                    value:contrato_id
                },
                {
                    xtype:'textfield',
                    name:'trbajador_id',
                    id:'trbajador_id',
                    hidden:true,
                    value:trbajador_id,
                    pageSize: 10,
                    listConfig: {
                        loadingText: 'Cargando...',
                        emptyText: 'No existen datos.',
                        getInnerTpl: function() {return  '{nombre_completo}';}
                    }
                },
                {
                    xtype:'textfield',
                    name:'old_cargo_id',
                    id:'old_cargo_id',
                    hidden:true,
                    value:old_cargo_id
                },
                {
                    xtype:'combobox',
                    name:'contrato',
                    id:'contrato',
                    fieldLabel: 'Contrato',
                    store: this._store_combo,
                    displayField:'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText:'Select a state...',
                    selectOnFocus:true,
                    editable:false,
                    allowBlank: false

                },
                {
                    xtype: 'combobox',
                    name: 'agencias',
                    id: 'combo_value_id_agencias',
                    fieldLabel: 'Agencia',
                    store: this._store_combo_agencias,
                    displayField: 'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText: 'Seleccionar por Agencia',
                    selectOnFocus: true,
                    editable: true,
                    listeners: {
                        change:function(){
                            var value = Ext.getCmp('combo_value_id_agencias').getValue() ;
                            var result = App.PerformSyncServerRequest('Plantilla.Plantilla.CargarAreas',{value:value});
                            this._store_combo_areas.loadData(result.rows);
                            Ext.getCmp('combo_nivel_value_id_area').enable();

                        },scope:this
                    }
                },
                {
                    xtype:'combobox',
                    name:'area',
                    id:'combo_nivel_value_id_area',
                    fieldLabel: 'Areas',
                    store: this._store_combo_areas,
                    displayField:'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText:'Select a state...',
                    selectOnFocus:true,
                    editable:false,
                    disabled:true,
                    allowBlank: false,
                    listeners:{
                        change:function(){
                            Ext.getCmp('cargo').store.clearData();
                            var value = Ext.getCmp('combo_nivel_value_id_area').getValue() ;
                            var resultUnidad = App.PerformSyncServerRequest('Plantilla.Plantilla.CargarAreasxCargo',{value:value});
                            Ext.getCmp('cargo').store.loadData(resultUnidad.rows);
                            Ext.getCmp('cargo').enable();
                            Ext.getCmp('combo_Sistema_value_id').enable();
                            Ext.getCmp('combo_Forma_value_id').enable();
                            Ext.getCmp('combo_Horario_value_id').enable();
                            Ext.getCmp('fecha_inicio').enable();
                            Ext.getCmp('fecha_fin').enable();


                        },scope:this

                    }
                },
                {
                    xtype:'combobox',
                    name:'cargo',
                    id:'cargo',
                    fieldLabel: 'Tipo de Cargo',
                    store: this._store_combo_preparacion,
                    displayField:'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText:'Select a state...',
                    selectOnFocus:true,
                    editable:false,
                    disabled:true,
                    allowBlank: false
                },
                {
                    xtype:'combobox',
                    name:'sistemaPago',
                    id:'combo_Sistema_value_id',
                    fieldLabel: 'Sistema de Pago',
                    store: this._store_combo_preparacion_CargarSpago,
                    displayField:'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText:'Select a state...',
                    selectOnFocus:true,
                    editable:false,
                    disabled:true,
                    allowBlank: false
                },
                {
                    xtype:'combobox',
                    name:'formaPago',
                    id:'combo_Forma_value_id',
                    fieldLabel: 'Forma de pago',
                    store: this._store_combo_preparacion_CargarFpago,
                    displayField:'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText:'Select a state...',
                    selectOnFocus:true,
                    editable:false,
                    disabled:true,
                    allowBlank: false
                },
                {
                    xtype:'combobox',
                    name:'hrarioTrabajo',
                    id:'combo_Horario_value_id',
                    fieldLabel: 'Horario de trabajo',
                    store: this._store_combo_preparacion_CargarHtrabajo,
                    displayField:'tipo',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText:'Select a state...',
                    selectOnFocus:true,
                    editable:false,
                    disabled:true,
                    allowBlank: false
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Fecha de inicio',
                    name: 'fecha_inicio',
                    id: 'fecha_inicio',
                    allowBlank: false,
                    editable: false,
                    disabled:true

                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Fecha de Fin',
                    name: 'fecha_fin',
                    id: 'fecha_fin',
                    allowBlank: true,
                    disabled:true,
                    editable: false

                },
                {
                    xtype: 'fieldset',
                    checkboxToggle: true,
                    collapsed: true,
                    flex: 1,
                    height:170,
                    title: 'Datos Opcionales',
                    layout: 'column',
                    defaults: {
                        anchor: '100%',
                        hideEmptyLabel: false,
                        labelWidth:150
                    },
                    items: [
                        {
                            // Fieldset in Column 1 - collapsible via toggle button
                            xtype:'fieldset',
                            columnWidth: 0.6,
                            height:125,
                            title: 'Responsabilidad',
                            collapsible: false,
                            id:'trabajadores4',
                            name:'trabajadores4',
                            defaults: {anchor: '100%'},
                            layout: 'anchor',
                            items :[{
                                xtype:'radio',
                                boxLabel: 'Director General (Empresa)',
                                name: 'dir',
                                inputValue: '1'
                            },
                                {
                                    boxLabel: 'Director Unidad/Agencia',
                                    name: 'dir',
                                    xtype:'radio',
                                    inputValue: '2'
                                },
                                {
                                    boxLabel: 'Director Area/Jefe Departamento',
                                    name: 'dir',
                                    xtype:'radio',
                                    inputValue: '3'
                                }
                            ]
                        },
                        {
                            // Fieldset in Column 1 - collapsible via toggle button
                            xtype:'fieldset',
                            columnWidth: 0.4,
                            title: 'Cuadros y Reseva',
                            collapsible: false,
                            id:'trabajad',
                            name:'trabajad',
                            height:125,
                            defaults: {anchor: '100%',defaultType: 'radio'},
                            layout: 'anchor',
                            items :[{
                                boxLabel: 'Cuadro',
                                name: 'cuadro',
                                xtype:'checkbox',
                                inputValue: '1'
                            },
                                {
                                    boxLabel: 'Reserva',
                                    name: 'reserva',
                                    xtype:'checkbox',
                                    inputValue: '2'
                                }
                            ]
                        }
                    ]
                },
                {
                    html : '<img src="SubSystems/Plantilla/Config/Client/icons/help.png" width="16px" height="16px" aline="center">' +
                        ' Nota: Esta modificando la plantilla de el trabajador <b> '+ nombre_completo +'</b>.'

                }
            ]
        });


        var _gst_winaddPlantilla = new Ext.Window(
            {
                title:'Modificar la Plantilla.',
                id: '_gst_updPlantilla_win_id',
                name: '_gst_updPlantilla_win_id',
                height: 550,
                width: 460,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.paneladdPlantillaUpdate],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-primary',
                    handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winaddPlantilla.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        // Ext.getCmp('nombre_id').focus(true, true);
                        console.log("entro");
                        this._store_combo.load();
                        this._store_combo_areas.load();
                        this._store_combo_preparacion.load();

                    }, scope: this
                }
            });

        _gst_winaddPlantilla.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Plantilla.prototype.Add = function(_paccion){

    if (Ext.getCmp('paneladdPlantilla').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Plantilla.Plantilla.Add',this.paneladdPlantilla.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('paneladdPlantilla').getForm().reset();
            this.__data_store.load();
            App.InfoMessage('Información', 'Plantilla adicionada satisfactoriamente');
        }
    }
}
Plantilla.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('paneladdPlantilla').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Plantilla.Plantilla.Modif',this.paneladdPlantillaUpdate.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('_gst_updPlantilla_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Plantilla modificada satisfactoriamente');
        }
        else {
            App.InfoMessage('Información', 'Ha ocurrido un problema en e proceso.');
        }
    }
 }
Plantilla.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Plantilla_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        var value = _selected_rcd.data.cargo_id;
        var trabajadorid = _selected_rcd.data.trabajadorid;

        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Plantilla.Plantilla.Eliminar', {id: id,value:value,trabajadorid:trabajadorid});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Plantilla eliminada correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Plantilla?');

}