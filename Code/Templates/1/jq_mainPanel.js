/**
 * Created by edd on 27/02/14.
 */
selected_feature_data = null;
function model() {
    var html = '<div id="map_campismo_id" style="width: 100%; height: 300px; float: left;"></div>';
     var info=   '<div class="panel panel-success" style="width: 100%; height: 100%;margin-left: 0px; float: none;">'+
            '<div class="panel-heading">Tiempo estimado en auto</div>'+
                '<div class="panel-body" style="margin: 0px !important;">'+
                    '<table class="table table-striped table-bordered table-hover" id="dataTables">'+
                    '<thead>'+
                    '<tr>'+
                    '<th style="width: 60%">Campismo<i class="fa fa-sort"></i></th>'+
                    '<th style="width: 20%">Distancia(KM)<i class="fa fa-sort"></i> </th>'+
                    '<th style="width: 20%">Tiempo Aproximado(H)<i class="fa fa-sort"></i></th>'+
                    '</tr>'+
                    '</thead>'+
                    '<tbody id="logs1">' +
                    '<tr>'+
                    '<td>Prueba1</td>'+
                    '<td>12</td>'+
                    '<td>15</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Prueba2</td>'+
                    '<td>5</td>'+
                    '<td>162</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Prueba3</td>'+
                    '<td>15</td>'+
                    '<td>129</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Prueba4</td>'+
                    '<td>21</td>'+
                    '<td>112</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Prueba5</td>'+
                    '<td>6</td>'+
                    '<td>172</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td>Prueba6</td>'+
                    '<td>10</td>'+
                    '<td>102</td>'+
                    '</tr>'+
                    '</tbody>'+
                '</div>'+
        '</div>';


    $('#carousel-example-generic').html(html);
    $('#mapasssss').html(info);
    $('#dataTables').dataTable();


    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
    OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;
    var map = new OpenLayers.Map('map_campismo_id', {
        projection: "EPSG:4326",
        maxExtent: new OpenLayers.Bounds(-84.55, 18.60, -74.15, 25.15),
        maxResolution: 0.01525,
        /*controls: [
            new OpenLayers.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            new OpenLayers.Control.Zoom(),
            new OpenLayers.Control.Attribution()
        ],*/
        units: 'degrees',
        numZoomLevels: 10
    });
    var format = 'image/png';
    // setup single tiled layer
    var untiled = new OpenLayers.Layer.WMS("Geoserver layers - Untiled", "http://192.168.152.170:8080/googlewms/gmx/wms", {
        LAYERS: 'GoogleRasterCache',
        STYLES: '',
        format: format
    }, {
        singleTile: true,
        ratio: 1,
        isBaseLayer: true,
        yx: {'EPSG:4326': true}
    });
    map.addLayer(untiled);
    var vector_format = new OpenLayers.Format.GeoJSON({});
    var vector_protocol = new OpenLayers.Protocol.HTTP({url: 'js/openlayers/hoteles.json', format: vector_format});
    var vector_strategies = [new OpenLayers.Strategy.Fixed()];
    var hoteles = new OpenLayers.Layer.Vector("Hoteles", {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "js/openlayers/icons/hotel.png",
            backgroundXOffset: 0,
            backgroundYOffset: -7,
            graphicZIndex: 11,
            backgroundGraphicZIndex: 10,
            pointRadius: 10
        }),
        protocol: vector_protocol,
        strategies: vector_strategies
    });
    var sf = new OpenLayers.Control.SelectFeature(hoteles);
    sf.selectStyle = {
        externalGraphic: "js/openlayers/icons/hotel_select.png",
        backgroundXOffset: 0,
        backgroundYOffset: -7,
        graphicZIndex: 11,
        backgroundGraphicZIndex: 10,
        pointRadius: 10
    };
    map.addLayer(hoteles);
    //var feature = hoteles.getFeaturesByAttribute('cmt',selected_feature_data.attributes.cmt);
    //console.log(feature);
    //console.log(selected_feature_data.attributes.name);
    map.addControl(sf);
    //sf.activate();
    map.setCenter(new OpenLayers.LonLat(selected_feature_data.geometry.x,selected_feature_data.geometry.y));
    map.zoomTo(9);
    map.setCenter(new OpenLayers.LonLat(selected_feature_data.geometry.x,selected_feature_data.geometry.y));
    //sf.select(feature[0]);
    //sf.deactivate();

}
function close(izq, der) {
    var len_left = $('#left-side').children().length;
    var len_right = $('#right-side').children().length;

    if (len_left == der && len_right == izq) {
        $("#center").removeClass("center_fool_LF").show(1000);
        $("#center").addClass("center_fool").show(1000);
    }
    else if (len_left == der && len_right != izq) {
        $("#center").addClass("center_fool_LF").show(1000);
    }
    if (len_right == izq && len_left != der ) {
        $("#center").addClass("center_fool_LF").show(1000);
    }
};
function ShowInfo(){
    console.log(selected_feature_data);
    $('#campismo_name_id').text(selected_feature_data.data.name);
    $('#myModal').modal('show');
}
var  map='';
function OnSelectProv(){
    var value = $('#prov_id').val();
    if(value == '-1')
        map.zoomToMaxExtent();
    else{
        var arr = value.split(',');
        var bounds = new OpenLayers.Bounds(arr[0],arr[1],arr[2],arr[3]);
        map.zoomToExtent(bounds,true);
    }
}
$(document).ready(function () {
    var nombre='';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
    OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;
     map = new OpenLayers.Map('Mymap', {
        projection: "EPSG:4326",
        maxExtent: new OpenLayers.Bounds(-84.55, 18.60, -74.15, 25.15),
        maxResolution: 0.01525,
        controls: [
            new OpenLayers.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            }),
            new OpenLayers.Control.Zoom(),
            new OpenLayers.Control.Attribution()
        ],
        units: 'degrees',
        numZoomLevels: 13
    });
    var format = 'image/png';
    // setup single tiled layer
    var untiled = new OpenLayers.Layer.WMS("Geoserver layers - Untiled", "http://192.168.152.170:8080/googlewms/gmx/wms", {
        LAYERS: 'GoogleRasterCache',
        STYLES: '',
        format: format
    }, {
        singleTile: true,
        ratio: 1,
        isBaseLayer: true,
        yx: {'EPSG:4326': true}
    });
    map.addLayer(untiled);
    var vector_format = new OpenLayers.Format.GeoJSON({});
    var vector_protocol = new OpenLayers.Protocol.HTTP({url: 'js/openlayers/hoteles.json', format: vector_format});
    var vector_strategies = [new OpenLayers.Strategy.Fixed()];
    var hoteles = new OpenLayers.Layer.Vector("Hoteles", {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "js/openlayers/icons/hotel.png",
            backgroundXOffset: 0,
            backgroundYOffset: -7,
            graphicZIndex: 11,
            backgroundGraphicZIndex: 10,
            pointRadius: 10
        }),
        protocol: vector_protocol,
        minScale: 2000000,
        strategies: vector_strategies
    });
    map.addLayer(hoteles);
    var sf = new OpenLayers.Control.SelectFeature(hoteles);
    sf.selectStyle = {
        externalGraphic: "js/openlayers/icons/hotel_select.png",
        backgroundXOffset: 0,
        backgroundYOffset: -7,
        graphicZIndex: 11,
        backgroundGraphicZIndex: 10,
        pointRadius: 10
    };
    var popup = "";
    sf.onSelect = function (params) {
        if (popup != "")
            map.removePopup(popup);
          nombre =  params.data.name;
        selected_feature_data = params;
        var datos = '<div><strong>Hotel:</strong> ' + params.data.name + '<br/>'
            + '<strong>Descripción:</strong> ' + params.data.desc
            + '<br/><div id="vmas"  onclick="ShowInfo();"  class="vmas" style="color: #0079d2">Ver más...</div>'
            + '</div>';
        popup = new OpenLayers.Popup.FramedCloud('popup', new OpenLayers.LonLat(params.geometry.x, params.geometry.y), null, datos, null, true);
        map.addPopup(popup);
    };
    map.addControl(sf);
    sf.activate();
    map.zoomToMaxExtent();
});
$(document).ready(function () {
    $('.close').hide();
    $('button #modalclose').show();
    var der = 0;
    var centro = 0;
    var izq = 0;
    $.getJSON("jq_mainPanel.php", {index: "prov"}, function (data) {
        var pro = '<option>Todos los lugares</option> ';
        for (var i = 0; i < data.length; i++) {
            pro += '<option>' + data[i].nombre + '</option>'
        }
        $('#prov').html(pro);
    });
    $.getJSON("jq_mainPanel.php", {index: "roll"}, function (data) {
        $('#U_todos').html(data[0].total);
    });
    $.getJSON("jq_mainPanel.php", {index: "rolls"}, function (data) {
        var html_data = '';
        for (var i = 0; i < data.length; i++) {
            var res = i / 2;
            if (res == 0)
                html_data += ' <a href="#" class="list-group-item">' + '<span class="badge">' + data[i]['count'] + '</span>' +
                    '<i class="fa fa-users"></i> ' + data[i]['rol_name'] + '' + '</a>';
            else {
                html_data += ' <a href="#" class="list-group-item">' + '<span class="badge">' + data[i]['count'] + '</span>' +
                    '<i class="fa fa-users"></i> ' + data[i]['rol_name'] + '' + '</a>';
            }
        }
        $('#list_roles').html(html_data);
    });
    $.getJSON("jq_mainPanel.php", {index: "avisos"}, function (data) {
        var html_data = '';
        for (var i = 0; i < 3; i++) {
            var res = i / 2;
            if (res == 0)
                html_data += ' <a href="#" class="list-group-item">' +
                    '<span class="badge">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><b> ' + data[i]['nombre'] +
                    '</b><br><i class="fa fa-android"></i>&nbsp;<b>Caracter: </b>' + data[i]['caracter'] + '' +
                    '<br><i class="fa fa-calendar"></i>&nbsp;<b>Tipo: </b>' + data[i]['tipo'] + '' +
                    '</a>';
            else {
                html_data += ' <a href="#" class="list-group-item">' +
                    '<span class="badge">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><b> ' + data[i]['nombre'] +
                    '</b><br><i class="fa fa-android"></i>&nbsp;<b>Caracter: </b>' + data[i]['caracter'] + '' +
                    '<br><i class="fa fa-calendar"></i>&nbsp;<b>Tipo: </b>' + data[i]['tipo'] + '' +
                    '</a>';
            }
        }
        $('#avisos_completops').html(html_data);
    });
    $.getJSON("jq_mainPanel.php", {index: "cantAvisos"}, function (data) {
        $('#cantAvisos').html(data[0].total);
    });
    $.getJSON("jq_mainPanel.php", {index: "mensajes"}, function (data) {
        var html_data = '';
        for (var i = 0; i < data.length; i++) {
            var res = i / 2;
            if (res == 0) {
                html_data += ' <a href="#" class="list-group-item">' +
                    '<span class="badge">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><b> ' + data[i]['asunto'] +
                    '</b><br><i class="fa fa-android"></i>&nbsp;<b>Cuerpo: </b>' + data[i]['cuerpo'] + '' +
                    '</a>';
            }
            else {
                html_data += ' <a href="#" class="list-group-item">' +
                    '<span class="badge">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><b> ' + data[i]['asunto'] +
                    '</b><br><i class="fa fa-android"></i>&nbsp;<b>Cuerpo: </b>' + data[i]['cuerpo'] + '' +
                    '</a>';
            }
        }
        $('#mensajes').html(html_data);
    });
    $.getJSON("jq_mainPanel.php", {index: "cantmensajes"}, function (data) {
        $('#cantmensajes').html(data[0].total);
    });
    $.getJSON("jq_mainPanel.php", {index: "logs"}, function (data) {
        var html_data = '';
        for (var i = 0; i < data.length; i++) {
            html_data += '<tr class=\"odd gradeX\">' +
                '<td>' + data[i]['_user'] + '</td>' +
                '<td>' + data[i]['subsystem'] + '</td>' +
                '<td>' + data[i]['module'] + '</td>' +
                '<td class="center">' + data[i]['moment'] + '</td>' +
                '<td class="center">' + data[i]['server_function'] + '</td>' +
                '</tr>';
        }
        $('#logs').html(html_data);
        $('#dataTables-example').dataTable();
    });
    $.getJSON("jq_mainPanel.php", {index: "cantlogs"}, function (data) {
        $('#cantlogs').html(data[0].total);
    });
    $.getJSON("jq_mainPanel.php", {index: "grafic"}, function (data) {
        var obj = data[1];
        Morris.Area({
            element: 'morris-area-chart',
            data: [
                { 'Hora': '0', "Altura": obj.hora0_A, "Velocidad": obj.hora0_V, "Dirección": obj.hora0_D},
                { 'Hora': '1', "Altura": obj.hora1_A, "Velocidad": obj.hora1_V, "Dirección": obj.hora1_D},
                { 'Hora': '2', "Altura": obj.hora2_A, "Velocidad": obj.hora2_V, "Dirección": obj.hora2_D},
                { 'Hora': '3', "Altura": obj.hora3_A, "Velocidad": obj.hora3_V, "Dirección": obj.hora3_D},
                { 'Hora': '4', "Altura": obj.hora4_A, "Velocidad": obj.hora4_V, "Dirección": obj.hora4_D},
                { 'Hora': '5', "Altura": obj.hora5_A, "Velocidad": obj.hora5_V, "Dirección": obj.hora5_D},
                { 'Hora': '6', "Altura": obj.hora6_A, "Velocidad": obj.hora6_V, "Dirección": obj.hora6_D},
                { 'Hora': '7', "Altura": obj.hora7_A, "Velocidad": obj.hora7_V, "Dirección": obj.hora7_D},
                { 'Hora': '8', "Altura": obj.hora8_A, "Velocidad": obj.hora8_V, "Dirección": obj.hora8_D},
                { 'Hora': '9', "Altura": obj.hora9_A, "Velocidad": obj.hora9_V, "Dirección": obj.hora9_D},
                { 'Hora': '10', "Altura": obj.hora10_A, "Velocidad": obj.hora10_V, "Dirección": obj.hora10_D},
                { 'Hora': '11', "Altura": obj.hora11_A, "Velocidad": obj.hora11_V, "Dirección": obj.hora11_D},
                { 'Hora': '12', "Altura": obj.hora12_A, "Velocidad": obj.hora12_V, "Dirección": obj.hora12_D},
                { 'Hora': '13', "Altura": obj.hora13_A, "Velocidad": obj.hora13_V, "Dirección": obj.hora13_D},
                { 'Hora': '14', "Altura": obj.hora14_A, "Velocidad": obj.hora14_V, "Dirección": obj.hora14_D},
                { 'Hora': '15', "Altura": obj.hora15_A, "Velocidad": obj.hora15_V, "Dirección": obj.hora15_D},
                { 'Hora': '16', "Altura": obj.hora16_A, "Velocidad": obj.hora16_V, "Dirección": obj.hora16_D},
                { 'Hora': '17', "Altura": obj.hora17_A, "Velocidad": obj.hora17_V, "Dirección": obj.hora17_D},
                { 'Hora': '18', "Altura": obj.hora18_A, "Velocidad": obj.hora18_V, "Dirección": obj.hora18_D},
                { 'Hora': '19', "Altura": obj.hora19_A, "Velocidad": obj.hora19_V, "Dirección": obj.hora19_D},
                { 'Hora': '20', "Altura": obj.hora20_A, "Velocidad": obj.hora20_V, "Dirección": obj.hora20_D},
                { 'Hora': '21', "Altura": obj.hora21_A, "Velocidad": obj.hora21_V, "Dirección": obj.hora21_D},
                { 'Hora': '22', "Altura": obj.hora22_A, "Velocidad": obj.hora22_V, "Dirección": obj.hora22_D},
                { 'Hora': '23', "Altura": obj.hora23_A, "Velocidad": obj.hora23_V, "Dirección": obj.hora23_D}
            ],
            width: '100%',
            height: '100%',
            xkey: 'Hora',
            ykeys: ['Altura', 'Velocidad', 'Dirección'],
            labels: ['Altura', 'Velocidad', 'Dirección'],
            pointSize: 5,
            hideHover: 'auto',
            resize: true
        });

    });

    $('#ver').click(function () {
        $('#licenceModal').modal('show')
    });
    $('#cerrar').click(function () {
        $('#myModal').modal('hide')
    });
    $('#info').click(function () {
        var htdoc = ' ' +
                '<div id="carousel-example-generic"  style="width: 100%;height: 300px"  class="carousel slide" data-ride="carousel">' +
                '<ol class="carousel-indicators">' +
                '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="1"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="2"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="3"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="4"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="5"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="6"></li>' +
                '</ol>' +
                '<div class="carousel-inner">' +
                '<div class="item active" style="background-color: #005f8d;height: 300px"><img height="300" src="img/carp0/1.jpg"></i></div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp0/2.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp0/3.jpg"> </div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp0/4.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp0/5.jpg"></div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp0/6.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp0/4.jpg"></div>' +
                '</div>' +
                '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"><i class="fa fa-angle-double-left fa-2x"></i></span></a>' +
                '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"><i class="fa fa-angle-double-right fa-2x"></i></span></a>'
            ;
        $('#carousel-example-generic').html(htdoc)
    });
    $('#int0').click(function () {
        var htdoc = ' ' +
                '<div id="carousel-example-generic"  style="width: 100%;height: 300px"  class="carousel slide" data-ride="carousel">' +
                '<ol class="carousel-indicators">' +
                '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="1"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="2"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="3"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="4"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="5"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="6"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="7"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="8"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="9"></li>' +
                '</ol>' +
                '<div class="carousel-inner">' +
                '<div class="item active" style="background-color: #005f8d;height: 300px"><img height="300" src="img/carp1/1.jpg"></i></div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp1/2.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp1/3.jpg"> </div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp1/4.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp1/5.jpg"></div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp1/6.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp1/7.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp1/8.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp1/9.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp1/10.jpg"></div>' +
                '</div>' +
                '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"><i class="fa fa-angle-double-left fa-2x"></i></span></a>' +
                '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"><i class="fa fa-angle-double-right fa-2x"></i></span></a>'
            ;
        $('#carousel-example-generic').html(htdoc)
    });
    $('#int1').click(function () {
        var htdoc = ' ' +
                '<div id="carousel-example-generic"  style="width: 100%;height: 300px"  class="carousel slide" data-ride="carousel">' +
                '<ol class="carousel-indicators">' +
                '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="1"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="2"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="3"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="4"></li>' +
                '<li data-target="#carousel-example-generic" data-slide-to="5"></li>' +
                '</ol>' +
                '<div class="carousel-inner">' +
                '<div class="item active" style="background-color: #005f8d;height: 300px"><img height="300" src="img/carp2/1.jpg"></i></div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp2/2.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp2/3.jpg"> </div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp2/4.jpg"></div>' +
                '<div class="item" style="background-color: seagreen;height: 300px"><img height="300" src="img/carp2/5.jpg"></div>' +
                '<div class="item" style="background-color: #04519b;height: 300px"><img height="300" src="img/carp2/6.jpg"></div>' +
                '</div>' +
                '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev"><i class="fa fa-angle-double-left fa-2x"></i></span></a>' +
                '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next"><i class="fa fa-angle-double-right fa-2x"></i></span></a>'
            ;
        $('#carousel-example-generic').html(htdoc)
    });
    $('#Mapa').click(function () {
        model();
    });
    $('.vmas').click(function () {
        $('#myModal').modal('show')
    });
    $('#verMarea').click(function () {
        $.getJSON("jq_mainPanel.php", {index: "grafic"}, function (data) {
            var obj = data[5];
            $('#morris-area-chart').html('');
            Morris.Area({
                element: 'morris-area-chart',
                data: [
                    { 'Hora': '0', "Altura": obj.hora0_A, "Velocidad": obj.hora0_V, "Dirección": obj.hora0_D},
                    { 'Hora': '1', "Altura": obj.hora1_A, "Velocidad": obj.hora1_V, "Dirección": obj.hora1_D},
                    { 'Hora': '2', "Altura": obj.hora2_A, "Velocidad": obj.hora2_V, "Dirección": obj.hora2_D},
                    { 'Hora': '3', "Altura": obj.hora3_A, "Velocidad": obj.hora3_V, "Dirección": obj.hora3_D},
                    { 'Hora': '4', "Altura": obj.hora4_A, "Velocidad": obj.hora4_V, "Dirección": obj.hora4_D},
                    { 'Hora': '5', "Altura": obj.hora5_A, "Velocidad": obj.hora5_V, "Dirección": obj.hora5_D},
                    { 'Hora': '6', "Altura": obj.hora6_A, "Velocidad": obj.hora6_V, "Dirección": obj.hora6_D},
                    { 'Hora': '7', "Altura": obj.hora7_A, "Velocidad": obj.hora7_V, "Dirección": obj.hora7_D},
                    { 'Hora': '8', "Altura": obj.hora8_A, "Velocidad": obj.hora8_V, "Dirección": obj.hora8_D},
                    { 'Hora': '9', "Altura": obj.hora9_A, "Velocidad": obj.hora9_V, "Dirección": obj.hora9_D},
                    { 'Hora': '10', "Altura": obj.hora10_A, "Velocidad": obj.hora10_V, "Dirección": obj.hora10_D},
                    { 'Hora': '11', "Altura": obj.hora11_A, "Velocidad": obj.hora11_V, "Dirección": obj.hora11_D},
                    { 'Hora': '12', "Altura": obj.hora12_A, "Velocidad": obj.hora12_V, "Dirección": obj.hora12_D},
                    { 'Hora': '13', "Altura": obj.hora13_A, "Velocidad": obj.hora13_V, "Dirección": obj.hora13_D},
                    { 'Hora': '14', "Altura": obj.hora14_A, "Velocidad": obj.hora14_V, "Dirección": obj.hora14_D},
                    { 'Hora': '15', "Altura": obj.hora15_A, "Velocidad": obj.hora15_V, "Dirección": obj.hora15_D},
                    { 'Hora': '16', "Altura": obj.hora16_A, "Velocidad": obj.hora16_V, "Dirección": obj.hora16_D},
                    { 'Hora': '17', "Altura": obj.hora17_A, "Velocidad": obj.hora17_V, "Dirección": obj.hora17_D},
                    { 'Hora': '18', "Altura": obj.hora18_A, "Velocidad": obj.hora18_V, "Dirección": obj.hora18_D},
                    { 'Hora': '19', "Altura": obj.hora19_A, "Velocidad": obj.hora19_V, "Dirección": obj.hora19_D},
                    { 'Hora': '20', "Altura": obj.hora20_A, "Velocidad": obj.hora20_V, "Dirección": obj.hora20_D},
                    { 'Hora': '21', "Altura": obj.hora21_A, "Velocidad": obj.hora21_V, "Dirección": obj.hora21_D},
                    { 'Hora': '22', "Altura": obj.hora22_A, "Velocidad": obj.hora22_V, "Dirección": obj.hora22_D},
                    { 'Hora': '23', "Altura": obj.hora23_A, "Velocidad": obj.hora23_V, "Dirección": obj.hora23_D}
                ],
                width: '100%',
                height: '100%',
                xkey: 'Hora',
                ykeys: ['Altura', 'Velocidad', 'Dirección'],
                labels: ['Altura', 'Velocidad', 'Dirección'],
                pointSize: 5,
                hideHover: 'auto',
                resize: true
            });

        });
    });
    /*$('#edit').toggle(
        function() {$('.close').show(1000);},
        function() {$('.close').hide(1000);}
    );*/

    $('#boton_panel_chart').click(function () {
        $('#panel_chart').hide(1000);
        close(izq, der)
    });
    $('#boton_panel_izq').click(function () {
        $('#panel_izq').hide(1000);
        der += 1;
        close(izq, der)
    })
    $('#boton_panel_izq_admin').click(function () {
        $('#panel_izq_admin').hide(1000);
        izq += 1;
        close(izq, der)
    });
    $('#boton_panel_izq_gestion').click(function () {
        $('#panel_izq_gestion').hide(1000);
        izq += 1;
        close(izq, der)
    });
    $('#boton_panel_map').click(function () {
        $('#panel_map').hide(1000);
        der += 1;
        close(izq, der)
    });


    $('#rets').click(function () {
        $('#panel_izq').show(1000);
        $('#panel_chart').show(1000);
        $('#panel_map').show(1000);
        $('#panel_izq_admin').show(1000);
        $('#panel_izq_gestion').show(1000);
        $('.close').hide(1000);
        $("#center").removeClass("center_fool_LF").show(1000);
        $("#center").removeClass("center_fool").show(1000);
        $('.panel_visible').hide(1000);
        $('#left-side,#center,#right-side').removeClass("sombra_active");
        $('#modalclose').show();
        $('#right-side').show(1000);
        $('#left-side').show(1000);

    });
    $('#edit').click(function () {
        $('.close').show(1000);
        $('#edit').hide(1000);
        $('#cloceedit').show();
        $('#modalclose').show();
        close(izq, der);
    });
    $('#cloceedit').click(function () {
        $('.close').hide(1000);
        $('#cloceedit').hide(1000);
        $('#edit').show(1000);
        $('#modalclose').show();
        close(izq, der);
    });
    $('#conf').click(function () {
        $('.panel_visible').show(1000);
        $('.close').show(1000);
        $('#left-side,#center,#right-side').addClass("sombra_active");
        $(".column").sortable({connectWith: ".column"});
        $(".portlet").addClass("ui-widget ui-widget-content ui-helper-clearfix ui-corner-all")
            .find(".portlet-header")
            .addClass("ui-widget-header ui-corner-all")
            .prepend("<span class='ui-icon ui-icon-minusthick'></span>")
            .end()
            .find(".portlet-content");
        $(".portlet-header .ui-icon").click(function () {
            $(this)
                .toggleClass("ui-icon-minusthick")
                .toggleClass("ui-icon-plusthick");
            $(this)
                .parents(".portlet:first")
                .find(".portlet-content").toggle();
        });

        $(".column").disableSelection();

        $('#closeconf').show(1000);
        $('#conf').hide(1000);
        close(izq, der);
        $('#modalclose').show();
    });
    $('#closeconf').click(function () {
        $('#conf').show(1000);
        $('#closeconf').hide(1000);
        $('.close').hide(1000);
        $('.panel_visible').hide(1000);
        $('#left-side,#center,#right-side').removeClass("sombra_active");
        close(izq, der);
        $('#modalclose').show();
    });
    $.getJSON("jq_mainPanel.php", {index: "avisos"}, function (data) {
        var html_data = '';
        for (var i = 0; i < data.length; i++) {
            if (data[i]['caracter'] == 'Nuevo')
            {
                html_data += '' +
                    '<div class="portlet">' +
                    '<div class="col-lg-1211">' +
                    '<div class="panel panel-success">' +
                    '<div class="panel-heading" style="margin: -1px;color: #ffffff !important;">' +
                    '<span class="badge1" style="float: right">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><ba> ' + data[i]['nombre'] +
                    '</ba><br><i class="fa fa-android"></i>&nbsp;<ba>Caracter: </ba>' + data[i]['caracter'] + '' +
                    '<br><i class="fa fa-calendar"></i>&nbsp;<ba>Tipo: </ba>' + data[i]['tipo'] + '' +
                    '</div>' +
                    '<div class="panel-body">' +
                    data[i]['cuerpo']+
                    '</div>' +
                    '<div class="panel-footer">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-success btn-xs dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">' +
                    '<li><a href="#">Action</a>' +
                    '</li>' +
                    '<li><a href="#">Another action</a>' +
                    '</li>' +
                    '<li><a href="#">Something else here</a>' +
                    '</li>' +
                    '<li class="divider"></li>' +
                    '<li><a href="#">Separated link</a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            else  if (data[i]['caracter'] == 'Importante')
            {
                html_data += '' +
                    '<div class="portlet">' +
                    '<div class="col-lg-1211">' +
                    '<div class="panel panel-warning">' +
                    '<div class="panel-heading" style="margin: -1px;color: #ffffff !important;">' +
                    '<span class="badge1" style="float: right">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><ba> ' + data[i]['nombre'] +
                    '</ba><br><i class="fa fa-android"></i>&nbsp;<ba>Caracter: </ba>' + data[i]['caracter'] + '' +
                    '<br><i class="fa fa-calendar"></i>&nbsp;<ba>Tipo: </ba>' + data[i]['tipo'] + '' +
                    '</div>' +
                    '<div class="panel-body">' +
                    data[i]['cuerpo']+
                    '</div>' +
                    '<div class="panel-footer">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-warning btn-xs dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">' +
                    '<li><a href="#">Action</a>' +
                    '</li>' +
                    '<li><a href="#">Another action</a>' +
                    '</li>' +
                    '<li><a href="#">Something else here</a>' +
                    '</li>' +
                    '<li class="divider"></li>' +
                    '<li><a href="#">Separated link</a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            else  if (data[i]['caracter'] == 'Urgente')
            {
                html_data += '' +
                    '<div class="portlet">' +
                    '<div class="col-lg-1211">' +
                    '<div class="panel panel-info">' +
                    '<div class="panel-heading" style="margin: -1px;color: #ffffff !important;">' +
                    '<span class="badge1" style="float: right">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><ba> ' + data[i]['nombre'] +
                    '</ba><br><i class="fa fa-android"></i>&nbsp;<ba>Caracter: </ba>' + data[i]['caracter'] + '' +
                    '<br><i class="fa fa-calendar"></i>&nbsp;<ba>Tipo: </ba>' + data[i]['tipo'] + '' +
                    '</div>' +
                    '<div class="panel-body">' +
                    data[i]['cuerpo']+
                    '</div>' +
                    '<div class="panel-footer">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-info btn-xs dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">' +
                    '<li><a href="#">Action</a>' +
                    '</li>' +
                    '<li><a href="#">Another action</a>' +
                    '</li>' +
                    '<li><a href="#">Something else here</a>' +
                    '</li>' +
                    '<li class="divider"></li>' +
                    '<li><a href="#">Separated link</a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
            else
            {
                html_data += '' +
                    '<div class="portlet">' +
                    '<div class="col-lg-1211">' +
                    '<div class="panel panel-danger">' +
                    '<div class="panel-heading" style="margin: -1px;color: #ffffff !important;">' +
                    '<span class="badge1" style="float: right">' + data[i]['fecha'] + '</span>' +
                    '<i class="fa fa-adn"></i><ba> ' + data[i]['nombre'] +
                    '</ba><br><i class="fa fa-android"></i>&nbsp;<ba>Caracter: </ba>' + data[i]['caracter'] + '' +
                    '<br><i class="fa fa-calendar"></i>&nbsp;<ba>Tipo: </ba>' + data[i]['tipo'] + '' +
                    '</div>' +
                    '<div class="panel-body">' +
                    data[i]['cuerpo']+
                    '</div>' +
                    '<div class="panel-footer">' +
                    '<div class="btn-group">' +
                    '<button type="button" class="btn btn-danger btn-xs dropdown-toggle" data-toggle="dropdown">' +
                    '<i class="fa fa-cogs"></i>Otras Acciones<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu pull-left dropdown-menu-left" role="menu">' +
                    '<li><a href="#">Action</a>' +
                    '</li>' +
                    '<li><a href="#">Another action</a>' +
                    '</li>' +
                    '<li><a href="#">Something else here</a>' +
                    '</li>' +
                    '<li class="divider"></li>' +
                    '<li><a href="#">Separated link</a>' +
                    '</li>' +
                    '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }
        }
        $("#Noti").append(html_data);
    });
    $('#dawn_left').click(function () {
        $('#left-side').hide(1000);
        var center =  $("#center").hasClass("center_fool_LF").toString();
        if(center=='false'){
            $('#center').addClass('center_fool_LF')
        }
        else{
            $('#center').removeClass('center_fool_LF').addClass('center_fool')
        }
    });
    $('#dawn_right').click(function () {
        $('#right-side').hide(1000);
        var center =  $("#center").hasClass("center_fool_LF").toString();
        if(center=='false'){
            $('#center').addClass('center_fool_LF')
            console.log(window.availWidth)
            console.log(window.availHeight)
            window.resizeBy(window.availHeight,window.availWidth);
        }
        else{
            $('#center').removeClass('center_fool_LF').addClass('center_fool')
           var a =  $(window).height;
           var b =  $(window).width;
           console.log(a);
             $('#Mymap').replaceWith($(this).parent().width);
            }
        });
});




