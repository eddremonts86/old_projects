function Menu_inicioGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Menu_inicio_btn_id',
            tooltip : 'Adiciona un nuevo Año',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddMenu_inicio, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar ',
            id: 'del_Menu_inicio_btn_id',
            tooltip : 'Elimina el Año seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Menu_inicio_btn_id',
            tooltip : 'Modifica el Año seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdMenu_inicio, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Menu_inicio_tbar_id');
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
App.RegisterFunction('Menu_inicioGestionar', new Menu_inicioGestionar());
this.panel=null;
this.panelupd=null;
Menu_inicio.prototype.winaddMenu_inicio = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
       this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            autoScroll:true,
            defaults: {anchor: '100%'},
            defaultType: 'numberfield',
            items:[{
                fieldLabel: 'Nombre',
                xtype:'textfield',
                name: 'nombre_id',
                id: 'nombre_id',
                anchor: '70%'
                },
                {
                name: 'orden',
                fieldLabel: 'Orden',
                id: 'orden',
                anchor: '25%'
                },
                {   xtype: 'checkboxfield',
                    boxLabel  : 'Itenms Activo',
                    inputValue: '1',
                    id        : 'Activo',
                    name        : 'Activo'
                },
                {
                xtype: 'htmleditor',
                hideLabel : true,
                width: '100%',
                id:'resumen_add',
                name:'resumen_add',
                value:'<h1>Resumen</h1>'
                },
                {
                xtype: 'htmleditor',
                hideLabel : true,
                id:'cuerpo_add',
                name:'cuerpo_add',
                width: '100%',
                value:'<h1>Cuerpo Entero</h1>'
            }]
        });

        var _gst_winadd = new Ext.Window(
            {
                title:'Adicionar Items',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: '70%',
                width: '80%',
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
                        _gst_winadd.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });

        _gst_winadd.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Menu_inicio.prototype.winupdMenu_inicio = function(_paccion){
    var _selectionModel = Ext.getCmp('Menu_inicio_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var  titulo=_selected_rcd.data.titulo;
    var  orden=_selected_rcd.data.orden;
    var  cuerpo=_selected_rcd.data.cuerpo;
    var  resumen=_selected_rcd.data.resumen;
    var  activo=_selected_rcd.data.activo;
    console.log(activo);

    var  id=_selected_rcd.data.id;

    if(_paccion == 'upd')
     {

         this.panelupd = Ext.create('Ext.form.Panel', {
             id: 'panelupd',
             name: 'panelupd',
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             autoScroll:true,
             defaults: {
                 anchor: '100%'
             },
             defaultType: 'numberfield',
             items:[
                    {

                 fieldLabel: 'Nombre',
                 name: 'id_Udt_id',
                 xtype:'textfield',
                 id: 'id_Udt_id',
                 anchor: '70%',
                 hidden:true,
                 value:id
             },
                    {

                 fieldLabel: 'Nombre',
                 name: 'nombre_id',
                 xtype:'textfield',
                 id: 'nombre_id',
                 anchor: '70%',
                 value:titulo
             },
                    {
                     name: 'orden',
                     fieldLabel: 'Orden',
                     id: 'orden',
                     anchor: '25%',
                        value:orden
                 },
                    {   xtype: 'checkboxfield',
                         boxLabel  : 'Itenms Activo',
                         inputValue: '1',
                         id: 'Activo',
                         name: 'Activo'
                     },
                    {
                         xtype: 'htmleditor',
                         hideLabel : true,
                         width: '100%',
                         id:'resumen_add',
                         name:'resumen_add',
                         value:'<h1>Resumen</h1>',
                        value:resumen
                     },
                    {
                         xtype: 'htmleditor',
                         hideLabel : true,
                         id:'cuerpo_add',
                         name:'cuerpo_add',
                         width: '100%',
                         value:'<h1>Cuerpo Entero</h1>',
                        value:cuerpo
                     }
                   ]
         });
         var _gst_winupdann = new Ext.Window(
             {
                 title:'Modificar Items',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: '70%',
                 width: '80%',
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
                         _gst_winupdann.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         //Ext.getCmp('nombre_Udt_id').focus(true, true);
                     },
                     afterrender: function() {
                         if (activo=='true')
                         Ext.getCmp('Activo').setValue(true);
                     },
                     scope : this
                 }
             });

         _gst_winupdann.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Menu_inicio.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Menu_inicio.Menu_inicio.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Año adicionado satisfactoriamente');
        }
    }
}
Menu_inicio.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Menu_inicio.Menu_inicio.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Año modificado satisfactoriamente');
        }
    }
 }
Menu_inicio.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Menu_inicio_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Menu_inicio.Menu_inicio.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Items eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Items?');

}
