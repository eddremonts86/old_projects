Ext.ns("com.quizzpot.tutorials");
com.quizzpot.tutorials.index = {
    init : function() {
        var name = new Ext.form.TextField({
            fieldLabel:'Nombre',
            name:'nombre',
            id :"nombre",
            minLength:3,
            maxLength:32,
            emptyText:'Escriba nombre de usuario ',
            blankText:'Escriba nombre de usuario'
        });
        var pass = new Ext.form.TextField({
            fieldLabel: 'Password',
            name: 'passw',
            inputType:'password',
            id : "passw",
            minLength:5,
            minLengthText:'El password debe ser de mas de 6 caracteres.',
            maxLength:32,
            emptyText:'Escriba password de usuario ',
            blankText: 'password'
        });        
        this.form = new Ext.FormPanel({
            id:'forma',
            width:400,
            height:178,
            layout:'form',
            renderTo:'login',
            defaults:{
                anchor:'76%',
                allowBlank:false,
                selectOnFocus:true,
                msgTarget:'side'
            },
            border:false,
            labelWidth:25,
            abelAlign:'top',
            url:'phpclass/login.php?termino=login',
            frame:true,
            iconCls:'abuso',
            items:[name, pass],
            bbar:[
            {
                iconCls:'entrar',
                text:'Envio',
                id:'envio',
                handler:this.sendData,
                scope:this
            },

            {
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                handler:this.reset,
                scope:this
            },
            '->',
            new Ext.ux.StatusBar({
                id:'form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'forma'
                })
            })
            ]
        });


        var center = {
            xtype:"panel",
            region:"center",
            layout:"fit",
            border:false,
            frame:true,
            height:200,
            width:400,
            html:'<a href="sist-documental/index.php"><br/><div><img src="img/imagenes/aa.png" width="380px" height="170px" aline="center"><div><br/>Clik aqui para ver informacion general',
            margins:{
                bottom:3,
                right:3
            }
        };
        var west;
        west = {
            xtype:"panel",
            region:"west",
            width:420,
            height:245,
            split:true,
            frame:true,
            collapsible:true,
            collapsed : true,
            items:[this.form],            
            title:"Presentar credenciales",
            margins:"0 0 3 3"
        };
        var main = new Ext.Panel({
            renderTo:"login",
            id:'global',
            title:'Panel de Acceso',
            bodyStyle:'padding:5px 5px 0',
            layout:"border",           
            height:255,
            width:450,
            items:[center, west]
        });

    },
    reset:function(){
        this.form.getForm().reset();
    },
    sendData: function(){
        //submit the form
        var mask = new Ext.LoadMask(Ext.get('global'), {
            msg:'Saving. Please wait...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',           
            success: function(form,action){
                mask.hide();               
                window.location = 'vistas/user/panelInicio.php';
            },             
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Ajax communication failed');
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
Ext.onReady(com.quizzpot.tutorials.index.init,com.quizzpot.tutorials.index);