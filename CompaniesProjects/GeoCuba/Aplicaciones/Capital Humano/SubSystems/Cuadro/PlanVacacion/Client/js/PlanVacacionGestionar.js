function PlanVacacionGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this._btn_imp = null;    
    this.Render = function(Panel){
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Guardar',
            id: 'add_PlanVacacion__bt_id',
            tooltip : 'Guardar datos',
            iconCls: 'add',
            cls:'btn',
            handler:function(){
                var mydd =new Array();
                _array = new Array();
                    var  mydd = Ext.getCmp('PlanVacacion_tbar_id_grid').getStore().getModifiedRecords();
                    if (mydd.length === 0)
                    {
                        App.InfoMessage('Información', 'No ha modificado fila alguna');
                    }
                    else
                    {
                        for (var i = 0; i < mydd.length; i++)
                        {_array.push(mydd[i].getData());}
                        var fnCallBack = function()   {
                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                    var _result = App.PerformSyncServerRequest('PlanVacacion.PlanVacacion.PlanVacacion_update',{data: Ext.encode(_array)});
                                    App.HideMsgBox();
                                    if(_result)
                                    {
                                        App.InfoMessage('Información', 'Datos guardados satisfactoriamente');
                                        Ext.getCmp('PlanVacacion_tbar_id_grid').store.load();
                                    }
                                    else
                                    {
                                        App.InfoMessage('Información', 'Ocurrio un error');
                                    }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                    }
                }
        });

        this._btn_imp = Ext.create('Ext.Button',{
            text: 'Imprimir',
            id: 'imp_PlanVacacion__bt_id',
            tooltip : 'Imprimir datos',
            iconCls: 'add',
            cls:'btn',
            handler:function(){
                App.PrintModel(Ext.getCmp('PlanVacacion_tbar_id_grid').store,'Plan de Vacaciones');

            }
        });
        var tbar = Ext.getCmp('PlanVacacion_tbar_id');
        tbar.add(this._btn_add);
        tbar.add(' ');
        tbar.add('-');
        tbar.add(this._btn_imp);
        tbar.add(' ');
        tbar.add('-');
        tbar.add('->');
        tbar.add({
            xtype: 'textfield',
            name: 'searchField_class_cien',
            id:'searchField_class_cien',
            enableKeyEvents : true,
            hideLabel: true,
            width: 200,
            emptyText:'Cuadro',
            listeners: {
                change:function(){
                    console.log(Ext.getCmp('PlanVacacion_tbar_id_grid').store);
                    Ext.getCmp('PlanVacacion_tbar_id_grid').store.clearFilter();
                    Ext.getCmp('PlanVacacion_tbar_id_grid').store.filter("nombre", Ext.getCmp('searchField_class_cien').getValue());
                },scope:this
            }
        });
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
App.RegisterFunction('PlanVacacionGestionar', new PlanVacacionGestionar());