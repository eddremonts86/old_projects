function ProyectoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Proyecto_btn_id',
            tooltip : 'Adiciona un nuevo Proyecto',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddProyecto, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Proyecto_btn_id',
            tooltip : 'Elimina el Proyecto seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Proyecto_btn_id',
            tooltip : 'Modifica el Proyecto seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdProyecto, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Proyecto_tbar_id');
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
App.RegisterFunction('ProyectoGestionar', new ProyectoGestionar());
this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
Proyecto.prototype.winaddProyecto = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('Proyecto.Proyecto.CargarAnnos',
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
        this._store_combo_contrato= App.BuildJsonStore('Proyecto.Proyecto.Cargarcontratos',
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
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: { anchor: '100%', labelWidth: 150},
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
               fieldLabel: 'Monto',
               name: 'monto_id',
               id:'monto_id',
               allowBlank: false,
               maxLength: 255,
               maskRe: /[0123456789.]/
             },{
               xtype:'combobox',
               name:'combo_value_id',
               id:'combo_value_id',
               fieldLabel: 'Área',
               store: this._store_combo,
               displayField:'nombre',
               valueField: 'id',
               typeAhead: true,
               queryMode: 'local',
               forceSelection: true,
               triggerAction: 'all',
               emptyText:'Select a state...',
               selectOnFocus:true  ,
               editable:false,
               allowBlank: false

           },{
               xtype:'textfield',
               fieldLabel: 'Código',
               name: 'codigo_id',
               id:'codigo_id',
               allowBlank: false,
               maxLength: 255
               //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
           }, {
               xtype:'combobox',
               name:'combo_contrato_value_id',
               id:'combo_contrato_value_id',
               fieldLabel: 'Contrato',
               store: this._store_combo_contrato,
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
           },{
               xtype: 'datefield',
               fieldLabel: 'Inicio del Proyecto',
               name: 'fechaIp',
               id:'fechaIp',
               allowBlank: false,
               editable:false
           },{
               xtype: 'datefield',
               fieldLabel: 'Fin del Proyecto',
               name: 'fechaFp',
               id:'fechaFp',
               allowBlank: false,
               editable:false
           },{
               xtype:'textareafield',
               fieldLabel: 'Descripción',
               name: 'descripcion_id',
               id:'descripcion_id',
               allowBlank: false,
               maxLength: 255

           }

           ]
        });

        var _gst_winaddProyecto = new Ext.Window(
            {
                title:'Adicionar un Proyecto.',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 450,
                width: 530,
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
                        _gst_winaddProyecto.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo.load();
                        this._store_combo_contrato.load();
                    }, scope: this
                }
            });

        _gst_winaddProyecto.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}


Proyecto.prototype.winupdProyecto = function(_paccion){
    var _selectionModel = Ext.getCmp('Proyecto_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var nombre=_selected_rcd.data.nombre;
    var monto=_selected_rcd.data.monto;
    var codigo=_selected_rcd.data.codigo;
    var  id_tpo=_selected_rcd.data.id;
    var _value_nom = null;
    if(_paccion == 'upd')
    {
        this._store_combo_upd= App.BuildJsonStore('Proyecto.Proyecto.CargarAnnos',
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
        this._store_combo_contrato_upd= App.BuildJsonStore('Proyecto.Proyecto.Cargarcontratos',
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
            
        this.panelupd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'panelupd',
            name:'panelupd',
            defaults: { anchor: '100%', labelWidth: 150},
            items: [{
                xtype:'textfield',
                fieldLabel: 'Nombre',
                name: 'nombre_id_upd',
                id:'nombre_id_upd',
                allowBlank: false,
                maxLength: 255,
                value:nombre,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
            },{
                xtype:'textfield',
                fieldLabel: 'Nombre',
                name: 'old_name',
                id:'old_name',
                allowBlank: false,
                maxLength: 255,
                value:nombre,
                hidden:true,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
            },
            {
                xtype:'textfield',
                fieldLabel: 'Monto',
                name: 'monto_id',
                id:'monto_id',
                allowBlank: false,
                maxLength: 255,
                value:monto,
                maskRe: /[0123456789.]/
            },{
                xtype:'combobox',
                name:'combo_value_id',
                id:'combo_value_id',
                fieldLabel: 'Área',
                store: this._store_combo_upd,
                displayField:'nombre',
                valueField: 'id',
                typeAhead: true,
                queryMode: 'local',
                forceSelection: true,
                triggerAction: 'all',
                emptyText:'Select a state...',
                selectOnFocus:true  ,
                editable:false,
                allowBlank: false

            },{
                xtype:'textfield',
                fieldLabel: 'Código',
                name: 'codigo_id',
                id:'codigo_id',
                allowBlank: false,
                maxLength: 255,
                value:codigo
                //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            }, {
                xtype:'combobox',
                name:'combo_contrato_value_id',
                id:'combo_contrato_value_id',
                fieldLabel: 'Contrato',
                store: this._store_combo_contrato_upd,
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
            },{
                xtype: 'datefield',
                fieldLabel: 'Inicio del Proyecto',
                name: 'fechaIp',
                id:'fechaIp',
                allowBlank: false,
                editable:false
              },{
                xtype: 'datefield',
                fieldLabel: 'Fin del Proyecto',
                name: 'fechaFp',
                id:'fechaFp',
                allowBlank: false,
                editable:false
               },{
                xtype:'textareafield',
                fieldLabel: 'Descripción',
                name: 'descripcion_id',
                id:'descripcion_id',
                allowBlank: false,
                maxLength: 255

            }

            ]
        });

        var _gst_winupdProyecto = new Ext.Window(
            {
                title:'Modificar el Proyecto.',
                id: '_gst_upd_win_id',
                name: '_gst_upd_win_id',
                height: 450,
                width: 530,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panelupd],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Modif, this, [_paccion,_selectionModel,_selected_rcd]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winupdProyecto.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id_upd').focus(true, true);
                        this._store_combo_upd.load();
                        this._store_combo_contrato_upd.load();
                    }, scope: this
                }
            });

        _gst_winupdProyecto.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Proyecto.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Proyecto.Proyecto.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Proyecto adicionado satisfactoriamente');
        }
    }
}
Proyecto.prototype.Modif = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Proyecto.Proyecto.Modif',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_upd_win_id').close();
           _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            
            App.InfoMessage('Información', 'Proyecto modificado satisfactoriamente');
        }
    }
 }
Proyecto.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Proyecto_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Proyecto.Proyecto.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Proyecto eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Proyecto?');

}
