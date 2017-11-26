<?php
defined( '_JEXEC' ) or die( 'Restricted index access' );
define( 'TEMPLATEPATH', dirname(__FILE__) );
/*
-----------------------------------------
commportal - July 2008 Shape 5 Club Template
-----------------------------------------
Site:      www.shape5.com
Email:     contact@shape5.com
@license:  Copyrighted Commercial Software
@copyright (C) 2008 Shape 5

*/
// Template Configuration    
	$s5_loggedin = $this->params->get ("xml_s5_loggedin");	
	$s5_menu = $this->params->get ("xml_s5_menu"); 
	$s5_body_width = $this->params->get ("xml_s5_body_width");
	$s5_left_width = $this->params->get ("xml_s5_left_width");
	$s5_right_width = $this->params->get ("xml_s5_right_width");
	$s5_boxdrop = $this->params->get ("xml_s5_boxdrop");
	$s5_boxone = $this->params->get ("xml_s5_boxone");
	$s5_boxonehide = $this->params->get ("xml_s5_boxonehide");
	$s5_boxonebut = $this->params->get ("xml_s5_boxonebut");
	$s5_boxonetext = $this->params->get ("xml_s5_boxonetext");
	$s5_boxtwo = $this->params->get ("xml_s5_boxtwo");
	$s5_boxtwobut = $this->params->get ("xml_s5_boxtwobut");
	$s5_boxtwobutin = $this->params->get ("xml_s5_boxtwobutin"); 
	$s5_boxtwotext = $this->params->get ("xml_s5_boxtwotext"); 
	$s5_lytebox = $this->params->get ("xml_s5_lytebox");
	$s5_tooltips = $this->params->get ("xml_s5_tooltips");
	$s5_repeatback = $this->params->get ("xml_s5_repeatback");	
	$s5_colorback = $this->params->get ("xml_s5_colorback");	
	$s5_clr_fix = $this->params->get ("xml_s5_clr_fix");	

////////////////////////  DO NOT EDITBELOW THIS  ////////////////////////
	
// Middle content calculations
if (!$this->countModules("left") && !$this->countModules("right")) { $s5_mainbody_width = (($s5_body_width) - 46); }
else if ($this->countModules("left") && !$this->countModules("right")) { $s5_mainbody_width = $s5_body_width - ($s5_left_width + 62);}
else if (!$this->countModules("left") && $this->countModules("right")) { $s5_mainbody_width = $s5_body_width - ($s5_right_width + 62);}
else if ($this->countModules("left") && $this->countModules("right")) { $s5_mainbody_width = $s5_body_width - (($s5_left_width + $s5_right_width) + 78); }
$left_margin = $s5_left_width + 12;
$right_margin = $s5_right_width + 12;

// advert 1, 2, and 3 collapse calculations 
if ($this->countModules("advert1") && $this->countModules("advert2")  && $this->countModules("advert3")) { $advert="33"; }
else if ($this->countModules("advert1") && $this->countModules("advert2") && !$this->countModules("advert3")) { $advert="50"; }
else if ($this->countModules("advert1") && !$this->countModules("advert2") && $this->countModules("advert3")) { $advert="50"; }
else if (!$this->countModules("advert1") && $this->countModules("advert2") && $this->countModules("advert3")) { $advert="50"; }
else if ($this->countModules("advert1") && !$this->countModules("advert2") && !$this->countModules("advert3")) { $advert="100"; }
else if (!$this->countModules("advert1") && $this->countModules("advert2") && !$this->countModules("advert3")) { $advert="100"; }
else if (!$this->countModules("advert1") && !$this->countModules("advert2") && $this->countModules("advert3")) { $advert="100"; }

// advert 4, 5, and 6 collapse calculations 
if ($this->countModules("advert4") && $this->countModules("advert5")  && $this->countModules("advert6")) { $advert2="33"; }
else if ($this->countModules("advert4") && $this->countModules("advert5") && !$this->countModules("advert6")) { $advert2="50"; }
else if ($this->countModules("advert4") && !$this->countModules("advert5") && $this->countModules("advert6")) { $advert2="50"; }
else if (!$this->countModules("advert4") && $this->countModules("advert5") && $this->countModules("advert6")) { $advert2="50"; }
else if ($this->countModules("advert4") && !$this->countModules("advert5") && !$this->countModules("advert6")) { $advert2="100"; }
else if (!$this->countModules("advert4") && $this->countModules("advert5") && !$this->countModules("advert6")) { $advert2="100"; }
else if (!$this->countModules("advert4") && !$this->countModules("advert5") && $this->countModules("advert6")) { $advert2="100"; }

