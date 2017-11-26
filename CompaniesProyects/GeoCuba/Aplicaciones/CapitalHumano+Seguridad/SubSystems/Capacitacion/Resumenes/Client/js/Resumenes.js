function Resumenes() {
    this.__data_store = null;
    var showSummary = true;
    this.grid = null;
    var _scope = this;
    this.Init = function () {
        Ext.require(['Ext.tip.*','Ext.grid.*','Ext.grid.plugin.*','Ext.grid.features.*','Ext.util.*','Ext.toolbar.Paging','Ext.ux.SlidingPager','Ext.ux.PreviewPlugin','Ext.ModelManager','Ext.tip.QuickTipManager']);
        Ext.require(['Ext.chart.*','Ext.Window', 'Ext.layout.container.Fit', 'Ext.fx.target.Sprite', 'Ext.window.MessageBox','Ext.layout.container.Table','Ext.ux.Spotlight']);
        Ext.require(['Ext.form.*','Ext.layout.container.Column','Ext.fx.target.Element']);

        var _menu_item_config_Reportes =
        {
            text: 'Todos los Reportes',
            id: 'LCIndeterminado_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Reportes', _menu_item_config_Reportes);

    }
    // ========================================================================//
    this.BuildMainPanel = function (filterObj) {
//======================================================================================================================
        var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false});
        this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.completamientoPlantilla', {
            fields: [

                {name: 'nombre'},
                {name: 'existencia', type: 'int'},
                {name: 'cantidad_plazas', type: 'int'},
                {name: 'por_ciento'},
                {name: 'trabajando', type: 'int'}
            ],
            sorters: {property: 'nombre', direction: 'ASC'},
            proxy: {
                type: 'ajax',
                reader: {type: 'json', root: 'rows', totalProperty: 'results'}
            },
            autoLoad: true
        });
        var _grid = new Ext.grid.Panel(
            {
                id: 'LCIndeterminado_grid_id',
                height: App.GetDesktopHeigth() - 35,
                width: '100%',
                region: 'center',
                frame: true,
                selType: 'rowmodel',
                enableColumnHide: false,
                columnLines: true,
                viewConfig: {stripeRows: true},
                enableColumnMove: true,
                enableColumnResize: true,
                sortableColumns: true,
                features: [
                    {ftype: 'summary'},
                    grouping_Feature_categorias
                ],
                store: this.__data_store,
                columns: [
                    Ext.create('Ext.grid.RowNumberer'),
                    {
                        width: 250,
                        locked: true,
                        lockable: true,
                        text: 'Areas',
                        dataIndex: 'nombre',
                        summaryType: 'count',
                        summaryRenderer: function (value, summaryData, dataIndex) {
                            return Ext.String.format('{0} Area{1}', value, value !== 1 ? 's' : '');
                        }
                    },
                    {
                        flex: 1,
                        text: 'Plazas',
                        dataIndex: 'cantidad_plazas',
                        summaryType: 'sum'

                    },
                    {
                        flex: 1,
                        text: 'Ocupadas',
                        dataIndex: 'trabajando',
                        summaryType: 'sum'

                    },
                    {
                        text: 'Existencia',
                        dataIndex: 'existencia',
                        flex: 1,
                        summaryType: 'sum'
                    },
                    {
                        text: 'Cumplimieto  (%)',
                        dataIndex: 'por_ciento',
                        flex: 1

                    }
                ],
                viewConfig: {forceFit: true},
                bbar: {
                    id: 'tbar_id',
                    items: ['-']
                }

            });

