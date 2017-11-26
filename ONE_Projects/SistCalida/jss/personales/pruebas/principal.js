Ext.ns("com.quizzpot.tutorial");
var texts;
var datoss;

com.quizzpot.tutorial.Principal = {
    init: function(){
        var home= new Ext.Panel({
            title	: "Inicio",
            autoLoad: {
                url: 'welcome.html',
                //callback: this.initSearch,
                scope: this
            }
        });
        this.tabs = new Ext.TabPanel({
            border		: false,
            activeTab           : 0,
            resizeTabs          :true,
            minTabWidth         : 115,
            tabWidth            :135,
            enableTabScroll     :true,
            defaults: {
                autoScroll:true
            },
            items		:  [home]
        });
        var center = {
            xtype	:	"panel",
            region	:	"center",
            layout	:	"fit",
            frame       :       true,
            border	:	false,
            items:[this.tabs],
            margins	:	{
                bottom:3,
                right:3
            }
        };
         var tree = new Ext.tree.TreePanel({
            border: false,
            animate:true,
            enableDD:false,
            autoScroll:true,
            containerScroll: true,
            dataUrl:'../../phpclass/tree-order.php',
            dropConfig: {appendOnly:true},
            root: new Ext.tree.AsyncTreeNode({
                nodeType: 'async',
                text: 'Registros ONEI',
                draggable: false,
                id: 'src',
                iconCls:'root'
            })
        });
        tree.on('movenode',function(tree,node,oldParent,newParent,index ){});	//save the new order
          
        /*  var nodes = [];
        newParent.eachChild(function(n){nodes.push(n.attributes.id);});		//Step 1
         tree.el.mask('Saving\u2026', 'x-mask-loading');	//Step 2
        Ext.Ajax.request({
            url: '../phpclass/tree-order.php',			//Step 3
            params:{				//Step 4
                updateOrder: true,
                parent: newParent.attributes.id,
                nodes: nodes.join(',')
            },
            success: function(){
                tree.el.unmask();		//Step 5
            },
            failure: function(){
                tree.el.unmask();		//Step 6
                Ext.Msg.alert('Error','Error saving the changes');
            }
        });*/
                
        tree.on('click',function(node){this.addTab(node);},this);
         var west = {
            xtype	:	"panel",
            region	:	"west",
            width	:	250,
            height	:	880,
            frame       :       true,
            split	:	true,
            split:true,
            collapsible:true,
            collapsed : true,
            title	:"Panel de Registros",
            items	:   [tree],
            margins	:	"0 0 3 3"
        };

        this.form = new Ext.FormPanel({
            id:'forma',
            //width:400,
            // height:178,
            layout:'form',
            //renderTo:'login',
            defaults:{
                anchor:'76%',
                allowBlank:false,
                selectOnFocus:true,
                msgTarget:'side'
            },
            // border:false,
            // labelWidth:25,
            // abelAlign:'top',
            // url:'phpclass/interMac.php',
            // frame:true,
            //iconCls:'abuso',
            bbar:[
            {
                iconCls:'logo',
                scale: 'large',
                iconAlign: 'top',
                //text:'Sistema de Getion de la Calidad',
                id:'qq',
                handler:this.inicio,
                scope:this
            },

            '->',
            {
                iconCls:'informa',
                text:'Informacion general',
                id:'envio',
                handler:this.inicio,
                scope:this
            },

            {
                iconCls:'admin',
                id:'canclar',
                text:'Panel Administracion',
                handler:this.admin,
                scope:this
            }            
            ]
        });

        var north = {
            xtype	:	"panel",
            region	:	"north",
            height	:	46,
            items	:   [this.form],
            margins	:	{
                top:3,
                bottom:3,
                left:3,
                right:3
            }
        };
        var main = new Ext.Panel({
            renderTo	: "login",
            layout	: "border",            
            height	: 900,
            //items	: [north]
            items	: [center,west,north]
        });
    },
    addTab: function(node){
        var status = new Ext.Toolbar.TextItem({
            id:'status',
            text:'Listo!!'
        });
        var clock = new Ext.Toolbar.TextItem({
            id:'clock',
            text: '00:00:00 AM'
        });
        // instance var
        this.words = new Ext.Toolbar.TextItem({
            id:'words',
            text:'0 words'
        });
        var updateClock = function(){
            Ext.getCmp('clock').setText(new Date().format('g:i:s A'));
        }

        //Configuration object for the task
        var task = {
            run: updateClock, //the function to run
            interval: 1000 //every second
        }

        //creates a new manager
        var runner = new Ext.util.TaskRunner();
        runner.start(task); //start runing the task every one second
        var tab = this.tabs.findById("id-"+node.id);
        var statusbar = new Ext.Toolbar({
            items:[status,'->','-',this.words,'-',clock]
        });
        if(!tab){
            tab = new Ext.Panel({
                id: "id-"+node.attributes.id,
                name:"id-"+node.attributes.id,
                closable:true,
                frame:true,
                title:node.attributes.text,
                items: [{
                    xtype: 'htmleditor',                    
                    enableLinks : false,
                    enableFont : false,
                    enableColors : false,
                    html:node.attributes.html,
                    //html: '<iframe src="../../registroshtml/registro1.htm" style="border: medium none ; width: 100%; height: 100%;"></iframe>',
                    id: node.attributes.id+'editor',
                    name: node.attributes.id+'editor',
                    width:978,
                    height:755,
                    bodyStyle: 'background-color:#000',
                    style: 'width:100%;height:100%;border:5;',
                    enableKeyEvents: true
                }],
                //bbar: statusbar,
                bbar    : [                    
                {
                    text: 'Guardar',
                    iconCls: 'guardar',
                    handler:this.ventana,
                    scope:this
                },
                {
                    text: 'Exportar a PDF',
                    iconCls: 'exportar',
                    handler:this.ventana,
                    scope:this
                },
                {
                    text: 'Imprimir',
                    iconCls: 'imprimir',
                    handler:this.ventana,
                    scope:this
                },'->',statusbar,
                ]
            });
            this.tabs.add(tab);
            this.tabs.doLayout();

        }

        /*Ext.getCmp(node.attributes.id).on('keypress',this.countWords,this);
        Ext.getCmp(node.attributes.id).on('blur',this.countWords,this);
        Ext.getCmp(node.attributes.id).on('keypress', function(textarea){
            var text = Ext.getCmp('status');text.setText('Saving draft...');
            (function(){text.setText('Draft auto-saved at ' + new Date().format('g:i:s A'));
            }).defer(2000);},this, {buffer:3000});*/
        datoss =  Ext.getCmp(node.attributes.id+'editor').getValue();
        this.tabs.activate(tab);   
    },
    sendData: function(){      
        var mask = new Ext.LoadMask(Ext.get('formmm'), {
            msg:'Saving. Please wait...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',
            params: {extraParam: datoss,param2:datoss},
            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Bienvenido',action.result.msg);
                var redirect = 'vistas/user/panelInicio.php';
                window.location = redirect;
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
                this.form.getForm().reset();
            }
        });

    },
    ventana:function(){
      /*  var mask = new Ext.LoadMask(Ext.get(''), {
            msg:'Saving. Please wait...'
        });
        mask.show();*/ 
		var idR = new Ext.form.TextField({
				fieldLabel: 'idr',
				hidden:true,
				name: 'idr',   
				forceSelection : true,
				id : "idr",
				value : 'principal'    
			});
        this.form = new Ext.FormPanel({
            xtype	: "panel",
            layout	: "form",
            labelWidth	: 100,
            padding	: 10,
            width       :790,
			url:'../../phpclass/control.php',
            height      :616,
            id          :"formmm",            
            frame       :true,
            border	: false,
            items   : [                 
            {
                xtype:'fieldset',
                title: 'Informacion del registro',
                collapsible: true,
                autoHeight:true,
                defaults: {
                    width: 210
                },
                defaultType: 'textfield',
                items :[ {
                    xtype: 'htmleditor',
                    fieldLabel: 'Descricion',
                    name: 'Descricion',
                    id :"Descricion",                   
                    width   : 600,
                    height  : 200
                }
                ]
            },{
                xtype:'fieldset',
                title: 'Informacion del Usuario',
                collapsible: true,
                autoHeight:true,
                defaults: {
                    width: 210
                },
                defaultType: 'textfield',
                items :[{
                    fieldLabel: 'Usuario',
                    name: 'Usuario',
                    minLength:3,
                    id :"Usuario",
                    maxLength:32                           
                },
                {
                    fieldLabel: 'Password',
                    name: 'Password',
                    inputType:'password',
                    minLength:6,
                    id :"Password",
                    minLengthText:'El password debe ser de mas de 6 caracteres.',
                    maxLength:32                
                },
                {
                    xtype: 'htmleditor',
                    fieldLabel: 'Observaciones',
                    name: 'Observaciones',
                    id :"Observaciones",
                    width   : 600,
                    height  : 200,
                    value:datoss
                }

                ]
            }
            ],
            bbar:[
            new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'formmm'
                })
            }),'->',
            {
                iconCls:'guardar',
                text:'Guardar',
                id:'send',
                handler:this.sendData,
                scope:this
            },{
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                handler:this.admin,
                scope:this
            }
            ]
        });       
        var win = new Ext.Window({
            title: 'Guardar datos del registro',
            width: 800,
            height:650,
            minimizable: true,
            maximizable: true,
            items:this.form

        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse(); 
        });

    },
    inicio: function(){
        var redirect = '../../sist-documental/index.php';
        window.location = redirect;
    },
    admin: function(){
        var redirect = '../admin/adminPanel.php';
        window.location = redirect;
    },
    countWords: function(textarea){
        var value = textarea.getValue(); 
        var wc = 0; 

        if(!Ext.isEmpty(value)){ 
            wc = value.match(/\b/g); 
            wc = wc ? wc.length / 2 : 0; 
        }

        this.words.setText(wc + ' words'); 
    }
	
}
Ext.onReady(com.quizzpot.tutorial. Principal.init,com.quizzpot.tutorial. Principal);