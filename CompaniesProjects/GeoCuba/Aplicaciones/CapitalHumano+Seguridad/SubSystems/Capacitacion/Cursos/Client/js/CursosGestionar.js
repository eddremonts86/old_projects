function CursosGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Cursos__bt_id',
            tooltip : 'Adiciona un  nuevo Eventos',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindowcp, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Cursos_btn_id',
            tooltip : 'Elimina el Eventos seleccionado',
            iconCls: 'del_item',
            disabled: true,

            handler: Ext.Function.bind(this.Owner.deltectcp, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Cursos_btn_id',
            tooltip : 'Modifica el Eventos seleccionado',
            iconCls: 'modify',
            disabled: true,

            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        this._btn_Historial = Ext.create('Ext.Button', {
            text: 'Eventos Inactivos',
            id: 'Historial_Cursos_btn_id',
            tooltip : 'Todos los eventos inactivos',
            iconCls: 'modify',
            disabled: false,
            handler: Ext.Function.bind(this.Owner.activar, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Cursos_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_Historial);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_cursos',
            id:'searchField_cursos',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Eventos...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Cursos_grid_id').store);
                    Ext.getCmp('Cursos_grid_id').store.clearFilter();
                    Ext.getCmp('Cursos_grid_id').store.filter("nombre", Ext.getCmp('searchField_cursos').getValue());
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
App.RegisterFunction('CursosGestionar', new CursosGestionar());
this.panel=null;
this.panelupd=null;
Cursos.prototype.OnShowWindowcp = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this.states = App.BuildJsonStore('Cursos.Cursos.CargarDatosEventos',{
            fields: [
                {name: 'nombre'},
                {name: 'id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json', root: 'rows', totalProperty: 'results'}
            },
            autoLoad: true
        });
        var combo=Ext.create('Ext.form.ComboBox', {
           fieldLabel: 'Tipo de Evento',
           store: this.states ,
           id:'combo',
           name:'combo',
           queryMode: 'local',
           displayField: 'nombre',
           valueField: 'id'
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
            items: [{
                fieldLabel: 'Nombre del Evento',
                name: 'nombre_id',
                id:'nombre_id',
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            },combo,{
                xtype: 'datefield',
                anchor: '100%',
                id:'inicio',name:'inicio',
                fieldLabel: 'Fecha de Inicio',
                minValue: new Date()
            }, {
                xtype: 'datefield',
                anchor: '100%', id:'fin',name:'fin',
                fieldLabel: 'Fecha de Fin',
                minValue: new Date()


            },{
                xtype: 'htmleditor',
                enableColors: false,
                id:'descrip',name:'descrip',
                enableAlignments: false
            }]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Evento',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: '65%',
                width: '40%',
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
Cursos.prototype.OnShowWindow2cp = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Cursos_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    id_tpo=_selected_rcd.data.id;
    if(_paccion == 'upd')
     {
         this.states = App.BuildJsonStore('Cursos.Cursos.CargarDatosEventos',{
             fields: [
                 {name: 'nombre'},
                 {name: 'id'}
             ],
             proxy: {
                 type: 'ajax',
                 reader: {type: 'json', root: 'rows', totalProperty: 'results'}
             },
             autoLoad: true
         });
         var combo=Ext.create('Ext.form.ComboBox', {
             fieldLabel: 'Tipo de Evento',
             store: this.states ,
             id:'combo',
             name:'combo',
             queryMode: 'local',
             displayField: 'nombre',
             valueField: 'id'
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
             items: [{
                 fieldLabel: 'Cursos',
                 name: 'nombre_Udt_id',
                 id:'nombre_Udt_id',
                 allowBlank: false,
                 value:_value_nom_oll,
                 maxLength: 255,
                 maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
             },combo,{
                     fieldLabel: 'id',
                     name: 'id_Udt_id',
                     id:'id_Udt_id',
                     allowBlank: false,
                     value:id_tpo,
                     hidden:true,
                     maxLength: 255,
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                 },{
                     xtype: 'datefield',
                     anchor: '100%',
                     id:'inicio',
                     name:'inicio',
                     fieldLabel: 'Fecha de Inicio'

                 }, {
                     xtype: 'datefield',
                     anchor: '100%',
                     id:'fin',
                     name:'fin',
                     fieldLabel: 'Fecha de Fin'

                 },{
                     xtype: 'htmleditor',
                     enableColors: false,
                     id:'descrip',name:'descrip',
                     enableAlignments: false
                 }]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar el Evento',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 380,
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
Cursos.prototype.activar=function(){
    this.__data_store_activar = App.BuildJsonStore('Cursos.Cursos.CargarDatoscursos',{
            fields: [
                {name: 'id'},
                {name: 'nombre'},
                {name: 'inicio',type:'date',dateFormat: 'Y-m-d'},
                {name: 'fin',type:'date',dateFormat: 'Y-m-d'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
    this._btn_active = Ext.create('Ext.Button', {
        text: 'Activar',
        id: '_btn_active_Cursos_btn_id',
        tooltip : 'Todos los Eventos inactivos',
        iconCls: 'modify',
        disabled: true,
        cls:'btn',
        handler: function(){
            var _selectionModel = Ext.getCmp('Cursos_ediat_grid_id').getSelectionModel();
            var _selected_rcd = _selectionModel.getLastSelected();
            var id = _selected_rcd.data.id;
            var inicio = _selected_rcd.data.inicio;
            var fin = _selected_rcd.data.fin;
            var cursos = App.PerformSyncServerRequest('Cursos.Cursos.activar',{id:id,inicio:inicio,fin:fin});
            if(cursos){
               Ext.getCmp('Cursos_ediat_grid_id').store.load();
               Ext.getCmp('Cursos_grid_id').store.load();
            }
        }
    });
    var _grid_activar = new Ext.grid.Panel({
            id: 'Cursos_ediat_grid_id',
            name: 'Cursos_ediat_grid_id',
            height: '100%',
            width: '100%',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            region: 'center',
            store: this.__data_store_activar,
            columns: [{
                header: 'Nombre',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 2
            },{
                header: 'Fecha de inicio',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'inicio',
                flex: 1,
                editor: {
                    xtype: 'datefield',
                    anchor: '100%',
                    minValue: new Date()
                },
                renderer: function (value) {
                    return value ? Ext.Date.dateFormat(value, 'd-m-Y') : '';
                }
            },{
                header: 'Fecha de fin',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fin',
                flex: 1,
                editor: {
                    xtype: 'datefield',
                    anchor: '100%'
                },
                renderer: function (value) {
                    return value ? Ext.Date.dateFormat(value, 'd-m-Y') : '';
                }
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: [this._btn_active],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_activar,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this._btn_active.disabled()
                        }
                        else
                        {
                            this._btn_active.enable()
                        }

                    },
                    scope: this
                }
            }
        });
    var _panel_activar = new Ext.Panel({
            border: true,
            frame: true,
            layout: 'border',
            height: '100%',
            width: '100%',
            items: [_grid_activar],
            listeners: {
                afterrender: function() {
                    this.__data_store_activar.load({
                        params:{
                            start:0,
                            limit:25
                        }
                    });
                },
                scope : this
            }
        });
    var _gst_win_activar = new Ext.Window({
            title:'Eventos Inactivos',
            id: '_gst_Udt_win_id',
            name: '_gst_Udt_win_id',
            height: 300,
            width: 600,
            plain: true,
            layout: 'fit',
            modal: true,
            tools:[
            {
                type:'help',
                tooltip: '¿Necesita Ayuda?',
                handler: function(event, toolEl, panel){
                    Ext.create('Ext.window.Window', {
                        title: '¿Necesita Ayuda?',
                        height:'20%',iconCls:'help',
                        width:'50%',
                        autoScroll:true,
                        layout: 'anchor',modal:true,
                        html:
                            '<ul class="nav nav-list">' +
                                '<li>El apartado <span class="label label-info">" Cursos Inactivos"</span>' +
                                ' le permite reactivar un curso que este inactivo actualmente. </li>' +
                                '<span class="label label-warning">Nota:</span><br>' +
                                'Antes de activar nuevamente el curso debe saber la fecha de inicio y la final de la nueva edicion.' +
                                '</li>' +
                                '</ul>'

                    }).show();
                }
            }],
            resizable: false,
            items: [_panel_activar]

        });
    _gst_win_activar.show();
}
Cursos.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var   _result = App.PerformSyncServerRequest('Cursos.Cursos.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Informaci&oacute;n', 'Eventos adicionado satisfactoriamente');
        }
    }
}
Cursos.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Cursos.Cursos.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Informaci&oacute;n', 'Eventos modificado satisfactoriamente');
        }
    }
 }
Cursos.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Cursos_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Cursos.Cursos.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Informaci&oacute;n', 'Evento eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿ Est&aacute; seguro que desea eliminar este Eventos ?');

}
