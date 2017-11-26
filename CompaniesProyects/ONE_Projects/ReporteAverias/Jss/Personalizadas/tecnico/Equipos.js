Ext.ns("com.quizzpot.tutorials");
var listado;
var filaseleccionada = 0;       
    com.quizzpot.tutorials.CrudForm = {  	
		init : function() { 
				
					var proxy = new Ext.data.HttpProxy({ 
						 api: {  
							read    : "../../../clases/envio.php?termino=Equipos",  
							create  : "../../../clases/resepcion.php?termino=createEquipo",  
							//update  : "../../clases/resepcion.php?termino=UpdateEquipo",  
							destroy : "../../../clases/resepcion.php?termino=eliminarEquipo" 
						}  
					}); 
																						
					var reader = new Ext.data.JsonReader({   
						totalProperty   : 'total',  	//step 1 
						successProperty : 'success',   // indica la propiedad que define si se ha insertado											   
						messageProperty : 'message',   //actualizado o borrado con éxito 
						idProperty  : 'id',        	   //este es el nombre del parámetro que llega al servidor
						root        : 'data' 		   //con el JSON modificado  				  
						}
						,[{name: 'id'},{name: 'nombre'}]
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
						baseParams: {x:10,y:20},							
					});  
					this.store.load({params:{z:30,start:0,limit:18}});  

						var sm = new Ext.grid.CheckboxSelectionModel(); //step 1 
						var pager = new Ext.PagingToolbar({
							pageSize: 18,					 
							store: this.store,
							displayInfo: true,
							displayMsg: 'Displaying topics {0} - {1} of {2}',
							emptyMsg: "No topics to display"
							});
			
						pager.on('beforechange',function(bar,params){
							params.z = 30;
						});	
						 this.grid = new Ext.grid.GridPanel({   
							 width:925, 							 
							 layout:'form',
							 renderTo: 'frame',
							 height:480,							 
							 border: false,  
							 collapsible: true,	 
							 titleCollapse: true,
							 labelWidth: 80,
							 abelAlign: 'top',
							 loadMask: true,	
							 frame:true,		
							 iconCls: 'estados',					
							store: this.store, // step 3 								
							columns:[  
									//sm, 
									new Ext.grid.RowNumberer(),									 
									{header:'Equipo', dataIndex:'nombre',width:100,sortable: true},
									{header:'id', dataIndex:'id',hidden:true,width:100,sortable: true},
									],  
							tbar: [   
					{text : "Agregar Equipo", scope : this, handler: this.datos,iconCls:'add'},
					{text:"Eliminar Equipo", scope:this, handler:this.onDelete,iconCls:'del'}  
									], 
							sm: sm,  
							bbar:pager,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'}),							 
							stripeRows  : true  
						});	
					listado=this.grid;
					listado.on('rowclick',function(Grid, rowIndex, e){filaseleccionada = rowIndex;});	
						
				 this.form = new Ext.form.FormPanel({  			  
					 width: 300,
					 height:100,
					 id:'grid',	
					 bodyStyle   : "padding: 5px;",  
					 url    	 : "../../../clases/resepcion.php?termino=createEquipo",
					 margins     : "3 3 3 3",  
					 border      : false, 
					 frame:true,	
					 defaults    : {allowBlank: false},  
					 items       : [ {xtype : "textfield", name : "Equipo", fieldLabel : "Equipo nuevo"},],
					 bbar      : [{text : "Agregar Equipo", scope : this,handler: this.datosA,iconCls:'add'}]       
					}); 
				},	
			 	datos:function(){
						var mask = new Ext.Window(
						{title: 'Agregar nuevo dispositivo',
						layout: 'form',
						width: 305,
						height:127,
						frame:true,
						items:[this.form]
						});
						mask.show(); 			
						},
				onDelete:function(){
				 var rows = this.grid.getSelectionModel().getSelections();   
					 if(rows.length === 0){  
						 return false;  
					 }  
					this.store.remove(rows);			
				},						
				datosA:function(){
				var mask = new Ext.LoadMask(Ext.get('grid'),{msg:'Guardando los datos. Por Favor espere...'});
							mask.show(); 
							this.form.getForm().submit({  
							method: 'put',  	 
						success: function(form,action){
							mask.hide();							
							Ext.Msg.alert('Success',action.result.msg); 
							window.location = 'tecnico.php?termino=Equipos';	
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
   Ext.onReady(com.quizzpot.tutorials.CrudForm.init,com.quizzpot.tutorials.CrudForm);  
