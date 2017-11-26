/**
 * Created with JetBrains PhpStorm.
 * User: edd
 * Date: 3/01/14
 * Time: 20:20
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    $('#myCarousel').carousel({interval: 12000 , pause: 'hover'})
    $('#Carousel_img').carousel({interval: 10000 , pause: 'hover'})

    var carrusel='';
    $.getJSON("Templates/Hoteles/tpl.php/index_data.php",{index:"datos_compact"},function(data){
        for(var i=0;i<data.length;i++){
            if(i==0){
                html_data =   '<div class=\"active item\"><img style="height:100%;max-height: 467px" src="data:image/png;base64,'+ data[i]['img'] +'"/></div>';
            }
            else{
                html_data =   '<div class=\"item\"><img style="height:100%;max-height: 467px" src="data:image/png;base64,'+ data[i]['img'] +'"/></div>';
            }
            carrusel = carrusel + html_data;
        }
        $('#Carousel_img_carrusel').html(carrusel);
    });
    $(function(){banner();});
    function banner(){
        jQuery.fx.interval = 1;
            $("#banner").fadeOut(3000,function(){
            $('#banner').html("<img src=\"Templates/Hoteles/img/Banner/a.jpg\">");
            $("#banner").fadeIn(3000);
            $("#banner").fadeOut(3000,function(){
                $('#banner').html("<img src=\"Templates/Hoteles/img/Banner/b.jpg\">");
                $("#banner").fadeIn(3000);
                $("#banner").fadeOut(3000,function(){
                    $('#banner').html("<img src=\"Templates/Hoteles/img/Banner/c.jpg\">");
                    $("#banner").fadeIn(3000);
                    $("#banner").fadeOut(3000,function(){
                        $('#banner').html("<img src=\"Templates/Hoteles/img/Banner/d.jpg\">");
                        $("#banner").fadeIn(3000);
                        $("#banner").fadeOut(3000,function(){
                            $('#banner').html("<img src=\"Templates/Hoteles/img/Banner/f.jpg\">");
                            $("#banner").fadeIn(3000);
                            $("#banner").fadeOut(3000,function(){
                                $('#banner').html("<img src=\"Templates/Hoteles/img/Banner/e.jpg\">");
                                $("#banner").fadeIn(3000); });
                        });
                    });
                });
            });
        });
    }

    $('#subs').click(function() {
        var html='';
        $.getJSON("Templates/Hermes/php/index_data.php",{index:"sub"},
            function(data){
                for(var i=0;i<data.length;i++){
                    if(i==0){
                        html_data =  "<button type='submit' class='btn-der 1btn-primary' value="+data[i]['subsystem']+" name='subsystem'><i class='icon-warning-sign 1icon-white'></i> "+data[i]['subsystem']+"</button>"
                    }
                    else if (i==data.length-1){
                        html_data =  "<button type='submit' class='btn-izq 1btn-primary' value="+data[i]['subsystem']+" name='subsystem'><i class='icon-warning-sign 1icon-white'></i> "+data[i]['subsystem']+"</button>"
                    }
                    else {
                        html_data =  "<button type='submit' class='btn-rct 1btn-primary' value="+data[i]['subsystem']+" name='subsystem'><i class='icon-warning-sign 1icon-white'></i> "+data[i]['subsystem']+"</button>"
                    }
                    html = html + html_data;
                }
                $('#subsistemas').html(html);
            });
    })


    $("#id_Importante").hover(
        function () {
            $('#Importante').show();$("#id_Importante").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () {
            $("#Importante").hover(
                function () {$('#Importante').show();$("#id_Importante").removeClass('fondo_mio').addClass("fondo_tbody");},
                function () {$('#Importante').hide();$("#id_Importante").removeClass('fondo_tbody').addClass("fondo_mio");}
            );
        }
    );
    $("#id_Mapas").hover(
        function () {
            $('#Mapas').show();$("#id_Mapas").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () { $("#Mapas").hover(
            function () {$('#Mapas').show();$("#id_Mapas").removeClass('fondo_mio').addClass("fondo_tbody");},
            function () {$('#Mapas').hide();$("#id_Mapas").removeClass('fondo_tbody').addClass("fondo_mio");}
        );}
    );
    $("#id_Graficos").hover(
        function () {
            $('#Graficos').show();$("#id_Graficos").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () {$("#Graficos").hover(
            function () {$('#Graficos').show();$("#id_Graficos").removeClass('fondo_mio').addClass("fondo_tbody");},
            function () {$('#Graficos').hide();$("#id_Graficos").removeClass('fondo_tbody').addClass("fondo_mio");}
        );}
    );
    $("#id_Restaurant").hover(
        function () {$(
            '#Restaurant').show();$("#id_Restaurant").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () {$("#Restaurant").hover(
            function () {$('#Restaurant').show();$("#id_Restaurant").removeClass('fondo_mio').addClass("fondo_tbody");},
            function () {$('#Restaurant').hide();$("#id_Restaurant").removeClass('fondo_tbody').addClass("fondo_mio");}
        );}
    );
    $("#id_Cafeterias").hover(
        function () {
            $('#Cafeterias').show();$("#id_Cafeterias").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () {$("#Cafeterias").hover(
            function () {$('#Cafeterias').show();$("#id_Cafeterias").removeClass('fondo_mio').addClass("fondo_tbody");},
            function () {$('#Cafeterias').hide();$("#id_Cafeterias").removeClass('fondo_tbody').addClass("fondo_mio");}
        );}
    );
    $("#id_Habitaciones").hover(
        function () {
            $('#Habitaciones').show();$("#id_Habitaciones").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () { $("#Habitaciones").hover(
            function () {$('#Habitaciones').show();$("#id_Habitaciones").removeClass('fondo_mio').addClass("fondo_tbody");},
            function () {$('#Habitaciones').hide();$("#id_Habitaciones").removeClass('fondo_tbody').addClass("fondo_mio");}
        );}
    );
    $("#id_Pisinas").hover(
        function () {
            $('#Pisinas').show();$("#id_Pisinas").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () { $("#Pisinas").hover(
            function () {$('#Pisinas').show();$("#id_Pisinas").removeClass('fondo_mio').addClass("fondo_tbody");},
            function () {$('#Pisinas').hide();$("#id_Pisinas").removeClass('fondo_tbody').addClass("fondo_mio");}
        );}
    );
    $("#id_Recreación").hover(
        function () {
            $('#Recreación').show();$("#id_Recreación").removeClass('fondo_mio').addClass("fondo_tbody");},
        function () {$("#Recreación").hover(
            function () {$('#Recreación').show();$("#id_Recreación").removeClass('fondo_mio').addClass("fondo_tbody");},
            function () {$('#Recreación').hide();$("#id_Recreación").removeClass('fondo_tbody').addClass("fondo_mio");}
        );}
    );

    $('#Hotel').click(function() {

        var mio =' <div id="center_slider">'+
                    '<div id="slider">'+
                        /*Este es el cuerpo de la galeria*/
                        '<div class="slide">'+
                            '<img class="diapo" src="Templates/Hoteles/img/Banner/a.jpg" alt="">'+
                                '<div class="text">'+
                                    '<span class="title">The best</span>'+
                                    'The offspring of a customized orbiter, O?kostem arose as the best balanced'+
                                    'home for our plans. So we submitted to its conditions.'+
                                '</div>'+
                        '</div>'+
                        '<div class="slide">'+
                            '<img class="diapo" src="Templates/Hoteles/img/Banner/b.jpg" alt="">'+
                                '<div class="text">'+
                                    '<span class="title">The best</span>'+
                                    'The offspring of a customized orbiter, O?kostem arose as the best balanced'+
                                    'home for our plans. So we submitted to its conditions.'+
                                '</div>'+
                        '</div>'+
                        '<div class="slide">'+
                            '<img class="diapo" src="Templates/Hoteles/img/Banner/c.jpg" alt="">'+
                                '<div class="text">'+
                                    '<span class="title">The best</span>'+
                                    'The offspring of a customized orbiter, O?kostem arose as the best balanced'+
                                    'home for our plans. So we submitted to its conditions.'+
                                '</div>'+
                        '</div>'+
                        '<div class="slide">'+
                            '<img class="diapo" src="Templates/Hoteles/img/Banner/d.jpg" alt="">'+
                                '<div class="text">'+
                                    '<span class="title">The best</span>'+
                                    'The offspring of a customized orbiter, O?kostem arose as the best balanced'+
                                    'home for our plans. So we submitted to its conditions.'+
                                '</div>'+
                        '</div>'+
                        '<div class="slide">'+
                            '<img class="diapo" src="Templates/Hoteles/img/Banner/g.jpg" alt="">'+
                                '<div class="text">'+
                                    '<span class="title">The best</span>'+
                                    'The offspring of a customized orbiter, O?kostem arose as the best balanced'+
                                    'home for our plans. So we submitted to its conditions.'+
                                '</div>'+
                        '</div>'+
                    /*Fin del cuerpo de la galeria*/
                    ' </div>' +
                ' </div>' +
                    ' <script type="text/javascript">slider.init();</script>';
        $("#datos").fadeOut(1,function(){
            $('#datos').html(mio);
            $("#datos").fadeIn(1);
    });
    });


});