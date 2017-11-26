function RiesgosGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Riesgos_btn_id',
            tooltip : 'Adiciona un nuevo Riesgo de Trabajo',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Riesgos_btn_id',
            tooltip : 'Elimina el Riesgo seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Riesgos_btn_id',
            tooltip : 'Modifica el Riesgo seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Riesgos_tbar_id');
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
App.RegisterFunction('RiesgosGestionar', new RiesgosGestionar());
this.panel=null;
this.panelupd=null;
Riesgos.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {anchor: '100%', labelWidth: 200},
            defaultType: 'textfield',
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nombre del Riesgo',
                    name: 'nombre_riesgo',
                    id:'nombre_riesgo'
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Descripci&oacute;n',
                    name: 'descripcion',
                    id:'descripcion'
                }
            ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Accidente de Trabajo',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 220,
                width: 500,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',
                    cls:'btn btn-primary',
                   // iconCls:'icon-ok-sign',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',
                    cls:'btn btn-primary',
                    //iconCls:'icon-remove-circle',
                    handler: function(){
                        _gst_win.close();
                    }
                }]
            });
        _gst_win.show();
    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Riesgos.prototype.OnShowWindow2 = function(_paccion){

    var _selectionModel = Ext.getCmp('Riesgos_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    console.log(_selected_rcd.data);
    if(_paccion == 'upd')
     {

        this.panelupd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panelupd',
            name:'panelupd',
            defaults: {anchor: '100%', labelWidth: 150},
            defaultType: 'textfield',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Nombre del Riesgo',
                name: 'nombre_riesgo',
                id:'nombre_riesgo',
                value:_selected_rcd.data.nombre_riesgo
            },{
                xtype: 'textarea',
                fieldLabel: 'Descripci&oacute;n',
                name: 'descripcion',
                id:'descripcion',
                value:_selected_rcd.data.descripcion
            },{
                fieldLabel: 'id',
                name: 'id',
                id:'old_id',
                allowBlank: false,
                value:_selected_rcd.data.id,
                hidden:true,
                maxLength: 255
            }]
        });
         var _gst_win = new Ext.Window({
                 title:'Modificar el Riesgo: '+ _selected_rcd.data.nombre_riesgo,
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 220,
                 width: 460,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panelupd],
                 buttons: [{
                     text: 'Aceptar',
                     cls:'btn btn-primary',
                     handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                     scope: this
                 }, {
                     text: 'Cancelar',
                     cls:'btn btn-primary',
                     handler: function(){
                         _gst_win.close();
                     }
                 }]
             });
         _gst_win.show();
     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Riesgos.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Riesgos.Riesgos.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            App.InfoMessage('Información', 'El Riesgo fue adicionado satisfactoriamente');
            Ext.getCmp('panel').getForm().reset();
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error procesando los datos');
        }
    }
}
Riesgos.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Riesgos.Riesgos.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'Riesgos modificado satisfactoriamente');
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }
 }
Riesgos.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Riesgos_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Riesgos.Riesgos.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'Riesgo eliminado correctamente');
            me.__data_store.load();
        }else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Riesgo?');


}
