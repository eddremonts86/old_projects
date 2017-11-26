<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edd
 * Date: 7/01/14
 * Time: 14:52
 * To change this template use File | Settings | File Templates.
 */

$index=$_GET['index'];
require_once(dirname(__FILE__) .'/../App/Config/themes.php');
$obj = new Theme();
$obj->conect();
$conn_string = "host=$obj->host  port=$obj->port dbname=$obj->dbase user=$obj->user password=$obj->pass";
$concctions=pg_connect($conn_string);
return $concctions;