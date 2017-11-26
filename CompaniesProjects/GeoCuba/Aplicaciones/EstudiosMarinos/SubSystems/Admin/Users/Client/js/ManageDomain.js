// Function definition
function ManageDomain()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',
		{
			text : 'Dominio',
			id : 'manage_domain_btn_id',
            tooltip : 'Establecer el domino de cada usuario por subsistema',
			iconCls : 'rol',
            disabled : true,
			handler : Ext.Function.bind(this.Owner.OnManageDomain,this.Owner)
		});

		var tbar = Ext.getCmp('subsystems_tbar_id');
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

App.RegisterFunction('ManageDomain', new ManageDomain());

// Module funcions definition
AdminUsers.prototype.OnManageDomain = function()
{
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Cargando configuración...'));
     var result = App.PerformSyncServerRequest('UsersManager.UsersManager.CheckConfig',{});
     App.HideMsgBox();
     
     if(result)
         {
             if(result.cant == 0)
                 {
                     App.InfoMessage('Notificación','Antes de gestionar los dominios debe configurar el sistema en el menu de configuración');
                     return;
                 }
                 
         }
     
     
     var _scope = this; 
     var _selected_record = Ext.getCmp('subsystems_grid_id').getSelectionModel().getLastSelected();
     var _selected_user = Ext.getCmp('users_grid_id').getSelectionModel().getLastSelected();
     if(!_selected_record || !_selected_user)
          return;
     var _user_log =_selected_user.data.user_log;
     var _subsystem = _selected_record.data.subsystem;
     
     var _sm = Ext.create('Ext.selection.CheckboxModel',{});
     var _grid = Ext.create('Ext.grid.Panel',{
         width:'100%',
         height:'100%',
         selModel:_sm,
         store:_scope.__data_store_provincias,
         columns:[
                    {header:'Provincia',dataIndex:'provincias_nombre',flex:1}
                 ]
     });
     var _win = new Ext.Window(
	{
		title : 'Definir Dominio [ Usuario: ' + _user_log + '; Sistema: ' + _subsystem + ' ]',
		id : '_win_id',
		height : 500,
		width : 700,
		plain: true,
		closable : false,
		layout:'fit',
		modal : true,
		resizable : false,
		items : [_grid],
		buttons:[{
                    text: 'Guardar',
                    handler: function(){
                        var selection = _grid.getSelectionModel().getSelection();
                        var arr = new Array();
                        for(var i = 0; i < selection.length; i++)
                            {
                                var obj = {};
                                obj.cod = selection[i].get('cod');
                                arr.push(obj);
                            }
                       App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Cargando configuración...'));
                       var result = App.PerformSyncServerRequest('UsersManager.UsersManager.SetDToUser',{dom:Ext.encode(arr),user:_user_log,subsistem:_subsystem});
                       App.HideMsgBox();
                       
                       if(result)
                           App.InfoMessage('Notificación', 'El dominio fue modificado satisfactoriamente.')
                            
                        _win.close();
                    }
               }],
               listeners:{
                   beforerender:function(This)
                   {
                       App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Cargando configuración...'));
                       var result = App.PerformSyncServerRequest('UsersManager.UsersManager.LoadProv',{});
                       App.HideMsgBox();
                            
                            if(result)
                                _scope.__data_store_provincias.loadData(result.provincias);
                   },
                   afterrender:function(This)
                   {
                       App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Cargando configuración...'));
                       var result = App.PerformSyncServerRequest('UsersManager.UsersManager.LoadDomain',{user:_user_log,subsistem:_subsystem});
                       App.HideMsgBox();
                            if(result)
                                {
                                    _sm.deselectAll();
                                    var data = result.domain;
                                    if(data != 'false')
                                        {
                                            if(data.length > 0)
                                                {
                                                    for(var i = 0; i < data.length ; i++)
                                                        {
                                                            var index = _scope.__data_store_provincias.find('cod',data[i]);
                                                            if(index != -1)
                                                                _sm.select(index,true);
                                                        }
                                                }
                                            if(data.length == '0')
                                               _sm.selectAll();
                                        }
                                }
                   }
               }
           
	});
     
     _win.show();
}