Ext.ns('com.quizzpot.tutorial');
Ext.BLANK_IMAGE_URL = '../extjs/resources/images/default/s.gif';
com.quizzpot.tutorial.SubmitFormTutorial = {
	init: function(){
		this.form = new Ext.form.FormPanel({
			//standardSubmit: true, // traditional submit
			url: 'submitform.php',
			border:false,	
			labelWidth: 80,
			abelAlign: 'top',
			frame:true,		
			title: 'Realizar reporte de averia. -Hardware-',
			bodyStyle:'padding:5px 5px 0',
			width: 272,
			defaults: {
				xtype:'textfield',
				width: 150
			},
			items:[
				{fieldLabel:'Titulo',name:'title', allowBlank:false},
				{xtype:'combo',fieldLabel:'Anno',name:'year',triggerAction:'all',store:[2009,2008,2007,2006]},
				{xtype:'numberfield',fieldLabel:'Cantidad',name:'revenues'},
				{xtype:'textarea',fieldLabel:'Comentario',name:'comment'},
				{xtype:'checkbox',fieldLabel:'',labelSeparator:'',boxLabel:'Esta seguro',name:'available'}
			     ],
			buttons: [
				{text:'Save',handler:this.sendData,scope:this},
				{text:'Cancel'}
					]
		});
		
		this.win = new Ext.Window({
			id:'mywin',
			title: 'Submit data to the Server',
			bodyStyle: 'padding:10px;background-color:fff;',
			width:300,
			height:320,
			items:[this.form]		 
		});
		this.win.show();
	},			
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
Ext.onReady(com.quizzpot.tutorial.SubmitFormTutorial.init,com.quizzpot.tutorial.SubmitFormTutorial);

