
Ext.require(['Ext.data.*','Ext.grid.*','Ext.layout.container.Accordion','Ext.tree.*','Ext.ux.CheckColumn']);

function Feature()
{   var cursos;
    this.__store_territorios = null;
    this.Init = function()
    {
        var _menu_item_config =
        {
            text:'Configuraciones (Sistema)',
            id: 'dom_menu_id',
            iconCls : 'systems',
            handler: Ext.Function.bind(this.ShowMainWindow,this)
        };

        App.InsertMenuItem('Configuración del Sistema',_menu_item_config);
    }
    // --------------------------------------------------
    //Function for build the main panel of the application
    this.BuildMainPanel = function(filterObj)
    {
        var tree = Ext.create('Ext.tree.Panel', {
            title: 'Arbol de Ficheros',
            width: '30%',
            region: 'west',
            height: '100%',
           // store: store,
           columns: [
            {
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Task',
                flex:5,
                sortable: true,
                dataIndex: 'task',
                locked: true
            },
            {
                text: 'Editar',
                flex:1,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Edit task',
                align: 'center'
            },
            {
                text: 'Eliminar',
                flex:1,
                menuDisabled: true,
                xtype: 'actioncolumn',
                tooltip: 'Edit task',
                align: 'center'
            }
            ]
        });
        var panel = Ext.create('Ext.panel.Panel', {
            title: 'Panel de edición',
            width: '70%',
            region: 'center',
            layout:'fit',
            height: '100%',
            border:true,
            items:{
                xtype     : 'textareafield',
                grow      : true,
                name      : 'message',
                id      : 'message',
                fieldLabel: 'Message',
                hideLabel:true,
                anchor : '100%',
                width: '70%',
                height: '100%'
            },
            tools: [
                {type:'refresh',
                    handler:function(){
                        var cuerpo=Ext.getCmp('message').getValue();
                        var dir=''
                        var cursos = App.PerformSyncServerRequest('ControlerFeatures.Features.reload',{cuerpo:cuerpo,dir:dir});
                        if (cursos){
                            App.InfoMessage('Información', 'Se ha cargado el fichero nuevamente');
                            cursos = Ext.decode(cursos.rows);
                            Ext.getCmp('message').setValue(cursos);
                        }
                        else{
                            App.InfoMessage('Información', 'Ha ocurrido un error');

                        }
                    }
                },
                {type:'save',
                handler:function(){
                    var cuerpo=Ext.getCmp('message').getValue();
                    var dir=''
                    var cursos = App.PerformSyncServerRequest('ControlerFeatures.Features.Escribir',{cuerpo:cuerpo,dir:dir});
                    if (cursos){
                        App.InfoMessage('Información', 'Datos guardaos satisfactoriamente');
                        cursos = Ext.decode(cursos.rows);
                        Ext.getCmp('message').setValue(cursos);
                    }
                    else{
                        App.InfoMessage('Información', 'Ha ocurrido un error');

                    }
                }
                }
                ]
        });
        var _panel = new Ext.Panel({
            title: 'Todos Los reportes',
            border: true,
            id: 'panelNombre_Feature',
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: App.GetDesktopWidth(),
            items : [tree,panel],
            listeners: {
                afterrender: function () {
                      cursos = App.PerformSyncServerRequest('ControlerFeatures.Features.Leer',null);
                      cursos = Ext.decode(cursos.rows);
                      Ext.getCmp('message').setValue(cursos);

                },
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

App.RegisterModule('Feature', new Feature());
