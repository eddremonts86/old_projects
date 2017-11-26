function CentroCostoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this._btn_imp = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_CentroCosto_btn_id',
            tooltip : 'Adiciona un nuevo CentroCosto',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnAdd, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_CentroCosto_btn_id',
            tooltip : 'Elimina el CentroCosto seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnDel, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_CentroCosto_btn_id',
            tooltip : 'Modifica el CentroCosto seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnModif, this.Owner, ['upd'])
        });
        this._btn_imp = Ext.create('Ext.Button', {
            text: 'Imprimir',
            id: 'imp_CentroCosto_btn_id',
            tooltip : 'Imprimir el listado de los centros costos',
            iconCls: 'modify',
            handler: Ext.Function.bind(this.Owner.OnImp, this.Owner, ['imp'])
        });
        var tbar = Ext.getCmp('CentroCosto_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_imp);
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
App.RegisterFunction('CentroCostoGestionar', new CentroCostoGestionar());
this.panel=null;
this.panelupd=null;
CentroCosto.prototype.OnAdd = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
       var areas = App.BuildJsonStore('CentroCosto.CentroCosto.ObtenerAreas',
         {
            fields: [{name: 'id'},{name: 'nombre'},{name: 'agenciaid'}],
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
            autoLoad: true
         });
       var agencias = App.BuildJsonStore('CentroCosto.CentroCosto.ObtenerAgencias',
         {
            fields: [{name: 'id'},{name: 'nombre'}],
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
            autoLoad: true
         });
       var _storeO = App.BuildJsonStore('',
         {
                fields : [{name: 'id'},{name: 'nombre'},{name: 'agenciaid'}],
                proxy: {type: 'ajax',reader: {type: 'json'}},
                autoLoad: false
         });
         var _grid = new Ext.grid.GridPanel(
		{
			id : 'objetos_grid_id',
			height :150,
			width : 270,
			frame: true,
			store : _storeO,
                        selType: 'rowmodel',
                        tbar:[
                                {
					text : 'Eliminar',
					id : 'delete_obj_btn_id',
					iconCls : 'delete',
					disabled : true,
					handler : function(){
                                            var obj = Ext.getCmp('objetos_grid_id').getSelectionModel().getLastSelected().data.nombre;
                                            _storeO.remove(_storeO.findRecord('nombre',obj));
//                                            Ext.getCmp('hidden_estructura').setValue('');
//                                            for(var h = 0; h<_storeO.data.items.length;h++){
//                                                var items = _storeO.data.items[h];
//                                                Ext.getCmp('hidden_estructura').setValue(Ext.getCmp('hidden_estructura').getValue()+','+items.data.id_estructura);
//                                            }
                                            Ext.getCmp('delete_obj_btn_id').disable();
                                        }
				},' ', '-','->'
                        ],
			columns : [
				{header: '&Aacute;rea', dataIndex: 'nombre', flex: 30}
                        ],
			viewConfig: {forceFit: true},
                        listeners:{
                            itemclick:function(){
                                Ext.getCmp('delete_obj_btn_id').enable(true);
                            }
                        }
		});
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
                    fieldLabel: 'Centro Costo',
                    name: 'c_costo',
                    id:'clase',
                    labelWidth:'150px',
                    allowBlank: false,
                    maxLength: 255,
                    maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
                },{
                    xtype:'combobox',
                    fieldLabel: 'Agencias',
                    emptyText:'Agencias',
                    labelWidth:'150px',
                    id:'agencia',
                    name:'agencia',
                    width:400,
                    pageSize: 10,
                    listConfig: {
                        loadingText: 'Cargando...',
                        emptyText: 'No existen datos.'
                    },
                    store:  agencias,
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    listeners:{
                        select:function(This,newValue){
                            areas.clearFilter();
                            areas.filter('agenciaid',Ext.getCmp('agencia').getValue());
                            Ext.getCmp('area').reset();
                        }
                    }
                },{
                    xtype:'combobox',
                    fieldLabel: 'Areas',
                    emptyText:'Areas',
                    labelWidth:'150px',
                    id:'area',
                    name:'area',
                    width:400,
                    pageSize: 10,
                    listConfig: {
                        loadingText: 'Cargando...',
                        emptyText: 'No existen datos.'
                    },
                    store:  areas,
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    listeners:{
                        select:function(This,records){
                            if(_storeO.find('id_estructura',records[0].data.id_estructura)==-1)
                                    _storeO.add(records[0].data);
                            Ext.getCmp('agencia').setValue(records[0].data.agenciaid);
                        }
                    }
                },_grid

            ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un CentroCosto',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 350,
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
                        Ext.getCmp('clase').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
