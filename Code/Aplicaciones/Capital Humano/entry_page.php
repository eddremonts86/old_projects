<?PHP
	session_start();

	if(isset ($_SESSION['CUI']))
	{
		unset($_SESSION['CUI']);
		unset($_SESSION['CUS']);
		unset($_SESSION['CUSI']);
		unset($_SESSION['USER_NAME']);
		unset($_SESSION['USER_LOG']);
        unset($_SESSION['CONFIG']);
	}

	if(!isset($_SESSION['_AT']))
	{
		$_hour = intval(date('G')) + rand(1,5);
		$_min = intval(date('i')) + rand(10, 25);
		$_seg = strval(intval(date('s')) + rand(10, 45));
		
		$_rigth = $_seg[0];
		$_left = $_seg[1];
		
		$_seg = $_rigth . '1' . $_left;
		
		$_time = date('yn.j') . "$_hour.$_min.$_seg";
		$_SESSION['_AT'] = $_time;
	}
?>
<html>
</head>
<title>Catalogo Ver 1.0</title>

<script type="text/javascript">
<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function OnAdmin()
{
	document.getElementById('subsytem_name').innerHTML = 'Administrar el sitio';
	document.getElementById('subsystem').value = 'Administracion';
	
	document.getElementById('log').disabled=false;
	document.getElementById('pwd').disabled=false;
	
	if(document.getElementById('log').value == "estudiante" && document.getElementById('pwd').value == "estudiante")
	{
		document.getElementById('log').value = '';
		document.getElementById('pwd').value = '';
	}
}

function OnUser()
{
	document.getElementById('subsytem_name').innerHTML = 'Entrar al sitio';
	document.getElementById('subsystem').value = 'Catalogo';
	
	document.getElementById('log').disabled=false;
	document.getElementById('pwd').disabled=false;
	
	if(document.getElementById('log').value == "estudiante" && document.getElementById('pwd').value == "estudiante")
	{
		document.getElementById('log').value = '';
		document.getElementById('pwd').value = '';
	}
}

function OnAnonimUser()
{
	document.getElementById('subsytem_name').innerHTML = 'Entrar como estudiante';
	document.getElementById('subsystem').value = 'Catalogo';
	
	document.getElementById('user_log').value = 'estudiante';
	document.getElementById('user_pwd').value = 'estudiante';
	document.getElementById('log').value="estudiante";
	document.getElementById('log').disabled="disabled";
	document.getElementById('pwd').value="estudiante";
	document.getElementById('pwd').disabled="disabled";
}

function ValidateForm()
{
	var _subsystem = document.getElementById('subsystem').value;
	if(_subsystem == '')
	{
		alert('Seleccione el lugar del sitio donde desea entrar');
		return false;
	}
	
	var _log = document.getElementById('log').value;
	if(_log == '')
	{
		alert('Entre su identificador');
		return false;
	}
	
	var _pwd = document.getElementById('pwd').value;
	if(_pwd == '')
	{
		alert('Entre su contrase�a');
		return false;
	}
	
	if( _log != '' && _pwd != '')
	{
		document.getElementById('user_log').value = _log;
		document.getElementById('user_pwd').value = _pwd;
		document.getElementById('log').disabled="disabled";
		document.getElementById('pwd').disabled="disabled";
		document.getElementById('accept_btn').disabled="disabled";
		return true;
	}
	return false;
}

function ShowHint(Hint)
{
	document.getElementById('hint').innerHTML = Hint;
}

function HideHint(Hint)
{
	document.getElementById('hint').innerHTML = '';
}

//-->
</script>
</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" onLoad="MM_preloadImages('App/Client/img/appImages/User_Up.png','App/Client/img/appImages/Work_Up.png','App/Client/img/appImages/AdminSite_Up.png')">

<form method="post" action="App/Server/fn_call.php" onSubmit="return ValidateForm();">
    <table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#8E907E">
      <tr height="25%">
	<td width="20%">&nbsp;</td>
	<td width="60%" valign="bottom"><center><font color="#ebeaa6" style="font-weight:bold"><div id='hint'>&nbsp;</div></font></center></td>
	<td width="20%">&nbsp;</td>
      </tr>
      <tr height="50%">
	<td height="40%">&nbsp;</td>
	<td align="center" valign="top">
	    <table border="0" width="560" height="397" cellpadding="0" cellspacing="0" background="App/Client/img/appImages/main_entry.png">
