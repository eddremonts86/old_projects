function NivelGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Nivel_btn_id',
            tooltip : 'Adiciona un nuevo Nivel',
            iconCls: 'list_add16',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Nivel_btn_id',
            tooltip : 'Elimina el Nivel seleccionado',
            iconCls: 'edit_delete16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Nivel_btn_id',
            tooltip : 'Modifica el Nivel seleccionado',
            iconCls: 'apply16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Nivel_tbar_id');
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
App.RegisterFunction('NivelGestionar', new NivelGestionar());
this.panel=null;
this.panelupd=null;
Nivel.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
       this.panel = Ext.create('Ext.form.Panel', {
           id:'panel',
           name:'panel',
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Nombre',
                name: 'nombre_id',
                id:'nombre_id',
                allowBlank: false,
                maxLength: 3
            }]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Nivel',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 120,
                width: 360,
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
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Nivel.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Nivel_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    id_tpo=_selected_rcd.data.id;
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
             defaultType: 'textfield',
             items: [{
                 fieldLabel: 'Nombre',
                 name: 'nombre_Udt_id',
                 id:'nombre_Udt_id',
                 allowBlank: false,
                 value:_value_nom_oll,
                 maxLength: 3
             },
                 {
                     fieldLabel: 'id',
                     name: 'id_Udt_id',
                     id:'id_Udt_id',
                     allowBlank: false,
                     value:id_tpo,
                     hidden:true,
                     maxLength: 255
                 }]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar el Nivel',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 120,
                 width: 360,
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
Nivel.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Nivel.Nivel.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Nivel adicionado satisfactoriamente');
        }
    }

}
Nivel.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Nivel.Nivel.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Nivel modificado satisfactoriamente');
        }
    }
 }
Nivel.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
    var _selected_rcd = Ext.getCmp('Nivel_grid_id').getSelectionModel().getLastSelected();
    var id = _selected_rcd.data.id;
    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
     _result = App.PerformSyncServerRequest('Nivel.Nivel.Eliminar', {id: id});
     App.HideMsgBox();
        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Nivel  eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Nivel?');


}
