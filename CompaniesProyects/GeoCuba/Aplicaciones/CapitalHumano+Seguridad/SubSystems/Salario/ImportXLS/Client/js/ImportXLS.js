function ImportXLS(){
    this.__data_store = null;
    this.descripcion=null
    this.cadena =null;
    this.panelGeneral=null;
    this.panel = null;
    this.Init = function()
    {
        var _menu_item_config_ImportXLS =
        {
            text: 'Importar xls',
            id: 'ImportXLS_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Importar', _menu_item_config_ImportXLS);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        var paanele=new Ext.panel.Panel(
            {
            html:'',
            id:'panel_file',
            name:'panel_file',
            height: App.GetDesktopHeigth(),
            width:App.GetDesktopWidth()/2,
            region:'east'
        });
        this.__data_store = App.BuildJsonStore('ImportXLS.ImportXLS.CargarDatos',
            {
                fields: [
                    {name: 'id'},
                    {name: 'origen'},
                    {name: 'destino'}
                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        var _grid = new Ext.grid.Panel(
            {
                id: 'ImportXLS_grid_id',
                height: App.GetDesktopHeigth()/3,
                height: App.GetDesktopHeigth(),
                region: 'center',
                frame: true,
                store: this.__data_store,
                enableLocking: true,
                 columns: [
                     {text: "Destino", flex: 1, dataIndex: 'destino'},
                     {text: "Origen", flex: 1, dataIndex: 'origen'}
                 ],
                viewConfig: {forceFit: true},
                tbar: {
                    id: 'ImportXLS_tbar_id',
                    items: ['-'],
                    height: 28
                },
                bbar:[ {
                    xtype: 'pagingtoolbar',
                    pageSize: 10,
                    store: this.__data_store,
                    displayInfo: true,
                    plugins: new Ext.ux.ProgressBarPager()
                },'->',{
                         xtype: 'button',
                        //text : 'Ayuda',
                        iconCls:'help',
                        handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'35%',
                            width:'50%',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El modulo <span class="label label-info">" Gestionar Resolución"</span>' +
                                    ' le permite gestionar las ImportXLSes,decretos o normativas referente a todas las operaciones que se realizan en la empresa.<br>  ' +
                                    '<span class="label label-success">Debe saber que :</span><br>' +
                                    'Estos son documentos oficiales de caracter obligatorio que deben dominarse y tener a buen recaudo.<br>'+
                                    '<span class="label label-important">Nota:</span> ' +
                                    '<br> Ademas de visualizarce los documentos se pueden descargar con solo doble click sobre el documento deseado.' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
                }],
                listeners: {
                     selectionchange: {
                        fn: function(View, selections, options) {
                            if(selections.length == 0){this.Disable('ImportXLS');}
                            else{this.Enable('ImportXLS');}
                            },
                            scope: this
                            },
                    itemclick:{
                        fn:function(){
                           var _selected_rcd = Ext.getCmp('ImportXLS_grid_id').getSelectionModel().getLastSelected();
                           this.dir= _selected_rcd.data.dir;
                           this.nombre= _selected_rcd.data.nombre_file;
                           this.cadena = this.dir + this.nombre;
                            Ext.getCmp('panel_file').update('<embed src="SubSystems/Plantilla/ImportXLS/Server/pdf.php?cadena='+this.cadena+'" type="'+_selected_rcd.data.extension+'" width="100%" height="100%"> </embed>');
                          //Ext.getCmp('panel_file').update('<iframe src="http://localhost" width="100%" height="100%"></iframe>');
                        },
                        scope: this
                         },
                    itemdblclick:{
                        fn: function(){
                           var _selected_rcd = Ext.getCmp('ImportXLS_grid_id').getSelectionModel().getLastSelected();
                           this.dir= _selected_rcd.data.dir;
                           this.nombre= _selected_rcd.data.nombre_file;
                           this.cadena = this.dir + this.nombre;
                           window.open('SubSystems/Plantilla/ImportXLS/Server/pdf.php?cadena='+this.cadena+'&decode=s','','menubar=yes');
                        },
                        scope: this
                    }
                }
            });
        this.panelGeneral = new Ext.Panel(
            {
                title: 'Gestionar Resolución',
                border: true,
                frame: true,
                id:'panelGeneral',
                name:'panelGeneral',
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
                items: [_grid],
                listeners: {
                    afterrender: function() {
                        this.__data_store.load({params:{start:0,limit:25}});
                    },
                    scope : this
                }
            });

        return this.panelGeneral;
    }
    // ========================================================================//
    this.Free = function()
    {
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('ImportXLS', new ImportXLS());