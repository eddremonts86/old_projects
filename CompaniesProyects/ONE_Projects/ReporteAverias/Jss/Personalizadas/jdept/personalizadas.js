//the namespace for this tutorial
Ext.ns('com.quizzpot.tutorial');

Ext.BLANK_IMAGE_URL = '../ext-2.2/resources/images/default/s.gif';

com.quizzpot.tutorial.Panel = {
	init: function(){
		
		var panel1 = new Ext.Panel({
			title: 'Users',
			iconCls: 'users'
		});
		var panel2 = new Ext.Panel({
			title: 'Reports',
			iconCls: 'reports'
		});
		var panel3 = new Ext.Panel({
			title: 'Documents',
			iconCls: 'documents'
		});
		var panel4 = new Ext.Panel({
			title: 'Users',
			iconCls: 'users'
		});
		var panel5 = new Ext.Panel({
			title: 'Reports',
			iconCls: 'reports'
		});
		var panel6 = new Ext.Panel({
			title: 'Documents',
			iconCls: 'documents'
		});
		var panel7 = new Ext.Panel({
			title: 'Users',
			iconCls: 'users'
		});
		var panel8 = new Ext.Panel({
			title: 'Reports',
			iconCls: 'reports'
		});
		var panel9 = new Ext.Panel({
			title: 'Documents',
			iconCls: 'documents'
		});
		
		var main = new Ext.Panel({
			title: 'My first panel',
			width:925,			 
			border: true,		 
			frame:true,		
			iconCls: 'reporteU',
			defaults: {
				collapsible:true,
				collapsed:true,
				border: true,
				bodyStyle: 'padding:10px;',
				expanded:true,
				titleCollapse: true,				
				frame:true,	
				height:500
			},
			items: [panel1,panel2,panel4,panel5,panel6,panel7,panel8,panel9,panel3]
		});
		main.render('frame');		
		panel1.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'users'}
		});
		panel2.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'report'}
		});
		panel3.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'documents'}
		});		 
		panel4.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'users'}
		});
		panel5.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'report'}
		});
		panel6.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'documents'}
		});		 	
		panel7.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'users'}
		});
		panel8.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'report'}
		});
		panel9.load({
			url: 'panel.php',
			method: 'GET',
			params: {data:'documents'}
		});
		
	}
}

Ext.onReady(com.quizzpot.tutorial.Panel.init,com.quizzpot.tutorial.Panel); 

