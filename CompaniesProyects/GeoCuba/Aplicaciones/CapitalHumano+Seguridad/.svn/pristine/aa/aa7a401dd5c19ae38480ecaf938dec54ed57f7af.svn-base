function Plantilla(){
    this.__data_store = null;
    this._store_combo = null;
    this.Init = function()
    {                   
        var _menu_item_config_Plantilla =
        {
            text: 'Plantilla',
            id: 'Plantilla_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla',_menu_item_config_Plantilla);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Plantilla.Plantilla.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'trabajador'},
            {name: 'trabajadorid'},
            {name: 'nombre'},
            {name: 'p_apellido'},
            {name: 's_apellido'},
            {name: 'cargo'},
            {name: 'nombre_completo'},
            {name: 'cargo_id'},
            {name: 'horario'},
            {name: 'nombref'},
            {name: 'contrato_id'},
            {name: 'contrato_tabla_id'},
            {name: 'nombresist'},
            {name: 'licencia_a'},
            {name: 'baja_a'},
            {name: 'baja'},
            {name: 'licencia'}
            ],
            groupField : 'cargo',
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Cargo: {name} ' + ' ({rows.length})',
           // groupHeaderTpl: 'Cargo: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            ftype: 'grouping'
        });
        function pintar(val2,met,record,a,b,c,d){
            var bajas = record.data.baja_a;
            var licencia = record.data.licencia_a;
            if(bajas=="t"){
                met.style = 'font-style:italic !important;font-weight: bold;background: #71ED96;';

            }
            else if(licencia=="t"){
                met.style = 'font-style:italic !important;font-weight: bold;background: #71ED96;';
            }
            else if(bajas=="t" && licencia=="t"){
                met.style = 'font-style:italic !important;font-weight: bold;background: #71ED96;';
            }
            return val2;
        }
        var _grid = new Ext.grid.Panel(
        {
            id: 'Plantilla_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            features: [groupingFeature],
            columns: [{
                header: 'Trabajador',
                menuDisabled: true,
                sortable : false,renderer:pintar,
                dataIndex: 'nombre_completo',
                flex: 5
                },{
                header: 'Contrato',
                menuDisabled: true,
                sortable : false,renderer:pintar,
                dataIndex: 'nombre',
                flex: 5
            },{
                header: 'Tipo de Cargo',
                menuDisabled: true,
                sortable : false,renderer:pintar,
                dataIndex: 'cargo',
                flex: 5
            },{
                    header: 'Horario ',
                    menuDisabled: true,
                    sortable : false,renderer:pintar,
                    dataIndex: 'horario',
                    flex: 5
                },{
                    header: 'Forma de Pago ',
                    menuDisabled: true,renderer:pintar,
                    sortable : false,
                    dataIndex: 'nombref',
                    flex: 5
                },{
                    header: 'Sistema de Pago ',
                    menuDisabled: true,
                    sortable : false,renderer:pintar,
                    dataIndex: 'nombresist',
                    flex: 5
                }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Plantilla_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar:[ {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store:this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },('->'),{
                xtype: 'button',
               // text : 'Ayuda',
                iconCls:'help',
                handler:function(){
                    Ext.create('Ext.window.Window', {
                        title: '¿Necesita Ayuda?',
                        height:'75%',
                        width:'55%',
                        iconCls:'help',
                        autoScroll:true,modal:true,
                        layout: 'anchor',
                        html:
                            '<ul class="nav nav-list">' +
                                '<li>El modulo <span class="label label-info">" Gestionar Plantilla"</span>' +
                                ' le permite conocer y gestionar todos los trabajadores relacionados con sus contratos.' +
                                ' Es el modulo mas importante de el subsistema pues es la columna vertebral de la aplicacion.' +
                                '<br>Expliquemoslo:<br>' +
                                '1- Aunque en el momento de utilizar este modulo ya deben existir en la aplicaccion todos los trabajadores de la ' +
                                'empresa esto <span class="label label-important">no indica necesariamente </span>que todos ellos esten en plantilla, pues de todos esos trabajadores' +
                                ' talves alguno este de licencia y su puesto este siendo ocupado por otra persona.' +
                                '<br>2- El modulo plantilla esta pensado para que se vincule de forma sencilla a un trabajador con su contrato, siendo este el contenedor de ' +
                                ' la agencia, area, cargo,horario de trabajo, forma de pago, etc que tiene un trabajador en la empresa.<br>' +
                                '3- Cuando un trbajador solicita baja o licencia y esta solicitud es aprobada se reflejara en un <span class="label label-success">color vede</span> y ' +
                                'se debe proceder a eliminar este trabajador de la plantilla<br>' +

                                'A continuacion se citan todos los campos necesarios para realizar un contrato y llevarlo a plantilla.<br>' +
                                '<span class="label label-info">Tipo de Contrato: </span> Son los diferente formas de contratar a un trabajado (Adiestramiento,Temporal,etc)'+
                                '<br><span class="label label-info">Trabajador: </span> El trabajador al que se le asigna el contrato'+
                                '<br><span class="label label-info">Agencia: </span> La agencia a la que el trabajador pertenesera '+
                                '<br><span class="label label-info">Area/Departamento: </span> El area a la que el trabajador pertenesera'+
                                '<br><span class="label label-info">Tipo de Cargo: </span> El cargo que ocupara el trabajador'+
                                '<br><span class="label label-info">Sistema de pago: </span> El sistema de pago al que estara sujeto el trabajador'+
                                '<br><span class="label label-info">Forma de pago: </span>La forma de pago al que estara sujeto el trabajador'+
                                '<br><span class="label label-info">Horario de Trabajo: </span> El horario de trabajo al que estara sujeto el trabajador'+
                                '<br><span class="label label-info">Fecha de inicio: </span> Fecha de inicio del contrato'+
                                '<br><span class="label label-info">Fecha de fin: </span> Fecha de fin del contrato, en caso de no ser un contrato <span class="label label-infoes">Inderminado</span>'+
                                '<br><span class="label label-info">Datos Opcionales: </span> Es importante destacar que este apartado<span class="label label-important1"> solo se debe activar si</span> el trabajador al que se le hace el contrato ' +
                                ' es un cuadro y tendra bajo su  responsabilidad un areas,departamento,unidad o la empresa misma.'+


                                '</li>' +
                                '</li>' +
                                '</ul>'
                    }).show();
                }
            }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('PlantillaGestionar');
                        }
                        else
                        {
                          this.Enable('PlantillaGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Plantilla',
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
App.RegisterModule('Plantilla', new Plantilla());