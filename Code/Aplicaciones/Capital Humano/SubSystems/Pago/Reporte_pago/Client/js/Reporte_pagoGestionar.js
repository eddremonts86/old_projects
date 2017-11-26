function Reporte_pagoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Reporte_pago_btn_id',
            tooltip : 'Adiciona un nuevo Reporte de Pago',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddReporte_pago, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Reporte_pago_btn_id',
            tooltip : 'Elimina el Reporte de Pago seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Reporte_pago_btn_id',
            tooltip : 'Modifica el Reporte de Pago seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdReporte_pago, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Reporte_pago_tbar_id');
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
            name: 'searchField',
            id:'searchField',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Proyecto...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Reporte_pago_grid_id').store);
                    Ext.getCmp('Reporte_pago_grid_id').store.clearFilter();
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("proyecto", Ext.getCmp('searchField').getValue());
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("mes", Ext.getCmp('searchField1').getValue());
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("anno", Ext.getCmp('searchField2').getValue());
                },scope:this
            }
        });
        tbar.add(' ');
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField1',
            id:'searchField1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Meses...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Reporte_pago_grid_id').store);
                    Ext.getCmp('Reporte_pago_grid_id').store.clearFilter();
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("proyecto", Ext.getCmp('searchField').getValue());
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("mes", Ext.getCmp('searchField1').getValue());
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("anno", Ext.getCmp('searchField2').getValue());
                },scope:this
            }
        });
        tbar.add(' ');
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField2',
            id:'searchField2',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Año...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Reporte_pago_grid_id').store);
                    Ext.getCmp('Reporte_pago_grid_id').store.clearFilter();
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("proyecto", Ext.getCmp('searchField').getValue());
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("mes", Ext.getCmp('searchField1').getValue());
                    Ext.getCmp('Reporte_pago_grid_id').store.filter("anno", Ext.getCmp('searchField2').getValue());
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
App.RegisterFunction('Reporte_pagoGestionar', new Reporte_pagoGestionar());
this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
Reporte_pago.prototype.winaddReporte_pago = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('Reporte_pago.Reporte_pago.CargarAnnos',
            {
                fields: [
                    {name: 'id'},
                    {name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_contrato= App.BuildJsonStore('Reporte_pago.Reporte_pago.Cargarcontratos',
            {
                fields: [
                    {name: 'id'},{name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_anno= App.BuildJsonStore('Reporte_pago.Reporte_pago.CargarCargarannos',
            {
                fields: [
                    {name: 'valor'},{name: 'id'}

                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
       this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {
                anchor: '100%'
            },
           //defaultType: 'textfield',
           items: [{
               xtype:'textfield',
               fieldLabel: 'Nombre del Reporte',
               name: 'nombre_id',
               id:'nombre_id',
               allowBlank: false,
               maxLength: 255,
               maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
           }, {
                   xtype:'combobox',
                   name:'combo_value_id',
                   id:'combo_value_id',
                   fieldLabel: 'Proyecto',
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

               }, {
               xtype:'combobox',
               name:'combo_contrato_value_id',
               id:'combo_contrato_value_id',
               fieldLabel: 'Mes',
               store: this._store_combo_contrato,
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

           },{
               xtype:'combobox',
               name:'combo_anno_value_id',
               id:'combo_anno_value_id',
               fieldLabel: 'Año',
               store: this._store_combo_anno,
               displayField:'valor',
               valueField: 'id',
               typeAhead: true,
               queryMode: 'local',
               forceSelection: true,
               triggerAction: 'all',
               emptyText:'Select a state...',
               selectOnFocus:true,
               editable:false,
               allowBlank: false

           }

           ]
        });

        var _gst_winaddReporte_pago = new Ext.Window(
            {
                title:'Adicionar un Reporte de Pago.',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 250,
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
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winaddReporte_pago.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo.load();
                        this._store_combo_contrato.load();
                        this._store_combo_anno.load();
                    }, scope: this
                }
            });

        _gst_winaddReporte_pago.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}


Reporte_pago.prototype.winupdReporte_pago = function(_paccion){
    var _selectionModel = Ext.getCmp('Reporte_pago_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    //_value_nom_oll=_selected_rcd.data.valor;
    //id_tpo=_selected_rcd.data.valor;
    var _value_nom = null;
    if(_paccion == 'upd')
    {
        this._store_combo= App.BuildJsonStore('Reporte_pago.Reporte_pago.CargarAnnos',
            {
                fields: [
                    {name: 'id'},
                    {name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_contrato= App.BuildJsonStore('Reporte_pago.Reporte_pago.Cargarcontratos',
            {
                fields: [
                    {name: 'id'},{name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_anno= App.BuildJsonStore('Reporte_pago.Reporte_pago.CargarCargarannos',
            {
                fields: [
                    {name: 'valor'},{name: 'id'}

                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });


        this.panelupd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'panelupd',
            name:'panelupd',
            defaults: {
                anchor: '100%'
            },
            //defaultType: 'textfield',
            items: [{
                xtype:'textfield',
                fieldLabel: 'Nombre del Reporte',
                name: 'nombre_id_upd',
                id:'nombre_id_upd',
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/,
                value :_selected_rcd.data.nombre
            }, {
                xtype:'combobox',
                name:'combo_value_id',
                id:'combo_value_id',
                fieldLabel: 'Proyecto',
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

            }, {
                xtype:'combobox',
                name:'combo_contrato_value_id',
                id:'combo_contrato_value_id',
                fieldLabel: 'Mes',
                store: this._store_combo_contrato,
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

            },{
                xtype:'combobox',
                name:'combo_anno_value_id',
                id:'combo_anno_value_id',
                fieldLabel: 'Año',
                store: this._store_combo_anno,
                displayField:'valor',
                valueField: 'id',
                typeAhead: true,
                queryMode: 'local',
                forceSelection: true,
                triggerAction: 'all',
                emptyText:'Select a state...',
                selectOnFocus:true,
                editable:false

            },
                {
                    xtype : 'hidden',
                    name: 'old_name',
                    id: 'old_name',
                    value :_selected_rcd.data.nombre
                }
            ]
        });

        var _gst_winaddReporte_pago = new Ext.Window(
            {
                title:'Modificar el Reporte de Pago.',
                id: '_gst_upd_win_id',
                name: '_gst_upd_win_id',
                height: 250,
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
                        _gst_winaddReporte_pago.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id_upd').focus(true, true);
                        this._store_combo.load();
                        this._store_combo_contrato.load();
                        this._store_combo_anno.load();
                    }, scope: this
                }
            });

        _gst_winaddReporte_pago.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Reporte_pago.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Reporte_pago.Reporte_pago.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Reporte de Pago adicionado satisfactoriamente');
        }
    }
}
Reporte_pago.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Reporte_pago.Reporte_pago.Modif',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_upd_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Reporte de Pago modificado satisfactoriamente');
        }
    }
 }
Reporte_pago.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Reporte_pago_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Reporte_pago.Reporte_pago.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Reporte de Pago eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Reporte de Pago?');

}
