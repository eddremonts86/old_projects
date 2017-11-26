<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edd
 * Date: 15/02/14
 * Time: 14:17
 * To change this template use File | Settings | File Templates.
 */
require_once('themes.php');
$obj = new Theme();
$obj->conect();
$conn_string = "host=$obj->host  port=$obj->port dbname=$obj->dbase user=$obj->user password=$obj->pass";
$concctions=pg_connect($conn_string);
return $concctions;