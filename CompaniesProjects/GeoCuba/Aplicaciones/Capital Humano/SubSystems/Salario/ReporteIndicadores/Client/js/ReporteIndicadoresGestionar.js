function ReporteIndicadoresGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Calcular/Guardar',
            id: 'add_ReporteIndicadores_btn_id',
            tooltip : 'Adiciona un nuevo Puesto por Área ',
            iconCls: 'document_save16',
            handler:function( This, eOpts){
                var mydd =new Array();
                _array = new Array();
                var mes = Ext.getCmp('mes').getValue();
                var anno= Ext.getCmp('anno').getValue();
                if(mes!='' && anno !=''&& mes!=null && anno !=null){
                var mydd = Ext.getCmp('prenom_grid').getStore().getModifiedRecords();
                var _selectionModel = Ext.getCmp('prenom_grid').getSelectionModel();
                if (mydd.length === 0)
                {
                    App.InfoMessage('Información', 'No ha modificado fila alguna');
                }
                else
                {
                    for (var i = 0; i < mydd.length; i++){_array.push(mydd[i].getData());}
                    var fnCallBack = function()   {
                        var _result_bus = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Buscar2',{mes:mes,anno:anno});
                        if(_result_bus.results > 0){
                            var fnCallBack_after = function()   {
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add',{data: Ext.encode(_array),mes:mes,anno:anno});
                                App.HideMsgBox();
                                if(_result)
                                {
                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                    Ext.getCmp('prenom_grid').store.load();
                                }
                                else
                                {
                                    App.InfoMessage('Información', 'Ocurrio un error');
                                }
                            }
                            App.ConfirmMessage(fnCallBack_after, 'Ya se ha calculado la prenomina.<br> ¿Está seguro que desea recalcular los datos? <br> Se perderan los datos almacenados anteriormente.<br><span class="label label-important1">Nota:&nbsp; </span>&nbsp;Solo se eliminaran los datos que en este momento esten duplicados,los trabajadores que se les calcula la prenomina en el mes por primera ves no seran afectados');
                        }
                        else{
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Add',{data: Ext.encode(_array),mes:mes,anno:anno});
                            App.HideMsgBox();
                            if(_result)
                            {
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                            {
                                App.InfoMessage('Información', 'Ocurrio un error');
                            }
                        }
                    }
                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                }
                }
                else{
                    App.InfoMessage('Información', 'Debe dar una fecha valida');
                }


            }
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Ver Reporte',
            id: 'mod_ReporteIndicadores_btn_id',
            tooltip : 'Modifica el Puesto por Área seleccionado',
            iconCls: 'document_preview16',
            handler: function(){
                var mes = Ext.getCmp('mes').getValue();
                var anno= Ext.getCmp('anno').getValue();
                if(mes!='' && anno !=''&& mes!=null && anno !=null){
                this.__data_store_datos = App.BuildJsonStore('ReporteIndicadores.ReporteIndicadores.info', {
                    fields: [{name: 'datos',header:''}],
                    groupField: 'area',
                    proxy: {type: 'ajax',
                            reader: {
                                    type: 'json',
                                    root: 'rows',
                                    totalProperty: 'results'
                                    }
                          },
                    params:{mes:mes,anno:anno},
                    pageSize: 1,
                    autoLoad: true
                });
                    Ext.create('Ext.window.Window', {
                        layout: 'fit',
                        height: '95%',
                        width: '95%',
                        modal:true,
                        items: {
                            xtype: 'grid',
                            id: 'grid_mjdf1',
                            name: 'grid_mjdf1',
                            autoScroll:true,
                            border: false,
                            columns: [{header:'Resumen por Unidades',dataIndex: 'datos',width:'100%'}],
                            store:this.__data_store_datos,
                            tools:[{type:'print',
                                handler:function(){
                                    var a = Ext.getCmp('grid_mjdf1').store;
                                    App.PrintData(a,null);
                                }
                            }],
                            bbar:{
                                xtype: 'pagingtoolbar',
                                pageSize: 1,
                                store: this.__data_store_datos,
                                displayInfo: true,
                                plugins: new Ext.ux.ProgressBarPager()
                            }
                        }
                    }).show();

                }
                else{
                    App.InfoMessage('Información', 'Debe dar una fecha valida');
                }


            }
        });
        this._btn_mod_inc = Ext.create('Ext.Button', {
            text: 'Ver Reporte(Incidencias)',
            id: 'mod_ReporteIndicadores_inc',
            tooltip : 'Modifica el Puesto por Área seleccionado',
            iconCls: 'document_preview16',
            handler: function(){
                var mes = Ext.getCmp('mes').getValue();
                var anno= Ext.getCmp('anno').getValue();
                if(mes!='' && anno !=''&& mes!=null && anno !=null){
                this.__data_store_datos = App.BuildJsonStore('ReporteIndicadores.ReporteIndicadores.info_inc', {
                    fields: [{name: 'datos',header:''}],
                    groupField: 'area',
                    params:{mes:mes,anno:anno},
                    proxy: {type: 'ajax', reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                    pageSize: 1,
                    autoLoad: true
                });
                Ext.create('Ext.window.Window', {
                    //title: 'Hello', maximized : 'true', minimizable : 'true',maximizable : 'true',
                    layout: 'fit',
                    height: '95%',
                    width: '95%',
                    modal:true,
                    items: {
                        xtype: 'grid',
                        id: 'grid_mjdf',
                        name: 'grid_mjdf',
                        autoScroll:true,
                        border: false,
                        columns: [{header:'Resumen por Unidades',dataIndex: 'datos',width:'100%'}],
                        store:this.__data_store_datos,
                        tools:[{type:'print',
                            handler:function(){
                                var a = Ext.getCmp('grid_mjdf').store;
                                App.PrintData(a,null);
                            }
                        }],
                        bbar:{
                            xtype: 'pagingtoolbar',
                            pageSize: 1,
                            store: this.__data_store_datos,
                            displayInfo: true,
                            plugins: new Ext.ux.ProgressBarPager()
                        }
                    }
                }).show();
                }
                else{
                    App.InfoMessage('Información', 'Debe dar una fecha valida');
                }
            }
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
        tbar.add( this._btn_add );
        tbar.add('|');
        tbar.add( this._btn_mod );
        tbar.add('|');
        tbar.add( this._btn_mod_inc );
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
                        var result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.CargarDatos',{start:0,limit:25});
                        this._store_combo.loadData(result.rows);
                        Ext.getCmp('combo_value_id').enable();
                    }
                    else{
                        Ext.getCmp('prenom_grid').store.clearData( Ext.getCmp('prenom_grid').store);
                        Ext.getCmp('prenom_grid').store.load();
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
                    Ext.getCmp('prenom_grid').store.clearData( Ext.getCmp('prenom_grid').store);
                    var value = Ext.getCmp('combo_value_id').getValue() ;
                    var result = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.CargarAreas',{value:value});
                    this.__data_store.loadData(result.rows);
                    var resultUnidad = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Tomar_datos',{combo_value_id:combo_value_id, start:0,limit:25});
                    Ext.getCmp('prenom_grid').store.loadData(resultUnidad.rows);
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
                    Ext.getCmp('prenom_grid').store.clearData( Ext.getCmp('prenom_grid').store);
                    var combo_value_id = Ext.getCmp('combo_value_id').getValue() ;
                    var combo_area_id = Ext.getCmp('combo_area_id').getValue() ;
                    var resultUnidadF = App.PerformSyncServerRequest('ReporteIndicadores.ReporteIndicadores.Tomar_datos',{combo_value_id:combo_value_id,combo_area_id:combo_area_id, start:0,limit:25});
                    Ext.getCmp('prenom_grid').store.loadData(resultUnidadF.rows);

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
App.RegisterFunction('ReporteIndicadoresGestionar', new ReporteIndicadoresGestionar());

