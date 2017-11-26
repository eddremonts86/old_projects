function Cargo_X_UnidadGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Cargo_X_Unidad_btn_id',
            tooltip : 'Adiciona un nuevo Puesto por Área ',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Cargo_X_Unidad_btn_id',
            tooltip : 'Elimina el Puesto por Área seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Cargo_X_Unidad_btn_id',
            tooltip : 'Modifica el Puesto por Área seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        this._store_combo= Ext.create('Ext.data.Store',{
            fields: [{name: 'id'},{name: 'nombre'}],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            autoLoad: false
        });
        this.__data_store=Ext.create('Ext.data.Store',{
            fields: [{name: 'id'},{name: 'nombre'}],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            autoLoad: false
        });
        var tbar = Ext.getCmp('Puestos_trabajo_por_area_tbar_id');
        tbar.add('->');
        tbar.add({
            xtype: 'checkbox',
            id: 'select_unidad',
            name: 'select_unidad',
            hideEmptyLabel: false,
            layout: 'anchor',
            anchor: '100%',
           // boxLabel: 'Empresa',
            labelWidth:55,
            checked   : true,
            listeners: {
                change:function(This, newValue){
                    if (newValue==false){
                        var result = App.PerformSyncServerRequest('Cargo_X_Unidad.Cargo_X_Unidad.CargarDatos',{start:0,limit:25});
                        this._store_combo.loadData(result.rows);
                        Ext.getCmp('combo_value_id').enable();
                    }
                    else{
                        Ext.getCmp('CardoxUnidad_grid_id').store.clearData( Ext.getCmp('CardoxUnidad_grid_id').store);
                        Ext.getCmp('CardoxUnidad_grid_id').store.load();
                        Ext.getCmp('combo_value_id').reset();
                        Ext.getCmp('combo_area_id').reset();
                        Ext.getCmp('combo_value_id').disable();
                        Ext.getCmp('combo_area_id').disable();
                    }

                },scope:this
            }
        });
        tbar.add(' ');
        tbar.add({
            xtype: 'combobox',
            name: 'combo_value_id',
            id: 'combo_value_id',
            store: this._store_combo,
            displayField: 'nombre',
            valueField: 'id',
            typeAhead: true,
            queryMode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            emptyText: 'Seleccionar por Agencia',
            selectOnFocus: true,
            editable: false,
            disabled:true,
            listeners: {
                change:function(){
                    var combo_value_id = Ext.getCmp('combo_value_id').getValue() ;
                    Ext.getCmp('CardoxUnidad_grid_id').store.clearData( Ext.getCmp('CardoxUnidad_grid_id').store);
                    var value = Ext.getCmp('combo_value_id').getValue() ;
                    var result = App.PerformSyncServerRequest('Cargo_X_Unidad.Cargo_X_Unidad.CargarAreas',{value:value});
                    this.__data_store.loadData(result.rows);
                    var resultUnidad = App.PerformSyncServerRequest('Cargo_X_Unidad.Cargo_X_Unidad.Tomar_datos',{combo_value_id:combo_value_id, start:0,limit:25});
                    Ext.getCmp('CardoxUnidad_grid_id').store.loadData(resultUnidad.rows);
                    Ext.getCmp('combo_area_id').enable();

                 },scope:this
            }
        });
        tbar.add(' ');
        tbar.add({
            xtype: 'combobox',
            name: 'combo_area_id',
            id: 'combo_area_id',
            store: this.__data_store,
            displayField: 'nombre',
            valueField: 'id',
            typeAhead: true,
            queryMode: 'local',
            forceSelection: true,
            triggerAction: 'all',
            emptyText: 'Seleccionar por Área',
            selectOnFocus: true,
            editable: false,
            disabled: true,
            listeners: {
                change:function(){
                    Ext.getCmp('CardoxUnidad_grid_id').store.clearData( Ext.getCmp('CardoxUnidad_grid_id').store);
                    var combo_value_id = Ext.getCmp('combo_value_id').getValue() ;
                    var combo_area_id = Ext.getCmp('combo_area_id').getValue() ;
                    var resultUnidadF = App.PerformSyncServerRequest('Cargo_X_Unidad.Cargo_X_Unidad.Tomar_datos',{combo_value_id:combo_value_id,combo_area_id:combo_area_id, start:0,limit:25});
                   Ext.getCmp('CardoxUnidad_grid_id').store.loadData(resultUnidadF.rows);

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
App.RegisterFunction('Cargo_X_UnidadGestionar', new Cargo_X_UnidadGestionar());
this.panel=null;
this.panelupd=null;
Cargo_X_Unidad.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
       this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [{
                fieldLabel: 'Nombre',
                name: 'nombre_id',
                id:'nombre_id',
                allowBlank: false,
                maxLength: 255,
                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
            }]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Puesto por Área',
                id: '_gst_Add_win_id',
                height: 120,
                width: 450,
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
Cargo_X_Unidad.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selected_rcd = Ext.getCmp('Cargo_X_Unidad_grid_id').getSelectionModel().getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    id_tpo=_selected_rcd.data.id;
    if(_paccion == 'upd')
     {

         this.panelupd = Ext.create('Ext.form.Panel', {
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             defaults: {
                 anchor: '100%'
             },
             defaultType: 'textfield',
             items: [{
                 fieldLabel: 'Nombre',
                 name: 'nombre',
                 id:'nombre_Udt_id',
                 allowBlank: false,
                 value:_value_nom_oll,
                 maxLength: 255,
                 maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
             },
                 {
                     fieldLabel: 'id',
                     name: 'id_Udt_id',
                     id:'id_Udt_id',
                     allowBlank: false,
                     value:id_tpo,
                     hidden:true,
                     maxLength: 255,
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                 }]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar el Puesto por Área',
                 id: '_gst_Udt_win_id',
                 height: 120,
                 width: 450,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panelupd],
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
                         Ext.getCmp('nombre_Udt_id').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Cargo_X_Unidad.prototype.Add = function(_paccion){
    _result = App.PerformSyncServerRequest('Cargo_X_Unidad.Cargo_X_Unidad.Add',this.panel.getForm().getValues());
    this.__data_store.load({params:{start:0,limit:25}});
}
Cargo_X_Unidad.prototype.Modid = function(_paccion){
    _result = App.PerformSyncServerRequest('Cargo_X_Unidad.Cargo_X_Unidad.Modid',this.panelupd.getForm().getValues());
    this.__data_store.load({params:{start:0,limit:25}});
 }
Cargo_X_Unidad.prototype.deltect=function(_paccion){
    var _selected_rcd = Ext.getCmp('Cargo_X_Unidad_grid_id').getSelectionModel().getLastSelected();
    var id = _selected_rcd.data.id;
    _result = App.PerformSyncServerRequest('Cargo_X_Unidad.Cargo_X_Unidad.Eliminar', {id: id});
    this.__data_store.load({params:{start:0,limit:25}});
}
