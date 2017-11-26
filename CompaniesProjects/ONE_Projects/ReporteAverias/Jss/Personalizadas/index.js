  //el panel principal que contendr� otros paneles dentro de si  
Ext.ns('com.quizzpot.tutorial');  
//Ext.BLANK_IMAGE_URL = '../../../Jss/extjs/resources/images/default/s.gif';  
 var name = new Ext.form.TextField({  
     fieldLabel: 'Su Nombre',name: 'Nombre',anchor:'65%',id : "nombre",allowblank:false
	 ,minLength:3,maxLength:32,msgTraget:'side',validationEvent:false});
 var email = new Ext.form.TextField({  
     fieldLabel: 'Su Email',name: 'Email',vtype:'email',id : "Email",anchor:'65%'
	 ,allowblank:false,validationEvent:false});
 var pass = new Ext.form.TextField({  
     fieldLabel: 'Su Password',name: 'passw',inputType:'password',allowblank:false,id : "passw",anchor:'65%'
	 ,minLength:3,minLengthText:'El password debe ser de mas de 6 caracteres.',maxLength:32,msgTraget:'side',
	 validationEvent:false});
com.quizzpot.tutorial.FormTutorial = {  
     init: function(){  
	 this.form = new Ext.FormPanel({
	 id:'forma',		
     title: 'Autentificacion de Usuarios',
     bodyStyle:'padding:5px 5px 0',	  
     width:600, 
	 layout:'form',	 
     height:330,
	 border: false,        
	 labelWidth: 100,
	 abelAlign: 'top',
	 url: 'clases/seguridad.php?termino=login',
	 frame:true,		
	 iconCls: 'abuso',	
	 html:'<br/><div><img src="img/logo.jpg" width="440px" height="170px" aline="center"><div><br/>',	
     items:[name,email,pass],
	 bbar: [{iconCls:'home',text:'Autentificarse',id:'envio',handler:this.sendData,scope:this},
			{iconCls:'cancel',id:'canclar',text:'Cancelar',handler:this.reset,scope:this},'->',
			{iconCls:'Nohome',id:'NoAut',text:'Solo como Usuario',handler:this.SDE,scope:this}	  ]
});
                this.win = new Ext.Window({
			id:'mywin',
			title: 'Panel de entrada',
			bodyStyle: 'padding:10px;background-color:fff;',
			width:635,
			height:380,
			items:[this.form]		 
		});
		this.win.show();
}, 
reset:function(){this.form.getForm().reset();},
SDE:function(){window.location = 'index3.php?.SID';},
sendData: function(){
	var mask = new Ext.LoadMask(Ext.get('forma'), {msg:'Comprobando los datos. Por Favor espere...'}); mask.show(); 
	this.form.getForm().submit({  
     method: 'put',  	 
     success: function(form,action){
		mask.hide();			
        Ext.Msg.alert('Mensaje de Bienvenida',action.result.msg);  
	window.location = 'index3.php?.SID'; 
     },  
     failure: function(form,action){  
			mask.hide();
         switch (action.failureType) { 
               case Ext.form.Action.CLIENT_INVALID:  
                  Ext.Msg.alert('Fallo en la operacion', 'El formulario presenta datos incorrectos');  
                  break;  
               case Ext.form.Action.CONNECT_FAILURE:  
                  Ext.Msg.alert('Fallo en la operacion', 'Comunicacion fallida con el Servidor (Via Ajax) ');  
                  break;  
               case Ext.form.Action.SERVER_INVALID:  
                 Ext.Msg.alert('Fallo en la operacion', action.result.msg);  
                 break;  
               default:  
                 Ext.Msg.alert('Fallo en la operacion',action.result.msg);  
           }  
        }  
	 });
	}

}   
 Ext.onReady(com.quizzpot.tutorial.FormTutorial.init,com.quizzpot.tutorial.FormTutorial);   