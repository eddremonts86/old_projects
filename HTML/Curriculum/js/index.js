/**
 * Created by edd on 25/02/2015.
 */
var num=0;
var award=0;
var height =  $(window).height();
/*$(window).resize(function() {
    $('section').css("height",(height+200) +"px");
});*/
$(document).ready(function () {
  Timer();
   /* $('section').css("height",(height+200)+"px");*/
	
  $('input,#ESP').click(function() {
      $('.danes').slideUp("slow", function () { $('.ingles').slideUp("slow", function () {$('.espanol').fadeIn("slow");})});
    })
  $('input,#DNK').click(function() {
      $('.ingles').slideUp("slow", function () { $('.espanol').slideUp("slow", function () {$('.danes').fadeIn("slow");})});
    })
  $("input,#ING").click(function () {
      $('.danes').slideUp("slow", function () { $('.espanol').slideUp("slow", function () {$('.ingles').fadeIn("slow");})});
    });
  $('#oll_print').click(function() {
        print();
    })
  $('#oll_download').click(function() {

    })
});
/*===================================================Otras Funciones===========================*/
function Timer()
{   num++;
    if(num -1 == 0 ){
        $('#wellcome').fadeOut(3100);
    }
    if(num -2 == 0 ){
        $('#pre_welcome').fadeIn(3100);

    }if(num -3 == 0 ){
        $('#pre_welcome').fadeOut(3100);
    }
    if(num -4 == 0 ){
        $('#pre_welcome_dank').fadeIn(3100);

    }if(num -5 == 0 ){
    $('#pre_welcome_dank').fadeOut(3100);
}
    if(num -6 == 0 ){
        $('#wellcome').fadeIn(3100);
        num=0
    }
    setTimeout('Timer();',3500);
}