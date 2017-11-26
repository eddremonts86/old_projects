Ext.ns("com.quizzpot.tutorial");
var listado;
var filaseleccionada = 0;
var namebre;
var email;
var codigo;
var equipo;
var coment
var panelderechoizquierdo;
var panel;
var Prov, Munc, Dept,formulario,RPA,individual;
var mask; 
var provin,idR;
var municipios;
com.quizzpot.tutorial.IntegracionTutorial = {
	init: function(){
		provin = new Ext.data.ArrayStore({
				fields: ['id', 'name','idL'],
				data : [['1','PINAR DEL RIO','2'],
					['2','ARTEMISA','2'],
					['3','LA HABANA','2'],
					['4','MAYEBEUQE','2'],
					['5','MATANZAS','2'],
					['6','VILLA CLARA','2'],
					['7','CIENFUEGOS','2'],
					['8','SANTI SPIRITU','2'],
					['9','CIEGO DE AVILA','2'],
					['10','CAMAGUEY','2'],
					['11','LAS TUNAS','2'],
					['12','HOLGUIN','2'],
					['13','GRANMA','2'],
					['14','SANTIAGO DE CUBA','2'],
					['15','GUANTANAMO','2'],
					['16','MUNICIPIO ESPECIAL','2'],
					['17','ONE-PINAR DEL RIO','1'],
					['18','ONE-ARTEMISA','1'],
					['19','ONE-LA HABANA','1'],
					['20','ONE-MAYEBEUQE','1'],
					['21','ONE-MATANZAS','1'],
					['22','ONE-VILLA CLARA','1'],
					['23','ONE-CIENFUEGOS','1'],
					['24','ONE-SANTI SPIRITU','1'],
					['25','ONE-CIEGO DE AVILA','1'],
					['26','ONE-CAMAGUEY','1'],
					['27','ONE-LAS TUNAS','1'],
					['28','ONE-HOLGUIN','1'],
					['29','ONE-GRANMA','1'],
					['30','ONE-SANTIAGO DE CUBA','1'],
					['31','ONE-GUANTANAMO','1']]
					}); 
		municipios = new Ext.data.ArrayStore({
				fields: ['id', 'name','idP'],
				data : [['1','GUANE','1'],
					['2','SAN JUAN Y MARTINEZ','1'],
					['3','SAN LUIS','1'],
					['4','CONSOLACION DE SUR','1'],
					['5','MINAS DE MATAHAMBRE','1'],
					['6','MANTUA','1'],
					['7','LA PALMA','1'],
					['8','LOS PALACIOS','1'],
					['9','SANDINO','1'],
					['10','VINNALES','1'],
					['11','PINAR DEL RIO','1'],
					
					['12','SAN CRISTOBAL','2'],
					['13','CANDELARIA','2'],
					['14','BAHIA HONDA','2'],
					['15','MARIEL','2'],
					['16','GUANAJAY','2'],
					['17','CAIMITO','2'],
					['18','BAUTA','2'],
					['19','ALQUIZAR','2'],
					['20','ARTEMISA','2'],
					['21','GUIRA DE MELENA','2'],
					['22','SAN ANTONIO DE LOS BANNOS','2'],
					
					['23','10 DE OCTUBRE','3'],
					['24','MARIANAO','3'],
					['25','CERRO','3'],
					['26','PLAYA','3'],
					['27','PLAZA DE LA REVOLUCION','3'],
					['28','LA LISA','3'],
					['29','CENTRO HABANA','3'],
					['30','HABANA VIEJA','3'],
					['31','HABANA DEL ESTE','3'],
					['32','COTORRO','3'],
					['33','SAN MIGUEL DEL PADRON','3'],
					['34','GUANABACOA','3'],
					['35','BOYEROS','3'],
					['36','REGLA','3'],		
					['37','ARROYO NARANJO','3'],
					
					['38','BEJUCAL','4'],
					['39','SAN JOSE DE LAS LAJAS','4'],
					['40','JARUCO','4'],
					['41','SANTA CRUZ DEL NORTE','4'],
					['42','MADRUGA','4'],
					['43','NUEVA PAZ','4'],
					['45','SAN NICOLAS','4'],
					['46','GUINES','4'],
					['47','MELENA DEL SUR','4'],
					['48','BATABANO','4'],
					['49','QUIVICAN','4'],
					
					['50','MATANZAS','5'],
					['51','CARDENAS','5'],
					['52','VARADERO','5'],
					['53','MARTI','5'],
					['54','COLON','5'],
					['55','PERICO','5'],		
					['56','JOVELLANOS','5'],
					['57','PEDRO BETANCOUR','5'],
					['58','LIMONAR','5'],
					['59','UNION DE REYES','5'],
					['60','CIENAGA DE ZAPATA','5'],
					['61','JAGUEY GRANDE','5'],		
					['62','CALIMETE','5'],
					['63','LOS ARABOS','5'],
					
					['64','CORRALILLO','6'],		
					['65','QUEMADO DE GUINES','6'],
					['67','SAGUA LA GRANDE','6'],
					['68','ENCRUZIJADA','6'],
					['69','CAMAJUANI','6'],
					['70','CAIBAREN','6'],
					['71','REMEDIOS','6'],
					['72','PLACETA','6'],
					['73','SANTA CLARA','6'],
					['74','CIFUENTES','6'],
					['75','SANTO DOMINGO','6'],
					['76','RANCHUELO','6'],
					['77','MANICARAGUA','6'],
					
					['78','AGUADA DE PASAJEROS','7'],
					['79','RODAS','7'],
					['80','PALMIRA','7'],
					['81','LAJAS','7'],
					['82','CRUCES','7'],
					['83','CUMANAYAGUA','7'],
					['84','CIENFUEGOS','7'],
					['84','ABREUS','7'],
					
					['85','YAGUAJAY','8'],
					['86','JATIBONICO','8'],
					['87','TAGUASCO','8'],
					['88','CABAIGUAN','8'],
					['89','FOMENTO','8'],
					['90','TRINIDAD','8'],
					['91','SANTI SPIRITU','8'],
					['92','LA SIERPE','8'],
					
					['93','CHAMBAS','9'],
					['94','MORON','9'],
					['95','BOLIVIA','9'],
					['96','PRIMERO DE ENERO','9'],
					['97','CIRO REDONDO','9'],
					['98','FLORENCIA','9'],
					['99','MAJAGUA','9'],
					['100','CIEGO DE AVILA','9'],
					['101','VENEZUELA','9'],
					['102','BARAGUA','9'],
					
					['103','CARLOS MANUEL DE CESPEDES','10'],
					['104','ESMERALDA','10'],
					['105','SIERRA DE CUBITAS','10'],
					['106','MINAS','10'],
					['107','NUEVITAS','10'],
					['108','GUAIMARO','10'],
					['109','SIBANICU','10'],
					['110','CAMAGUEY','10'],
					['111','FLORIDA','10'],
					['112','VERTIENTES','10'],
					['113','JIMAGUAYU','10'],
					['114','NAJASA','10'],
					['115','SANTA CRUZ DEL SUR','10'],
					
					['116','MANATI','11'],
					['117','PUERTO PADRE','11'],
					['118','JESUS MENENDEZ','11'],
					['119','MAJIBACOA','11'],
					['120','LAS TUNAS','11'],
					['121','JOBABO','11'],
					['122','COLOMBIA','11'],
					['123','AMANCIO','11'],
					
					['124','GIBARA','12'],
					['125','RAFAEL FREYRE','12'],
					['126','BANES','12'],
					['127','ANTILLA','12'],
					['128','BAGUANOS','12'],
					['129','HOLGUIN','12'],
					['130','FRANK PAIS','12'],
					['131','CACOCUM','12'],
					['132','URBANO NORRIS','12'],
					['133','CUETO','12'],
					['134','MAYARI','12'],
					['135','CALIXTO GARCIA','12'],
					['136','SAGUA DE TANAMO','12'],
					['137','MOA','12'],
					
					['138','CAUTO CRISTO','13'],
					['139','JIGUANI','13'],
					['140','BAYAMO','13'],
					['141','YARA','13'],
					['142','MANZANILLO','13'],
					['143','CAMPECHUELA','13'],
					['144','MEDIA LUNA','13'],
					['145','NIQUERO','13'],
					['146','PILON','13'],
					['147','BARTOLOME MASO','13'],
					['148','BUEY ARRIBA','13'],
					['149','GUISA','13'],
					['150','RIO CAUTO','13'],
					
					['151','MELLA','14'],
					['152','SAN LUIS','14'],
					['153','SEGUNDO FRENTE','14'],
					['154','SONGO LA MAYA','14'],
					['155','SANTIAGO DE CUBA','14'],
					['156','PALMA SORIANO','14'],
					['157','TERCER FRENTE','14'],
					['158','GUAMA','14'],
					['159','CONTRAMAESTRE','14'],
					
					['160','EL SALVADOR','15'],
					['161','GUANTANAMO','15'],
					['162','YATERAS','15'],
					['163','BARACOA','15'],
					['164','MAISI','15'],
					['165','IMIAS','15'],
					['166','SAN ANTONIO DEL SUR','15'],
					['167','MANUEL TAMES','15'],
					['168','CAIMANERA','15'],
					['169','NICETO PEREZ','15']	
					]}); 
		namebre = new Ext.form.TextField({fieldLabel: 'Su Nombre',name: 'nombre',anchor:'95%',id : "nombre",emptyText:'Eduardo Valdes Inerarte... '}); 
		email = new Ext.form.TextField({fieldLabel: 'Su Email',name: 'Email',vtype:'email',id : "Email",anchor:'95%',emptyText:'edd@otepr.co.cu'}); 
		codigo = new Ext.form.TextField({fieldLabel: 'Codigo',name: 'codigo',anchor:'95%',forceSelection : true,id : "codigo",emptyText:'59874 '});
		idR = new Ext.form.TextField({fieldLabel: 'idr',hidden:true,name: 'idr',anchor:'95%',forceSelection : true,id : "idr",emptyText:'59874 '});
		Prov =new Ext.form.ComboBox({fieldLabel : "Provincia",anchor:'95%',name : "prov",hiddenName : "prov",id : "prov",forceSelection : true,emptyText:'Selecciona Provincia...',store:provin,displayField : 'name',typeAhead : true, forceSelection : true,mode : 'local'});  
		Munc = new Ext.form.ComboBox({fieldLabel : "Municipio",anchor:'95%',bodyStyle:'padding:5px 5px 0',name : "munc",hiddenName : "munc",id : "munc",forceSelection : true,emptyText:'Selecciona Municipio...',store:municipios,displayField : 'name',typeAhead : true, forceSelection : true,mode : 'local'});
		RPA = new Ext.form.ComboBox({fieldLabel : "Tipo Rotura",anchor:'95%',store:['Hardware','Software'],
	bodyStyle:'padding:5px 5px 0',name : "RPA",hiddenName : "RPA",id : "rPA",forceSelection : true,
	emptyText:'Selecciona ...',displayField : 'name',typeAhead : true, 
	forceSelection : true,mode : 'local'
  });  
		Dept = new Ext.form.ComboBox({fieldLabel: 'Departamento',name: 'deptamento',anchor:'95%',
		forceSelection : true,id : "deptamento",emptyText:'Mi departamento...'});
		equipo = new Ext.form.ComboBox({fieldLabel : "Equipo",anchor:'95%',store:['Mause','Monitor','Spikers','Torre CD/DVD'],bodyStyle:'padding:5px 5px 0',name : "Equipo",hiddenName : "Equipo",id : "Equipo",forceSelection : true,emptyText:'Selecciona Equipo...'});
		coment=new Ext.form.HtmlEditor({fieldLabel : "Comentario",anchor:'95%',bodyStyle:'padding:5px 5px 0',name : "Coment",hiddenName : "Coment",height: 150});
        individual = {bodyStyle: 'padding-right:0px;',xtype: 'fieldset',anchor:'95%',
        title: 'Que desea hacer ?',collapsed: true,collapsible: true,autoHeight: true,layout: 'column',
        items: [{           
            xtype: 'radiogroup',
            fieldLabel: 'Single Column',
            itemCls: 'x-check-group-alt',
            columns:1,
            items: [
                {boxLabel: 'Solo actualizar', name: 'rb-col', inputValue: 1},
                {boxLabel: 'Actualizar y dar alta', name: 'rb-col', inputValue: 2, checked: true},
                {boxLabel: 'Actualizar y pasasr a pendientes', name: 'rb-col', inputValue: 3}
          	  ]}]
		};

		var proxy = new Ext.data.HttpProxy({ 
				api: {  
					read    : "../../../clases/envio.php?termino=Reportes",   
					create  : "../../../clases/resepcion.php?termino=AltaSolicitud",  
					update  : "../../../clases/resepcion.php?termino=BajaSolicitud",  
					destroy : "../../../clases/resepcion.php?termino=eliminarSolicitud"  
				}  
			});																			
		var reader = new Ext.data.JsonReader({   
				totalProperty   : 'total',  	
				successProperty : 'success',  										   
				messageProperty : 'message',   
				idProperty  : 'id',        	   
				root        : 'data' 		    			  
				}
			    ,[{name: 'id'},{name: 'cod'},{name: 'mun'}, {name: 'fechai'},{name: 'dep'},{name: 'nombre'},
				  {name: 'equ'},{name: 'emil'},{name: 'DMR'},{name: 'comT'},{name: 'estado'},{name: 'fechaf'},
				  {name: 'RPA'},{name: 'Pro'},{name: 'comU'},{name: 'local'},{name: 'fechap'}				  
				 ]
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
				baseParams: {x:10,y:20}							
			});  
			this.store.load({params:{z:30,start:0,limit:15}});  
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
					 width:925, 
					 layout:'form',
					 height:489,					 
					 border: false,				  
					 labelWidth: 80,
					 loadMask: true,
					 abelAlign: 'top',			 
					 frame:true,		
					 iconCls: 'estados',					
					store: this.store, // step 3 
					columns : [  							
							new Ext.grid.RowNumberer(),
							{header:'Provincia', dataIndex:'Pro',width:120,sortable: true},
							{header:'Municipio', dataIndex:'mun',width:150,sortable: true},
							{header:'Departamento', dataIndex:'dep',width:120,sortable: true},							
							{header:'Correo', dataIndex:'emil',width:120,sortable: true},
							{header:'Equipo', dataIndex:'equ',width:120,sortable: true},
							{id:'Provincia',header:'Codigo Equipo', dataIndex:'cod',width:100,sortable: true},
							{header:'Fecha Realizada', dataIndex:'fechai', width:100,sortable: true},
							{header:'id', dataIndex:'id', width:100,sortable: true,hidden:true},
							{header:'nombre', dataIndex:'nombre', width:100,sortable: true,hidden:true}	,
							{header:'DMR', dataIndex:'DMR', width:100,sortable: true,hidden:true},
							{header:'comT', dataIndex:'comT', width:100,sortable: true,hidden:true},
							{header:'estado', dataIndex:'estado', width:100,sortable: true,hidden:true},	
							{header:'Tipo de Rotura', dataIndex:'RPA', width:100,sortable: true,hidden:true},
							{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
							{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
							{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
							{header:'fechaf', dataIndex:'fechap', width:100,sortable: true,hidden:true}
							],  
					tbar  : [   
					{text:"Ver Datos", scope : this, handler: this.datos,iconCls:'info'},
					{text:'Dar alta Solicitud',iconCls:'acept',handler:this.add},
					{text:'Pasar a Pendiente',iconCls:'user_del',handler:this.add},
					{text:"Eliminar Equipo", scope:this, handler:this.onDelete,iconCls:'del'}, 
							'->',
							new Ext.form.TwinTriggerField({
								xtype: 'twintriggerfield',
								trigger1Class: 'x-form-clear-trigger',
								trigger2Class: 'x-form-search-trigger'
							})
							],					
					border      : false,								
					bbar:pager,
					
					view: new Ext.grid.GroupingView({
					forceFit:true,
					groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'}),							 
					stripeRows  : true  
				});
		listado=this.grid;
		listado.on('rowclick',function(Grid, rowIndex, e){filaseleccionada = rowIndex;});	
		
		this.form = new Ext.form.FormPanel({
						frame:true,
						layout: 'form',
						border: false,
						id:'forma',
						height:420,
						url: '../../../clases/resepcion.php?termino=insertarSolicitud',						 
						bodyStyle: 'padding:0 10px 0;',
						columnWidth: '.5',
						border: false,
						items:	[Prov,Munc,Dept,codigo,equipo,namebre,email,RPA,idR],
						fbar: [{iconCls:'enviar1',text:'Envio',id:'envio',scope:this,handler:this.sendData},
							{iconCls:'cancel',id:'canclar',text:'Cancelar',scope:this,handler:this.reset}]						
							});
		formulario=this.form;
		var center = {
					xtype	:	"panel",
					region	:	"center",
					layout	:	"fit",
					border	:	false,
                    items	:	[this.grid],
					margins	:	{bottom:3,right:3}
				};
		var west =  {
					xtype	:	"panel",
					region	:	"west",
					width	:	300,
					collapseMode: 'mini',
					collapsible: true,
					tools: [{id:'pin'},{id:'unpin'}],
					split	:	true,					
					frame:true,	
					items	:	[this.form],
					/*tbar  : [ '->',{text:'a',iconCls: 'out',handler:this.fuera },
									{text:'b',iconCls: 'in',handler:this.dentro }],	*/
					title	:	"Actualizar Datos de Solicitud",
					margins	:	"0 0 3 3"
				};
		panel=west		
		var north = {
					xtype	:	"panel",
					region	:	"north",
					height	:	50,
					html	:	"North region",
					margins	:	{top:3,bottom:3,left:3,right:3}
				};
		var main = new Ext.Panel({
					renderTo	: 	"frame",
					layout		:	"border",
					height		:	490,
					width		:	935,
                    collapsible: true,
                    titleCollapse: true,
					items		:	[west,center],
					title: 'Listado de Solicitudes',					
					bodyStyle:'padding:5px 5px 0',					 								  
					border: false,				 		
					iconCls: 'user_del'			
				});
	 		
	},
	reset:function(){this.form.getForm().reset();},
	sendData: function(){
	var mask = new Ext.LoadMask(Ext.get('forma'),{msg:'Guardando los datos. Por Favor espere...'});
	mask.show(); 
	formulario.getForm().submit({  
     method: 'put',  	 
     success: function(form,action){
		mask.hide();
        Ext.Msg.alert('Datos de modificacion',action.result.msg);  
     },
	
		onDelete:function(){
				 var rows = listado.getSelectionModel().getSelections();   
					 if(rows.length === 0){  
						 return false;  
					 }  
					this.store.remove(rows);			
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
	
,datos:function(){
		namebre.setValue(listado.getStore().getAt(filaseleccionada).get('nombre'));
		email.setValue(listado.getStore().getAt(filaseleccionada).get('emil'));
		codigo.setValue(listado.getStore().getAt(filaseleccionada).get('cod'));		 
		Prov.setValue(listado.getStore().getAt(filaseleccionada).get('Pro'));
		Munc.setValue(listado.getStore().getAt(filaseleccionada).get('mun'));
		Dept.setValue(listado.getStore().getAt(filaseleccionada).get('dep'));		
		equipo.setValue(listado.getStore().getAt(filaseleccionada).get('equ'));
		RPA.setValue(listado.getStore().getAt(filaseleccionada).get('RPA'));
		idR.setValue(listado.getStore().getAt(filaseleccionada).get('id'));
		/*email.setValue(listado.getStore().getAt(filaseleccionada).get('emil'));
		codigo.setValue(listado.getStore().getAt(filaseleccionada).get('equ'));*/					
		},
	dentro:	function(){panel},
	
	fuera:function(){
		mask = new Ext.Window({
		title: 'Datos de la solicitud',
		layout: 'form',width: 510,
		frame:true,
		items:[formulario]
		});
		mask.show(); 			
		}
	
}
Ext.onReady(com.quizzpot.tutorial. IntegracionTutorial.init,com.quizzpot.tutorial. IntegracionTutorial);
