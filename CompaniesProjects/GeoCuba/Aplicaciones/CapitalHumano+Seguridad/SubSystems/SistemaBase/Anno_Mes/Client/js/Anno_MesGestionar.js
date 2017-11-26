function Anno_MesGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Anno_Mes_btn_id',
            tooltip : 'Adiciona un nuevo Año_Mes',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddAnno_Mes, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Anno_Mes_btn_id',
            tooltip : 'Elimina el Año_Mes seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Anno_Mes_btn_id',
            tooltip : 'Modifica el Año_Mes seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdAnno_Mes, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Anno_Mes_tbar_id');
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
App.RegisterFunction('Anno_MesGestionar', new Anno_MesGestionar());
this.panel=null;
this.panelupd=null;
//this._store_combo_anno_upd=null;
Anno_Mes.prototype.winaddAnno_Mes = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo_anno= App.BuildJsonStore('Anno_Mes.Anno_Mes.CargarAnnos',
            {
                fields: [
                    {name: 'valor'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
//        if(this._store_combo_anno.count()==0)
//        {
//            Ext.Msg.alert('Alert', 'No hay años adicionados.');
//        }
        this._store_combo_mes= App.BuildJsonStore('Anno_Mes.Anno_Mes.CargarMes',
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
            defaults: {
                anchor: '100%'
            },
           //defaultType: 'textfield',
           //columnWidth:2,
           items: [
               {

               items:[
                   {

                   xtype:'combobox',
                   name:'combo_value_id_anno',
                   id:'combo_value_id_anno',
                  fieldLabel: 'Año',
                   labelWidth: 50,
                   width: 500,
                   store: this._store_combo_anno,
                   //height: 5,
                   displayField:'valor',
                   valueField: 'id',
                   typeAhead: true,
                   queryMode: 'local',
                   forceSelection: true,
                   triggerAction: 'all',
                   emptyText:'Select a state...',
                   selectOnFocus:true,
                   editable:false,
                   allowBlank: false
                   //flex: 1,
                   //margins: '0 0 0 5'
               },
                   {
//                   xtype:'button',
//                   text: 'Adicionar años',
//                   //margins: '0 0 0 5'//,
//                   handler: Ext.Function.bind(this.FormAddannos, this)//,
//                   //scope: this
                   }
               ]
           },
               { items:[{
        xtype:'combobox',
        name:'combo_value_id_mes',
        id:'combo_value_id_mes',
        fieldLabel: 'Mes',
        labelWidth: 50,
        width: 500,
        store: this._store_combo_mes,
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
//        xtype:'button',
//        text: 'Adicionar mes',
//        //margins: '0 0 0 5'//,
//        handler: Ext.Function.bind(this.FormAddmes, this)//,
//        //scope: this
    }]}
           ]
        });

        var _gst_winam = new Ext.Window(
            {
                title:'Adicionar un Año_Mes',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 150,
                width: 300,
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
                        _gst_winam.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        //Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo_anno.load();
                        this._store_combo_mes.load();
                    }, scope: this
                }
            });

        _gst_winam.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Anno_Mes.prototype.FormAddannos = function(){
    {
        this.paneladdnos = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'paneladdnos',
            name:'paneladdnos',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'numberfield',
            items:{

                name: 'nombre_id',
                id: 'nombre_id',
                height: 100,
                width: 50,
                minValue:2010,
                editable:false,
                value: Ext.Date.format(new Date(),'Y')
            }
        });

        var _gst_win = new Ext.Window(
            {
                title:'Modificar el Año_Mes',
                id: '_gst_Addannos_win_id',
                name: '_gst_Addannos_win_id',
                height: 150,
                width: 300,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.paneladdnos],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Addannos, this/*, [_paccion]*/),
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

}

Anno_Mes.prototype.FormAddmes = function(){
    {

        this.paneladdmes = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'paneladdmes',
            name:'paneladdmes',
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
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            },{
                xtype:'textfield',
                fieldLabel: 'Numero',
                name: 'numero_id',
                id:'numero_id',
                allowBlank: false,
                maxLength: 255
                //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            },
                {
                    xtype:'combobox',
                    name:'combo_value_id_anno',
                    id:'combo_value_id_anno',
                    fieldLabel: 'Añohh',
                    labelWidth: 50,
                    width: 500,
                    store: this._store_combo_anno,
                    displayField:'valor',
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

        var _gst_win_addannomes = new Ext.Window(
            {
                title:'Adicionar un Año_Mes',
                id: '_gst_Addmes_win_id',
                name: '_gst_Addmes_win_id',
                height: 150,
                width: 300,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.paneladdmes],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Addmes, this/*, [_paccion]*/),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_win_addannomes.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo_anno.load();
                    }, scope: this
                }
            });

        _gst_win_addannomes.show();
    }

}


