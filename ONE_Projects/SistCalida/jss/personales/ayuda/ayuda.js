 Ext.ns("com.quizzpot.tutorial");
var idreg,texts,datoss,tabid,introduccion,editor,descricion,validacion,usuario,idr,password,observaciones;
com.quizzpot.tutorial.Principal = {
    init: function(){        
      var tabAyuda = new Ext.TabPanel({        
       // width:890,
		width:'99%',		 
        activeTab: 0,
		height:400,
        frame:true,
        defaults:{autoHeight: true},
		enableTabScroll	:  true, 
		autoScroll:true,	
        items:[
            {title: 'inicio',
			html:" <h2>Panel de Acceso</<h2><p> <img src='../../img/ayuda/Panel de acceso/1.0.Panel Inicio.png'><p> <img src='../../img/ayuda/Panel de acceso/1.1.Panel Inicio.png'>  <img src='../../img/ayuda/Panel de acceso/2.0-inicio de la informacion.png'>      ",
			},
            {title: 'Panel de informacion',
			html:"<img src='../../img/ayuda/aplicacion/Parte informativa/2.0-inicio de la informacion.png'><p><img src='../../img/ayuda/aplicacion/Parte informativa/2.0-Documentos rectores.png'>"		
			},
			{title: 'Panel de Usuario',
			html:"<img src='../../img/ayuda/aplicacion/Gestion/user/3.0-inicioUser.png'><p><img src='../../img/ayuda/aplicacion/Gestion/user/3.1.0registro.png'><p><img src='../../img/ayuda/aplicacion/Gestion/user/3.1.1-registro-Informacion.png'><p><img src='../../img/ayuda/aplicacion/Gestion/user/3.1.2-registro-validacion.png'>"	
			},
            {title: 'Panel de Administrador', 
			html:"<iframe src='admin.html' width='900px' height='690px' aline='center' ></iframe>"
			}
        ]
    });  
		var win = new Ext.Window({
            title: 'Ayuda',
            width: 550,
            height:400,
            minimizable: true,
            maximizable: true,
            items:tabAyuda
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
        });		
    }
    

}
Ext.onReady(com.quizzpot.tutorial.Principal.init,com.quizzpot.tutorial.Principal);