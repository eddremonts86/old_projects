Ext.require(['Ext.data.*','Ext.grid.*','Ext.layout.container.Accordion','Ext.tree.*','Ext.ux.CheckColumn']);
function FeatureBD()
{   var cursos;
    this.__store_territorios = null;
    this.Init = function()
    {
        var _menu_item_config =
        {
            text:'Configuraciones (Sistema BD)',
            id: 'FeatureBD_dom_menu_id',
            iconCls : 'systems',
            handler: Ext.Function.bind(this.ShowMainWindow,this)
        };

        App.InsertMenuItem('Configuración del Sistema',_menu_item_config);
    }
    this.BuildMainPanel = function(filterObj)
    {
        var result = App.PerformSyncServerRequest('ControlerFeatureBD.FeatureBD.treefre',{});
        var store1 = Ext.create('Ext.data.TreeStore',{
            root:result.rows
        });

        var tree = Ext.create('Ext.tree.Panel', {
            title: 'Arbol de Ficheros',
            width: '100%',
            region: 'west',
            height: '100%',
            store: store1,
            rootVisible:false,
           columns: [
            {
                xtype: 'treecolumn',
                text: 'Task',
                flex:15,
                sortable: true,
                dataIndex: 'text'

            },
            {
                text: 'Editar',
                flex:1,
                menuDisabled: true,
                iconCls:'apply16',
                xtype: 'actioncolumn',
                tooltip: 'Edit task',
                align: 'center'
            },
            {
                text: 'Eliminar',
                flex:1,
                iconCls:'application_exit16',
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Edit task',
                align: 'center'
            }
            ]
        });
        var _panel = new Ext.Panel({
            title: 'Todos Los reportes',
            border: true,
            id: 'panelNombre_FeatureBD',
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: App.GetDesktopWidth(),
            items : [tree],
            listeners: {
                afterrender: function () {},
                scope: this
            }
        });
        return _panel;
    }
    this.Free = function()
    {

    }
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
    this.Print=function(){return false;}
}
App.RegisterModule('FeatureBD', new FeatureBD());