<?php
/**
 * Created by JetBrains PhpStorm.
 * User: edd
 * Date: 6/11/13
 * Time: 15:35
 * To change this template use File | Settings | File Templates.
 */
	$arrayCp=array("actions","apps","devices","filesystems","mimetypes");
	$arrayRz=array('16x16','22x22','32x32','48x48','64x64','128x128');
	$size=array('16','22','32','48','64','128');


	FOR($i=0;$i<count($arrayRz);$i++){
		FOR($z=0;$z<count($arrayCp);$z++){
				$files = scandir($arrayRz[$i].'/'.$arrayCp[$z]);
				$nombre_archivo = $arrayRz[$i].'/icons'.$arrayRz[$i].'.css';
				$nombre_archivo_html = $arrayRz[$i].'/index.html';
				$gestor = fopen($nombre_archivo, 'a+');
				$gestor_html = fopen($nombre_archivo_html, 'a+');

                $html=" <html>
                         <head>
                            <title>Oxigen Icons Interface</title>
                            <link id='default' rel='stylesheet' type='text/css'href='icons$arrayRz[$i].css'>
                            <link id='default' rel='stylesheet' type='text/css'href='../style.css'>
                         </head>
                         <body style='margin: 15px;padding: 15px; background-image: url(../1.jpg) !important;background-repeat: repeat;'>
                            <div class='Sbsisat'>
                            <div class='alert alert-info' style='column-count:5;-moz-column-count:5;-webkit-column-count:5;-o-column-count:5;column-rule:1px solid #3a87ad;-moz-column-rule:1px solid #3a87ad;-o-column-rule:1px solid #3a87ad;-webkit-column-rule:1px solid #3a87ad'>
                            <h4>Icons". $arrayRz[$i]."</h4>
                            ";

				foreach ($files as $file) {
					if($file != '.' && $file != '..'){
						$name = explode('.',$file);
						$name = $name[0];
						$selector = ".$name"."$size[$i]{background-image: url('$arrayCp[$z]/$file') !important ; background-repeat: no-repeat; width:$size[$i]px; height:$size[$i]px;}\n";
						fwrite($gestor, $selector);       
					}
				}
				foreach ($files as $file) {
					if($file != '.' && $file != '..'){
						$name = explode('.',$file);
						$name = $name[0];
                       // print_r(file_get_contents($nombre_archivo_html));
                        if (file_get_contents($nombre_archivo_html)==false)
                        {
                            fwrite($gestor_html, $html);
                            //$selector = "<div class='".$name.$size[$i]."'><h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$name.$size[$i]."</h6></div>\n";
                            $selector = " <div style='height:".intval($size[$i]+20)."px;'><div class='".$name.$size[$i]."'>&nbsp;</div><h6>".$name.$size[$i]."</h6></div>\n";

                            fwrite($gestor_html, $selector);
                        }
                        else{
                            //$selector = "<div class='".$name.$size[$i]."'><h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$name.$size[$i]."</h6></div>\n";
                            $selector = " <div style='height:".intval($size[$i]+20)."px;'><div class='".$name.$size[$i]."'>&nbsp;</div><h6>".$name.$size[$i]."</h6></div>\n";
                            fwrite($gestor_html, $selector);
                        }
					}
				}
				fclose($gestor);
				fclose($gestor_html);
		}
	}
 

