<?php
class JConfig {
/* Site Settings */
var $offline = '0';
var $offline_message = 'El sitio está desactivado por tareas de mantenimiento <br /> Por favor, vuelva a intentarlo más tarde.';
var $sitename = 'Calidad';
var $editor = 'tinymce';
var $list_limit = '20';
var $legacy = '0';
/* Debug Settings */
var $debug = '0';
var $debug_lang = '0';
/* Database Settings */
var $dbtype = 'mysql';
var $host = 'localhost';
var $user = 'edd';
var $password = 'edd';
var $db = 'calidad';
var $dbprefix = 'jos_';
/* Server Settings */
var $live_site = '';
var $secret = 'yuYk0BolMe19r2Kq';
var $gzip = '0';
var $error_reporting = '-1';
var $helpurl = 'http://help.joomla.org';
var $xmlrpc_server = '0';
var $ftp_host = '127.0.0.1';
var $ftp_port = '21';
var $ftp_user = '';
var $ftp_pass = '';
var $ftp_root = '';
var $ftp_enable = '0';
/* Locale Settings */
var $offset = '0';
var $offset_user = '0';
/* Mail Settings */
var $mailer = 'mail';
var $mailfrom = 'calidad@otepr.co.cu';
var $fromname = 'Calidad';
var $sendmail = '/usr/sbin/sendmail';
var $smtpauth = '0';
var $smtpuser = '';
var $smtppass = '';
var $smtphost = 'localhost';
/* Cache Settings */
var $caching = '0';
var $cachetime = '15';
var $cache_handler = 'file';
/* Meta Settings */
var $MetaDesc = 'Joomla! - el motor de portales dinámicos y sistema de administración de contenidos';
var $MetaKeys = 'joomla, Joomla';
var $MetaTitle = '1';
var $MetaAuthor = '1';
/* SEO Settings */
var $sef = '0';
var $sef_rewrite = '0';
var $sef_suffix = '0';
/* Feed Settings */
var $feed_limit   = 10;
var $log_path = '/var/wwww/Calidad/logs';
var $tmp_path = '/var/wwww/Calidad/tmp';
/* Session Setting */
var $lifetime = '15';
var $session_handler = 'database';
}
?>