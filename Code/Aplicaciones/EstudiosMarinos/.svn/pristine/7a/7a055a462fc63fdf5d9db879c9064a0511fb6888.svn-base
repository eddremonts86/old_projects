//-----------------------------------------------------------------------------
// Prototype of a module class
function LogsViewer()
{
     this.__data_store = null;
     // --------------------------------------------------------------------
     // Function for init the module
     this.Init = function() {
          var _menu_item_config =
          {
               text:'Logs',
               id: 'logs_menu_id',
               iconCls : 'report',               
               handler: Ext.Function.bind(this.ShowLogsWindow,this)
          };
          
          App.InsertMenuItem('Registro', _menu_item_config);
     }

     this.ShowLogsWindow = function()
     {
          this._owner.ActiveReport('Logs');
          App.ShowMainPanel(null);
     }

     //---------------------------------------------------------------------
     //Function Build Main Panel
     this.BuildMainPanel = function(objOptions)
     {
          this.__data_store = App.BuildJsonStore('LogsViewer.LogsViewer.ViewLogs',
		{
			fields : [
				{name : 'user_name'},
				{name : 'subsystem'},
				{name : 'module'},
				{name : 'server_function'},
				{name : 'moment'},
				{name : 'success'},
				{name : 'params'}
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
          
		var _grid = new Ext.grid.GridPanel(
		{
               title : 'Llamadas',
			id : 'logs_grid_id',
			height : '100%',
			width : '60%',
			region : 'center',
			frame: true,
			store : this.__data_store,
			selType: 'rowmodel',
			columns : [
				{header: 'Usuario', filterable: true, filter: {type : 'string'},menuDisabled: false, sortable : false, dataIndex: 'user_name', flex: 12},
				{header: 'Sistema', menuDisabled: true, sortable : false, dataIndex: 'subsystem', flex: 4},
				{header: 'Modulo', menuDisabled: true, sortable : false, dataIndex: 'module', flex: 4},
				{header: 'Funci&oacute;n', menuDisabled: true, sortable : false, dataIndex: 'server_function', flex: 12},
				{header: 'Fecha/Hora', menuDisabled: true, sortable : false, dataIndex: 'moment', flex: 10},
				{header: 'OK', menuDisabled: true, sortable : false, dataIndex: 'success', flex: 3}
			],
			viewConfig: {forceFit: true},
			bbar: Ext.create('Ext.toolbar.Paging', {
				pageSize: 25,
				store: this.__data_store,
				displayInfo: true,
				displayMsg: 'Preguntas: {0} - {1} de {2}',
				emptyMsg: "No existen preguntas definidas"
			}),
               listeners : {
                    selectionchange : function(view, selection, opt)
                    {
                         var root = Ext.getCmp('params_tree_id').getRootNode();
                         root.removeAll(true);
                         
                         if(selection.length > 0)
                              root.appendChild(selection[0].data.params)
                    }
               }
		});
          
          var _tree_params = Ext.create('Ext.tree.Panel',
          {
               id : 'params_tree_id',
               rootVisible: false,
               useArrows: true,
               frame: true,
               title: 'Par&aacute;metros',
               width:'40%',
               region:'east',
               height : '100%',
               fields : ['field', 'value'],
               columns: [{
                    xtype: 'treecolumn',
                    text: 'Campo',
                    dataIndex: 'field',
                    menuDisabled : true,
                    width: 170,
                    sortable: false
               }, {
                    text: 'Valor',
                    dataIndex: 'value',
                    menuDisabled : true,
                    flex: 1,
                    sortable: false
               }],root :
               {
                    text : 'root',
                    expanded : true
               }
          });

		var _panel = new Ext.Panel(
		{
			title : 'Registro de llamadas al servidor',
			iconCls : 'report',
			border : true,
			frame : true,
			layout : 'border',
			height : App.GetDesktopHeigth(),
			width : '100%',
			items : [_grid, _tree_params],
			listeners : { 
				afterrender : function()
				{
					this.__data_store.load({params:{start:0, limit:25}});
				}, scope : this
			}
		});

		return _panel;
     }

     //---------------------------------------------------------------------
     //Function Free Memory using
     this.Free = function() {
          this.__data_store.removeAll(true);
		delete this.__data_store;
		this.__data_store = null;
     }
}

App.GetModule('Viewer').RegisterView('Logs',  new LogsViewer());