//user1 and 2 calculations
if ($this->countModules("user1") && $this->countModules("user2")) { $user23="50"; }
else if (!$this->countModules("user1") && $this->countModules("user2")) { $user23="100";  }
else if ($this->countModules("user1") && !$this->countModules("user2")) { $user23="100";  }

//user3, 4, 5, 6 and 7 calculations
if ($this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5")  && $this->countModules("user6") && $this->countModules("user7")) { $bottom4="20"; }
else if ($this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5")  && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="25"; }
else if ($this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5")  && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="25"; }
else if ($this->countModules("user3") && $this->countModules("user4") && !$this->countModules("user5")  && $this->countModules("user6") && $this->countModules("user7")) { $bottom4="25"; }
else if ($this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5")  && $this->countModules("user6") && $this->countModules("user7")) { $bottom4="25"; }
else if (!$this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5")  && $this->countModules("user6") && $this->countModules("user7")) { $bottom4="25"; }
else if (!$this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5") && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="33";  }
else if ($this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5") && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="33";  }
else if ($this->countModules("user3") && $this->countModules("user4") && !$this->countModules("user5") && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="33";  }
else if ($this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5") && !$this->countModules("user6") && !$this->countModules("user7")) { $bottom4="33";  }
else if ($this->countModules("user3") && $this->countModules("user4") && !$this->countModules("user5") && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="33";  }
else if (!$this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5") && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="33";  }
else if (!$this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5") && $this->countModules("user6") && $this->countModules("user7")) { $bottom4="33";  }
else if ($this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5") && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="33";  }
else if ($this->countModules("user3") && !$this->countModules("user4") && !$this->countModules("user5") && $this->countModules("user6") && $this->countModules("user7")) { $bottom4="33";  }
else if (!$this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5") && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="50"; }
else if ($this->countModules("user3") && !$this->countModules("user4") && !$this->countModules("user5") && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="50"; }
else if ($this->countModules("user3") && $this->countModules("user4") && !$this->countModules("user5") && !$this->countModules("user6") && !$this->countModules("user7")) { $bottom4="50"; }
else if (!$this->countModules("user3") && $this->countModules("user4") && $this->countModules("user5") && !$this->countModules("user6") && !$this->countModules("user7")) { $bottom4="50"; }
else if (!$this->countModules("user3") && $this->countModules("user4") && !$this->countModules("user5") && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="50"; }
else if ($this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5") && !$this->countModules("user6") && !$this->countModules("user7")) { $bottom4="50"; }
else if ($this->countModules("user3") && !$this->countModules("user4") && !$this->countModules("user5") && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="50"; }
else if (!$this->countModules("user3") && $this->countModules("user4") && !$this->countModules("user5") && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="50"; }
else if (!$this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5") && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="50"; }
else if (!$this->countModules("user3") && !$this->countModules("user4") && !$this->countModules("user5") && $this->countModules("user6") && $this->countModules("user7")) { $bottom4="50"; }
else if ($this->countModules("user3") && !$this->countModules("user4") && !$this->countModules("user5") && !$this->countModules("user6") && !$this->countModules("user7")) { $bottom4="100"; }
else if (!$this->countModules("user3") && $this->countModules("user4") && !$this->countModules("user5") && !$this->countModules("user6") && !$this->countModules("user7")) { $bottom4="100"; }
else if (!$this->countModules("user3") && !$this->countModules("user4") && $this->countModules("user5") && !$this->countModules("user6") && !$this->countModules("user7")) { $bottom4="100"; }
else if (!$this->countModules("user3") && !$this->countModules("user4") && !$this->countModules("user5") && $this->countModules("user6") && !$this->countModules("user7")) { $bottom4="100"; }
else if (!$this->countModules("user3") && !$this->countModules("user4") && !$this->countModules("user5") && !$this->countModules("user6") && $this->countModules("user7")) { $bottom4="100"; }

//center s5 box's
$s5_boxoneml = ($s5_boxone) / 2;  
$s5_boxtwoml = ($s5_boxtwo) / 2;  


if (($s5_menu  == "1") || ($s5_menu  == "3")){ 
require( TEMPLATEPATH.DS."s5_no_moo_menu.php");
}
else if ($s5_menu  == "2")  {
require( TEMPLATEPATH.DS."s5_suckerfish.php");
}

$menu_name = $this->params->get ("xml_menuname");

$s5_modheights = 0;
if (!$this->countModules("left") && $this->countModules("right") || $this->countModules("left") && !$this->countModules("right"))  {
$s5_modheights = 1;
}
if (!$this->countModules("left") && !$this->countModules("right"))  {
$s5_modheights = 2;
}
if ($this->countModules("left") && $this->countModules("right"))  {
$s5_modheights = 3;
}
?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<jdoc:include type="head" />
<meta http-equiv="Content-Type" content="text/html; <?php echo _ISO; ?>" />
<meta http-equiv="Content-Style-Type" content="text/css" />
<link href="<?php echo $this->baseurl ?>/templates/commportal/css/template_css.css" rel="stylesheet" type="text/css" media="screen" />
<link href="<?php echo $this->baseurl ?>/templates/commportal/css/lytebox.css" rel="stylesheet" type="text/css" media="screen" />
<?php if (($s5_menu  == "1") || ($s5_menu  == "2") || ($s5_menu  == "3") ) { ?>
<link href="<?php echo $this->baseurl ?>/templates/commportal/css/suckerfish.css" rel="stylesheet" type="text/css" media="screen" />
<?php } ?>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/s5_effects.js"></script>
<?php if (($s5_menu  == "1") || ($s5_menu  == "2") || ($s5_menu  == "3")) { ?>


 <?php if ($s5_loggedin == "yes") { ?>
	<?php 
	$user =& JFactory::getUser();   
	  $user_id = $user->get('id');   
	  if ($user_id) {?>

	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/IEsuckerfish.js"></script>
	<?php } ?>
 <?php } else { ?>
	<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/IEsuckerfish.js"></script>
 <?php } ?>
<?php } ?>
<?php if ($s5_lytebox  == "yes") { ?>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/lytebox.js"></script>
<?php } ?>

<?php
$br = strtolower($_SERVER['HTTP_USER_AGENT']); // what browser.
if(ereg("msie 6", $br)) {
$is_ie6 = "yes";
} 
else {
$is_ie6 = "no";
}

$br = strtolower($_SERVER['HTTP_USER_AGENT']); // what browser.
if(ereg("safari", $br)) {
$is_safari = "yes";
} 
else {
$is_safari = "no";
}

$br = strtolower($_SERVER['HTTP_USER_AGENT']); // what browser.
if(ereg("msie 7", $br)) {
$is_ie7 = "yes";
} 
else {
$is_ie7 = "no";
}
?>
<?php if ($is_ie6 == "yes") { 
if (!$this->countModules("left") && !$this->countModules("right")) { $s5_mainbody_width = (($s5_body_width) - 46); }
else if ($this->countModules("left") && !$this->countModules("right")) { $s5_mainbody_width = $s5_body_width - ($s5_left_width + 65);}
else if (!$this->countModules("left") && $this->countModules("right")) { $s5_mainbody_width = $s5_body_width - ($s5_right_width + 65);}
else if ($this->countModules("left") && $this->countModules("right")) { $s5_mainbody_width = $s5_body_width - (($s5_left_width + $s5_right_width) + 76); }
$left_margin = $s5_left_width + 12;
$right_margin = $s5_right_width + 12;
}?>

<style type="text/css"> 
#s5_wrap {
	width:<?php echo ($s5_body_width);?>px;}	
#s5_headerwrap {
	width:<?php echo ($s5_body_width) - 50;?>px;}	
#s5_mainbodywrapper {
	width:<?php echo ($s5_body_width) - 33;?>px;}	
	.s5_maintopmiddle {
		width:<?php echo ($s5_mainbody_width) - 5;?>px;}	
	#s5_mainbodywrap { 
		width:<?php echo ($s5_mainbody_width) + 13 ;?>px;}	
	.s5_mainmiddle { 
		width:<?php echo ($s5_mainbody_width) - 13 ;?>px;}	
	.s5_mainbottommiddle {	 
		width:<?php echo ($s5_mainbody_width) - 6;?>px;}	
	.s5_lmaintopmiddle {
		width:<?php echo ($s5_left_width) - 8;?>px;}	
	.s5_lmainmiddle { 
		width:<?php echo ($s5_left_width) - 10;?>px;}	
	.s5_lmainbottommiddle {	 
		width:<?php echo ($s5_left_width) - 9;?>px;}
	.s5_rmaintopmiddle {
		width:<?php echo ($s5_right_width) - 8;?>px;}	
	.s5_rmainmiddle { 
		width:<?php echo ($s5_right_width) - 10;?>px;}	
	.s5_rmainbottommiddle {	 
		width:<?php echo ($s5_right_width) - 9;?>px;}
.s5_ticker {	 
	width:<?php echo ($s5_body_width) - 50;?>px;}	
.s5_threemod_middle {	 
	width:<?php echo ($s5_body_width) - 50;?>px;}
#s5_footercenter {	 
	width:<?php echo ($s5_body_width) - 46;?>px;}	
body {
	background:<?php echo ($s5_colorback);?> url(<?php echo ($s5_repeatback);?>) repeat;}
</style>
<?php if ($is_ie6 == "yes") { ?>
<style type="text/css"> 
.s5_threemod_middle {	 
	width:<?php echo ($s5_body_width) - 55;?>px;}
#s5_footercenter {	 
	width:<?php echo ($s5_body_width) - 53;?>px;}	
#s5_headerwrap {
	height:106px;
	margin-top:-1px;
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_middletop.png', sizingmethod='scale');}
#s5_boxleft {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_s5left.png', sizingmethod='crop');}
#s5_boxright {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_s5right.png', sizingmethod='crop');}	
#s5_headerleft {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_lefttop.png', sizingmethod='crop');}
#s5_headerright {
	margin-left:-1px;
	width:26px;
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_righttop.png', sizingmethod='crop');}	
#s5_headerright {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_righttop.png', sizingmethod='crop');}
.s5_maintopleft {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftmaint.png', sizingmethod='crop');}	
.s5_maintopright {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightmaint.png', sizingmethod='crop');}
.s5_mainbottomleft {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftbottom.png', sizingmethod='crop');}
.s5_mainbottomright {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightbottom.png', sizingmethod='crop');}
.s5_mainbottommiddle {
	background:none;
	margin-top:-3px;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_middlebottom.png', sizingmethod='scale');}
.s5_ticker {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_tickerbar.png', sizingmethod='crop');}
.s5_threemod_left {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftmod.png', sizingmethod='crop');}
.s5_threemod_right {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightmod.png', sizingmethod='crop');}
#s5_footerleft {
	width:30px;
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_lleftbm.png', sizingmethod='crop');}
#s5_footerleft2 {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftbm.png', sizingmethod='crop');}
#s5_footerright2 {
	width:263px;
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightbm.png', sizingmethod='crop');}
#s5_footerright {
	margin-left:-1px;
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rrightbm.png', sizingmethod='crop');}
#s5_footerlogo {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/shape5_logo.png', sizingmethod='crop');}

.s5_bleft {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftb.png', sizingmethod='crop');}
.s5_bright {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightb.png', sizingmethod='crop');}
.s5_rmainbottommiddle, .s5_lmainbottommiddle {
	margin-top:-3px;
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_middlebottom.png', sizingmethod='scale');}
#s5_boxleftback {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_s5left-37.png', sizingmethod='crop');}
#s5_boxrightback {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_s5right-39.png', sizingmethod='crop');}
#s5_boxbottomback {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_s5bottom.png', sizingmethod='crop');}
.s5_threemod_middle {
	background:none;
	height:226px;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_middlemod.png', sizingmethod='scale');}
#navlist ul li.s5_menubottom, #s5_fm_ul0 ul li.s5_menubottom {
	background:none;
	z-index:49;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_menubot.png', sizingmethod='crop');}	
#s5_footercenter {
	background:none;
	filter:
	progid:dximagetransform.microsoft.alphaimageloader(src='<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_middlebm.png', sizingmethod='scale');}	
#s5_buttons {
		margin-right:10px;}	
.s5_rmainmiddle, .s5_lmainmiddle {
	margin-top:-7px;}
.s5_mainmiddle {
	margin-top:-7px;}
#navv ul li a.active {
	background: url(<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftmenutab.png) 0pt 2px no-repeat ;
	color:#429EE9;}
	* html #navlist li:hover a, #navlist li.sfHover a, #s5_fm_ul0 li:hover a, #s5_fm_ul0 li.sfHover a  {
		background:transparent url(<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftmenutab.png) 0pt 2px no-repeat;
		color:#000000;}	
	* html  #navlist li:hover span, #navlist li.sfHover span,#s5_fm_ul0 li:hover span, #s5_fm_ul0 li.sfHover span  {
		background:transparent url(<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightmenutab.png) 0pt 2px no-repeat;
		color:#000000;}		
	* html  #navlist li:hover a, #navlist li.over a,#s5_fm_ul0 li:hover a, #s5_fm_ul0 li.over a  {
		background:transparent url(<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_leftmenutab.png) 0pt 2px no-repeat;
		color:#000000;	}		
	* html  #navlist li:hover span, #navlist li.over span,#s5_fm_ul0 li:hover span, #s5_fm_ul0 li.over span {
		background:transparent url(<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightmenutab.png) right 2px no-repeat;
		color:#000000;	}		
	* html  #navlist span.s5_outer_active span, #navlist span.s5_outer_active, #s5_fm_ul0 span.s5_outer_active span {
		background:transparent url(<?php echo $this->baseurl ?>/templates/commportal/images/s5_commportal_rightmenutab.png) right 2px no-repeat;}
</style> 
<?php } ?>

</head>
<body>
<?php if ($s5_loggedin == "yes") { ?>
	<?php include("templates/commportal/loggedin.php"); ?>
<?php } ?>
<?php if ($s5_loggedin == "no") { ?>
	<?php include("templates/commportal/loggedout.php"); ?>
<?php } ?>

<!-- Footer Logo -->
<div style="clear:both;"></div>	
<div id="s5_footerlogo" style="cursor:pointer;" onclick="window.document.location.href='http://www.shape5.com'"></div>
<div style="clear:both;width:100%;height:23px;"></div>
<!-- End Footer Logo -->



<?php if($this->countModules('toolbar')) { ?>
<!-- S5 Box -->
<div onclick="shiftOpacity1('popup_div');shiftOpacity2('popup_outer')" id="popup_outer" style="cursor:pointer;display:none;background:#429EE9; opacity:.0; <?php if ($is_ie6 == "yes" || $is_ie7 == "yes") { ?>filter: alpha(opacity=0); -moz-opacity: 0;<?php } ?> height: 0px; z-index:80; 
<?php if ($is_ie6 == "yes") { ?>
position:absolute; 
<?php } ?>
<?php if ($is_ie6 == "no") { ?>
position:fixed; 
<?php } ?>
width: 100%; margin: 0px; padding: 0px; left: 0px; top:0px"></div>

<div id="popup_div" style="top:-351px;height:332px;">
<div id="s5_boxleftback"></div>
<div id="s5_boxmiddleback">
<div style="clear:both;height:16px;"></div>
<div id="s5_boxtop">
<jdoc:include type="modules" name="toolbar" style="xhtml" />

<script type="text/javascript">//<![CDATA[
            document.write('</div>');
            //]]></script>

<div id="s5_boxbottom">
	<div id="close_popup_div" style="cursor:pointer;" onclick="shiftOpacity1('popup_div');shiftOpacity2('popup_outer')"><?php echo $s5_boxdrop; ?></div>
</div>
</div>
<div id="s5_boxrightback"></div>
<div style="clear:both;<?php if ($is_ie6 == "no") { ?>height:0px;<?php } ?>"></div>
<div id="s5_boxbottomback" <?php if ($is_ie6 == "yes") { ?>style="margin-top:-10px;"<?php } ?>></div>
</div>
<!-- End S5 Box -->
<?php } ?>





<?php if($this->countModules('cpanel')) { ?>
<div onclick="shiftOpacity3('popup_outer2')" id="popup_outer2" style="cursor:pointer;display:none;background:#429EE9; opacity:.0; <?php if ($is_ie6 == "yes" || $is_ie7 == "yes") { ?>filter: alpha(opacity=0); -moz-opacity: 0;<?php } ?> height: 0px; z-index:80; 
<?php if ($is_ie6 == "yes") { ?>
position:absolute; 
<?php } ?>
<?php if ($is_ie6 == "no") { ?>
position:fixed; 
<?php } ?>
width: 100%; margin: 0px; padding: 0px; left: 0px; top:0px"></div>
<div id="s5_button1" style="display:none;margin-left:-<?php echo $s5_boxoneml; ?>px;position:absolute;z-index:99;top:122px;left:50%;">
					<div class="s5_maintopleft"></div>	
					<div class="s5_rmaintopmiddle" style="width:<?php echo $s5_boxone; ?>px;padding-left:2px;"></div>	
					<div class="s5_maintopright"></div>
					<div style="clear:both;"></div>
					<div class="s5_rmainmiddle" style="width:<?php echo $s5_boxone; ?>px;">
						<jdoc:include type="modules" name="cpanel" style="rounded" />
						<div style="cursor:pointer;margin-left:-14px;">
							<div class="s5_bleft"></div>
							<div class="s5_bmiddle" onclick="shiftOpacity3('popup_outer2')"><?php echo $s5_boxonetext; ?></div>
							<div class="s5_bright"></div>	
						</div>
						<div style="clear:both;"></div>
					
					</div>
					<div class="s5_mainbottomleft"></div>	
					<div class="s5_rmainbottommiddle" style="width:<?php echo $s5_boxone; ?>px;padding-left:1px;"></div>	
					<div class="s5_mainbottomright"></div>
</div>
<?php } ?>	




<?php if($this->countModules('debug')) { ?>
<div onclick="s5boxtwo('popup_outer3')" id="popup_outer3" style="cursor:pointer;display:none;background:#429EE9; opacity:.0; <?php if ($is_ie6 == "yes" || $is_ie7 == "yes") { ?>filter: alpha(opacity=0); -moz-opacity: 0;<?php } ?> height: 0px; z-index:80; 
<?php if ($is_ie6 == "yes") { ?>
position:absolute; 
<?php } ?>
<?php if ($is_ie6 == "no") { ?>
position:fixed; 
<?php } ?>
width: 100%; margin: 0px; padding: 0px; left: 0px; top:0px"></div>

<div id="s5_button2" style="display:none;margin-left:-<?php echo $s5_boxtwoml; ?>px;position:absolute;z-index:99;top:122px;left:50%;">
					<div class="s5_maintopleft"></div>	
					<div class="s5_rmaintopmiddle" style="width:<?php echo $s5_boxtwo; ?>px;padding-left:2px;"></div>	
					<div class="s5_maintopright"></div>
					<div style="clear:both;"></div>
					<div class="s5_rmainmiddle" style="width:<?php echo $s5_boxtwo; ?>px;">
							<jdoc:include type="modules" name="debug" style="rounded" />
						<div style="cursor:pointer;margin-left:-14px;">
							<div class="s5_bleft"></div>
							<div class="s5_bmiddle" onclick="s5boxtwo('popup_outer3')"><?php echo $s5_boxtwotext; ?></div>
							<div class="s5_bright"></div>	
						</div>
						<div style="clear:both;"></div>
					
					</div>
					<div class="s5_mainbottomleft"></div>	
					<div class="s5_rmainbottommiddle" style="width:<?php echo $s5_boxtwo; ?>px;padding-left:1px;"></div>	
					<div class="s5_mainbottomright"></div>
</div>
<?php } ?>		
<?php if (($s5_clr_fix  == "enabled")) { ?>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/s5_clr_fix.js"></script>
<?php } ?>
<?php if ($s5_tooltips  == "yes") { ?>
<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/tooltips.js"></script>
<?php } ?>
<script type="text/javascript">
s5_load_pos();
</script>
</div>
</div>
</body>
</html>