Anno_Mes.prototype.winupdAnno_Mes = function(_paccion){
    var _value_nom = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Anno_Mes_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    //_value_nom_oll=_selected_rcd.data.valor;
    //id_tpo=_selected_rcd.data.id;
    if(_paccion == 'upd')
    {
        this._store_combo_anno= App.BuildJsonStore('Anno_Mes.Anno_Mes.CargarAnnos',
            {
                fields: [
                    {name: 'valor'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });


        this._store_combo_mes= App.BuildJsonStore('Anno_Mes.Anno_Mes.CargarMes',
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

        this.panel_upd = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel_upd',
            name:'panel_upd',
            defaults: {
                anchor: '100%'
            },
            //defaultType: 'textfield',
            items: [{
                xtype:'combobox',
                name:'combo_value_id_anno_upd',
                id:'combo_value_id_anno_upd',
                fieldLabel: 'Año',
                labelWidth: 50,
                width: 500,
                store: this._store_combo_anno,
                displayField:'valor',
                valueField: 'id',
                typeAhead: true,
                queryMode: 'local',
                forceSelection: true,
                triggerAction: 'all',
                emptyText:'Select a state...',
                selectOnFocus:true,
                editable:false,
                allowBlank: false

            },
                {
                    xtype:'combobox',
                    name:'combo_value_id_mes_upd',
                    id:'combo_value_id_mes_upd',
                    fieldLabel: 'Mes',
                    labelWidth: 50,
                    width: 500,
                    store: this._store_combo_mes,
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

                },
                {
                    xtype : 'hidden',
                    name: 'old_mes',
                    id: 'old_mes',
                    value :_selected_rcd.data.nombre

                },
                {
                    xtype : 'hidden',
                    name: 'old_anno',
                    id: 'old_anno',
                    value :_selected_rcd.data.valor

                }

            ]
        });

        var _gst_winupdannomes = new Ext.Window(
            {
                title:'Modificar el Año_Mes',
                id: '_gst_Ud_win_id',
                name: '_gst_Ud_win_id',
                height: 150,
                width: 300,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel_upd],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winupdannomes.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {

                        this._store_combo_anno.load();
                        this._store_combo_mes.load();

//                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
//
//                        Ext.getCmp('combo_value_id_mes_upd').select(_selected_rcd.data.nombre);
//                        Ext.getCmp('combo_value_id_anno_upd').select(_selected_rcd.data.valor);
//
//                        App.HideMsgBox();

                    }, scope: this
                }
            });

        _gst_winupdannomes.show();

    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Anno_Mes.prototype.Addannos = function(_paccion){

    if (Ext.getCmp('paneladdnos').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Anno_Mes.Anno_Mes.Addannos',this.paneladdnos.getForm().getValues());
        this._store_combo_anno.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('paneladdnos').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this._store_combo_anno.load();
            App.InfoMessage('Información', 'Año_Mes adicionado satisfactoriamente');
        }
    }
}
Anno_Mes.prototype.Addmes = function(_paccion){

    if (Ext.getCmp('paneladdmes').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Anno_Mes.Anno_Mes.Addmes',this.paneladdmes.getForm().getValues());
        this._store_combo_mes.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('paneladdmes').getForm().reset();
            //Ext.getCmp('nombre_id').focus(true, true);
            this._store_combo_mes.load();
            App.InfoMessage('Información', 'Año_Mes adicionado satisfactoriamente');
        }
    }
}
Anno_Mes.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Anno_Mes.Anno_Mes.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            //Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Año_Mes adicionado satisfactoriamente');
        }
    }
}
Anno_Mes.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panel_upd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Anno_Mes.Anno_Mes.Modif',this.panel_upd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Ud_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Año_Mes modificado satisfactoriamente');
        }
    }
 }
Anno_Mes.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Anno_Mes_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Anno_Mes.Anno_Mes.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Año_Mes eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Año_Mes?');

}
