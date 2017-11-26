function Profesiogramas(){
    this.__data_store = null;
    this.descripcion=null
    this.cadena =null;
    this.panelGeneral=null;
    this.panel = null;
    this.Init = function()
    {
        var _menu_item_config_Profesiogramas =
        {
            text: 'Profesiogramas',
            id: 'Profesiogramas_menu_id',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Plantilla', _menu_item_config_Profesiogramas);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj){
        this.__data_store = App.BuildJsonStore('Profesiogramas.Profesiogramas.CargarDatos',{
            fields: [
                {name: 'compuesto'},
                {name: 'cuadro'},
                {name: 'resrva'},
                {name: 'area'},
                {name: 'agencia'},
                {name: 'director_area'},
                {name: 'director_unidad'},
                {name: 'director_general'},
                {name: 'contrato_tipo'},
                {name: 'equi_util_herram'},
                {name: 'requisitos'},
                {name: 'condiciones'},
                {name: 'competencia'},
                {name: 'funciones'},
                {name: 'autoidad'},
                {name: 'responsabilidad'},
                {name: 'cargo'},
                {name: 'pago_adicion',type:'int'},
                {name: 'salario',type:'int'},
                {name: 'escala'},
                {name: 'nivel'},
                {name: 'ocupacional'},
                {name: 'classif'},
                {name: 'nombre_completo'},
                {name: 'foto'},
                {name: 'especialidad'},
                {name: 'ontrato_id'},
                {name: 'cargoid'},
                {name: 'plantilla_id'} ,
                {name: 'gradocientifico'},
                {name: 'esperiencia_profecional'},
                {name: 'responsabilidad'},
                {name: 'impacto'}

            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
        });
        this.__data_store_historial = App.BuildJsonStore('Profesiogramas.Profesiogramas.CargarDatos',{
            fields: [
                {name: 'contrato_id'},
                {name: 'fecha'},
                {name: 'profeciograma'},
                {name: 'id'}
            ],
            proxy: {
                type: 'ajax',
                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
            },
            autoLoad: false
        });
        var _grid = new Ext.grid.Panel({
            id: 'Profesiogramas_grid_id',
            region: "east",
            frame: true,
            store: this.__data_store,
            enableLocking: true,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Nombre", flex: 1, dataIndex: 'compuesto'},
                {text: "nombre_completo",hidden:true,flex: 1, dataIndex: 'nombre_completo'}
            ],
            viewConfig: {forceFit: true},
            bbar:[ {
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            },
                '->',
                {
                    xtype: 'button',
                    //text : 'Ayuda',
                    iconCls:'help',
                    handler:function(){
                        Ext.create('Ext.window.Window', {
                            title: '¿Necesita Ayuda?',
                            height:'35%',
                            width:'50%',
                            iconCls:'help',modal:true,
                            autoScroll:true,
                            layout: 'anchor',
                            html:
                                '<ul class="nav nav-list">' +
                                    '<li>El modulo <span class="label label-info">" Gestionar Resolución"</span>' +
                                    ' le permite gestionar los Profesiogramas,decretos o normativas referente a todas las operaciones que se realizan en la empresa.<br>  ' +
                                    '<span class="label label-success">Debe saber que :</span><br>' +
                                    'Estos son documentos oficiales de car&aacute;cter obligatorio que deben dominarse y tener a buen recaudo.<br>'+
                                    '<span class="label label-important">Nota:</span> ' +
                                    '<br> Adem&aacute;s de visualizar los documentos se pueden descargar con solo doble click sobre el documento deseado.' +
                                    '</li>' +
                                    '</ul>'

                        }).show();
                    }
                }],
            listeners: {
                selectionchange: {
                    fn: function(View, selections, options) {
                        if(selections.length == 0)
                        {this.Disable('Profesiogramas');}
                        else{this.Enable('Profesiogramas');}
                    },
                    scope: this
                },
                itemclick:{
                    fn:function(){
                        Ext.getCmp('save').show();
                        Ext.getCmp('print').hide();
                        Ext.getCmp('plus').hide();
                        Ext.getCmp('minus').hide();
                        var _selected_rcd = Ext.getCmp('Profesiogramas_grid_id').getSelectionModel().getLastSelected();
                        var  cargo =_selected_rcd.data.cargo;
                        var  ocupacional =_selected_rcd.data.ocupacional;
                        var  escala =_selected_rcd.data.escala;
                        var  salario =_selected_rcd.data.salario;
                        var  pago_adicion =_selected_rcd.data.pago_adicion;
                        var  nombre_completo =_selected_rcd.data.nombre_completo;
                        var  area =_selected_rcd.data.area;
                        var  agencia =_selected_rcd.data.agencia;
                        var  nivel =_selected_rcd.data.nivel;
                        var  pago_adicion =_selected_rcd.data.pago_adicion;
                        var  gradocientifico =_selected_rcd.data.gradocientifico;
                        var  esperiencia_profecional =_selected_rcd.data.esperiencia_profecional;
                        var  responsabilidad =_selected_rcd.data.responsabilidad;
                        var  autoidad =_selected_rcd.data.autoidad;
                        var  funciones =_selected_rcd.data.funciones;
                        var  impacto =_selected_rcd.data.impacto;
                        var  contrato =_selected_rcd.data.ontrato_id;
                        var total= (pago_adicion + salario);
                        function img(foto){
                            if(foto ==''||foto ==null){
                                return '<img width="150px" height="150px" src="App/Client/img/logo/user3.png"/>'}
                            else{
                                return '<img width="150px" height="150px" src="data:image/png;base64,'+ foto +'"/>'}
                        };
                        var arara=new Array();
                        var arara1=new Array();
                        var bien=new Array();
                        var mal=new Array();
                        var Necesidades = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.Necesidades',{info:contrato,start:0,limit:25});
                        var cualidades = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.cualidades',{info:contrato,start:0,limit:25});
                        for (var e = 0; e <Necesidades.results; e++)
                        {
                            if(Necesidades.results <= 0){
                                var xhtml = '<tr>'+
                                    '<td colspan="2">&nbsp;</td>'+
                                    '<td colspan="2">&nbsp;</td>'+
                                    '<td colspan="1">&nbsp;</td>'+
                                    '<td colspan="1">&nbsp;</td>'+
                                    '<td colspan="2">&nbsp;</td>'+
                                    '</tr>' + '';

                            }
                            else{
                                console.log(Necesidades.rows[e]);
                           var xhtml = '<tr>'+
                                   '<td colspan="2">'+ Necesidades.rows[e]['necesidades'] +'</td>'+
                                   '<td colspan="2">'+ Necesidades.rows[e]['acciones'] +'</td>'+
                                   '<td colspan="1">'+ Necesidades.rows[e]['inicio'] +'</td>'+
                                   '<td colspan="1">'+ Necesidades.rows[e]['terminacion'] +'</td>'+
                                   '<td colspan="2">'+ Necesidades.rows[e]['lugar'] +'</td>'+
                                   '</tr>' + '';
                            }
                            arara[e] = xhtml;
                       }
                        var i=0;
                        var a=0;
                        for (var e = 0; e < cualidades.results; e++)
                        {
                            if(cualidades.rows[e]['tipo']=='Cualidad'){bien[i]=cualidades.rows[e]['nombre'];i++;}
                            else{mal[a]=cualidades.rows[e]['nombre'];a++;}
                        }
                        var max =Math.max(mal.length,bien.length);
                        var bien_td, mal_td;
                        for (var i = 0; i <max; i++)
                        {
                            bien_td = (i < bien.length) ? ('<td colspan="4">' + bien[i] + '</td>') : ('<td colspan="4">&nbsp;</td>');
                            mal_td = (i < mal.length) ? ('<td colspan="4">' + mal[i] + '</td>') : ('<td colspan="4">&nbsp;</td>');
                            arara1[i] = '<tr>' + bien_td + mal_td +'</tr>';
                        }

                       var html='<div id="cart" width="80%" height="80%" style="padding: 5px">'+
                            '<div class="ui-widget-content">'+
                            '<table width="98%" height="98%" border="0" id="profciograma" class="table table-bordered table-hover">'+
                            '<tr><td colspan="5" class="btn-info"><b>PROFESIOGRAMA:</b> '+nombre_completo+'</td></tr>'+
                            '<tr>'+
                            '<td height="50" colspan="4">1. PROFESIÓN O CARGO: '+ cargo +' </td>'+
                            '<td height="100" rowspan="2">'+img(_selected_rcd.data.foto)+'</td>'+
                            '</tr>'+

                            '<tr>'+
                            '<td height="50"colspan="4">2. CATEGORÍA OCUPACIONAL: '+ ocupacional+' </td>'+
                            '</tr>'+

                            '<tr>'+
                            '<td width="25%" height="25">3. GRUPO ESCALA:</td>'+
                            '<td width="25%">Salario Escala:</td>'+
                            '<td width="25%">Pago Adicional:</td>'+
                            '<td colspan="2"> Salario Total:</td>'+
                            '</tr>'+

                            '<tr>'+
                            '<td width="25%" height="25">'+ escala+'</td>'+
                            '<td width="25%">'+ salario+'</td>'+
                            '<td width="25%">'+ pago_adicion+' </td>'+
                            '<td colspan="2">'+ total+'</td>'+
                            '</tr>'+

                            '<tr>'+
                            '<td height="27" colspan="5">4. PUESTO DE TRABAJO: '+area+'</td>'+
                            '</tr>'+
                            '<tr><td height="27" colspan="5">5. UNIDAD ORGANIZATIVA A LA QUE PERTENECE: '+agencia+'</td></tr>'+
                            '<tr><td height="27" colspan="5">6. CALIFICACIÓN FORMAL: '+nivel+ '</td></tr>'+
                            '<tr><td height="27" colspan="5">NIVEL PROFESIONAL: '+gradocientifico+'</td></tr>'+
                            '<tr><td height="27" colspan="5">7. EXPERIENCIA PROFESIONAL:<br> '+esperiencia_profecional+'</td>' +
                            '</tr>'+

                            '<tr>' +
                            '<td height="27" colspan="5" >8. FUNCIONES ESPECÍFICAS (DESCRIPCIÓN DEL CONTENIDO DE TRABAJO)<br>'+funciones+'</td>' +
                            '</tr> '+

                            '<tr>' +
                            '<td height="27" colspan="5">9. RESPONSABILIDAD Y AUTORIDAD:</td>' +
                            '</tr> '+

                            '<tr>' +
                            '<td height="27" colspan="5">9.1 Responsabilidad:<br>'+responsabilidad+'</td>' +
                            '</tr> '+

                            '<tr>' +
                            '<td height="27" colspan="5">9.2 Autoridad:<br>'+autoidad+'</td>' +
                            '</tr> '+



                            /*----------------------------Impacto Medio Anviental-------------------------------------*/
                            '</table>'+
                       '<hr>'+
                            '<div id="efecto">'+impacto+'</div>'+
                       '<hr>'+


                           /*----------------------------Evaluacion--------------------------------------------------------*/
                            '<section contenteditable="true">'+
                            '<table width="98%" height="98%" id="evaluacions" border="0" class="table table-bordered table-hover">'+
                            '<tr>'+
                            '<td height="23" colspan="7" class="btn-info"><strong>EVALUACIÓN DEL DESEMPEÑO ANUAL</strong></td>'+
                            '<td colspan="1"><div align="right"><strong>RG 02-07-01</strong></div></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="23" colspan="8"><strong>CLASIFICACIÓN DE LOS RESULTADOS EVALUATIVOS</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td width="11%" height="68"><div align="center"><strong>CANTIDAD PUNTOS</strong></div></td>'+
                            '<td width="14%"><div align="center"><strong>EVALUACIÓN DESEMPEÑO</strong></div></td>'+
                            '<td width="14%"><div align="center"><strong>EVALUACIÓN RECIBIDA</strong></div></td>'+
                            '<td width="16%"><div align="center"><strong>COMPONENTES DE LAS COMPETENCIAS</strong></div></td>'+
                            '<td width="11%"><div align="center"><strong>Mínimo</strong></div></td>'+
                            '<td width="12%"><div align="center"><strong>Obtenido</strong></div></td>'+
                            '<td colspan="2"><div align="center"><strong>Competente</strong></div></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="25"><div align="center"><strong>De</strong> 0 <strong>a </strong>69</div></td>'+
                            '<td><div align="center">Deficiente</div></td>'+
                            '<td rowspan="4"><div align="center"></div></td>'+
                            '<td><div align="center"><strong>SABER</strong></div></td>'+
                            '<td>&nbsp;</td>'+
                            '<td>&nbsp;</td>'+
                            '<td width="11%">SI</td>'+
                            '<td width="11%">NO</td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td rowspan="2"><div align="center"><strong>De </strong>70<strong> a</strong> 89</div></td>'+
                            '<td rowspan="2"><div align="center">Adecuado</div></td>'+
                            '<td height="23"><div align="center"><strong>SABER HACER</strong></div></td>'+
                            '<td>&nbsp;</td>'+
                            '<td>&nbsp;</td>'+
                            '<td rowspan="3">&nbsp;</td>'+
                            '<td rowspan="3">&nbsp;</td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="23"><div align="center"><strong>SABER ESTAR</strong></div></td>'+
                            '<td>&nbsp;</td>'+
                            '<td>&nbsp;</td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="23"><div align="center"><strong>De</strong> 90 <strong>a</strong> 100</div></td>'+
                            '<td><div align="center">Superior</div></td>'+
                            '<td><div align="center"><strong>TOTAL</strong></div></td>'+
                            '<td>&nbsp;</td>'+
                            '<td>&nbsp;</td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="23" colspan="8"> <strong>Nota:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="23" colspan="8"><strong>1. Fundamentar los elementos que resultaron evaluados como nivel medio o bajo en función    del valor definido en el estado deseado.</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="23" colspan="8"><strong>1.1 Fundamentación expl&iacute;cita de los indicadores:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td height="23" colspan="8"><p><br>'+
                            '</p></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="8"><strong>2. Cualidades y/o Deficiencias mas significativas que influyen en el rendimiento del trabajador:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="4"><strong>Cualidades</strong></td>'+
                            '<td colspan="4"><strong>Deficiencias</strong></td>'+
                           '</tr>' +
                           arara1+
                            '<tr>'+
                            '<td colspan="8"><strong>3. Señalamientos en evaluaciones anteriores:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="8">&nbsp;</td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="8"><strong>4. Acciones derivadas de los resultados de la evaluación del desempeño referidas a la:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="2"><strong>4.1 Formación y Desarrollo:</strong></td>'+
                            '<td colspan="2"><strong>Nivel requerido para el cargo:</strong></td>'+
                            '<td colspan="2"><strong>Si:</strong></td>'+
                            '<td colspan="2"><strong>No:</strong></td>'+
                            '</tr><tr>' +
                            '<div id="nececidades">'+
                                '<td colspan="2"><strong>Necesidades de aprendizaje:</strong></td>'+
                                '<td colspan="2"><strong>Acciones que se proponen ejecutar:</strong></td>'+
                                '<td colspan="1"><strong>Fecha Inicio</strong></td>'+
                                '<td colspan="1"><strong>Fecha Terminación</strong></td>'+
                                '<td colspan="2"><strong>Lugar que se propone desarrollar la acción</strong></td>'+
                                '</tr>' +
                                arara
                                +
                            '</div>'+
                            '<tr>' +
                            '<td colspan="8"><strong>4.2 Selección del trabajador:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="6"><strong>Promoción:</strong></td>'+
                            '<td colspan="1"><strong>Si</strong></td>'+
                            '<td colspan="1"><strong>No</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="8"><strong>Acciones a desarrollar: </strong> </td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="6"><strong>5. Revocación o Confirmación de la Idoneidad Real Demostrada para el cargo:</strong></td>'+
                            '<td colspan="1"><strong>Si</strong></td>'+
                            '<td colspan="1"><strong>No</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="8"><strong>6. Comentarios del evaluado:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="2"><strong>Conforme:</strong></td>'+
                            '<td colspan="4"><strong>Nombre y Cargo:</strong></td>'+
                            '<td colspan="2"><strong>Firma:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="2"><strong>Aprobado por:</strong></td>'+
                            '<td colspan="4"><strong>Nombre y Cargo:</strong></td>'+
                            '<td colspan="2"><strong>Firma:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="2"><strong>No Conforme:</strong></td>'+
                            '<td colspan="4"><strong>Nombre yCargo:</strong></td>'+
                            '<td colspan="2"><strong>Firma:</strong></td>'+
                           '</tr>' +
                            '<tr>'+
                            '<td colspan="2"><strong>Resultado de la Revisión:<br> Revisado por:</strong></td>'+
                            '<td colspan="4"><strong>Nombre y Cargo:</strong></td>'+
                            '<td colspan="2"><strong>Firma:</strong></td>'+
                            '</tr>'+
                            '</table>'+
                            '</div>'+
                            '</section>'+
                            '</div>'


                        this.__data_store_nes= App.BuildJsonStore('Profesiogramas.Profesiogramas.Necesidades',{
                            fields: [
                                {name: 'id'},
                                {name: 'necesidades'},
                                {name: 'acciones'},
                                {name: 'inicio'},
                                {name: 'lugar'},
                                {name: 'contrato_id'},
                                {name: 'terminacion'}
                            ],
                            proxy: {
                                type: 'ajax',
                                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                            },
                            params: {info: contrato,start:0,limit:25},
                            sorters: {property: 'necesidades', direction: 'DESC'},
                            autoLoad: true
                        });
                        this.__data_store_cualidades= App.BuildJsonStore('Profesiogramas.Profesiogramas.cualidades',{
                            fields: [
                                {name: 'id'},
                                {name: 'nombre'},
                                {name: 'contrato_id'},
                                {name: 'tipo'}
                            ],
                            proxy: {
                                type: 'ajax',
                                reader: {type: 'json',root: 'rows',totalProperty: 'results'}
                            },
                            params: {info: contrato,start:0,limit:25},
                            sorters: {property: 'nombre', direction: 'DESC'},
                            autoLoad: true
                        });
                        var nesecidad =    Ext.create('Ext.grid.Panel', {
                            title:'Necesidades de Aprendizaje del Trabajador',
                            id:'adicionar_neccidad_grid',
                            name:'adicionar_neccidad_grid',
                            store:  this.__data_store_nes,
                            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                            columns: [
                                { text: 'Necesidad de Aprendizaje',  dataIndex: 'necesidades', flex: 3,editor: {allowBlank: false} },
                                { text: 'id_contrato',  dataIndex: 'contrato_id', flex: 1,hidden:true  },
                                { text: 'Acciones ', dataIndex: 'acciones', flex: 2,editor: {allowBlank: false} },
                                { text: 'Fecha Inicio', dataIndex: 'inicio', flex: 1, editor:{
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'From',
                                    name: 'from_date'
                                }  },
                                { text: 'Fecha Terminación	', dataIndex: 'terminacion' , flex: 1,
                                    editor:{
                                        xtype: 'datefield',
                                        anchor: '100%',
                                        fieldLabel: 'From',
                                        name: 'from_date'
                                    }},
                                { text: 'Lugar ', dataIndex: 'lugar' , flex: 2,editor: {allowBlank: false} }
                                ],
                        bbar:{
                            id:'Plan_tbar_id',
                            height: 28,
                            items: [
                                {
                                    xtype: 'pagingtoolbar',
                                    pageSize: 10,
                                    store:this.__data_store_nes,
                                    displayInfo: true,
                                    plugins: new Ext.ux.ProgressBarPager()
                                },
                                ('->'),                                
                                {
                                    text: 'Adicionar',
                                    id: 'adicionar_neccidad',
                                    name: 'adicionar_neccidad',
                                    tooltip : 'Adiciona una  nueva necesidad',
                                    iconCls: 'add',
                                    xtype:'button',
                                    cls:'btn',
                                    listeners:{
                                        click:function( This, eOpts ){
                                            Ext.define('FILA',{
                                                extend: 'Ext.data.Model',
                                                fields: [
                                                    {name: 'id'},
                                                    {name: 'necesidades'},
                                                    {name: 'acciones'},
                                                    {name: 'inicio'},
                                                    {name: 'lugar'},
                                                    {name: 'contrato_id'},
                                                    {name: 'terminacion'}

                                                ]
                                            });
                                            var record = new FILA({necesidades:'',acciones:'',lugar:'',contrato_id:contrato,inicio:'',terminacion : ''});
                                            This.up('grid').getStore().add(record);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls:'btn',
                                    id: 'guardar_neccidad',
                                    name: 'guardar_neccidad',
                                    iconCls: 'save',
                                    text : 'Guardar Información',
                                    handler:function( This, eOpts){
                                        var mydd =new Array();
                                        _array = new Array();
                                        var mydd = This.up('grid').getStore().getModifiedRecords();
                                        if (mydd.length === 0)
                                        { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                                        else
                                        {
                                            for (var i = 0; i < mydd.length; i++)
                                            {
                                                _array.push(mydd[i].getData());
                                            }
                                            var fnCallBack = function()   {
                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                var _result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.AddNesc', {data: Ext.encode(_array)});
                                                App.HideMsgBox();
                                                if(_result)
                                                {
                                                    Ext.getCmp('adicionar_neccidad_grid').getStore().load({info: contrato,start:0,limit:25});
                                                    App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                }
                                                else
                                                {
                                                    Ext.getCmp('adicionar_neccidad_grid').getStore().load({info: contrato,start:0,limit:25})
                                                    App.InfoMessage('Información', 'Ocurri&oacute; un error');
                                                }
                                            }
                                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                        }


                                    }
                                },
                                {
                                    text: 'Eliminar',
                                    id: 'Eliminar_neccidad',
                                    name: 'Eliminar_neccidad',
                                    tooltip : 'Eliminar una fila',
                                    iconCls: 'del_item',
                                    xtype:'button',
                                    cls:'btn',
                                    handler:function(This){
                                        var _selectionModel = This.up('grid').getSelectionModel();
                                        var _selected_rcd = _selectionModel.getLastSelected();
                                        var id = _selected_rcd.data.id;
                                        var record = _selected_rcd ;
                                        if(id == null || id==''){
                                            This.up('grid').store.remove(record);}
                                        else{
                                            var fnCallBack = function()   {
                                                App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                var _result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.EliminarNecs', {id:id});
                                                App.HideMsgBox();
                                                if(_result)
                                                {
                                                    This.up('grid').store.remove(record);
                                                    App.InfoMessage('Información', 'Ha eliminado una acción del cap&iacute;tulo <b></b>');
                                                }
                                                else
                                                {
                                                    Ext.getCmp('adicionar_neccidad_grid').getStore().load({info: contrato,start:0,limit:25})
                                                    App.InfoMessage('Información', 'Ocurri&oacute; un error');
                                                }
                                            }
                                            App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');




                                        }
                                    }
                                }
                            ]
                        }
                        });
                        var cualid = Ext.create('Ext.data.Store', {
                            fields:['name'],
                            data:{'items':[
                                { 'name': 'Cualidad'},
                                { 'name': 'Deficiencia'}
                            ]},
                            proxy: {
                                type: 'memory',
                                reader: {
                                    type: 'json',
                                    root: 'items'
                                }
                            }
                        });
                        var cualidades =   Ext.create('Ext.grid.Panel', {
                            title:'Cualidades o Deficiencias del Trabajador',
                            id:'cualidades_grid',
                            name:'cualidades_grid',
                            store:  this.__data_store_cualidades,
                            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {clicksToEdit: 1 })],
                            columns: [
                                { text: 'id_contrato',  dataIndex: 'contrato_id',hidden:true },
                                { text: 'Nombre', dataIndex: 'nombre', flex: 1,editor: {allowBlank: false}},
                                { text: 'Tipo', dataIndex: 'tipo', flex: 1,editor: new Ext.form.field.ComboBox({
                                    triggerAction: 'all',
                                    queryMode:'local',
                                    store: cualid,
                                    displayField: 'name',
                                    valueField: 'name'
                                })}
                            ],
                            bbar:{
                                id:'Plan_tbar_id_ww',
                                height: 28,
                                items: [
                                    {
                                        xtype: 'pagingtoolbar',
                                        pageSize: 25,
                                        store:this.__data_store_cualidades,
                                        displayInfo: true,
                                        plugins: new Ext.ux.ProgressBarPager()
                                    },
                                    ('->'),
                                    {
                                        xtype: 'button',
                                        //text : 'Ayuda',
                                        iconCls:'help',
                                        handler:function(){
                                            Ext.create('Ext.window.Window', {
                                                title: '¿Necesita Ayuda?',
                                                height:'25%',
                                                width:'55%',
                                                iconCls:'help',modal:true,
                                                autoScroll:true,
                                                layout: 'anchor',
                                                html:
                                                    '<ul class="nav nav-list">' +
                                                        '<li>El m&oacute;dulo <span class="label label-info">" Clacificaci&oacute;n Cient&iacute;fica"</span>' +
                                                        ' le permite gestionar las clacificaci&oacute;n cient&iacute;fica de los trabajadores.<br>' +
                                                        '</li>' +
                                                        '</ul>'

                                            }).show();
                                        }
                                    },
                                    {
                                        text: 'Adicionar',
                                        id: 'boton-4',
                                        name: 'boton-5',
                                        tooltip : 'Adiciona un  nuevo Clasificaci&oacute;n Cient&iacute;fica',
                                        iconCls: 'add',
                                        xtype:'button',
                                        cls:'btn',
                                        listeners:{
                                            click:function( This, eOpts ){
                                                Ext.define('FILA',{
                                                    extend: 'Ext.data.Model',
                                                    fields: [
                                                        {name: 'id'},
                                                        {name: 'nombre'},
                                                        {name: 'tipo'},
                                                        {name: 'contrato_id'}
                                                    ]
                                                });
                                                var record = new FILA({nombre:'',contrato_id:contrato,tipo:''});
                                                This.up('grid').getStore().add(record);
                                            }
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls:'btn',
                                        id: 'boton_guardar0',
                                        name: 'boton_guardar0',
                                        iconCls: 'save',
                                        text : 'Guardar Información',
                                        handler:function( This, eOpts){
                                            var mydd =new Array();
                                            _array = new Array();
                                            var mydd = This.up('grid').getStore().getModifiedRecords();
                                            if (mydd.length === 0)
                                            { App.InfoMessage('Información', 'No ha modificado fila alguna');}
                                            else
                                            {
                                                for (var i = 0; i < mydd.length; i++)
                                                {
                                                    _array.push(mydd[i].getData());
                                                }
                                                var fnCallBack = function()   {
                                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                    var _result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.AddCual', {data: Ext.encode(_array)});
                                                    App.HideMsgBox();
                                                    if(_result)
                                                    {
                                                        Ext.getCmp('cualidades_grid').getStore().load({info: contrato,start:0,limit:25})
                                                        App.InfoMessage('Información', 'Evento adicionado satisfactoriamente');
                                                    }
                                                    else
                                                    {
                                                        Ext.getCmp('cualidades_grid').getStore().load({info: contrato,start:0,limit:25})
                                                        App.InfoMessage('Información', 'Ocurrio un error');
                                                    }
                                                }
                                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea almacenar los datos?');
                                            }


                                        }
                                    },
                                    {
                                        text: 'Eliminar',
                                        id: 'Eliminar9',
                                        name: 'Eliminar8',
                                        tooltip : 'Eliminar una fila',
                                        iconCls: 'del_item',
                                        xtype:'button',
                                        cls:'btn',
                                        handler:function(This){
                                            var _selectionModel = This.up('grid').getSelectionModel();
                                            var _selected_rcd = _selectionModel.getLastSelected();
                                            var id = _selected_rcd.data.id;
                                            var record = _selected_rcd ;
                                            if(id == null || id==''){
                                                This.up('grid').store.remove(record);}
                                            else{
                                                var fnCallBack = function()   {
                                                    App.ShowMsgBox(Ext.Msg.wait('Por favor, espere un momento', 'Procesando...'));
                                                    var _result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.EliminarCual', {id:id});
                                                    App.HideMsgBox();
                                                    if(_result)
                                                    {
                                                        This.up('grid').store.remove(record);
                                                        App.InfoMessage('Información', 'Ha eliminado una acción del cap&iacute;tulo <b></b>');
                                                    }
                                                    else
                                                    {
                                                        Ext.getCmp('cualidades_grid').getStore().load({info: contrato,start:0,limit:25})
                                                        App.InfoMessage('Información', 'Ocurri&oacute; un error');
                                                    }
                                                }
                                                App.ConfirmMessage(fnCallBack, '¿Está seguro que desea eliminar los datos?');




                                            }
                                        }
                                    }
                                ]
                            }
                        });
                        var panel = Ext.create('Ext.tab.Panel', {
                            height: 486,
                            width: '100%',
                            items: [nesecidad,cualidades,{title: 'Crear Profesiogramas del Trabajador',id:'prof', autoScroll:true,name:'prof'}]
                        });
                        Ext.getCmp('center').update('');
                        Ext.getCmp('center').removeAll();
                        Ext.getCmp('prof').update(html);
                        Ext.getCmp('center').add(panel);
                        var result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.CargarDatosPro',{contrato:contrato,start:0,limit:25});
                        Ext.getCmp('Profesiogramas_historia_grid_id').store.loadData(result.rows);

                    },
                    scope: this
                }

            }
        });
        var _grid_histora = new Ext.grid.Panel({
            id: 'Profesiogramas_historia_grid_id',
            region: "east",
            frame: true,
            store: this.__data_store_historial,
            enableLocking: true,
            columns: [
                Ext.create('Ext.grid.RowNumberer'),
                {text: "Fecha", flex: 1, dataIndex: 'fecha'}
            ],
            viewConfig: {forceFit: true},
            bbar:[{
                xtype: 'pagingtoolbar',
                pageSize: 10,
                store: this.__data_store_historial,
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }],
            listeners: {
                itemclick:{
                    fn:function(){
                        var _selected_rcd = Ext.getCmp('Profesiogramas_historia_grid_id').getSelectionModel().getLastSelected();
                        var  profeciograma =_selected_rcd.data.profeciograma;
                        var  fecha =_selected_rcd.data.fecha;
                        var _selected_rcd = Ext.getCmp('Profesiogramas_grid_id').getSelectionModel().getLastSelected();
                        var  nombre =_selected_rcd.data.nombre_completo;
                        html='<div style="padding: 5px"><span class="label label-info"><br>Profesiograma de: '+nombre+' <br>Fecha: '+fecha+'</span><br>'+profeciograma+'</div>'
                        Ext.getCmp('save').hide();
                        Ext.getCmp('print').show();
                        Ext.getCmp('plus').show();
                        Ext.getCmp('minus').show();
                        Ext.getCmp('prof').update(html);
                    }
                }

            }
        });
        this.panelGeneral = Ext.create('Ext.panel.Panel', {
            width: 500,
            height: 300,
            title: 'Profesiogramas',
            layout: 'border',
            items: [
                {
                    title: 'Trabajadores',
                    region:'west',
                    xtype: 'panel',
                    border:'1px',
                    margins: '0 0 0 0',
                    width: 300,
                    collapsible: true,
                    id: 'west-region-container',
                    layout: 'fit',
                    tbar:{
                        id: 'traba_prof',
                        items: [{
                                xtype:'textfield',
                                hideLabel:'true',
                                id:'tsearch',
                                width:'100%',
                                allowBlank: false,
                            listeners: {
                                change:function(){
                                    Ext.getCmp('Profesiogramas_grid_id').store.clearFilter();
                                    Ext.getCmp('Profesiogramas_grid_id').store.filter("fecha", Ext.getCmp('tsearch').getValue());
                                },scope:this
                            }
                              }],
                        height: 28
                    },
                    items:_grid
                },
                {
                    title: 'Historial Personal',
                    region:'east',
                    xtype: 'panel',
                    border:'1px',
                    margins: '0 0 0 0',
                    width: 300,
                    resizable :true,
                    collapsed : true,
                    collapsible : true,
                    collapseDirection : 'right',
                    id: 'east-region-container',
                    name: 'east-region-container',
                    layout: 'fit',
//                    tools:[],
                    tbar:{
                        id: 'traba_prof_guardado',
                        items: [{
                            xtype:'textfield',
                            hideLabel:'true',
                            id:'Psearch',
                            width:'100%',
                            allowBlank: false,
                            listeners: {
                                change:function(){
                                    Ext.getCmp('Profesiogramas_historia_grid_id').store.clearFilter();
                                    Ext.getCmp('Profesiogramas_historia_grid_id').store.filter("nombre_completo", Ext.getCmp('Psearch').getValue());
                                },scope:this
                            }
                        }],
                        height: 28
                    },
                    items:_grid_histora,
                    defaults: {anchor: '100%'}
                },
                {
                    title: 'Profesiograma',
                    region: 'center',     // center region is required, no width/height specified
                    xtype: 'panel',
                    border:'1px',
                    layout: 'anchor',
                    width: '100%',
                    height:'500px',
                    id:'center',
                    name:'center',
                    autoScroll:true,
                    tools: [
                        {
                            type:'save',
                            id:'save',
                            hidden:true,
                            handler:function(){
                                var data= Ext.select("div[id|='cart']").elements;
                                var data_nececidades= Ext.select("div[id|='nececidades']").elements;
                                var html = data[0].outerHTML;
                                var nececidades = data_nececidades[0].outerHTML;
                                //console.log(html);
                                var _selected_rcd = Ext.getCmp('Profesiogramas_grid_id').getSelectionModel().getLastSelected();
                                var  id =_selected_rcd.data.ontrato_id;
                                var result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.Adicionar',{id:id,html:html});
                                if (result){
                                    App.InfoMessage('Información', 'Se guard&oacute; satisfactoriamente el profesiograma');
                                }
                                else{
                                    App.InfoMessage('Información', 'No se pudo guard&oacute; satisfactoriamente el profesiograma');
                                }

                                var result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.CargarDatosPro',{contrato:id,start:0,limit:25});
                                Ext.getCmp('Profesiogramas_historia_grid_id').store.loadData(result.rows);
                            }
                        },
                        {type:'print',
                            id:'print',
                            hidden:true,
                            handler:function(){
                                var _selected_rcd = Ext.getCmp('Profesiogramas_historia_grid_id').getSelectionModel().getLastSelected();
                                var  profeciograma =_selected_rcd.data.profeciograma;
                                  do
                                    profeciograma = profeciograma.replace(/null/, "---");
                                  while(profeciograma.search(/null/) != '-1')
                                App.PrintData(null, profeciograma);
                            }
                        },
                        {type:'plus',
                            hidden:true,
                            id:'plus',
                            handler:function(){
                                var data= Ext.select("div[id|='cart']").elements;
                                var html = data[0].outerHTML;
                                //console.log(html);
                                var _selected_rcd = Ext.getCmp('Profesiogramas_grid_id').getSelectionModel().getLastSelected();
                                var  contrato =_selected_rcd.data.ontrato_id;
                                var selected_rcd = Ext.getCmp('Profesiogramas_historia_grid_id').getSelectionModel().getLastSelected();
                                var  id =selected_rcd.data.id;
                                var result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.Modid',{id:id,html:html});
                                if (result){
                                    App.InfoMessage('Información', 'Se guard&oacute; satisfactoriamente el profesiograma');
                                    var result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.CargarDatosPro',{contrato:contrato,start:0,limit:25});
                                    Ext.getCmp('Profesiogramas_historia_grid_id').store.loadData(result.rows);
                                }
                                else{
                                    App.InfoMessage('Información', 'No se pudo guard&oacute; satisfactoriamente el profesiograma');
                                }

                            }},
                        {
                            type:'minus',
                            hidden:true,
                            id:'minus',
                            handler:function(){
                                var _selected_rcd = Ext.getCmp('Profesiogramas_grid_id').getSelectionModel().getLastSelected();
                                var  contrato =_selected_rcd.data.ontrato_id;
                                var selected_rcd = Ext.getCmp('Profesiogramas_historia_grid_id').getSelectionModel().getLastSelected();
                                var  id =selected_rcd.data.id;
                                var result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.Eliminar',{id:id});

                                if (result){ App.InfoMessage('Información', 'Se <b>elimin&oacute;</b> satisfactoriamente el profesiograma');
                                    var result = App.PerformSyncServerRequest('Profesiogramas.Profesiogramas.CargarDatosPro',{contrato:contrato,start:0,limit:25});
                                    Ext.getCmp('Profesiogramas_historia_grid_id').store.loadData(result.rows);
                                }
                                else{ App.InfoMessage('Información', 'No se pudo <b>eliminar</b> satisfactoriamente el profesiograma');}
                            }},
                        {
                                    type:'help',
                                    tooltip: '¿Necesita Ayuda?',
                                    handler: function(event, toolEl, panel){
                                        Ext.create('Ext.window.Window', {
                                            title: '¿Necesita Ayuda?',
                                            height:'55%',iconCls:'help',
                                            width:'50%',
                                            autoScroll:true,modal:true,
                                            layout: 'anchor',
                                            html:
                                                '<ul class="nav nav-list">' +
                                                    '<li>El m&oacute;dulo <span class="label label-important">" Profesiogramas"</span>' +
                                                    ' le permite navegar por toda la informaci&oacute;n relacionada con el profesiograma de cada trabajador' +
                                                    ' adem&aacute;s de visualizar informaci&oacute;n detallada de la evaluaci&oacute; del desempe&ntilde;o.</li>' +
                                                    '<li>Posee un historial de los diferentes profesiogramas generados para cada trabajador </li>' +
                                                    'y control de las necesidades de aprendizaje de cada trabajador y las cualidades y deficiencias del mismo.<br>' +
                                                    '<li>La vista est&aacute; compuesta por 3 paneles los cuales son.<br>' +

                                                    '<span class="label label-success">Trabajadores:</span><br>' +
                                                    'En este panel se mostrar&aacuten todos los trabajadores que tengan un contrato activo en la empresa. <br>' +

                                                    '<span class="label label-success">Profesiograma:</span><br>' +
                                                    'En este panel se visualizar&aacute; y elaborar&aacute; el profesiograma\n\
                                                         del trabajador seleccionado en el panel de trabajadores, adem&aacute;s \n\
                                                        se gestionan las cualidades y deficiencias y las necesidades de aprendizaje de cada trabajador. \n\
                                                        Estos t&oacute;picos est&aacuten divididos por los tabs:<br>' +                                                 
                                                    '<span class="label label-info">Necesidades de Aprendizaje:</span><br>' +
                                                        'En este tab se gestionan las necesidades de aprendizaje del trabajador para ser agregados en el profesiograma del mismo.<br>' +                                                        
                                                    '<span class="label label-info">Cualidades o Deficiencias:</span><br>' +
                                                        'En este tab se gestionan las Cualidades o Deficiencias del trabajador para ser agregados en el profesiograma del mismo.<br>' +                                                        
                                                    '<span class="label label-info">Crear Profesiograma:</span><br>' +
                                                        'En este tab se gestiona la informaci&oacuten fundamental del profesiograma de cada trabajador que no haya sido gestionada en cualquier otro lugar de la aplicaci&oacute;n.<br>' +                                                        
                                                    '<li>En este panel se mostrar&aacute;n. los siguientes iconos<br></li>' +
                                                        '<div><div class="hsave">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>Salvar</div></div><br>'+
                                                        '<div><div class="hprint">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>Imprimir</div></div><br>'+
                                                        '<div><div class="hminus">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>Eliminar</div></div><br>'+
                                                        '<div><div class="hplus">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div>Adicionar</div></div><br>'+
                                                     '<li>El icono Salvar se mostrar&aacute; despu&eacute;s que se seleccione un trabajador,\n\
                                                      y accionando sobre el se guardar&aacute; la informaci&oacute;n relacionada con el profesiograma<br></li>' +
                                                     '<li>El icono Imprimir, Adicionar y Eliminar se mostrar&aacute;n despu&eacute;s que se seleccione un profesiograma\n\
                                                      en el panel de historial personal permitiendo Imprimir dicho profesiograma, Adicionarle nuevos cambios\n\
                                                        o eliminar dicho profesiograma<br></li>' +
                                                       
                                                        
                                                    '<span class="label label-success">Historial Personal:</span><br>' +
                                                    'En historial personal se habilitar&aacute;n todos los profesiogramas o todas \n\
                                                    las salvas de los profesiogramas que hayan guardado el especialista de capital humano. <br>' +
                                                    '</li>' +
                                                    '</ul>'

                                            }).show();
                                    }
                                }
                    ],
                    html:'<div class="centro"><img src="App/Client/img/logo/300.png"></div>'

                }
            ],
            listeners: {
                afterrender: function() {
                    this.__data_store.load({
                        params:{
                            start:0,
                            limit:25
                        }
                    });
                },
                scope : this
            }
        });
        return this.panelGeneral;
    }
    // ========================================================================//
    this.Free = function()
    {
        this.__data_store.removeAll(true);
        delete this.__data_store;
        this.__data_store = null;
    }
    // ========================================================================//
    this.ShowMainWindow = function()
    {
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Profesiogramas', new Profesiogramas());


