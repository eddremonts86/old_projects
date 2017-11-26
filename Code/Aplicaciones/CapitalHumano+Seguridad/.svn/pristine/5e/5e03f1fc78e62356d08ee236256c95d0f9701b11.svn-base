// Prototype of a module class
function AdminUsers()
{
	this.__data_store = null;

	this.__subsystems = null;
    this.__data_store_rols = null;
	
	// --------------------------------------------------
	// Function for init the module
	this.Init = function()
	{    Ext.require([
        'Ext.tip.*',
        'Ext.grid.*',
        'Ext.grid.plugin.*',
        'Ext.grid.features.*',
        'Ext.util.*',
        'Ext.toolbar.Paging',
        'Ext.ux.SlidingPager',
        'Ext.ux.PreviewPlugin',
        'Ext.ModelManager',
        'Ext.tip.QuickTipManager'
         ]);
		Ext.apply(Ext.form.field.VTypes,
		{
			password: function(val, field)
			{
				if (field.initialPassField)
				{
					var pwd = field.up('form').down('#' + field.initialPassField);
					return (val == pwd.getValue());
				}
				return true;
			},
			passwordText: 'Las contraseñas no coincicen'
		});

		var _menu_item_config =
		{
			text: 'Usuarios',
			id: 'users_menu_id',
			iconCls: 'user',
			handler: Ext.Function.bind(this.ShowMainWindow, this)
		};

		App.InsertMenuItem('Administrar', _menu_item_config);
	}

	// --------------------------------------------------
	//Function for build the main panel of the application
	this.BuildMainPanel = function(filterObj)
	{
		this.__data_store = App.BuildJsonStore('UsersManager.UsersManager.LoadUsers',{
			fields: [
				{name: 'user_name'},
                {name: 'user_id'},
                {name: 'id'},
				{name: 'user_log'},
                {name: 'rol_name'},
                {name: 'trabajador'},
                {name: 'foto_trabj'}

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
        this.__data_store_trabajadores = App.BuildJsonStore('UsersManager.UsersManager.trabajadores',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre_completo'}
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
		var _users_grid = new Ext.grid.GridPanel({
			id: 'users_grid_id',
			height: App.GetDesktopHeigth() - 35,
			width: '60%',
            region: 'center',
			frame: true,
			store: this.__data_store,
			selType: 'rowmodel',
			columns: [
                {text: "Foto", flex: 1, dataIndex: 'foto_trabj',renderer:img,flex: 10},
				{header: 'Usuario', dataIndex: 'user_name', flex: 30},
                {header: 'Trabajador', dataIndex: 'trabajador', flex: 30},
                {header: 'Identificador', dataIndex: 'user_log', flex: 30},
				{header: 'Rol', dataIndex: 'rol_name', flex: 40}
            ],
			tbar: {
				id: 'users_tbar_id',
				items: ['-'],
				height: 28
			},
			bbar: Ext.create('Ext.toolbar.Paging', {
				pageSize: 25,
				store: 	this.__data_store,
				displayInfo: true,
				displayMsg: 'Usuarios: {0} - {1} de {2}',
				emptyMsg: "No existen usuarios registrados",
				plugins: Ext.create('Ext.ux.ProgressBarPager', {})
			}),
			listeners: {
				selectionchange: function(view, selection, opt) {
                     if(selection.length > 0)
                     {
                          this.Enable('ModifyUser');
                          this.Enable('ModifyUserPass');
                          this.Enable('DeleteUser');
                     }
                     else
                     {
                          this.Disable('ModifyUser');
                          this.Disable('ModifyUserPass');
                          this.Disable('DeleteUser');
                     }
                },
                itemdblclick:function( This, record, item, index, e, eOpts ){
                    var _selectionModel = Ext.getCmp('users_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var name =_selected_rcd.data.user_name;
                    var user_id =_selected_rcd.data.user_id;
                    var myGrid= Ext.create('Ext.grid.Panel', {
                       // title: 'Simpsons',
                        store:this.__data_store_trabajadores,
                        id:'trabajador',
                        name:'trabajador',
                        columns: [
                            { text: 'id', hidden:true, dataIndex: 'id'},
                            { text: 'Nombre', dataIndex: 'nombre_completo',flex:1}
                        ],
                        height: 300,
                        width: 530,
                        bbar: Ext.create('Ext.toolbar.Paging', {
                            pageSize: 25,
                            store: this.__data_store_trabajadores,
                            displayInfo: true,
                            displayMsg: 'Usuarios: {0} - {1} de {2}',
                            emptyMsg: "No existen trabajadores",
                            plugins: Ext.create('Ext.ux.ProgressBarPager', {})
                        })
                    });

                    var _gst_winaddCargo = new Ext.Window(
                        {
                            title:'Union de Usuario: '+name,
                            id: '_gst_Addcargo_win_id',
                            name: '_gst_Addcargo_win_id',
                            height: 300,
                            width: 530,
                            plain: true,
                            layout: 'fit',
                            modal: true,
                            resizable: false,
                            items: [myGrid],
                            buttons: [{
                                text: 'Aceptar',ls:'btn btn-success',cls:'btn btn-primary',
                                handler:function(){
                                    var _selectionModel1 = Ext.getCmp('trabajador').getSelectionModel();
                                    var _selected_rcd1 = _selectionModel1.getLastSelected();
                                    var idtrabajador =_selected_rcd1.data.id;
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var union = App.PerformSyncServerRequest('UsersManager.UsersManager.unir',{idtrabajador:idtrabajador,user_id:user_id});
                                    App.HideMsgBox();
                                    if(union){
                                        Ext.getCmp('users_grid_id').store.load();
                                        App.InfoMessage('Información', 'Se a guardado su informacion corretamente');
                                        _gst_winaddCargo.close();
                                    }
                                },
                                scope: this
                            }, {
                                text: 'Cancelar',cls:'btn btn-primary',
                                handler: function(){
                                    _gst_winaddCargo.close();
                                }
                            }]
                        });
                    _gst_winaddCargo.show();
                },
                scope: this
			}
		});
		var _panel = new Ext.Panel({
			title: 'Gestionar Usuarios',
			border: true,
			frame: true,
			layout: 'border',
			height: App.GetDesktopHeigth(),
			width: '100%',
			items: [_users_grid],
            listeners:{
                afterrender : function()
                {
                    this.__data_store.load();
                }, scope: this
            }
		});
		return _panel;
	}
	this.Free = function()
	{
		this.__data_store.removeAll(true);
		delete this.__data_store;
		this.__data_store = null;
	}
	// --------------------------------------------------
	this.ShowMainWindow = function()
	{
		App.ShowMainPanel(null);
	}
}

App.RegisterModule('Users', new AdminUsers());

function img(val2){
    if(val2==''||val2==null){
        return '<img width="70px" height="70px" src="App/Client/img/logo/user3.png"/>'}
    else{
        return '<img width="70px" height="70px" src="data:image/png;base64,'+ val2 +'"/>'}
};