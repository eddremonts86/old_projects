function Vacaciones(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Vacaciones =
        {
            text: 'Reporte de Submayor de Vacaciones',
            id: 'Vacaciones_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Operaciones', 'Nominas de Vacaciones', _menu_item_config_Vacaciones);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        var __Imprimir = App.BuildJsonStore('Vacaciones.Vacaciones.DatosXPersona',
            {
                    fields : [{name : 'html'},{name : 'key'}],
                    proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                    autoLoad: true,
                    listeners:{
                        load:function(store, records,opt){
//                                    var a = window.open('','','menubar=yes');
//                                    a.document.write(store.getAt(0).data.html);
//                                    a.document.close();
//                            Ext.getCmp('panel_vacaciones_id').update(store.getAt(0).data.html);
                        }
                    }
            });
            //__Imprimir.load();
        this.imprime = Ext.create('Ext.Button', {
            xtype: 'button',
            cls: 'btnB',
            id: 'imprime_vacaciones',
            text: 'Imprimir',
            listeners: {
                click: function () {
                    var a = window.open('','','menubar=yes');
                        a.document.write(__Imprimir.getAt(0).data.html);
                        a.document.close();
                }
        }});
            
        this.__data_store = App.BuildJsonStore('Vacaciones.Vacaciones.LoadData',{
            fields: [
                {name: 'id_contrato'},
                {name: 'foto'},
                {name: 'trab_id'},
                {name: 'nombre_completo'},
                {name: 'cargo'},
                {name: 'dias_vacaciones'},
                {name: 'importe_vacaciones'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
            });
        var _grid = new Ext.grid.Panel({
            id: 'Vacaciones_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '60%',
            region: 'center',
            frame: true,
            plugins:[Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            store: this.__data_store,
            columns: [
                {header: 'Foto',locked: true,dataIndex: 'foto',align: 'center',width: 80,
                    renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                        if(value == '' || value == null)
                            return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                        else
                            return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';                
                    }
                },
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre_completo',flex: 3},                
                {header: 'Cargo',menuDisabled: true,sortable : false,dataIndex: 'cargo',flex: 1},
                {header: 'Dias Acumulados',menuDisabled: true,sortable : false,dataIndex: 'dias_vacaciones',flex: 1, editor: {allowBlank: false}},
                {header: 'Importe Acumulado',menuDisabled: true,sortable : false,dataIndex: 'importe_vacaciones',flex: 1, editor: {allowBlank: false}},
                
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Vacaciones_tbar_id',
                items: [
                    this.imprime,
                {
                    xtype: 'button',
                    cls: 'btnB',
                    id: 'actualizar_acumulado',
                    text: 'Actualizar',
                    listeners: {
                        click: function () {
                            this.__data_store.load();
                            __Imprimir.load();
                            Ext.getCmp('resumen').update("");
                        },
                        scope:this
                    } 
                }],
                height: 28
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store
                //displayInfo: true,
                //plugins: new Ext.ux.ProgressBarPager()
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('VacacionesGestionar');
                        }
                        else
                        {
                          this.Enable('VacacionesGestionar');
                          var _selectionModel = Ext.getCmp('Vacaciones_grid_id').getSelectionModel();
                          var _selected_rcd = _selectionModel.getLastSelected();
                          var img = '';
                          if(_selected_rcd.data.foto == '' || _selected_rcd.data.foto == null)
                                img = "<input type='button' style='border: 0;width: 70px; height: 70px; background: url(\"SubSystems/Plantilla/Config/Client/icons/user3.png\") no-repeat;' />";
                            else
                                img = "<img width='70px' height='70px' src='data:image/png;base64,"+_selected_rcd.data.foto+"'/>"; 
                          
                          var record = __Imprimir.findRecord('key',_selected_rcd.data.id_contrato,0,true,true,true);
                          console.log(record);
                          var html = "";
                          Ext.getCmp('resumen').update("");
                          var inf = "";
                          if(record != null){
                              inf = record.data.html;
                          }
                              html = "<div style='width:100%;height:100%;background-color:none;border-radius:10px 10px 0 0;border:1px solid #157FCC'>\n\
                                        <div class='x-window-header-text-container-default' style='padding:10px;height:40px !important;background-color:#fff;border:none;border-radius:50px 10px 50px 0;top:-1px;border-top:1px solid #3892D3 !important;border-bottom:1px solid #3892D3 !important'>SubMayor de Vacaciones de <i>"+_selected_rcd.data.nombre_completo+"</i></div>\n\
                                        <div style='padding:10px;border-bottom:1px solid #3892D3;height:120px'>\n\
                                           <div style='width:80px;height:80px;float:left'>"+img+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Nombre Completo</b>: "+_selected_rcd.data.nombre_completo+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Cargo</b>: "+_selected_rcd.data.cargo+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Dias Acumulados</b>: "+_selected_rcd.data.dias_vacaciones+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Importe Acumulado</b>: "+_selected_rcd.data.importe_vacaciones+"</div>\n\
                                        </div>"+inf+"\n\
                                      </div>";
                            Ext.getCmp('resumen').update(html);
                         
//                          var resumen=_selected_rcd.data.resumen;
//                          var cuerpo=_selected_rcd.data.cuerpo;
//                          Ext.getCmp('cuerpo').setValue(cuerpo);
//                          Ext.getCmp('resumen').setValue(resumen);
                        }
                    },
                    scope: this
                }
            }
        });
        var datos = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,
            width: '40%',
            id: 'resumen',
            title: 'Resumen de Submayor',
            region: 'east',
            collapsed : false,
            collapsible : true,
            tools:[
                {type:'print',
                 tooltip:'Imprimir Resumen de Submayor',
                 handler:function(){
                          var _selectionModel = Ext.getCmp('Vacaciones_grid_id').getSelectionModel();
                          var _selected_rcd = _selectionModel.getLastSelected();
                          var img = '';
                          if(_selected_rcd.data.foto == '' || _selected_rcd.data.foto == null)
                                img = "<input type='button' style='border: 0;width: 70px; height: 70px; background: url(\"SubSystems/Plantilla/Config/Client/icons/user3.png\") no-repeat;' />";
                            else
                                img = "<img width='70px' height='70px' src='data:image/png;base64,"+_selected_rcd.data.foto+"'/>"; 
                          
                          var record = __Imprimir.findRecord('key',_selected_rcd.data.id_contrato,0,true,true,true);
                          console.log(record);
                          var html = "";
                          var inf = "";
                          if(record != null){
                              inf = record.data.html;
                          }
                              html = "<div style='width:600px;height:100%;background-color:none;border-radius:10px 10px 0 0;border:1px solid #157FCC'>\n\
                                        <div class='x-window-header-text-container-default' style='padding:10px;height:20px !important;background-color:#fff;border:none;border-radius:50px 10px 50px 0;top:-1px;border-top:1px solid #3892D3 !important;border-bottom:1px solid #3892D3 !important'>SubMayor de Vacaciones de <i>"+_selected_rcd.data.nombre_completo+"</i></div>\n\
                                        <div style='padding:10px;border-bottom:1px solid #3892D3;height:120px'>\n\
                                           <div style='width:80px;height:80px;float:left'>"+img+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Nombre Completo</b>: "+_selected_rcd.data.nombre_completo+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Cargo</b>: "+_selected_rcd.data.cargo+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Dias Acumulados</b>: "+_selected_rcd.data.dias_vacaciones+"</div>\n\
                                           <div style='padding:2px;width:80%;height:20px;float:left;border-bottom:1px solid #3892D3'><b>Importe Acumulado</b>: "+_selected_rcd.data.importe_vacaciones+"</div>\n\
                                        </div>"+inf+"\n\
                                      </div>";                            
                    var a = window.open('','','menubar=yes');
                        a.document.write(html);
                        a.document.close();
                }}
            ],
            items: []
        });
        var _panel = new Ext.Panel({
            title: 'Submayor de Vacaciones',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid,datos],
            listeners: {
                afterrender: function() {
                    this.__data_store.load({
                        params:{
                            start:0, 
                            limit:25
                        }
                    });
                },
                scope : this
            }
        });
        return _panel;


    }
    // ========================================================================//
    this.Free = function()
    {
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Vacaciones', new Vacaciones());