function ContratooooGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Contratoooo_btn_id',
            tooltip : 'Adiciona un nuevo Contrato',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddContratoooo, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Contratoooo_btn_id',
            tooltip : 'Elimina el Contrato seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Contratoooo_btn_id',
            tooltip : 'Modifica el Contrato seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdContratoooo, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Contratoooo_tbar_id');
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
            emptyText:'Cliente...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Contratoooo_grid_id').store);
                    Ext.getCmp('Contratoooo_grid_id').store.clearFilter();
                    Ext.getCmp('Contratoooo_grid_id').store.filter("clienteid", Ext.getCmp('searchField').getValue());
                    Ext.getCmp('Contratoooo_grid_id').store.filter("nombre", Ext.getCmp('searchField1').getValue());
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
            emptyText:'Nombre del Contrato...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Contratoooo_grid_id').store);
                    Ext.getCmp('Contratoooo_grid_id').store.clearFilter();
                    Ext.getCmp('Contratoooo_grid_id').store.filter("nombre", Ext.getCmp('searchField1').getValue());
                    Ext.getCmp('Contratoooo_grid_id').store.filter("clienteid", Ext.getCmp('searchField').getValue());
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
App.RegisterFunction('ContratooooGestionar', new ContratooooGestionar());
this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
Contratoooo.prototype.winaddContratoooo = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('Contratoooo.Contratoooo.CargarClientes',
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
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {
                anchor: '100%'
            },
           //defaultType: 'textfield',
           items: [{
               xtype:'textfield',
               fieldLabel: 'Nombre del Contrato',
               name: 'nombre_id',
               id:'nombre_id',
               allowBlank: false,
               maxLength: 255,
               maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
           },
               {
                   xtype:'combobox',
                   name:'combo_value_id',
                   id:'combo_value_id',
                   fieldLabel: 'Cliente',
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

               }

           ]
        });

        var _gst_win_contrato = new Ext.Window(
            {
                title:'Adicionar un Contratoooo',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 180,
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
                        _gst_win_contrato.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo.load();
                    }, scope: this
                }
            });

        _gst_win_contrato.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}


Contratoooo.prototype.winupdContratoooo = function(_paccion){
    var _selectionModel = Ext.getCmp('Contratoooo_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    //_value_nom_oll=_selected_rcd.data.valor;
    //id_tpo=_selected_rcd.data.valor;
    var _value_nom = null;
    if(_paccion == 'upd')
    {
        this._store_combo= App.BuildJsonStore('Contratoooo.Contratoooo.CargarClientes',
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

        this.panelupd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panelupd',
            name:'panelupd',
            defaults: {
                anchor: '100%'
            },
            //defaultType: 'textfield',
            items: [{
                xtype:'textfield',
                fieldLabel: 'Nombre del Contrato',
                name: 'nombre_id_upd',
                id:'nombre_id_upd',
                value:_selected_rcd.data.nombre,
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
               },
                {
                    xtype : 'hidden',
                    name: 'old_name',
                    id: 'old_name',
                    value :_selected_rcd.data.nombre
                },
                {
                    xtype:'combobox',
                    name:'combo_value_id_upd',
                    id:'combo_value_id_upd ',
                    fieldLabel: 'Cliente',
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
                    xtype : 'hidden',
                    name: 'old_cliente',
                    id: 'old_cliente',
                    value :_selected_rcd.data.clienteid
                }

            ]
        });

        var _gst_win_contrato = new Ext.Window(
            {
                title:'Modificar el Contratoooo',
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
                        _gst_win_contrato.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                       Ext.getCmp('nombre_id_upd').focus(true, true);
                        this._store_combo.load();
                    }, scope: this
                }
            });

        _gst_win_contrato.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Contratoooo.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Contratoooo.Contratoooo.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Contratoooo adicionado satisfactoriamente');
        }
    }
}
Contratoooo.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Contratoooo.Contratoooo.Modif',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_upd_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Contratoooo modificado satisfactoriamente');
        }
    }
 }
Contratoooo.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Contratoooo_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Contratoooo.Contratoooo.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Contratoooo eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Contratoooo?');


}
