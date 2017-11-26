function OrganigramaGestionar()
{
    this.Render = function(Panel){
    }

    this.Enable = function(){
    }
    this.Disable = function(){
    }
}
App.RegisterFunction('OrganigramaGestionar', new OrganigramaGestionar());
Organigrama.prototype.winaddOrganigrama = function(id,nombre_completo,idTra,dirir,cargoid,contrato_id,id_elem){
console.log(id_elem);
         var me= this;
        this._store_combo= App.BuildJsonStore('Organigrama.Organigrama.CargarAnnos',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_Trabajador= App.BuildJsonStore('Organigrama.Organigrama.Cargarcontratos',{
                fields: [
                    {name: 'nombre'},
                    {name: 'nombre_completo'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_areas= App.BuildJsonStore('Organigrama.Organigrama.area',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_preparacion= App.BuildJsonStore('Organigrama.Organigrama.Cargarniveles',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_preparacion_CargarFpago= App.BuildJsonStore('Organigrama.Organigrama.CargarFpago',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_preparacion_CargarSpago= App.BuildJsonStore('Organigrama.Organigrama.CargarSpago',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_preparacion_CargarHtrabajo= App.BuildJsonStore('Organigrama.Organigrama.CargarHtrabajo',{
                fields: [
                    {name: 'tipo'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this._store_combo_agencias= App.BuildJsonStore('Organigrama.Organigrama.CargarAgencia',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });

    this.paneladdOrganigrama = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'paneladdOrganigrama',
            name:'paneladdOrganigrama',
            defaults: {anchor: '100%',labelWidth:150},
                    items: [
                        {
                        xtype:'combobox',
                        name:'combo_value_id',
                        id:'combo_value_id',
                        fieldLabel: 'Contrato',
                        store: this._store_combo,
                        displayField:'nombre',
                        valueField: 'id',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        emptyText:'Select a state...',
                        selectOnFocus:true,
                        editable:false,
                        allowBlank: false

                    },
                        {
                            xtype: 'textfield',
                            hideLabel: true,
                            flex: 1,
                            id:'id',name:'id',
                            hidden:true,
                            value:id
                        },
                        {
                            xtype: 'textfield',
                            hideLabel: true,
                            flex: 1,
                            id:'dirir',name:'dirir',
                            hidden:true,
                            value:dirir
                        },
                        {
                            xtype: 'textfield',
                            hideLabel: true,
                            flex: 1,
                            id:'contrato_id',
                            name:'contrato_id',
                            hidden:true,
                            value:contrato_id
                        },
                        {
                            xtype: 'textfield',
                            hideLabel: true,
                            flex: 1,
                            id:'cargoid',name:'cargoid',
                            hidden:true,
                            value:cargoid
                        },
                        {
                            xtype: 'textfield',
                            hideLabel: true,
                            flex: 1,
                            id:'idTra',name:'idTra',
                            hidden:true,
                            value:idTra
                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_value_id_agencias',
                            id: 'combo_value_id_agencias',
                            fieldLabel: 'Agencia',
                            store: this._store_combo_agencias,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Seleccionar por Agencia',
                            selectOnFocus: true,
                            editable: true,
                            listeners: {
                                change:function(){
                                    var value = Ext.getCmp('combo_value_id_agencias').getValue() ;
                                    var result = App.PerformSyncServerRequest('Organigrama.Organigrama.CargarAreas_A',{value:value});
                                    this._store_combo_areas.loadData(result.rows);
                                    Ext.getCmp('combo_nivel_value_id_area').enable();

                                },scope:this
                            }
                        },
                        {
                            xtype:'combobox',
                            name:'combo_nivel_value_area',
                            id:'combo_nivel_value_id_area',
                            fieldLabel: '&Aacute;reas',
                            store: this._store_combo_areas,
                            displayField:'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText:'Seleccione...',
                            selectOnFocus:true,
                            editable:false,
                            disabled:true,
                            allowBlank: false,
                            listeners:{
                                change:function(){
                                    Ext.getCmp('combo_nivel_value').store.clearData();
                                    var value = Ext.getCmp('combo_nivel_value_id_area').getValue() ;
                                    var resultUnidad = App.PerformSyncServerRequest('Organigrama.Organigrama.CargarAreasxCargo',{value:value});
                                    Ext.getCmp('combo_nivel_value').store.loadData(resultUnidad.rows);
                                    Ext.getCmp('combo_nivel_value').enable();
                                    Ext.getCmp('combo_Sistema_value_id').enable();
                                    Ext.getCmp('combo_Forma_value').enable();
                                    Ext.getCmp('combo_Horario_value_id').enable();
                                    Ext.getCmp('fecha_inicio').enable();
                                    Ext.getCmp('fecha_fin').enable();


                                },scope:this

                            }
                        },
                        {
                            xtype:'combobox',
                            name:'combo_nivel_value',
                            id:'combo_nivel_value',
                            fieldLabel: 'Tipo de Cargo',
                            store: this._store_combo_preparacion,
                            displayField:'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText:'Seleccione...',
                            selectOnFocus:true,
                            editable:false,
                            disabled:true,
                            allowBlank: false
                        },
                        {
                            xtype:'combobox',
                            name:'combo_Sistema_value',
                            id:'combo_Sistema_value_id',
                            fieldLabel: 'Sistema de Pago',
                            store: this._store_combo_preparacion_CargarSpago,
                            displayField:'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText:'Seleccione...',
                            selectOnFocus:true,
                            editable:false,
                            disabled:true,
                            allowBlank: false
                        },
                        {
                            xtype:'combobox',
                            name:'combo_Forma_value',
                            id:'combo_Forma_value',
                            fieldLabel: 'Forma de pago',
                            store: this._store_combo_preparacion_CargarFpago,
                            displayField:'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText:'Seleccione...',
                            selectOnFocus:true,
                            editable:false,
                            disabled:true,
                            allowBlank: false
                        },
                        {
                            xtype:'combobox',
                            name:'combo_Horario_value',
                            id:'combo_Horario_value_id',
                            fieldLabel: 'Horario de trabajo',
                            store: this._store_combo_preparacion_CargarHtrabajo,
                            displayField:'tipo',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText:'Seleccione...',
                            selectOnFocus:true,
                            editable:false,
                            disabled:true,
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha de inicio',
                            name: 'fecha_inicio',
                            id: 'fecha_inicio',
                            allowBlank: false,
                            editable: false,
                            disabled:true

                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha de Fin',
                            name: 'fecha_fin',
                            id: 'fecha_fin',
                            allowBlank: true,
                            disabled:true,
                            editable: false

                        },
                        {   xtype:'checkbox',
                            boxLabel  : 'Solo Modificar Responsabilidad',
                            label:'kjfndk',
                            id:'respon',
                            hideLabel:true,
                            labelWidth:300,
                            name      : 'respon',
                            inputValue: '1',
                            listeners:{
                                change:function(This,value){
                                    if (value==true)
                                    {
                                        var dir=Ext.getCmp('dirir').getValue();
                                        var id=Ext.getCmp('id').getValue();

                                      var fnCallBack = function() {
                                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                          var _result = App.PerformSyncServerRequest('Organigrama.Organigrama.Responsabilidad',{respon:value,dirir:dir,id:id});
                                          Ext.getCmp('Organigrama_win_id').close();
                                          App.HideMsgBox();
                                            if(_result)
                                            {
                                                me.__data_store.load();
                                                App.InfoMessage('Informaci&oacute;n', 'Se ha guardado corretamente');
                                            }
                                            else {
                                                me.__data_store.load();
                                                App.InfoMessage('Informaci&oacute;n', 'Se ha producido un error');
                                            }
                                        }
                                        App.ConfirmMessage(fnCallBack, '¿Est&aacute; seguro que desea modificar la responsabilidad?');


                                    }
                            }}
                        }
            ]
        });

        var _gst_winaddOrganigrama = new Ext.Window({
                title:'Modificar Contrato y/o Responsabilidad de: <b>'+ nombre_completo +'</b>',
                id: 'Organigrama_win_id',
                name: 'Organigrama_win_id',
                height: 430,
                width: 460,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.paneladdOrganigrama],
                buttons: [
                          {
                    text: 'Aceptar',cls:'btn btn-primary',
                    handler: function(){
                        if (Ext.getCmp('paneladdOrganigrama').getForm().isValid())
                        {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('Organigrama.Organigrama.Add',this.paneladdOrganigrama.getForm().getValues());

                            App.HideMsgBox();
                            if(_result)
                            {
                                Ext.getCmp('paneladdOrganigrama').getForm().reset();

                                App.InfoMessage('Información', 'Organigrama adicionada satisfactoriamente');
                            }
                        }


                    },
                    scope: this
                },
                          {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_winaddOrganigrama.close();
                        console.log(id_elem);
                        if(id_elem != null)
                            Ext.getCmp(id_elem).store.load();
                        else
                            Ext.getCmp('Organigrama_general').store.load();
                    },
                    scope: this
                }
                        ],
                listeners: {
                    'show': function(This, eOpts) {
                        this._store_combo.load();
                        this._store_combo_Trabajador.load();
                        this._store_combo_areas.load();
                        this._store_combo_preparacion.load();

                    }, scope: this
                }
            });
        _gst_winaddOrganigrama.show();
}


