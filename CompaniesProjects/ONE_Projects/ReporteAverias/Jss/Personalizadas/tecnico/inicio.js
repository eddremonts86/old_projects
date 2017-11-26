Ext.chart.Chart.CHART_URL = '../../../extjs/resources/charts.swf';
Ext.onReady(function(){

    var store = new Ext.data.JsonStore({
        fields:['name', 'visits', 'views'],
        data: [ 
            {name:'Pinar del rio', visits: 8, views: 10},
            {name:'Guane', visits: 17, views: 15},
            {name:'San Juan', visits: 3, views: 5},
            {name:'San Luis', visits: 27, views: 30},
            {name:'Consolacion des Sur', visits: 40, views: 45},
            {name:'Las Minas', visits: 39, views: 40},             
            {name:'Mantua', visits: 12, views: 12},           
            {name:'La Palma', visits: 40, views: 45},
            {name:'Los Palacios', visits: 39, views: 40},           
			{name:'Sandino', visits: 39, views: 40},
			{name:'Vinales', visits: 39, views: 40}
        ]
    });
   // more complex with a custom look
    new Ext.Panel({
        iconCls:'chart',
        title: 'Relasion de todas las Solicitudes',
        frame:true,
        renderTo: 'frame',
        width:925,
        height:400,		
        layout:'fit',
		iconCls: 'grafic',
        items: {
            xtype: 'columnchart',
            store: store,
            url: '../../../Jss/extjs/resources/charts.swf',
            xField: 'name',
            yAxis: new Ext.chart.NumericAxis({
                displayName: 'Visits',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
            tipRenderer : function(chart, record, index, series){
                if(series.yField == 'visits'){
                  return Ext.util.Format.number(record.data.visits, '0,0') + ' Solicitudes Resueltas en ' + record.data.name;
               }else{
                    return Ext.util.Format.number(record.data.views, '0,0') + ' Solicitudes Realezadas en ' + record.data.name;
                }
            },
            chartStyle: {
                padding: 30,
                animationEnabled: true,
                font: {
                    name: 'Tahoma',
                    color: 0x444444,
                    size: 11
                },
                dataTip: {
                    padding: 5,
                    border: {
                        color: 0x99bbe8,
                        size:1
                    },
                    background: {
                        color: 0xDAE7F6,
                        alpha: .9
                    },
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }
                },
                xAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xeeeeee}
                },
                yAxis: {
                    color: 0x69aBc8,
                    majorTicks: {color: 0x69aBc8, length: 4},
                    minorTicks: {color: 0x69aBc8, length: 2},
                    majorGridLines: {size: 1, color: 0xdfe8f6}
                }
            },
            series: [{
                type: 'column',
                displayName: 'Page Views',
                yField: 'views',
                style: {
                    image:'bar.gif',
                    mode: 'stretch',
                    color:0x99BBE8
                }
            },{
                //type:'line',
				type:'column',
                displayName: 'Visits',
                yField: 'visits',
                style: {
                    color: 0x15428B
                }
            }]
        }
    });
});



 