function Cursos(){
    this.__data_store = null;
    this.Init = function()
    {                   
        var _menu_item_config_cliente =
        {
            text: 'Eventos y Cursos en Oferta',
            id: 'Cursos_menu_id1',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Capacitación',_menu_item_config_cliente);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {
        this.__data_store = App.BuildJsonStore('Cursos.Cursos.CargarDatos',
        {
            fields: [
            {name: 'id'},
            {name: 'nombre',header:'Nombre'},
            {name: 'fecha_inicio',type:'date',dateFormat: 'Y-m-d',header: 'Fecha de inicio'},
            {name: 'fecha_fin',type:'date',dateFormat: 'Y-m-d',header: 'Fecha de fin'},
            {name: 'descripcion'},
            {name: 'eventos',header:'Tipo de eventos'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
            });
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
        var _grid = new Ext.grid.Panel(
        {
            id: 'Cursos_grid_id',
            name: 'Cursos_grid_id',
            height: App.GetDesktopHeigth() - 35,
            width: '100%',
            region: 'center',
            frame: true,
            store: this.__data_store,
            columns: [{
                header: 'Nombre',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'nombre',
                flex: 3
                },{
                header: 'Tipo de eventos',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'eventos',
                flex: 3
                },{
                header: 'Fecha de inicio',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fecha_inicio',
                flex: 2,
                renderer: function (value) {
                    return value ? Ext.Date.dateFormat(value, 'd-m-Y') : '';
                }
            },{
                header: 'Fecha de fin',
                menuDisabled: true,
                sortable : false,
                dataIndex: 'fecha_fin',
                flex: 2,
                renderer: function (value) {
                    return value ? Ext.Date.dateFormat(value, 'd-m-Y') : '';
                }
            }],
            plugins: [this.cellEditing,{
                ptype: 'rowexpander',
                rowBodyTpl : new Ext.XTemplate(
                    '<table class="table table-bordered mejorar">' ,
                    '<tr class="info">',
                    '<td>Descripcion: {descripcion}</td>',
                    '</tr>',
                    '</table>',
                    {
                        formatChange: function(v){
                            var color = v >= 0 ? 'green' : 'red';
                            return '<span style="color: ' + color + ';">' + Ext.util.Format.usMoney(v) + '</span>';
                        }
                    })
            }],
            viewConfig: {
                forceFit: true
            },
            tbar: {
                id: 'Cursos_tbar_id',
                items: ['-'],
                height: 28
            },
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },('->'),{
        xtype: 'button',
            //text : 'Ayuda',
            iconCls:'help',
            handler:function(){
            Ext.create('Ext.window.Window', {
                title: '¿Necesita Ayuda?',
                height:'25%',
                width:'55%',
                iconCls:'help',modal:true,
                autoScroll:true,
                layout: 'anchor',
                html:
                    '<ul class="nav nav-list">' +
                        '<li>El modulo <span class="label label-info">" Gestionar Cursos y Eventos"</span>' +
                        ' le permite gestionar los cursos y/o eventos que estarán disponibles para los trabajadores en una fecha dada<br>' +
                        '<span class="label label-important">Debe saber que :</span>' +
                        '<br>Los cursos que lleguen a su fecha de inicio se desactivan automaticamente en el sistema.<br>' +
                        '</li>' +
                        '</ul>'

            }).show();
        }
    }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0){
                            this.Disable('CursosGestionar');
                        }
                        else
                        {
                          this.Enable('CursosGestionar');
                        }
                            
                    },
                    scope: this
                }
            }
        }); 
        var _panel = new Ext.Panel(
        {
            title: 'Gestionar Eventos en Oferta',
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
App.RegisterModule('Cursos', new Cursos());