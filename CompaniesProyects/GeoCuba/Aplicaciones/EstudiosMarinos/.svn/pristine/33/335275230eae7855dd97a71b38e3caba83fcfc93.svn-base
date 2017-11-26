function Gallery(){
    this.__data_store = null;
    this.Init = function()
    {
        var _menu_item_config_Gallery =
        {
            text: 'Gallery',
            id: 'Gallery_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Configuracion del Sistema','Cliente',  _menu_item_config_Gallery);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Gallery.Gallery.CargarDatos',{
            fields: [
            {name: 'typo'},
            {name: 'img'},
            {name: 'id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        var _grid = new Ext.grid.Panel({
            id: 'Gallery_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '40%',
            region: 'center',
            frame: true,
            plugins:[Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
            store: this.__data_store,
            columns: [
                {xtype: 'checkcolumn',text: 'Activo',dataIndex: 'activador',width: 55,
                    listeners:{
                        checkchange:function( This, rowIndex, checked, eOpts ){
                            var _selectionModel = Ext.getCmp('Gallery_grid_id').getSelectionModel();
                            var _selected_rcd = _selectionModel.getLastSelected();
                            var id=_selected_rcd.data.id;
                            var valor;
                            if (checked)
                                valor=true;
                            else
                                valor=false;
                            var  _result = App.PerformSyncServerRequest('Gallery.Gallery.active',{id:id,valor:valor});
                            Ext.getCmp('Gallery_grid_id').store.load();
                        }
                    }
                },
                {text: "Foto",width:310, dataIndex: 'img',renderer:img},
                {text: "Galerya",width:310, dataIndex: 'typo'}
            ],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Gallery_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store
            },
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('GalleryGestionar');
                        }
                        else
                        {
                          this.Enable('GalleryGestionar');
                        }
                    },
                    scope: this
                }
            }
        });
        var datos = Ext.create('Ext.panel.Panel', {
            bodyPadding: 5,
            width: '60%',
            title: 'Cuerpo y Resumen',
            region: 'east',
            collapsed : true,
            collapsible : true,
            items: [{
                xtype: 'htmleditor',
                hideLabel : true,
                width: '100%',
                id:'resumen',
                name:'resumen',
                value:'<h1>Resumen</h1>'
            }, {
                xtype: 'htmleditor',
                hideLabel : true,
                id:'cuerpo',
                name:'cuerpo',
                width: '100%',
                value:'<h1>Cuerpo Entero</h1>'
            }]
        });
        var _panel = new Ext.Panel({
            title: 'Galeria de Imagenes',
            border: true,
            frame: true,
            layout: 'border',
            height: App.GetDesktopHeigth(),
            width: '100%',
            items: [_grid],
            listeners: {
                afterrender: function() {
                    this.__data_store.load({
                        params:{
                            start:0,
                            limit:25
                        }
                    });
                },
                scope : this
            }
        });
        return _panel;
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
App.RegisterModule('Gallery', new Gallery());
function img(val2){
    if(val2==''||val2==null){
        return '<div class="games_config_background64">&nbsp;</div>'}
    else{
        return '<img width="300px" height="300px" src="data:image/png;base64,'+ val2 +'"/>'}
};