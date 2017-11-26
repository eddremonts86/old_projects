 //el panel principal que contendrá otros paneles dentro de si  
Ext.ns('com.quizzpot.tutorial');  
//Ext.BLANK_IMAGE_URL = '../../../Jss/extjs/resources/images/default/s.gif';  
 var name = new Ext.form.TextField({  
     fieldLabel: 'Su Nombre',name: 'Nombre',anchor:'65%',id : "nombre",emptyText:'Eduardo Valdes Inerarte '});
 var email = new Ext.form.TextField({  
     fieldLabel: 'Su Email',name: 'Email',vtype:'email',id : "Email",anchor:'65%',emptyText:'edd@otepr.co.cu'});
 var coment=new Ext.form.HtmlEditor({     
	fieldLabel : "Comentario",anchor:'82%',bodyStyle:'padding:5px 5px 0',name : "Coment",hiddenName : "Coment",
	height: 150});  

	com.quizzpot.tutorial.FormTutorial = {  
     init: function(){  
	 this.form = new Ext.FormPanel({
	 id:'forma',		
     title: 'Reportar Abuso',
     bodyStyle:'padding:5px 5px 0',	  
     width:925, 
	 layout:'form',
	 renderTo: 'frame',
     height:275,
	 border: false,  
     collapsible: true,	 
	 titleCollapse: true,
	 labelWidth: 80,
	 abelAlign: 'top',
	 url: '../../../clases/resepcion.php?termino=Contact',
	 frame:true,		
	 iconCls: 'users',	 
     items:[name,email,coment],
	 bbar: [{iconCls:'enviar1',text:'Envio',id:'envio',handler:this.sendData,scope:this},
	  {iconCls:'cancel',id:'canclar',text:'Cancelar',handler:this.reset,scope:this} ]
});
}, 
reset:function(){this.form.getForm().reset();},
sendData: function(){
	var mask = new Ext.LoadMask(Ext.get('forma'), {msg:'Guardando los datos. Por Favor espere...'}); mask.show(); 
	this.form.getForm().submit({  
     method: 'put',  	 
     success: function(form,action){
		mask.hide();
        Ext.Msg.alert('Ha enviado estos datos?',action.result.msg);  
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
        }  
	 });
	}

}   
 Ext.onReady(com.quizzpot.tutorial.FormTutorial.init,com.quizzpot.tutorial.FormTutorial);  
