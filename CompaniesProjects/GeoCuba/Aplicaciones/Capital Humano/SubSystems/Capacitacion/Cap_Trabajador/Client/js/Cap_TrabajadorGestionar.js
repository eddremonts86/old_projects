function Cap_TrabajadorGestionar() {
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this._btn_uin = null;
    var es =
    this.__data_storeResult=null;
    this.Render = function (Panel) {
        this._btn_add = Ext.create('Ext.Button', {
            text: 'Adicionar',
            id: 'add_Cap_Trabajador_btn_id',
            tooltip: 'Nueva Capacitaci&oacute;n',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddCap_Trabajador, this.Owner, ['add'])
        });
        this._btn_uin = Ext.create('Ext.Button', {
            text: 'Usuarios Inactivos',
            id: 'uin_Cap_Trabajador_btn_id',
            tooltip: 'Listar Usuarios Inactivos',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.uinCap_Trabajador, this.Owner, ['uin'])
        });
        this._btn_del = Ext.create('Ext.Button', {
            text: 'Eliminar',
            id: 'del_Cap_Trabajador_btn_id',
            tooltip: 'Elimina el CapTrabajador seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner, ['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar información',
            id: 'mod_Cap_Trabajador_btn_id',
            tooltip: 'Editar la  Capa   citaci&oacute;n del Trabajador seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdCap_Trabajador, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Cap_Trabajador_cursos_tbar_id');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_cap_cap',
            id:'searchField_cap_cap',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
                change:function(){
                   console.log(Ext.getCmp('Cap_Trabajador_grid_id').store);
                   Ext.getCmp('Cap_Trabajador_grid_id').store.clearFilter();
                   Ext.getCmp('Cap_Trabajador_grid_id').store.filter("nombre", Ext.getCmp('searchField_cap_cap').getValue());
                },scope:this
            }
        });
    }
    this.Enable = function () {
        this._btn_mod.enable();
        this._btn_del.enable();
    }
    this.Disable = function () {
        this._btn_mod.disable();
        this._btn_del.disable();
    }
}
App.RegisterFunction('Cap_TrabajadorGestionar', new Cap_TrabajadorGestionar());
this.panel = null;
this.panelupd = null;
this._store_combo_upd = null;
var valu = null;
Cap_Trabajador.prototype.winupdCap_Trabajador = function (_paccion) {

    var _value_nom = null;
    var _selectionModel = Ext.getCmp('Cap_Trabajador_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();

    var id = _selected_rcd.data.id_trabj;
    var nombre = _selected_rcd.data.nombre;
    var esperiencia = _selected_rcd.data.esperiencia;
    var eventos = _selected_rcd.data.eventos;
    var publicaciones = _selected_rcd.data.publicaciones;
    var investigaciones = _selected_rcd.data.investigaciones;
    var diplomas = _selected_rcd.data.diplomas;
    var lugar = _selected_rcd.data.lugar;
    var fecha = _selected_rcd.data.fecha;

    var cursos = App.PerformSyncServerRequest('Cap_Trabajador.Cap_Trabajador.CargarDatoscursos',{id:id});
    var result=[];
    for(var a=0;a<cursos.results;a++)
    {result.push(cursos.rows[a]);}

    this._store_combocultura = App.BuildJsonStore('Cap_Trabajador.Cap_Trabajador.CargarNcultura',{
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });
    this._store_combo_Cargarespecialidades = App.BuildJsonStore('Cap_Trabajador.Cap_Trabajador.Cargarespecialidades',{
        fields: [
            {name: 'nombre'},
            {name: 'id'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });
    this._store_combo_Cargardocentes = App.BuildJsonStore('Cap_Trabajador.Cap_Trabajador.Cargardocentes',{
        fields: [
            {name: 'id'},
            {name: 'nombre'}


        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });
    this._store_combo_Ccientifica = App.BuildJsonStore('Cap_Trabajador.Cap_Trabajador.CargarCcientifica',{
        fields: [
            {name: 'id'},
            {name: 'nombre'}

        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });
    this._store_combo_Cargargrado = App.BuildJsonStore('Cap_Trabajador.Cap_Trabajador.Cargargrado',{
        fields: [
            {name: 'id'},
            {name: 'nombre'}

        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json', root: 'rows', totalProperty: 'results'}
        },
        autoLoad: true
    });
    this._store_combo_Cursos = App.BuildJsonStore('Cap_Trabajador.Cap_Trabajador.cursos',{
        fields: [{name: 'id'},
                 {name: 'nombre'},
                 {name: 'curso_id'}
                ],
        proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
        sortInfo: {field: 'nombre',direction: 'ASC'},
        params:{id:id},
        autoLoad: true
    });

    var cultura= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Niviel Cultural',
        store: this._store_combocultura,
        queryMode: 'local',
        id:'cultura_cmb',
        name:'cultura_cmb',
        displayField: 'nombre',
        valueField: 'id',
        renderTo: Ext.getBody()
    });
    var especialidad= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Especialidad',
        store:  this._store_combo_Cargarespecialidades,
        queryMode: 'local',
        id:'especialidad_cmb',
        name:'especialidad_cmb',
        displayField: 'nombre',
        valueField: 'id',
        renderTo: Ext.getBody()
    });
    var docente= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Categoría Docente',
        store:this._store_combo_Cargardocentes,
        queryMode: 'local',
        id:'docente_cmb',
        name:'docente_cmb',
        displayField: 'nombre',
        valueField: 'id',
        renderTo: Ext.getBody()
    });
    var cientifica= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Categoría Cientifica',
        store: this._store_combo_Ccientifica,
        queryMode: 'local',
        id:'ciencia_cmb',
        name:'ciencia_cmb',
        displayField: 'nombre',
        valueField: 'id',
        renderTo: Ext.getBody()
    });
    var grado= Ext.create('Ext.form.ComboBox', {
        fieldLabel: 'Grado Científico',
        store: this._store_combo_Cargargrado,
        queryMode: 'local',
        id:'grado_cmb',
        name:'grado_cmb',
        displayField: 'nombre',
        multiSelect :'true',
        valueField: 'nombre',
        renderTo: Ext.getBody()
    });

    if (_paccion == 'upd') {
        {
            this.panelupdCap_Trabajador = Ext.create('Ext.form.Panel', {
                xtype: 'plain-tabs',
                width: 'auto',
                height:'auto',
                autoScroll : true,
                id:'panelupdCap_Trabajador',
                name:'panelupdCap_Trabajador',
                plain: true,
                margin: '5 5 5',
                defaults: {bodyPadding: 10,autoScroll: true},
                layout: 'column', // arrange fieldsets side by side
                items: [
                    {
                    // Fieldset in Column 1 - collapsible via toggle button
                    xtype:'fieldset',
                    columnWidth: 0.4,
                    title: 'Formaci&oacute;n T&eacute;cnico Profesional ',
                    collapsible: true,
                    id:'Formacion',
                    name:'Formacion',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[
                        {
                        fieldLabel: 'Lugar de graduado',
                        xtype:'textfield',
                        name: 'lugar',
                        id:'lugar',
                        value:lugar
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'País de graduaci&oacute;n',
                            labelWidth:130,
                            columns: 3,
                            items: [
                                {boxLabel: 'Cuba', name: 'Pais', inputValue: 1,checked: true},
                                {boxLabel: 'Extranjero', name: 'Pais', inputValue: 0}
                            ]
                        },
                        {
                            fieldLabel: 'user_id',
                            xtype:'textfield',
                            name: 'user_id',
                            id:'user_id',
                            value:id,
                            hidden:true
                        },
                        {
                        fieldLabel: 'Fecha de Graduaci&oacute;n',
                        name: 'Fecha',
                        xtype:'textfield',
                        xtype:'datefield',
                        id:'fecha',
                        value:fecha
                    },
                        cultura ,especialidad, docente, cientifica ,grado,
                        {height:15}]
                },
                    {height:5},
                    {
                    xtype: 'fieldset',
                    title: 'Mostrar Otras Opciones',
                    columnWidth: 0.6,
                    checkboxToggle: true,
                        id:'General',
                        name:'General',
                    collapsed: true,
                    layout:'anchor',
                    items :[
                            {  xtype:'fieldset',
                                title: 'Cursos Recibidos', // title or checkboxToggle creates fieldset header
                                checkboxToggle: true,
                                id:'cursos_fiel',
                                name:'cursos_fiel',
                                collapsed: true, // fieldset initially collapsed
                                layout:'anchor',
                                items :[{
                                    xtype: 'itemselector',
                                    name: 'cursos_pasados',
                                    id: 'cursos_pasados',
                                    anchor: '100%',
                                    height:200,
                                    hideLabel:true,
                                    autoScroll:true,
                                    fieldLabel: 'ItemSelector',
                                    imagePath: 'Framework/Client/ExtJs/src/ux/css/images/',
                                    store:  this._store_combo_Cursos,
                                    displayField: 'nombre',
                                    valueField: 'curso_id',
                                    value:result,
                                    msgTarget: 'side',
                                    fromTitle: 'Cursos Disponibles',
                                    toTitle: 'Cursos Realizados o En Proceso'
                                }]
                                },
                            {  xtype:'fieldset',
                                title: 'Esperiencia Profesional', // title or checkboxToggle creates fieldset header
                                checkboxToggle: true,
                                collapsed: true, // fieldset initially collapsed
                                id:'esperiencia_fiel',
                                name:'esperiencia_fiel',
                                layout:'anchor',
                                items :[
                                        {
                                        xtype: 'htmleditor',
                                        width: '100%',
                                        id:'esperiencia',
                                        name:'esperiencia',
                                        height: '100%',
                                        hideLabel:true,
                                            value:esperiencia
                                        }]
                            },
                            {  xtype:'fieldset',
                                title: 'Participaci&oacute;n en Eventos', // title or checkboxToggle creates fieldset header
                                checkboxToggle: true,
                                collapsed: true, // fieldset initially collapsed
                                layout:'fit',
                                id:'participacion_fiel',
                                name:'participacion_fiel',
                                items :[
                                    {
                                        xtype: 'htmleditor',
                                        width: '100%',
                                        id:'eventos',
                                        name:'eventos',
                                        height: '100%',
                                        hideLabel:true,
                                        value:eventos
                                    }]
                            },
                            {  xtype:'fieldset',
                                title: 'Publicaciones Realizadas', // title or checkboxToggle creates fieldset header
                                checkboxToggle: true,
                                collapsed: true, // fieldset initially collapsed
                                id:'publicaciones_fiel',
                                name:'publicaciones_fiel',
                                layout:'anchor',
                                items :[
                                     {
                                         xtype: 'htmleditor',
                                         width: '100%',
                                         id:'publicaciones',
                                         height: '100%',
                                         name:'publicaciones',
                                         hideLabel:true,
                                         value:publicaciones
                                    }]
                            },
                            {  xtype:'fieldset',
                                title: 'Investigaciones Terminadas', // title or checkboxToggle creates fieldset header
                                checkboxToggle: true,
                                collapsed: true, // fieldset initially collapsed
                                layout:'anchor',
                                id:'inv_fiel',
                                name:'inv_fiel',
                                items :[
                                    {
                                        xtype: 'htmleditor',
                                        width: '100%',
                                        id:'investigacion',
                                        height: '100%',
                                        name:'investigacion',
                                        hideLabel:true,
                                        value:investigaciones
                                    }]
                            },
                            { xtype:'fieldset',
                            title: 'Diplomas y Trabajos de Cursos', // title or checkboxToggle creates fieldset header
                            checkboxToggle: true,
                            collapsed: true, // fieldset initially collapsed
                            layout:'anchor',
                                id:'dipl_fiel',
                                name:'dipl_fiel',
                            items :[
                                {
                                    xtype: 'htmleditor',
                                    width: '100%',
                                    id:'diplomas',
                                    height: '100%',
                                    name:'diplomas',
                                    hideLabel:true,
                                    value:diplomas
                                }]
                        }
                    ]
                }
              ]
            });
            var _gst_winupdCap_Trabajador = new Ext.Window({
                    title: 'Modificar datos de: '+ nombre+'',
                    id: '_gst_winupdCap_Trabajador',
                    height: App.GetDesktopHeigth() * 0.9 + 20,
                    width: App.GetDesktopWidth() * 0.8,
                    plain: true,
                    maximizable : true,
                    layout: 'fit',
                   // animateTarget:'mod_Cap_Trabajador_btn_id',
                    modal: true,
                    autoScroll : true,
                    tools:[
                    {
                        type:'help',
                        tooltip: '¿Necesita Ayuda?',
                        handler: function(event, toolEl, panel){
                            Ext.create('Ext.window.Window', {
                                title: '¿Necesita Ayuda?',
                                height:'15%',iconCls:'help',
                                width:'50%',modal:true,
                                autoScroll:true,
                                layout: 'anchor',
                                html:
                                    '<ul class="nav nav-list">' +
                                        '<li>El apartado <span class="label label-info">" Modificar información"</span>' +
                                        ' le permite gestionar toda la información referente a la formación profesional del trabajador  </li>' +
                                         '</li>' +
                                        '</ul>'

                            }).show();
                        }
                    }],
                    resizable: true,
                    items: [this.panelupdCap_Trabajador],
                    buttons: [
                              {
                            text: 'Aceptar', cls: 'btn btn-success', formBind: true,
                            handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                            scope: this
                            },{
                            text: 'Cancelar', cls: 'btn btn-primary',
                            handler: function () {_gst_winupdCap_Trabajador.close();}
                            }
                            ],
                    listeners: {
                        'show': function (This, eOpts) {
                            Ext.getCmp('lugar').focus(true, true);

                        }, scope: this
                    }
                });
            _gst_winupdCap_Trabajador.show();
        }
    }
    else
        Ext.Msg.alert('Atenci&oacute;n', 'Acci&oacute;n no definida');
}
Cap_Trabajador.prototype.Modid = function (_paccion,_selectionModel,_selected_rcd) {
    if (this.panelupdCap_Trabajador.getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Cap_Trabajador.Cap_Trabajador.Modif',this.panelupdCap_Trabajador.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('panelupdCap_Trabajador').getForm().reset();
            Ext.getCmp('panelupdCap_Trabajador').focus(true, true);
            Ext.getCmp('_gst_winupdCap_Trabajador').close();
            this.__data_store.load();
            App.InfoMessage('Informaci&oacute;n', '&Aacute;rea adicionada satisfactoriamente');
        }
    }
}