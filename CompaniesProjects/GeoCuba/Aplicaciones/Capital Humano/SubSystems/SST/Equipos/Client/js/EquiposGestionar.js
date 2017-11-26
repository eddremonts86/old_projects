function EquiposGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this._btn_assoc = null;    
    this._btn_real = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Equipos_btn_id',
            tooltip : 'Adiciona un nuevo Equipos de Protecci&oacute;n',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Equipos_btn_id',
            tooltip : 'Elimina el Equipos de Protecci&oacute;n seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Equipos_btn_id',
            tooltip : 'Modifica el Equipos de Protecci&oacute;n seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        this._btn_assoc = Ext.create('Ext.Button', {
            text: 'Asociar',
            id: 'asoc_Equipos_btn_id',
            tooltip : 'Asociar Equipos a Trabajador',
            iconCls: 'rebuild16',
            handler: Ext.Function.bind(this.Owner.OnAssoc, this.Owner, ['asc'])
        });
        this._btn_real = Ext.create('Ext.Button', {
            text: 'Equipos entregados',
            id: 'real_Equipos_btn_id',
            tooltip : 'Equipos a Trabajador',
            iconCls: 'view_process_all16',
            handler: Ext.Function.bind(this.Owner.OnReal, this.Owner, ['real'])
        });
        var tbar = Ext.getCmp('Equipos_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_assoc);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_real);
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
App.RegisterFunction('EquiposGestionar', new EquiposGestionar());
Equipos.prototype.OnShowWindow = function(_paccion){
    if(_paccion == 'add')
    {
        var unidad=null;
        var AreaCombo= null;        
        this.__data_store_unidad = App.BuildJsonStore('Equipos.Equipos.CargarDatosUnidad',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'nombre'
            }
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
        var __data_store_Cargo = App.BuildJsonStore('Equipos.Equipos.CargarDatosCargo',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'id_area'
            },

            {
                type: 'string',
                name: 'resolucion'
            },

            {
                type: 'string',
                name: 'cargo'
            },

            {
                type: 'string',
                name: 'id_agencia'
            },

            {
                type: 'string',
                name: 'nombre_agencia'
            },

            {
                type: 'float',
                name: 'cant'
            }
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
        var __data_store_Area = App.BuildJsonStore('Equipos.Equipos.CargarDatosArea',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'agenciaid'
            },

            {
                type: 'string',
                name: 'nombre'
            }
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
        var __data_store_AreaE = App.BuildJsonStore('',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'id_area'
            },                

            {
                type: 'string',
                name: 'resolucion'
            },

            {
                type: 'string',
                name: 'cargo'
            },

            {
                type: 'string',
                name: 'id_agencia'
            },

            {
                type: 'string',
                name: 'nombre_agencia'
            },

            {
                type: 'float',
                name: 'cant'
            }
            ],     
            proxy: {
                type: 'ajax',
                reader: {
            //                                    type: 'json',
            //                                    root: 'rows',
            //                                    totalProperty: 'results'
            }
            },
            autoLoad: false
        }); 
            
        unidad = Ext.create('Ext.form.field.ComboBox', {
            name:'unidades ',
            id:'unidades ',
            displayField: 'nombre',
            fieldLabel: 'Unidad',
            valueField: 'id',
            width:300,
            store: this.__data_store_unidad,
            emptyText:'Agencia...',
            selectOnFocus:true,
            editable:false,
            labelWidth:100,
            allowBlank: false,
            listeners: {
                change:function(){
                    var value = unidad.getValue();
                    if(value != null){                       
                        //                        __data_store_Area.enable();
                        __data_store_Cargo.clearFilter();
                        __data_store_Cargo.filter('id_agencia',value);
                        __data_store_Area.clearFilter();
                        __data_store_Area.filter('agenciaid',value);
                    }
                },
                scope:this
            }
        });
        __data_store_Cargo.filter('id_agencia','--');
        __data_store_Area.filter('agenciaid','--');
        AreaCombo = Ext.create('Ext.form.field.ComboBox', {
            name:'area',
            id:'area',
            displayField: 'nombre',
            fieldLabel: '&Aacute;rea',
            valueField: 'id',
            width:300,
            store: __data_store_Area,
            emptyText:'Áreas...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false,
            listeners: {
                change:function(){
                    var value = AreaCombo.getValue();
                    if(value != null){                       
                        //                        __data_store_Area.enable();
                        __data_store_Cargo.clearFilter();
                        __data_store_Cargo.filter('id_area',value);
                    }
                },
                scope:this
            }

        }); 
        var _grid = new Ext.grid.GridPanel(
        {
            id : 'recursos_grid_id',
            title: 'Asociar por Cargo',
            height : 190,
            width : '100%',
            frame: true,
            store : __data_store_Cargo,
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
                header: 'Id', 
                dataIndex: 'id', 
                flex: 30,
                hidden:true
            },

            {
                header: 'Cantidad', 
                dataIndex: 'cantidad', 
                flex: 30,
                hidden:true
            },{
                header: 'Cargo', 
                dataIndex: 'cargo', 
                flex: 300
            },{
                header: 'Resoluci&oacute;n', 
                dataIndex: 'resolucion', 
                flex: 300
            },
            ],
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_AreaE.add(record.data);
                    __data_store_Cargo.remove(record);
                }
            },
            stripeRows: true
        });

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });


        var columns = [
        {
            header: 'Id', 
            dataIndex: 'id', 
            flex: 30,
            hidden:true
        },{
            header: 'Cargo', 
            dataIndex: 'cargo', 
            flex: 30
        },{
            header: 'Resoluci&oacute;n', 
            dataIndex: 'resolucion', 
            flex: 30
        },{
            header: 'Cantidad', 
            dataIndex: 'cant', 
            flex: 30,
            editor: {
                allowBlank: false,
                xtype:'numberfield',
                decimalPrecision:4
            },
            renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
                var _grid = Ext.getCmp('store_grid_id').store.data.items;
                var total = 0;
                for(var i=0;i<_grid.length;i++)
                    total += _grid[i].data.cant;
                Ext.getCmp('store_grid_id').setTitle('Total:' + (total));
                return  value;
            }
        }
        ];

        var _grid2 = new Ext.grid.GridPanel(
        {
            id : 'store_grid_id',
            height : 190,
            width : '100%',
            frame: true,
            store : __data_store_AreaE,
            selType: 'rowmodel',
            columns : columns,
            title:'Total',
            //                        disabled:modificable,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                }
            },
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Cargo.add(record.data);
                    __data_store_AreaE.remove(record);
                }
            },
            stripeRows: true,
            plugins: [cellEditing]
        });               

        var _panel2 = new Ext.Panel(
        {                            
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
        
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            layout: 'vbox',
            id:'panel',
            autoScroll:true,
            name:'panel',
            items: [{
                xtype:'textfield',
                fieldLabel: 'Nombre Equipo',
                name: 'nombre_equipo',
                labelWidth:100,
                allowBlank: false,
                width:300,
                id: 'nombre_equipo'
            },{
                xtype:'numberfield',
                fieldLabel: 'Vida &Uacute;til',
                name: 'vida_util',
                labelWidth:100,
                allowBlank: false,
                emptyText:'Vida &uacute;til en meses',
                minValue:0,
                width:300,
                id: 'vida_util'
            },unidad,AreaCombo,_panel2]
        });
        
        var _gst_win = new Ext.Window({
            title:'Adicionar un Equipos de Protecci&oacute;n',
            id: '_gst_Add_win_id',
            name: '_gst_Add_win_id',
            height:'75%',
            width: '50%',
            plain: true,
            layout: 'fit',
            modal: true,
            items: [this.panel],
            buttons: [{
                text: 'Aceptar',
                id:'Axcept',
                cls:'btn btn-primary',
                handler: Ext.Function.bind(this.Add, this, [_paccion]),
                scope: this
            }, {
                text: 'Cancelar',
                cls:'btn btn-primary',
                handler: function(){
                    _gst_win.close();
                }
            }],
            listeners: {
                'show': function(This, eOpts) {
                    unidad.focus(true, true);
                }
            }
        });
        _gst_win.show();
    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Equipos.prototype.OnAssoc = function(_paccion){
    if(_paccion == 'asc')
    {
        var unidad=null;
        var AreaCombo= null;        
        this.__data_store_unidad = App.BuildJsonStore('Equipos.Equipos.CargarDatosUnidad',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'nombre'
            }
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
        var __data_store_Cargo = App.BuildJsonStore('Equipos.Equipos.CargarDatosCargo',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'id_area'
            },

            {
                type: 'string',
                name: 'resolucion'
            },

            {
                type: 'string',
                name: 'cargo'
            },

            {
                type: 'string',
                name: 'id_agencia'
            },

            {
                type: 'string',
                name: 'nombre_agencia'
            },

            {
                type: 'float',
                name: 'cant'
            }
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
        var __data_store_Trab = App.BuildJsonStore('Equipos.Equipos.CargarContratoExistente',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'id_agencia'
            },

            {
                type: 'string',
                name: 'id_area'
            },

            {
                type: 'string',
                name: 'resolucion'
            },

            {
                type: 'string',
                name: 'id_list_cargos'
            },

            {
                type: 'string',
                name: 'nombre_cargo'
            },

            {
                type: 'string',
                name: 'nombre_completo'
            }
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
        var __data_store_Area = App.BuildJsonStore('Equipos.Equipos.CargarDatosArea',{
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'agenciaid'
            },

            {
                type: 'string',
                name: 'nombre'
            }
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

        var __data_store_Equip = App.BuildJsonStore('Equipos.Equipos.CargarDatosEquipo',{
            fields: [             
            {
                type: 'string',
                name: 'nombre_equipo'
            },

            {
                type: 'float',
                name: 'cant'
            },

            {
                type: 'float',
                name: 'cantidad'
            }
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
        
        var __data_store_Equip2 = App.BuildJsonStore('Equipos.Equipos.CargarDatosEquipoExistentes',{
            fields: [
            {
                type: 'string',
                name: 'nombre_equipo'
            },

            {
                type: 'float',
                name: 'cant'
            },

            {
                type: 'float',
                name: 'cantidad'
            }
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
            
        unidad = Ext.create('Ext.form.field.ComboBox', {
            name:'unidades ',
            id:'unidades ',
            displayField: 'nombre',
            fieldLabel: 'Unidad',
            valueField: 'id',
            width:300,
            store: this.__data_store_unidad,
            emptyText:'Agencia...',
            selectOnFocus:true,
            editable:false,
            labelWidth:100,
            allowBlank: false,
            listeners: {
                change:function(){
                    var value = unidad.getValue();
                    if(value != null){                       
                        //                        __data_store_Area.enable();
                        __data_store_Cargo.clearFilter();
                        __data_store_Cargo.filter('id_agencia',value);
                        __data_store_Area.clearFilter();
                        __data_store_Area.filter('agenciaid',value);
                        __data_store_Trab.clearFilter();
                        __data_store_Trab.filter('id_agencia',value);
                    }
                },
                scope:this
            }
        });
        __data_store_Cargo.filter('id_agencia','--');
        __data_store_Area.filter('agenciaid','--');
        __data_store_Trab.filter('id_agencia','--');
        AreaCombo = Ext.create('Ext.form.field.ComboBox', {
            name:'area',
            id:'area',
            displayField: 'nombre',
            fieldLabel: '&Aacute;rea',
            valueField: 'id',
            width:300,
            store: __data_store_Area,
            emptyText:'Áreas...',
            selectOnFocus:true,
            editable:false,
            allowBlank: false,
            listeners: {
                change:function(){
                    var value = AreaCombo.getValue();
                    if(value != null){                       
                        //                        __data_store_Area.enable();
                        __data_store_Cargo.clearFilter();
                        __data_store_Cargo.filter('id_area',value);
                        __data_store_Trab.clearFilter();
                        __data_store_Trab.filter('id_area',value);
                    }
                },
                scope:this
            }

        }); 
        var _grid = new Ext.grid.GridPanel({
            id : 'recursos_grid_id',
            title: 'Asociar por Cargo',
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
                header: 'Cantidad', 
                dataIndex: 'cantidad', 
                flex: 30,
                hidden:true
            },{
                header: 'Equipo', 
                dataIndex: 'nombre_equipo', 
                flex: 30
            },{
                header: 'Cant. Existente.', 
                dataIndex: 'cant', 
                flex: 30
            },
            ],
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip2.add(record.data);
                    __data_store_Equip.remove(record);
                }
            },
            stripeRows: true
        });

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
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
                header: 'Equipo', 
                dataIndex: 'nombre_equipo', 
                flex: 30
            },

            {
                header: 'Cant. Existente.', 
                dataIndex: 'cant', 
                flex: 30
            },

            {
                header: 'Cantidad', 
                dataIndex: 'cantidad', 
                flex: 30,
                editor: {
                    allowBlank: false,
                    xtype:'numberfield',
                    decimalPrecision:4
                },
                renderer:function(value, metaData, record, rowIdx, colIdx, store, view){
                    if(value > record.data.cant){
                        record.data.cantidad = record.data.cant;
                        return record.data.cant;
                    }
                    return value;                        
                }
            }
        ],
        title:'Total',
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
        stripeRows: true,
        plugins: [cellEditing]
        });               
        var _grid3 = new Ext.grid.GridPanel({
        id : 'store2_grid_id',
        height : 190,
        width : '100%',
        frame: true,
        store : __data_store_Trab,
        selType: 'rowmodel',
        columns :[
        {
            header: 'Id', 
            dataIndex: 'id', 
            flex: 30,
            hidden:true
        },

        {
            header: 'Cargo', 
            dataIndex: 'nombre_cargo', 
            flex: 20
        },

        {
            header: 'Resol.', 
            dataIndex: 'resolucion', 
            flex: 10
        },

        {
            header: 'Nombre', 
            dataIndex: 'nombre_completo', 
            flex: 30
        }
        ],
        title:'Trabajadores',            
        stripeRows: true,
        listeners:{
            itemclick:function(This,record){
                console.log(record.data.id_list_cargos);
                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                __data_store_Equip2.removeAll();
                __data_store_Equip.load({
                    params:{
                        id_contrato:record.data.id,
                        id_cargo:record.data.id_list_cargos
                        }
                    });
            __data_store_Equip2.load({
                params:{
                    id_contrato:record.data.id,
                    id_cargo:record.data.id_list_cargos
                    }
                });
        App.HideMsgBox();
    }
    }
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
        
this.panel = Ext.create('Ext.form.Panel', {
    bodyPadding: 5,
    layout: 'vbox',
    id:'panel',
    autoScroll:true,
    name:'panel',
    items: [{
        xtype:'datefield',
        fieldLabel: 'Fecha de Asignaci&oacute;n',
        name: 'fecha_asignacion',
        labelWidth:100,
        allowBlank: false,
        width:300,
        format: 'Y-m-d',
        id: 'fecha_asignacion'
    },unidad,AreaCombo]
});
        
var _panel3 = new Ext.Panel(
{                            
    border : false,
    frame : true,
    layout : 'column',
    height : 190,
    width : '100%',
    items:[{
        columnWidth:.5,
        items:[this.panel],
        frame:true,
        style: {
            border:'0px'
        }
    },{
        items:[_grid3],
        columnWidth:.5,
        frame:true,
        style: {
            height: '100px !important',
            border:'0px'
        }
    }
    ]
});
        
var _gst_win = new Ext.Window({
    title:'Asignaci&oacute;n de Equipos de Protecci&oacute;n',
    id: '_gst_Add_win_id',
    name: '_gst_Add_win_id',
    height:'75%',
    width: '50%',
    plain: true,
    layout: 'vbox',
    modal: true,
    items: [_panel3,_panel2],
    buttons: [{
        text: 'Aceptar',
        id:'Axcept',
        cls:'btn btn-primary',
        handler: Ext.Function.bind(this.Assoc, this, [_paccion]),
        scope: this
    }, {
        text: 'Cancelar',
        cls:'btn btn-primary',
        handler: function(){
            _gst_win.close();
        }
    }],
    listeners: {
        'show': function(This, eOpts) {
            unidad.focus(true, true);
        }
    }
});
_gst_win.show();
}
else
    Ext.Msg.alert('Atención', 'Acción no definida');
}
Equipos.prototype.OnShowWindow2 = function(_paccion){
    if(_paccion == 'upd')
    {
        var unidad=null;
        var AreaCombo= null;  
        var selected = Ext.getCmp('Equipos_grid_id').getSelectionModel().getLastSelected();
        this.__data_store_unidad = App.BuildJsonStore('Equipos.Equipos.CargarDatosUnidad',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'nombre'
            }
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
        var __data_store_Cargo = App.BuildJsonStore('Equipos.Equipos.CargarDatosCargoModificar',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'id_area'
            },

            {
                type: 'string',
                name: 'resolucion'
            },

            {
                type: 'string',
                name: 'cargo'
            },

            {
                type: 'string',
                name: 'id_agencia'
            },

            {
                type: 'string',
                name: 'nombre_agencia'
            },

            {
                type: 'float',
                name: 'cant'
            }
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
        var __data_store_Area = App.BuildJsonStore('Equipos.Equipos.CargarDatosArea',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'agenciaid'
            },

            {
                type: 'string',
                name: 'nombre'
            }
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
        var __data_store_AreaE = App.BuildJsonStore('Equipos.Equipos.CargarDatosCargoExistente',
        {
            fields: [
            {
                type: 'string',
                name: 'id'
            },

            {
                type: 'string',
                name: 'id_area'
            },

            {
                type: 'string',
                name: 'resolucion'
            },

            {
                type: 'string',
                name: 'cargo'
            },

            {
                type: 'string',
                name: 'id_agencia'
            },

            {
                type: 'string',
                name: 'nombre_agencia'
            },

            {
                type: 'float',
                name: 'cant'
            }
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
        __data_store_Cargo.load({
            params:{
                id_equipo:selected.data.id
                }
            })
    __data_store_AreaE.load({
        params:{
            id_equipo:selected.data.id
            }
        })
            
unidad = Ext.create('Ext.form.field.ComboBox', {
    name:'unidades ',
    id:'unidades ',
    displayField: 'nombre',
    fieldLabel: 'Unidad',
    valueField: 'id',
    width:300,
    store: this.__data_store_unidad,
    emptyText:'Agencia...',
    selectOnFocus:true,
    editable:false,
    labelWidth:100,
    listeners: {
        change:function(){
            var value = unidad.getValue();
            if(value != null){                       
                //                        __data_store_Area.enable();
                __data_store_Cargo.clearFilter();
                __data_store_Cargo.filter('id_agencia',value);
                __data_store_Area.clearFilter();
                __data_store_Area.filter('agenciaid',value);
            }
        },
        scope:this
    }
});
__data_store_Cargo.filter('id_agencia','--');
    __data_store_Area.filter('agenciaid','--');
    AreaCombo = Ext.create('Ext.form.field.ComboBox', {
        name:'area',
        id:'area',
        displayField: 'nombre',
        fieldLabel: '&Aacute;rea',
        valueField: 'id',
        width:300,
        store: __data_store_Area,
        emptyText:'Áreas...',
        selectOnFocus:true,
        editable:false,
        listeners: {
            change:function(){
                var value = AreaCombo.getValue();
                if(value != null){                       
                    //                        __data_store_Area.enable();
                    __data_store_Cargo.clearFilter();
                    __data_store_Cargo.filter('id_area',value);
                }
            },
            scope:this
        }

    }); 
    var _grid = new Ext.grid.GridPanel(
    {
        id : 'recursos_grid_id',
        title: 'Asociar por Cargo',
        height : 190,
        width : '100%',
        frame: true,
        store : __data_store_Cargo,
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
            header: 'Id', 
            dataIndex: 'id', 
            flex: 30,
            hidden:true
        },

        {
            header: 'Cantidad', 
            dataIndex: 'cantidad', 
            flex: 30,
            hidden:true
        },{
            header: 'Cargo', 
            dataIndex: 'cargo', 
            flex: 300
        },{
            header: 'Resoluci&oacute;n', 
            dataIndex: 'resolucion', 
            flex: 300
        },
        ],
        listeners:{
            itemdblclick: function(This,record){
                __data_store_AreaE.add(record.data);
                __data_store_Cargo.remove(record);
            }
        },
        stripeRows: true
    });

    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 1
    });


    var columns = [
    {
        header: 'Id', 
        dataIndex: 'id', 
        flex: 30,
        hidden:true
    },{
        header: 'Cargo', 
        dataIndex: 'cargo', 
        flex: 30
    },{
        header: 'Resoluci&oacute;n', 
        dataIndex: 'resolucion', 
        flex: 30
    },{
        header: 'Cantidad', 
        dataIndex: 'cant', 
        flex: 30,
        editor: {
            allowBlank: false,
            xtype:'numberfield',
            decimalPrecision:4
        },
        renderer: function(value, metaData, record, rowIdx, colIdx, store, view) {
            var _grid = Ext.getCmp('store_grid_id').store.data.items;
            var total = 0;
            for(var i=0;i<_grid.length;i++)
                total += _grid[i].data.cant;
            Ext.getCmp('store_grid_id').setTitle('Total:' + (total));
            return  value;
        }
    }
    ];

    var _grid2 = new Ext.grid.GridPanel(
    {
        id : 'store_grid_id',
        height : 190,
        width : '100%',
        frame: true,
        store : __data_store_AreaE,
        selType: 'rowmodel',
        columns : columns,
        title:'Total',
        //                        disabled:modificable,
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'secondGridDDGroup',
                dropGroup: 'firstGridDDGroup'
            }
        },
        listeners:{
            itemdblclick: function(This,record){
                __data_store_Cargo.add(record.data);
                __data_store_AreaE.remove(record);
            }
        },
        stripeRows: true,
        plugins: [cellEditing]
    });               

    var _panel2 = new Ext.Panel(
    {                            
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
        
    this.panel = Ext.create('Ext.form.Panel', {
        bodyPadding: 5,
        layout: 'vbox',
        id:'panel',
        autoScroll:true,
        name:'panel',
        items: [{
            xtype:'textfield',
            fieldLabel: 'Nombre Equipo',
            name: 'nombre_equipo',
            labelWidth:100,
            allowBlank: false,
            width:300,
            id: 'nombre_equipo',
            value:selected.data.nombre_equipo
        },{
            xtype:'numberfield',
            fieldLabel: 'Vida &Uacute;til',
            name: 'vida_util',
            labelWidth:100,
            allowBlank: false,
            emptyText:'Vida &uacute;til en meses',
            minValue:0,
            width:300,
            id: 'vida_util',
            value:selected.data.vida_util
        },unidad,AreaCombo,_panel2]
    });
        
    var _gst_win = new Ext.Window({
        title:'Modificar un Equipos de Protecci&oacute;n',
        id: '_gst_Add_win_id',
        name: '_gst_Add_win_id',
        height:'75%',
        width: '50%',
        plain: true,
        layout: 'fit',
        modal: true,
        items: [this.panel],
        buttons: [{
            text: 'Aceptar',
            id:'Axcept',
            cls:'btn btn-primary',
            handler: Ext.Function.bind(this.Modid, this, [_paccion]),
            scope: this
        }, {
            text: 'Cancelar',
            cls:'btn btn-primary',
            handler: function(){
                _gst_win.close();
            }
        }],
        listeners: {
            'show': function(This, eOpts) {
                unidad.focus(true, true);
            }
        }
    });
    _gst_win.show();
}
else
    Ext.Msg.alert('Atención', 'Acción no definida');
}
Equipos.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        var _me = this,
        _array = new Array(),
        _selection = Ext.getCmp('store_grid_id').store.data.items;
		
        if (_selection.length === 0)
        {
            App.InfoMessage('Informacion','¡Debe seleccionar algún Cargo!')
        }
        else
        {
            for (var i = 0; i < _selection.length; i++)
            {
                _array.push(_selection[i].data);
            }
            var values = Ext.getCmp('panel').getForm().getValues();
            values.data = Ext.encode(_array);
            // console.log(_array);
            var fnCallBack = function() {
                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                
                var _result = App.PerformSyncServerRequest('Equipos.Equipos.Add', values);
                App.HideMsgBox();

                if(_result)
                {
                    Ext.getCmp('panel').getForm().reset();
                    Ext.getCmp('Equipos_grid_id').store.load();
                    App.InfoMessage('Información', 'Equipos de Protecci&oacute;n adicionado satisfactoriamente');
                }
            }
            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
        }
    }
}
Equipos.prototype.Assoc = function(_paccion){
    if (Ext.getCmp('panel').getForm().isValid())
    {
        var _me = this,
        _array = new Array(),
        _selection = Ext.getCmp('store_grid_id').store.data.items;
        _persona = Ext.getCmp('store2_grid_id').getSelectionModel().getLastSelected();
		 
        if (_selection.length === 0)
        {
            App.InfoMessage('Informacion','¡Debe seleccionar algún Cargo!')
        }
        else
        {
            for (var i = 0; i < _selection.length; i++)
            {
                _array.push(_selection[i].data);
            }
            var values = Ext.getCmp('panel').getForm().getValues();
            values.data = Ext.encode(_array);
            values.persona = Ext.encode(_persona.data);
            // console.log(_array);
            var fnCallBack = function() {
                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                
                var _result = App.PerformSyncServerRequest('Equipos.Equipos.AssociarEquiposAPersonas', values);
                App.HideMsgBox();

                if(_result)
                {
                    Ext.getCmp('panel').getForm().reset();
                    Ext.getCmp('Equipos_grid_id').store.load();
                    Ext.getCmp('_gst_Add_win_id').close();
                    App.InfoMessage('Información', 'Equipos de Protecci&oacute;n adicionado satisfactoriamente');
                }
            }
            App.ConfirmMessage(fnCallBack, '¿Est&aacute; seguro que desea almacenar los datos?');
        }
    }
}
Equipos.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Equipos.Equipos.Modid',this.panelupd.getForm().getValues());
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            Ext.getCmp('Equipos_grid_id').store.load();
            App.InfoMessage('Información', 'Equipos de Protecci&oacute;n modificado satisfactoriamente');
        }
    }
}
Equipos.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Equipos_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Equipos.Equipos.Eliminar', {
            id: id
        });
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('Equipos_grid_id').store.load();
            App.InfoMessage('Información', 'Equipos de Protecci&oacute;n eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Equipos de Protecci&oacute;n?');

}
Equipos.prototype.OnReal = function(_paccion){
    if(_paccion == 'real')
    {
        var unidad=null;
        var AreaCombo= null;
        this.__data_store_unidad = App.BuildJsonStore('Equipos.Equipos.CargarDatosUnidad',
            {
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre'}
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
        var __data_store_Cargo = App.BuildJsonStore('Equipos.Equipos.CargarDatosCargo',
            {
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'id_area'},
                    {type: 'string',name: 'resolucion'},
                    {type: 'string',name: 'cargo'},
                    {type: 'string',name: 'id_agencia'},
                    {type: 'string',name: 'nombre_agencia'},
                    {type: 'float',name: 'cant'}
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
        var __data_store_Trab = App.BuildJsonStore('Equipos.Equipos.CargarContratoExistente',
            {
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'id_agencia'},
                    {type: 'string',name: 'id_area'},
                    {type: 'string',name: 'resolucion'},
                    {type: 'string',name: 'id_list_cargos'},
                    {type: 'string',name: 'nombre_cargo'},
                    {type: 'string',name: 'nombre_completo'}
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
        var __data_store_Area = App.BuildJsonStore('Equipos.Equipos.CargarDatosArea',
            {
                fields: [
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'agenciaid'},
                    {type: 'string',name: 'nombre'}
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
        var __data_store_Equip = App.BuildJsonStore('Equipos.Equipos.CargarDatosEquipo',
            {
                fields: [
                    {type: 'string',name: 'nombre_equipo'},
                    {type: 'float',name: 'cant'},
                    {type: 'float',name: 'cantidad'}
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
        var __data_store_Equip2 = App.BuildJsonStore('Equipos.Equipos.CargarDatosEquipoRelacionados',
            {
                fields: [
                    {type: 'string',name: 'id_contrato'},
                    {type: 'string',name: 'id_equipo'},
                    {type: 'string',name: 'id_cargo'},
                    {type: 'string',name: 'id_agencia'},
                    {type: 'string',name: 'id_area'},
                    {type: 'string',name: 'nombre_completo'},
                    {type: 'string',name: 'nombre_equipo',header:'Equipo'},
                    {type: 'float',name: 'cantidad',header:'Cantidad asignada'},
                    {name: 'fecha_asignacion', header:'Fecha asignaci&oacute;n',type: 'date',dateFormat: 'Y-m-d'},
                    {type: 'float',name: 'vida_util', header:'Vida &Uacute;til'}

                ],
                groupField: 'nombre_completo',
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

        unidad = Ext.create('Ext.form.field.ComboBox', {
            name:'unidades ',
            id:'unidades ',
            displayField: 'nombre',
            fieldLabel: 'Unidad',
            valueField: 'id',
            width:300,
            store: this.__data_store_unidad,
            emptyText:'Agencia...',
            selectOnFocus:true,
            editable:false,
            labelWidth:100,
            listeners: {
                change:function(){
                    var value = unidad.getValue();
                    if(value != null){
                        __data_store_Equip2.clearFilter();
                        __data_store_Equip2.filter('id_agencia',value);
                        __data_store_Area.clearFilter();
                        __data_store_Area.filter('agenciaid',value);
                    }
                },
                scope:this
            }
        });
        __data_store_Cargo.filter('id_agencia','--');
        __data_store_Area.filter('agenciaid','--');
        __data_store_Trab.filter('id_agencia','--');
        AreaCombo = Ext.create('Ext.form.field.ComboBox', {
            name:'area',
            id:'area',
            displayField: 'nombre',
            fieldLabel: '&Aacute;rea',
            valueField: 'id',
            width:300,
            store: __data_store_Area,
            emptyText:'Áreas...',
            selectOnFocus:true,
            editable:false,
            listeners: {
                change:function(){
                    var value = AreaCombo.getValue();
                    if(value != null){
                        //                        __data_store_Area.enable();
                        __data_store_Equip2.clearFilter();
                        __data_store_Equip2.filter('id_area',value);
                    }
                },
                scope:this
            }

        });

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });


        var _grid2 = new Ext.grid.GridPanel(
            {
                id : 'store_grid_id',
                height : '100%',
                width : '100%',
                frame: true,
                store : __data_store_Equip2,
                features: [{ftype:'grouping',groupHeaderTpl: 'Trabajador: {name}'}],
                selType: 'rowmodel',
                columns : [
                    {header: 'Equipo',dataIndex: 'nombre_equipo',flex: 100},
                    {header: 'Cantidad asignada',dataIndex: 'cantidad',flex: 30},
                    {header: 'Vida &Uacute;til',dataIndex: 'vida_util',flex: 30},
                    {header: 'Fecha de Asignaci&oacute;n',dataIndex: 'fecha_asignacion',flex: 30,renderer: Ext.util.Format.dateRenderer('m/d/Y')}
                ],
                listeners:{
                    itemclick:function(This,record){
                        Ext.getCmp('eliminar_asociacion_id').enable();
                    }
                },
                stripeRows: true
            });

        var _panel2 = new Ext.panel.Panel(
            {
                border : false,
                frame : true,
                layout:'fit',
                width : '100%',
                height : 460,
                items:[_grid2]
            });

        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            layout: 'hbox',
            id:'panel',
            autoScroll:true,
            name:'panel',
            items: [unidad,AreaCombo]
        });

        var _gst_win = new Ext.Window({
            title:'Asignaci&oacute;n de Equipos de Protecci&oacute;n',
            id: '_gst_Add_win_id',
            name: '_gst_Add_win_id',
            height:'90%',
            width: '50%',
            plain: true,
            layout: 'vbox',
            modal: true,
            items: [this.panel,_panel2],
            buttons: [{
                text: 'Imprimir',
                id:'print',
                cls:'btn btn-primary',
                iconCls:'print',
                handler:function(){
                    App.PrintModelGruping(__data_store_Equip2,'Listado de Equipos de Protecci&oacute;n por Personas');
                },
             //   handler: App.PrintModelGruping(__data_store_Equip2,'titulo'),
                scope: this
            },{
                text: 'Aceptar',
                id:'Axcept',
                cls:'btn btn-primary',
                handler: Ext.Function.bind(this.Assoc, this, [_paccion]),
                scope: this
            },{
                text: 'Cancelar',
                cls:'btn btn-primary',
                handler: function(){
                    _gst_win.close();
                }
            },{
                text: 'Eliminar',
                id:'eliminar_asociacion_id',
                cls:'btn btn-primary',
                disable:true,
                handler: function(){
                    var me = this;
                    var fnCallBack = function() {
                        var _selected_rcd = Ext.getCmp('store_grid_id').getSelectionModel().getLastSelected();
                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                        var _result = App.PerformSyncServerRequest('Equipos.Equipos.EliminarAsociacion', _selected_rcd.data);
                        App.HideMsgBox();

                        if(_result)
                        { App.InfoMessage('Información', 'Asociaci&oacute;n eliminada correctamente');
                            me.__data_store_lcargoas.load();
                            Ext.getCmp('eliminar_asociacion_id').disable();
                        }else{
                            App.InfoMessage('Información', 'Ha ocurrido un error procesando los datos');
                        }
                    }

                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Accidente?');
                }
            }],
            listeners: {
                'show': function(This, eOpts) {
                    unidad.focus(true, true);
                }
            }
        });
        _gst_win.show();
}
else
    Ext.Msg.alert('Atención', 'Acción no definida');
}