//======================================================================================================================
        var panel_tree = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: '22%',
            autoScroll: true,
            layout: 'anchor',
            region: 'east',
            collapsed: false,
            animCollapse: true,
            collapsible: true,
            tools:[
                {
                    type:'help',
                    tooltip: '¿Necesita Ayuda?',
                    handler: function(event, toolEl, panel){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'55%',iconCls:'help',
                            width:'50%',
                            autoScroll:true,modal:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El modulo <span class="label label-info">" Todos los Reportes"</span>' +
                                    ' le permite navegar por una extensa gama de reporte y consultas para entender el funcionamiento actual de la empresa ' +
                                    'ademas de poder sacar concluciones para un area determinada de la misma.</li>' +
                                    '<li>Posee apartados importantes en los cuales se resumen otras funcionalidades que nos devolveran información referente a ' +
                                    'la empresas y sus facetas, estos son: <br>' +

                                    '<span class="label label-success">An&aacute;lisis de plantilla :</span><br>' +
                                    'Anailizar la plantilla permite conocer el completamiento de la misma ,la situacion de la fuerza lavoral en base a su ocupacion y contrato. <br>' +

                                    '<span class="label label-success">Estructura de plantilla :</span><br>' +
                                    'Divide la plantilla por cargos en unidades y areas ademas de conocer las plasas ocupadas y vacantes de la empresa.<br>' +

                                    '<span class="label label-success">Listado de trabajadores :</span><br>' +
                                    'Listar los trabajadores contratados en la empresa por tipos de contratos(Indeeterminad,Temporales...). <br>' +

                                    '<span class="label label-success">Fluctuaci&oacute;n de la fuerza de trabajo :</span><br>' +
                                    '¿Fluctua la plantilla de la empresa ? ¿Cuantos trabajadores han solicitado la baja o liciancia? ' +
                                    '¿Quienes son? En este apartado lo podras saber.<br>' +
                                    'Debe saber que el <span class="label label-info">color azul</span> determina los trabajadores que han' +
                                    ' solicitado licencias y el <span class="label label-important1">color rojo</span> las bajas. <br>' +

                                    '<span class="label label-success">Trabajadores seg&uacute;n integraci&oacute;n y nivel :</span><br>' +
                                    'Listado de los trabajadores segun su integracion politica y nivel cultural<br>' +

                                    '<span class="label label-success">Vestuario de los trabajadores :</span><br>' +
                                    'El vestuario de los trabajadores digase sus tallas y necesidades de la empresa para satisfacer la demanda de unifomes u otros implementos<br>'+

                                    '<span class="label label-success">Antig&uuml;edad de los trabajadores :</span><br>' +
                                    'Es necesario saber la antiguedad de los trabajadores en la empresa para poder dar un trato justo y a la ves diferenciado con la plantilla aqui podra conocerlo<br>' +

                                    '<span class="label label-success">Ubicaci&oacute;n de la Defensa :</span><br>' +
                                    'Listado de trabajadores segun registro militar y unidad militar a la que pertenecen.' +

                                    '<br><span class="label label-success">Consultas:</span><br>' +
                                    'Conosca la dispocicion de la empresa en cuanto a sexe, edad , color de piel, lugar de procedencia, etc' +

                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
                }],
            // collapseMode:'mini',
            defaults: {anchor: '100%'},
            html: '<div class="accordion" id="accordion2">' +
                '<div class="accordion-group">' +
                '<div class="accordion-heading">' +
                '  <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">' +
                '  <i class="icon-search icon-white"></i>An&aacute;lisis de plantilla' +
                '       </a>' + '</div>' +
                '       <div id="collapseOne" class="accordion-body collapse ">' +
                '       <div class="accordion-inner" onclick="completamientoplantilla()"><a>' + 'Completamientos de plantilla </a></div>' +
                '       <div class="accordion-inner" onclick="Sit_fursa_laboral()"><a> ' + 'Situcion de la Fuerza Laboral </a></div>' +
                '       <div class="accordion-inner" onclick="plantilla_p4()"><a> ' + 'Situcion de la Fuerza Laboral-P4 </a></div>' +
                '       <div class="accordion-inner" onclick="completamientoplantilla_x_categorias_ocupacionales()"><a> ' + 'Fuerza Laboral por ocupaci&oacute;n </a></div>' +
                '       <div class="accordion-inner" onclick="completamientoplantilla_x_contrat()"><a> ' + 'Fuerza Laboral por contrato </a></div>' +
                '       <div class="accordion-inner" onclick="plantilla_p2()"><a> ' + 'Plantilla de personal (Oficial) </a></div>' +
                '       <div class="accordion-inner" onclick="plantilla_p2_actual()"><a> ' + 'Plantilla actual de personal  </a></div>' +
                '       <div class="accordion-inner" onclick="funtionAlert7()"><i class="icon-exclamation-sign"></i><a> ' + 'Informe de la Fuerza de trabajo(Oficial) </a></div>' +
                '       <div class="accordion-inner" onclick="funtionAlert7()"><i class="icon-exclamation-sign"></i><a> ' + 'Informe de la Fuerza de trabajo </a></div>' +
                '</div>' + '</div>' +
                '<div class="accordion-group">' +
                '<div class="accordion-heading">' +
                '  <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapse">' +
                '  <i class="icon-search icon-white"></i>Estructura de plantilla ' +
                '       </a>' + '</div>' +
                '       <div id="collapse" class="accordion-body collapse ">' +
                '       <div class="accordion-inner" onclick="CargosPlantilla()"><a>' + 'Plantilla de cargos </a></div>' +
                '       <div class="accordion-inner" onclick="CargosPlantilla_unidad()"><a>' + 'Plantilla de cargos por unidad </a></div>' +
                '       <div class="accordion-inner" onclick="CargosPlantilla_area()"><a>' + 'Plantilla de cargos por &aacute;rea(Oficial)</a></div>' +
                '       <div class="accordion-inner" onclick="CargosPlantilla_cargo_area()"><a>' + 'Plantilla de cargos por &aacute;rea</a></div>' +
                '       <div class="accordion-inner" onclick="plantilla_unidad_area()"><a>' + 'Cargos por unidad y &aacute;rea </a></div>' +
                '       <div class="accordion-inner" onclick="plantilla_plazas_vacantes()"><a>' + 'Plazas vacantes </a></div>' +
                '       <div class="accordion-inner" onclick="plantilla_plazas_ocupadas()"><a>' + 'Plazas ocupadas </a></div>' +
                '</div>' + '</div>' +
                '       <div class="accordion-group">' + '<div class="accordion-heading">' +
                '       <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo">' +
                '<i class="icon-search icon-white"></i>Listado de trabajadores' +
                '       </a>' + '</div>' +
                '       <div id="collapseTwo" class="accordion-body collapse">' +
                '       <div class="accordion-inner" onclick="TrabajadoresContratados()"><a> ' + 'Trabajadores contratados </a></div>' +
                '       <div class="accordion-inner" onclick="TrabajadoresIndefinidos()"><a> ' + 'Trabajadores contratados indeterminado </a></div>' +
                '       <div class="accordion-inner" onclick="TrabajadoresAprueba()"><a> ' + 'Trabajadores contratados a prueba </a></div>' +
                '       <div class="accordion-inner" onclick="TrabajadoresTemporales()"><a> ' + 'Trabajadores contratados temporalmente </a></div>' +
                '       <div class="accordion-inner" onclick="TrabajadoresAdiestrados()"><a> ' + 'Trabajadores adiestrados </a></div>' +
                '       <div class="accordion-inner" onclick="TrabajadoresDisponibles()"><a> ' + 'Trabajadores  disponibles </a></div>' +
                '       <div class="accordion-inner" onclick="TrabajadoresAdomicilio()"><a> ' + 'Trabajadores  a domicilio </a></div>' +
                '       <div class="accordion-inner" onclick="TrabajadoresVencidos()"><a> ' + 'Trabajadores con contratos vencidos </a></div>' +
                '</div>' + '</div>' +
                '      <div class="accordion-group">' + '<div class="accordion-heading">' +
                '       <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwoq">' +
                '<i class="icon-search icon-white"></i>Fluctuaci&oacute;n de la fuerza de trabajo' + '</div></a>' +
                '       <div id="collapseTwoq" class="accordion-body collapse">' +
                '  <div class="accordion-inner" onclick="Fluctuacion()"><a> ' + 'Fluctuacion de plantilla</a></div>' +
                '  <div class="accordion-inner" onclick="EstadoSolicitudes()"><a> ' + 'Estado de las Solicitudes(Bajas y Licencias)</a></div>' +
                '</div>' + '</div>' +
                '      <div class="accordion-group">' + '<div class="accordion-heading">' +
                '       <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#integracion">' +
                '<i class="icon-search icon-white"></i>Trabajadores seg&uacute;n integraci&oacute;n y nivel' + '</div></a>' +
                '       <div id="integracion" class="accordion-body collapse">' +
                '  <div class="accordion-inner" onclick="trabajador_nivel_superior()"><a> ' + 'Trabajadores con nivel Superior</a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_nivel_tecnico()"><a> ' + 'Trabajadores T&eacute;cnicos Medios</a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_nivel_obrero()"><a> ' + 'Trabajadores Obreros Calificados</a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_nivel_12mo()"><a> ' + 'Trabajadores con 12mo Grado</a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_nivel_9no()"><a> ' + 'Trabajadores con 9no Grado</a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_nivel_6to()"><a> ' + 'Trabajadores con 6to Grado</a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_nivel_ninguno()"><a> ' + 'Trabajadores sin nivel cultural </a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_del_pcc()"><a> ' + 'Trabajadores miembros del PCC</a></div>' +
                '  <div class="accordion-inner" onclick="trabajador_de_ujc()"><a> ' + 'Trabajadores miembros de la UJC</a></div>' +
                '  <div class="accordion-inner" onclick="tarbajador_sin_categoria()"><a> ' + 'Trabajadores sin integraci&oacute;n</a></div>' +
                '</div>' + '</div>' +
                '      <div class="accordion-group">' + '<div class="accordion-heading">' +
                '       <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Vestuario">' +
                '<i class="icon-search icon-white"></i>Vestuario de los trabajadores' + '</div></a>' +
                '       <div id="Vestuario" class="accordion-body collapse">' +
                '  <div class="accordion-inner" onclick="listado_ropa_trabajadores()"><a> ' + 'Listado de tallas</a></div>' +
                '  <div class="accordion-inner" onclick="listador_ropa_trabajadores_masculinos()"><a> ' + 'Listado de tallas(Masculino)</a></div>' +
                '  <div class="accordion-inner" onclick="listador_ropa_trabajadores_femeninos()"><a> ' + 'Listado de tallas(Femenino)</a></div>' +
//                '  <div class="accordion-inner" onclick="necesidad_de_pantalon_saya()"><a> ' + 'Necesidad de Pantal&oacute;n o Saya</a></div>' +
                '  <div class="accordion-inner" onclick="necesidad_de_blusas_camisas()"><a> ' + 'Necesidad de Tallas </a></div>' +
//                '  <div class="accordion-inner" onclick="necesidad_de_zapatos()"><a> ' + 'Necesidad de Zapatos</a></div>' +
                '</div>' + '</div>'+
                ' <div class="accordion-group">' + '<div class="accordion-heading">' +
                '       <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#antiguedad">' +
                '<i class="icon-search icon-white"></i>Antig&uuml;edad de los trabajadores' + '</div></a>' +
                ' <div id="antiguedad" class="accordion-body collapse">' +
                ' <div class="accordion-inner" onclick="trabajdores_antiguedad()"><a> ' + 'Trabajadores (Antig&uuml;edad) </a></div>' +
                ' <div class="accordion-inner" onclick="trabajdores_antiguedad_update()"><a> ' + 'Trabajadores (Cambio de Antig&uuml;edad) </a></div>' +
                ' <div class="accordion-inner" onclick="trabajadores_antiguredad_share()"><a> ' + 'Trabajadores segun antig&uuml;edad </a></div>' +
                '</div>' + '</div>'+
                ' <div class="accordion-group">' + '<div class="accordion-heading">' +
                ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#defensa">' +
                ' <i class="icon-search icon-white"></i>Ubicaci&oacute;n de la Defensa' + '</div></a>' +' <div id="defensa" class="accordion-body collapse">' +
                ' <div class="accordion-inner" onclick="SD_RegistroMilitar()"><a> ' + 'SD - Registro MilitarSD - Registro Militar </a></div>' +
                ' <div class="accordion-inner" onclick="SD_RegistroMilitar_trabajadores()"><a> ' + 'SD - Trabajadores </a></div>' +
                ' <div class="accordion-inner" onclick="SD_RegistroMilitar_trabajadores_noinc()"><a> ' + 'Trabajadores no incorporados </a></div>' +
                '</div>' + '</div>'
                +
                ' <div class="accordion-group">' + '<div class="accordion-heading-consultas">' +
                ' <a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#consultas">' +
                ' <i class="icon-search icon-white"></i>Consultas' + '</div></a>' +' <div id="consultas" class="accordion-body collapse">' +
                ' <div class="accordion-inner" onclick="CpfechaNa()"><a> ' + 'Listado de trabajadores por fecha de nacimiento </a></div>' +
                ' <div class="accordion-inner" onclick="Cespecial()"><a> ' + 'Listado de trabajadores por Especialidad </a></div>' +
                ' <div class="accordion-inner" onclick="Cclass()"><a> ' + 'Listado de trabajadores por clasificaci&oacute;n (D/I) </a></div>' +
                ' <div class="accordion-inner" onclick="Cmes()"><a> ' + 'Listado de trabajadores por Cumplea&ntilde;os(mes actual)</a></div>' +
                ' <div class="accordion-inner" onclick="Cprocedencia()"><a> ' + 'Listado de trabajadores por procedencia </a></div>' +
                ' <div class="accordion-inner" onclick="Sexo()"><a> ' + 'Listado de trabajadores por Sexo </a></div>' +
                ' <div class="accordion-inner" onclick="piel()"><a> ' + 'Listado de trabajadores por color de piel </a></div>' +
                ' <div class="accordion-inner" onclick="promedioedad()"><a> ' + 'Edad Promedio </a></div>' +
                '</div>' + '</div>'+
                '<div class="accordion" id="accordion2">' +
                '<div class="accordion-group">' + '<div class="accordion-heading">' +
                '<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#Especialidad">' +
                '<i class="icon-search icon-white"></i>Trabajadores segun integracion y nivel' + '</div></a>' +
                '  <div id="Especialidad" class="accordion-body collapse">' +
                '  <div class="accordion-inner" onclick="especialidad()"><a> ' + 'Especialidad por trabajadores</a></div>' +
                '  <div class="accordion-inner" onclick="contespecialidad()"><a> ' + 'Cantidad de trabajadores por Especialidad</a></div>' +
                '  <div class="accordion-inner" onclick="cursosSolicitados()"><a> ' + 'Cursos Solicitados</a></div>' +
                '</div>' +'</div>'
        });
        var _panel = new Ext.Panel({
            title: 'Todos Los reportes',
            border: true,
            id: 'panelNombre',
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: App.GetDesktopWidth(),
            items: [_grid, panel_tree],
            listeners: {
                afterrender: function () {
                    // this.__data_store.load({params: {start: 0, limit: 25}});
                },
                scope: this
            }
        });
        return _panel;
    }
    this.Free = function () {
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    this.ShowMainWindow = function () {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Resumenes', new Resumenes());

function TrabajadoresContratados() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    var _scope = this;
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.Tcontratados', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'procedencia'},
            {name: 'agencia'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'empresa'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'apellido'},
            {name: 'apellido_s'},
            {name: 'identidad'},
            {name: 'fnacimiento'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
   panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores contratados ');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'img',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 120
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            width: 240
        },
        {
            text: 'Area',
            dataIndex: 'area',
            width: 140
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    var _scope = this;
    this.grafica = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'grafica',
        text: 'Graficar',
        listeners: {
            scope: this,
            click: function () {
                var donut = false,
                    chart = Ext.create('Ext.chart.Chart', {
                        width: '100%',
                        height: '100%',
                        xtype: 'chart',
                        shadow: true,
                        animate: true,
                        legend: {position: 'right'},
                        insetPadding: 60,
                        store: _scope.__data_store,
                        theme: 'Base:gradients',
                        series: [
                            {
                                type: 'pie',
                                angleField: 'directos',
                                showInLegend: true,
                                tips: {
                                    trackMouse: true,
                                    width: 200,
                                    height: 28,
                                    renderer: function (storeItem, item) {
                                        var total = 0;
                                        _scope.__data_store.each(function (rec) {
                                            total += rec.get('cantidad_plazas');
                                        });
                                        this.setTitle(storeItem.get('nombre') + ': ' + Math.round(storeItem.get('directos') / total * 100) + '%');
                                    }
                                },
                                highlight: {
                                    segment: {
                                        margin: 20
                                    }
                                },
                                label: {
                                    field: 'nombre',
                                    display: 'rotate',
                                    contrast: true,
                                    font: '14px Arial'
                                }
                            }
                        ]
                    });
                Ext.create('Ext.window.Window', {
                    title: 'Graficos de la Aplicacion',
                    height: 550,
                    width: 800,
                    layout: 'fit',
                    items: chart
                }).show();
            }
        }
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                Ext.create('Ext.window.Window', {
                    title: 'Ventana de Imprecion',
                    height: 300,
                    width: 500,
                    layout: 'fit'
                }).show();
            }
        }});
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: _scope.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.grafica);
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
// ==============================Subsistema ---- Plantilla============================================================
function completamientoplantilla() {

    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.completamientoPlantilla', {
        fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'existencia', type: 'int'},
            {name: 'cantidad_plazas', type: 'int'},
            {name: 'por_ciento'},
            {name: 'trabajando', type: 'int'},
            {name: 'woman', type: 'int'},
            {name: 'oficial', type: 'int'},
            {name: 'indirectos', type: 'int'},
            {name: 'indeterminados', type: 'int'},
            {name: 'directos', type: 'int'},
            {name: 'temporales', type: 'int'},
            {name: 'a_prueba', type: 'int'},
            {name: 'adiestrados', type: 'int'},
            {name: 'disponibles', type: 'int'},
            {name: 'domiciliar', type: 'int'},
            {name: 'operarrios', type: 'int'},
            {name: 'tecnico', type: 'int'},
            {name: 'dirigente', type: 'int'},
            {name: 'administrativo', type: 'int'},
            {name: 'servicio', type: 'int'},
            {name: 'sincategoria', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Cumplimiento de Plantilla</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            width: 200,
            locked: true,
            lockable: true,
            text: '&Aacute;reas',
            dataIndex: 'nombre',
            summaryType: 'count',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('{0} &Aacute;rea{1}', value, value !== 1 ? 's' : '');
            }
        },
        {
            width: 60,
            text: 'Plazas',
            dataIndex: 'cantidad_plazas',
            summaryType: 'sum'

        },
        {
            width: 77,
            text: 'Ocupadas',
            dataIndex: 'trabajando',
            summaryType: 'sum'

        },
        {
            text: 'existencia',
            dataIndex: 'existencia',
            width: 80,
            summaryType: 'sum'
        },
        {
            text: '% Cumplimieto',
            dataIndex: 'por_ciento',
            width: 110
            //summaryType: ' '
        },
        {
            text: 'Otras Clasificaciones',
            columns: [
                {
                    text: 'Mujeres',
                    dataIndex: 'woman',
                    width: 70,
                    summaryType: 'sum'
                },
                {
                    text: 'Oficiales',
                    dataIndex: 'oficial',
                    width: 77,
                    summaryType: 'sum'
                },
                {
                    text: 'Directos',
                    dataIndex: 'directos',
                    width: 75,
                    summaryType: 'sum'
                },
                {
                    text: 'Indirectos',
                    dataIndex: 'indirectos',
                    width: 80,
                    summaryType: 'sum'
                }
            ]},
        {
            text: 'Tipos de contrato',
            columns: [
                {
                    text: 'Indeterminado',
                    dataIndex: 'indeterminados',
                    width: 110,
                    summaryType: 'sum'
                },
                {
                    text: 'Temporal',
                    dataIndex: 'temporales',
                    width: 80,
                    summaryType: 'sum'
                },
                {
                    text: 'Prueba',
                    dataIndex: 'a_prueba',
                    width: 70,
                    summaryType: 'sum'
                },
                {
                    text: 'Adiestrados',
                    dataIndex: 'adiestrados',
                    width: 90,
                    summaryType: 'sum'
                },
                {
                    text: 'Disponibles',
                    dataIndex: 'disponibles',
                    width: 85,
                    summaryType: 'sum'
                },
                {
                    text: 'Domiciliar',
                    dataIndex: 'domiciliar',
                    width: 80,
                    summaryType: 'sum'
                }
            ]},
        {
            text: 'Categoria Ocupacional',
            columns: [

                {
                    text: 'Operarios',
                    dataIndex: 'operarrios',
                    width: 80,
                    summaryType: 'sum'
                },
                {
                    text: 'T&eacute;cnico',
                    dataIndex: 'tecnico',
                    width: 70,
                    summaryType: 'sum'
                },
                {
                    text: 'Dirigente',
                    dataIndex: 'dirigente',
                    width: 80,
                    summaryType: 'sum'
                },
                {
                    text: 'Administrativo',
                    dataIndex: 'administrativo',
                    width: 110,
                    summaryType: 'sum'
                },
                {
                    text: 'Servicio',
                    dataIndex: 'servicio',
                    width: 80,
                    summaryType: 'sum'
                }
            ]}
    ]);

    var _scope = this;
    this.grafica = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'grafica',
        animateTarget:'grafica',
        text: 'Graficar',
        listeners: {
            scope: this,
            click: function () {
                var donut = false,
                    chart = Ext.create('Ext.chart.Chart', {
                        width: '100%',
                        height: '100%',
                        xtype: 'chart',
                        shadow: true,
                        animate: true,
                        legend: {position: 'right'},
                        insetPadding: 60,
                        store: this.__data_store,
                        theme: 'Base:gradients',
                        series: [{
                            type: 'pie',
                            angleField: 'cantidad_plazas',
                            showInLegend: true,
                            tips: {
                                trackMouse: true,
                                width: 200,
                                height: 28,
                                renderer: function (storeItem, item) {
                                    var total = 0;
                                    _scope.__data_store.each(function (rec) {
                                        total += rec.get('cantidad_plazas');
                                    });
                                    this.setTitle(storeItem.get('nombre') + ': ' + Math.round(storeItem.get('cantidad_plazas') / total * 100) + '%');
                                }
                            },
                            highlight: {
                                segment: {
                                    margin: 20
                                }
                            },
                            label: {
                                field: 'nombre',
                                display: 'rotate',
                                contrast: true,
                                font: '14px Arial'
                            }
                        }
                        ]
                    });
                Ext.create('Ext.window.Window', {
                    title: 'Graficos de la Aplicacion',
                    height: 550,
                    width: 800,
                    layout: 'fit',
                    items:[chart]
                }).show('grafica');
            }
        }
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpCompPlantilla',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
//                Ext.create('Ext.window.Window', {
//                    title: 'Ventana de Imprecion',
//                    height: 300,
//                    width: 500,
//                    layout: 'fit'
//                }).show();
            }
        }});
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: _scope.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.grafica);
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');

    Ext.resumeLayouts(true);
}
function Sit_fursa_laboral() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store1 = App.BuildJsonStore('Resumenes.Resumenes.completamientoPlantilla', {
        fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'existencia'},
            {name: 'cantidad_plazas'},
            {name: 'por_ciento'},
            {name: 'trabajando'},
            {name: 'woman'},
            {name: 'oficial'},
            {name: 'indirectos'},
            {name: 'indeterminados'},
            {name: 'directos'},
            {name: 'temporales'},
            {name: 'a_prueba'},
            {name: 'adiestrados'},
            {name: 'disponibles'},
            {name: 'domiciliar'},
            {name: 'operarrios'},
            {name: 'tecnico'},
            {name: 'dirigente'},
            {name: 'administrativo'},
            {name: 'servicio'},
            {name: 'sincategoria'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store1.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Situacion de la fuerza laboral</span>');
    grid.reconfigure(this.__data_store1, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            width: 150,
            locked: true,
            lockable: true,
            text: '&Aacute;reas',
            dataIndex: 'nombre'
        },
        {
            width: 60,
            text: 'Plazas',
            dataIndex: 'cantidad_plazas'

        }/*,
         {
         width: 77,
         text: 'Ocupadas',
         dataIndex: 'trabajando'

         },
         {
         text: 'existencia',
         dataIndex: 'existencia',
         width: 80
         },
         {
         text: '% Cumplimieto',
         dataIndex: 'por_ciento',
         width: 110
         },*/,
        {
            text: 'Otras Clasificaciones',
            columns: [
                {
                    text: 'Mujeres',
                    dataIndex: 'woman',
                    width: 70
                },
                {
                    text: 'Oficiales',
                    dataIndex: 'oficial',
                    width: 77
                },
                {
                    text: 'Directos',
                    dataIndex: 'directos',
                    width: 75
                },
                {
                    text: 'Indirectos',
                    dataIndex: 'indirectos',
                    width: 80
                }
            ]},
        {
            text: 'Tipos de contrato',
            columns: [
                {
                    text: 'Indeterminado',
                    dataIndex: 'indeterminados',
                    width: 110
                },
                {
                    text: 'Temporal',
                    dataIndex: 'temporales',
                    width: 80
                },
                {
                    text: 'Prueba',
                    dataIndex: 'a_prueba',
                    width: 70
                },
                {
                    text: 'Adiestrados',
                    dataIndex: 'adiestrados',
                    width: 90
                },
                {
                    text: 'Disponibles',
                    dataIndex: 'disponibles',
                    width: 85
                },
                {
                    text: 'Domiciliar',
                    dataIndex: 'domiciliar',
                    width: 80
                }
            ]},
        {
            text: 'Categoria Ocupacional',
            columns: [

                {
                    text: 'Operarios',
                    dataIndex: 'operarrios',
                    width: 80
                },
                {
                    text: 'T&eacute;cnico',
                    dataIndex: 'tecnico',
                    width: 70
                },
                {
                    text: 'Dirigente',
                    dataIndex: 'dirigente',
                    width: 80
                },
                {
                    text: 'Administrativo',
                    dataIndex: 'administrativo',
                    width: 110
                },
                {
                    text: 'Servicio',
                    dataIndex: 'servicio',
                    width: 80
                }
            ]}
    ]);

    var _scope = this;
    this.grafica = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'grafica',
        text: 'Graficar',
        listeners: {
            scope: this,
            click: function () {
                var donut = false,
                    chart = Ext.create('Ext.chart.Chart', {
                        width: '100%',
                        height: '100%',
                        xtype: 'chart',
                        shadow: true,
                        animate: true,
                        legend: {position: 'right'},
                        insetPadding: 60,
                        store: _scope.__data_store1,
                        theme: 'Base:gradients',
                        series: [
                            {
                                type: 'pie',
                                angleField: 'directos',
                                showInLegend: true,
                                tips: {
                                    trackMouse: true,
                                    width: 200,
                                    height: 28,
                                    renderer: function (storeItem, item) {
                                        var total = 0;
                                        _scope.__data_store1.each(function (rec) {
                                            total += rec.get('cantidad_plazas');
                                        });
                                        this.setTitle(storeItem.get('nombre') + ': ' + Math.round(storeItem.get('directos') / total * 100) + '%');
                                    }
                                },
                                highlight: {
                                    segment: {
                                        margin: 20
                                    }
                                },
                                label: {
                                    field: 'nombre',
                                    display: 'rotate',
                                    contrast: true,
                                    font: '14px Arial'
                                }
                            }
                        ]
                    });
                Ext.create('Ext.window.Window', {
                    title: 'Graficos de la Aplicacion',
                    height: 550,
                    width: 800,
                    layout: 'fit',
                    items: chart
                }).show();
            }
        }
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpCompPlantilla',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load({params:{reporte:'sit_fuerza_laboral'}});
            }
        }});
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: _scope.__data_store1,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function plantilla_p4() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store1 = App.BuildJsonStore('Resumenes.Resumenes.p4', {
        fields: [
            {name: 'trbajador'},
            {name: 'cargo'},
            {name: 'cies',type:'int'},
            {name: 'cla',type:'int'},
            {name: 'sal_adic',type:'int'},
            {name: 'escala'},
            {name: 'antiguedead',type:'int'},
            {name: 'tnc',type:'int'},
            {name: 'otros',type:'int'},
            {name: 'agencia'},
            {name: 'area'},
            {name: 'nomina'},
            {name: 'codigo'},
            {name: 'salario_adicional',type:'int'},
            {name: 'catocup'},
            {name: 'di'},
            {name: 'salario',type:'int'},
            {name: 'np'},
            {name: 'fecha_final'},
            {name: 'fecha_inicio'},
            {name: 'mbajas'},
            {name: 'dbajas'},
            {name: 'tipo_contrato'}

        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store1.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de Personal</span>');
    grid.reconfigure(this.__data_store1, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            width: 160,
            text: 'Nombre <br/>del Trabajador',
            dataIndex: 'trbajador',
            locked: true,
            lockable: true

        } ,
        {
            width: 150,
            text: 'Cargo',
            dataIndex: 'cargo'
        },
        {
            width: 160,
            text: 'Categoria <br>Ocupacional',
            dataIndex: 'catocup'

        } ,
        {
            width: 160,
            text: 'Clasificacion<br/>Directo/Indirecto',
            dataIndex: 'di'

        } ,
        {
            width: 110,
            text: 'Grup Escala',
            dataIndex: 'escala'

        } ,
        {
            width: 110,
            text: 'No.Expediente<br/>Laboral',
            dataIndex: 'codigo'

        } ,
        {
            width: 160,
            text: 'Nivel Ocupacional',
            dataIndex: 'np'

        } ,
        {
            text: 'Salario',
            columns: [
                {
                    text: 'Salario Total',
                    dataIndex: 'salario',
                    renderer:total,
                    width: 100
                },
                {
                    text: 'Escala',
                    dataIndex: 'salario',
                    width: 77
                },
                {
                    text: 'Perfeccionamiento <br>empresarial',
                    dataIndex: 'salario_adicional',
                    width: 130
                },
                {
                    text: 'CIES',
                    dataIndex: 'cies',
                    width: 70
                },
                {
                    text: 'CLA',
                    dataIndex: 'cla',
                    width: 70
                },
                {
                    text: 'Master <br> y/o <br> Doctorado',
                    dataIndex: 'sal_adic',
                    width: 80
                },
                {
                    text: 'Antiguedad',
                    dataIndex: 'antiguedead',
                    renderer:antiguedad,
                    width: 100
                },
                {
                    text: 'Tecnico',
                    dataIndex: 'tnc',
                    width: 100
                },
                {
                    text: 'Otros',
                    dataIndex: 'otros',
                    width: 100
                }
            ]},
        {
            text: 'Altas',
            columns: [
                {
                    text: 'Fecha inicio',
                    dataIndex: 'fecha_inicio',
                    width: 150
                }

            ]},
        {
            text: 'Baja',
            columns: [

                {
                    text: 'Fecha final',
                    dataIndex: 'fecha_final',
                    width: 150
                },
                {
                    text: 'Motivo',
                    dataIndex: 'mbajas',
                    width: 200
                },
                {
                    text: 'Destino',
                    dataIndex: 'dbajas',
                    width: 200
                }

            ]}
    ]);

    var _scope = this;
    this.grafica = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'grafica',
        text: 'Graficar',
        listeners: {
            scope: this,
            click: function () {
                var donut = false,
                    chart = Ext.create('Ext.chart.Chart', {
                        width: '100%',
                        height: '100%',
                        xtype: 'chart',
                        shadow: true,
                        animate: true,
                        legend: {position: 'right'},
                        insetPadding: 60,
                        store: _scope.__data_store1,
                        theme: 'Base:gradients',
                        series: [
                            {
                                type: 'pie',
                                angleField: 'directos',
                                showInLegend: true,
                                tips: {
                                    trackMouse: true,
                                    width: 200,
                                    height: 28,
                                    renderer: function (storeItem, item) {
                                        var total = 0;
                                        _scope.__data_store1.each(function (rec) {
                                            total += rec.get('cantidad_plazas');
                                        });
                                        this.setTitle(storeItem.get('nombre') + ': ' + Math.round(storeItem.get('directos') / total * 100) + '%');
                                    }
                                },
                                highlight: {
                                    segment: {
                                        margin: 20
                                    }
                                },
                                label: {
                                    field: 'nombre',
                                    display: 'rotate',
                                    contrast: true,
                                    font: '14px Arial'
                                }
                            }
                        ]
                    });
                Ext.create('Ext.window.Window', {
                    title: 'Graficos de la Aplicacion',
                    height: 550,
                    width: 800,
                    layout: 'fit',
                    items: chart
                }).show();
            }
        }
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpCompPlantilla',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load({params:{reporte:'sit_fuerza_laboral'}});
            }
        }});
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: _scope.__data_store1,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');


    Ext.resumeLayouts(true);
}
function completamientoplantilla_x_categorias_ocupacionales(){
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantila_x_cateoria', {
        fields: [
            {name: 'area'},
            {name: 'annos', type: 'int'},
            {name: 'nombre'},
            {name: 'woman', type: 'int'},
            {name: 'trabajador', type: 'int'},
            {name: 'operarios', type: 'int'},
            {name: 'tecnicos', type: 'int'},
            {name: 'directivo', type: 'int'},
            {name: 'administrativo', type: 'int'},
            {name: 'servicio', type: 'int'},
            {name: 'sin_categoria', type: 'int'},
            {name: 'directos', type: 'int'},
            {name: 'indirectos', type: 'int'},
            {name: 'oficiales', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'area'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping',
        {groupHeaderTpl: '&Aacute;reas: {name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores contratados por categoria</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: 'Tipo de Contrato',
            locked: true,
            dataIndex: 'nombre',
            width: 230,
            summaryType: 'count',
            tdCls: 'task',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('{0} Contrato{1}', value, value !== 1 ? 's' : '');
            }
        },
        {
            text: 'Trabajadores',
            dataIndex: 'trabajador',
            summaryType: 'sum',
            width: 120
        },
        {
            text: 'Categoria Ocupacional',
            columns: [

                {
                    text: 'Operarios',
                    dataIndex: 'operarios', summaryType: 'sum',
                    width: 95
                },
                {
                    text: 'T&eacute;cnicos',
                    dataIndex: 'tecnicos', summaryType: 'sum',
                    width: 95
                },
                {
                    text: 'Directivo',
                    dataIndex: 'directivo', summaryType: 'sum',
                    width: 95
                },
                {
                    text: 'Administrativo',
                    dataIndex: 'administrativo', summaryType: 'sum',
                    width: 110

                },
                {
                    text: 'Servicio',
                    dataIndex: 'servicio', summaryType: 'sum',
                    width: 95

                },
                {
                    text: 'Sin Categoria',
                    dataIndex: 'sin_categoria', summaryType: 'sum',
                    width: 110

                }
            ]
        },
        {
            text: 'Otras Clacificaciones',
            summaryType: 'sum',
            columns: [
                {
                    text: 'Edad Promedio',
                    dataIndex: 'annos',
                    summaryType: 'average',
                    width: 110

                },
                {
                    text: 'Directos',
                    dataIndex: 'directos', summaryType: 'sum',
                    width: 95

                },
                {
                    text: 'Indirectos',
                    dataIndex: 'indirectos', summaryType: 'sum',
                    width: 95

                },
                {
                    text: 'Mujeres',
                    dataIndex: 'woman', summaryType: 'sum',
                    width: 95
                },
                {
                    text: 'Oficiales',
                    dataIndex: 'oficiales', summaryType: 'sum',
                    width: 80

                }
            ]}


    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaCat',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});
    tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function completamientoplantilla_x_contrat() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.completamientoPlantilla_x_contrato', {
        fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'existencia'},
            {name: 'cantidad_plazas'},
            {name: 'por_ciento'},
            {name: 'trabajando'},
            {name: 'woman'},
            {name: 'oficial'},
            {name: 'indirectos'},
            {name: 'indeterminados'},
            {name: 'directos'},
            {name: 'temporales'},
            {name: 'a_prueba'},
            {name: 'adiestrados'},
            {name: 'disponibles'},
            {name: 'domiciliar'},
            {name: 'operarrios'},
            {name: 'tecnico'},
            {name: 'dirigente'},
            {name: 'administrativo'},
            {name: 'servicio'},
            {name: 'sincategoria'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla por Contratos</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            width: 220,
            locked: true,
            text: '&Aacute;reas',
            dataIndex: 'nombre'
        },
        {
            flex: 1,
            text: 'Plazas',
            dataIndex: 'cantidad_plazas'

        },
        {
            flex: 1,
            text: 'Ocupadas',
            dataIndex: 'trabajando'

        },
        {
            text: '% Cumplimieto',
            dataIndex: 'por_ciento',
            flex: 1
        },
        {
            text: 'Tipos de contrato',
            columns: [
                {
                    text: 'Indeterminado',
                    dataIndex: 'indeterminados',
                    flex: 1
                },
                {
                    text: 'Temporal',
                    dataIndex: 'temporales',
                    flex: 1
                },
                {
                    text: 'Prueba',
                    dataIndex: 'a_prueba',
                    flex: 1
                },
                {
                    text: 'Adiestrados',
                    dataIndex: 'adiestrados',
                    flex: 1
                },
                {
                    text: 'Disponibles',
                    dataIndex: 'disponibles',
                    flex: 1
                },
                {
                    text: 'Domiciliar',
                    dataIndex: 'domiciliar',
                    flex: 1
                }
            ]
        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpCompPlantCont',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');

    Ext.resumeLayouts(true);
}
function plantilla_p2() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_p2', {
        fields: [
            {name: 'area'},
            {name: 'nombre'},
            {name: 'cargo'},
            {name: 'categoria'},
            {name: 'clacificacion'},
            {name: 'pago_adicional'},
            {name: 'salario'},
            {name: 'escala'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de personal (Oficial)</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            text: 'Trabajador y &Aacute;reas',
            columns: [
                {
                    width: 250,
                    text: 'Nombre',
                    dataIndex: 'nombre'
                },
                {
                    width: 250,
                    text: '&Aacute;rea',
                    dataIndex: 'area'

                }
            ]},
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 1
        },
        {
            text: 'Categoria',
            dataIndex: 'categoria',
            flex: 1
        },
        {
            text: 'Clasificacion',
            dataIndex: 'clacificacion',
            flex: 1
        },
        {
            text: 'Pago y Salario',
            columns: [
                {
                    text: 'Salario',
                    dataIndex: 'salario',
                    flex: 1
                },
                {
                    text: 'Pago adicional',
                    dataIndex: 'pago_adicional',
                    flex: 1
                },
                {
                    text: 'Escala',
                    dataIndex: 'escala',
                    flex: 1

                }
            ]}


    ]);

    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaP2',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function plantilla_p2_actual() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_p2_actual',{
        fields: [
            {name: 'area'},
            {name: 'nombre'},
            {name: 'cargo'},
            {name: 'categoria'},
            {name: 'clacificacion'},
            {name: 'total'},
            {name: 'salario'},
            {name: 'escala'},
            {name: 'esperiecia'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla actual de personal </span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            text: 'Trabajador y &Aacute;reas',
            columns: [
                {

                    text: 'Nombre',
                    dataIndex: 'nombre',
                    flex: 2
                },
                {

                    text: '&Aacute;rea',
                    dataIndex: 'area',
                    flex: 2

                }
            ]
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 1
        },
        {
            text: 'Categoria',
            dataIndex: 'categoria',
            flex: 1
        },
        {
            text: 'Clacificacion',
            dataIndex: 'clacificacion',
            flex: 2
        },
        {
            text: 'Salarios y Escalas',
            columns: [
                {
                    text: 'Escala',
                    dataIndex: 'escala',
                    flex: 1
                },
                {
                    text: 'Salario',
                    dataIndex: 'salario',
                    flex: 1
                },
                {
                    text: 'Antiguedad',
                    dataIndex: 'esperiecia',
                    flex: 1

                },
                {
                    text: 'Total',
                    dataIndex: 'total',
                    flex: 1
                }
            ]
        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaP2Actual',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
//=======================Estructura  de plantila========================================================================
function CargosPlantilla() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantila_cargos', {
        fields: [
            {name: 'cargo'},
            {name: 'salario' },
            {name: 'salario_total', type: 'int'},
            {name: 'cant_plazas', type: 'int'},
            {name: 'categoria'},
            {name: 'nombre'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        sorters: {property: 'nombre', direction: 'DESC'},
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de cargos por &aacute;rea </span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo',
            summaryType: 'count', tdCls: 'task',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('{0} Cargo{1}', value, value !== 1 ? 's' : '');
            }
        },
        {
            flex: 2,
            text: 'Escala',
            dataIndex: 'nombre',
            width: 90,
            summaryType: 'count', tdCls: 'task',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('{0} Escala{1}', value, value !== 1 ? 's' : '');
            }
        },
        {
            text: 'Categoria',
            dataIndex: 'categoria',
            flex: 2,
            summaryType: 'count',
            tdCls: 'task',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('{0} Categoria{1}', value, value !== 1 ? 's' : '');
            }
        },
        {
            text: 'Plazas',
            dataIndex: 'cant_plazas',
            width: 95, tdCls: 'task',
            summaryType: 'sum'
        },
        {
            text: 'Salario',
            dataIndex: 'salario',
            width: 80
        },
        {
            text: 'Salario total',
            dataIndex: 'salario_total', tdCls: 'task',
            width: 110, summaryType: 'sum',
            summaryRenderer: function (value, summaryData, dataIndex) {
                return Ext.String.format('${0}',value);
            }
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpCompPlantCont',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}
function CargosPlantilla_unidad() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_cargos_unidad', {
        fields: [
            {name: 'agencia'},
            {name: 'cargo'},
            {name: 'salario', type: 'int'},
            {name: 'cant_plazas', type: 'int'},
            {name: 'escala'},
            {name: 'categoria'},
            {name: 'salario_total', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'agencia'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '{name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de cargos por unidad</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: 'Cargos',
            // locked:true,
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Categoria',
            dataIndex: 'categoria',
            tdCls: 'task',
            flex: 2
        },
        {
            text: 'Salario y Escala',
            flex: 4,
            columns: [

                {
                    text: 'Escala',
                    dataIndex: 'escala',
                    flex: 1
                },
                {
                    text: 'Salario',
                    dataIndex: 'salario',
                    flex: 1
                },
                {
                    text: 'Cantidad de plazas',
                    dataIndex: 'cant_plazas',
                    summaryType: 'sum',
                    flex: 1
                },
                {
                    text: 'Salario total',
                    dataIndex: 'salario_total',
                    summaryType: 'sum',
                    flex: 1

                }
            ]
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaCargUnidad',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}
function CargosPlantilla_area() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_cargos_area', {
        fields: [
            {name: 'area'},
            {name: 'agencia'},
            {name: 'cargo'},
            {name: 'salario', type: 'int'},
            {name: 'cant_plazas', type: 'int'},
            {name: 'escala'},
            {name: 'categoria'},
            {name: 'salario_total', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'area'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '&Aacute;reas: {name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de cargos por &aacute;rea(Oficial)</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: 'Cargos',
            // locked:true,
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Categoria',
            dataIndex: 'categoria',
            tdCls: 'task',
            flex: 2
        },
        {
            text: 'Salario y Escala',
            flex: 4,
            columns: [

                {
                    text: 'Escala',
                    dataIndex: 'escala',
                    flex: 1
                },
                {
                    text: 'Salario y Perfecionamiento',
                    dataIndex: 'salario',
                    flex: 3
                },
                {
                    text: 'Cantidad de plazas',
                    dataIndex: 'cant_plazas',
                    summaryType: 'sum',
                    flex: 1
                },
                {
                    text: 'Salario total',
                    dataIndex: 'salario_total',
                    summaryType: 'sum',
                    flex: 1

                }
            ]
        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaCargArea',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}
function CargosPlantilla_cargo_area() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_caorgos_unidad', {
        fields: [
            {name: 'adicional', type: 'int'},
            {name: 'salario', type: 'int'},
            {name: 'total', type: 'int'},
            {name: 'escala'},
            {name: 'preparacion'},
            {name: 'clacificacion'},
            {name: 'categoria'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'cantidad', type: 'int'},
            {name: 'area'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'area'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '&Aacute;reas: {name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de cargos por &aacute;rea</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: 'Trabajador',
            // locked:true,
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Cargo',
            // locked:true,
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Categoria',
            // locked:true,
            dataIndex: 'categoria',
            flex: 2
        },
        {
            text: 'Preparacion',
            // locked:true,
            dataIndex: 'preparacion',
            flex: 2
        },
        {
            text: 'Categoria',
            dataIndex: 'categoria',
            tdCls: 'task',
            flex: 2
        },
        {
            text: 'Salario y Escala',
            flex: 4,
            columns: [

                {
                    text: 'Cantidad',
                    dataIndex: 'cantidad',
                    summaryType: 'sum',
                    flex: 1

                },
                {
                    text: 'Escala',
                    dataIndex: 'escala',
                    flex: 1
                },
                {
                    text: 'Salario',
                    dataIndex: 'salario',
                    flex: 1
                },
                {
                    text: 'Adicional',
                    dataIndex: 'adicional',
                    summaryType: 'sum',
                    flex: 1
                },
                {
                    text: 'Salario total',
                    dataIndex: 'total',
                    summaryType: 'sum',
                    flex: 1

                }
            ]
        }


    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaCargAreaG',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}
function plantilla_unidad_area() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_unidad_area', {
        fields: [
            {name: 'agencia'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'salario', type: 'int'},
            {name: 'cant_plazas', type: 'int'},
            {name: 'escala'},
            {name: 'categoria'},
            {name: 'fecha_inicio'},
            {name: 'nombre_completo'},
            {name: 'salario_total', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'agencia'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '{name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de cargos por unidad y &aacute;rea</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: '&Aacute;rea',
            // locked:true,
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Trabajador',
            dataIndex: 'nombre_completo',
            hidden: true,
            flex: 1

        },
        {
            text: 'Cargos',
            // locked:true,
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Categoria',
            dataIndex: 'categoria',
            tdCls: 'task',
            flex: 1
        },
        {
            text: 'Salario y Escala',
            flex: 4,
            columns: [

                {
                    text: 'Escala',
                    dataIndex: 'escala',
                    flex: 1
                },
                {
                    text: 'Salario',
                    dataIndex: 'salario',
                    flex: 1
                }
            ]
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            hidden: true,
            flex: 1

        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaUnidadArea',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}
function plantilla_plazas_vacantes() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_plazas_vacantes', {
        fields: [
            {name: 'agencia'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'nombre'},
            {name: 'existencia', type: 'int'},
            {name: 'cant_plasa', type: 'int'},

            {name: 'salario_base', type: 'int'},
            {name: 'adicional', type: 'int'},
            {name: 'salario_total', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'agencia'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '{name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de plazas vacantes</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 2
        },
        {
            text: 'Cargos',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Plazas',
            dataIndex: 'cant_plasa',
            summaryType: 'sum',
            flex: 1
        },
        {
            text: 'Existencia',
            dataIndex: 'existencia',
            summaryType: 'sum',
            flex: 1

        },
        {
            text: 'Escala',
            dataIndex: 'nombre',
            flex: 1
        },
        {
            text: 'Salario base',
            dataIndex: 'salario_base',
            summaryType: 'sum',
            flex: 1

        },
        {
            text: 'Adicional',
            dataIndex: 'adicional',
            summaryType: 'sum',
            flex: 1

        },
        {
            text: 'Salario total',
            dataIndex: 'salario_total',
            summaryType: 'sum',
            flex: 1

        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaPlazasVacantes',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function plantilla_plazas_ocupadas() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.plantilla_plazas_ocupadas', {
        fields: [
            {name: 'agencia'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'categoria'},
            {name: 'nombre'},
            {name: 'escala'},
            {name: 'cant_plasa', type: 'int'},
            {name: 'salario_base', type: 'int'},
            {name: 'adicional', type: 'int'},
            {name: 'total', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'agencia'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '{name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Plantilla de plazas vacantes</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 2
        },
        {
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Cargos',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'categoria',
            dataIndex: 'categoria',
            //summaryType: 'sum',
            flex: 1
        } ,
        {
            text: 'Escala',
            dataIndex: 'escala',
            flex: 1
        },
        {
            text: 'Salario base',
            dataIndex: 'salario_base',
            summaryType: 'sum',
            flex: 1

        },
        {
            text: 'Adicional',
            dataIndex: 'adicional',
            summaryType: 'sum',
            flex: 1

        },
        {
            text: 'Salario total',
            dataIndex: 'total',
            summaryType: 'sum',
            flex: 1

        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpPlantillaPlazasOcupadas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
//=======================Contrato de los trabajadores===================================================================
function TrabajadoresContratados() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.Tcontratados', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'procedencia'},
            {name: 'agencia'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'empresa'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'apellido'},
            {name: 'apellido_s'},
            {name: 'identidad'},
            {name: 'fnacimiento'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores contratados </span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 120
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            width: 240
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            width: 140
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    var _scope = this;
    this.grafica = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'grafica',
        text: 'Graficar',
        listeners: {
            scope: this,
            click: function () {
                var donut = false,
                    chart = Ext.create('Ext.chart.Chart', {
                        width: '100%',
                        height: '100%',
                        xtype: 'chart',
                        shadow: true,
                        animate: true,
                        legend: {position: 'right'},
                        insetPadding: 60,
                        store: _scope.__data_store,
                        theme: 'Base:gradients',
                        series: [
                            {
                                type: 'pie',
                                angleField: 'directos',
                                showInLegend: true,
                                tips: {
                                    trackMouse: true,
                                    width: 200,
                                    height: 28,
                                    renderer: function (storeItem, item) {
                                        var total = 0;
                                        _scope.__data_store.each(function (rec) {
                                            total += rec.get('cantidad_plazas');
                                        });
                                        this.setTitle(storeItem.get('nombre') + ': ' + Math.round(storeItem.get('directos') / total * 100) + '%');
                                    }
                                },
                                highlight: {
                                    segment: {
                                        margin: 20
                                    }
                                },
                                label: {
                                    field: 'nombre',
                                    display: 'rotate',
                                    contrast: true,
                                    font: '14px Arial'
                                }
                            }
                        ]
                    });
                Ext.create('Ext.window.Window', {
                    title: 'Graficos de la Aplicacion',
                    height: 550,
                    width: 800,
                    layout: 'fit',
                    items: chart
                }).show();
            }
        }
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresContratados',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function TrabajadoresIndefinidos() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.TcontratadosIndefinidamente', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'procedencia'},
            {name: 'agencia'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'empresa'},
            {name: 'cargo'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'},
            {name: 'nombre'},
            {name: 'apellido'},
            {name: 'apellido_s'},
            {name: 'identidad'},
            {name: 'fnacimiento'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores contratados indefinidamente</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 90
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            width: 240
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            width: 200
        },
        {
            flex: 1,
            text: 'Tipo contrato',
            dataIndex: 'tipo_contrato'
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabContratadosIndefinidamente',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function TrabajadoresAprueba() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.TcontratadosAprueba', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'procedencia'},
            {name: 'agencia'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'empresa'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'apellido'},
            {name: 'apellido_s'},
            {name: 'identidad'},
            {name: 'fnacimiento'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores contratados en prueba</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 90
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            width: 240
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            width: 200
        },
        {
            flex: 1,
            text: 'Tipo contrato',
            dataIndex: 'tipo_contrato'
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabContratadosAPrueba',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function TrabajadoresTemporales() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.TcontratadosTemporalmente', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'procedencia'},
            {name: 'agencia'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'empresa'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'apellido'},
            {name: 'apellido_s'},
            {name: 'identidad'},
            {name: 'fnacimiento'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores contratados temporalmente</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 90
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            width: 240
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            width: 200
        },
        {
            flex: 1,
            text: 'Tipo contrato',
            dataIndex: 'tipo_contrato'
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabContratadosTemp',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function TrabajadoresAdiestrados() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.TcontratadosAdiestrados', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'},
            {name: 'procedencia'},
            {name: 'agencia'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'empresa'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'apellido'},
            {name: 'apellido_s'},
            {name: 'identidad'},
            {name: 'fnacimiento'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores en adiestramiento</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 90
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            width: 240
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            width: 200
        },
        {
            flex: 1,
            text: 'Tipo contrato',
            dataIndex: 'tipo_contrato'
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabContratadosAdiestrados',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function TrabajadoresDisponibles() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.TcontratadosDisponibles', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'procedencia'},
            {name: 'agencia'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'empresa'},
            {name: 'cargo'},
            {name: 'nombre'},
            {name: 'apellido'},
            {name: 'apellido_s'},
            {name: 'identidad'},
            {name: 'fnacimiento'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores disponibles</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 90
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            width: 240
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            width: 200
        },
        {
            flex: 1,
            text: 'Tipo contrato',
            dataIndex: 'tipo_contrato'
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabContratadosDisponibles',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function TrabajadoresAdomicilio() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.TcontratadosAdomicilio', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'cargo'},
            {name: 'identidad'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores a domicilio</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 90
        },
        {
            text: 'Direccion',
            dataIndex: 'dir',
            width: 140
        },
        {
            flex: 1,
            text: 'Tipo contrato',
            dataIndex: 'tipo_contrato'
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Ubicacion Defensa',
            dataIndex: 'ubicacion',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabContratadosDomiciliar',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function TrabajadoresVencidos() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.TcontratadosVencidos', {
        fields: [
            {name: 'id'},
            {name: 'ubicacion'},
            {name: 'foto'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'cargo'},
            {name: 'identidad'},
            {name: 'dir'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores con contratos vencidos</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Identidad',
            dataIndex: 'identidad',
            width: 90
        },
        {
            text: 'Direccion',
            dataIndex: 'dir',
            width: 140
        },
        {
            flex: 1,
            text: 'Tipo contrato',
            dataIndex: 'tipo_contrato'
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 140
        },
        {
            text: 'Fecha inicio',
            dataIndex: 'fecha_inicio',
            width: 140
        },
        {
            text: 'Fecha final',
            dataIndex: 'fecha_final',
            width: 140
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabContratadosVencidos',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
// ==============================Fluctuacion de la furza trabajo========================================================
function Fluctuacion() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();

    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.bajas_categorias', {
        fields: [
            {name: 'fecha_inicio',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'fecha_baja',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'solicitud_propia',type:'boolean'},
            {name: 'foto'},
            {name: 'nombre'},
            {name: 'baja_a',type:'boolean'},
            {name: 'licencia_a',type:'boolean'},
            {name: 'dbaja'},
            {name: 'mbaja'},
            {name: 'area'},
            {name: 'agencia'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store_especialidad = App.BuildJsonStore('Resumenes.Resumenes.mbajas', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store_dbajas = App.BuildJsonStore('Resumenes.Resumenes.dbajas', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store_area = App.BuildJsonStore('Resumenes.Resumenes.areas', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store_agencias = App.BuildJsonStore('Resumenes.Resumenes.agencia', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store.load({params: {start: 0, limit: 25}});

    this.local_bajas = new Ext.data.ArrayStore({fields: ['estado', 'nombre'],data : [['true','Ha solicitado bajas'],['false','No ha solicitado bajas']]});
    this.local_Licencias = new Ext.data.ArrayStore({fields: ['estado', 'nombre'],data : [['true','Ha solicitado licencia'],['false','No ha solicitado licencia']]});
    this.local_Solicitudes = new Ext.data.ArrayStore({fields: ['estado', 'nombre'],data : [['true','Por Solicitud Popia'],['false','Por Solicitud Administrativa']]});


    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },

        {
            flex: 2,
            text: 'Solicitud',
            dataIndex: 'solicitud_propia',
            width: 90,renderer:pintar4
        },
        {
            flex: 2,
            text: 'Baja',
            dataIndex: 'baja_a',
            renderer:pintar2,
            width: 90
        },
        {
            flex: 2,
            text: 'Licencia',
            dataIndex: 'licencia_a',
            renderer:pintar3,
            width: 90
        },
        {
            text: 'Fecha de Incorporaci&oacute;n',
            dataIndex: 'fecha_inicio',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
            width: 110,
            text: 'Fecha de Baja',
            dataIndex: 'fecha_baja',
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
            text: 'Motivo',
            dataIndex: 'mbaja',
            width: 140
        },
        {
            text: 'Destino',
            dataIndex: 'dbaja',
            width: 140
        }
    ]);

    this.combo_mbajas=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Motivos de Baja',
        store:this.__data_store_especialidad  ,
        queryMode: 'local',
        id:'como',
        anchor: '100%',
        labelWidth:120,
        name:'como',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());

                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);


            },scope:this
        }
    });
    this.combo_dbajas=Ext.create('Ext.form.ComboBox', {
        emptyText:'Filtrar por : Destino de Baja',
        store:this.__data_store_dbajas,
        queryMode: 'local',
        id:'combo_dbajas',
        anchor: '100%',
        labelWidth:120,
        name:'combo_dbajas',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());


                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);
            },scope:this
        }
    });
    this.combo_areas=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : &Aacute;reas o Unidad',
        store:this.__data_store_area  ,
        queryMode: 'local',
        id:'combo_areas',
        anchor: '100%',
        labelWidth:120,
        name:'combo_areas',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);
            },scope:this
        }
    });
    this.combo_unidades=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Unidades',
        store:this.__data_store_agencias  ,
        queryMode: 'local',
        id:'combo_unidades',
        anchor: '100%',
        labelWidth:120,
        name:'combo_unidades',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);
            },scope:this
        }
    });

    this.combo_bajas=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Bajas ',
        store:this.local_bajas  ,
        queryMode: 'local',
        id:'combo_bajas',
        anchor: '100%',
        labelWidth:120,
        name:'combo_bajas',
        displayField: 'nombre',
        valueField: 'estado',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').getStore( ).clearFilter();

                if(Ext.getCmp('combo_Solicitud').getValue() != null && Ext.getCmp('combo_Solicitud').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia", Ext.getCmp('combo_Solicitud').getValue());

                if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').getStore( ).filter("baja_a", Ext.getCmp('combo_bajas').getValue());

                if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a", Ext.getCmp('combo_Licencias').getValue());
                //-------------------------------------------------------------------------------------------------
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.combo_Licencias=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Licencias',
        store:this.local_Licencias  ,
        queryMode: 'local',
        id:'combo_Licencias',
        anchor: '100%',
        labelWidth:120,
        name:'combo_Licencias',
        displayField: 'nombre',
        valueField: 'estado',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('combo_Solicitud').getValue() != null && Ext.getCmp('combo_Solicitud').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia", Ext.getCmp('combo_Solicitud').getValue());

                if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a", Ext.getCmp('combo_bajas').getValue());

                if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a", Ext.getCmp('combo_Licencias').getValue());
                //-------------------------------------------------------------------------------------------------
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.combo_Solicitud=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Tipo de Solicitud',
        store:this.local_Solicitudes  ,
        queryMode: 'local',
        id:'combo_Solicitud',
        anchor: '100%',
        labelWidth:120,
        name:'combo_Solicitud',
        displayField: 'nombre',
        valueField: 'estado',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('combo_Solicitud').getValue() != null && Ext.getCmp('combo_Solicitud').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia", Ext.getCmp('combo_Solicitud').getValue());

                if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a", Ext.getCmp('combo_bajas').getValue());

                if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a", Ext.getCmp('combo_Licencias').getValue());
                //-------------------------------------------------------------------------------------------------
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });


    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:365,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                        if(Ext.getCmp('combo_Solicitud').getValue() != null && Ext.getCmp('combo_Solicitud').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia", Ext.getCmp('combo_Solicitud').getValue());

                        if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a", Ext.getCmp('como').getValue());

                        if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a", Ext.getCmp('combo_Licencias').getValue());
                        //-------------------------------------------------------------------------------------------------
                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                        if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                        if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                        if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                        if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                        //----------------------------------------------------------------------------------------------
                    },scope:this
                }
            },
            this.combo_mbajas,
            this.combo_dbajas,
            this.combo_areas,
            this.combo_unidades,
            this.combo_bajas,
            this.combo_Licencias,
            this.combo_Solicitud,
            {   xtype: 'datefield',
                anchor: '100%',
                name: 'from_date',
                emptyText: 'Desde la fecha (D-M-AA)',
                id:'desde',name:'desde'
            },
            {
                xtype: 'datefield',
                anchor: '100%',
                name: 'to_date',
                emptyText: 'Hasta la fecha (D-M-AA)',
                id:'hasta',name:'hasta'
            }
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.graficar=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[
            {text : 'Tipo de Graficos 1'},
            {text : 'Tipo de Graficos 2'},
            {text : 'Tipo de Graficos 3'}
        ]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpBajasCategorias',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var obj = {};
                if(Ext.getCmp('combo_Solicitud').getValue() != null && Ext.getCmp('combo_Solicitud').getValue() != '')
                    obj.solicitud_propia = Ext.getCmp('combo_Solicitud').getValue();
                if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
                    obj.baja_a = Ext.getCmp('como').getValue();
                if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                    obj.licencia_a = Ext.getCmp('combo_Licencias').getValue();
                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    obj.nombre = Ext.getCmp('searchField').getValue();
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    obj.mbaja = Ext.getCmp('como').getValue();
                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    obj.dbaja = Ext.getCmp('combo_dbajas').getValue();
                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    obj.area = Ext.getCmp('combo_areas').getValue();
                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    obj.agencia = Ext.getCmp('combo_unidades').getValue();
                __Imprimir.load({params:obj});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function EstadoSolicitudes() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();

    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.solicitudes_bajas', {
        fields: [
            {name: 'fecha_inicio',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'fecha_baja',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'solicitud_propia'},
            {name: 'nombre'},
            {name: 'baja',type:'boolean'},
            {name: 'licencia',type:'boolean'},
            {name: 'area'},
            {name: 'motivo'},
            {name: 'foto'},
            {name: 'agencia'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store_especialidad = App.BuildJsonStore('Resumenes.Resumenes.mbajas', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store_dbajas = App.BuildJsonStore('Resumenes.Resumenes.dbajas', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store_area = App.BuildJsonStore('Resumenes.Resumenes.areas', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store_agencias = App.BuildJsonStore('Resumenes.Resumenes.agencia', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store.load({params: {start: 0, limit: 25}});

    this.local_bajas = new Ext.data.ArrayStore({fields: ['estado', 'nombre'],data : [['true','Ha solicitado bajas'],['false','No ha solicitado bajas']]});
    this.local_Licencias = new Ext.data.ArrayStore({fields: ['estado', 'nombre'],data : [['true','Ha solicitado licencia'],['false','Ha solicitado Baja']]});

    this.combo_bajas=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Bajas ',
        store:this.local_bajas  ,
        queryMode: 'local',
        id:'combo_bajas',
        anchor: '100%',
        labelWidth:120,
        name:'combo_bajas',
        displayField: 'nombre',
        valueField: 'estado',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').getStore( ).clearFilter();

                if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').getStore( ).filter("baja", Ext.getCmp('combo_bajas').getValue());

                if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia", Ext.getCmp('combo_Licencias').getValue());
                //-------------------------------------------------------------------------------------------------

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.combo_Licencias=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Solicitud (Bajas o Licencias)',
        store:this.local_Licencias  ,
        queryMode: 'local',
        id:'combo_Licencias',
        anchor: '100%',
        labelWidth:120,
        name:'combo_Licencias',
        displayField: 'nombre',
        valueField: 'estado',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja", Ext.getCmp('combo_bajas').getValue());

                if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia", Ext.getCmp('combo_Licencias').getValue());
                //-------------------------------------------------------------------------------------------------
                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });



    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            text: 'Tipo de solicitud',
            dataIndex: 'motivo',
            flex: 1,renderer:pintarM
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },
        {
            flex: 2,
            text: 'baja',
            dataIndex: 'baja',
            //hidden:true,
            width: 90,hidden:true
        },
        {
            flex: 2,
            text: 'licencia',
            dataIndex: 'licencia',
            width: 90,hidden:true //,hidden:true
        },
        {
            text: 'Fecha de Incorporacion',
            dataIndex: 'fecha_inicio',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
            //renderer:pintar
        }
    ]);

    this.combo_mbajas=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Motivos de Baja',
        store:this.__data_store_especialidad  ,
        queryMode: 'local',
        id:'como',
        anchor: '100%',
        labelWidth:120,
        name:'como',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());

                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);


            },scope:this
        }
    });
    this.combo_dbajas=Ext.create('Ext.form.ComboBox', {
        emptyText:'Filtrar por : Destino de Baja',
        store:this.__data_store_dbajas,
        queryMode: 'local',
        id:'combo_dbajas',
        anchor: '100%',
        labelWidth:120,
        name:'combo_dbajas',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());


                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);
            },scope:this
        }
    });
    this.combo_areas=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : &Aacute;reas o Unidad',
        store:this.__data_store_area  ,
        queryMode: 'local',
        id:'combo_areas',
        anchor: '100%',
        labelWidth:120,
        name:'combo_areas',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);
            },scope:this
        }
    });
    this.combo_unidades=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Unidades',
        store:this.__data_store_agencias  ,
        queryMode: 'local',
        id:'combo_unidades',
        anchor: '100%',
        labelWidth:120,
        name:'combo_unidades',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                //----------------------------------------------------------------------------------------------
                if(Ext.getCmp('radio01').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                if(Ext.getCmp('radio29').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                if(Ext.getCmp('radio81').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                if(Ext.getCmp('radio27').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                if(Ext.getCmp('radio15').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                if(Ext.getCmp('radio34').getValue()==true)
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);
            },scope:this
        }
    });

    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:150,
        padding:10,
        //layout: 'fit',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());

                        if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("mbaja", Ext.getCmp('como').getValue());

                        if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("dbaja", Ext.getCmp('combo_dbajas').getValue());

                        if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("area", Ext.getCmp('combo_areas').getValue());

                        if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("agencia", Ext.getCmp('combo_unidades').getValue());
                        //----------------------------------------------------------------------------------------------
                        if(Ext.getCmp('radio01').getValue()==true)
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",true);

                        if(Ext.getCmp('radio29').getValue()==true)
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("solicitud_propia",false);

                        if(Ext.getCmp('radio81').getValue()==true)
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",true);

                        if(Ext.getCmp('radio27').getValue()==true)
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("baja_a",false);

                        if(Ext.getCmp('radio15').getValue()==true)
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",true);

                        if(Ext.getCmp('radio34').getValue()==true)
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("licencia_a",false);


                    },scope:this
                }
            },
            this.combo_areas,
            this.combo_unidades,
            this.combo_Licencias
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.graficar=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[
            {text : 'Tipo de Graficos 1'},
            {text : 'Tipo de Graficos 2'},
            {text : 'Tipo de Graficos 3'}
        ]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpSolicitudesBajas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var obj = {};
