<!DOCTYPE html PUBLIC"-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel='shortcut icon' href='img/png-apli/speaker.png' type='image/png' />
	<title>Reporte de Averias</title> 	
	
	<?php	include ('../inc.php');   $x=new inc();	$p=$x->inc();?>	
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
		<td class="active"><a id="support-link" href=""><span>Tecnico</span></a></td>
		<td><a id="store-link" href="../jdept/jdept.php"><span>J'Deparatamento</span></a></td>
		<td><a id="company-link" href="../ayuda/ayuda.php"><span>Ayuda</span></a>
		
		</td>		
	</table>
	<table cellspacing="0" class="sub-nav">
		<tr>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=Reportes">Reportes</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=Pendientes">Reportes-Pendientes</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=Equipos">Equipos</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=Concejos">Concejos Utiles</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=Avisos">Avisos</a></td><td class="spacer">
		</td>
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=plan">Plan de Mantenimiento</a></td><td class="spacer">
		</td>
		<!--td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=ficheros">Subir ficheros</a></td><td class="spacer">
		</td-->
		<td><img src="../../../img/Ext-import/c-sep.gif">
		<a href="tecnico.php?termino=Ayuda">Ayuda</a></td><td class="spacer">
		</td>
		</tr>   
	</table>
	</div>
</div>
<div id="centerrr-Noticias"><div id="centro"></div></div> 
<div id="left-Noticias"><div id="frame"></div></div> 
<div id="right-Noticias"><div id="frame1"></div></div>
<p></p> 
        <div id="fi-basic"></div>
        <div id="fi-basic-btn"></div>
  <p></p>
   	<div id="fi-button"></div>
        <div id="fi-button-msg" style="display:none;"></div>
        <div class="x-clear"></div>
  <p></p>

    <p>
        <div id="fi-form"></div>
    </p>
<div id="bd">  
		<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/resources/css/ext-all.css "/>
		<link rel="stylesheet" type="text/css" media="screen" href="../../../Jss/extjs/examples/samples.css "/>
		<link rel="stylesheet" type="text/css" href="../../../Jss/extjs/examples/shared/extjs/css/extjs.css" />
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Cargando EXT-Core-API...';</script>
		<script type="text/javascript" src="../../../Jss/extjs/adapter/ext/ext-base.js"></script>
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Cargando UI-Components...';</script>
		<script type="text/javascript" src="../../../Jss/extjs/ext-all.js"></script>
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Iniciandoo...';</script>
		          
		<?php	  
	     if($_GET['termino'] == Reportes)
        {include'SolicitudesV.php';	}
		 if($_GET['termino'] == Pendientes)
		 {include'PendientesV.php';}
		 if($_GET['termino'] == Equipos)
        {include'EquiposV.php';	}
		 if($_GET['termino'] == Concejos)
		 {include'ConcejosV.php';}
		 if($_GET['termino'] == ficheros)
        {include'ficherosV.php';}
		if($_GET['termino'] == plan)
        {include'plan.php';	}	
		if($_GET['termino'] == Avisos)
        {include'Avisos.php';	}		
		 if($_GET['termino'] == Ayuda)
		 {include'Ayuda.php';}
		 if(!$_GET['termino'])
		  {include'SolicitudesV.php';}
	?>	
    </div>
    <div style="clear:both"></div>
</div>
<div id="footer">Todos los Derechos Reservados<a href="http://192.168.152.3/oneprinternal/" target="_blank">(ONE-PR)</a>. 2011</div>
</body>
</html>

