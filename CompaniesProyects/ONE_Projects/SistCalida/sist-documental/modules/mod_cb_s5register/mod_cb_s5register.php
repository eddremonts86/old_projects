<?php
/**
* S5 CB Register Module
* @Copyright (C) 2008 Shape 5 LLC
* @ All rights reserved
* @ Released under GNU/GPL License : http://www.gnu.org/copyleft/gpl.html
* @version 1.0
**/

defined('_JEXEC') or die('Restricted access');


$pretext		= $params->get( 'pretext', '' );
$posttext		= $params->get( 'posttext', '' );
$terms		= $params->get( 'terms', '' );
$termslink		= $params->get( 'termslink', '' );
$images		= $params->get( 'images', '' );



$cbSpoofString = 0;
$regAntiSpamValues = 0;

$user =& JFactory::getUser();   
  $user_id = $user->get('id');   
  if ($user_id)   
  {

} else {


function cbGetSpoofInputTag( $cbSpoofString = null ) {
	if ( $cbSpoofString === null ) {
		$cbSpoofString		=	cbSpoofString();
	}
	return "<input type=\"hidden\" name=\"" . cbSpoofField() . "\" value=\"" .  $cbSpoofString . "\" />\n";
}

function _cbjosSpoofCheck($array, $badStrings) {
	foreach ($array as $k => $v) {
		foreach ($badStrings as $v2) {
			if (is_array($v)) {
				_cbjosSpoofCheck($v, $badStrings);
			} else if (strpos( $v, $v2 ) !== false) {
				header( "HTTP/1.0 403 Forbidden" );
				mosErrorAlert( _UE_NOT_AUTHORIZED );
				return;
			}
		}
	}
}

function cbSpoofString( $string = null ) {
	global $mainframe;
	if ( $string === null ) {
		$salt		=	array();
		$salt[0]	=	mt_rand( 1, 2147483647 );
		$salt[1]	=	mt_rand( 1, 2147483647 );		// 2 * 31 bits random
	} else {
		$salt = sscanf( $string, 'cbm_%08x_%08x' );
	}
	return sprintf( 'cbm_%08x_%08x_%s', $salt[0], $salt[1], md5( $salt[0] . date( 'dmY' ) . $mainframe->getCfg( 'db' ) . $mainframe->getCfg('secret') . $salt[1] ) );
}

function cbSpoofField() {
	return 'cbsecurityg1';
}

function cbGetRegAntiSpamInputTag( $cbGetRegAntiSpams = null ) {
	if ( $cbGetRegAntiSpams === null ) {
		$cbGetRegAntiSpams = cbGetRegAntiSpams();
	}
	setcookie( "cbrvs", $cbGetRegAntiSpams[1], false, '/' );
	return "<input type=\"hidden\" name=\"" . cbGetRegAntiSpamFieldName() ."\" value=\"" .  $cbGetRegAntiSpams[0] . "\" />\n";
}

function cbGetRegAntiSpams( $decrement = 0, $salt = null ) {
	global $mainframe, $my;
	if ( $salt === null ) {
		$salt		=	cbMakeRandomString( 16 );
	}
	$time	 	=	time();
	$valtime	=	( (int) ( $time / 1800 )) - $decrement;
	// no IP addresses here, since on AOL it changes all the time.... $hostIPs = cbGetIParray();
	if ( strlen( $salt ) == 16 ) {
		$validate = array();
		$validate[0] = 'cbrv1_' . md5( $salt . $mainframe->getCfg('secret') . $valtime ) . '_' . $salt;
		$validate[1] = 'cbrv1_' . md5( $salt . $mainframe->getCfg( 'db' )   . $valtime ) . '_' . $salt;
		return $validate;
	} else {
		header( 'HTTP/1.0 403 Forbidden' );
		echo "<script>alert(\"" . _UE_SESSION_EXPIRED ."\"); window.history.go(-1);</script> \n";
		exit;
	}
}

function cbMakeRandomString( $stringLength = 8, $noCaps = false ) {
	if ( $noCaps ) {
		$chars		=	'abchefghjkmnpqrstuvwxyz0123456789';
	} else {
		$chars		=	'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	}
	$len			=	strlen( $chars );
	$rndString		=	'';
	mt_srand( 10000000 * (double) microtime() );
	for ( $i = 0; $i < $stringLength; $i++ ) {
		$rndString	.=	$chars[mt_rand( 0, $len - 1 )];
	}
	return $rndString;
}

function cbGetRegAntiSpamFieldName() {
	return 'cbrasitway';
}


?>
	
		
	
	

<script type="text/javascript" src="modules/mod_cb_s5registe/mod_cb_s5register/submit.js"></script>



<?php if ($pretext != "") { ?>
<br />
<?php echo $pretext ?>
<br /><br />
<?php } ?>


<script type="text/javascript">//<![CDATA[
    document.write('<style type="text/css">#s5_cbregister .inputbox {margin:0px;}</style>');
//]]></script>


<form action="index.php?option=com_comprofiler" method="post" id="adminForm" name="adminForm" onsubmit="return submitbutton(this)">
<div id="s5_cbregister">
	<div style="float:left;">Name:</div>
	<div style="float:right;width:300px;">
		<input class="inputbox" type="text" size="40" id="name" name="name" value="" /><span class='cbFieldIcons'> <img src='components/com_comprofiler/plugin/templates/luna/required.gif' width='16' height='16' alt='* This Field is required' title='This Field is required' /> <img src='components/com_comprofiler/plugin/templates/luna/noprofiles.gif' width='16' height='16' alt='This Field IS NOT visible on profile' title='This Field IS NOT visible on profile' /></span>
	</div>

		<div style="clear:both;"></div>
	<div style="float:left;">Username:</div>
	<div style="float:right;width:300px;">
		<input type="text" id="username" name="username" size="40" value="" class="inputbox" /><span class='cbFieldIcons'> <img src='components/com_comprofiler/plugin/templates/luna/required.gif' width='16' height='16' alt='* This Field is required' title='This Field is required' /> <img src='components/com_comprofiler/plugin/templates/luna/profiles.gif' width='16' height='16' alt='This Field IS visible on profile' title='This Field IS visible on profile' /> <img src="components/com_comprofiler/plugin/templates/luna/tooltip.png" style="border:0" width="16" height="16" title="" alt="Information for: Username: : Please enter a valid User Name.  No spaces, more than 2 characters and contain 0-9,a-z,A-Z" onmouseover="return overlib('Please enter a valid User Name.  No spaces, more than 2 characters and contain 0-9,a-z,A-Z', CAPTION, 'Username:');" onmouseout="return nd();" /></span>
	</div>

		<div style="clear:both;"></div>	
		
	<div style="float:left;">E-mail:</div>
	<div style="float:right;width:300px;">
		<input type="text" id="email" name="email" size="40" value="" class="inputbox" /><span class='cbFieldIcons'> <img src='components/com_comprofiler/plugin/templates/luna/required.gif' width='16' height='16' alt='* This Field is required' title='This Field is required' /> <img src='components/com_comprofiler/plugin/templates/luna/noprofiles.gif' width='16' height='16' alt='This Field IS NOT visible on profile' title='This Field IS NOT visible on profile' /> <img src="components/com_comprofiler/plugin/templates/luna/tooltip.png" style="border:0" width="16" height="16" title="" alt="Information for: E-mail: : Please enter a valid e-mail address." onmouseover="return overlib('Please enter a valid e-mail address.', CAPTION, 'E-mail:');" onmouseout="return nd();" /></span>
	</div>

		<div style="clear:both;"></div>	
	
	<div style="float:left;">Password:</div>
	<div style="float:right;width:300px;">
		<input class="inputbox" type="password" id="password" name="password" size="40" value="" /><span class='cbFieldIcons'> <img src='components/com_comprofiler/plugin/templates/luna/required.gif' width='16' height='16' alt='* This Field is required' title='This Field is required' /> <img src='components/com_comprofiler/plugin/templates/luna/noprofiles.gif' width='16' height='16' alt='This Field IS NOT visible on profile' title='This Field IS NOT visible on profile' /> <img src="components/com_comprofiler/plugin/templates/luna/tooltip.png" style="border:0" width="16" height="16" title="" alt="Information for: Password: : Please enter a valid Password.  No spaces, more than 6 characters and contain 0-9,a-z,A-Z" onmouseover="return overlib('Please enter a valid Password.  No spaces, more than 6 characters and contain 0-9,a-z,A-Z', CAPTION, 'Password:');" onmouseout="return nd();" /></span>
	</div>
		
		<div style="clear:both;"></div>	
	
    <div style="float:left;">Verify Password:</div>
	<div style="float:right;width:300px;">
		<input class="inputbox" type="password" id="verifyPass" name="verifyPass" size="40" value="" /><span class='cbFieldIcons'> <img src='components/com_comprofiler/plugin/templates/luna/required.gif' width='16' height='16' alt='* This Field is required' title='This Field is required' /> <img src='components/com_comprofiler/plugin/templates/luna/noprofiles.gif' width='16' height='16' alt='This Field IS NOT visible on profile' title='This Field IS NOT visible on profile' /></span>
	</div>

		<div style="clear:both;"></div>	

<?php if ($terms == "2") { ?>
	  
	  <br/> <br/>
<input type="checkbox" value="1" name="acceptedterms"/> Accept <a target="_BLANK" href="<?php echo $termslink ?>">Terms and Conditions</a>
	   <br/> <br/>
<?php } ?>	

	
	  
		<input type="hidden" name="id" value="0" />
		<input type="hidden" name="gid" value="0" />
		<input type="hidden" name="emailpass" value="0" />
		<input type="hidden" name="option" value="com_comprofiler" />
		<input type="hidden" name="task" value="saveregisters" />
<input type="hidden" name="task" value="saveregisters" />
		<?php
		echo cbGetSpoofInputTag( $cbSpoofString );
		echo "\t\t" . cbGetRegAntiSpamInputTag( $regAntiSpamValues );
?>

		<input type="submit" value="Send Registration" class="button" />
		 <br/><br/>

</div>
</form>

<?php if ($posttext != "") { ?>
<br />
<?php echo $posttext ?>
<br /><br />
<?php } ?>

<?php if ($images == "2") { ?>
<div style="align:center;" id="cbIconsBottom"><span class='cbFieldIconsLabels'> <img src='components/com_comprofiler/plugin/templates/luna/required.gif' width='16' height='16' alt='* This Field is required' title='This Field is required' /> This Field is required |  <img src='components/com_comprofiler/plugin/templates/luna/profiles.gif' width='16' height='16' alt='This Field IS visible on profile' title='This Field IS visible on profile' /> This Field IS visible on profile |  <img src='components/com_comprofiler/plugin/templates/luna/noprofiles.gif' width='16' height='16' alt='This Field IS NOT visible on profile' title='This Field IS NOT visible on profile' /> This Field IS NOT visible on profile |  <img src="components/com_comprofiler/plugin/templates/luna/tooltip.png" style="border:0" width="16" height="16" title="" alt="Information for: ? : Field description: Move mouse over icon" onmouseover="return overlib('Field description: Move mouse over icon', CAPTION, '?');" onmouseout="return nd();" /> Field description: Move mouse over icon</span></div>
<?php } ?>


<?php } ?>
