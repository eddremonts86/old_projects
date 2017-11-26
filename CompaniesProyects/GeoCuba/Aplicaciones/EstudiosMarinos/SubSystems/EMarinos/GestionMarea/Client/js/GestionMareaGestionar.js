function GestionMareaGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this.__data_store = App.BuildJsonStore('GestionMarea.GestionMarea.CargarDatoslugar',{
            fields: [
                {name: 'id'},
                {name: 'nombre'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: true
        });
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Buscar',
            id: 'add_GestionMarea_btn_id',
            tooltip : 'Buscar datos por pereodo',
            cls:'btn',
            iconCls: 'search_user16',
            handler: Ext.Function.bind(this.Owner.Add, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_GestionMarea_btn_id',
            tooltip : 'Eliminar  tipo de cargo miltar',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Guardar',
            id: 'mod_GestionMarea_btn_id',
            tooltip : 'Modifica tipo de cargo miltar seleccionado',
            iconCls: 'document_save16',
            cls:'btn',
            disabled: false,
            handler:function( This, eOpts){
                var mydd =new Array();
                _array = new Array();
                var mydd = This.up('grid').getStore().getModifiedRecords();
                if (mydd.length === 0)
                { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                else
                {
                    var mes = Ext.getCmp('mes').getValue();
                    var anno= Ext.getCmp('anno').getValue();
                    var lugar= Ext.getCmp('lugar').getValue();
                    if(mes!='' && anno !=''&& lugar !=''&& lugar !=''&& mes!=null && anno !=null){
                        for (var i = 0; i < mydd.length; i++){
                            _array.push(mydd[i].getData());
                        }
                        var fnCallBack = function(){
                            App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                            var _result = App.PerformSyncServerRequest('GestionMarea.GestionMarea.guardar_gen', {lugar:lugar,mes:mes,anno:anno,data: Ext.encode(_array)});
                            App.HideMsgBox();
                            if(_result)
                            {
                                This.up('grid').store.load();
                                App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                            }
                            else
                            {
                                This.up('grid').store.load();
                                App.InfoMessage('Información', 'Ocurrio un error');
                            }
                        }
                        App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');

                    }
                    else{
                        App.InfoMessage('Información', 'Debe seleccionar un Mes y Año antes de enviar estos datos.<br><b>Nota :</b> Esto solo sucede despues de buscar los datos en el periodo deseado.');
                    }
                }

            }

        });
        this._btn_mod1 = Ext.create('Ext.Button', {
            text: 'Historial',
            id: 'mod_GestionMarea_btn_id1',
            tooltip : 'Ver datos historicos',
            cls:'btn',
            iconCls: 'run_build16',
            disabled: false,
            handler:function(){
                Ext.create('Ext.window.Window', {
                    title: 'Historial de Mareas',
                    height: '95%',
                    width: '95%',
                    padding:10,
                    modal:'true',
                    layout: 'fit',
                    html:'<div id="prueba"></div>',
                    listeners:{
                        afterRender:function(){
                            var url = "SubSystems/EMarinos/GestionMarea/Server/jq_GestionMarea.php?termino=info";
                            var source ={
                                datatype: "json",
                                datafields: [
                                    {name: 'id'},
                                    {name: 'fecha'},
                                    {name: 'hora'},
                                    {name: 'altura'},
                                    {name: 'direccion'},
                                    {name: 'velocidad'},
                                    {name: 'lugar'}
                                ],
                                cache: false,
                                url: url,
                                filter: function()
                                {
                                    // update the grid and send a request to the server.
                                    $("#jqxgrid").jqxGrid('updatebounddata', 'filter');
                                },
                                sort: function()
                                {
                                    // update the grid and send a request to the server.
                                    $("#jqxgrid").jqxGrid('updatebounddata', 'sort');
                                },
                                root: 'Rows',
                                beforeprocessing: function(data)
                                {
                                    if (data != null)
                                    {
                                        source.totalrecords = data[0].TotalRows;
                                    }
                                }
                            };
                            var dataadapter = new $.jqx.dataAdapter(source, {
                                    loadError: function(xhr, status, error)
                                    {
                                        alert(error);
                                    }
                                });
                            $("#prueba").jqxGrid({
                                    width: '100%',
                                    height: '100%',
                                    source: dataadapter,
                                    groupable: true,
                                    filterable: true,
                                    editable: true,
                                    enabletooltips: true,
                                    sortable: true,
                                    theme:'metro',
                                    columns: [
                                    { text: 'lugar', datafield: 'lugar',columntype: 'textbox', width: 120 },
                                    { text: 'hora', datafield: 'hora', width: 120 },
                                    { text: 'Fecha', datafield: 'fecha', width: 250 },
                                    { text: 'altura', datafield: 'altura', width: 120 },
                                    { text: 'direccion', datafield: 'direccion' },
                                    { text: 'velocidad', datafield: 'velocidad', width: 120 }
                                ],
                                groups: ['lugar','fecha']
                                });
                        }
                    }
                }).show();
            }
        });

        var meses = new Ext.data.SimpleStore({
            fields: ['id', 'mes'],
            data : [['1','Enero'],['2','Febrero'],
                ['3','Marzo'],['4','Abril'],
                ['5','Mayo'],['6','Junio'],
                ['7','Julio'],['8','Agosto'],
                ['9','Septiembre'],['10','Octubre'],
                ['11','Noviembre'],['12','Diciembre']]
        });
        var mes =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose State',
            queryMode: 'local',
            width:150,
            anchor: '100%',
            id:'mes',
            name:'mes',
            store:meses,
            displayField: 'mes',
            valueField: 'id',
            hideLabel:true

        });
        var lugar =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose State',
            queryMode: 'local',
            width:275,
            anchor: '100%',
            id:'lugar',
            name:'lugar',
            store:this.__data_store,
            displayField: 'nombre',
            valueField: 'nombre',
            hideLabel:true,
            pageSize: 7,
            listConfig: {
                loadingText: 'Cargando...',
                emptyText: 'No existen datos.'
            }

        });
        var anno =  new Ext.form.field.Number({
            anchor: '100%',
            name: 'anno',
            id: 'anno',
            hideLabel:true,
            width:50,
            fieldLabel: 'Bottles of Beer',
            value:2014,
            maxValue: 2025,
            minValue: 2007
        });

        this.panel=Ext.create('Ext.panel.Panel', {
            width: 340,
            height:180,
            padding:10,
            layout: 'anchor',
            items:[lugar,mes,anno,this._btn_add,{html:'<br>'},this._btn_mod1]
        });
        this.opc=Ext.create('Ext.button.Split',{
            text : 'Filtrado de Datos',
            cls:'btn btn-group',
            menu:[this.panel]
        });
        this.tool = Ext.create('Ext.toolbar.Toolbar', {
            items: [this.opc]
        });

        var tbar = Ext.getCmp('GestionMarea_tbar_id');
        tbar.add(this.tool );
        tbar.add(this._btn_mod);

    }
    this.Enable = function(){
        this._btn_mod.enable();
        this._btn_del.enable();
    }
    this.Disable = function(){
        this._btn_mod.disable();
        this._btn_del.disable();
    }
}
App.RegisterFunction('GestionMareaGestionar', new GestionMareaGestionar());
this.panel=null;
this.panelupd=null;
GestionMarea.prototype.OnShowWindow = function(_paccion){
    var _value_nom = null;
    if(_paccion == 'add')
    {
        var states_tipo = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"name":"Eventos"},
                {"name":"Informacion general"},
                {"name":"Regulaciones"}
            ]
        });
        var tipo = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Tipo de acción',
            store: states_tipo,
            id:'tipo',
            name:'tipo',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'name'
        });
        var states_caracter = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data : [
                {"name":"Urgente"},
                {"name":"Importante"},
                {"name":"Nuevo"}
            ]
        });
        var caracter = Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Caracter',
            store: states_caracter,
            queryMode: 'local',
            id:'caracter',
            name:'caracter',
            displayField: 'name',
            valueField: 'name'
        });
        this.panel = Ext.create('Ext.form.Panel', {
            bodyPadding: 5,
            width: 350,
            layout: 'anchor',
            id:'panel',
            defaults: {
                anchor: '90%'
            },
            defaultType: 'textfield',
            items: [
                {
                fieldLabel: 'Nombre',
                name: 'Nombre',
                id:'Nombre',
                allowBlank: false,
                maxLength: 255
                },
                caracter,tipo,
                {
                    fieldLabel: 'Resumen',
                    name: 'titulo',
                    id:'titulo',
                    allowBlank: false,
                    maxLength: 255
                },
                {   xtype:'textarea',
                    fieldLabel: 'Cuerpo',
                    name: 'Cuerpo',
                    id:'Cuerpo',
                    height:120,
                    allowBlank: false,
                    maxLength: 255
                }
            ]
        });
        var _gst_win = new Ext.Window(
            {
                title:'Nuevo tipo de cargo miltar',
                id: '_gst_Add_win_id',
                height: '50%',
                width: '50%',
                plain: true,
                layout: 'fit',
                modal: true,
                resizable: false,
                items: [this.panel],
                buttons: [{
                    text: 'Aceptar',
                    handler: Ext.Function.bind(this.Add, this, [_paccion]),
                    scope: this
                }, {
                    text: 'Cancelar',
                    handler: function(){
                        _gst_win.close();
                    }
                }],
                listeners: {
                    'show': function(This, eOpts) {
                        Ext.getCmp('nombre_id').focus(true, true);
                    }
                }
            });

        _gst_win.show();
    }

    else
        Ext.Msg.alert('Atención', 'Acción no definida');
}
GestionMarea.prototype.OnShowWindow2 = function(_paccion){
    var _value_nom_oll = null;
    var id_tpo=null;
    var _selected_rcd = Ext.getCmp('GestionMarea_grid_id').getSelectionModel().getLastSelected();
    _value_nom_oll=_selected_rcd.data.nombre;
    id_tpo=_selected_rcd.data.id;

    var titulo=_selected_rcd.data.titulo;
    var tipo=_selected_rcd.data.tipo;
    var cuerpo=_selected_rcd.data.cuerpo;
    var caracter=_selected_rcd.data.caracter;


    if(_paccion == 'upd')
     {

         var states_tipo = Ext.create('Ext.data.Store', {
             fields: ['abbr', 'name'],
             data : [
                 {"name":"Eventos"},
                 {"name":"Informacion general"},
                 {"name":"Regulaciones"}
             ]
         });
         var tipo = Ext.create('Ext.form.ComboBox', {
             fieldLabel: 'Tipo de acción',
             store: states_tipo,
             id:'tipo',
             name:'tipo',
             queryMode: 'local',
             displayField: 'name',
             valueField: 'name',
             value:tipo
         });
         var states_caracter = Ext.create('Ext.data.Store', {
             fields: ['abbr', 'name'],
             data : [
                 {"name":"Urgente"},
                 {"name":"Importante"},
                 {"name":"Nuevo"}
             ]
         });
         var caracter = Ext.create('Ext.form.ComboBox', {
             fieldLabel: 'Caracter',
             store: states_caracter,
             queryMode: 'local',
             id:'caracter',
             name:'caracter',
             displayField: 'name',
             valueField: 'name',
             value:caracter
         });
         this.panel = Ext.create('Ext.form.Panel', {
             bodyPadding: 5,
             width: 350,
             layout: 'anchor',
             id:'panel',
             defaults: {
                 anchor: '90%'
             },
             defaultType: 'textfield',
             items: [
                 {
                     fieldLabel: 'Nombre',
                     name: 'Nombre',
                     id:'Nombre',
                     allowBlank: false,
                     maxLength: 255,
                     value:_value_nom_oll
                 },
                 {
                     fieldLabel: 'id_tpo',
                     name: 'id_tpo',
                     id:'id_tpo',
                     hidden:true,
                     allowBlank: false,
                     maxLength: 255,
                     value:id_tpo
                 },
                 caracter,tipo,
                 {
                     fieldLabel: 'Resumen',
                     name: 'titulo',
                     id:'titulo',
                     allowBlank: false,
                     maxLength: 255,
                     value:titulo
                 },
                 {   xtype:'textarea',
                     fieldLabel: 'Cuerpo',
                     name: 'Cuerpo',
                     id:'Cuerpo',
                     height:170,
                     allowBlank: false,
                     maxLength: 10000,
                     value:cuerpo

                 }
             ]
         });
         var _gst_win = new Ext.Window(
             {
                 title:'Modificar tipo de cargo miltar',
                 id: '_gst_Udt_win_id',
                 height: 400,
                 width: 460,
                 plain: true,
                 layout: 'fit',
                 modal: true,
                 resizable: false,
                 items: [this.panel],
                 buttons: [{
                     text: 'Aceptar',
                     handler: Ext.Function.bind(this.Modid, this, [_paccion]),
                     scope: this
                 }, {
                     text: 'Cancelar',
                     handler: function(){
                         _gst_win.close();
                     }
                 }],
                 listeners: {
                     'show': function(This, eOpts) {
                         Ext.getCmp('Nombre').focus(true, true);
                     }
                 }
             });

         _gst_win.show();

     }
     else
         Ext.Msg.alert('Atención', 'Acción no definida');
 }
GestionMarea.prototype.Add = function(_paccion){
    var mes = Ext.getCmp('mes').getValue();
    var anno = Ext.getCmp('anno').getValue();
    var lugar =  Ext.getCmp('lugar').getValue();
    var result = App.PerformSyncServerRequest('GestionMarea.GestionMarea.filter',{mes:mes,anno:anno,lugar:lugar});
    Ext.getCmp('grid_ext').store.loadData(result.rows);
}
GestionMarea.prototype.Modid = function(_paccion){
    _result = App.PerformSyncServerRequest('GestionMarea.GestionMarea.Modid',this.panel.getForm().getValues());
    this.__data_store.load({params:{start:0,limit:25}});


}
GestionMarea.prototype.deltect=function(_paccion){
    var _selected_rcd = Ext.getCmp('GestionMarea_grid_id').getSelectionModel().getLastSelected();
    var id = _selected_rcd.data.id;
    _result = App.PerformSyncServerRequest('GestionMarea.GestionMarea.Eliminar', {id: id});
    this.__data_store.load({params:{start:0,limit:25}});
}