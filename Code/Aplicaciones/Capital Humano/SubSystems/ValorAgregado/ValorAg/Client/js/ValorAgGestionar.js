function ValorAgGestionar()
{
    this._btn_add = null;
    this._btn_mod = null;
    this._btn_del = null;
    this.Render = function(Panel){
        this._btn_mod_inc = Ext.create('Ext.Button', {
            text: 'Pronóstico',
            id: 'mod_ValorAg_inc',
            tooltip : 'Generar el VA de la unidad',
            iconCls: 'document_preview16',
            handler: function(){
               var mes = Ext.getCmp('mes').getValue();
               var anno= Ext.getCmp('anno').getValue();
               var _selectionModel = Ext.getCmp('prenom_grid').getSelectionModel();
               var _selected_rcd = _selectionModel.getLastSelected();
               var  id =_selected_rcd.data.id;
               var  productiva =_selected_rcd.data.productiva;
               var  nombre =_selected_rcd.data.nombre;
               var  prod =_selected_rcd.data.productiva;
               if(mes!='' && anno !=''&& mes!=null && anno !=null){
                  var total=0;
                  var real=0;
                  var PP1=0;
                  var PP2=0;
                  var PT1=0;
                  var PT2=0;
                  var GM=0;
                  var SC=0;
                  var PGS=0;
                  var total_inc;
                  var real_inc;
                  var PP1_inc;
                  var PP2_inc;
                  var PT1_inc;
                  var PT2_inc ;
                  var GM_inc;
                  var SC_inc ;
                  var PGS_inc;
                  var EE_inc;
                  var combust_inc ;
                  var PB;
                  var VA ;
                  var SVA;
                  var porcientoC;
              var global = App.PerformSyncServerRequest('ValorAg.ValorAg.Tomar_datos_generales_acum', {id: id});
                  var real_ac=global.rows[0].real_a;
                  var plan_ac=global.rows[0].plan_a;
                  var PB_a=global.rows[0].PB;
                  var VA_a=global.rows[0].VA;
                  var SVA_a=global.rows[0].SVA;
                  var salario=global.rows[0].salario;
                  real_ac =  real_ac*1000;
                  plan_ac = plan_ac*1000;
                  PB_a =  PB_a*1000;
                  VA_a =  VA_a*1000;
                  salario =  salario*1000;
              var datos = App.PerformSyncServerRequest('ValorAg.ValorAg.Tomar_datos_generales_', {id: id,anno:anno,mes:mes});
              var datos_inc = App.PerformSyncServerRequest('ValorAg.ValorAg.Buscar_unidad', {id: id,anno:anno,mes:mes});
              for(var i=0;i<datos.results;i++){
                      if (datos.rows[i].orden_indicador == 11){GM_inc=(datos.rows[i].total)*1000;}
                      if (datos.rows[i].orden_indicador == 12){combust_inc=(datos.rows[i].total)*1000;}
                      if (datos.rows[i].orden_indicador == 13){EE_inc=(datos.rows[i].total)*1000;}
                      if (datos.rows[i].orden_indicador == 14){PGS_inc=(datos.rows[i].total)*1000;}
                  }
              var servC = App.PerformSyncServerRequest('ValorAg.ValorAg.Tomar_datos_generales_SC', {id: id,anno:anno,mes:mes});
              SC_inc = (servC.rows[0].total)*1000;
              if(prod =="t"){
                      var TV = App.PerformSyncServerRequest('ValorAg.ValorAg.Tomar_datos_generales_TV', {id: id,anno:anno,mes:mes});
                      total_inc = (TV.rows[0].total)*1000;
                  }
              else{
                      total_inc = 0;
                  }
              var PPI = App.PerformSyncServerRequest('ValorAg.ValorAg.Tomar_datos_generales_PPI', {id: id,anno:anno,mes:mes});
              if(PPI.rows == false){
                  PP1_inc = 0;
                   }
              else  {
                  PP1_inc =(PPI.rows[0].total)*1000;
              }
              var PPT = App.PerformSyncServerRequest('ValorAg.ValorAg.Tomar_datos_generales_PTI', {id: id,anno:anno,mes:mes});
              if(PPT.rows == false){
                      PT1_inc = 0;
                  }
              else PT1_inc = (PPT.rows[0].total)*1000;
               var PB= real + PP2-PP1+ PT2-PT1;
               var VA= PB - GM -SC;
               var SVA= VA/PGS;
               var porcientoC= real*100/total_inc;
               porcientoC= Ext.util.Format.number(porcientoC, '0.0');
               VA = Ext.util.Format.number(VA, '0.0');
               SVA = Ext.util.Format.number(SVA, '0.0');
               PB =  Ext.util.Format.number(PB, '0.0');
               var reale = 0;  var reale1 = 0;
               var reale2 = 0; var reale3 = 0;
               var reale4= 0;  var reale5= 0;
               var reale6= 0;  var reale7= 0;
               if(datos_inc.rows!=false){
                   if(datos_inc.rows[0].reale){
                       reale=datos_inc.rows[0].reale;
                   }
                   if(datos_inc.rows[0].matr){
                       reale1=datos_inc.rows[0].matr;
                   }
                   if(datos_inc.rows[0].elec){
                       reale2=datos_inc.rows[0].elec;
                   }
                   if(datos_inc.rows[0].sc){
                       reale3=datos_inc.rows[0].sc;
                   }
                   if(datos_inc.rows[0].pp1_inc){
                       reale4=datos_inc.rows[0].pp1_inc;
                   }
                   if(datos_inc.rows[0].pp2){
                       reale5=datos_inc.rows[0].pp2;
                   }
                   if(datos_inc.rows[0].fc){
                       reale6=datos_inc.rows[0].fc;
                   }
                   if(datos_inc.rows[0].comb){
                       reale7=datos_inc.rows[0].comb;
                   }
                  }
               var panel= Ext.create('Ext.Panel', {
                    layout: {type: 'vbox'},
                    items: [
                        {
                            xtype: 'panel',
                            width: '100%',
                            flex: 5,
                            fieldDefaults: {labelAlign: 'right',labelWidth: 390,msgTarget: 'qtip'},
                            items: [
                                {
                                padding:1,
                                margin:5,
                                xtype: 'fieldset',
                                defaultType: 'textfield',
                                layout: 'anchor',
                                defaults: {anchor: '100%'},
                                items: [
                                    {
                                    xtype: 'fieldcontainer',
                                    fieldLabel: 'Ventas Totales',
                                    layout: 'hbox',
                                    id:'Plan',
                                    combineErrors: true,
                                    defaultType: 'numberfield',
                                    defaults: {hideLabel: 'true'},
                                    items: [
                                        {
                                        name: 'firstName',
                                        fieldLabel: 'First Name',
                                        flex: 3,
                                        id:'vtPlan',
                                        emptyText: 'Plan',
                                        disabled:true,
                                        allowBlank: false,
                                        decimalSeparator : '.',
                                        //decimalPrecision : 4,
                                        value:total_inc
                                        }, {
                                        name: 'lastName',
                                        fieldLabel: 'Last Name',
                                        flex: 3,
                                        id:'real',
                                        margins: '0 0 0 6',
                                        emptyText: 'Real',
                                        allowBlank: false,
                                        decimalSeparator : '.',
                                        value:reale,
                                        listeners:{
                                            blur:function( This, The, eOpts ){
                                                real=This.value;
                                                var a = Ext.getCmp('vtPlan').getValue();
                                                calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);
                                            }
                                        }
                                    }]
                                }]
                                },
                                {
                                    padding:1,
                                    margin:5,
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'anchor',
                                    defaults: {anchor: '100%'},
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Materias Primas',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'numberfield',
                                            defaults: {hideLabel: 'true'},
                                            items: [
                                                {
                                                    name: 'firstName',
                                                    fieldLabel: 'First Name',
                                                    flex: 3,
                                                    emptyText: 'Plan',
                                                    allowBlank: false,
                                                    disabled:true,
                                                    decimalSeparator : '.',
                                                    //decimalPrecision : 4,
                                                    value:GM_inc
                                                },
                                                {
                                                    name: 'lastName',
                                                    fieldLabel: 'Last Name',
                                                    flex: 3,
                                                    id:'matr',
                                                    margins: '0 0 0 6',
                                                    emptyText: 'Real',
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    value:reale1,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                           var a = Ext.getCmp('comb').getValue();
                                                           var b =  Ext.getCmp('energ').getValue();
                                                            GM=(This.value)+a+b;
                                                            calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);
                                                        }
                                                    }
                                                }

                                            ]
                                        }
                                    ]
                                },
                                {
                                    padding:1,
                                    margin:5,
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'anchor',
                                    defaults: {anchor: '100%'},
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Combustibles',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'numberfield',
                                            defaults: {hideLabel: 'true'},
                                            items: [
                                                {
                                                    name: 'firstName',
                                                    fieldLabel: 'First Name',
                                                    flex: 3,
                                                    emptyText: 'Plan',
                                                    allowBlank: false,
                                                    disabled:true,
                                                    decimalSeparator : '.',
                                                    //decimalPrecision : 4,
                                                    value:combust_inc
                                                }, {
                                                    name: 'lastName',
                                                    id:'comb',
                                                    fieldLabel: 'Last Name',
                                                    flex: 3,
                                                    margins: '0 0 0 6',
                                                    emptyText: 'Real',
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    value:reale7,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                            var a = Ext.getCmp('matr').getValue();
                                                            var b =  Ext.getCmp('energ').getValue();
                                                            GM=(This.value)+a+b;
                                                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                                                        }
                                                    }
                                                }]
                                        }]
                                },
                                {
                                    padding:1,
                                    margin:5,
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'anchor',
                                    defaults: {anchor: '100%'},
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Energía Eléctrica',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'numberfield',
                                            defaults: {hideLabel: 'true'},
                                            items: [
                                                {
                                                    name: 'firstName',
                                                    fieldLabel: 'First Name',
                                                    flex: 3,
                                                    emptyText: 'Plan',
                                                    allowBlank: false,
                                                    disabled:true,
                                                    decimalSeparator : '.',
                                                    //decimalPrecision : 4,
                                                    value:EE_inc,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                            //GM=This.value;
                                                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                                                        }
                                                    }
                                                }, {
                                                    name: 'lastName',
                                                    fieldLabel: 'Last Name',
                                                    flex: 3,
                                                    margins: '0 0 0 6',
                                                    emptyText: 'Real',
                                                    allowBlank: false,
                                                    id:'energ',
                                                    decimalSeparator : '.',
                                                    value:reale2,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                            var a = Ext.getCmp('matr').getValue();
                                                            var b =  Ext.getCmp('comb').getValue();
                                                            GM=(This.value)+a+b;
                                                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                                                        }
                                                    }
                                                }]
                                        }]
                                },
                                {
                                    padding:1,
                                    margin:5,
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'anchor',
                                    defaults: {anchor: '100%'},
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Servicios Comprados',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'numberfield',
                                            defaults: {hideLabel: 'true'},
                                            items: [
                                                {
                                                    name: 'firstName',
                                                    fieldLabel: 'First Name',
                                                    flex: 3,
                                                    emptyText: 'Plan',
                                                    disabled:true,
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    //decimalPrecision : 4,
                                                    value:SC_inc
                                                }, {
                                                    name: 'lastName',
                                                    fieldLabel: 'Last Name',
                                                    flex: 3,
                                                    id:'sc',
                                                    margins: '0 0 0 6',
                                                    emptyText: 'Real',
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    value:reale3,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                            SC=This.value;
                                                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                                                        }
                                                    }
                                                }]
                                        }]
                                },
                                {
                                    padding:1,
                                    margin:5,
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'anchor',
                                    defaults: {anchor: '100%'},
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Producción en Proceso',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'numberfield',
                                            defaults: {hideLabel: 'true'},
                                            items: [
                                                {
                                                    name: 'firstName',
                                                    fieldLabel: 'First Name',
                                                    flex: 3,
                                                    emptyText: 'Plan',
                                                    disabled:true,
                                                    id:'PP1_inc',
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    //decimalPrecision : 4,
                                                    value:PP1_inc
                                                }, {
                                                    name: 'lastName',
                                                    fieldLabel: 'Last Name',
                                                    flex: 3,
                                                    id:'PP1_F',
                                                    margins: '0 0 0 6',
                                                    emptyText: 'Real',
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    value:reale4,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                            PP2=This.value;
                                                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                                                        }
                                                    }
                                                }]
                                        }]
                                },
                                {
                                    padding:1,
                                    margin:5,
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'anchor',
                                    defaults: {anchor: '100%'},
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Producción Terminada',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'numberfield',
                                            defaults: {hideLabel: 'true'},
                                            items: [
                                                {
                                                    name: 'firstName',
                                                    fieldLabel: 'First Name',
                                                    flex: 3,
                                                    emptyText: 'Plan',
                                                    disabled:true,
                                                    id:'PT1_inc',
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    //decimalPrecision : 4,
                                                    value:PT1_inc
                                                }, {
                                                    name: 'lastName',
                                                    fieldLabel: 'Last Name',
                                                    flex: 3,
                                                    margins: '0 0 0 6',
                                                    emptyText: 'Real',
                                                    allowBlank: false,
                                                    id:'PT1_F',
                                                    decimalSeparator : '.',
                                                    value: reale5,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                          PT2=This.value;
                                                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                                                        }
                                                    }
                                                }]
                                        }]
                                },
                                {
                                    padding:1,
                                    margin:5,
                                    xtype: 'fieldset',
                                    defaultType: 'textfield',
                                    layout: 'anchor',
                                    defaults: {anchor: '100%'},
                                    items: [
                                        {
                                            xtype: 'fieldcontainer',
                                            fieldLabel: 'Fondo de Salario',
                                            layout: 'hbox',
                                            combineErrors: true,
                                            defaultType: 'numberfield',
                                            defaults: {hideLabel: 'true'},
                                            items: [
                                                {
                                                    name: 'firstName',
                                                    fieldLabel: 'First Name',
                                                    flex: 3,
                                                    emptyText: 'Plan',
                                                    disabled:true,
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    //decimalPrecision : 4,
                                                    value:PGS_inc
                                                }, {
                                                    name: 'lastName',
                                                    fieldLabel: 'Last Name',
                                                    flex: 3,
                                                    id:'FC',
                                                    margins: '0 0 0 6',
                                                    emptyText: 'Real',
                                                    allowBlank: false,
                                                    decimalSeparator : '.',
                                                    value:reale6,
                                                    listeners:{
                                                        blur:function( This, The, eOpts ){
                                                            PGS=This.value;
                                                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                                                        }
                                                    }
                                                }]
                                        }]
                                }

                            ]
                        }

                    ]
                });
               var tabs = Ext.create('Ext.tab.Panel', {
                       items: [
                             { title: 'Resumen Mensual',
                               items:[
                               {xtype: 'label',id: 'TVP',text: 'Ventas Totales(Plan): '+total_inc,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'TVR',text: 'Ventas Totales(Real): '+real,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'Cump',text: '% Cumplimiento: '+porcientoC,margin: '5 0 0 10'},
                               {html:'<hr>'},
                               {xtype: 'label',id: 'PP1',text: 'Produciones en Proceso(inicial): '+PP1,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'PP2',text: 'Produciones en Proceso(Final): '+PP2,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'PT1',text: 'Produciones Terminada(inicial): '+PT1,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'PT2',text: 'Produciones Terminada(Final): '+PT2,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'PGS',text: 'Plan Gasto Salario : '+PGS,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'SC',text: 'Servicios Comprados: '+SC,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'GM',text: 'Gastos en Materiales: '+GM,margin: '5 0 0 10'},
                               {html:'<hr>'},
                               {xtype: 'label',id: 'PB',text: 'Produccion Bruta: '+PB,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'VA',text: 'Valor Agregado: '+VA,margin: '5 0 0 10'},
                               {xtype: 'label',id: 'S_VA',text: 'Salario/V Agregado: '+SVA,margin: '5 0 0 10'}
                                 ]
                             },
                           {
                               title: 'Resumen Acumulado ',
                               items:[
                                   {  xtype: 'panel',
                                      title: 'Resumen Acumulado',
                                       items:[
                                           {xtype: 'label',id: 'TVP1',text: 'Ventas Totales(Plan): '+total_inc,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'TVR1',text: 'Ventas Totales(Real): '+real,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'Cump1',text: '% Cumplimiento: '+porcientoC,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'PB1',text: 'Produccion Bruta: '+PB,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'VA1',text: 'Valor Agregado: '+VA,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'S_VA1',text: 'Salario/V Agregado: '+SVA,margin: '5 0 0 10'},
                                           {html:'<hr>'}
                                       ]
                                   },
                                   {  xtype: 'panel',
                                      title: 'Resumen Acumulado y mes actual',
                                      items:[
                                           {xtype: 'label',id: 'TVP2',text: 'Ventas Totales(Plan): '+total_inc,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'TVR2',text: 'Ventas Totales(Real): '+real,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'Cump2',text: '% Cumplimiento: '+porcientoC,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'PB2',text: 'Produccion Bruta: '+PB,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'VA2',text: 'Valor Agregado: '+VA,margin: '5 0 0 10'},
                                           {xtype: 'label',id: 'S_VA2',text: 'Salario/V Agregado: '+SVA,margin: '5 0 0 10'},
                                           {html:'<hr>'}
                                       ]
                                   }
                               ]
                           }
                       ]
                   });
               var win = Ext.create('widget.window', {
                    title: 'Pronosticar Valor Agregado de la Unidad: '+nombre,
                    header: {titlePosition: 2,titleAlign: 'center'},
                    closable: true,
                    closeAction: 'hide',
                    width: '68%',
                    modal:true,
                    height: '98%',
                    tools:[{type:'print',
                             handler:function(){
                              var a = Ext.getCmp('prenom_grid').store;
                              App.PrintData(a,null);
                              }
                         }],
                    maximizable:true,
                    layout: {type: 'border',padding: 5},
                    bodyStyle: {background: '#116699'},
                    items: [
                        {
                        region: 'west',
                        title: 'Resumen de la Empresa',
                        width: 380,
                        split: true,
                        collapsed: true,
                        frame: true,
                        collapsible: true,
                        floatable: false,
                        items:[tabs]
                    },
                        {
                        region: 'center',
                        xtype: 'tabpanel',
                        tabPosition: 'right',
                        defaults: {bodyPadding: 10},
                        bodyStyle: {background: '#116699'},
                        items: [{
                            rtl: false,
                            title: 'Parámetros del Pronóstico',
                            items:[panel]
                        }
                        ]
                    }],
                    listeners:{
                        afterrender:function( This, eOpts ){
                            real = Ext.getCmp('real').value;
                            PP1_inc=Ext.getCmp('PP1_inc').value;
                            PP2=Ext.getCmp('PP1_F').value;
                            PT1_inc=Ext.getCmp('PT1_inc').value;
                            PT2=Ext.getCmp('PT1_F').value;
                            SC=Ext.getCmp('sc').value;
                            GM=Ext.getCmp('matr').value+Ext.getCmp('comb').value+Ext.getCmp('energ').value;
                            PGS= Ext.getCmp('FC').value;
                          calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);
                        },
                        close:function( panel, eOpts ){
                            panel.removeAll();
                        }
                    },
                   bbar: [
                       '->',{ xtype: 'button',
                         text: 'Guardar Datos',
                           cls:'btn',
                           handler: function(){
                            var my_arreglo = calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario);

                               var fin = App.PerformSyncServerRequest('ValorAg.ValorAg.Guardar',
                                   {
                                    id: id,
                                    anno:anno,
                                    mes:mes,
                                    PB:my_arreglo[0],
                                    VA:my_arreglo[1],
                                    SVA:my_arreglo[2],

                                    fc:my_arreglo[4],
                                    comb:my_arreglo[5],
                                    elec:my_arreglo[6],
                                    matr:my_arreglo[7],

                                    porcientoC:my_arreglo[3],
                                    total_inc:total_inc,
                                    real:real,
                                    PP1_inc:PP1_inc,
                                    PP2:PP2,
                                    PT1_inc:PT1_inc,
                                    PT2:PT2,
                                    GM:GM,
                                    SC:SC,
                                    productiva:productiva,
                                    PGS:PGS,
                                    nombre:nombre
                                   });
                               if(fin){
                                   App.InfoMessage('Información', 'Hemos guardado sus datos.');
                               }
                               else {
                                   App.InfoMessage('Información', 'No hemos guardado sus dato. Ocurrio un error');
                               }
                           }
                       }
                   ]
                });
                win.show();}
               else{
                   App.InfoMessage('Información', 'Debe dar una fecha valida');
               }
               }


        });
        this._store_combo= Ext.create('Ext.data.Store',{
            fields: [{name: 'id'},{name: 'nombre'}],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            autoLoad: false
        });
        this.__data_store=Ext.create('Ext.data.Store',{
            fields: [{name: 'id'},{name: 'nombre'}],
            proxy: {type: 'ajax',reader: {type: 'json', root: 'rows', totalProperty: 'results'}},
            autoLoad: false
        });
        var tbar = Ext.getCmp('Puestos_trabajo_por_area_tbar_id');
        this._btn_mod_inc1 = Ext.create('Ext.Button', {
            text: 'Imprimir',
            id: 'mod_Nomina_inc1',
            tooltip : 'Modifica el Puesto por Área seleccionado',
            iconCls: 'document_preview16',
            handler: function(){
                var mes = Ext.getCmp('mes').getValue();
                var anno= Ext.getCmp('anno').getValue();
                if(mes!='' && anno !=''&& mes!=null && anno !=null){
                var a = Ext.getCmp('prenom_grid').store;
                var b="<div style='color:#f5f5f5;*border: 1px #0044cc dotted '>" +"Mes: "+mes+ "  Ano: "+anno+"</div>"
                //App.PrintData(a,b);
                App.PrintModel(a,b);
                }
                else{
                    App.InfoMessage('Información', 'Debe dar una fecha valida');
                }
            }
        });
        tbar.add(this._btn_mod_inc);
        tbar.add(this._btn_mod_inc1);
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
App.RegisterFunction('ValorAgGestionar', new ValorAgGestionar());
function calculo(total_inc,real,PP1_inc,PP2,PT1_inc,PT2,GM,SC,PGS,real_ac,plan_ac,PB_a,VA_a,SVA_a,salario){

    var PB= real + PP2-PP1_inc + PT2-PT1_inc;
    var VA= PB - GM -SC;
    var SVA=PGS/VA;
    var porcientoC= real*100/total_inc;
    if(porcientoC=="Infinity"){
        porcientoC=real;}
    if(SVA=="Infinity"){
        SVA=0;}
    var porcientoC_a= real_ac*100/plan_ac;
    var VA_a2 = VA+VA_a;
    var PB_a2 = PB_a +PB;
    var SVA_a2 = (PGS+salario)/VA_a2;
    var plan_ac2 = plan_ac + total_inc;
    var real_ac2 = real_ac + real;
    var porcientoC_a2 = real_ac2*100/plan_ac2;
    var a = Ext.getCmp('comb').getValue();
    var b =  Ext.getCmp('energ').getValue();
    var c =  Ext.getCmp('matr').getValue();
    var arrfinal = new Array();
    arrfinal=[PB,VA,SVA,porcientoC,PGS,a,b,c];

//==============acumulado mes============================
    porcientoC= Ext.util.Format.number(porcientoC, '0.0');
    VA = Ext.util.Format.number(VA, '0.000');
    SVA = Ext.util.Format.number(SVA, '0.000');
    PB =  Ext.util.Format.number(PB, '0.000');
    total_inc =  Ext.util.Format.number(total_inc, '0.000');
    real =  Ext.util.Format.number(real, '0.000');
    GM =  Ext.util.Format.number(GM, '0.000');
    SC =  Ext.util.Format.number(SC, '0.000');
    PP1 =  Ext.util.Format.number(PP1_inc, '0.000');
    PP2 =  Ext.util.Format.number(PP2, '0.000');
    PT1 =  Ext.util.Format.number(PT1_inc, '0.000');
    PT2 =  Ext.util.Format.number(PT2, '0.000');
    PGS =  Ext.util.Format.number(PGS, '0.000');

    Ext.getCmp('TVP').setText('Ventas Totales(Plan): '+total_inc);
    Ext.getCmp('TVR').setText('Ventas Totales(Real): '+real);
    Ext.getCmp('Cump').setText('% Cumplimiento: '+porcientoC);
    Ext.getCmp('PB').setText( 'Produccion Bruta: '+PB);
    Ext.getCmp('VA').setText( 'Valor Agregado: '+VA);
    Ext.getCmp('GM').setText( 'Gastos en Materiales: '+GM);
    Ext.getCmp('SC').setText( 'Servicios Comprados: '+SC);
    Ext.getCmp('S_VA').setText( 'Salario/V Agregado: '+SVA);
    Ext.getCmp('PP1').setText( 'Produciones en Proceso(inicial): '+PP1);
    Ext.getCmp('PP2').setText( 'Produciones en Proceso(Final): '+PP2);
    Ext.getCmp('PT1').setText( 'Produciones Terminada(inicial): '+PT1);
    Ext.getCmp('PT2').setText( 'Produciones Terminada(Final): '+PT2);
    Ext.getCmp('PGS').setText( 'Plan Gasto Salario : '+PGS);
//==============acumulado hasta el  mes============================
    SVA_a = Ext.util.Format.number(SVA_a, '0.000');
    VA_a = Ext.util.Format.number(VA_a, '0.000');
    PB_a = Ext.util.Format.number(PB_a, '0.000');
    porcientoC_a = Ext.util.Format.number(porcientoC_a, '0.000');
    plan_ac = Ext.util.Format.number(plan_ac, '0.000');
    real_ac = Ext.util.Format.number(real_ac, '0.000');

    Ext.getCmp('S_VA1').setText( 'Salario/V Agregado: '+SVA_a);
    Ext.getCmp('VA1').setText( 'Valor Agregado: '+VA_a);
    Ext.getCmp('PB1').setText( 'Produccion Bruta: '+PB_a);
    Ext.getCmp('Cump1').setText('% Cumplimiento: '+porcientoC_a);
    Ext.getCmp('TVP1').setText('Ventas Totales(Plan): '+plan_ac);
    Ext.getCmp('TVR1').setText('Ventas Totales(Real): '+real_ac);
//==============acumulado  + mes============================


    SVA_a2 = Ext.util.Format.number(SVA_a2, '0.000');
    VA_a2 = Ext.util.Format.number(VA_a2, '0.000');
    PB_a2 = Ext.util.Format.number(PB_a2, '0.000');
    porcientoC_a2 = Ext.util.Format.number(porcientoC_a2, '0.000');
    plan_ac2 = Ext.util.Format.number(plan_ac2, '0.000');
    real_ac2 = Ext.util.Format.number(real_ac2, '0.000');

    Ext.getCmp('S_VA2').setText( 'Salario/V Agregado: '+SVA_a2);
    Ext.getCmp('VA2').setText( 'Valor Agregado: '+VA_a2);
    Ext.getCmp('PB2').setText( 'Produccion Bruta: '+PB_a2);
    Ext.getCmp('Cump2').setText('% Cumplimiento: '+porcientoC_a2);
    Ext.getCmp('TVP2').setText('Ventas Totales(Plan): '+plan_ac2);
    Ext.getCmp('TVR2').setText('Ventas Totales(Real): '+real_ac2);
//==================================================================================
    return arrfinal;
}
