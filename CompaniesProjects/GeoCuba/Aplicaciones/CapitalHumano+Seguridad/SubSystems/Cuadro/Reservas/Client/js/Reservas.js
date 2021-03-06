function Reservas(){
    this.__data_store = null;
    this.Init = function()
    {
            var _menu_item_config_Reservas =
        {
            text: 'Reservas',
            id: 'Reservas_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestion de Cuadros',_menu_item_config_Reservas);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Reservas.Reservas.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'cargo'},
            {name: 'nivel'},
            {name: 'reserva_activa'},
            {name: 'niveles_reserv_id'},
            {name: 'ractiva',type:'booleam'},
            {name: 'resrva'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        this.__data_store_niveles = App.BuildJsonStore('Reservas.Reservas.niveles',{
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
        this.__data_store_cuadros = App.BuildJsonStore('Reservas.Reservas.CargarDatoscuadros',{
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
            id: 'Reservas_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            layout: 'anchor',
            region: 'center',
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Nombre de Reserva',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 3},
                {header: 'Cargo',menuDisabled: true,sortable : false,dataIndex: 'cargo',flex: 3},
                {header: 'Nivel',menuDisabled: true,sortable : false,flex: 1,dataIndex: 'nivel',
                    editor: new Ext.form.field.ComboBox({
                        triggerAction: 'all',
                        queryMode:'local',
                        store: this.__data_store_niveles,
                        displayField: 'nombre',
                        valueField: 'id'
                    })
                },
                {header: 'Activo',menuDisabled: true,sortable : false,dataIndex: 'ractiva',width:'50px',renderer:activo}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Reservas_tbar_id',
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
                            this.Disable('ReservasGestionar');
                        }
                        else
                        {
                          this.Enable('ReservasGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var cuadro =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Cuadros',
            name: 'Cuadros_Reservas',
            id: 'Cuadros_Reservas',
            store:this.__data_store_cuadros,
            queryMode: 'local',
            displayField: 'nombre',
            valueField: 'id'
        });
        var panel_datos=Ext.create('Ext.form.Panel', {
            title: 'Otorgar Reservas ',
            bodyPadding: 5,
            width: 350,
            url: 'save-form.php',
           // collapsed:true,
            collapsible:true,
            layout: 'anchor',
            id:'cuadros_form_Reservas',
            name:'cuadros_form_Reservas',
            region: 'east',
            defaults: {anchor: '100%'},
           // defaultType: 'textfield',
            items: [cuadro,{
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: 'Fecha de entrega',
                name: 'from_date_Ractivación_Reservas',
                id: 'from_date_Ractivación_Reservas',
                maxValue: new Date()  // limited to the current date or prior
                 },
                {html:'Dscripción del estimulo'},
                {
                xtype     : 'htmleditor',
                grow      : true,
                id      : 'message_Reservas',
                name      : 'message_Reservas',
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
                    var _selectionModel = Ext.getCmp('Reservas_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var id =_selected_rcd.data.id;
                    if (form.isValid() && id !='') {
                        var mensaje=Ext.getCmp('message_Reservas').getValue();
                        var fecha=Ext.getCmp('from_date_Ractivación_Reservas').getValue();
                        var cuadro=Ext.getCmp('Cuadros_Reservas').getValue();
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var   _result = App.PerformSyncServerRequest('Reservas.Reservas.Add_control',{id:id,cuadro:cuadro,fecha:fecha,mensaje:mensaje});
                            App.HideMsgBox();
                            if(_result)
                            {
                                form.reset();
                                Ext.getCmp('Cuadros_Reservas').focus(true, true);
                                App.InfoMessage('Información', 'Reservas adicionado satisfactoriamente');
                            }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea guardar los datos?');
                    }
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
            title: 'Gestionar Reservas',
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
App.RegisterModule('Reservas', new Reservas());

function activo(val2,met,record){
    var ractiva = record.data.ractiva;
    console.log(ractiva);
    var cat;
    if(ractiva=='true'){cat = met.tdCls = 'news_unsubscribe16';}
    else{cat = met.tdCls = 'news_subscribe16';}
}