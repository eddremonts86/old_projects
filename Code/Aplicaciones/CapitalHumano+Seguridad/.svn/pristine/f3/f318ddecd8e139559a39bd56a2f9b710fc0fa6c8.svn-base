function UdefensaTGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_UdefensaT_btn_id',
            tooltip : 'Adiciona  una nueva Ubicación de la Defensa',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_UdefensaT_btn_id',
            tooltip : 'Elimina el Tipo de Ubicación de la Defensa seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_UdefensaT_btn_id',
            tooltip : 'Modifica el Tipo de Ubicación de la Defensa seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('UdefensaT_tbar_id');
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
App.RegisterFunction('UdefensaTGestionar', new UdefensaTGestionar());
this.panel=null;
this.panelupd=null;
UdefensaT.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
    this.__data_store1 = App.BuildJsonStore('UdefensaT.UdefensaT.CargarDatos',
            {
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'},
                    {type: 'string',name: 'activo'},
                    {type: 'string',name:'ubicacion_defensa_tipoid'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });

// Simple ComboBox using the data store
        var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Ubicación de Procedencia',
            name:'datos_UBT_id',
            id:'datos_UBT_id',
            displayField: 'nombre',
            valueField: 'id',
            width: 500,
            labelWidth: 150,
            store: this.__data_store1,
            editable : false,
            typeAhead: true,
            emptyText:'Select a state...',
            allowBlank: true

        });
//===================================================================================================
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {
                anchor: '100%',
                labelWidth: 150
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Ubicación Militar',
                name: 'nombre_id',
                id:'nombre_id',
                allowBlank: false,
                maxLength: 255,
                maskRe: /([A-Za,-z0-9 -]+)/
                },
                simpleCombo
                ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar una Ubicación de la Defensa',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 170,
                width: 450,
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
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
UdefensaT.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('UdefensaT_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    id_tpo=_selected_rcd.data.id;
    this.__data_store2 = App.BuildJsonStore('UdefensaT.UdefensaT.CargarDatos',
        {
            fields: [
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre'},
                {type: 'string',name: 'activo'},
                {type: 'string',name:'ubicacion_defensa_tipoid'}
            ],
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
        });

// Simple ComboBox using the data store
    var simpleCombo1 = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Ubicación de Procedencia',
        name:'datos_UBT_id',
        id:'datos_UBT_id',
        displayField: 'nombre',
        valueField: 'id',
        width: 500,
        labelWidth: 120,
        store: this.__data_store2,
        editable : false,
        emptyText:'Select a state...',
        typeAhead: true,
        allowBlank: true

    });

    if(_paccion == 'upd')
     {

         this.panelupd = Ext.create('Ext.form.Panel', {
             id: 'panelupd',
             name: 'panelupd',
             bodyPadding: 5,
             height: 380,
             width: 560,
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
                 labelWidth: 120,
                 maxLength: 255,
                 maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,.]/
             },simpleCombo1,
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
                 title:'Modificar la Ubicación de la Defensa',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 170,
                 width: 450,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panelupd],
                 buttons: [{
                     text: 'Aceptar',
                     handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
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
                         //Ext.getCmp('datos_UBT_id').select(_value_nom_oll);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
UdefensaT.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('UdefensaT.UdefensaT.Add',this.panel.getForm().getValues());
        App.HideMsgBox();
        this.__data_store.load();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            this.__data_store.load();
            App.InfoMessage('Información', 'Tipo de Ubicación de la Defensa adicionada satisfactoriamente');
        }
    }
}
UdefensaT.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('UdefensaT.UdefensaT.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Tipo de Ubicación de la Defensa modificada satisfactoriamente');
        }
    }
 }
UdefensaT.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('UdefensaT_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('UdefensaT.UdefensaT.Eliminar',{id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Tipo de Ubicación de la Defensa eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Tipo de Ubicación de la Defensa?');

}
