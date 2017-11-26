Ext.ns('com.quizzpot.tutorial');

com.quizzpot.tutorial.EditorGridTutorial = {
	init: function(){		
		//main code
		//creates the store for the grid 
		var store = new Ext.data.JsonStore({
			url: 'Solicitudes.php',
			root: 'data',
			id:'id',
			fields: ['name','age','country']
		});
		//load the data
		store.load();
		
		//creates the texfield to edit the data
		var textField = new Ext.form.TextField();
		var numberField = new Ext.form.NumberField({allowBlank:false});
		//creates the editor grid
		this.grid = new Ext.grid.EditorGridPanel({
			store: store,
			columns: [
				new Ext.grid.RowNumberer(),
				{header:'Name', dataIndex:'name',sortable: true,width:145,editor:textField},
				{header:'Age', dataIndex:'age',sortable: true, editor:numberField},
				{header:'Country', dataIndex:'country',sortable: true, editor:textField}
			],
			bbar:{
				 defaults:{scope:this},
				 items:[
					//{text:'Agregar Solicitud',iconCls:'add',handler:this.add},
					//{text:'Solicitud Pendiente',iconCls:'user_add',handler:this.add},
					{text:'Guardar Cambios',iconCls:'save',handler:this.save}, 					
					{text:'Cancelar Cambios',iconCls:'del',handler:this.cancel}
				   ]
			    },			 
			 stripeRows: true,
			 title: 'Listado de Solicitudes Pendientes',
			 bodyStyle:'padding:5px 5px 0',	  
			 width:925, 
			 layout:'form',
			 renderTo: 'frame',
			 height:455,
			 border: false,  
			 collapsible: true,	 
			 titleCollapse: true,
			 labelWidth: 80,
			 abelAlign: 'top',			 
			 frame:true,		
			 iconCls: 'user_del',
		});
		//creates a window to hold the grid		 
	},
	
	save: function(){
		//save changes in the grid
		var modified = this.grid.getStore().getModifiedRecords();//step 1
		if(!Ext.isEmpty(modified)){
			var recordsToSend = [];
			Ext.each(modified, function(record) { //step 2
				recordsToSend.push(Ext.apply({id:record.id},record.data));
			});

			this.grid.el.mask('Guardando Datos...', 'x-mask-loading'); //step 3
			this.grid.stopEditing();
			
			recordsToSend = Ext.encode(recordsToSend); //step 4
			
			Ext.Ajax.request({ 		// step 5
				url : 'Solicitudes.php',
				params :{records : recordsToSend},
				scope:this,
				success : function(response) {
					this.grid.el.unmask();
					this.grid.getStore().commitChanges(); //step 6
					
					//update the records with the correct ID's
					var info = Ext.decode(response.responseText); // step 1
					Ext.each(info.data,function(obj){
						var record = this.grid.getStore().getById(obj.oldId); //step 2
						
						record.set('id',obj.id); //step 3
						delete record.data.newRecordId; //step 4
					},this);
				}
			});
		}
	},	
	add: function(){
		//add a new row to the grid
		var position = this.grid.getStore().getCount();
		var id = Ext.id();
		var defaultData = {	//step 1
			newRecordId: id
		};
		var Person = this.grid.getStore().recordType; //step 2
		var person = new Person(defaultData,id); 
		this.grid.stopEditing(); //step 3
		this.grid.getStore().insert(position, person); // step 4
		this.grid.startEditing(position, 1); //step 5
	},
	
	cancel: function(){
		//cancel the changes in the grid
		this.grid.getStore().rejectChanges();
	}
}

Ext.onReady(com.quizzpot.tutorial.EditorGridTutorial.init,com.quizzpot.tutorial.EditorGridTutorial);