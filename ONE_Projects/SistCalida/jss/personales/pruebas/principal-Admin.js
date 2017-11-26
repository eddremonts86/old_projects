Ext.ns("com.quizzpot.tutorial"); 
var text,listado, filaseleccionada, panelderechoizquierdo,panel,formulario,Nombre,idrole,listadouser,listadoproces,filaseleccionadaproces;
var filaseleccionadauser, panelusuario,formulario,NombreUsuario,idroleUsuario, CorreoUsuario,UsuarioUsuario,PasswordUsuario,listadonode,filaseleccionadanode;
var listadoproceso,filaseleccionadaproceso,nombreprocso,idroleUsuario, descrpProceso;
var listadonodemod,filaseleccionadanodemod,category,description,node_html,idnode;
com.quizzpot.tutorial.Principal = {
    init: function(){
        var home= new Ext.Panel({
            title	: "Inicio - Administracion",
            autoLoad: {url: 'welcome.html',scope: this},
            tbar: [{
                xtype: 'buttongroup',
                title: 'Inicio',
                columns: 1,
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype:'splitbutton',
                    text: 'Documentacion de Procesos',
                    iconCls: 'info',
                    menu: [
                    {
                        text: 'Pagina Principal de Usuario',
                        iconCls: 'PPU',
                        handler:this.inicio,
                        scope:this
                    },
                    {
                        text: 'Pagina Principal de Administrador',
                        iconCls: 'PPA',
                        handler:this.admin,
                        scope:this
                    }
                    ]
                },{                    
                    text: 'Panel de Usuario',
                    iconCls: 'user',
                    handler:this.user,
                    scope:this
                },{
                    text: 'Cerrar Seccion',
                    iconCls: 'cerrar',
                    handler:this.user,
                    scope:this
                }]
            },

            {
                xtype: 'buttongroup',
                title: 'Gestion de Usuarios',
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype:'splitbutton',
                    text: 'Gestionar roles',
                    scale: 'large',
                    rowspan: 3,
                    arrowAlign:'bottom',
                    iconCls: 'gestrole',
                    menu: [{
                        text: 'Adicionar Role',
                        iconCls: 'addrole',
                        handler:this.addrole,
                        scope:this
                    },

                    {
                        text: 'Modificar o Eliminar Role',
                        iconCls: 'modrole',
                        handler:this.modificarrole,
                        scope:this
                    }]
                },
                {
                    text: 'Agregar Usuarios',
                    iconCls: 'adduser',
                    handler:this.adduser,
                    scope:this

                },{
                    text: 'Modificar Usuarios',
                    iconCls: 'moduser',
                    handler:this.moduser,
                    scope:this
                },{
                    text: 'Eliminar Usuarios',
                    iconCls: 'deluser',
                    handler:this.moduser,
                    scope:this

                }]
            },
            {
                xtype: 'buttongroup',
                title: 'Gestion de Procesos',
                columns: 2,
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype:'splitbutton',
                    text: 'Gestionar Procesos',
                    scale: 'large',
                    rowspan: 3,
                    arrowAlign:'bottom',
                    iconCls: 'gestpro',
                    menu: [{
                        text: 'Adicionar Procesos',
                        iconCls: 'addpro',
                        handler:this.adducat,
                        scope:this
                    },

                    {
                        text: 'Modificar Procesos',
                        iconCls: 'modpro',
                        handler:this.modcat,
                        scope:this
                    },

                    {
                        text: 'Eliminar Procesos',
                        iconCls: 'delpro',
                        handler:this.modcat,
                        scope:this
                    }]
                },
                {
                    text: 'Agregar Registros',
                    iconCls: 'addreg',
                    handler:this.addnode,
                    scope:this

                },{
                    text: 'Modificar Registros',
                    iconCls: 'modreg',
                    handler:this.Modnode,
                    scope:this
                },{
                    text: 'Eliminar Registros',
                    iconCls: 'delreg',
                    handler:this.delnode,
                    scope:this

                }]
            },{
                xtype: 'buttongroup',
                title: 'Otras Acciones',
                columns: 1,
                defaults: {
                    scale: 'small'
                },
                items: [{
                    xtype:'splitbutton',
                    text: 'Cambiar Template',
                    iconCls: 'template',
                    menu: [{
                        text: 'Menu Button 1'
                    }]
                },{
                    xtype:'splitbutton',
                    text: 'Pruebas',
                    iconCls: 'a',
                    handler:this.prueba,
                    scope:this
                    //menu: [{text: 'Cut Menu Item'}]
                },{
                    text: 'Copy',
                    iconCls: 'o'
                } ]
            }]
        });
        
        this.tabs = new Ext.TabPanel({
            border		: false,
            activeTab	: 0,
            enableTabScroll	:  true, 
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
            dataUrl:'../../phpclass/tree-order.php?termino=admin',
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
            renderTo	: 	"login",
            layout		:	"border",
            id:"global",
            height		:	900,            
            items		:	[center,west]
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
            items:[status,'->',this.words,'-',clock]
        });
        if(!tab){
            tab = new Ext.Panel({
                id: "id-"+node.id,
                closable:true,
                frame:true,
                title: node.attributes.text,
                items: [{
                    xtype: 'htmleditor',
                    id: node.attributes.id,
                    html:node.attributes.html,
                    //html: '<iframe src="../../registroshtml/registro1.htm" style="border: medium none ; width: 100%; height: 100%;"></iframe>',
                    width:980,
                    height:725,
                    enableKeyEvents: true
                }],
                bbar: statusbar,
                tbar: [{

                    text: 'Guardar',
                    iconCls: 'guardar',
                    handler:this.sendData,
                    scope:this,
                    xtype:'splitbutton',
                    menu: [{
                        text: 'Menu Button 1'
                    }]
                },
                '-',
                {
                    xtype:'splitbutton',
                    text: 'Exportar a PDF',
                    iconCls: 'exportar',
                    menu: [{
                        text: 'Cut Menu Item'
                    }]
                },
                {
                    text: 'Crear Plantilla',
                    iconCls: 'crear'
                },{
                    text: 'Imprimir',
                    iconCls: 'imprimir',
                    menu: [{
                        text: 'Paste Menu Item'
                    }]
                },'-',{
                    text: 'Enviar',
                    iconCls: 'enviar'
                },'-',{
                    xtype:'splitbutton',
                    text: 'Cerrar',
                    iconCls: 'cerrar',
                    menu: [{
                        text: 'Cut Menu Item'
                    }]
                },{
                    text: 'Copiar',
                    iconCls: 'copiar'
                },{
                    text: 'Paste',
                    iconCls: 'add16',
                    menu: [{
                        text: 'Paste Menu Item'
                    }]
                },'-',{
                    text: 'Cortar',
                    iconCls: 'cortar'
                },'-',{
                    text: 'Copiar Formato',
                    iconCls: 'CopiarF'
                }
                ]
            });
            this.tabs.add(tab);
            this.tabs.doLayout();
        }

        Ext.getCmp(node.attributes.id).on('keypress',this.countWords,this);
        Ext.getCmp(node.attributes.id).on('blur',this.countWords,this);
        Ext.getCmp(node.attributes.id).on('keypress', function(textarea){
            var text = Ext.getCmp('status');
            text.setText('Saving draft...');
            (function(){
                text.setText('Draft auto-saved at ' + new Date().format('g:i:s A'));
            }).defer(2000);
        },
        this, {
            buffer:3000
        });
        this.tabs.activate(tab);
    },
    sendData: function(){
        //submit the form
        var mask = new Ext.LoadMask(Ext.get('global'), {
            msg:'Saving. Please wait...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',
            params: {
                extraParam: 'Extra params!',
                param2: 'Param 2'
            },
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
    // funciones del inicio
    inicio: function(){
        var redirect = '../../sist-documental/index.php';
        window.location = redirect;
    },
    admin: function(){
        var redirect = '../../sist-documental/administrator/index.php';
        window.location = redirect;
    },
    cerrar:function(){},    
    user: function(){
        var redirect = '../user/panelInicio.php';
        window.location = redirect;
    },
    prueba: function(){
        var redirect = '../pruebas/index.php';
        window.location = redirect;
    },
    //funciones del usuario
    adduser: function(){
        var idR = new Ext.form.TextField({
            fieldLabel: 'idr',
            hidden:true,
            name: 'idr',
            forceSelection : true,
            id : "idr",
            value : 'user'
        });
       //**********  PROXY COMBOBOX  Usuarios*******************************************
        var  proxycomboboxrole = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=role',
            method:'POST'
        });
        var  readercomboboxrole = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{name: 'id',mapping:'id'},
                     {name: 'nombre',mapping:'nombre'}]
        });
        var  roles = new Ext.data.Store({
            proxy: proxycomboboxrole,
            totalProperty: 'total',
            reader: readercomboboxrole
        });
        this.role = new Ext.form.ComboBox({
            //blankText: 'Inserte Usuario',
            width: 210,
            name : "useuarioroles",
            hiddenName : "useuarioroles",
            id : "useuarioroles",
            emptyText:'Seleccione role...',
            fieldLabel : "Role",
            bodyStyle:'padding:5px 5px 0',
            forceSelection : true,
            displayField : 'nombre',
            valueField : 'nombre',
            loadingText : 'Buscando....',
            minChars : 1,
            triggerAction : 'all',
            store: roles
        });
        /*==========Fin============*/
        this.formuser = new Ext.FormPanel({	 // step 1
            xtype	: "panel",
            layout	: "form",
            labelWidth	: 100,
            padding	: 10,
            width       : 450,
            id          :"formmm",
            url:'../../phpclass/control.php',
            height      :270,
            frame       :true,
            border	: false,
            items   : [
            {
                xtype:'fieldset',
                title: 'Informacion del Usuario',
                collapsible: true,
                autoHeight:true,
                defaults: {
                    width: 230
                },
                defaultType: 'textfield',
                items :[{
                    fieldLabel: 'Nombre',
                    name: 'Nombre',
                    minLength:3,
                    id :"Nombre",
                    maxLength:32,
                    emptyText:'Escriba nombre completo del usuario ',
                    blankText:'Escriba nombre completo del usuario'
                },idR,
                {
                    fieldLabel: 'Usuario',
                    name: 'Usuario',
                    minLength:3,
                    id :"Usuario",
                    maxLength:32,
                    emptyText:'Escriba nombre de usuario ',
                    blankText:'Escriba nombre de usuario'
                },
                {
                    fieldLabel: 'Password',
                    name: 'Password',
                    inputType:'password',
                    minLength:6,
                    id :"Password",
                    minLengthText:'El password debe ser de mas de 6 caracteres.',
                    maxLength:32,
                    emptyText:'usuario ',
                    blankText: 'password'
                },this.role,
                {
                    fieldLabel: 'Correo',
                    name: 'Correo',
                    minLength:3,
                    id :"Correo",
                    maxLength:32,
                    vtype:'email',
                    emptyText:'Escriba correo de usuario ',
                    blankText:'Escriba correo de usuario'
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
                handler:this.enviardatosUser,
                scope:this
            },{
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                handler:this.reset,
                scope:this
            }
            ]
        });
        var win = new Ext.Window({
            title: 'Agregar Usuarios',
            width: 460,
            height:305,
            minimizable: true,
            maximizable: true,
            items:this.formuser
        });
        win.show();

        //fire when the user clicks the minimize button
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse(); //collapse the window
        });
    },
    enviardatosUser:function(){
        //submit the form
        var mask = new Ext.LoadMask(Ext.get('formmm'), {
            msg:'Saving. Please wait...'
        });
        mask.show();
        this.formuser.getForm().submit({
            method: 'put',
            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Consulta satisfactoruia',action.result.msg);
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Consulta Erronea', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Consulta Erronea', 'Ajax communication failed');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Consulta Erronea', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Consulta Erronea',action.result.msg);
                }
                this.form.getForm().reset();
            }

        });

    },
    moduser:function(){
         var proxy = new Ext.data.HttpProxy({
            api: {
                read    : "../../phpclass/control.php?termino=usuarios",
                // create  : "../../phpclass/control.php?termino=create",
                //update  : "../../phpclass/control.php?termino=Updaterole",
                destroy : "../../phpclass/control.php?termino=eliminarusuarios"
            }
        });
        var reader = new Ext.data.JsonReader({
            totalProperty   : 'total',  	//step 1
            successProperty : 'success',   // indica la propiedad que define si se ha insertado
            messageProperty : 'message',   //actualizado o borrado con ?xito
            idProperty  : 'id',        	   //este es el nombre del par?metro que llega al servidor
            root        : 'data' 		   //con el JSON modificado
        },
        [{name: 'id'},{name: 'name'},{name: 'username'},{name: 'email'},{name: 'role'}]
        );
        var writer = new Ext.data.JsonWriter({
            encode      : true,
            writeAllFields  : true
        })
        this.store = new Ext.data.GroupingStore({
            proxy       : proxy,
            reader      : reader,
            writer      : writer,
            autoSave    : true ,
            baseParams: {x:10,y:20},
            groupField:'role'
        });
        this.store.load({
            params:{
                z:30,
                start:0,
                limit:15
            }
        });
        var sm = new Ext.grid.CheckboxSelectionModel(); //step 1
        var pager = new Ext.PagingToolbar({
            pageSize: 15,
            store: this.store,
            displayInfo: true,
            displayMsg: 'Solicitudes de  {0} - {1} of {2}',
            emptyMsg: "No hay solicitudes"
        });
        pager.on('beforechange',function(bar,params){
            params.z = 30;
        });
        this.grid = new Ext.grid.GridPanel({
            width:425,
            layout:'form',
            height:260,
            border: false,
            labelWidth: 100,
            loadMask: true,
            abelAlign: 'top',
            frame:true,
            iconCls: 'estados',
            store: this.store, // step 3
            columns : [
            new Ext.grid.RowNumberer(),
            {
                header:'Usuario',
                dataIndex:'name',
                width:100,
                sortable: true
            },
            {
                header:'id',
                dataIndex:'id',
                hidden:true,
                width:100,
                sortable: true
            },
            {
                header:'Nombre',
                dataIndex:'username',
                width:100,
                sortable: true
            },
            {
                header:'Correo',
                dataIndex:'email',
                width:100,
                sortable: true
            },{
                header:'role',
                dataIndex:'role',
                width:100,
                sortable: true
            }
             ],
            tbar  : ['-',
            {
                text:"Modificar",
                scope : this,
                handler: this.datosuser,
                iconCls:'moduser'
            },'-',

            {
                text:"Eliminar",
                scope:this,
                handler:this.onDeleteuser,
                iconCls:'deluser'
            },'-',
            ],

            bbar:pager,

            view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'
            }),
            stripeRows  : true
        });
        listadouser=this.grid;
        listadouser.on('rowclick',function(Grid, rowIndex, e){
        filaseleccionadauser = rowIndex;
        });

          var idR = new Ext.form.TextField({
            fieldLabel: 'idr',
            hidden:true,
            name: 'idr',
            forceSelection : true,
            id : "idr",
            value : 'updateuser'
        });
           UsuarioUsuario = new Ext.form.TextField({
            fieldLabel: 'Usuario',
            name: 'Usuario',
            forceSelection : true,
            id : "Usuario",
            minLength:3,
            maxLength:32,
            emptyText:'Escriba nombre',
            blankText:'Escriba nombre'
        });
          NombreUsuario = new Ext.form.TextField({
            fieldLabel: 'Nombre',
            name: 'Nombre',
            forceSelection : true,
            id : "Nombre",
            minLength:3,
            maxLength:32,
            emptyText:'Escriba nombre',
            blankText:'Escriba nombre'
        });
        CorreoUsuario = new Ext.form.TextField({
            fieldLabel: 'Correo',
            name: 'Correo',
            forceSelection : true,
            id : "Correo",
            minLength:3,
            maxLength:32,
            vtype:'email',
            emptyText:'Escriba nombre',
            blankText:'Escriba nombre'
        });
        PasswordUsuario = new Ext.form.TextField({
            fieldLabel: 'Password',
            name: 'Password',
            forceSelection : true,
            id : "Password",
            minLength:3,
            maxLength:32,
             inputType:'password',
            emptyText:'Escriba nombre',
            blankText:'Escriba nombre'
        });
           idroleUsuario = new Ext.form.TextField({
            fieldLabel: 'iduser',
            //hidden:true,
            name: 'iduser',
            forceSelection : true,
            id : "iduser"

        });
                //**********  PROXY COMBOBOX  Usuarios*******************************************
        var  proxycomboboxUsuarios = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=role',
            method:'POST'
        });
        var  readercomboboxUsuarios = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{name: 'id',mapping:'id'},
                     {name: 'nombre',mapping:'nombre'}]
        });
        var  rolesUsuario = new Ext.data.Store({
            proxy: proxycomboboxUsuarios,
            totalProperty: 'total',
            reader: readercomboboxUsuarios
        });
        this.user = new Ext.form.ComboBox({
            //blankText: 'Inserte Usuario',
            width: 210,
            name : "useuariorole",
            hiddenName : "useuariorole",
            id : "useuariorole",
           // emptyText:'Seleccione Usuario...',
            fieldLabel : "Role",
            bodyStyle:'padding:5px 5px 0',
            forceSelection : true,
            displayField : 'nombre',
            valueField : 'nombre',
            loadingText : 'Buscando....',
            minChars : 1,
            triggerAction : 'all',
            store: rolesUsuario
        });
        /*==========Fin============*/


        this.formusuario = new Ext.form.FormPanel({
            frame:true,
            layout: 'form',
            border: false,
            id:'formauser',
            height:450,
            url: '../../phpclass/control.php',
            bodyStyle:'padding:5px 5px 0',
            labelWidth: 60,
            abelAlign: 'top',
            items:[{
                xtype:'fieldset',
                title: 'Informacion del Usuarios',
                collapsible: true,
                html : '<br><br><br<br><br><br><br><br><br><br><br><br><br><br><br><h3><img src="../../img/icons/16x16/apps/info.png" width="16px" height="16px" aline="center"> Nota:</h3>Debe llenar todos los datos ',
                autoHeight:true,
                defaults: {width: 130},
                defaultType: 'textfield',
                items :[UsuarioUsuario,NombreUsuario,idR,idroleUsuario,CorreoUsuario,this.user,PasswordUsuario]
                 }],
            bbar: [new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'formauser'
                })
            }),'->','-',
                {
                iconCls:'enviar',
                text:'Envio',
                id:'envio',
                scope:this,
                handler:this.sendDatauser
            },'-',
            {
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                scope:this,
                handler:this.resetuser
            },'-']
        });
       // formulario=this.form;
        var center = {
            xtype	:	"panel",
            region	:	"center",
            layout	:	"fit",
            border	:	false,
            items	:	[this.grid],
            margins	:	{
                bottom:3,
                right:3
            }
        };
        var west =  {
            xtype	:	"panel",
            region	:	"west",
            width	:	260,
            split	:	true,
            frame:true,
            items	:	[this.formusuario],
            margins	:	"0 0 3 3"
        };
        panelusuario=west
        var main = new Ext.Panel({
            layout		:	"border",
            height		:	465,
            width		:       750,
            items		:       [west,center]
        });
        var win = new Ext.Window({
            title: 'Listado de Usuarios',
            minimizable: true,
            maximizable: true,
            items: main
        });
        win.show();
        //fire when the user clicks the minimize button
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse(); //collapse the window
        });
    },
    onDeleteuser:function(){
        var rows = listadouser.getSelectionModel().getSelections();
        if(rows.length === 0){
            return false;
        }
        this.store.remove(rows);
    },
    sendDatauser: function(){
        var mask = new Ext.LoadMask(Ext.get('formauser'),{
            msg:'Guardando los datos. Por Favor espere...'
        });
        mask.show();
        this.formusuario.getForm().submit({
            method: 'put',

            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Datos de modificacion',action.result.msg);
            //window.location = 'tecnico.php?termino=Reportes';
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'El formulario presenta datos incorrectos');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Failure',action.result.msg);
                }
            //window.location = 'tecnico.php?termino=Reportes';
            }
        });
    },
    datosuser:function(){
       NombreUsuario.setValue(listadouser.getStore().getAt(filaseleccionadauser).get('username'));
       idroleUsuario.setValue(listadouser.getStore().getAt(filaseleccionadauser).get('id'));
       CorreoUsuario.setValue(listadouser.getStore().getAt(filaseleccionadauser).get('email'));
       UsuarioUsuario.setValue(listadouser.getStore().getAt(filaseleccionadauser).get('name'));
       //[UsuarioUsuario,NombreUsuario,idR,idroleUsuario,CorreoUsuario,this.user,PasswordUsuario]

    },
    resetuser:function(){this.formusuario.getForm().reset();},
    //funciones de categorias o procesos
    adducat: function(){
        var idR = new Ext.form.TextField({
            fieldLabel: 'idr',
            hidden:true,
            name: 'idr',
            forceSelection : true,
            id : "idr",
            value : 'categ'
        });
        //**********  PROXY COMBOBOX  Equipos*******************************************
        var  proxycombobox = new Ext.data.HttpProxy({
            url: '../../phpclass/ClassFull.php?termino=categorias',
            method:'POST'
        });
        var  readercombobox = new Ext.data.JsonReader({
            totalProperty: 'total',
            root: 'data',
            fields: [{
                name: 'id',
                mapping:'id'
            },

            {
                name: 'id_parent',
                mapping:'id_parent'
            },

            {
                name: 'category',
                mapping:'category'
            },

            {
                name: 'description',
                mapping:'description'
            }]
        });
        var catgallstote = new Ext.data.Store({
            proxy: proxycombobox,
            totalProperty: 'total',
            reader: readercombobox
        });
        this.catgall = new Ext.form.ComboBox({
            blankText: 'Seleccione Proceso Padre',
            width: 210,
            name : "catgall",
            hiddenName : "catgall",
            id : "catgall",
            emptyText:'Seleccione Proceso Padre...',
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
        //**********  PROXY COMBOBOX  Usuarios*******************************************
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
            },

            {
                name: 'nombre',
                mapping:'nombre'
            }]
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

        this.form = new Ext.FormPanel({	 // step 1
            xtype	: "panel",
            layout	: "form",
            labelWidth	: 100,
            padding	: 10,
            width       : 650,
            id          :"categ",
            url:'../../phpclass/control.php',
            height      :320,
            frame       :true,
            border	: false,
            items   : [{
                xtype:'fieldset',
                title: 'Agregar categorias',
                collapsible: true,
                autoHeight:true,
                defaults: {
                    width: 230
                },
                //defaultType: 'textfield',
                items :[
                this.catgall,
                {
                    xtype: 'textfield',
                    fieldLabel: 'Nombre',
                    name: 'catgName',
                    minLength:3,
                    id :"catgName",
                    maxLength:64,
                    emptyText:'Escriba nombre de nueva categoria de proceso',
                    blankText:'Escriba nombre de nueva categoria de proceso '
                },
               // this.user,
                idR,
                {
                    xtype: 'htmleditor',                  
                    enableLists : false,
                    enableSourceEdit : false,
                    enableLinks : false,                   
                    fieldLabel: 'Descricion',
                    id : "descrp",
                    name: 'descrp',
                    width   : 480,
                    height  : 95
                }
                ],
                html : '<br><h3><img src="../../img/icons/16x16/apps/info.png" width="16px" height="16px" aline="center"> Nota:</h3>Crear usuario expecifico para este registro de no existir.'

            }
            ],
            bbar:[
            new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'categ'
                })
            }),'->',
            {
                iconCls:'guardar',
                text:'Guardar',
                id:'send',
                handler:this.enviarcat,
                scope:this
            },{
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                handler:this.reset,
                scope:this
            }
            ]
        });
        var win = new Ext.Window({
            title: 'Nuevas Categorias',
            width: 660,
            height:350,
            minimizable: true,
            maximizable: true,
            items:this.form
        });
        win.show();

        //fire when the user clicks the minimize button
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse(); //collapse the window
        });
    },
    enviarcat:function(){
        //submit the form
        var mask = new Ext.LoadMask(Ext.get('categ'), {
            msg:'Saving. Please wait...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',            
            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Consulta satisfactoruia',action.result.msg);
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Consulta Erronea', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Consulta Erronea', 'Ajax communication failed');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Consulta Erronea', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Consulta Erronea',action.result.msg);
                }
                this.form.getForm().reset();
            }

        });

    },
    modcat:function(){
         var proxy = new Ext.data.HttpProxy({
            api: {
                read    : "../../phpclass/control.php?termino=proces",
                destroy : "../../phpclass/control.php?termino=eliminarproces"
            }
        });
        var reader = new Ext.data.JsonReader({
            totalProperty   : 'total',
            successProperty : 'success',
            messageProperty : 'message',
            idProperty  : 'id',
            root        : 'data'
        },
        [{
            name: 'id'
        },{
            name: 'category'
        },{
            name: 'description'
        }]
        );
        var writer = new Ext.data.JsonWriter({
            encode      : true,
            writeAllFields  : true
        })
        this.store = new Ext.data.GroupingStore({
            proxy       : proxy,
            reader      : reader,
            writer      : writer,
            autoSave    : true ,
            baseParams: {
                x:10,
                y:20
            }
        });
        this.store.load({
            params:{
                z:30,
                start:0,
                limit:15
            }
        });
        var sm = new Ext.grid.CheckboxSelectionModel(); //step 1
        var pager = new Ext.PagingToolbar({
            pageSize: 15,
            store: this.store,
            displayInfo: true,
            displayMsg: 'Solicitudes de  {0} - {1} of {2}',
            emptyMsg: "No hay solicitudes"
        });
        pager.on('beforechange',function(bar,params){
            params.z = 30;
        });
        this.grid = new Ext.grid.GridPanel({
            width:425,
            layout:'form',
            height:260,
            border: false,
            labelWidth: 100,
            loadMask: true,
            abelAlign: 'top',
            frame:true,
            iconCls: 'estados',
            store: this.store, // step 3
            columns : [
            new Ext.grid.RowNumberer(),
            {
                header:'category',
                dataIndex:'category',
                width:100,
                sortable: true
            },
            {
                header:'id',
                dataIndex:'id',
                hidden:true,
                width:100,
                sortable: true
            },
            {
                header:'description',
                dataIndex:'description',
                width:100,
                sortable: true
            }
             ],
            tbar  : ['-',
            {
                text:"Modificar",
                scope : this,
                handler: this.datosproceso,
                iconCls:'moduser'
            },'-',

            {
                text:"Eliminar",
                scope:this,
                handler:this.onDeleteproceso,
                iconCls:'deluser'
            },'-',
            ],

            bbar:pager,

            view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'
            }),
            stripeRows  : true
        });
        listadoproceso=this.grid;
        listadoproceso.on('rowclick',function(Grid, rowIndex, e){
        filaseleccionadaproceso = rowIndex;
        });

          var idR = new Ext.form.TextField({
            fieldLabel: 'idr',
            hidden:true,
            name: 'idr',
            forceSelection : true,
            id : "idr",
            value : 'updateproceso'
        });

          nombreprocso = new Ext.form.TextField({
            fieldLabel: 'Proceso',
            name: 'Proceso',
            forceSelection : true,
            id : "Proceso",
            minLength:3,
            maxLength:64
        });
        descrpProceso = new Ext.form.TextField({
            fieldLabel: 'Descipcion',
            name: 'Descipcion',
            forceSelection : true,
            id : "Descipcion",
            minLength:3,
            maxLength:64
        });
           idroleProcesoo = new Ext.form.TextField({
            fieldLabel: 'idProceso',
            hidden:true,
            name: 'idProceso',
            forceSelection : true,
            id : "idProceso"

        });
        this.formproceso = new Ext.form.FormPanel({
            frame:true,
            layout: 'form',
            border: false,
            id:'formaproceso',
            height:150,
            width:  588,
            url: '../../phpclass/control.php',
            bodyStyle:'padding:5px 5px 0',
            labelWidth: 60,
            abelAlign: 'top',
            items:[{
                xtype:'fieldset',
                title: 'Informacion del Usuarios',
                collapsible: true,
                html : '<br><br><br<br><br><br><br><br><br><br><br><br><br><br><br><h3><img src="../../img/icons/16x16/apps/info.png" width="16px" height="16px" aline="center"> Nota:</h3>Debe llenar todos los datos ',
                autoHeight:true,
                defaults: {width: 300},
                defaultType: 'textfield',
                items :[nombreprocso,idR,idroleProcesoo,descrpProceso]
                 }],
            bbar: [new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'formaproceso'
                })
            }),'->','-',
                {
                iconCls:'enviar',
                text:'Envio',
                id:'envio',
                scope:this,
                handler:this.sendDataproceso
            },'-',
            {
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                scope:this,
                handler:this.resetproceso
            },'-']
        });
        var center = {
            xtype	:	"panel",
            region	:	"center",
            layout	:	"fit",
            border	:	false,
            items	:	[this.grid],
            margins	:	{
                bottom:3,
                right:3
            }
        };
        var west =  {
            xtype	:	"panel",
            region	:	"south",
            width		: 250,
            split	:	true,
            frame:true,
            items	:	[this.formproceso],
            margins	:	"0 0 3 3"
        };
        panelusuario=west
        var main = new Ext.Panel({
            layout		:	"border",
            height		:	500,
            width		:       600,
            items		:       [west,center]
        });
        var win = new Ext.Window({
            title: 'Listado de Usuarios',
            minimizable: true,
            maximizable: true,
            items: main
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
        });
        
        
    },
    onDeleteproceso:function(){
        var rows = listadoproceso.getSelectionModel().getSelections();
        if(rows.length === 0){
            return false;
        }
        this.store.remove(rows);
    },
    sendDataproceso: function(){
        var mask = new Ext.LoadMask(Ext.get('formaproceso'),{msg:'Guardando los datos. Por Favor espere...'});
        mask.show();
        this.formproceso.getForm().submit({
            method: 'put',

            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Datos de modificacion',action.result.msg);
            //window.location = 'tecnico.php?termino=Reportes';
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'El formulario presenta datos incorrectos');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Failure',action.result.msg);
                }
            //window.location = 'tecnico.php?termino=Reportes';
            }
        });
    },
    datosproceso:function(){
       nombreprocso.setValue(listadoproceso.getStore().getAt(filaseleccionadaproceso).get('category'));
       idroleProcesoo.setValue(listadoproceso.getStore().getAt(filaseleccionadaproceso).get('id'));
       descrpProceso.setValue(listadoproceso.getStore().getAt(filaseleccionadaproceso).get('description'));
    },
    resetproceso:function(){
        this.formproceso.getForm().reset();/*window.location = 'tecnico.php?termino=Reportes';*/
    },
    reset:function(){
        this.form.getForm().reset();
    },
    //funciones de Role
    addrole:function(){
        var idR = new Ext.form.TextField({
            fieldLabel: 'idr',
            hidden:true,
            name: 'idr',
            forceSelection : true,
            id : "idr",
            value : 'addrole'
        });
        this.form = new Ext.FormPanel({	 // step 1
            xtype	: "panel",
            layout	: "form",
            labelWidth	: 100,
            padding	: 10,
            width       : 450,
            id          :"addroles",
            url:'../../phpclass/control.php',
            height      :120,
            frame       :true,
            border	: false,
            items   : [
            {
                xtype:'fieldset',
                title: 'Adicionar Role',
                collapsible: true,
                autoHeight:true,
                defaults: {
                    width: 230
                },
                defaultType: 'textfield',
                items :[{
                    fieldLabel: 'Nombre',
                    name: 'roleadd',
                    minLength:3,
                    id :"roleadd",
                    maxLength:32,
                    emptyText:'Escriba nombre del role ',
                    blankText:'Escriba nombre del role'
                },idR               
                ]
            }
            ],
            bbar:[
            new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'addroles'
                })
            }),'->',
            {
                iconCls:'guardar',
                text:'Guardar',
                id:'send',
                handler:this.addroleserver,
                scope:this
            },{
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                handler:this.reset,
                scope:this
            }
            ]
        });
        var win = new Ext.Window({
            title: 'Agregar Usuarios',
            width: 460,
            height:150,
            minimizable: true,
            maximizable: true,
            items:this.form
        });
        win.show();

        //fire when the user clicks the minimize button
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse(); //collapse the window
        });       
    },
    addroleserver:function(){
        //submit the form
        var mask = new Ext.LoadMask(Ext.get('addroles'), {
            msg:'Saving. Please wait...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',
            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Consulta satisfactoruia',action.result.msg);
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Consulta Erronea', 'Form fields may not be submitted with invalid values');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Consulta Erronea', 'Ajax communication failed');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Consulta Erronea', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Consulta Erronea',action.result.msg);
                }
            }

        });

    },
    modificarrole:function(){
    var proxy = new Ext.data.HttpProxy({
            api: {
                read    : "../../phpclass/control.php?termino=role",
                // create  : "../../phpclass/control.php?termino=create",
                update  : "../../phpclass/control.php?termino=Updaterole",
                destroy : "../../phpclass/control.php?termino=eliminarrole"
            }
        });
        var reader = new Ext.data.JsonReader({
            totalProperty   : 'total',  	//step 1
            successProperty : 'success',   // indica la propiedad que define si se ha insertado
            messageProperty : 'message',   //actualizado o borrado con ?xito
            idProperty  : 'id',        	   //este es el nombre del par?metro que llega al servidor
            root        : 'data' 		   //con el JSON modificado
        }
        ,[{
            name: 'id'
        },{
            name: 'name'
        }]
        );
        var writer = new Ext.data.JsonWriter({
            encode      : true,
            writeAllFields  : true
        })
        this.store = new Ext.data.GroupingStore({
            proxy       : proxy,
            reader      : reader,
            writer      : writer,
            autoSave    : true ,
            baseParams: {
                x:10,
                y:20
            }
        });
        this.store.load({
            params:{
                z:30,
                start:0,
                limit:15
            }
        });
        var sm = new Ext.grid.CheckboxSelectionModel(); //step 1
        var pager = new Ext.PagingToolbar({
            pageSize: 15,
            store: this.store,
            displayInfo: true,
            displayMsg: 'Solicitudes de  {0} - {1} of {2}',
            emptyMsg: "No hay solicitudes"
        });
        pager.on('beforechange',function(bar,params){
            params.z = 30;
        });
        this.grid = new Ext.grid.GridPanel({
            width:425,
            layout:'form',
            height:260,
            border: false,
            labelWidth: 100,
            loadMask: true,
            abelAlign: 'top',
            frame:true,
            iconCls: 'estados',
            store: this.store, // step 3
            columns : [
            new Ext.grid.RowNumberer(),
            {
                header:'Role',
                dataIndex:'name',
                width:150,
                sortable: true
            },

            {
                header:'id',
                dataIndex:'id',
                hidden:true,
                width:100,
                sortable: true
            },],
            tbar  : ['-',
            {
                text:"Modificar",
                scope : this,
                handler: this.datos,
                iconCls:'modrole'
            },'-',

            {
                text:"Eliminar",
                scope:this,
                handler:this.onDelete,
                iconCls:'delrole'
            },'-',
            ],

            bbar:pager,

            view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'
            }),
            stripeRows  : true
        });
        listado=this.grid;
        listado.on('rowclick',function(Grid, rowIndex, e){
        filaseleccionada = rowIndex;
        });

          var idR = new Ext.form.TextField({
            fieldLabel: 'idr',
            hidden:true,
            name: 'idr',
            forceSelection : true,
            id : "idr",
            value : 'updaterole'
        });
           Nombre = new Ext.form.TextField({
            fieldLabel: 'Nombre',
            //hidden:true,
            name: 'Nombre',
            forceSelection : true,
            id : "Nombre",
            minLength:3,
            maxLength:32,
            emptyText:'Escriba nombre',
            blankText:'Escriba nombre'
        });
           idrole = new Ext.form.TextField({
            fieldLabel: 'idrole',
            hidden:true,
            name: 'idrole',
            forceSelection : true,
            id : "idrole"

        });


        this.form = new Ext.form.FormPanel({
            frame:true,
            layout: 'form',
            border: false,
            id:'formall',
            height:250,
            url: '../../phpclass/control.php',
            bodyStyle:'padding:5px 5px 0',
            labelWidth: 50,
            abelAlign: 'top',
            items:[{
                xtype:'fieldset',
                title: 'Informacion del role',
                collapsible: true,
                html : '<br><br><br><br><br><br><h3><img src="../../img/icons/16x16/apps/info.png" width="16px" height="16px" aline="center"> Nota:</h3>Puede crear usuario expecifico para este registro de no existir',
                autoHeight:true,
                defaults: {width: 105},
                defaultType: 'textfield',
                items :[Nombre,idR,idrole]
                 }],
            bbar: [new Ext.ux.StatusBar({
                id:'this.form-statusbar',
                defaultText:'Listo',
                plugins:new Ext.ux.ValidationStatus({
                    form:'formall'
                })
            }),'->','-',
                {
                iconCls:'enviar',
                text:'Envio',
                id:'envio',
                scope:this,
                handler:this.modificarserver
            },'-',
            {
                iconCls:'cancel',
                id:'canclar',
                text:'Cancelar',
                scope:this,
                handler:this.reset
            },'-']
        });
       // formulario=this.form;
        var center = {
            xtype	:	"panel",
            region	:	"center",
            layout	:	"fit",
            border	:	false,
            items	:	[this.grid],
            margins	:	{
                bottom:3,
                right:3
            }
        };
        var west =  {
            xtype	:	"panel",
            region	:	"west",
            width	:	260,
            //collapseMode: 'mini',
            //collapsible: true,
           /* tools: [{
                id:'pin',
                handler:this.fuera
            },
            {  id:'unpin',
               handler:this.dentro
            }
            ],*/
            split	:	true,
            frame:true,
            items	:	[this.form],
            //title	:	"Actualizar Datos de Solicitud",
            margins	:	"0 0 3 3"
        };
        panel=west
        var main = new Ext.Panel({
            layout		:	"border",
            height		:	265,
            width		:       650,
            items		:       [west,center]
        });
        var win = new Ext.Window({
            title: 'Listado de Roles',
            minimizable: true,
            maximizable: true,
            items: main
        });
        win.show();
        //fire when the user clicks the minimize button
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse(); //collapse the window
        });
        


    },
    modificarserver: function(){
        var mask = new Ext.LoadMask(Ext.get('formall'),{
            msg:'Guardando los datos. Por Favor espere...'
        });
        mask.show();
        this.form.getForm().submit({
            method: 'put',

            success: function(form,action){
                mask.hide();
                Ext.Msg.alert('Datos de modificacion',action.result.msg);
            //window.location = 'tecnico.php?termino=Reportes';
            },
            failure: function(form,action){
                mask.hide();
                switch (action.failureType) {
                    case Ext.form.Action.CLIENT_INVALID:
                        Ext.Msg.alert('Failure', 'El formulario presenta datos incorrectos');
                        break;
                    case Ext.form.Action.CONNECT_FAILURE:
                        Ext.Msg.alert('Failure', 'Comunicacion fallida con el Servidor (Via Ajax) ');
                        break;
                    case Ext.form.Action.SERVER_INVALID:
                        Ext.Msg.alert('Failure', action.result.msg);
                        break;
                    default:
                        Ext.Msg.alert('Failure',action.result.msg);
                }
            //window.location = 'tecnico.php?termino=Reportes';
            }
        });
    },
    datos:function(){
       Nombre.setValue(listado.getStore().getAt(filaseleccionada).get('name'));
       idrole.setValue(listado.getStore().getAt(filaseleccionada).get('id'));
    },
    onDelete:function(){
        var rows = this.grid.getSelectionModel().getSelections();
        if(rows.length === 0){
            return false;
        }
        this.store.remove(rows);
    },
    //funciones de los registros
    addnode: function(){
        var redirect = '../admin/createReg.php';
        window.location = redirect;
    },
    Modnode:function(){
         var proxy = new Ext.data.HttpProxy({
            api: {
                read    : "../../phpclass/control.php?termino=node",
                destroy : "../../phpclass/control.php?termino=eliminarnode"
            }
        });
        var reader = new Ext.data.JsonReader({
            totalProperty   : 'total',
            successProperty : 'success',
            messageProperty : 'message',
            idProperty  : 'id',
            root        : 'data'
        },
        [{
            name: 'id'
        },{
            name: 'category'
        },{
            name: 'description'
        },{
            name: 'user'
        },{
            name: 'user_test'
        },{
            name: 'node_html'
        }]
        );
        var writer = new Ext.data.JsonWriter({
            encode      : true,
            writeAllFields  : true
        })
        this.store = new Ext.data.GroupingStore({
            proxy       : proxy,
            reader      : reader,
            writer      : writer,
            autoSave    : true ,
            baseParams: {
                x:10,
                y:20
            }
        });
        this.store.load({
            params:{
                z:30,
                start:0,
                limit:15
            }
        });
        var expander = new Ext.ux.grid.RowExpander({tpl : new Ext.Template('<b>Datos Adicionales:</b> {description}</br>')});
        var sm = new Ext.grid.CheckboxSelectionModel(); //step 1
        var pager = new Ext.PagingToolbar({
            pageSize: 15,
            store: this.store,
            displayInfo: true,
            displayMsg: 'Solicitudes de  {0} - {1} of {2}',
            emptyMsg: "No hay solicitudes"
        });
        pager.on('beforechange',function(bar,params){
            params.z = 30;
        });
        this.gridmod = new Ext.grid.GridPanel({
            width:500,
            layout:'form',
            height:390,
            border: false,
            labelWidth: 100,
            loadMask: true,
            abelAlign: 'top',
            frame:true,
            plugins: expander,
            iconCls: 'estados',
            store: this.store, // step 3
            columns : [
            //new Ext.grid.RowNumberer(),
            expander,
            {
                header:'id',
                dataIndex:'id',
                hidden:true,
                width:100,
                sortable: true
            },{
                header:'Nombre',
                dataIndex:'category',
                width:100,
                sortable: true
            },
            {
                header:'Tecnico',
                dataIndex:'user',
                width:100,
                sortable: true
            },{
                header:'Usuario Certificador',
                dataIndex:'user_test',
                width:100,
                sortable: true
            } 
            ],
            tbar  : [ '->','-',
            {
                text:"Modificar",
                scope:this,
                handler:this.Moddatos,
                iconCls:'deluser'
            },'-',
            ],

            bbar:pager,

            view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'
            }),
            stripeRows  : true
        });
        listadonodemod=this.gridmod;
        listadonodemod.on('rowclick',function(Grid, rowIndex, e){
        filaseleccionadanodemod = rowIndex;
        });


        var win = new Ext.Window({
            title: 'Listado de Registros',
            minimizable: true,
            width:510,
            height:420,
            maximizable: true,
            items:[ this.gridmod]
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
        });
    },
    Moddatos:function(){       
       var top = new Ext.FormPanel({
        labelAlign: 'top',
        frame:true,
        title: 'Multi Column, Nested Layouts and Anchoring',
        bodyStyle:'padding:5px 5px 0',
        width: 960,
        height:785,
        items: [{
            layout:'column',
            items:[{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: 'First Name',
                    name: 'category',
                     id:'category',
                    anchor:'95%'
                }, {
                    xtype:'textfield',
                    fieldLabel: 'Company',
                    name: 'description',
                     id:'description',
                    anchor:'95%'
                }]
            },{
                columnWidth:.5,
                layout: 'form',
                items: [{
                    xtype:'textfield',
                    fieldLabel: 'idnode',
                    name: 'idnode',
                    id:'idnode',
                    anchor:'95%'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Email',
                    name: 'email',
                    vtype:'email',
                    anchor:'95%'
                }]
            }]
        },{
            xtype:'htmleditor',
            id:'node_html',
            name: 'node_html',
            fieldLabel:'Biography',
            height:590,
            anchor:'98%'
        }],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel'
        }]
    });
    category.setValue(listadonodemod.getStore().getAt(filaseleccionadanodemod).get('category'));
    description.setValue(listadonodemod.getStore().getAt(filaseleccionadanodemod).get('description'));
    node_html.setValue(listadonodemod.getStore().getAt(filaseleccionadanodemod).get('node_html'));
    idnode.setValue(listadonodemod.getStore().getAt(filaseleccionadanodemod).get('id'));
       
    var win = new Ext.Window({
            title: 'Listado de Registros',
            minimizable: true,
            width:970,
            height:820,
            maximizable: true,
            items:[top]
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
        });

    },
    delnode:function(){
         var proxy = new Ext.data.HttpProxy({
            api: {
                read    : "../../phpclass/control.php?termino=node",
                destroy : "../../phpclass/control.php?termino=eliminarnode"
            }
        });
        var reader = new Ext.data.JsonReader({
            totalProperty   : 'total',
            successProperty : 'success',
            messageProperty : 'message',
            idProperty  : 'id',
            root        : 'data'
        },
        [{
            name: 'id'
        },{
            name: 'category'
        },{
            name: 'description'
        },{
            name: 'user'
        },{
            name: 'user_test'
        }]
        );
        var writer = new Ext.data.JsonWriter({
            encode      : true,
            writeAllFields  : true
        })
        this.store = new Ext.data.GroupingStore({
            proxy       : proxy,
            reader      : reader,
            writer      : writer,
            autoSave    : true ,
            baseParams: {
                x:10,
                y:20
            }
        });
        this.store.load({
            params:{
                z:30,
                start:0,
                limit:15
            }
        });
        var sm = new Ext.grid.CheckboxSelectionModel(); //step 1
        var pager = new Ext.PagingToolbar({
            pageSize: 15,
            store: this.store,
            displayInfo: true,
            displayMsg: 'Solicitudes de  {0} - {1} of {2}',
            emptyMsg: "No hay solicitudes"
        });
        pager.on('beforechange',function(bar,params){
            params.z = 30;
        });
        this.grid = new Ext.grid.GridPanel({
            width:500,
            layout:'form',
            height:390,
            border: false,
            labelWidth: 100,
            loadMask: true,
            abelAlign: 'top',
            frame:true,
            iconCls: 'estados',
            store: this.store, // step 3
            columns : [
            new Ext.grid.RowNumberer(),
            {
                header:'id',
                dataIndex:'id',
                hidden:true,
                width:100,
                sortable: true
            },{
                header:'Registros',
                dataIndex:'category',
                width:100,
                sortable: true
            },
            {
                header:'Tecnico',
                dataIndex:'user',
                width:100,
                sortable: true
            },{
                header:'Usuario Certificador',
                dataIndex:'user_test',
                width:100,
                sortable: true
            },{
                header:'description',
                dataIndex:'description',
                width:100,
                sortable: true,
                hidden:true
            },
            ],
            tbar  : [ '->','-',
            {
                text:"Eliminar",
                scope:this,
                handler:this.onDeletenode,
                iconCls:'deluser'
            },'-',
            ],

            bbar:pager,

            view: new Ext.grid.GroupingView({
                forceFit:true,
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Incidencias" : "Incidencia"]})'
            }),
            stripeRows  : true
        });
        listadonode=this.grid;
        listadonode.on('rowclick',function(Grid, rowIndex, e){
        filaseleccionadanode = rowIndex;
        });


        var win = new Ext.Window({
            title: 'Listado de Registros',
            minimizable: true,
            width:510,
            height:420,
            maximizable: true,
            items:[ this.grid]
        });
        win.show();
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse();
        });


    },
    onDeletenode:function(){
        var rows = listadonode.getSelectionModel().getSelections();
        if(rows.length === 0){
            return false;
        }
        this.store.remove(rows);
    },
    registros: function(){
        var win = new Ext.Window({
            title: 'Todos Los registros',
            width: 500,
            height:350,
            minimizable: true,
            maximizable: true,
            html: '<iframe src="../../registroshtml/registro1.htm" style="border: medium none ; width: 100%; height: 100%;"></iframe>'
        });
        win.show();

        //fire when the user clicks the minimize button
        win.on('minimize',function(w){
            console.debug('minimizando...');
            w.collapse(); //collapse the window
        });
    },
    countWords:  function(textarea){
        var value = textarea.getValue(); //get the string
        var wc = 0; // word counter

        if(!Ext.isEmpty(value)){ // if there is something in the textfield
            wc = value.match(/\b/g); //find the spaces
            wc = wc ? wc.length / 2 : 0; //count the words
        }

        this.words.setText(wc + ' words'); //print the counter on the status bar
    }   
}
Ext.onReady(com.quizzpot.tutorial.Principal.init,com.quizzpot.tutorial.Principal);