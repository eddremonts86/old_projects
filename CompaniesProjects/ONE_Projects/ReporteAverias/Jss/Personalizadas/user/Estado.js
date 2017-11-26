//el panel principal que contendr� otros paneles dentro de si  
Ext.ns('com.quizzpot.tutorial');   
var listado,formu,storeR;
com.quizzpot.tutorial.FormTutorial = {  
    init: function(){
        var Reportes = new Ext.form.TextField({
            fieldLabel: 'Numero de reporte',
            name: 'reporte',
            anchor:'65%',
            forceSelection : true,
            id : "reporte",
            emptyText:'59874 '
        });
        this.form = new Ext.FormPanel({
            id:'forma',
            title: 'Revisar estado de la solicitud',
            bodyStyle:'padding:5px 5px 0',
            width:300,
            layout:'form',
            renderTo: 'frame',
            height:110,
            border: false,
            collapsible: true,
            titleCollapse: true,
            labelWidth: 110,
            abelAlign: 'top',
            //            url: '../../../clases/resepcion.php?termino=Estado',
            frame:true,
            iconCls: 'reporteU',
            items:[Reportes],
            bbar: [{
                iconCls:'enviar1',
                text:'Envio',
                id:'envio',
                handler:enviarDatos,
                scope:this
            },

            {
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                handler:this.reset,
                scope:this
            } ]
        });
				
        var proxy = new Ext.data.HttpProxy({
            url: '../../../clases/resepcion.php',
            method:'POST'
        });
        var reader = new Ext.data.JsonReader({
            totalProperty   : 'total',
            successProperty : 'success',
            messageProperty : 'message',
            idProperty  : 'id',
            root        : 'data'
        }
        ,[{
            name: 'id'
        },{
            name: 'cod'
        },{
            name: 'mun'
        }, {
            name: 'fechai'
        },{
            name: 'dep'
        },{
            name: 'nombre'
        },

        {
            name: 'equ'
        },{
            name: 'emil'
        },{
            name: 'DMR'
        },{
            name: 'comT'
        },{
            name: 'estado'
        },{
            name: 'fechaf'
        },

        {
            name: 'RPA'
        },{
            name: 'Pro'
        },{
            name: 'comU'
        },{
            name: 'local'
        }]
        );
        var writer = new Ext.data.JsonWriter({
            encode      : true,
            writeAllFields  : true
        })
        storeR = new Ext.data.GroupingStore({
            proxy       : proxy,
            reader      : reader,
            id:'storeReportes',
            writer      : writer,
            autoSave    : true ,
            baseParams: {
                x:10,
                y:20
            }
        });
        storeR.load({
            params:{
                z:30,
                start:0,
                limit:15
            }
        });
        var sm = new Ext.grid.CheckboxSelectionModel(); //step 1
        var pager = new Ext.PagingToolbar({
            pageSize: 15,
            store: storeR,
            displayInfo: true,
            displayMsg: 'Solicitudes de  {0} - {1} of {2}',
            emptyMsg: "No hay solicitudes",
            items:[
            '-',{
                pressed:true,
                enableToggle:true,
                text:'Ver Datos Adicionales',
                toggleHandler:function(btn,pressed){
                    var view= this.grid.getView();
                    view.showPreview=pressed;
                    view.refresh();
                }
            }]
        });
        pager.on('beforechange',function(bar,params){
            params.z = 30;
        });
        this.grid = new Ext.grid.GridPanel({
            width:615,
            layout:'form',
            height:250,
            id:'forma1',
            renderTo: 'frame1',
            border: false,
            labelWidth: 80,
            loadMask: true,
            abelAlign: 'top',
            frame:true,
            iconCls: 'estados',
            store: storeR,
            viewConfig:{
                forceFit:true,
                enableRowBody:true,
                showPreview:true,
                getRowClass:function(record,rowIndex,p,store){
                    if (this.showPreview){
                        p.frame1='<div class="row-preview"><img src="../../../img/Ext-import/1ccleaner.png" alin="left" style="padding-right:5px;"/><p>'+
                        record.data.id +'</p></div>';
                        return 'x-grid3-row-expanded';
                    }
                    return 'x-grid3-row-collapsed';
                }
            },
            columns : [
            new Ext.grid.RowNumberer(),
            {
                header:'Provincia',
                dataIndex:'Pro',
                width:120,
                 hidden:true,
                sortable: true
            },

            {
                header:'Municipio',
                dataIndex:'mun',
                width:150,
                 hidden:true,
                sortable: true
            },

            {
                header:'Departamento',
                dataIndex:'dep',
                width:120,
                 hidden:true,
                sortable: true
            },{
                header:'Nombre',
                dataIndex:'nombre',
                width:100,
                sortable: true,
                hidden:false
            }	,

            {
                header:'Correo',
                dataIndex:'emil',
                width:120,
                sortable: true
            },

            {
                header:'Equipo',
                dataIndex:'equ',
                width:120,
                sortable: true
            },

            {
                id:'Provincia',
                header:'Codigo Equipo',
                dataIndex:'cod',
                width:100,
                 hidden:true,
                sortable: true
            },

            {
                header:'Fecha Realizada',
                dataIndex:'fechai',
                width:100,
                sortable: true
            },

            {
                header:'id',
                dataIndex:'id',
                width:100,
                sortable: true,
                hidden:true
            },
            {
                header:'DMR',
                dataIndex:'DMR',
                width:100,
                sortable: true,
                hidden:true
            },       

            {
                header:'Estado',
                dataIndex:'estado',
                width:100,
                sortable: true,
                hidden:true
            },

            {
                header:'Tipo de Rotura',
                dataIndex:'RPA',
                width:100,
                sortable: true,
                hidden:true
            },

            {
                header:'Comentario Usuario',
                dataIndex:'comU',
                width:100,
                sortable: true,
                hidden:true
            },

            {
                header:'Localidad',
                dataIndex:'local',
                width:100,
                sortable: true,
                hidden:true
            },

            {
                header:'Fecha Pendiente',
                dataIndex:'fechap',
                width:100,
                sortable: true,
                hidden:false
            },

            {
                header:'fecha final',
                dataIndex:'fechap',
                width:100,
                sortable: true,
                hidden:false
            }, {
                header:'Comentario Tecnico',
                dataIndex:'comT',
                width:100,
                sortable: true,
                hidden:false
            }
            ],
            bbar:pager,
            view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'
            }),
            stripeRows  : true
        });
        listado=this.grid;
    },
    reset:function(){
        this.form.getForm().reset();
    }






}   
Ext.onReady(com.quizzpot.tutorial.FormTutorial.init,com.quizzpot.tutorial.FormTutorial);  

function enviarDatos(){

    //    storeDetallesI.baseParams = {
    //        reporte:Ext.getCmp('reporte').getValue()
    //    }

    


    storeR.baseParams = {
        reporte:Ext.getCmp('reporte').getValue(),
        termino:'Estado'
    }

    storeR.load({
        params:{
            start:0,
            limit:15
        }
    });

 

      


}