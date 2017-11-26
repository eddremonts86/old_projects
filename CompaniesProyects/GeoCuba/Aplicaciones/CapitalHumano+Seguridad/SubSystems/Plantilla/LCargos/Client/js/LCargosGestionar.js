function LCargosGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_LCargos_btn_id',
            tooltip : 'Adiciona un nuevo Tipo de Cargo',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_LCargos_btn_id',
            tooltip : 'Elimina el Tipo de Cargo seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_LCargos_btn_id',
            tooltip : 'Modifica el Tipo de Cargo seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('LCargos_tbar_id');
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
App.RegisterFunction('LCargosGestionar', new LCargosGestionar());
LCargos.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {   var unidad=null;
        var AreaCombo= null;        
        this.__data_store_unidad = App.BuildJsonStore('LCargos.LCargos.CargarDatosUnidad',
            {
            fields: [
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre'}
            ],
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        this.__data_store_Reso = App.BuildJsonStore('LCargos.LCargos.CargarDatosResolucion',
            {
            fields: [
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre'}
            ],
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        this.__data_store_Area = App.BuildJsonStore('LCargos.LCargos.CargarDatosArea',
            {
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name:'agenciaid'},
                    {type: 'string',name: 'nombre'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });            
        this.__data_store_datos = App.BuildJsonStore('LCargos.LCargos.CargarDatosA',
            {
            fields: [
                {name: 'id'},
                {name: 'nombre'},
                {name: 'resolucion'},
                {name: 'area'},
                {name: 'AreaId'},
                {name: 'resId'},
				{name: 'plazas'},
                {name: 'existencia'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        unidad = Ext.create('Ext.form.field.ComboBox', {
            name:'unidades ',
            id:'unidades ',
            displayField: 'nombre',
            valueField: 'id',
            width: 241,
            store: this.__data_store_unidad,
            emptyText:'Agencia...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false,
            listeners: {
                change:function(){
                    var value = unidad.getValue();
                    if(value == null){}
                    else{
                        /*var result = App.PerformSyncServerRequest('LCargos.LCargos.CargarAreas',{value:value});
                        AreaCombo.clearValue();
                        AreaCombo.store.loadData(result.rows);*/
                        AreaCombo.enable();
                        AreaCombo.store.clearFilter();
                        AreaCombo.store.filter('agenciaid',value);
                    }
                },scope:this
              }
            });
        AreaCombo = Ext.create('Ext.form.field.ComboBox', {
            name:'Area',
            id:'Area',
            displayField: 'nombre',
            valueField: 'id',
            width: 241,
            store: this.__data_store_Area,
            emptyText:'Áreas...',
            selectOnFocus:true,
            editable:false,
            disabled:true,
            allowBlank: false,
            listeners: {
                change:function(){
                    var value = AreaCombo.getRawValue() ;
                    var valueId = AreaCombo.getValue() ;
                    for (var i = 0; i < this.__data_store_datos.getCount(); i++)
                    {
                        this.__data_store_datos.getAt(i).data.area = value;
                        this.__data_store_datos.getAt(i).data.AreaId = valueId;
                    }
                    this._grid.getView().refresh();
                },scope:this
            }

        });
        var ResoCombo = Ext.create('Ext.form.field.ComboBox', {
            name:'Resolución',
            id:'Resolucion',
            displayField: 'nombre',
            valueField: 'id',
            width: 241,
            store: this.__data_store_Reso,
            emptyText:'Resoluciones...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false,
            listeners: {
                change:function(){
                    var value = ResoCombo.getRawValue() ;
                    var valueresId = ResoCombo.getValue() ;
                    for (var i = 0; i < this.__data_store_datos.getCount(); i++)
                    {
                        this.__data_store_datos.getAt(i).data.resolucion = value;
                        this.__data_store_datos.getAt(i).data.resId = valueresId;
                    }
                    this._grid.getView().refresh();
                },scope:this
                }
            });       
        var select=Ext.create('Ext.selection.CheckboxModel', {});
        this._grid = new Ext.grid.Panel({
                id: 'LCargos_grid_id_crear',
                region: 'center',
                autoScroll:true,
                frame: true,
                store: this.__data_store_datos,
                selModel:select ,
                plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                columns: [
                    {
                        header: 'Nombre',
                        menuDisabled: true,
                        sortable : false,
                        dataIndex: 'nombre',
                        flex: 5,
                        editor: {allowBlank: false}
                    },
                    {
                        header: 'AreaId',
                        menuDisabled: true,
                        sortable : false,
                        dataIndex: 'AreaId',
                        hidden:true,
                        flex: 5,
                        editor: {allowBlank: false}
                    },
                    {
                        header: 'resId',
                        menuDisabled: true,
                        sortable : false,
                        dataIndex: 'resId',
                        hidden:true,
                        flex: 5,
                        editor: {allowBlank: false}
                    },
                    {
                    header: 'Área',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'area',
                    flex: 5,
                    editor: {allowBlank: false}
                },
                    {
                    header: 'Resolución',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'resolucion',
                    flex: 5,
                    editor: {allowBlank: false}
                },
                    {
                        header: 'Plazas',
                        menuDisabled: true,
                        sortable : false,
                        dataIndex: 'plazas',
                        flex: 5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0,
                            maxValue: 1000
                        },
                        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            if(value==0 || value==null || value==''){
                                record.data.plazas = 0;
                                return 0;
                            }
                            return  value;
                        }
                    },
                    {
                        header: 'Existencia',
                        menuDisabled: true,
                        sortable : false,
                        dataIndex: 'existencia',
                        flex: 5,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0,
                            maxValue: 1000
                        },
                        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            if(record.data.plazas<value){
                                record.data.existencia = record.data.plazas;
                                return record.data.plazas;
                            }                            
                            return  value;
                        }
                    }

                ],
                viewConfig: {forceFit: true},
            bbar:[
                {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_datos,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
                }]
            });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            layout: 'fit',
            id:'panel',
            autoScroll:true,
            name:'panel',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            tbar:[unidad,AreaCombo,ResoCombo],
            items: [this._grid]
        });
        var _gst_win = new Ext.Window({
                title:'Adicionar un Tipo de Cargo',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height:'75%',
                width: '50%',
                plain: true,
                layout: 'fit',
                modal: true,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',
                    id:'Axcept',
                    cls:'btn btn-primary',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_win.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) { unidad.focus(true, true);}
                }
            });
        _gst_win.show();
    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
LCargos.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('LCargos_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var cant_plasas=_selected_rcd.data.cant_plasas;
    var existencia=_selected_rcd.data.existencia;
    var cargo=_selected_rcd.data.cargo;
    var resolucion=_selected_rcd.data.resolucion;
    var area=_selected_rcd.data.area;
    id_tpo=_selected_rcd.data.id;
    if(_paccion == 'upd')
     {

         this.__data_store_Area = App.BuildJsonStore('LCargos.LCargos.CargarDatosArea',{
             fields: [
                 {type: 'string',name: 'id'},
                 {type: 'string',name: 'nombre'}
             ],
             proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
             },
             autoLoad: false
         });
         var AreaCombo = Ext.create('Ext.form.field.ComboBox', {
             fieldLabel: 'Área',
             name:'Area',
             id:'Area',
             displayField: 'nombre',
             valueField: 'id',
             width: 500,
           //  value:area,
             store: this.__data_store_Area,
             emptyText:'Select a state...',
             selectOnFocus:true,
             editable:false,
             allowBlank: false

         });

         this.__data_store_Cargo = App.BuildJsonStore('LCargos.LCargos.CargarDatosCargo',{
             fields: [
                 {type: 'string',name: 'id'},
                 {type: 'string',name: 'nombre'}
             ],
             proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
             },
             autoLoad: false
         });
         var CargoCombo = Ext.create('Ext.form.field.ComboBox', {
             fieldLabel: 'Cargo',
             name:'Cargo',
             id:'Cargo',
             displayField: 'nombre',
             valueField: 'id',
             width: 500,
             store: this.__data_store_Cargo,
             emptyText:'Select a state...',
             selectOnFocus:true,
             editable:false,
             allowBlank: false

         });

         this.__data_store_Reso = App.BuildJsonStore('LCargos.LCargos.CargarDatosResolucion',{
             fields: [
                 {type: 'string',name: 'id'},
                 {type: 'string',name: 'nombre'}
             ],
             proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
             },
             autoLoad: false
         });
         var ResoCombo = Ext.create('Ext.form.field.ComboBox', {
             fieldLabel: 'Resolución',
             name:'Resolución',
             id:'Resolución',
             displayField: 'nombre',
             valueField: 'id',
             width: 500,
            // value:resolucion,
             store: this.__data_store_Reso,
             emptyText:'Select a state...',
             selectOnFocus:true,
             editable:false,
             allowBlank: false

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
                 fieldLabel: 'Plazas',
                 name: 'plazas',
                 id:'plazas',
                 allowBlank: false,
                 value:cant_plasas,
                 maxLength: 255,
                 maskRe: /[0123456789]/
             },{
                 fieldLabel: 'Exitencia',
                 name: 'exit',
                 id:'exit',
                 allowBlank: false,
                 value:existencia,
                 maxLength: 255,
                 maskRe: /[0123456789]/
             },AreaCombo,CargoCombo,ResoCombo,
                 {
                     fieldLabel: 'id',
                     name: 'id',
                     id:'id',
                     allowBlank: false,
                     value:id_tpo,
                     hidden:true,
                     maxLength: 255
                     //, maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                 }]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar el Tipo de Cargo',
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
                         Ext.getCmp('plazas').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
LCargos.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        var _me = this,
        _array = new Array(),
        _selection = this._grid.getSelectionModel().getSelection();
		
      if (_selection.length === 0)
    {App.InfoMessage('Informacion','¡Debe seleccionar algún Cargo!')}
    else
    {
        for (var i = 0; i < _selection.length; i++)
        {
            _array.push(_selection[i].getData());
        }
        // console.log(_array);
        var fnCallBack = function() {
            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
            var _result = App.PerformSyncServerRequest('LCargos.LCargos.Add', {data: Ext.encode(_array)});
            App.HideMsgBox();

            if(_result)
            {
                Ext.getCmp('panel').getForm().reset();
                Ext.getCmp('LCargos_grid_id').store.load();
                App.InfoMessage('Información', 'Tipo de Cargo adicionado satisfactoriamente');
            }
        }
        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
    }
    }
}
LCargos.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('LCargos.LCargos.Modid',this.panelupd.getForm().getValues());
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            Ext.getCmp('LCargos_grid_id').store.load();
            App.InfoMessage('Información', 'Tipo de Cargo modificado satisfactoriamente');
        }
    }
 }
LCargos.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('LCargos_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('LCargos.LCargos.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('LCargos_grid_id').store.load();
            App.InfoMessage('Información', 'Tipo de Cargo eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Tipo de Cargo?');

}