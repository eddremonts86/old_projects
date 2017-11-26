 Ext.ns("com.quizzpot.tutorial");
com.quizzpot.tutorial.IntegracionTutorial = {
	init: function(){
	
	var home= new Ext.Panel({title	: "Tema Azul",html	: "<br><br><br><p><a href="+"index1.php"+"><img src="+"img/logo.jpg"+"></a>"});					
	var home1= new Ext.Panel({title	: "Tema Grey",html	: "<br><br><br><p><a href="+"index2.php"+"><img src="+"img/logo.jpg"+"></a>"});	
	this.tabs = new Ext.TabPanel({ 	
            	border	: false,
                activeTab: 0,
                frame:true,
                plain:true,
		defaults:{autoScroll: true},
                enableTabScroll	:  true,
                items: [home] 
				});
	this.tabs1 = new Ext.TabPanel({ 	
            	border	: false,
                activeTab: 0,
                frame:true,
                plain:true,
		defaults:{autoScroll: true},
                enableTabScroll	:  true,
                items: [home1] 
				});			
    var center = {	xtype	:"panel",
                    region	:"center",
                    layout	:"fit",
					width:450,
					border	:false,
                    margins:{top:3,bottom:3,left:3,right:3},
					items	:[{xtype:"panel",items:[this.tabs]}]
				};
							
	var west = {  xtype:"panel",
                      region:"west",
                      width:450,
					  layout:"fit",
					  border:false,
                       margins:{top:3,bottom:3,left:3,right:3},
                      items	:[{xtype:"panel",items:[this.tabs1]}]
					  };

	var north = {xtype:"panel",
		     region:"north",
		     height:100,
		     html:"North region",
		     margins:{top:3,bottom:3,left:3,right:3}};

    var main = new Ext.Panel({renderTo:"frame",
				  title:"Escoja Tema visual",
				  layout:"border",
				  height:478,
				  width:934,
			      items:[center,west]
				});	},
		
		
}
Ext.onReady(com.quizzpot.tutorial. IntegracionTutorial.init,com.quizzpot.tutorial. IntegracionTutorial);
