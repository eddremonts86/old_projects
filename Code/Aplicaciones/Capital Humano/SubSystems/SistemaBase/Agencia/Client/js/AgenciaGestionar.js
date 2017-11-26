function AgenciaGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Agencia_btn_id',
            tooltip : 'Adiciona una nueva Unidad Empresarial de Base',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddAgencia, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Agencia_btn_id',
            tooltip : 'Elimina la Unidad Empresarial de Base seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Agencia_btn_id',
            tooltip : 'Modifica la Unidad Empresarial de Base seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdAgencia, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Agencia_tbar_id');
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
App.RegisterFunction('AgenciaGestionar', new AgenciaGestionar());
this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
Agencia.prototype.winaddAgencia = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('Agencia.Agencia.CargarAnnos',
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

        var _gst_winaddAgencia = new Ext.Window(
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
                        _gst_winaddAgencia.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo.load();
                    }, scope: this
                }
            });

        _gst_winaddAgencia.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Agencia.prototype.winupdAgencia = function(_paccion){
    var _selectionModel = Ext.getCmp('Agencia_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
   //_value_nom_oll=_selected_rcd.data.valor;
    //id_tpo=_selected_rcd.data.valor;
    var _value_nom = null;
    if(_paccion == 'upd')
    {
        _value_nom=_selected_rcd.data.nombre;

        this._store_combo= App.BuildJsonStore('Agencia.Agencia.CargarAnnos',
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
            name:'panelupd',
            id:'panelupd',
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            //defaultType: 'textfield',
            items: [{
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
            },{
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

        var _gst_winupdAgencia = new Ext.Window(
            {
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
                        _gst_winupdAgencia.close();
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

        _gst_winupdAgencia.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Agencia.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Agencia.Agencia.Add',this.panel.getForm().getValues());
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
Agencia.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Agencia.Agencia.Modif',this.panelupd.getForm().getValues());
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
Agencia.prototype.deltectnc=function(_paccion){

    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Agencia_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
       var  _result = App.PerformSyncServerRequest('Agencia.Agencia.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Unidad Empresarial de Base eliminada correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Unidad Empresarial de Base?');
}
