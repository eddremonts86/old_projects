// Prototype of a module class
function AdminSystems()
{
	this.__data_store = null;

	this.__subsystems = null;
	
	// --------------------------------------------------
	// Function for init the module
	this.Init = function()
	{
		var _menu_item_config =
		{
			text:'Export/Import (Sistema)',
			id: 'systems_menu_id',
			iconCls : 'systems',
			handler: Ext.Function.bind(this.ShowMainWindow,this)
		};

		App.InsertMenuItem('Configuración del Sistema',_menu_item_config);
	}

	// --------------------------------------------------
	//Function for build the main panel of the application
	this.BuildMainPanel = function(filterObj)
	{
		this.__data_store = App.BuildJsonStore('SubsystemsManager.SubsystemsManager.LoadSystems',
		{
			fields : [
                    {name : 'subsystem'}
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

		var _systems_grid = new Ext.grid.GridPanel(
		{
			id : 'systems_grid_id',
			height : App.GetDesktopHeigth() - 35,
			width : '100%',
			frame: true,
			store : this.__data_store,
			selType: 'rowmodel',
			columns : [
				{header: 'Sistema', dataIndex: 'subsystem', sortable : false ,menuDisabled: true, flex: 1}
			],
			tbar :
			{
				id : 'systems_tbar_id',
				items: ['-'],
				height : 28
			},
			bbar: Ext.create('Ext.toolbar.Paging', {
				pageSize: 25,
				store: 	this.__data_store,
				displayInfo: true,
				displayMsg: 'Sistemas: {0} - {1} de {2}',
				emptyMsg: "No existen sistemas intergados",
				plugins: Ext.create('Ext.ux.ProgressBarPager', {})
			}),
			listeners :
			{
				selectionchange : function(view, selection, opt)
                    {
                         if(selection.length > 0)
                         {
                              this.Enable('Export');
                              this.Enable('Delete');
                              this.Enable('Override');
                         }
                         else
                         {
                              this.Disable('Export');
                              this.Disable('Delete');
                              this.Disable('Override');
                         }
                    },scope : this
			}

		});
          
		var _panel = new Ext.Panel(
		{
			title : 'Gestionar sistemas',
			border : true,
			frame : true,
			height : App.GetDesktopHeigth(),
			width : '100%',
			items : [_systems_grid],
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

App.RegisterModule('Subsystems', new AdminSystems());
