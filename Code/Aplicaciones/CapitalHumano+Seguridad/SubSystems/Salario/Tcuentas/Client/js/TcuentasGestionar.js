function TcuentasGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Tcuentas_btn_id',
            tooltip : 'Adiciona una nueva Tcuentas  ',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Tcuentas_btn_id',
            tooltip : 'Elimina la Tcuentas seleccionada ',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Tcuentas_btn_id',
            tooltip : 'Modifica la Tcuentas seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Tcuentas_tbar_id');
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
    }
    this.Disable = function(){
        this._btn_mod.disable();
        this._btn_del.disable();
    }
}
App.RegisterFunction('TcuentasGestionar', new TcuentasGestionar());
this.panel=null;
this.panelupd=null;
Tcuentas.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {

        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        this.__data_store_decs = App.BuildJsonStore('Tcuentas.Tcuentas.CargarDatos_desc',{
            fields: [
                {name: 'id'},
                {name: 'ave'},
                {name: 'formato'},
                {name: 'clase'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        var prueba = Ext.create('Ext.data.Store', {
            storeId:'simpsonsStore',
            fields:['desc'],
            data:{'items':[
                { "desc":""},
                { "desc":""},
                { "desc":""}
            ]},
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json',
                    root: 'items'
                }
            }
        });
        var grid = Ext.create('Ext.grid.Panel', {
            store: prueba,
            id:'mygrid',
            name:'mygrid',
            plugins: [this.cellEditing],
            columns: [{ text: 'Criterio de Análisis', dataIndex: 'desc', flex: 1,
                editor: new Ext.form.field.ComboBox({
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    store:this.__data_store_decs,
                    lazyRender: true,
                    displayField: 'nombre',
                    valueField: 'nombre',
                    listClass: 'x-combo-list-small'
                    /*listeners:{
                     change:function( This, newValue, oldValue, eOpts ){
                     alert(This.value);
                     }
                     }*/
                })}],
            border:true,
            height: 150,
            width: '100%'
        });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 10,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {
                anchor: '100%'
            },
            items:      [
                {
                    xtype: 'fieldcontainer',
                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    fieldDefaults: {labelAlign: 'top'},
                    items: [
                        {   xtype:'textfield',
                            fieldLabel: 'Cuenta',
                            hideLabel :true ,
                            emptyText : '000/000',
                            name: 'cuenta',
                            id:'cuenta',
                            allowBlank:
                                false,maxLength: 20,
                            width: '20%',
                            margins: '0 0 0 5'
                        },
                        {
                            xtype:'textfield',
                            fieldLabel: 'Cuenta',
                            hideLabel :true,
                            emptyText : 'Nombre de cuenta',
                            name: 'nombre',
                            id:'nombre',
                            allowBlank: false,
                            width: '78%',
                            maxLength: 255,
                            margins: '0 0 0 5'
                        }
                    ]
                },
                {width:'20px'},
                {
                    xtype: 'fieldcontainer',
                    labelStyle: 'font-weight:bold;padding:0;',
                    layout: 'hbox',
                    fieldDefaults:{labelAlign: 'top'},
                    items: [
                        {
                            xtype:'fieldset',
                            columnWidth: 0.5,

                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            items :[
                                {
                                    html: '<span class="label label-info" style="margin-top: -1px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Naturaleza</span>'
                                },
                                {
                                    xtype:'radio',
                                    boxLabel  : 'Deudora',
                                    name      : 'natura',
                                    id      : 'Deudora',
                                    inputValue: 'deuda'

                                },
                                {
                                    xtype:'radio',
                                    boxLabel  : 'Acreedora',
                                    name      : 'natura',
                                    id      : 'Acreedora',
                                    inputValue: 'acreedora'

                                }
                            ]
                        },
                        {width:'20px'},
                        {
                            xtype:'fieldset',
                            columnWidth: 0.5,
                            defaults: {anchor: '100%'},
                            layout: 'hbox',
                            items :[
                                {
                                    html: '<span class="label label-info" style="margin-top: -1px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Otros Criterios</span>'
                                },
                                {   xtype:'checkbox',
                                    boxLabel  : 'Obligaciones',
                                    name      : 'Obligaciones',
                                    inputValue: '1',
                                    id        : 'Obligaciones'
                                }, {
                                    boxLabel  : 'Monedas', xtype:'checkbox',
                                    name      : 'Monedas',
                                    inputValue: '1',
                                    id        : 'Monedas'
                                }, {
                                    boxLabel  : 'Submayor', xtype:'checkbox',
                                    name      : 'Submayor',
                                    inputValue: '1',
                                    id        : 'Submayor'
                                }
                            ]
                        }
                    ]
                },
                grid
            ]
        });
        var _gst_win = new Ext.Window({
            title:'Adicionar una Tcuentas',
            id: '_gst_Add_win_id',
            name: '_gst_Add_win_id',
            height: '50%',
            width: '50%',
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
                text: 'Cancelar',cls:'btn btn-primary',
                handler: function(){
                    _gst_win.close();
                }
            }],
            listeners: {
                'show': function(This, eOpts) {
                    Ext.getCmp('nombre').focus(true, true);
                }
            }
        });
        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Tcuentas.prototype.OnShowWindow2 = function(_paccion){
    var _selectionModel = Ext.getCmp('Tcuentas_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var cuentas=_selected_rcd.data.cuentas;
    var nombre=_selected_rcd.data.nombre;
    var naturaleza=_selected_rcd.data.naturaleza;
    var oblig=_selected_rcd.data.oblig;
    var moneda=_selected_rcd.data.moneda;
    var submayor=_selected_rcd.data.submayor;
    var id =_selected_rcd.data.id;

    if(_paccion == 'upd')
     {
         this.cellEditing = new Ext.grid.plugin.CellEditing({
             clicksToEdit: 1
         });
         this.__data_store_decs_a = App.BuildJsonStore('Tcuentas.Tcuentas.CargarDatos_desc',{
             fields: [
                 {name: 'id'},
                 {name: 'ave'},
                 {name: 'formato'},
                 {name: 'clase'},
                 {name: 'nombre'}
             ],
             proxy: {
                 type: 'ajax',
                 reader: {type: 'json',root: 'rows',totalProperty: 'results'}
             },
             autoLoad: true
         });
         var prueba_a = Ext.create('Ext.data.Store', {
             storeId:'simpsonsStore',
             fields:['desc'],
             data:{'items':[
                 { "desc":""},
                 { "desc":""},
                 { "desc":""}
             ]},
             proxy: {
                 type: 'memory',
                 reader: {
                     type: 'json',
                     root: 'items'
                 }
             }
         });
         var grid_a = Ext.create('Ext.grid.Panel', {
             store: prueba_a,
             id:'mygrid_a',
             name:'mygrid_a',
             plugins: [this.cellEditing],
             columns: [{ text: 'Criterio de Análisis', dataIndex: 'desc', flex: 1,
                 editor: new Ext.form.field.ComboBox({
                     typeAhead: true,
                     triggerAction: 'all',
                     selectOnTab: true,
                     store:this.__data_store_decs_a,
                     lazyRender: true,
                     displayField: 'nombre',
                     valueField: 'nombre',
                     listClass: 'x-combo-list-small'
                     /*listeners:{
                      change:function( This, newValue, oldValue, eOpts ){
                      alert(This.value);
                      }
                      }*/
                 })}],
             height: 150,
             border:true,
             width: '100%'
         });
         this.panel_a = Ext.create('Ext.form.Panel', {
             bodyPadding: 10,
             width: 350,
             layout: 'anchor',
             id:'panel_a',
             name:'panel_a',
             defaults: {
                 anchor: '100%'
             },
             items:      [
                 {
                     xtype: 'fieldcontainer',
                     labelStyle: 'font-weight:bold;padding:0;',
                     layout: 'hbox',
                     defaultType: 'textfield',
                     fieldDefaults: {labelAlign: 'top'},
                     items: [
                         {   xtype:'textfield',
                             fieldLabel: 'Cuenta',
                             hideLabel :true ,
                             emptyText : '000/000',
                             name: 'cuenta_a',
                             id:'cuenta_a',
                             allowBlank:
                                 false,maxLength: 20,
                             width: '20%',
                             margins: '0 0 0 5',
                             value:cuentas
                         },
                         {
                             xtype:'textfield',
                             fieldLabel: 'Cuenta',
                             hideLabel :true,
                             emptyText : 'Nombre de cuenta',
                             name: 'nombre_a',
                             id:'nombre_a',
                             allowBlank: false,
                             width: '78%',
                             maxLength: 255,
                             margins: '0 0 0 5',
                             value:nombre
                         }
                     ]
                 },
                 {width:'20px'},
                 {
                     xtype: 'fieldcontainer',
                     labelStyle: 'font-weight:bold;padding:0;',
                     layout: 'hbox',
                     fieldDefaults:{labelAlign: 'top'},
                     items: [
                         {
                             xtype:'fieldset',
                             columnWidth: 0.5,

                             defaults: {anchor: '100%'},
                             layout: 'hbox',
                             items :[
                                 {
                                     html: '<span class="label label-info" style="margin-top: -1px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Naturaleza</span>'
                                 },
                                 {
                                     xtype:'radio',
                                     boxLabel  : 'Deudora',
                                     name      : 'natura_a',
                                     id      : 'Deudora_a',
                                     inputValue: 'deuda'

                                 },
                                 {
                                     xtype:'radio',
                                     boxLabel  : 'Acreedora',
                                     name      : 'natura_a',
                                     id      : 'Acreedora_a',
                                     inputValue: 'acreedora'

                                 }
                             ]
                         },
                         {width:'20px'},
                         {
                             xtype:'fieldset',
                             columnWidth: 0.5,
                             defaults: {anchor: '100%'},
                             layout: 'hbox',
                             items :[
                                 {
                                     html: '<span class="label label-info" style="margin-top: -1px; margin-bottom: 15px;margin-right: 15px;margin-left: 0px">Otros Criterios</span>'
                                 },
                                 {   xtype:'checkbox',
                                     boxLabel  : 'Obligaciones',
                                     name      : 'Obligaciones_a',
                                     inputValue: '1',
                                     id        : 'Obligaciones_a'
                                 }, {
                                     boxLabel  : 'Monedas', xtype:'checkbox',
                                     name      : 'Monedas_a',
                                     inputValue: '1',
                                     id        : 'Monedas_a'
                                 }, {
                                     boxLabel  : 'Submayor', xtype:'checkbox',
                                     name      : 'Submayor_a',
                                     inputValue: '1',
                                     id        : 'Submayor_a'
                                 }
                             ]
                         }
                     ]
                 },
                 grid_a
             ]
         });
         var _gst_win = new Ext.Window({
             title:'Adicionar una Tcuentas',
             id: '_gst_Add_win_id',
             name: '_gst_Add_win_id',
             height: '50%',
             width: '50%',
             plain: true,
             layout: 'fit',
             modal: true,
             resizable: false,
             items: [this.panel_a],
             buttons: [{
                 text: 'Aceptar',cls:'btn btn-success',
                 handler: Ext.Function.bind(this.Modid, this, [_paccion]),
                 scope: this
             }, {
                 text: 'Cancelar',cls:'btn btn-primary',
                 handler: function(){
                     _gst_win.close();
                 }
             }],
             listeners: {
                 'show': function(This, eOpts) {
                     Ext.getCmp('cuenta_a').focus(true, true);
                 },
                 afterrender:function(){

                     if(naturaleza=='Deudora'){Ext.getCmp('Deudora_a').setValue(true);}
                     if(naturaleza=='Acreedora'){Ext.getCmp('Acreedora_a').setValue(true);}
                     if(oblig=='t'){Ext.getCmp('Obligaciones_a').setValue(true);}
                     if(moneda=='t'){Ext.getCmp('Monedas_a').setValue(true);}
                     if(submayor=='t'){Ext.getCmp('Submayor_a').setValue(true);}
                 }
             }
         });
         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Tcuentas.prototype.Add = function(_paccion){

    /*var _selected_rcd = Ext.getCmp('mygrid').getSelectionModel().getLastSelected();
    var cod_indicador=_selected_rcd.data.cod_indicador;
    var record = _scope.__data_store_ind.findRecord('id',cod_indicador);
     simpleCombo_indicador.select(record);*/

    if (Ext.getCmp('panel').getForm().isValid())
    {
        var mydd = Ext.getCmp('mygrid').getStore().getModifiedRecords();
        _array = new Array();
        if (mydd.length < 0)
        { App.InfoMessage('Información', 'No ha adicionado criterio de analisis ');}
        else
        {
            for (var i = 0; i < mydd.length; i++){
                _array.push(mydd[i].getData());
            }
            var fnCallBack = function() {

                var form = Ext.getCmp('panel').getForm().getValues();
                var  cuenta = Ext.getCmp('cuenta').getValue();
                var  nombre = Ext.getCmp('nombre').getValue();
                var  Deudora = Ext.getCmp('Deudora').getValue();
                var  Acreedora = Ext.getCmp('Acreedora').getValue();
                var  Obligaciones = Ext.getCmp('Obligaciones').getValue();
                var  Monedas = Ext.getCmp('Monedas').getValue();
                var  Submayor = Ext.getCmp('Submayor').getValue();

                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                var _result = App.PerformSyncServerRequest('Tcuentas.Tcuentas.Add',{data: Ext.encode(_array),Acreedora:Acreedora,Submayor:Submayor,Monedas:Monedas,Obligaciones:Obligaciones,Deudora:Deudora,nombre:nombre,cuenta:cuenta});

                App.HideMsgBox();
                if(_result)
                {
                    This.up('grid').getStore().load();
                    this.__data_store.load();
                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                }
                else
                    App.InfoMessage('Información', 'Ocurrio un error');
            }
            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
        }


    }
}
Tcuentas.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panel_a').getForm().isValid())
    {
        var mydd = Ext.getCmp('mygrid_a').getStore().getModifiedRecords();
        _array = new Array();
        if (mydd.length < 0)
        { App.InfoMessage('Información', 'No ha adicionado criterio de analisis ');}
        else
        {
            for (var i = 0; i < mydd.length; i++){
                _array.push(mydd[i].getData());
            }
            var fnCallBack = function() {
                var _selectionModel = Ext.getCmp('Tcuentas_grid_id').getSelectionModel();
                var _selected_rcd = _selectionModel.getLastSelected();
                var id =_selected_rcd.data.id;
                var form = Ext.getCmp('panel_a').getForm().getValues();
                var  cuenta = Ext.getCmp('cuenta_a').getValue();
                var  nombre = Ext.getCmp('nombre_a').getValue();
                var  Deudora = Ext.getCmp('Deudora_a').getValue();
                var  Acreedora = Ext.getCmp('Acreedora_a').getValue();
                var  Obligaciones = Ext.getCmp('Obligaciones_a').getValue();
                var  Monedas = Ext.getCmp('Monedas_a').getValue();
                var  Submayor = Ext.getCmp('Submayor_a').getValue();

                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                var _result = App.PerformSyncServerRequest('Tcuentas.Tcuentas.Modid',{data: Ext.encode(_array),id:id,Acreedora:Acreedora,Submayor:Submayor,Monedas:Monedas,Obligaciones:Obligaciones,Deudora:Deudora,nombre:nombre,cuenta:cuenta});

                App.HideMsgBox();
                if(_result)
                {
                    This.up('grid').getStore().load();
                    this.__data_store.load();
                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                }
                else
                    App.InfoMessage('Información', 'Ocurrio un error');
            }
            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
        }


    }
 }
Tcuentas.prototype.deltect=function(_paccion){

    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Tcuentas_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Tcuentas.Tcuentas.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Tcuentas  eliminada correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Tcuentas?');
}
