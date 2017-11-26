function Cap_Trabajador(){
    var me= this;
    this.__data_store = null;
    this._store_combo = null;
    var main=null;
    var filter=null;
    this.Init = function()
    {                   
        var _menu_item_config_Cap_Trabajador =
        {
            text: ' Trabajador - Capacitaci&oacute;n',
            id: 'Cap_Trabajador_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Capacitación',_menu_item_config_Cap_Trabajador);
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
            'Ext.tip.QuickTipManager',
            'Ext.ux.form.ItemSelector',
            'Ext.ux.ajax.JsonSimlet',
            'Ext.ux.ajax.SimManager'
        ]);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Cap_Trabajador.Cap_Trabajador.CargarDatos',{
            fields: [
                {name: 'id_trabj'},
                {name: 'ncultural'},
                {name: 'integracion'},
                {name: 'nombre'},
                {name: 'esperiencia'},
                {name: 'eventos'},
                {name: 'publicaciones'},
                {name: 'investigaciones'},
                {name: 'diplomas'},
                {name: 'fecha'},
                {name: 'lugar'},
                {name: 'pais'},
                {name: 'lugar'},
                {name: 'categoriac'},
                {name: 'categoriad'},
                {name: 'gradoc'},
                {name: 'especialidad'},
                {name: 'area'},
                {name: 'agencia'},
                {name: 'cargo'},
                {name: 'procedencia'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            sorters: {property: 'agencia', direction: 'DESC'},
            autoLoad: false
            });
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
        var _grid = Ext.create('Ext.grid.Panel', {
            id: 'Cap_Trabajador_grid_id',
            margin: '0 5 0',
            store: this.__data_store,
            tbar: {
                id: 'Cap_Trabajador_cursos_tbar_id',
                items: ['-'],
                height: 28
            },
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Nombre", flex: 1, dataIndex: 'nombre'},
                {text: "Agencia",flex: 1, dataIndex: 'agencia'},
                {text: "Area",flex: 1, dataIndex: 'area'},
                {   text: "Resumen",
                    xtype:'actioncolumn',
                    width:70,
                    items: [{
                        iconCls:'user',
                        tooltip: 'Resumen del Trabajador',
                        handler: function(grid, rowIndex, colIndex) {
                            var rec = grid.getStore().getAt(rowIndex);
                            var lineaid = rec.id;
                            var id_trabj = rec.data.id_trabj ;
                            var ncultural =rec.data.ncultural ;
                            var integracion= rec.data.integracion ;
                            var nombre = rec.data.nombre ;
                            var esperiencia =rec.data.esperiencia ;
                            var eventos= rec.data.eventos ;
                            var publicaciones = rec.data.publicaciones ;
                            var investigaciones =rec.data.investigaciones ;
                            var diplomas= rec.data.diplomas ;
                            var fecha = rec.data.fecha ;
                            var lugar =rec.data.lugar ;
                            var pais= rec.data.pais ;
                            var categoriac = rec.data.categoriac ;
                            var categoriad =rec.data.categoriad ;
                            var gradoc= rec.data.gradoc ;
                            var especialidad =rec.data.especialidad ;
                            var area =rec.data.area ;
                            var agencia =rec.data.agencia ;
                            var cargo =rec.data.cargo ;
                            var procedencia =rec.data.procedencia ;
                            var cursos = App.PerformSyncServerRequest('Cap_Trabajador.Cap_Trabajador.CargarDatoscursosNombre',{id:id_trabj});
                            var result=[];
                            for(var a=0;a<cursos.results;a++)
                            {result.push(cursos.rows[a]);}

                            var resumen_win2 =  Ext.create('Ext.window.Window', {
                                height: App.GetDesktopHeigth() * 0.9,
                                width: App.GetDesktopWidth() * 0.7 ,
                                closable:false,
                                modal: true,
                                autoScroll : true,
                                id:'resumen_win2',
                                title:'Resumen de esperiencia laboral: '+' ' + nombre +'',
                                layout: 'fit',
                                html:
                                    '<table class="table table-hover table-bordered table-hover" width="90%">'+
                                      '  <thead>'+
                                       '     <tr class="btn-inverse">'+
                                        '        <th>Aspectos</th>'+
                                         '       <th>Descripci&oacute;n</th>'+
                                         '   </tr>'+
                                        '</thead>'+
                                        '<tbody>'+
                                            '<tr class="info">'+
                                                '<td> Nombre</td>'+
                                                '<td width="75%">'+ nombre +'</td>'+
                                           '</tr>'+
                                            '<tr>'+
                                                '<td>Pais de Graduaci&oacute;n</td>'+
                                                '<td width="75%">'+pais+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                                '<td>Lugar de Graduado</td>'+
                                                '<td width="75%">'+lugar+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td>Fecha de Graduado</td>'+
                                                '<td width="75%">'+fecha+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Especialidad de Graduado</td>'+
                                            '<td width="75%">'+especialidad+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td>Nivel Cultural</td>'+
                                            '<td width="75%">'+ncultural+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Integracion Pol&iacute;tica</td>'+
                                            '<td width="75%">'+integracion+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td>Categoria Cientifica</td>'+
                                            '<td width="75%">'+categoriac+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Categoria Docente</td>'+
                                            '<td width="75%">'+categoriad+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td>Grado Cientifico</td>'+
                                            '<td width="75%">'+gradoc+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Agencia</td>'+
                                            '<td width="75%">'+agencia+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td>Area</td>'+
                                            '<td width="75%">'+area+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Cargo</td>'+
                                            '<td width="75%">'+cargo+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td>Lugar de procedencia</td>'+
                                            '<td width="75%">'+procedencia+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Eventos</td>'+
                                            '<td width="75%">'+eventos+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td>Publicaciones</td>'+
                                            '<td width="75%">'+publicaciones+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Investigaciones</td>'+
                                            '<td width="75%">'+investigaciones+'</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                            '<td>Diplomas</td>'+
                                            '<td width="75%">'+diplomas+'</td>'+
                                            '</tr>'+
                                            '<tr class="info">'+
                                            '<td>Cursos</td>'+
                                            '<td width="75%">'+result+'</td>'+
                                            '</tr>'+
                                            '</tbody>'+
                                    '</table>'+
                                    '',
                                buttons: [
                                    {
                                        text: 'Imprimir', cls: 'btn btn-info',
                                       // handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                                        scope: this
                                    },
                                    {
                                        text: 'Cerrar', cls: 'btn btn-inverse',
                                        handler: function () {
                                            resumen_win2.close();
                                        }
                                    }
                                ]
                            }).show();
                        }
                    }]
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
            },('->'),{
        xtype: 'button',
            //text : 'Ayuda',
            iconCls:'help',
            handler:function(){
            Ext.create('Ext.window.Window', {
                title: '¿Necesita Ayuda?',
                height:'25%',
                width:'55%',
                iconCls:'help',
                autoScroll:true,modal:true,
                layout: 'anchor',
                html:
                    '<ul class="nav nav-list">' +
                        '<li>El modulo <span class="label label-info">" Formaci&oacute;n del Trabajador"</span>' +
                        ' le permite conocer la formacion profecional de los trabajadores ordenados por agencias, podra navegar por toda la plantilla de la empresa' +
                        ' y ver resumenes de un trabajador expecifico a la ves que modificar su informacion particular.<br>' +
                        '</li>' +
                        '</ul>'

            }).show();
        }
    }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('Cap_TrabajadorGestionar');
                        }
                        else
                        {
                          this.Enable('Cap_TrabajadorGestionar');
                        }
                    },
                    scope: this
                    }
            }

        });
        var _panel = new Ext.Panel({
            title: 'Formaci&oacute;n del Trabajador',
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
App.RegisterModule('Cap_Trabajador', new Cap_Trabajador());