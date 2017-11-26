// Function definition
function ImportSystem()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',{
			text : 'Importar',
			id : 'import_system_btn_id',
			iconCls : 'import',
			handler : Ext.Function.bind(this.Owner.OnImport,this.Owner)
		});
        this._btn_install = Ext.create('Ext.Button',{
                text : 'Instalar/Sistema',
                id : 'Instalar_Sistema',
                iconCls : 'import',
                handler : function(){
                    var me = this;
                    var fnCallBack = function() {
                        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                        _result = App.PerformSyncServerRequest('SubsystemsManager.SubsystemsManager.install');
                        App.HideMsgBox();

                        if(_result)
                        {
                           Ext.getCmp('systems_grid_id').store.load();
                            App.InfoMessage('Información', 'Se ejecuto la instalacción correctamente');
                        }
                    }
                    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea instalar todos los subsistemas y modulos de la aplicación?<br>Se perderan todos los datos guardados anteriormente. Si solo desea instalar las ultimas modificaciones le aconsejamos que intente "Actualizar/Sistema". ');
                }
            });
        this._btn_update = Ext.create('Ext.Button',{
                text : 'Actualizar/Sistema',
                id : 'Actualizar_Sistema',
                iconCls : 'import',
            handler : function(){
                var me = this;
                var fnCallBack = function() {
                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                    _result = App.PerformSyncServerRequest('SubsystemsManager.SubsystemsManager.update');
                    App.HideMsgBox();
                    if(_result)
                    {
                        Ext.getCmp('systems_grid_id').store.load();
                        App.InfoMessage('Información', 'Sistema actualizado correctamente');
                    }
                }
                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea Actualizar el sistema?');
            }
            });
		var tbar = Ext.getCmp('systems_tbar_id');
		tbar.add(this._btn_install);
		tbar.add(' ');
		tbar.add('-');
        tbar.add(this._btn_update);
		tbar.add(' ');
		tbar.add('-');
		tbar.add('->');
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

App.RegisterFunction('Import', new ImportSystem());
// Module funcions definition
AdminSystems.prototype.OnImport = function()
{
	var _import_panel = new Ext.form.Panel(
	{
		border : true,
		frame : true,
		width : '100%',
		height : '100%',
		id : '_import_system_panel_id',
		defaults : {width : 300},
		items :[
          {
			xtype: 'filefield',
			name: 'zip_file',
			id: 'zip_file',
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
		title : 'Importar sistema',
		id : '_import_system_win_id',
		height : 100,
		width : 360,
		plain: true,
		closable : false,
		layout:'fit',
		modal : true,
		resizable : false,
		items : [_import_panel],
		buttons:
		[
			{
			    text:'Importar',
			    handler : this.ImportSystem,
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
AdminSystems.prototype.ImportSystem = function()
{
	var _form = Ext.getCmp('_import_system_panel_id');

	if(_form.getForm().isValid())
	{
          var store = Ext.create('Ext.data.ArrayStore', {
               fields: [ {name: 'state'},{name: 'process'},{name : 'success'} ],
               data: [['working','Descargando sistema'],['waiting','Descompactando archivo'],['waiting','Registrando sistema']]
          });

          var _grid =  Ext.create('Ext.grid.Panel', {
          store: store,
          id : 'import_process_grid_id',
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
               title : 'Importando sistema...',
               height : 150,
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
                    id : 'ok_import_btn_id',
                    disabled : true,
                    handler: function(){_win.close();}
               }]
          });
     
		_win.show();
          
		function Callback(form,ObjResponse)
		{
			store.loadData([['ok','Descargando sistema'],['working','Descompactando archivo'],['waiting','Registrando sistema']]);
               Ext.getCmp('import_process_grid_id').doLayout();
               
               var _result = App.PerformSyncServerRequest('SubsystemsManager.SubsystemsManager.UnpackSystem',{system : ObjResponse});
               if(_result)
               {
                    store.loadData([['ok','Descargando sistema'],['ok','Descompactando archivo'],['working','Registrando sistema']]);
                    Ext.getCmp('import_process_grid_id').doLayout();
                    
                     _result = App.PerformSyncServerRequest('SubsystemsManager.SubsystemsManager.RegisterSystem', {system : ObjResponse});
                    if(_result)
                    {
                         store.loadData([['ok','Descargando sistema'],['ok','Descompactando archivo'],['ok','Registrando sistema']]);
                         Ext.getCmp('import_process_grid_id').doLayout();
                         this.__data_store.load();
                    }
                    else
                    {
                         store.loadData([['ok','Descargando sistema'],['ok','Descompactando archivo'],['error','Registrando sistema']]);
                         Ext.getCmp('import_process_grid_id').doLayout();
                    }
               }
               else
               {
                    store.loadData([['ok','Descargando sistema'],['error','Descompactando archivo'],['waiting','Registrando sistema']]);
                    Ext.getCmp('import_process_grid_id').doLayout();
               }
               
               Ext.getCmp('ok_import_btn_id').enable();
		}

		App.UploadFile('SubsystemsManager.SubsystemsManager.ImportSystem',
			_form.getForm(),
			Ext.Function.bind(Callback, this), function(){Ext.getCmp('ok_import_btn_id').enable();});
	}
	else
		Ext.Msg.alert('Atenci&oacute;n','Datos incompletos');
}