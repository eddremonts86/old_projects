function Abajas(){
    var me= this;
    this.__data_store = null;
    this._store_combo = null;
    var main=null;
    var filter=null;
    this.Init = function()
    {
        var _menu_item_config_Abajas =
        {
            text: 'Aprobar bajas',
            id: 'Abajas_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Plantilla','Bajas',_menu_item_config_Abajas);
        Ext.require([
            'Ext.tip.*',
            'Ext.grid.*',
            'Ext.grid.plugin.*',
            'Ext.grid.features.*',
            'Ext.util.*',
            'Ext.toolbar.Paging',
            'Ext.ux.SlidingPager',
            'Ext.ux.PreviewPlugin',
            'Ext.ModelManager',
            'Ext.tip.QuickTipManager'
        ]);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {

        this.__data_store = App.BuildJsonStore('Abajas.Abajas.CargarDatos',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre',header:'Nombre'},
                    {name: 'contrato_fin',header:'Fin del Contrato'},
                    {name: 'contrato_inicio',header:'Inicio del Contrato'},
                    {name: 'alta',header:'Nombre'},
                    {name: 'activo',type:'boolean'},
                    {name:'baja', type:'boolean'},
                    {name:'licencia',type:'boolean'}

                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });

        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
        function pintar(val2,met,record,a,b,c,d){
            var bajas = record.data.baja;
            var licencia = record.data.licencia;
            if(bajas==true){
                met.style = 'font-style:italic !important;background: #E63C56;';

            }
            else if(licencia==true){
                met.style = 'font-style:italic !important;background: #4CB1FF;';
            }
            else if(bajas==true && licencia==true){
                met.style = 'font-style:italic !important;background: #E63C56;';
            }
            return val2;
        }
        var _grid = Ext.create('Ext.grid.Panel', {
            id: 'Abajas_grid_id',
            margin: '0 5 0',
            store: this.__data_store,
            plugins: [this.cellEditing],
            columns: [
                {text: "Nombre", flex: 1, dataIndex: 'nombre',renderer:pintar},
                {text: "Inicio del Contrato",flex: 1, dataIndex: 'contrato_fin',renderer:pintar},
                {text: "Fin del Contrato",flex: 1, dataIndex: 'contrato_inicio',renderer:pintar},
                {text: "Fecha de Alta",flex: 1, dataIndex: 'alta',renderer:pintar},
                {xtype: 'checkcolumn',header:'Solicitar Baja',dataIndex:'baja',width: 120,stopSelection: false,
                listeners: { checkchange:function(This, rowIndex, checked){
                        if (checked==true){
                            App.InfoMessage('Información', 'Usted no tiene permisos para desactivar esta acci&oacute;n');
                            me.__data_store.load();
                        }
                        else {
                            App.InfoMessage('Información', 'Uste no tiene permisos para desactivar esta acci&oacute;n');
                            me.__data_store.load();
                        }
                    }
                }
                },
                {   text: "Aprobar Baja",
                    xtype:'actioncolumn',
                    width:100,
                    items: [{height:3},{
                        iconCls:'modify',
                        tooltip: 'Aprobar',
                        handler: function() {
                            this.__data_store_mbajas = App.BuildJsonStore('Abajas.Abajas.CargarDatos_mbaja',{
                                fields: [
                                    {name: 'mbajas_id'},
                                    {name: 'mbajas'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                autoLoad: true
                            });
                            this.__data_store_dbajas = App.BuildJsonStore('Abajas.Abajas.CargarDatos_dbajas',{
                                fields: [
                                    {name: 'dbaja_id'},
                                    {name: 'dbajas_nombre'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                autoLoad: true
                            });
                            var combo1= Ext.create('Ext.form.ComboBox', {
                                fieldLabel: 'Motivo de Baja',
                                store: this.__data_store_mbajas,
                                queryMode: 'local',
                                allowBlank:false,
                                name:'Motivo',id:'Motivo',
                                displayField: 'mbajas',
                                valueField: 'mbajas_id'

                            });
                            var combo2= Ext.create('Ext.form.ComboBox', {
                                fieldLabel: 'Destino de Baja',
                                store:this.__data_store_dbajas,
                                queryMode: 'local',
                                allowBlank:false,
                                name:'Destino',id:'Destino',
                                displayField: 'dbajas_nombre',
                                valueField: 'dbaja_id'
                            });
                            var _selectionModel = Ext.getCmp('Abajas_grid_id').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.id;
                            var baja = _selected_rcd.data.baja;
                           // console.log(baja);
                            if(baja==true){
                                Ext.create('Ext.window.Window', {
                                    title: 'Aprobar solicitud de baja',
                                    height: 250,
                                    width: 500,
                                    id:'ventana',
                                    name:'ventana',
                                    modal:true,
                                    padding:15,
                                    layout: 'form',
                                    items: [combo1,combo2,
                                        {
                                        xtype: 'datefield',
                                        anchor: '100%',
                                        id:'fecha',name:'fecha',
                                        allowBlank:false,
                                        fieldLabel: 'Fecha de Baja',
                                        value: new Date()
                                        },
                                        {
                                            xtype      : 'fieldcontainer',
                                            fieldLabel : 'Solicitud Propia',
                                            defaultType: 'radiofield',
                                            id: 'propia',
                                            name: 'propia',
                                            layout: 'hbox',
                                            items: [
                                                {
                                                    boxLabel  : 'Si',
                                                    name      : 'Solicitud',
                                                    inputValue: '1',
                                                    id        : 'radio1'
                                                }, {
                                                    boxLabel  : 'No',
                                                    name      : 'Solicitud',
                                                    inputValue: '0',
                                                    id        : 'radio2'
                                                }
                                            ]
                                        }
                                    ],
                                    buttons: [
                                        { cls:'btn btn-primary', text: 'Enviar',
                                            handler:function(){
                                                var destino = Ext.getCmp('Destino').getValue();
                                                var motivo = Ext.getCmp('Motivo').getValue();
                                                var fecha = Ext.getCmp('fecha').getValue();
                                                var Solicitud='';
                                                var radio1 = Ext.getCmp('radio1').getValue();
                                                var radio2 = Ext.getCmp('radio2').getValue();
                                                if (radio1==true){Solicitud=1;}
                                                if (radio2==true){Solicitud=0;}
                                                if((radio1 == true || radio2 == true) && destino != null && motivo != null && fecha != null){
                                                    var fnCallBack = function() {
                                                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                        console.log(Solicitud);

                                                        var cursos = App.PerformSyncServerRequest('Abajas.Abajas.Baja',{destino:destino,motivo:motivo,fecha:fecha,id:id,Solicitud:Solicitud});
                                                        App.HideMsgBox();
                                                        if(cursos)
                                                        {
                                                            Ext.getCmp('Abajas_grid_id').store.load();
                                                            App.InfoMessage('Información', 'Se ha guardado su informaci&oacute;n corretamente');
                                                            Ext.getCmp('ventana').close();

                                                        }
                                                        else {
                                                            Ext.getCmp('Abajas_grid_id').store.load();
                                                            App.InfoMessage('Información', 'Se ha producido un error');
                                                            Ext.getCmp('ventana').close();
                                                        }
                                                    }
                                                    App.ConfirmMessage(fnCallBack, '¿Est&aacute; seguro que desea otorgar la baja?');
                                                }
                                                else{
                                                    App.InfoMessage('Información', 'Debe llenar todos los datos de la ventana.');
                                                }
                                            }},
                                        { cls:'btn btn-primary', text: 'Cancelar', handler:function(){Ext.getCmp('ventana').close();} }
                                    ]
                                }).show();
                            }
                            else{
                                App.InfoMessage('Información', 'Se ha producido un error debido a que no est&aacute; activa la solicitud de baja para este trabajador');
                            }
                        },
                       scope: this
                    },
                        {height:3},
                        {
                            iconCls:'del_item',
                            tooltip: 'No aprobar',
                            handler: function(){
                                var _selectionModel = Ext.getCmp('Abajas_grid_id').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                console.log(_selectionModel);
                                var id = _selected_rcd.data.id;
                                var baja = _selected_rcd.data.baja;
                                if(baja){


                                    var fnCallBack = function() {
                                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                        var cursos = App.PerformSyncServerRequest('Abajas.Abajas.NoBaja',{id:id});
                                        App.HideMsgBox();
                                        if(cursos)
                                        {
                                            Ext.getCmp('Abajas_grid_id').store.load();
                                            App.InfoMessage('Información', 'Se ha guardado su informaci&oacute;n corretamente');
                                            Ext.getCmp('ventana').close();

                                        }
                                        else {
                                            Ext.getCmp('Abajas_grid_id').store.load();
                                            App.InfoMessage('Información', 'Se ha producido un error');
                                            Ext.getCmp('ventana').close();
                                        }
                                    }
                                    App.ConfirmMessage(fnCallBack, '¿Est&aacute; seguro que desea eliminar la solicitud de baja?');

                                }
                                else{
                                    App.InfoMessage('Información', 'Se ha producido un error debido a que no est&aacute; activa la solicitud de baja para este trabajador');
                                }



                                    }
                        }
                    ]
                },
                {xtype: 'checkcolumn',header:'Solicitar licencia',dataIndex:'licencia',width: 120,stopSelection: false,
                    listeners: { checkchange:function(This, rowIndex, checked){
                        if (checked==true){
                            App.InfoMessage('Información', 'Usted no tiene permisos para desactivar esta acci&oacute;n');
                            me.__data_store.load();
                        }
                        else {
                            App.InfoMessage('Información', 'Usted no tiene permisos para desactivar esta acci&oacute;n');
                            me.__data_store.load();
                        }
                    }
                    }},
                {   text: "Aprobar Licencia",
                    xtype:'actioncolumn',
                    enableColumnHide : false,
                    width:120,
                    items: [{height:3},{
                        iconCls:'modify',
                        tooltip: 'Aprobar',
                        handler: function() {
                            this.__data_store_mbajas = App.BuildJsonStore('Abajas.Abajas.CargarDatos_mbaja',{
                                fields: [
                                    {name: 'mbajas_id'},
                                    {name: 'mbajas'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                autoLoad: true
                            });
                            this.__data_store_dbajas = App.BuildJsonStore('Abajas.Abajas.CargarDatos_dbajas',{
                                fields: [
                                    {name: 'dbaja_id'},
                                    {name: 'dbajas_nombre'}
                                ],
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                autoLoad: true
                            });
                            var combo1= Ext.create('Ext.form.ComboBox', {
                                fieldLabel: 'Motivo de Baja',
                                store: this.__data_store_mbajas,
                                queryMode: 'local',
                                name:'Motivo',id:'Motivo',
                                displayField: 'mbajas',
                                valueField: 'mbajas_id'

                            });
                            var combo2= Ext.create('Ext.form.ComboBox', {
                                fieldLabel: 'Destino de Baja',
                                store:this.__data_store_dbajas,
                                queryMode: 'local',
                                name:'Destino',id:'Destino',
                                displayField: 'dbajas_nombre',
                                valueField: 'dbaja_id'
                            });
                            var _selectionModel = Ext.getCmp('Abajas_grid_id').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id = _selected_rcd.data.id;
                            var licencia = _selected_rcd.data.licencia;
                            if(licencia==true){
                                Ext.create('Ext.window.Window', {
                                    title: 'Aprobar solicitudd de licencia',
                                    height: 250,
                                    width: 500,
                                    id:'ventana',
                                    name:'ventana',
                                    modal:true,
                                    padding:15,
                                    layout: 'form',
                                    items: [combo1,combo2,{
                                        xtype: 'datefield',
                                        anchor: '100%',
                                        id:'fecha',name:'fecha',
                                        fieldLabel: 'Fecha de Baja',
                                        value: new Date()},{
                                        xtype      : 'fieldcontainer',
                                        fieldLabel : 'Solicitud Propia',
                                        defaultType: 'radiofield',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                boxLabel  : 'Si',
                                                name      : 'Solicitud',
                                                inputValue: '1',
                                                id        : 'radio1'
                                            }, {
                                                boxLabel  : 'No',
                                                name      : 'Solicitud',
                                                inputValue: '0',
                                                id        : 'radio2'
                                            }
                                        ]
                                    }
                                    ],
                                    buttons: [
                                        { cls:'btn btn-primary',
                                            text: 'Enviar',
                                            handler:function(){
                                                var destino = Ext.getCmp('Destino').getValue();
                                                var motivo = Ext.getCmp('Motivo').getValue();
                                                var fecha = Ext.getCmp('fecha').getValue();
                                                var Solicitud='';
                                                var radio1 = Ext.getCmp('radio1').getValue();
                                                var radio2 = Ext.getCmp('radio2').getValue();
                                                if (radio1==true){Solicitud=1;}
                                                if (radio2==true){Solicitud=0;}
                                                var fnCallBack = function() {
                                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                    var cursos = App.PerformSyncServerRequest('Abajas.Abajas.licencia',{destino:destino,motivo:motivo,fecha:fecha,id:id,Solicitud:Solicitud});
                                                    App.HideMsgBox();
                                                    if(cursos)
                                                    {
                                                        Ext.getCmp('Abajas_grid_id').store.load();
                                                        App.InfoMessage('Información', 'Se ha guardado su informaci&oacute;n corretamente');
                                                        Ext.getCmp('ventana').close();

                                                    }
                                                    else {
                                                        Ext.getCmp('Abajas_grid_id').store.load();
                                                        App.InfoMessage('Información', 'Se ha producido un error');
                                                        Ext.getCmp('ventana').close();
                                                    }
                                                }
                                                App.ConfirmMessage(fnCallBack, '¿Est&aacute; seguro que desea otorgar la licencia?');
                                            }},
                                        { cls:'btn btn-primary', text: 'Cancelar', handler:function(){Ext.getCmp('ventana').close();} }
                                    ]
                                }).show();
                            }
                            else{
                                App.InfoMessage('Información', 'Se ha producido un error debido a que no est&aacute; activa la solicitud de baja para este trabajador');
                            }
                        },
                        scope: this
                    },
                        {height:3},
                        {
                            iconCls:'del_item',
                            tooltip: 'No aprobar',
                            handler: function(){
                                var _selectionModel = Ext.getCmp('Abajas_grid_id').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                console.log(_selectionModel);
                                var id = _selected_rcd.data.id;
                                var licencia = _selected_rcd.data.licencia;
                                if(licencia){


                                    var fnCallBack = function() {
                                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                        var cursos = App.PerformSyncServerRequest('Abajas.Abajas.Nolicencia',{id:id});
                                        App.HideMsgBox();
                                        if(cursos)
                                        {
                                            Ext.getCmp('Abajas_grid_id').store.load();
                                            App.InfoMessage('Información', 'Se ha guardado su informaci&oacute;n corretamente');
                                            Ext.getCmp('ventana').close();

                                        }
                                        else {
                                            Ext.getCmp('Abajas_grid_id').store.load();
                                            App.InfoMessage('Información', 'Se a producido un error');
                                            Ext.getCmp('ventana').close();
                                        }
                                    }
                                    App.ConfirmMessage(fnCallBack, '¿Est&aacute; seguro que desea eliminar la solicitud de licencia?');

                                }
                                else{
                                    App.InfoMessage('Información', 'Se ha producido un error debido a que no est&aacute; activa la solicitud de baja para este trabajador');
                                }



                            }
                        }
                    ]
                }

            ],
            enableLocking: true,
            width: '100%',
            region: 'center',
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
                },
                ('->'),
                {
                    xtype: 'button',
                    iconCls:'fileprint16',
                    handler:function(){

                        App.PrintModel(Ext.getCmp('Abajas_grid_id').store,'Imprimir Solicitudes de Bajas o Licencia');
                    }
                },
                {
                xtype: 'button',
                //text : 'Ayuda',
                iconCls:'help',
                handler:function(){
                    Ext.create('Ext.window.Window', {
                        title: '¿Necesita Ayuda?',
                        height:'35%',
                        width:'50%',
                        iconCls:'help',model:true,
                        autoScroll:true,
                        layout: 'anchor',
                        html:
                            '<ul class="nav nav-list">' +
                                '<li>El m&oacute;dulo <span class="label label-info">" Aprobar Bajas o Licencias"</span>' +
                                ' le permite gestionar las solicitudes de bajas o licencias de los trabajadores.<br>  ' +
                                'Debe saber que :' +
                                '<br> <span class="label label-info">El color azul</span> determina los trabajadores que han' +
                                ' solicitado licencias. ' +
                                '<br><span class="label label-important1">El color rojo</span> las solicitudes de bajas. <br><br>' +
                                '<span class="label label-important">Nota:</span> <br>Para aprobar una solicitud de cualquier tipo se debe '+
                                'conocer los motivos y el destino de la baja, as&iacute; como ' +
                                'si la solicitud es de car&aacute;cter personal o administrativa.' +

                                '</li>' +
                                '</ul>'

                    }).show();
                }
            }]

        });
        var _panel = new Ext.Panel({
                title: 'Aprobar Bajas',
                border: true,
                frame: true,
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
                items: [_grid],
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
App.RegisterModule('Abajas', new Abajas());