<html xmlns="http://www.w3.org/1999/xhtml ">
<head>
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/font-awesome.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/sb-admin.css">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Interfaz General</title>
    <style type="text/css">
        <!--
        .Estilo3 {
            font-size: 11px
        }

        -->
    </style>
</head>
<body bottommargin="0" leftmargin="0" rightmargin="0" topmargin="0">
<div style="width:100%;height:90%" align="center">
    <div id="center" class="Sbsist sombra_simple_der" aling="center">
        <div id="cuerpo">
            <?php
            //$conf = simplexml_load_file('App/Config/config.xml');
            $j = 0;
            $gestor = fopen('clases.csv', "r");
                while (($datos = fgetcsv($gestor)) !== FALSE) {
                    if($j == 0)
                        echo '<div class="row">';
                    echo '<div class="col-lg-3">
                            <div class="panel panel-info">
                              <div class="panel-heading">
                                <div class="row">
                                  <div class="col-xs-4">
                                    <i class="fa '.$datos[0].' fa-5x"></i>
                                  </div>
                                  <div class="col-xs-8 text-right">
                                    <p class="announcement-header">'.$datos[0].'</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>';
                    $j++;
                    if($j == 4){
                        echo '</div>';
                        $j = 0;
                    }
                }
            fclose($gestor);
            ?>
        </div>
    </div>
</div>
</body>
</html>
