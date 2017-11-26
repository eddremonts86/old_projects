<?PHP
     require_once 'App/Config/db_access.php';
     require_once 'Framework/Server/DataAccess/ConnectionsManager.php';
     require_once 'Framework/Server/Security/SecurityManager.php';
    $_sm = SecurityManager::GetInstance();
    $_POST['nst'];
    $_POST['act'];
    if (isset($_POST['nst'])){
        $_sm->CleanSecurity();
        $fin = $_sm->InitSecurity();
        if($fin){
            header('Location:main.php');
            $_sm->FreeConnection();
        }
        else{
            echo "
            <div class='alert alert-error' style='width:60%; margin:15px;'>
                 <h3><img src='App/Client/img/logo/user32.png' width='128px' height='128px'>Ha ocurrido un error en la actualización del sistema!</h3>
                 <strong>Puede ser que:</strong>
                    <ul>
                        <li>La red hacia el  dispositivo no este disponible.</li>
                        <li>El tiempo de espera del servido sea demaciado corto.</li>
                        <li>El servidor de Base de datos no este activo.</li>
                    </ul>
                    Si ya ha arreglado estos problemas y aun continua sin resivir la respuesta deseasda,<br> pongase en contacto con el desarrollador de este plugin.
             <button type='button' class='close' data-dismiss='alert'>cerrar</button>
            </div>
            ";
            $_sm->FreeConnection();
        }


    }
    else if (isset($_POST['act'])){
        $fin=$_sm->UpdateSecurity();
        if($fin){
            header('Location:main.php');
            $_sm->FreeConnection();
        }
        else{
            echo "
            <div class='alert alert-error' style='width:60%; margin:15px;'>
                 <h3><img src='App/Client/img/logo/user32.png' width='128px' height='128px'>Ha ocurrido un error !</h3>
                 <strong>Puede ser que:</strong>
                    <ul>
                        <li>La red hacia el  dispositivo no este disponible.</li>
                        <li>El tiempo de espera del servido sea demaciado corto.</li>
                        <li>El servidor de Base de datos no este activo.</li>
                    </ul>
                    Si ya ha arreglado estos problemas y aun continua sin resivir la respuesta deseasda,<br> pongase en contacto con el desarrollador de este plugin.
             <button type='button' class='close' data-dismiss='alert'>cerrar</button>
            </div>
            ";
            $_sm->FreeConnection();
        }

    }

?>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/event.css">
    <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/FrKCss/css/bootstrap.css">
    <script src="Framework/Client/ExtJs/ext-all.js"></script>
    <script src="Framework/Client/FrKCss/js/jquery.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap.min.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-tooltip.js"></script>
    <script src="Framework/Client/FrKCss/js/bootstrap-alert.js"></script>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Hermes-Sistema de Control del Capital Humano</title>
</head>
<body>
<a href="#">
    <article class="Inst_sist">
        <h1>Instalando Seguridad del sistema</h1>
        <p>El proceso de instalación de seguridad del sistema esta pensado para que usted tenga el menor intercambio posible con el mismo.
        <br>Por favor espere a que termine el proceso, una ves terminado entre al sistema en "Modo Debuger" y configure
            todo lo necesario para la interacion final del Usuario/Sistema .</p>
        <form id="form1" name="form1" method="post" action="install.php">
            <p align="right">
                <button id="nst" name="nst" class="btn btn-primary" type="submit">Instalar</button>
                <button id="act" name="act" class="btn btn-warning" type="submit">Actualizar</button>
            </p>
        </form>
    </article>
</a>
</body>

</html>