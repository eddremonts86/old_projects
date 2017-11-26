 //el panel principal que contendrá otros paneles dentro de si  
Ext.ns('com.quizzpot.tutorial');  
//Ext.BLANK_IMAGE_URL = '../../../Jss/extjs/resources/images/default/s.gif';  
 var name = new Ext.form.TextField({  
     fieldLabel: 'No de Reporte',name: 'Nombre',anchor:'65%',id : "nombre",emptyText:'84616548 '
 }); var email = new Ext.form.TextField({  
     fieldLabel: 'Su Email',name: 'Email',vtype:'email',id : "Email",anchor:'65%',emptyText:'edd@otepr.co.cu' 
 }); var codigo = new Ext.form.TextField({  
     fieldLabel: 'Codigo',name: 'Codigo',anchor:'65%',forceSelection : true,id : "codigo",emptyText:'59874 ' 
 });var local = new Ext.form.ComboBox({
    fieldLabel : "Localidad",anchor:'65%',
	name : "Localidad",
	hiddenName : "Localidad",store:[2009,2008,2007,2006],
	id : "localidad",
	forceSelection : true,
	emptyText:'Selecciona Localidad...',
  });var provincia = new Ext.form.ComboBox({
    fieldLabel : "Provincia",anchor:'65%',store:[2009,2008,2007,2006],
	name : "Provincia",
	hiddenName : "Provincia",
	id : "Prov",
	forceSelection : true,
	emptyText:'Selecciona Provincia...',
  });var municipio = new Ext.form.ComboBox({
    fieldLabel : "Municipio",anchor:'65%',store:[2009,2008,2007,2006],
	bodyStyle:'padding:5px 5px 0',
	name : "Municipio",
	hiddenName : "Municipio",
	id : "munic",
	forceSelection : true,
	emptyText:'Selecciona Municipio...',
  }); var area = new Ext.form.ComboBox({
    fieldLabel : "Area o Departamento",anchor:'65%',store:[2009,2008,2007,2006],
	bodyStyle:'padding:5px 5px 0',
	name : "Area",
	hiddenName : "Area",
	id : "Areea",
	forceSelection : true,
	emptyText:'Selecciona Area o Departamento...',
  }); var coment=new Ext.form.HtmlEditor({     
	fieldLabel : "Comentario",
	anchor:'82%',
	bodyStyle:'padding:5px 5px 0', 
	name : "Coment",
	hiddenName : "Coment",
    height: 150
});  
  com.quizzpot.tutorial.FormTutorial = {  
     init: function(){  
	 this.form = new Ext.FormPanel({  
     title: 'Buscar PC',
     bodyStyle:'padding:5px 5px 0',	  
     width:925, 
	 layout:'form',
	 renderTo: 'frame',
     height:110,
	 border: false,  
     collapsible: true,	 
	 titleCollapse: true,
	 labelWidth: 80,
	 abelAlign: 'top',
	 url: 'hardw.php',
	 frame:true,		
	 iconCls: 'estados',	 
     items:[name],
	 fbar: [{iconCls:'enviar1',text:'Envio',id:'envio',handler:this.sendData,scope:this},
	  {iconCls:'cancel',id:'canclar',text:'Cancelar',handler:this.reset,scope:this} ]
});
},
reset:function(){this.form.getForm().reset();},
sendData: function(){
		 this.form.getForm().submit({  
     method: 'put',  	 
     success: function(form,action){		
        Ext.Msg.alert('Success',action.result.msg);  
     },  
     failure: function(form,action){  
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
        }  
	 });
	}

}   
 Ext.onReady(com.quizzpot.tutorial.FormTutorial.init,com.quizzpot.tutorial.FormTutorial);  
