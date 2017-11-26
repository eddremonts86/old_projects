// Prototype of a module class
function AdminRols()
{
	this.__data_store = null;
	this.__subsystems = null;
	this.__data_store_provincias = null;
	// --------------------------------------------------
	// Function for init the module
	this.Init = function()
	{
		var _menu_item_config =
		{
			text: 'Roles',
			id: 'rols_menu_id',
			iconCls: 'rol',
			handler: Ext.Function.bind(this.ShowMainWindow, this)
		};

		App.InsertMenuItem('Administrar', _menu_item_config);
	}
	// --------------------------------------------------
	//Function for build the main panel of the application
	this.BuildMainPanel = function(filterObj)
	{
		this.__data_store = App.BuildJsonStore('RolsManager.RolsManager.LoadRols',{
			fields: [
				{name: 'rol_id'},
				{name: 'rol_name'},
                {name: 'rol_description'},
                {name: 'subsystems'}
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
        this.__subsystems = App.BuildJsonStore('UsersManager.UsersManager.LoadSubsystems',{
            fields: [
                {name: 'subsystem'},
                {name: 'rol_access'}
            ],
            proxy: {
                type: 'memory',
                reader: {
                     root: 'rows',
                     type: 'json'
                }
            },
            autoLoad: false
        });
		var _rols_grid = new Ext.grid.Panel({
			id: 'rols_grid_id',
			height: App.GetDesktopHeigth() - 35,
			width: '60%',
            region: 'center',
			frame: true,
			store: this.__data_store,
			selType: 'rowmodel',
			columns: [
				{header: 'Roles', xtype: 'templatecolumn',tpl: "<b>"+'{rol_name}'+"<br>"+'{rol_description}'+"</b><br><div style='color:#4f596c'>Doble click para gestionar usuarios</div>", flex: 55}

			],
			tbar: {
				id: 'rols_tbar_id',
				items: ['-'],
				height : 28
			},
			bbar: Ext.create('Ext.toolbar.Paging', {
				pageSize: 25,
				store: 	this.__data_store,
				displayInfo: true,
				displayMsg: 'Roles: {0} - {1} de {2}',
				emptyMsg: "No existen roles registrados",
				plugins: Ext.create('Ext.ux.ProgressBarPager', {})
			}),
			listeners: {
				selectionchange: function(view, selection, opt) {
                     if(selection.length > 0)
                     {
                          this.__subsystems.loadData(selection[0].data.subsystems);
                          /*this.Enable('ModifyUser');
                          this.Enable('ModifyUserPass');
                          this.Enable('DeleteUser');*/
                     }
                     else
                     {
                          this.__subsystems.removeAll(false);
                          /*this.Disable('ModifyUser');
                          this.Disable('ModifyUserPass');
                          this.Disable('DeleteUser');*/
                     }
                     /*this.Disable('ManageRol');
                     this.Disable('ManageDomain');*/
                },
                itemdblclick:function( This, record, item, index, e, eOpts ){
                    var _selectionModel = Ext.getCmp('rols_grid_id').getSelectionModel();
                    var _selected_rcd = _selectionModel.getLastSelected();
                    var rol_name =_selected_rcd.data.rol_name;
                    var rol_id =_selected_rcd.data.rol_id;
                    this.__data_store_user = App.BuildJsonStore('RolsManager.RolsManager.LoadUsers',{
                        fields: [
                            {name: 'user_name'},
                            {name: 'user_id'},
                            {name: 'id'},
                            {name: 'activo',type:'boolean'},
                            {name: 'user_log'},
                            {name: 'rol_name'}
                        ],
                        params:{rol_id:rol_id},
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
                    var myGrid= Ext.create('Ext.grid.Panel', {
                        store:this.__data_store_user,
                        id:'trabajador',
                        name:'trabajador',
                        columns: [
                            { text: 'id', hidden:true, dataIndex: 'user_id'},
                            { text: 'Nombre', dataIndex: 'user_name',flex:1},
                            {xtype: 'checkcolumn',header: 'Activar',dataIndex: 'activo',width: 90,stopSelection: false}
                        ],
                        bbar: Ext.create('Ext.toolbar.Paging', {
                            pageSize: 25,
                            store: this.__data_store_user,
                            displayInfo: true,
                            displayMsg: 'Usuarios: {0} - {1} de {2}',
                            emptyMsg: "No existen trabajadores",
                            plugins: Ext.create('Ext.ux.ProgressBarPager', {})
                        })
                    });
                    var _gst_winaddCargo = new Ext.Window({
                            title:'Configuraci&oacute;n de Usuarios para el rol: '+rol_name,
                            id: '_gst_Addcargo_win_id',
                            name: '_gst_Addcargo_win_id',
                            height: '80%',
                            width: 530,
                            plain: true,
                            layout: 'fit',
                            modal: true,
                            resizable: false,
                            items: [myGrid],
                            buttons: [
                                {
                                    text: 'Aceptar',ls:'btn btn-success',cls:'btn btn-primary',
                                    handler:function(){
                                        var _selectionModel = Ext.getCmp('rols_grid_id').getSelectionModel();
                                        var _selected_rcd = _selectionModel.getLastSelected();
                                        var rol_id =_selected_rcd.data.rol_id;
                                        var mydd = Ext.getCmp('trabajador').getStore().getModifiedRecords();
                                        _array = new Array();
                                      // console.log(mydd.length)
                                        if (mydd.length === 0)
                                        {
                                            App.InfoMessage('Información', 'No ha modificado fila alguna');
                                        }
                                        else
                                        {for (var i = 0; i < mydd.length; i++)
                                        {
                                            _array.push(mydd[i].getData());
                                        }
                                            var fnCallBack = function() {
                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                var _result = App.PerformSyncServerRequest('RolsManager.RolsManager.Add', {data: Ext.encode(_array),rol_id:rol_id});
                                                App.HideMsgBox();
                                                if(_result)
                                                {
                                                    Ext.getCmp('trabajador').store.load();
                                                    App.InfoMessage('Información', 'Se ha guardado su informaci&oacute;n correctamente');
                                                   // _gst_winaddCargo.close();
                                                }
                                                else
                                                    App.InfoMessage('Información', 'Ocurri&oacute; un error');
                                            }
                                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                        }
                                    },
                                    scope: this
                                },
                                {
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
        var _systems_grid = new Ext.grid.Panel({
			id: 'subsystems_grid_id',
			height: App.GetDesktopHeigth() - 35,
			width: '40%',
            region: 'east',
			frame: true,
			store: this.__subsystems,
			selType: 'rowmodel',
			columns: [
				{
                    header: 'Sistemas',
                    dataIndex: 'subsystem',
                    flex: 4
                },
				{
                    header: 'Acceso',
                    dataIndex: 'rol_access',
                    flex: 1,
                    renderer: function(value) {
                        if(value == 'denied')
                            return '<center><div style="width: 16;height: 16" class="delete">&nbsp;</div></center>';
                        else
                            return '<center><div style="width: 16;height: 16" class="modify">&nbsp;</div></center>';
                    }
                }
			],
			tbar: {
				id: 'subsystems_tbar_id',
				items: ['-'],
				height: 28
			},
			listeners: {
				itemclick: function(view, record) {
                    if(record.data.rol_access == 'denied')
                    {
                        this.Enable('RolAccess');
                        this.Disable('ManageFunction');
//                        this.Disable('ManageDomain');
                    }
                    else
                    {
                        this.Disable('RolAccess');
                        this.Enable('ManageFunction');
//                        this.Enable('ManageDomain');
                    }
                },
                selectionchange: function(view, selection, opt) {
                    var _btn = Ext.getCmp('rol_access_btn_id');
                    if(selection.length > 0)
                    {
                        if (_btn.isDisabled())
                            _btn.setDisabled(false);
                    }
                    else
                    {
                        if (!_btn.isDisabled())
                            _btn.setDisabled(true);
                    }
                },
                scope: this
			}
		});
		var _panel = new Ext.Panel({
			title: 'Gestionar Roles',
			border: true,
			frame: true,
			layout: 'border',
			height: App.GetDesktopHeigth(),
			width: '100%',
			items: [_rols_grid, _systems_grid],
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

		this.__subsystems.removeAll(true);
		delete this.__subsystems;
		this.__subsystems = null;
                
		this.__data_store_provincias.removeAll(true);
		delete this.__data_store_provincias;
		this.__data_store_provincias = null;
	}

	// --------------------------------------------------
	this.ShowMainWindow = function()
	{
		App.ShowMainPanel(null);
	}
}

App.RegisterModule('Rols', new AdminRols());
