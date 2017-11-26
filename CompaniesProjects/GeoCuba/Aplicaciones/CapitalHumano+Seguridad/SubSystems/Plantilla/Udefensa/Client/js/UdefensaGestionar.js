function UdefensaGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Udefensa_btn_id',
            tooltip : 'Adiciona una nueva Ubicación de la Defensa',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Udefensa_btn_id',
            tooltip : 'Elimina la Ubicación de la Defensa seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Udefensa_btn_id',
            tooltip : 'Modifica la Ubicación de la Defensa seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Udefensa_tbar_id');
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
            name: 'searchField_udef_udef',
            id:'searchField_udef_udef',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Udefensa_grid_id').store);
                    Ext.getCmp('Udefensa_grid_id').store.clearFilter();
                    Ext.getCmp('Udefensa_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_udef_udef').getValue());
                    Ext.getCmp('Udefensa_grid_id').store.filter("ubicacion", Ext.getCmp('searchField_udef_udef1').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_udef_udef1',
            id:'searchField_udef_udef1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Ubicacion...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Udefensa_grid_id').store);
                    Ext.getCmp('Udefensa_grid_id').store.clearFilter();
                    Ext.getCmp('Udefensa_grid_id').store.filter("ubicacion", Ext.getCmp('searchField_udef_udef1').getValue());
                    Ext.getCmp('Udefensa_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_udef_udef').getValue());
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
App.RegisterFunction('UdefensaGestionar', new UdefensaGestionar());
this.panel=null;
this.panelupd=null;
Udefensa.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this.__data_store_Deftip = App.BuildJsonStore('Udefensa.Udefensa.CargarDatosDeftip',{
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        // Simple ComboBox using the data store
        var DeftipCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Ubicación de la Defensa',
            name:'datos_deftip',
            id:'datos_deftip',
            displayField: 'nombre',
            valueField: 'id',
            width: 500,
            store: this.__data_store_Deftip,
            emptyText:'Select a state...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false

        });
        this.__data_store_traid = App.BuildJsonStore('Udefensa.Udefensa.CargarDatostraid',{
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'},
                    {name: 'nombre_completo'}
                ],
                pageSize: 10,
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        // Simple ComboBox using the data store
        var traidCombo = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Trabajador',
            name:'datos_trabajador',
            id:'datos_trabajador',
            displayField: 'nombre_completo',
            valueField: 'id',
            width: 500,
            store: this.__data_store_traid,
            editable : false,
            typeAhead: true,
            emptyText:'Select a state...',
            allowBlank: false,
            pageSize: 10,
            listConfig: {
                loadingText: 'Cargando...',
                emptyText: 'No existen datos.',
                getInnerTpl: function() {return  '{nombre_completo}';}
            }
        });
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
            items: [traidCombo,DeftipCombo]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar una Ubicación de la Defensa',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 160,
                width: 460,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-primary',
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
                      //  Ext.getCmp('_gst_Add_win_id').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Udefensa.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Udefensa_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var _value_trab=_selected_rcd.data.trabajador;
    var _value_ubc=_selected_rcd.data.ubicacion;
    id_tpo=_selected_rcd.data.id;
    if(_paccion == 'upd')
     {
         this.__data_store_Deftip = App.BuildJsonStore('Udefensa.Udefensa.CargarDatosDeftip',
             {
                 fields: [
                     {type: 'string',name: 'id'},
                     {type: 'string',name: 'nombre'}
                 ],
                 proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                 },
                 autoLoad: false
             });
         // Simple ComboBox using the data store
         var DeftipCombo = Ext.create('Ext.form.field.ComboBox', {
             fieldLabel: 'Ubicación de la Defensa',
             name:'datos_deftip',
             id:'datos_deftip',
             displayField: 'nombre',
             valueField: 'id',
             width: 500,
            // value:_value_ubc,
             store: this.__data_store_Deftip,
             emptyText:'Select a state...',
             selectOnFocus:true,
             editable:false,
             allowBlank: false

         });

         this.__data_store_traid = App.BuildJsonStore('Udefensa.Udefensa.CargarDatostraid',
             {
                 fields: [
                     {type: 'string',name: 'id'},
                     {type: 'string',name: 'nombre'},
                     {name: 'nombre_completo'}
                 ],pageSize: 10,
                 proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                 },
                 autoLoad: false
             });
             this.__data_store_traid.load({params:{modif:true}})
         // Simple ComboBox using the data store
         var traidCombo = Ext.create('Ext.form.field.ComboBox', {
             fieldLabel: 'Trabajador',
             name:'datos_trabajador',
             id:'datos_trabajador',
             displayField: 'nombre_completo',
             valueField: 'id',
             width: 500,
             queryMode:'local',
             //value:_value_trab,
             store: this.__data_store_traid,
             emptyText:'Select a state...',
             selectOnFocus:true,
             editable:false,
             allowBlank: false,
             pageSize: 10,
             listConfig: {
                 loadingText: 'Cargando...',
                 emptyText: 'No existen datos.',
                 getInnerTpl: function() {return  '{nombre_completo}';}
             }

         });

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
             items: [

                    traidCombo,
                    DeftipCombo,
                    {fieldLabel: 'id',
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
                 height: 160,
                 width: 460,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panelupd],
                 buttons: [{
                     text: 'Aceptar',cls:'btn btn-primary',
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
                         Ext.getCmp('id_Udt_id').focus(true, true);
//                         Ext.getCmp('datos_deftip').select(_value_ubc);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Udefensa.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Udefensa.Udefensa.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Ubicación de la Defensa adicionada satisfactoriamente');
        }else
            {
                App.InfoMessage('Información', 'Esa ubicación de la defensa para ese trabajador ya existe');
            }
    }
}
Udefensa.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Udefensa.Udefensa.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Ubicación de la Defensa  modificada satisfactoriamente');
        }
    }
 }
Udefensa.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Udefensa_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Udefensa.Udefensa.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Ubicación de la Defensa eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Ubicación de la Defensa?');

}