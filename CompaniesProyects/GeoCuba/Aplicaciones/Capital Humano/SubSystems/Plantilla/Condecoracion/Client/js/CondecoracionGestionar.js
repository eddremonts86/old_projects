function CondecoracionGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Adicionar',
            id: 'add_Condecoracion_btn_id',
            tooltip : 'Adiciona una nueva Condecoración ',
            iconCls: 'add',
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_Condecoracion_btn_id',
            tooltip : 'Elimina la Condecoración  seleccionada',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Modificar',
            id: 'mod_Condecoracion_btn_id',
            tooltip : 'Modifica la Condecoración  seleccionada',
            iconCls: 'modify',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.OnShowWindow, this.Owner, ['upd'])
        });
        var tbar = Ext.getCmp('Condecoracion_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_mod);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_del);
        tbar.add(' ');
        tbar.add('-');
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
App.RegisterFunction('CondecoracionGestionar', new CondecoracionGestionar());

this.paneladdcondecoracion=null;
this.panelupdcondecoracion=null;

Condecoracion.prototype.OnShowWindow = function(_paccion){

    if(_paccion == 'add'|| _paccion == 'upd')
    {
        this._store_combo_condecoracion=  Ext.create('Ext.data.JsonStore',
            {
                fields: [
                    {name:'id'},
                    {name: 'nombre'}

                ],
                proxy: {
                    type: 'memory',
                    reader: {type: 'json'}
                },
                autoLoad: false
            });

        if(_paccion == 'add')
        {
            _title_win = 'Adicionar una';

        }


        if(_paccion == 'upd')
        {

            var _title_win = null,_title_win2 = null, _value_id = null, _value_nomb = null, _value_tipoid = null;

            _title_win = 'Modificar la ';
            //_title_win2 ='seleccionada';
            var _selectionModel = Ext.getCmp('Condecoracion_grid_id').getSelectionModel();
            var _selected_rcd = _selectionModel.getLastSelected();
            _value_id = _selected_rcd.data.id;
            _value_nomb=_selected_rcd.data.nombre;
            _value_tipoid=_selected_rcd.data.condecoracion_tipoid;


        }


        this.panelcondecoracion = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 460,
            layout: 'anchor',
            id:'panelcondecoracion',
            defaults: {
                anchor: '100%'
            },
            //defaultType: 'textfield',
            items: [
                {
                    xtype: 'hidden',
                    name: 'id',
                    id: 'id',
                    value: _value_id

                },
                {
                    xtype:'combobox',
                    name:'combo_nombre_value_id',
                    id:'combo_nombre_value_id',
                    fieldLabel: 'Nombre',
                    store: this._store_combo_condecoracion,
                    displayField:'nombre',
                    valueField: 'id',
                    typeAhead: true,
                    queryMode: 'local',
                    forceSelection: true,
                    triggerAction: 'all',
                    emptyText:'Select a state...',
                    selectOnFocus:true,
                    editable:false,
                    allowBlank: false
                }
            ]
        });



            var _gst_OnShowWindow = new Ext.Window(
                {

                    title:_title_win + ' Condecoración ',
                    id: '_gst_Addcondecoracion_win_id',
                    height: 130,
                    width: 460,
                    plain: true,
                    layout: 'fit',
                    modal: true,
                    resizable: false,
                    items: [this.panelcondecoracion],
                    buttons: [{
                        text: 'Aceptar',cls:'btn btn-primary',
                        handler: Ext.Function.bind(this.Gestionar, this, [_paccion,_selectionModel,_selected_rcd]),
                        scope: this
                    }, {
                        text: 'Cancelar',cls:'btn btn-primary',
                        handler: function(){
                            _gst_OnShowWindow.close();
                        }
                    }],
                    listeners: {
                        'show': function(This, eOpts) {

                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var result = App.PerformSyncServerRequest('Condecoracion.Condecoracion.Cargarnombre');
                            App.HideMsgBox();

                            if (result)
                                this._store_combo_condecoracion.loadData(result.rows);

                           //Ext.getCmp('combo_nombre_value_id').select(_value_tipoid);

                        }, scope: this
                    }
                });

        _gst_OnShowWindow.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
Condecoracion.prototype.Gestionar = function(_paccion, _selectionModel, _selected_rcd){
    var _text=null;
    var _result=null;

    if (Ext.getCmp('panelcondecoracion').getForm().isValid())
    {
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        if(_paccion == 'add')
        {
            _text='adicionada'
            _result = App.PerformSyncServerRequest('Condecoracion.Condecoracion.Add',Ext.getCmp('panelcondecoracion').getForm().getValues());
        }
        else if(_paccion == 'upd')
        {
            _text='modificada'
            _result = App.PerformSyncServerRequest('Condecoracion.Condecoracion.Modid',Ext.getCmp('panelcondecoracion').getForm().getValues());
        }
        this.__data_store.load();

        App.HideMsgBox();

        if(_result)
        {
            if(_paccion == 'add')
                Ext.getCmp('panelcondecoracion').getForm().reset();
            else if (_paccion == 'upd')
            {
                Ext.getCmp('_gst_Addcondecoracion_win_id').close();
                _selectionModel.deselect(_selected_rcd);
            }

            this.__data_store.load();
            App.InfoMessage('Información', 'Condecoración ' + _text + ' satisfactoriamente');
        }
    }
}
Condecoracion.prototype.deltect = function(_paccion) {
    var me = this;
    var fnCallBack = function() {
        var _selected_rcd = Ext.getCmp('Condecoracion_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
        var _result = App.PerformSyncServerRequest('Condecoracion.Condecoracion.Eliminar', {id: id});
        App.HideMsgBox();

        if(_result)
        {
            me.__data_store.load();
            App.InfoMessage('Información', 'Condecoración  eliminada correctamente');
        }
    }

    App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar esta Condecoración?');
}