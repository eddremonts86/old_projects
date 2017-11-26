// Function definition
function UserAccess()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',
		{
			text : 'Autorizar',
			id : 'user_access_btn_id',
			iconCls : 'ok',
			handler : Ext.Function.bind(this.Owner.ChangeAccess,this.Owner)
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

App.RegisterFunction('UserAccess', new UserAccess());

AdminUsers.prototype.SelectedFn = null;

AdminUsers.prototype.ChangeAccess = function()
{
     var _selected_record = Ext.getCmp('subsystems_grid_id').getSelectionModel().getLastSelected();
     var _selected_user = Ext.getCmp('users_grid_id').getSelectionModel().getLastSelected();
     if(!_selected_record || !_selected_user)
          return;
     var _user_log =_selected_user.data.user_log;
     var _subsystem = _selected_record.data.subsystem;
     this.SelectedFn(_selected_record, _user_log, _subsystem);
}

// Module funcions definition
AdminUsers.prototype.AllowAccess = function(_selected_record, _user_log, _subsystem)
{
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
     var result = App.PerformSyncServerRequest('UsersManager.UsersManager.AllowAccess', {
          user : _user_log,
          system : _subsystem
     });
     App.HideMsgBox();

     if(result)
     {
          _selected_record.set('user_access','allowed');
          this.Disable('UserAccess');
          this.Enable('ManageRol');
     }
}

AdminUsers.prototype.DeniedAccess = function(_selected_record, _user_log, _subsystem)
{
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
     var result = App.PerformSyncServerRequest('UsersManager.UsersManager.DeniedAccess', {
          user : _user_log,
          system : _subsystem
     });
     App.HideMsgBox();

     if(result)
     {
          _selected_record.set('user_access','denied');
          this.Enable('UserAccess');
          this.Disable('ManageRol');
     }
}