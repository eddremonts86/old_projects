function LCargos() {
    this.Init = function () {
        var Listado_Cargos_menu_id =
        {
            text: 'Listado de Cargos',
            id: 'Listado_Cargos_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Codificadores', 'Escalas y Cargos', Listado_Cargos_menu_id);

    }
    // ========================================================================//
    this.BuildMainPanel = function (filterObj) {
        this.__data_store_lcargoas = App.BuildJsonStore('LCargos.LCargos.CargarDatos',
            {
                fields: [
                    {name: 'id'},
                    {name: 'cant_plasas'},
                    {name: 'cargo'},
                    {name: 'resolucion'},
                    {name: 'area'},
                    {name: 'existencia'}
                ],
                groupField : 'area',
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl: 'Área: {name} ' + ' ({rows.length})'});
        var _grid = new Ext.grid.Panel({
                id: 'LCargos_grid_id',
                name:'LCargos_grid_id',
                height: App.GetDesktopHeigth() - 35,
                width: '100%',
                region: 'center',
                frame: true,
                store: this.__data_store_lcargoas,
                features: [groupingFeature],
                columns: [
                    {
                        header: 'Cargo',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'cargo',
                        flex: 5
                    },
                    {
                        header: 'Área',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'area',
                        flex: 5
                    },
                    {
                        header: 'Plaza',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'cant_plasas',
                        flex: 5
                    },
                    {
                        header: 'Existencia',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'existencia',
                        flex: 5
                    },
                    {
                        header: 'Resolución',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'resolucion',
                        flex: 5
                    }
                ],
                viewConfig: {
                    forceFit: true
                },
                tbar: {
                    id: 'LCargos_tbar_id',
                    items: ['-'],
                    height: 28
                },
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
                            '<li>El m&oacute;dulo <span class="label label-info">" Gestionar Listado de Cargos"</span>' +
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
                                this.Disable('LCargosGestionar');
                            }
                            else {
                                this.Enable('LCargosGestionar');
                            }

                        },
                        scope: this
                    }
                }
            });
        var _panel = new Ext.Panel(
            {
                title: 'Gestionar Listado de Cargos',
                border: true,
                frame: true,
                id:'panel_general',
                name:'panel_general',
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
                items: [_grid],
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
App.RegisterModule('LCargos', new LCargos());