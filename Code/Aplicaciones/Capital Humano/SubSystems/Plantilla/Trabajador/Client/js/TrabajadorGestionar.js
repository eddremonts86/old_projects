function TrabajadorGestionar() {
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this._btn_uin = null;
    this.__data_storeResult=null;
    this.Render = function (Panel) {
        this._btn_add = Ext.create('Ext.Button', {
            text: 'Adicionar',
            id: 'add_Trabajador_btn_id',
            tooltip: 'Adiciona un nuevo Trabajador',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.winaddTrabajador, this.Owner, ['add'])
        });
        this._btn_uin = Ext.create('Ext.Button', {
            text: 'Usuarios Inactivos',
            id: 'uin_Trabajador_btn_id',
            tooltip: 'Listar Usuarios Inactivos',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.uinTrabajador, this.Owner, ['uin'])
        });
        this._btn_del = Ext.create('Ext.Button', {
            text: 'Eliminar',
            id: 'del_Trabajador_btn_id',
            tooltip: 'Elimina el Trabajador seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectnc, this.Owner, ['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Trabajador_btn_id',
            tooltip: 'Modifica el Trabajador seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.winupdTrabajador, this.Owner, ['upd'])
        });
        this._btn_fiel = Ext.create('Ext.Button', {
            text: 'Filtro',
            id: 'www',
            tooltip: 'Modifica',
            iconCls: 'modify',
            disabled: false,
            handler: function () {
                var grid=Ext.getCmp('Trabajador_grid_id').getStore();
                console.log(grid);
            }
        });

        var tbar = Ext.getCmp('Trabajador_tbar_id');
       // tbar.add( this._btn_fiel);
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_uin);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField',
            id:'searchField',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Trabajador...',
            listeners: {
               keypress:function(This,e,ob){
                   // console.log(e.getCharCode())
                    if(e.getCharCode() == 13)
                    {  var a = Ext.getCmp('searchField').getValue();
                       this.__data_storeResult = App.BuildJsonStore('Trabajador.Trabajador.CargarFilter',{
                                fields: [
                                    {name: 'id'},
                                    {name: 'nombre'},
                                    {name: 'foto'},
                                    {name: 'no_identidad'},
                                    {name: 'apellido_1'},
                                    {name: 'apellido_2'},
                                    {name: 'fecha_nacimiento'},
                                    {name: 'sexo'},
                                    {name: 'color_de_piel'},
                                    {name: 'estatura'},
                                    {name: 'peso'},
                                    {name: 'estado_civil'},
                                    {name: 'telefono'},
                                    {name: 'nombre_padre'},
                                    {name: 'nombre_madre'},
                                    {name: 'codigo_nomina'},
                                    {name: 'reparto'},
                                    {name: 'direccion'},
                                    {name: 'ncultural'},
                                    {name: 'lugar_de_procedencia'},
                                    {name: 'registro_militar'},
                                    {name: 'integracion'},
                                    {name: 'ubicacion_excepcional'},
                                    {name: 'sancionado'},
                                    {name: 'camisa_blusa'},
                                    {name: 'pantalo_salla'},
                                    {name: 'zapato'},
                                    {name: 'codigo'},
                                    {name: 'dbaja'},
                                    {name: 'mbaja'}
                                ],
                                params:{campo:a},
                                proxy: {
                                    type: 'ajax',
                                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                                },
                                autoLoad: true
                            });
                        function mostrar(val){
                            if(val == '' || val == null)
                                return '<div class="foto">&nbsp;</div>';
                            else
                                return '<img width="70px" height="70px" src="data:image/png;base64,'+val+'"/>';
                        }
                        var _gridResult = Ext.create('Ext.grid.Panel', {
                            id: 'Trabajador_grid_id_Result',
                            margin: '0 5 0',
                            store: this.__data_storeResult,
                            columns: [
                                {text: "Foto", flex: 1, dataIndex: 'foto',renderer:mostrar},
                                {text: "No Identidad", flex: 1,dataIndex: 'no_identidad'},
                                {text: "Nombre", flex: 1, dataIndex: 'nombre'},
                                {text: "Primer Apellido",flex: 1, dataIndex: 'apellido_1'},
                                {text: "Segundo Apellido",flex: 1, dataIndex: 'apellido_2'},
                                {text: "Fecha Nacimiento", flex: 1,dataIndex: 'fecha_nacimiento'},
                                {text: "Sexo",flex: 1, dataIndex: 'sexo'}
                              ],
                            width: '100%',
                            region: 'center',
                            plugins: [{
                                ptype: 'rowexpander',
                                rowBodyTpl : new Ext.XTemplate(
                                    '<p><b>Codigo:</b> {codigo}</p>',
                                    '<p><b>Telefono:</b> {telefono}</p>',
                                    '<p><b>Nombre del Padre:</b> {nombre_padre}</p>',
                                    '<p><b>Nombre de la Madre:</b> {nombre_madre}</p>',
                                    '<p><b>Codigo de Nomina:</b> {codigo_nomina}</p>',
                                    '<p><b>Reparto:</b> {reparto}</p>',
                                    '<p><b>Color de Piel:</b> {color_de_piel}</p>',
                                    '<p><b>Etatura:</b> {estatura}</p>',
                                    '<p><b>Peso:</b> {peso}</p>',
                                    '<p><b>Estado civil:</b> {estado_civil}</p>',
                                    '<p><b>Direccion Particular:</b> {direccion}</p>',
                                    '<p><b>Nivel Cultural:</b> {ncultural}</p>',
                                    '<p><b>Lugar de Procedencia:</b> {lugar_de_procedencia}</p>',
                                    '<p><b>Registro militar:</b> {registro_militar}</p>',
                                    '<p><b>Integracion:</b> {integracion}</p>',
                                    '<p><b>Ubicacion Exepcional:</b> {ubicacion_excepcional}</p>',
                                    '<p><b>Sancionado:</b> {sancionado}</p>',
                                    '<p><b>Talla de camisa o blusa:</b> {camisa_blusa}</p>',
                                    '<p><b>Talla de pantalon o salla:</b> {pantalo_salla}</p>',
                                    '<p><b>Talla de zapato:</b> {zapato}</p>',
                                    {
                                        formatChange: function(v){
                                            var color = v >= 0 ? 'green' : 'red';
                                            return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                                        }
                                    })
                            }],//
                            bbar: {
                                xtype: 'pagingtoolbar',
                                pageSize: 10,
                                store: this.__data_storeResult,
                                displayInfo: true,
                                plugins: new Ext.ux.ProgressBarPager()
                            }
//

                        });

                        var _panel = new Ext.Panel(
                            {   layout: 'border',
                                height: App.GetDesktopHeigth(),
                                width: '100%',
                                items: [_gridResult]
                            });

                        Ext.create('Ext.window.Window', {
                            title: 'Listado de Trabajadores',
                            height: 300,
                            width: 900,
                            layout: 'fit',
                            items: [_panel]
                        }).show();



                    }
                },
                change:function(){
                   //console.log(Ext.getCmp('Trabajador_grid_id').store);
                   Ext.getCmp('Trabajador_grid_id').store.clearFilter();
                   Ext.getCmp('Trabajador_grid_id').store.filter("nombre", Ext.getCmp('searchField').getValue());
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
App.RegisterFunction('TrabajadorGestionar', new TrabajadorGestionar());
this.panel = null;
this.panelupd = null;
this._store_combo_upd = null;
var valu = null;
Trabajador.prototype.winaddTrabajador = function (_paccion) {
    var _value_nom = null;
    if (_paccion == 'add') {
        this._store_combo = App.BuildJsonStore('Trabajador.Trabajador.CargarSexo',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_contrato = App.BuildJsonStore('Trabajador.Trabajador.Cargarcolor_de_piel',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_preparacion = App.BuildJsonStore('Trabajador.Trabajador.Cargartallas_camisas_blusas',{
                fields: [
                    {name: 'id'},
                    {name: 'valor'}


                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_talla_pantalon = App.BuildJsonStore('Trabajador.Trabajador.Cargartallas_pantalon_salla',{
                fields: [
                    {name: 'id'},
                    {name: 'valor'}

                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_talla_zapato = App.BuildJsonStore('Trabajador.Trabajador.Cargartallas_zapato',{
                fields: [
                    {name: 'id'},
                    {name: 'valor'}

                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_reparto = App.BuildJsonStore('Trabajador.Trabajador.Cargarrepartos',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_proced = App.BuildJsonStore('Trabajador.Trabajador.Cargarlugar_de_procedencia',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_ncultural = App.BuildJsonStore('Trabajador.Trabajador.Cargarnivel_cultural',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}

                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_integ = App.BuildJsonStore('Trabajador.Trabajador.Cargarintegracion',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_ubic = App.BuildJsonStore('Trabajador.Trabajador.Cargarubicacionexep',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_reg = App.BuildJsonStore('Trabajador.Trabajador.Cargarregistro',{
                fields: [
                    {name: 'nombre'},
                    {name: 'id'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_escala = App.BuildJsonStore('Trabajador.Trabajador.Cargarestado_civil',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_defensa = App.BuildJsonStore('Trabajador.Trabajador.defensa',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        this._store_combo_especialidad = App.BuildJsonStore('Trabajador.Trabajador.especialidad',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
        var result = _result = App.PerformSyncServerRequest('Trabajador.Trabajador.CargarCodigo');
        var valu = result.rows;

        this.form1 = Ext.create('Ext.form.Panel', {

            id: 'form1',
            title: 'Datos Primarios',
            layout: 'column',
            defaults:{allowBlank: false},
            items: [
                {
                    columnWidth: 0.5,
                    items: [
                        {xtype: 'hidden'},                        
                        {
                            name: 'fileup',
                            id: 'fileup',
                            xtype:'filefield',
                            fieldLabel: '<div class="foto">&nbsp;</div>',
                            labelSeparator:'',
                            buttonText: '...',
                            padding : '0 0 10 0',
                            emptyText : 'Imagen (.png)',
                            listeners : {
                                change : function(UFile, value, options)
                                {
                                    if(value == undefined) return;
                                    var _dot_ptr = value.lastIndexOf('.');
                                    var _ext = value.substr(_dot_ptr + 1);
                                    _ext = _ext.toLowerCase();
                                    if(_ext != 'png')
                                    {   UFile.reset();
                                        UFile.setValue(undefined);
                                        UFile.setRawValue(undefined);
                                        Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
                                    }
                                }
                            }
                        },
                        {
                            //flex: 1,
                            xtype: 'textfield',
                            fieldLabel: 'Nombre',
                            name: 'nombre_id',
                            id: 'nombre_id',
                            allowBlank: false,
                            maxLength: 255,
                            maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Primer Apellido',
                            name: 'PrimerApellido',
                            id: 'PrimerApellido',
                            allowBlank: false,
                            maxLength: 255,
                            maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/},
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Segundo Apellido',
                            name: 'SegundoApellido',
                            id: 'SegundoApellido',
                            allowBlank: false,
                            maxLength: 255,
                            maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/},
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Número de Identidad',
                            name: 'identidad',
                            id: 'identidad',
                            allowBlank: false,
                            maxLength: 11,
                            minLength: 11,
                            maskRe: /[0123456789]/
                        }

                    ]
                },
                {
                    columnWidth: 0.5,
                    items: [
                        {
                            xtype: 'hidden'

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_cpiel_value_id',
                            id: 'combo_cpiel_value_id',
                            fieldLabel: 'Color de Piel',
                            store: this._store_combo_contrato,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_sexo_id',
                            id: 'combo_sexo_id',
                            fieldLabel: 'Sexo',
                            store: this._store_combo,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Estatura(m.cm)',
                            name: 'estatura',
                            id: 'estatura',
                            allowBlank: false,
                            maxLength: 4,
                            maskRe: /[0123456789.]/
                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_estadicivil_value_id',
                            id: 'combo_estadicivil_value_id',
                            fieldLabel: 'Estado Civil',
                            store: this._store_combo_escala,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false
                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha de Nacimiento',
                            name: 'fecha_nacimiento',
                            id: 'fecha_nacimiento',
                            allowBlank: false,
                            editable: false,
                            maxValue: new Date()
                        },
                        {//flex: 1,
                            xtype: 'textfield',
                            fieldLabel: 'Código',
                            name: 'codigo_id',
                            id: 'codigo_id',
                            allowBlank: false,
                            maxLength: 10,
                            maskRe: /[0-9]/,
                            value: valu
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Peso(Kg)',
                            name: 'Peso',
                            id: 'Peso',
                            allowBlank: false,
                            maxLength: 3,
                            maskRe: /[0123456789]/
                        }
                    ]
                }
            ]



        });
        this.form2 = Ext.create('Ext.form.Panel', {
            id: 'form2',
            title: 'Datos Secundarios',
            layout: 'column',
            items: [
                {
                    columnWidth: 0.5,
                    items: [
                        {
                            xtype: 'hidden'

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Teléfono',
                            name: 'Telefono',
                            id: 'Telefono',
                            maxLength: 15,
                            maskRe: /[0123456789 ]/
                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_reparto_value_id',
                            id: 'combo_reparto_value_id',
                            fieldLabel: 'Reparto',
                            store: this._store_combo_reparto,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Dirección Particular',
                            name: 'Direccion',
                            id: 'Direccion',
                            allowBlank: false,
                            //width:100,
                            maxLength: 250,
                            enforceMaxLength:true
                            //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_ncultural_value_id',
                            id: 'combo_ncultural_value_id',
                            fieldLabel: 'Nivel Cultural',
                            store: this._store_combo_ncultural,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nombre de la Madre',
                            name: 'madre',
                            id: 'madre',
                            allowBlank: false,
                            maxLength: 255,
                            maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/},
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nombre del Padre',
                            name: 'padre',
                            id: 'padre',
                            allowBlank: false,
                            maxLength: 255,
                            maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/}
                    ]
                },
                {
                    columnWidth: 0.5,
                    items: [
                        {
                            xtype: 'hidden'

                        },
                        {
                            xtype: 'combobox',
                            name: 'especialidad',
                            id: 'especialidad',
                            fieldLabel: 'Especialidad',
                            store: this._store_combo_especialidad,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_lugarproced_value_id',
                            id: 'combo_lugarproced_value_id',
                            fieldLabel: 'Lugar de procedencia',
                            store: this._store_combo_proced,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_registro_value_id',
                            id: 'combo_registro_value_id',
                            fieldLabel: 'Registro Militar',
                            store: this._store_combo_reg,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: 'Sancionado',
                            //name: 'Sancionado',
                            // id:'Sancionado',
                            columns: 3,
                            defaults: {
                                name: 'rating' //Each radio has the same name so the browser will make sure only one is checked at once
                            },
                            items: [
                                {
                                    inputValue: '1',
                                    boxLabel: 'Si',
                                    name: 'Sancionado'
                                },
                                {
                                    inputValue: '0',
                                    boxLabel: 'No',
                                    name: 'Sancionado'
                                }
                            ]
                        }
                    ]
                }

            ]

        });
        this.form3 = Ext.create('Ext.form.Panel', {

            id: 'form3',
            title: 'Otros Datos',
            layout: 'column',
            items: [
                {
                    columnWidth: 0.5,
                    items: [
                        {
                            xtype: 'hidden'

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_talla_camisa_value_id',
                            id: 'combo_talla_camisa_value_id',
                            fieldLabel: 'Talla de Camisa/Blusa',
                            store: this._store_combo_preparacion,
                            displayField: 'valor',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_talla_pantalon_value_id',
                            id: 'combo_talla_pantalon_value_id',
                            fieldLabel: 'Talla de Pantalón/Saya',
                            store: this._store_combo_talla_pantalon,
                            displayField: 'valor',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_talla_zapato_value_id',
                            id: 'combo_talla_zapato_value_id',
                            fieldLabel: 'Talla de Zapato',
                            store: this._store_combo_talla_zapato,
                            displayField: 'valor',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },

                        {
                            xtype: 'textfield',
                            fieldLabel: 'Código de Nómina',
                            name: 'cod_nomina',
                            id: 'cod_nomina',
                            allowBlank: false,
                            maxLength: 255,
                            maskRe: /[0123456789]/
                        }

                    ]},
                {
                    columnWidth: 0.5,
                    items: [
                        {
                            xtype: 'hidden'

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_integracion_value_id',
                            id: 'combo_integracion_value_id',
                            fieldLabel: 'Integración',
                            store: this._store_combo_integ,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_ubicacion_value_id',
                            id: 'combo_ubicacion_value_id',
                            fieldLabel: 'Ubicación Excepcional',
                            store: this._store_combo_ubic,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'combobox',
                            name: 'combo_defensa_value_id',
                            id: 'combo_defensa_value_id',
                            fieldLabel: 'Ubicación Defensa',
                            store: this._store_combo_defensa,
                            displayField: 'nombre',
                            valueField: 'id',
                            typeAhead: true,
                            queryMode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: 'Select a state...',
                            selectOnFocus: true,
                            editable: false,
                            allowBlank: false

                        },
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Fecha de inicio',
                            name: 'fecha_inicio',
                            id: 'fecha_inicio',
                            allowBlank: false,
                            editable: false,
                            maxValue: new Date()
                        },
                        {
                            fieldLabel: 'Experiencia FAR/GeoCuba(meses)',
                            name: 'meses',
                            id:'meses',
                            labelWidth: 150,
                            xtype: 'numberfield',
                            minValue: 0,
                            maxValue: 1000,allowBlank: false,
                            width: 250,
                            tooltip: 'Esperiencia FAR/GeoCuba(meses)'
                        }



                    ]
                }
            ]

        });

        this.paneladdTrabajador = Ext.create('Ext.tab.Panel', {
            xtype: 'plain-tabs',
            width: 400,
            height: 300,
            plain: true,
            margin: '5 5 0',
            defaults: {
                bodyPadding: 10,
                autoScroll: true
            },
            items: [
                {
                    title: 'Inactive Tab',
                    xtype: this.form1
                },
                {
                    xtype: this.form2
                },
                {
                    xtype: this.form3
                }
            ]
        });


        var _gst_winaddTrabajador = new Ext.Window(
            {
                title: 'Adicionar un Trabajador.',
                id: '_gst_AddTrabajador_win_id',
                height: 470,
                width: 600,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.paneladdTrabajador],
                tools:[
                    {
                        type:'help',
                        tooltip: '¿Necesita Ayuda?',
                        handler: function(event, toolEl, panel){
                            Ext.create('Ext.window.Window', {
                                title: '¿Necesita Ayuda?',
                                height:'55%',iconCls:'help',
                                width:'50%',
                                autoScroll:true,modal:true,
                                layout: 'anchor',
                                html:
                                    '<ul class="nav nav-list">' +
                                        '<li>El apartado <span class="label label-info">" Adicionar Trabajador"</span>' +
                                        ' le permite adicionar a un nuevo trabajador  a la empresa.</li>' +
                                        '<li>Posee campos importantes y obligatorios para poder llenar toda la información del trabajador: <br>' +

                                        '<span class="label label-success">Codigo :</span><br>' +
                                        'La aplicación dinamicamente genera un código nuevo para cada trabajador, pero se puede modificar segun se necesite. <br>' +

                                        '<span class="label label-success">Código de nomina :</span><br>' +
                                        'Es el código de nomina impresindible y único para cada trabajaor. <br>' +

                                        '<span class="label label-success">Fecha de inicio :</span><br>' +
                                        'Es la fecha de inicio del trabajador en la empresa debe coincidir con la fecha del primer contrato(Módulo Plantilla). <br>' +

                                        '<span class="label label-success">Esperiencia FAR/Geocuba :</span><br>' +
                                        'El tiempo de experiencia del trabajador en todas las empresas o unidades pertenecientes a la FAR. <br>' +

                                        '<span class="label label-important">Nota :</span><br>' +
                                        'Los campos restantes tambien son necesario aunque no esten descritos en la ayuda<br>' +

                                        '</li>' +
                                        '</ul>'

                            }).show();
                        }
                    }],
                buttons: [
                    {
                        text: 'Aceptar', cls: 'btn btn-primary',
                        formBind: true,
                        handler: Ext.Function.bind(this.Add, this, [_paccion]),
                        scope: this

                    },
                    {
                        text: 'Cancelar', cls: 'btn btn-primary',
                        handler: function () {
                            _gst_winaddTrabajador.close();
                        }
                    }
                ],
                listeners: {
                    'show': function (This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                        this._store_combo.load();
                        this._store_combo_contrato.load();
                        this._store_combo_preparacion.load();
                        this._store_combo_talla_pantalon.load();
                        this._store_combo_talla_zapato.load();
                        this._store_combo_reparto.load();
                        this._store_combo_proced.load();
                        this._store_combo_ncultural.load();
                        this._store_combo_integ.load();
                        this._store_combo_ubic.load();
                        this._store_combo_reg.load();
                        this._store_combo_escala.load();
                        this._store_combo_defensa.load();
                        this._store_combo_especialidad.load();
                    }, scope: this
                }
            });

        _gst_winaddTrabajador.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Trabajador.prototype.winupdTrabajador = function (_paccion) {
    var _selectionModel = Ext.getCmp('Trabajador_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
   //_value_nom_oll=_selected_rcd.data.valor;
    var valu = _selected_rcd.data.codigo;
    var _value_nom = null;
    if (_paccion == 'upd') {
        {
            this._store_combo = App.BuildJsonStore('Trabajador.Trabajador.CargarSexo',{
                    fields: [
                        {name: 'nombre'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_Mbaja = App.BuildJsonStore('Trabajador.Trabajador.Mbaja',{
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
            this._store_combo_Dbaja = App.BuildJsonStore('Trabajador.Trabajador.dbaja',{
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
            this._store_combo_contrato = App.BuildJsonStore('Trabajador.Trabajador.Cargarcolor_de_piel',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'id'}

                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_preparacion = App.BuildJsonStore('Trabajador.Trabajador.Cargartallas_camisas_blusas',{
                    fields: [
                        {name: 'valor'},
                        {name: 'id'}

                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_talla_pantalon = App.BuildJsonStore('Trabajador.Trabajador.Cargartallas_pantalon_salla',{
                    fields: [
                        {name: 'valor'},
                        {name: 'id'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_talla_zapato = App.BuildJsonStore('Trabajador.Trabajador.Cargartallas_zapato',{
                    fields: [

                        {name: 'valor'} ,
                        {name: 'id'}

                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_reparto = App.BuildJsonStore('Trabajador.Trabajador.Cargarrepartos',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'id'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_proced = App.BuildJsonStore('Trabajador.Trabajador.Cargarlugar_de_procedencia',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'id'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_ncultural = App.BuildJsonStore('Trabajador.Trabajador.Cargarnivel_cultural',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'id'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_integ = App.BuildJsonStore('Trabajador.Trabajador.Cargarintegracion',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'id'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_ubic = App.BuildJsonStore('Trabajador.Trabajador.Cargarubicacionexep',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'id'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_reg = App.BuildJsonStore('Trabajador.Trabajador.Cargarregistro',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'id'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_escala = App.BuildJsonStore('Trabajador.Trabajador.Cargarestado_civil',{
                    fields: [
                        {name: 'id'},
                        {name: 'nombre'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                    },
                    autoLoad: false
                });
            this._store_combo_especialidad = App.BuildJsonStore('Trabajador.Trabajador.especialidad',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json', root: 'rows', totalProperty: 'results'}
                },
                autoLoad: false
            });
            this.form1 = Ext.create('Ext.form.Panel', {

                id: 'form1', margin: '5 5 20',
                title: 'Datos Primarios',
                layout: 'column',
                items: [
                    {
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Código',
                                name: 'codigo_id',
                                id: 'codigo_id',
                                allowBlank: false,
                                maxLength: 10,
                                maskRe: /[0-9]/,
                                value: valu
                            },
                            {
                                //flex: 1,
                                xtype: 'textfield',
                                fieldLabel: 'Nombre',
                                name: 'nombre_id',
                                id: 'nombre_id',
                                allowBlank: false,
                                maxLength: 255,
                                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/,
                                value: _selected_rcd.data.nombre
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Primer Apellido',
                                name: 'PrimerApellido',
                                id: 'PrimerApellido',
                                allowBlank: false,
                                maxLength: 255,
                                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/,
                                value: _selected_rcd.data.apellido_1

                            },

                            {
                                xtype: 'textfield',
                                fieldLabel: 'Segundo Apellido',
                                name: 'SegundoApellido',
                                id: 'SegundoApellido',
                                allowBlank: false,
                                maxLength: 255,
                                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ]/,
                                value: _selected_rcd.data.apellido_2
                            },

                            {
                                xtype: 'textfield',
                                fieldLabel: 'Número de Identidad',
                                name: 'identidad',
                                id: 'identidad',
                                allowBlank: false,
                                maxLength: 11,
                                minLength :11,
                                maskRe: /[0123456789]/,
                                value: _selected_rcd.data.no_identidad
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Peso(Kg)',
                                name: 'Peso',
                                id: 'Peso',
                                allowBlank: false,
                                maxLength: 4,
                                maskRe: /[0123456789.]/,
                                value: _selected_rcd.data.peso
                            },
                            {
                                xtype: 'hidden',
                                name: 'old_name',
                                id: 'old_name',
                                value: _selected_rcd.data.no_identidad
                            }

                        ]
                    },
                    {
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_cpiel_value_id',
                                id: 'combo_cpiel_value_id',
                                fieldLabel: 'Color de Piel',
                                store: this._store_combo_contrato,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false,
                                value: _selected_rcd.data.color_de_piel

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_sexo_id',
                                id: 'combo_sexo_id',
                                fieldLabel: 'Sexo',
                                store: this._store_combo,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false,
                                value: _selected_rcd.data.sexo

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Estatura(m.cm)',
                                name: 'estatura',
                                id: 'estatura',
                                allowBlank: false,
                                maxLength: 4,
                                maskRe: /[0123456789.]/,
                                value: _selected_rcd.data.estatura
                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_estadicivil_value_id',
                                id: 'combo_estadicivil_value_id',
                                fieldLabel: 'Estado Civil',
                                store: this._store_combo_escala,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false,
                                value: _selected_rcd.data.estado_civil
                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha de Nacimiento',
                                name: 'fecha_nacimiento',
                                id: 'fecha_nacimiento',
                                editable: false,
                                allowBlank: false,
                                value: Ext.Date.add(new Date(_selected_rcd.data.fecha_nacimiento), Ext.Date.DAY, 1)
                            }
                        ]
                    }
                ]



            });
            this.form2 = Ext.create('Ext.form.Panel', {
                id: 'form2', margin: '5 5 20',
                title: 'Datos Secundarios',
                layout: 'column',
                items: [
                    {
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Teléfono',
                                name: 'Telefono',
                                id: 'Telefono',
                                allowBlank: false,
                                maxLength: 15,
                                maskRe: /[0123456789 ]/,
                                value: _selected_rcd.data.telefono
                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_reparto_value_id',
                                id: 'combo_reparto_value_id',
                                fieldLabel: 'Reparto',
                                store: this._store_combo_reparto,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Dirección Particular',
                                name: 'Direccion',
                                id: 'Direccion',
                                allowBlank: false,
                                //width:100,
                                maxLength: 255,
                                //maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ,. ]/
                                value: _selected_rcd.data.direccion
                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_ncultural_value_id',
                                id: 'combo_ncultural_value_id',
                                fieldLabel: 'Nivel Cultural',
                                store: this._store_combo_ncultural,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Nombre de la Madre',
                                name: 'madre',
                                id: 'madre',
                                allowBlank: false,
                                maxLength: 255,
                                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/,
                                value: _selected_rcd.data.nombre_madre

                            },
                            {
                                xtype: 'combobox',
                                name: 'especialidad',
                                id: 'especialidad',
                                fieldLabel: 'Especialidad',
                                store: this._store_combo_especialidad,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            }


                        ]
                    },
                    {
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Nombre del Padre',
                                name: 'padre',
                                id: 'padre',
                                allowBlank: false,
                                maxLength: 255,
                                maskRe: /[a-zA-ZáéíóúñÁÉÍÓÚÑ ]/,
                                value: _selected_rcd.data.nombre_padre
                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_lugarproced_value_id',
                                id: 'combo_lugarproced_value_id',
                                fieldLabel: 'Lugar de Procedencia',
                                store: this._store_combo_proced,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_registro_value_id',
                                id: 'combo_registro_value_id',
                                fieldLabel: 'Registro Militar',
                                store: this._store_combo_reg,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false
                            },
                            {
                                xtype: 'radiogroup',
                                fieldLabel: 'Sancionado',
                                name: 'Sancionado',
                                id:'Sancionado',
                                columns: 3,
                                defaults: {name: 'rating'},
                                items: [

                                    {  inputValue: '1',
                                        boxLabel: 'Si',
                                        name: 'Sancionado'
                                    },
                                    {   inputValue: '0',
                                        boxLabel: 'No',
                                        name: 'Sancionado'
                                    }
                                ]
                            }
                        ]
                    }

                ]

            });
            this.form3 = Ext.create('Ext.form.Panel', {
                id: 'form3',
                title: 'Otros Datos',
                layout: 'column',
                margin: '5 5 20',
                items: [
                    {
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_talla_camisa_value_id',
                                id: 'combo_talla_camisa_value_id',
                                fieldLabel: 'Talla de Camisa/Blusa',
                                store: this._store_combo_preparacion,
                                displayField: 'valor',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_talla_pantalon_value_id',
                                id: 'combo_talla_pantalon_value_id',
                                fieldLabel: 'Talla de Pantalón/Saya',
                                store: this._store_combo_talla_pantalon,
                                displayField: 'valor',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_talla_zapato_value_id',
                                id: 'combo_talla_zapato_value_id',
                                fieldLabel: 'Talla de Zapato',
                                store: this._store_combo_talla_zapato,
                                displayField: 'valor',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },

                            {
                                xtype: 'textfield',
                                fieldLabel: 'Código de Nómina',
                                name: 'cod_nomina',
                                id: 'cod_nomina',
                                allowBlank: false,
                                maxLength: 255,
                                maskRe: /[0123456789]/,
                                value: _selected_rcd.data.codigo_nomina
                            }

                        ]},
                    {
                        columnWidth: 0.5,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_integracion_value_id',
                                id: 'combo_integracion_value_id',
                                fieldLabel: 'Integración',
                                store: this._store_combo_integ,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_ubicacion_value_id',
                                id: 'combo_ubicacion_value_id',
                                fieldLabel: 'Ubicación Excepcional',
                                store: this._store_combo_ubic,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Fecha de inicio',
                                name: 'fecha_inicio',
                                id: 'fecha_inicio',
                                allowBlank: false,
                                editable: false,
                                maxValue: new Date()
                            },
                            {
                                fieldLabel: 'Tiempo(meses)',
                                name: 'meses',
                                id:'meses',
                                xtype: 'numberfield',
                                minValue: 0,allowBlank: false,
                                maxValue: 50,
                                tooltip: 'Enter your age'
                            }


                        ]
                    }
                ]

            });
            this.form4 = Ext.create('Ext.form.Panel', {
                id: 'form4',
                title: 'Otros Datos 2',
                layout: 'column',
                items: [
                    {   margin: '5 5 20',
                        xtype:'fieldset',
                        checkboxToggle:true,
                        title: 'Información de Baja',
                        defaultType: 'textfield',
                        collapsed: true,
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%', labelWidth:150
                        },
                        columnWidth: 0.65,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_Mbaja_value_id',
                                id: 'combo_Mbaja_value_id',
                                fieldLabel: 'Motivo de Baja',
                                store:this._store_combo_Mbaja ,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            },
                            {
                                xtype: 'combobox',
                                name: 'combo_Dbaja_value_id',
                                id: 'combo_Dbaja_value_id',
                                fieldLabel: 'Destino de la Baja',
                                store: this._store_combo_Dbaja,
                                displayField: 'nombre',
                                valueField: 'id',
                                typeAhead: true,
                                queryMode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                emptyText: 'Select a state...',
                                selectOnFocus: true,
                                editable: false,
                                allowBlank: false

                            }

                        ]},
                    {
                        xtype: 'component',
                        width: 10,
                        margin: '5 0 40'
                    },
                    {    margin: '5 0 40',
                        xtype:'fieldset',
                        checkboxToggle:true,
                        title: 'Activar o Desactivar Usuario',
                        defaultType: 'textfield',
                        collapsed: true,
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        columnWidth: 0.3,
                        items: [
                            {
                                xtype: 'hidden'

                            },
                            {
                                xtype: 'radiogroup',
                                name: 'Activo',
                                id: 'Activo',
                                columns: 3,
                                defaults: {name: 'Activo'},
                                items: [
                                    {
                                        inputValue: '1',
                                        boxLabel: 'Activar',
                                        checked: true,
                                        name: 'Activo'
                                    },
                                    {
                                        inputValue: '0',
                                        boxLabel: 'Desactivar',
                                        name: 'Activo'

                                    }
                                ]
                            }
                        ]
                    }
                ]

            });

            this.panelupdTrabajador = Ext.create('Ext.tab.Panel', {
                xtype: 'plain-tabs',
                width: 400,
                height: 300,
                id:'panelupdTrabajador',
                name:'panelupdTrabajador',
                plain: true,
                margin: '5 5 0',
                defaults: {
                    bodyPadding: 10,
                    autoScroll: true
                },
                items: [
                    {
                        title: 'Inactive Tab',
                        xtype: this.form1
                    }
                    ,
                    {
                        xtype: this.form2
                    },
                    {
                        xtype: this.form3
                    },
                    {
                        xtype: this.form4
                    }
                ]
            });
            var _gst_winupdTrabajador = new Ext.Window({
                    title: 'Modificar el Trabajador.',
                    id: '_gst_winupdTrabajador',
                    height: 400,
                    width: 700,
                    plain: true,
                    layout: 'fit',modal:true,
                    modal: true,
                    resizable: false,
                    tools:[
                        {
                            type:'help',
                            tooltip: '¿Necesita Ayuda?',
                            handler: function(event, toolEl, panel){
                                Ext.create('Ext.window.Window', {
                                    title: '¿Necesita Ayuda?',
                                    height:'55%',iconCls:'help',
                                    width:'50%',
                                    autoScroll:true,modal:true,
                                    layout: 'anchor',
                                    html:
                                        '<ul class="nav nav-list">' +
                                            '<li>El apartado <span class="label label-info">"Modificar Trabajador"</span>' +
                                            ' le permite modificar la información de un  trabajador  de la empresa.</li>' +
                                            '<li>Posee campos importantes y obligatorios para poder llenar toda la información del trabajador: <br>' +

                                            '<span class="label label-success">Codigo :</span><br>' +
                                            'La aplicación dinamicamente genera un codigo nuevo para cada trabajador, pero se puede modificar segun se necesite. <br>' +

                                            '<span class="label label-success">Código de nomina :</span><br>' +
                                            'Es el código de nomina impresindible y único para cada trabajaor. <br>' +

                                            '<span class="label label-success">Fecha de inicio :</span><br>' +
                                            'Es la fecha de inicio del trabajador en la empresa debe coincidir con la fecha del primer contrato(Módulo Plantilla). <br>' +

                                            '<span class="label label-success">Esperiencia FAR/Geocuba :</span><br>' +
                                            'El tiempo de experiencia del trabajador en todas las empresas o unidades pertenecientes a la FAR. <br>' +

                                            '<span class="label label-success">Información de baja :</span>' +
                                            '<br>Existe información sencible para dar baja  a un trabajador.' +
                                            '<br>Motivo de baja: se espone el motivo de la baja del trabajador.' +
                                            '<br>Destino de baja: se espone el destino final que tendra el trabajador una vez deje la empresa. <br>' +

                                            '<span class="label label-success">Activar o Desactivar Usuario :</span><br>' +
                                            'Indica que el trabajador sera desactivado o seguira activo en la entidad<br>' +

                                            '<span class="label label-important">Nota :</span><br>' +
                                            'Los campos restantes tambien son necesario aunque no esten disponibles en la ayuda<br>' +
                                            '</li>' +
                                            '</ul>'

                                }).show();
                            }
                        }],
                    items: [this.panelupdTrabajador],
                    buttons: [
                        {
                            text: 'Aceptar', cls: 'btn btn-primary',
                            handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                            scope: this
                        },
                        {
                            text: 'Cancelar', cls: 'btn btn-primary',
                            handler: function () {
                                _gst_winupdTrabajador.close();
                            }
                        }
                    ],
                    listeners: {
                        'show': function (This, eOpts) {
                            Ext.getCmp('nombre_id').focus(true, true);
                            this._store_combo.load();
                            this._store_combo_contrato.load();
                            this._store_combo_preparacion.load();
                            this._store_combo_talla_pantalon.load();
                            this._store_combo_talla_zapato.load();
                            this._store_combo_reparto.load();
                            this._store_combo_proced.load();
                            this._store_combo_ncultural.load();
                            this._store_combo_integ.load();
                            this._store_combo_ubic.load();
                            this._store_combo_reg.load();
                            this._store_combo_escala.load();
                            this._store_combo_especialidad.load();
                        }, scope: this
                    }
                });

            _gst_winupdTrabajador.show();
        }

    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Trabajador.prototype.Add = function (_paccion) {

    if (Ext.getCmp('form1').getForm().isValid()&&Ext.getCmp('form2').getForm().isValid()&&Ext.getCmp('form3').getForm().isValid()) {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

        var obj1 = this.form1.getForm().getValues();
        var obj2 = this.form2.getForm().getValues();
        var obj3 = this.form3.getForm().getValues();
        var obj = [];
        obj.nombre_id = obj1['nombre_id'];
        obj.codigo_id = obj1['codigo_id'];
        obj.fecha_inicio = obj3['fecha_inicio'];
        obj.meses= obj3['meses'];
        obj.combo_estadicivil_value_id = obj1['combo_estadicivil_value_id'];
        obj.combo_sexo_id = obj1['combo_sexo_id'];
        obj.combo_cpiel_value_id = obj1['combo_cpiel_value_id'];
        obj.combo_talla_camisa_value_id = obj3['combo_talla_camisa_value_id'];
        obj.combo_talla_pantalon_value_id = obj3['combo_talla_pantalon_value_id'];
        obj.combo_talla_zapato_value_id = obj3['combo_talla_zapato_value_id'];
        obj.Direccion = obj2['Direccion'];
        obj.Sancionado = obj2['Sancionado'];
        obj.especialidad = obj2['especialidad'];

        obj.combo_reparto_value_id = obj2['combo_reparto_value_id'];
        obj.combo_lugarproced_value_id = obj2['combo_lugarproced_value_id'];
        obj.combo_ncultural_value_id = obj2['combo_ncultural_value_id'];
        obj.combo_integracion_value_id = obj3['combo_integracion_value_id'];
        obj.combo_ubicacion_value_id = obj3['combo_ubicacion_value_id'];
        obj.combo_registro_value_id = obj2['combo_registro_value_id'];
        obj.estatura = obj1['estatura'];
        obj.Peso = obj1['Peso'];
        obj.Telefono = obj2['Telefono'];

        obj.cod_nomina = obj3['cod_nomina'];
        obj.identidad = obj1['identidad'];
        obj.PrimerApellido = obj1['PrimerApellido'];
        obj.fecha_nacimiento = obj1['fecha_nacimiento'];
        obj.SegundoApellido = obj1['SegundoApellido'];
        obj.madre = obj2['madre'];
        obj.padre = obj2['padre'];
        obj.defensa = obj3['combo_defensa_value_id'];
        obj.fn = "Trabajador.Trabajador.Trabajador.Add";
        App.UploadFileAdvanced("Trabajador.Trabajador.Trabajador.Add", this.form1.getForm(),obj,
                function(fp, o) {
                    Ext.getCmp('Trabajador_grid_id').store.load();
                    App.HideMsgBox();
                    Ext.getCmp('_gst_AddTrabajador_win_id').close();
                    App.InfoMessage('Información', 'Trabajador adicionado satisfactoriamente');
                },
                function(form,a){
                    App.HideMsgBox();
                    App.InfoMessage(a.result.errors[0].error, a.result.errors[0].description);
        });
            /*this.form1.getForm().submit({
                url: 'App/Server/fn_call.php?fn=Trabajador.Trabajador.Trabajador.Add',
                method:'POST',
                //waitMsg: 'Enviando Documento....',
                params:obj,
                success: function(fp, o) {
                    this.__data_store.load();
                    App.HideMsgBox();
                    Ext.getCmp('_gst_AddTrabajador_win_id').close();
                    App.InfoMessage('Información', 'Trabajador adicionado satisfactoriamente');
                },
                failure:function(form,a){
                    App.HideMsgBox();
                    App.InfoMessage('Error', 'Hubo problemas al agregar el nuevo trabajador.');
                },scope:this
            });*/
                
    }
}
Trabajador.prototype.Modid = function (_paccion,_selectionModel,_selected_rcd) {
    var panel1 = Ext.getCmp('form1').getForm().isValid();
    var panel2 = Ext.getCmp('form2').getForm().isValid();
    var panel3 = Ext.getCmp('form3').getForm().isValid();
    var panel4 = Ext.getCmp('form4').getForm().isValid();
    if (panel1 && panel2 && panel3 && panel4){
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

        var obj1 = this.form1.getForm().getValues();
        var obj2 = this.form2.getForm().getValues();
        var obj3 = this.form3.getForm().getValues();
        var obj4 = this.form4.getForm().getValues();
        var obj = [];

        obj.combo_Mbaja_value_id = obj4['combo_Mbaja_value_id'];
        obj.combo_Dbaja_value_id = obj4['combo_Dbaja_value_id'];
        obj.Activo = obj4['Activo'];

        obj.fecha_inicio = obj3['fecha_inicio'];
        obj.meses= obj3['meses'];

        obj.nombre_id = obj1['nombre_id'];
        obj.combo_estadicivil_value_id = obj1['combo_estadicivil_value_id'];
        obj.combo_sexo_id = obj1['combo_sexo_id'];
        obj.combo_cpiel_value_id = obj1['combo_cpiel_value_id'];
        obj.combo_talla_camisa_value_id = obj3['combo_talla_camisa_value_id'];
        obj.combo_talla_pantalon_value_id = obj3['combo_talla_pantalon_value_id'];
        obj.combo_talla_zapato_value_id = obj3['combo_talla_zapato_value_id'];
        obj.Direccion = obj2['Direccion'];
        obj.Sancionado = obj2['Sancionado'];
        obj.especialidad = obj2['especialidad'];
        obj.combo_reparto_value_id = obj2['combo_reparto_value_id'];
        obj.combo_lugarproced_value_id = obj2['combo_lugarproced_value_id'];
        obj.combo_ncultural_value_id = obj2['combo_ncultural_value_id'];
        obj.combo_integracion_value_id = obj3['combo_integracion_value_id'];
        obj.combo_ubicacion_value_id = obj3['combo_ubicacion_value_id'];
        obj.combo_registro_value_id = obj2['combo_registro_value_id'];
        obj.estatura = obj1['estatura'];
        obj.Peso = obj1['Peso'];
        obj.Telefono = obj2['Telefono'];

        obj.cod_nomina = obj3['cod_nomina'];
        obj.identidad = obj1['identidad'];
        obj.old_name = obj1['old_name'];
        obj.PrimerApellido = obj1['PrimerApellido'];
        obj.fecha_nacimiento = obj1['fecha_nacimiento'];
        obj.SegundoApellido = obj1['SegundoApellido'];
        obj.madre = obj2['madre'];
        obj.padre = obj2['padre'];

        var _result = App.PerformSyncServerRequest('Trabajador.Trabajador.Modif', obj);
        this.__data_store.load();
        App.HideMsgBox();

        if (_result) {
            Ext.getCmp('_gst_winupdTrabajador').close();

            this.__data_store.load();
            App.InfoMessage('Información', 'Trabajador modificado satisfactoriamente');
        }
    }
}
Trabajador.prototype.deltectnc = function (_paccion) {

    var me = this;
    var fnCallBack = function () {
        var _selected_rcd = Ext.getCmp('Trabajador_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Trabajador.Trabajador.Eliminar', {id: id});
        App.HideMsgBox();

        if (_result) {
            me.__data_store.load();
            App.InfoMessage('Información', 'Trabajador eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este trabajador?');

}
Trabajador.prototype.uinTrabajador = function (_paccion) {
    var _value_nom = null;
    if (_paccion == 'uin') {
        {
            this.btn_activ = Ext.create('Ext.Button', {
                text: 'Activar',
                disabled: true,
                id: 'btn_activ',
                tooltip: 'Activar Trabajador seleccionado',
                iconCls: 'modify',
                handler: Ext.Function.bind(this.activar, this, ['act'])
            });
            this._textF = Ext.create('Ext.form.field.Text',{
                name: 'searchField1',
                id:'searchField1',
                emptyText:'Nombre...',
                hideLabel: true,
                width: 200,
                listeners: {
                    change:function(){
                     this.__data_storeResult_gridResult_uin.clearFilter();
                     this.__data_storeResult_gridResult_uin.filter("nombre", Ext.getCmp('searchField1').getValue());
                     },scope:this
                }
            });

            this.__data_storeResult_gridResult_uin = App.BuildJsonStore('Trabajador.Trabajador.trabajador_inactivo',
                {
                    fields: [
                        {name: 'id'},
                        {name: 'nombre_completo'},
                        {name: 'no_identidad'},
                        {name: 'telefono'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                    },
                    autoLoad: true
                });

            var _gridResult_uin = Ext.create('Ext.grid.Panel', {
                id: 'Trabajador_grid_id_Result__gridResult_uin',
                margin: '0 5 0',
                store: this.__data_storeResult_gridResult_uin,
                columns: [
                    {text: "Nombre", flex: 2, dataIndex:'nombre_completo'},
                    {text: "No Identidad", flex: 2,dataIndex:'no_identidad'},
                    {text: "Telefono", flex: 1,dataIndex:'telefono'}
                ],
                width: '100%',
                region: 'center',
                bbar: {
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store: this.__data_storeResult_gridResult_uin,
                    displayInfo: true,
                    plugins: new Ext.ux.ProgressBarPager()
                },

                tbar: [this.btn_activ,this._textF],

                listeners: {
                    selectionchange: {
                        fn: function(View, selections, options) {
                            if(selections.length == 0){
                                this.btn_activ.disable();
                            }
                            else
                            {
                                this.btn_activ.enable();
                            }

                        },
                        scope: this
                    }}
            });
            var _panel_uin = new Ext.Panel(
                {   layout: 'border',
                    title:'',
                    height: App.GetDesktopHeigth(),
                    width: '100%',
                    items: [_gridResult_uin]


                });
            var uin_winupdTrabajador = new Ext.Window(
                {
                    title: 'Listado de Trabajadores Inactivos.',
                    id: 'uin_winupdTrabajador',
                    height: 450,
                    width: 900,
                    plain: true,
                    layout: 'fit',
                    modal: true,
                    tools:[
                        {
                            type:'help',
                            tooltip: '¿Necesita Ayuda?',
                            handler: function(event, toolEl, panel){
                                Ext.create('Ext.window.Window', {
                                    title: '¿Necesita Ayuda?',
                                    height:'20%',iconCls:'help',
                                    width:'50%',
                                    autoScroll:true,
                                    modal:true,
                                    layout: 'anchor',
                                    html:
                                        '<ul class="nav nav-list">' +
                                            '<li>El apartado <span class="label label-info">" Listado de Trabajadores Inactivos"</span>' +
                                            ' le permite activar trabajadores que por motivos x(Licencias o Bajas) ya no estaban trabajando en la empresa<br>' +
                                            '</li>' +
                                            '</ul>'

                                }).show();
                            }
                        }],
                    resizable: false,
                   items: [_panel_uin]
                });

            uin_winupdTrabajador.show();
        }

    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Trabajador.prototype.activar = function(_paccion){
    var me = this;
    var fnCallBack = function () {
        var _selected_rcd = Ext.getCmp('Trabajador_grid_id_Result__gridResult_uin').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Trabajador.Trabajador.Activar', {id: id});
        App.HideMsgBox();

        if (_result) {
            me.__data_store.load();
            me.__data_storeResult_gridResult_uin.load();
            App.InfoMessage('Información', 'Trabajador activado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea activar este Trabajador?');



}