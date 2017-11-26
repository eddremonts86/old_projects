 //componentes de la pagina
//**************************************************************************
//**************************************************************************
var foto;
var raza;
var descripcion;
var sexo;
var fecha;

var formulario;
var formularioeditar;

var editarfoto;
var editarraza;
var editardescripcion;
var editarsexo;
var editarfecha;

var proxylistar;
var proxycombobox;
var readerlistado;
var readercombobox;
var storelistado;
var storecombobox;

var listado;
var filaseleccionada = 0;

var panelsuperior;
var panelderecho;
var panelizquierdo;
var panelderechoderecho;
var panelderechoizquierdo;
var ventana;
var viewport;
//**************************************************************************
//**************************************************************************

Ext.onReady(function(){
    
    Ext.QuickTips.init();

    //**********  FILE UPLOAD FOTO *****************************************
    foto = new Ext.ux.form.FileUploadField({
        fieldLabel: 'Foto:',
        width: 150
    });
	//******//
	editarfoto = new Ext.form.TextField({
        fieldLabel: 'Foto',
        name: 'editarfoto',
        allowBlank:false

    });

    editarraza = new Ext.form.TextField({
        fieldLabel: 'Raza',
        name: 'editarrazafoto',
        allowBlank:false

    });

    editardescripcion = new Ext.form.TextField({
        fieldLabel: 'Descrip',
        name: 'editardescripcion',
        allowBlank:false

    });

    editarsexo = new Ext.form.TextField({
        fieldLabel: 'Sexo',
        name: 'editarsexo',
        allowBlank:false

    });

    editarfecha = new Ext.form.TextField({
        fieldLabel: 'Fecha',
        name: 'editarfecha',
        allowBlank:false

    });
    //**********  PROXY COMBOBOX *******************************************
    proxycombobox = new Ext.data.HttpProxy({
        //url: 'index.php/controlador_perros/cargarrazas',
        method:'POST'
    });
    //**********  READER COMBOBOX *******************************************
    readercombobox = new Ext.data.JsonReader({
        totalProperty: 'total',
        root: 'data',
        fields: [
        {
            name: 'raza',
            mapping:'raza'
        },
        {
            name: 'imagen',
            mapping:'imagen'
        }
        ]
    });
    //**********  STORE COMBOBOX CARGAR RAZAS ******************************
    storecombobox = new Ext.data.Store({
        proxy: proxycombobox,
        totalProperty: 'total',
        reader: readercombobox
    });
    //**********  STORE COMBOBOX CARGAR RAZAS ******************************
    raza = new Ext.form.ComboBox({
        fieldLabel:'Raza',
        name:'raza',
        forceSelection: true,
        store: storecombobox, //asignandole el store
        emptyText:'seleccione raza...',
        triggerAction: 'all',
        editable:false,
        displayField:'raza',
        valueField: 'raza',
        mode:'remote',
        itemSelector: 'div.search-item',
        tpl: new Ext.XTemplate('<tpl for="."><div class="search-item"><img src="system/application/images/{imagen}"/><div class="name">{raza}</div></div></tpl>')
            
    });

    //**************************** TEXTAREA DESCRIPCION ********************
    descripcion =  new Ext.form.TextArea({
        fieldLabel: 'Des:',
        name: 'descripcion',
        labelSeparator: '',
        height: 100,
        anchor: '80%',
        allowBlank:false

    })
    //************************************* RADIO GROUP ********************
    sexo =  new Ext.form.RadioGroup({

        fieldLabel: 'Sexo',
        items: [
        {
            boxLabel: 'Hembra',
            id:'Hembra',
            name: 'sexo',
               
            checked: true
        },

        {
            boxLabel: 'Macho',
            id:'Macho',
            name: 'sexo'
                
        }

        ]

    })
    //********************************** DATE FIELD ************************
    fecha =  new Ext.form.DateField({
        fieldLabel: 'Fech',
        name: 'fechanaingreso',
        allowBlank:false
    })
    //**************************** FORMULARIO *******************************
    formulario = new Ext.FormPanel({
        labelWidth: 25,
        fileUpload: true,
        frame:true,
        bodyStyle:'padding:10px 5px 0;',
        width: 250,           
        defaults: {
            width: 220,
            border: true,
            bodyStyle: 'padding:2px'
        },
        items: [{              
            xtype:'fieldset',
            title: 'Campos',
            collapsible: true,
            autoHeight:true,
            defaults: {
                 
            },
            items :[foto,raza,descripcion,sexo,fecha]
        }
        ],

        buttons: [{
            text: 'Insertar',
            handler:insertar
        },{
            text: 'Cancel'
        }]
    })

    //**************************** PANEL DER IZQ********************************
    panelderechoizquierdo = new Ext.Panel({

        title: 'Formulario',
        region: 'west',
        split: true,
        width: 250,
        height: 500,
        margins:'3 0 3 3',
        cmargins:'3 3 3 3',
        items:[formulario]

    })
    //**************************** LISTAR PERROS ***************************
    //**********  PROXY LISTADO *******************************************
    proxylistar = new Ext.data.HttpProxy({
      //  url: 'index.php/controlador_perros/cargarperros',
        method:'POST'
    });

    //**********  READER LISTADO *******************************************
    readerlistado = new Ext.data.JsonReader({
        totalProperty: 'total',
        root: 'data',
        fields: [
        {name: 'id',mapping:'id'},
        {name: 'foto',mapping:'foto},
        {name: 'raza',mapping:'raza'},
        {name: 'descripcion',mapping:'descripcion'},
        {name: 'sexo',mapping:'sexo'},
        {name: 'fecha',mapping:'fecha'}]

    });
    //**********  STORE LISTADO *******************************************
    storelistado = new Ext.data.Store({
        proxy: proxylistar,
        totalProperty: 'total',
        reader: readerlistado
    });
	var sm = new Ext.grid.CheckboxSelectionModel();
    //**********  GRID PARA LISTADO *******************************************
    listado = new Ext.grid.GridPanel({
        store: storelistado,
        trackMouseOver:true,
        disableSelection:true,
        loadMask: true,
        title:'Perros',
        height:480,
		width:750,
		labelWidth: 80,
		abelAlign: 'top',			 
		frame:true,		
		iconCls: 'estados',
		collapsible: true,	 
		titleCollapse: true,        
        columns: [
		sm,
        {header: "Id",width: 20,sortable: true,dataIndex: 'id'},
		{header: "Foto",width: 80,renderer:mostrarfoto,sortable: true,dataIndex: 'foto'},
        {header: "Raza",width: 80,sortable: true,dataIndex: 'raza'},
        {header: "Descripcion",width: 75,sortable: true,dataIndex: 'descripcion'},
        {header: "Sexo",width: 85,sortable: true,dataIndex: 'sexo'},
        {header: "Fecha",width: 85,sortable: true,dataIndex: 'fecha'}         
        ],
		sm: sm, 
		tbar:[   
			  {text : "Ver Datos", scope : this, handler:Modificar,iconCls:'info'},
			  {text:'Agregar Solicitud',iconCls:'add',handler:this.add},
			  {text:'Solicitud Pendiente',iconCls:'user_del',handler:this.add},
			  {text:'Guardar Cambios',iconCls:'save',handler:this.save}, 					
			  {text:'Cancelar Cambios',iconCls:'cancel',handler:this.cancel},
			  {text:'Limpiar Grupos',iconCls: 'del',handler : function(){this.store.clearGrouping();}},	
		      {text:"Delete", scope:this, handler:dibujaeliminar,iconCls:'del'}  
			], 
        bbar: new Ext.PagingToolbar({
            pageSize: 3,
            store: storelistado,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        })
    });

    storelistado.load({
        params:{
            start:0,
            limit:3
        }
    });

    //**************************** PANEL DER DER********************************
    panelderechoderecho = new Ext.Panel({      
        frame:true,
        region: 'center',
        split: true,
        width: 250,
        height: 500,
        margins:'3 0 3 3',
        cmargins:'3 3 3 3',
        items:[listado]
		})
	//**************************** PANEL DER DER********************************	
		formularioeditar = new Ext.FormPanel({
        id:"formedit",
        labelWidth: 75,
        frame:true,
        title: 'Modificar',
        bodyStyle:'padding:5px 5px 0',
        width: 300,
        defaults: {
            width: 230
        },
        defaultType: 'textfield',
        columnWidth: 0.4,
        items: [editarfoto,editarraza,editardescripcion,editarfecha,editarsexo],

        buttons: [{
            text: 'Modificar',
            handler: ModificarFila
        },{
            text: 'Cancel'
        }]
    })
    //**************************** PANEL IZQ ***********************************
    panelizquierdo = new  Ext.Panel({
        title: 'Opciones',
        frame:true,
        region: 'west',
        split: true,
        width: 270,
        collapsible: true,
        margins:'3 0 3 3',
        cmargins:'3 3 3 3',
		items:[formularioeditar]
    })	
    //**************************** PANEL DER ***********************************
    panelderecho = new Ext.Panel({       
        region: 'center',
        split: true,
        layout:'border',
        width: 550,
        collapsible: true,
        margins:'3 0 3 3',
        cmargins:'3 3 3 3',
        items:[panelderechoderecho]

    })
    //**************************** PANEL SUP ***********************************
    panelsuperior = new Ext.Panel({

        frame:true,
        html:'<img src="system/application/images/logo.jpg" />',
        region: 'north',
        split: true,
        width: 1000,
        height: 120,
        margins:'3 0 3 3',
        cmargins:'3 3 3 3'

    })
    //**************************** VIEWPORT ************************************
    viewport = new Ext.Viewport({
        layout:'border',
        items:[panelderechoderecho,panelizquierdo]
    });


    listado.on('rowclick',function(Grid, rowIndex, e){
        filaseleccionada = rowIndex;

    })


});


//*************************** FUNCIONES ************************************
//**************************************************************************

//**************************** INSERTAR ************************************
function success(){

    Ext.Msg.alert('Se inserto correctamente');
    storelistado.load({
        params:{
            start:0,
            limit:3
        }
    });
}
function insertar(){

    Ext.Ajax.request({
        url: 'index.php/controlador_perros/insertar',
        method:'POST',
        params: {
            foto: foto.getValue(),
            raza: raza.getValue(),
            descripcion: descripcion.getValue(),
            sexo: sexo.getValue().getId(),
            fecha: fecha.getValue()
        },
        success: success
    });
}
//**************************** MOSTRAR FOTO GRID ***************************
function mostrarfoto(data){
    return "<img src='system/application/images/"+data+"' />";
}
//**************************** DIBUJAR ICONO MODIFICAR *********************
function dibujamodificar(){

    return '<img id="modificar" onclick="Modificar()" src="system/application/images/editar.png" style="cursor:pointer">';
}
this.datos =function dibujamodificar(){
    return '<img id="modificar" onclick="Modificar()" src="system/application/images/editar.png" style="cursor:pointer">';
}
//**************************** DIBUJAR ICONO ELIMINAR **********************
function dibujaeliminar(){
    return '<img id="eliminar" onclick="Eliminar()" src="system/application/images/eliminar.png" style="cursor:pointer">';
} 
//**************************** ELIMINAR ************************************
function Eliminar(){

    Ext.MessageBox.confirm('Confirmacion', 'Estas seguro que deseas eliminar?',
        function(btn){
            if(btn=='yes')
            {

                Ext.Ajax.request({
                    url: 'index.php/controlador_perros/eliminar',
                    method:'POST',
                    success: EliminarOK,
                    params: {
                        id: listado.getStore().getAt(filaseleccionada).get('id')

                    }
                });

            }
        });
}
dibujaeliminar:function EliminarOK(){
    Ext.Msg.alert("OK");
    storelistado.load({
        params:{
            start:0,
            limit:3
        }
    });

}
//**************************** MODIFICAR **********************
Modificar:function Modificar(){
     editarfoto.setValue(listado.getStore().getAt(filaseleccionada).get('foto'));
     editarraza.setValue(listado.getStore().getAt(filaseleccionada).get('raza'));
     editardescripcion.setValue(listado.getStore().getAt(filaseleccionada).get('descripcion'));
     editarsexo.setValue(listado.getStore().getAt(filaseleccionada).get('sexo'));
     editarfecha.setValue(listado.getStore().getAt(filaseleccionada).get('fecha'));       
    //**************************** VENTANA EDITAR*******************************
    ventana = new Ext.Window({
        title: 'Editar',
        layout: 'fit',
        width: 350,
        height:350,
        modal:true,
        items: [formularioeditar]
    });

    //ventana.show();
         
}
function ModificarFila(){
    Ext.Ajax.request({
        url: 'index.php/controlador_perros/actualizar',
        method:'POST',
        success: actualizacionOK,
        params: {
            id1: listado.getStore().getAt(filaseleccionada).get('id'),
            fotoeditar: editarfoto.getValue(),
            razaeditar: editarraza.getValue(),
            descripcioneditar: editardescripcion.getValue(),
            sexoeditar: editarsexo.getValue(),
            fechaeditar: editarfecha.getValue()
        }
    });
    storelistado.load({
        params:{
            start:0,
            limit:3
        }
    });

}
function actualizacionOK(){
    Ext.Msg.alert("Se ha actualizado su registro");

}