// Function definition
function RolAccess()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',
		{
			text: 'Autorizar',
			id: 'rol_access_btn_id',
			iconCls: 'ok',
            disabled: true,
			handler: Ext.Function.bind(this.Owner.ChangeAccess, this.Owner)
		});

		var tbar = Ext.getCmp('subsystems_tbar_id');
		tbar.add('->');
		tbar.add('-');
		tbar.add(this._btn);
		tbar.add('-');
	}

	this.Enable = function()
	{
        this._btn.setIconCls('ok');
		this._btn.setText('Autorizar');
        this.Owner.SelectedFn = this.Owner.AllowAccess;
	}

	this.Disable = function()
	{
		this._btn.setIconCls('cancel');
		this._btn.setText('Denegar');
        this.Owner.SelectedFn = this.Owner.DeniedAccess;
	}
}

App.RegisterFunction('RolAccess', new RolAccess());

AdminRols.prototype.SelectedFn = null;

AdminRols.prototype.ChangeAccess = function()
{
     var _selected_record = Ext.getCmp('subsystems_grid_id').getSelectionModel().getLastSelected();
     var _selected_rol = Ext.getCmp('rols_grid_id').getSelectionModel().getLastSelected();
     if(!_selected_record || !_selected_rol)
          return;
     var _rol_name =_selected_rol.data.rol_name;
     var _subsystem = _selected_record.data.subsystem;
     this.SelectedFn(_selected_record, _rol_name, _subsystem);
}

// Module funcions definition
AdminRols.prototype.AllowAccess = function(_selected_record, _rol_name, _subsystem)
{
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
     var result = App.PerformSyncServerRequest('RolsManager.RolsManager.AllowAccess', {rol: _rol_name, system: _subsystem});
     App.HideMsgBox();

     if(result)
     {
          _selected_record.set('rol_access','allowed');
          this.Disable('RolAccess');
          this.Enable('ManageFunction');
//          this.Enable('ManageDomain');
     }
}

AdminRols.prototype.DeniedAccess = function(_selected_record, _rol_name, _subsystem)
{
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
     var result = App.PerformSyncServerRequest('RolsManager.RolsManager.DeniedAccess', {rol: _rol_name, system: _subsystem});
     App.HideMsgBox();

     if(result)
     {
          _selected_record.set('rol_access','denied');
          this.Enable('RolAccess');
          this.Disable('ManageFunction');
//          this.Disable('ManageDomain');
     }
}