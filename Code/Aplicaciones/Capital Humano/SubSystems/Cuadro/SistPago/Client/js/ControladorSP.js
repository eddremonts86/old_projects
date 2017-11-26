// Prototype of a module class
function SPControler_Module()
{
    this.__data_store = null;
    this.__data_store_cuadros = null;
    this.__data_store_indicadores = null;
    // --------------------------------------------------
    // Function for init the module
    this.Init = function()
    {   Ext.require(['Ext.tab.*','Ext.ux.TabCloseMenu','Ext.selection.CellModel','Ext.grid.*','Ext.data.*','Ext.util.*','Ext.form.*' ]);
        var _menu_item_config ={
            text:'Sistema de Pago',
            id: 'indicador_menu_id',
            iconCls : 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow,this)
        };
        App.InsertMenuItem('Gestion de Cuadros',_menu_item_config);

    }
    // --------------------------------------------------
    this.ShowMainWindow = function(param)
    {
        App.ShowMainPanel(this, param);
    }
    // --------------------------------------------------
    this.BuildMainPanel = function(filterObj)
    {
            var _scope = this;
            this.__data_store_indicadores =Ext.create('Ext.data.JsonStore',{
            fields:[
                {name : 'id', type: 'integer'},
                {name : 'nombre', type: 'string'},
                {name : 'sist_pago_id', type: 'string'},
                {name: 'formador', type : 'bool'},
                {name: 'cg', type : 'bool'},
                {name: 'ce', type : 'bool'}
            ],
            proxy: {
                type: 'memory',
                reader:{
                    type: 'json'
                }
            },
            autoLoad: false
        });
            this.__data_store_sp = new Ext.data.JsonStore({
                                    fields:[
                                            {name : 'id'},
                                            {name : 'nombre', type: 'string'}
                                           ],
                                    proxy: {
                                            type: 'memory',
                                            reader:{
                                                        type: 'json'
                                                   }
                                            },
                                    autoLoad: false
                                });
            this.__data_store_cuadros = new Ext.data.JsonStore({
                                    fields:[
                                            {name : 'id',type: 'string'},
                                            {name : 'nombre', type: 'string'},
                                            {name : 'sist_pago_id', type: 'string'}
                                           ],
                                    proxy: {
                                            type: 'memory',
                                            reader:{
                                                        type: 'json'
                                                   }
                                            },
                                    autoLoad: false
                                });
            var _sm_sp = Ext.create('Ext.selection.RowModel',{
            mode:'SINGLE',
            listeners:{
                select:function(Obj,record,index,eOpts)
                {
                    this.Enable('AddTrabToSP');
                },
                scope : this
            }

        });
            var _tbar_cuadoros = new Ext.toolbar.Toolbar({
                                            width:'100%',
                                            id:'_tbar_sp_id_cuadros',
                                            height : 28,
                                            items:['-']
                                        });
            var _panel_cuadros = new Ext.grid.Panel({
                                                             title:"Listado de cuadros",
                                                             id: "_grid_cuadros_sp_id",
                                                             region:'east',
                                                             width:'30%',
                                                             collapsed:true,
                                                             collapsible:true,
                                                             height:'100%',
                                                             selModel:_sm_sp,
                                                             store:this.__data_store_cuadros,
                                                             columns: [
                                                                        {hidden:true, dataIndex: 'id'},
                                                                        {header:"Cuadros", dataIndex: 'nombre',sortable:true,flex : 99}
                                                                        ],
                                                             tbar:_tbar_cuadoros
                                                           });
            var _tbar = new Ext.toolbar.Toolbar({
                                            width:'100%',
                                            id:'_tbar_sp_id',
                                            height : 28,
                                            items:['-']
                                        });
            var _panel_sp = new Ext.grid.Panel({
                                                         title:"Registro de todos los Sistemas de Pago",
                                                         region:'center',
                                                         width:'70%',
                                                         height:'100%',
                                                         border:true,
                                                         id:'SP_todos',
                                                         name:'SP_todos',
                                                         selModel:_sm_sp,
                                                         tbar:_tbar,
                                                         store:this.__data_store_sp,
                                                         columns: [
                                                                    {hidden:true, dataIndex: 'id'},
                                                                    {header:"Nombre de sistema de pago", dataIndex: 'nombre',flex : 99}
                                                                    ],
                                                         listeners:{
                                                                    beforerender:function(This,eOpts)
                                                                                    {
                                                                                       // App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
                                                                                        
                                                                                        function Callback(response)
                                                                                        {
                                                                                            This.getStore().loadData(response.sp);
                                                                                            _panel_cuadros.getStore().loadData(response.cuadros);
                                                                                        }
                                                                                        App.PerformServerRequest('ControladorSP.SPControler.LoadData',{Params:null},Callback)
                                                                                    }
                                                                   }
                                                       });
            var _panel = new Ext.Panel({
                                        title:'Gestión de Sistema de Pago',
                                        width:'100%',
                                        height:App.GetDesktopHeigth(),
                                        frame:true,
                                        layout: {
                                                type: 'border',
                                                align: 'left'
                                                },
                                        items:[_panel_sp,_panel_cuadros],
                                        listeners: {
                                            afterrender: function(){},
                                            scope : this
                                        }
                                       });
            return _panel;
    }
    // --------------------------------------------------
    this.Free = function(){
        this.__data_store_sp.destroy();
        delete this.__data_store_sp;
        this.__data_store_sp = null;

        this.__data_store_cuadros.destroy();
        delete this.__data_store_cuadros;
        this.__data_store_cuadros = null;

        this.__data_store_indicadores.destroy();
        delete this.__data_store_indicadores;
        this.__data_store_indicadores = null;
    }


}
App.RegisterModule('SistPago', new SPControler_Module());
