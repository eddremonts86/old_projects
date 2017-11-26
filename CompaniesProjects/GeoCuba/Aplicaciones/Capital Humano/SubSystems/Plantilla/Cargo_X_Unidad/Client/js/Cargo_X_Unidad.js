function Cargo_X_Unidad(){
    this.__data_store_datos = null;
    this.Init = function()
    {
        var _menu_item_config_cargos =
        {
            text: 'Puesto por Área',
            id: 'Cargos_por_area_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Codificadores', 'Áreas', _menu_item_config_cargos);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store_datos = App.BuildJsonStore('Cargo_X_Unidad.Cargo_X_Unidad.Tomar_datos_generales',{
            fields: [
                {name: 'empresa'},
                {name: 'agencia'},
                {name: 'area'},
                {name: 'trabajador_nombre_completo'},
                {name: 'nombre_cargo'},
                {name: 'tipo_contrato'},
                {name: 'contrato_ff'},
                {name: 'contrato_fi'},
                {name: 'sist_pago'},
                {name: 'forma_pago'},
                {name: 'horario_trabajo'}

            ],
            groupField : 'area',
            proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
            //params:{select_unidad:select},
            autoLoad: false
        });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{startCollapsed:true, groupHeaderTpl: 'Área: {name}' + ' ({rows.length})'});
        var _grid = new Ext.grid.Panel({
                id: 'CardoxUnidad_grid_id',
                height: App.GetDesktopHeigth() - 35,
                width: '100%',
                region: 'center',
                frame: true,
                selType: 'rowmodel',
                enableColumnResize: true,
                sortableColumns : false,
                features: [groupingFeature],
                store: this.__data_store_datos,
                columns: [
                    {
                        header: 'Cargo',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'nombre_cargo',
                        flex: 5
                    },
                    {
                        header: 'Agencia',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'agencia',
                        flex: 5
                    },
                    {
                        header: 'Área',
                        menuDisabled: true,
                        sortable: false,
                        dataIndex: 'area',
                        flex: 5
                    }

                ],
                viewConfig: {
                    forceFit: true
                },
                tbar: {
                    id: 'Puestos_trabajo_por_area_tbar_id',
                    items: ['-'],
                    height: 28
                },
                bbar: {
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store:  this.__data_store_datos,
                    displayInfo: true,
                    plugins: new Ext.ux.ProgressBarPager()
                },
                listeners: {
                    selectionchange: {
                        fn: function (View, selections, options) {
                            if (selections.length == 0) {
                                this.Disable('Puestos_trabajo_por_areaGestionar');
                            }
                            else {
                                this.Enable('Puestos_trabajo_por_areaGestionar');
                            }
                        },
                        scope: this
                    }
                },
                plugins: [{
                    ptype: 'rowexpander',
                    rowBodyTpl : new Ext.XTemplate(
                        '<table class="table table-bordered mejorar">' ,
                        '<tr class="info">',
                        '<td>Nombre :  {trabajador_nombre_completo}</td>',
                        '<td>Tipo de contrato:</b> {tipo_contrato}</td>',
                        '<td>Fecha de inicio:</b> {contrato_ff}</td>',
                        '<td>Fecha de fin:</b> {contrato_fi}</td>',
                        ' </tr>',
                        ' <tr>',
                        '<td>Sistema de pago:</b> {sist_pago}</td>',
                        '<td>Forma de pago:</b> {forma_pago}</td>',
                        '<td>Horario de trabajo:</b> {horario_trabajo}</td>',
                        '<td></td>',
                        ' </tr>',
                        '<tr class="info">',
                        '<td></td>','<td></td>','<td></td>','<td></td>',
                        '</table>',
                        {
                            formatChange: function(v){
                                var color = v >= 0 ? 'green' : 'red';
                                return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                            }
                        })
                }]
            });
        var _panel = new Ext.Panel({
                title: 'Gestionar Puesto por Área',
                border: true,
                frame: true,
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
                items: [_grid],
                listeners: {
                    afterrender: function() {
                        this.__data_store_datos.load({
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
        this.__data_store_datos.removeAll(true);
        delete this.__data_store_datos;
        this.__data_store_datos = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Cargo_X_Unidad', new Cargo_X_Unidad());