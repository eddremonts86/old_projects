function TargetaGestionar()
 {
    this.Render = function(Panel){

        this._btn_items = Ext.create('Ext.button.Split', {
            text : 'Gestionar D&iacute;as',
            iconCls:'date1',
            cls:'btn',
            menu:[
            {
                text: 'Nuevo d&iacute;a',
                iconCls:'date2',
                cls:'bordeboton',
                handler:function(){
                    var crear = Ext.create('Ext.window.Window', {
                        title: 'Crear nuevo d&iacute;a ',
                        height:'60%',
                        id:'crear',name:'crear',
                        width: '30%',
                        padding:'10px',
                        modal:true,
                        layout: 'anchor',
                        defaultType: 'textfield',
                        items: [
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: 'D&iacute;a',
                            format:'d/m/Y',
                            name: 'dia',
                            id: 'dia'
                        },{
                            xtype: 'timefield',
                            fieldLabel: 'Hora Entrada',
                            name: 'H_entrada',
                            id: 'H_entrada',
                            anchor: '100%',
                            allowBlank: false
                        },{
                                xtype: 'timefield',
                                fieldLabel: 'Hora Salida',
                            name: 'H_salida',
                            id: 'H_salida',
                            anchor: '100%',
                            allowBlank: false
                        },{
                            xtype:'htmleditor',
                            fieldLabel: 'Descripción',
                            hideLabel:true,
                            name: 'Descripción',
                            id: 'Descripción',
                            allowBlank: false
                        }],
                        buttons: [{
                            text: 'Aceptar',cls:'btn btn-primary', formBind: true,
                            handler: function(){
                                var _selectionModel = Ext.getCmp('_grid_trabajadores').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                var contrato_id = _selected_rcd.data.contrato_id;
                                var dia = Ext.util.Format.date(Ext.getCmp('dia').getValue(), 'Y-m-d');
                                var H_entrada = Ext.getCmp('H_entrada').getValue();
                                var H_salida = Ext.getCmp('H_salida').getValue();
                                var Descripción = Ext.getCmp('Descripción').getValue();
                                var cursos = App.PerformSyncServerRequest('Targeta.Targeta.Crear_Gestión',{contrato_id:contrato_id,dia:dia,H_entrada:H_entrada,H_salida:H_salida,Descripción:Descripción});
                                if(cursos==true){
                                    App.InfoMessage('Información', 'D&iacute;a adicionado satisfactoriamente');
                                    this.Gestion_Solicitud = App.BuildJsonStore('Targeta.Targeta.targeta_trab',{
                                        fields: [
                                            {name: 'hora_entrada'},
                                            {name: 'hora_salida'},
                                            {name: 'observaciones'},
                                            {name: 'dia'},
                                            {name: 'id'},
                                            {name: 'entrada'},
                                            {name: 'salida'}
                                        ],
                                        groupField : 'area',
                                        sortInfo: {field: 'dia',direction: 'ASC'},
                                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                                        params:{contrato_id:contrato_id},
                                        autoLoad: false
                                    });
                                    this.Gestion_Solicitud.load({params: {start: 0, limit: 25}});
                                    Ext.getCmp('_grid_targeta').reconfigure( this.Gestion_Solicitud, [
                                        Ext.create('Ext.grid.RowNumberer'),
                                        {text: "D&iacute;a Laboral", flex: 1, dataIndex: 'dia'},
                                        {text: "Entrada", flex: 1, dataIndex: 'hora_entrada',renderer:pintarentrada},
                                        {text: "Salida", flex: 1, dataIndex: 'hora_salida',renderer:pintarsalida}
                                    ]);
                                    Ext.resumeLayouts(true);
                                    Ext.getCmp('crear').close();
                                }
                                else{
                                    App.InfoMessage('Información', 'No se pudo adicionar el d&iacute;a solicitado');
                                    Ext.getCmp('crear').close();
                                }

                            },
                            scope: this
                        },
                            {
                                text: 'Cancelar',cls:'btn btn-primary',
                                handler: function(){crear.close();}
                            }]

                    }).show();
                }
            },
            {text: 'Modificar d&iacute;a',
                iconCls:'date3',cls:'bordeboton',
                handler:function(){
                    var _selectionModel = Ext.getCmp('_grid_trabajadores').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var contrato_id = _selected_rcd.data.contrato_id;
                    var _selectionModel1 = Ext.getCmp('_grid_targeta').getSelectionModel();
                    var _selected_rcd1 = _selectionModel1.getLastSelected();
                    var hora_entrada = _selected_rcd1.data.hora_entrada;
                    var hora_salida = _selected_rcd1.data.hora_salida;
                    var id = _selected_rcd1.data.id;
                    var dia = _selected_rcd1.data.dia;

                    var crear = Ext.create('Ext.window.Window', {
                        title: 'Modificar d&iacute;a ',
                        height:'60%',
                        id:'modifica',
                        name:'modifica',
                        width: '30%',
                        padding:'10px',
                        modal:true,
                        layout: 'anchor',
                        defaultType: 'textfield',
                        items: [
                            {
                                xtype: 'datefield',
                                anchor: '100%',
                                fieldLabel: 'D&iacute;a laboral',
                                format:'d/m/Y',
                                name: 'dia',
                                id: 'dia',
                                value:dia
                            },{
                                fieldLabel: 'Hora Entrada',
                                name: 'H_entrada',
                                id: 'H_entrada',
                                anchor: '100%',
                                allowBlank: false,
                                value:hora_entrada
                            },{
                                fieldLabel: 'Hora Salida',
                                name: 'H_salida',
                                id: 'H_salida',
                                anchor: '100%',
                                allowBlank: false,
                                value:hora_salida
                            },{
                                xtype:'htmleditor',
                                fieldLabel: 'Descripción',
                                hideLabel:true,
                                name: 'Descripción',
                                id: 'Descripción',
                                allowBlank: false
                            }],
                        buttons: [{
                            text: 'Aceptar',cls:'btn btn-primary', formBind: true,
                            handler: function(){
                                var dia = Ext.util.Format.date(Ext.getCmp('dia').getValue(), 'Y-m-d');
                                var H_entrada = Ext.getCmp('H_entrada').getValue();
                                var H_salida = Ext.getCmp('H_salida').getValue();
                                var Descripción = Ext.getCmp('Descripción').getValue();
                                var cursos = App.PerformSyncServerRequest('Targeta.Targeta.Mod_Gestión',{id:id,contrato_id:contrato_id,dia:dia,H_entrada:H_entrada,H_salida:H_salida,Descripción:Descripción});
                                if(cursos==true){
                                    App.InfoMessage('Información', 'D&iacute;a actualizado satisfactoriamente');
                                    this.Gestion_Solicitud = App.BuildJsonStore('Targeta.Targeta.targeta_trab',{
                                        fields: [
                                            {name: 'hora_entrada'},
                                            {name: 'hora_salida'},
                                            {name: 'observaciones'},
                                            {name: 'dia'},
                                            {name: 'id'},
                                            {name: 'entrada'},
                                            {name: 'salida'}
                                        ],
                                        groupField : 'area',
                                        sortInfo: {field: 'dia',direction: 'ASC'},
                                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                                        params:{contrato_id:contrato_id},
                                        autoLoad: false
                                    });
                                    this.Gestion_Solicitud.load({params: {start: 0, limit: 25}});
                                    Ext.getCmp('_grid_targeta').reconfigure( this.Gestion_Solicitud, [
                                        Ext.create('Ext.grid.RowNumberer'),
                                        {text: "D&iacute;a Laboral", flex: 1, dataIndex: 'dia'},
                                        {text: "Entrada", flex: 1, dataIndex: 'hora_entrada',renderer:pintarentrada},
                                        {text: "Salida", flex: 1, dataIndex: 'hora_salida',renderer:pintarsalida}
                                    ]);
                                    Ext.resumeLayouts(true);
                                    Ext.getCmp('modifica').close();
                                }
                                else{
                                    App.InfoMessage('Información', 'No se pudo adicionar el d&iacute;a solicitado');
                                    Ext.getCmp('modifica').close();
                                }
                            },
                            scope: this
                        },
                            {
                                text: 'Cancelar',cls:'btn btn-primary',
                                handler: function(){crear.close();}
                            }]

                    }).show();
                }
            },
            {
                text: 'Eliminar D&iacute;a',
                iconCls:'date4',
                cls:'bordeboton',
                handler:function(){
                    var _selectionModel1 = Ext.getCmp('_grid_targeta').getSelectionModel();
                    var _selected_rcd1 = _selectionModel1.getLastSelected();
                    var id = _selected_rcd1.data.id;
                    var _selectionModel = Ext.getCmp('_grid_trabajadores').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var contrato_id = _selected_rcd.data.contrato_id;
                    var cursos = App.PerformSyncServerRequest('Targeta.Targeta.Eliminar',{id:id});
                    if(cursos==true){
                        App.InfoMessage('Información', 'Se ha eliminado satisfactoriamente');
                        this.Gestion_Solicitud = App.BuildJsonStore('Targeta.Targeta.targeta_trab',{
                            fields: [
                                {name: 'hora_entrada'},
                                {name: 'hora_salida'},
                                {name: 'observaciones'},
                                {name: 'dia'},
                                {name: 'id'},
                                {name: 'entrada'},
                                {name: 'salida'}
                            ],
                            groupField : 'area',
                            sortInfo: {field: 'dia',direction: 'ASC'},
                            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                            params:{contrato_id:contrato_id},
                            autoLoad: false
                        });
                        Ext.getCmp('_grid_targeta').reconfigure( this.Gestion_Solicitud, [
                            Ext.create('Ext.grid.RowNumberer'),
                            {text: "D&iacute;a Laboral", flex: 1, dataIndex: 'dia'},
                            {text: "Entrada", flex: 1, dataIndex: 'hora_entrada',renderer:pintarentrada},
                            {text: "Salida", flex: 1, dataIndex: 'hora_salida',renderer:pintarsalida}
                        ]);
                        Ext.resumeLayouts(true);
                        this.Gestion_Solicitud.load({params: {start: 0, limit: 25}});
                    }
                }
            }
        ]});

        var tbar = Ext.getCmp('dzate');
        tbar.add(this._btn_items);
        tbar.add('->');
        tbar.add({
            xtype: 'button',
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
                            '<li>El m&oacute;dulo <span class="label label-info">" Aprobar solicitudes"</span>' +
                            ' le permite gestionar las solicitudes de cursos por los trabajadores.<br>' +
                            '<span class="label label-warning">Debe saber que :</span>' +
                            '<br>Los trabajadores aparecen con su Agencia y &aacute;rea para diferenciar cada contrato que tenga un trabajado especial.<br>' +
                            'Los cursos nos brinda informaci&oacute;n adicional, de forma tal que sea mas f&aacute;cil al responsable pueda tomar la decición' +
                            '</li>' +
                            '</ul>'

                }).show();
            }});
        tbar.add(' ');
        tbar.add('-');

    }
    this.Enable = function(){

    }
    this.Disable = function(){

    }
}
App.RegisterFunction('TargetaGestionar', new TargetaGestionar());