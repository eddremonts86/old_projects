 Ext.ns("com.quizzpot.tutorial");
com.quizzpot.tutorial.IntegracionTutorial = {
	init: function(){	 
		var proxy = new Ext.data.HttpProxy({api: { read    : "../../../clases/envio.php?termino=MensualesHard" }});
		var proxy1 = new Ext.data.HttpProxy({api: {read    : "../../../clases/envio.php?termino=MensualesHardSoluc"}});	
		var proxy2 = new Ext.data.HttpProxy({api: { read    : "../../../clases/envio.php?termino=MensualesHardPend" }});		
		var proxy3 = new Ext.data.HttpProxy({api: {read    : "../../../clases/envio.php?termino=MensualesSoft"}});
		var proxy4 = new Ext.data.HttpProxy({api: { read    : "../../../clases/envio.php?termino=MensualesSoftSoluc" }});
		var proxy5 = new Ext.data.HttpProxy({api: {read    : "../../../clases/envio.php?termino=MensualesSoftPend"}});
				
			 var reader = new Ext.data.JsonReader({   
				totalProperty   : 'total', successProperty : 'success',  messageProperty : 'message',  idProperty  : 'id', root : 'data' },
			    [{name: 'id'},{name: 'cod'},{name: 'mun'}, {name: 'fechai'},{name: 'dep'},{name: 'nombre'},
				  {name: 'equ'},{name: 'emil'},{name: 'DMR'},{name: 'comT'},{name: 'estado'},{name: 'fechaf'},
				  {name: 'RPA'},{name: 'Pro'},{name: 'comU'},{name: 'local'},{name: 'fechap'}				  
				 ]
			); 
			 var reader1 = new Ext.data.JsonReader({   
				totalProperty   : 'total', successProperty : 'success',  messageProperty : 'message',  idProperty  : 'id', root : 'data' },
			    [{name: 'id'},{name: 'cod'},{name: 'mun'}, {name: 'fechai'},{name: 'dep'},{name: 'nombre'},
				  {name: 'equ'},{name: 'emil'},{name: 'DMR'},{name: 'comT'},{name: 'estado'},{name: 'fechaf'},
				  {name: 'RPA'},{name: 'Pro'},{name: 'comU'},{name: 'local'},{name: 'fechap'}				  
				 ]
			);
			var reader2 = new Ext.data.JsonReader({   
				totalProperty   : 'total', successProperty : 'success',  messageProperty : 'message',  idProperty  : 'id', root : 'data' },
			    [{name: 'id'},{name: 'cod'},{name: 'mun'}, {name: 'fechai'},{name: 'dep'},{name: 'nombre'},
				  {name: 'equ'},{name: 'emil'},{name: 'DMR'},{name: 'comT'},{name: 'estado'},{name: 'fechaf'},
				  {name: 'RPA'},{name: 'Pro'},{name: 'comU'},{name: 'local'},{name: 'fechap'}				  
				 ]
			);
			var reader3 = new Ext.data.JsonReader({   
				totalProperty   : 'total', successProperty : 'success',  messageProperty : 'message',  idProperty  : 'id', root : 'data' },
			    [{name: 'id'},{name: 'cod'},{name: 'mun'}, {name: 'fechai'},{name: 'dep'},{name: 'nombre'},
				  {name: 'equ'},{name: 'emil'},{name: 'DMR'},{name: 'comT'},{name: 'estado'},{name: 'fechaf'},
				  {name: 'RPA'},{name: 'Pro'},{name: 'comU'},{name: 'local'},{name: 'fechap'}				  
				 ]
			);
			var reader4 = new Ext.data.JsonReader({   
				totalProperty   : 'total', successProperty : 'success',  messageProperty : 'message',  idProperty  : 'id', root : 'data' },
			    [{name: 'id'},{name: 'cod'},{name: 'mun'}, {name: 'fechai'},{name: 'dep'},{name: 'nombre'},
				  {name: 'equ'},{name: 'emil'},{name: 'DMR'},{name: 'comT'},{name: 'estado'},{name: 'fechaf'},
				  {name: 'RPA'},{name: 'Pro'},{name: 'comU'},{name: 'local'},{name: 'fechap'}				  
				 ]
			);
			var reader5 = new Ext.data.JsonReader({   
				totalProperty   : 'total', successProperty : 'success',  messageProperty : 'message',  idProperty  : 'id', root : 'data' },
			    [{name: 'id'},{name: 'cod'},{name: 'mun'}, {name: 'fechai'},{name: 'dep'},{name: 'nombre'},
				  {name: 'equ'},{name: 'emil'},{name: 'DMR'},{name: 'comT'},{name: 'estado'},{name: 'fechaf'},
				  {name: 'RPA'},{name: 'Pro'},{name: 'comU'},{name: 'local'},{name: 'fechap'}				  
				 ]
			);
			 
			 var writer = new Ext.data.JsonWriter({encode : true,writeAllFields  : true})  
			 var writer1 = new Ext.data.JsonWriter({encode : true,writeAllFields  : true }) 
			 var writer2 = new Ext.data.JsonWriter({encode : true,writeAllFields  : true})  
			 var writer3 = new Ext.data.JsonWriter({encode : true,writeAllFields  : true }) 
			 var writer4= new Ext.data.JsonWriter({encode : true,writeAllFields  : true})  
			 var writer5 = new Ext.data.JsonWriter({encode : true,writeAllFields  : true }) 
			 
			this.store = new Ext.data.GroupingStore({proxy: proxy,reader : reader,writer: writer,autoSave : true ,baseParams: {x:10,y:20}}); 
			this.store1 = new Ext.data.GroupingStore({proxy: proxy1,reader : reader1,writer: writer1,autoSave : true ,baseParams: {x:10,y:20}}); 
			this.store2 = new Ext.data.GroupingStore({proxy: proxy2,reader : reader2,writer: writer2,autoSave : true ,baseParams: {x:10,y:20}}); 
			this.store3= new Ext.data.GroupingStore({proxy: proxy3,reader : reader3,writer: writer3,autoSave : true ,baseParams: {x:10,y:20}}); 
			this.store4 = new Ext.data.GroupingStore({proxy: proxy4,reader : reader4,writer: writer4,autoSave : true ,baseParams: {x:10,y:20}}); 
			this.store5= new Ext.data.GroupingStore({proxy: proxy5,reader : reader5,writer: writer5,autoSave : true ,baseParams: {x:10,y:20}}); 
			
			this.store.load({params:{z:30,start:0,limit:18}}); 
			this.store1.load({params:{z:30,start:0,limit:18}}); 
			this.store2.load({params:{z:30,start:0,limit:18}}); 
			this.store3.load({params:{z:30,start:0,limit:18}}); 
			this.store4.load({params:{z:30,start:0,limit:18}}); 
			this.store5.load({params:{z:30,start:0,limit:18}}); 	

		var sm = new Ext.grid.CheckboxSelectionModel();  
		 
		 var pager = new Ext.PagingToolbar({pageSize: 18,store: this.store,displayInfo: true,displayMsg: 'Solicitudes de  {0} - {1} of {2}',emptyMsg: "No hay solicitudes"});
		 var pager1 = new Ext.PagingToolbar({pageSize: 18,store: this.store1,displayInfo: true,displayMsg: 'Solicitudes de  {0} - {1} of {2}',emptyMsg: "No hay solicitudes"});
		 var pager2 = new Ext.PagingToolbar({pageSize: 18,store: this.store2,displayInfo: true,displayMsg: 'Solicitudes de  {0} - {1} of {2}',emptyMsg: "No hay solicitudes"});
		 var pager3 = new Ext.PagingToolbar({pageSize: 18,store: this.store3,displayInfo: true,displayMsg: 'Solicitudes de  {0} - {1} of {2}',emptyMsg: "No hay solicitudes"});
		 var pager4 = new Ext.PagingToolbar({pageSize: 18,store: this.store4,displayInfo: true,displayMsg: 'Solicitudes de  {0} - {1} of {2}',emptyMsg: "No hay solicitudes"});
		 var pager5 = new Ext.PagingToolbar({pageSize: 18,store: this.store5,displayInfo: true,displayMsg: 'Solicitudes de  {0} - {1} of {2}',emptyMsg: "No hay solicitudes"});
		 
		pager.on('beforechange',function(bar,params){params.z = 30;});	
		pager1.on('beforechange',function(bar,params){params.z = 30;});	
		pager2.on('beforechange',function(bar,params){params.z = 30;});	
		pager3.on('beforechange',function(bar,params){params.z = 30;});	
		pager4.on('beforechange',function(bar,params){params.z = 30;});	
		pager5.on('beforechange',function(bar,params){params.z = 30;});	
		
		this.grid = new Ext.grid.GridPanel({   
							 layout:'form',					  
							 border: false, 
							 labelWidth: 80,
							 height:435,
							 loadMask: true,
							 abelAlign: 'top',			 
							 frame:true,		
							 iconCls: 'estados',					
							store: this.store,  					 
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
									{header:'estado', dataIndex:'estado', width:100,sortable: true,hidden:false},	
									{header:'Tipo Rotura', dataIndex:'RPA', width:100,sortable: true,hidden:false},
									{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
									{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
									{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
									{header:'fechaf', dataIndex:'fechap', width:100,sortable: true,hidden:true}
									],  
							tbar  : [   
									{text : "Ver Datos", scope : this, handler: this.fuera,iconCls:'info'},'->',
									new Ext.form.TwinTriggerField({
										xtype: 'twintriggerfield',
										trigger1Class: 'x-form-clear-trigger',
										trigger2Class: 'x-form-search-trigger'
									})
									 ], 
						   
														
							bbar:pager,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'}),							 
							stripeRows  : true  
						});
		this.grid1 = new Ext.grid.GridPanel({ 
							 layout:'form',					 
							 border: false,					  
							 labelWidth: 80,
							 height:435,
							 loadMask: true,
							 abelAlign: 'top',			 
							 frame:true,		
							 iconCls: 'estados',					
							store: this.store1,  					 	
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
									{header:'estado', dataIndex:'estado', width:100,sortable: true,hidden:false},	
									{header:'Tipo Rotura', dataIndex:'RPA', width:100,sortable: true,hidden:false},
									{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
									{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
									{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
									{header:'fechaf', dataIndex:'fechap', width:100,sortable: true,hidden:true}
									],  
							tbar  : [   
									{text : "Ver Datos", scope : this, handler: this.datos,iconCls:'info'},'->',
									new Ext.form.TwinTriggerField({
										xtype: 'twintriggerfield',
										trigger1Class: 'x-form-clear-trigger',
										trigger2Class: 'x-form-search-trigger'
									})							 					 
									], 
							 
														
							bbar:pager1,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'}),							 
							stripeRows  : true  
						});
		this.grid2 = new Ext.grid.GridPanel({ 
							 layout:'form',					 
							 border: false,					  
							 labelWidth: 80,
							 height:435,
							 loadMask: true,
							 abelAlign: 'top',			 
							 frame:true,		
							 iconCls: 'estados',					
							store: this.store2,  					 	
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
									{header:'estado', dataIndex:'estado', width:100,sortable: true,hidden:false},	
									{header:'Tipo Rotura', dataIndex:'RPA', width:100,sortable: true,hidden:false},
									{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
									{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
									{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
									{header:'fechaf', dataIndex:'fechap', width:100,sortable: true,hidden:true}
									],  
							tbar  : [   
									{text : "Ver Datos", scope : this, handler: this.datos,iconCls:'info'},'->',
									new Ext.form.TwinTriggerField({
										xtype: 'twintriggerfield',
										trigger1Class: 'x-form-clear-trigger',
										trigger2Class: 'x-form-search-trigger'
									})							 					 
									], 
							 
														
							bbar:pager2,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'}),							 
							stripeRows  : true  
						});
		this.grid3 = new Ext.grid.GridPanel({ 
							 layout:'form',					 
							 border: false,					  
							 labelWidth: 80,
							 height:435,
							 loadMask: true,
							 abelAlign: 'top',			 
							 frame:true,		
							 iconCls: 'estados',					
							store: this.store3,  					 	
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
									{header:'estado', dataIndex:'estado', width:100,sortable: true,hidden:false},	
									{header:'Tipo Rotura', dataIndex:'RPA', width:100,sortable: true,hidden:false},
									{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
									{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
									{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
									{header:'fechaf', dataIndex:'fechap', width:100,sortable: true,hidden:true}
									],  
							tbar  : [   
									{text : "Ver Datos", scope : this, handler: this.datos,iconCls:'info'},'->',
									new Ext.form.TwinTriggerField({
										xtype: 'twintriggerfield',
										trigger1Class: 'x-form-clear-trigger',
										trigger2Class: 'x-form-search-trigger'
									})							 					 
									], 
							 
														
							bbar:pager3,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'}),							 
							stripeRows  : true  
						});
		this.grid4 = new Ext.grid.GridPanel({ 
							 layout:'form',					 
							 border: false,					  
							 labelWidth: 80,
							 height:435,
							 loadMask: true,
							 abelAlign: 'top',			 
							 frame:true,		
							 iconCls: 'estados',					
							store: this.store4,  					 	
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
									{header:'estado', dataIndex:'estado', width:100,sortable: true,hidden:false},	
									{header:'Tipo Rotura', dataIndex:'RPA', width:100,sortable: true,hidden:false},
									{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
									{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
									{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
									{header:'fechaf', dataIndex:'fechap', width:100,sortable: true,hidden:true}
									],  
							tbar  : [   
									{text : "Ver Datos", scope : this, handler: this.datos,iconCls:'info'},'->',
									new Ext.form.TwinTriggerField({
										xtype: 'twintriggerfield',
										trigger1Class: 'x-form-clear-trigger',
										trigger2Class: 'x-form-search-trigger'
									})							 					 
									], 
							 
													
							bbar:pager4,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'}),							 
							stripeRows  : true  
						});
		this.grid5 = new Ext.grid.GridPanel({ 
							 layout:'form',					 
							 border: false,					  
							 labelWidth: 80,
							 height:435,
							 loadMask: true,
							 abelAlign: 'top',			 
							 frame:true,		
							 iconCls: 'estados',					
							store: this.store5,  					 	
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
									{header:'estado', dataIndex:'estado', width:100,sortable: true,hidden:false},	
									{header:'Tipo Rotura', dataIndex:'RPA', width:100,sortable: true,hidden:false},
									{header:'comU', dataIndex:'comU', width:100,sortable: true,hidden:true},
									{header:'local', dataIndex:'local', width:100,sortable: true,hidden:true},
									{header:'fechap', dataIndex:'fechap', width:100,sortable: true,hidden:true},
									{header:'fechaf', dataIndex:'fechap', width:100,sortable: true,hidden:true}
									],  
							tbar  : [   
									{text : "Ver Datos", scope : this, handler: this.datos,iconCls:'info'},'->',
									new Ext.form.TwinTriggerField({
										xtype: 'twintriggerfield',
										trigger1Class: 'x-form-clear-trigger',
										trigger2Class: 'x-form-search-trigger'
									})							 					 
									], 							 
															
							bbar:pager5,
							
							view: new Ext.grid.GroupingView({
							forceFit:true,
							groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'}),							 
							stripeRows  : true  
						});				
	
		var tabs = new Ext.TabPanel({       
			width:930,
			height:467,
			activeTab: 0,
			frame:true,
			defaults:{autoHeight: true},
			items:[
				{items:	[this.grid], title: 'Hardware - Realizadas',iconCls: 'SolH'},
				{items:	[this.grid1], title: 'Hardware - Soluciunadas',iconCls: 'SolHR'},
				{items:	[this.grid2], title: 'Hardware - Pendientes',iconCls: 'SolHP'},
				
				{items:	[this.grid3], title: 'Software - Realizadas',iconCls: 'SolS'},
				{items:	[this.grid4], title: 'Software - Soluciunadas',iconCls: 'SolSR'},
				{items:	[this.grid5], title: 'Software - Pendientes',iconCls: 'SolSP'}
			]
		});
		var main = new Ext.Panel({
						renderTo	: 	"frame",
						layout		:	"border",
						height		:	500,
						width		:	935,
						collapsible: true,
						titleCollapse: true,
						items:	[tabs],
						title: 'Listado de Solicitudes Mensuales',					
						bodyStyle:'padding:5px 5px 0',					 								  
						border: false,				 		
						iconCls: 'user_del'			
					});

	} 
}
Ext.onReady(com.quizzpot.tutorial. IntegracionTutorial.init,com.quizzpot.tutorial. IntegracionTutorial);