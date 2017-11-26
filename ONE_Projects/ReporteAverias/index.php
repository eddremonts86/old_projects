<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link rel='shortcut icon' href='img/Ext-import/ccleaner.jpg' type='image/png' />
	<title>Reporte de Averias</title> 	
	<!--Importar Css-->
        <link rel="stylesheet" type="text/css" media="screen" href="Styles/Styles-Base.css"/>
        <link rel="stylesheet" type="text/css" media="screen" href="Styles/message.css" />    

</head>
<body id="container">
<div id="loading-mask" style=""></div>
<div id="loading">
    <div class="loading-indicator">
	<a href="http://">
            <img alt=""   id="centro" src="img/Ext-import/ccleaner.jpg" width="400" height="200"/>
	</a><br/>
	<span id="loading-msg">Cargardo datos...</span></div>
</div>
<div id="viewport">
<div id="hd">
<div id="hdCent">
	<table cellspacing="0" class="nav main-nav">		
		<td class="active">
		<a id="home-link" href=""><span>Inicio</span></a></td>
		<td><a id="products-link" href="vistas/Blue/user/user.php"><span>Usuario</span></a></td>
		<td><a id='support-link' href='vistas/Blue/tecnico/tecnico.php'><span>Tecnico</span></a></td>
		<td><a id='store-link' href='vistas/Blue/jdept/jdept.php'><span>J'Deparatamento</span></a></td>
		<td><a id="company-link" href="vistas/Blue/ayuda/ayuda.php"><span>Ayuda</span></a>		
		</td>		
	</table>
	<table cellspacing="0"border="0" class="sub-nav">
		<tr>
		<td><img src="img/Ext-import/c-sep.gif"> <a href="">Inicio</a></td><td class="spacer"></td>
		<td><img src="img/Ext-import/c-sep.gif"> <a href="vistas/Blue/user/user.php?termino=login">Iniciar Seccion</a></td><td class="spacer">
		</td>		
		</tr>   
	</table>
	</div>
</div>
<div id="bd">
    <div class="left-column">	       
        <div id="sample-spacer" style="height:800px;"></div>
		<link rel="stylesheet" type="text/css" media="screen" href="Jss/extjs/resources/css/ext-all.css "/>
		<link rel="stylesheet" type="text/css" media="screen" href="Jss/extjs/examples/samples.css "/>
		<link rel="stylesheet" type="text/css" href="Jss/extjs/examples/shared/extjs/css/extjs.css" />
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Cargando EXT-Core-API...';</script>
		<script type="text/javascript" src="Jss/extjs/adapter/ext/ext-base.js"></script>
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Cargando UI-Components...';</script>
		<script type="text/javascript" src="Jss/extjs/ext-all.js"></script>
		<script type="text/javascript" src="Jss/extjs/src/locale/ext-lang-es.js"></script>
		<script type="text/javascript">document.getElementById('loading-msg').innerHTML = 'Iniciandoo...';</script>
		<script type="text/javascript" src="Jss/Personalizadas/samples1.js"></script>
		<script type="text/javascript" src="Jss/Personalizadas/site.js"></script>
        <div id="all-demos"></div>
    </div>
	<div class="right-column" style="padding-top:15px;">
		<div class="side-box1">
		   <div class="side-box-inner1">
            <ul id="sample-menu1" class="features1"></ul>
	       </div>
		</div>
    </div>

    <div style="clear:both"></div>
</div>
<!-- end bd -->
<!-- end viewport -->
<div class="flyout-menu" id="products-menu" style="display:none;">
	<div style="width:200px;">
	<h3><a href="vistas/Blue/user/user.php">
                <img alt=""  src="img/icons/user_suit.png"/> Usuario	</a></h3>
	<p>Este servicio esta pensado para satifacer sus necesidades</p>
	<ul>
		<li><a href="vistas/Blue/user/user.php?termino=Hardware">Reportar Averias -Hardware- </a></li>
		<li><a href="vistas/Blue/user/user.php?termino=Software">Reportar Averias -Software-</a></li>
		<!--li><a href="vistas/Blue/user/user.php?termino=Buscar">Buscar PC</a></li-->
		<li><a href="vistas/Blue/user/user.php?termino=Estado">Revisar Solicitud -Estado-</a></li>
		<li><a href="vistas/Blue/user/user.php?termino=Abuso">Reportar Abuso</a></li>			 
	</ul>
	<br/>
	<h3><a href="http://extjs.com/products/gxt">
                <img alt=""  src="img/icons/group_add.png"/> Coperacion</a></h3>
	<p>Envie todo tipo de criterios</p>
	<ul>
		<li><a href="vistas/Blue/user/user.php?termino=Contactenos">Contactenos</a></li>
		<li><a href="vistas/Blue/user/user.php?termino=Encuesta">Encuesta</a></li>			
	</ul>
	<br/>
	<h3><a href="http://extjs.com/products/gxt">
                <img alt=""  src="img/icons/group_add.png"/> Estadisticas</a></h3>
	<p>Estadisticas Basicas del sistema</p>
	<ul>
	<li><a href="vistas/Blue/user/user.php?termino=Estadisticas">Estadisticas</a></li>			
	</ul>
	<br/>
	<h3><a href="vistas/Blue/user/user.php?termino=Ayuda">
                <img alt=""  src="img/icons/help.png"/>Ayuda</a></h3>
	<p>Como trabajar con el modulo</p>
	<ul>
		<li><a href="http://extjs.com/store/gxt/">Ayuda del Usuario</a></li>
	</ul>
	</div>
