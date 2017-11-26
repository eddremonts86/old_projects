// Function definition
function ModifyUser()
{
     this._btn = null;

     this.Render = function(Panel)
     {
          this._btn = Ext.create('Ext.Button',
          {
               text : 'Modificar',
               id : 'modify_user_btn_id',
               iconCls : 'modify',
               disabled : true,
               handler : Ext.Function.bind(this.Owner.OnModify,this.Owner)
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

App.RegisterFunction('ModifyUser', new ModifyUser());

// Module funcions definition
AdminUsers.prototype.OnModify = function()
{

    this.__data_store_rols = Ext.create('Ext.data.JsonStore',
        {
            fields: [
                {name: 'rol_id', type: 'string'},
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

     var _record = Ext.getCmp('users_grid_id').getSelectionModel().getLastSelected();

     var _change_panel = new Ext.form.FormPanel(
     {
          border : true,
          frame : true,
          width : '100%',
          height : '100%',
          id : '_change_user_panel_id',
          defaults : {
               width : 300
          },
          items :[
          {
               xtype : 'hidden',
               name: 'old_name',
               id: 'old_name',
               value : _record.data.user_name
          },
          {
               xtype : 'hidden',
               name: 'old_log',
               id: 'old_log',
               value : _record.data.user_log
          },
          {
               xtype : "textfield",
               fieldLabel : "Nombre",
               name : "user_name",
               allowBlank : false
          },
          {
               xtype : "textfield",
               fieldLabel : "Identificador",
               name : "user_log",
               allowBlank : false
          },{
                  xtype: 'combobox',
                  id: 'rol_up-user',
                  name: 'rol',
                  fieldLabel: 'Rol',
                  emptyText: 'Seleccione...',
                  displayField: 'rol_name',
                  store: this.__data_store_rols,
                  queryMode: 'local',
                  forceSelection: true,
                  editable: true,
                  allowBlank: false,
                  valueField : 'rol_id'
              }]
     });

     _change_panel.loadRecord(_record);

     var _change_win = new Ext.Window(
     {
          title : 'Modificar un usuario',
          id : '_modify_user_win_id',
          height : 190,
          width : 330,
          plain: true,
          closable : false,
          layout:'fit',
          padding:2,
          modal : true,
          resizable : false,
          items : [_change_panel],
          buttons:
          [
          {
               text:'Modificar',
               handler : this.ModifyUser,
               scope : this
              ,cls:'btn btn-primary'
          },
          {
               text : 'Reset',
              cls:'btn btn-primary',
               handler : function(){
                    Ext.getCmp('_change_user_panel_id').loadRecord(_record);
                    }
          },
          {
               text: 'Cerrar',
                cls:'btn btn-primary',
               handler: function(){
                    _change_win.close();
               }
          }
          ]
     });

     _change_win.show();
}

AdminUsers.prototype.ModifyUser = function()
{
     var _form = Ext.getCmp('_change_user_panel_id').getForm();
     if(_form.isValid())
     {
          App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
          var result = App.PerformSyncServerRequest('UsersManager.UsersManager.ModifyUserData',
               _form.getValues() );
          App.HideMsgBox();
          if(result)
          {
               this.__data_store.load();
               this.Disable('ModifyUser');
               this.Disable('ModifyUserPass');
               this.Disable('DeleteUser');
               Ext.getCmp('_modify_user_win_id').close();
          }
     }
}