// Function definition
function ImportUser()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',{
			text: 'Importar',
			id: 'import_user_btn_id',
			iconCls: 'import',
			handler: Ext.Function.bind(this.Owner.OnImport, this.Owner)
		});
		var tbar = Ext.getCmp('users_tbar_id');
		tbar.add(this._btn);
		tbar.add(' ');
		tbar.add('-');
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField',
            id:'searchField',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Filtrar por: Trabajador',
            listeners: {
                change:function(){
                    //console.log(Ext.getCmp('GradoC_grid_id').store);
                    Ext.getCmp('users_grid_id').store.clearFilter();
                    Ext.getCmp('users_grid_id').store.filter("user_name", Ext.getCmp('searchField').getValue());
                },scope:this
            }
        })
        tbar.add('-');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField1',
            id:'searchField1',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Filtrar por: Rol',
            listeners: {
                change:function(){
                    Ext.getCmp('users_grid_id').store.clearFilter();
                    Ext.getCmp('users_grid_id').store.filter("rol_name", Ext.getCmp('searchField1').getValue());

                },scope:this
            }
        })
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

App.RegisterFunction('ImportUser', new ImportUser());

// Module funcions definition
AdminUsers.prototype.OnImport = function()
{
    var _import_user_panel = new Ext.form.Panel({
		border: true,
		frame: true,
		width: '100%',
		height: '100%',
		id: '_import_user_panel_id',
		defaults: {width: 300},
        defaultType: 'textfield',
        items:[{
                fieldLabel: 'Usuario',
                name: 'usuario',
                id: 'usuario',
                xtype:'textfield',
                allowBlank:false
              },{
                fieldLabel: 'Contrase&ntilde;a',
                name: 'pass',
                id: 'pass',
                xtype:'textfield',
                inputType: 'password',
                allowBlank:false
            }]
	});

	var _import_win_user = new Ext.Window({
		title: 'Importar usuarios LDAP',
		id: '_import_user_win_id',
		height: 150,
		width: 330,
		plain: true,
		closable: false,
		layout: 'fit',
		modal: true,
		resizable: false,
		items: [_import_user_panel],
		buttons: [
			{
			    text: 'Importar',
			    handler: this.ImportUser,
			    scope: this
			},
			{
			    text: 'Cerrar',
			    handler: function(){_import_win_user.close();}
			}
		]
	});

    _import_win_user.show();
}

AdminUsers.prototype.ImportUser = function()
{
	var _form = Ext.getCmp('_import_user_panel_id').getForm();

	if(_form.isValid())
	{
		App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
          var result = App.PerformSyncServerRequest('UsersManager.UsersManager.ImportarUsuariosLdap',_form.getValues());
          App.HideMsgBox();
          
          if(result)
          {
               _form.reset();
                App.InfoMessage('Información', 'Importacion de usuarios terminada satisfactoriamente');
                Ext.getCmp('_import_user_win_id').close();
			    this.__data_store.load();
          }
          else
              App.InfoMessage('Información', 'Ocurrio un erreor inesperdo');
	}
}