function AprobS(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Aprobación de Solicitudes',
            id: 'AprobS_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Capacitación',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
       this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
    //-------------------------------------Aprobar Solicitudes---------------------------------------------
	   this.trabajadores_solicitud_cursos = App.BuildJsonStore('AprobS.AprobS.trabajadores_solicitud_cursos',{
            fields: [
                    {name: 'id_trabj'},
                    {name: 'filtro'},
                    {name: 'nombre_completo'}
                    ],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            sortInfo: {field: 'nombre',direction: 'ASC'},
            autoLoad: true
        });
       var _grid_trabajadores = Ext.create('Ext.grid.Panel', {
            id: 'Cap_Trabajador_grid_id_bbbb',
            margin: '0 5 0',
            store: this.trabajadores_solicitud_cursos,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Nombre", flex: 1, dataIndex: 'nombre_completo'}
            ],
            enableLocking: true,
            width: '100%',
            height:380,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.trabajadores_solicitud_cursos,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
           listeners: {
               itemclick: {
                       fn: function() {
                       var _selectionModel = Ext.getCmp('Cap_Trabajador_grid_id_bbbb').getSelectionModel();
                       var _selected_rcd = _selectionModel.getLastSelected();
                       var trabajador_id = _selected_rcd.data.id_trabj;
                       this._store_cursos = App.BuildJsonStore('AprobS.AprobS.trabajadores_solicitud_cursos_descript',{
                           fields: [
                               {name: 'cursos'},
                               {name: 'id'},
                               {name: 'contato_id'},
                               {name: 'descripcion'},
                               {name: 'fecha_inicio'},
                               {name: 'fecha_fin'}
                           ],
                           groupField : 'area',
                           proxy: {type: 'ajax',reader: {type: 'json',root: 'rows',totalProperty: 'results'}},
                           params:{trabajador_id:trabajador_id},
                           autoLoad: false
                       });
                       this._store_cursos.load({params: {start: 0, limit: 25}});
                       Ext.getCmp('Cap_Trabajador_grid_id_aaaaaaaaaa').reconfigure(this._store_cursos, [
                           Ext.create('Ext.grid.RowNumberer'),
                           {
                               flex: 2,
                               text: 'Nombre',
                               dataIndex: 'cursos',
                               tdCls: 'task'
                           },
                           {   text: "Acción",
                               xtype:'actioncolumn',
                               width:70,
                               items: [{
                                   iconCls:'modify',
                                   tooltip: 'Aprobar curso',
                                   handler: function() {
                                               var _selectionModel = Ext.getCmp('Cap_Trabajador_grid_id_aaaaaaaaaa').getSelectionModel();
                                               var _selected_rcd = _selectionModel.getLastSelected();
                                               var contato_id = _selected_rcd.data.contato_id;
                                               var id = _selected_rcd.data.id;
                                               var cursos = App.PerformSyncServerRequest('AprobS.AprobS.autorizar',{id:id,trabajador_id:contato_id});
                                               if(cursos==true){
                                                   this._store_cursos.load();
                                                   App.InfoMessage('Información', 'Curso autorizado satisfactoriamente');
                                               }
                                               else{
                                                   App.InfoMessage('Información', 'No se pudo eliminar el curso solicitado');
                                               }
                                   },
                                           scope: this
                                   },
                                   {height:3},
                                   {
                                   iconCls:'del_item',
                                   tooltip: 'No aprobar curso',
                                   handler: function() {
                                       var _selectionModel = Ext.getCmp('Cap_Trabajador_grid_id_aaaaaaaaaa').getSelectionModel();
                                       var _selected_rcd = _selectionModel.getLastSelected();
                                       var contato_id = _selected_rcd.data.contato_id;
                                       var id = _selected_rcd.data.id;
                                       var cursos = App.PerformSyncServerRequest('AprobS.AprobS.noautorizar',{id:id,trabajador_id:contato_id});
                                       if(cursos==true){
                                           this._store_cursos.load();
                                           App.InfoMessage('Información', 'Curso eliminado satisfactoriamente');
                                       }
                                       else{
                                           App.InfoMessage('Información', 'No se pudo eliminar el curso solicitado');
                                       }
                                   },
                                   scope: this
                               }]
                           }
                       ]);
                       Ext.resumeLayouts(true);
                   },
                   scope: this
               }
           }
        });
       var _grid_cursos = Ext.create('Ext.grid.Panel', {
            id: 'Cap_Trabajador_grid_id_aaaaaaaaaa',
            margin: '0 5 0',
            store: this._store_cursos,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Nombre", flex: 1, dataIndex: 'nombre'},
                {text: "Acción",xtype:'actioncolumn', width:70}
            ],
            enableLocking: true,
            width: '100%',
            height:380,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this._store_combo_Cursos,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
           listeners: {
               itemclick: {
                   fn: function() {
                       var _selectionModel = Ext.getCmp('Cap_Trabajador_grid_id_aaaaaaaaaa').getSelectionModel();
                       var _selected_rcd = _selectionModel.getLastSelected();
                       var descripcion = _selected_rcd.data.descripcion;
                       var fecha_inicio = _selected_rcd.data.fecha_inicio;
                       var fecha_fin = _selected_rcd.data.fecha_fin;
                       var nombre = _selected_rcd.data.cursos;
                       var trabajador_id = _selected_rcd.data.trabajador_id;
                       var id = _selected_rcd.data.id;
                       var html='<table class="table table-bordered">'+
                                   '<tr class="btn-info">'+
                                      ' <th>Nombre Curso</th>'+
                                             '<th>Fecha Inicio</th>'+
                                       '<th>Fecha Fin</th>'+
                                   '</tr>'+
                                   '<tr>'+
                                       '<td>'+nombre+'</td>'+
                                                '<td>'+fecha_inicio+'</td>'+
                                       '<td>'+fecha_fin+'</td>'+
                                   '</tr>'+
                                       '<tr>'+
                                           '<td>Descripción</td>'+
                                           '<td colspan="2">&nbsp;'+descripcion+'</td>'+
                                '</table>';
                       Ext.getCmp('descript').update(html);
                   },
                   scope: this
               }
           }
        });
   	   var Aprobar_solicitudes = new Ext.Panel({
           title: 'Aprobar solicitudes',
           border: true,
           frame: true,
           layout: 'border',
           height: App.GetDesktopHeigth()-50,
           width: App.GetDesktopWidth(),
            plain: true,
            margin: '5 5 5',
            defaults: {bodyPadding: 10,autoScroll: true},
            layout: 'column', // arrange fieldsets side by side
            items: [
                {
                    // Fieldset in Column 1 - collapsible via toggle button
                    xtype:'fieldset',
                    columnWidth: 0.3,
                    width:'100%',
                    title: 'Trabajadores',
                    collapsible: false,
                    height:'98%',
                    id:'trabajadores1',
                    name:'trabajadores1',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[_grid_trabajadores,{
                        xtype: 'textfield',
                        name: 'searchField_Aprb',
                        id:'searchField_Aprb',
                        enableKeyEvents : true,
                        hideLabel: true,
                        width: 200,
                        emptyText:'Filtrar por: Trabajador...',
                        listeners: {
                            change:function(){
                                console.log(Ext.getCmp('Cap_Trabajador_grid_id_bbbb').store);
                                Ext.getCmp('Cap_Trabajador_grid_id_bbbb').store.clearFilter();
                                Ext.getCmp('Cap_Trabajador_grid_id_bbbb').store.filter("filtro", Ext.getCmp('searchField_Aprb').getValue());
                            },scope:this
                        }
                    }]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.3,
                    title: 'Cursos del trabajador ',
                    collapsible: false,
                    id:'cursos_trab',
                    height:'98%',
                    width:'100%',
                    name:'cursos_trab',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[_grid_cursos,{
                        xtype: 'textfield',
                        name: 'searchField_Aprb_cursos',
                        id:'searchField_Aprb_cursos',
                        enableKeyEvents : true,
                        hideLabel: true,
                        width: 200,
                        emptyText:'Filtrar por: Cursos...',
                        listeners: {
                            change:function(){
                                console.log(Ext.getCmp('Cap_Trabajador_grid_id_aaaaaaaaaa').store);
                                Ext.getCmp('Cap_Trabajador_grid_id_aaaaaaaaaa').store.clearFilter();
                                Ext.getCmp('Cap_Trabajador_grid_id_aaaaaaaaaa').store.filter("cursos", Ext.getCmp('searchField_Aprb_cursos').getValue());

                            },scope:this
                        }
                    }]

                },
                {height:2},
                {
                    xtype:'fieldset',
                    columnWidth: 0.4,
                    title: 'Descripción ',
                    collapsible: false,
                    id:'descript',
                    height:'100%',
                    width:'100%',
                    name:'descript',
                    cls:'btn',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[{
                        html:''

                    }]
                }
            ],
           bbar:[('->'),{
               xtype: 'button',
               //text : 'Ayuda',
               iconCls:'help',
               handler:function(){
                   Ext.create('Ext.window.Window', {
                       title: '¿Necesita Ayuda?',
                       height:'25%',
                       width:'55%',
                       iconCls:'help',modal:true,
                       autoScroll:true,
                       layout: 'anchor',
                       html:
                           '<ul class="nav nav-list">' +
                               '<li>El m&oacute;dulo <span class="label label-info">" Aprobar solicitudes"</span>' +
                               ' le permite gestionar las solicitudes de cursos por los trabajadores.<br>' +
                               '<span class="label label-warning">Debe saber que :</span>' +
                               '<br>Los trabajadores aparecen con su Agencia y &aacute;rea para diferenciar cada contrato que tenga un trabajado especial.<br>' +
                               'Los cursos nos brinda informaci&oacute;n adicional, de forma tal que sea mas f&aacute;cil al responsable pueda tomar la decición' +
                               '</li>' +
                               '</ul>'

                   }).show();
               }
           }],
           listeners: {afterrender: function(){},scope : this}
        });
    //--------------------------------------------Necesidades de Aprendisaje Personales----------------------------------------

        this.solicituedes = App.BuildJsonStore('AprobS.AprobS.Solicitud',{
            fields: [
                {name: 'trabajador_id'},
                {name: 'solicitud'},
                {name: 'id'}
            ],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            sortInfo: {field: 'solicitud',direction: 'ASC'},
            autoLoad: true
        });
        this.Gestion_Solicitud = App.BuildJsonStore('AprobS.AprobS.Gestion_Solicitud',{
            fields: [
                {name: 'nombre'},
                {name: 'id'},
                {name: 'descripcion'}
            ],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            sortInfo: {field: 'solicitud',direction: 'ASC'},
            autoLoad: true
        });
        var toolB=Ext.create('Ext.toolbar.Toolbar', {
            width   : 500,
            items: [
                '-',
                {
                    xtype: 'textfield',
                    name: 'searchField_Aprb_cursos5',
                    id:'searchField_Aprb_cursos5',
                    hideLabel: true,
                    width: 200,
                    emptyText:'Filtrar por: Cursos...',
                    listeners: {
                        change:function(){
                            Ext.getCmp('_grid_cursos_gestion').store.clearFilter();
                            Ext.getCmp('_grid_cursos_gestion').store.filter("nombre", Ext.getCmp('searchField_Aprb_cursos').getValue());
                        },scope:this
                    }
                },'-','->',
                {
                    text: 'Crear Gestión',
                    cls:'btn',
                    handler:function(){
                        var crear = Ext.create('Ext.window.Window', {
                            title: 'Crear Gestión de nuevos cursos ',
                            height:'60%',
                            width: '60%',
                            padding:'10px',
                            modal:true,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [{
                                fieldLabel: 'Cursos',
                                name: 'Cursos',id: 'Cursos',
                                anchor: '50%',
                                allowBlank: false
                            },{
                                xtype:'htmleditor',
                                fieldLabel: 'Descripción',
                                name: 'Descripción',id: 'Descripción',
                                allowBlank: false
                            }],
                            buttons: [{
                                text: 'Aceptar',cls:'btn btn-success', formBind: true,
                                handler: function(){
                                    var Cursos = Ext.getCmp('Cursos').getValue();
                                    var Descripción = Ext.getCmp('Descripción').getValue();
                                    console.log(Cursos);
                                    console.log(Descripción);
                                    if(Cursos != "" && Cursos != null  && Descripción !="" && Descripción!=null){
                                        var cursos = App.PerformSyncServerRequest('AprobS.AprobS.Crear_Gestión',{Cursos:Cursos,Descripción:Descripción});
                                        if(cursos==true){
                                            Ext.getCmp('_grid_cursos_gestion').store.load();
                                            App.InfoMessage('Información', 'Curso adicionado satisfactoriamente');
                                        }
                                        else{
                                            App.InfoMessage('Información', 'No se pudo adicionar el curso solicitado');
                                        }
                                    }
                                    else {
                                        App.InfoMessage('Información', 'Debe llenar todos los campos.');
                                    }
                                },
                                scope: this
                            },
                                {
                                    text: 'Cancelar',cls:'btn btn-primary',
                                    handler: function(){crear.close();}
                                }]

                        }).show();
                    }
                },
                {
                    text: 'Modificar Gestión',
                    cls:'btn',
                    handler:function(){
                        var _selectionModel = Ext.getCmp('_grid_cursos_gestion').getSelectionModel();
                        var _selected_rcd = _selectionModel.getLastSelected();
                        var id = _selected_rcd.data.id;
                        var Cursos = _selected_rcd.data.nombre;
                        var Descripción = _selected_rcd.data.descripcion;
                        var Modificar = Ext.create('Ext.window.Window', {
                            title: 'Modificar Gestión de nuevos cursos ',
                            height:'60%',
                            width: '60%',
                            padding:'10px',
                            modal:true,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [{
                                fieldLabel: 'Cursos',
                                name: 'Cursos1',id: 'Cursos1',anchor: '50%',
                                allowBlank: false,
                                value:Cursos
                            },{
                                xtype:'htmleditor',
                                fieldLabel: 'Descripción',
                                name: 'Descripción1', id: 'Descripción1',
                                allowBlank: false,
                                value:Descripción
                            }],
                            buttons: [{
                                text: 'Aceptar',cls:'btn btn-success', formBind: true,
                                handler: function(){
                                    var Cursos = Ext.getCmp('Cursos1').getValue();
                                    var Descripción = Ext.getCmp('Descripción1').getValue();
                                    if(Cursos != "" && Cursos != null  && Descripción !="" && Descripción!=null){
                                    var cursos = App.PerformSyncServerRequest('AprobS.AprobS.Modificar_Gestión',{id:id,Cursos:Cursos,Descripción:Descripción});
                                    if(cursos==true){
                                        Ext.getCmp('_grid_cursos_gestion').store.load();
                                        App.InfoMessage('Información', 'Curso modificado satisfactoriamente');
                                    }
                                    else{
                                        App.InfoMessage('Información', 'No se pudo modificado el curso solicitado');
                                    }
                                    }
                                    else {
                                        App.InfoMessage('Información', 'Debe llenar todos los campos.');
                                    }
                                },
                                scope: this
                            },
                                {
                                    text: 'Cancelar',cls:'btn btn-primary',
                                    handler: function(){Modificar.close();}
                                }]

                        }).show();
                    }
                },
                {
                    text: 'Aprobar Gestión',
                    cls:'btn',
                    handler:function(){
                        this.states = App.BuildJsonStore('AprobS.AprobS.CargarDatosEventos',{
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
                        var combo=Ext.create('Ext.form.ComboBox', {
                            fieldLabel: 'Tipo de Evento',
                            store: this.states ,
                            id:'combo',
                            name:'combo', anchor: '50%',
                            queryMode: 'local',
                            displayField: 'nombre',
                            valueField: 'id'
                        });
                        var _selectionModel = Ext.getCmp('_grid_cursos_gestion').getSelectionModel();
                        var _selected_rcd = _selectionModel.getLastSelected();
                        var id = _selected_rcd.data.id;
                        var Cursos = _selected_rcd.data.nombre;
                        var Descripción = _selected_rcd.data.descripcion;
                        var Aprobar = Ext.create('Ext.window.Window', {
                            title: 'Aprobar Gestión de nuevos cursos ',
                            height:'60%',
                            width: '60%',
                            padding:'10px',
                            modal:true,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [{
                                fieldLabel: 'Cursos2',
                                name: 'Cursos2',id: 'Cursos2',
                                anchor: '50%',
                                allowBlank: false,
                                value:Cursos
                            },combo,{
                                xtype: 'datefield',
                                anchor: '50%',
                                fieldLabel: 'Desde',
                                name: 'Desde',id: 'Desde',
                                allowBlank: false,
                                minValue: new Date()
                            }, {
                                xtype: 'datefield',
                                anchor: '50%',allowBlank: false,
                                fieldLabel: 'Hasta',
                                name: 'Hasta',id: 'Hasta',
                                minValue: new Date()
                            },
                                {
                                    xtype:'htmleditor',
                                    fieldLabel: 'Descripción',
                                    name: 'Descripción',id: 'Descripción',
                                    allowBlank: false,
                                    value:Descripción
                                }],
                            buttons: [{
                                text: 'Aceptar',cls:'btn btn-success', formBind: true,
                                handler: function(){
                                    var Cursos = Ext.getCmp('Cursos2').getValue();
                                    var Descripción = Ext.getCmp('Descripción').getValue();
                                    var Desde = Ext.getCmp('Desde').getValue();
                                    var Hasta = Ext.getCmp('Hasta').getValue();
                                    var combo = Ext.getCmp('combo').getValue();
                                    if(Cursos != "" && Cursos != null  && Descripción !="" && Descripción!=null && Desde !="" && Desde!=null &&Hasta !="" && Hasta!=null && combo !="" && combo!=null){
                                    var cursos = App.PerformSyncServerRequest('AprobS.AprobS.Aprobar_Gestión',{id:id,combo:combo,Cursos:Cursos,Descripción:Descripción,Desde:Desde,Hasta:Hasta});
                                    if(cursos==true){
                                        Ext.getCmp('_grid_cursos_gestion').store.load();
                                        App.InfoMessage('Información', 'Curso adicionado satisfactoriamente');
                                    }
                                    else{
                                        App.InfoMessage('Información', 'No se pudo adicionar el curso solicitado');
                                    }
                                    }
                                    else {
                                        App.InfoMessage('Información', 'Debe llenar todos los campos.');
                                    }
                                },
                                scope: this
                            },
                                {
                                    text: 'Cancelar',cls:'btn btn-primary',
                                    handler: function(){Aprobar.close();}
                                }]

                        }).show();
                    }
                },
                {
                    xtype: 'button',
                    //text : 'Ayuda',
                    iconCls:'help',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'25%',
                            width:'55%',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El modulo <span class="label label-info">" Aprobar solicitudes"</span>' +
                                    ' le permite gestionar las solicitudes de cursos por los trabajadores.<br>' +
                                    '<span class="label label-warning">Debe saber que :</span>' +
                                    '<br>Los trabajadores aparecen con su Agencia y área para diferenciar cada contrato que tenga un trabajado especial.<br>' +
                                    'Los cursos nos brinda informacion adicional, de forma tal que sea mas facil al responsable pueda tomar la decición' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }}

            ]
        });
        var toolBa=Ext.create('Ext.toolbar.Toolbar', {
            width   : 500,
            items: [
                '-',
                {
                    xtype: 'textfield',
                    name: 'searchField_toolBa',
                    id:'searchField_toolBa',
                    enableKeyEvents : true,
                    hideLabel: true,
                    width: 200,
                    emptyText:'Filtrar por: Trabajador...',
                    listeners: {
                        change:function(){
                            Ext.getCmp('_grid_trabajadores_Cursos').store.clearFilter();
                            Ext.getCmp('_grid_trabajadores_Cursos').store.filter("nombre", Ext.getCmp('searchField_toolBa').getValue());

                        },scope:this
                    }
                },'-','->',
                {
                    xtype: 'button',
                    //text : 'Ayuda',
                    iconCls:'help',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'25%',
                            width:'55%',
                            padding:'10px',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El apartado <span class="label label-info">" Solicitud de los trabajadores"</span>' +
                                    ' le permite gestionar las nececidad de cursos para cada trabajadores.<br>' +
                                    '<span class="label label-warning">Debe saber que :</span>' +
                                    '<br>Los trabajadores en caracter individual pueden necesistar m&aacute;s de un curso estos deben ser adicionados a el apartado ' +
                                    '<span class="label label-info">Cursos de los trabajadores</span> para la gestión empresarial dada.<br>' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }}

            ]
        });
        var _grid_trabajadores_Cursos = Ext.create('Ext.grid.Panel', {
            id: 'solicituedes',
            margin: '0 5 0',
            store: this.solicituedes,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Nombre Trabajador", flex: 1, dataIndex: 'trabajador_id'},
                {   text: "Acción",
                    xtype:'actioncolumn',
                    width:70,
                    items: [
                        {height:5},
                        {
                            iconCls:'del_item',
                            tooltip: 'No aprobar curso',
                            handler: function() {
                                var _selectionModel = Ext.getCmp('solicituedes').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                var id = _selected_rcd.data.id;
                                var cursos = App.PerformSyncServerRequest('AprobS.AprobS.solicitudesRealizadas',{id:id});
                                if(cursos==true){
                                    this.solicituedes.load();
                                    App.InfoMessage('Información', 'Curso eliminado satisfactoriamente');
                                }
                                else{
                                    App.InfoMessage('Información', 'No se pudo eliminar el curso solicitado');
                                }
                            },
                            scope: this
                        }]
                }
            ],
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<table class="table table-bordered mejorar">' ,
                    '<tr class="info">',
                    '<td><div class="label label-info">Descripción:</div><br>{solicitud}</td>',
                    '</tr>',
                    '<td></td>',
                    '</table>')
            }],
            enableLocking: true,
            width: '100%',
            height:380,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.solicituedes,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
                }
        });
        var _grid_cursos_gestion = Ext.create('Ext.grid.Panel', {
            id: '_grid_cursos_gestion',
            margin: '0 5 0',
            store:this.Gestion_Solicitud,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Curso a gestionar", flex: 1, dataIndex: 'nombre'}
            ],
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<table class="table table-bordered mejorar">' ,
                    '<tr class="info">',
                    '<td><div class="label label-info">Descripción:</div><br>{descripcion}</td>',
                    '</tr>',
                    '<td></td>',
                    '</table>')
            }],
            enableLocking: true,
            width: '100%',
            height:380,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.Gestion_Solicitud,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        var Aprobar_cursos = new Ext.Panel({
            title: 'Necesidades de Aprendizaje <div class="label label-info"> Personales </div>y Gesti&oacute;n de  Eventos',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: App.GetDesktopWidth(),
            plain: true,
            margin: '5 5 5',
            defaults: {bodyPadding: 10,autoScroll: true},
            layout: 'column', // arrange fieldsets side by side
            items: [
                {
                    // Fieldset in Column 1 - collapsible via toggle button
                    xtype:'fieldset',
                    columnWidth: 0.4,
                    width:'100%',
                    title: 'Eventos o Cursos solicitados',
                    collapsible: false,
                    height:'98%',
                    id:'trabajadores4',
                    name:'trabajadores4',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[_grid_trabajadores_Cursos,toolBa]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.6,
                    title: 'Eventos o Cursos en gestión ',
                    collapsible: false,
                    id:'cursos_trab5',
                    height:'98%',
                    width:'100%',
                    name:'cursos_trab5',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[
                        _grid_cursos_gestion,toolB
                    ]
                }
            ],
            listeners: {afterrender: function(){},scope : this}
        });
        //-----------------------------------Necesidades de Aprendisaje Profeciogramas-----------------------------------------------

        this.Necesidades = App.BuildJsonStore('AprobS.AprobS.Necesidades',{
            fields: [
                {name: 'necesidades'},
                {name: 'acciones'},
                {name: 'terminacion'},
                {name: 'lugar'},
                {name: 'nombre_completo'},
                {name: 'id'},
                {name: 'inicio'}
            ],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            params:{start:0,limit:25},
            groupField : 'nombre_completo',
            //sortInfo: {field: 'nombre_completo',direction: 'ASC'},
            autoLoad: true
        });
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
            groupHeaderTpl: 'Trabajador: {name} ({rows.length} Necesidad{[values.rows.length > 1 ? "es" : ""]})',
            hideGroupedHeader: true,
            startCollapsed: true,
            ftype: 'grouping'
        });
        this.Gestion_Solicitud = App.BuildJsonStore('AprobS.AprobS.Gestion_Solicitud',{
            fields: [
                {name: 'nombre'},
                {name: 'id'},
                {name: 'descripcion'}
            ],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            sortInfo: {field: 'solicitud',direction: 'ASC'},
            autoLoad: true
        });
        var toolB_Necesidades=Ext.create('Ext.toolbar.Toolbar', {
            width   : 500,
            items: [
                {
                    text: 'Crear Gestión',
                    cls:'btn',
                    handler:function(){
                        var crear = Ext.create('Ext.window.Window', {
                            title: 'Crear Gestión de nuevos cursos ',
                            height:'60%',
                            width: '60%',
                            padding:'10px',
                            modal:true,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [{
                                fieldLabel: 'Cursos',
                                name: 'Cursos',
                                id: 'Cursos',
                                anchor: '50%',
                                allowBlank: false
                            },{
                                xtype:'htmleditor',
                                fieldLabel: 'Descripción',
                                name: 'Descripción',id: 'Descripción',
                                allowBlank: false
                            }],
                            buttons: [{
                                text: 'Aceptar',cls:'btn btn-success', formBind: true,
                                handler: function(){
                                    var Cursos = Ext.getCmp('Cursos').getValue();
                                    var Descripción = Ext.getCmp('Descripción').getValue();
                                    if(Cursos != "" && Cursos != null  && Descripción !="" && Descripción!=null){
                                    var cursos = App.PerformSyncServerRequest('AprobS.AprobS.Crear_Gestión',{Cursos:Cursos,Descripción:Descripción});
                                    if(cursos==true){
                                        Ext.getCmp('_grid_cursos_gestion_Necesidades').store.load();
                                        App.InfoMessage('Información', 'Curso adicionado satisfactoriamente');
                                        crear.close();
                                    }
                                    else{
                                        App.InfoMessage('Información', 'No se pudo adicionar el curso solicitado');
                                    }
                                    }
                                    else {
                                        App.InfoMessage('Información', 'Debe llenar todos los campos.');
                                    }
                                },
                                scope: this
                            },
                                {
                                    text: 'Cancelar',cls:'btn btn-primary',
                                    handler: function(){crear.close();}
                                }]

                        }).show();
                    }
                },
                {
                    text: 'Modificar Gestión',
                    cls:'btn',
                    handler:function(){
                        var _selectionModel = Ext.getCmp('_grid_cursos_gestion_Necesidades').getSelectionModel();
                        var _selected_rcd = _selectionModel.getLastSelected();
                        var id = _selected_rcd.data.id;
                        var Cursos = _selected_rcd.data.nombre;
                        var Descripción = _selected_rcd.data.descripcion;
                        var Modificar = Ext.create('Ext.window.Window', {
                            title: 'Modificar Gestión de nuevos cursos ',
                            height:'60%',
                            width: '60%',
                            padding:'10px',
                            modal:true,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [{
                                fieldLabel: 'Cursos',
                                name: 'Cursos1',id: 'Cursos1',anchor: '50%',
                                allowBlank: false,
                                value:Cursos
                            },{
                                xtype:'htmleditor',
                                fieldLabel: 'Descripción',
                                name: 'Descripción1', id: 'Descripción1',
                                allowBlank: false,
                                value:Descripción
                            }],
                            buttons: [{
                                text: 'Aceptar',cls:'btn btn-success', formBind: true,
                                handler: function(){
                                    var Cursos = Ext.getCmp('Cursos1').getValue();
                                    var Descripción = Ext.getCmp('Descripción1').getValue();
                                    if(Cursos != "" && Cursos != null  && Descripción !="" && Descripción!=null){
                                    var cursos = App.PerformSyncServerRequest('AprobS.AprobS.Modificar_Gestión',{id:id,Cursos:Cursos,Descripción:Descripción});
                                    if(cursos==true){
                                        Ext.getCmp('_grid_cursos_gestion_Necesidades').store.load();
                                        App.InfoMessage('Información', 'Curso modificado satisfactoriamente');
                                    }
                                    else{
                                        App.InfoMessage('Información', 'No se pudo modificado el curso solicitado');
                                    }
                                    }
                                    else {
                                        App.InfoMessage('Información', 'Debe llenar todos los campos.');
                                    }
                                },
                                scope: this
                            },
                                {
                                    text: 'Cancelar',cls:'btn btn-primary',
                                    handler: function(){Modificar.close();}
                                }]

                        }).show();
                    }
                },
                {
                    text: 'Aprobar Gestión',
                    cls:'btn',
                    handler:function(){
                        this.states = App.BuildJsonStore('AprobS.AprobS.CargarDatosEventos',{
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
                        var combo=Ext.create('Ext.form.ComboBox', {
                            fieldLabel: 'Tipo de Evento',
                            store: this.states ,
                            id:'combo',
                            name:'combo', anchor: '50%',
                            queryMode: 'local',
                            displayField: 'nombre',
                            valueField: 'id'
                        });
                        var _selectionModel = Ext.getCmp('_grid_cursos_gestion_Necesidades').getSelectionModel();
                        var _selected_rcd = _selectionModel.getLastSelected();
                        var id = _selected_rcd.data.id;
                        var Cursos = _selected_rcd.data.nombre;
                        var Descripción = _selected_rcd.data.descripcion;
                        var Aprobar = Ext.create('Ext.window.Window', {
                            title: 'Aprobar Gestión de nuevos cursos ',
                            height:'60%',
                            width: '60%',
                            padding:'10px',
                            modal:true,
                            layout: 'anchor',
                            defaultType: 'textfield',
                            items: [{
                                fieldLabel: 'Cursos2',
                                name: 'Cursos2',id: 'Cursos2',
                                anchor: '50%',
                                allowBlank: false,
                                value:Cursos
                            },combo,{
                                xtype: 'datefield',
                                anchor: '50%',
                                fieldLabel: 'Desde',
                                name: 'Desde',id: 'Desde',
                                allowBlank: false,
                                minValue: new Date()
                            }, {
                                xtype: 'datefield',
                                anchor: '50%',allowBlank: false,
                                fieldLabel: 'Hasta',
                                name: 'Hasta',id: 'Hasta',
                                minValue: new Date()
                            },
                                {
                                    xtype:'htmleditor',
                                    fieldLabel: 'Descripción',
                                    name: 'Descripción',id: 'Descripción',
                                    allowBlank: false,
                                    value:Descripción
                                }],
                            buttons: [{
                                text: 'Aceptar',cls:'btn btn-success', formBind: true,
                                handler: function(){
                                    var Cursos = Ext.getCmp('Cursos2').getValue();
                                    var Descripción = Ext.getCmp('Descripción').getValue();
                                    var Desde = Ext.getCmp('Desde').getValue();
                                    var Hasta = Ext.getCmp('Hasta').getValue();
                                    var combo = Ext.getCmp('combo').getValue();
                                    if(Cursos != "" && Cursos != null  && Descripción !="" && Descripción!=null && Desde !="" && Desde!=null &&Hasta !="" && Hasta!=null && combo !="" && combo!=null){
                                    var cursos = App.PerformSyncServerRequest('AprobS.AprobS.Aprobar_Gestión',{id:id,combo:combo,Cursos:Cursos,Descripción:Descripción,Desde:Desde,Hasta:Hasta});
                                    if(cursos==true){
                                        Ext.getCmp('_grid_cursos_gestion').store.load();
                                        App.InfoMessage('Información', 'Curso adicionado satisfactoriamente');
                                    }
                                    else{
                                        App.InfoMessage('Información', 'No se pudo adicionar el curso solicitado');
                                    }
                                    }
                                    else {
                                        App.InfoMessage('Información', 'Debe llenar todos los campos.');
                                    }
                                },
                                scope: this
                            },
                                {
                                    text: 'Cancelar',cls:'btn btn-primary',
                                    handler: function(){Aprobar.close();}
                                }]

                        }).show();
                    }
                },
                {
                    xtype: 'button',
                    //text : 'Ayuda',
                    iconCls:'help',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'25%',
                            width:'55%',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El modulo <span class="label label-info">" Aprobar solicitudes"</span>' +
                                    ' le permite gestionar las solicitudes de cursos por los trabajadores.<br>' +
                                    '<span class="label label-warning">Debe saber que :</span>' +
                                    '<br>Los trabajadores aparecen con su Agencia y área para diferenciar cada contrato que tenga un trabajado especial.<br>' +
                                    'Los cursos nos brinda informaci&oacute;n adicional, de forma tal que sea mas f&aacute;cil al responsable pueda tomar la decición' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }}

            ]
        });
     var toolBa_Necesidades=Ext.create('Ext.toolbar.Toolbar', {
            width   : 500,
            items: [
                '-',
                {
                    xtype: 'textfield',
                    name: 'searchField_toolBa',
                    id:'searchField_toolBa',
                    enableKeyEvents : true,
                    hideLabel: true,
                    width: 200,
                    emptyText:'Filtrar por: Trabajador...',
                    listeners: {
                        change:function(){
                            Ext.getCmp('_grid_trabajadores_Cursos').store.clearFilter();
                            Ext.getCmp('_grid_trabajadores_Cursos').store.filter("nombre", Ext.getCmp('searchField_toolBa').getValue());

                        },scope:this
                    }
                },'-','->',
                {
                    xtype: 'button',
                    //text : 'Ayuda',
                    iconCls:'help',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'25%',
                            width:'55%',
                            padding:'10px',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El apartado <span class="label label-info">" Solicitud de los trabajadores"</span>' +
                                    ' le permite gestionar las necesidad de cursos para cada trabajador.<br>' +
                                    '<span class="label label-warning">Debe saber que :</span>' +
                                    '<br>Los trabajadores en carácter individual pueden necesitar mas de un curso estos deben ser adicionados a el apartado ' +
                                    '<span class="label label-info">Cursos de los trabajadores</span> para la gestión empresarial dada.<br>' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }}

            ]
        });
     var _grid_trabajadores_Cursos_Necesidades = Ext.create('Ext.grid.Panel', {
            id: '_grid_trabajadores_Cursos_Necesidades',
            name: '_grid_trabajadores_Cursos_Necesidades',
            margin: '0 5 0',
            store: this.Necesidades,
            features: [groupingFeature],
            viewConfig: {forceFit: true},
            columns: [
                {text: "Necesidades", flex: 3, dataIndex: 'necesidades'},
                {text: "Acciones", flex: 3, dataIndex: 'acciones'},
                {text: "Fecha Inicio", width:'125px', dataIndex: 'inicio'},
                {text: "Fecha Fin", width:'125px', dataIndex: 'terminacion'},
                {text: "Lugar", flex: 2, dataIndex: 'lugar'},
                {text: "Nombre Trabajador", flex: 1, dataIndex: 'nombre_completo'},
                {   text: "Acción",
                    xtype:'actioncolumn',
                    width:70,
                    items: [
                        {height:0},
                        {
                            iconCls:'del_item',
                            tooltip: 'No aprobar curso',
                            handler: function() {
                                var _selectionModel = Ext.getCmp('_grid_trabajadores_Cursos_Necesidades').getSelectionModel();
                                var _selected_rcd = _selectionModel.getLastSelected();
                                var id = _selected_rcd.data.id;
                                var cursos = App.PerformSyncServerRequest('AprobS.AprobS.atencion',{id:id});
                                if(cursos==true){
                                    this.Necesidades.load();
                                    App.InfoMessage('Información', 'Curso eliminado satisfactoriamente');
                                }
                                else{
                                    App.InfoMessage('Información', 'No se pudo eliminar el curso solicitado');
                                }
                            },
                            scope: this
                        }]
                }
            ],
            /*plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<table class="table table-bordered mejorar">' ,
                    '<tr class="info">',
                    '<td><div class="label label-info">Descripción:</div><br>{solicitud}</td>',
                    '</tr>',
                    '<td></td>',
                    '</table>')
            }],*/
            enableLocking: true,
            width: '100%',
            height:380,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.Necesidades,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
     var _grid_cursos_gestion_Necesidades = Ext.create('Ext.grid.Panel', {
            id: '_grid_cursos_gestion_Necesidades',
            name: '_grid_cursos_gestion_Necesidades',
            margin: '0 5 0',
            store:this.Gestion_Solicitud,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Curso a gestionar", flex: 1, dataIndex: 'nombre'}
            ],
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<table class="table table-bordered mejorar">' ,
                    '<tr class="info">',
                    '<td><div class="label label-info">Descripción:</div><br>{descripción}</td>',
                    '</tr>',
                    '<td></td>',
                    '</table>')
            }],
            enableLocking: true,
            width: '100%',
            height:380,
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.Gestion_Solicitud,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
     var Aprobar_cursos_Necesidades = new Ext.Panel({
            title: 'Necesidades de Aprendizaje <div class="label label-info"> Profesiogramas </div>y Gestion de  Eventos',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: App.GetDesktopWidth(),
            plain: true,
            margin: '5 5 5',
            defaults: {bodyPadding: 10,autoScroll: true},
            layout: 'column', // arrange fieldsets side by side
            items: [
                {
                    // Fieldset in Column 1 - collapsible via toggle button
                    xtype:'fieldset',
                    columnWidth: 0.6,
                    width:'100%',
                    title: 'Eventos o Cursos Solicitados',
                    collapsible: false,
                    height:'98%',
                    id:'trabajadores4_necs',
                    name:'trabajadores4_necs',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[_grid_trabajadores_Cursos_Necesidades,toolBa_Necesidades]
                },
                {
                    xtype:'fieldset',
                    columnWidth: 0.4,
                    title: 'Eventos o Cursos en gestión',
                    collapsible: false,
                    id:'cursos_trab5_necs',
                    height:'98%',
                    width:'100%',
                    name:'cursos_trab5_necs',
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items :[_grid_cursos_gestion_Necesidades,toolB_Necesidades]
                }
            ],
            listeners: {afterrender: function(){},scope : this}
        });
     //----------------------------------------------------------------------------------

     var tabs = Ext.create('Ext.tab.Panel', {
            activeTab: 0,
           height: App.GetDesktopHeigth()-25,
           width: App.GetDesktopWidth(),
            items: [Aprobar_solicitudes,Aprobar_cursos,Aprobar_cursos_Necesidades]
		})
	 var _panel = new Ext.Panel({
            title: 'Gestión de Solicitudes y Eventos',
            border: true,
            frame: true,
            layout: 'border',
            height: '500px',
            width: '500px',
            items: [tabs],
            listeners: {
                afterrender: function() {},
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
App.RegisterModule('AprobS', new AprobS());