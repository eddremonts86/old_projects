function Cargo(){
    this.Init = function(){
        var _menu_item_config_Cargo =
        {
            text: 'Cargo',
            id: 'Cargo_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Codificadores','Escalas y Cargos',_menu_item_config_Cargo);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj){
        this.__data_store_car = App.BuildJsonStore('Cargo.Cargo.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'norma_juridica'},
            {name: 'categoria_ocupacional'},
            {name: 'nivel_preparacion'},
            {name: 'clasificacion'},
            {name: 'escala'},
            {name: 'id_norma_juridica'},
            {name: 'id_categoria_ocupacional'},
            {name: 'id_nivel_preparacion'},
            {name: 'id_clasificacion'},
            {name: 'id_escala'},
            {name: 'nombre'},
            {name: 'responsabilidad'},
            {name: 'autoidad'},
            {name: 'funciones'},
            {name: 'competencia'},
            {name: 'condiciones'},
            {name: 'requisitos'},
            {name: 'cies'},
            {name: 'cla'},
            {name: 'tnc'},
            {name: 'otros'},
            {name: 'equi_util_herram'},
            {name: 'esperiencia'},
            {name: 'impacto'}


            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var _grid = new Ext.grid.Panel({
            id: 'Cargo_grid_id',
            name:'Cargo_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store_car,
            columns: [{
                header: 'Nombre',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 5
                },{
                header: 'Grupo Escala',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'escala',
                flex: 5
            },{
                header: 'Clasificación',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'clasificacion',
                flex: 5
            },
                {
                    header: 'Nivel de Preparación',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'nivel_preparacion',
                    flex: 5
                }, {
                    header: 'Categoría Ocupacional',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'categoria_ocupacional',
                    flex: 5
                },
                 {
                    header: 'Norma Jurídica',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'norma_juridica',
                    flex: 5
                },{
                    header: 'CIES',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'cies',
                    flex: 2
                },{
                    header: 'CLA',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'cla',
                    flex: 2
                },{
                    header: 'Tnc',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'tnc',
                    flex: 2
                },{
                    header: 'Otros',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'otros',
                    flex: 2
                }
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Cargo_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_car,
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
                        width:'50%',
                        iconCls:'help',
                        autoScroll:true,modal:true,
                        layout: 'anchor',
                        html:
                            '<ul class="nav nav-list">' +
                                '<li>El m&oacute;dulo <span class="label label-info">" Gestionar Cargos"</span>' +
                                ' le permite conocer y gestionar todos los cargos de la empresa , su grupo de escala salarial, categor&iacute;a ocupacional, nivel de preparaci&oacute;n, ' +
                                'clasificaci&oacute;n directos/indirectos as&iacute; como la norma jur&iacute;dica que lo acredita.<br>' +
                                '</li>' +
                                '</ul>'

                    }).show();
                }
            }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('CargoGestionar');
                        }
                        else
                        {
                          this.Enable('CargoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Cargo',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid],
            listeners: {
                afterrender: function() {
                    this.__data_store_car.load({
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
    this.Free = function(){
        this.__data_store_car.removeAll(true);
        delete this.__data_store_car;
        this.__data_store_car = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function(){
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Cargo', new Cargo());