//                        if(Ext.getCmp('combo_Solicitud').getValue() != null && Ext.getCmp('combo_Solicitud').getValue() != '')
//                            obj.solicitud_propia = Ext.getCmp('combo_Solicitud').getValue();
//                        if(Ext.getCmp('combo_bajas').getValue() != null && Ext.getCmp('combo_bajas').getValue() != '')
//                            obj.baja_a = Ext.getCmp('como').getValue();
                if(Ext.getCmp('combo_Licencias').getValue() != null && Ext.getCmp('combo_Licencias').getValue() != '')
                    obj.licencia_a = Ext.getCmp('combo_Licencias').getValue();
                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    obj.nombre = Ext.getCmp('searchField').getValue();
//                        if(Ext.getCmp('como').getValue() != null && Ext.getCmp('como').getValue() != '')
//                            obj.mbaja = Ext.getCmp('como').getValue();
//                        if(Ext.getCmp('combo_dbajas').getValue() != null && Ext.getCmp('combo_dbajas').getValue() != '')
//                            obj.dbaja = Ext.getCmp('combo_dbajas').getValue();
                if(Ext.getCmp('combo_areas').getValue() != null && Ext.getCmp('combo_areas').getValue() != '')
                    obj.area = Ext.getCmp('combo_areas').getValue();
                if(Ext.getCmp('combo_unidades').getValue() != null && Ext.getCmp('combo_unidades').getValue() != '')
                    obj.agencia = Ext.getCmp('combo_unidades').getValue();
                __Imprimir.load({params:obj});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
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
function pintarM(val2,met,record,a,b,c,d){
    var bajas = record.data.baja;
    var licencia = record.data.licencia;
    if(bajas==true){
        return 'Baja';
    }
    else if(licencia==true){
        return 'Licencia';
    }
    return '----';
}
function pintar2(val2,met,record,a,b,c,d){
    var bajas = record.data.baja_a;
    if(bajas == true){
        val2="Ha solicitado bajas";
    }
    else {
        val2="No ha solicitado bajas";
    }
    return val2;
}
function pintar3(val3,met,record,a,b,c,d){
    var licencia = record.data.licencia_a;
    if(licencia==true){
        val3="Ha solicitado licencia";
    }
    else {
        val3="No ha solicitado bajas";
    }
    return val3;
}
function pintar4(val2,met,record,a,b,c,d){
    var solicitud = record.data.solicitud_propia;
    if(solicitud==true){
        val2="Por Solicitud Popia";
    }
    else {
        val2="Por Solicitud Administrativa";
    }

    return val2;
}
function antiguedad(val2,met,record){
    var contr= record.data.tipo_contrato;
    var antiguedead= record.data.antiguedead;
    if(contr=='DE_capital_humano_766'){
        $vall = null;
        if (antiguedead <= 5 && antiguedead >= 1  ) {
            $vall = 10;
        } else if (antiguedead <= 10 && antiguedead > 5  ) {
            $vall = 20;
        } else if (antiguedead <= 15 && antiguedead > 10  ) {
            $vall = 30;
        } else if (antiguedead <= 20 && antiguedead > 15  ) {
            $vall = 45;
        } else if (antiguedead <= 25 && antiguedead > 20  ) {
            $vall = 60;
        } else if (antiguedead <= 30 && antiguedead > 25  ) {
            $vall = 75;
        } else if (antiguedead >= 30  ) {
            $vall = 90;
        } else {
            $vall = 0;
        }
        return $vall;


    }
    else return '0';
}
function total(val2,met,record){
    var escala= record.data.salario;
    var salario_adicional= record.data.salario_adicional;
    var cies= record.data.cies;
    var cla= record.data.cla;
    var tnc= record.data.tnc;
    var otros= record.data.otros;
    var sal_adic= record.data.sal_adic;
    var contr= record.data.tipo_contrato;
    var antiguedead= record.data.antiguedead;
    $vall = null;
    if(contr=='DE_capital_humano_766'){
        if (antiguedead <= 5 && antiguedead >= 1  ) {
            $vall = 10;
        } else if (antiguedead <= 10 && antiguedead > 5  ) {
            $vall = 20;
        } else if (antiguedead <= 15 && antiguedead > 10  ) {
            $vall = 30;
        } else if (antiguedead <= 20 && antiguedead > 15  ) {
            $vall = 45;
        } else if (antiguedead <= 25 && antiguedead > 20  ) {
            $vall = 60;
        } else if (antiguedead <= 30 && antiguedead > 25  ) {
            $vall = 75;
        } else if (antiguedead >= 30  ) {
            $vall = 90;
        } else {
            $vall = 0;
        }
    }
    var total = escala + salario_adicional + cies + cla + tnc + otros + $vall + sal_adic;
    return total;
}
function master(val2,met,record){

    var dtr= record.data.dtr;
    var mst= record.data.mst;

    var total = dtr+mst;
    return total;
}
// ==============================Trabajadores por categorias============================================================
function tarbajador_sin_categoria() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.tarbajador_sin_categoria', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores sin integraci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integraci&oacute;n',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresSCategoria',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_de_ujc() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_de_ujc', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores en UJC</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresUJC',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_del_pcc() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_del_pcc', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores en PCC</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresPCC',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_nivel_12mo() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_nivel_12mo', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores de nivel 12mo grado</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresN12',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_nivel_9no() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_nivel_9no', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores de nivel 9no grado </span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresN9no',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_nivel_ninguno() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_nivel_ninguno', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores sin nivel</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresSinNivel',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_nivel_obrero() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_nivel_obrero', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores de nivel Obrero Calificado</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresNivelObrero',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_nivel_6to() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_nivel_6to', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores de nivel 6to grado</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresN6to',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_nivel_superior() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_nivel_superior', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores de nivel Superior</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresNivelSuperior',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajador_nivel_tecnico() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajador_nivel_tecnico', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'nivel'},
            {name: 'intregracion'},
            {name: 'cargo'},
            {name: 'inicio'},
            {name: 'contrato_tipo'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores de nivel T&eacute;cnico Medio</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        },
        {
            text: 'Integracion',
            dataIndex: 'intregracion',
            flex: 2
        },
        {
            text: 'Cargo',
            dataIndex: 'cargo',
            flex: 2
        },
        {
            text: 'Inicio',
            dataIndex: 'inicio',
            flex: 2
        },
        {
            text: 'Tipo de contrato',
            dataIndex: 'contrato_tipo',
            flex: 2
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresNivelTecnico',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
//=================================Necesidad de vestuario del trabajador================================================
function listado_ropa_trabajadores() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.listado_ropa_trabajadores', {
        fields: [
            {name: 'foto'},
            {name: 'nombre_completo'},
            {name: 'blusa_camisa'},
            {name: 'pantalon_salla'},
            {name: 'zapatos'}
        ],
        sorters: {property: 'nombre_completo', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Listado de vestuarios por trabajador</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Blusa o Camisa',
            dataIndex: 'blusa_camisa'

        },
        {
            text: 'Pantalon o Salla',
            dataIndex: 'pantalon_salla',
            flex: 2
        },
        {
            text: 'Zapatos',
            dataIndex: 'zapatos',
            flex: 2
        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpListadoRopaTrabajadores',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),limit:store.pageSize}});
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function listador_ropa_trabajadores_femeninos() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.listador_ropa_trabajadores_femeninos', {
        fields: [
            {name: 'foto'},
            {name: 'nombre_completo'},
            {name: 'blusa_camisa'},
            {name: 'pantalon_salla'},
            {name: 'zapatos'}
        ],
        sorters: {property: 'nombre_completo', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Listado de vestuarios por trabajador</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Blusa o Camisa',
            dataIndex: 'blusa_camisa'

        },
        {
            text: 'Pantalon o Salla',
            dataIndex: 'pantalon_salla',
            flex: 2
        },
        {
            text: 'Zapatos',
            dataIndex: 'zapatos',
            flex: 2
        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpListadoRopaTrabajadoresF',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),limit:store.pageSize}});
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function listador_ropa_trabajadores_masculinos() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.listador_ropa_trabajadores_masculinos', {
        fields: [
            {name: 'foto'},
            {name: 'nombre_completo'},
            {name: 'blusa_camisa'},
            {name: 'pantalon_salla'},
            {name: 'zapatos'}
        ],
        sorters: {property: 'nombre_completo', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Listado de vestuarios por trabajador</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            flex: 2,
            text: 'Blusa o Camisa',
            dataIndex: 'blusa_camisa'

        },
        {
            text: 'Pantalon o Salla',
            dataIndex: 'pantalon_salla',
            flex: 2
        },
        {
            text: 'Zapatos',
            dataIndex: 'zapatos',
            flex: 2
        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpListadoRopaTrabajadoresM',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),limit:store.pageSize}});
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function necesidad_de_blusas_camisas() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.necesidad_de_blusas_camisas', {
        fields: [
            {name: 'nombre'},
            {name: 'blusa_camisa'},
            {name: 'zapato'},
            {name: 'zcount', type: 'int'},
            {name: 'pantalon'},
            {name: 'pcount', type: 'int'},
            {name: 'bcount', type: 'int'}


        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'nombre'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '{name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Necesidad de Tallas</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: '&Aacute;rea',
            hidden: true,
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Blusa o Camisa',
            // locked:true,
            dataIndex: 'blusa_camisa',
            flex: 2
        },
        {
            text: 'Cantidad',
            dataIndex: 'bcount',
            tdCls: 'task',
            summaryType: 'sum',
            flex: 1
        },
        {
            text: 'Pantalon o saya',
            // locked:true,
            dataIndex: 'pantalon',
            flex: 2
        },
        {
            text: 'Cantidad',
            dataIndex: 'pcount',
            tdCls: 'task',
            summaryType: 'sum',
            flex: 1
        },
        {
            text: 'Zapatos',
            // locked:true,
            dataIndex: 'zapato',
            flex: 2
        },
        {
            text: 'Cantidad',
            dataIndex: 'zcount',
            tdCls: 'task',
            summaryType: 'sum',
            flex: 1
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpListadoNecesidadTallas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}
function necesidad_de_zapatos() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.necesidad_de_zapatos', {
        fields: [
            {name: 'nombre'},
            {name: 'zapato'},
            {name: 'zcount', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'nombre'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '{name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Necesidad de Zapatos</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: '&Aacute;rea',
            hidden: true,
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Zapatos',
            // locked:true,
            dataIndex: 'zapato',
            flex: 2
        },
        {
            text: 'Cantidad',
            dataIndex: 'zcount',
            tdCls: 'task',
            summaryType: 'sum',
            flex: 1
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpCompPlantCont',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function necesidad_de_pantalon_saya() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.necesidad_de_pantalon_saya', {
        fields: [
            {name: 'nombre'},
            {name: 'pantalon'},
            {name: 'pcount', type: 'int'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'nombre'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: '{name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Nececidad de Pantalon o Saya</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: '&Aacute;rea',
            hidden: true,
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Pantalon o Saya',
            // locked:true,
            dataIndex: 'pantalon',
            flex: 2
        },
        {
            text: 'Cantidad',
            dataIndex: 'pcount',
            tdCls: 'task',
            summaryType: 'sum',
            flex: 1
        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpCompPlantCont',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}
//======================================================================================================================
function trabajdores_antiguedad() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajdores_antiguedad', {
        fields: [
            {name: 'sexo'},
            {name: 'foto'},
            {name: 'contrato_fi'},
            {name: 'contrato_ff'},
            {name: 'antig'},
            {name: 'fecha_inicio'},
            {name: 'nombre'},
            {name: 'categoria'},
            {name: 'cumple'},
            {name: 'annos'},
            {name: 'contrato_id'},
            {name: 'contrato'},
            {name: 'pp'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores (Antiguedad)</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Sexo',
            dataIndex: 'sexo',
            flex: 1
        },
        {

            text: 'Categor&iacute;a',
            dataIndex: 'categoria',
            flex: 1

        },

        {
            text: 'Fecha Nacimiento',
            dataIndex: 'cumple',
            flex: 2
        },
        {
            text: 'Edad',
            dataIndex: 'annos',
            flex: 1
        },
        {
            text: 'Fecha de Incorporaci&oacute;n',
            dataIndex: 'fecha_inicio',
            flex: 2
        },
        {
            text: 'Inicio de Contrato',
            dataIndex: 'contrato_fi',
            flex: 2

        },
        {
            text: 'Final de Contrato',
            dataIndex: 'contrato_ff',
            flex: 2
        },
        {
            text: 'Antiguedad',
            dataIndex: 'antig',
            flex: 1
        },
        {
            text: 'Anti ',
            dataIndex: 'pp',
            flex: 1
        }



    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresAntiguedad',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function trabajdores_antiguedad_update() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.trabajdores_antiguedad_update', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'categoria'},
            {name: 'annos'},
            {name: 'contrato_id'},
            {name: 'contrato'},
            {name: 'antig_neses'},
            {name: 'antig_anios'},
            {name: 'antig_nueva_valor'},
            {name: 'antig_viejo_valor'},
            {name: 'antig_nueva_meses'} ,
            {name: 'antig_nueva_annos'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores (Cambio de Antiguedad)</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 2
        },
        {
            text: 'Edad',
            dataIndex: 'annos',
            flex: 1
        },
        {
            text: 'Antig&uuml;edad',
            dataIndex: 'antig_anios',
            flex: 1
        },
        {
            text: 'Antig&uuml;edad Nueva',
            dataIndex: 'antig_nueva_annos',
            flex: 1
        },

        {
            text: 'Antig&uuml;edad',
            dataIndex: 'antig_neses',
            flex: 1

        },
        {
            text: 'Antig&uuml;edad Nueva',
            dataIndex: 'antig_nueva_meses',
            flex: 1
        },
        {
            text: 'Antig&uuml;edad',
            dataIndex: 'antig_viejo_valor',
            flex: 1
        },

        {
            text: 'Antig&uuml;edad Nueva',
            dataIndex: 'antig_nueva_valor',
            flex: 1
        }




    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresAntiguedadUpdate',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');

    Ext.resumeLayouts(true);
}
function trabajadores_antiguredad_share(){
    var _scope = this;
    this.panel = Ext.create('Ext.form.Panel', {
        width: 450,
        layout: 'anchor',
        id:'panel',
        name:'panel',
        defaultType: 'textfield',
        defaults: {anchor: '100%'},
        bodyPadding: 10,
        items: [
            {
                xtype: 'checkbox',
                name: 'todos',
                boxLabel: 'Ver todos los resultados',
                hideLabel: true,
                checked:true,
                id:'fofaqa',
                margin: '0 0 5 0',
                scope: this,
                listeners:{
                    change:function(This, newValue){
                        if (newValue==false){

                            Ext.getCmp('todo').enable();
                        }
                        else{

                            Ext.getCmp('todo').disable();
                        }

                    },scope:this
                }
            },
            {
                xtype: 'fieldset',
                id:'todo',
                //title: 'Reportar segun tiempos',
                layout: 'anchor',
                disabled : true,
                items:[

                    {
                        allowBlank: false,
                        fieldLabel: 'Años de antiguedad a reportar',
                        name: 'Antiguedad',
                        id:'Antiguedad',
                        //disabled : true,
                        xtype: 'textfield',
                        margin: '10 10 5 10',
                        labelWidth: 230,
                        bodyPadding: 10
                    },
                    {
                        xtype: 'fieldset',
                        id:'fof',
                        title: 'Reportar segun tiempos',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'radio',
                            name: 'annos',
                            boxLabel: 'Incluir años superior',
                            hideLabel: true,
                            id:'superior',
                            margin: '0 0 5 0',
                            scope: this
                        },
                            {
                                xtype: 'radio',
                                name: 'annos',
                                boxLabel: 'Incluir años inferior',
                                hideLabel: true,
                                id:'inferior',
                                margin: '0 0 5 0',
                                scope: this
                            }
                        ]
                    }/*,
                     {
                     xtype: 'fieldset',
                     title: 'Reportar segun contratos',
                     layout: 'anchor',
                     id:'fofo',
                     defaults: {
                     anchor: '100%'
                     },
                     items: [
                     {
                     xtype: 'radio',
                     name: 'billingSameAsMailing',
                     boxLabel: 'Segun 1er contrato indefinido en la empresa -- NO',
                     hideLabel: true,
                     id:'contrato1I',
                     margin: '0 0 5 0',
                     scope: this
                     },
                     {
                     xtype: 'radio',
                     name: 'billingSameAsMailing',
                     boxLabel: 'Segun 1er contrato en la empresa -- NO',
                     hideLabel: true,
                     id:'contrato1',
                     margin: '0 0 5 0',
                     scope: this
                     },
                     {
                     xtype: 'radio',
                     name: 'billingSameAsMailing',
                     boxLabel: 'Segun fecha de nacimiento',
                     hideLabel: true,
                     id:'nacer',
                     margin: '0 0 5 0',
                     scope: this
                     }
                     ]
                     }*/
                ]
            }
        ]
    });
    var _gst_win = new Ext.Window({
        title:'Crear reporte de antiguedad',
        id: '_gst_Add_win_id',
        name: '_gst_Add_win_id',
        height: 310,
        width: 550,
        plain: true,
        layout: 'fit',
        modal: true,
        resizable: false,
        items: [this.panel],
        buttons: [{
            text: 'Aceptar',cls:'btn btn-success',
            handler: function r(){
                var grid = Ext.getCmp('LCIndeterminado_grid_id');
                var panel = Ext.getCmp('panelNombre');
                var todos=Ext.getCmp('fofaqa').getValue();
                var annos= Ext.getCmp('Antiguedad').getValue();
                var superior= Ext.getCmp('superior').getValue();
                var inferior= Ext.getCmp('inferior').getValue();
                var contrato1I= Ext.getCmp('contrato1I').getValue();
                var contrato1= Ext.getCmp('contrato1').getValue();
                var nacer= Ext.getCmp('nacer').getValue();
                if(todos==false)
                {
                    Ext.suspendLayouts();
                    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.segun_antiguedad', {
                        fields: [
                            {name: 'nombre'},
                            {name: 'foto'},
                            {name: 'area'},
                            {name: 'cargo'},
                            {name: 'categoria'},
                            {name: 'clacificacion'},
                            {name: 'salario'},
                            {name: 'pago_adicional'},
                            {name: 'escala'},
                            {name: 'tiempo'},
                            {name: 'contrato'},
                            {name: 'fecha_inicio'} ,
                            {name: 'contrato_id'} ,
                            {name: 'fecha_nacimiento'} ,
                            {name: 'edad'}
                        ],
                        proxy: {
                            type: 'ajax',
                            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                        },
                        params:{anno:annos,superior:superior,inferior:inferior,contrato1I:contrato1I,contrato1:contrato1,nacer:nacer},
                        sorters: {property: 'tiempo', direction: 'ASC'},
                        autoLoad: false
                    });
                    this.__data_store.load({params: {start: 0, limit: 25}});
                }
                else
                {   Ext.suspendLayouts();
                    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.segun_antiguedad', {
                        fields: [
                            {name: 'nombre'},
                            {name: 'foto'},
                            {name: 'area'},
                            {name: 'cargo'},
                            {name: 'categoria'},
                            {name: 'clacificacion'},
                            {name: 'salario'},
                            {name: 'pago_adicional'},
                            {name: 'escala'},
                            {name: 'tiempo'},
                            {name: 'contrato'},
                            {name: 'fecha_inicio'} ,
                            {name: 'contrato_id'} ,
                            {name: 'fecha_nacimiento'} ,
                            {name: 'edad'}
                        ],
                        proxy: {
                            type: 'ajax',
                            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                        },params:{todos:todos},
                        sorters: {property: 'tiempo', direction: 'ASC'},
                        autoLoad: false
                    });
                    this.__data_store.load({params: {start: 0, limit: 25}});
                }
                panel.setTitle('Todos los Reportes - <span class="label label-info">Reporte de antig&uuml;edad</span>');
                grid.reconfigure(this.__data_store, [
                    Ext.create('Ext.grid.RowNumberer'),
                    {
                        header: 'Foto',
                        locked: true,
                        dataIndex: 'foto',
                        align: 'center',
                        width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            if(value == '' || value == null)
                                return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                            else
                                return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
                        }
                    },{
                        text: 'Nombre',
                        dataIndex: 'nombre',
                        flex: 2
                    },
                    {
                        text: 'Edad',
                        dataIndex: 'edad',
                        flex: 1
                    },
                    {
                        text: 'Antiguedad',
                        dataIndex: 'tiempo',
                        flex: 1
                    },{
                        text: '&Aacute;rea',
                        dataIndex: 'area',
                        flex: 1
                    },
                    {
                        text: 'Cargo',
                        dataIndex: 'cargo',
                        flex: 1
                    },
                    {
                        text: 'Categor&iacute;a',
                        dataIndex: 'categoria',
                        flex: 1

                    },
                    {
                        text: 'Clacificaci&oacute;n',
                        dataIndex: 'clacificacion',
                        flex: 1
                    },
                    {
                        text: 'Salario',
                        dataIndex: 'salario',
                        flex: 1
                    },
                    {
                        text: 'Pago Adicional',
                        dataIndex: 'pago_adicional',
                        flex: 1
                    },
                    {
                        text: 'Escala',
                        dataIndex: 'escala',
                        flex: 1
                    },
                    {
                        text: 'Contrato',
                        dataIndex: 'contrato',
                        flex: 1
                    },
                    {
                        text: 'Fecha inicio',
                        dataIndex: 'fecha_inicio',
                        flex: 1
                    },
                    {
                        text: 'Fecha nacimiento',
                        dataIndex: 'fecha_nacimiento',
                        flex: 1
                    }
                ]);
                this.imprime = Ext.create('Ext.Button', {
                    xtype: 'button',
                    cls: 'btnB',
                    id: 'imprime',
                    text: 'Imprimir',
                    listeners: {
                        click: function () {
                            var obj = {};
                            if(todos == true)
                                obj = {todos:todos};
                            else
                                obj = {anno:annos,superior:superior,inferior:inferior,contrato1I:contrato1I,contrato1:contrato1,nacer:nacer}
                            var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresSegunAntiguedad',
                                {
                                    fields : [{name : 'html'},{name : 'html'}],
                                    proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                                    autoLoad: false,listeners:{
                                    load:function(store, records,opt){
                                        var a = window.open('','','menubar=yes');
                                        a.document.write(store.getAt(0).data.html);
                                        a.document.close();
                                    }
                                }
                                });
                            __Imprimir.load({params:obj});
                        }
                    }});

                var tbar = Ext.getCmp('tbar_id');
                tbar.removeAll(true);
                tbar.add({
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store: this.__data_store,
                    displayMsg: 'Mostrando {0} - {1} de {2}',
                    emptyMsg: "Sin contenido para mostrar",
                    displayInfo: true,
                    plugins: new Ext.ux.SlidingPager()
                });
                tbar.add('->');

                tbar.add('-');
                tbar.add(this.imprime);
                tbar.add('-');

                Ext.resumeLayouts(true);
                _gst_win.close()
            } ,
            scope: this
        }, {
            text: 'Cancelar',cls:'btn btn-primary',
            handler: function(){_gst_win.close();
            }
        }],
        listeners: {
            'show': function(This, eOpts) {
                Ext.getCmp('Antiguedad').focus(true, true);
            }
        }
    });
    _gst_win.show();
}
//======================================Ubcacion de la defensa==========================================================
function SD_RegistroMilitar() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.SD_RegistroMilitar', {
        fields: [
            {name: 'nombre'},
            {name: 'count'}

        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">SD-Registro Militar</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Cantidad',
            dataIndex: 'count'

        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpSDRegistroMilitar',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                __Imprimir.load();
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function SD_RegistroMilitar_trabajadores() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.SD_RegistroMilitar_trabajadores', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'udefensa'},
            {name: 'telefono'},
            {name: 'no_identidad'},
            {name: 'munic'},
            {name: 'prov'},
            {name: 'repart'},
            {name: 'dir'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        sorters: {property: 'udefensa', direction: 'ASC'},
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">SD-Registro Militar</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Ubicaci&oacute;n',
            dataIndex: 'udefensa'

        },
        {
            flex: 2,
            text: 'Tel&eacute;fono',
            dataIndex: 'telefono'
        },
        {
            flex: 2,
            text: 'No. Identidad',
            dataIndex: 'no_identidad'

        },
        {
            flex: 2,
            text: 'Provincia',
            dataIndex: 'prov'
        },
        {
            flex: 2,
            text: 'Municipio',
            dataIndex: 'munic'

        },
        {
            flex: 2,
            text: 'Reparto',
            dataIndex: 'repart'
        },
        {
            flex: 2,
            text: 'Direcci&oacute;n',
            dataIndex: 'dir'

        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresUD',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),limit:store.pageSize}});
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function SD_RegistroMilitar_trabajadores_noinc() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.SD_RegistroMilitar_trabajadores_noinc', {
        fields: [
            {name: 'nombre'},
            {name: 'foto'},
            {name: 'udefensa'},
            {name: 'telefono'},
            {name: 'no_identidad'},
            {name: 'munic'},
            {name: 'prov'},
            {name: 'repart'},
            {name: 'dir'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        sorters: {property: 'udefensa', direction: 'ASC'},
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">SD-Registro Militar</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {  header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },{
            flex: 2,
            text: 'Nombre',
            dataIndex: 'nombre'
        },
        {
            flex: 2,
            text: 'Ubicaci&oacute;n',
            dataIndex: 'udefensa'

        },
        {
            flex: 2,
            text: 'Tel&eacute;fono',
            dataIndex: 'telefono'
        },
        {
            flex: 2,
            text: 'No. Identidad',
            dataIndex: 'no_identidad'

        },
        {
            flex: 2,
            text: 'Provincia',
            dataIndex: 'prov'
        },
        {
            flex: 2,
            text: 'Municipio',
            dataIndex: 'munic'

        },
        {
            flex: 2,
            text: 'Reparto',
            dataIndex: 'repart'
        },
        {
            flex: 2,
            text: 'Direccion',
            dataIndex: 'dir'

        }
    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresSDNIncorporados',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),limit:store.pageSize}});
            }
        }});

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');

    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}

