function GestVCGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){



        var states = Ext.create('Ext.data.Store', {
            fields: ['mes', 'numero'],
            data : [
                {"mes":"Enero", "numero":"1"},
                {"mes":"Febrero", "numero":"2"},
                {"mes":"Marzo", "numero":"3"},
                {"mes":"Abril", "numero":"4"},
                {"mes":"Mayo", "numero":"5"},
                {"mes":"Junio", "numero":"6"},
                {"mes":"Julio", "numero":"7"},
                {"mes":"Agosto", "numero":"8"},
                {"mes":"Septiembre", "numero":"9"},
                {"mes":"Obtubre", "numero":"10"},
                {"mes":"Noviembre", "numero":"11"},
                {"mes":"Diciembre", "numero":"12"}

            ]
        });
        var _causas = Ext.create('Ext.data.Store', {
            fields: ['cau', 'numero'],
            data : [
                {"cau":"Violación", "numero":"1"},
                {"cau":"Control", "numero":"2"}
            ]
        });
        var causas = Ext.create('Ext.form.ComboBox', {
            emptyText: 'Causa',
            hideLabel : true,
            id:'causas',
            name:'causas',
            store: _causas,
            queryMode: 'local',
            displayField: 'cau',
            valueField: 'numero'
        });
        var mes = Ext.create('Ext.form.ComboBox', {
            emptyText: 'Mes',
            hideLabel : true,
            id:'mes',
            name:'mes',
            store: states,
            queryMode: 'local',
            displayField: 'mes',
            valueField: 'numero'
        });


        var tbar = Ext.getCmp('GestVC_tbar_id');
        tbar.add(causas);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(mes);
        tbar.add(' ');
        tbar.add('-');
        tbar.add({
            xtype: 'numberfield',
            anchor: '100%',
            name: 'anno',
            id: 'anno',
            hideLabel : true,
            fieldLabel: 'Bottles of Beer',
            value: 2013,
            minValue: 0
        });
        tbar.add(' ');
        tbar.add('-');
        tbar.add({ xtype: 'button', text: 'Buscar', iconCls:'go_last16',handler:function(){
            var meses=Ext.getCmp('mes').getValue();
            var annos=Ext.getCmp('anno').getValue();
            var causas=Ext.getCmp('causas').getValue();
            var grid= Ext.getCmp('GestVC_grid_id');
            if(causas==1){
                this.__data_store = App.BuildJsonStore('GestVC.GestVC.CargarDatos',{
                    fields: [
                        {name: 'foto'},
                        {name: 'tipo'},
                        {name: 'nombre'},
                        {name: 'fecha'},
                        {name: 'descripcion'},
                        {name: 'fecha_re'},
                        {name: 'nombre_completo'}
                    ],
                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                    },
                    autoLoad: false
                });
                this.__data_store.load({params:{start:0,limit:25,meses:meses,annos:annos,causas:causas}});
                //console.log(this.__data_store);
                grid.reconfigure(this.__data_store, [
                    Ext.create('Ext.grid.RowNumberer'),
                    {  header: 'Foto',
                        locked: true,
                        dataIndex: 'foto',
                        align: 'center',
                        width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            if(value == '' || value == null)
                                return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                            else
                                return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
                        }
                    },
                    {text: 'Datos del Cuadro', flex: 2, xtype:'templatecolumn', tpl:"<b>Cuadro:</b> "+'{nombre_completo}'+"<br>"+"<b>Fecha de Reactivación:</b> "+'({fecha_re})'+"<br><b>Descripción:</b> "+'{descripcion}'},
                    {text: 'Datos de la Violación', flex: 2, xtype:'templatecolumn', tpl:"<b>Tipo de Violacion:</b> "+'{nombre}'+"<br>"+"<b>Fecha:</b> "+'({fecha})'}

                ]);
            }
            else{
                this.__data_store = App.BuildJsonStore('GestVC.GestVC.CargarDatos',{
                    fields: [
                        {name: 'foto'},
                        {name: 'fecha'},
                        {name: 'nombre'},
                        {name: 'ejecutor'},
                        {name: 'fecha_reactivacion'},
                        {name: 'descrip'},
                        {name: 'nombre_completo'}
                    ],

                    proxy: {
                        type: 'ajax',
                        reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                    },
                    autoLoad: false
                });
                this.__data_store.load({params:{start:0,limit:25,meses:meses,annos:annos,causas:causas}});
                //console.log(this.__data_store);
                grid.reconfigure(this.__data_store, [
                    Ext.create('Ext.grid.RowNumberer'),
                    {  header: 'Foto',
                        locked: true,
                        dataIndex: 'foto',
                        align: 'center',
                        width: 80,
                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                            if(value == '' || value == null)
                                return '<input type="button" style="border: 0;width: 70px; height: 70px; background: url(\'SubSystems/Plantilla/Config/Client/icons/user3.png\') no-repeat;" />';
                            else
                                return '<img width="70px" height="70px" src="data:image/png;base64,'+value+'"/>';
                        }
                    },
                    {text: 'Datos del Cuadro', flex: 2, xtype:'templatecolumn', tpl:"<b>Cuadro:</b> "+'{nombre_completo}'+"<br>"+"<b>Fecha de Reactivación:</b> "+'({fecha_reactivacion})'+"<br><b>Descripción:</b> "+'{descrip}'},
                    {text: 'Datos del Control', flex: 2, xtype:'templatecolumn', tpl:"<b>Tipo de Control:</b> "+'{nombre}'+"<br><b>Ejecutor:</b> "+'{ejecutor}'+"<br>"+"<b>Fecha:</b> "+'({fecha})'}

                ]);
            }
        }});
    }
    this.Enable = function(){
//        this._btn_mod.enable();
//        this._btn_del.enable();
    }
    this.Disable = function(){
       /* this._btn_mod.disable();
        this._btn_del.disable();*/
    }
}
App.RegisterFunction('GestVCGestionar', new GestVCGestionar());
this.panel=null;
this.panelupd=null;
GestVC.prototype.OnShowWindowcp = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {

        this.__data_store_niveles_agen= App.BuildJsonStore('GestVC.GestVC.niveles',{
            fields: [
                {name: 'id'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        this.__data_store_trbajadores= App.BuildJsonStore('GestVC.GestVC.trbaj',{
            fields: [
                {name: 'plantilla_id'},
                {name: 'nombre_completo'},
                {name: 'contrato_id'},
                {name: 'trabajadorid'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
       var traba = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Trabajadores',
            store: this.__data_store_trbajadores,
            queryMode: 'local',
            id:'trbaj',
            name:'trbaj',
            displayField: 'nombre_completo',
            valueField: 'plantilla_id'
        });
        var nivel = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Nivel',
            store: this.__data_store_niveles_agen,
            queryMode: 'local',
            id:'Nivel',
            name:'Nivel',
            displayField: 'nombre',
            valueField: 'id'
        });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            name:'panel',
            defaults: {anchor: '100%'},
            defaultType: 'textfield',
            items: [traba,nivel]
        });
        var _gst_win = new Ext.Window({
                title:'Adicionar un Control',
                id: '_gst_Add_win_id_Causa',
                name: '_gst_Add_win_id_Causa',
                height: 180,
                width: 450,
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [
                          {
                    text: 'Aceptar',cls:'btn btn-success',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                },
                          {
                    text: 'Cancelar',cls:'btn btn-primary',
                    handler: function(){
                        _gst_win.close();
                    }
                }
                ],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('trbaj').focus(true, true);
                    }
                }
            });
        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
GestVC.prototype.OnShowWindow2cp = function(_paccion){
    var mydd =new Array();
    var _array = new Array();
    var mydd = Ext.getCmp('GestVC_grid_id').getStore().getModifiedRecords();
    if (mydd.length === 0)
    { App.InfoMessage('Información', 'No ha modificado fila alguna');}
    else
    {
        for (var i = 0; i < mydd.length; i++)
        {
            _array.push(mydd[i].getData());
        }
        var fnCallBack = function()   {
            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
            var _result = App.PerformSyncServerRequest('GestVC.GestVC.Modid',{data: Ext.encode(_array)});
            App.HideMsgBox();
            if(_result)
            {
                Ext.getCmp('GestVC_grid_id').getStore().load()
                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
            }
            else
            {
                Ext.getCmp('GestVC_grid_id').getStore().load()
                App.InfoMessage('Información', 'Ocurrio un error');
            }
        }
        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
    }



 }
GestVC.prototype.Add = function(_paccion){

    if (Ext.getCmp('panel').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var id = Ext.getCmp('trbaj').getValue();
        var record = Ext.getCmp('trbaj').store.findRecord('plantilla_id',id,0,false,false,true);
        var Nivel = Ext.getCmp('Nivel').getValue();
        var plantilla_id = record.data.plantilla_id;
        var contrato_id = record.data.contrato_id;
        var trabajadorid = record.data.trabajadorid;

        var _result = App.PerformSyncServerRequest('GestVC.GestVC.Add',{trabajadorid:trabajadorid,Nivel:Nivel,contrato_id:contrato_id,plantilla_id:plantilla_id});
        this.__data_store.load();
        App.HideMsgBox();
        if(_result)
        {
            Ext.getCmp('panel').getForm().reset();
            Ext.getCmp('trbaj').focus(true, true);
            this.__data_store.load();
            App.InfoMessage('Información', 'GestVC adicionado satisfactoriamente');
        }
    }
}
GestVC.prototype.deltectcp=function(_paccion){
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('GestVC_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        _result = App.PerformSyncServerRequest('GestVC.GestVC.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'GestVC eliminado correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar este GestVC?');

}
