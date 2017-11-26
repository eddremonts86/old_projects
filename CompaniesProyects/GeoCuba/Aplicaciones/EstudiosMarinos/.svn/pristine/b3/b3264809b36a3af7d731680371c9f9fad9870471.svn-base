/**
 * Created by edd on 4/03/14.
 */
function Administrador(){
    this.__data_store = null;
    this.Init = function()
    {
        var _menu_item_config_ADMIN =
        {
            text: 'Administración',
            id: 'event_info_Administracion',
            iconCls: 'nomencladores',
            handler: Ext.Function.bind(this.ShowMainWindow, this)
        };
        App.InsertMenuItem('Administrar', _menu_item_config_ADMIN);

    }
    // ========================================================================//
    this.BuildMainPanel = function(filterObj){
        var _panel = new Ext.Panel({
                title: 'Administracion General del sistema',
                border: true,
                frame: true,
                layout: 'border',
                height: App.GetDesktopHeigth(),
                width: '100%',
                autoScroll:true,
                html:' ' +
                    '<body class="fondo" style="margin-left:100px; margin-right:100px; margin-top:20px;">'+
                    '<div class="row">'+
                    '<div class="col-lg-3">'+
                        '<div class="panel panel-info">'+
                           '<div class="panel-heading">'+
                                '<div class="row">'+
                                    '<div class="col-xs-6">'+
                                        '<i class="fa fa-users fa-5x"></i>'+
                                    '</div>'+
                                    '<div class="col-xs-6 text-right">'+
                                        '<p  class="announcement-heading">Cantidad total de Usuarios <span id="U_todos"></span></p>'+
                                        '<p class="announcement-text">Mis Usuarios!</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<br>'+
                                '<div class="list-group" id="list_roles"></div>'+
                            '</div>'+
                        '</div>'+
                    '<div class="col-lg-3">'+
                        '<div class="panel panel-info">'+
                            '<div class="panel-heading">'+
                                '<div class="row">'+
                                    '<div class="col-xs-6">'+
                                        '<i class="fa fa-money fa-5x"></i>'+
                                    '</div>'+
                                    '<div class="col-xs-6 text-right">'+
                                        '<p class="announcement-heading">18</p>'+
                                        '<p class="announcement-text">Mis Invitados</p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="panel-body">'+
                                '<div class="table-responsive">'+
                                    '<table class="table table-bordered table-hover table-striped tablesorter">'+
                                        '<thead>'+
                                            '<tr>'+
                                                '<th>Order # <i class="fa fa-sort"></i></th>'+
                                                '<th>Order Date <i class="fa fa-sort"></i></th>'+
                                            '</tr>'+
                                        '</thead>'+
                                        '<tbody>'+
                                            '<tr>'+
                                                '<td>3326</td>'+
                                                '<td>10/21/2013</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td>3325</td>'+
                                                '<td>10/21/2013</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td>3324</td>'+
                                                '<td>10/21/2013</td>'+
                                            '</tr>'+
                                            '<tr>'+
                                                '<td>3319</td>'+
                                                '<td>10/21/2013</td>'+
                                            '</tr>'+
                                        '</tbody>'+
                                    '</table>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="col-lg-6">'+
                '<div class="panel panel-info">'+
                    '<div class="panel-heading">'+
                        '<div class="row">'+
                            '<div class="col-xs-6">'+
                                '<i class="fa fa-clock-o fa-5x"></i>'+
                            '</div>'+
                            '<div class="col-xs-6 text-right">'+
                                '<p class="announcement-heading">18</p>'+
                                '<p class="announcement-text">Usuarios Activos</p>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="panel-body">'+
                        '<div class="list-group">'+
                            '<a href="#" class="list-group-item">'+
                                '<span class="badge">just now</span>'+
                                '<i class="fa fa-calendar"></i> Calendar updated'+
                            '</a>'+
                            '<a href="#" class="list-group-item">'+
                                '<span class="badge">4 minutes ago</span>'+
                                '<i class="fa fa-comment"></i> Commented on a post'+
                            '</a>'+
                            '<a href="#" class="list-group-item">'+
                                '<span class="badge">23 minutes ago</span>'+
                                '<i class="fa fa-truck"></i> Order 392 shipped'+
                            '</a>'+
                            '<a href="#" class="list-group-item">'+
                                '<span class="badge">46 minutes ago</span>'+
                                '<i class="fa fa-money"></i> Invoice 653 has been paid'+
                            '</a>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '</div>'+


                    '</div><!-- /.row -->'+
                        '<div class="row">'+
                           '<div class="col-lg-6">'+
                                '<div class="panel panel-warning">'+
                                    '<div class="panel-heading">'+
                                        '<div class="row">'+
                                            '<div class="col-xs-6">'+
                                                '<i class="fa fa-check fa-5x"></i>'+
                                            '</div>'+
                                            '<div class="col-xs-6 text-right">'+
                                                '<p class="announcement-heading">Cantidad total de Avisos <span id="cantAvisos"></span></p>'+
                                                '<p class="announcement-text">Ultimos Avisos</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="panel-body">'+
                                        '<div class="list-group" id="avisos_completops"></div>'+
                                        '<div class="text-right">'+
                                            '<a href="#">Ver todas <i class="fa fa-arrow-circle-right"></i></a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="col-lg-6">'+
                                '<div class="panel panel-success">'+
                                    '<div class="panel-heading">'+
                                        '<div class="row">'+
                                           '<div class="col-xs-6">'+
                                                '<i class="fa fa-comments fa-5x"></i>'+
                                            '</div>'+
                                            '<div class="col-xs-6 text-right">'+
                                                '<p class="announcement-heading">Cantidad total de Contactos y Sujerencias <span id="cantmensajes"></span></p>'+
                                                '<p class="announcement-text">Contactos y Sujerencias!</p>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="panel-body">'+
                                        '<div class="list-group" id="mensajes"></div>'+
                                        '<div class="text-right">'+
                                            '<a href="#">Ver todas <i class="fa fa-arrow-circle-right"></i></a>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+

                    '<div class="row">'+
                        '<div class="col-lg-12">'+
                            '<div class="panel panel-danger">'+
                                '<div class="panel-heading">'+
                                    '<div class="row">'+
                                        '<div class="col-xs-6">'+
                                            '<i class="fa fa-tasks fa-5x"></i>'+
                                        '</div>'+
                                        '<div class="col-xs-6 text-right">'+
                                            '<p class="announcement-heading" id="">Cantidad total de Adtividad y logs <span id="cantlogs"></span></p>'+
                                           ' <p class="announcement-text">Actividad y Logs</p>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="panel-body">'+
                                    '<div class="table-responsive">'+
                                        '<table  class="table table-striped table-bordered table-hover" id="dataTables-example">'+
                                            '<thead>'+
                                                '<tr>'+
                                                    '<th>Usuario <i class="fa fa-sort"></i></th>'+
                                                    '<th>Sistema<i class="fa fa-sort"></i></th>'+
                                                    '<th>Modulo<i class="fa fa-sort"></i></th>'+
                                                    '<th>Hora <i class="fa fa-sort"></i></th>'+
                                                    '<th>Función <i class="fa fa-sort"></i></th>'+
                                                '</tr>'+
                                            '</thead>'+
                                            '<tbody id="logs"></tbody>'+
                                        '</table>'+
                                    '</div>'+
                                    '<div class="text-right">'+
                                        '<a href="#">Ver todas <i class="fa fa-arrow-circle-right"></i></a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div><!-- /.row -->'+

        '',

                listeners: {afterrender: function() {
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"roll"},function(data){
                        $('#U_todos').html(data[0].total);
                    });
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"rolls"},function(data){
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
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"avisos"},function(data){
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
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"cantAvisos"},function(data){
                        $('#cantAvisos').html(data[0].total);
                    });
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"mensajes"},function(data){
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
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"cantmensajes"},function(data){
                        $('#cantmensajes').html(data[0].total);
                    });
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"logs"},function(data){
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
                    $.getJSON("SubSystems/Admin/Administrador/Server/jq_mainPanel.php",{index:"cantlogs"},function(data){
                        $('#cantlogs').html(data[0].total);
                    });
                    App.UpBanner();
                },scope : this}
            });
        return _panel;
    }
    // ========================================================================//
    this.Free = function(){}
    // ========================================================================//
    this.ShowMainWindow = function(){
        App.ShowMainPanel(null);
    }
}
App.RegisterModule('Administrador', new Administrador());