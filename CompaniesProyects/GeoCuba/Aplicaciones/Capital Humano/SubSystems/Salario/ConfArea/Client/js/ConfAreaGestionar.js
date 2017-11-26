function ConfAreaGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_ConfArea_btn_id',
            tooltip : 'Adiciona una nueva Unidad Empresarial de Base',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddConfArea, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_ConfArea_btn_id',
            tooltip : 'Elimina la Unidad Empresarial de Base seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_ConfArea_btn_id',
            tooltip : 'Modifica la Unidad Empresarial de Base seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdConfArea, this.Owner, ['upd'])
        });
        this._btn_conf = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'conf_ConfArea_btn_id',
            tooltip : 'Modifica la Unidad Empresarial de Base seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdConfArea_conf, this.Owner, ['conf'])
        });
        var tbar = Ext.getCmp('ConfArea_tbar_id');
        tbar.add(this._btn_conf);
        tbar.add(' ');
        tbar.add('->');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
    }
    this.Enable = function(){
        this._btn_mod.enable();
        this._btn_del.enable();
        this._btn_conf.enable();
    }
    this.Disable = function(){
        this._btn_mod.disable();
        this._btn_del.disable();
        this._btn_conf.disable();
    }
}
App.RegisterFunction('ConfAreaGestionar', new ConfAreaGestionar());
this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
ConfArea.prototype.winaddConfArea = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('ConfArea.ConfArea.CargarAnnos',
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

       this.panel = Ext.create('Ext.form.Panel', {
            name:'panel',
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'panel',
            defaults: {
                anchor: '100%'
            },
           //defaultType: 'textfield',
           items: [{
               xtype:'textfield',
               fieldLabel: 'Nombre',
               name: 'nombre_id',
               id:'nombre_id',
               allowBlank: false,
               maxLength: 255,
               maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
           },{
               xtype:'textfield',
               fieldLabel: 'Código',
               name: 'numero_id',
               id:'numero_id',
               allowBlank: false,
               maxLength: 255,
               maskRe: /[0123456789]/
             },
               {
                   xtype:'combobox',
                   name:'combo_value_id',
                   id:'combo_value_id',
                   fieldLabel: 'Empresa',
                   store: this._store_combo,
                   displayField:'nombre',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false

               }

           ]
        });

        var _gst_winaddConfArea = new Ext.Window(
            {
                title:'Adicionar una Unidad Empresarial de Base.',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 190,
                width: 460,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',
                    cls:'btn btn-primary',
                    handler: function(){
                        _gst_winaddConfArea.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo.load();
                    }, scope: this
                }
            });

        _gst_winaddConfArea.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
