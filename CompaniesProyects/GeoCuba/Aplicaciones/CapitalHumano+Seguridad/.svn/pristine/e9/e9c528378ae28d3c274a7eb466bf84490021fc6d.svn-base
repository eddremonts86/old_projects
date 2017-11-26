function Targeta(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Entrada y Salida',
            id: 'Targeta_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
       this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
        var toolBa=Ext.create('Ext.toolbar.Toolbar', {
            renderTo: document.body,
            width   : 500,
            items: [
                {
                    xtype: 'textfield',
                    name: 'searchField_toolBa',
                    id:'searchField_toolBa',
                    enableKeyEvents : true,
                    hideLabel: true,
                    width: 200,
                    emptyText:'Filtrar por: Trabajador...',
                    listeners: {
                        change:function(){
                            Ext.getCmp('_grid_trabajadores').store.clearFilter();
                            Ext.getCmp('_grid_trabajadores').store.filter("nombre_completo", Ext.getCmp('searchField_toolBa').getValue());

                        },scope:this
                    }
                },'-','->',
                {
                    xtype: 'button',
                    //text : 'Ayuda',
                    iconCls:'help',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'25%',
                            width:'55%',
                            padding:'10px',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El apartado <span class="label label-info">" Solicitud de los trabajadores"</span>' +
                                    ' le permite gestionar las necesidad de cursos para cada trabajadores.<br>' +
                                    '<span class="label label-warning">Debe saber que :</span>' +
                                    '<br>Los trabajadores en car&aacute;cter individual pueden necesitar m&aacute;s de un curso estos deben ser adicionados al apartado ' +
                                    '<span class="label label-info">Cursos de los trabajadores</span> para la gestión empresarial dada.<br>' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }}

            ]
        });
        var toolB=Ext.create('Ext.toolbar.Toolbar', {
            width   : 500,
            id:'dzate',
            name:'dzate',
            items: [
                {
                    xtype: 'button',
                    text : 'Nuevo d&iacute;a',
                    cls:'btn',
                    iconCls:'date',
                    handler:function(){
                        Ext.define('FILA',{
                            extend: 'Ext.data.Model',
                            fields: [{name: 'hora_entrada'},
                                    {name: 'hora_salida'},
                                    {name: 'observaciones'},
                                    {name: 'dia'},
                                    {name: 'id'},
                                    {name: 'entrada'},
                                    {name: 'salida'}
                            ]
                        });
                        var _result = App.PerformSyncServerRequest('Targeta.Targeta.dia');
                        var dia = Ext.decode(_result);
                        var record = new FILA({dia : dia,hora_salida : '',hora_entrada : '',observaciones : 'Sin datos'});
                        Ext.getCmp('_grid_targeta').store.add(record);
                    }
                }]
        });

    //------------------------------------------------------------------------------------ 
       this.solicituedes = App.BuildJsonStore('Targeta.Targeta.plantila',{
            fields: [
                        {name: 'area'},
                        {name: 'agencia'},
                        {name: 'nombre_completo'},
                        {name: 'tipo'},
                        {name: 'contrato_id'},
                        {name: 'img'}
                    ],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            sortInfo: {field: 'area',direction: 'ASC'},
            autoLoad: false
        });
       this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
       var _grid_trabajadores = Ext.create('Ext.grid.Panel', {
            id: '_grid_trabajadores',
            margin: '0 5 0',
            store: this.solicituedes,
            columns:[
                {text: "Foto", dataIndex:'img',renderer:photo},
                {text: "Trabajador", flex: 2, dataIndex: 'nombre_completo'},
                {text: "Agencia", flex: 1, dataIndex: 'agencia'},
                {text: "&Aacute;rea", flex: 1, dataIndex: 'area'},
                {text: "Horario", flex: 1, dataIndex: 'tipo'}
            ],
            plugins: [this.cellEditing],
            enableLocking: true,
            width: '100%',
            height:435,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.solicituedes,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
           listeners: {
               itemclick: {
                   fn: function() {
                       var _selectionModel = Ext.getCmp('_grid_trabajadores').getSelectionModel();
                       var _selected_rcd = _selectionModel.getLastSelected();
                       var contrato_id = _selected_rcd.data.contrato_id;
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
                           sortInfo: {field: 'dia',direction: 'DESC'},
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
                   },
                   scope: this
               }}
             });
       var _grid_targeta = Ext.create('Ext.grid.Panel', {
            id: '_grid_targeta',
            margin: '0 5 0',
            store:this.Gestion_Solicitud,
            columns: [
                {text: "D&iacute;a Laboral", flex: 1, dataIndex: 'dia'},
                {text: "Entrada", flex: 1, dataIndex: 'hora_entrada',renderer:pintarentrada},
                {text: "Salida", flex: 1, dataIndex: 'hora_salida',renderer:pintarsalida}
            ],
           plugins: [this.cellEditing,{
               ptype: 'rowexpander',
               rowBodyTpl : new Ext.XTemplate(
                   '<table class="table table-bordered mejorar">' ,
                   '<tr class="info">',
                   '<td><div class="label label-info">Observaciones:</div><br>{observaciones}</td>',
                   '</tr>',
                   '<td></td>',
                   '</table>')

           }],
            enableLocking: true,
            width: '100%',
            height:435,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.Gestion_Solicitud,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
       var Aprobar_cursos = new Ext.Panel({
           title: 'Tarjeta de entrada',
           border: true,
           frame: true,
           layout: 'border',
           height: App.GetDesktopHeigth(),
           width: App.GetDesktopWidth(),
            plain: true,
            margin: '5 5 5',
            defaults: {bodyPadding: 10,autoScroll: true},
            layout: 'column', // arrange fieldsets side by side
            items: [
                {
                    xtype:'fieldset',
                    columnWidth: 0.6,
                    width:'100%',
                    title: 'Trabajador',
                    collapsible: false,
                    height:'98%',
                    id:'trabajadores4',
                    name:'trabajadores4',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[_grid_trabajadores,toolBa]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.4,
                    title: 'D&iacute;as Trabajados',
                    collapsible: false,
                    id:'cursos_trab5',
                    height:'98%',
                    width:'100%',
                    name:'cursos_trab5',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[_grid_targeta,toolB]
                }
                ],
           listeners: {
               afterrender: function() {
                   this.solicituedes.load({params:{start:0,limit:25}});
               },
               scope : this
           }
        });
    //----------------------------------------------------------------------------------
	 var _panel = new Ext.Panel({
            title: 'Tarjeta de entrada',
            border: true,
            frame: true,
            layout: 'border',
            height: '500px',
            width: '500px',
            items: [Aprobar_cursos],
            listeners: {
                afterrender: function() {
                    this.solicituedes.load({params:{start:0,limit:25}});
                   // this.Gestion_Solicitud .load({params:{start:0,limit:25}});
                },
                scope : this
            }
        });
	 return Aprobar_cursos;
    }
     this.Free = function()
    {
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Targeta', new Targeta());

function entrada(){
    var _selectionModel = Ext.getCmp('_grid_trabajadores').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var contrato_id = _selected_rcd.data.contrato_id;
    var result = App.PerformSyncServerRequest('Targeta.Targeta.entrada',{contrato_id:contrato_id});
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



}
function salida(){
    var _selectionModel = Ext.getCmp('_grid_targeta').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var id = _selected_rcd.data.id;
    var _selectionModel1 = Ext.getCmp('_grid_trabajadores').getSelectionModel();
    var _selected_rcd1 = _selectionModel1.getLastSelected();
    var contrato_id = _selected_rcd1.data.contrato_id;

    var result = App.PerformSyncServerRequest('Targeta.Targeta.salida',{id:id});
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
}
function pintarentrada(val2,met,record){
    var entrada  = record.data.hora_entrada;
    if(entrada!=''){ return '<span class="label label-info" style="float: right" >'+val2+'</span>';}
    if(entrada==''||entrada==null){return '<div style="float: right" onclick="entrada()">'+'<img src="SubSystems/Plantilla/Config/Client/icons/date.png">'+'</div>';}
    return val2;
}
function pintarsalida(val2,met,record){
    var salida = record.data.hora_salida;
    if(salida!=''&&salida!=null){return '<span class="label label-important" style="float: right" >'+val2+'</span>';}
    if(salida==''||salida==null){return '<div style="float: right" onclick="salida()">'+'<img src="SubSystems/Plantilla/Config/Client/icons/date.png">'+'</div>';}
    return val2;
}
function photo(val2,met,record){
    //console.log(record.data);
    var img = val2
    if(img == null||img == '')
    {return '<img width="64px" height="64px" src="App/Client/img/logo/user3.png"/>'}
    else
    { return '<img width="64px" height="64px" src="data:image/png;base64,'+ img +'"/>'}
}