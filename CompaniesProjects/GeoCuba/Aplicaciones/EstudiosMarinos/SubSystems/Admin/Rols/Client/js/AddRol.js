// Function definition
function AddRol()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',{
			text: 'Adicionar',
			id: 'add_rol_btn_id',
			iconCls: 'add',
			handler: Ext.Function.bind(this.Owner.OnAdd, this.Owner)
		});
        this._mod = Ext.create('Ext.Button',{
            text: 'Modificar',
            id: 'add_rol_btn_id_mod',
            iconCls: 'modify',
            handler: function(){
                var _selectionModel = Ext.getCmp('rols_grid_id').getSelectionModel();
                var _selected_rcd = _selectionModel.getLastSelected();
                var rol_id=_selected_rcd.data.rol_id;
                var nombre =_selected_rcd.data.rol_name;
                var rol_description =_selected_rcd.data.rol_description;
                var _add_panel = new Ext.form.Panel({
                    border: true,
                    frame: true,
                    width: '100%',
                    height: '100%',
                    id: '_add_rol_panel_id',
                    defaults: {width: 300},
                    items:
                        [
                            {
                                xtype: "textfield",
                                fieldLabel: "id",
                                name: "id",
                                id: "id",
                                allowBlank: false,
                                value:rol_id,hidden:true
                            },{
                                xtype: "textfield",
                                fieldLabel: "Nombre",
                                name: "rol_name",
                                id: "rol_name",
                                allowBlank: false,
                                value:nombre
                            },
                            {
                                xtype: "textfield",
                                fieldLabel: "Descripción",
                                name: "rol_description",
                                id: "rol_description",
                                allowBlank: false,
                                value:rol_description
                            }
                        ]
                });
                var _add_win = new Ext.Window({
                    title: 'Modificar rol',
                    id: '_add_rol_win_id_modre',
                    height: 150,
                    width: 330,
                    plain: true,
                    closable: false,
                    layout: 'fit',
                    modal: true,
                    resizable: false,
                    items: [_add_panel],
                    buttons:
                        [
                            {
                                text:'Modificar',
                                handler : function(){

                                    if (_add_panel.getForm().isValid())
                                    {
                                        var fnCallBack = function() {
                                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                            var   _result = App.PerformSyncServerRequest('RolsManager.RolsManager.Modid',_add_panel.getForm().getValues());
                                            App.HideMsgBox();
                                            if(_result)
                                            {
                                                Ext.getCmp('rols_grid_id').store.load();
                                                App.InfoMessage('Información', 'Rol modificado satisfactoriamente');
                                                _add_win.close();
                                            }
                                        }
                                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea modificar este ROL ?');
                                    }
                                    else {
                                            App.InfoMessage('Información', 'Existen probemas de conexi&oacute;n o ha intentado modificar el rol de "INVITADO" el cual no se puede borrar por motivos de seguridad');
                                        }

                                },
                                scope: this
                            },
                            {
                                text: 'Cerrar',
                                handler: function(){_add_win.close();}
                            }
                        ]
                });
                _add_win.show();
            }
        });
        this._elm = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'add_rol_btn_id_elm',
            iconCls: 'delete',
            handler: function(){
                var _selectionModel = Ext.getCmp('rols_grid_id').getSelectionModel();
                var _selected_rcd = _selectionModel.getLastSelected();
                var rol_id=_selected_rcd.data.rol_id;
                  if(rol_id){
                    var fnCallBack = function() {
                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                    var result = App.PerformSyncServerRequest('RolsManager.RolsManager.Eliminar',{rol_id:rol_id});
                    App.HideMsgBox();
                    if(result)
                    {
                        Ext.getCmp('rols_grid_id').store.load();
                        App.InfoMessage('Información', 'Rols eliminado satisfactoriamente');
                    }
                    }
                      App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este ROLS ?');
                  }
                else {
                    App.InfoMessage('Información', 'Existen probemas de conexi&oacute;n o ha intentado eliminar el rol de "INVITADO" el cual no se puede borrar por motivos de seguridad');
                }
            }
        });

		var tbar = Ext.getCmp('rols_tbar_id');
		tbar.add(this._btn);
		tbar.add(' ');
		tbar.add('-');
        tbar.add(this._mod);
		tbar.add(' ');
		tbar.add('-');
        tbar.add(this._elm);
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

App.RegisterFunction('AddRol', new AddRol());

// Module funcions definition
AdminRols.prototype.OnAdd = function(){
	var _add_panel = new Ext.form.Panel({
		border: true,
		frame: true,
		width: '100%',
		height: '100%',
		id: '_add_rol_panel_id',
		defaults: {width: 300},
		items:
		[
			{
				xtype: "textfield",
				fieldLabel: "Nombre",
				name: "rol_name",
				allowBlank: false
			},
			{
				xtype: "textfield",
				fieldLabel: "Descripción",
				name: "rol_description",
				allowBlank: false
			}
		]
	});
	var _add_win = new Ext.Window({
		title: 'Nuevo rol',
		id: '_add_rol_win_id',
		height: 150,
		width: 330,
		plain: true,
		closable: false,
		layout: 'fit',
		modal: true,
		resizable: false,
		items: [_add_panel],
		buttons:
		[
			{
			    text:'Adicionar',
			    handler : this.AddRol,
			    scope: this
			},
			{
			    text: 'Cerrar',
			    handler: function(){_add_win.close();}
			}
		]
	});
	_add_win.show();
}
AdminRols.prototype.AddRol = function(){
	var _form = Ext.getCmp('_add_rol_panel_id').getForm();
	if(_form.isValid())
	{
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
        var result = App.PerformSyncServerRequest('RolsManager.RolsManager.CreateRol', _form.getValues());
        App.HideMsgBox();
          
        if(result)
        {
            App.InfoMessage('Información', 'Se adicion&oacute; el Rol satisfactoriamente');
            _form.reset();
            this.__data_store.load();
        }
	}
    else {
        App.InfoMessage('Información', 'Debe llenar todos los campos');
    }
}