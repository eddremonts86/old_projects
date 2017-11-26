function OficialGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Oficial_btn_id',
            tooltip : 'Adiciona un nuevo Oficial',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Oficial_btn_id',
            tooltip : 'Elimina el Oficial seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Oficial_btn_id',
            tooltip : 'Modifica el Oficial seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Oficial_tbar_id');
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
            name: 'searchField_oficial',
            id:'searchField_oficial',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Cargo...',
            listeners: {
                change:function(){

                    Ext.getCmp('Oficial_grid_id').store.clearFilter();
                    Ext.getCmp('Oficial_grid_id').store.filter("cmilitar", Ext.getCmp('searchField_oficial').getValue());
                    Ext.getCmp('Oficial_grid_id').store.filter("gmilitar", Ext.getCmp('searchField_oficial1').getValue());
                    Ext.getCmp('Oficial_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_oficial2').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_oficial1',
            id:'searchField_oficial1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Grado...',
            listeners: {
                change:function(){

                    Ext.getCmp('Oficial_grid_id').store.clearFilter();
                    Ext.getCmp('Oficial_grid_id').store.filter("cmilitar", Ext.getCmp('searchField_oficial').getValue());
                    Ext.getCmp('Oficial_grid_id').store.filter("gmilitar", Ext.getCmp('searchField_oficial1').getValue());
                    Ext.getCmp('Oficial_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_oficial2').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_oficial2',
            id:'searchField_oficial2',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
                change:function(){

                    Ext.getCmp('Oficial_grid_id').store.clearFilter();
                    Ext.getCmp('Oficial_grid_id').store.filter("cmilitar", Ext.getCmp('searchField_oficial').getValue());
                    Ext.getCmp('Oficial_grid_id').store.filter("gmilitar", Ext.getCmp('searchField_oficial1').getValue());
                    Ext.getCmp('Oficial_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_oficial2').getValue());
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
App.RegisterFunction('OficialGestionar', new OficialGestionar());
this.panel=null;
this.panelupd=null;
Oficial.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
//=================================================Cmilitar==================================================
        this.__data_store_Cmilitar = App.BuildJsonStore('Oficial.Oficial.CargarDatosCMilitar',{
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
        var ComboCmilitar = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Cargo Militar',
            name:'Cmilitar_UBT_id',
            id:'Cmilitar_UBT_id',
            displayField: 'nombre',
            valueField: 'id',
            width: 500,
            labelWidth: 150,
            store: this.__data_store_Cmilitar,
            emptyText:'Select a state...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false

        });
//=================================================Gmilitar==================================================
        this.__data_store_Gmilitar = App.BuildJsonStore('Oficial.Oficial.CargarDatosGmilitar',{
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
// Simple ComboBox using the data store
        var ComboGmilitar = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Grado Militar',
            name:'Gmilitar_UBT_id',
            id:'Gmilitar_UBT_id',
            displayField: 'nombre',
            valueField: 'id',
            width: 500,
            labelWidth: 150,
            store: this.__data_store_Gmilitar,
            emptyText:'Select a state...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false

        });
//=================================================Trabajador==================================================
        this.__data_store_Trabajador = App.BuildJsonStore('Oficial.Oficial.CargarDatosTrabajador',{
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'},
                    {name: 'nombre_completo'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                pageSize: 10,
                autoLoad: false
            });
// Simple ComboBox using the data store
        var ComboTrabajador = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Nombre Trabajador',
            name:'Trabajador_UBT_id',
            id:'Trabajador_UBT_id',
            displayField: 'nombre_completo',
            valueField: 'id',
            width: 500,
            labelWidth: 150,
            store: this.__data_store_Trabajador,
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
//=================================================================================================================
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {anchor: '100%', labelWidth: 150},
            defaultType: 'textfield',
            items: [{
                xtype: 'datefield',
                fieldLabel: 'Fecha de incorporación',
                name: 'fecha',
                id:'fecha',
                editable:false,
                allowBlank: false,
                maxValue: new Date()
            },ComboCmilitar,ComboGmilitar,ComboTrabajador]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Oficial',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 220,
                width: 460,
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
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('fecha').focus(true, true);
                    }
                }
            });
        _gst_win.show();
    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Oficial.prototype.OnShowWindow2 = function(_paccion){
    var _value_id_old=null;
    var fecha=null;
    //var id_tpo=null;
    var cmilitar=null;
    var gmilitar=null;
    var trabador =null;
    var _selectionModel = Ext.getCmp('Oficial_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    fecha=_selected_rcd.data.fecha;
    trabador=_selected_rcd.data.trabador;
    var nombre_completo=_selected_rcd.data.nombre_completo;
    gmilitar=_selected_rcd.data.gmilitar;
    cmilitar=_selected_rcd.data.cmilitar;
    _value_id_old=_selected_rcd.data.id;
    if(_paccion == 'upd')
     {
//=================================================Cmilitar==================================================
        this.__data_store_Cmilitar = App.BuildJsonStore('Oficial.Oficial.CargarDatosCMilitar',{
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
        var ComboCmilitar = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Cargo Militar',
            name:'Cmilitar_UBT_id',
            id:'Cmilitar_UBT_id',
            displayField: 'nombre',
            valueField: 'id',
            width: 500,
            labelWidth: 150,
            store: this.__data_store_Cmilitar,
            emptyText:'Select a state...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false
            //value:cmilitar

        });
//=================================================Gmilitar==================================================
        this.__data_store_Gmilitar = App.BuildJsonStore('Oficial.Oficial.CargarDatosGmilitar',{
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
// Simple ComboBox using the data store
        var ComboGmilitar = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Grado Militar',
            name:'Gmilitar_UBT_id',
            id:'Gmilitar_UBT_id',
            displayField: 'nombre',
            valueField: 'id',
            width: 500,
            labelWidth: 150,
            store: this.__data_store_Gmilitar,
            emptyText:'Select a state...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false
            //value:gmilitar

        });
//=================================================Trabajador==================================================
        this.__data_store_Trabajador = App.BuildJsonStore('Oficial.Oficial.CargarDatosTrabajador',{
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'},{name: 'nombre_completo'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                pageSize: 10,
                autoLoad: false
            });
// Simple ComboBox using the data store
        var ComboTrabajador = Ext.create('Ext.form.field.ComboBox', {
            fieldLabel: 'Nombre Trabajador',
            name:'Trabajador_UBT_id',
            id:'Trabajador_UBT_id',
            displayField: 'nombre_completo',
            valueField: 'id',
            width: 500,
            labelWidth: 150,
            store: this.__data_store_Trabajador,
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
//=================================================================================================================
        this.panelupd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panelupd',
            name:'panelupd',
            defaults: {anchor: '100%', labelWidth: 150},
            defaultType: 'textfield',
            items: [{
                xtype: 'datefield',
                fieldLabel: 'Fecha de incorporación',
                name: 'fecha',
                id:'fecha',
                editable:false,
                allowBlank: false,
                maxValue: new Date()
               // value:fecha
            },ComboCmilitar,ComboGmilitar,ComboTrabajador,
                {
                    fieldLabel: 'old_Trabajador_UBT_id',
                    name: 'old_Trabajador_UBT_id',
                    id:'old_Trabajador_UBT_id',
                    allowBlank: false,
                    value:_value_id_old,
                    hidden:true,
                    maxLength: 255,
                    maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                }]
        });
         var _gst_win = new Ext.Window({
                 title:'Modificar el Oficial: '+ nombre_completo,
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
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('fecha').focus(true, true);
                     }
                 }
             });
         _gst_win.show();
     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Oficial.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Oficial.Oficial.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            App.InfoMessage('Información', 'Oficial adicionado satisfactoriamente');
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }
}
Oficial.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Oficial.Oficial.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'Oficial modificado satisfactoriamente');
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }
 }
Oficial.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Oficial_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Oficial.Oficial.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'Oficial eliminado correctamente');
            me.__data_store.load();
        }else{
            App.InfoMessage('Información', 'Ha ocurrido un error preocesando los datos');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Oficial?');


}
