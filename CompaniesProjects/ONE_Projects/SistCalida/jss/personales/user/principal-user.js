Ext.ns("com.quizzpot.tutorial");
var texts;
var datos,datos1;
var idreg,tabid,introduccion,editor,descricion,validacion,usuario,idr,password,observaciones,pdf,proceso,textname;

com.quizzpot.tutorial.Principal = {
    init: function(){
        this.form = new Ext.FormPanel({
            id:'forma',
            layout:'form',
            defaults:{
                anchor:'76%',
                allowBlank:false,
                selectOnFocus:true,
                msgTarget:'side'
            },
            bbar:[
            {
                iconCls:'informa',
                text:'Informacion general',
                id:'envio',
                handler:this.inicio,
                scope:this
            }
           ,'->',
			{
                iconCls:'informa',
                id:'auyuda',
                text:'Ayuda',
                handler:this.ayuda,
                scope:this
            },
            {
                iconCls:'cancel',
                id:'salir',
                text:'Slair',
                handler:this.salir,
                scope:this
            }
            ]
        });
        var home= new Ext.Panel({
            title: "Inicio",
            tbar: [this.form],
            autoLoad: {
                url: 'welcome.html',               
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
            defaults:{autoScroll:true},
            items	:  [home]
        });
        var center = {
            xtype	:	"panel",
            region	:	"center",
            layout	:	"fit",
            frame       :       true,
            border	:	false,
            items       :[this.tabs],
            margins	:{
                bottom:3,
                right:3
            }
        };
        var tree = new Ext.tree.TreePanel({
            border: false,
            animate:true,
            enableDD:false,
            //autoScroll:true,
            containerScroll: true,
            dataUrl:'../../phpclass/tree-order.php',
            dropConfig: {
                appendOnly:true
            },
            root: new Ext.tree.AsyncTreeNode({
                nodeType: 'async',
                text: 'Registros ONEI',
                draggable: false,
                id: 'src',
                iconCls:'root'
            })
        });
        tree.on('movenode',function(tree,node,oldParent,newParent,index ){});                
        tree.on('click',function(node){
            this.addTab(node);
        },this);
        var west = {
            xtype	:	"panel",
            region	:	"west",
            width	:	300,
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
        var main = new Ext.Panel({
            renderTo	: "principal",
            layout	: "border",            
            height	: 745,
            items	: [center,west]
        });
    },
    addTab: function(node){
        var status = new Ext.Toolbar.TextItem({id:'status',text:'Listo!!'});
        var clock = new Ext.Toolbar.TextItem({id:'clock',text: '00:00:00 AM'});
        this.words = new Ext.Toolbar.TextItem({id:'words',text:'0 words'});
        var updateClock = function(){Ext.getCmp('clock').setText(new Date().format('g:i:s A'));}      
        var task = {run: updateClock,interval: 1000}  
        var runner = new Ext.util.TaskRunner();
        runner.start(task); 
        var tab = this.tabs.findById("id-"+node.id);
        var statusbar = new Ext.Toolbar({items:[status,'->','-',clock]});
        if(!tab){
            tab = this.form = new Ext.FormPanel({
                id: "tabid-"+node.attributes.id,
                name:"tabid-"+node.attributes.id,
                closable:true,
                xtype	: "panel",
                layout	: "form",                
                frame:true,
                title:node.attributes.text,
                items: [
                new Ext.TabPanel({
                    width:'76%',
                    height:'76%',
                    border: false, 
                    activeTab: 1, 
                    tabPosition: 'bottom',
                    items: [                   
                                       
                    {
                        title: 'Introduccion',
                        autoScroll: true,
                        width:978,
                        height:623,
                        id: node.attributes.id+'Introduccion',
                        name: node.attributes.id+'Introduccion',
                        html:node.attributes.description
                    },
                    {
                        title: 'Registro',
                        autoScroll: true,
                        xtype: 'htmleditor',
                        enableLinks : false,
                        enableFont : false,
                        enableColors : false,
                        html:node.attributes.html,
                        id: node.attributes.id+'editor',
                        name: node.attributes.id+'editor',
                        width:978,
                        height:623,
                        bodyStyle: 'background-color:#000',
                        style: 'width:100%;height:100%;border:5;',
                        enableKeyEvents: true
                    },
                    new Ext.Panel({
                        title: 'Validacion',
                        autoScroll: true,
                        xtype	: "panel",
                        layout	: "form",
                        labelWidth: 100,
                        padding	: 10,
                        width:978,
                        height:623,
                        id: "Validacion-"+node.attributes.id,
                        name:"Validacion-"+node.attributes.id,
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
                                name: "id-"+node.attributes.id+'Descricion',
                                id :"id-"+node.attributes.id+"Descricion",
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
                                name:"id-"+node.attributes.id+'Usuario',
                                minLength:3,
                                id :"id-"+node.attributes.id+"Usuario",
                                maxLength:32
                            },
                            {
                                fieldLabel: 'idr',
                                hidden:true,
                                name:"id-"+node.attributes.id+'idr',
                                forceSelection : true,
                                id :"id-"+node.attributes.id+"idr",
                                value : 'principal'

                            },
                            {
                                fieldLabel: 'Password',
                                name:"id-"+node.attributes.id+'Password',
                                inputType:'password',
                                minLength:6,
                                id :"id-"+node.attributes.id+"Password",
                                minLengthText:'El password debe ser de mas de 6 caracteres.',
                                maxLength:32
                            },
                            {
                                xtype: 'htmleditor',
                                fieldLabel: 'Observaciones',
                                name:"id-"+node.attributes.id+'Observaciones',
                                id :"id-"+node.attributes.id+"Observaciones",
                                width   : 600,
                                height  : 200                           
                            }

                            ]
                        }
                        ]
                    })
                    ]
                })
                ],
                bbar    : [
                {
                    text: 'Guardar',
                    iconCls: 'guardar',
                    handler:this.sendDatatabid,
                    scope:this
                },
                {
                    text: 'Exportar a PDF',
                    iconCls: 'exportar',
                    handler:this.ventana,
                    scope:this
                },'->',statusbar,
                ]
            });
            this.tabs.add(tab);
            this.tabs.doLayout();
            idreg = node.attributes.id;
            proceso=node.attributes.idParent;
            tabid="tabid-"+node.attributes.id;
            introduccion=node.attributes.id+'Introduccion';
            editor = node.attributes.id+'editor';
            descricion="id-"+node.attributes.id+"Descricion";
            validacion="Validacion-"+node.attributes.id;
            usuario="id-"+node.attributes.id+"Usuario";
            idr="id-"+node.attributes.id+"idr";
            password="id-"+node.attributes.id+'Password';
            observaciones="id-"+node.attributes.id+"Observaciones";
            textname=node.attributes.text;
            
        }
        this.tabs.activate(tab);
    },
    sendDatatabid: function(){
          var mask = new Ext.LoadMask(Ext.get(tabid), {msg:'Saving. Please wait...'});
        mask.show();		
	Ext.Ajax.request({
	url:'../../phpclass/control.php?termino=registro',
        method:'POST',
        params: {
            editor: Ext.getCmp( editor ).getValue(),
            descricion: Ext.getCmp( descricion ).getValue(),
            usuario: Ext.getCmp( usuario ).getValue(),
            password: Ext.getCmp( password ).getValue(),
            observaciones: Ext.getCmp( observaciones ).getValue(),
            proceso:proceso,
            textname:textname,
            idreg:idreg
        } 		
		});		 
		mask.hide();
	},

	ayuda: function(){        
      var tabAyuda = new Ext.TabPanel({        
		width:'99%',		 
        activeTab: 0,
		height:700,
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
			}           
        ]
    });  
		var win = new Ext.Window({
            title: 'Ayuda',
            width: 950,
            height:710,
            minimizable: true,
            maximizable: true,
            items:tabAyuda
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
        });		
    },
    ventana:function(){
        this.form = new Ext.FormPanel({
            xtype	: "panel",
            layout	: "form",
            url:'../../phpclass/control.php?termino=pdf',
            labelWidth	: 100,
            padding	: 10,
            width       :485,
            height      :270,
            id          :"pdf-"+idreg,
            frame       :true,
            border	: false,
            items   : [
             {
                xtype:'fieldset',
                title: 'Informacion del Usuario',
                collapsible: true,
                autoHeight:true,
                defaults: {
                    width: 210
                },
                defaultType: 'textfield',
                items :[{
                    fieldLabel: 'Nombre',
                    name: 'Nombre',
                    minLength:3,
                    id :"Nombre",
                    maxLength:32
                },{
                    fieldLabel: 'Usuario',
                    name: 'Usuario',
                    minLength:3,
                    id :"Usuario",
                    maxLength:32
                },
                {
                    fieldLabel: 'idr',
                    hidden:true,
                    name: 'idr',
                    forceSelection : true,
                    id : "idr",
                    value : usuario

                }
                ]
            }
            ],
            bbar:[
           new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:"pdf-"+idreg
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
                handler:this.resetpdf,
                scope:this
            }
            ]
        });
        pdf="pdf-"+idreg;
        var win = new Ext.Window({
            title: 'Guardar datos como PDF',
            width: 500,
            height:300,
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
    sendData: function(){
          var mask = new Ext.LoadMask(Ext.get(pdf), {
            msg:'Saving. Please wait...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',
            params: {extraParam: datoss,param2:datoss},
            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Bienvenido',action.result.msg);
                //var redirect = 'vistas/user/panelInicio.php';
                //window.location = redirect;
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
    resetpdf:function(){
        this.pdf.getForm().reset();/*window.location = 'tecnico.php?termino=Reportes';*/
    },
    inicio: function(){
        var redirect = '../../sist-documental/index.php';
        window.location = redirect;
    },
    admin: function(){
        var redirect = '../admin/adminPanel.php';
        window.location = redirect;
    },
    salir: function(){
        var redirect = '../../index.php';
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
},
function success(){Ext.Msg.alert('Se inserto correctamente');}
Ext.onReady(com.quizzpot.tutorial. Principal.init,com.quizzpot.tutorial. Principal);