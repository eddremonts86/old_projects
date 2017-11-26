function EstimulosGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Estimulos__bt_id',
            tooltip : 'Adiciona un  nuevo Estímulo',
            iconCls: 'list_add16',
            handler: Ext.Function.bind(this.Owner.OnShowWindowcp, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Estimulos_btn_id',
            tooltip : 'Elimina el Estímulo seleccionado',
            iconCls: 'edit_delete16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectcp, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Estimulos_btn_id',
            tooltip : 'Modifica el Estímulo seleccionado',
            iconCls: 'apply16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        this._btn_his = Ext.create('Ext.Button', {
            text: 'Historial',
            id: 'his_Estimulos_btn_id',
            tooltip : 'Modifica el Estímulo seleccionado',
            iconCls: 'apply16',
            disabled: false,
            handler: function(){
                this.__data_store = App.BuildJsonStore('Estimulos.Estimulos.CargarDatos_historicos',{
                    fields: [
                        {name: 'nombre'},
                        {name: 'nombre_completo'},
                        {name: 'fecha'}
                    ],
                    groupField : 'nombre_completo',
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                    },
                    autoLoad: true
                });
                var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{groupHeaderTpl: 'Nombre Completo: {name} ' + ' ({rows.length})'});
                var _grid = new Ext.grid.Panel({
                    id: 'Estimulos_grid_id11',
                    features: [groupingFeature],
                    layout: 'fit',
                    height: 600,
                    width: 700,
                    store: this.__data_store,
                    columns: [
                        {header: 'Estimulo',menuDisabled: true,sortable : false,dataIndex: 'nombre',flex: 3},
                        {header: 'Fecha',menuDisabled: true,sortable : false,dataIndex: 'fecha',flex: 1}
                    ],
                    viewConfig: {forceFit: true},
                    bbar: {
                        xtype: 'pagingtoolbar',
                        pageSize: 10,
                        store: this.__data_store,
                        displayInfo: true,
                        plugins: new Ext.ux.ProgressBarPager()
                    }
                });
                Ext.create('Ext.window.Window', {
                    title: 'Historial de Estimulos',
                    layout: 'anchor',
                    items: _grid
                }).show();
            }
        });
        this._btn_mod_res= Ext.create('Ext.Button', {
            text: 'Informacion',
            id: 'Estimulos_btn_id',
            tooltip : 'Modifica el Estímulo seleccionado',
            iconCls: 'apply16',
            disabled: false,
            handler: Ext.Function.bind(this.Owner.win2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Estimulos_tbar_id');
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
       /* tbar.add(this._btn_his);
        tbar.add(' ');
        tbar.add('-');*/
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField',
            id:'searchField_control',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Estímulo...',
            listeners: {
                change:function(){
                    Ext.getCmp('Estimulos_grid_id').store.clearFilter();
                    Ext.getCmp('Estimulos_grid_id').store.filter("nombre", Ext.getCmp('searchField_control').getValue());
                    Ext.getCmp('Estimulos_grid_id').store.filter("ejecutor", Ext.getCmp('searchField_ejecutor').getValue());
                },scope:this
            }
        });
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField',
            id:'searchField_ejecutor',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Abreviatura...',
            listeners: {
                change:function(){
                    Ext.getCmp('Estimulos_grid_id').store.clearFilter();
                    Ext.getCmp('Estimulos_grid_id').store.filter("abe", Ext.getCmp('searchField_ejecutor').getValue());
                    Ext.getCmp('Estimulos_grid_id').store.filter("nombre", Ext.getCmp('searchField_control').getValue());
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
App.RegisterFunction('EstimulosGestionar', new EstimulosGestionar());
this.panel=null;
this.panelupd=null;
Estimulos.prototype.OnShowWindowcp = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
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
                    xtype: 'textfield',
                    name: 'stimulo',
                    id: 'stimulo',
                    fieldLabel: 'Tipo de Estímulo',
                    allowBlank: false
                },{
                    xtype: 'textfield',
                    name: 'abe',
                    id: 'abe',
                    fieldLabel: 'Abreviatura',
                    allowBlank: false
                },
                {
                fieldLabel: 'Descripción Tipo de Estímulo',
                xtype: 'textarea',
                name: 'Causa',
                id:'Causa',
                height:150,
                allowBlank: false,
                maxLength: 255
            }
            ]
        });
        var _gst_win = new Ext.Window({
                title:'Otorgar estímulo',
                id: '_gst_Add_win_id_Causa',
                name: '_gst_Add_win_id_Causa',
                height: 330,
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
Estimulos.prototype.OnShowWindow2cp = function(_paccion){
    var _value_nom_oll = null;
    var id=null;
    var _selectionModel = Ext.getCmp('Estimulos_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var abe=_selected_rcd.data.abe;
     id=_selected_rcd.data.id;
    var nombre =_selected_rcd.data.nombre;
    var descr=_selected_rcd.data.descr;


    if(_paccion == 'upd')
     {
         this.tEstimulos = App.BuildJsonStore('Estimulos.Estimulos.tEstimulos',{
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
         var Tviolacion =  Ext.create('Ext.form.ComboBox', {
             fieldLabel: 'Tipo violacion',
             name: 'tviolacion',
             id: 'tviolacion',
             allowBlank: false,
             store:this.tEstimulos,
             queryMode: 'local',
             displayField: 'nombre',
             valueField: 'id'
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
                     xtype: 'textfield',
                     name: 'stimulo',
                     id: 'stimulo',
                     fieldLabel: 'Tipo de Estímulo',
                     allowBlank: false,
                     value:nombre
                 },{
                     xtype: 'textfield',
                     name: 'abe',
                     id: 'abe',
                     fieldLabel: 'Abreviatura',
                     allowBlank: false,value:abe
                 },
                 {
                     xtype: 'textfield',
                     name: 'id',
                     id: 'id',
                     fieldLabel: 'id',
                     hidden:true,
                     allowBlank: false,value:id
                 },
                 {
                     fieldLabel: 'Descripción Tipo de Estímulo',
                     xtype: 'textarea',
                     name: 'Causa',
                     id:'Causa',
                     height:150,
                     allowBlank: false,
                     maxLength: 255,value:descr
                 }
             ]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar estímulo',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 350,
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
                         Ext.getCmp('Causa').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Estimulos.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var   _result = App.PerformSyncServerRequest('Estimulos.Estimulos.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('stimulo').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Estímulo adicionado satisfactoriamente');
        }
    }
}
Estimulos.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Estimulos.Estimulos.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Estímulo modificado satisfactoriamente');
        }
    }
 }
Estimulos.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Estimulos_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Estimulos.Estimulos.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Estímulos eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Estímulos?');

}
Estimulos.prototype.win2=function(){
    this.__data_store_cuadros_general = App.BuildJsonStore('Estimulos.Estimulos.CargarDatoscuadros1',{
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
    this.__data_store_cuadros_general2 = App.BuildJsonStore('Estimulos.Estimulos.controles1',{
        fields: [
            {name: 'nombre',header:'Estimulo'},
            {name: 'id'},
            {name: 'nombre_completo'},
            {name: 'fecha',header:'Fecha'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json',root: 'rows',totalProperty: 'results'}
        },
        autoLoad: false
    });
    var grid = Ext.create('Ext.grid.Panel', {
        id:'violaaaa',
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
            }
        }
    });
    var grid1 = Ext.create('Ext.grid.Panel', {
        layout:'anchor',
        id:'viola',
        height:572,
        name:'viola',
        store:  this.__data_store_cuadros_general2,
        columns: [
            { text: 'Nombre',  dataIndex: 'nombre',flex:1},
            { text: 'Fecha',  dataIndex: 'fecha',flex:1},
            { text: 'id',  dataIndex: 'id',flex:1,hidden:true}
        ],
        bbar: {
            xtype: 'pagingtoolbar',
            pageSize: 10,
            store: this.__data_store_cuadros_general2
        },
        listeners:{
            select:function( This, record, index, eOpts  ){
                var descripcion = record.data.descrip;
                var fecha_reactivacion = record.data.fecha_reactivacion;


                var html='<div class="contenedorB">'+
                    '<div class="contenedor_Blue">'+ fecha_reactivacion +'</div>' +
                    descripcion +'<br></div>';


                Ext.getCmp('viol1').update(html);
            }
        }
    });
    var violaciones1 = Ext.create('Ext.panel.Panel', {
        bodyPadding: 5,
        layout:'anchor',
        title: 'Descripción de Violación ',
        border:true,
        width: '100%',
        height:150,
        id:'viol1',
        bodyPadding:5,
        name:'viol1',
        autoScroll:true,
        items: [{id:'prof', autoScroll:true,name:'prof'} ]

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
        title: 'Todas los Estimulos ',
        border:true,
        width: '68%',
        height:'100%',
        id:'viol',
        bodyPadding:5,
        tools:[{type:'print',
            handler:function(){
                var a =Ext.getCmp('viola').store;
                console.log(a);
                var _selectionModel = Ext.getCmp('violaaaa').getSelectionModel();
                var _selected_rcd = _selectionModel.getLastSelected();
                _value_nom_oll=_selected_rcd.data.nombre;
                var b ="Todas las Violaciones de : <b>"+_value_nom_oll+"</b>";
                App.PrintModel(a,b);
                }
        }],
        name:'viol',
        region:'east',
        items: [grid1]

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
        title: 'Resumen de la Estimulación  de los Cuadros',
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