//---===================================Consultas=======================================================================
function CpfechaNa() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.consultas', {
        fields: [
            {name: 'fecha',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'nombre_completo'},
            {name: 'foto'},
            {name: 'especialidad'},
            {name: 'clasifi'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'direccion'},
            {name: 'edad'},
            {name: 'mes'},
            {name: 'lugar_procedencia'}
        ],
        sorters: {property: 'fecha', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },

        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad',
            width: 90
        },
        {
            flex: 2,
            text: 'Clasificaci&oacute;n',
            dataIndex: 'clasifi',
            width: 90
        },
        {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 90
        },
        {
            text: 'Fecha de Nacimiento',
            dataIndex: 'fecha',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        }
        /*{
         width: 110,
         text: 'Direccion',
         dataIndex: 'direccion'

         },
         {
         text: 'Edad',
         dataIndex: 'edad',
         width: 140
         },
         {
         text: 'Mes',
         dataIndex: 'mes',
         width: 140
         }*/
    ]);
    this.__data_store.load({params: {start: 0, limit: 25}});
    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:65,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());
                    },scope:this
                }
            }
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresConsultas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),
                    limit:store.pageSize,
                    nombre_completo:Ext.getCmp('searchField').getValue()}});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function Cespecial() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.consultas', {
        fields: [
            {name: 'fecha',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'nombre_completo'},
            {name: 'foto'},
            {name: 'especialidad'},
            {name: 'id_especialidad'},
            {name: 'clasifi'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'direccion'},
            {name: 'edad'},
            {name: 'mes'},
            {name: 'lugar_procedencia'}
        ],
        sorters: {property: 'fecha', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store){
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },

        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad',
            width: 90
        },
        {
            flex: 2,
            text: 'Clasificacion',
            dataIndex: 'clasifi',
            width: 90
        },
        {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 90
        },
        {
            text: 'Fecha de Nacimiento',
            dataIndex: 'fecha',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        }
        /*{
         width: 110,
         text: 'Direccion',
         dataIndex: 'direccion'

         },
         {
         text: 'Edad',
         dataIndex: 'edad',
         width: 140
         },
         {
         text: 'Mes',
         dataIndex: 'mes',
         width: 140
         }*/
    ]);
    this.__data_store.load({params: {start: 0, limit: 25}});
    this.esp = App.BuildJsonStore('Resumenes.Resumenes.especialidad', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.combo_Solicitud=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Tipo de especialidad',
        store:this.esp  ,
        queryMode: 'local',
        id:'sd',
        anchor: '100%',
        labelWidth:120,
        name:'sd',
        displayField: 'nombre',
        valueField: 'id',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("id_especialidad", Ext.getCmp('sd').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:100,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());
                        if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("id_especialidad", Ext.getCmp('sd').getValue());
                    },scope:this
                }
            }, this.combo_Solicitud
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresConsultas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),
                    limit:store.pageSize,
                    nombre_completo:Ext.getCmp('searchField').getValue(),
                    id_especialidad:Ext.getCmp('sd').getValue()}});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });


    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function Cclass() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.consultas', {
        fields: [
            {name: 'fecha',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'nombre_completo'},
            {name: 'foto'},
            {name: 'especialidad'},
            {name: 'clasifi'},
            {name: 'id_clasificacion'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'direccion'},
            {name: 'edad'},
            {name: 'mes'},
            {name: 'lugar_procedencia'}
        ],
        sorters: {property: 'fecha', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store){
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },

        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad',
            width: 90
        },
        {
            flex: 2,
            text: 'Clasificacion',
            dataIndex: 'clasifi',
            width: 90
        },
        {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 90
        },
        {
            text: 'Fecha de Nacimiento',
            dataIndex: 'fecha',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        }
        /*{
         width: 110,
         text: 'Direccion',
         dataIndex: 'direccion'

         },
         {
         text: 'Edad',
         dataIndex: 'edad',
         width: 140
         },
         {
         text: 'Mes',
         dataIndex: 'mes',
         width: 140
         }*/
    ]);
    this.__data_store.load({params: {start: 0, limit: 25}});
    this.esp = App.BuildJsonStore('Resumenes.Resumenes.Cclass', {
        fields: [
            {name: 'noambre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.combo_Solicitud=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Clasificacion',
        store:this.esp  ,
        queryMode: 'local',
        id:'sd',
        anchor: '100%',
        labelWidth:120,
        name:'sd',
        displayField: 'noambre',
        valueField: 'id',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("id_clasificacion", Ext.getCmp('sd').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:100,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                        if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("id_clasificacion", Ext.getCmp('sd').getValue());
                    },scope:this
                }
            }, this.combo_Solicitud
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresConsultas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),
                    limit:store.pageSize,
                    nombre_completo:Ext.getCmp('searchField').getValue(),
                    id_clasificacion:Ext.getCmp('sd').getValue()}});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function Cmes() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.consultas_mes', {
        fields: [
            {name: 'fecha',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'nombre_completo'},
            {name: 'foto'},
            {name: 'especialidad'},
            {name: 'clasifi'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'direccion'},
            {name: 'edad'},
            {name: 'mes'},
            {name: 'lugar_procedencia'}
        ],
        sorters: {property: 'fecha', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'img',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store){
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },

        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad',
            width: 90
        },
        {
            flex: 2,
            text: 'Clasificacion',
            dataIndex: 'clasifi',
            width: 90
        },
        {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 90
        },
        {
            text: 'Fecha de Nacimiento',
            dataIndex: 'fecha',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        }
        /*{
         width: 110,
         text: 'Direccion',
         dataIndex: 'direccion'

         },
         {
         text: 'Edad',
         dataIndex: 'edad',
         width: 140
         },
         {
         text: 'Mes',
         dataIndex: 'mes',
         width: 140
         }*/
    ]);
    this.__data_store.load({params: {start: 0, limit: 25}});

    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:65,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());
                    },scope:this
                }
            }
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresConsultas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),
                    limit:store.pageSize,
                    nombre_completo:Ext.getCmp('searchField').getValue(),
                    mes:'t'}});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function Cprocedencia() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.consultas', {
        fields: [
            {name: 'fecha',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'nombre_completo'},
            {name: 'foto'},
            {name: 'especialidad'},
            {name: 'clasifi'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'direccion'},
            {name: 'edad'},
            {name: 'mes'},
            {name: 'nombre'}
        ],
        sorters: {property: 'fecha', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store){
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },

        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad',
            width: 90
        },
        {
            flex: 2,
            text: 'Clasificacion',
            dataIndex: 'clasifi',
            width: 90
        },
        {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 90
        },
        {
            text: 'Fecha de Nacimiento',
            dataIndex: 'fecha',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
            width: 110,
            text: 'Lugar procedencia',
            dataIndex: 'nombre'

        }
        /* {
         text: 'Edad',
         dataIndex: 'edad',
         width: 140
         },
         {
         text: 'Mes',
         dataIndex: 'mes',
         width: 140
         }*/
    ]);
    this.__data_store.load({params: {start: 0, limit: 25}});
    this.esp = App.BuildJsonStore('Resumenes.Resumenes.lugar', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.combo_Solicitud=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Procedencia',
        store:this.esp  ,
        queryMode: 'local',
        id:'sd',
        anchor: '100%',
        labelWidth:120,
        name:'sd',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('sd').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:100,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                        if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre", Ext.getCmp('sd').getValue());
                    },scope:this
                }
            }, this.combo_Solicitud
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresConsultas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),
                    limit:store.pageSize,
                    nombre_completo:Ext.getCmp('searchField').getValue(),
                    id_procedencia:Ext.getCmp('sd').getValue()}});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function Sexo() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.consultas', {
        fields: [
            {name: 'fecha',type: 'date',dateFormat: 'Y-m-d'},
            {name: 'nombre_completo'},
            {name: 'foto'},
            {name: 'especialidad'},
            {name: 'clasifi'},
            {name: 'cargo'},
            {name: 'area'},
            {name: 'agencia'},
            {name: 'direccion'},
            {name: 'edad'},
            {name: 'mes'},
            {name: 'nombre'},
            {name: 'sex'}
        ],
        sorters: {property: 'fecha', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {   header: 'Foto',
            locked: true,
            dataIndex: 'foto',
            align: 'center',
            width: 80,
            renderer: function (value, metaData, record, rowIndex, colIndex, store){
                if(value == '' || value == null)
                    return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                else
                    return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
            }
        },
        {
            flex: 1,
            text: 'Nombre',
            dataIndex: 'nombre_completo'
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 1
        },
        {
            text: '&Aacute;rea',
            dataIndex: 'area',
            flex: 1
        },

        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad',
            width: 90
        },
        {
            flex: 2,
            text: 'Clasificacion',
            dataIndex: 'clasifi',
            width: 90
        },
        {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo',
            width: 90
        },
        {
            text: 'Fecha de Nacimiento',
            dataIndex: 'fecha',
            width: 150,
            renderer: Ext.util.Format.dateRenderer('m/d/Y')
        },
        {
            width: 110,
            text: 'Sexo',
            dataIndex: 'sex'

        }
        /* {
         text: 'Edad',
         dataIndex: 'edad',
         width: 140
         },
         {
         text: 'Mes',
         dataIndex: 'mes',
         width: 140
         }*/
    ]);
    this.__data_store.load({params: {start: 0, limit: 25}});
    this.esp = App.BuildJsonStore('Resumenes.Resumenes.sex', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.combo_Solicitud=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Sexo',
        store:this.esp  ,
        queryMode: 'local',
        id:'sd',
        anchor: '100%',
        labelWidth:120,
        name:'sd',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("sex", Ext.getCmp('sd').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:100,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                        if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("sex", Ext.getCmp('sd').getValue());
                    },scope:this
                }
            }, this.combo_Solicitud
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresConsultas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),
                    limit:store.pageSize,
                    nombre_completo:Ext.getCmp('searchField').getValue(),
                    sexo:Ext.getCmp('sd').getValue()}});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function piel() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.piel', {
        fields: [
            {name: 'lugar'},
            {name: 'piel'},
            {name: 'cant'}
        ],
        sorters: {property: 'piel', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        groupField: 'lugar',
        autoLoad: false
    });
    panel.setTitle('Todos los Reportes - <span class="label label-info">Fluctuaci&oacute;n</span>');
    grid.reconfigure(this.__data_store, [
        // Ext.create('Ext.grid.RowNumberer'),
        {
            text: 'Color de piel',
            dataIndex: 'piel',
            flex: 1
        },
        {
            text: 'Cantidad de trabajadores',
            dataIndex: 'cant',
            flex: 1
        }
    ]);
    this.__data_store.load({params: {start: 0, limit: 25}});
    this.esp = App.BuildJsonStore('Resumenes.Resumenes.sex', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.combo_Solicitud=Ext.create('Ext.form.ComboBox', {
        emptyText: 'Filtrar por : Sexo',
        store:this.esp  ,
        queryMode: 'local',
        id:'sd',
        anchor: '100%',
        labelWidth:120,
        name:'sd',
        displayField: 'nombre',
        valueField: 'nombre',
        listeners: {
            change:function(){
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                    Ext.getCmp('LCIndeterminado_grid_id').store.filter("sex", Ext.getCmp('sd').getValue());
                //----------------------------------------------------------------------------------------------

            },scope:this
        }
    });
    this.panel=Ext.create('Ext.panel.Panel', {
        width: 300,
        height:100,
        padding:10,
        layout: 'anchor',
        items:[
            {
                xtype: 'textfield',
                name: 'searchField',
                id:'searchField',
                enableKeyEvents : true,
                hideLabel: true,
                anchor: '100%',
                emptyText:'Filtrar por : Nombre del Trabajador',
                listeners: {
                    change:function(){
                        Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();

                        if(Ext.getCmp('searchField').getValue() != null && Ext.getCmp('searchField').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("nombre_completo", Ext.getCmp('searchField').getValue());

                        if(Ext.getCmp('sd').getValue() != null && Ext.getCmp('sd').getValue() != '')
                            Ext.getCmp('LCIndeterminado_grid_id').store.filter("sex", Ext.getCmp('sd').getValue());
                    },scope:this
                }
            }, this.combo_Solicitud
        ]
    });
    this.opc=Ext.create('Ext.button.Split',{
        text : 'Filtrado de Datos',
        cls:'btn btn-group',
        menu:[this.panel]
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                var __Imprimir = App.BuildJsonStore('Resumenes.Resumenes.ImpTrabajadoresConsultas',
                    {
                        fields : [{name : 'html'},{name : 'html'}],
                        proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                        autoLoad: false,listeners:{
                        load:function(store, records,opt){
                            var a = window.open('','','menubar=yes');
                            a.document.write(store.getAt(0).data.html);
                            a.document.close();
                        }
                    }
                    });
                var store = Ext.getCmp('LCIndeterminado_grid_id').store;
                __Imprimir.load({params:{start:(parseFloat(store.currentPage)-1)*parseFloat(store.pageSize),
                    limit:store.pageSize,
                    nombre_completo:Ext.getCmp('searchField').getValue(),
                    sexo:Ext.getCmp('sd').getValue()}});
            }
        }});
    this.tool = Ext.create('Ext.toolbar.Toolbar', {
        items: [this.opc,'->',this.imprime]
    });

    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store:this.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.tool);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function promedioedad() {

    var promedioareas  = this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.promedioareas', {
        fields: [
            {name: 'nombre'},
            {name: 'prom'}
        ],
        sorters: {property: 'nombre', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });
    var promedioagencia=this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.promedioagencia', {
        fields: [
            {name: 'nombre'},
            {name: 'prom'}
        ],
        sorters: {property: 'nombre', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });
    var promedioempresa= this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.promedioempresa', {
        fields: [
            {name: 'nombre'},
            {name: 'prom'}
        ],
        sorters: {property: 'nombre', direction: 'ASC'},
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });

    var promedioareasgrid=Ext.create('Ext.grid.Panel', {
        title: 'Edad Promedio - Areas',
        store:  promedioareas,
        columns: [
            { text: 'Area',  dataIndex: 'nombre',flex: 1  },
            { text: 'Edad Promedio', dataIndex: 'prom', flex: 1 }

        ],
        height: 200,
        width: '100%'
    });
    var promedioagenciagrid=Ext.create('Ext.grid.Panel', {
        title: 'Edad Promedio - Agencias',
        store:  promedioagencia,
        columns: [
            { text: 'Agencia',  dataIndex: 'nombre',flex: 1  },
            { text: 'Edad Promedio', dataIndex: 'prom', flex: 1 }

        ],
        height: 200,
        width: '100%'
    });
    var promedioempresagrid=Ext.create('Ext.grid.Panel', {
        title: 'Edad Promedio - Empresa',
        store:  promedioempresa,
        columns: [
            { text: 'Empresa',  dataIndex: 'nombre',flex: 1  },
            { text: 'Edad Promedio', dataIndex: 'prom', flex: 1 }

        ],
        height: 200,
        width: '100%'
    });

    var filterPanel = Ext.create('Ext.panel.Panel', {
        width: '100%',
        height:'100%',
        items: [promedioareasgrid,promedioagenciagrid,promedioempresagrid ]
    });
    Ext.create('Ext.window.Window', {
        title: 'Edad Promedio',
        height: '70%',
        width: '50%',
        modal:true,
        autoScroll:true,
        layout: 'anchor',
        items: filterPanel
    }).show();

}

