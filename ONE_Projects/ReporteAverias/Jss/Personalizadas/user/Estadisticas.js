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
var Prov, Munc, Dept,formulario;
var mask; 
com.quizzpot.tutorial.IntegracionTutorial = {
	init: function(){
		namebre = new Ext.form.TextField({fieldLabel: 'Su Nombre',name: 'Nombre',anchor:'95%',id : "nombre",emptyText:'Eduardo Valdes Inerarte... '}); 
		email = new Ext.form.TextField({fieldLabel: 'Su Email',name: 'Email',vtype:'email',id : "Email",anchor:'95%',emptyText:'edd@otepr.co.cu'}); 
		codigo = new Ext.form.TextField({fieldLabel: 'Codigo',name: 'Codigo',anchor:'95%',forceSelection : true,id : "codigo",emptyText:'59874 '});
		Prov = new Ext.form.TextField({fieldLabel: 'Provincia',name: 'Provincia',anchor:'95%',id : "Provincia",emptyText:'Mi Provincia... '}); 
		Munc = new Ext.form.TextField({fieldLabel: 'Municipio',name: 'Municipio',id : "Municipio",anchor:'95%',emptyText:'Mi municipio...'}); 
		Dept = new Ext.form.TextField({fieldLabel: 'Deptamento',name: 'Deptamento',anchor:'95%',forceSelection : true,id : "Dept",emptyText:'Mi deptamento...'});
		equipo = new Ext.form.TextField({fieldLabel : "Equipo",anchor:'95%',name : "Equipo",hiddenName : "Equipo",id : "equipo",emptyText:'Equipo...'});
		coment=new Ext.form.HtmlEditor({fieldLabel : "Comentario",anchor:'95%',bodyStyle:'padding:5px 5px 0',name : "Coment",hiddenName : "Coment",height: 150});
        
var proxy = new Ext.data.HttpProxy({ 
				api: {  
					read    : "../../../clases/envio.php?termino=Estadisticas",   
					create  : "createContact.php",  
					update  : "updateContact.php",  
					destroy : "destroyContact.php" 
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
					//plugins: new Ext.ux.SlidingPager()  
					displayMsg: 'Solicitudes de  {0} - {1} of {2}',
					emptyMsg: "No hay solicitudes"
		});
	
		pager.on('beforechange',function(bar,params){
			params.z = 30;
		});	
				 this.grid = new Ext.grid.GridPanel({   
					 title: 'Listado de Solicitudes',					
					 bodyStyle:'padding:5px 5px 0',
					 width:925, 
					 collapsible:true,
					titleCollapse:true,
					 layout:'form',
					 //renderTo: 'frame',
					 height:489,					 
					 border: false, 					 
					 labelWidth: 80,
					 loadMask: true,
					 abelAlign: 'top',			 
					 frame:true,		
					 iconCls: 'estados',					
					store: this.store, // step 3 				
					columns : [  
							//sm, 
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
							{header:'RPA', dataIndex:'RPA', width:100,sortable: true,hidden:true},
							{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
							{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
							{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
							{header:'fechaf', dataIndex:'fechaf', width:100,sortable: true,hidden:true}
							],  
					tbar  : [   
							{text : "Ver Datos", scope : this, handler: this.fuera,iconCls:'info'},
							'->',
							new Ext.form.TwinTriggerField({
								xtype: 'twintriggerfield',
								trigger1Class: 'x-form-clear-trigger',
								trigger2Class: 'x-form-search-trigger'
							})
							/*{text:'Agregar Solicitud',iconCls:'add',handler:this.add},
							{text:'Solicitud Pendiente',iconCls:'user_del',handler:this.add},
							{text:"Eliminar Solicitud", scope:this, handler:this.delet,iconCls:'del'} ,
							//{text:'Guardar Cambios',iconCls:'save',handler:this.save}, 					
							//{text:'Cancelar Cambios',iconCls:'cancel',handler:this.cancel}*/						 
							], 
					sm      : sm,  
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
						layout:'form',
						id:'forma',
						height:300,
						url: 'Solicitudes.php',
						items:	[Prov,Munc,Dept,codigo,equipo,namebre,email],
						/*fbar: [{iconCls:'vote-icon',text:'Envio',id:'envio',scope:this,handler:this.sendData},
							{iconCls:'cancel',id:'canclar',text:'Cancelar',scope:this,handler:this.cancel}]	*/					
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
					width	:	280,
					split	:	true,
					collapsible: true,
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
					renderTo:"frame",
					layout:"border",
					height:490,
					width:925,                    
					items:[center],										 								  
					border: false,				 		
					//iconCls:'user_del'			
				});
	 		
	},
	sendData: function(){
	var mask = new Ext.LoadMask(Ext.get('forma'),{msg:'Guardando los datos. Por Favor espere...'});
	mask.show(); 
	formulario.getForm().submit({  
     method: 'put',  	 
     success: function(form,action){
		mask.hide();
        Ext.Msg.alert('Datos de modificacion',action.result.msg);  
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
		/*email.setValue(listado.getStore().getAt(filaseleccionada).get('emil'));
		codigo.setValue(listado.getStore().getAt(filaseleccionada).get('equ'));*/					
		},
	dentro:	function(){panel},
	
	fuera:function(){
		namebre.setValue(listado.getStore().getAt(filaseleccionada).get('nombre'));
		email.setValue(listado.getStore().getAt(filaseleccionada).get('emil'));
		codigo.setValue(listado.getStore().getAt(filaseleccionada).get('cod'));		 
		Prov.setValue(listado.getStore().getAt(filaseleccionada).get('Pro'));
		Munc.setValue(listado.getStore().getAt(filaseleccionada).get('mun'));
		Dept.setValue(listado.getStore().getAt(filaseleccionada).get('dep'));		
		equipo.setValue(listado.getStore().getAt(filaseleccionada).get('equ'));
		
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