function Generalmes1Gestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;    
    this.Render = function(Panel){
        this.__data_store = App.BuildJsonStore('Generalmes.Generalmes.CargarDatoslugar',{
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
        var mes1es = new Ext.data.SimpleStore({
            fields: ['id', 'mes1'],
            data : [['1','Enero'],['2','Febrero'],
                ['3','Marzo'],['4','Abril'],
                ['5','Mayo'],['6','Junio'],
                ['7','Julio'],['8','Agosto'],
                ['9','Septiembre'],['10','Octubre'],
                ['11','Noviembre'],['12','Diciembre']]
        });
        var mes1 =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose State',
            queryMode: 'local',
            width:150,
            anchor: '100%',
            id:'mes1',
            name:'mes1',
            store:mes1es,
            displayField: 'mes1',
            valueField: 'id',
            hideLabel:true

        });
        var lugar1 =  Ext.create('Ext.form.ComboBox', {
            fieldLabel: 'Choose State',
            queryMode: 'local',
            width:275,
            anchor: '100%',
            id:'lugar1',
            name:'lugar1',
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
        var anno1 =  new Ext.form.field.Number({
            anchor: '100%',
            name: 'anno1',
            id: 'anno1',
            hideLabel:true,
            width:50,
            fieldLabel: 'Bottles of Beer',
            value:2014,
            maxValue: 2025,
            minValue: 2007
        });
        this._btn_add = Ext.create('Ext.Button',{
            text: 'Buscar',
            id: 'add_general',
            cls:'btn',
            tooltip : 'Adiciona  nuevo Tipo de cargo miltar',
            iconCls: 'system_search16',
            handler: Ext.Function.bind(this.Owner.Add, this.Owner, ['add'])
        });
        this._btn_del = Ext.create('Ext.Button',{
            text: 'Eliminar',
            id: 'del_general',
            tooltip : 'Eliminar  tipo de cargo miltar',
            iconCls: 'del_item',
            disabled: true,
            handler: Ext.Function.bind(this.Owner.deltect, this.Owner,['del'])
        });
        this._btn_mod = Ext.create('Ext.Button', {
            text: 'Imprimir',
            id: 'mod_general',
            tooltip : 'Modifica tipo de cargo miltar seleccionado',
            iconCls: 'document_print_frame16',
            cls:'btn',
            disabled: false,
            handler:function( This, eOpts){
                var mes1 = Ext.getCmp('mes1').getValue();
                var anno1 = Ext.getCmp('anno1').getValue();
                var lugar1 =  Ext.getCmp('lugar1').getValue();
                var mydd = This.up('grid').getStore();

                var max=0;
                var min1=0;

                var min=1000000000;
                var max1=0;
                var maxMP=0;
                var minMP=100000000;

                var cant=mydd.data.length;
                for(var i=0;i<cant;i++){
                   max +=  parseFloat(mydd.data.items[i].data.MaxP);
                   min1 +=  parseFloat(mydd.data.items[i].data.MinB);

                if( maxMP < parseFloat(mydd.data.items[i].data.MaxP))
                   {maxMP=parseFloat(mydd.data.items[i].data.MaxP);}

                if( minMP > parseFloat(mydd.data.items[i].data.MinP))
                    {minMP=parseFloat(mydd.data.items[i].data.MinP);}

                if( min > parseFloat(mydd.data.items[i].data.MinB))
                    {min=parseFloat(mydd.data.items[i].data.MinB);}

                if( max1 < parseFloat(mydd.data.items[i].data.MaxB))
                    {max1=parseFloat(mydd.data.items[i].data.MaxB);}
               }
                var mar= ((max/cant)+(min1/cant))/2;
               // console.log(mar);
                var title="Resumn de maera en : <b>"+lugar1+"</b><br>";
                var  html= "<div style='float:right'>Altura Maxima de Plenamar por mes: " +maxMP+" <br>" +
                           "Altura Minima de Plenamar por mes: " +minMP+ " <br>"+
                           "Altura Maxima de Bajamar por mes: " +max1+" <br>" +
                           "Altura Minima de Bajamar  por mes: " +min+ " <br>"+
                           "Nivel Medio por mes: " + mar +
                           "</div>" ;
                App.Print_Store_plus_HTML(title,mydd,html);
                //App.PrintData(mydd,null);

               }
        });
        this._btn_mod1 = Ext.create('Ext.Button', {
            text: 'Historial',
            id: 'mod1_general',
            tooltip : 'Modifica tipo de cargo miltar seleccionado',
            iconCls: 'view_history16',
            disabled: false,
            cls:'btn',
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
                            var url = "SubSystems/EMarinos/Generalmes/Server/jq_Generalmes.php?termino=info";
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
                                    { text: 'Fecha', datafield: 'fecha', width: 120 },
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
        this.panel=Ext.create('Ext.panel.Panel', {
            width: 340,
            height:180,
            padding:10,
            layout: 'anchor',
            items:[lugar1,mes1,anno1,this._btn_add,{html:'&nbsp;&nbsp;&nbsp;'},this._btn_mod1]
        });
        this.opc=Ext.create('Ext.button.Split',{
            text : 'Filtrado de Datos',
            cls:'btn btn-group',
            menu:[this.panel]
        });
        this.tool = Ext.create('Ext.toolbar.Toolbar', {
            items: [this.opc]
        });
        var tbar = Ext.getCmp('general_tbar_id');
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
App.RegisterFunction('Generalmes1Gestionar', new Generalmes1Gestionar());
    this.panel=null;
    this.panelupd=null;
    GeneralMes.prototype.OnShowWindow = function(_paccion){
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
    GeneralMes.prototype.OnShowWindow2 = function(_paccion){
        var _value_nom_oll = null;
        var id_tpo=null;
        var _selected_rcd = Ext.getCmp('Generalmes1_grid_id').getSelectionModel().getLastSelected();
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
    GeneralMes.prototype.Add = function(_paccion){
        var mes1 = Ext.getCmp('mes1').getValue();
        var anno1 = Ext.getCmp('anno1').getValue();
        var lugar1 =  Ext.getCmp('lugar1').getValue();
        var result = App.PerformSyncServerRequest('Generalmes.Generalmes.filter',{mes:mes1,anno:anno1,lugar:lugar1});
        Ext.getCmp('general_grid_id').store.loadData(result.rows);
    }
    GeneralMes.prototype.Modid = function(_paccion){
        _result = App.PerformSyncServerRequest('Generalmes1.Generalmes1.Modid',this.panel.getForm().getValues());
        this.__data_store.load({params:{start:0,limit:25}});
     }
    GeneralMes.prototype.deltect=function(_paccion){
        var _selected_rcd = Ext.getCmp('Generalmes1_grid_id').getSelectionModel().getLastSelected();
        var id = _selected_rcd.data.id;
        _result = App.PerformSyncServerRequest('Generalmes1.Generalmes1.Eliminar', {id: id});
        this.__data_store.load({params:{start:0,limit:25}});
    }