//-------------------------------------------Subsistema ---- Capacitacion----------------------------------------------
function especialidad() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts(); var _scope = this;
    this.__data_store_especialidad = App.BuildJsonStore('Resumenes.Resumenes.especialidadesFisicas', {
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad:true
    });
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.especialidades', {
        fields: [
            {name: 'cargo'},
            {name: 'nivel'},
            {name: 'nombre_completo'},
            {name: 'especialidad'},
            {name: 'agencia'},
            {name: 'area'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
   panel.setTitle('Todos los Reportes - <span class="label label-info">Trabajadores segun especialidades ');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad'
        },
        {
            flex: 2,
            text: 'Nivel',
            dataIndex: 'nivel'

        }, {
            flex: 2,
            text: 'Cargo',
            dataIndex: 'cargo'

        },
        {
            text: 'Nombre',
            dataIndex: 'nombre_completo',
            flex: 2
        },
        {
            text: 'Area',
            dataIndex: 'area',
            flex: 2
        },
        {
            text: 'Agencia',
            dataIndex: 'agencia',
            flex: 2
        }

    ]);
    this.grafica = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'grafica',
        text: 'Graficar',
        listeners: {
            scope: this,
            click: function () {
                var donut = false,
                    chart = Ext.create('Ext.chart.Chart', {
                        width: '100%',
                        height: '100%',
                        xtype: 'chart',
                        shadow: true,
                        animate: true,
                        legend: {position: 'right'},
                        insetPadding: 60,
                        store: _scope.__data_store,
                        theme: 'Base:gradients',
                        series: [
                            {
                                type: 'pie',
                                angleField: 'especialidad',
                                showInLegend: true,
                                tips: {
                                    trackMouse: true,
                                    width: 200,
                                    height: 28,
                                    renderer: function (storeItem, item) {
                                        var total = 0;
                                        _scope.__data_store.each(function (rec) {
                                            total += rec.get('especialidad');
                                        });
                                       this.setTitle(storeItem.get('nombre') + ': ' + Math.round(storeItem.get('especialidad') / total * 100) + '%');
                                    }
                                },
                                highlight: {
                                    segment: {
                                        margin: 20
                                    }
                                },
                                label: {
                                    field: 'especialidad',
                                    display: 'rotate',
                                    contrast: true,
                                    font: '14px Arial'
                                }
                            }
                        ]
                    });
                Ext.create('Ext.window.Window', {
                    title: 'Graficos de la Aplicacion',
                    height: 550,
                    width: 800,
                    layout: 'fit',
                    items: chart
                }).show();
            }
        }
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                Ext.create('Ext.window.Window', {
                    title: 'Ventana de Imprecion',
                    height: 300,
                    width: 500,
                    layout: 'fit'
                }).show();
            }
        }});
    this.combo=Ext.create('Ext.form.ComboBox', {
                    fieldLabel: 'Buscar por',
                    store:this.__data_store_especialidad  ,
                    queryMode: 'local',
                    id:'como',
                    name:'como',
                    displayField: 'nombre',
                    valueField: 'nombre',
        listeners: {
            change:function(){
                //console.log(Ext.getCmp('LCIndeterminado_grid_id').store);
                Ext.getCmp('LCIndeterminado_grid_id').store.clearFilter();
                Ext.getCmp('LCIndeterminado_grid_id').store.filter("especialidad", Ext.getCmp('como').getValue());
            },scope:this
        }
                });
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: _scope.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.combo);
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.grafica);
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function contespecialidad() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts(); var _scope = this;
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.contespecialidades', {
        fields: [
            {name: 'especialidad'},
            {name: 'count'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store.load({params: {start: 0, limit: 25}});
    panel.setTitle('Todos los Reportes - <span class="label label-info">Cantidad de trabajadores por especialidades ');
    grid.reconfigure(this.__data_store, [
        Ext.create('Ext.grid.RowNumberer'),
        {
            flex: 2,
            text: 'Especialidad',
            dataIndex: 'especialidad'
        },
        {
            flex: 2,
            text: 'Cantidad',
            dataIndex: 'count'

        }

    ]);
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                Ext.create('Ext.window.Window', {
                    title: 'Ventana de Imprecion',
                    height: 300,
                    width: 500,
                    layout: 'fit'
                }).show();
            }
        }});
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: _scope.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);
}
function cursosSolicitados() {
    var grid = Ext.getCmp('LCIndeterminado_grid_id');
    var panel = Ext.getCmp('panelNombre');
    Ext.suspendLayouts();var _scope = this;
    this.__data_store = App.BuildJsonStore('Resumenes.Resumenes.curso_solicitados', {
        fields: [
            {name: 'nombre'},
            {name: 'cursos'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: false,
        groupField: 'nombre'
    });
    var grouping_Feature_categorias = Ext.create('Ext.grid.feature.Grouping', {groupHeaderTpl: 'Areas: {name} ' + ' ({rows.length})'});
    var tbar = Ext.getCmp('LCIndeterminado_grid_id');
    tbar.add({features: [grouping_Feature_categorias]});
    this.__data_store.load({params: {start: 0, limit: 25}});
   panel.setTitle('Todos los Reportes - <span class="label label-info">Cursos Solicitados</span>');
    grid.reconfigure(this.__data_store, [
        {
            text: 'Cursos',
            // locked:true,
            dataIndex: 'cursos',
            flex: 2
        }
    ]);
    var tbar = Ext.getCmp('tbar_id');
    tbar.removeAll(true);
    tbar.add({
        xtype: 'pagingtoolbar',
        pageSize: 10,
        store: _scope.__data_store,
        displayMsg: 'Mostrando {0} - {1} de {2}',
        emptyMsg: "Sin contenido para mostrar",
        displayInfo: true,
        plugins: new Ext.ux.SlidingPager()
    });
    this.grafica = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'grafica',
        text: 'Graficar',
        listeners: {
            scope: this,
            click: function () {
                var donut = false,
                    chart = Ext.create('Ext.chart.Chart', {
                        width: '100%',
                        height: '100%',
                        xtype: 'chart',
                        shadow: true,
                        animate: true,
                        legend: {position: 'right'},
                        insetPadding: 60,
                        store: _scope.__data_store,
                        theme: 'Base:gradients',
                        series: [
                            {
                                type: 'pie',
                                angleField: 'directos',
                                showInLegend: true,
                                tips: {
                                    trackMouse: true,
                                    width: 200,
                                    height: 28,
                                    renderer: function (storeItem, item) {
                                        var total = 0;
                                        _scope.__data_store.each(function (rec) {
                                            total += rec.get('cantidad_plazas');
                                        });
                                        this.setTitle(storeItem.get('nombre') + ': ' + Math.round(storeItem.get('directos') / total * 100) + '%');
                                    }
                                },
                                highlight: {
                                    segment: {
                                        margin: 20
                                    }
                                },
                                label: {
                                    field: 'nombre',
                                    display: 'rotate',
                                    contrast: true,
                                    font: '14px Arial'
                                }
                            }
                        ]
                    });
                Ext.create('Ext.window.Window', {
                    title: 'Graficos de la Aplicacion',
                    height: 550,
                    width: 800,
                    layout: 'fit',
                    items: chart
                }).show();
            }
        }
    });
    this.imprime = Ext.create('Ext.Button', {
        xtype: 'button',
        cls: 'btnB',
        id: 'imprime',
        text: 'Imprimir',
        listeners: {
            click: function () {
                Ext.create('Ext.window.Window', {
                    title: 'Ventana de Imprecion',
                    height: 300,
                    width: 500,
                    layout: 'fit'
                }).show();
            }
        }});
    tbar.add('->');
    tbar.add('-');
    tbar.add(this.grafica);
    tbar.add('-');
    tbar.add(this.imprime);
    tbar.add('-');
    Ext.resumeLayouts(true);


}