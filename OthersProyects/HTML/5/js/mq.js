/**
 * Created by edd on 29/05/14.
 */
var num=0;
$(document).ready(function () {
$('.close').hide();
    Timer();
});
function Timer()
{
    //console.log(num);
    num++;
    var arra=['img/ne3gro.png','img/neg2ro.png','img/neg23ro.png','img/negr1o.png','img/negro.png'];
    $('#up').show(1000).attr('style',' background-image: url("'+arra[num]+'") !important;');
    if(num %4 == 0 ){num=0}
    setTimeout('Timer();',5000);

}