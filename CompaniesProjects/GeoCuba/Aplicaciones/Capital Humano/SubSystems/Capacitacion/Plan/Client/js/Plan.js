Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
function Plan(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Plan de superación',
            id: 'Plan_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Codificadores',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Plan.Plan.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'tipo'}

            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
            });
        this.__data_store_cap = App.BuildJsonStore('Plan.Plan.capitulos',{
            fields: [
                {name: 'id'},
                {name: 'cap_plan'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'cap_plan', direction: 'ASC'},
            autoLoad: true
        });
        var capitulos_plan = Ext.create('Ext.grid.Panel', {
            title: 'Capítulos del plan',
            store: this.__data_store_cap,
            id:'capitulos_creaados',
            name:'capitulos_creaados',
            columnLines: true,
            border:2,
            autoScroll:true,
            columns: [ { text: 'Capítulo', dataIndex: 'cap_plan', flex: 1 }],
            height: 360,
            width: '100%',
            tools:[{
                    type:'refresh',
                    handler:function(){Ext.getCmp('capitulos_creaados').store.load()}
                    },
                    {
                        type:'minus',
                        handler:function(){
                            var _selectionModel = Ext.getCmp('capitulos_creaados').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var cap_plan = _selected_rcd.data.cap_plan;
                            var mistab = Ext.getCmp('mistab')
                            var fnCallBack = function() {
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var tab = Ext.getCmp('cap'+cap_plan);
                                mistab.remove(tab);
                                var result = App.PerformSyncServerRequest('Plan.Plan.delCap',{id:cap_plan});
                                App.HideMsgBox();
                                if(result)
                                {
                                    Ext.getCmp('capitulos_creaados').getStore().load()
                                    App.InfoMessage('Información', 'Se elimino satisfactoriamente el capítulo');
                                }
                                else
                                    App.InfoMessage('Información', 'Ocurrio un error');
                            }
                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar  el capítulo "'+cap_plan+'"?');

                        }
                    }

            ]
        });
        var store=App.PerformSyncServerRequest('Plan.Plan.capitulos');
        var dataos = [];
        for(var i=0; i<store.rows.length;i++){
            var area=store.rows[i]['cap_plan'];
            this.__data_store1 = App.BuildJsonStore('Plan.Plan.CargarDatos1',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre'},
                    {name: 'denominacion'},
                    {name: 'fecha_inicio'},
                    {name: 'facha_fin'},
                    {name: 'participan'},
                    {name: 'frecuencia'},
                    {name: 'salario_mn'},
                    {name: 'otros_mn'},
                    {name: 'cuc'},
                    {name: 'eventoid'},
                    {name: 'inst_imparte'},
                    {name: 'cap_plan'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                params: {area: area},
                sorters: {property: 'nombre', direction: 'DESC'},
                autoLoad: true
            });
            var _grid = new Ext.grid.Panel({
                id:'cap'+area,
                name:'cap'+area,
                title:area,
                height:'90%',columnLines: true,
                width: '99%',
                region: 'center',
                frame: true,
                plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                store: this.__data_store1,
                columns: [
                    {header: 'Tipo <br/>de<br/> Actividad',menuDisabled: true,sortable : false,flex: 3,dataIndex: 'nombre',
                        editor: new Ext.form.field.ComboBox({
                            triggerAction: 'all',
                            queryMode:'local',
                            store: this.__data_store,
                            displayField: 'nombre',
                            valueField: 'nombre'
                        })
                    },
                    {header: 'Denominación de <br/> la actividad <br/> de superación',menuDisabled: true,sortable : false,dataIndex: 'denominacion',flex: 5,
                        editor: {allowBlank: false}},
                    {header: 'Fecha de inicio',menuDisabled: true,sortable : false,dataIndex: 'fecha_inicio',flex: 3,
                        editor:{
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: 'From',
                            name: 'from_date',
                            format: 'Y-m-d'

                        }},
                    {header: 'Fecha de fin',menuDisabled: true,sortable : false,dataIndex: 'facha_fin',flex: 3,
                        editor:{
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: 'From',
                            name: 'from_date'
                        }
                    },
                    {header: 'Total de <br/>Participantes <br/>Planificados',menuDisabled: true,sortable : false,dataIndex: 'participan',flex: 3,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0,
                            maxValue: 100000
                        }},
                    {header: 'Frecuencia de <br/>impartición<br> en Horas/Clases',menuDisabled: true,sortable : false,dataIndex: 'frecuencia',flex: 3,  editor: {
                        xtype: 'numberfield',
                        allowBlank: false,
                        minValue: 0,
                        maxValue: 100000
                    }},
                    {header: 'cap_plan',dataIndex: 'cap_plan',flex: 0,hidden : true},
                    {header: 'Total de <br/>gastos <br/> MN Salario',menuDisabled: true,sortable : false,dataIndex: 'salario_mn',flex: 2,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0,
                            maxValue: 100000
                        }},
                    {header: 'Total de <br/>gastos <br/>MN Otros',menuDisabled: true,sortable : false,dataIndex: 'otros_mn',flex: 2,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0,
                            maxValue: 100000
                        }},
                    {header: 'Total de <br/>gastos <br/>CUC',menuDisabled: true,sortable : false,dataIndex: 'cuc',flex: 2,
                        editor: {
                            xtype: 'numberfield',
                            allowBlank: false,
                            minValue: 0,
                            maxValue: 100000
                        }},
                    {header: 'Institución que <br/>imparte la <br/>Actividad',menuDisabled: true,sortable : false,dataIndex: 'inst_imparte',flex: 5, editor: {allowBlank: false}}
                ],
                viewConfig: {forceFit: true},
                bbar:{
                    id:'Plan_tbar_id'+area,
                    height: 28,
                    items: [
                        {
                            xtype: 'pagingtoolbar',
                            pageSize: 10,
                            store:this.__data_store1,
                            displayInfo: true,
                            plugins: new Ext.ux.ProgressBarPager()
                        },
                        ('->'),
                        {
                            xtype: 'button',
                            //text : 'Ayuda',
                            iconCls:'help',
                            handler:function(){
                                Ext.create('Ext.window.Window', {
                                    title: '¿Necesita Ayuda?',
                                    height:'25%',
                                    width:'55%',
                                    iconCls:'help',modal:true,
                                    autoScroll:true,
                                    layout: 'anchor',
                                    html:
                                        '<ul class="nav nav-list">' +
                                            '<li>El modulo <span class="label label-info">" Clacificaci&oacute;n Cientifica"</span>' +
                                            ' le permite gestionar las clacificaci&oacute;n cientifica de los trabajadores.<br>' +
                                            '</li>' +
                                            '</ul>'

                                }).show();
                            }
                        },
                        {
                            text: 'Adicionar',
                            id: 'boton'+area,
                            name: 'boton'+area,
                            tooltip : 'Adiciona un  nuevo Clasificaci&oacute;n Cientifica',
                            iconCls: 'add',
                            xtype:'button',
                            cls:'btn',
                            listeners:{
                                click:function( This, eOpts ){
                                    var capitulo = This.up('grid').title;
                                    //console.log(capitulo);
                                    Ext.define('FILA',{
                                        extend: 'Ext.data.Model',
                                        fields: [
                                            {name: 'id'},
                                            {name: 'nombre'},
                                            {name: 'denominacion'},
                                            {name: 'fecha_inicio'},
                                            {name: 'facha_fin'},
                                            {name: 'participan'},
                                            {name: 'frecuencia'},
                                            {name: 'salario_mn'},
                                            {name: 'otros_mn'},
                                            {name: 'cuc'},
                                            {name: 'inst_imparte'},
                                            {name: 'cap_plan'}
                                        ]
                                    });
                                    var record = new FILA({nombre:'',denominacion:'',fecha_inicio:'',facha_fin:'',participan:'',frecuencia:'',salario_mn : '',otros_mn : '',cuc : '',inst_imparte : '',cap_plan:capitulo});
                                    This.up('grid').getStore().add(record);
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            cls:'btn',
                            id: 'boton_guardar'+area,
                            name: 'boton_guardar'+area,
                            iconCls: 'save',
                            text : 'Guardar Información',
                            handler:function( This, eOpts){
                                var mydd =new Array();
                                _array = new Array();
                                var mydd = This.up('grid').getStore().getModifiedRecords();
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
                                        var _result = App.PerformSyncServerRequest('Plan.Plan.Add', {data: Ext.encode(_array)});
                                        App.HideMsgBox();
                                        if(_result)
                                        {
                                            Ext.getCmp('cap'+area).getStore().load({area: area})
                                            Ext.getCmp('capitulos_creaados').getStore().load()
                                            App.InfoMessage('Información', 'Capítulo adicionado satisfactoriamente');
                                        }
                                        else
                                        {
                                            Ext.getCmp('cap'+area).getStore().load({area: area})
                                            App.InfoMessage('Información', 'Ocurrio un error');
                                        }
                                    }
                                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                }


                            }
                        },
                        {
                            text: 'Eliminar',
                            id: 'Eliminar'+area,
                            name: 'Eliminar'+area,
                            tooltip : 'Eliminar una fila',
                            iconCls: 'del_item',
                            xtype:'button',
                            cls:'btn',
                            handler:function(This){
                                var _selectionModel = This.up('grid').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                var id = _selected_rcd.data.id;
                                var cap_plan = _selected_rcd.data.cap_plan;
                                var record = _selected_rcd ;
                                if(id == null || id==''){
                                     This.up('grid').store.remove(record);}
                                else{
                                    var fnCallBack = function()   {
                                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                        var _result = App.PerformSyncServerRequest('Plan.Plan.Eliminar', {id:id});
                                        App.HideMsgBox();
                                        if(_result)
                                        {
                                            This.up('grid').store.remove(record);
                                            App.InfoMessage('Información', 'Ha eliminado una acción del capítulo <b>"'+cap_plan+'"</b>');
                                        }
                                        else
                                        {
                                            Ext.getCmp('cap'+area).getStore().load({area: area})
                                            App.InfoMessage('Información', 'Ocurrio un error');
                                        }
                                    }
                                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');




                                }
                            }
                        }
                    ]
                },
                listeners: {
                    selectionchange: {
                        fn: function(View, selections, options) {
                            if(selections.length == 0){
                                this.Disable('PlanGestionar');
                            }
                            else
                            {
                                this.Enable('PlanGestionar');
                            }

                        },
                        scope: this
                    }
                }
            });
            dataos[i]=_grid;
        }
        var add =  {
            items: [
                    {
                        xtype: 'textfield',
                        name: 'cap',
                        id: 'cap',
                        width:'100%',
                        emptyText:'Nombre del nuevo capítulo',
                        allowBlank: false
                    },
                    {
                        xtype: 'button',
                        text : 'Crear Capítulo',
                        cls:'btn btn-info',
                        handler:function(){
                            var cap = Ext.getCmp('cap').getValue();
                            if(cap!=""&& cap!=null){
                            var mistab = Ext.getCmp('mistab')
                            this.__data_store_eventos = App.BuildJsonStore('Plan.Plan.CargarDatos',{
                                fields: [
                                    {name: 'id'},
                                    {name: 'nombre'},
                                    {name: 'tipo'}

                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                autoLoad: true
                            });
                            this.__data_store1 = App.BuildJsonStore('Plan.Plan.CargarDatos1',{
                                fields: [
                                    {name: 'id'},
                                    {name: 'nombre'},
                                    {name: 'denominacion'},
                                    {name: 'fecha_inicio'},
                                    {name: 'facha_fin'},
                                    {name: 'participan'},
                                    {name: 'frecuencia'},
                                    {name: 'salario_mn'},
                                    {name: 'otros_mn'},
                                    {name: 'cuc'},
                                    {name: 'eventoid'},
                                    {name: 'inst_imparte'},
                                    {name: 'cap_plan'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                params: {area: cap},
                                autoLoad: false
                            });
                            var _grid = new Ext.grid.Panel({
                                    id:'grid__'+cap,
                                    name:'grid__'+cap,
                                    title:cap,
                                    height: App.GetDesktopHeigth() - 65,
                                    width: '100%',
                                    region: 'center',
                                    frame: true,
                                    plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                                    store:  this.__data_store1,
                                    columns: [
                                        {header: 'Tipo <br/>de<br/> Actividad',menuDisabled: true,sortable : false,flex: 5,dataIndex: 'nombre',
                                            editor: new Ext.form.field.ComboBox({
                                                triggerAction: 'all',
                                                queryMode:'local',
                                                store: this.__data_store_eventos,
                                                displayField: 'nombre',
                                                valueField: 'nombre'
                                            })
                                        },
                                        {header: 'Denominación de <br/> la actividad <br/> de superación',menuDisabled: true,sortable : false,dataIndex: 'denominacion',flex: 5,editor: {allowBlank: false}},

                                        {header: 'Fecha de inicio',menuDisabled: true,sortable : false,dataIndex: 'fecha_inicio',flex: 5,
                                            editor:{
                                                xtype: 'datefield',
                                                anchor: '100%',
                                                fieldLabel: 'From',
                                                name: 'from_date'

                                            }},
                                        {header: 'Fecha de fin',menuDisabled: true,sortable : false,dataIndex: 'facha_fin',flex: 5,
                                            editor:{
                                                xtype: 'datefield',
                                                anchor: '100%',
                                                fieldLabel: 'From',
                                                name: 'from_date'
                                            }},

                                        {header: 'Total de <br/>Participantes <br/>Planificados',menuDisabled: true,sortable : false,dataIndex: 'participan',flex: 5,
                                            editor: {
                                                xtype: 'numberfield',
                                                allowBlank: false,
                                                minValue: 0,
                                                maxValue: 100000
                                            }},
                                        {header: 'Frecuencia de <br/>impartición',menuDisabled: true,sortable : false,dataIndex: 'frecuencia',flex: 5, editor: {allowBlank: false}},
                                        {header: 'Total de gastos <br/> MN Salario',menuDisabled: true,sortable : false,dataIndex: 'salario_mn',flex: 5,
                                            editor: {
                                                xtype: 'numberfield',
                                                allowBlank: false,
                                                minValue: 0,
                                                maxValue: 100000
                                            }},
                                        {header: 'Total de gastos <br/>MN Otros',menuDisabled: true,sortable : false,dataIndex: 'otros_mn',flex: 5,
                                            editor: {
                                                xtype: 'numberfield',
                                                allowBlank: false,
                                                minValue: 0,
                                                maxValue: 100000
                                            }},
                                        {header: 'Total de gastos <br/>CUC',menuDisabled: true,sortable : false,dataIndex: 'cuc',flex: 5,
                                            editor: {
                                                xtype: 'numberfield',
                                                allowBlank: false,
                                                minValue: 0,
                                                maxValue: 100000
                                            }},
                                        {header: 'Institución que <br/>imparte la <br/>Actividad',menuDisabled: true,sortable : false,dataIndex: 'inst_imparte',flex: 5, editor: {allowBlank: false}}
                                    ],
                                    viewConfig: {forceFit: true},
                                    bbar:{
                                        id:'Plan_tbar_id'+cap,
                                        height: 28,
                                        items: [
                                            {
                                                xtype: 'pagingtoolbar',
                                                pageSize: 10,
                                                store: this.__data_store1,
                                                displayInfo: true,
                                                plugins: new Ext.ux.ProgressBarPager()
                                            },
                                            ('->'),
                                            {
                                                xtype: 'button',
                                                //text : 'Ayuda',
                                                iconCls:'help',
                                                handler:function(){
                                                    Ext.create('Ext.window.Window', {
                                                        title: '¿Necesita Ayuda?',
                                                        height:'25%',
                                                        width:'55%',
                                                        iconCls:'help',modal:true,
                                                        autoScroll:true,
                                                        layout: 'anchor',
                                                        html:
                                                            '<ul class="nav nav-list">' +
                                                                '<li>El modulo <span class="label label-info">" Clacificaci&oacute;n Cientifica"</span>' +
                                                                ' le permite gestionar las clacificaci&oacute;n cientifica de los trabajadores.<br>' +
                                                                '</li>' +
                                                                '</ul>'

                                                    }).show();
                                                }
                                            },
                                            {
                                                text: 'Adicionar',
                                                id: 'boton'+cap,
                                                name: 'boton'+cap,
                                                tooltip : 'Adiciona un  nuevo capítulo',
                                                iconCls: 'add',
                                                xtype:'button',
                                                cls:'btn',
                                                listeners:{
                                                    click:function( This, eOpts ){
                                                        var capitulo = This.up('grid').title;
                                                        //console.log(capitulo);
                                                        Ext.define('FILA',{
                                                            extend: 'Ext.data.Model',
                                                            fields: [
                                                                {name: 'id'},
                                                                {name: 'nombre'},
                                                                {name: 'denominacion'},
                                                                {name: 'fecha_inicio'},
                                                                {name: 'facha_fin'},
                                                                {name: 'participan'},
                                                                {name: 'frecuencia'},
                                                                {name: 'salario_mn'},
                                                                {name: 'otros_mn'},
                                                                {name: 'cuc'},
                                                                {name: 'inst_imparte'},
                                                                {name: 'cap_plan'}
                                                            ]
                                                        });
                                                        var record = new FILA({nombre:'',denominacion:'',fecha_inicio:'',facha_fin:'',participan:'',frecuencia:'',salario_mn : '',otros_mn : '',cuc : '',inst_imparte : '',cap_plan:capitulo});
                                                        This.up('grid').getStore().add(record);
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls:'btn',
                                                id: 'boton_guardar'+cap,
                                                name: 'boton_guardar'+cap,
                                                text : 'Guardar Información',
                                                handler:function( This, eOpts){
                                                    var mydd = This.up('grid').getStore().getModifiedRecords();
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
                                                            var _result = App.PerformSyncServerRequest('Plan.Plan.Add', {data: Ext.encode(_array)});
                                                            App.HideMsgBox();
                                                            if(_result)
                                                            {
                                                                var capitulo = This.up('grid').title;
                                                                Ext.getCmp('grid__'+capitulo).getStore().load({area: capitulo})
                                                                Ext.getCmp('capítulos_creaados').getStore().load()
                                                                App.InfoMessage('Información', 'Capítulo adicionado satisfactoriamente');
                                                            }
                                                            else
                                                                App.InfoMessage('Información', 'Ocurrio un error');
                                                        }
                                                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                                    }


                                                }
                                            },
                                            {
                                                text: 'Eliminar',
                                                id: 'Eliminar'+area,
                                                name: 'Eliminar'+area,
                                                tooltip : 'Eliminar una fila',
                                                iconCls: 'del_item',
                                                xtype:'button',
                                                cls:'btn',
                                                handler:function(This){
                                                    var _selectionModel = This.up('grid').getSelectionModel();
                                                    var _selected_rcd = _selectionModel.getLastSelected();
                                                    var id = _selected_rcd.data.id;
                                                    var cap_plan = _selected_rcd.data.cap_plan;
                                                    var record = _selected_rcd ;
                                                    if(id == null || id==''){
                                                        This.up('grid').store.remove(record);}
                                                    else{
                                                        var fnCallBack = function()   {
                                                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                            var _result = App.PerformSyncServerRequest('Plan.Plan.Eliminar', {id:id});
                                                            App.HideMsgBox();
                                                            if(_result)
                                                            {
                                                                This.up('grid').store.remove(record);
                                                                App.InfoMessage('Información', 'Ha eliminado una acción del capítulo <b>"'+cap_plan+'"</b>');
                                                            }
                                                            else
                                                            {
                                                                Ext.getCmp('cap'+area).getStore().load({area: area})
                                                                App.InfoMessage('Información', 'Ocurrio un error');
                                                            }
                                                        }
                                                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');
                                                    }
                                                }
                                              }
                                            ]
                                    }
                                });
                            mistab.add(_grid ).show();
                            }
                            else{
                                App.InfoMessage('Informaci&oacute;n', 'Debe llenar todos los campos');
                            }

            }
                     },
                    {html:'<hr/>'},
                    capitulos_plan

                    ]

        }
        var tabs = Ext.create('Ext.tab.Panel', {
            id:'mistab',
            name:'mistab',
            region: 'center',
            height:'100%',
            width:'83%',
            items: dataos

        });
        var lateral = Ext.create('Ext.panel.Panel', {
            title: 'Gestionar Capítulos',
            region: 'west',
            bodyPadding: 5,
            height:'100%',
            width: '15%',
            resizable :true,
            collapsed : true,
            collapsible : true,
            collapseDirection : 'left',
            items:[add]
        });
        var _panel = new Ext.Panel({
            title: 'Plan de superacion',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items:[lateral,tabs],
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
App.RegisterModule('Plan', new Plan());