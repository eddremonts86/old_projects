function Estimulos(){
    this.__data_store = null;
    this.Init = function()
    {
            var _menu_item_config_Estimulos =
        {
            text: 'Estímulos',
            id: 'Estimulos_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestion de Cuadros',_menu_item_config_Estimulos);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Estimulos.Estimulos.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'descr'},
            {name: 'abe'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        this.__data_store_cuadros = App.BuildJsonStore('Estimulos.Estimulos.CargarDatoscuadros',{
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
            id: 'Estimulos_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            layout: 'anchor',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Estimulo',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 3},
                {header: 'Descripcion',menuDisabled: true,sortable : false,dataIndex: 'descr',flex: 5},
                {header: 'Abreviatura',menuDisabled: true,sortable : false,dataIndex: 'abe',flex: 1}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Estimulos_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('EstimulosGestionar');
                        }
                        else
                        {
                          this.Enable('EstimulosGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var cuadro =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Cuadros',
            name: 'Cuadros_Estimulos',
            id: 'Cuadros_Estimulos',
            store:this.__data_store_cuadros,
            queryMode: 'local',
            displayField: 'nombre',
            valueField: 'id'
        });
        var panel_datos=Ext.create('Ext.form.Panel', {
            title: 'Otorgar Estímulos ',
            bodyPadding: 5,
            width: 350,
            url: 'save-form.php',
            layout: 'anchor',
            //collapsed:true,
            collapsible:true,
            id:'cuadros_form_Estimulos',
            name:'cuadros_form_Estimulos',
            region: 'east',
            defaults: {anchor: '100%'},
            items: [cuadro,{
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: 'Fecha de entrega',
                name: 'from_date_Ractivación_Estimulos',
                id: 'from_date_Ractivación_Estimulos',
                maxValue: new Date()  // limited to the current date or prior
                 },
                {html:'Dscripción del estimulo'},
                {
                xtype     : 'htmleditor',
                grow      : true,
                id      : 'message_Estimulos',
                name      : 'message_Estimulos',
                fieldLabel: 'Dscripción',
                hideLabel:true,
                anchor    : '100%',
                height:300
               }
            ],
            buttons: [
                {
                text: 'Guardar',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                handler: function() {
                    var form =this.up('form').getForm();
                    var _selectionModel = Ext.getCmp('Estimulos_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var id =_selected_rcd.data.id;
                    console.log(id);
                    var nombre =_selected_rcd.data.nombre;
                    var causa =_selected_rcd.data.causa;
                    if(id !=''&& id !=null){
                        if (form.isValid()){
                            var mensaje=Ext.getCmp('message_Estimulos').getValue();
                            var fecha=Ext.getCmp('from_date_Ractivación_Estimulos').getValue();
                            var cuadro=Ext.getCmp('Cuadros_Estimulos').getValue();
                            var fnCallBack = function() {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var   _result = App.PerformSyncServerRequest('Estimulos.Estimulos.Add_control',{id:id,cuadro:cuadro,fecha:fecha,mensaje:mensaje});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        form.reset();
                                        Ext.getCmp('Cuadros_Estimulos').focus(true, true);
                                        App.InfoMessage('Información', 'Estimulos otorgado satisfactoriamente');
                                    }
                            }
                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea otorgar el estimulo  al cuadro?');
                        }
                        else{
                        App.InfoMessage('Información', 'Debe llenar tpdps los datos.');
                    }
                    }
                    else  App.InfoMessage('Información', 'Debe asignar un estimulo a el cuadro');
                }
            },
                {
                    text: 'Cancelar',
                    handler: function() {
                        this.up('form').getForm().reset();
                    }
                }
            ]
        });
        var _panel = new Ext.Panel({
            title: 'Gestionar Estímulos',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [
                    _grid,
                    panel_datos
                   ],
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
App.RegisterModule('Estimulos', new Estimulos());
