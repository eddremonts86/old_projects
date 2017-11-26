// Function definition
function ModifyUserPass()
{
     this._btn = null;

     this.Render = function(Panel)
     {
          this._btn = Ext.create('Ext.Button',{
               text : 'Cambiar contrase&ntilde;a',
               id : 'modify_user_pass_btn_id',
               iconCls : 'modify',
               disabled : true,
               handler : Ext.Function.bind(this.Owner.OnModifyPass,this.Owner)
          });
         this._btn_img = Ext.create('Ext.Button',{
                 text : 'Cambiar Foto',
                 id : 'modify_foto_id',
                 iconCls : 'modify',
                 disabled : true,
                 handler : Ext.Function.bind(this.Owner.OnModifyPhoto,this.Owner)
             });

          var tbar = Ext.getCmp('users_tbar_id');
          tbar.add(this._btn);
          tbar.add(' ');
          tbar.add('-');
          tbar.add(this._btn_img);
          tbar.add(' ');
          tbar.add('-');
     }

     this.Enable = function()
     {
          this._btn.enable();
          this._btn_img.enable();
     }
     this.Disable = function()
     {
          this._btn.disable();
     }
}
App.RegisterFunction('ModifyUserPass', new ModifyUserPass());
// Module funcions definition
AdminUsers.prototype.OnModifyPass = function(){
     var _record = Ext.getCmp('users_grid_id').getSelectionModel().getLastSelected();

     var _change_panel = new Ext.form.FormPanel(
     {
          border : true,
          frame : true,
          width : '100%',
          height : '100%',
          id : '_change_user_pass_panel_id',
          defaults : {
               width : 320, 
               labelWidth : 120
          },
          items :[
          {
               xtype : 'label',
               html: '<br><span class="label label-info">Nombre : <b>'+ _record.data.user_name  +'</b><br></span>'
          },{
               xtype : "textfield",
               fieldLabel : "Nueva contrase&ntilde;a",
               id : 'pass',
               allowBlank : false,
               name : "user_pass",
               inputType: 'password'
          },{
               xtype : "textfield",
               fieldLabel : "Confirmaci&oacute;n",
               name : "user_pass_confirm",
               inputType: 'password',
               vtype: 'password',
               allowBlank : false,
               initialPassField: 'pass'
          },{
                  xtype : 'hidden',
                  value : _record.data.user_log,
                  name : 'user_log'
              }]
     });

     _change_panel.loadRecord(_record);

     var _change_win = new Ext.Window(
     {
          title : 'Modificar contraseña del usuario',
          id : '_modify_user_pass_win_id',
          height : 220,
          width : 360,
          plain: true,
          closable : false,
         padding:5,
          layout:'fit',
          modal : true,
          resizable : false,
          items : [_change_panel],
          buttons:
          [
          {
               text:'Modificar', cls:'btn btn-primary',
               handler : this.ModifyUserPass,
               scope : this
          },
          {
               text: 'Cerrar', cls:'btn btn-primary',
               handler: function(){
                    _change_win.close();
               }
          }
          ]
     });

     _change_win.show();
}
AdminUsers.prototype.ModifyUserPass = function(){
     if(!Ext.getCmp('_change_user_pass_panel_id').getForm().isValid())
          return;
     
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
     var result = App.PerformSyncServerRequest('UsersManager.UsersManager.ChangeUserPassword',Ext.getCmp('_change_user_pass_panel_id').getForm().getValues());
     App.HideMsgBox();

     if(result)
          Ext.getCmp('_modify_user_pass_win_id').close();
     
}
AdminUsers.prototype.OnModifyPhoto = function(){
    var _record = Ext.getCmp('users_grid_id').getSelectionModel().getLastSelected();
    var id = _record.data.user_id;
    var foto = _record.data.foto;
    this.form1 = new Ext.form.FormPanel({
            border : true,
            frame : true,
            width : '100%',
            height : '100%',
            id : 'change_user',
            defaults : {
                width : 320,
                labelWidth : 120,
                padding:10
            },
            layout: 'column',
            items :[
                     { columnWidth: 0.3,
                        items: [
                                 {
                                 html: '<div class="foto"></div>'

                                 },
                            {
                                xtype:'textfield',
                                id:'id',
                                name:'id',
                                value:id,
                                hidden:true
                            }
                               ]
                     },
                    { columnWidth: 0.7,
                        items: [
                            {
                                name: 'fileup',
                                id: 'fileup',
                                xtype:'filefield',
                                fieldLabel: '<div class="foto">&nbsp;</div>',
                                allowBlank: false,
                                labelSeparator:'',
                                buttonText: '...',
                                padding : '0 0 10 0',
                                emptyText : 'Imagen (.png)',
                                listeners : {
                                    change : function(UFile, value, options)
                                    {
                                        if(value == undefined) return;
                                        var _dot_ptr = value.lastIndexOf('.');
                                        var _ext = value.substr(_dot_ptr + 1);
                                        _ext = _ext.toLowerCase();
                                        if(_ext != 'png')
                                        {   UFile.reset();
                                            UFile.setValue(undefined);
                                            UFile.setRawValue(undefined);
                                            Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
                                        }
                                    }
                                }
                            }
                            ]
                    }

                    ]
        });
    this.form1.loadRecord(_record);

    var _change_win = new Ext.Window({
            title : 'Modificar foto del usuario',
            id : '_modify_user_pass_win_id',
            height : 230,
            width : 460,
            plain: true,
            closable : false,
            padding:5,
            layout:'fit',
            modal : true,
            resizable : false,
            items : [this.form1],
            buttons:
                [
                    {
                        xtype : 'label',
                        html: '<br><span class="label label-info">Nombre : <b>'+ _record.data.user_name  +'</b><br></span>'
                    },'->',
                    {
                        text:'Modificar', cls:'btn btn-primary',
                        handler : this.ModifyPhoto,
                        scope : this
                    },
                    {
                        text: 'Cerrar', cls:'btn btn-primary',
                        handler: function(){
                            _change_win.close();
                        }
                    }
                ]
        });
    _change_win.show();
}
AdminUsers.prototype.ModifyPhoto = function(id){
    var form = Ext.getCmp('change_user');
  form.getForm().submit({
        url: 'App/Server/fn_call.php',
        method:'PUT',
        waitMsg:'Esperando respueta...',
        params:{id:id,fn:'Users.UsersManager.UsersManager.foto'},
        success: function(fp, o) {
            this.__data_store.load();
            App.InfoMessage('Información', 'Modificación  satisfactoria');
            App.HideMsgBox();
            Ext.getCmp('_modify_user_pass_win_id').close();

        },
        failure:function(form,a){
            App.InfoMessage('Error', 'Hubo problemas al modificar las foto.');
            App.HideMsgBox();
        },scope:this
    });
}