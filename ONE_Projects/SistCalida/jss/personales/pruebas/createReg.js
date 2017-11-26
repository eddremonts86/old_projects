Ext.ns("com.quizzpot.tutorial");
com.quizzpot.tutorial.Wizard = {
    index   : 0,
    init : function(){
        this.form = new Ext.FormPanel({	 
            layout	: "card",           
            border	: false,
            id          : "form",
            activeItem	: this.index, 	
            items	: [this.precentacion(),this.createAllias(), this.createDriver(), this.createCredentials(),this.finalizar()]
        });        
        this.backBtn = new Ext.Button({
            text : "Atras",
            handler : this.back,
            scope : this,
            iconCls:'atras',
            hidden:true
        });
        this.nextBtn = new Ext.Button({
            text : "Siguiente",
            iconCls:'siguiente',
            handler : this.next,
            scope : this
        });
        this.Regresar = new Ext.Button({
            text : "Regresar",
            iconCls:'regresar',
            handler : this.inicio,
            scope : this
        });
        this.finishBtn = new Ext.Button({
            text : "Finalizar",
            iconCls:'finalzar',
            hidden : true,
            handler:this.finish,
            scope:this
        }); 
        this.win = new Ext.Window({
            title		: "Asistente de Nuevos Registros ",
            layout		: "fit",
            id                  : "ventana",
            width		: 850,            
            height		: 800,
            resizable	        : false, 
            bodyCssClass	: "wizard-image", 
            bbar                : [this.Regresar,'->',this.backBtn,this.nextBtn,this.finishBtn],
            items		: [this.form] 
        });
        this.win.show();
    },

    precentacion:function(){
        return {
            labelWidth: 75, // label settings here cascade unless overridden
            frame:true,
            bodyStyle:'padding:5px 5px 0',
            width: 200,
            items: [
            {
                html : "<h1>Introduccion</h1><br><br>",
                border : false
            },
            ]
        };
    },
    finalizar:function(){
        return {
            labelWidth: 75, // label settings here cascade unless overridden
            frame:true,
            bodyStyle:'padding:5px 5px 0',
            width: 200,
            items: [
            {
                html : "<h1>Finalizar</h1><br><br>",
                border : false
            },
            ]
        };
    },
    createAllias : function(){
        //**********  PROXY COMBOBOX  Usuarios*******************************************
        var  proxycomboboxUsuarios = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=usuarios',
            method:'POST'
        });
        var  readercomboboxUsuarios = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{name: 'id',mapping:'id'},
                     {name: 'nombre',mapping:'nombre'}]
        });
        var  equipos = new Ext.data.Store({
            proxy: proxycomboboxUsuarios,
            totalProperty: 'total',
            reader: readercomboboxUsuarios
        });
        this.user = new Ext.form.ComboBox({
            //blankText: 'Inserte Usuario',
            width: 210,
            name : "useuarioExistente",
            hiddenName : "useuarioExistente",
            id : "useuarioExistente",
           // emptyText:'Seleccione Usuario...',
            fieldLabel : "Usuario",
            bodyStyle:'padding:5px 5px 0',
            forceSelection : true,
            displayField : 'nombre',
            valueField : 'nombre',
            loadingText : 'Buscando....',
            minChars : 1,
            triggerAction : 'all',
            store: equipos
        });
        /*==========Fin============*/
         //**********  PROXY COMBOBOX  Categorias*******************************************
        var  proxycomboboxCategorias = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=categorias',
            method:'POST'
        });
        var  readercomboboxCategorias = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{name: 'id',mapping:'id'},
                     {name: 'id_parent',mapping:'id_parent'},
                     {name: 'category',mapping:'category'},
                     {name: 'description',mapping:'description'}]
                 });
        var catgallstote = new Ext.data.Store({
            proxy: proxycomboboxCategorias,
            totalProperty: 'total',
            reader: readercomboboxCategorias
        });
        this.catgall = new Ext.form.ComboBox({
            //blankText: 'Seleccione categoria madre',
            width: 210,
            name : "catgall",
            hiddenName : "catgall",
            id : "catgall",
          //  emptyText:'Seleccione categoria madre...',
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
        /*==========Fin============*/
        return {
            labelWidth: 75, // label settings here cascade unless overridden
            frame:true,
            bodyStyle:'padding:5px 5px 0',
            width: 600,
            items: [
            {
                html : "<h1>Primer Paso :</h1><br><br>",
                border : false
            },

            {
                xtype:'fieldset',
                title: 'Informacion del registro',
                collapsible: true,
                html : '<h3><img src="../../img/icons/16x16/apps/info.png" width="16px" height="16px" aline="center"> Nota:</h3>Puede crear usuario expecifico para este registro de no existir',
                autoHeight:true,
                defaults: {width: 250},
                defaultType: 'textfield',
                items :[{
                    fieldLabel: 'Nombrer',
                    name: 'NombreRegistro',
                    id : "NombreRegistro"
                   // blankText: 'Nombre del registro...',
                   // emptyText:'Nombre del registro...'
                },
                this.user,this.catgall,
                {
                    xtype: 'htmleditor',
                    fieldLabel: 'Descricion',
                   // blankText: 'Nombre del registro...',
                   // emptyText:'Nombre del registro...',
                    id : "Descricion",
                    name: 'Descricion',
                    width   : 620,
                    height  : 200
                }
                ]
            },
            {
                xtype:'fieldset',
                checkboxToggle:true,
                name: 'BloqueNR',
                id : "BloqueNR",
                title: 'Informacion del usuario nuevo ',
                autoHeight:true,
                defaults: {
                    width: 250
                },
                defaultType: 'textfield',
                collapsed: true,               
                items :[
                {
                    fieldLabel: 'Nombre',
                    name: 'NombreNR',
                    id : "NombreNR"
                 //   emptyText:'Eduardo Valdes Inerarte'
                },{
                    fieldLabel: 'usuario',
                   // emptyText:'edd',
                    id : "usuarioNR",
                    name: 'usuarioNR'
                },{
                    fieldLabel: 'Email',
                   // emptyText:'edd@otepr.co.cu',
                    name: 'emailNR',
                    id : "emailNR",
                    vtype:'email'
                },{
                    fieldLabel: 'Contrasena',
                   // emptyText:'Seleccione Usuario...',
                    name: 'passwNR',
                    id : "passwNR",
                    inputType:'password'
                }
                ]
            },
            ]
        };
    },    
    createDriver : function(){      
        this.tree = new Ext.tree.TreePanel({
            //title: 'Registros ONEI',
            height: 300,
            width: 400,
            useArrows:true,
            autoScroll:true,
            animate:true,
            enableDD:true,
            containerScroll: true,
            rootVisible: true,
            frame: true,
            root: {
                nodeType: 'async',
                text: 'Registros ONEI'
            },
            dataUrl: '../../phpclass/tree-order.php',
            listeners: {
                'checkchange': function(node, checked){
                    if(checked){
                        node.getUI().addClass('complete');
                    }else{
                        node.getUI().removeClass('complete');
                    }
                }
            },
            buttons: [{
                text: 'Get Completed Tasks',
                handler: function(){
                    var msg = '', selNodes = tree.getChecked();
                    Ext.each(selNodes, function(node){
                        if(msg.length > 0){
                            msg += ', ';
                        }
                        msg += node.text;
                    });
                    Ext.Msg.show({
                        title: 'Completed Tasks',
                        msg: msg.length > 0 ? msg : 'None',
                        icon: Ext.Msg.INFO,
                        minWidth: 200,
                        buttons: Ext.Msg.OK
                    });
                }
            }]
        });
        this.tree.getRootNode().expand(true);
        //**********  PROXY COMBOBOX  Equipos*******************************************
        var  proxycombobox1 = new Ext.data.HttpProxy({
            url: 'http://localhost/SistCalida/phpclass/ClassFull.php?termino=usuarios',
            method:'POST'
        });
        var  readercombobox1 = new Ext.data.JsonReader({
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
        var equipos1 = new Ext.data.Store({
            proxy: proxycombobox1,
            totalProperty: 'total',
            reader: readercombobox1
        });
        this.user1 = new Ext.form.ComboBox({
           // blankText: 'Inserte Usuario',
            width: 210,
            name : "usuarioresponsable",
            hiddenName : "usuarioresponsable",
            id : "usuarioresponsable",
           // emptyText:'Seleccione Usuario...',
            fieldLabel : "Usuario",
            bodyStyle:'padding:5px 5px 0',
            forceSelection : true,
            displayField : 'nombre',
            valueField : 'nombre',
            loadingText : 'Buscando....',
            minChars : 1,
            triggerAction : 'all',
            store: equipos1
        });
        var idR = new Ext.form.TextField({
                fieldLabel: 'idr',
                //hidden:true,
                name: 'idr',
                forceSelection : true,
                id : "idr",
                value : 'node'
            });
        /*==========Fin============*/
        return {

            labelWidth: 75, // label settings here cascade unless overridden
            frame:true,
            bodyStyle:'padding:5px 5px 0',
            width: 200,
            items: [{
                html : "<h1>Segundo Paso</h1><br><br>",
                border : false
            },{
                xtype:'fieldset',
                collapsible: true,
                title: 'Informacion del usuario que autoriza ',
                autoHeight:true,
                defaults: {width: 250},
                html : '<h3><img src="../../img/icons/16x16/apps/info.png" width="16px" height="16px" aline="center"> Nota:</h3>Puede crear usuario expecifico para este registro de no existir',
                items :[
                {html : "<h3>Usar usuario existente</h3><br/>"},
                this.user1,idR,
                ]
            },{
                xtype:'fieldset',
                checkboxToggle:true,
                name: 'BloqueNA',
                id : "BloqueNA",
                title: 'Informacion del usuario nuevo ',
                autoHeight:true,
                defaults: {width: 250},
                defaultType: 'textfield',
                collapsed: true,
                html : "<br/><h3>Crear usuario expesifico para este registro</h3><br/>",
                items :[
                {
                    fieldLabel: 'Nombre',
                    name: 'NombreNA',
                    id : "NombreNA",
                    xtype: 'textfield'
                  //  emptyText:'Eduardo Valdes Inerarte'
                },{
                    fieldLabel: 'usuario',
                   // emptyText:'edd',
                    id : "usuarioNA",
                    xtype: 'textfield',
                    name: 'usuarioNA'
                },{
                    fieldLabel: 'Email',
                  //  emptyText:'edd@otepr.co.cu',
                    xtype: 'textfield',
                    id : "emailNA",
                    name: 'emailNA',
                    vtype:'email'
                },{
                    fieldLabel: 'Contrasena',
                  //  emptyText:'Seleccione Usuario...',
                    xtype: 'textfield',
                    id : "passwNA",
                    name: 'passwNA',
                    inputType:'password'
                }
            ]
            },
            ]
        }
    },
    createCredentials : function(){
        return{
            xtype	: "panel",
            layout	: "form",
            labelWidth	: 100,
            padding	: 10,
            frame       :true,
            border	: false,
            items	: [
                {html : "<h1>Tercer paso</h1>",border : false},
                {
                xtype: 'htmleditor',
                //html: '<iframe src="../../registroshtml/registro1.htm" style="border: medium none ; width: 100%; height: 100%;"></iframe>',
                id: 'datos',
                name: 'datos',
                width:730,
                hideLabel : true,
                height:640,
                bodyStyle: 'background-color:#000',
                style: 'width:100%;height:100%;border:5;',
                enableKeyEvents: true
                }
            ]
        }
    },

    next: function(){
        this.backBtn.show();
        if(this.index < this.form.items.length-1){
            this.index++;
            var cardlayout = this.form.getLayout();
            cardlayout.setActiveItem(this.index);

            if(this.index == this.form.items.length-1){	//si esta en el ultima carta
                this.nextBtn.hide();
                this.finishBtn.show();
            }
        }
    },
    back : function(){
        if(this.index>0){	
            this.index--;
            var cardlayout = this.form.getLayout();
            cardlayout.setActiveItem(this.index);
        }
        if(this.index == 0){	
            this.backBtn.hide();
        }else{	
            this.finishBtn.hide();
            this.nextBtn.show();
        }
    },
    inicio: function(){
        this.backBtn.show();
        if(this.index < this.form.items.length-1){
            this.index++;
            var cardlayout = this.form.getLayout();
            cardlayout.setActiveItem(this.index);

            if(this.index == this.form.items.length-1){	//si esta en el ultima carta
                //this.nextBtn.hide();
                //this.finishBtn.show();
            }
        }
        var redirect = '../../vistas/admin/adminPanel.php';
        window.location = redirect;
    },
    finish: function(){
        var mask = new Ext.LoadMask(Ext.get('ventana'),{msg:'Saving. Please wait...'});
        mask.show();
        this.form.getForm().submit({
            method  : 'put',
            url     : "../../phpclass/control.php",
            scope	: this,
             success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Bienvenido',action.result.msg);
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
                }this.form.getForm().reset();
            }
        });
    }
  
}
Ext.onReady(com.quizzpot.tutorial.Wizard.init,com.quizzpot.tutorial.Wizard);