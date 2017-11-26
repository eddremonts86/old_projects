function ReservasGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Reservas__bt_id',
            tooltip : 'Adiciona un  nuevo Reservas',
            iconCls: 'list_add16',
            handler: Ext.Function.bind(this.Owner.OnShowWindowcp, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Reservas_btn_id',
            tooltip : 'Elimina el Reservas seleccionado',
            iconCls: 'edit_delete16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectcp, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Reservas_btn_id',
            tooltip : 'Modifica el Reservas seleccionado',
            iconCls: 'apply16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Reservas_tbar_id');
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
            name: 'searchField',
            id:'searchField_Reservas',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Control...',
            listeners: {
                change:function(){
                    Ext.getCmp('Reservas_grid_id').store.clearFilter();
                    Ext.getCmp('Reservas_grid_id').store.filter("nombre", Ext.getCmp('searchField_Reservas').getValue());
                    Ext.getCmp('Reservas_grid_id').store.filter("ejecutor", Ext.getCmp('searchField_Reservasejecutor').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField',
            id:'searchField_Reservasejecutor',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Ejecutor...',
            listeners: {
                change:function(){
                    Ext.getCmp('Reservas_grid_id').store.clearFilter();
                    Ext.getCmp('Reservas_grid_id').store.filter("ejecutor", Ext.getCmp('searchField_Reservasejecutor').getValue());
                    Ext.getCmp('Reservas_grid_id').store.filter("nombre", Ext.getCmp('searchField_Reservas').getValue());
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
App.RegisterFunction('ReservasGestionar', new ReservasGestionar());
this.panel=null;
this.panelupd=null;
Reservas.prototype.OnShowWindowcp = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {

        this.__data_store_niveles_agen= App.BuildJsonStore('Reservas.Reservas.niveles',{
            fields: [
                {name: 'id'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        this.__data_store_trbajadores= App.BuildJsonStore('Reservas.Reservas.trbaj',{
            fields: [
                {name: 'plantilla_id'},
                {name: 'nombre_completo'},
                {name: 'contrato_id'},
                {name: 'trabajadorid'},
                {name: 'area'},
                {name: 'cargo'},
                {name: 'agencia'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
       var traba = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Trabajadores',
            store: this.__data_store_trbajadores,
            queryMode: 'local',
            id:'trbaj',
            name:'trbaj',
           editable:false,
            valueField: 'plantilla_id',
           tpl: Ext.create('Ext.XTemplate',
               '<tpl for=".">',
               '<div class="x-boundlist-item"><b>{nombre_completo}</b><br>{agencia}/{area}<br>{cargo}</div>',
               '</tpl>'
           ),
           // template for the content inside text field
           displayTpl: Ext.create('Ext.XTemplate',
               '<tpl for=".">{nombre_completo}</tpl>'
           )
        });
        var nivel = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Nivel',
            store: this.__data_store_niveles_agen,
            queryMode: 'local',
            id:'Nivel',
            name:'Nivel',
            editable:false,
            displayField: 'nombre',
            valueField: 'id'
        });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {anchor: '100%'},
            defaultType: 'textfield',
            items: [traba,nivel]
        });
        var _gst_win = new Ext.Window({
                title:'Adicionar una reserva',
                id: '_gst_Add_win_id_Causa',
                name: '_gst_Add_win_id_Causa',
                height: 180,
                width: 450,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [
                          {
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                },
                          {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_win.close();
                    }
                }
                ],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('trbaj').focus(true, true);
                    }
                }
            });
        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Reservas.prototype.OnShowWindow2cp = function(_paccion){
    var mydd =new Array();
    var _array = new Array();
    var mydd = Ext.getCmp('Reservas_grid_id').getStore().getModifiedRecords();
    if (mydd.length === 0)
    { App.InfoMessage('Información', 'No ha modificado fila alguna');}
    else
    {
        for (var i = 0; i < mydd.length; i++)
        {
            _array.push(mydd[i].getData());
        }
        var fnCallBack = function()   {
            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
            var _result = App.PerformSyncServerRequest('Reservas.Reservas.Modid',{data: Ext.encode(_array)});
            App.HideMsgBox();
            if(_result)
            {
                Ext.getCmp('Reservas_grid_id').getStore().load()
                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
            }
            else
            {
                Ext.getCmp('Reservas_grid_id').getStore().load()
                App.InfoMessage('Información', 'Ocurrio un error');
            }
        }
        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
    }



 }
Reservas.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
       // App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var id = Ext.getCmp('trbaj').getValue();
        var record = Ext.getCmp('trbaj').store.findRecord('plantilla_id',id,0,false,false,true);
        var Nivel = Ext.getCmp('Nivel').getValue();
        var plantilla_id = record.data.plantilla_id;
        var contrato_id = record.data.contrato_id;
        var trabajadorid = record.data.trabajadorid;

        var _result = App.PerformSyncServerRequest('Reservas.Reservas.Add',{trabajadorid:trabajadorid,Nivel:Nivel,contrato_id:contrato_id,plantilla_id:plantilla_id});
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('trbaj').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Reservas adicionado satisfactoriamente');
        }
    }
}
Reservas.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Reservas_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Reservas.Reservas.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Reservas eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Reservas?');

}
