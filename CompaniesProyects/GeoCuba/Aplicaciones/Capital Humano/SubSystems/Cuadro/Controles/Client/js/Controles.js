function Controles(){
    this.__data_store = null;
    this.Init = function(){
            var _menu_item_config_Controles =
        {
            text: 'Controles',
            id: 'Controles_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Gestion de Cuadros',_menu_item_config_Controles);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj){
        this.__data_store = App.BuildJsonStore('Controles.Controles.CargarDatos',{
            fields: [
            {name: 'id'},
            {name: 'nombre'},
            {name: 'fecha'},
            {name: 'jecutor'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        this.__data_store_cuadros = App.BuildJsonStore('Controles.Controles.CargarDatoscuadros',{
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
            id: 'Controles_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            layout: 'anchor',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [
                {header: 'Fecha',menuDisabled: true,sortable : false,dataIndex: 'fecha',flex: 1},
                {header: 'Nombre',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 5},
                {header: 'Ejecutor',menuDisabled: true,sortable : false,dataIndex: 'ejecutor',flex: 3}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Controles_tbar_id',
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
                            this.Disable('ControlesGestionar');
                        }
                        else
                        {
                          this.Enable('ControlesGestionar');
                        }

                    },
                    scope: this
                }
            }
        });
        var cuadro =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Cuadros',
            name: 'Cuadros',
            id: 'Cuadros',
            store:this.__data_store_cuadros,
            queryMode: 'local',
            displayField: 'nombre',
            valueField: 'id'
        });
        var panel_datos=Ext.create('Ext.form.Panel', {
            title: 'Control de cuadros',
            bodyPadding: 5,
            width: 350,
            //collapsed:true,
            collapsible:true,
            url: 'save-form.php',
            layout: 'anchor',
            id:'cuadros_form',
            name:'cuadros_form',
            region: 'east',
            defaults: {anchor: '100%'},
           // defaultType: 'textfield',
            items: [cuadro,{
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: 'Fecha de Ractivación',
                name: 'from_date_Ractivación',
                emptyText:false,
                id: 'from_date_Ractivación',
                maxValue: new Date()  // limited to the current date or prior
                 },
                {html:'Medida resultantes del control'},
                {
                xtype     : 'htmleditor',
                emptyText:false,
                grow      : true,
                id      : 'message',
                name      : 'message',
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
                    var _selectionModel = Ext.getCmp('Controles_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var id =_selected_rcd.data.id;
                    var nombre =_selected_rcd.data.nombre;
                    if (form.isValid() && id !='') {
                        var mensaje=Ext.getCmp('message').getValue();
                        var fecha=Ext.getCmp('from_date_Ractivación').getValue();
                        var cuadro=Ext.getCmp('Cuadros').getValue();
                        if (fecha==""||fecha==null||cuadro==""||cuadro==null||mensaje==""||mensaje==null){
                            App.InfoMessage('Información', 'Llene los datos correctamente');
                        }else{
                        var fnCallBack = function() {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var   _result = App.PerformSyncServerRequest('Controles.Controles.Add_control',{id:id,cuadro:cuadro,fecha:fecha,mensaje:mensaje});
                            App.HideMsgBox();

                            if(_result)
                            {
                                form.reset();
                                Ext.getCmp('message').focus(true, true);
                                App.InfoMessage('Información', 'Controles adicionado satisfactoriamente');
                            }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea evaluar al cuadro en este control:<br><b>'+nombre+'</b>?');
                    }
                    }
                    else {
                        App.InfoMessage('Información', 'Llene los datos correctamente');
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
            title: 'Gestionar Controles',
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
    this.Free = function(){
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function(){
        App.ShowMainPanel(null);
    }
    // ========================================================================//
}
App.RegisterModule('Controles', new Controles());