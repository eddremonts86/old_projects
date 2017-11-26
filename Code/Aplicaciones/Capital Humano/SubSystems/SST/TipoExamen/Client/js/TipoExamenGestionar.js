function TipoExamenGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_TipoExamen_btn_id',
            tooltip : 'Adiciona un nuevo Tipo de Examen',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_TipoExamen_btn_id',
            tooltip : 'Elimina el Tipo de Examen seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_TipoExamen_btn_id',
            tooltip : 'Modifica el Tipo de Examen seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('TipoExamen_tbar_id');
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
            name: 'searchField_TipoExamen',
            id:'searchField_TipoExamen',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Cargo...',
            listeners: {
                change:function(){

                    Ext.getCmp('TipoExamen_grid_id').store.clearFilter();
                    Ext.getCmp('TipoExamen_grid_id').store.filter("cmilitar", Ext.getCmp('searchField_TipoExamen').getValue());
                    Ext.getCmp('TipoExamen_grid_id').store.filter("gmilitar", Ext.getCmp('searchField_TipoExamen1').getValue());
                    Ext.getCmp('TipoExamen_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_TipoExamen2').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_TipoExamen1',
            id:'searchField_TipoExamen1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Grado...',
            listeners: {
                change:function(){

                    Ext.getCmp('TipoExamen_grid_id').store.clearFilter();
                    Ext.getCmp('TipoExamen_grid_id').store.filter("cmilitar", Ext.getCmp('searchField_TipoExamen').getValue());
                    Ext.getCmp('TipoExamen_grid_id').store.filter("gmilitar", Ext.getCmp('searchField_TipoExamen1').getValue());
                    Ext.getCmp('TipoExamen_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_TipoExamen2').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_TipoExamen2',
            id:'searchField_TipoExamen2',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
                change:function(){

                    Ext.getCmp('TipoExamen_grid_id').store.clearFilter();
                    Ext.getCmp('TipoExamen_grid_id').store.filter("cmilitar", Ext.getCmp('searchField_TipoExamen').getValue());
                    Ext.getCmp('TipoExamen_grid_id').store.filter("gmilitar", Ext.getCmp('searchField_TipoExamen1').getValue());
                    Ext.getCmp('TipoExamen_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_TipoExamen2').getValue());
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
App.RegisterFunction('TipoExamenGestionar', new TipoExamenGestionar());
this.panel=null;
this.panelupd=null;
TipoExamen.prototype.OnShowWindow = function(_paccion){
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
                    fieldLabel: 'Nombre del Tipo de Examen',
                    name: 'tipo_examen',
                    id:'tipo_examen'
                },{
                    xtype: 'checkbox',
                    fieldLabel: '¿Examen Fisico?',
                    name: 'fisico',
                    id:'fisico'
                }
            ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Tipo de Examen',
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
TipoExamen.prototype.OnShowWindow2 = function(_paccion){

    var _selectionModel = Ext.getCmp('TipoExamen_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var fisico = false;
    if(_selected_rcd.data.fisico == 't')
        fisico = true;
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
                fieldLabel: 'Nombre del Tipo de Examen',
                name: 'tipo_examen',
                id:'tipo_examen',
                value:_selected_rcd.data.nombre_examen
            },{
                xtype: 'checkbox',
                fieldLabel: '¿Examen Fisico?',
                name: 'fisico',
                id:'fisico',
                checked:fisico
            },{
                    fieldLabel: 'id',
                    name: 'id',
                    id:'old_id',
                    allowBlank: false,
                    value:_selected_rcd.data.id,
                    hidden:true,
                    maxLength: 255,
                    maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            }]
        });
         var _gst_win = new Ext.Window({
                 title:'Modificar el Tipo de Examen: '+ _selected_rcd.data.nombre_examen,
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
TipoExamen.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('TipoExamen.TipoExamen.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            App.InfoMessage('Información', 'Tipo de Examen adicionado satisfactoriamente');
            Ext.getCmp('panel').getForm().reset();
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }
}
TipoExamen.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('TipoExamen.TipoExamen.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'TipoExamen modificado satisfactoriamente');
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }
 }
TipoExamen.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('TipoExamen_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('TipoExamen.TipoExamen.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'Tipo de Examen eliminado correctamente');
            me.__data_store.load();
        }else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Tipo de Examen?');


}
