function Evaluaciones(){
    this.__data_store = null;
    this.Init = function()
    {
            var _menu_item_config_Evaluaciones =
        {
            text: 'Evaluaciones',
            id: 'Evaluaciones_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Evaluaciones',_menu_item_config_Evaluaciones);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Evaluaciones.Evaluaciones.CargarDatos',{
            fields: [
            {name: 'nombre_completo'},
            {name: 'nombre'},
            {name: 'id'},
            {name: 'id_conf'},
            {name: 'control',type:'int'},
            {name: 'violaciones',type:'int'},
            {name: 'reserva',type:'int'},
            {name: 'sisty_p'},
            {name: 'sisty_p_id'},
            {name: 'cumplimiento'},
            {name: 'categoria'},
            {name: 'Formada',type:'int'},
            {name: 'cobrar',type:'int'},
            {name: 'pena',type:'int'}
            ],
            //groupField : 'sisty_p',
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
            autoLoad: true
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl: 'Sistema de Pago: {name} ' + ' ({rows.length})'});
        this.__data_store_cuadros = App.BuildJsonStore('Evaluaciones.Evaluaciones.CargarDatoscuadros',{
            fields: [
                {name: 'id'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        var _grid = new Ext.grid.Panel({
            id: 'Evaluaciones_grid_id',
            title: 'Historial de Señalamientos',
            name: 'Evaluaciones_grid_id',
            layout: 'anchor',
            region: 'center',
            border:true,
            collapsible:true,
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})
            ],
            store: this.__data_store,
            columns: [
                {hidden: false,header: 'Cuadro', dataIndex: 'formador',flex:5},
                {hidden: false, header: 'Cuadro',dataIndex: 'formador',flex:1}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                id: 'Evaluaciones_tbar_id',
                items: [{
                    xtype: 'button',
                    text : 'Señalamiento',
                    iconCls:'list_add_font16'
                }],
                height: 28
            }
           /* listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('EvaluacionesGestionar');
                        }
                        else
                        {
                          this.Enable('EvaluacionesGestionar');
                        }

                    },
                    scope: this
                }
            }*/
        });
        var meses = new Ext.data.SimpleStore({
            fields: ['id', 'mes'],
            data : [['1','Enero'],['2','Febrero'],
                    ['3','Marzo'],['4','Abril'],
                    ['5','Mayo'],['6','Junio'],
                    ['7','Julio'],['8','Agosto'],
                    ['9','Septiembre'],['10','Octubre'],
                    ['11','Noviembre'],['12','Diciembre']]
        });
        var mes =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose State',
            queryMode: 'local',
            width:150,
            id:'mes',
            name:'mes',
            store:meses,
            displayField: 'mes',
            valueField: 'id',
            hideLabel:true

        });
        var anno =  new Ext.form.field.Number({
                            anchor: '100%',
                            name: 'anno',
                            id: 'anno',
                            hideLabel:true,
                            width:150,
                            fieldLabel: 'Bottles of Beer',
                            value:2014,
                            maxValue: 2025,
                            minValue: 2007
                         });
        var cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit: 1});
        var panel_datos = Ext.create('Ext.form.Panel', {
            title: 'Listado de Cuadros ',
            bodyPadding: 5,
            width: '100%',
            layout:'fit',
            id:'Evaluaciones_cuadros_form',
            name:'Evaluaciones_cuadros_form',
            region: 'west',
            defaults: {anchor: '100%'},
            items: [
                {   xtype: 'grid',
                    id:'grid',
                    name:'grid',
                    store: this.__data_store,
                    //features: [groupingFeature],
                    border: false,
                    plugins: [cellEditing],
                    columns: [
                        {header: 'id_conf',dataIndex: 'id_conf',hidden:true},
                        {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre_completo',flex: 2,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var sisty_p_id = record.get('sisty_p_id');
                                if(sisty_p_id=='DE_capital_humano_12147'){
                                    metaData.style = 'font-style:italic !important;background: #e6e6e6;';
                                }
                                else{
                                    metaData.style = 'font-style:italic !important;background: #B4C5CC;';
                                }
                                return value;
                            }
                        },
                        {header: 'Cargo',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 2,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                            var sisty_p_id = record.get('sisty_p_id');
                            if(sisty_p_id=='DE_capital_humano_12147'){
                                metaData.style = 'font-style:italic !important;background: #e6e6e6;';
                            }
                            else{
                                metaData.style = 'font-style:italic !important;background: #B4C5CC;';
                            }
                            return value;
                        }},
                        {header: 'Violaciones',menuDisabled: true,sortable : false,dataIndex: 'violaciones',flex: 1,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var sisty_p_id = record.get('sisty_p_id');
                                if(sisty_p_id=='DE_capital_humano_12147'){
                                    metaData.style = 'font-style:italic !important;background: #e6e6e6;';
                                }
                                else{
                                    metaData.style = 'font-style:italic !important;background: #B4C5CC;';
                                }
                                return value;
                            }},
                        {header: 'Controles',menuDisabled: true,sortable : false,dataIndex: 'control',flex: 1,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var sisty_p_id = record.get('sisty_p_id');
                                if(sisty_p_id=='DE_capital_humano_12147'){
                                    metaData.style = 'font-style:italic !important;background: #e6e6e6;';
                                }
                                else{
                                    metaData.style = 'font-style:italic !important;background: #B4C5CC;';
                                }
                                return value;
                            }},
                        {header: 'Reserva',menuDisabled: true,sortable : false,dataIndex: 'reserva',flex: 1,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var sisty_p_id = record.get('sisty_p_id');
                                if(sisty_p_id=='DE_capital_humano_12147'){
                                    metaData.style = 'font-style:italic !important;background: #e6e6e6;';
                                }
                                else{
                                    metaData.style = 'font-style:italic !important;background: #B4C5CC;';
                                }
                                return value;
                            }},

                        {header: 'Formada',menuDisabled: true,sortable : false,dataIndex: 'Formada',flex: 1,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var pena = record.get('Formada');
                                if(pena!=0){
                                    metaData.style = 'font-style:bloc !important;color: blue;';
                                }
                                return value;
                            }},
                        {header: 'A cobrar',menuDisabled: true,sortable : false,dataIndex: 'cobrar',flex: 1,
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var cobrar = record.get('cobrar');
                                var pena = record.get('pena');
                                var fin = cobrar-pena;

                                if(fin!=0){
                                    metaData.style = 'font-style:bloc !important;color: blue;';
                                }
                                return  fin;
                            }
                        },

                        {header: 'Penalización',menuDisabled: true,sortable : false,dataIndex: 'pena',flex: 1,editor: {allowBlank: false},
                            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                                var pena = record.get('pena');
                                if(pena!=0){
                                    metaData.style = 'font-style:bloc !important;color: red;';
                                }
                                return value;
                            }
                        },
                        {header: 'Cumplimiento',menuDisabled: true,sortable : false,dataIndex: 'cumplimiento',flex: 1, lazyRender: true,
                            editor: new Ext.form.field.ComboBox({
                                    typeAhead: true,
                                    triggerAction: 'all',
                                    selectOnTab: true,
                                    store: [
                                        ['Aceptable','Aceptable'],
                                        ['Satisfactorio','Satisfactorio']
                                    ]})
                        },
                        {header: 'Categoría',menuDisabled: true,sortable : false,dataIndex: 'categoria',flex: 2, lazyRender: true,
                         editor: new Ext.form.field.ComboBox({
                                typeAhead: true,
                                triggerAction: 'all',
                                selectOnTab: true,
                                store: [
                                    ['Retrocede','Retrocede'],
                                    ['Se Estanca','Se Estanca'],
                                    ['Avansa','Avansa'],
                                    ['Avansa Satisfactoriamente','Avansa Satisfactoriamente']
                                ]})
                        }
                    ],
                    listeners: {
                        selectionchange: {
                            fn: function(View, selections, options) {
                                var _selected_rcd = Ext.getCmp('grid').getSelectionModel().getLastSelected();
                                var id = _selected_rcd.data.sisty_p_id;
                                if(id == 'DE_capital_humano_12147'){
                                    Ext.getCmp('CPL-ANAV').enable();
                                    Ext.getCmp('Sena').enable();
                                }
                                else {
                                    Ext.getCmp('CPL-ANAV').disable();
                                    Ext.getCmp('Sena').enable();
                                }
                            },
                            scope: this
                        }
                    },
                    bbar: {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store: this.__data_store,
                        id: 'Evaluaciones_2tbar_id',
                        items:[
                            mes,
                            anno,
                            {  xtype: 'button',
                                text : 'Buscar',
                                hideLabel:true,
                                iconCls:'edit_find_user16',
                                handler:function(){
                                var mes = Ext.getCmp('mes').getValue();
                                var anno= Ext.getCmp('anno').getValue();
                                if(mes!='' && anno !=''&& mes!=null && anno !=null){
                                    var result = App.PerformSyncServerRequest('Evaluaciones.Evaluaciones.Cobro', {mes: mes,anno:anno});
                                     var store  = Ext.getCmp('grid').store;
                                    if(result.rows!=false){
                                    for(var i=0;i<store.count();i++){
                                        var id_stote = store.data.items[i].data.id;
                                         for(var e=0;e < result.results;e++){
                                            if(id_stote==result.rows[e].id_cuadro)
                                            {
                                                store.data.items[i].data.Formada = result.rows[e].formada;
                                                store.data.items[i].data.pena = result.rows[e].a_rebajar;
                                                store.data.items[i].data.cobrar = result.rows[e].a_cobrar;
                                                store.data.items[i].data.categoria = result.rows[e].cat_eval;
                                                store.data.items[i].data.cumplimiento = result.rows[e].comportam;
                                                store.data.items[i].data.id_conf=result.rows[e].id;
                                            }
                                         }
                                    }
                                    }
                                    else{
                                        App.InfoMessage('Información', 'No existen datos en este rango de tiempo');
                                    }
                                  Ext.getCmp('grid').getView().refresh();
                                 }
                                }
                            },
                            {
                                xtype: 'button',
                                text : 'CPL-ANAV',
                                id : 'CPL-ANAV',
                                name : 'CPL-ANAV',
                                hideLabel:true,
                                disabled : true,
                                iconCls:'view_media_playlist16',
                                handler:function(){
                                var _selected_rcd = Ext.getCmp('grid').getSelectionModel().getLastSelected();
                                var id = _selected_rcd.data.id_conf;
                               // console.log(id);
                                var mywind2 =   Ext.create('Ext.window.Window', {
                                        title: 'Definir CPL ANAV',
                                        height: 255,
                                        modal:true,
                                        padding:10,
                                        width: 500,
                                        layout: 'anchor',
                                        items: [
                                            {
                                                xtype: 'numberfield',
                                               // anchor: '100%',
                                                name: 'cpl1',
                                                labelWidth :310,
                                                id: 'cpl1',
                                                fieldLabel: 'Cumpl. de los objetivos, tareas y misiones en el mes',
                                                //value: 1,
                                                maxValue: 5,
                                                minValue: 0
                                            },
                                            {
                                                xtype: 'numberfield',
                                                labelWidth :310,
                                                name: 'cpl2',
                                                id: 'cpl2',
                                                fieldLabel: 'Calidad del Trabajo realizado',
                                                //value: 1,
                                                maxValue: 5,
                                                minValue: 0
                                            },
                                            {
                                                xtype: 'numberfield',
                                                labelWidth :310,
                                                name: 'cpl3',
                                                id: 'cpl3',
                                                fieldLabel: 'Iniciativa en la solución y ejecución del trabajo',
                                                //value: 1,
                                                maxValue: 5,
                                                minValue: 0
                                            },
                                            {
                                                xtype: 'numberfield',
                                                labelWidth :310,
                                                name: 'cpl4',
                                                id: 'cpl4',
                                                fieldLabel: 'Disciplina laboral y tecn., aprovechamiento de la JL',
                                                //value: 1,
                                                maxValue: 5,
                                                minValue: 0
                                            },
                                            {
                                                xtype: 'numberfield',
                                                labelWidth :310,
                                                name: 'cpl5',
                                                id: 'cpl5',
                                                fieldLabel: 'Exigencia en el cumplimiento del mantenimiento',
                                                //value: 1,
                                                maxValue: 5,
                                                minValue: 0
                                            }
                                        ],
                                        buttons: [
                                            { text: 'Aceptar',handler:function(){
                                             if(id!='' && id!=null)
                                                {
                                                var fnCallBack = function()   {
                                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                    var cpl1 = Ext.getCmp('cpl1').getValue();
                                                    var cpl2 = Ext.getCmp('cpl2').getValue();
                                                    var cpl3 = Ext.getCmp('cpl3').getValue();
                                                    var cpl4 = Ext.getCmp('cpl4').getValue();
                                                    var cpl5 = Ext.getCmp('cpl5').getValue();
                                                    var _result = App.PerformSyncServerRequest('Evaluaciones.Evaluaciones.addCpl',{id:id,cpl1:cpl1,cpl2:cpl2,cpl3:cpl3,cpl4:cpl4,cpl5:cpl5});
                                                    App.HideMsgBox();
                                                    if(_result)
                                                    {
                                                        This.up('grid').store.load();
                                                        App.InfoMessage('Información', 'Se a actualizado los CPL del cuadro');
                                                    }
                                                    else
                                                    {
                                                        This.up('grid').store.load();
                                                        App.InfoMessage('Información', 'Ocurrio un error');
                                                    }
                                                }
                                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                            }
                                            else{
                                                 App.InfoMessage('Información', 'Debe seleccionar un Mes y Año antes de enviar estos datos.<br><b>Nota :</b> Esto solo sucede despues de buscar los datos en el periodo deseado.');
                                             }
                                            }},
                                            { text: 'Cancelar',handler:function(){mywind2.close();} }
                                        ],
                                        listeners:{
                                            show:function(){
                                                var mes = Ext.getCmp('mes').getValue();
                                                var anno = Ext.getCmp('anno').getValue();
                                                var cpl1=0;
                                                var cpl2=0;
                                                var cpl3=0;
                                                var cpl4=0;
                                                var cpl5=0;
                                                if(mes!='' && anno !=''&& mes!=null && anno !=null){
                                                    var _selected_rcd = Ext.getCmp('grid').getSelectionModel().getLastSelected();
                                                    var id = _selected_rcd.data.id;
                                                    var result = App.PerformSyncServerRequest('Evaluaciones.Evaluaciones.Cobro1', {mes: mes,anno:anno,id:id});
                                                    if(result.rows!=false){
                                                        cpl1 = result.rows[0].cpl1;
                                                        cpl2 = result.rows[0].cpl2;
                                                        cpl3 = result.rows[0].cpl3;
                                                        cpl4 = result.rows[0].cpl4;
                                                        cpl5 = result.rows[0].cpl5;
                                                        Ext.getCmp('cpl1').setValue(cpl1);
                                                        Ext.getCmp('cpl2').setValue(cpl2);
                                                        Ext.getCmp('cpl3').setValue(cpl3);
                                                        Ext.getCmp('cpl4').setValue(cpl4);
                                                        Ext.getCmp('cpl5').setValue(cpl5);
                                                    }
                                                    else{
                                                        Ext.getCmp('cpl1').setValue(cpl1);
                                                        Ext.getCmp('cpl2').setValue(cpl2);
                                                        Ext.getCmp('cpl3').setValue(cpl3);
                                                        Ext.getCmp('cpl4').setValue(cpl4);
                                                        Ext.getCmp('cpl5').setValue(cpl5);
                                                    }
                                                }
                                                else {
                                                        Ext.getCmp('cpl1').setValue(cpl1);
                                                        Ext.getCmp('cpl2').setValue(cpl2);
                                                        Ext.getCmp('cpl3').setValue(cpl3);
                                                        Ext.getCmp('cpl4').setValue(cpl4);
                                                        Ext.getCmp('cpl5').setValue(cpl5);
                                                    }
                                               }
                                        }
                                    }).show();

                                }
                            },
                            {
                                xtype: 'button',
                                text : 'Ver Evaluación',
                                hideLabel:true,
                                iconCls:'office_addressbook16',
                                handler:function(){
                                    var a='Hola Mundo';
                                  App.PrintModel(a);
                                }
                            },
                            {
                                xtype: 'button',
                                text : 'Señalamientos',
                                name : 'Sena',
                                id : 'Sena',
                                hideLabel:true,
                                disabled : true,
                                iconCls:'office_addressbook16',
                                handler:function(){
                                    var _selected_rcd = Ext.getCmp('grid').getSelectionModel().getLastSelected();
                                    var id = _selected_rcd.data.id;
                                    var cellEditing12 = new Ext.grid.plugin.CellEditing({clicksToEdit: 1});
                                    this.__data_store = App.BuildJsonStore('Evaluaciones.Evaluaciones.senal',{
                                        fields: [
                                            {name: 'id'},
                                            {name: 'descr'},
                                            {name: 'fecha'},
                                            {name: 'activo'},
                                            {name: 'id_cuaro'}
                                        ],
                                        params:{id:id},
                                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                                        autoLoad: true
                                    });
                                    var mywind21 =   Ext.create('Ext.window.Window', {
                                        title: 'Historial de  Señalamiento',
                                        modal:true,
                                        padding:10,
                                        width: '70%',
                                        height: '80%',
                                        layout: 'fit',
                                        items:[
                                            {
                                                xtype: 'grid',
                                                border: false,
                                                plugins: [cellEditing12],
                                                columns: [
                                                    {header: 'Señalamiento',dataIndex:'descr',flex:6,
                                                        editor: {
                                                        allowBlank: false
                                                    }},
                                                    {header: 'Fecha',dataIndex:'fecha',flex:2,
                                                     renderer: Ext.util.Format.dateRenderer('M d, Y'),
                                                        editor: {
                                                            xtype: 'datefield',
                                                            format: 'm/d/y',
                                                            minValue: '01/01/06',
                                                            disabledDays: [0, 6],
                                                            disabledDaysText: 'Plants are not available on the weekends'
                                                        }},
                                                    {header: 'id',dataIndex:'id_cuaro',flex:2,hidden:true},
                                                    {header: 'Active',dataIndex:'activo', xtype: 'checkcolumn',width: 55}
                                                ],
                                                store:  this.__data_store,
                                                bbar: [
                                                    {
                                                    xtype: 'pagingtoolbar',
                                                    pageSize: 10,
                                                    store: this.__data_store,
                                                    id: 'senal_tbar_id',
                                                    height: 28
                                                }
                                                    ,'->',
                                                    {
                                                        text: 'Adicionar',
                                                        id: 'boton',
                                                        name: 'boton',
                                                        tooltip : 'Adiciona senalamiento',
                                                        iconCls: 'add',
                                                        xtype:'button',
                                                        cls:'btn',
                                                        listeners:{
                                                            click:function( This, eOpts ){
                                                                Ext.define('FILA',{
                                                                    extend: 'Ext.data.Model',
                                                                    fields: [
                                                                        {name: 'id'},
                                                                        {name: 'descr'},
                                                                        {name: 'fecha'},
                                                                        {name: 'activo'},
                                                                        {name: 'id_cuaro'}
                                                                    ]
                                                                });
                                                                var record = new FILA({descr:'',fecha:'',activo:'',id_cuaro:id});
                                                                This.up('grid').getStore().add(record);
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        cls:'btn',
                                                        id: 'boton_guardar',
                                                        name: 'boton_guardar',
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
                                                                    var _result = App.PerformSyncServerRequest('Evaluaciones.Evaluaciones.Addsenal', {data: Ext.encode(_array)});
                                                                    App.HideMsgBox();
                                                                    if(_result)
                                                                    {
                                                                        This.up('grid').store.load();
                                                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                                    }
                                                                    else
                                                                    {
                                                                        This.up('grid').store.load();
                                                                        App.InfoMessage('Información', 'Ocurrio un error');
                                                                    }
                                                                }
                                                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                                            }


                                                        }
                                                    },
                                                    {
                                                        text: 'Eliminar',
                                                        id: 'Eliminar',
                                                        name: 'Eliminar',
                                                        tooltip : 'Eliminar una fila',
                                                        iconCls: 'del_item',
                                                        xtype:'button',
                                                        cls:'btn',
                                                        handler:function(This){
                                                            var _selectionModel = This.up('grid').getSelectionModel();
                                                            var _selected_rcd = _selectionModel.getLastSelected();
                                                            var id = _selected_rcd.data.id;
                                                            var record = _selected_rcd ;
                                                            if(id == null || id==''){
                                                                This.up('grid').store.remove(record);}
                                                            else{
                                                                var fnCallBack = function()   {
                                                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                                    var _result = App.PerformSyncServerRequest('Evaluaciones.Evaluaciones.delsenal', {id:id});
                                                                    App.HideMsgBox();
                                                                    if(_result)
                                                                    {
                                                                        This.up('grid').store.remove(record);
                                                                        App.InfoMessage('Información', 'Ha eliminado el señalamiento.');
                                                                    }
                                                                    else
                                                                    {
                                                                       // Ext.getCmp('cap'+area).getStore().load({area: area})
                                                                        App.InfoMessage('Información', 'Ocurrio un error');
                                                                    }
                                                                }
                                                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');




                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }).show();
                                }
                            },
                            {
                                        xtype: 'button',
                                        id: 'boton_guardar_gen',
                                        name: 'boton_guardar_gen',
                                        iconCls: 'document_save16',
                                        text : 'Guardar Información',
                                        handler:function( This, eOpts){
                                        var mydd =new Array();
                                        _array = new Array();

                                        var mydd = This.up('grid').getStore().getModifiedRecords();
                                        if (mydd.length === 0)
                                        { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                                        else
                                        {
                                            var mes = Ext.getCmp('mes').getValue();
                                            var anno= Ext.getCmp('anno').getValue();
                                            if(mes!='' && anno !=''&& mes!=null && anno !=null){
                                                for (var i = 0; i < mydd.length; i++){
                                                    _array.push(mydd[i].getData());
                                                }
                                                var fnCallBack = function(){
                                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                    var _result = App.PerformSyncServerRequest('Evaluaciones.Evaluaciones.guardar_gen', {data: Ext.encode(_array)});
                                                    App.HideMsgBox();
                                                    if(_result)
                                                    {
                                                        This.up('grid').store.load();
                                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                    }
                                                    else
                                                    {
                                                        This.up('grid').store.load();
                                                        App.InfoMessage('Información', 'Ocurrio un error');
                                                    }
                                                }
                                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');

                                            }
                                            else{
                                                App.InfoMessage('Información', 'Debe seleccionar un Mes y Año antes de enviar estos datos.<br><b>Nota :</b> Esto solo sucede despues de buscar los datos en el periodo deseado.');
                                            }
                                        }

                                    }

                            }
                        ],
                        height: 28
                    }
                }
            ]
        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Evaluaciones',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [panel_datos],
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
App.RegisterModule('Evaluaciones', new Evaluaciones());