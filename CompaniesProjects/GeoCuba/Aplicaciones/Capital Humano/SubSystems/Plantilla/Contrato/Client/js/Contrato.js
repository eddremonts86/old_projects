function Contrato(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_Contratos =
        {
            text: 'Contrato',
            id: 'Contrato_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla', _menu_item_config_Contratos);
                
    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Contrato.Contrato.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'nombre_completo'},
            {name: 'tipo_contrato'},
            {name: 'fecha_inicio'},
            {name: 'fecha_final'}


            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            groupField : 'tipo_contrato',
            autoLoad: false
            });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Tipo de Contrato: {name} ' + ' ({rows.length})'
        });
        this._grid = new Ext.grid.Panel(
        {
            id: 'Contrato_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            features: [groupingFeature],
            store: this.__data_store,
            columns: [
                {
                    header: 'Trbajador',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'nombre_completo',
                    flex: 5
                },{
                header: 'Tipo de Contrato',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'tipo_contrato',
                flex: 5
                },{
                header: 'Fecha Inicio',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fecha_inicio',
                flex: 5
            },{
                    header: 'Fecha Final',
                    menuDisabled: true,
                    sortable : false,
                    dataIndex: 'fecha_final',
                    flex: 5,
                    renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                        if(value=="0001-01-01 00:00:00"){
                            var fin="";
                            return  fin;
                        }else{
                            return value;
                        }

                    }
                }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Contrato_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar:[ {
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
                        height:'45%',
                        width:'50%',
                        iconCls:'help',modal:true,
                        autoScroll:true,
                        layout: 'anchor',
                        html:
                            '<ul class="nav nav-list">' +
                                '<li>El modulo <span class="label label-info">" Gestionar Contratos"</span>' +
                                ' le permite conocer todos los contratos de la empresa con sus trabajadores por tipo :<br>' +
                                '1- Adistramiento<br>' +
                                '2- A prueba<br>' +
                                '3- Disponible<br>' +
                                '4- Domiciliar<br>' +
                                '5- Temporal<br>' +
                                '6- Indeterminado<br>' +
                                'la fecha de inicio del contrato y fin del mismo.<br>' +
                                '<span class="label label-warning">Nota :</span><br>Como un trabajador puede pasar por distintos contratos a traves del tiempo y no cambiar ' +
                                'de puesto de trabajo se ideó este modulo que permite modificar el contrato sin alterar la plantilla.' +
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
                            this.Disable('ContratoGestionar');
                        }
                        else
                        {
                          this.Enable('ContratoGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Contrato',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [this._grid],
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
App.RegisterModule('Contrato', new Contrato());