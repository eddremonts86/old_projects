// Function definition
function AddUser()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',
		{
			text: 'Adicionar',
			id: 'add_user_btn_id',
			iconCls: 'add',
			handler: Ext.Function.bind(this.Owner.OnAdd, this.Owner)
		});

		var tbar = Ext.getCmp('users_tbar_id');
		tbar.add(this._btn);
		tbar.add(' ');
		tbar.add('-');
	}

	this.Enable = function()
	{
		this._btn.enable();
	}

	this.Disable = function()
	{
		this._btn.disable();
	}
}

App.RegisterFunction('AddUser', new AddUser());

// Module funcions definition
AdminUsers.prototype.OnAdd = function()
{
    this.__data_store_rols = Ext.create('Ext.data.JsonStore',{
        fields: [
            {name: 'rol_name', type: 'string'}
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json'
            }
        },
        autoLoad: false
    });

    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
    var result = App.PerformSyncServerRequest('UsersManager.UsersManager.LoadRols');
    App.HideMsgBox();
    if (result)
        this.__data_store_rols.loadData(result.rows);

	var _add_user_panel = new Ext.form.Panel({

		border: true,
		frame: true,
		width: '100%',
		height: '100%',
		id: '_add_user_panel_id',
		defaults: {width: 300},
		items: [
			{
				xtype: "textfield",
				fieldLabel: "Nombre",
				name: "user_name",
				allowBlank: false
			},
			{
				xtype: "textfield",
				fieldLabel: "Identificador",
				name: "user_log",
				allowBlank: false
			},
			{
				xtype: 'label',
				html: '<br>'
			},
			{
				xtype: "textfield",
				fieldLabel: "Contrase&ntilde;a",
				id: 'pass',
				allowBlank: false,
				name: "user_pass",
				inputType: 'password'
			},
			{
				xtype: "textfield",
				fieldLabel: "Confirmaci&oacute;n",
				name: "user_pass_confirm",
				inputType: 'password',
				vtype: 'password',
				allowBlank: false,
				initialPassField: 'pass'
			},
            {
                xtype: 'combobox',
                id: 'rol',
                name: 'rol',
                fieldLabel: 'Rol',
                emptyText: 'Seleccione...',
                displayField: 'rol_name',
                store: this.__data_store_rols,
                queryMode: 'local',
                forceSelection: true,
                editable: true,
                allowBlank: false
            }
		]
	});
	var _add_win_user = new Ext.Window({
		title: 'Nuevo usuario',
		id: '_add_user_win_id',
		height: 270,
		width: 330,
		plain: true,
		closable: false,
		layout: 'fit',padding:2,
		modal: true,
		resizable: false,
		items: [_add_user_panel],
		buttons: [
			{
			    text: 'Adicionar', cls:'btn btn-primary',
			    handler: this.AddUser,
			    scope: this
			},
			{
			    text: 'Cerrar', cls:'btn btn-primary',
			    handler: function(){_add_win_user.close();}
			}
		]/*,
        listeners: {
            beforedestroy: function(This, options) {
                this.__data_store_rols.removeAll(true);
                delete this.__data_store_rols;
                this.__data_store_rols = null;
            },
            scope: this
        }*/
	});
    _add_win_user.show();
}

AdminUsers.prototype.AddUser = function()
{
	var _form = Ext.getCmp('_add_user_panel_id').getForm();

	if(_form.isValid())
	{
		App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
          var result = App.PerformSyncServerRequest('UsersManager.UsersManager.CreateUser', _form.getValues());
          App.HideMsgBox();
          
          if(result)
          {
               _form.reset();
			this.__data_store.load();
			this.Disable('ModifyUser');
			this.Disable('ModifyUserPass');
			this.Disable('DeleteUser');
          }
	}
}