<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link id="default" rel="stylesheet" type="text/css" href="Framework/Client/ExtJs4.0.7/resources/css/ext-all.css"/>
        <script language="javascript" src="Framework/Client/ExtJs4.0.7/ext-all.js"></script>
<title>Install the New Architecture for Web Development</title>

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
//-->
</script>

</head>
<body leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0" onLoad="MM_preloadImages('App/Client/img/install/CleanConfig_Down.png','App/Client/img/install/ChargeConfig_Down.png')">

<div id="install_page_one" class="x-hide-display">
    <table width="380" height="280" border="0" cellspacing="0" cellpadding="0" background="App/Client/img/install/Install Bg1.png">
      <tr>
        <td height="52" width="51">&nbsp;</td>
        <td width="261">&nbsp;</td>
        <td width="*">&nbsp;</td>
      </tr>
      <tr>
        <td height="40">&nbsp;</td>
        <td><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image1','','App/Client/img/install/CleanConfig_Down.png',1)"><img src="App/Client/img/install/CleanConfig_Up.png" name="Image1" width="261" height="40" border="0"></a></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="40">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="52">&nbsp;</td>
        <td><a href="#" onMouseOut="MM_swapImgRestore()" onMouseOver="MM_swapImage('Image2','','App/Client/img/install/ChargeConfig_Down.png',1)"><img src="App/Client/img/install/ChargeConfig_Up.png" name="Image2" width="261" height="40" border="0"></a></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height="*">&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    </table>
</div>

<script language="javascript" type="">
                Ext.onReady(function()
                {
                    var win = Ext.create('widget.window', {
                        title: 'Installer',
                        closable: false,
                        //animateTarget: this,
                        width: 600,
                        height: 350,
                        layout: 'border',
                        resizable : false,
                        bodyStyle: 'padding: 5px;',
                        items: [
                        {
                            region: 'west',
                            width: 200,
                            split: false,
                            collapsible: false,
                            floatable: false,
                            minWidth : 200,
                            maxWidth : 200,
							html : '<img src="App/Client/img/install/InstallBanner.png"/>'
                        }, {
                            region: 'center',
                            xtype: 'tabpanel',
                            items: [
                            {
                                title: 'Config',
                                html : 'Config'
                            }, {
                                title: 'Administrator',
                                html : 'Admin'
                            }]
                        }]
                    });

                    win.show();
                });
        </script>
</body>
</html>
