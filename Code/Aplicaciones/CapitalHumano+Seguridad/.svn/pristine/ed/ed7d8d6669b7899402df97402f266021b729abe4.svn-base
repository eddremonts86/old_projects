function InterrupcionesGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Interrupciones_btn_id',
            tooltip : 'Adiciona un nuevo Interrupciones',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Interrupciones_btn_id',
            tooltip : 'Elimina el Interrupciones seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Interrupciones_btn_id',
            tooltip : 'Modifica el Interrupciones seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Interrupciones_tbar_id');
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
App.RegisterFunction('InterrupcionesGestionar', new InterrupcionesGestionar());
this.panel=null;
this.panelupd=null;
Interrupciones.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
       this.panel = Ext.create('Ext.form.Panel', {
           id:'panel',
           name:'panel',
           bodyPadding: 5,
           width: 350,
           layout: 'anchor',
           defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [
                {
                fieldLabel: 'Clase',
                name: 'Clase',
                id:'Clase',
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
                },
                {
                    fieldLabel: 'Descipcion',
                    name: 'Descipcion',
                    id:'Descipcion',
                    allowBlank: false,
                    maxLength: 255,
                    maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
                },
                {
                    xtype: 'fieldcontainer',
                    defaultType: 'checkboxfield',
                    width:'100%',
                    items: [
                        {
                            boxLabel  : 'Resive salario',
                            name      : 'salario',
                            inputValue: 'true',
                            width:'90%',
                            id        : 'salario'
                        }
                    ]
                }

            ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Interrupciones',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 250,
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
Interrupciones.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Interrupciones_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    id_tpo=_selected_rcd.data.id;
    var nombre=_selected_rcd.data.nombre;
    var clase=_selected_rcd.data.clase;
    var resibe_salario=_selected_rcd.data.resibe_salario;
    if(_paccion == 'upd')
     {

         this.panelupd = Ext.create('Ext.form.Panel', {
             id:'panelupd',
             name:'panelupd',
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             defaults: {
                 anchor: '100%'
             },
             defaultType: 'textfield',
             items: [
                 {
                     fieldLabel: 'Clase',
                     name: 'Clase',
                     id:'Clase',
                     allowBlank: false,
                     maxLength: 255,
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/,
                     value:nombre
                 },
                 {
                     fieldLabel: 'id_tpo',
                     name: 'id_tpo',
                     id:'id_tpo',
                     allowBlank: false,
                     maxLength: 255,
                     hidden:true,
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/,
                     value:id_tpo
                 },
                 {
                     fieldLabel: 'Descipcion',
                     name: 'Descipcion',
                     id:'Descipcion',
                     allowBlank: false,
                     maxLength: 255,
                     value:clase,
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
                 },
                 {
                     xtype: 'fieldcontainer',
                     defaultType: 'checkboxfield',
                     width:'100%',
                     items: [
                         {
                             boxLabel  : 'Resive salario',
                             name      : 'salario',
                             inputValue: 'true',
                             width:'90%',
                             id        : 'salario'
                         }
                     ]
                 }

             ]
         });
         var _gst_win = new Ext.Window({
                 title:'Modificar el  Interrupciones',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 250,
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
                         _gst_win.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('Clase').focus(true, true);
                        },
                     afterrender:function(){
                        if(resibe_salario=='t'){
                            Ext.getCmp('salario').setValue(true);
                        }

                     }

                 }});
         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Interrupciones.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Interrupciones.Interrupciones.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            this.__data_store.load();
            App.InfoMessage('Información', 'Interrupciones adicionado satisfactoriamente');
        }
    }

}
Interrupciones.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Interrupciones.Interrupciones.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Interrupciones modificado satisfactoriamente');
        }
    }

 }
Interrupciones.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Interrupciones_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Interrupciones.Interrupciones.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Interrupciones eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Interrupciones?');
}
