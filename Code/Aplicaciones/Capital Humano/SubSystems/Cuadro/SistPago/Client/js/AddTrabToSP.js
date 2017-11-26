function AddTrabToSP()
{
        this._btn = null;
        this._btn_modificar = null;
        this.Render = function(Panel)
        {
                Ext.QuickTips.init();
                var tooltips = [{
                    target: 'add_to_sp_btn_id',
                    html: 'Agrega Sistema de Pago'
                }, {
                    target: 'mod_to_sp_btn_id',
                    html: 'Modificael sist de pago seleccionado'
                }];

                this._btn = Ext.create('Ext.Button',
                {
                        id : 'add_to_sp_btn_id',
                        text:'Vincular Trabajador',
                        iconCls:'insert_image16',
                        disabled:true,
                        handler : Ext.Function.bind(this.Owner.WindowAddTrabajadorSP,this.Owner,[Panel])
                });
                this._btn_modificar = Ext.create('Ext.Button',
                {
                        id : 'mod_to_sp_btn_id',
                        text:'Modificar indicadores',
                        iconCls:'user_identity16',
                        disabled:true,
                        handler : Ext.Function.bind(this.Owner.WindowModTrabajadorSP,this.Owner,[Panel])
                });
                var tbar = Ext.getCmp('_tbar_sp_id');
               /* tbar.add(this._btn);
                tbar.add(' ');
                tbar.add('-');
                tbar.add(' ');*/
                var tbar_cuad = Ext.getCmp('_tbar_sp_id_cuadros');
                tbar_cuad.add(this._btn_modificar);
                tbar_cuad.add(' ');
                tbar_cuad.add('-');

                Ext.each(tooltips, function(config) {
                        Ext.create('Ext.tip.ToolTip', config);
                });
        }
        this.Enable = function()
        {
                this._btn.enable();
                this._btn_modificar.enable();
        }
        this.Disable = function()
        {
                this._btn.disable();
                this._btn_modificar.disable();
        }
        this.Print = function(){
            return 'dfnkdfn dlfksd fdlf ';}
}
App.RegisterFunction('AddTrabToSP', new AddTrabToSP());
SPControler_Module.prototype.WindowAddTrabajadorSP = function(Panel){
        var _scope = this;

        Ext.QuickTips.init();
        var tooltips = [{
            target: 'guardar_config',
            html: 'Guarda la configuracion establecida para el cuadro'
        },{
            target : 'cancel_id',
            html : 'Cierra la ventana de configuracion'
        }];
        var _selectionModel = Ext.getCmp('SP_todos').getSelectionModel();
        var _selected_rcd = _selectionModel.getLastSelected();
        var id_SP =_selected_rcd.data.id;
        var id_sp = Panel.getComponent(0).getSelectionModel().getSelection()[0].get('id');
        this.__data_store_idicadores = App.BuildJsonStore('ControladorSP.SPControler.CargarDatos',{
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
        this.__data_store_cuadros_new = App.BuildJsonStore('ControladorSP.SPControler.LoadData_cuadors',{
                        fields:[{name: 'id'},{name: 'nombre'}],
                        proxy:{type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        sorters:{property: 'orden', direction: 'ASC'},
                        autoLoad:true
        });
        var _combo = Ext.create('Ext.form.field.ComboBox',{     fieldLabel: 'Cuadro',
                                                                store: this.__data_store_cuadros_new,
                                                                allowBlank:false,
                                                                labelWidth:45,
                                                                width:280,
                                                                queryMode: 'local',
                                                                displayField: 'nombre',
                                                                valueField: 'id',
                                                                forceSelection : true,
                                                                listeners:{
                                                                            change:function()
                                                                                    {
                                                                                        _grid.getSelectionModel().deselectAll();
                                                                                        var store = _grid.getStore();
                                                                                        for (var i = 0; i < store.getCount(); i++)
                                                                                        {
                                                                                            store.getAt(i).data.formador = false;
                                                                                            store.getAt(i).data.cg = false;
                                                                                            store.getAt(i).data.ce = false;
                                                                                            store.getAt(i).commit();
                                                                                        }
                                                                                    }
                                                                          }
                                                          });
        var _sm = Ext.create('Ext.selection.CheckboxModel',{
                                                            mode:'MULTI'
                                                            });
        var _btn_guardar = Ext.create('Ext.button.Button',{
                                                                iconCls:'add',
                                                                id : 'guardar_config',
                                                                text:'Guardar Configuraci&oacute;n',
                                                                handler:function()
                                                                        {
                                                                          _scope.AddTrabajadorSP(id_sp,_combo,_grid);
                                                                        }
                                                               });
        var _grid = Ext.create('Ext.grid.Panel', {
                                                   title:"Listado de Indicadores",
                                                   region:'center',
                                                   width:'100%',
                                                   selModel:_sm,
                                                   tbar:[_combo,'->',_btn_guardar],
                                                   store: this.__data_store_idicadores,
                                                   columns: [
                                                                {hidden:true, dataIndex: 'id'},
                                                                {header:"Nombre", dataIndex: 'nombre',flex : 60},
                                                                {header:"Formador",id:'formador_',xtype: 'checkcolumn', dataIndex: 'formador', flex : 10,align:'center'/*,
                                                                    listeners: {
                                                                        checkchange:function(This, rowIndex, checked, eOpts ){
                                                                            if(checked==true){
                                                                                console.log(_grid.getColumns());
                                                                                Ext.getCmp('cg_').disable();
                                                                                Ext.getCmp('ce_').disable();
                                                                            }
                                                                            else{
                                                                                Ext.getCmp('cg_').enable();
                                                                                Ext.getCmp('ce_').enable();
                                                                            }}
                                                                    }*/
                                                                },
                                                                {header:"C.G.",id:'cg_', xtype: 'checkcolumn',dataIndex: 'cg', flex : 5,align:'center'},
                                                                {header:"C.E.",id:'ce_',xtype: 'checkcolumn',dataIndex: 'ce', flex : 5,align:'center'}
                                                                ]

                                            });
        var _window = new Ext.window.Window({
                                            title:'Modificar Sistema de Pago',
                                            id:'win_add_trab_sp',
                                            resizable : false,
                                            closable : false,
                                            plain: true,
                                            layout:'fit',
                                            modal:true,
                                            width:900,
                                            items:[_grid],
                                            height:App.GetDesktopHeigth()-150,
                                            buttons:[{
                                                        text:'Cerrar',
                                                        iconCls : 'cancel',
                                                        id : 'cancel_id',
                                                        handler:function(){_window.close()}
                                                    }]
                                        });
        _window.show();

    }
SPControler_Module.prototype.WindowModTrabajadorSP = function(Panel) {
    var _sm = Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'});
    var _sm_p = Ext.create('Ext.selection.CheckboxModel',{mode:'SIMPLE'});
    var combo=Ext.create('Ext.form.ComboBox',{
        fieldLabel: 'Cuadros',
        id: 'Cuadros',
        name: 'Cuadros',
        store:this.__data_store_cuadros,
        queryMode: 'local',
        labelWidth:100,
        displayField: 'nombre',
        margin:5,
        valueField: 'id',
        listeners:{
            change:function( This, newValue, oldValue, eOpts ){
            Ext.getCmp('Sist_Pago').reset();
            }
        }
    });
    var combo_cuadro=Ext.create('Ext.form.ComboBox',{
        fieldLabel: 'Sist Pago',
        id: 'Sist_Pago',
        name: 'Sist_Pago',
        labelWidth:100,
        store: this.__data_store_sp,
        queryMode: 'local',
        displayField: 'nombre',
        valueField: 'id',
        listeners:{
            change:function( This, newValue, oldValue, eOpts ){
               var sist = Ext.getCmp('Sist_Pago').getValue()
               var cuad = Ext.getCmp('Cuadros').getValue()
               var resultUnidadF = App.PerformSyncServerRequest('ControladorSP.SPControler.indicadores',{cuad:cuad,sist:sist, start:0,limit:25});
               Ext.getCmp('actual').store.loadData(resultUnidadF.rows);
               Ext.getCmp('new').store.loadData(resultUnidadF.rows1);
            }
        }
    });
    this.indic_actuales = App.BuildJsonStore('ControladorSP.SPControler.indicadores',{
        fields: [
            {name: 'indc_id'},
            {name: 'id'},
            {name: 'sit_pago'},
            {name: 'nombre'},
            {name: 'trabajador_id'},
            {name: 'formador',type:'boolean'},
            {name: 'cg',type:'boolean'},
            {name: 'ce',type:'boolean'}
        ],
        proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
        sortInfo: {field: 'nombre',direction: 'ASC'},
        autoLoad: false
    });
    this.indic_new = App.BuildJsonStore('ControladorSP.SPControler.indicadores',{
        fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'formador',type:'boolean'},
            {name: 'cg',type:'boolean'},
            {name: 'ce',type:'boolean'}
        ],
        proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
        sortInfo: {field: 'nombre',direction: 'ASC'},
        autoLoad: false
    });
    Ext.create('Ext.window.Window',{
        title: 'Modificar Sistema de Pago',
        height: '80%',
        width: '80%',
        layout: 'column',
        modal:true,
        tbar:[combo,'','','',combo_cuadro],
        bbar:[
            {
                text: 'Guardar',
            handler:function( This, eOpts){
                var mydd =new Array();
                var nevos =new Array();
                _array = new Array();
                nevos_array = new Array();
                var mydd = Ext.getCmp('actual').getStore().getModifiedRecords();
                var nevos = Ext.getCmp('new').getStore().getModifiedRecords();
                var sist = Ext.getCmp('Sist_Pago').getValue()
                var cuad = Ext.getCmp('Cuadros').getValue()
                if (mydd.length === 0 && nevos.length === 0)
                { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                else
                {
                    for (var i = 0; i < mydd.length; i++){
                        _array.push(mydd[i].getData());
                    }
                    for (var i = 0; i < nevos.length; i++){
                        nevos_array.push(nevos[i].getData());
                    }
                    console.log(nue)
                    var fnCallBack = function()   {
                       App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                       if(sist!=""&& cuad!=""){
                            var _result = App.PerformSyncServerRequest('ControladorSP.SPControler.Add_indicadores',
                                {data:Ext.encode(_array),nevos:Ext.encode(nevos_array),sist:sist,cuad:cuad, start:0,limit:25});
                            App.HideMsgBox();
                            if(_result)
                            {
                                Ext.getCmp('actual').store.loadData(_result.rows);
                                Ext.getCmp('new').store.loadData(_result.rows1);
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                            {
                                Ext.getCmp('actual').store.loadData(_result.rows);
                                Ext.getCmp('new').store.loadData(_result.rows1);
                                App.InfoMessage('Información', 'Ocurrio un error');
                            }
                           App.HideMsgBox();
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
        items:[
            {
            xtype: 'grid',
            columnWidth: 0.5,
            border: true,
            layout:'fit',
            title:'Modificar Indicadores',
            id:'actual',
            height: 400,
            name:'actual',
            selModel:_sm_p,
            store:this.indic_actuales,
            columns: [
                {hidden:true, dataIndex: 'id'},
                {header:"Nombre", dataIndex: 'nombre',flex : 60},
                {header:"Formador",xtype: 'checkcolumn', dataIndex: 'formador', flex : 18,align:'center'},
                {header:"C.G.", xtype: 'checkcolumn',dataIndex: 'cg', flex : 5,align:'center'},
                {header:"C.E.", xtype: 'checkcolumn',dataIndex: 'ce', flex : 5,align:'center'},
                {   text: "Eliminar",
                    xtype:'actioncolumn',
                    width:70,
                    items: [
                        {height:5},
                        {
                            iconCls:'del_item',
                            tooltip: 'No aprobar curso',
                            handler: function() {
                                var _selectionModel = Ext.getCmp('actual').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                var id = _selected_rcd.data.id;
                                var cursos = App.PerformSyncServerRequest('ControladorSP.SPControler.EliminarSP_inc',{id:id});
                                if(cursos==true){
                                    var sist = Ext.getCmp('Sist_Pago').getValue();
                                    var cuad = Ext.getCmp('Cuadros').getValue();
                                    var resultUnidadF = App.PerformSyncServerRequest('ControladorSP.SPControler.indicadores',{cuad:cuad,sist:sist, start:0,limit:25});
                                    Ext.getCmp('actual').store.loadData(resultUnidadF.rows);
                                    App.InfoMessage('Información', 'Indicador eliminado satisfactoriamente');
                                }
                                else{
                                    App.InfoMessage('Información', 'No se pudo eliminar el indicador solicitado');
                                }
                            },
                            scope: this
                        }]
                }
                 ]
             },
            {
            xtype: 'grid',
            columnWidth: 0.5,
            border:true,
            layout:'fit',
            selModel:_sm,
            height: 400,
            title:'Adicionar Indicadores',
            id:'new',
            name:'new',
            store:this.indic_new,
            columns: [
                {hidden:true, dataIndex: 'id'},
                {header:"Nombre", dataIndex: 'nombre',flex : 60},
                {header:"Formador",xtype: 'checkcolumn', dataIndex: 'formador', flex : 15,align:'center'},
                {header:"C.G.", xtype: 'checkcolumn',dataIndex: 'cg', flex : 5,align:'center'},
                {header:"C.E.", xtype: 'checkcolumn',dataIndex: 'ce', flex : 5,align:'center'}
            ]
        }
            ]
    }).show();
}
SPControler_Module.prototype.AddTrabajadorSP = function(id_sp,combo,grid){
    var _scope = this;
    if(!combo.isValid())
      {
          Ext.Msg.show({
                           title:'Notificaci&oacute;n',
                           msg: 'Debe seleccionar alg&uacute;n Cuadro',
                           icon: Ext.MessageBox.WARNING,
                           buttons: Ext.Msg.OK,
                           width:300,
                           scope:this
                         });
          return;
      }
    if(grid.getSelectionModel().getSelection().length == 0)
      {
          Ext.Msg.show({
                           title:'Notificaci&oacute;n',
                           msg: 'Debe seleccionar alg&uacute;n Indicador',
                           icon: Ext.MessageBox.WARNING,
                           buttons: Ext.Msg.OK,
                           width:300,
                           scope:this
                         });
          return;
      }
    if(combo.isValid() && grid.getSelectionModel().getSelection().length > 0)
      {
            var arr = new Array();
            for (var i = 0; i < grid.getSelectionModel().getSelection().length;i++)
              {
                    arr.push(grid.getSelectionModel().getSelection()[i].data);
              }
            for (i = 0; i < arr.length; i++)
            {
                arr[i]['sistema_pagoid'] = id_sp;
            }
            for (var i = 0; i < grid.getSelectionModel().getSelection().length; i++)
             {
                /* console.log(grid.getSelectionModel().getSelection().length);
                 console.log(grid.getSelectionModel().getSelection()[i].data.formador);
                 console.log(grid.getSelectionModel().getSelection()[i].data.cg);
                 console.log(grid.getSelectionModel().getSelection()[i].data.ce);*/
                 if(!this.ValidaConfIndi(grid.getSelectionModel().getSelection()[i].data.formador,grid.getSelectionModel().getSelection()[i].data.cg,grid.getSelectionModel().getSelection()[i].data.ce))
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
            function Callback(response)
            {
                combo.reset();
                _scope.__data_store_cuadros.removeAll();
                _scope.__data_store_sp.removeAll();
                _scope.__data_store_cuadros.loadData(response.cuadros);
                _scope.__data_store_sp.loadData(response.sp);
                for(var i = 0; i < _scope.__data_store_indicadores_mod_trab.getCount(); i++)
                {
                    _scope.__data_store_indicadores_mod_trab.getAt(i).commit();
                }
                _scope.__data_store_indicadores_mod_trab.removeAll();

            }
            //App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
            App.PerformServerRequest('ControladorSP.SPControler.AddTrabToSP',{cuadro:combo.getValue(),listado:Ext.encode(arr)},Callback);
      }
}
SPControler_Module.prototype.ModIndCuadroSP = function(id_sp, id_cuadro, _grid){
    var _scope = this;
    if(_grid.getSelectionModel().getSelection().length == 0)
    {
        Ext.Msg.show({
            title:'Notificaci&oacute;n',
            msg: 'Debe seleccionar alg&uacute;n Indicador',
            icon: Ext.MessageBox.WARNING,
            buttons: Ext.Msg.OK,
            width:300,
            scope:this
        });
        return;
    }
    if(_grid.getSelectionModel().getSelection().length > 0)
    {
        var arr = new Array();
        for (var i = 0; i < _grid.getSelectionModel().getSelection().length;i++)
        {
            arr.push(_grid.getSelectionModel().getSelection()[i].data);
        }
        for (i = 0; i < arr.length; i++)
        {
            arr[i]['sistema_pagoid'] = id_sp;
            arr[i]['cuadro_id'] = id_cuadro;
        }
        for (var i = 0; i < _grid.getSelectionModel().getSelection().length; i++)
        {
            if(!this.ValidaConfIndi(_grid.getSelectionModel().getSelection()[i].data.formador,_grid.getSelectionModel().getSelection()[i].data.cg,_grid.getSelectionModel().getSelection()[i].data.ce))
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
        function Callback(response)
        {
            _scope.__data_store_cuadros.removeAll();
            _scope.__data_store_sp.removeAll();
            _scope.__data_store_cuadros.loadData(response.cuadros);
            _scope.__data_store_sp.loadData(response.sp);
            for(var i = 0; i < _scope.__data_store_indicadores_mod_trab.getCount(); i++)
            {
                _scope.__data_store_indicadores_mod_trab.getAt(i).commit();
            }
        }
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
        App.PerformServerRequest('ControladorSP.SPControler.ModTrabToSP',{listado:Ext.encode(arr)},Callback);
    }
}