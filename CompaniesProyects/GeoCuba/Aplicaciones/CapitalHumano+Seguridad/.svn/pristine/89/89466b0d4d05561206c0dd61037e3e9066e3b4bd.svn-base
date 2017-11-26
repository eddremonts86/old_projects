// Function definition
function OverideSystem()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',
		{
			text : 'Sobrescribir',
			id : 'override_system_btn_id',
			iconCls : 'override',
               disabled : true,
			handler : Ext.Function.bind(this.Owner.OnOverride,this.Owner)
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

App.RegisterFunction('Override', new OverideSystem());

// Module funcions definition
AdminSystems.prototype.OnOverride = function()
{
	var _override_panel = new Ext.form.Panel(
	{
		border : true,
		frame : true,
		width : '100%',
		height : '100%',
		id : '_override_system_panel_id',
		defaults : {width : 300},
		items :[
          {
               xtype : 'hidden',
               name : 'system',
               value : Ext.getCmp('systems_grid_id').getSelectionModel().getLastSelected().data.subsystem
          },
          {
			xtype: 'filefield',
			name: 'zip_file',
			id: 'zip_file_id',
			fieldLabel: 'Archivo',
			width : 330,
			allowBlank: false,
			emptyText : 'Sistema (.zip)',
			buttonText: '...',
			value : undefined,
			listeners : {
				change : function(UFile, value, options)
				{
					if(value == undefined) return;
					var _dot_ptr = value.lastIndexOf('.');
					var _ext = value.substr(_dot_ptr + 1);
					_ext = _ext.toLowerCase();
					if(_ext != 'zip')
					{
						UFile.reset();
						UFile.setValue(undefined);
						UFile.setRawValue(undefined);
						Ext.Msg.alert('ERROR', 'Tipo de fichero no compatible');
					}
				}
			}
		}]
	});

	var _add_win = new Ext.Window(
	{
		title : 'Sobrescribir sistema',
		id : '_override_system_win_id',
		height : 100,
		width : 360,
		plain: true,
		closable : false,
		layout:'fit',
		modal : true,
		resizable : false,
		items : [_override_panel],
		buttons:
		[
			{
			    text:'Importar',
			    handler : this.OverrideSystem,
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

AdminSystems.prototype.ReportManager = {
    
    store : Ext.create('Ext.data.ArrayStore', {
               fields: [ {name: 'state'},{name: 'process'},{name : 'success'} ],
               data: []
          }),

    _report : [['working','Descargar sistema'],
               ['waiting','Crear copia de seguridad'],
               ['waiting','Eliminar sistema obsoleto'],
               ['waiting','Descompactar archivo'],
               ['waiting','Registrar sistema'],
               ['waiting','Restaurar seguridad'],
               ['waiting','Eliminar copia de seguridad']],
     
     SetOk : function(Index)
     {
          this._report[Index][0] = 'ok';
          if(Index < 6)
               this._report[Index + 1][0] = 'working';
     },
     
     SetError : function(Index)
     {
          this._report[Index][0] = 'error';
     },
     
     Refresh : function()
     {
          var _result = [];
          for(var i = 0; i < 7; i++)
               _result.push([this._report[i][0],this._report[i][1],this._report[i][2]]);
          
          this.store.removeAll();
          this.store.loadData(_result);
          Ext.getCmp('import_process_grid_id').doLayout();
     }
}

AdminSystems.prototype.OverrideSystem = function()
{
	var _form = Ext.getCmp('_override_system_panel_id');

	if(_form.getForm().isValid())
	{
          var _system = Ext.getCmp('systems_grid_id').getSelectionModel().getLastSelected().data.subsystem;

          var _grid =  Ext.create('Ext.grid.Panel', {
          store: ReportManager.store,
          id : 'override_process_grid_id',
          hideHeaders : true,
          width : '100%',
          height : '100%',
          frame: true,
          columns: [
               {header: 'State', dataIndex: 'state', sortable : false ,menuDisabled: true, flex: 2,renderer : function(value){
                         return '<center><div style="width: 16;height: 16" class="'+value+'">&nbsp;</div></center>';
               }},
               {header: 'Process', dataIndex: 'process', sortable : false ,menuDisabled: true, flex: 11}
          ]});
     
          var _win = new Ext.Window(
          {
               title : 'Sobrescribiendo sistema ' + _system + '...',
               height : 300,
               width : 400,
               plain: true,
               closable : false,
               layout:'fit',
               modal : true,
               resizable : false,
               items : [_grid],
               buttonAlign : 'center',
               buttons:[
               {
                    text:'OK',
                    id : 'ok_override_btn_id',
                    disabled : true,
                    handler: function(){_win.close();}
               }]
          });

		_win.show();
          this.ReportManager.Refresh();
          
		function Callback(form,ObjResponse)
		{
               this.ReportManager.SetOk(0);
               
               var _calls = ['CreateBackup', 'CleanSystem', 'UnpackSystem', 'RegisterSystem','RestoreSecurity','FreeSecurity'];
               var _server_call = '';
               var _result = '';
               var _params = {system : _system};
               for(var i = 0; i < _calls.length; i++)
               {
                    _server_call = 'Overrider.Overrider.' + _calls[i];
                    _result = App.PerformSyncServerRequest(_server_call, _params);
                    if(_result)
                         this.ReportManager.SetOk(i+1);
                    else
                    {
                         this.ReportManager.SetError(i+1);
                         break;
                    }
               }

               Ext.getCmp('ok_override_btn_id').enable();
		}

          // 1.- Descargar archivo compactado
		App.UploadFile('SubsystemsManager.SubsystemsManager.OverrideSystem',
			_form.getForm(),
			Ext.Function.bind(Callback, this), Ext.Function.bind(
                    function()
                    {
                         this.ReportManager.SetError(0);
                         Ext.getCmp('ok_override_btn_id').enable();
                    }, this));
	}
	else
		Ext.Msg.alert('Atenci&oacute;n','Datos incompletos');
}