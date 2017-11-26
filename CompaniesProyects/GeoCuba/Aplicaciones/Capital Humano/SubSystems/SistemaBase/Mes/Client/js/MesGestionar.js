function MesGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Mes_btn_id',
            tooltip : 'Adiciona un nuevo Mes',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddMes, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Mes_btn_id',
            tooltip : 'Elimina el Mes seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Mes_btn_id',
            tooltip : 'Modifica el Mes seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdMes, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Mes_tbar_id');
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
App.RegisterFunction('MesGestionar', new MesGestionar());
this.panel=null;
this.panelupd=null;
//this._store_combo_upd=null;
Mes.prototype.winaddMes = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {

       this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
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
               fieldLabel: 'Número',
               name: 'numero_id',
               id:'numero_id',
               allowBlank: false,
               maxLength: 255
               //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/

             } ]
        });

        var _gst_winaddmes = new Ext.Window(
            {
                title:'Adicionar un Mes.',
                id: '_gst_Add_win_id',
                height: 160,
                width: 350,
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
                        _gst_winaddmes.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        //this._store_combo.load();
                    }, scope: this
                }
            });

        _gst_winaddmes.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}


Mes.prototype.winupdMes = function(_paccion){
    var _selectionModel = Ext.getCmp('Mes_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    //_value_nom_oll=_selected_rcd.data.valor;
    //id_tpo=_selected_rcd.data.valor;
    var _value_nom = null;
    if(_paccion == 'upd')
    {

        this.panelupd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panelupd',
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
               },{
                xtype:'textfield',
                fieldLabel: 'Número',
                name: 'numero_id_upd',
                id:'numero_id_upd',
                value:_selected_rcd.data.numero,
                allowBlank: false,
                maxLength: 255
                //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            },
                {
                    xtype : 'hidden',
                    name: 'old_name',
                    id: 'old_name',
                    value :_selected_rcd.data.nombre
                }
            ]
        });

        var _gst_winupdmes = new Ext.Window(
            {
                title:'Modificar el Mes.',
                id: '_gst_upd_win_id',
                height: 160,
                width: 350,
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
                        _gst_winupdmes.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                       Ext.getCmp('nombre_id_upd').focus(true, true);
                       //Ext.getCmp('numero_id_upd').focus(true, true);
                        //this._store_combo.load();
                    }, scope: this
                }
            });

        _gst_winupdmes.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Mes.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Mes.Mes.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Mes adicionado satisfactoriamente');
        }
    }
}
Mes.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Mes.Mes.Modif',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_upd_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Mes modificado satisfactoriamente');
        }
    }
 }
Mes.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Mes_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Mes.Mes.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Mes eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Mes?');


}
