// Function definition
function DeleteUser()
{
     this._btn = null;

     this.Render = function(Panel)
     {
          this._btn = Ext.create('Ext.Button',
          {
               text : 'Eliminar',
               id : 'delete_user_btn_id',
               iconCls : 'delete',
               disabled : true,
               handler : Ext.Function.bind(this.Owner.AskForDelete,this.Owner)
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

App.RegisterFunction('DeleteUser', new DeleteUser());

// Module funcions definition
AdminUsers.prototype.AskForDelete = function()
{
     Ext.Msg.show({
          title:'Eliminar',
          msg: 'Esta seguro que desea eliminar este Usuario?',
          buttons: Ext.Msg.YESNO,
          fn: function(buttonId){
               if(buttonId == "yes") this.DeleteUser();
          },
          icon: Ext.MessageBox.QUESTION,
          scope : this
     });
}


AdminUsers.prototype.DeleteUser = function()
{
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
         var record = Ext.getCmp('users_grid_id').getSelectionModel().getLastSelected();
         var _user_log = record.data.user_log;
     if(_user_log){
        var result = App.PerformSyncServerRequest('UsersManager.UsersManager.DeleteUser',{user_log : _user_log});
         App.HideMsgBox();
         if(result)
         {
              App.InfoMessage('Información','Usuario eliminado correctamente');
              Ext.getCmp('users_grid_id').store.load();
              this.Disable('ModifyUser');
              this.Disable('ModifyUserPass');
              this.Disable('DeleteUser');
         }

    }
}