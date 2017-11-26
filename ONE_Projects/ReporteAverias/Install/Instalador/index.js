Ext.ns("com.quizzpot.install");
var Gray =new Ext.form.Radio({id:'radio1',fieldLabel:'',boxLabel: 'Gray-Theme', name: 'radio',inputValue: '1',checked: true});
var Blue =new Ext.form.Radio({id:'radio2',fieldLabel:'',boxLabel: 'Blue-Theme', name: 'radio',inputValue: '2'});
com.quizzpot.install.Wizard = {
	index	: 0,	 
	init : function(){
			this.form = new Ext.FormPanel({	 // step 1
			layout	: "card",	 //step2
			border	: false,
			activeItem	: this.index, 	//step3
			items		: [this.bienbenido(), this.licencia(),this.requisitos(), this.Datos(),this.DatosUser(),this.DatosTema(),this.finalizar()]
				});
			//step 1
			this.backBtn = new Ext.Button({text : "Atras", iconCls: 'atras',handler : this.back,scope : this,hidden:true});
			this.nextBtn = new Ext.Button({text : "Siguiente", iconCls: 'siguiente',handler : this.next,scope : this});
			this.finishBtn = new Ext.Button({text : "Finalizar", hidden : true, iconCls: 'Bien', handler:this.finish,scope:this});

			this.win = new Ext.Window({
					title		        : "Intalacion del Sistema - Reporte de Averias",
					layout		: "fit",
					width		: 860,
					height		: 500,
				resizable	        : false, //step 2
				bodyCssClass	: "wizard-image", //step 3
				fbar		        : [this.backBtn,this.nextBtn,this.finishBtn], //step 4
				items		        : [this.form] //step 5
			});	
							
			this.win.show();
		},
	 bienbenido : function(){
				return {
					xtype	: "panel",
					layout	: "form",
					border	: false,
					padding	: 10,					
					items   : [ {html : "<h1>Bienvenido al Instalador del Sistema de Reporte de Averias</h1></br>"+
			"<p>Gracias por preferir nuestas soluciones para empresas en este caso el Sistema de Reporte de Averias (SisRA)", border : false},
					//{xtype     : "textfield", name : "alias"},
					{html  : "<p><br><b>Para continuar haga click en Siguiente</b></p>", border : false}]

				};
			},		
	requisitos : function(){
				return {
					xtype	: "panel",
					layout	: "form",
					border	: false,
					padding	: 10,					
					items   : [ {html : "<h1>Antes de instalar el sestema debe cumplir algunos requisitos (minimos) tecnicos.</h1></br>"+
			"<p><img src="+"Instalador/img/ok.png"+">Apache Version : 2.2.6  "+
			"<p><img src="+"Instalador/img/ok.png"+">PHP Version : 5.2.5  "+
			"<p><img src="+"Instalador/img/ok.png"+">MySQL Version : 5.0.45  "+
			"<p><img src="+"Instalador/img/ok.png"+">Adobe Flash Pleyer Version : 10.3"+
			"<p><img src="+"Instalador/img/ok.png"+">512 Mb de memoria RAM"+
			"<p><img src="+"Instalador/img/ok.png"+">2.0 Gb de procesamiento"+
			"<p><img src="+"Instalador/img/ok.png"+">50 Mb de espacio libre"+
			"<p><img src="+"Instalador/img/ok.png"+">64 Kbit de ancho de banda"
			,border : false},
					//{xtype     : "textfield", name : "alias"},
					{html  : "<p><br><b>Para continuar haga click en Siguiente</b></p>", border : false}]

				};
				 
			},
	Datos : function(){
				return{
					xtype		: "panel",
					layout	: "form",
					labelWidth	: 100,
					padding	: 10,
					border	: false,
					items	: [{html : "<h1>Datos del Servidor MySQL</h1><br><br>", border : false},
							{fieldLabel : "Servidor",xtype : "textfield", name : "server"},
							{fieldLabel : "Port",xtype : "textfield", name : "port"},
							//{fieldLabel : "Database",xtype : "textfield", name : "database"},
							{fieldLabel : "Usuario(MySQL)",xtype : "textfield", name : "user"},
							{fieldLabel : "Password(usuario)",xtype : "textfield", inputType : "password", name : "passwrd"},
							{html : "<br><br><p><b>Para continuar haga click en Siguiente.</p>", border : false}]
				}
			},
			
	DatosUser : function(){
				return{
					xtype		: "panel",
					layout	: "form",
					labelWidth	: 100,
					padding	: 10,
					border	: false,
					items	: [{html : "<h1>Datos del Servidor MySQL</h1><br><br>", border : false},
							{html : "<br><br><p><b>Usuario y Password del Tecnico responsable.</b></p>", border : false},
							{fieldLabel : "Usuario",xtype : "textfield", name : "server"},
							{fieldLabel : "Password(Tecnico)",xtype : "textfield", inputType : "password", name : "passwrd"},							
							{html : "<br><br><p><b>Usuario y Password del J'Departamento Informatica.</b></p>", border : false},
							{fieldLabel : "Usuario",xtype : "textfield", name : "user"},
							{fieldLabel : "Password(J'Dept)",xtype : "textfield", inputType : "password", name : "passwrd"},
							{html : "<br><br><p><b>Para continuar haga click en Siguiente.</p>", border : false}]
				}
			},
	DatosTema : function(){
				return{
					xtype		: "panel",
					layout	: "form",
					labelWidth	: 100,
					padding	: 10,
					border	: false,
					items	: [{html : "<h1>Escoja el tema por defecto de su Aplicacion</h1><br>", border : false},
							{html : "<img src="+"Instalador/img/gray.jpg width="+"200"+" height="+"150"+">", border : false},
							Gray,							
							{html : "<img src="+"Instalador/img/blue.jpg width="+"200"+" height="+"150"+">" , border : false},
							Blue,
							{html : "<br/><b>Para continuar haga click en Siguiente.", border : false}]}
			},	
		finalizar : function(){
				return {
					xtype	: "panel",
					layout	: "form",
					border	: false,
					padding	: 10,					
					items   : [ {html : "<h1>Gracias por escojernos</h1></br><p>Esta seguro de los datos que anteriormente a escrito?", border : false},
					//{xtype     : "textfield", name : "alias"},
					{html  : "<p><br><b>Cuando alla realizado esta accion de finalizar para ver su sitio...</b></p>", border : false}]

				};
			},			
			
	next: function(){
				this.backBtn.show();	//step 1
				if(this.index < this.form.items.length-1){	//step 2
					this.index++;
					var cardlayout = this.form.getLayout();	//step 3
					cardlayout.setActiveItem(this.index);

					//step 4
					if(this.index == this.form.items.length-1){	//si esta en el ultima carta
						this.nextBtn.hide();
						this.finishBtn.show();
					}
				}
			},	
	back : function(){
				if(this.index>0){	//step 1
					this.index--;
					var cardlayout = this.form.getLayout();
					cardlayout.setActiveItem(this.index);
				}

			//step 2
				if(this.index == 0){	//si está en la primera carta
					this.backBtn.hide();
				}else{	//step 3
					this.finishBtn.hide();
					this.nextBtn.show();
				}
			},
	finish	: function(){
				this.form.getForm().submit({
					url		: "createConnection.php",
					scope	        : this,
					success	: this.msg,
					failure	: this.msg
				});
			},
	msg	: function(){					
				Ext.Msg.alert("Nota Importante ","Nota:</b> Para empezar a trabajar en el sistema <b>Borre</b>.o <b>Renombre</b> la carpeta <b><i>Intalacion</i></b> en la raiz del sitio.<p>Esperamos sea de utilidad esta aplicacion.");
				this.win.close();
			},
	licencia : function(){
				return {
					xtype	: "panel",
					layout	: "form",
					border	: false,
					padding	: 10,					
					items   : [ {html : "<h1>Licencia</h1></br>", border : false},
					//{xtype     : "textfield", name : "alias"},
					{html  : "Lea la licencia <a href="+"Instalador/Licencia.docx"+">aqui"+"</a><p><br><b>Para continuar haga click en Suiguiente</b></p>", border : false}]

				};
			}			
			
}
Ext.onReady(com.quizzpot.install.Wizard.init,com.quizzpot.install.Wizard);

