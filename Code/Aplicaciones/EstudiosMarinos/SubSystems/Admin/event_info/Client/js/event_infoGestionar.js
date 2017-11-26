function event_infoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_event_info_btn_id',
            tooltip : 'Adiciona  nuevo Tipo de cargo miltar',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_event_info_btn_id',
            tooltip : 'Eliminar  tipo de cargo miltar',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_event_info_btn_id',
            tooltip : 'Modifica tipo de cargo miltar seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('event_info_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
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
App.RegisterFunction('event_infoGestionar', new event_infoGestionar());
this.panel=null;
this.panelupd=null;
event_info.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        var states_tipo = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"name":"Eventos"},
                {"name":"Informacion general"},
                {"name":"Regulaciones"}
            ]
        });
        var tipo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Tipo de acción',
            store: states_tipo,
            id:'tipo',
            name:'tipo',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name'
        });
        var states_caracter = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"name":"Urgente"},
                {"name":"Importante"},
                {"name":"Nuevo"}
            ]
        });
        var caracter = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Caracter',
            store: states_caracter,
            queryMode: 'local',
            id:'caracter',
            name:'caracter',
            displayField: 'name',
            valueField: 'name'
        });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            defaults: {
                anchor: '90%'
            },
            defaultType: 'textfield',
            items: [
                {
                fieldLabel: 'Nombre',
                name: 'Nombre',
                id:'Nombre',
                allowBlank: false,
                maxLength: 255
                },
                caracter,tipo,
                {
                    fieldLabel: 'Resumen',
                    name: 'titulo',
                    id:'titulo',
                    allowBlank: false,
                    maxLength: 255
                },
                {   xtype:'textarea',
                    fieldLabel: 'Cuerpo',
                    name: 'Cuerpo',
                    id:'Cuerpo',
                    height:120,
                    allowBlank: false,
                    maxLength: 255
                }
            ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Nuevo tipo de cargo miltar',
                id: '_gst_Add_win_id',
                height: '50%',
                width: '50%',
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
event_info.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selected_rcd = Ext.getCmp('event_info_grid_id').getSelectionModel().getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    id_tpo=_selected_rcd.data.id;

    var titulo=_selected_rcd.data.titulo;
    var tipo=_selected_rcd.data.tipo;
    var cuerpo=_selected_rcd.data.cuerpo;
    var caracter=_selected_rcd.data.caracter;


    if(_paccion == 'upd')
     {

         var states_tipo = Ext.create('Ext.data.Store', {
             fields: ['abbr', 'name'],
             data : [
                 {"name":"Eventos"},
                 {"name":"Informacion general"},
                 {"name":"Regulaciones"}
             ]
         });
         var tipo = Ext.create('Ext.form.ComboBox', {
             fieldLabel: 'Tipo de acción',
             store: states_tipo,
             id:'tipo',
             name:'tipo',
             queryMode: 'local',
             displayField: 'name',
             valueField: 'name',
             value:tipo
         });
         var states_caracter = Ext.create('Ext.data.Store', {
             fields: ['abbr', 'name'],
             data : [
                 {"name":"Urgente"},
                 {"name":"Importante"},
                 {"name":"Nuevo"}
             ]
         });
         var caracter = Ext.create('Ext.form.ComboBox', {
             fieldLabel: 'Caracter',
             store: states_caracter,
             queryMode: 'local',
             id:'caracter',
             name:'caracter',
             displayField: 'name',
             valueField: 'name',
             value:caracter
         });
         this.panel = Ext.create('Ext.form.Panel', {
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             id:'panel',
             defaults: {
                 anchor: '90%'
             },
             defaultType: 'textfield',
             items: [
                 {
                     fieldLabel: 'Nombre',
                     name: 'Nombre',
                     id:'Nombre',
                     allowBlank: false,
                     maxLength: 255,
                     value:_value_nom_oll
                 },
                 {
                     fieldLabel: 'id_tpo',
                     name: 'id_tpo',
                     id:'id_tpo',
                     hidden:true,
                     allowBlank: false,
                     maxLength: 255,
                     value:id_tpo
                 },
                 caracter,tipo,
                 {
                     fieldLabel: 'Resumen',
                     name: 'titulo',
                     id:'titulo',
                     allowBlank: false,
                     maxLength: 255,
                     value:titulo
                 },
                 {   xtype:'textarea',
                     fieldLabel: 'Cuerpo',
                     name: 'Cuerpo',
                     id:'Cuerpo',
                     height:170,
                     allowBlank: false,
                     maxLength: 10000,
                     value:cuerpo

                 }
             ]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar tipo de cargo miltar',
                 id: '_gst_Udt_win_id',
                 height: 400,
                 width: 460,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panel],
                 buttons: [{
                     text: 'Aceptar',
                     handler: Ext.Function.bind(this.Modid, this, [_paccion]),
                     scope: this
                 }, {
                     text: 'Cancelar',
                     handler: function(){
                         _gst_win.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('Nombre').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
event_info.prototype.Add = function(_paccion){
    _result = App.PerformSyncServerRequest('event_info.event_info.Add',this.panel.getForm().getValues());
    this.__data_store.load({params:{start:0,limit:25}});
}
event_info.prototype.Modid = function(_paccion){
    _result = App.PerformSyncServerRequest('event_info.event_info.Modid',this.panel.getForm().getValues());
    this.__data_store.load({params:{start:0,limit:25}});
 }
event_info.prototype.deltect=function(_paccion){
    var _selected_rcd = Ext.getCmp('event_info_grid_id').getSelectionModel().getLastSelected();
    var id = _selected_rcd.data.id;
    _result = App.PerformSyncServerRequest('event_info.event_info.Eliminar', {id: id});
    this.__data_store.load({params:{start:0,limit:25}});
}
