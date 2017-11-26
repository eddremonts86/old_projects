function Horario_PagoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Horario_Pago_btn_id',
            tooltip : 'Adiciona un nuevo Horario de Trabajo',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Horario_Pago_btn_id',
            tooltip : 'Elimina el Horario de Trabajo seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Horario_Pago_btn_id',
            tooltip : 'Modifica el Horario de Trabajo seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow3, this.Owner,['upd'])
        });
        var tbar = Ext.getCmp('Horario_Pago_tbar_id');
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
App.RegisterFunction('Horario_PagoGestionar', new Horario_PagoGestionar());
this.panel=null;
this.panelupd=null;
Horario_Pago.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {         
       this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Nombre',
                name: 'Horario_Pago_nombre_id',
                id:'Horario_Pago_nombre_id',
                allowBlank: false,
                maxLength: 255
                //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
            }]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Horario de Trabajo ',
                id: 'Horario_Pago_Add_win_id',
                name: 'Horario_Pago_Add_win_id',
                height: 120,
                width: 420,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',
                    handler: function(){
                        _gst_win.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('Horario_Pago_nombre_id').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Horario_Pago.prototype.OnShowWindow3 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    
   if(_paccion == 'upd')
     {
       var _selectionModel = Ext.getCmp('Horario_Pago_grid_id').getSelectionModel();
       var _selected_rcd =_selectionModel.getLastSelected();
        _value_nom_oll=_selected_rcd.data.tipo;
        id_tpo=_selected_rcd.data.id;
       
         this.panelupd = Ext.create('Ext.form.Panel', {
             bodyPadding: 5,
             width: 350,
             id: 'panelupd',
             name: 'panelupd',
             layout: 'anchor',
             defaults: {
                 anchor: '100%'
             },
             defaultType: 'textfield',
             items: [{
                 fieldLabel: 'Nombre',
                 name: 'nombre_Udt_id',
                 id:'nombre_Udt_id',
                 allowBlank: false,
                 value:_value_nom_oll,
                 maxLength: 255
                 //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
             },
                 {
                     fieldLabel: 'id',
                     name: 'id_Udt_id',
                     id:'id_Udt_id',
                     allowBlank: false,
                     value:id_tpo,
                     hidden:true,
                     maxLength: 255,
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                 }]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar el Horario de Trabajo',
                 id: 'Forma_Pago_gst_Udt_win_id',
                 name: 'Forma_Pago_gst_Udt_win_id',
                 height: 120,
                 width: 420,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panelupd],
                 buttons: [{
                     text: 'Aceptar',
                     handler: Ext.Function.bind(this.Modidif, this, [_paccion,_selectionModel,_selected_rcd]),
                     scope: this
                 }, {
                     text: 'Cancelar',
                     handler: function(){
                         _gst_win.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('nombre_Udt_id').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Horario_Pago.prototype.Add = function(_paccion){
     if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Horario_Pago.Horario_Pago.Add',this.panel.getForm().getValues());
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('Horario_Pago_nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Horario de Trabajo adicionado satisfactoriamente');
        }
    }
}
Horario_Pago.prototype.Modidif = function(_paccion,_selectionModel,_selected_rcd){
    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Horario_Pago.Horario_Pago.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('Forma_Pago_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Horario de Trabajo modificado satisfactoriamente');
        }
    }
}
Horario_Pago.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Horario_Pago_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Horario_Pago.Horario_Pago.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load({params:{start:0,limit:25}});
            App.InfoMessage('Información', 'Horario de Trabajo eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Horario de Trabajo?');






}
