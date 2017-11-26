function HClinica() {
    this.Init = function () {
        var _menu_item_config =
        {
            text: 'HClinica',
            id: 'HClinica_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Salud', _menu_item_config);

    }
    // ========================================================================//
    this.BuildMainPanel = function (filterObj) {
        this.__data_store_lcargoas = App.BuildJsonStore('HClinica.HClinica.CargarDatos',{
                fields: [
                    {name: 'id'},
                    {name: 'foto'},
                    {name: 'nombre_completo'},
                    {name: 'estatura'},
                    {name: 'peso'},
                    {name: 'dispen'},
                    {name: 'cafe'},
                    {name: 'alcohol'},
                    {name: 'fumar'},
                    {name: 'app'},
                    {name: 'apf'},
                    {name: 'i_d'},
                    {name: 'vacunacion'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });

        var _store_examenes = App.BuildJsonStore('HClinica.HClinica.ExamenesMedicos',
            {
                fields: [
                    {name: 'id'},
                    {name: 'id_tipo_examen'},
                    {name: 'nombre_examen'},
                    {name: 'fisico'},
                    {name: 'resultado'},
                    {name: 'fecha_emision'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        var _store_tipo = App.BuildJsonStore('HClinica.HClinica.TipoExamenes',
            {
                fields: [
                    {name: 'nombre_examen'},
                    {name: 'id_tipo_examen'}
                ],
                proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
                autoLoad: false
            });
       // var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl: 'Equipo: {name} ' /*+ ' ({rows.length})'*/});
        var _grid = new Ext.grid.Panel({
                id: 'HClinica_grid_id',
                name:'HClinica_grid_id',
                height: App.GetDesktopHeigth()-25,
                width: '100%',
                region: 'center',
                frame: true,
                store: this.__data_store_lcargoas,
                //features: [groupingFeature],
                columns: [
                    {header: 'Foto',locked: true,dataIndex: 'foto',align: 'center',width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            if(value == '' || value == null)
                                return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                            else
                                return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
                        }
                    },
                    {header: 'Nombre Completo',menuDisabled: true,sortable: false,dataIndex: 'nombre_completo',flex: 5},
                    {header: 'Estatura',menuDisabled: true,sortable: false,dataIndex:'estatura',flex: 5},
                    {header: 'Peso',menuDisabled: true,sortable: false,dataIndex: 'peso',flex: 5}
                ],
                viewConfig: {
                    forceFit: true
                },
                /*tbar: {
                    id: 'HClinica_tbar_id',
                    items: ['-'],
                    height: 28
                },*/
                bbar:[ {
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store: this.__data_store_lcargoas,
                    displayInfo: true,
                    plugins: new Ext.ux.ProgressBarPager()
                },('->'),{
            xtype: 'button',
                //text : 'Ayuda',
                iconCls:'help',
                handler:function(){
                Ext.create('Ext.window.Window', {
                    title: '¿Necesita Ayuda?',
                    height:'80%',
                    width:'50%',
                    iconCls:'help',modal:true,
                    autoScroll:true,
                    layout: 'anchor',
                    html:
                        '<ul class="nav nav-list">' +
                            '<li>El m&oacute;dulo <span class="label label-info">" Gestionar HClinica"</span>' +
                            ' le permite conocer y gestionar los cargos y plazas para un &aacute;rea determinada.<br>' +
                            '<span class="label label-success">Expliquemoslo detalladamente:</span><br/>' +
                            '<img src="SubSystems/Plantilla/Config/Client/icons/img-subsistem/lacrgos.png">' +
                            '<br> Existen campos que son obligatoris para el completamiento funcional de este m&oacute;dulo<br>' +
                            '<span class="label label-success">1- </span> Agencia: Se debe hacer referencia a la agencia deseada para ver la lista de Areas/Departamento pertenecientes a ella.<br>' +
                            '<span class="label label-success">2- </span> &Aacute;rea/Departamento: Se debe hacer referencia a el &Aacute;rea/Departamento al que se le desea adicionar los cargos.<br>' +
                            '<span class="label label-success">3- </span> Norma Jur&iacute;dica: Es el documento rector(FAR) que acredita el cargo en la empresa.<br>' +
                            '<span class="label label-success">4- </span> Plazas y Existencia: Estos dos campos del la tabla se deben llenar con la cantidad de plazas de que' +
                            ' tendr&aacute; el departamento y la existencia real de las mismas (Debido que existen momentos en los que se pueden tener X plazas pero s&oacute;lo porsupuesto para X-y) <br>'+
                            '<span class="label label-important">Nota:</span> <br> Todos los datos de el 1-3 se llenan autom&aacute;ticamente aunque no se lleven a bd sistema.<br>' +
                            'Se debe marcar los cargos elegidos una ves llenados todos los campos'+
                            '</li>' +
                            '</ul>'

                }).show();
            }
        }],
                listeners: {
                    selectionchange: {
                        fn: function (View, selections, options) {
                            if (selections.length == 0) {
                                this.Disable('HClinicaGestionar');
                            }
                            else {
                                this.Enable('HClinicaGestionar');
                            }
                        },
                        scope: this
                    },
                    itemclick:function( This, record, item, index, e, eOpts){
                        _store_examenes.load({params:{id:record.data.id}});
                        Ext.getCmp('csalud').setValue(record.data.vacunacion);
                        Ext.getCmp('app').setValue(record.data.app);
                        Ext.getCmp('apf').setValue(record.data.apf);
                        Ext.getCmp('id').setValue(record.data.i_d);

                        Ext.getCmp('cafe').setValue('false');
                        Ext.getCmp('alcohol').setValue('false');
                        Ext.getCmp('fumar').setValue('false');
                        Ext.getCmp('disp').setValue('false');
                        if(record.data.cafe == 't')
                            Ext.getCmp('cafe').setValue(true);
                        if(record.data.alcohol == 't')
                            Ext.getCmp('alcohol').setValue(true);
                        if(record.data.fumar == 't')
                            Ext.getCmp('fumar').setValue(true);
                        if(record.data.disp == 't')
                            Ext.getCmp('disp').setValue(true);

                    }
                }
            });
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });
        var _grid2 = new Ext.grid.GridPanel({
                id : 'storeHClinica_grid_id',
                height : '100%',
                width : '100%',
                frame: true,
                layout:'fit',
                plugins: [cellEditing],
                store : _store_examenes,
                selType: 'rowmodel',
                tbar:[  {
                    text : 'Adicionar',
                    iconCls : 'add',
                    id : 'add_pedido_btn_id',
                    handler : function(This, eOpts){
                            Ext.define('FILA',{
                                extend: 'Ext.data.Model',
                                fields: [
                                    {name: 'nombre_examen'},
                                    {name: 'fisico'},
                                    {name: 'resultado'},
                                    {name: 'fecha_emision'}
                                ]
                            });
                            var record = new FILA({id:'',nombre_examen:'',fisico:false,resultado:'',fecha_emision:''});
                            This.up('grid').getStore().add(record);
                    }
                },'-',{
                    text : 'Eliminar',
                    id : 'delete_examenes_btn_id',
                    iconCls : 'delete',
                    disabled : true,
                    handler : function(){
                        var mydd = Ext.getCmp('storeHClinica_grid_id').getSelectionModel().getLastSelected().data;
                        var trab = Ext.getCmp('HClinica_grid_id').getSelectionModel().getLastSelected().data;
                        var fnCallBack = function(){
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('HClinica.HClinica.EliminarExamenes', mydd);
                            App.HideMsgBox();
                            if(_result)
                            {
                                Ext.getCmp('storeHClinica_grid_id').getStore().load({params:{id:trab.id}})
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                            {
                                Ext.getCmp('storeHClinica_grid_id').getStore().load({params:{id:trab.id}})
                                App.InfoMessage('Información', 'Ocurri&oacute; un error');
                            }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');

                    }
                },'-',
                {
                    text : 'Guardar',
                    id : 'guardar_pedido_btn_id',
                    iconCls : 'save',
                    handler : function(){
                        var mydd = Ext.getCmp('storeHClinica_grid_id').getStore().getModifiedRecords();
                        var trab2 = Ext.getCmp('HClinica_grid_id').getSelectionModel().getLastSelected();
                        console.log(mydd);
                        if (mydd.length === 0 || trab2 == undefined)
                            App.InfoMessage('Información', 'No ha modificado fila alguna o no ha seleccionado el trabajador');
                         else
                        {
                            var datos = '';
                            var trab = trab2.data;
                            for (var i = 0; i < mydd.length; i++){
                                datos += mydd[i].data.id + '|' + mydd[i].data.id_tipo_examen + '|' + mydd[i].data.resultado + '|' + mydd[i].data.fecha_emision + ';'
                            }
                               trab.examenes = datos;

                            var fnCallBack = function(){
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var _result = App.PerformSyncServerRequest('HClinica.HClinica.SalvarExamenes', trab);
                                App.HideMsgBox();
                                if(_result)
                                {
                                    Ext.getCmp('storeHClinica_grid_id').getStore().load({params:{id:trab.id}})
                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                }
                                else
                                {
                                    Ext.getCmp('storeHClinica_grid_id').getStore().load({params:{id:trab.id}})
                                    App.InfoMessage('Información', 'Ocurri&oacute; un error');
                                }
                            }
                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                        }
                    }
                }],
                columns : [{
                    header: 'Id',
                    dataIndex: 'id',
                    flex: 30,
                    hidden:true
                },{
                    header: 'Examen',
                    dataIndex: 'nombre_examen',
                    flex: 30,
                    editor: {
                        allowBlank: false,
                        xtype:'combo',
                        valueField:'nombre_examen',
                        displayField:'nombre_examen',
                        store:_store_tipo,
                        listeners:{
                            select:function(This,record){
                                Ext.getCmp('storeHClinica_grid_id').getSelectionModel().getLastSelected().data.id_tipo_examen = record[0].data.id;
                            }
                        }
                    }
                },{
                    header: 'Resultado',
                    dataIndex: 'resultado',
                    flex: 30,
                    editor: {
                        allowBlank: false,
                        xtype:'textfield',
                        decimalPrecision:4
                    }
                },{
                   //xtype:datecolumn,
                    header: 'Fecha Emisi&oacute;n',
                    dataIndex: 'fecha_emision',
                    flex: 30,
                    editor: {
                        allowBlank: false,
                        xtype:'datefield',
                        decimalPrecision:4,
                        format:'Y-m-d',
                        altFormats:"m/d/Y"
                    }
                }],
                stripeRows: true,
                listeners:{
                    selectionchange: {
                        fn: function (View, selections, options) {
                            if (selections.length == 0) {
                                Ext.getCmp('delete_examenes_btn_id').disable();
                            }
                            else {
                                Ext.getCmp('delete_examenes_btn_id').enable();
                            }
                        },
                        scope: this
                    },
                }
            });


        var _panel2 = new Ext.tab.Panel(
            {
                border: true,
                frame: true,
                id:'panel_aux2',
                name:'panel_aux2',
                layout: 'border',
                //style:{'padding-top':'40px','padding-left':'20px'},
                height: App.GetDesktopHeigth()-25,
                width: '100%',
                items: [
                    {
                        title: 'Carnet de Salud',
                        tooltip: 'A button tooltip',
                        items:[
                            {xtype: 'htmleditor',height:400,width:'100%',id:'csalud',name:'csalud',value:'<h3>Vacunaci&oacute;n</h3>'},
                            {
                            text : 'Guardar',
                            id : 'guardar_pedido_otros_btn_id',
                            xtype:'button',
                            iconCls : 'save',
                            handler : function(){
                                var trab = Ext.getCmp('HClinica_grid_id').getSelectionModel().getLastSelected().data;
                                trab.vacunacion = Ext.getCmp('csalud').getValue();
                                var _result = App.PerformSyncServerRequest('HClinica.HClinica.GuardarVacunacion', trab);
                                this.__data_store_lcargoas.load();
                            }
                        }
                        ]
                    },
                    {
                    title: 'Examenes M&eacute;dicos',
                    tooltip: 'A button tooltip',
                    items:[_grid2]
                },
                    {
                    title: 'Otros',
                    tooltip: 'A button tooltip',
                    items:[
                        {xtype: 'htmleditor',fieldLabel: 'A.P.P',labelWidth:40,height:130,width:'100%',id:'app',name:'app',value:'<h3>A.P.P</h3>'},
                        {xtype: 'htmleditor',fieldLabel: 'A.P.F',labelWidth:40,height:130,width:'100%',id:'apf',name:'apf',value:'<h3>A.P.F</h3>'},
                        {xtype: 'htmleditor',fieldLabel: 'I.D.',labelWidth:40,height:130,width:'100%',id:'id',name:'id',value:'<h3>I.D.</h3>'},
                        {
                            text : 'Guardar',
                            xtype:'button',
                            margin:'0 0 0 50',
                            iconCls : 'save',
                            handler : function(){
                                var trab = Ext.getCmp('HClinica_grid_id').getSelectionModel().getLastSelected().data;
                                trab.app = Ext.getCmp('app').getValue();
                                trab.apf = Ext.getCmp('apf').getValue();
                                trab.i_d = Ext.getCmp('id').getValue();
                                var _result = App.PerformSyncServerRequest('HClinica.HClinica.GuardarOtros', trab);
                                Ext.getCmp('HClinica_grid_id').store.load();
                            }
                        }
                    ],
                    listeners:{
                        activate:function(){
                            var trab = Ext.getCmp('HClinica_grid_id').getSelectionModel().getLastSelected();
                            if(trab != undefined){
                                Ext.getCmp('csalud').setValue(trab.data.vacunacion);
                                Ext.getCmp('app').setValue(trab.data.app);
                                Ext.getCmp('apf').setValue(trab.data.apf);
                                Ext.getCmp('id').setValue(trab.data.i_d);
                            }
                        }
                    }
                },
                    {
                    title: 'H&aacute;bitos T&oacute;xicos',
                    tooltip: 'A button tooltip',
                    items:[ {
                                xtype: 'checkboxgroup',
                                columns: 1,
                                vertical: true,
                                items: [
                                    { boxLabel: 'Caf&eacute;', name: 'cafe',id: 'cafe'},
                                    { boxLabel: 'Cigarro', name: 'fumar',id: 'fumar'},
                                    { boxLabel: 'Alcohol', name: 'alcohol',id: 'alcohol'},
                                    { boxLabel: 'Dispensarizaci&oacute;n', name: 'disp',id: 'disp'}
                                ]
                            },{
                                text : 'Guardar',
                                xtype:'button',
                                id : 'guardar_pedido_HabT_btn_id',
                                margin:'0 0 0 40',
                                iconCls : 'save',
                                handler : function(){
                                    var trab2 = Ext.getCmp('HClinica_grid_id').getSelectionModel().getLastSelected();
                                    console.log(trab2);
                                    if (trab2 == undefined)
                                        App.InfoMessage('Información', 'No ha seleccionado el trabajador');
                                    else
                                    {
                                        var trab = trab2.data;
                                        trab.cafe = Ext.getCmp('cafe').getValue();
                                        trab.alcohol = Ext.getCmp('alcohol').getValue();
                                        trab.fumar = Ext.getCmp('fumar').getValue();
                                        trab.disp = Ext.getCmp('disp').getValue();
                                        var _result = App.PerformSyncServerRequest('HClinica.HClinica.GuardarHabitos', trab);
                                        Ext.getCmp('HClinica_grid_id').store.load();
                                    }
                                }
                            }]
                }]
            });

        var _panel = new Ext.Panel({
                title: 'Gestionar HClinica',
                border: true,
                frame: true,
                id:'panel_general_hclinica',
                name:'panel_general',
                layout: 'column',
                height:'100%',
                width: '100%',
                items: [{
                    columnWidth:.6,
                    items:[_grid],
                    frame:true,
                    style: {
                        border:'0px'
                    }
                },{
                    columnWidth:.4,
                    items:[_panel2],
                    frame:true,
                    style: {
                        border:'0px'
                    }
                }],
                listeners: {
                    afterrender: function () {
                        this.__data_store_lcargoas.load({
                            params: {
                                start: 0,
                                limit: 25
                            }
                        });
                    },
                    scope: this
                }
            });

        return _panel;
    }
    // ========================================================================//
    this.Free = function () {
        this.__data_store_lcargoas.removeAll(true);
        delete this.__data_store_lcargoas;
        this.__data_store_lcargoas = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function () {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('HClinica', new HClinica());