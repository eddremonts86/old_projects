//el panel principal que contendr� otros paneles dentro de si  
Ext.ns('com.quizzpot.tutorial');  
//Ext.BLANK_IMAGE_URL = '../../../Jss/extjs/resources/images/default/s.gif';  
var name = new Ext.form.TextField({  
    fieldLabel: 'Su Nombre',
    name: 'Nombre',
    anchor:'65%',
    id : "nombre",
    allowblank:false
    ,
    minLength:3,
    maxLength:32,
    msgTraget:'side',
    validationEvent:false
});
var email = new Ext.form.TextField({  
    fieldLabel: 'Su Email',
    name: 'Email',
    vtype:'email',
    id : "Email",
    anchor:'65%'
    ,
    allowblank:false,
    validationEvent:false
});
var pass = new Ext.form.TextField({  
    fieldLabel: 'Su Password',
    name: 'passw',
    inputType:'password',
    allowblank:false,
    id : "passw",
    anchor:'65%'
    ,
    minLength:3,
    minLengthText:'El password debe ser de mas de 6 caracteres.',
    maxLength:32,
    msgTraget:'side',
    validationEvent:false
});
com.quizzpot.tutorial.FormTutorial = {  
    init: function(){
        this.form = new Ext.FormPanel({
            id:'forma',
            title: 'Reportar Abuso',
            bodyStyle:'padding:5px 5px 0',
            width:600,
            layout:'form',
            renderTo: 'centro',
            height:330,
            border: false,
            collapsible: true,
            titleCollapse: true,
            labelWidth: 80,
            abelAlign: 'top',           
            url: '../../../clases/seguridad.php?termino=login',
            frame:true,
            iconCls: 'abuso',
            html:'<br/><div><img src="../../../img/logo.jpg" width="440px" height="170px" aline="center"><div><br/>',
            items:[name,email,pass],
            fbar: [{
                iconCls:'vote-icon',
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
            } ]
        });
    },
    reset:function(){
        this.form.getForm().reset();
    },
    sendData: function(){
        var mask = new Ext.LoadMask(Ext.get('forma'), {
            msg:'Comprobando los datos. Por Favor espere...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',
            success: function(form,action){
                mask.hide();
                window.location = '../../../index3.php?.SID';
            //Ext.Msg.alert('Mensaje de Bienvenida',action.result.msg);	
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Fallo en la operacion', 'El formulario presenta datos incorrectos');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Fallo en la operacion', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Fallo en la operacion', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Fallo en la operacion',action.result.msg);
                }
            }
        });
    }

}   
Ext.onReady(com.quizzpot.tutorial.FormTutorial.init,com.quizzpot.tutorial.FormTutorial);  
