
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
//================================================Funciones Estaticas==================================================/
$(document).ready(function() {
    $('#myCarousel').carousel({interval: 12000 , pause: 'hover'})
//------------------------------------------------Barra navegacion------------------------------------------>
    $('#inicio').click(function() {
        var html = "<div align='center' style='height: 60%'>" +
                        "<form class='navbar-form' method='post' action='App/Server/fn_call.php' onSubmit='enviarDatos()'>" +
                        "<table width='300px' style='margin-top: 150px'>" +
                            "<tr>" +
                                "<td align='center'><input type='text' style='border: 1px solid #cccccc;width:200px' id='user_log' class='span2' placeholder='Entre usuario' name='user_log' required='true'></td>" +
                            "</tr>" +
                            "<tr>" +
                                "<td align='center'><input type='password' id='user_pwd' class='span2' style='border: 1px solid #cccccc;width:200px' placeholder='Entre contraseña' name='user_pwd' required='true'></td>" +
                            "</tr>" +
                            "<tr>" +
                                "<td align='right'><input type='hidden' name='fn' value='App.Log.Log.LogUser'>" +
                                    "<button type='submit' class='btn btn-primary' name='subsystem'><i class='icon-warning-sign icon-white'></i>Aceptar</button></td>" +
                            "</tr>" +
                        "</table>" +
                            //"<div class='pull-right'>" +
                        "</form>" +
                    "</div>";
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html(html);
        $("#cuerpo").fadeIn(1000);
    });
    $('#nosotros').removeClass('active');
    $('#hermes').removeClass('active');
    $('#contacto').removeClass('active');
    $('#inicio').addClass('active');
})
    $('#hermes').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1><img src='App/Client/img/logo/user3.png'>Sobre Hermes</h1>" +
                "<div class='label label-info'>Hermes y su uso:</div>" +
                "<div>En estos momentos el desarrollo tecnológico es sin dudas una esfera primordial en el desarrollo de una " +
                "empresa y no se puede estar exenta a ella. Por tal motivo la actualidad nacional e internacional se traza como eje " +
                "principal la informatización de los procesos para con  esto optimizar sus procesos y ahorrar en tiempo y recursos " +
                "para su propio desarrollo. El sistema de gestión del capital humano <div class='label label-info'> “Hermes” </div> es un ejemplo de soluciones que se pueden realizar para"+
                "avanzar en pos de la digitalización de los procesos. Resultados que se esperan.<br>" +
                "<div class='alert alert-info' style='column-count:3;-moz-column-count:3;-webkit-column-count:3;-o-column-count:3;column-rule:1px solid #3a87ad;-moz-column-rule:1px solid #3a87ad;-o-column-rule:1px solid #3a87ad;-webkit-column-rule:1px solid #3a87ad'>"+
                "<li>Control de la Seguridad y la Salud de los trabajadores</li>"+
                "<li>Chequeo médico  requerido según el cargo.</li>"+
                "<li>Enfermedad que padece.</li>"+
                "<li>Curvatura de talla de los trabajadores con el resumen</li>"+
                "<li>Reservaciones entregadas a los trabajadores.</li>"+
                "<li>Control de la Plantilla de la empresa y listado de cargos.</li>"+
                "<li>Resumen de la plantilla de la empresa y listado de cargos.</li>"+
                "<li>Control de los contratos</li>"+
                "<li>Resumen de contratos según el tipo.</li>"+
                "<li>Control de las Nóminas, pre nóminas, descuentos y capacidad de compra en tienda.</li>"+
                "<li>Control del Submayor de Vacaciones de los trabajadores.</li>"+
                "<li>Control de la superación y la necesidad de aprendizaje de los Trabajadores.</li>"+
                "<li>Absorber de los profesiogramas del modelo de desempeño las necesidades de aprendizaje de cada trabajador.</li>"+
                "<li>Necesidades de superación planteadas por los trabajadores</li>"+
                "<li>Necesidades de superación que se aprueban por el jefe.</li>"+
                "<li>Plan de superación y real.</li>"+
                "<li>Plan de capacitación de un área, listado por unidades y por tema de capacitación.</li>"+
                "<li>Control de los cuadros y las reservas de cuadros.</li>"+
                "<li>Registro de  datos primarios de cuadros y reservas </li> "+
                "<li>Registro de reservaciones </li> "+
                "<li>Registro de entrega de artículos de calidad de vida </li> "+
                "<li>Resumen de cargos de cuadros y reservas </li> "+
                "<li>Control de la tarjeta SNC-225.</li>"+
                "<li>Control de la Situación de la Defensa de los trabajadores.</li>"+
                "<li>Resumen de la situación en la defensa de cada trabajador ( Registro Militar) </li> "+
                "<li>Gestión de los Profesiogramas</li>"+
                "<li>Aspectos generales del cargo </li> "+
                "<li>Evaluación por Competencias </li> "+
                "<li>Funciones </li> "+
                "<li>Calificador Utilizado </li> "+
                "<li>Riesgos del puesto de trabajo </li> "+
                "<li>Condiciones de trabajo </li> "+
                "<li>Requisitos físicos </li> "+
                "<li>Equipos de Protección Personal </li> "+
                "<li>Desempeño </li> "+
                "<li>Aspectos e impactos ambientales </li> "+
                "<li>Estimulación de los trabajadores y cuadros</li>"+
                "<li>Modelos para evaluar a los trabajadores </li> "+
                "<li>Certificación de los indicadores </li> "+
                "<li>Estímulos y medidas disciplinarias de los cuadros y trabajadores</li>"+
                "<li>Registro de medidas disciplinarias para cuadros y trabajadores </li> "+
                "<li>Condecoraciones para cuadros y trabajadores</li>"+
                "<li>Registro de condecoraciones </li> "+
                "<li>Informaciones a rendir al mando superior</li>"+
                "<li>Modelaje utilizado en la información estadística </li> "+
                "<li>Registro de trabajadores con resumen según sexo, edad, nivel escolar, especialidad</li>"+
                "<li>Organigrama.</li>"+
                "</div>"+
                "</div>"+
                "</div>");
            $("#cuerpo").fadeIn(1000);
        });

        $('#nosotros').removeClass('active');
        $('#inicio').removeClass('active');
        $('#contacto').removeClass('active');
        $('#hermes').addClass('active');
    })
    $('#nosotros').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Sobre Nosotros</h1><div class='label label-info'>¿Quienes somos?</div>" +
                "<br><div class='alert alert-info'> Se incrementan los desarrollos de software aplicados a los productos y servicios de GEOCUBA en el ámbito de la Cartografía Digital (CD)," +
                "los Sistemas de Información Geográfica (SIG), la Infraestructura de Datos Espaciales (IDE), la fotogrametría, la geodesia y la topografía, el " +
                "catastro, los estudios medioambientales y los estudios marinos." +
                "<br>Se desarrollan los sistemas informáticos de gestión bajo estándares definidos y soportados bajo una misma arquitectura." +
                "<br>Se alcanza una dirección integrada de proyectos " +
                "informáticos y se posee un personal capacitado y competente para el desarrollo de los sistemas." +
                "<br>Se cuenta con un Centro de Datos que asegura el " +
                "almacenamiento y publicación de datos y metadatos que crea la Empresa GEOCUBA Pinar del Río, así como la provisión de soluciones geoespaciales " +
                "propias y otras asociadas a los servicios que oferta la Empresa a sus clientes." +
                "<br>Se desarrollan soluciones de software con un alto valor innovativo agregado que utilizan " +
                "e integran tecnologías avanzadas e inteligencia de negocios en el contexto geoespacial.<br> " +
                "Los productos y servicios Geomáticos expanden su uso mediante la integración e interoperabilidad entre ellos para " +
                "ofrecer servicios integrados y soluciones múltiples para diferentes usuarios con un interés común." +
                "<br>Se incrementa la provisión de dichas soluciones hacia el exterior. La provisión de productos Geomáticos " +
                "han pasado a ser soluciones independientes para convertirse en productos únicos, integrando servicios y aplicaciones.</div>"
            );
        });
        $("#cuerpo").fadeIn(1000);
        $('#hermes').removeClass('active');
        $('#inicio').removeClass('active');
        $('#contacto').removeClass('active');
        $('#nosotros').addClass('active');
    })
    $('#contacto').click(function() {
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Contactenos</h1><div class='label label-info'>Como puede contactarnos:</div>"+
                "<br><div class='alert alert-info'><b> Agencia de Investigacion y desarrollo aplicado a la Geomatica - Pinar del Río </b><br>" +
                "<b>Direccion:</b> " +
                "<ul>" +
                "<li>Calle: 2da Final</li> " +
                "<li>No: 9</li>" +
                "<li>Reparto: Victoria de Girón</li>" +
                "<li>Municipio: Pinar del Río</li>" +
                "<li>Provincia:  Pinar del Río<br>" +
                "</li></ul>" +
                "<b>Tel:</b> (048)759781<br>" +
                "<b>Correo:</b> aidag@pinar.geocuba.cu<br></div>"
            );
            $("#cuerpo").fadeIn(1000);
        });
        $('#hermes').removeClass('active');
        $('#inicio').removeClass('active');
        $('#nosotros').removeClass('active');
        $('#contacto').addClass('active');

    })

//------------------------------------------------Barra lateral------------------------------------------>
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
        $("#cuerpo").fadeOut(1,function(){
            $('#cuerpo').html("<h1>Que es el modulo Administración</h1>");
            $("#cuerpo").fadeIn(1000);
        });
    })
    $('#main_panel').fadeOut(1,function(){
        //$('#main_panel').attr('style','display = "block"');
        $('#main_panel').fadeIn(2000);
    });

});
//================================================Funciones Dinamicas==================================================/
$(document).ready(function() {
    $('#eventos').click(function() {
     var html='';
     $.getJSON("App/Server/index_data.php",{index:"event"},
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
        $.getJSON("App/Server/index_data.php",{index:"regul"},
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
        $.getJSON("App/Server/index_data.php",{index:"info"},
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
        $.getJSON("App/Server/index_data.php",{index:"sub"},
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
});
//-------------------------------------------------Funciones de Generales--------------------------------->
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
            url: 'App/Server/index_data.php',
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
            url: 'App/Server/index_data.php',
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
