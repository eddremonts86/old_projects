/**
 * Created with JetBrains PhpStorm.
 * User: edd
 * Date: 1/02/14
 * Time: 14:03
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function() {
    var state;
    var resp;
    $('#debug').click(function() {
        state='debug';
        $("#debug").addClass('btn-info');
        $("#test").removeClass('btn-success').addClass('btn btn-rct');
        $("#relase").removeClass('btn-warning').addClass('btn btn-rct');

    })
    $('#test').click(function() {
        state='test';
        $("#test").addClass('btn-success');
        $("#debug").removeClass('btn-info').addClass('btn btn-rct');
        $("#relase").removeClass('btn-warning').addClass('btn btn-rct');
    })
    $('#relase').click(function() {
        state='relase';
        $("#relase").addClass('btn-warning');
        $("#debug").removeClass('btn-info').addClass('btn btn-rct');
        $("#test").removeClass('btn-success').addClass('btn btn-rct');
    })
    $('#respaldo').click(function() {
        resp='respaldo';
        $("#respaldo").addClass('btn-success');
        $("#borrar").removeClass('btn-danger').addClass('btn btn-rct');
    })
    $('#borrar').click(function() {
        resp='borrar';
        $("#borrar").addClass('btn-danger');
        $("#respaldo").removeClass('btn-success').addClass('btn btn-rct');
    })
    $('#a').click(function() {
        $("#inicio").removeClass('badge-info').addClass('badge-warning');
        $("#bd").removeClass('badge-warning').addClass('badge-info');
        $("#genral").removeClass('badge-warning').addClass('badge-info');
        $("#conf").removeClass('badge-warning').addClass('badge-info');

    })
    $('#b').click(function() {
        $("#conf").removeClass('badge-info').addClass('badge-warning');
        $("#bd").removeClass('badge-warning').addClass('badge-info');
        $("#genral").removeClass('badge-warning').addClass('badge-info');
        $("#inicio").removeClass('badge-warning').addClass('badge-info');
    })
    $('#c').click(function() {
        var sitio =  $('#nombre_sitio').val();
        var desc =  $('#desc_sitio').val();
        var correo_=  $('#correo_').val();
        var usuario_=  $('#usuario_').val();
        var password =  $('#password').val();
        var password_=  $('#password_').val();
        var Hospedaje_=  $('#Hospedaje_').val();
        var Datos_=  $('#Datos_').val();
        var Base_=  $('#Base_').val();

        $("#bd").removeClass('badge-info').addClass('badge-warning');
        $("#conf").removeClass('badge-warning').addClass('badge-info');
        $("#genral").removeClass('badge-warning').addClass('badge-info');
        $("#inicio").removeClass('badge-warning').addClass('badge-info');


    })
    $('#z').click(function() {
        $("#genral").removeClass('badge-info').addClass('badge-warning');
        $("#bd").removeClass('badge-warning').addClass('badge-info');
        $("#conf").removeClass('badge-warning').addClass('badge-info');
        $("#inicio").removeClass('badge-warning').addClass('badge-info');

       var sitio =  $('#nombre_sitio').val();
       var desc =  $('#desc_sitio').val();
       var correo_=  $('#correo_').val();
       var usuario_=  $('#usuario_').val();
       var password =  $('#password').val();
       var password_=  $('#password_').val();
       var Hospedaje_=  $('#Hospedaje_').val();
       var Datos_=  $('#Datos_').val();
       var Base_=  $('#Base_').val();

        $('#sitio_nombre').html(sitio);
        $('#desc_nombre').html(desc);
        $('#modo').html(state);
        $('#Respardar').html(resp);

        $('#Correo').html(correo_);
        $('#Usuario').html(usuario_);
        $('#Hospedaje').html(Hospedaje_);
        $('#Datos').html(Datos_);
        $('#Base').html(Base_);

    })
    $('#licence').click(function(){
        $('#licenceModal').modal('show')
    })
    $('#Construcción_').mouseover(function(){$("#Construcción_1").removeClass('badge-info').addClass('badge-important');})
    $('#Construcción_').mouseout(function(){$("#Construcción_1").removeClass('badge-important').addClass('badge-info');})
    $("#Construcción_").click(function () {$("#Construcción").show("slow");});
    $('#Prueba_').mouseover(function(){$("#Prueba_1").removeClass('badge-success').addClass('badge-important');})
    $('#Prueba_').mouseout(function(){$("#Prueba_1").removeClass('badge-important').addClass('badge-success');})
    $("#Prueba_").click(function () {$("#Prueba").show("slow");});
    $('#Ejecución_').mouseover(function(){$("#Ejecución_1").removeClass('badge-warning').addClass('badge-important');})
    $('#Ejecución_').mouseout(function(){$("#Ejecución_1").removeClass('badge-important').addClass('badge-warning');})
    $("#Ejecución_").click(function () {$("#Ejecución").show("slow");});
    $('#install').click(function(){
        var importar='importar';

        var sitio =  $('#nombre_sitio').val();
        var desc =  $('#desc_sitio').val();
        state;

        var correo_=  $('#correo_').val();
        var usuario_=  $('#usuario_').val();
        var puerto_=  $('#puerto_').val();
        var password =  $('#password').val();
        var password_=  $('#password_').val();

        var Hospedaje_=  $('#Hospedaje_').val();
        var Datos_=  $('#Datos_').val();
        var Base_=  $('#Base_').val();
        var BD_pass=  $('#BD_pass').val();
        resp;

         var html= "<div id=\'megerror\' class=\'modal hide fade\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>"+
            "<div class=\'modal-header\'>"+
            "<h3 id='myModalLabel'>Por favor espere un momento</h3></div>"+
            "<div class='modal-body load' style='margin: 10px'></div>";
        $('#alertas').html(html);
        $('#megerror').modal('show');
        if(password!=password_){
           $('#megerror').modal('hide');
           var html= "<div id=\'alertModal\' class=\'modal hide fade\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>"+
                     "<div class=\'modal-header\'>"+
                     "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"+
                     "<h3 id='myModalLabel'>Ha ocurrido un error</h3></div>"+
                     "<div class='modal-body'><p>Las contraceñas deben coincidir,por favor reviselas.</p></div>"+
                     "<div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>Cerrar</button>";
            $('#alertas').html(html);
            $('#alertModal').modal('show');
        }
        else  if(usuario_!=''&puerto_!=''&&correo_!=''&&Hospedaje_!=''&&Datos_!=''&&Base_!=''&&BD_pass!=''&&state!=''&&sitio!=''){
            $('#megerror').modal('hide');
            var html= "<div id=\'alertModal\' class=\'modal hide fade\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>"+
                "<div class=\'modal-header\'>"+
                "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"+
                "<h3 id='myModalLabel'>Ha ocurrido un error</h3></div>"+
                "<div class='modal-body'><p>Existen itens basios,por favor reviselas.</p></div>"+
                "<div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>Cerrar</button>";
            $('#alertas').html(html);
            $('body').removeClass('modal-backdrop fade in load');
            $('#alertModal').modal('show');
        }
        else if(usuario_!=null &&puerto_!=null &&correo_!=null &&Hospedaje_!=null &&Datos_!=null &&Base_!=null &&BD_pass!=null &&state!=null &&sitio!=null){
            $('#megerror').modal('hide');
            var html= "<div id=\'alertModal\' class=\'modal hide fade\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>"+
                "<div class=\'modal-header\'>"+
                "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"+
                "<h3 id='myModalLabel'>Ha ocurrido un error</h3></div>"+
                "<div class='modal-body'><p>Existen itens basios,por favor reviselas.</p></div>"+
                "<div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>Cerrar</button>";
            $('#alertas').html(html);
            $('#alertModal').modal('show');
        }
        else{$.getJSON("php/control.php",{
                test:importar,
                sitio:sitio ,
                desc:desc,
                state:state,
                resp:resp,
                correo_:correo_ ,
                usuario_:usuario_,
                password:password,
                Hospedaje_:Hospedaje_,
                puerto_:puerto_,
                Datos_:Datos_,
                Base_:Base_,
                BD_pass:BD_pass
            },function(data){
               if(data.msg=='true'){
                   $('#megerror').modal('hide');
                   var respons=data.msg;
                   var html= "<div id=\'alertModal\' class=\'modal hide fade\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>"+
                       "<div class=\'modal-header\'>"+
                       "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"+
                       "<h3 id='myModalLabel'>Gracias por intalar nuestra aplicación</h3></div>"+
                       "<div class='modal-body'><p>Ahora para terminar la instalaion debe borrar o renombrar la carpeta de instalación. </p></div>"+
                       "<div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>Cerrar</button>";
                   $('#alertas').html(html);
                   $('body').removeClass('modal-backdrop fade in load');
                   $('#alertModal').modal('show');
               }
                else{
                $('#megerror').modal('hide');
                var respons=data.msg;
                var html= "<div id=\'alertModal\' class=\'modal hide fade\' tabindex=\'-1\' role=\'dialog\' aria-labelledby=\'myModalLabel\' aria-hidden=\'true\'>"+
                    "<div class=\'modal-header\'>"+
                    "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>"+
                    "<h3 id='myModalLabel'>Ha ocurrido un error</h3></div>"+
                    "<div class='modal-body'><p>"+respons+"</p></div>"+
                    "<div class='modal-footer'><button class='btn' data-dismiss='modal' aria-hidden='true'>Cerrar</button>";
                $('#alertas').html(html);
                $('#alertModal').modal('show');
                }
            });}
    });

});


