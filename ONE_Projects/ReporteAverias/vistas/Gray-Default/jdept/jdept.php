<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel='shortcut icon' href='img/png-apli/speaker.png' type='image/png' />
	<title>Reporte de Averias</title> 	
	
	<?php include ('../inc.php'); $x=new inc();$p=$x->inc();?>	
</head>

<body id="container">
<div id="viewport">
<div id="hd">
<div id="hdCent">
	<table cellspacing="0" class="nav main-nav">
		<tr>
		<td>
		<a id="home-link" href="../../../index2.php"><span>Inicio</span></a></td>
		<td ><a id="products-link" href="../user/user.php"><span>Usuario</span></a></td>
		<td><a id="support-link" href="../tecnico/tecnico.php"><span>Tecnico</span></a></td>
		<td class="active"><a id="store-link" href="jdept.php?termino=inicio"><span>J'Deparatamento</span></a></td>
		<td><a id="company-link" href="../ayuda/ayuda.php"><span>Ayuda</span></a>
		
		</td>		
	</table>
	<table cellspacing="0" class="sub-nav">
		<tr>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Diarias">Diarias</a></td><td class="spacer">
		</td>		
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Mensuales">Mensuales</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Personalizadas">Personalizadas</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Areas">Areas, Dept</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Encuestas">Revisar Encuestas</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Abusos">Revisar Abusos</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Contactenos">Leer Contactos</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Archivos">Cargar Avisos</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="jdept.php?termino=Ayuda">Ayuda</a></td><td class="spacer">
		</td>
		</tr>   
	</table>
	</div>
<div id="hdDer"></div>
</div>
<div id="centerrr-Noticias"><div id="centro"></div></div> 
<div id="left-Noticias"><div id="frame"></div></div> 
<div id="right-Noticias"><div id="frame1"></div></div>
<div id="bd">
		<link rel="stylesheet" type="text/css" media="screen" href="../../Jss/extjs/resources/css/ext-all.css "/>
		<link rel="stylesheet" type="text/css" media="screen" href="../../Jss/extjs/examples/samples.css "/>
		<link rel="stylesheet" type="text/css" href="../../Jss/extjs/examples/shared/extjs/css/extjs.css" />
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Cargando EXT-Core-API...';</script>
		<script type="text/javascript" src="../../Jss/extjs/adapter/ext/ext-base.js"></script>
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Cargando UI-Components...';</script>
		<script type="text/javascript" src="../../Jss/extjs/ext-all.js"></script>
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Iniciandoo...';</script>
		
     <?php	  
	     if($_GET['termino'] == Diarias)
        {include'Diarias.php';}
		 if($_GET['termino'] == Mensuales)
		 {include'Mensuales.php';}
		 if($_GET['termino'] == Personalizadas)
        {include'Personalizadas.php';}
		 if($_GET['termino'] == Areas)
		 {include'Areas.php';}
		 if($_GET['termino'] == Archivos)
        {include'Archivos.php';}
		if($_GET['termino'] == Encuestas)
        {include'Encuestas.php';}
		 if($_GET['termino'] == Contactenos)
		 {include'Contactenos.php';}
		 if($_GET['termino'] == Encuestas)
		 {include'Encuestas.php';}
		 if($_GET['termino'] == Abusos)
		 {include'Abusos.php';}		 
		 if($_GET['termino'] == Ayuda)
		 {include'Ayuda.php';}
		 if($_GET['termino'] == inicio)
		  {include'inicio.php';}
		if(!$_GET['termino'])
		  {include'Diarias.php';}
	?>	
    </div>
    <div style="clear:both"></div>
</div><!-- end bd -->

<!-- end viewport -->


</div></div>
<div id="footer">Todos los Derechos Reservados<a href="http://192.168.152.3/oneprinternal/" target="_blank">(ONE-PR)</a>. 2011</div>
</body>
</html>

