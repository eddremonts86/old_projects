// Function definition
function ManageFunction()
{
	this._btn = null;

	this.Render = function(Panel)
	{
		this._btn = Ext.create('Ext.Button',
		{
			text: 'Funcionalidades',
			id: 'manage_function_btn_id',
            tooltip: 'Establecer acceso a funcionalidades',
			iconCls: 'rols',
            disabled: true,
			handler: Ext.Function.bind(this.Owner.OnManageFunction, this.Owner)
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

App.RegisterFunction('ManageFunction', new ManageFunction());

// Module funcions definition
AdminRols.prototype.OnManageFunction = function()
{
     var _selected_record = Ext.getCmp('subsystems_grid_id').getSelectionModel().getLastSelected();
     var _selected_rol = Ext.getCmp('rols_grid_id').getSelectionModel().getLastSelected();
     if(!_selected_record || !_selected_rol)
          return;
     var _rol_name =_selected_rol.data.rol_name;
     var _subsystem = _selected_record.data.subsystem;
     
	var _fn_grid = Ext.create('Ext.tree.Panel',
     {
          id: 'fn_grid_id',
          rootVisible: false,
          useArrows: true,
          frame: true,
          disabled: true,
          title: 'Funcionalidades',
          width: '100%',
          region: 'center',
          height: '100%',
          fields: ['item_name', 'description'],
          columns: [{
               xtype: 'treecolumn',
               text: 'Nombre',
               dataIndex: 'item_name',
               width: 200,
               sortable: false
          }, {
               text: 'Descripción',
               dataIndex: 'description',
               flex: 1,
               sortable: false
          }],
          tbar: ['-',
          {
               tooltip: 'Expandir todos',
               iconCls: 'expand-all',
               handler: function(){Ext.getCmp('fn_grid_id').expandAll();}
          },{
               tooltip: 'Colapsar todos',
               iconCls: 'collapse-all',
               handler: function(){Ext.getCmp('fn_grid_id').collapseAll();}
          },
         /* {
                  tooltip: 'Marcar todos',
                  iconCls: 'collapse-all',
                  handler: function(){Ext.getCmp('fn_grid_id').collapseAll();}
           },*/
          '-','-',
          {
               text: 'Refrescar',
               iconCls: 'update',
               handler: function() {
                   this.LoadTree(_rol_name, _subsystem);
               },
               scope: this
          },'-','->',
          {
               text: 'Guardar cambios',
               disabled: true,
               iconCls: 'save',
               id: 'save_changes_btn_id',
               handler: function() {
                    this.UpdateFunctions(_rol_name, _subsystem);
               },
               scope: this
          }],
          root: {
               text: 'root',
               expanded: true
          },
          bbar: [
              '-',
              {
               xtype: 'tbtext',
               id: 'fn_grid_tbar_text'
              }
          ],
          listeners: {
              /* show: function() {
                    this.LoadTree(_rol_name, _subsystem);
               },*/
               checkchange: function(node, checked) {
                    Ext.getCmp('save_changes_btn_id').enable(false);
                    if(!node.data.leaf)
                    {
                         for(var i = 0; i < node.childNodes.length; i++)
                              node.childNodes[i].set('checked', checked);
                    }
                    else
                    {
                         if(checked)
                              node.parentNode.set('checked', checked);
                    }
               },
               scope: this
          }
     });
     
     var _fn_win = new Ext.Window(
	{
		title: 'Permitir funcionalidades [ Rol: ' + _rol_name + '; Sistema: ' + _subsystem + ' ]',
		id: '_fn_win_id',
		height: 500,
		width: 700,
		plain: true,
		closable: false,
		layout: 'fit',
		modal: true,
		resizable: false,
		items: [_fn_grid],
        listeners: {
            show: function() {
                this.LoadTree(_rol_name, _subsystem);
            }, scope:this
        },
		buttons: [
            {
               text: 'Cerrar',
               handler: function(){_fn_win.close();}
            }
        ]
	});
     
     _fn_win.show();
}

AdminRols.prototype.LoadTree = function(Rol, Subsystem)
{
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Cargando...'));
     var result = App.PerformSyncServerRequest('FunctionsManager.FunctionsManager.LoadFunctions', {rol: Rol, subsystem: Subsystem});
     App.HideMsgBox();

     if(result)
     {
          var root = Ext.getCmp('fn_grid_id').getRootNode();
          root.removeAll(true);
          root.appendChild(result.tree);

          Ext.getCmp('fn_grid_id').enable();
     }
}

AdminRols.prototype.UpdateFunctions = function(Rol, Subsystem)
{
	var _checked_items = Ext.getCmp('fn_grid_id').getChecked();
     var _modules = [], _functions = {}, _parent = null, _module_name = '';
     for(var i = 0; i < _checked_items.length; i++)
     {
          // The node is a module
          if(_checked_items[i].data.id.substr(0, 4) == '_mod')
          {
               _modules.push(_checked_items[i].data.item_name);
          }
          // The node is a function
          else
          {
               _parent = _checked_items[i].parentNode;
               _module_name = _parent.data.item_name;
               if(typeof(_functions[_module_name]) == 'undefined')
                    _functions[_module_name] = [];
               _functions[_module_name].push(_checked_items[i].data.item_name);
          }
     }
     
     var _selection = {
          modules: _modules,
          functions: _functions
     };

     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
     var result = App.PerformSyncServerRequest('FunctionsManager.FunctionsManager.SetFunction', {
          rol: Rol,
          system: Subsystem,
          selection: Ext.encode(_selection)
     });
     App.HideMsgBox();

     if(result)
          Ext.getCmp('save_changes_btn_id').disable(false);
     
}