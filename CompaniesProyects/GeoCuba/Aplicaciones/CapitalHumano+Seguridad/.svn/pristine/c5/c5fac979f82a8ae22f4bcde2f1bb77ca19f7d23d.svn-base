function AreaGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Area_btn_id',
            tooltip : 'Adiciona una nueva Área',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddArea, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Area_btn_id',
            tooltip : 'Elimina el Área seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Area_btn_id',
            tooltip : 'Modifica el Área seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdArea, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Area_tbar_id');
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
App.RegisterFunction('AreaGestionar', new AreaGestionar());

this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
Area.prototype.winaddArea = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('Area.Area.CargarAnnos',
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
            id:'panel',
            name:'panel',
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
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
               labelWidth: 180,
               maxLength: 255,
               maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
           },
               {
                   xtype:'combobox',
                   name:'combo_value_id',
                   id:'combo_value_id',
                   fieldLabel: 'Unidad Empresarial de Base',
                   labelWidth: 180,
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

        var _gst_winaddArea = new Ext.Window(
            {
                title:'Adicionar un Área.',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 150,
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
                        _gst_winaddArea.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo.load();
                    }, scope: this
                }
            });

        _gst_winaddArea.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}


Area.prototype.winupdArea = function(_paccion){

    this._store_combo= App.BuildJsonStore('Area.Area.CargarAnnos',
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


    if(_paccion == 'upd')
    {
         var _selectionModel = Ext.getCmp('Area_grid_id').getSelectionModel();
         var _selected_rcd = _selectionModel.getLastSelected();
         var _value_nomb=_selected_rcd.data.nombre;
         var _value_nombre_agencia = _selected_rcd.data.nombre_agencia;


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
                fieldLabel: 'Nombre',
                labelWidth: 180,
                name: 'nombre_id_upd',
                id:'nombre_id_upd',
                value:_value_nomb,
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
               },
                {
                    xtype:'combobox',
                    name:'combo_value_id_upd',
                    id:'combo_value_id_upd ',
                    fieldLabel: 'Unidad Empresarial de Base',
                    labelWidth: 180,
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
                    allowBlank: false,
                    value:_value_nombre_agencia

                },
                    {
                        xtype : 'hidden',
                        name: 'old_name',
                        id: 'old_name',
                        value :_value_nomb
                    }

            ]
        });

        var _gst_winupdArea = new Ext.Window(
            {
                title:'Modificar el Área.',
                id: '_gst_upd_win_id',
                name: '_gst_upd_win_id',
                height: 150,
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
                        _gst_winupdArea.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {

                        this._store_combo.load();

                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

                        Ext.getCmp('nombre_id_upd').focus(true, true);
//                        Ext.getCmp('combo_value_id_upd').select(_value_nombre_agencia);

                        App.HideMsgBox();

                    }, scope: this
                }
            });

        _gst_winupdArea.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Area.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Area.Area.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Área adicionada satisfactoriamente');
        }
    }

}
Area.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Area.Area.Modif',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_upd_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Área modificada satisfactoriamente');
        }
    }

 }
Area.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Area_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Area.Area.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Área  eliminada correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Área?');


}
