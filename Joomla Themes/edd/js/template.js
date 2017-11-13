/**
 * Created by edd on 25/02/2015.
 */
var num=0;
var height =  $(window).height();
var width =  $(window).width();
$(window).resize(function() {
    $('section').css("min-height",height-100 +"px");
    $('section').css("height","auto");
    $('.sombra_img img').css("height",height-200 +"px");
});
 $(document).ready(function () {
      //Timer();
     $('section').css("min-height",height-100 +"px");
     $('section').css("height","auto");
     /*$('.sombra_img').css("width",width*0.5 +"px");*/
     $('.sombra_img img').css("height",height*0.7 +"px");

     $(window).scroll(function(){});
     $('#cerrar_edd').click(function() {
         $('#errors_edd').fadeOut('slow');
     })
     $('.carousel').carousel({interval: 2000})
 });
    /*===================================================Otras Funciones===========================*/
    function Timer()
    {   console.log(num);
        num++;
        if(num -1 == 0 ){
            $jquery('#wellcome').fadeOut(3100);
        }
        if(num -2 == 0 ){
            $jquery('#pre_welcome').fadeIn(3100);

        }if(num -3 == 0 ){
            $jquery('#pre_welcome').fadeOut(3100);
        }
        if(num -4 == 0 ){
            $jquery('#pre_welcome_dank').fadeIn(3100);

        }if(num -5 == 0 ){
            $jquery('#pre_welcome_dank').fadeOut(3100);
    }
        if(num -6 == 0 ){
            $jquery('#wellcome').fadeIn(3100);
            num=0
        }
        setTimeout('Timer();',3500);
    }