function Trabajador_proyectoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Trabajador_proyecto_btn_id',
            tooltip : 'Adiciona un nuevo Proyecto del Trabajador',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddTrabajador_proyecto, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Trabajador_proyecto_btn_id',
            tooltip : 'Elimina el Proyecto del Trabajador seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Trabajador_proyecto_btn_id',
            tooltip : 'Modifica el Proyecto del Trabajador seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdTrabajador_proyecto, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Trabajador_proyecto_tbar_id');
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
            id:'searchField',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Trabajador_proyecto_grid_id').store);
                    Ext.getCmp('Trabajador_proyecto_grid_id').store.clearFilter();
                    Ext.getCmp('Trabajador_proyecto_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());
                    Ext.getCmp('Trabajador_proyecto_grid_id').store.filter("proyecto", Ext.getCmp('searchField1').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField1',
            id:'searchField1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Proyecto...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Trabajador_proyecto_grid_id').store);
                    Ext.getCmp('Trabajador_proyecto_grid_id').store.clearFilter();
                    Ext.getCmp('Trabajador_proyecto_grid_id').store.filter("proyecto", Ext.getCmp('searchField1').getValue());
                    Ext.getCmp('Trabajador_proyecto_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());
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
App.RegisterFunction('Trabajador_proyectoGestionar', new Trabajador_proyectoGestionar());
this.panel=null;
this.panelupd=null;
this._store_combo_upd=null;
Trabajador_proyecto.prototype.winaddTrabajador_proyecto = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this._store_combo= App.BuildJsonStore('Trabajador_proyecto.Trabajador_proyecto.CargarAnnos',
            {
                fields: [
                    {name: 'nombre_completo'},
                    {name: 'trabajadorid'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_contrato= App.BuildJsonStore('Trabajador_proyecto.Trabajador_proyecto.Cargarcontratos',
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
        this._store_combo_preparacion= App.BuildJsonStore('Trabajador_proyecto.Trabajador_proyecto.Cargarniveles',
            {
                fields: [
                    //{name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });

       this.paneladdTrabajador_proyecto = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {
                anchor: '100%',labelWidth: 150
            },
           items: [ {
                   xtype:'combobox',
                   name:'combo_contrato_value_id',
                   id:'combo_contrato_value_id',
                   fieldLabel: 'Proyecto',
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
               },
               {
                   xtype: 'datefield',
                   fieldLabel: 'Fecha de Inicio',
                   name: 'fecha',
                   id:'fecha',
                   allowBlank: false,
                   editable:false,
                   maxValue: new Date()
               },
               {
                   xtype:'combobox',
                   name:'combo_value_id',
                   id:'combo_value_id',
                   fieldLabel: 'Persona en Plantilla',
                   store: this._store_combo,
                   displayField:'nombre_completo',
                   valueField: 'trabajadorid',
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

        var _gst_winaddTrabajador_proyecto = new Ext.Window(
            {
                title:'Adicionar un Proyecto del Trabajador.',
                id: '_gst_AddTrabajador_proyecto_win_id',
                name: '_gst_AddTrabajador_proyecto_win_id',
                height: 210,
                width: 460,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.paneladdTrabajador_proyecto],
                buttons: [{
                    text: 'Aceptar',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',
                    handler: function(){
                        _gst_winaddTrabajador_proyecto.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                       // Ext.getCmp('nombre_id').focus(true, true);
//                        console.log("entro");
                        this._store_combo.load();
                        this._store_combo_contrato.load();
                        this._store_combo_preparacion.load();

                    }, scope: this
                }
            });

        _gst_winaddTrabajador_proyecto.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Trabajador_proyecto.prototype.winupdTrabajador_proyecto = function(_paccion){
    var _selectionModel = Ext.getCmp('Trabajador_proyecto_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    //_value_nom_oll=_selected_rcd.data.valor;
    //id_tpo=_selected_rcd.data.id;
    var _value_nom = null;
    if(_paccion == 'upd')
    {
        this._store_combo= App.BuildJsonStore('Trabajador_proyecto.Trabajador_proyecto.CargarAnnos',
            {
                fields: [
                    {name: 'nombre_completo'},
                    {name: 'trabajadorid'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_contrato= App.BuildJsonStore('Trabajador_proyecto.Trabajador_proyecto.Cargarcontratos',
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
            defaults: {anchor: '100%', labelWidth: 150},
            items: [ {
                xtype:'combobox',
                name:'combo_contrato_value',
                id:'combo_contrato_value_id',
                fieldLabel: 'Proyecto',
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
            },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Fecha de Inicio',
                    name: 'fecha',
                    id:'fecha',
                    allowBlank: false,
                    editable:false,
                    maxValue: new Date()
                },
                {
                    xtype:'combobox',
                    name:'combo_value_id',
                    id:'combo_value_id',
                    fieldLabel: 'Persona en Plantilla',
                    store: this._store_combo,
                    displayField:'nombre_completo',
                    valueField: 'trabajadorid',
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
                   name: 'old_name',
                   id: 'old_name',
                   value :_selected_rcd.data.id}

            ]
        });

        var _gst_winaddTrabajador_proyecto = new Ext.Window(
            {
                title:'Modificar un Proyecto del Trabajador.',
                id: '_gst_updTrabajador_proyecto_win_id',
                name: '_gst_updTrabajador_proyecto_win_id',
                height: 210,
                width: 460,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panelupd],
                buttons: [{
                    text: 'Aceptar',
                    handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                    scope: this
                }, {
                    text: 'Cancelar',
                    handler: function(){
                        _gst_winaddTrabajador_proyecto.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        // Ext.getCmp('nombre_id').focus(true, true);
                        console.log("entro");
                        this._store_combo.load();
                        this._store_combo_contrato.load();
                        this._store_combo_preparacion.load();

                    }, scope: this
                }
            });

        _gst_winaddTrabajador_proyecto.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}

Trabajador_proyecto.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var  _result = App.PerformSyncServerRequest('Trabajador_proyecto.Trabajador_proyecto.Add',this.paneladdTrabajador_proyecto.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            //Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Proyecto del Trabajador adicionado satisfactoriamente');
        }
    }
}
Trabajador_proyecto.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Trabajador_proyecto.Trabajador_proyecto.Modif',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_updTrabajador_proyecto_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Proyecto del Trabajador modificado satisfactoriamente');
        }
    }
 }
Trabajador_proyecto.prototype.deltectnc=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Trabajador_proyecto_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;

        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

        _result = App.PerformSyncServerRequest('Trabajador_proyecto.Trabajador_proyecto.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Proyecto del Trabajador eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Proyecto del Trabajador?');

}