/*Ext.ns("com.quizzpot.tutorial");
var namebre;
var email;
var codigo; 
var Prov;
var Munc;
var informacionAdicionar = "";
 var  grid;

com.quizzpot.tutorial.IntegracionTutorial = {
	init: function(){
	namebre = new Ext.form.TextField({fieldLabel: 'Su Nombre',name: 'Nombre',anchor:'95%',id : "nombre",emptyText:'Eduardo Valdes Inerarte... '}); 
	email = new Ext.form.TextField({fieldLabel: 'Su Email',name: 'Email',vtype:'email',id : "Email",anchor:'95%',emptyText:'edd@otepr.co.cu'}); 
	codigo = new Ext.form.TextField({fieldLabel: 'Codigo',name: 'Codigo',anchor:'95%',forceSelection : true,id : "codigo",emptyText:'59874 '});
	Prov = new Ext.form.TextField({fieldLabel: 'Provincia',name: 'Provincia',anchor:'95%',id : "Provincia",emptyText:'Mi Provincia... '}); 
	Munc = new Ext.form.TextField({fieldLabel: 'Municipio',name: 'Municipio',id : "Municipio",anchor:'95%',emptyText:'Mi municipio...'}); 
	var tree= new Ext.tree.TreePanel({border: false,autoScroll	: true,root: this.getData()});
	var home= new Ext.Panel({title	: "Inicio",html	: "<br><br><br><p><img src="+"../../../img/logo.jpg"+">"});					
	
	this.tabs = new Ext.TabPanel({ 	
            	border	: false,
                activeTab: 0,
                frame:true,
                plain:true,
		defaults:{autoScroll: true},
                enableTabScroll	:  true,
                items: [home] });
        var center = {	xtype	:"panel",
                        region	:"center",
                        layout	:"fit",
			border	:false,
                        margins	:{bottom:3,right:3},
			items	:[{xtype:"panel",items:[this.tabs]}]};
			tree.on('click',function(node){this.addTab(node);},this);					
	var west = {  xtype:"panel",
                      region:"west",
                      width:250,
                      split:true,
                      collapseMode: 'mini',
                      collapsible: true,
                      title:"Bloques de Informacion",
                      margins:"0 0 3 3",
                      items:[tree]};

	var north = {xtype:"panel",
		     region:"north",
		     height:100,
		     html:"North region",
		     margins:{top:3,bottom:3,left:3,right:3}};

        var main = new Ext.Panel({renderTo:"frame",
				  title:"Estadisticas Personalizadas",
				  layout:"border",
				  height:478,
				  width:930,
			          items:[center,west]
				});	},
	
	getData	: function(){
			var root = {
			text:'Informacion',
			expanded: true,					
			children:[{
				text:'Todas las Solicitudes',
				children:[{text:'Solicitudes Realizadas',leaf:true},
				{text:'Solicitudes Resueltas',leaf:true}]
				},{
				text:'Por Intervalo de tiempo',
				children:[{text:'Solicitudes Realizadas',leaf:true},
				{text:'Solicitudes Resueltas',leaf:true}]
				},{
				text:'Por Equipos o Software',
				children:[{text:'Equipos',leaf:true},
				{text:'Software',leaf:true}]
				},{
				text:'Por Localidad',
				children:[{text:'Areas',leaf:true},
				{text:'Departamentos',leaf:true},
				{text:'Municipios',leaf:true},
				{text:'Provincias',leaf:true}									  
				]
				},{
				text:'Numeros Globales',
				children:[{text:'Cantidad de Solicitudes Resueltas',leaf:true},
				{text:'Cantidad de Solicitudes en espera',leaf:true},
				{text:'Cantidad de Equipos rotos',leaf:true}								  
				]
				},{
				text:'Por Ciento de Conformidad',
				children:[{text:'Grafico de conformidad',leaf:true}
				]
				}
				]
				}
				return root;
			},
		addTab	: function(node){
                AdicionarInformacion(node.attributes.text);
			var tab = this.tabs.findById("id-"+node.id);  
			if(!tab){     
			tab = new Ext.Panel({
				id: "id-"+node.id,
				closable:true,   
				title:node.attributes.text,
				iconCls: 'info',
                autoScroll:true,
                autoLoad: {url: 'html/informacion.html'}
				//html:informacionAdicionar
				});
                                // tab.add(grid);
				this.tabs.add(tab);  
				this.tabs.doLayout();
				}
				this.tabs.activate(tab);
                         informacionAdicionar = "";
			}
}
Ext.onReady(com.quizzpot.tutorial. IntegracionTutorial.init,com.quizzpot.tutorial. IntegracionTutorial);

function AdicionarInformacion(nombreNodo)
{ 
if (nombreNodo =="Informacion"){
 informacionAdicionar += "Informacion relativa a la introduccion<br>";
}
else if (nombreNodo =="Todas las Solicitudes"){
 informacionAdicionar += "Informacion relativa a Todas las Solicitudes<br>";
}
else if (nombreNodo =="Solicitudes Realizadas"){}
else if (nombreNodo =="Solicitudes Resueltas"){}
else if (nombreNodo =="Por Intervalo de tiempo"){}
else if (nombreNodo =="Solicitudes Realizadas"){}
else if (nombreNodo =="Solicitudes Resueltas"){}
else if (nombreNodo =="Por Equipos o Software"){}
else if (nombreNodo =="Equipos"){}
else if (nombreNodo =="Software"){}
else if (nombreNodo =="Por Localidad"){}
else if (nombreNodo =="Areas"){}
else if (nombreNodo =="Departamentos"){}
else if (nombreNodo =="Municipios"){}
else if (nombreNodo =="Provincias"){}
else if (nombreNodo =="Numeros Globales"){}
else if (nombreNodo =="Cantidad de Solicitudes Resueltas"){}
else if (nombreNodo =="Cantidad de Solicitudes en espera"){}
else if (nombreNodo =="Cantidad de Equipos rotos"){}
else if (nombreNodo =="Por Ciento de Conformidad"){}
else if (nombreNodo =="Grafico de conformidad"){}
else {}
}*/