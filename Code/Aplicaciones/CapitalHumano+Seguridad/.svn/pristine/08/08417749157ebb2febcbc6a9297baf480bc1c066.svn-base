function Sbajas(){
    var me= this;
    this.__data_store = null;
    this._store_combo = null;
    var main=null;
    var filter=null;
    this.Init = function()
    {
        var _menu_item_config_Sbajas =
        {
            text: 'Solicitar Baja',
            id: 'Sbajas_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertSubItemMenu('Plantilla','Bajas',_menu_item_config_Sbajas);
        Ext.require([
            'Ext.tip.*',
            'Ext.grid.*',
            'Ext.grid.plugin.*',
            'Ext.grid.features.*',
            'Ext.util.*',
            'Ext.toolbar.Paging',
            'Ext.ux.SlidingPager',
            'Ext.ux.PreviewPlugin',
            'Ext.ModelManager',
            'Ext.tip.QuickTipManager'
        ]);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj)
    {

        this.__data_store = App.BuildJsonStore('Sbajas.Sbajas.CargarDatos',{
                fields: [
                    {name: 'id'},
                    {name: 'nombre'},
                    {name: 'contrato_fin'},
                    {name: 'contrato_inicio'},
                    {name: 'alta'},
                    {name: 'activo',type:'boolean'},
                    {name:'baja', type:'boolean'},
                    {name:'licencia',type:'boolean'},
                    {name:'baja_a'},
                    {name:'licencia_a'}

                ],
                proxy: {
                    type: 'ajax',
                    reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                },
                autoLoad: false
            });
        this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
        function pintar(val2,met,record,a,b,c,d){

            var bajas = record.data.baja;
            var licencia = record.data.licencia;
            var bajas_a = record.data.baja_a;
            var licencia_a = record.data.licencia_a;

                if(bajas_a=="t"){
                    met.style = 'font-style:italic !important;font-weight: bold;background: #71ED96;';
                    }
                else if (licencia_a=="t"){
                    met.style = 'font-style:italic !important;font-weight: bold;background: #71ED96;';
                    }
                if(bajas==true){
                    met.style = 'font-style:italic !important;font-weight: bold;background: #D4344E;';
                }
                else if(licencia==true){
                    met.style = 'font-style:italic !important;font-weight: bold;background: #4CB1FF;';
                }
                else if(bajas==true && licencia==true){
                    met.style = 'font-style:italic !important;background: #D4344E;';
                }
                return val2;
        }
        var _grid = Ext.create('Ext.grid.Panel', {
            id: 'Sbajas_grid_id',
            margin: '0 5 0',
            store: this.__data_store,
            plugins: [this.cellEditing],
            columns: [
                {text: "Nombre", flex: 1, dataIndex: 'nombre',renderer:pintar},
                {text: "Inicio del Contrato",flex: 1, dataIndex: 'contrato_inicio',renderer:pintar},
                {text: "Fin del Contrato",flex: 1, dataIndex: 'contrato_fin',renderer:pintar},
                {text: "Fecha de Alta",flex: 1, dataIndex: 'alta',renderer:pintar},
                {xtype: 'checkcolumn',header:'Solicitar baja',dataIndex:'baja',width: 120,stopSelection: false,
                listeners: { checkchange:function(This, rowIndex, checked){
                        if (checked==true){
                            var id = Ext.getCmp('Sbajas_grid_id').store.getAt(rowIndex).data.id ;
                            var fnCallBack = function() {
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var  _result = App.PerformSyncServerRequest('Sbajas.Sbajas.Baja',{id: id});
                                App.HideMsgBox();
                                if(_result)
                                {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha guardado su solicitud corretamente');
                                }
                                else {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha producido un error');
                                }
                            }
                            Ext.MessageBox.confirm('Confirmaci&oacute;n', '¿Está seguro que desea causar baja?', function (btn) {
                                if (btn == 'yes')
                                    fnCallBack();
                                else{
                                    me.__data_store.load();
                                }
                                    
                            });
                        }
                        else {

                            var id = Ext.getCmp('Sbajas_grid_id').store.getAt(rowIndex).data.id ;
                            var fnCallBack = function() {
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var  _result = App.PerformSyncServerRequest('Sbajas.Sbajas.DBaja',{id: id});
                                App.HideMsgBox();
                                if(_result)
                                {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha guardado su solicitud corretamente');
                                }
                                else {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha producido un error');
                                }
                            }
                            Ext.MessageBox.confirm('Confirmaci&oacute;n', '¿Está seguro que no desea causar baja?', function (btn) {
                                if (btn == 'yes')
                                    fnCallBack();
                                else{
                                    me.__data_store.load();
                                }
                                    
                            });
                        }
                    }
                }},
                {xtype: 'checkcolumn',header:'Solicitar licencia',dataIndex:'licencia',width: 120,stopSelection: false,
                    listeners: { checkchange:function(This, rowIndex, checked){
                        if (checked==true){
                            var id = Ext.getCmp('Sbajas_grid_id').store.getAt(rowIndex).data.id ;
                            var fnCallBack = function() {
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var  _result = App.PerformSyncServerRequest('Sbajas.Sbajas.licencia',{id: id});
                                App.HideMsgBox();
                                if(_result)
                                {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha guardado su solicitud corretamente');
                                }
                                else {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha producido un error');
                                }
                            }
                            Ext.MessageBox.confirm('Confirmaci&oacute;n', '¿Está seguro que desea una licencia?', function (btn) {
                                if (btn == 'yes')
                                    fnCallBack();
                                else{
                                    me.__data_store.load();
                                }
                                    
                            });
                        }
                        else {

                            var id = Ext.getCmp('Sbajas_grid_id').store.getAt(rowIndex).data.id ;
                            var fnCallBack = function() {
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var  _result = App.PerformSyncServerRequest('Sbajas.Sbajas.Dlicencia',{id: id});
                                App.HideMsgBox();
                                if(_result)
                                {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha guardado su solicitud corretamente');
                                }
                                else {
                                    me.__data_store.load();
                                    App.InfoMessage('Información', 'Se ha producido un error');
                                }
                            }
                            Ext.MessageBox.confirm('Confirmaci&oacute;n', '¿Está seguro que no desea una licencia?', function (btn) {
                                if (btn == 'yes')
                                    fnCallBack();
                                else{
                                    me.__data_store.load();
                                }
                                    
                            });
                        }
                    }
                    }}
            ],
            enableLocking: true,
            width: '100%',
            region: 'center',
            bbar: [{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },('->'),{
                xtype: 'button',
//                text : 'Ayuda',
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
                                '<li>El modulo <span class="label label-info">" Solicitar Bajas o Licencia"</span>' +
                                ' le permite solicitar cualquiera de las dos opciones en la empresa </li>' +
                                'Debe saber que:<br>' +
                                ' <span class="label label-info">El color azul</span> determina los trabajadores que han' +
                                ' solicitado licencias ,' +
                                '<br><span class="label label-important1">El color rojo</span> las solicitudes de bajas' +
                                '<br><span class="label label-success">El color verde</span> las solicitudes que ya han sido resueltas. <br>' +

                                '</li>' +
                                '</ul>'

                    }).show();
                }
            }]

        });
        var _panel = new Ext.Panel({
                title: 'Solicitar Baja',
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
App.RegisterModule('Sbajas', new Sbajas());