
//-------------------------------------------Js-Arquitectura----------------------------------------------------------->
function ValidateForm(){
    var _subsystem = document.getElementById('subsystem').value;
    if(_subsystem == '')
    {
        alert('Seleccione el lugar del sitio donde desea entrar');
        return false;
    }

    var _log = document.getElementById('log').value;
    if(_log == '')
    {
        alert('Entre su identificador');
        return false;
    }

    var _pwd = document.getElementById('pwd').value;
    if(_pwd == '')
    {
        alert('Entre su contraseña');
        return false;
    }

    if( _log != '' && _pwd != '')
    {
        document.getElementById('user_log').value = _log;
        document.getElementById('user_pwd').value = _pwd;
        document.getElementById('log').disabled="disabled";
        document.getElementById('pwd').disabled="disabled";
        document.getElementById('accept_btn').disabled="disabled";
        return true;
    }
    return false;
}
function ShowHint(Hint){
    document.getElementById('hint').innerHTML = Hint;
}
function HideHint(Hint){
    document.getElementById('hint').innerHTML = '';

}
//================================================Funciones Estaticas===================================================
$(document).ready(function() {
   // $('#myCarousel').carousel({interval: 12000 , pause: 'hover'})
//--------------------------------------------------------------Barra navegacion------------------------------------------>
    var inicio='<li><a href="#"></a></li>';
    $.getJSON("Templates/Hermes/php/index_data.php",{index:"menu"},function(data){
        for(var i=0;i<data.length;i++){
                if(i==0){
                    html_data =  "<li class='inicio active' id="+data[i]['id']+"><a href=\"#\"><i class=\"icon-home 1icon-white\"></i>"+data[i]['titulo']+"</a></li>";
                }
                else{
                    html_data =  "<li class='inicio' id="+data[i]['id']+"><a href=\"#\"><i class=\"icon-signal 1icon-white\"></i>"+data[i]['titulo']+"</a></li>";
                }
                inicio = inicio + html_data;
            }
        $('#menu_inicio').html(inicio);
        $('.inicio').click(function() {
            var id = this.id;
            $.getJSON("Templates/Hermes/php/index_data.php",{index:"text",id:id},function(data){
             var inicio='';
             for(var i=0;i<data.length;i++){
             if(i==0){
             var id =data[i]['cuerpo'];
             html_data = id;
             }
             else{
             var id =data[i]['cuerpo'];
             html_data = id;
             }
             inicio = inicio + html_data;
             }
             $("#cuerpo").fadeOut(1,function(){
             $('#cuerpo').html(inicio);
             $("#cuerpo").fadeIn(1000);
             });
             });
        })
        });
    $('#myCarousel').carousel({interval: 12000 , pause: 'hover'})
    var carrusel='';
    $.getJSON("Templates/Hermes/php/index_data.php",{index:"datos_compact"},function(data){
        for(var i=0;i<data.length;i++){
            if(i==0){
                html_data =   '<div class=\"active item\">'+ data[i]['resumen']+'</div>';
            }
            else{
                html_data =   '<div class=\"item\">'+ data[i]['resumen']+'</div>';
            }
            carrusel = carrusel + html_data;
        }
        $('#carrusel').html(carrusel);
    });

});
//================================================Funciones Dinamicas o en espera de eventos===================================================
$(document).ready(function() {
    $('#eventos').click(function() {
        var html='';
        $.getJSON("Templates/Hermes/php/index_data.php",{index:"event"},
            function(data){
                for(var i=0;i<data.length;i++){
                    html_data = "<div>" +
                        "<article id = 'art"+i+"'>"+
                        "<div class='morer'>"+data[i]['caracter']+"</div><br>"+
                        "<div class='morer' id='more"+i+"'>&nbsp;</div>" +
                        "<time class='label label-info'>"+data[i]['fecha']+"</time>&nbsp;"+
                        "<h3 class='texth3'>"+data[i]['nombre']+"</h3>"+
                        "<h5 class='texth5'>"+data[i]['tipo']+"</h5>"+
                        "<p>"+data[i]['titulo']+"</p>"+
                        "</article>" +
                        "</div>"+""
                    html = html + html_data;
                }
                $("#cuerpo").fadeOut(1,function(){
                    $('#cuerpo').html(html);
                    $("#cuerpo").fadeIn(1000,function(){
                        $('article[id*="art"]').each(function(i,s){

                            var cuerpo = "<div class='morer'>"+data[i]['caracter']+"</div><br>"+
                                "<div class='morer' id='more"+i+"'>&nbsp;</div>" +
                                "<time class='label label-info'>"+data[i]['fecha']+"</time>&nbsp;"+
                                "<h3>"+data[i]['nombre']+"</h3>"+
                                "<h5>"+data[i]['tipo']+"</h5>"+
                                "<p>"+data[i]['cuerpo']+"</p>";
                            $(s).mouseover(function(){$('#more'+i).html('<span class="label">Leer mas...</span>')});
                            $(s).bind('click',function(){$('#art'+i).html(cuerpo);});
                            $(s).mouseout(function(){
                                $('#more'+i).html('');
                                //$('#more'+i).css("display","none");
                            });
                        });
                    });
                });
            });
    })
    $('#regul').click(function() {
        var html='';
        $.getJSON("Templates/Hermes/php/index_data.php",{index:"regul"},
            function(data){
                for(var i=0;i<data.length;i++){
                    html_data = "<div>" +
                        "<article class='regulaciones' id = 'art"+i+"'>"+
                        "<div class='morer'>"+data[i]['caracter']+"</div><br>"+
                        "<div class='morer' id='more"+i+"'>&nbsp;</div>" +
                        "<time class='label label-info'>"+data[i]['fecha']+"</time>&nbsp;"+
                        "<h3 class='texth3'>"+data[i]['nombre']+"</h3>"+
                        "<h5 class='texth5'>"+data[i]['tipo']+"</h5>"+
                        "<p>"+data[i]['titulo']+"</p>"+
                        "</article>" +
                        "</div>"+""
                    html = html + html_data;
                }
                $("#cuerpo").fadeOut(1,function(){
                    $('#cuerpo').html(html);
                    $("#cuerpo").fadeIn(1000,function(){
                        $('article[id*="art"]').each(function(i,s){

                            var cuerpo = "<div class='morer'>"+data[i]['caracter']+"</div><br>"+
                                "<div class='morer' id='more"+i+"'>&nbsp;</div>" +
                                "<time class='label label-info'>"+data[i]['fecha']+"</time>&nbsp;"+
                                "<h3>"+data[i]['nombre']+"</h3>"+
                                "<h5>"+data[i]['tipo']+"</h5>"+
                                "<p>"+data[i]['cuerpo']+"</p>";
                            $(s).mouseover(function(){$('#more'+i).html('<span class="label">Leer mas...</span>')});
                            $(s).bind('click',function(){$('#art'+i).html(cuerpo);});
                            $(s).mouseout(function(){
                                $('#more'+i).html('');
                                //$('#more'+i).css("display","none");
                            });
                        });
                    });
                });
            });
    })
    $('#info').click(function() {
        var html='';
        $.getJSON("Templates/Hermes/php/index_data.php",{index:"info"},
            function(data){
                for(var i=0;i<data.length;i++){
                    html_data = "<div>" +
                        "<article class='informacion' id = 'art"+i+"'>"+
                        "<div class='morer'>"+data[i]['caracter']+"</div><br>"+
                        "<div class='morer' id='more"+i+"'>&nbsp;</div>" +
                        "<time class='label label-info'>"+data[i]['fecha']+"</time>&nbsp;"+
                        "<h3 class='texth3'>"+data[i]['nombre']+"</h3>"+
                        "<h5 class='texth5'>"+data[i]['tipo']+"</h5>"+
                        "<p>"+data[i]['titulo']+"</p>"+
                        "</article>" +
                        "</div>"+""
                    html = html + html_data;
                }
                $("#cuerpo").fadeOut(1,function(){
                    $('#cuerpo').html(html);
                    $("#cuerpo").fadeIn(1000,function(){
                        $('article[id*="art"]').each(function(i,s){

                            var cuerpo = "<div class='morer'>"+data[i]['caracter']+"</div><br>"+
                                "<div class='morer' id='more"+i+"'>&nbsp;</div>" +
                                "<time class='label label-info'>"+data[i]['fecha']+"</time>&nbsp;"+
                                "<h3>"+data[i]['nombre']+"</h3>"+
                                "<h5>"+data[i]['tipo']+"</h5>"+
                                "<p>"+data[i]['cuerpo']+"</p>";
                            $(s).mouseover(function(){$('#more'+i).html('<span class="label">Leer mas...</span>')});
                            $(s).bind('click',function(){$('#art'+i).html(cuerpo);});
                            $(s).mouseout(function(){
                                $('#more'+i).html('');
                                //$('#more'+i).css("display","none");
                            });
                        });
                    });
                });
            });
    })
    $('#subs').click(function() {
        var html='';
        $.getJSON("Templates/Hermes/php/index_data.php",{index:"sub"},
            function(data){
                for(var i=0;i<data.length;i++){
                    if(i==0){
                        html_data =  "<button type='submit' class='btn-der btn-primary' value="+data[i]['subsystem']+" name='subsystem'><i class='icon-warning-sign icon-white'></i>"+data[i]['subsystem']+"</button>"
                    }
                    else if (i==data.length-1){
                        html_data =  "<button type='submit' class='btn-izq btn-primary' value="+data[i]['subsystem']+" name='subsystem'><i class='icon-warning-sign icon-white'></i>"+data[i]['subsystem']+"</button>"
                    }
                    else {
                        html_data =  "<button type='submit' class='btn-rct btn-primary' value="+data[i]['subsystem']+" name='subsystem'><i class='icon-warning-sign icon-white'></i>"+data[i]['subsystem']+"</button>"
                    }
                    html = html + html_data;
                }
                $('#subsistemas').html(html);
            });
    })
    $('#Cdisp').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Cursos disponibles</h1> <div id='cursos'></div>");
            ventanaExt();
            $("#cuerpo").fadeIn(1000);
        });
    })
    $('#gest').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Cursos en Gestión</h1> <div id='cursos'></div>");
            ventanaExtGest();
            $("#cuerpo").fadeIn(1000);
        });
    })
    $('#Iplantilla').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Que es el modulo Plantilla</h1>" +
                "<div class='label label-info'>Introducción:</div><br>");
            $("#cuerpo").fadeIn(1000);
        });
    })
    $('#Icapacitacion').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Que es el modulo Capacitación</h1>" +
                "<div class='label label-info'>Introducción:</div><br>"+"</div>"
            );
            $("#cuerpo").fadeIn(1000);
        });
    })
    $('#ISistema').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Que es el modulo Sistema Base</h1>");
            $("#cuerpo").fadeIn(1000);
        });
    })
    $('#Iadmin').click(function() {
        $("#cuerpo").fadeOut(1,function(){$('#cuerpo').html("<h1>Que es el modulo Administración</h1>");
            $("#cuerpo").fadeIn(1000);});
    })
});
//--------------------------------------------------------------Funciones de Generales--------------------------------->
function enviarDatos(subs,user,pasw){

    var user = $('#user').val();
    var pasw = $('#passw').val();
    if(user==""||pasw=="")
    {
        $('#cuerpo').html("<h1>Parametros vacios en la consulta</h1>")
    }
    var fn = "App.Log.Log.LogUser";
    var pg = $.post('App/Server/fn_call.php',{fn:fn,subsystem:subs,user_log:user,user_pwd:pasw})
//$('#body').html(pg);
}
function ventanaExtGest(){
    var index='gst'
    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id',type: 'int'},
            {name: 'nombre',  type: 'string'},
            {name: 'desc',  type: 'string'}
        ]
    });
    var myStore = Ext.create('Ext.data.Store', {
        model: 'User',
        proxy: {
            type: 'ajax',
            url: 'Templates/Hermes/php/index_data.php',
            reader: {
                type: 'json',
                root: 'users'
            }
        },
        autoLoad: false
    });
    myStore.load({params: {index:index},
        //callback: function() {},
        scope: this
    });
    this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
    Ext.create('Ext.grid.Panel', {
        title: 'Todos los cursos en Gestión',
        store: myStore,
        columns: [
            { text: 'Nombre',  dataIndex: 'nombre', flex:2}
        ],
        height:'80%',
        width: '90%',
        renderTo: 'cursos',
        plugins: [this.cellEditing,{
            ptype: 'rowexpander',
            rowBodyTpl : new Ext.XTemplate(
                '<div class="label label-info">Descripcion del Curso:</div><br>{desc}</div><br>'
            )
        }]
    });



}
function ventanaExt(){

    var index='cursos'
    Ext.define('User', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id',type: 'int'},
            {name: 'nombre',  type: 'string'},
            {name: 'inicio',  type: 'string'},
            {name: 'fin',  type: 'string'},
            {name: 'desc',  type: 'string'}
        ]
    });
    var myStore = Ext.create('Ext.data.Store', {
        model: 'User',
        proxy: {
            type: 'ajax',
            url: 'Templates/Hermes/php/index_data.php',
            reader: {type: 'json',root: 'users'}
        },
        autoLoad: false
    });
    myStore.load({params: {index:index},scope: this});
    this.cellEditing = new Ext.grid.plugin.CellEditing({clicksToEdit:1});
    Ext.create('Ext.grid.Panel', {
        title: 'Todos los cursos',
        store: myStore,
        columns: [
            { text: 'Nombre',  dataIndex: 'nombre', flex:2},
            { text: 'Fecha inicio', dataIndex: 'inicio',flex:1},
            { text: 'Fecha Fin', dataIndex: 'fin',flex:1 }
        ],
        height:'80%',
        width: '90%',
        renderTo: 'cursos',
        plugins: [this.cellEditing,{
            ptype: 'rowexpander',
            rowBodyTpl : new Ext.XTemplate(
                '<div class="label label-info">Descripcion del Curso:</div><br>{desc}</div><br>'
            )
        }]
    });



}
//----------------------------------------------Jquery----------------------------------------------------------------->
