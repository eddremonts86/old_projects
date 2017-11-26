 Ext.ns("com.quizzpot.tutorials"); 
 var image ='../../img/Ext-import/1ead.png';
    com.quizzpot.tutorials.area = {  	
		init : function() { 
				
					var proxy = new Ext.data.HttpProxy({ 
						 api: {  
							read    : "../../../clases/envio.php?termino=Avisos",  
							create  : "createContact.php",  
							update  : "updateContact.php",  
							destroy : "destroyContact.php" 
						}  
					}); 
																						
					var reader = new Ext.data.JsonReader({   
						totalProperty   : 'total',  	//step 1 
						successProperty : 'success',   // indica la propiedad que define si se ha insertado											   
						messageProperty : 'message',   //actualizado o borrado con éxito 
						idProperty  : 'id',        	   //este es el nombre del parámetro que llega al servidor
						root        : 'data' 		   //con el JSON modificado  				  
						}
						,[{name: 'cod'},{name: 'nombre'}, {name: 'fechai'}, 
						  {name: 'dep'},{name: 'id'},{name: 'comentarioU'},
						  {name: 'emil'},{name: 'image'}
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
						baseParams: {x:10,y:20},							
					});  
					this.store.load({params:{z:30,start:0,limit:3}});  

						var sm = new Ext.grid.CheckboxSelectionModel(); //step 1 
						var pager = new Ext.PagingToolbar({
							pageSize: 3,					 
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
							title: 'Avisos a los usuarios',
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
							store       : this.store, // step 3 							
							columns     : [  
									//sm, 
									new Ext.grid.RowNumberer(),
									{header:'', dataIndex:'image',width:100,sortable: true, renderer: this.showImage},  	
									//{header:'nombre', dataIndex:'nombre',width:150,sortable: true,renderer:this.showBreed},
									{header:'id', dataIndex:'id',width:10,sortable: true, hidden:true},
									//{header:'emil', dataIndex:'emil',width:100,sortable: true},
									{header:' ', dataIndex:'comentarioU',width:745,sortable: true,renderer:this.showDescription},
									], 							
							sm      : sm,  
							border      : false,								
							bbar:pager,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'}),							 
							stripeRows  : true  
						});	
						
			this.form = new Ext.form.FormPanel({  			  
					 width: 300,
					 height:100,  
					 bodyStyle   : "padding: 5px;",  
					 //url    	 : "updateContact.php", //step 1  
					 margins     : "3 3 3 3",  
					 border      : false, 
					 frame:true,	
					 defaults    : {allowBlank: false},  
					 items       : [ {xtype : "textfield", name : "area", fieldLabel : "Nueva Area o Departamento "},],
					 fbar      	 : [{text : "Agregar", scope : this, handler: this.datos,iconCls:'add'}]       
					}); 
				},
			showImage: function(value, metaData, record, rowIndex, colIndex, store){ 
						return '<img src="../../../img/icons/Symbol-Information.png" alt="'+record.get('breed')+'" style="width: 50px;">';  
						},	
			showDescription: function(value,metaData){  
						  metaData.attr = 'style="white-space:normal"';  
						  return value;  
					  },
			showBreed: function(value, metaData, record, rowIndex, colIndex, store){  
					  metaData.attr = 'style="white-space:normal"';  
					  return '<em class="name">'+value+'</em><br><em class="nam">'+record.get('emil')+'</em>';  
				  },
			loadRecord : function(Grid,index,ev){  //step 1					
							var rec = this.grid.store.getAt(index);  //step 2  
							this.form.getForm().load({  //step 3  
							   url : "fillForm.php", //archivo php que se encargará de hacer la petición al servidor  
							   params  : {record:rec.id},  //step 4  
								failure : function(form, action){  
										Ext.Msg.alert("Error","Load failed");  
											}});},  
			datos:function(){
						var mask = new Ext.Window(
						{title: 'Agregar area o departamento',
						layout: 'form',
						width: 305,
						height:127,
						frame:true,
						items:[this.form]
						});
						mask.show(); 			
						}
							
        }  
   Ext.onReady(com.quizzpot.tutorials.area.init,com.quizzpot.tutorials.area);  