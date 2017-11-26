 Ext.ns("com.quizzpot.tutorial");
var listadoproceso,filaseleccionadaproceso,nombreprocso,idroleUsuario, descrpProceso;
com.quizzpot.tutorial.IntegracionTutorial = {

    init: function(){
         var proxy = new Ext.data.HttpProxy({
            api: {
                read    : "../../phpclass/control.php?termino=proces",
                destroy : "../../phpclass/control.php?termino=eliminarproces"
            }
        });
        var reader = new Ext.data.JsonReader({
            totalProperty   : 'total',
            successProperty : 'success',
            messageProperty : 'message',
            idProperty  : 'id',
            root        : 'data'
        },
        [{
            name: 'id'
        },{
            name: 'category'
        },{
            name: 'description'
        }]
        );
        var writer = new Ext.data.JsonWriter({
            encode      : true,
            writeAllFields  : true
        })
        this.store = new Ext.data.GroupingStore({
            proxy       : proxy,
            reader      : reader,
            writer      : writer,
            autoSave    : true ,
            baseParams: {
                x:10,
                y:20
            }
        });
        this.store.load({
            params:{
                z:30,
                start:0,
                limit:15
            }
        });
        var sm = new Ext.grid.CheckboxSelectionModel(); //step 1
        var pager = new Ext.PagingToolbar({
            pageSize: 15,
            store: this.store,
            displayInfo: true,
            displayMsg: 'Solicitudes de  {0} - {1} of {2}',
            emptyMsg: "No hay solicitudes"
        });
        pager.on('beforechange',function(bar,params){
            params.z = 30;
        });
        this.grid = new Ext.grid.GridPanel({
            width:425,
            layout:'form',
            height:260,
            border: false,
            labelWidth: 100,
            loadMask: true,
            abelAlign: 'top',
            frame:true,
            iconCls: 'estados',
            store: this.store, // step 3
            columns : [
            new Ext.grid.RowNumberer(),
            {
                header:'category',
                dataIndex:'category',
                width:100,
                sortable: true
            },
            {
                header:'id',
                dataIndex:'id',
                hidden:true,
                width:100,
                sortable: true
            },
            {
                header:'description',
                dataIndex:'description',
                width:100,
                sortable: true
            }
             ],
            tbar  : ['-',
            {
                text:"Modificar",
                scope : this,
                handler: this.datosproceso,
                iconCls:'moduser'
            },'-',

            {
                text:"Eliminar",
                scope:this,
                handler:this.onDeleteproceso,
                iconCls:'deluser'
            },'-',
            ],

            bbar:pager,

            view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'
            }),
            stripeRows  : true
        });
        listadoproceso=this.grid;
        listadoproceso.on('rowclick',function(Grid, rowIndex, e){
        filaseleccionadaproceso = rowIndex;
        });

          var idR = new Ext.form.TextField({
            fieldLabel: 'idr',
            hidden:true,
            name: 'idr',
            forceSelection : true,
            id : "idr",
            value : 'updateproceso'
        });

          nombreprocso = new Ext.form.TextField({
            fieldLabel: 'Proceso',
            name: 'Proceso',
            forceSelection : true,
            id : "Proceso",
            minLength:3,
            maxLength:64
        });
        descrpProceso = new Ext.form.TextField({
            fieldLabel: 'Descipcion',
            name: 'Descipcion',
            forceSelection : true,
            id : "Descipcion",
            minLength:3,
            maxLength:64
        });
           idroleProcesoo = new Ext.form.TextField({
            fieldLabel: 'idProceso',
            hidden:true,
            name: 'idProceso',
            forceSelection : true,
            id : "idProceso"

        });
        this.formproceso = new Ext.form.FormPanel({
            frame:true,
            layout: 'form',
            border: false,
            id:'formaproceso',
            height:150,
            width:  588,
            url: '../../phpclass/control.php',
            bodyStyle:'padding:5px 5px 0',
            labelWidth: 60,
            abelAlign: 'top',
            items:[{
                xtype:'fieldset',
                title: 'Informacion del Usuarios',
                collapsible: true,
                html : '<br><br><br<br><br><br><br><br><br><br><br><br><br><br><br><h3><img src="../../img/icons/16x16/apps/info.png" width="16px" height="16px" aline="center"> Nota:</h3>Debe llenar todos los datos ',
                autoHeight:true,
                defaults: {width: 300},
                defaultType: 'textfield',
                items :[nombreprocso,idR,idroleProcesoo,descrpProceso]
                 }],
            bbar: [new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'formaproceso'
                })
            }),'->','-',
                {
                iconCls:'enviar',
                text:'Envio',
                id:'envio',
                scope:this,
                handler:this.sendDataproceso
            },'-',
            {
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                scope:this,
                handler:this.resetproceso
            },'-']
        });
        var center = {
            xtype	:	"panel",
            region	:	"center",
            layout	:	"fit",
            border	:	false,
            items	:	[this.grid],
            margins	:	{
                bottom:3,
                right:3
            }
        };
        var west =  {
            xtype	:	"panel",
            region	:	"south",
            width		: 250,
            split	:	true,
            frame:true,
            items	:	[this.formproceso],
            margins	:	"0 0 3 3"
        };
        panelusuario=west
        var main = new Ext.Panel({
            layout		:	"border",
            height		:	500,
            width		:       600,
            items		:       [west,center]
        });
        var win = new Ext.Window({
            title: 'Listado de Usuarios',
            minimizable: true,
            maximizable: true,
            items: main
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
        });
    },
    onDeleteproceso:function(){
        var rows = listadoproceso.getSelectionModel().getSelections();
        if(rows.length === 0){
            return false;
        }
        this.store.remove(rows);
    },
    sendDataproceso: function(){
        var mask = new Ext.LoadMask(Ext.get('formaproceso'),{msg:'Guardando los datos. Por Favor espere...'});
        mask.show();
        this.formproceso.getForm().submit({
            method: 'put',

            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Datos de modificacion',action.result.msg);
            //window.location = 'tecnico.php?termino=Reportes';
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'El formulario presenta datos incorrectos');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Failure',action.result.msg);
                }
            //window.location = 'tecnico.php?termino=Reportes';
            }
        });
    },
    datosproceso:function(){
       nombreprocso.setValue(listadoproceso.getStore().getAt(filaseleccionadaproceso).get('category'));
       idroleProcesoo.setValue(listadoproceso.getStore().getAt(filaseleccionadaproceso).get('id'));
       descrpProceso.setValue(listadoproceso.getStore().getAt(filaseleccionadaproceso).get('description'));
    },
    resetproceso:function(){
        this.formproceso.getForm().reset();/*window.location = 'tecnico.php?termino=Reportes';*/
    }

}
Ext.onReady(com.quizzpot.tutorial. IntegracionTutorial.init,com.quizzpot.tutorial. IntegracionTutorial);
