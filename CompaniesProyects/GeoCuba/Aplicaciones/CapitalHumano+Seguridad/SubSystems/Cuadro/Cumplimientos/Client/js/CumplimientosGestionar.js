function CumplimientosGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Guardar',
            id: 'add_Cumplimientos__bt_id',
            tooltip : 'Adiciona un  nuevo Cumplimientos',
            iconCls: 'list_add16',
            handler: Ext.Function.bind(this.Owner.OnShowWindowcp, this.Owner,['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Cumplimientos_btn_id',
            tooltip : 'Elimina el Cumplimientos seleccionado',
            iconCls: 'edit_delete16',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltectcp, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Historial',
            id: 'mod_Cumplimientos_btn_id',
            tooltip : 'Modifica el Cumplimientos seleccionado',
            iconCls: 'apply16',
            disabled: false,
            handler: Ext.Function.bind(this.Owner.OnShowWindow2cp, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Cumplimientos_tbar_id');
        tbar.add('->');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
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
App.RegisterFunction('CumplimientosGestionar', new CumplimientosGestionar());
this.panel=null;
this.panelupd=null;
Cumplimientos.prototype.OnShowWindowcp = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        var storeM = Ext.getCmp('Cumplimientos_grid_id').store;
        for (var i = 0; i < storeM.count(); i++) {
            var plan = storeM.data.items[i].data.plan;
            var plan_real = storeM.data.items[i].data.plan_real;
            var cumpl = storeM.data.items[i].data.cumpl;
            var obs = storeM.data.items[i].data.obs;
            storeM.data.items[i].data.obs = cumpl;
            storeM.data.items[i].data.cumpl = cumpl;
            Ext.getCmp('Cumplimientos_grid_id').getView().refresh();
        }
            var mydd =new Array();
            _array = new Array();
            var mydd = Ext.getCmp('Cumplimientos_grid_id').getStore().getModifiedRecords();
            if (mydd.length === 0)
            {
                App.InfoMessage('Información', 'No ha modificado fila alguna');
            }
            else
            {
                for (var i = 0; i < mydd.length; i++){
                    _array.push(mydd[i].getData());
                }
                var formada = 0;
                var mystore = Ext.getCmp('Cumplimientos_grid_id').store;
                for (var i = 0; i < mystore.getCount(); i++)
                {
                    if (mystore.getAt(i).data.formador == 'true')
                    {
                        if (mystore.getAt(i).data.cumpl >= 100)
                        {
                            var valor = (((mystore.getAt(i).data.cumpl - 100) * 2) + 5)
                            if (valor >= 30)
                                formada = 30;
                            if (valor < 30)
                                formada = (((mystore.getAt(i).data.cumpl - 100) * 2) + 5);

                        }
                    }
                    if (mystore.getAt(i).data.sistema_pagoid == 2 && mystore.getAt(i).data.formador == 'true')
                    {
                        if (mystore.getAt(i).data._real >= 0.98)
                        {
                            formada = 30
                        }
                        if (mystore.getAt(i).data._real > 0.97 && mystore.getAt(i).data._real < 0.98)
                        {
                            formada = 20
                        }
                        if (mystore.getAt(i).data._real > 0.96 && mystore.getAt(i).data._real < 0.971)
                        {
                            formada = 15
                        }
                        if (mystore.getAt(i).data._real > 0.95 && mystore.getAt(i).data._real < 0.961)
                        {
                            formada = 10
                        }
                        if (mystore.getAt(i).data._real == 0.95)
                        {
                            formada = 5
                        }
                        if (mystore.getAt(i).data._real < 0.95)
                        {
                            formada = 0
                        }
                    }
                }

                for (var i = 0; i < mystore.getCount(); i++)
                {
                    if (mystore.getAt(i).data.orden == 2)
                    {
                        if (mystore.getAt(i).data.cumpl < 90)
                            formada = 0;
                        if (mystore.getAt(i).data.cumpl > 89 && mystore.getAt(i).data.cumpl < 100)
                        {
                            var valor = (100 - mystore.getAt(i).data.cumpl);
                            var valor2 = (formada * valor) / 100
                            formada -= valor2;
                        }
                    }
                }
                for (var i = 0; i < mystore.getCount(); i++)
                {
                    if (mystore.getAt(i).data.orden == 3)
                        if (mystore.getAt(i).data.cumpl < 100)
                            formada = 0;
                    if (mystore.getAt(i).data.orden == 8)
                        if (mystore.getAt(i).data.cumpl > 100)
                            formada = 0;
                }
                for (var i = 0; i < mystore.getCount(); i++)
                {
                    if (mystore.getAt(i).data.orden == 5)
                        if (mystore.getAt(i).data.plan > 0)
                        {
                            var valor = (formada * 25) / 100;
                            formada -= valor;
                        }
                }
                for (var i = 0; i < mystore.getCount(); i++)
                {
                    if (mystore.getAt(i).data.orden == 4 || mystore.getAt(i).data.orden == 9)
                    {
                        if (mystore.getAt(i).data.cumpl > 98.01 && mystore.getAt(i).data.cumpl < 99.99)
                        {
                            var valor2 = (formada * 5) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 97.01 && mystore.getAt(i).data.cumpl < 98.00)
                        {
                            var valor2 = (formada * 10) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 96.01 && mystore.getAt(i).data.cumpl < 97.00)
                        {
                            var valor2 = (formada * 15) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 95.01 && mystore.getAt(i).data.cumpl < 96.00)
                        {
                            var valor2 = (formada * 20) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 94.01 && mystore.getAt(i).data.cumpl < 95.00)
                        {
                            var valor2 = (formada * 25) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 93.01 && mystore.getAt(i).data.cumpl < 94.00)
                        {
                            var valor2 = (formada * 30) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 92.01 && mystore.getAt(i).data.cumpl < 93.00)
                        {
                            var valor2 = (formada * 35) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 91.01 && mystore.getAt(i).data.cumpl < 92.00)
                        {
                            var valor2 = (formada * 40) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl > 90.01 && mystore.getAt(i).data.cumpl < 91.00)
                        {
                            var valor2 = (formada * 45) / 100
                            formada -= valor2;
                        }
                        if (mystore.getAt(i).data.cumpl <= 90.00)
                        {
                            var valor2 = (formada * 50) / 100
                            formada -= valor2;
                        }

                    }
                }
                for (var i = 0; i < mystore.getCount(); i++)
                {
                    if (mystore.getAt(i).data.orden == 10 || mystore.getAt(i).data.orden == 12 || mystore.getAt(i).data.orden == 13)
                        if (mystore.getAt(i).data.cumpl < 100)
                        {
                            var valor = (formada * 25) / 100;
                            formada -= valor;
                        }
                }
                for (var i = 0; i < mystore.getCount(); i++)
                {
                    if (mystore.getAt(i).data.orden == 11)
                        if (mystore.getAt(i).data.cumpl < 85)
                        {
                            var valor = (formada * 25) / 100;
                            formada -= valor;
                        }
                }
                var arr = new Array();
                for (var i = 0; i < mystore.getCount(); i++)
                {
                    arr.push(mystore.getAt(i).data);
                }

               var fnCallBack_after = function()   {
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            //console.log(formada)
                           var _result = App.PerformSyncServerRequest('Cumplimientos.Cumplimientos.Add',{data: Ext.encode(_array),formada:formada});
                            App.HideMsgBox();
                            if(_result)
                            {
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                            {
                                App.InfoMessage('Información', 'Ocurrio un error');
                            }
                        }
                App.ConfirmMessage(fnCallBack_after, '¿Está seguro que desea almacenar los datos?');
            }
    }
    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Cumplimientos.prototype.OnShowWindow2cp = function(_paccion){
    var _selectionModel = Ext.getCmp('grid').getSelectionModel();
    var _selected_rcd = _selectionModel.getLastSelected();
    var id_tpo=_selected_rcd.data.id;
    if(_paccion == 'upd')
     {
         this.__data_store_historia = App.BuildJsonStore('Cumplimientos.Cumplimientos.CargarDatos_hist',{
             fields: [
                 {name: 'nombre'},
                 {name: 'cg'},
                 {name: 'ce'},
                 {name: 'formador'},
                 {name: 'id'},
                 {name: 'id_ind'},
                 {name: 'plan'},
                 {name: 'compli'},
                 {name: 'observ'},
                 {name: 'fecha'},
                 {name: 'id_trab'},
                 {name: 'plan_real'},
                 {name: 'nombre_completo'}

             ],
             groupField : 'fecha',
             params:{id:id_tpo},
             proxy: {
                 type: 'ajax',
                 reader: {type: 'json',root: 'rows',totalProperty: 'results'}
             },
             autoLoad: true
         });
         var groupingFeature = Ext.create('Ext.grid.feature.Grouping',{
             groupHeaderTpl: 'Sistema de Pago: {name} ' + ' ({rows.length})'
         });
         this._grid = new Ext.grid.Panel({
             id: 'Cumplimientos_grid_id_historia',
             name: 'Cumplimientos_grid_id_historia',
             height: App.GetDesktopHeigth() - 35,
             width: '100%',
             layout: 'anchor',
             region: 'center',
             features: [groupingFeature],
             plugins: [
                 Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1})],
             frame: true,
             store: this.__data_store_historia,
             columns: [
                 {hidden: true, dataIndex: 'indicadoresid'},
                 {header: 'Nombre del Indicador', dataIndex: 'nombre', flex: 10},
                 {header: 'Plan', dataIndex: 'plan', flex: 4, align: 'center', editor:
                 {allowBlank: false,maskRe: /[0-9.]$/,type: 'float',id: '_plan',name: '_plan',listeners: {focus: function(This, eOpts) {
                         This.selectText();
                     }}}},
                 {header: 'Real', dataIndex: 'plan_real', flex: 4, align: 'center', editor:
                 {allowBlank: false,maskRe: /[0-9.]$/,type: 'float',id: 'plan_real',name: 'plan_real',listeners: {focus: function(This, eOpts) {This.selectText();}}}},
                 {header: '% Cumpl', dataIndex: 'compli', flex: 4, align: 'center', renderer: function(value, metaData, record){
                     var v = record.data.orden
                     if(v == 5 && record.data.plan == 0 && record.data.plan_real == 0||record.data.plan == '' && record.data.plan_real == ''){
                         record.data.cumpl = '100%';
                         return '<span style="color:green;">100%</span>';
                     }
                     else{
                         value = record.data.plan_real / record.data.plan * 100
                         record.data.cumpl = Ext.util.Format.round(value, 1);
                         if (value < 90)
                             return '<span style="color:red;">' + Ext.util.Format.round(value, 1) + ' %</span>';
                         if (value >= 90 && value < 100)
                             return '<span style="color:black;">' + Ext.util.Format.round(value, 1) + ' %</span>';
                         if (value >= 100)
                             return '<span style="color:green;">' + Ext.util.Format.round(value, 1) + ' %</span>';

                     }
                 }},
                 {header: 'Obs', dataIndex: 'observ', flex: 4, align: 'center',
                     renderer: function(value, metaData, record){
                     var orden = record.data.orden
                     if(orden == 1  && record.data.formador == true){
                         if (record.get('plan')== 0 && record.get('plan_real') == 0)
                             return null;
                         if (record.get('plan') <= record.get('plan_real'))
                         {
                             record.data.observ = 'No Penalizar';
                             return '<span style="color:green;">No Penalizar</span>';
                             console.log(v);
                         }
                         else
                         {
                             record.data.observ = 'Penalizar';
                             return '<span style="color:red;">Penalizar</span>';
                             console.log(v);
                         }
                     }
                     else if(orden == 1  && record.data.formador != true){
                         if (record.get('plan') == 0 && record.get('plan_real') == 0)
                             return null;
                         if (record.data.id_sp != 'DE_capital_humano_12147')
                         {
                             if (record.get('plan') <= record.get('plan_real'))
                             {
                                 record.data.observ = 'Cumplido';
                                 return '<span style="color:green;">Cumplido</span>';
                             }
                             else
                             {
                                 record.data.observ = 'No Cumplido';
                                 return '<span style="color:red;">No Cumplido</span>';
                             }
                         }
                         if (record.data.id_sp == 'DE_capital_humano_12147')
                         {
                             if (record.get('plan_real') >= 0.95)
                             {
                                 record.data.observ = 'Cumplido';
                                 return '<span style="color:green;">Cumplido</span>';
                             }
                             else
                             {
                                 record.data.observ = 'No Cumplido';
                                 return '<span style="color:red;">No Cumplido</span>';
                             }
                         }
                     }
                     if (orden == 2 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('cumpl')>= 90)
                         {
                             record.data.observ = 'Cumplido';
                             return '<span style="color:green;">Cumplido</span>';
                         }
                         else
                         {
                             record.data.observ = 'No Cumplido';
                             return '<span style="color:red;">No Cumplido</span>';
                         }
                     }
                     if (orden == 3 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('cumpl')>= 100)
                         {
                             record.data.observ = 'No Penalizar';
                             return '<span style="color:green;">No Penalizar</span>';
                         }
                         else
                         {
                             record.data.observ = 'Penalizar';
                             return '<span style="color:red;">Penalizar</span>';
                         }
                     }
                     if (orden == 4 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('cumpl') >= 100)
                         {
                             record.data.observ = '50%';
                             return '<span style="color:green;">50%</span>';
                         } else if (record.get('cumpl') > 98 && record.get('cumpl') < 100) {
                             record.data.observ = '45%';
                             return '<span style="color:green;">45%</span>';
                         } else if (record.get('cumpl') > 97 && record.get('cumpl') <= 98) {
                             record.data.observ = '40%';
                             return '<span style="color:green;">40%</span>';
                         } else if (record.get('cumpl') > 96 && record.get('cumpl') <= 97) {
                             record.data.observ = '35%';
                             return '<span style="color:green;">35%</span>';
                         } else if (record.get('cumpl') > 95 && record.get('cumpl') <= 96) {
                             record.data.observ = '30%';
                             return '<span style="color:green;">30%</span>';
                         } else if (record.get('cumpl') > 94 && record.get('cumpl') <= 95) {
                             record.data.observ = '25%';
                             return '<span style="color:green;">25%</span>';
                         } else if (record.get('cumpl') > 93 && record.get('cumpl') <= 94) {
                             record.data.observ = '20%';
                             return '<span style="color:green;">20%</span>';
                         } else if (record.get('cumpl') > 92 && record.get('cumpl') <= 93) {
                             record.data.observ = '15%';
                             return '<span style="color:green;">15%</span>';
                         } else if (record.get('cumpl') > 91 && record.get('cumpl') <= 92) {
                             record.data.observ = '10%';
                             return '<span style="color:green;">10%</span>';
                         } else if (record.get('cumpl') > 90 && record.get('cumpl') <= 91) {
                             record.data.observ = '5%';
                             return '<span style="color:green;">5%</span>';
                         } else {
                             record.data.observ = '0%';
                             return '<span style="color:green;">0%</span>';
                         }
                     }
                     if (orden == 5 ){
                         if (record.data.plan == 0 && record.data.plan_real == 0) {
                             record.data.observ = '25%';
                             return '<span style="color:green;">25%</span>';
                         }
                         else {
                             record.data.observ = '-25%';
                             return '<span style="color:green;">-25%</span>';
                         }

                     }
                     if (orden == 8 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('plan') <= 100)
                         {
                             record.data.observ = 'Se cumple';
                             return '<span style="color:green;">Se cumple</span>';
                         }
                         else
                         {
                             record.data.observ = 'No se cumple';
                             return '<span style="color:red;">No se cumple</span>';
                         }
                     }
                     if (orden == 9 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('plan') <= 100)
                         {
                             record.data.observ = 'Estimular';
                             return '<span style="color:green;">Se cumple</span>';
                         }
                         else
                         {
                             record.data.observ = 'Penalizar';
                             return '<span style="color:red;">No se cumple</span>';
                         }
                     }
                     if (orden == 10 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('plan') <= 100)
                         {
                             record.data.observ = '25%';
                             return '<span style="color:green;">25%</span>';
                         }
                         else
                         {
                             record.data.observ = '-25%';
                             return '<span style="color:red;">- 25%</span>';
                         }
                     }
                     if (orden == 11 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('plan') <= 85)
                         {
                             record.data.observ = '25%';
                             return '<span style="color:green;">25%</span>';
                         }
                         else
                         {
                             record.data.observ = '-25%';
                             return '<span style="color:red;">- 25%</span>';
                         }
                     }
                     if (orden == 12 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('plan') <= 100)
                         {
                             record.data.observ = '25%';
                             return '<span style="color:green;">25%</span>';
                         }
                         else
                         {
                             record.data.observ = '-25%';
                             return '<span style="color:red;">- 25%</span>';
                         }
                     }
                     if (orden == 13 && record.data.plan != 0 && record.data.plan_real != 0){
                         if (record.get('plan') <= 100)
                         {
                             record.data.observ = '25%';
                             return '<span style="color:green;">25%</span>';
                         }
                         else
                         {
                             record.data.observ = '-25%';
                             return '<span style="color:red;">- 25%</span>';
                         }
                     }
                     if(orden == 14 && record.get('plan')!= 0 && record.get('plan_real') != 0 ){
                         if (record.get('cumpl') >= 100)
                         {
                             record.data.observ = 'No Penalizar';
                             return '<span style="color:green;">No Penalizar</span>';
                         }
                         else
                         {
                             record.data.observ = 'Penalizar';
                             return '<span style="color:red;">Penalizar</span>';
                         }
                     }
                     else return value;
                 }},
                 {hidden: true, dataIndex: 'comportamiento'}
             ],
             viewConfig: {
                 forceFit: true
             },
             bbar: {
                 xtype: 'pagingtoolbar',
                 pageSize: 10,
                 store: this.__data_store_historia,
                 displayInfo: true,
                 plugins: new Ext.ux.ProgressBarPager()
             }

         });
         var _gst_win = new Ext.Window({
                 title:'Modificar el Control',
                 id: '_gst_Udt_win_id',
                 name: '_gst_Udt_win_id',
                 height: '70%',
                 width: '80%',
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this._grid],
                 buttons: [{
                     text: 'Actualizar',cls:'btn btn-success',
                     handler: Ext.Function.bind(this.Modid, this, [_paccion,_selectionModel,_selected_rcd]),
                     scope: this
                 }, {
                     text: 'Cancelar',cls:'btn btn-primary',
                     handler: function(){
                         _gst_win.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('_gst_Udt_win_id').focus(true, true);
                     }
                 }
             });
         _gst_win.show();
     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
Cumplimientos.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var   _result = App.PerformSyncServerRequest('Cumplimientos.Cumplimientos.Add',this.panel.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('nombre_id').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'Cumplimientos adicionado satisfactoriamente');
        }
    }
}
Cumplimientos.prototype.Modid = function(_paccion,_selectionModel,_selected_rcd){

    if (Ext.getCmp('panelupd').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Cumplimientos.Cumplimientos.Modid',this.panelupd.getForm().getValues());
        this.__data_store.load();
        App.HideMsgBox();

        if(_result)
        {
            Ext.getCmp('_gst_Udt_win_id').close();
            _selectionModel.deselect(_selected_rcd);
            this.__data_store.load();
            App.InfoMessage('Información', 'Cumplimientos modificado satisfactoriamente');
        }
    }
 }
Cumplimientos.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Cumplimientos_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('Cumplimientos.Cumplimientos.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Cumplimientos eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este Cumplimientos?');

}
