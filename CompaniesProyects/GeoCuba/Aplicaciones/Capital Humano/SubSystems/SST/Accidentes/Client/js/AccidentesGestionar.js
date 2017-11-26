function AccidentesGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Accidentes_btn_id',
            tooltip : 'Adiciona un nuevo Accidente de Trabajo',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Accidentes_btn_id',
            tooltip : 'Elimina el Accidente seleccionado',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Accidentes_btn_id',
            tooltip : 'Modifica el Accidente seleccionado',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Accidentes_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
    }

    this.Enable = function(){
        this._btn_mod.enable();
        this._btn_del.enable();         
    }
    this.Disable = function(){
        this._btn_mod.disable();
        this._btn_del.disable();
    }
}
App.RegisterFunction('AccidentesGestionar', new AccidentesGestionar());
this.panel=null;
this.panelupd=null;
Accidentes.prototype.OnShowWindow = function(_paccion){
    if(_paccion == 'add')
    {
        var __data_store_Equip = App.BuildJsonStore('Accidentes.Accidentes.ObtenerTrabajadores',{
            fields:[
                    {type: 'string',name: 'id'},
                    {type: 'string',name: 'nombre_completo'},
                    {type: 'float',name: 'dias'}
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'results'
                }
            },
            autoLoad: true
        });
        var __data_store_Equip2 = App.BuildJsonStore('Accidentes.Accidentes.ObtenerTrabajadoresExistente',{
            fields: [
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre_completo'},
                {type: 'float',name: 'dias'}
            ],
            proxy: {
                type: 'ajax',
                reader: {

                }
            },
            autoLoad: false
        });

        var __data_store_Riesg = App.BuildJsonStore('Accidentes.Accidentes.ObtenerRiesgos',{
            fields:[
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre_riesgo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'results'
                }
            },
            autoLoad: true
        });
        var __data_store_Riesg2 = App.BuildJsonStore('Accidentes.Accidentes.ObtenerRiesgosExistente',{
            fields: [
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre_riesgo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {

                }
            },
            autoLoad: false
        });

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        var _grid = new Ext.grid.GridPanel({
            id : 'recursos_grid_id',
            height : 150,
            width : '100%',
            frame: true,
            store : __data_store_Equip,
            selType: 'rowmodel',
            tbar:[
                {
                    xtype: 'textfield',
                    text: 'Nombre',
                    id:'nombre_filter',
                    listeners:{
                        change:function(This,value){
                            __data_store_Equip.clearFilter();
                            __data_store_Equip.filter('nombre_completo',value);
                        }
                    }
                }
            ],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'firstGridDDGroup',
                    dropGroup: 'secondGridDDGroup'
                }
            },
            columns : [
                {
                    header: 'Trabajador',
                    dataIndex: 'nombre_completo',
                    flex: 30
                }
            ],
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip2.add(record.data);
                    __data_store_Equip.remove(record);
                }
            },
            stripeRows: true
        });
        var _grid2 = new Ext.grid.GridPanel({
        id : 'store_grid_id',
        height : 150,
        width : '100%',
        frame: true,
        store : __data_store_Equip2,
        selType: 'rowmodel',
        tbar:[
            {
                xtype: 'textfield',
                text: 'Nombre',
                id:'nombre_filter2',
                listeners:{
                    change:function(This,value){
                        __data_store_Equip2.clearFilter();
                        __data_store_Equip2.filter('nombre_completo',value);
                    }
                }
            }
        ],
        columns : [
            {
                header: 'Trabajador',
                dataIndex: 'nombre_completo',
                flex: 30
            },{
                header: 'Dias Afectados',
                dataIndex: 'dias',
                flex: 30,
                editor: {
                    allowBlank: false,
                    xtype:'numberfield',
                    decimalPrecision:4
                }
            }
        ],
        viewConfig: {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'secondGridDDGroup',
                dropGroup: 'firstGridDDGroup'
            }
        },
        listeners:{
            itemdblclick: function(This,record){
                __data_store_Equip.add(record.data);
                __data_store_Equip2.remove(record);
            }
        },
        stripeRows: true,
        plugins: [cellEditing]
    });

        var _grid3 = new Ext.grid.GridPanel({
            id : 'recursos_grid_id2',
            height : 150,
            width : '100%',
            frame: true,
            store : __data_store_Riesg,
            selType: 'rowmodel',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'firstGridDDGroup',
                    dropGroup: 'secondGridDDGroup'
                }
            },
            columns : [
                {
                    header: 'Riesgo',
                    dataIndex: 'nombre_riesgo',
                    flex: 30
                }
            ],
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip2.add(record.data);
                    __data_store_Equip.remove(record);
                }
            },
            stripeRows: true
        });
        var _grid4 = new Ext.grid.GridPanel({
            id : 'store_grid_id2',
            height : 150,
            width : '100%',
            frame: true,
            store : __data_store_Riesg2,
            selType: 'rowmodel',
            columns : [
                {
                    header: 'Riesgo',
                    dataIndex: 'nombre_riesgo',
                    flex: 30
                }
            ],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                }
            },
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip.add(record.data);
                    __data_store_Equip2.remove(record);
                }
            },
            stripeRows: true
        });

        var _panel2 = new Ext.form.Panel({
            border : false,
            frame : true,
            layout : 'column',
            id:'panel_accidente_id',
            height : 190,
            width : '100%',
            items:[{
                columnWidth:.5,
                items:[ {
                            xtype: 'textfield',
                            fieldLabel: 'Lugar',
                            name: 'lugar',
                            id:'lugar'
                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Fecha Suceso',
                            format:'Y-m-d',
                            name: 'fecha_suceso',
                            id:'fecha_suceso'
                        },{
                            xtype: 'textarea',
                            fieldLabel: 'Causa',
                            name: 'causa',
                            rows:3,
                            id:'causa'
                        },_grid,_grid3],
                frame:true,
                style: {
                    border:'0px'
                }
            },{
                items:[ {
                            xtype: 'textarea',
                            fieldLabel: 'Evento',
                            name: 'evento',
                            rows:2,
                            margin:'5 0 5 0',
                            style:'margin-bottom:5px !important',
                            id:'evento'
                        },{
                            xtype: 'textarea',
                            fieldLabel: 'Consecuencias',
                            name: 'consecuencias',
                            rows:3,
                            id:'consecuencias'
                        },_grid2,_grid4],
                columnWidth:.5,
                frame:true,
                style: {
                    border:'0px'
                }
            }
            ]
        });

        var _gst_win = new Ext.Window({
                title:'Adicionar un Accidente de Trabajo',
                id: '_gst_Add_win_id',
                name: '_gst_Add_win_id',
                height: 560,
                width: 600,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [_panel2],
                buttons: [{
                    text: 'Aceptar',
                    cls:'btn btn-primary',
                   // iconCls:'icon-ok-sign',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',
                    cls:'btn btn-primary',
                    //iconCls:'icon-remove-circle',
                    handler: function(){
                        _gst_win.close();
                    }
                }]
            });
        _gst_win.show();
    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Accidentes.prototype.OnShowWindow2 = function(_paccion){

    var _selectionModel = Ext.getCmp('Accidentes_grid_id').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    console.log(new Date(_selected_rcd.data.fecha_suceso));

    if(_paccion == 'upd')
    {
        var __data_store_Equip = App.BuildJsonStore('Accidentes.Accidentes.ObtenerTrabajadoresReal',{
            fields:[
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre_completo'},
                {type: 'float',name: 'dias'}
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'results'
                }
            },
            autoLoad: false
        });
        var __data_store_Equip2 = App.BuildJsonStore('Accidentes.Accidentes.ObtenerTrabajadoresReal',{
            fields: [
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre_completo'},
                {type: 'float',name: 'dias'}
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'results'
                }
            },
            autoLoad: false
        });

        var __data_store_Riesg = App.BuildJsonStore('Accidentes.Accidentes.ObtenerRiesgosReal',{
            fields:[
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre_riesgo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'results'
                }
            },
            autoLoad: false
        });
        var __data_store_Riesg2 = App.BuildJsonStore('Accidentes.Accidentes.ObtenerRiesgosReal',{
            fields: [
                {type: 'string',name: 'id'},
                {type: 'string',name: 'nombre_riesgo'}
            ],
            proxy: {
                type: 'ajax',
                reader: {
                    type: 'json',
                    root: 'rows',
                    totalProperty: 'results'
                }
            },
            autoLoad: false
        });

        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });

        __data_store_Equip.load({params:{id:_selected_rcd.data.id,not:'t'}});
        __data_store_Equip2.load({params:{id:_selected_rcd.data.id,not:'f'}});

        __data_store_Riesg.load({params:{id:_selected_rcd.data.id,not:'t'}});
        __data_store_Riesg2.load({params:{id:_selected_rcd.data.id,not:'f'}});

        var _grid = new Ext.grid.GridPanel({
            id : 'recursos_grid_id',
            height : 150,
            width : '100%',
            frame: true,
            store : __data_store_Equip,
            selType: 'rowmodel',
            tbar:[
                {
                    xtype: 'textfield',
                    text: 'Nombre',
                    id:'nombre_filter',
                    listeners:{
                        change:function(This,value){
                            __data_store_Equip.clearFilter();
                            __data_store_Equip.filter('nombre_completo',value);
                        }
                    }
                }
            ],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'firstGridDDGroup',
                    dropGroup: 'secondGridDDGroup'
                }
            },
            columns : [
                {
                    header: 'Trabajador',
                    dataIndex: 'nombre_completo',
                    flex: 30
                }
            ],
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip2.add(record.data);
                    __data_store_Equip.remove(record);
                }
            },
            stripeRows: true
        });
        var _grid2 = new Ext.grid.GridPanel({
            id : 'store_grid_id',
            height : 150,
            width : '100%',
            frame: true,
            store : __data_store_Equip2,
            selType: 'rowmodel',
            tbar:[
                {
                    xtype: 'textfield',
                    text: 'Nombre',
                    id:'nombre_filter2',
                    listeners:{
                        change:function(This,value){
                            __data_store_Equip2.clearFilter();
                            __data_store_Equip2.filter('nombre_completo',value);
                        }
                    }
                }
            ],
            columns : [
                {
                    header: 'Trabajador',
                    dataIndex: 'nombre_completo',
                    flex: 30
                },{
                    header: 'Dias Afectados',
                    dataIndex: 'dias',
                    flex: 30,
                    editor: {
                        allowBlank: false,
                        xtype:'numberfield',
                        decimalPrecision:4
                    }
                }
            ],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                }
            },
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip.add(record.data);
                    __data_store_Equip2.remove(record);
                }
            },
            stripeRows: true,
            plugins: [cellEditing]
        });

        var _grid3 = new Ext.grid.GridPanel({
            id : 'recursos_grid_id2',
            height : 150,
            width : '100%',
            frame: true,
            store : __data_store_Riesg,
            selType: 'rowmodel',
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'firstGridDDGroup',
                    dropGroup: 'secondGridDDGroup'
                }
            },
            columns : [
                {
                    header: 'Riesgo',
                    dataIndex: 'nombre_riesgo',
                    flex: 30
                }
            ],
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip2.add(record.data);
                    __data_store_Equip.remove(record);
                }
            },
            stripeRows: true
        });
        var _grid4 = new Ext.grid.GridPanel({
            id : 'store_grid_id2',
            height : 150,
            width : '100%',
            frame: true,
            store : __data_store_Riesg2,
            selType: 'rowmodel',
            columns : [
                {
                    header: 'Riesgo',
                    dataIndex: 'nombre_riesgo',
                    flex: 30
                }
            ],
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragGroup: 'secondGridDDGroup',
                    dropGroup: 'firstGridDDGroup'
                }
            },
            listeners:{
                itemdblclick: function(This,record){
                    __data_store_Equip.add(record.data);
                    __data_store_Equip2.remove(record);
                }
            },
            stripeRows: true
        });

        var _panel2 = new Ext.form.Panel({
            border : false,
            frame : true,
            layout : 'column',
            id:'panel_accidente_id',
            height : 190,
            width : '100%',
            items:[{
                columnWidth:.5,
                items:[ {
                    xtype: 'textfield',
                    fieldLabel: 'Lugar',
                    name: 'lugar',
                    id:'lugar',
                    value:_selected_rcd.data.lugar
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Fecha Suceso',
                    name: 'fecha_suceso',
                    format:'d/m/Y',
                    altFormats: 'm-d-Y|m.d.Y',
                    id:'fecha_suceso',
                    value:Ext.Date.add(new Date(_selected_rcd.data.fecha_suceso), Ext.Date.DAY, 1)
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Causa',
                    name: 'causa',
                    rows:3,
                    id:'causa',
                    value:_selected_rcd.data.causa
                },_grid,_grid3],
                frame:true,
                style: {
                    border:'0px'
                }
            },{
                items:[ {
                    xtype: 'textarea',
                    fieldLabel: 'Evento',
                    name: 'evento',
                    rows:2,
                    margin:'5 0 5 0',
                    style:'margin-bottom:5px !important',
                    id:'evento',
                    value:_selected_rcd.data.evento
                },{
                    xtype: 'textarea',
                    fieldLabel: 'Consecuencias',
                    name: 'consecuencias',
                    rows:3,
                    id:'consecuencias',
                    value:_selected_rcd.data.consecuencias
                },_grid2,_grid4],
                columnWidth:.5,
                frame:true,
                style: {
                    border:'0px'
                }
            }
            ]
        });

        var _gst_win = new Ext.Window({
            title:'Adicionar un Accidente de Trabajo',
            id: '_gst_Add_win_id',
            name: '_gst_Add_win_id',
            height: 560,
            width: 600,
            plain: true,
            layout: 'fit',
            modal: true,
            resizable: false,
            items: [_panel2],
            buttons: [{
                text: 'Aceptar',
                cls:'btn btn-primary',
                // iconCls:'icon-ok-sign',
                handler: Ext.Function.bind(this.Modid, this, [_paccion]),
                scope: this
            }, {
                text: 'Cancelar',
                cls:'btn btn-primary',
                //iconCls:'icon-remove-circle',
                handler: function(){
                    _gst_win.close();
                }
            }]
        });
        _gst_win.show();
    }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Accidentes.prototype.Add = function(_paccion){
    if (Ext.getCmp('panel_accidente_id').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));

        var form_values = Ext.getCmp('panel_accidente_id').getForm().getValues();

        var _selection = Ext.getCmp('store_grid_id2').store.data.items;
        var _array = '';
        for (var i = 0; i < _selection.length; i++)
        {
            _array += _selection[i].data.id + ';';
        }

        var _selection2 = Ext.getCmp('store_grid_id').store.data.items;

        var _array2 = '';
        for (var i = 0; i < _selection2.length; i++)
        {
            _array2 += _selection2[i].data.id+ '|' + _selection2[i].data.dias + ';';
        }

        form_values.trabajadores = _array2;
        form_values.riesgos = _array;

        var  _result = App.PerformSyncServerRequest('Accidentes.Accidentes.Add',form_values);
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            App.InfoMessage('Información', 'El Accidente de Trabajo fue adicionado satisfactoriamente');
            Ext.getCmp('panel_accidente_id').getForm().reset();
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error procesando los datos');
        }
    }
}
Accidentes.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panel_accidente_id').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var form_values = Ext.getCmp('panel_accidente_id').getForm().getValues();
        var _selectionModel = Ext.getCmp('Accidentes_grid_id').getSelectionModel();
        var _selected_rcd = _selectionModel.getLastSelected();

        var _selection = Ext.getCmp('store_grid_id2').store.data.items;
        var _array = '';
        for (var i = 0; i < _selection.length; i++)
        {
            _array += _selection[i].data.id + ';';
        }

        var _selection2 = Ext.getCmp('store_grid_id').store.data.items;

        var _array2 = '';
        for (var i = 0; i < _selection2.length; i++)
        {
            _array2 += _selection2[i].data.id+ '|' + _selection2[i].data.dias + ';';
        }

        form_values.trabajadores = _array2;
        form_values.riesgos = _array;
        form_values.id = _selected_rcd.data.id;
        var _result = App.PerformSyncServerRequest('Accidentes.Accidentes.Modid',form_values);
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'Accidente modificado satisfactoriamente');
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
        }
        else{
            App.InfoMessage('Información', 'Ha ocurrido un error procesando los datos');
        }
    }
 }
Accidentes.prototype.deltect=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Accidentes_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Accidentes.Accidentes.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        { App.InfoMessage('Información', 'Accidente eliminado correctamente');
            me.__data_store.load();
        }else{
            App.InfoMessage('Información', 'Ha ocurrido un error procesando los datos');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Accidente?');


}
