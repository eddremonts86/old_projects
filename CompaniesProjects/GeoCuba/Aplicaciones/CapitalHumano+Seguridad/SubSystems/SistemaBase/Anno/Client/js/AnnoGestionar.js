function AnnoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Anno_btn_id',
            tooltip : 'Adiciona un nuevo Año',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddanno, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar ',
            id: 'del_Anno_btn_id',
            tooltip : 'Elimina el Año seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Anno_btn_id',
            tooltip : 'Modifica el Año seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdanno, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Anno_tbar_id');
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
App.RegisterFunction('AnnoGestionar', new AnnoGestionar());
this.panel=null;
this.panelupd=null;
Anno.prototype.winaddanno = function(_paccion){
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
            defaultType: 'numberfield',
            items:{

                name: 'nombre_id',
                id: 'nombre_id',
                height: 100,
                width: 50,
                minValue:2010,
                editable:false,
                value: Ext.Date.format(new Date(),'Y'),
                forceSelection: true
    }
        });

        var _gst_winadd = new Ext.Window(
            {
                title:'Adicionar un Año',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 110,
                width: 300,
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
                        _gst_winadd.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });

        _gst_winadd.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Anno.prototype.winupdanno = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Anno_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.valor;
    id_tpo=_selected_rcd.data.valor;
    if(_paccion == 'upd')
     {

         this.panelupd = Ext.create('Ext.form.Panel', {
             id: 'panelupd',
             name: 'panelupd',
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             defaults: {
                 anchor: '100%'
             },
             defaultType: 'numberfield',
             items:[{
                 fieldLabel: 'id',
                 name: 'id_Udt_id',
                 id:'id_Udt_id',
                 allowBlank: false,
                 value:id_tpo,
                 hidden:true,
                 maxLength: 255,
                 maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
             },
                 {
                 name: 'nombre_id_up',
                 id: 'nombre_id_up',
                 height: 100,
                 width: 50,
                 minValue:2010,
                 editable:false,
                 value: _value_nom_oll
                 }
              ]
         });
         var _gst_winupdann = new Ext.Window(
             {
                 title:'Modificar el Año',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 150,
                 width: 300,
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
                         _gst_winupdann.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         //Ext.getCmp('nombre_Udt_id').focus(true, true);
                     }
                 }
             });

         _gst_winupdann.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Anno.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Anno.Anno.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Año adicionado satisfactoriamente');
        }
    }
}
Anno.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Anno.Anno.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Año modificado satisfactoriamente');
        }
    }
 }
Anno.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Anno_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Anno.Anno.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Año eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Año?');

}
