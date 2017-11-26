<?php
/**
 * Created by JetBrains PhpStorm.
 * User: remonts
 * Date: 2/01/14
 * Time: 10:44
 * To change this template use File | Settings | File Templates.
 */
require_once(dirname(__FILE__) . '/../Server/includes.php');
require_once(dirname(__FILE__) . '/../Config/common_access.php');

           class Theme
            {
              private $conn;
              public  $pass;
              public  $host;
              public  $port;
              public  $dbase;
              public  $user;
              public function conect()
                {
                    $this->conn = new CommonConnections();
                    $this->host=$this->conn->host;
                    $this->port=$this->conn->port;
                    $this->dbase=$this->conn->dbase;
                    $this->user=$this->conn->user;
                    $this->pass=$this->conn->pass;
                    if($this->conn->type=='PostgreSQL')
                        {
                          $conn_string = "host= $this->host  port= $this->port  dbname=$this->dbase user=$this->user password=$this->pass";
                          pg_connect($conn_string);

                        }
                }
              public function theme_active(){
                   $this->conect();
                   $SQL = "SELECT * FROM app_security.themes_activo;";
                   $datos = pg_query($SQL);
                   $subs = pg_fetch_all($datos);
                   $theme=$subs[0]['dir'];
                   return $theme ;

               }
              public function __get($name)
               {
                   return $this->conn->$name;
               }
            }

