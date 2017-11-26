/*
 * Ext JS Library 2.2.1
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

SamplePanel = Ext.extend
(Ext.DataView,
  {
    autoHeight: true,
    frame:true,
    cls:'demos',
    itemSelector: 'dd',
    overClass: 'over',
    
    tpl : new Ext.XTemplate(
        '<div id="sample-ct">',
            '<tpl for=".">',
            '<div><a name="{id}"></a><h2><div>{title}</div></h2>',
            '<dl>',
                '<tpl for="samples">',
                    '<dd ext:url="{url}"><img src="shared/screens/{icon}"/>',
                        '<div><h4>{text}</h4><p>{desc}</p></div>',
                    '</dd>',
                '</tpl>',
            '<div style="clear:left"></div></dl></div>',
            '</tpl>',
        '</div>'
    ),

    onClick : function(e){
        var group = e.getTarget('h2', 3, true);
        if(group){
            group.up('div').toggleClass('collapsed');
        }else {
            var t = e.getTarget('dd', 5, true);
            if(t && !e.getTarget('a', 2)){
                var url = t.getAttributeNS('ext', 'url');
                window.open(url);
            }
        }
        return SamplePanel.superclass.onClick.apply(this, arguments);
    }
  }
);


Ext.EventManager.on(window,'load', function(){

    var catalog = [{
        title: 'Informacion por bloques',
        samples: [{
            text: 'Usuario',
            url: 'feed-viewer/view.html',
            icon: 'xuser.png',
            desc: 'Reportar averias,Buscar prestaciones de Pcs,ver estado de sulicitudes...<br><a href="">Revisar Aqui...</a>'
			
        },{
            text: 'Tecnico',
            url: 'http://localhost',
            icon: 'xtecnico.png',
            desc: 'Atender las solicitudes...<a href=""><br><a href="">Revisar Aqui...</a>'
			
        },{
            text: 'Jefe Departamento',
            url: 'tasks/tasks.html',
            icon: 'xjefe.png',
            desc: 'Revisar,editar y monitoriar el trabajo..<br><a href="">Revisar Aqui...</a>'
        },{
            text: 'Ayuda',
            url: 'organizer/organizer.html',
            icon: 'xAyuda.png',
            desc: 'No entiendes como funciona la aplicacion! No importa...<br><a href="">Revisar Aqui...</a>'
        },]
    }, ];

    for(var i = 0, c; c = catalog[i]; i++){
        c.id = 'sample-' + i;
    }

    var store = new Ext.data.JsonStore({
        idProperty: 'id',
        fields: ['id', 'title', 'samples'],
        data: catalog
    });

    new Ext.Panel({
        autoHeight: true,
        collapsible: true,
        frame: true,
        title: 'Informacion General',
        items: new SamplePanel({
            store: store
        })
    }).render('all-demos');

    var tpl = new Ext.XTemplate(
        '<tpl for="."><li><a href="#{id}">{title:stripTags}</a></li></tpl>'
    );
    tpl.overwrite('sample-menu', catalog);

    Ext.select('#sample-spacer').remove();

    setTimeout(function(){
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
			remove:true,
			callback : function() {
				var cp = new Ext.state.CookieProvider();

				if(window.console && window.console.firebug && ! cp.get('hideFBWarning')){
					var tpl = new Ext.Template(
				'<div style="border: 1px solid #FF0000; background-color:#FFAAAA; display:none; padding:15px; color:#000000;"><b>Warning: </b> Firebug is known to cause performance issues with Ext JS. <a href="#" id="hideWarning">[ Hide ]</a></div>'			   
					);
					var newEl = tpl.insertFirst('all-demos');
					
					Ext.fly('hideWarning').on('click', function() {
						Ext.fly(newEl).slideOut('t',{remove:true});
						cp.set('hideFBWarning', true);	
					});
					Ext.fly(newEl).slideIn();
				}
				
				
			}
		
		
		});
    }, 300);

});