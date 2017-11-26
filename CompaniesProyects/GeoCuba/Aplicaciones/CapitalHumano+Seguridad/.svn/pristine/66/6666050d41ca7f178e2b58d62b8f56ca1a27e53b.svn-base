// Function definition
function DeleteSubsystem()
{
     this._btn = null;

     this.Render = function(Panel)
     {
          this._btn = Ext.create('Ext.Button',
          {
               text : 'Eliminar',
               id : 'delete_system_btn_id',
               iconCls : 'delete',
               disabled : true,
               handler : Ext.Function.bind(this.Owner.AskForDelete,this.Owner)
          });

          var tbar = Ext.getCmp('systems_tbar_id');
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

App.RegisterFunction('Delete', new DeleteSubsystem());

// Module funcions definition
AdminSystems.prototype.AskForDelete = function()
{
     Ext.Msg.show({
          title:'Eliminar',
          msg: 'Esta seguro que desea eliminar este sistema?',
          buttons: Ext.Msg.YESNO,
          fn: function(buttonId){
               if(buttonId == "yes") this.DeleteSystem();
          },
          icon: Ext.MessageBox.QUESTION,
          scope : this
     });
}


AdminSystems.prototype.DeleteSystem = function()
{
     var _subsystem = Ext.getCmp('systems_grid_id').getSelectionModel().getLastSelected().data.subsystem;
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
     var result = App.PerformSyncServerRequest('SubsystemsManager.SubsystemsManager.DeleteSystem',{system : _subsystem});
     App.HideMsgBox();
     if(result)
     {
           this.__data_store.load();
           this.Disable('Export');
           this.Disable('Delete');
     }
}