ConfArea.prototype.winupdConfArea = function(_paccion){
    var _selectionModel = Ext.getCmp('ConfArea_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
   //_value_nom_oll=_selected_rcd.data.valor;
    //id_tpo=_selected_rcd.data.valor;
    var _value_nom = null;
    if(_paccion == 'upd')
    {
        _value_nom=_selected_rcd.data.nombre;

        this._store_combo= App.BuildJsonStore('ConfArea.ConfArea.CargarAnnos',{
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
        this.panelupd = Ext.create('Ext.form.Panel', {
            name:'panelupd',
            id:'panelupd',
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            items: [
                {
                xtype:'textfield',
                fieldLabel: 'Nombre',
                name: 'nombre_id_upd',
                id:'nombre_id_upd',
                value:_selected_rcd.data.nombre,
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
               },
                {
                    xtype : 'hidden',
                    name: 'old_name',
                    id: 'old_name',
                    value :_selected_rcd.data.nombre
            },
                {
                xtype:'textfield',
                fieldLabel: 'Código',
                name: 'numero_id_upd',
                id:'numero_id_upd',
                value:_selected_rcd.data.codigo,
                allowBlank: false,
                maxLength: 255,
                maskRe: /[0123456789]/
            },
                {
                    xtype:'combobox',
                    name:'combo_value_id_upd',
                    id:'combo_value_id_upd ',
                    fieldLabel: 'Empresa',
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
                    allowBlank:false
                }

            ]
        });
        var _gst_winupdConfArea = new Ext.Window({
                title:'Modificar la Unidad Empresarial de Base.',
                id: '_gst_upd_win_id',
                name: '_gst_upd_win_id',
                height: 190,
                width: 460,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panelupd],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winupdConfArea.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                       //Ext.getCmp('numero_id_upd').focus(true, true);
                       //Ext.getCmp('combo_value_id_upd').select(_value_nom);
                       this._store_combo.load();
                    }, scope: this
                }
            });
        _gst_winupdConfArea.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
ConfArea.prototype.winupdConfArea_conf = function(_paccion){
    var _selectionModel = Ext.getCmp('ConfArea_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var id=_selected_rcd.data.id;
    if(_paccion == 'conf')
    {
        var _result_inc = App.PerformSyncServerRequest('ConfArea.ConfArea.CargarDatos_inc',{id:id});
        this.__data_store_traba = App.BuildJsonStore('ConfArea.ConfArea.Cargartrba',{
                fields: [
                    {name: 'contrato_id'},
                    {name: 'nombre_completo'},
                    {name: 'cargo'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this.__data_store_ag = App.BuildJsonStore('ConfArea.ConfArea.CargarAnnos',{
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
        this.__data_store_CGasto = App.BuildJsonStore('ConfArea.ConfArea.CargarCGasto',{
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

        var combo1= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Elaborado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',
            id:'combo1',
            labelWidth:140,
            name:'combo1',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo1').setValue('');
                        Ext.getCmp('combo1_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo1').setValue(_result_inc.rows[0]['p_elaborador']);
                        Ext.getCmp('combo1_text').setValue(_result_inc.rows[0]['p_cargo_elab']);
                       // console.log(This.store.data/*items[0].data.cargo*/);
                    }
                },
                select:function(combo, records, eOpts){
                        var cargo =records[0].data.cargo;
                        Ext.getCmp('combo1_text').setValue(cargo);
                }
            }

        });
        var combo2= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Revizado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',labelWidth:140,
            id:'combo2',
            name:'combo2',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo2').setValue('');
                        Ext.getCmp('combo2_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo2').setValue(_result_inc.rows[0]['p_realiz']);
                        Ext.getCmp('combo2_text').setValue(_result_inc.rows[0]['p_cargo_aprob']);
                    }
                },
                select:function(combo, records, eOpts){
                    var cargo =records[0].data.cargo;
                    Ext.getCmp('combo2_text').setValue(cargo);
                }}
        });
        var combo3= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Aprobado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',
            id:'combo3',
            name:'combo3',labelWidth:140,
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                if (_result_inc.rows==false){
                    Ext.getCmp('combo3').setValue('');
                    Ext.getCmp('combo3_text').setValue('');
                }
                else{
                    Ext.getCmp('combo3').setValue(_result_inc.rows[0]['p_aprobador']);
                    Ext.getCmp('combo3_text').setValue(_result_inc.rows[0]['p_realiz_elab']);
                }
            },
                select:function(combo, records, eOpts){
                    var cargo =records[0].data.cargo;
                    Ext.getCmp('combo3_text').setValue(cargo);
                }}
        });

        var combo4= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Elaborado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',
            id:'combo4',
            name:'combo4',labelWidth:140,
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                if (_result_inc.rows==false){
                    Ext.getCmp('combo4').setValue('');
                    Ext.getCmp('combo4_text').setValue('');
                }
                else{
                    Ext.getCmp('combo4').setValue(_result_inc.rows[0]['c_elaborado']);
                    Ext.getCmp('combo4_text').setValue(_result_inc.rows[0]['c_cargo_elaborado']);
                }
            },
                select:function(combo, records, eOpts){
                        var cargo =records[0].data.cargo;
                        Ext.getCmp('combo4_text').setValue(cargo);
                }
            }
        });
        var combo5= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Revizado por:',
            store:  this.__data_store_traba,labelWidth:140,
            queryMode: 'local',
            id:'combo5',
            name:'combo5',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo5').setValue('');
                        Ext.getCmp('combo5_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo5').setValue(_result_inc.rows[0]['c_realizado']);
                        Ext.getCmp('combo5_text').setValue(_result_inc.rows[0]['c_cargo_realizado']);
                    }
                },
                select:function(combo, records, eOpts){
                    var cargo =records[0].data.cargo;
                    Ext.getCmp('combo5_text').setValue(cargo);
                }}
        });
        var combo6= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Aprobado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',
            id:'combo6',labelWidth:140,
            name:'combo6',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo6').setValue('');
                        Ext.getCmp('combo6_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo6').setValue(_result_inc.rows[0]['c_aprobado']);
                        Ext.getCmp('combo6_text').setValue(_result_inc.rows[0]['c_cargo_aprobado']);
                    }
                },
                select:function(combo, records, eOpts){
                    var cargo =records[0].data.cargo;
                    Ext.getCmp('combo6_text').setValue(cargo);
                }}
        });

        var combo7= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Elaborado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',
            id:'combo7',labelWidth:140,
            name:'combo7',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo7').setValue('');
                        Ext.getCmp('combo7_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo7').setValue(_result_inc.rows[0]['n_elaborado']);
                        Ext.getCmp('combo7_text').setValue(_result_inc.rows[0]['n_cargo_elaborado']);
                    }
                },
                select:function(combo, records, eOpts){
                        var cargo =records[0].data.cargo;
                        Ext.getCmp('combo7_text').setValue(cargo);
                }
            }
        });
        var combo8= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Revizado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',
            id:'combo8',labelWidth:140,
            name:'combo8',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo8').setValue('');
                        Ext.getCmp('combo8_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo8').setValue(_result_inc.rows[0]['n_realizado']);
                        Ext.getCmp('combo8_text').setValue(_result_inc.rows[0]['n_cargo_realizado']);
                    }
                },
                select:function(combo, records, eOpts){
                    var cargo =records[0].data.cargo;
                    Ext.getCmp('combo8_text').setValue(cargo);
                }}
        });
        var combo9= Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Aprobado por:',
            store:  this.__data_store_traba,
            queryMode: 'local',labelWidth:140,
            id:'combo9',
            name:'combo9',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo9').setValue('');
                        Ext.getCmp('combo9_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo9').setValue(_result_inc.rows[0]['n_aprobobado']);
                        Ext.getCmp('combo9_text').setValue(_result_inc.rows[0]['n_cargo_aprobobado']);
                    }
                },
                select:function(combo, records, eOpts){
                    var cargo =records[0].data.cargo;
                    Ext.getCmp('combo9_text').setValue(cargo);
                }}
        });
        var combo10= Ext.create('Ext.form.ComboBox',{
            fieldLabel: 'Criterio de analisis en unidad ',
            store:   this.__data_store_ag,
            queryMode: 'local',
            labelWidth:140,
            id:'combo10',
            name:'combo10',
            labelWidth:200,
            displayField: 'nombre',
            valueField: 'id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo10').setValue('');
                        Ext.getCmp('combo11').setValue('');
                        Ext.getCmp('combo11').hide();
                    }
                    else{
                        Ext.getCmp('combo10').setValue(_result_inc.rows[0]['agencia']);
                        Ext.getCmp('combo11').setValue(_result_inc.rows[0]['cuenta']);
                        Ext.getCmp('combo11').show();
                    }
                },
                change:function(This,val,oldval){
                    Ext.getCmp('combo11').show();
                }
            }
        });

        var combo11= Ext.create('Ext.form.ComboBox',{
            fieldLabel: 'Cuenta deudora',
            store: this.__data_store_CGasto,
            labelWidth:100,width:270,
            queryMode: 'local',
            hidden:true,
            id:'combo11',
            name:'combo11',
            displayField: 'nombre',
            valueField: 'id'
        });
        var combo12= Ext.create('Ext.form.ComboBox',{
            fieldLabel: 'Contavilizado por:',
            store:  this.__data_store_traba,
            labelWidth:140,
            queryMode: 'local',
            id:'combo12',
            name:'combo12',
            displayField: 'nombre_completo',
            valueField: 'contrato_id',
            listeners:{
                beforerender:function( This, eOpts ){
                    if (_result_inc.rows==false){
                        Ext.getCmp('combo12').setValue('');
                        Ext.getCmp('combo12_text').setValue('');
                    }
                    else{
                        Ext.getCmp('combo12').setValue(_result_inc.rows[0]['n_contabilizado']);
                        Ext.getCmp('combo12_text').setValue(_result_inc.rows[0]['n_cargo_contabilizado']);
                    }
                },
                select:function(combo, records, eOpts){
                    var cargo =records[0].data.cargo;
                    Ext.getCmp('combo12_text').setValue(cargo);
                }}
        });
        var value_nom = _selected_rcd.data.nombre;

        this.panelupd = Ext.create('Ext.tab.Panel', {
            width: 200,
            height: 200,
            padding:5,
            listeners: {
                beforetabchange: function(tabs, newTab, oldTab) {
                    return newTab.title != 'P2';
                }
            },
            items: [
                    {
                        title: 'Prenomina',
                        xtype:'fieldset',
                        columnWidth: 0.5,
                        collapsible: true,
                items:[
                    {
                        layout: 'hbox',
                        items:[combo1,{width:15},{
                            xtype: 'textfield',
                            name: 'combo1_text',
                            id: 'combo1_text',
                            fieldLabel: 'Cargo',
                            allowBlank: false
                        }]
                    },
                    {
                        layout: 'hbox',
                        items:[combo2,{width:15},{
                            xtype: 'textfield',
                            name: 'combo2_text',
                            id: 'combo2_text',
                            fieldLabel: 'Cargo',
                            allowBlank: false
                        }]
                    },
                    {
                        layout: 'hbox',
                        items:[combo3,{width:15},{
                            xtype: 'textfield',
                            name: 'combo3_text',
                            id: 'combo3_text',
                            fieldLabel: 'Cargo',
                            allowBlank: false
                        }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        defaultType: 'checkboxfield',
                        items: [
                            {
                                boxLabel  : 'Desglosar el salario por antiguedad entre los reportes',
                                name      : 'topping',
                                labelWidth :600,
                                width:438,
                                inputValue: '1',
                                id        : 'ant'
                            }, {
                                boxLabel  : 'Desglosar el salario por Otros Pagos por reporte',
                                name      : 'topping',
                                labelWidth :500,
                                width:338,
                                inputValue: '2',
                                checked   : true,
                                id        : 'o_poa'
                            }, {
                                boxLabel  : 'Distribuir la estimulacion en proyecto solo por CPL',
                                name      : 'topping',
                                labelWidth :600,
                                width:438,
                                inputValue: '3',
                                id        : 'estim'
                            }
                        ]
                    }
                    ]
                },
                    {
                        title: 'Nomina',
                        xtype:'fieldset',
                        columnWidth: 0.5,
                        collapsible: true,
                    items:[
                    {
                        layout: 'hbox',
                        items:[combo7,{width:15},{
                            xtype: 'textfield',
                            name: 'combo7_text',
                            id: 'combo7_text',
                            fieldLabel: 'Cargo',
                            allowBlank: false
                        }]
                    },
                    {
                        layout: 'hbox',
                        items:[combo8,{width:15},{
                            xtype: 'textfield',
                            name: 'combo8_text',
                            id: 'combo8_text',
                            fieldLabel: 'Cargo',
                            allowBlank: false
                        }]
                    },
                    {
                        layout: 'hbox',
                        items:[combo9,{width:15},{
                            xtype: 'textfield',
                            name: 'combo9_text',
                            id: 'combo9_text',
                            fieldLabel: 'Cargo',
                            allowBlank: false
                        }]
                    },
                    {
                        layout: 'hbox',
                        items:[combo12,{width:15},{
                            xtype: 'textfield',
                            name: 'combo12_text',
                            id: 'combo12_text',
                            fieldLabel: 'Cargo',
                            allowBlank: false
                        }]
                    }
                ]
                },
                    {
                    title: 'Contabilización',
                        xtype:'fieldset',
                        columnWidth: 0.5,
                        collapsible: true,
                    items:[
                        {
                            layout: 'hbox',
                            items:[combo4,{width:15},{
                                xtype: 'textfield',
                                name: 'combo4_text',
                                id: 'combo4_text',
                                fieldLabel: 'Cargo',
                                allowBlank: false
                            }]
                        },
                        {
                            layout: 'hbox',
                            items:[combo5,{width:15},{
                                xtype: 'textfield',
                                name: 'combo5_text',
                                id: 'combo5_text',
                                fieldLabel: 'Cargo',
                                allowBlank: false
                            }]
                        },
                        {
                            layout: 'hbox',
                            items:[combo6,{width:15},{
                                xtype: 'textfield',
                                name: 'combo6_text',
                                id: 'combo6_text',
                                fieldLabel: 'Cargo',
                                allowBlank: false
                            }]
                        },
                        {
                            layout: 'hbox',
                            xtype:'fieldset',
                            columnWidth: 0.5,
                            title: 'Fieldset 1',
                            collapsible: true,
                            items:[combo10,combo11]
                        }
                    ]
                    },
                    {
                title: 'Capacidad de Compra',
                        xtype:'fieldset',
                        columnWidth: 0.5,
                        collapsible: true,
                items:[
                    {
                        layout: 'hbox',
                        items:[{
                            xtype: 'textfield',
                            name: 'combo14_text',
                            id: 'combo14_text',
                            labelWidth:150,width:350,
                            fieldLabel: 'Estimulación',
                            allowBlank: false
                        },{width:15},{
                            xtype: 'textfield',
                            name: 'combo24_text',
                            labelWidth:150,width:350,
                            id: 'combo24_text',
                            fieldLabel: 'Capacidad de Compra',
                            allowBlank: false
                        }]
                    },
                    {
                        layout: 'hbox',
                        items:[{
                            xtype: 'textfield',
                            name: 'combo34_text',
                            labelWidth:150,width:350,
                            id: 'combo34_text',
                            fieldLabel: 'Estimulación Calculada',
                            allowBlank: false
                        },{width:15},{
                            xtype: 'textfield',
                            name: 'combo44_text',
                            labelWidth:150,width:350,
                            id: 'combo44_text',
                            fieldLabel: 'Numero de Trabajadores',
                            allowBlank: false
                        }]
                    }

                ]
                }
            ]
        });
        var _gst_winupdConfArea = new Ext.Window({
                title:'Modificar la Unidad Empresarial de Base.',
                id: '_gst_upd_win_id',
                name: '_gst_upd_win_id',
                height: 350,
                width: 760,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panelupd],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler:function(){
                        var _selectionModel = Ext.getCmp('ConfArea_grid_id').getSelectionModel();
                        var _selected_rcd = _selectionModel.getLastSelected();
                        var id=_selected_rcd.data.id;
                        var ant = Ext.getCmp('ant').getValue();
                        var o_poa = Ext.getCmp('o_poa').getValue();
                        var estim = Ext.getCmp('estim').getValue();
                        var combo1 = Ext.getCmp('combo1').getValue();
                        var combo2 = Ext.getCmp('combo2').getValue();
                        var combo3 = Ext.getCmp('combo3').getValue();
                        var combo4 = Ext.getCmp('combo4').getValue();
                        var combo5 = Ext.getCmp('combo5').getValue();
                        var combo6 = Ext.getCmp('combo6').getValue();
                        var combo7 = Ext.getCmp('combo7').getValue();
                        var combo8 = Ext.getCmp('combo8').getValue();
                        var combo9 = Ext.getCmp('combo9').getValue();
                        var combo10 = Ext.getCmp('combo10').getValue();
                        var combo11 = Ext.getCmp('combo11').getValue();
                        var combo12 = Ext.getCmp('combo12').getValue();
                        var _result = App.PerformSyncServerRequest('ConfArea.ConfArea.Add_conf',
                            {ant:ant,o_poa:o_poa,estim:estim,
                             combo1:combo1,combo2:combo2,combo3:combo3,combo4:combo4,
                             combo5:combo5,combo6:combo6,combo7:combo7,combo8:combo8,
                             combo9:combo9,combo10:combo10,combo11:combo11,combo12:combo12,
                             id:id}
                        );
                    },
                    scope: this
                },
                    {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                       // App.InfoMessage('Información', 'Unidad Empresarial de Base modificada satisfactoriamente');
                        _gst_winupdConfArea.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {

                    }, scope: this
                }
            });
        _gst_winupdConfArea.show();
    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
ConfArea.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('ConfArea.ConfArea.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Unidad Empresarial de Base adicionada satisfactoriamente');
        }
    }
}
ConfArea.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){
    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('ConfArea.ConfArea.Modif',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_upd_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Unidad Empresarial de Base modificada satisfactoriamente');
        }
    }
 }
ConfArea.prototype.deltectnc=function(_paccion){

    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('ConfArea_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
       var  _result = App.PerformSyncServerRequest('ConfArea.ConfArea.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Unidad Empresarial de Base eliminada correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Unidad Empresarial de Base?');
}
