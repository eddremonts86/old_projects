Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel',
            'Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function Cumpli_Plan(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Cumplimiento del Plan',
            id: 'Cumpli_Plan_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store_primer = App.BuildJsonStore('Cumpli_Plan.Cumpli_Plan.primer',{
            fields: [
            {name: 'id'},
            {name: 'evento'},
            {name: 'cap_plan'},
            {name: 'acciones'},
            {name: 'part_cuadros'},
            {name: 'part_trabaj'},
            {name: 'acciones_terminadas'},
            {name: 'part_term_real_cuadros'},
            {name: 'part_term_real_trabaj'},
            {name: 'acciones_continuan'},
            {name: 'part_acci_real_cuadros'},
            {name: 'part_acci_real_trabj'},
            {name: 'accion_extrapolan'},
            {name: 'part_accion_ext_cuadros'},
            {name: 'part_accion_ext_trabj'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            params:{start:0,limit:10},
            pageSize : 10,
            groupField : 'cap_plan',
            autoLoad: true
            });
        this.__data_store_segundo = App.BuildJsonStore('Cumpli_Plan.Cumpli_Plan.segundo',{
            fields: [
            {name: 'id'},
            {name: 'evento'},
            {name: 'cap_plan'},
            {name: 'acciones'},
            {name: 'part_cuadros'},
            {name: 'part_trabaj'},
            {name: 'acciones_terminadas'},
            {name: 'part_term_real_cuadros'},
            {name: 'part_term_real_trabaj'},
            {name: 'acciones_continuan'},
            {name: 'part_acci_real_cuadros'},
            {name: 'part_acci_real_trabj'},
            {name: 'accion_extrapolan'},
            {name: 'part_accion_ext_cuadros'},
            {name: 'part_accion_ext_trabj'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            params:{start:0,limit:10},
            pageSize : 10,
            groupField : 'cap_plan',
            autoLoad: true
            });
        this.__data_store_tercer = App.BuildJsonStore('Cumpli_Plan.Cumpli_Plan.tercer',{
            fields: [
            {name: 'id'},
            {name: 'evento'},
            {name: 'cap_plan'},
            {name: 'acciones'},
            {name: 'part_cuadros'},
            {name: 'part_trabaj'},
            {name: 'acciones_terminadas'},
            {name: 'part_term_real_cuadros'},
            {name: 'part_term_real_trabaj'},
            {name: 'acciones_continuan'},
            {name: 'part_acci_real_cuadros'},
            {name: 'part_acci_real_trabj'},
            {name: 'accion_extrapolan'},
            {name: 'part_accion_ext_cuadros'},
            {name: 'part_accion_ext_trabj'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            params:{start:0,limit:10},
            pageSize : 10,
            groupField : 'cap_plan',
            autoLoad: true
            });
        this.__data_store_cuarto = App.BuildJsonStore('Cumpli_Plan.Cumpli_Plan.cuarto',{
            fields: [
            {name: 'id'},
            {name: 'evento'},
            {name: 'cap_plan'},
            {name: 'acciones'},
            {name: 'part_cuadros'},
            {name: 'part_trabaj'},
            {name: 'acciones_terminadas'},
            {name: 'part_term_real_cuadros'},
            {name: 'part_term_real_trabaj'},
            {name: 'acciones_continuan'},
            {name: 'part_acci_real_cuadros'},
            {name: 'part_acci_real_trabj'},
            {name: 'accion_extrapolan'},
            {name: 'part_accion_ext_cuadros'},
            {name: 'part_accion_ext_trabj'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            params:{start:0,limit:10},
            pageSize : 10,
            groupField : 'cap_plan',
            autoLoad: true
            });
        this.__data_store_resumenes = App.BuildJsonStore('Cumpli_Plan.Cumpli_Plan.resumenes',{
            fields: [
            {name: 'id'},
            {name: 'evento'},
            {name: 'cap_plan'},
            {name: 'acciones'},
            {name: 'part_cuadros'},
            {name: 'part_trabaj'},
            {name: 'acciones_terminadas'},
            {name: 'part_term_real_cuadros'},
            {name: 'part_term_real_trabaj'},
            {name: 'acciones_continuan'},
            {name: 'part_acci_real_cuadros'},
            {name: 'part_acci_real_trabj'},
            {name: 'accion_extrapolan'},
            {name: 'part_accion_ext_cuadros'},
            {name: 'part_accion_ext_trabj'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            params:{start:0,limit:10},
            pageSize : 10,
            groupField : 'cap_plan',
            autoLoad: true
            });

        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Capítulo: {name} ({rows.length} Evento{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            ftype: 'grouping'
        });
        var groupingFeature1 = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Capítulo: {name} ({rows.length} Evento{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            ftype: 'grouping'
        });
        var groupingFeature2 = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Capítulo: {name} ({rows.length} Evento{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            ftype: 'grouping'
        });
        var groupingFeature3 = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Capítulo: {name} ({rows.length} Evento{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            ftype: 'grouping'
        });
        var groupingFeature4 = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Capítulo: {name} ({rows.length} Evento{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            ftype: 'grouping'
        });

        var primer = Ext.create('Ext.grid.Panel', {
            store:this.__data_store_primer ,
            id:'primer',
            columnLines: true,
            name:'primer',
            features: [groupingFeature],
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            columns:[
                { text: 'Tipo de<br> Actividad',  dataIndex: 'evento', flex: 1},
                { text: 'Acciones <br>Planificadas', dataIndex: 'acciones', flex: 1,editor: {allowBlank: false} },
                {
                text: 'Participantes<br> planificados en el año',
                    columns: [
                { text: 'Cuadros',dataIndex: 'part_cuadros', width:70,editor: {allowBlank: false}},
                { text: 'Trabajadores',dataIndex: 'part_trabaj', width:100,editor: {allowBlank: false} }
                    ]
                },
                {text: 'Trimestre',
                  columns: [
                { text: 'Acciones<br> Terminadas (Real)', dataIndex: 'acciones_terminadas', width:90,editor: {allowBlank: false}},
                {text: 'Participantes (Real)',
                      columns: [
                          { text: 'Cuadros',dataIndex: 'part_term_real_cuadros', width:70,editor: {allowBlank: false} },
                          { text: 'Trabajadores',dataIndex: 'part_term_real_trabaj', width:100,editor: {allowBlank: false}}
                ]},
                { text: 'Acciones que <br>continuan (Real)', dataIndex: 'acciones_continuan', width:120,editor: {allowBlank: false}},
                {text: 'Participantes (Real)',
                          columns: [
                              { text: 'Cuadros',dataIndex: 'part_acci_real_cuadros', width:70,editor: {allowBlank: false} },
                              { text: 'Trabajadores',dataIndex: 'part_acci_real_trabj', width:100,editor: {allowBlank: false}}
                          ]},
                { text: 'Acciones<br> Extraplan', dataIndex: 'accion_extrapolan',width:90,editor: {allowBlank: false}},
                {text: 'Participantes Extraplan',
                          columns: [
                              { text: 'Cuadros',dataIndex: 'part_accion_ext_cuadros', width:70,editor: {allowBlank: false} },
                              { text: 'Trabajadores',dataIndex: 'part_accion_ext_trabj',width:100,editor: {allowBlank: false} }
                          ]}
                 ]
              }
            ],
            bbar: [
                {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                id:'bbar_primer',
                name:'bbar_primer',
                store: this.__data_store_primer,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },'->',
                {
                xtype: 'button',
                text : 'Guardar',
                id:'btn_primero',
                cls:'btn',
                handler:function( This, eOpts){
                    var mydd = This.up('grid').getStore().getModifiedRecords();
                    var capitulo = Ext.getCmp('primer').title;
                   _array = new Array();
                    if (mydd.length === 0)
                    { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                    else
                    {
                        for (var i = 0; i < mydd.length; i++)
                        {
                            _array.push(mydd[i].getData());
                        }
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('Cumpli_Plan.Cumpli_Plan.Add', {data: Ext.encode(_array)});
                            App.HideMsgBox();
                            if(_result)
                            {
                                This.up('grid').getStore().load();
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                                App.InfoMessage('Información', 'Ocurrio un error');
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                    }
                }
               }
            ]
        });
        var primertrimestre = new Ext.Panel({
            title: '1er Trimestre',
            border: true,
            frame: true,
            id:'primertrimestre',
            name:'primertrimestre',
            layout:'fit',
            margin: '5 5 5',
            autoScroll:true,
            items: [primer]
        });

        var segundo = Ext.create('Ext.grid.Panel', {
            store:this.__data_store_segundo ,
            id:'segundo',
            name:'segundo',  columnLines: true,
            features: [groupingFeature1],
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            columns:[
                { text: 'Tipo de<br> Actividad',  dataIndex: 'evento', flex: 1},
                { text: 'Acciones <br>Planificadas', dataIndex: 'acciones', flex: 1,editor: {allowBlank: false} },
                {
                    text: 'Participantes<br> planificados en el año',
                    columns: [
                        { text: 'Cuadros',dataIndex: 'part_cuadros', width:70,editor: {allowBlank: false}},
                        { text: 'Trabajadores',dataIndex: 'part_trabaj', width:100,editor: {allowBlank: false} }
                    ]
                },
                {text: 'Trimestre',
                    columns: [
                        { text: 'Acciones<br> Terminadas (Real)', dataIndex: 'acciones_terminadas', width:90,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_term_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_term_real_trabaj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones que <br>continuan (Real)', dataIndex: 'acciones_continuan', width:120,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_acci_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_acci_real_trabj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones<br> Extraplan', dataIndex: 'accion_extrapolan',width:90,editor: {allowBlank: false}},
                        {text: 'Participantes Extraplan',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_accion_ext_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_accion_ext_trabj',width:100,editor: {allowBlank: false} }
                            ]}
                    ]
                }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                id:'bbar_segundo',
                name:'bbar_segundo',
                store: this.__data_store_segundo,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },'->',{
                xtype: 'button',
                text : 'Guardar',
                id:'btn_segundo',
                cls:'btn',
                handler:function( This, eOpts){
                    var mydd = This.up('grid').getStore().getModifiedRecords();
                    var capitulo = Ext.getCmp('segundo').title;
                    _array = new Array();
                    if (mydd.length === 0)
                    { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                    else
                    {
                        for (var i = 0; i < mydd.length; i++)
                        {
                            _array.push(mydd[i].getData());
                        }
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('Cumpli_Plan.Cumpli_Plan.Add', {data: Ext.encode(_array)});
                            App.HideMsgBox();
                            if(_result)
                            {
                                This.up('grid').getStore().load();
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                                App.InfoMessage('Información', 'Ocurrio un error');
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                    }
                }}
            ]
        });
        var segundotrimestre = new Ext.Panel({
            title: '2do Trimestre',
            border: true,
            frame: true,
            id:'st',
            name:'st',
            layout:'fit',
            margin: '5 5 5',
            autoScroll:true,
            items: [segundo]
        });

        var tercer = Ext.create('Ext.grid.Panel', {
            store:this.__data_store_tercer ,
            id:'tercer',
            name:'tercer',  columnLines: true,
            features: [groupingFeature2],
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            columns:[
                { text: 'Tipo de<br> Actividad',  dataIndex: 'evento', flex: 1},
                { text: 'Acciones <br>Planificadas', dataIndex: 'acciones', flex: 1,editor: {allowBlank: false} },
                {
                    text: 'Participantes<br> planificados en el año',
                    columns: [
                        { text: 'Cuadros',dataIndex: 'part_cuadros', width:70,editor: {allowBlank: false}},
                        { text: 'Trabajadores',dataIndex: 'part_trabaj', width:100,editor: {allowBlank: false} }
                    ]
                },
                {text: 'Trimestre',
                    columns: [
                        { text: 'Acciones<br> Terminadas (Real)', dataIndex: 'acciones_terminadas', width:90,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_term_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_term_real_trabaj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones que <br>continuan (Real)', dataIndex: 'acciones_continuan', width:120,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_acci_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_acci_real_trabj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones<br> Extraplan', dataIndex: 'accion_extrapolan',width:90,editor: {allowBlank: false}},
                        {text: 'Participantes Extraplan',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_accion_ext_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_accion_ext_trabj',width:100,editor: {allowBlank: false} }
                            ]}
                    ]
                }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_tercer,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },'->',{
                xtype: 'button',
                text : 'Guardar',
                cls:'btn',
                handler:function( This, eOpts){
                    var mydd = This.up('grid').getStore().getModifiedRecords();
                    var capitulo = Ext.getCmp('tercer').title;
                    _array = new Array();
                    if (mydd.length === 0)
                    { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                    else
                    {
                        for (var i = 0; i < mydd.length; i++)
                        {
                            _array.push(mydd[i].getData());
                        }
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('Cumpli_Plan.Cumpli_Plan.Add', {data: Ext.encode(_array)});
                            App.HideMsgBox();
                            if(_result)
                            {
                                This.up('grid').getStore().load();
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                                App.InfoMessage('Información', 'Ocurrio un error');
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                    }
                }}
            ]
        });
        var tercertrimestre = new Ext.Panel({
            title: '3er Trimestre',
            border: true,
            frame: true,
            id:'tt',
            name:'tt',
            layout:'fit',
            margin: '5 5 5',
            autoScroll:true,
            items: [tercer]
        });

        var cuarto = Ext.create('Ext.grid.Panel', {
            store:this.__data_store_cuarto ,
            id:'cuarto',
            name:'cuarto',  columnLines: true,
            features: [groupingFeature3],
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            columns:[
                { text: 'Tipo de<br> Actividad',  dataIndex: 'evento', flex: 1},
                { text: 'Acciones <br>Planificadas', dataIndex: 'acciones', flex: 1,editor: {allowBlank: false} },
                {
                    text: 'Participantes<br> planificados en el año',
                    columns: [
                        { text: 'Cuadros',dataIndex: 'part_cuadros', width:70,editor: {allowBlank: false}},
                        { text: 'Trabajadores',dataIndex: 'part_trabaj', width:100,editor: {allowBlank: false} }
                    ]
                },
                {text: 'Trimestre',
                    columns: [
                        { text: 'Acciones<br> Terminadas (Real)', dataIndex: 'acciones_terminadas', width:90,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_term_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_term_real_trabaj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones que <br>continuan (Real)', dataIndex: 'acciones_continuan', width:120,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_acci_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_acci_real_trabj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones<br> Extraplan', dataIndex: 'accion_extrapolan',width:90,editor: {allowBlank: false}},
                        {text: 'Participantes Extraplan',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_accion_ext_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_accion_ext_trabj',width:100,editor: {allowBlank: false} }
                            ]}
                    ]
                }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_cuarto,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },'->',{
                xtype: 'button',
                text : 'Guardar',
                cls:'btn',
                handler:function( This, eOpts){
                    var mydd = This.up('grid').getStore().getModifiedRecords();
                    var capitulo = Ext.getCmp('cuarto').title;
                    _array = new Array();
                    if (mydd.length === 0)
                    { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                    else
                    {
                        for (var i = 0; i < mydd.length; i++)
                        {
                            _array.push(mydd[i].getData());
                        }
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('Cumpli_Plan.Cumpli_Plan.Add', {data: Ext.encode(_array)});
                            App.HideMsgBox();
                            if(_result)
                            {
                                This.up('grid').getStore().load();
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                                App.InfoMessage('Información', 'Ocurrio un error');
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                    }
                }}
            ]
        });
        var cuartotrimestre = new Ext.Panel({
            title: '4to Trimestre',
            border: true,
            id:'ct',
            name:'ct',
            frame: true,
            layout:'fit',
            margin: '5 5 5',
            autoScroll:true,
            items: [cuarto]
        });

        var resumen = Ext.create('Ext.grid.Panel', {
            store:this.__data_store_resumenes ,
            id:'r',
            name:'r',  columnLines: true,
            features: [groupingFeature4],
            columns:[
                { text: 'Tipo de<br> Actividad',  dataIndex: 'evento', flex: 1},
                { text: 'Acciones <br>Planificadas', dataIndex: 'acciones', flex: 1,editor: {allowBlank: false} },
                {
                    text: 'Participantes<br> planificados en el año',
                    columns: [
                        { text: 'Cuadros',dataIndex: 'part_cuadros', width:70,editor: {allowBlank: false}},
                        { text: 'Trabajadores',dataIndex: 'part_trabaj', width:100,editor: {allowBlank: false} }
                    ]
                },
                {text: 'Trimestre',
                    columns: [
                        { text: 'Acciones<br> Terminadas (Real)', dataIndex: 'acciones_terminadas', width:90,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_term_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_term_real_trabaj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones que <br>continuan (Real)', dataIndex: 'acciones_continuan', width:120,editor: {allowBlank: false}},
                        {text: 'Participantes (Real)',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_acci_real_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_acci_real_trabj', width:100,editor: {allowBlank: false}}
                            ]},
                        { text: 'Acciones<br> Extraplan', dataIndex: 'accion_extrapolan',width:90,editor: {allowBlank: false}},
                        {text: 'Participantes Extraplan',
                            columns: [
                                { text: 'Cuadros',dataIndex: 'part_accion_ext_cuadros', width:70,editor: {allowBlank: false} },
                                { text: 'Trabajadores',dataIndex: 'part_accion_ext_trabj',width:100,editor: {allowBlank: false} }
                            ]}
                    ]
                }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_resumenes,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }]
        });
        var resumenanual = new Ext.Panel({
            title: 'Resumen Anual',
            border: true,
            frame: true,
            id:'ra',
            name:'ra',
            layout:'fit',
            margin: '5 5 5',
            autoScroll:true,
            items: [resumen]
        });

        var tabs = Ext.create('Ext.tab.Panel', {
            activeTab: 0,
            height: App.GetDesktopHeigth()-25,
            width: App.GetDesktopWidth(),
            items: [primertrimestre,segundotrimestre,tercertrimestre,cuartotrimestre,resumenanual]
        })
        var _panel = new Ext.Panel({
            title:'Cumplimiento del Plan de superación',
            border:true,
            frame:true,
            layout:'border',
            height:App.GetDesktopHeigth(),
            width :'100%',
            items:[tabs],
            listeners: {
                afterrender: function(){},
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
App.RegisterModule('Cumpli_Plan', new Cumpli_Plan());