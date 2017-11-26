<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>Reporte de Averias</title> 	
	<?php include ('../inc.php');$x=new inc();$p=$x->inc();?>		
</head>
<body id="container">
<div id="viewport">
<div id="hd">
<div id="hdCent">
	<table cellspacing="0" class="nav main-nav">
		<tr>
		<td>
		<a id="home-link" href="../../../index2.php"><span>Inicio</span></a></td>
		<td class="active"><a id="products-link" href="user.php?termino=inicio"><span>Usuario</span></a></td>
		<td><a id="support-link" href="../tecnico/tecnico.php"><span>Tecnico</span></a></td>
		<td><a id="store-link" href="../jdept/jdept.php"><span>J'Deparatamento</span></a></td>
		<td><a id="company-link" href="../ayuda/ayuda.php"><span>Ayuda</span></a>		
		</td>		
	</table>
	<table cellspacing="0"border="0" class="sub-nav">
		<tr>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Hardware">Averías(Hardware)</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Software">Averías(Software)</a></td><td class="spacer">
		</td>
		<!--td><img src="../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Buscar">Buscar PC</a></td><td class="spacer">
		</td--->
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Estado">Estado(Solicitud)</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Abuso">Reportar Abusos</a></td><td class="spacer">
		</td>
		<!--td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Encuesta">Encuesta</a></td><td class="spacer">
		</td-->
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Estadisticas">Estadísticas</a></td><td class="spacer">
		</td>		
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=consejos">Ver Consejos </a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=aviso">Ver Avisos </a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=plan">Ver Plan</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Contactenos">Contáctenos </a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="user.php?termino=Ayuda">Ayuda</a></td><td class="spacer">
		</td>		 
		</tr>   
	</table>
	</div>
<div id="hdDer"></div>
</div>
<div id="centerrr-Noticias"><div id="centro"></div></div> 
<div id="left-Noticias"><div id="frame"></div></div> 
<div id="right-Noticias"><div id="frame1"></div></div>
<div id="grid-example"></div>
<div id="bd">        
		<?php  
	    if($_GET['termino'] == Hardware){include'hardware.php';}
		if($_GET['termino'] == Software){include'software.php';}
		if($_GET['termino'] == Buscar){include'BuscarPC.php';}
		if($_GET['termino'] == Encuesta){include'Encuesta.php';}
		if($_GET['termino'] == Estadisticas){include'Estadisticas.php';}
		if($_GET['termino'] == Estado){include'Estado.php';}
		if($_GET['termino'] == Contactenos){include'Contactenos.php';}
		if($_GET['termino'] == Abuso){include'Abuso.php';}
		if($_GET['termino'] == aviso){include'avisos.php';}
		if($_GET['termino'] == plan){include'plan.php';}
		if($_GET['termino'] == nosotros){include'Nosotros.php';}
		if($_GET['termino'] == consejos){include'concejos.php';}
		if($_GET['termino'] == login){include'login.php';}
		if($_GET['termino'] == Ayuda){include'Ayuda.php';}
		if($_GET['termino'] == salir){include'salir.php';}
		if($_GET['termino'] == inicio){include'hardware.php';}		 
		if(!$_GET['termino']){include'hardware.php';}
		?>	 
    </div> 	
 </div>
 <div id="footer">Todos los Derechos Reservados<a href="http://192.168.152.3/oneprinternal/" target="_blank">(ONE-PR)</a>. 2011</div>
 </body>
</html>