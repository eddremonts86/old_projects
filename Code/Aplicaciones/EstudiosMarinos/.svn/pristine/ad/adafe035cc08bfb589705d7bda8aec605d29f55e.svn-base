function Resolucion(){
    this.__data_store = null;
    this.descripcion=null
    this.cadena =null;
    this.panelGeneral=null;
    this.panel = null;
    this.Init = function()
    {
        var _menu_item_config_resolucion =
        {
            text: 'Importar Datos',
            id: 'Resolucion_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
       App.InsertMenuItem('Gestión del Sistema', _menu_item_config_resolucion);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.panelGeneral = new Ext.Panel({
                title: 'Importar Datos',
                border: true,
                frame: true,
                id:'panelGeneral',
                name:'panelGeneral',
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
               html:'<div id="resol"></div>',
                tbar: {
                    id: 'Resolucion_tbar_id',
                    items: ['-'],
                    height: 28
                },
                listeners: {
                    afterRender:function(){
                        var url = "SubSystems/EMarinos/Resolucion/Server/jq_Resolucion.php?termino=info";
                        var source ={
                            datatype: "json",
                            datafields: [
                                {name: 'id'},
                                {name: 'fecha'},
                                {name: 'hora'},
                                {name: 'altura'},
                                {name: 'direccion'},
                                {name: 'velocidad'},
                                {name: 'lugar'}
                            ],
                            cache: false,
                            url: url,
                            filter: function()
                            {
                                // update the grid and send a request to the server.
                                $("#resol").jqxGrid('updatebounddata', 'filter');
                            },
                            sort: function()
                            {
                                // update the grid and send a request to the server.
                                $("#resol").jqxGrid('updatebounddata', 'sort');
                            },
                            root: 'Rows',
                            beforeprocessing: function(data)
                            {
                                if (data != null)
                                {
                                    source.totalrecords = data[0].TotalRows;
                                }
                            }
                        };
                        var dataadapter = new $.jqx.dataAdapter(source, {
                            loadError: function(xhr, status, error)
                            {
                                alert(error);
                            }
                        });
                        $("#resol").jqxGrid({
                            width: '100%',
                            height: '100%',
                            source: dataadapter,
                            groupable: true,
                            filterable: true,
                            sortable: true,
                            showstatusbar: true,
                            theme:'metro',//dark',
                            columns: [
                                { text: 'Lugar', datafield: 'lugar', width: 120 },
                                { text: 'Fecha', datafield: 'fecha', width: 250 },
                                { text: 'Hora', datafield: 'hora', width: 120 },
                                { text: 'Altura', datafield: 'altura', width: 120 },
                                { text: 'Direccion', datafield: 'direccion' },
                                { text: 'Velocidad', datafield: 'velocidad', width: 120 }
                            ],
                            groups: ['lugar','fecha']
                        });
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
App.RegisterModule('Resolucion', new Resolucion());