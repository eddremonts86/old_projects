function CargoGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Cargo_btn_id',
            tooltip : 'Elimina el Cargo seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Cargo_btn_id',
            tooltip : 'Modifica el Cargo seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.cardUpdate, this.Owner, ['upd'])
        });
        this.fkl = Ext.create('Ext.Button', {
            text: 'Adicionar',
            id: 'add_Cargo_btn_id',
            tooltip : 'Adiciona un nuevo Cargo',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.card, this.Owner, ['add'])
        });
        var tbar = Ext.getCmp('Cargo_tbar_id');
        tbar.add(this.fkl);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
    }
    this.Enable = function(){
        this._btn_mod.enable();
        this._btn_del.enable();
    }
    this.Disable = function(){
        this._btn_mod.disable();
        this._btn_del.disable();
    }
}
App.RegisterFunction('CargoGestionar', new CargoGestionar());
Cargo.prototype.card=function(_paccion){
    this._store_combo= App.BuildJsonStore('Cargo.Cargo.CargarAnnos',{
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
    this._store_combo_contrato= App.BuildJsonStore('Cargo.Cargo.Cargarcontratos',{
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
    this._store_combo_preparacion= App.BuildJsonStore('Cargo.Cargo.Cargarniveles',{
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
    this._store_combo_clasificacion= App.BuildJsonStore('Cargo.Cargo.Cargarclasif',{
            fields: [
                {name: 'noambre'},
                {name: 'id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
        });
    this._store_combo_escala= App.BuildJsonStore('Cargo.Cargo.Cargarescala',{
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

    var __data_store_Equip = App.BuildJsonStore('Cargo.Cargo.CargarRiesgos',{
        fields: [
            {type: 'string',name: 'nombre_riesgo'},{type: 'string',name: 'id'},
        ],
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'rows',
                totalProperty: 'results'
            }
        },
        autoLoad: true
    });
    var __data_store_Equip2 = App.BuildJsonStore('Cargo.Cargo.CargarRiesgos',{
        fields: [{type: 'string',name: 'id'},{type: 'string',name: 'nombre_riesgo'}],
        proxy: {
            type: 'ajax',
            reader: {

            }
        },
        autoLoad: false
    });

    this.paneladdcargo1 = Ext.create('Ext.panel.Panel', {
        bodyPadding: 5,
        width: '100%',
        id:'panel1',
        name:'panel1',
        layout: 'column',
        defaults:{allowBlank: false},
        items: [
            {
                columnWidth: 0.5,
                items: [
                    {xtype: 'hidden'},
                    {
                        xtype:'textfield',
                        fieldLabel: 'Nombre',
                        name: 'nombre_id',
                        id:'nombre_id',
                        labelWidth: 140,
                        allowBlank: false,
                        maxLength: 255,
                        maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
                    },
                    {
                        xtype:'combobox',
                        name:'combo_value_id',
                        id:'combo_value_id',
                        fieldLabel: 'Norma Jurídica',
                        labelWidth: 140,
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
                        xtype:'combobox',
                        name:'combo_contrato_value_id',
                        id:'combo_contrato_value_id',
                        fieldLabel: 'Categoría Ocupacional',
                        labelWidth: 140,
                        store: this._store_combo_contrato,
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
                        xtype:'combobox',
                        name:'combo_nivel_value_id',
                        id:'combo_nivel_value_id',
                        fieldLabel: 'Nivel de Preparación',
                        labelWidth: 140,
                        store: this._store_combo_preparacion,
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
                        xtype:'combobox',
                        name:'combo_clasif_value_id',
                        id:'combo_clasif_value_id',
                        fieldLabel: 'Clasificación',
                        labelWidth: 140,
                        store: this._store_combo_clasificacion,
                        displayField:'noambre',
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
                        xtype:'combobox',
                        name:'combo_escala_value_id',
                        id:'combo_escala_value_id',
                        fieldLabel: 'Grupo Escala',
                        labelWidth: 140,
                        store: this._store_combo_escala,
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

                    }
                ]},
            {
                columnWidth: 0.5,
                items: [
                    {xtype: 'hidden'},
                    {
                        xtype:'textfield',
                        fieldLabel: 'CIES',
                        name: 'cies',
                        id:'cies',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255, maskRe: /[0-9]/

                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'CLA',
                        name: 'cla',
                        id:'cla',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255, maskRe: /[0-9]/

                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'T&eacute;cnico',
                        name: 'tec',
                        id:'tec',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255,
                        maskRe: /[0-9]/
                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'Otros',
                        name: 'otros',
                        id:'otros',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255,
                        maskRe: /[0-9]/
                    }
                ]}


        ]
    });

    var navigate = function(panel, direction){
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        if (!layout.getNext()){Ext.getCmp('move-next').setVisible(false);}
        else{Ext.getCmp('move-next').setVisible(true);}
        Ext.getCmp('Finalizar').setVisible(!layout.getNext());
    };

    var _grid = new Ext.grid.GridPanel({
        id : 'recursos_grid_id',
        title: 'Riesgos del Cargo.',
        height : 190,
        width : '100%',
        frame: true,
        store : __data_store_Equip,
        //                        disabled:modificable,
        selType: 'rowmodel',
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'firstGridDDGroup',
                dropGroup: 'secondGridDDGroup'
            }
        },
        columns : [
            {
                header: 'Riesgo',
                dataIndex: 'nombre_riesgo',
                flex: 30
            }
        ],
        listeners:{
            itemdblclick: function(This,record){
                __data_store_Equip2.add(record.data);
                __data_store_Equip.remove(record);
            }
        },
        stripeRows: true
    });

    var _grid2 = new Ext.grid.GridPanel({
        id : 'store_grid_id',
        height : 190,
        width : '100%',
        frame: true,
        store : __data_store_Equip2,
        selType: 'rowmodel',
        columns : [
            {
                header: 'Riesgo',
                dataIndex: 'nombre_riesgo',
                flex: 30
            }
        ],
        title:'&nbsp',
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'secondGridDDGroup',
                dropGroup: 'firstGridDDGroup'
            }
        },
        listeners:{
            itemdblclick: function(This,record){
                __data_store_Equip.add(record.data);
                __data_store_Equip2.remove(record);
            }
        },
        stripeRows: true
    });

    var _panel2 = new Ext.Panel({
            border : false,
            frame : true,
            layout : 'column',
            height : 190,
            width : '100%',
            items:[{
                columnWidth:.5,
                items:[_grid],
                frame:true,
                style: {
                    border:'0px'
                }
            },{
                items:[_grid2],
                columnWidth:.5,
                frame:true,
                style: {
                    height: '100px !important',
                    border:'0px'
                }
            }
            ]
        });

    this.paneladdcargo=  Ext.create('Ext.form.Panel', {
        height:'100%',width:'100%',
        layout: 'card',
        id:'panel',
        name:'panel',
        bodyStyle: 'padding:15px',
        defaults: {
            border: false
        },
//        bbar: [
//            {
//                id: 'move-prev',
//                text: 'Anterior',
//                handler: function(btn) {
//                    navigate(btn.up("panel"), "prev");
//                },
//                disabled: true
//            },
//            '->',
//            {
//                id: 'move-next',
//                text: 'Siguiente',
//                handler: function(btn) {
//                    navigate(btn.up("panel"), "next");
//                }
//            },
//            {
//                id: 'Finalizar',
//                text: 'Finalizar',
//                hidden:true,
//                formBind: true,
//                handler: Ext.Function.bind(this.Add, this, [_paccion]),
//                scope: this
//            }
//        ],
        items: [
            {
                id: 'card-0',
                items: [this.paneladdcargo1]
            },
            {
                id: 'card-1',
                items: {xtype: 'htmleditor',height:350,width:'100%',id:'Responsabilidad',name:'Responsabilidad',value:'<h3>Responsabilidad del Cargo</h3>'}
            },
            {
                id: 'card-2',
                items:{xtype: 'htmleditor',height:350,width:'100%',id:'Autoridad',name:'Autoridad',value:'<h3>Autoridad del Cargo</h3>'}
            },
            {
                id: 'card-3',
                items:{xtype: 'htmleditor',height:350,width:'100%',id:'Especiales',name:'Especiales',value:'<h3>Funciones Especiales del Cargo</h3>'}
            },
            {
                id: 'card-4',
                items: {xtype: 'htmleditor',height:350,width:'100%',id:'Competencia',name:'Competencia',value:'<h3>Competencia del Cargo</h3>'}
            },
            {
                id: 'card-5',
                items: {xtype: 'htmleditor',height:350,width:'100%',id:'Condiciones',name:'Condiciones',value:'<h3>Condiciones  de trabajo del Cargo</h3>'}
            },
            {
                id: 'card-6',
                items: {xtype: 'htmleditor',height:350,width:'100%',id:'Equipos',name:'Equipos',value:'<h3>Equipos, &Uacute;tiles y Herramientas utilizadas</h3>'}
            },
            {
                id: 'card-7',
                items:{xtype: 'htmleditor',height:350,width:'100%',id:'Requisitos',name:'Requisitos',value:'<h3>Requisitos F&iacute;sicos</h3>'}
            },
            {
                id: 'card-8',
                items:{xtype: 'htmleditor',height:350,width:'100%',id:'Esperiencia',name:'Esperiencia',value:'<h3>Experiencia Profesional</h3>'}
            },
            {
                id: 'card-9',
                items:[{xtype: 'htmleditor',height:350,width:'100%',id:'Impacto',name:'Impacto',value:'<h3>Impacto Medio Ambiental</h3>'}]
            },
            {
                id: 'card-10',
                items:[_panel2]
                    //{xtype: 'htmleditor',height:350,width:'100%',id:'riesgos',name:'riesgos',value:'<h3>Riesgos del cargo</h3>'}
            }
        ]
    });
    Ext.create('Ext.window.Window', {
        title: 'Adicionar Cargo',
        height:'68%',
        id:'addCargo',
        modal:true,
        width:'50%',
        layout: 'fit',
        items: this.paneladdcargo,
        listeners: {
            'show': function(This, eOpts) {
                Ext.getCmp('nombre_id').focus(true, true);
                this._store_combo.load();
                this._store_combo_contrato.load();
                this._store_combo_preparacion.load();
                this._store_combo_clasificacion.load();
                this._store_combo_escala.load();
            }, scope: this
        },
        buttons:[{
                    id: 'move-prev',
                    text: 'Anterior',
                    handler: function(btn) {
                        navigate(Ext.getCmp('panel'), "prev");
                    },
                    disabled: true
                },
                '->',
                {
                    id: 'move-next',
                    text: 'Siguiente',
                    handler: function(btn) {
                        navigate(Ext.getCmp('panel'), "next");
                    }
                },
                {
                    id: 'Finalizar',
                    text: 'Finalizar',
                    hidden:true,
                    formBind: true,
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }]
    }).show();
}
Cargo.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var form_values = this.paneladdcargo.getForm().getValues();
        var _selection = Ext.getCmp('store_grid_id').store.data.items;
        var _array = '';
        for (var i = 0; i < _selection.length; i++)
        {
            _array += _selection[i].data.id+';';
        }
        form_values.riesgos = _array;
        var   _result = App.PerformSyncServerRequest('Cargo.Cargo.Add',form_values);
        this.__data_store_car.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store_car.load();
            App.InfoMessage('Información', 'Cargo adicionado satisfactoriamente');
            Ext.getCmp('addCargo').close();
        }
    }
}
Cargo.prototype.cardUpdate=function(_paccion){
    var _selectionModel = Ext.getCmp('Cargo_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    console.log(_selected_rcd);
    var _value_nom = null;
    this._store_combo= App.BuildJsonStore('Cargo.Cargo.CargarAnnos',{
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
    this._store_combo_contrato= App.BuildJsonStore('Cargo.Cargo.Cargarcontratos',{
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
    this._store_combo_preparacion= App.BuildJsonStore('Cargo.Cargo.Cargarniveles',{
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
    this._store_combo_clasificacion= App.BuildJsonStore('Cargo.Cargo.Cargarclasif',{
            fields: [
                {name: 'noambre'},
                {name: 'id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
    this._store_combo_escala= App.BuildJsonStore('Cargo.Cargo.Cargarescala',{
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

    var __data_store_Equip = App.BuildJsonStore('Cargo.Cargo.CargarRiesgos',{
        fields: [
            {type: 'string',name: 'nombre_riesgo'},{type: 'string',name: 'id'},
        ],
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'rows',
                totalProperty: 'results'
            }
        },
        autoLoad: false
    });
    var __data_store_Equip2 = App.BuildJsonStore('Cargo.Cargo.CargarRiesgosExistente',{
        fields: [{type: 'string',name: 'id'},{type: 'string',name: 'nombre_riesgo'}],
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json',
                root: 'rows',
                totalProperty: 'results'
            }
        },
        autoLoad: false
    });
    __data_store_Equip.load({params:{id:_selected_rcd.data.id}});
    __data_store_Equip2.load({params:{id:_selected_rcd.data.id}});

    var _grid = new Ext.grid.GridPanel({
        id : 'recursos_grid_id',
        title: 'Riesgos del Cargo.',
        height : 190,
        width : '100%',
        frame: true,
        store : __data_store_Equip,
        //                        disabled:modificable,
        selType: 'rowmodel',
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'firstGridDDGroup',
                dropGroup: 'secondGridDDGroup'
            }
        },
        columns : [
            {
                header: 'Riesgo',
                dataIndex: 'nombre_riesgo',
                flex: 30
            }
        ],
        listeners:{
            itemdblclick: function(This,record){
                __data_store_Equip2.add(record.data);
                __data_store_Equip.remove(record);
            }
        },
        stripeRows: true
    });

    var _grid2 = new Ext.grid.GridPanel({
        id : 'store_grid_id',
        height : 190,
        width : '100%',
        frame: true,
        store : __data_store_Equip2,
        selType: 'rowmodel',
        columns : [
            {
                header: 'Riesgo',
                dataIndex: 'nombre_riesgo',
                flex: 30
            }
        ],
        title:'&nbsp',
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'secondGridDDGroup',
                dropGroup: 'firstGridDDGroup'
            }
        },
        listeners:{
            itemdblclick: function(This,record){
                __data_store_Equip.add(record.data);
                __data_store_Equip2.remove(record);
            }
        },
        stripeRows: true
    });

    var _panel2 = new Ext.Panel({
        border : false,
        frame : true,
        layout : 'column',
        height : 190,
        width : '100%',
        items:[{
            columnWidth:.5,
            items:[_grid],
            frame:true,
            style: {
                border:'0px'
            }
        },{
            items:[_grid2],
            columnWidth:.5,
            frame:true,
            style: {
                height: '100px !important',
                border:'0px'
            }
        }
        ]
    });

    this.paneladdcargo1 = Ext.create('Ext.panel.Panel', {
        bodyPadding: 5,
        width: '100%',
        layout: 'column',
        id:'panel1',
        name:'panel1',
        defaults: {
            anchor: '100%'
        },
        items: [
            {columnWidth: 0.5,
                items: [
                    {xtype: 'hidden'},
                    {
                        xtype:'textfield',
                        fieldLabel: 'Nombre',
                        name: 'nombre_id',
                        id:'nombre_id',
                        labelWidth: 140,
                        allowBlank: false,
                        maxLength: 255,
                        maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/,
                        value:_selected_rcd.data.nombre
                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'id',
                        name: 'id',
                        id:'id',
                        labelWidth: 140,
                        allowBlank: false,
                        maxLength: 255,
                        value:_selected_rcd.data.id,
                        hidden:true
                    },
                    {
                        xtype:'combobox',
                        name:'combo_value_id',
                        id:'combo_value_id',
                        fieldLabel: 'Norma Jurídica',
                        labelWidth: 140,
                        store: this._store_combo,
                        displayField:'nombre',
                        valueField: 'id',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        emptyText:'Seleccione...',
                        selectOnFocus:true,
                        editable:false,
                        allowBlank: false,
                        value:_selected_rcd.data.id_norma_juridica

                    },
                    {
                        xtype:'combobox',
                        name:'combo_contrato_value_id',
                        id:'combo_contrato_value_id',
                        fieldLabel: 'Categoría Ocupacional',
                        labelWidth: 140,
                        store: this._store_combo_contrato,
                        displayField:'nombre',
                        valueField: 'id',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        emptyText:'Seleccione...',
                        selectOnFocus:true,
                        editable:false,
                        allowBlank: false,
                        value:_selected_rcd.data.id_categoria_ocupacional

                    },
                    {
                        xtype:'combobox',
                        name:'combo_nivel_value_id',
                        id:'combo_nivel_value_id',
                        fieldLabel: 'Nivel de Preparación',
                        labelWidth: 140,
                        store: this._store_combo_preparacion,
                        displayField:'nombre',
                        valueField: 'id',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        emptyText:'Select a state...',
                        selectOnFocus:true,
                        editable:false,
                        allowBlank: false,
                        value:_selected_rcd.data.id_nivel_preparacion

                    },
                    {
                        xtype:'combobox',
                        name:'combo_clasif_value_id',
                        id:'combo_clasif_value_id',
                        fieldLabel: 'Clasificación',
                        labelWidth: 140,
                        store: this._store_combo_clasificacion,
                        displayField:'noambre',
                        valueField: 'id',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        emptyText:'Select a state...',
                        selectOnFocus:true,
                        editable:false,
                        allowBlank: false,
                        value:_selected_rcd.data.id_clasificacion

                    },
                    {
                        xtype:'combobox',
                        name:'combo_escala_value_id',
                        id:'combo_escala_value_id',
                        fieldLabel: 'Grupo Escala',
                        labelWidth: 140,
                        store: this._store_combo_escala,
                        displayField:'nombre',
                        valueField: 'id',
                        typeAhead: true,
                        queryMode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        emptyText:'Seleccione...',
                        selectOnFocus:true,
                        editable:false,
                        allowBlank: false,
                        value:_selected_rcd.data.id_escala

                    }
                ]},

            {
                columnWidth: 0.5,
                items: [
                    {xtype: 'hidden'},
                    {
                        xtype:'textfield',
                        fieldLabel: 'CIES',
                        name: 'cies',
                        id:'cies',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255, maskRe: /[0-9]/,
                        value:_selected_rcd.data.cies

                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'CLA',
                        name: 'cla',
                        id:'cla',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255, maskRe: /[0-9]/,
                        value:_selected_rcd.data.cla

                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'T&eacute;cnico',
                        name: 'tec',
                        id:'tec',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255,
                        maskRe: /[0-9]/,
                        value:_selected_rcd.data.tnc
                    },
                    {
                        xtype:'textfield',
                        fieldLabel: 'Otros',
                        name: 'otros',
                        id:'otros',
                        labelWidth: 70,
                        allowBlank: false,
                        maxLength: 255,
                        maskRe: /[0-9]/,
                        value:_selected_rcd.data.otros
                    }
                ]}
        ]
    });
    this.index;
    var navigate = function(panel, direction){
        var layout = panel.getLayout();
        layout[direction]();
        Ext.getCmp('move-prev').setDisabled(!layout.getPrev());
        if (!layout.getNext()){Ext.getCmp('move-next').setVisible(false);}
        else{Ext.getCmp('move-next').setVisible(true);}
        Ext.getCmp('Finalizar').setVisible(!layout.getNext());

    };
    this.paneladdcargo=  Ext.create('Ext.form.Panel', {
        height:'100%',width:'100%',
        layout: 'card',
        id:'panelupd_cargo',
        name:'panelupd_cargo',
        bodyStyle: 'padding:15px',
        defaults: {border: false},
//        bbar: [
//            {
//                id: 'move-prev',
//                text: 'Anterior',
//                handler: function(btn) {
//                    navigate(btn.up("panel"), "prev");
//                },
//                disabled: true
//            },'->',
//            '->',
//            {
//                id: 'move-next',
//                text: 'Siguiente',
//                handler: function(btn) {
//                    navigate(btn.up("panel"), "next");
//                }
//            },
//            {
//                id: 'Finalizar',
//                text: 'Finalizar',
//                hidden:true,
//                formBind: true,
//                handler: Ext.Function.bind(this.Modid, this, [_paccion]),
//                scope: this
//            }
//        ],
        items: [
            {
                id: 'card-0',
                items: [{ html:'<span class ="label label-info">Inicio</span>'},this.paneladdcargo1]
            },
            {
                id: 'card-1',
                items: [{ html:'<span class ="label label-info">Responsabilidad del cargo</span>'},{xtype: 'htmleditor',height:350,width:'100%',id:'Responsabilidad',name:'Responsabilidad',  value:_selected_rcd.data.responsabilidad}]
            },
            {
                id: 'card-2',
                items:[{ html:'<span class ="label label-info">Autoridad del cargo</span>'},{xtype: 'htmleditor',height:350,width:'100%',id:'Autoridad',name:'Autoridad',  value:_selected_rcd.data.autoidad}]
            },
            {
                id: 'card-3',
                items:[{ html:'<span class ="label label-info">Especiales del cargo</span>'},{xtype: 'htmleditor',height:350,width:'100%',id:'Especiales',name:'Especiales',  value:_selected_rcd.data.funciones}]
            },
            {
                id: 'card-4',
                items: [{ html:'<span class ="label label-info">Competencia del cargo</span>'}, {xtype: 'htmleditor',height:350,width:'100%',id:'Competencia',name:'Competencia',  value:_selected_rcd.data.competencia}]
            },
            {
                id: 'card-5',
                items: [{ html:'<span class ="label label-info">Condiciones de trabajo del cargo</span>'},{xtype: 'htmleditor',height:350,width:'100%',id:'Condiciones',name:'Condiciones',value:_selected_rcd.data.condiciones}]
            },
            {
                id: 'card-6',
                items: [{ html:'<span class ="label label-info">Equipos,Utiles y Herramientas utilizadas por el cargo</span>'},{xtype: 'htmleditor',height:350,width:'100%',id:'Equipos',name:'Equipos',  value:_selected_rcd.data.equi_util_herram}]
            },
            {
                id: 'card-7',
                items:[{ html:'<span class ="label label-info">Requisitos físicos del cargo</span>'},{xtype: 'htmleditor',height:350,width:'100%',id:'Requisitos',name:'Requisitos',value:_selected_rcd.data.requisitos}]
            },
            {
                id: 'card-8',
                items:[{ html:'<span class ="label label-info">Experiencia Profesional Requerida</span>'},
                    {xtype: 'htmleditor',height:350,width:'100%',id:'Esperiencia',name:'Esperiencia',value:_selected_rcd.data.esperiencia}]
            },
            {
                id: 'card-9',
                items:[{ html:'<span class ="label label-info">Impacto Medio Ambientales del cargo</span>'},{xtype: 'htmleditor',height:350,width:'100%',id:'Impacto',name:'Impacto',value:_selected_rcd.data.impacto}]
            },
            {
                id: 'card-10',
                items:[_panel2]
            }
        ]
    });

    Ext.create('Ext.window.Window', {
        title: 'Modificar Cargo',
        height:'70%',
        id:'updCargo',
        modal:true,
        width:'50%',
        layout: 'fit',
        items: this.paneladdcargo,
        listeners: {
            'show': function(This, eOpts) {
                Ext.getCmp('nombre_id').focus(true, true);
                this._store_combo.load();
                this._store_combo_contrato.load();
                this._store_combo_preparacion.load();
                this._store_combo_clasificacion.load();
                this._store_combo_escala.load();
            }, scope: this
        },
        buttons:[
            {
                id: 'move-prev',
                text: 'Anterior',
                handler: function(btn) {
                    navigate(Ext.getCmp('panelupd_cargo'), "prev");
                },
                disabled: true
            },'->',
            '->',
            {
                id: 'move-next',
                text: 'Siguiente',
                handler: function(btn) {
                    navigate(Ext.getCmp('panelupd_cargo'), "next");
                }
            },
            {
                id: 'Finalizar',
                text: 'Finalizar',
                hidden:true,
                formBind: true,
                handler: Ext.Function.bind(this.Modid, this, [_paccion]),
                scope: this
            }
        ]
    }).show();
}
Cargo.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd_cargo').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

        var form_values = this.paneladdcargo.getForm().getValues();
        var _selection = Ext.getCmp('store_grid_id').store.data.items;
        var _array = '';
        for (var i = 0; i < _selection.length; i++)
        {
            _array += _selection[i].data.id+';';
        }
        form_values.riesgos = _array;

        var  _result = App.PerformSyncServerRequest('Cargo.Cargo.Modif',form_values);
        this.__data_store_car.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('updCargo').close();
            //_selectionModel.deselect(_selected_rcd);
            this.__data_store_car.load();
            App.InfoMessage('Información', 'Cargo modificado satisfactoriamente');
        }
    }
}
Cargo.prototype.deltectnc=function(_paccion){

    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Cargo_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Cargo.Cargo.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('Cargo_grid_id').store.load();
            App.InfoMessage('Información', 'Cargo eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Cargo?');


}
