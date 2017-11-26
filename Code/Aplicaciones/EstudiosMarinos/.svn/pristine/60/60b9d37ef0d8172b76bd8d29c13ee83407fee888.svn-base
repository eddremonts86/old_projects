/**
 * Created with JetBrains PhpStorm.
 * User: remonts
 * Date: 1/01/14
 * Time: 11:12
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {

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


    $("#ark_b_1").toggle(
        function () {
            $("#ark_1").hide(1000);
            $("#ark_b_1 i").removeClass('icon-chevron-up').addClass('icon-chevron-down');
        },
        function () {
            $("#ark_1").show("slow");
            $("#ark_b_1 i").removeClass('icon-chevron-down').addClass('icon-chevron-up');
        }
    );
    $("#ark_b_2").toggle(
        function () {
            $("#ark_2").hide(1000);
            $("#ark_b_2 i").removeClass('icon-chevron-up').addClass('icon-chevron-down');
        },
        function () {
            $("#ark_2").show("slow");
            $("#ark_b_2 i").removeClass('icon-chevron-down').addClass('icon-chevron-up');
        }
    );
    $("#ark_b_3").toggle(
        function () {
            $("#ark_3").hide(1000);
            $("#ark_b_3 i").removeClass('icon-chevron-up').addClass('icon-chevron-down');
        },
        function () {
            $("#ark_3").show("slow");
            $("#ark_b_3 i").removeClass('icon-chevron-down').addClass('icon-chevron-up');
        }
    );
    $("#ark_b_4").toggle(
        function () {
            $("#ark_4").hide(1000);
            $("#ark_b_4 i").removeClass('icon-chevron-up').addClass('icon-chevron-down');
        },
        function () {
            $("#ark_4").show("slow");
            $("#ark_b_4 i").removeClass('icon-chevron-down').addClass('icon-chevron-up');
        }
    );





    $("#importante").toggle(
        function () {
            var datos='<div class="contenedorR">'+
                '<div class="contenedor_Red">Conocimientos Previos</div>'+
                '<b>ARKit</b> es por decirlo de alguna manera una forma un contenedor que intenta  integrar'+
                'las tecnologias y lenguajes (JQuery,ExtJs,PHP,HTML 5,CSS3...) mas usados en el mundo de la web'+
                'y de esta manera sacar el mayor provecho y asi plantiar soluciones que se adapten a las nesecidades'+
                'del cliente final.<br>'+
                'Por ello antes de intentar realizar nuevas aplicaciones con  <b>ARKit</b> debe plantearse conocer un minimo de estas tecnologias.<br>'+
                '<li>HTML4/HTML5</li>'+
                '<li>CSS2/CSS3</li>'+
                '<li>XML</li>'+
                '<li>ExtJs 4.2</li>'+
                '<li>JQuery 1.9 o superior</li>'+
                '<li>PHP4.0 o superior</li>'+
                '</div><br>'+
                '<div class="contenedorR">'+
                '<div class="contenedor_Red">Modo de actualización</div>'+
                '<b>ARKit</b> es una tecnologia viva que esta en pleno proceso de implementacion continua y por ello'+
                'existen actualizaciones y/o parches a diario mantengase en contacto para estar siempre actualizado.'+
                '</div>';

            $("#cuerpo").fadeOut(1,function(){$('#cuerpo').html(datos);
            $("#cuerpo").fadeIn(1000);});
        },
        function () {
            $("#cuerpo").fadeOut(1000,function(){$('#cuerpo').html("<br>");
            //$("#cuerpo").fadeIn(1000);
            });
        }
    );
    $("#importante").hover(
        function () {
            $(this).addClass("label label-important");
        },
        function () {
            $(this).removeClass("label label-important ");
        }
    );

    $("#ejemplo1").toggle(
        function () {
            $("#ejemplo1_1").show("slow");
        },
        function () {
            $("#ejemplo1_1").hide(1000);
        }
    );
    $("#ejemplo2").toggle(
        function () {
            $("#ejemplo2_1").show("slow");
        },
        function () {
            $("#ejemplo2_1").hide(1000);
        }
    );
    $("#ejemplo3").toggle(
        function () {
            $("#ejemplo3_1").show("slow");
        },
        function () {
            $("#ejemplo3_1").hide(1000);
        }
    );
    $("#ejemplo4").toggle(
        function () {
            $("#ejemplo4_1").show("slow");
        },
        function () {
            $("#ejemplo4_1").hide(1000);
        }
    );
    $("#ejemplo5").toggle(
        function () {
            $("#ejemplo5_1").show("slow");
        },
        function () {
            $("#ejemplo5_1").hide(1000);
        }
    );
    $("#ejemplo6").toggle(
        function () {
            $("#ejemplo6_1").show("slow");
        },
        function () {
            $("#ejemplo6_1").hide(1000);
        }
    );
    $("#ejemplo7").toggle(
        function () {
            $("#ejemplo7_1").show("slow");
        },
        function () {
            $("#ejemplo7_1").hide(1000);
        }
    );


})