function AddSistemaPago()
    {
        this._btn = null;

        this.Render = function(Panel)
        {
            this._btn = Ext.create('Ext.Button',{
                        text : 'Adicionar',
                        id : 'add_sp_btn_id',
                        iconCls : 'list_add16',
                        handler : Ext.Function.bind(this.Owner.AddSP,this.Owner)
                });
            this._btn_mod = Ext.create('Ext.Button',{
                    text : 'Modificar',
                    id : 'add_sp__btn_mod',
                    iconCls : 'apply16',
                    handler : Ext.Function.bind(this.Owner.ModSP,this.Owner)
                });
            this._btn_el = Ext.create('Ext.Button',{
                    text : 'Eliminar',
                    id : 'add_sp__btn_el',
                    iconCls : 'edit_delete16',
                    handler : Ext.Function.bind(this.Owner.del_SP,this.Owner)
                });

            Ext.QuickTips.init();
                var tooltips = [{
                    target : 'add_sp_btn_id',
                    html : 'Adiciona un nuevo Sistema de Pago'
                }];

                var tbar = Ext.getCmp('_tbar_sp_id');
                tbar.add(this._btn);
                tbar.add(' ');
                tbar.add('-');
                tbar.add(this._btn_mod);
                tbar.add(' ');
                tbar.add('-');
                tbar.add(this._btn_el);
                tbar.add(' ');
                tbar.add('-');

                Ext.each(tooltips, function(config) {
                        Ext.create('Ext.tip.ToolTip', config);
                });
        }

        this.Enable = function()
        {
                this._btn.enable();
                this._btn_mod.enable();
                this._btn_el.enable();
        }

        this.Disable = function()
        {
                this._btn.disable();
                this._btn_mod.disable();
                this._btn_el.disable();
        }
        this.Print = function(){
            return 'dfnkdfn dlfksd fdlf ';}
}
App.RegisterFunction('AddSistemaPago', new AddSistemaPago());
SPControler_Module.prototype.AddSP = function(){
        var _scope = this;
        this.__data_store_indicadores =Ext.create('Ext.data.JsonStore', {
                                                                    fields:[
                                                                            {name : 'id', type: 'integer'},
                                                                            {name : 'nombre', type: 'string'},
                                                                            {name : 'sist_pago_id', type: 'string'},
                                                                            {name: 'formador', type : 'bool'},
                                                                            {name: 'cg', type : 'bool'},
                                                                            {name: 'ce', type : 'bool'},
                                                                            {name: 'orden', type : 'int'}
                                                                           ],
                                                                    proxy: {
                                                                            type: 'memory',
                                                                            reader:{
                                                                                        type: 'json'
                                                                                   }
                                                                            },
                                                                    autoLoad: false
                                                                });
        var _edit_new_indicador = new Ext.form.field.Text({
                                                            fieldLabel: 'Nombre',
                                                            name: '_edit_new_indicador',
                                                            id: '_edit_new_indicador',
                                                            labelWidth : 80,
                                                            labelAlign : 'right',
                                                            allowBlank:false,
                                                            flex : 80
                                                        });
        var _edit_new_orden_indicador = new Ext.form.field.Text({
                                                            fieldLabel: 'No. Orden',
                                                            name: '_edit_new_orden_indicador',
                                                            id: '_edit_new_orden_indicador',
                                                            labelWidth : 60,
                                                            allowBlank:false,
                                                            maskRe:/[0-9]/,
                                                            flex : 15
                                                        });
        var _btn_add_indicador = new Ext.button.Button({
                                                            id:'_btn_add_indicador',
                                                            iconCls:'add',
                                                            handler:function()
                                                            {
                                                                _scope.AddIndicador(_edit_new_orden_indicador, _edit_new_indicador);
                                                                _edit_new_orden_indicador.focus();
                                                            }
                                                           });
        var sm = Ext.create('Ext.selection.RowModel',{
                                                        mode:'SINGLE',
                                                        listeners:{
                                                                    select:function()
                                                                            {
                                                                                Ext.getCmp('btn_subir').enable();
                                                                                Ext.getCmp('btn_bajar').enable();
                                                                            },
                                                                    deselect:function()
                                                                            {
                                                                                Ext.getCmp('btn_subir').disable();
                                                                                Ext.getCmp('btn_bajar').disable();
                                                                            }
                                                                  }
                                                     });
        Ext.QuickTips.init();
        var tooltips = [{
            target: 'btn_subir',
            html: 'Subir'
        },
                        {
            target: 'btn_bajar',
            html: 'Bajar'
        },
                        {
            target: '_btn_add_indicador',
            html: 'Adicionar'
        },
                        {
                        target : 'save',
                        html : 'Salvar los datos en la Base de Datos'
                    },
                        {
            target : 'cancel',
            html : 'Cierra la ventana y no salva los datos introducidos'
        }];
        var _grid = new Ext.grid.GridPanel({
                                                border:false,
                                                frame:true,
                                                height:280,
                                                store:this.__data_store_indicadores,
                                                selModel:sm,
                                                enableColumnHide:false,
                                                tbar:[_edit_new_orden_indicador, _edit_new_indicador,' ',_btn_add_indicador],
                                                rbar: ['-',{
                                                            xtype: 'button',
                                                            iconCls: 'Subir',
                                                            id:'btn_subir',
                                                            disabled:true,
                                                            cls:'up',
                                                            handler:function()
                                                                    {
                                                                        var record  = _grid.getSelectionModel().getSelection()[0];
                                                                        var index = _grid.getStore().indexOf(record);
                                                                        if(index > 0)
                                                                          {
                                                                            _grid.getStore().remove(record);
                                                                            _grid.getStore().insert(index-1,record);
                                                                            _grid.getSelectionModel().select(record);
                                                                          }
                                                                        else
                                                                            {
                                                                            _grid.getStore().remove(record);
                                                                            _grid.getStore().insert(_grid.getStore().getCount(),record);
                                                                            _grid.getSelectionModel().select(record);
                                                                            }
                                                                    }
                                                         },{
                                                            xtype: 'button',
                                                            iconCls: 'Bajar',
                                                            id:'btn_bajar',
                                                            cls:'down',
                                                            disabled:true,
                                                            handler:function()
                                                                    {
                                                                        var record  = _grid.getSelectionModel().getSelection()[0];
                                                                        var index = _grid.getStore().indexOf(record);
                                                                        if(index <= _grid.getStore().getCount()-2)
                                                                          {
                                                                            _grid.getStore().remove(record);
                                                                            _grid.getStore().insert(index+1,record);
                                                                            _grid.getSelectionModel().select(record);
                                                                          }
                                                                        if(index == _grid.getStore().getCount()-1)
                                                                            {
                                                                            _grid.getStore().remove(record);
                                                                            _grid.getStore().insert(0,record);
                                                                            _grid.getSelectionModel().select(record);
                                                                            }
                                                                    }
                                                        },'-'],
                                                columns: [{
                                                            header : "No. Orden",
                                                            dataIndex : 'orden',
                                                            flex : 10
                                                        },{
                                                            header:"Nombre",
                                                            dataIndex:'nombre',
                                                            flex : 70
                                                  }]
                                               });
        var _edit = new Ext.form.field.Text({
                                                fieldLabel: 'Nombre',
                                                name: 'nombre',
                                                allowBlank:false,
                                                regex:/^[A-Za-z0-9]+(([ ][A-Za-z0-9.,]+)+)?$/,
                                                anchor:'90%'
                                            });
        var _panel = Ext.create('Ext.form.Panel', {
                                                    frame:true,
                                                    bodyStyle:'padding:5px 5px 0',
                                                    fieldDefaults:{labelWidth: 50},
                                                    defaults:{anchor: '100%'},
                                                    items: [{
                                                                xtype : "fieldset",
                                                                title:'Datos Generales',
                                                                items : [_edit]
                                                            },{
                                                                xtype : "fieldset",
                                                                height:330,
                                                                title:'Relaci&oacute;n de Indicadores',
                                                                items :_grid
                                                            }]
                                            });
        var _window = new Ext.window.Window({
                                        title:'Nuevo Sistema de Pago',
                                        id:'win_sp_id',
                                        resizable : false,
                                        closable : false,
                                        plain: true,
                                        layout:'fit',
                                        modal:true,
                                        width:900,
                                        closable:true,
                                        items:[_panel],
                                        height:500,
                                        buttons:[
                                                 {
                                                    text:'Guardar',
                                                    iconCls : 'save',
                                                    id : 'save',
                                                    handler:Ext.Function.bind(this.ConfSP,this,[_edit,_grid.getStore()])
                                                },
                                                 {
                                                    text:'Cancelar',
                                                    iconCls: 'cancel',
                                                    id : 'cancel',
                                                    handler:function(){_window.close()}
                                                }
                                                ]
                                    });
        _window.show();
         Ext.each(tooltips, function(config) {
            Ext.create('Ext.tip.ToolTip', config);
    });
}
SPControler_Module.prototype.ModSP= function(){

    var _selectionModel = Ext.getCmp('SP_todos').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var id_SP =_selected_rcd.data.id;
    var nombre_SP =_selected_rcd.data.nombre;
    this.__data_store = App.BuildJsonStore('ControladorSP.SPControler.CargarDatos',{
            fields: [
                {name: 'id'},
                {name: 'nombre'},
                {name: 'sist_pago_id'},
                {name: 'orden'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            params:{id_SP:id_SP},
            sorters: {property: 'orden', direction: 'ASC'},
            autoLoad: true
        });
    Ext.create('Ext.window.Window', {
        title: 'Modificar Indicadores',
        height:'50%',
        width: '70%',
        modal:true,
        layout: 'fit',
        tbar:[
            {
            xtype: 'textfield',
            name: 'sist_pago',
            id: 'sist_pago',
            anchor:'50%',
            labelWidth:120,
            width:'50%',
            fieldLabel: 'Sistema de Pago',
            value:nombre_SP
            },
            '->',
            {
                text: 'Adicionar',
                id: 'boton',
                name: 'boton',
                tooltip : 'Adiciona un  nuevo Clasificaci&oacute;n Cientifica',
                iconCls: 'list_add16',
                xtype:'button',
                cls:'btn',
                listeners:{
                    click:function( This, eOpts ){
                        Ext.define('FILA',{
                            extend: 'Ext.data.Model',
                            fields: [
                                {name: 'nombre'},
                                {name: 'orden'}
                            ]
                        });
                        var record = new FILA({nombre:'Nuevo Indicador',orden:'Orden'});
                        Ext.getCmp('mod_grid_ind').getStore().add(record);
                    }
                }
            },
            {
                text: 'Eliminar',
                id: 'Eliminar',
                name: 'Eliminar',
                tooltip : 'Eliminar una fila',
                iconCls: 'edit_delete16',
                xtype:'button',
                cls:'btn',
                handler:function(This){
                    var _selectionModel =  Ext.getCmp('mod_grid_ind').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var id = _selected_rcd.data.id;
                    var cap_Registro_Eventos = _selected_rcd.data.cap_Registro_Eventos;
                    var record = _selected_rcd ;
                    if(id == null || id==''){
                        Ext.getCmp('mod_grid_ind').store.remove(record);}
                    else{
                        var fnCallBack = function()   {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('ControladorSP.SPControler.Eliminarhs',{id:id});
                            App.HideMsgBox();
                            if(_result)
                            {
                                Ext.getCmp('mod_grid_ind').store.remove(record);
                                App.InfoMessage('Información', 'Ha eliminado una acción del capitulo <b>"'+cap_Registro_Eventos+'"</b>');
                            }
                            else
                            {
                                Ext.getCmp('mod_grid_ind').getStore().load()
                                App.InfoMessage('Información', 'Ocurrio un error');
                            }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');




                    }
                }
            },
            {
                text:'Guardar',
                iconCls: 'document_save16',
                handler: function(){
                    var mydd =new Array();
                    _array = new Array();
                    var mydd = Ext.getCmp('mod_grid_ind').getStore().getModifiedRecords();
                    if (mydd.length === 0)
                    { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                    else
                    {
                        for (var i = 0; i < mydd.length; i++)
                        {
                            _array.push(mydd[i].getData());
                        }
                        var fnCallBack = function()   {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var nombre = Ext.getCmp('sist_pago').getValue();
                            if(nombre!=""&& id_SP != ""){
                                var _result = App.PerformSyncServerRequest('ControladorSP.SPControler.modSP_Ind',{data: Ext.encode(_array),nombre:nombre,id_SP:id_SP});
                                App.HideMsgBox();
                                if(_result)
                                {
                                    Ext.getCmp('mod_grid_ind').getStore().load()
                                   // Ext.getCmp('SP_todos').getStore().load()
                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                }
                                else
                                {
                                    Ext.getCmp('mod_grid_ind').getStore().load()
                                   // Ext.getCmp('SP_todos').getStore().load()
                                    App.InfoMessage('Información', 'Ocurrio un error');
                                }
                                App.InfoMessage('Información', 'Bien');
                            }
                            else{
                                App.InfoMessage('Información', 'Faltan datos por entrar');
                                App.HideMsgBox();
                            }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                    }

                }
            }
            ],
        items: [
            {
            xtype: 'grid',
            border: false,
            id:'mod_grid_ind',
            name:'mod_grid_ind',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            columns: [
                {header: 'Orden',dataIndex: 'orden',flex:1,editor: {allowBlank: false}},
                {header: 'Indicador',dataIndex: 'nombre',flex:4,editor: {allowBlank: false}}

            ],
            store: this.__data_store
            }
        ]
    }).show();
}
SPControler_Module.prototype.del_SP= function(){
    var _selectionModel =  Ext.getCmp('SP_todos').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var id = _selected_rcd.data.id;
    var fnCallBack = function(){
            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
            var _result = App.PerformSyncServerRequest('ControladorSP.SPControler.EliminarSP',{id:id});
            App.HideMsgBox();
            if(_result)
            {
                var _result = App.PerformSyncServerRequest('ControladorSP.SPControler.LoadData',{Params:null});
                Ext.getCmp('SP_todos').store.loadData(_result.sp);
                App.InfoMessage('Información', 'Ha eliminado una acción del capitulo');
            }
            else
            {

                App.InfoMessage('Información', 'Ocurrio un error');
            }
        }
        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');
}
SPControler_Module.prototype.ConfSP = function(nombresp,inds) {
     if(nombresp.isValid())
       {
            var _scope = this;
            var flag = 0;
            for (var i = 0; i < _scope.__data_store_sp.getCount(); i++){
                if(_scope.__data_store_sp.getAt(i).data.nombre == nombresp.getValue())
                  {
                      Ext.Msg.show({
                                   title:'Notificaci&oacute;n',
                                   msg: 'Ya existe un Sistema de Pago con ese nombre',
                                   icon: Ext.MessageBox.WARNING,
                                   buttons: Ext.Msg.OK,
                                   width:350,
                                   scope : this
                                });
                      flag = 1;
                      break;
                  }
             }
            if(flag == 1)return;
            if(inds.getCount() == 0){
                    Ext.Msg.show({
                                   title:'Notificaci&oacute;n',
                                   msg: 'El Sistema de Pago debe tener Indicadores',
                                   icon: Ext.MessageBox.WARNING,
                                   buttons: Ext.Msg.OK,
                                   width:350,
                                   scope : this
                                 });
                    return;
                }
            Ext.getCmp('win_sp_id').close();
            var arr = new Array();
            for (var i = 0; i < inds.getCount(); i++){
                    arr.push(inds.getAt(i).data);
              }

            var _sm = Ext.create('Ext.selection.CheckboxModel',{
                                                                mode:'MULTI'
                                                                });
            var _btn_guardar = Ext.create('Ext.button.Button',{
                                                                iconCls:'add',
                                                                handler:function(){_scope.ConfIndicadorCuadro(_grid_cuadros.getSelectionModel().getSelection(),_grid_indicadores.getSelectionModel().getSelection())}
                                                               });
            var _grid_indicadores = new Ext.grid.Panel({
                                                       title:"Listado de Indicadores",
                                                       id:'_grid_indicadores',
                                                       name:'_grid_indicadores',
                                                       region:'center',
                                                       width:'60%',
                                                       height:'100%',
                                                       selModel:_sm,
                                                       tbar:[_btn_guardar],
                                                       store:_scope.__data_store_indicadores,
                                                       columns: [
                                                                    {hidden:true, dataIndex: 'id'},
                                                                    {header:"Nombre", dataIndex: 'nombre',flex : 60},
                                                                    {header:"Formador",xtype: 'checkcolumn', dataIndex: 'formador', flex : 10,align:'center'},
                                                                    {header:"C.G.", xtype: 'checkcolumn',dataIndex: 'cg', flex : 5,align:'center'},
                                                                    {header:"C.E.", xtype: 'checkcolumn',dataIndex: 'ce', flex : 5,align:'center'}
                                                                    ]
                                                     });
            var _sm_cuadro = Ext.create('Ext.selection.RowModel',{
                                                                mode:'SINGLE',
                                                                listeners:{
                                                                           select:function(This,record,index,options )
                                                                                    {
                                                                                        _scope.LoadConfIndicadorCuadro(record.data.id,_grid_indicadores.getStore().getAt(0).data.sistema_pagoid);
                                                                                    }
                                                                          }
                                                                });
            var _grid_cuadros = new Ext.grid.Panel({

                                                       title:"Listado de Cuadros",
                                                       region:'west',
                                                       width:'40%',
                                                       height:'100%',
                                                       selModel:_sm_cuadro,
                                                       store:_scope.__data_store_cuadros,
                                                       columns:[
                                                                  {hidden:true, dataIndex: 'id'},
                                                                  {header:"Nombre", dataIndex: 'nombre',flex : 99}
                                                               ]
                                                     });
            var _window = Ext.create('Ext.window.Window',{
                                                    title:'Asignaci&oacute;n de Indicadores por Cuadro',
                                                    resizable : false,
                                                    closable : false,
                                                    plain: true,
                                                    modal:true,
                                                    width:900,
                                                    layout: 'border',
                                                    height:App.GetDesktopHeigth()-150,
                                                    items:[_grid_cuadros,_grid_indicadores],
                                                    buttons:[{
                                                                text:'Cerrar',
                                                                handler:function(){_window.close()}
                                                            }]
                                                  });

           function Callback(response){
                         _scope.__data_store_cuadros.clearFilter();
                        Ext.define('Sp', {
                                            extend: 'Ext.data.Model',
                                            fields: ['id','nombre']
                                          }
                                    );
                         var record = new Sp({
                                    id: response.sp_id,
                                    nombre: nombresp.getValue()
                                });
                         _scope.__data_store_sp.insert(0,record);
                         _scope.__data_store_indicadores.loadData(response.list_indi);
                       // _window.show();
                    }
           //App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
           App.PerformServerRequest('ControladorSP.SPControler.AddSistemaPago',{nombre:nombresp.getValue(),listado:Ext.encode(arr)},Callback)
       }
  }
SPControler_Module.prototype.AddIndicador = function(orden, comp){
      if(comp.isValid())
         {
              var _scope = this;
              var flag = 0;
             for (var i = 0; i < _scope.__data_store_indicadores.getCount(); i++)
             {
                 if(_scope.__data_store_indicadores.getAt(i).data.nombre == comp.getValue() || _scope.__data_store_indicadores.getAt(i).data.orden == orden.getValue())
                    {
                        Ext.Msg.show({
                                       title:'Notificaci&oacute;n',
                                       msg: 'Ya existe un Indicador con ese nombre o con ese orden',
                                       icon: Ext.MessageBox.WARNING,
                                       buttons: Ext.Msg.OK,
                                       width:320,
                                       scope : this
                                    });
                        flag = 1;
                        break;
                    }
             }
             if(flag == 0)
               {
                  Ext.define('Indicador', {
                                            extend: 'Ext.data.Model',
                                            fields: ['nombre','formador','cg','ce','orden']
                                          }
                            );
                 var record = new Indicador({
                                            nombre: comp.getValue(),
                                            orden : orden.getValue()
                                        });
                 _scope.__data_store_indicadores.insert(0,record);
                 comp.reset();
                 orden.reset();
               }
         }
  }
SPControler_Module.prototype.LoadConfIndicadorCuadro = function(cuadro,sp){
        var _scope = this;
        function Callback(response)
        {
            Ext.getCmp('_grid_indicadores').getSelectionModel().deselectAll();
            for (var i = 0; i < _scope.__data_store_indicadores.getCount(); i++)
            {
                _scope.__data_store_indicadores.getAt(i).set('formador',false);
                _scope.__data_store_indicadores.getAt(i).set('cg',false);
                _scope.__data_store_indicadores.getAt(i).set('ce',false);
            }
            var arr = new Array();
            for (var i = 0; i < response.result.length; i++)
            {
                var index = _scope.__data_store_indicadores.find('id',response.result[i].id_indi);
                var formador
                var cg
                var ce
                if(response.result[i].formador == 't')
                    formador = true;
                else
                    formador = false;
                if(response.result[i].cg == 't')
                    cg = true;
                else
                    cg = false;
                if(response.result[i].ce == 't')
                    ce = true;
                else
                    ce = false;

                _scope.__data_store_indicadores.getAt(index).set('formador',formador);
                _scope.__data_store_indicadores.getAt(index).set('cg',cg);
                _scope.__data_store_indicadores.getAt(index).set('ce',ce);
                _scope.__data_store_indicadores.getAt(index).commit();
                arr.push(_scope.__data_store_indicadores.getAt(index));
            }
            Ext.getCmp('_grid_indicadores').getSelectionModel().select(arr);
        }
        function OnError(response)
                {
                    Ext.getCmp('_grid_indicadores').getSelectionModel().deselectAll();
                    for (var i = 0; i < _scope.__data_store_indicadores.getCount(); i++)
                    {
                        _scope.__data_store_indicadores.getAt(i).set('formador',false);
                        _scope.__data_store_indicadores.getAt(i).set('cg',false);
                        _scope.__data_store_indicadores.getAt(i).set('ce',false);
                    }
                    for (var i = 0; i < _scope.__data_store_indicadores.getCount(); i++)
                    {
                        _scope.__data_store_indicadores.getAt(i).commit();
                    }

                }
        App.PerformServerRequest('ControladorSP.SPControler.LoadConfIndicadorCuadro',{id_cuadro:cuadro,id_sp:sp},Callback,OnError,false)
    }
SPControler_Module.prototype.ConfIndicadorCuadro = function(cuadro,list_indi){
          var _scope = this;
          if(cuadro.length != 1)
              {
                 Ext.Msg.show({
                                   title:'Notificaci&oacute;n',
                                   msg: 'Debe seleccionar un Cuadro',
                                   icon: Ext.MessageBox.WARNING,
                                   buttons: Ext.Msg.OK,
                                   width:250,
                                   scope : this
                                 });
                  return;
             }
          if(list_indi.length < 1)
              {
                 Ext.Msg.show({
                                   title:'Notificaci&oacute;n',
                                   msg: 'Debe seleccionar al menos un Indicador',
                                   icon: Ext.MessageBox.WARNING,
                                   buttons: Ext.Msg.OK,
                                   width:325,
                                   scope : this
                                 });
             }
          else
             {
                 for (var i = 0; i < list_indi.length; i++)
                 {
                     if(!this.ValidaConfIndi(list_indi[i].data.formador,list_indi[i].data.cg,list_indi[i].data.ce))
                       {
                             Ext.Msg.show({
                                           title:'Notificaci&oacute;n',
                                           msg: 'Debe definir por cada Indicador seleccionado si es Formador, Condicionante o Espec&iacute;fico',
                                           icon: Ext.MessageBox.WARNING,
                                           buttons: Ext.Msg.OK,
                                           width:380,
                                           scope : this
                                         });
                           return;
                       }
                 }
                 var arr = new Array();
                 for (var i = 0; i < list_indi.length; i++)
                 {
                     arr.push(list_indi[i].data);
                 }
                 function Callback(response)
                 {
                        _scope.__data_store_cuadros.removeAll();
                        _scope.__data_store_sp.removeAll()
                        _scope.__data_store_cuadros.loadData(response.cuadros)
                        _scope.__data_store_sp.loadData(response.sp)
                        for (var i = 0; i < _scope.__data_store_indicadores.getCount(); i++)
                            {
                                _scope.__data_store_indicadores.getAt(i).commit();
                            }
                 }
                  App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
                  App.PerformServerRequest('ControladorSP.SPControler.ConfIndicadoresCuadros',{cuadro:cuadro[0].data.id,listado:Ext.encode(arr)},Callback)

             }
      }
SPControler_Module.prototype.ValidaConfIndi = function(formador,cg,ce){
    var count = 0;
    var flag = false;
    if(formador||cg||ce)
    {
        count = ((formador) ? 1 : 0) + ((cg) ? 1 : 0) + ((ce) ? 1 : 0);
        flag = (count > 1) ? false : true;
    }

    return flag;
}

