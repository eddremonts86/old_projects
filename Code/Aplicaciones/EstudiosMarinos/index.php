﻿<?php
/*Comprobacion de instalacion*/
    $install='1install\/index.php';
    if(file_exists($install))
        {header('Location:'.$install);}
    else {
        /*Coneccion a BD*/
        include "App/Config/themes.php";
        $con = new Theme();
        $theme=$con->theme_active();
        if($theme){include $theme;}
        else{include "Templates\/ARKit\/index.tpl.php";}
    }
@session_start();
$salio = $_GET['termino'];
if(isset($_SESSION['LOG_ERROR'])&& $salio!='out'){
    echo "<div STYLE='width: 99%' class=\"alert alert-error\">
            <button type=\"button\" class=\"close\" data-dismiss=\"alert\">×</button>
                <b style='font-size: 18px'>
                    <img src='framework/Client/oxigen/22x22/actions/dialog_cancel.png'> Acceso Denegado.
                 </b>
         </div>";
}

/*Limpiar SESSIONES*/
    if(isset ($_SESSION['CUI']))
        {
            unset($_SESSION['CUI']);
            unset($_SESSION['CUS']);
            unset($_SESSION['CSI']);
            unset($_SESSION['USER_NAME']);
            unset($_SESSION['USER_LOG']);
            unset($_SESSION['CONFIG']);
            unset($_SESSION['DOMAIN']);
            unset($_SESSION['LOG_ERROR']);
        }
    if(isset($_SESSION['ENTRY']))
    unset($_SESSION['ENTRY']);
    if(!isset($_SESSION['_AT']))
    {
        $_hour = intval(date('G')) + rand(1,5);
        $_min = intval(date('i')) + rand(10, 25);
        $_seg = strval(intval(date('s')) + rand(10, 45));

        $_rigth = $_seg[0];
        $_left = $_seg[1];

        $_seg = $_rigth . '1' . $_left;

        $_time = date('yn.j') . "$_hour.$_min.$_seg";
        $_SESSION['_AT'] = $_time;
    }
    $cwd = getcwd();
    $_cwd = str_replace('\\','/',$cwd);
    $_SESSION['APP_PATH'] =  $_cwd;
?>


