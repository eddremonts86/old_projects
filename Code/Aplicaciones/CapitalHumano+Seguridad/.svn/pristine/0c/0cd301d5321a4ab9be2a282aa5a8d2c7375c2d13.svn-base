// Function definition
function ExportSystem(){
     this._btn = null;

     this.Render = function(Panel)
     {
          this._btn = Ext.create('Ext.Button',
          {
               text : 'Exportar',
               id : 'export_system_btn_id',
               iconCls : 'export',
               disabled : true,
               handler : Ext.Function.bind(this.Owner.OnExport,this.Owner)
          });
         this._btn_sistem = Ext.create('Ext.Button',
             {
                 text : 'Exportar Sistema',
                 id : 'export_system_btn_id_Sistema',
                 iconCls : 'export',
                 disabled : false,
                 handler : Ext.Function.bind(this.Owner.OnExport_sistem_,this.Owner)
             });
          var tbar = Ext.getCmp('systems_tbar_id');
             tbar.add( this._btn_sistem);
             tbar.add(' ');
             tbar.add('-');
             tbar.add(this._btn);
             tbar.add(' ');
             tbar.add('-');

     }

     this.Enable = function()
     {
          this._btn.enable();
     }

     this.Disable = function()
     {
          this._btn.disable();
     }
}
App.RegisterFunction('Export', new ExportSystem());
AdminSystems.prototype.OnExport = function(){
     var _subsystem = Ext.getCmp('systems_grid_id').getSelectionModel().getLastSelected().data.subsystem;
     App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
     var result = App.PerformSyncServerRequest('SubsystemsManager.SubsystemsManager.Export',{system:_subsystem});
     App.HideMsgBox();
     if(result)
     {
           window.open('Subsystems/Admin/Subsystems/Backup/download.php?file=' + _subsystem + '.zip');
     }
}
AdminSystems.prototype.OnExport_sistem_ = function(){
    var myPanel = Ext.create('Ext.panel.Panel', {
       bodyPadding: 5,
       items: [
            {
            xtype: 'textfield',
            id:'rar',
            name:'rar',
            width:'90%',
            fieldLabel: 'Nombre del .rar resultante'
            }
        ]
    });
    Ext.create('Ext.window.Window', {
        title: 'Hello',
        height: 150,
        width: 400,
        id:'mywin',
        name:'mywin',
        layout: 'fit',
        items: myPanel,
        bbar:[ '->',
                {
                    text:'enviar',
                    handler:function(){
                        var name =  Ext.getCmp('rar').getValue();
                        var name = name+'.zip';
                         App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento','Procesando...'));
                         function Callback(options, success, response){
                         if(success==true){
                         App.HideMsgBox();
                         window.open('Subsystems/Admin/Subsystems/Backup/download.php?file=Systema.zip');
                         }
                         else {
                             App.HideMsgBox();
                         }
                         }
                         App.PerformServerRequest('SubsystemsManager.SubsystemsManager.Export_sistem',{name:name},Ext.Function.bind(Callback,this) );
                    }
                },
                {
                    text:'Cancelar',
                    handler:function(){Ext.getCmp('mywin').close();}
                }
             ]
    }).show();

}
function TimerUsado12() {
   App.PerformSyncServerRequest('SubsystemsManager.SubsystemsManager.var_proceso');
   setTimeout('TimerUsado12();', 1000);
}