<tr>
		    <td width="131" height="123">&nbsp;</td>
		    <td width="86" align="right" valign="bottom">&nbsp;<br><br></td>
		    <td width="144" align="left" valign="bottom">&nbsp;</td>
		    <td width="59">&nbsp;</td>
		    <td width="140" valign="top"><br>&nbsp;&nbsp;&nbsp;<a href="javascript:OnAnonimUser()" onMouseOut="MM_swapImgRestore();HideHint();" onMouseOver="MM_swapImage('Image1','','App/Client/img/appImages/User_Up.png',1);ShowHint('Entrar al sitio como estudiante');"><img src="App/Client/img/appImages/User_Down.png" alt="Usuario an�nimo" name="Image1" width="32" height="32" border="0"></a>&nbsp;&nbsp;<a href="javascript:OnUser()" onMouseOut="MM_swapImgRestore();HideHint();" onMouseOver="MM_swapImage('Image2','','App/Client/img/appImages/Work_Up.png',1);ShowHint('Entrar al sitio como profesor o investigador');"><img src="App/Client/img/appImages/Work_Donw.png" alt="Entrar al sistema" name="Image2" width="32" height="32" border="0"></a>&nbsp;&nbsp;<a href="javascript:OnAdmin()" onMouseOut="MM_swapImgRestore();HideHint();" onMouseOver="MM_swapImage('Image3','','App/Client/img/appImages/AdminSite_Up.png',1);ShowHint('Entrar a la administraci�n del sitio');"><img src="App/Client/img/appImages/AdminSite_Down.png" alt="Administar el sistema" name="Image3" width="32" height="32" border="0"></a></td>
		  </tr>
		  <tr>
		    <td height="57">&nbsp;</td>
		    <td align="right" valign="middle" class="Estilo1">&nbsp;</td>
		    <td><br><center><font color="#FFFFFF" style="font-weight:bold"><div id="subsytem_name">&nbsp;</div></font></center><br></td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		  </tr>
		  <tr>
		    <td height="49">&nbsp;</td>
		    <td align="right" valign="middle" class="Estilo1"><font color="#FFFFFF" style="font-weight:bold"> Usuario:&nbsp;</font></td>
		    <td><input name="log" type="text" class="x-form-text" id="log" style="font-size:13px" value=""></td>
		    <td>&nbsp;
		    <input name="user_log" type="hidden" id="user_log"></td>
		    <td>&nbsp;<input name="subsystem" type="hidden" id="subsystem"></td>
		  </tr>
		  <tr>
		    <td height="52">&nbsp;</td>
		    <td align="right" valign="middle" class="Estilo1"><font color="#FFFFFF" style="font-weight:bold">Contrase&ntilde;a:&nbsp;</font></td>
		    <td><input name="pwd" type="password" class="x-form-text" id="pwd" style="font-size:13px" value=""></td>
		    <td>&nbsp;<input name="user_pwd" type="hidden" id="user_pwd"></td>
		    <td>&nbsp;<input name="fn" type="hidden" id="fn" value="App.Log.Log.LogUser"></td>
		  </tr>
		  <tr>
		    <td height="61">&nbsp;</td>
		    <td>&nbsp;</td>
		    <td align="right" valign="middle"><label></label></td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		  </tr>
		  <tr>
		    <td height="60" align="center" valign="top">&nbsp;</td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		    <td>&nbsp;</td>
		    <td align="center" valign="top"><input name="Submit" type="submit" id="accept_btn" class="x-btn-small" value="Aceptar" style="font-size:13px;color:#5F5F5F;background-color:#FFFFFF;border:double;border-color:#5F5F5F"></td>
		  </tr>
		</table>
<br>
		<div id="error" align="center" style="font-family:'Courier New', Courier, monospace; font-weight:bold; color:#0000FF"><?PHP if(isset($_SESSION['LOG_ERROR'])) {echo $_SESSION['LOG_ERROR']; unset($_SESSION['LOG_ERROR']); } ?></div>
	</td>
	<td>&nbsp;</td>
      </tr>
      <tr height="25%">
	<td height="50%">&nbsp;</td>
	<td>&nbsp;</td>
	<td>&nbsp;</td>
      </tr>
    </table>

</form>

</body>
</html>