function ConfSalarioGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Guardar',
            id: 'add_ConfSalario_btn_id',
            tooltip : 'Adiciona una nueva Condecoración ',
            iconCls: 'add',
            handler:function( This, eOpts){
                var mydd =new Array();
                _array = new Array();
                var mydd = Ext.getCmp('ConfSalario_grid_id').getStore().getModifiedRecords();
                if (mydd.length === 0)
                {
                    App.InfoMessage('Información', 'No ha modificado fila alguna');
                }
                else
                {
                    for (var i = 0; i < mydd.length; i++){
                        _array.push(mydd[i].getData());
                    }
                    var fnCallBack_after = function()   {
                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                var _result = App.PerformSyncServerRequest('ConfSalario.ConfSalario.Add',{data: Ext.encode(_array)});
                                if(_result)
                                {
                                    App.HideMsgBox();
                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                    Ext.getCmp('ConfSalario_grid_id').getStore().load();
                                }
                                else
                                {
                                    App.HideMsgBox();
                                    App.InfoMessage('Información', 'Ocurrio un error');
                                    Ext.getCmp('ConfSalario_grid_id').getStore().load();
                                }
                            }
                    App.ConfirmMessage(fnCallBack_after, ' Esta seguro que desea enviar los datos a el servidor.');
                }
           }
        });

        var tbar = Ext.getCmp('ConfSalario_tbar_id');
        tbar.add(this._btn_add);
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
App.RegisterFunction('ConfSalarioGestionar', new ConfSalarioGestionar());
