<?php
$user = $_POST['Usuario'];
$passw = $_POST['Password'];
$user1 = $_POST['user'];
$passw2 = $_POST['pasw'];
$secceion=$_POST['secceion'];
if($user == $user1 && md5(strval($passw)) === $passw2 )
echo 1;
else
echo 0;
if($secceion=='secceion'){echo true;}