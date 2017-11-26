function ControlesGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Controles__bt_id',
            //tooltip : 'Adiciona un  nuevo Controles',
            tooltip:'<a rel="tooltip" href="#" data-original-title="Default tooltip">you probably</a>',
            iconCls: 'list_add16',
            handler: Ext.Function.bind(this.Owner.OnShowWindowcp, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Controles_btn_id',
            tooltip : 'Elimina el Controles seleccionado',
            iconCls: 'edit_delete16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectcp, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Controles_btn_id',
            tooltip : 'Modifica el Controles seleccionado',
            iconCls: 'apply16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        this._btn_mod_res= Ext.create('Ext.Button', {
            text: 'Informacion',
            id: 'mod_controles_btn_id',
            tooltip : 'Modifica el Violaciones seleccionado',
            iconCls: 'apply16',
            disabled: false,
            handler: Ext.Function.bind(this.Owner.win2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Controles_tbar_id');
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
            id:'searchField_control',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Control...',
            listeners: {
                change:function(){
                    Ext.getCmp('Controles_grid_id').store.clearFilter();
                    Ext.getCmp('Controles_grid_id').store.filter("nombre", Ext.getCmp('searchField_control').getValue());
                    Ext.getCmp('Controles_grid_id').store.filter("ejecutor", Ext.getCmp('searchField_ejecutor').getValue());
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
            emptyText:'Ejecutor...',
            listeners: {
                change:function(){
                    Ext.getCmp('Controles_grid_id').store.clearFilter();
                    Ext.getCmp('Controles_grid_id').store.filter("ejecutor", Ext.getCmp('searchField_ejecutor').getValue());
                    Ext.getCmp('Controles_grid_id').store.filter("nombre", Ext.getCmp('searchField_control').getValue());
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
    this.Print=function(){return 'dfnkdfn dlfksd fdlf ';}
}
App.RegisterFunction('ControlesGestionar', new ControlesGestionar());
this.panel=null;
this.panelupd=null;
Controles.prototype.OnShowWindowcp = function(_paccion){
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
                xtype: 'datefield',
                anchor: '100%',
                fieldLabel: 'Fecha',
                name: 'from_date',
                id: 'from_date'
            },
                {
                fieldLabel: 'Nombre',
                name: 'nombre_id',
                id:'nombre_id',
                allowBlank: false,
                maxLength: 255

            },
                {
                    fieldLabel: 'Ejecurto',
                    name: 'ejecurto',
                    id:'ejecurto',
                    allowBlank: false,
                    maxLength: 255
                }
            ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Adicionar un Control',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 200,
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
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Controles.prototype.OnShowWindow2cp = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selectionModel = Ext.getCmp('Controles_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
     id_tpo=_selected_rcd.data.id;
    var fecha=_selected_rcd.data.fecha;
    var ejecutor=_selected_rcd.data.ejecutor;

    if(_paccion == 'upd')
     {

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
                     fieldLabel: 'Controles',
                     name: 'nombre_Udt_id',
                     id:'nombre_Udt_id',
                     allowBlank: false,
                     value:_value_nom_oll,
                     maxLength: 255
                 },
                 {
                     fieldLabel: 'id',
                     name: 'id_Udt_id',
                     id:'id_Udt_id',
                     allowBlank: false,
                     value:id_tpo,
                     hidden:true,
                     maxLength: 255
                 },
                 {
                     fieldLabel: 'Ejecurto',
                     name: 'ejecurto',
                     id:'ejecurto',
                     allowBlank: false,
                     maxLength: 255,
                     value:ejecutor
                 }



             ]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar el Control',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: 200,
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
                         Ext.getCmp('nombre_Udt_id').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Controles.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var   _result = App.PerformSyncServerRequest('Controles.Controles.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Controles adicionado satisfactoriamente');
        }
    }
}
Controles.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Controles.Controles.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Controles modificado satisfactoriamente');
        }
    }
 }
Controles.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Controles_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Controles.Controles.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Controles eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Controles?');

}
Controles.prototype.win2=function(){
    this.__data_store_cuadros_general = App.BuildJsonStore('Controles.Controles.CargarDatoscuadros',{
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
    this.__data_store_cuadros_general2 = App.BuildJsonStore('Controles.Controles.controles1',{
        fields: [
            {name: 'cuadro_id'},
            {name: 'nombre_completo'},
            {name: 'nombre',header:'Violación'},
            {name: 'ejecutor',header:'Ejecutor'},
            {name: 'descrip'},
            {name: 'fecha_reactivacion',header:'Fecha'}
        ],
        proxy: {
            type: 'ajax',
            reader: {type: 'json',root: 'rows',totalProperty: 'results'}
        },
        autoLoad: false
    });
    var grid = Ext.create('Ext.grid.Panel', {
        layout:'fit',
        id:'cuadros_id',
        name:'cuadros_id',
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
        height:400,
        name:'viola',
        store:  this.__data_store_cuadros_general2,
        columns: [
            { text: 'Nombre',  dataIndex: 'nombre',flex:1},
            { text: 'ejecutor',  dataIndex: 'ejecutor',flex:1},
            { text: 'cuadro_id',  dataIndex: 'cuadro_id',flex:1,hidden:true}
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
        title: 'Todas la Violaciones',
        border:true,
        width: '68%',
        height:'100%',
        id:'viol',
        tools:[{type:'print',
                    handler:function(){

                    var a =Ext.getCmp('viola').store;
                    var _selectionModel = Ext.getCmp('cuadros_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    _value_nom_oll=_selected_rcd.data.nombre;
                    var b ="Todas las Violaciones de : <b>"+_value_nom_oll+"</b>";
                    App.PrintModel(a,b);
                }
             }],
        bodyPadding:5,
        name:'viol',
        region:'east',
        items: [grid1,violaciones1 ]

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
        title: 'Resumen de las violaciones de los Cuadros',
        layout: 'fit',
        height: '98%',
        width: '98%',
        items:_panel,
        modal:true,
        maximizable : true,
        closable : true,
        maximized : false
    }).show();
}