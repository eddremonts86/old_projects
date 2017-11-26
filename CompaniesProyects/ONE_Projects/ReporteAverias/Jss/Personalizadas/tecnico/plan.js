Ext.onReady(function(){
    Ext.QuickTips.init();
    var msg = function(title, msg){
        Ext.Msg.show({
            title: title,
            msg: msg,
            minWidth: 200,
            modal: true,
            icon: Ext.Msg.INFO,
            buttons: Ext.Msg.OK
        });
    };
	var fp = new Ext.FormPanel({
        renderTo: 'frame',
        fileUpload: true,
        width: 700,	
		layout:'form',	
        frame: true,
        title: 'Plan de Mantenimiento',
        autoHeight: true,        
        labelWidth: 80,
        defaults: {
            anchor: '85%',
            allowBlank: false,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Name',
			name: 'Name'
        },{
            xtype: 'fileuploadfield',
            id: 'form-file',
            emptyText: 'Seleccione el Documento del plan',
            fieldLabel: 'Documento',
            name: 'photo-path',
            buttonText: '',
            buttonCfg: {iconCls: 'subirF',width: 10}
        },
		{   xtype:'htmleditor',
            id:'bio',
			name: 'coment',
            fieldLabel:'Comentario',
            height:100,             	
		}],
        
		bbar: [{iconCls:'enviar1',text:'Envio',id:'envio',scope:this,handler:function(){
                if(fp.getForm().isValid()){
	                fp.getForm().submit({
						method: 'put',  
	                    url: '../../../clases/Upload/file-upload.php',
	                    waitMsg: 'Subiendo Archivo ...',
	                    success: function(fp, o){
	                        msg('Success', 'Processed file "'+o.result.file+'" on the server');
	                    }
	                });
                }
            }},
			{iconCls:'cancel',id:'canclar',text:'Cancelar',scope:this,handler:function(){fp.getForm().reset();}}]
		
		
		
		
		
    });

});