function Trabajador(){
    var me= this;
    this.__data_store = null;
    this._store_combo = null;
    var main=null;
    var filter=null;
    this.Init = function()
    {                   
        var _menu_item_config_Trabajador =
        {
            text: 'Trabajador',
            id: 'Trabajador_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla',_menu_item_config_Trabajador);
        Ext.require([
            'Ext.tip.*',
            'Ext.grid.*',
            'Ext.grid.plugin.*',
            'Ext.grid.features.*',
            'Ext.data.*',
            'Ext.ux.grid.FiltersFeature',
            'Ext.util.*',
            'Ext.toolbar.Paging',
            'Ext.ux.SlidingPager',
            'Ext.ux.PreviewPlugin',
            'Ext.ModelManager',
            'Ext.tip.QuickTipManager'
        ]);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {


        this.__data_store = App.BuildJsonStore('Trabajador.Trabajador.CargarDatos',{
            fields: [
                {name: 'id'},
                {name: 'nombre'},
                {name: 'no_identidad'},
                {name: 'apellido_1'},
                {name: 'apellido_2'},
                {name: 'fecha_nacimiento'},
                {name: 'sexo'},
                {name: 'foto'},
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
                {name: 'mbaja'},
                {name: 'activo'},
                {name:'m_bajas'},
                {name:'d_bajas'},
                {name:'especialidad'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        this.__data_store_mbaja = App.BuildJsonStore('Trabajador.Trabajador.CargarDatos_mbaja',{
                fields: [
                    {name: 'mbajas_id'},
                    {name: 'mbajas'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this.__data_store_destno = App.BuildJsonStore('Trabajador.Trabajador.CargarDatos_dbajas',{
                fields: [
                    {name: 'dbaja_id'},
                    {name: 'dbajas_nombre'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: true
            });
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
        function mostrar(val){
            if(val == '' || val == null)
                return '<div class="foto">&nbsp;</div>';
            else
                return '<img width="70px" height="70px" src="data:image/png;base64,'+val+'"/>';
        }
        var _grid = Ext.create('Ext.grid.Panel', {
            id: 'Trabajador_grid_id',
            margin: '0 5 0',
            store: this.__data_store,
            tbar: {
                id: 'Trabajador_tbar_id',
                items: ['-'],
                height: 28
            },
            columns: [
                {text: "Foto", flex: 1, dataIndex: 'foto',renderer:mostrar},
                {text: "Nombre", flex: 2, dataIndex: 'nombre'},
                {text: "Primer Apellido",flex: 2, dataIndex: 'apellido_1'},
                {text: "Segundo Apellido",flex: 2, dataIndex: 'apellido_2'},
                {text: "Fecha de Nacimiento", flex: 2,dataIndex: 'fecha_nacimiento'},
                {text: "Número de Identidad", flex: 2,dataIndex: 'no_identidad'},
                {xtype: 'checkcolumn',header: 'Activo',dataIndex: 'activo',width: 90,stopSelection: false,
                listeners:{
                    checkchange:function(This, rowIndex, checked){
                        if (checked==false){
                            var id = this.__data_store.getAt(rowIndex).data.id ;
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            _result = App.PerformSyncServerRequest('Trabajador.Trabajador.DesActivar', {id: id});
                            this.__data_store.load();
                            App.HideMsgBox();
                      }
                    },scope:this
                  }
                }
            ],
            //enableLocking: true,
            width: '100%',
            region: 'center',
            plugins: [this.cellEditing,{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<table class="table table-bordered mejorar">' ,
                    '<tr class="info">',
                    '<td>Código: {codigo}</td>',
                    '<td>Teléfono: {telefono}</td>',
                    '<td>Estado Civil: {estado_civil}</td>',
                    '</tr>',

                    ' <tr>',
                    '<td>Nombre del Padre: {nombre_padre}</td>',
                    '<td>Nombre de la Madre: {nombre_madre}</td>',
                    '<td>Código de Nómina: {codigo_nomina}</td>',
                    ' </tr>',

                    ' <tr class="info">',
                    '<td>Reparto: {reparto}</td>',
                    '<td>Dirección Particular: {direccion}</td>',
                    '<td>Nivel Cultural: {ncultural}',
                    '</tr>',

                    ' <tr>',
                    '<td>Lugar de Procedencia: {lugar_de_procedencia}</td>',
                    '<td>Registro Militar: {registro_militar}</td>',
                    '<td>Integración: {integracion}</td>',
                    ' </tr>',

                    '<tr class="info">',
                    '<td>Ubicación Excepcional: {ubicacion_excepcional}</td>',
                    '<td>Sancionado: {sancionado}</td>',
                    '<td>Estatura: {estatura}</td>',
                    '</tr>',

                    ' <tr>',
                    '<td>Sexo: {sexo}</td>',
                    '<td>Peso: {peso}</td>',
                    '<td>Talla de Camisa o Blusa: {camisa_blusa}</td>',
                    '</tr>',
                    ' <tr class="info">',
                    '<td>Talla de Pantalón o Saya: {pantalo_salla}</td>',
                    '<td>Talla de Zapato: {zapato}</td>',
                    '<td>Especialidad: {especialidad}</td>',
                    '<td></td>',
                    '</table>'
                    ,

                    {
                        formatChange: function(v){
                            var color = v >= 0 ? 'green' : 'red';
                            return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                        }
                    }
                )
            }],
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
                 },'->',{
                    xtype: 'button',
                        //text : 'Ayuda',
                        iconCls:'help',
                        handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'25%',
                            width:'50%',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El modulo <span class="label label-info">" Gestionar Trabajador"</span>' +
                                    ' le permite gestionar la informacion de todos los trabajadores de la empresa.<br>  ' +
                                    '<span class="label label-success">Debe saber que :</span><br>' +
                                    'Para poder ver toda la informacion de un trabajador debe dar click sobre el sigino de (+) que acompaña a cada trabajador.<br>'+
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
                }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('TrabajadorGestionar');
                        }
                        else
                        {
                          this.Enable('TrabajadorGestionar');
                        }

                    },
                    scope: this
                    }
            }

        });
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Trabajador',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid],
            listeners: {
                afterrender: function() {
                    this.__data_store.load({
                        /*params:{
                            start:0, 
                            limit:25
                        }*/
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
App.RegisterModule('Trabajador', new Trabajador());