CentroCosto.prototype.OnModif = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('CentroCosto_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var nombre=_selected_rcd.data.c_costo;   
    
    var areas = App.BuildJsonStore('CentroCosto.CentroCosto.ObtenerAreas',
        {
           fields: [{name: 'id'},{name: 'nombre'},{name: 'agenciaid'}],
           proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
           autoLoad: true
        });
    var agencias = App.BuildJsonStore('CentroCosto.CentroCosto.ObtenerAgencias',
        {
           fields: [{name: 'id'},{name: 'nombre'}],
           proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
           autoLoad: true
        });
        var _storeO = App.BuildJsonStore('CentroCosto.CentroCosto.AreasxCentro',
         {
                fields : [{name: 'id'},{name: 'nombre'},{name: 'agenciaid'}],
                proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                autoLoad: false
         });
         _storeO.load({params:{id:_selected_rcd.data.id}});
         var _grid = new Ext.grid.GridPanel(
		{
			id : 'objetos_grid_id',
			height :150,
			width : 270,
			frame: true,
			store : _storeO,
                        selType: 'rowmodel',
                        tbar:[
                                {
					text : 'Eliminar',
					id : 'delete_obj_btn_id',
					iconCls : 'delete',
					disabled : true,
					handler : function(){
                                            var obj = Ext.getCmp('objetos_grid_id').getSelectionModel().getLastSelected().data.nombre;
                                            _storeO.remove(_storeO.findRecord('nombre',obj));
                                            Ext.getCmp('delete_obj_btn_id').disable();
                                        }
				},' ', '-','->'
                        ],
			columns : [
				{header: '&Aacute;rea', dataIndex: 'nombre', flex: 30}
                        ],
			viewConfig: {forceFit: true},
                        listeners:{
                            itemclick:function(){
                                Ext.getCmp('delete_obj_btn_id').enable(true);
                            }
                        }
		});
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
                     name: 'c_costo',
                     id:'c_costo',
                     allowBlank: false,
                     maxLength: 255,                     
                     labelWidth:'150px',
                     maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/,
                     value:nombre
                 },{
                    xtype:'combobox',
                    fieldLabel: 'Agencias',
                    emptyText:'Agencias',
                    labelWidth:'150px',
                    id:'agencia',
                    name:'agencia',
                     pageSize: 10,
                     listConfig: {
                         loadingText: 'Cargando...',
                         emptyText: 'No existen datos.'
                     },
                    width:400,
                    store:  agencias,
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    listeners:{
                        select:function(This,newValue){
                            areas.clearFilter();
                            areas.filter('agenciaid',Ext.getCmp('agencia').getValue());
                            Ext.getCmp('area').reset();
                        }
                    }
                    
                },{
                    xtype:'combobox',
                    fieldLabel: 'Areas',
                    emptyText:'Areas',
                    labelWidth:'150px',
                    id:'area',
                    name:'area',
                     pageSize: 10,
                     listConfig: {
                         loadingText: 'Cargando...',
                         emptyText: 'No existen datos.'
                     },
                    width:400,
                    store:  areas,
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    listeners:{
                        select:function(This,records){
                            if(_storeO.find('id_estructura',records[0].data.id_estructura)==-1)
                                    _storeO.add(records[0].data);
                            Ext.getCmp('agencia').setValue(records[0].data.agenciaid);
                        }
                    }
                },_grid

             ]
         });
         var _gst_win = new Ext.Window({
                 title:'Modificar el  CentroCosto',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 350,
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
                         Ext.getCmp('c_costo').focus(true, true);
                     },
                     afterrender:function(){                        
                        Ext.getCmp('agencia').setValue(_selected_rcd.data.agenciaid);
                        Ext.getCmp('area').setValue(_selected_rcd.data.id_area);

                     }

                 }});
         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
CentroCosto.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var datos = Ext.getCmp('objetos_grid_id').store.data.items;
        var a = '';
        for(var i = 0;i<datos.length;i++){            
            a += datos[i].data.id+',';
        }
        var values = this.panel.getForm().getValues();
        values.areas = a;
        var  _result = App.PerformSyncServerRequest('CentroCosto.CentroCosto.Add',values);
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            this.__data_store.load();
            App.InfoMessage('Información', 'CentroCosto adicionado satisfactoriamente');
        }
    }

}
CentroCosto.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var values = this.panelupd.getForm().getValues();
        var datos = Ext.getCmp('objetos_grid_id').store.data.items;
        var a = '';
        for(var i = 0;i<datos.length;i++){            
            a += datos[i].data.id+',';
        }
        values.areas = a;
        values.id = _selected_rcd.data.id;
        var _result = App.PerformSyncServerRequest('CentroCosto.CentroCosto.Modid',values);
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'El Centro costo modificado satisfactoriamente');
        }
    }

 }
CentroCosto.prototype.OnDel=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('CentroCosto_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('CentroCosto.CentroCosto.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'CentroCosto eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este CentroCosto?');
}
CentroCosto.prototype.OnImp=function(_paccion){
      App.PrintModel(Ext.getCmp('CentroCosto_grid_id').store,'Listado de Centros de Costo');
}
