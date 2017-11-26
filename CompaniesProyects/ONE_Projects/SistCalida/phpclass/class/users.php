<?php
class users
{
    function buscaruser($user){
        $result = mysql_query("Select count(*) from jos_users where name='$user'");
        if($result){return true;}
        else return false;
    }
    function login($user,$passw){
        $pas=md5($passw);
        $result = mysql_query("SELECT * FROM jos_users where name='$user'");
        while ($row = mysql_fetch_array($result)) {
            $passwbd = $row["password"];
        }
        if ($pas === $passwbd) {return 1;}
        else {return 0;}
    }
    /*
    function addusers($id,$user,$name,$emil,$role){}
    function verusers(){}
    function delusers($id){}
    function modusers($id,$user,$name,$emil,$role){}*/
}