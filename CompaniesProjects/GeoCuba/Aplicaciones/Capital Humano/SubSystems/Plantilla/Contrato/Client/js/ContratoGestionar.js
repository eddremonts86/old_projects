function ContratoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Contrato_btn_id',
            tooltip : 'Adiciona un nuevo Contrato',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Contrato_btn_id',
            tooltip : 'Elimina el Contrato seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Contrato_btn_id',
            tooltip : 'Modifica el Contrato seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        this._btn_Historial = Ext.create('Ext.Button', {
            text: 'Historial',
            id: 'mod_Contrato_historial_btn_id',
            tooltip : 'Modifica el Contrato seleccionado',
            iconCls: 'modify',
            handler: Ext.Function.bind(this.Owner.OnShowWindow1, this.Owner, ['his'])
        });
        var tbar = Ext.getCmp('Contrato_tbar_id');
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
            name: 'searchField_cargo',
            id:'searchField_cargo',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Contrato_grid_id').store);
                    Ext.getCmp('Contrato_grid_id').store.clearFilter();
                    Ext.getCmp('Contrato_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_cargo').getValue());
                    Ext.getCmp('Contrato_grid_id').store.filter("tipo_contrato", Ext.getCmp('searchField_cargo1').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_cargo1',
            id:'searchField_cargo1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Tipo de contrato...',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('Contrato_grid_id').store);
                    Ext.getCmp('Contrato_grid_id').store.clearFilter();
                    Ext.getCmp('Contrato_grid_id').store.filter("tipo_contrato", Ext.getCmp('searchField_cargo1').getValue());
                    Ext.getCmp('Contrato_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField_cargo').getValue());
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
App.RegisterFunction('ContratoGestionar', new ContratoGestionar());
this.panel=null;
this.panelupd=null;
Contrato.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
           this.__data_store1 = App.BuildJsonStore('Contrato.Contrato.CargarDatosCombo',
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
    var simpleCombo = Ext.create('Ext.form.field.ComboBox', {
        fieldLabel: 'Tipo de Contrato',
        labelWidth:110,
        name:'datos_UBT_id',
        id:'datos_UBT_id',
        displayField: 'nombre',
        valueField: 'id',
        width: 500,
        store: this.__data_store1,
        editable : false,
        typeAhead: true,
        allowBlank:false,
        emptyText:'Select a state...',
        forceSelection: true,
        selectOnFocus:true

    });
    if(_paccion == 'add')
    {
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
                fieldLabel: 'Nombre',
                labelWidth:110,
                name: 'nombre_id',
                id:'nombre_id',
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            },simpleCombo]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Contrato',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 150,
                width: 470,
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
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Contrato.prototype.OnShowWindow1 = function(_paccion){
    this.__data_store_historial = App.BuildJsonStore('Contrato.Contrato.Historial',
        {
            fields: [
                {name: 'id'},
                {name: 'nombre_completo'},
                {name: 'tipo_contrato'},
                {name: 'fecha_inicio'},
                {name: 'fecha_final'}],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            }, groupField : 'tipo_contrato',
            autoLoad: true
        });
    var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
        groupHeaderTpl: 'Tipo de Contrato: {name} ' + ' ({rows.length})'
    });
    this._grid = new Ext.grid.Panel(
        {
            id: 'historial_Contrato_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            features: [groupingFeature],
            store: this.__data_store_historial,
            columns: [
                {
                    header: 'Trbajador',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'nombre_completo',
                    flex: 5
                },{
                    header: 'Tipo de Contrato',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'tipo_contrato',
                    flex: 5
                },{
                    header: 'Fecha inicio',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'fecha_inicio',
                    flex: 5
                },{
                    header: 'Fecha Final',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'fecha_final',
                    flex: 5,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        if(value=="0001-01-01 00:00:00"){
                            var fin="";
                            return  fin;
                        }else{
                            return value;
                        }

                    }
                }],
            viewConfig: {
                forceFit: true
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }

        });
    var _gst_win = new Ext.Window(
            {
                title:'Historial de Contratos',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 450,
                width: 670,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this._grid]
            });
        _gst_win.show();

}
Contrato.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _tpo=null;
    var _selectionModel = Ext.getCmp('Contrato_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre_completo;
    var id =_selected_rcd.data.id;
    var fecha =_selected_rcd.data.fecha_inicio;
    this.__data_storepd = App.BuildJsonStore('Contrato.Contrato.CargarDatosCombo',
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

    if(_paccion == 'upd')
     {

         this.panelupd = Ext.create('Ext.form.Panel', {
             id: 'panelupd',
             name: 'panelupd',
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             defaults: {anchor: '100%',labelWidth:150},
             defaultType: 'textfield',
             items: [{
                 fieldLabel: 'Nombre',
                 name: 'nombre_Udt_id',
                 id:'nombre_Udt_id',
                 allowBlank: false,
                 value:_value_nom_oll,
                 maxLength: 255,
                 disabled:true,
                 maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
             },
                    {
                 xtype:'combobox',
                 name:'datos_upd_id',
                 id:'datos_upd_id',
                 fieldLabel: 'Tipo de contrato',
                 store: this.__data_storepd,
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
                     fieldLabel: 'id',
                     name: 'old_name',
                     id:'old_name',
                     allowBlank: false,
                     value:id,
                     hidden:true,
                     maxLength: 255,
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                 },
                 {
                     xtype: 'datefield',
                     fieldLabel: 'Fecha de inicio',
                     name: 'fecha_inicio',
                     id: 'fecha_inicio',
                     allowBlank: false,
                     editable: false,
                     value:fecha
                 },
                 {
                     xtype: 'datefield',
                     fieldLabel: 'Fecha de Fin',
                     name: 'fecha_fin',
                     id: 'fecha_fin',
                     allowBlank: true,
                     editable: false

                 }]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar el Contrato',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 300,
                 width: 470,
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
                         this.__data_storepd.load();

                         App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

                         Ext.getCmp('nombre_Udt_id').focus(true, true);
                        // Ext.getCmp('datos_upd_id').select(_selected_rcd.data.tipo);

                         App.HideMsgBox();

                     }, scope: this
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Contrato.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var   _result = App.PerformSyncServerRequest('Contrato.Contrato.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Contrato adicionado satisfactoriamente');
        }
    }
}
Contrato.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Contrato.Contrato.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Contrato modificado satisfactoriamente');
        }
    }
 }
Contrato.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Contrato_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Contrato.Contrato.Desactivar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Contrato eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Contrato?');

}