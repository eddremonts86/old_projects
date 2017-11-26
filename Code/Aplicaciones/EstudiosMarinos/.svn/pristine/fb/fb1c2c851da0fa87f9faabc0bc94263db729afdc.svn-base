/**
 * Created by edd on 27/02/14.
 */
$(document).ready(function() {
    $.getJSON("jq_mainPanel.php",{index:"roll"},function(data){
        $('#U_todos').html(data[0].total);
    });
    $.getJSON("jq_mainPanel.php",{index:"rolls"},function(data){
        var html_data='';
        for(var i=0;i<data.length;i++){
                var res=i/2;
                if(res==0)
                html_data += ' <a href="#" class="list-group-item">'+'<span class="badge">'+ data[i]['count'] +'</span>'+
                             '<i class="fa fa-users"></i> '+ data[i]['rol_name'] +''+'</a>';
                else{
                    html_data += ' <a href="#" class="list-group-item">'+'<span class="badge">'+ data[i]['count'] +'</span>'+
                        '<i class="fa fa-users"></i> '+ data[i]['rol_name'] +''+'</a>';
                }
        }
        $('#list_roles').html(html_data);
    });
    $.getJSON("jq_mainPanel.php",{index:"avisos"},function(data){
        var html_data='';
        for(var i=0;i<3;i++){
                var res=i/2;
                if(res==0)
                    html_data += ' <a href="#" class="list-group-item">'+
                        '<span class="badge">'+ data[i]['fecha'] +'</span>'+
                        '<i class="fa fa-adn"></i><b> '+ data[i]['nombre'] +
                        '</b><br><i class="fa fa-android"></i>&nbsp;<b>Caracter: </b>'+ data[i]['caracter'] +'' +
                        '<br><i class="fa fa-calendar"></i>&nbsp;<b>Tipo: </b>'+ data[i]['tipo'] +''+
                        '</a>';
                else{
                    html_data += ' <a href="#" class="list-group-item">'+
                        '<span class="badge">'+ data[i]['fecha'] +'</span>'+
                        '<i class="fa fa-adn"></i><b> '+ data[i]['nombre'] +
                        '</b><br><i class="fa fa-android"></i>&nbsp;<b>Caracter: </b>'+ data[i]['caracter'] +'' +
                        '<br><i class="fa fa-calendar"></i>&nbsp;<b>Tipo: </b>'+ data[i]['tipo'] +''+
                        '</a>';
                     }
        }
        $('#avisos_completops').html(html_data);
    });
    $.getJSON("jq_mainPanel.php",{index:"cantAvisos"},function(data){
        $('#cantAvisos').html(data[0].total);
    });
    $.getJSON("jq_mainPanel.php",{index:"mensajes"},function(data){
        var html_data='';
        for(var i=0;i<data.length;i++){
                var res=i/2;
                if(res==0){
                    html_data += ' <a href="#" class="list-group-item">'+
                        '<span class="badge">'+ data[i]['fecha'] +'</span>'+
                        '<i class="fa fa-adn"></i><b> '+ data[i]['asunto'] +
                        '</b><br><i class="fa fa-android"></i>&nbsp;<b>Cuerpo: </b>'+ data[i]['cuerpo'] +'' +
                        '</a>';
                }
                else{
                    html_data += ' <a href="#" class="list-group-item">'+
                        '<span class="badge">'+ data[i]['fecha'] +'</span>'+
                        '<i class="fa fa-adn"></i><b> '+ data[i]['asunto'] +
                        '</b><br><i class="fa fa-android"></i>&nbsp;<b>Cuerpo: </b>'+ data[i]['cuerpo'] +'' +
                        '</a>';
                     }
        }
        $('#mensajes').html(html_data);
    });
    $.getJSON("jq_mainPanel.php",{index:"cantmensajes"},function(data){
        $('#cantmensajes').html(data[0].total);
    });
    $.getJSON("jq_mainPanel.php",{index:"logs"},function(data){
        var html_data='';
        for(var i=0;i<data.length;i++){
                html_data+='<tr class=\"odd gradeX\">'+
                    '<td>'+ data[i]['_user'] +'</td>'+
                    '<td>'+ data[i]['subsystem'] +'</td>'+
                    '<td>'+ data[i]['module'] +'</td>'+
                    '<td class="center">'+ data[i]['moment'] +'</td>'+
                    '<td class="center">'+ data[i]['server_function'] +'</td>'+
                    '</tr>';
        }
        $('#logs').html(html_data);
        $('#dataTables-example').dataTable();
    });
    $.getJSON("jq_mainPanel.php",{index:"cantlogs"},function(data){
        $('#cantlogs').html(data[0].total);
    });

    function muestraMensaje() {alert("Este mensaje se muestra cada segundo");}
    //setInterval(muestraMensaje, 1000);
});