 Ext.ns("com.quizzpot.tutorial");
var idreg,texts,datoss,tabid,introduccion,editor,descricion,validacion,usuario,idr,password,observaciones;
com.quizzpot.tutorial.Principal = {
    init: function(){       
        this.tabs = new Ext.TabPanel({
            border		: false,
            activeTab	: 0,
            enableTabScroll	:  true             
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
            //autoScroll:true,
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
        tree.on('click',function(node){this.addTab(node);},this);
        var west = {
            xtype	:	"panel",
            region	:	"west",
            width	:	300,
            height	:	580,
            frame   :       true,
            split	:	true,
            split:true,
            collapsible:true,
            collapsed : true,
            title	:"Panel de Registros",
            items	:   [tree],
            margins	:	"0 0 3 3"
        };      
        var main = new Ext.Panel({
            renderTo	: 	"login",
            layout		:	"border",
            id			:"global",
            height		:	580,			 	
            items		:	[center,west]
        });
		var win = new Ext.Window({
            title: 'Modificar Registro',
            width: 850,
            height:610,
            minimizable: true,
            maximizable: true,
            items:main
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
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
        var  proxycomboboxUsuarios = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=usuarios',
            method:'POST'
        });
        var  readercomboboxUsuarios = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{
                name: 'id',
                mapping:'id'
            },{
                name: 'nombre',
                mapping:'nombre'
            }]
        });
        var  usuarios = new Ext.data.Store({
            proxy: proxycomboboxUsuarios,
            totalProperty: 'total',
            reader: readercomboboxUsuarios
        });
        this.user = new Ext.form.ComboBox({
            //blankText: 'Inserte Usuario',
            width: 210,
            name : "id-"+node.attributes.id+"Usuario",
            hiddenName : "useuarioExistente",
            id : "id-"+node.attributes.id+"Usuario",
            // emptyText:'Seleccione Usuario...',
            fieldLabel : "Usuario",
            bodyStyle:'padding:5px 5px 0',
            forceSelection : true,
            displayField : 'nombre',
            valueField : 'nombre',
            loadingText : 'Buscando....',
            minChars : 1,
            triggerAction : 'all',
            store: usuarios
        });

		var  proxycomboboxusuarios1 = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=usuarios',
            method:'POST'
        });
        var  readercomboboxusuarios1 = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{
                name: 'id',
                mapping:'id'
            },{
                name: 'nombre',
                mapping:'nombre'
            }]
        });
        var usuarios1 = new Ext.data.Store({
            proxy: proxycomboboxusuarios1,
            totalProperty: 'total',
            reader: readercomboboxusuarios1
        });
        this.user1 = new Ext.form.ComboBox({
            width: 210,
            name : "id-"+node.attributes.id+"UsuarioA",
            hiddenName :"id-"+node.attributes.id+"UsuarioA",
            id : "id-"+node.attributes.id+"UsuarioA",
            fieldLabel : "Usuario",
            bodyStyle:'padding:5px 5px 0',
            forceSelection : true,
            displayField : 'nombre',
            valueField : 'nombre',
            loadingText : 'Buscando....',
            minChars : 1,
            triggerAction : 'all',
            store: usuarios1
        });
         var  proxycomboboxCategorias = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=categorias',
            method:'POST'
        });
        var  readercomboboxCategorias = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{
                name: 'id',
                mapping:'id'
            },{
                name: 'id_parent',
                mapping:'id_parent'
            },{
                name: 'category',
                mapping:'category'
            },{
                name: 'description',
                mapping:'description'
            }]
        });
        var catgallstote = new Ext.data.Store({
            proxy: proxycomboboxCategorias,
            totalProperty: 'total',
            reader: readercomboboxCategorias
        });
        this.catgall = new Ext.form.ComboBox({

            width: 210,
            name : "id-"+node.attributes.id+"proceso",
            hiddenName : "catgall",
            id : "id-"+node.attributes.id+"proceso",
            fieldLabel : "Proceso",
            bodyStyle:'padding:5px 5px 0',
            forceSelection : true,
            displayField : 'category',
            valueField : 'id',
            loadingText : 'Buscando....',
            minChars : 1,
            triggerAction : 'all',
            store: catgallstote
        });


        
        if(!tab){
            tab = this.form = new Ext.FormPanel({
                id: "tabid-"+node.attributes.id,
                name:"tabid-"+node.attributes.id,
                closable:true,
                xtype	: "panel",
                layout	: "form",
                url:'../../phpclass/registro.php',
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
                        xtype: 'htmleditor',                        
                        html:node.attributes.description,
                        id: node.attributes.id+'Introduccion',
                        name: node.attributes.id+'Introduccion',
                        width:978,
                        height:450,
                        bodyStyle: 'background-color:#000',
                        style: 'width:100%;height:100%;border:5;',
                        enableKeyEvents: true 
                        
                        
                    },
                    {
                        title: 'Registro',
                        autoScroll: true,
                        xtype: 'htmleditor',                        
                        html:node.attributes.html,
                        id: node.attributes.id+'editor',
                        name: node.attributes.id+'editor',
                        width:978,
                        height:450,
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
                        height:450,
                        id: "Validacion-"+node.attributes.id,
                        name:"Validacion-"+node.attributes.id,
                        frame       :true,
                        border	: false,
                        items   : [
                         {
                            xtype:'fieldset',
                            title: 'Informacion del Registro',
                            collapsible: true,
                            autoHeight:true,
                            defaults: {
                                width: 210
                            },
                            defaultType: 'textfield',
                            items :[
                                    this.user,
                                    this.user1,                                    
                                    this.catgall
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
                }
                ,'->',statusbar,
                ]
            });
            this.tabs.add(tab);
            this.tabs.doLayout();

            tabid="tabid-"+node.attributes.id;
            intro=node.attributes.id+'Introduccion';
            editor= node.attributes.id+'editor';

            usuario="id-"+node.attributes.id+"Usuario";           
            usuarioA="id-"+node.attributes.id+"UsuarioA";
            proceso="id-"+node.attributes.id+"proceso";
            idreg=node.attributes.id;


        }
        this.tabs.activate(tab);
    },   
    sendDatatabid: function(){
          var mask = new Ext.LoadMask(Ext.get(tabid), {msg:'Saving. Please wait...'});
        mask.show();
        Ext.Ajax.request({
		url:'../../phpclass/control.php?termino=modregistro',
        method:'POST',
        params: {
            editor: Ext.getCmp( editor ).getValue(),
            idreg:idreg,
            intro: Ext.getCmp( intro ).getValue(),
            usuario: Ext.getCmp( usuario ).getValue(),
            usuarioA: Ext.getCmp( usuarioA ).getValue(),
            proceso: Ext.getCmp( proceso ).getValue()
        }
		});
		mask.hide();


    }
	

}
Ext.onReady(com.quizzpot.tutorial.Principal.init,com.quizzpot.tutorial.Principal);