<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel='shortcut icon' href='img/png-apli/speaker.png' type='image/png' />
	<title>Reporte de Averias</title> 	
	<?php	
	include ('../inc.php');
    $x=new inc();
	$p=$x->inc();
	?>	
</head>

<body id="container">
<div id="viewport">
<div id="hd">
<div id="hdCent">
	<table cellspacing="0" class="nav main-nav">
		<tr>
		<td>
		<a id="home-link" href="../../../index2.php"><span>Inicio</span></a></td>
		<td><a id="products-link" href="../user/user.php"><span>Usuario</span></a></td>
		<td><a id="support-link" href="../tecnico/tecnico.php"><span>Tecnico</span></a></td>
		<td><a id="store-link" href="../jdept/jdept.php"><span>J'Deparatamento</span></a></td>
		<td class="active"><a id="company-link" href=""><span>Ayuda</span></a>
		
		</td>		
	</table>	
	</div>
<div id="hdDer"></div>
</div>

<div id="bd">
    <?php include "Ayuda.html";?>
    </div>
    <div style="clear:both"></div>
<div id="footer">Todos los Derechos Reservados<a href="http://192.168.152.3/oneprinternal/" target="_blank">(ONE-PR)</a>. 2011</div>
</div></body>
</html>

