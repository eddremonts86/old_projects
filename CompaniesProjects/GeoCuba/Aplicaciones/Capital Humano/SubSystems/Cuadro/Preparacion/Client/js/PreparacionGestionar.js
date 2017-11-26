function PreparacionGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Preparacion__bt_id',
            tooltip : 'Adiciona un  nuevo Preparación',
            iconCls: 'list_add16',
            handler: Ext.Function.bind(this.Owner.OnShowWindowcp, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Preparacion_btn_id',
            tooltip : 'Elimina el Preparación seleccionado',
            iconCls: 'edit_delete16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectcp, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Preparacion_btn_id',
            tooltip : 'Modifica el Preparación seleccionado',
            iconCls: 'apply16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        this._btn_mod_res= Ext.create('Ext.Button', {
            text: 'Información',
            id: 'Preparacion_btn_id',
            tooltip :'',
            iconCls: 'apply16',
            disabled: false,
            handler: Ext.Function.bind(this.Owner.win2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Preparacion_tbar_id');
        tbar.add(this._btn_mod_res);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField',
            id:'searchField_control_Preparacion',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Preparación...',
            listeners: {
                change:function(){
                    Ext.getCmp('Preparacion_grid_id').store.clearFilter();
                    Ext.getCmp('Preparacion_grid_id').store.filter("nombre", Ext.getCmp('searchField_control_Preparacion').getValue());
                    Ext.getCmp('Preparacion_grid_id').store.filter("ejecutor", Ext.getCmp('searchField_ejecutor_Preparacion').getValue());
                },scope:this
            }
        });
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
App.RegisterFunction('PreparacionGestionar', new PreparacionGestionar());
this.panel=null;
this.panelupd=null;
Preparacion.prototype.OnShowWindowcp = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        this.tPreparacion = App.BuildJsonStore('Preparacion.Preparacion.tPreparacion',{
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

       this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {
                anchor: '100%'
            },
            defaultType: 'textfield',
            items: [
                {
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: 'Fecha',
                name: 'from_date_Prep',
                    allowBlank: false,
                id: 'from_date_Prep'
            },
                {
                fieldLabel: 'Preparación',
                xtype: 'textarea',
                name: 'Prep',
                id:'Prep',
                height:150,
                allowBlank: false,
                maxLength: 255
            }
            ]
        });
        var _gst_win = new Ext.Window({
                title:'Adicionar una preparación',
                id: '_gst_Add_win_id_Causa',
                name: '_gst_Add_win_id_Causa',
                height: 300,
                width: 450,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_win.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('from_date_Causa').focus(true, true);
                    }
                }
            });
        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Preparacion.prototype.OnShowWindow2cp = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Preparacion_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var causa=_selected_rcd.data.causa;
     id_tpo=_selected_rcd.data.id;
    var nombre =_selected_rcd.data.nombre;
    var fecha=_selected_rcd.data.fecha;


    if(_paccion == 'upd')
     {
         this.tPreparacion = App.BuildJsonStore('Preparacion.Preparacion.tPreparacion',{
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
         this.panelupd = Ext.create('Ext.form.Panel', {
             id: 'panelupd',
             name: 'panelupd',
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             defaults: {
                 anchor: '100%'
             },
             defaultType: 'textfield',
             items: [
                 {
                     xtype: 'datefield',
                     anchor: '100%',
                     fieldLabel: 'Fecha',
                     name: 'from_date',
                     id: 'from_date',
                     value:fecha
                 },
                 {
                     fieldLabel: 'Preparación',
                     xtype: 'textarea',
                     name: 'prepa',
                     id:'prepa',
                     height:150,
                     allowBlank: false,
                     maxLength: 255,
                     value:nombre
                 },
                 {
                     fieldLabel: 'id',
                     name: 'id_Udt_id',
                     id:'id_Udt_id',
                     allowBlank: false,
                     value:id_tpo,
                     hidden:true,
                     maxLength: 255
                 }
             ]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar esta preparación',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 300,
                 width: 450,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panelupd],
                 buttons: [{
                     text: 'Aceptar',cls:'btn btn-success',
                     handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                     scope: this
                 }, {
                     text: 'Cancelar',cls:'btn btn-primary',
                     handler: function(){
                         _gst_win.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('from_date').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Preparacion.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var   _result = App.PerformSyncServerRequest('Preparacion.Preparacion.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Preparación adicionada satisfactoriamente');
        }
    }
}
Preparacion.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Preparacion.Preparacion.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Preparación modificada satisfactoriamente');
        }
    }
 }
Preparacion.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Preparacion_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Preparacion.Preparacion.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Preparacion eliminado correctamente');
        }
    }
    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Preparación?');

}
Preparacion.prototype.win2=function(){
    this.__data_store_cuadros_general = App.BuildJsonStore('Preparacion.Preparacion.CargarDatoscuadros',{
        fields: [
            {name: 'id'},
            {name: 'nombre'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json',root: 'rows',totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store_cuadros_general2 = App.BuildJsonStore('Preparacion.Preparacion.reserva',{
        fields: [
            {name: 'cuadro_id'},
            {name: 'nombre_completo',header:'Nombre'},
            {name: 'fecha',header:'Fecha de Incorporación'},
            {name: 'observacion',header:'Observaciones'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json',root: 'rows',totalProperty: 'results'}
        },
        autoLoad: false
    });
    this.__data_store_cuadros_general3 = App.BuildJsonStore('Preparacion.Preparacion.prepa',{
        fields: [
            {name: 'cuadro_id'},
            {name: 'fecha',header:'Fecha'},
            {name: 'nombre',header:'Nombre'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json',root: 'rows',totalProperty: 'results'}
        },
        autoLoad: false
    });

    var grid = Ext.create('Ext.grid.Panel', {
        layout:'fit',
        store:  this.__data_store_cuadros_general,
        columns: [
            { text: 'Nombre',  dataIndex: 'nombre',flex:1}
        ],
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: this.__data_store_cuadros_general
        },
        listeners:{
            select:function( This, record, index, eOpts  ){
                var id = record.data.id;
                Ext.getCmp('viola').store.load( {params:{id:id}});
                Ext.getCmp('viola1').store.load( {params:{id:id}});
                var name = record.data.nombre;
                Ext.getCmp('viol1').setTitle('Todas las Preparaciones de: '+name+'');
                Ext.getCmp('viol').setTitle('Reservas de: '+name+'');
                Ext.getCmp('name_1').setValue(name);
                Ext.getCmp('name_2').setValue(name);
            }
        }
    });
    var grid1 = Ext.create('Ext.grid.Panel', {
        layout:'anchor',
        id:'viola',
        height:200,
        name:'viola',
        store:  this.__data_store_cuadros_general2,
        columns: [
            { text: 'Nombre',  dataIndex: 'nombre_completo',flex:1},
            { text: 'Fecha',  dataIndex: 'fecha',flex:1},
            { text: 'observacion',  dataIndex: 'observacion',flex:1,hidden:true}
        ],
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: this.__data_store_cuadros_general2
        },
        listeners:{
            select:function( This, record, index, eOpts  ){
                var id = record.data.cuadro_id;
                Ext.getCmp('viola1').store.load( {params:{id:id}});
                var name = record.data.nombre_completo;
                Ext.getCmp('viol1').setTitle('Todas las Preparaciones de: '+name+'');
                Ext.getCmp('name_1').setValue(name);

            }
        }
    });
    var grid2 = Ext.create('Ext.grid.Panel', {
        layout:'anchor',
        id:'viola1',
        height:305,
        name:'viola1',
        store:  this.__data_store_cuadros_general3,
        columns: [
            { text: 'Nombre',  dataIndex: 'nombre',flex:1},
            { text: 'Fecha',  dataIndex: 'fecha',flex:1}
        ],
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: this.__data_store_cuadros_general3
        }
    });

    var violaciones1 = Ext.create('Ext.panel.Panel', {
        bodyPadding: 5,
        layout:'anchor',
        title: 'Todas las Preparaciones',
        border:true,
        width: '100%',
        height:350,
        id:'viol1',
        bodyPadding:5,
        name:'viol1',
        //autoScroll:true,
        items: [grid2,{
            xtype: 'textfield',
            name: 'name_1',
            id: 'name_1',
            fieldLabel: 'Name',
            hidden:true,
            allowBlank: false

        }],
        tools:[{type:'print',
            handler:function(){
                var a =Ext.getCmp('viola1').store;
                var cc= Ext.getCmp('name_1').getValue();
                var b ="Todas las Preparaciones de : <b>"+cc+"</b>";
                App.PrintModel(a,b);
            }
        }]

    });
    var cuadros_info = Ext.create('Ext.panel.Panel', {
        bodyPadding: 5,
        title: 'Todos los Cuadros',
        width: '30%',
        id:'cuad',
        layout:'fit',
        border:true,
        bodyPadding:5,
        name:'cuad',
        region:'center',
        items: grid
    });
    var violaciones = Ext.create('Ext.panel.Panel', {
        bodyPadding: 5,
        title: 'Reservas del cuadro',
        border:true,
        width: '68%',
        height:'100%',
        id:'viol',
        bodyPadding:5,
        name:'viol',
        region:'east',
        items: [grid1,violaciones1,{
            xtype: 'textfield',
            name: 'name_2',
            id: 'name_2',
            fieldLabel: 'Name',
            hidden:true,
            allowBlank: false

        }],
        tools:[{type:'print',
            handler:function(){
                var a =Ext.getCmp('viola').store;
                var cc= Ext.getCmp('name_2').getValue();
                var b ="Todas las Reservas de : <b>"+cc+"</b>";
                App.PrintModel(a,b);
            }
        }]
    });

    var _panel = new Ext.Panel({
        border: true,
        Padding:5,
        frame: true,
        layout: 'border',
        height: '100%',
        width: '100%',
        items: [cuadros_info,violaciones],
        listeners: {
            afterrender: function() {
                this.__data_store_cuadros_general.load({params:{start:0,limit:25}});
            },
            scope : this
        }
    });
    Ext.create('Ext.window.Window', {
        title: 'Resumen de las preparacones de los Cuadros y Reservas',
        layout: 'fit',
        height: '98%',
        width: '98%',
        items:_panel,
        modal:true,
        minimizable : true,
        maximizable : true,
        closable : true,
        maximized : false
    }).show();
}