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
                {name: 'foto'},
				{name: 'user_log'},
                {name: 'rol_name'}
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
		var _users_grid = new Ext.grid.GridPanel({
			id: 'users_grid_id',
			height: App.GetDesktopHeigth() - 35,
			width: '60%',
            region: 'center',
			frame: true,
			store: this.__data_store,
			selType: 'rowmodel',
			columns: [
                {text: "Foto", dataIndex: 'foto',renderer:img},
				{header: 'Usuario', dataIndex: 'user_name', flex: 1},
                {header: 'Log', dataIndex: 'user_log', flex: 1},
				{header: 'Rol', dataIndex: 'rol_name', flex: 1}
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
        return '<img width="64px" height="64px" src="App/Client/img/logo/user3.png"/>'}
    else{
      return '<img style="width:64 !important; height: 64 !important;" class="img-polaroid" src="data:image/png;base64,'+ val2 +'"/>'}
};