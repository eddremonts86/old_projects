function PlanGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Plan__bt_id',
            tooltip : 'Adiciona un  nuevo Clasificaci&oacute;n Cientifica',
            iconCls: 'add',
            cls:'btn',
            handler:function(){
                Ext.define('FILA',{
                    extend: 'Ext.data.Model',
                    fields: [
                        {name: 'nombre'},
                        {name: 'tipo'},
                        {name: 'inicio'},
                        {name: 'fin'},
                        {name: 'total'},
                        {name: 'frecuencia'},
                        {name: 'salario'},
                        {name: 'otros'},
                        {name: 'cuc'},
                        {name: 'actividad'}
                    ]
                });
                //var _result = App.PerformSyncServerRequest('Targeta.Targeta.dia');
                //var dia = Ext.decode(_result);
                var record = new FILA({tipo:'',actividad:'',cuc:'',otros:'',otros:'',salario:'',nombre : '',inicio : '',fin : '',total : '',frecuencia:'',});
                Ext.getCmp('Plan_grid_id').store.add(record);
            }
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Plan_btn_id',
            tooltip : 'Elimina Clasificaci&oacute;n Cientifica seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectcp, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Plan_btn_id',
            tooltip : 'Modifica Clasificaci&oacute;n Cientifica seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Plan_tbar_id');
        /*tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_class_cien',
            id:'searchField_class_cien',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Clasificaci&oacute;n Cientifica...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Plan_grid_id').store);
                    Ext.getCmp('Plan_grid_id').store.clearFilter();
                    Ext.getCmp('Plan_grid_id').store.filter("nombre", Ext.getCmp('searchField_class_cien').getValue());
                },scope:this
            }
        });*/
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
App.RegisterFunction('PlanGestionar', new PlanGestionar());
this.panel=null;
this.panelupd=null;
Plan.prototype.OnShowWindowcp = function(_paccion){
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
                fieldLabel: 'Clasificaci&oacute;n',
                name: 'nombre_id',
                id:'nombre_id',
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            }]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar una Clasificaci&oacute;n Cientifica',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 130,
                width: 450,
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
        Ext.Msg.alert('Atenci&oacute;n', 'Acci&oacute;n no definida');
}
Plan.prototype.OnShowWindow2cp = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Plan_grid_id').getSelectionModel();
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
                 fieldLabel: ' Clasificaci&oacute;n',
                 name: 'nombre_Udt_id',
                 id:'nombre_Udt_id',
                 allowBlank: false,
                 value:_value_nom_oll,
                 maxLength: 255,
                 maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
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
                 title:'Modificar la Clasificaci&oacute;n Cientifica',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 130,
                 width: 450,
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
         Ext.Msg.alert('Atenci&oacute;n', 'Acci&oacute;n no definida');
 }
Plan.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var   _result = App.PerformSyncServerRequest('Plan.Plan.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Informaci&oacute;n', ' Clasificaci&oacute;n Cientifica adicionada satisfactoriamente');
        }
    }
}
Plan.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Plan.Plan.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Informaci&oacute;n', 'Plan modificado satisfactoriamente');
        }
    }
 }
Plan.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Plan_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        var cap_plan = _selected_rcd.data.cap_plan;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Plan.Plan.Eliminar', {id: id,cap_plan:cap_plan});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Informaci&oacute;n', 'Plan eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿ Est&aacute; seguro que desea eliminar esta Clasificacion Cientifica ?');

}