</div>

<div class="flyout-menu" id="support-menu" style="display:none;">
	<div style="width:200px;">

	<h3><a href="vistas/Blue/tecnico/tecnico.php">
                <img alt=""  src="img/icons/user_suit.png"/> Tecnico</a></h3>
	<p>Resolver problemas es nuestro deber</p>
	<ul>
		<li><a href="vistas/Blue/tecnico/tecnico.php?termino=Reportes">Todas los reportes</a></li>
		<li><a href="vistas/Blue/tecnico/tecnico.php?termino=Pendientes">Todos los reportes -Pendientes-</a></li>
	</ul>
	<br/>
	<h3><a href="vistas/Blue/tecnico/tecnico.php">
                <img alt=""  src="img/icons/group_gear.png"/> Administrar Equipos</a></h3>
	<p>Agregar, Editar, Eliminar tipos de equipos</p>
	<ul>
		<li><a href="vistas/Blue/tecnico/tecnico.php?termino=Equipos">Trabajo con Equipos</a></li>		
	</ul>
	<br/> 
	<h3><a href="vistas/Blue/tecnico/tecnico.php">
                <img alt=""  src="img/icons/group.png"/>
	Trabajo colaborativo</a></h3>
	<p>Interactue con el publico sanamente</p>
	<ul>
		<li><a href="vistas/Blue/tecnico/tecnico.php?termino=Concejos">Concejos Utiles </a></li>
		<li><a href="vistas/Blue/tecnico/tecnico.php?termino=ficheros">Subir ficheros</a></li>		
	</ul>
	<br/>
	<h3><a href="vistas/Blue/tecnico/tecnico.php?termino=Ayuda">
                <img alt=""  src="img/icons/help.png"/>Ayuda</a></h3>
	<p>Como trabajar con el modulo</p>
	<ul>
		<li><a href="vistas/Blue/tecnico/tecnico.php?termino=Ayuda">Ayuda del Tecnico</a></li>
	</ul>
	<br/>	
	</div>
</div>
 <div class="flyout-menu" id="store-menu" style="display:none;">
	<div style="width:200px;">
	<h3><a href="vistas/Blue/jdept/jdept.php">
                <img alt=""  src="img/icons/user_suit.png"/> J' Departamento</a></h3>
	<p>Interactue con el publico sanamente</p>
	<ul>
		<li><a href="vistas/Blue/jdept/jdept.php?termino=Diarias">Estadisticas Diarias</a></li>
		<!--li><a href="vistas/Blue/jdept/jdept.php">Estadisticas Semanales</a></li-->
		<li><a href="vistas/Blue/jdept/jdept.php">Estadisticas Mensuales</a></li>
		<li><a href="vistas/Blue/jdept/jdept.php">Estadisticas Personalizadas</a></li>

	</ul>
	<br/>
	<h3><a href="vistas/Blue/jdept/jdept.php">
                <img alt=""  src="img/icons/group_gear.png"/> Gestion</a></h3>
	<p>Interactue con el publico sanamente</p>
	<ul>
		<li><a href="vistas/Blue/jdept/jdept.php">Gestionar Areas, Dept</a></li>
		<li><a href="vistas/Blue/jdept/jdept.php">Gestionar Probincias, Municipios</a></li>
	</ul>

	<br/><h3><a href="vistas/Blue/jdept/jdept.php">
                <img alt=""  src="img/icons/group_gear.png"/> Atencion al cliente</a></h3>
	<p>Revizar estado de opinion del usuario</p>
	<ul>
		<li><a href="vistas/Blue/jdept/jdept.php">Revisar Encuestas</a></li>
		<li><a href="vistas/Blue/jdept/jdept.php">Reporte de Abusos</a></li>
		<li><a href="vistas/Blue/jdept/jdept.php">Leer mensajes de contacto</a></li>
	</ul>

	<br/>
	<h3><a href="vistas/Blue/jdept/jdept.php">
                <img alt=""  src="img/icons/help.png"/>Ayuda</a></h3>
	<p>Como trabajar con el modulo</p>
	<ul>
		<li><a href="vistas/Blue/jdept/jdept.php">Ayuda del J'Deptamento</a></li>
	</ul>
	</div>
 </div>
</div>
<div id="footer">Todos los Derechos Reservados<a href="http://192.168.152.3/oneprinternal/" target="_blank">(ONE-PR)</a>. 2011</div>
</body>
</html>