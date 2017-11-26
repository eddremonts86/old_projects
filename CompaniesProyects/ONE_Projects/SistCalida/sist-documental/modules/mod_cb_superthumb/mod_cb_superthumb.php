<?php
/*
* @name mod_CB_superthumb 1.0.8
* Created By Yose and Andy Sikumbang
* http://www.templatePlazza.com
* @copyright Copyright (C) 2007  TemplatePlazza.com / All rights reserved.
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL, see LICENSE.php
* Update Version: Mods by: Erwin Schro and Ricardo Sousa 
* FIX Version Nº 7 by: Ricardo Sousa - www.aiedilabs.com
* Fix version 1.0.7.1 by ronysyz
* Fix version 1.0.8 by sikumbang
*/

// Direct Acess not allowed!
defined( '_VALID_MOS' ) or die( 'Direct Access to this location is not allowed.' );

// Load parameters
$count = intval( $params->get( 'count', 10) );
$modulename = intval( $params->get( 'modulename', 2) );
$width_thumbcb = intval( $params->get( 'width_thumbcb', 60) );
$height_thumbcb = intval( $params->get( 'height_thumbcb', 80) );
$viewname = intval( $params->get( 'viewname', 0) );
$viewgroup = intval( $params->get( 'viewgroup', 1) );              // RS
$showimagenot = intval( $params->get( 'showimagenot', 1) );         // RS
$shownamedetails = intval( $params->get( 'shownamedetails', 1) );    // RS
$user = mosGetParam( $_REQUEST, 'user', 0 );
$shownotavatar  = intval( $params->get( 'shownotavatar', 1) );         // RS
$useid  = intval( $params->get( 'iditemuse', 1) );         // RS
$id  = intval( $params->get( 'iditem', 1) );         // RS
$toolbar = intval( $params->get( 'toolbar', 1) ); // Use Tooll Bar with "ADD / Delete Friend" // "Send PM" //
$imagelinked  = intval( $params->get( 'imagelinked', 1) ); // Show link on the image
$usernamelinked = intval( $params->get( 'userlinked', 1) ); // Show link in the username
$sendpm = intval( $params->get( 'sendpm', 1) );  // Show PM?
$sendmail = intval( $params->get( 'sendmail', 1) );  // Send mail??
$pmssystem  =  $params->get( 'pmssystem', ''); // What is your's?
$adddelete = intval( $params->get( 'conects', 1) ); // Show Add or Delete as Friend
$profilelink = intval( $params->get( 'profilelink', 1) ); // Show profile link?
$grouplink = intval( $params->get( 'grouplink', 1) ); // Select if you want to view group
$width = intval( $params->get( 'width', 1) ); //Width Please
$height = intval( $params->get( 'height', 1) ); // Height Please

$ua = $_SERVER['HTTP_USER_AGENT']; if (strpos($ua,'MSIE 6.0')) {
$st_div_width = $width_thumbcb; } else { 
$st_div_width = $width_thumbcb + 8;}

// Specific ItemId
if ($useid == 1) {
$itemid = "&Itemid=$id";
} else {
$itemid = "";
}


                  
// Name or Username?
if ($viewname == 0) {
	// changed by ERW
    //$s = "c.username";
    $s = "u.username";
} else {
	// changed by ERW
    //$s = "c.name";
    $s = "u.name";
}

//  Avatar must be aprovved?
if ($showimagenot == 1) {
$imagenot = 'and c.avatarapproved = 1';
} else {
$imagenot = '';
}

// Must Have Avatar?
if ($shownotavatar == 1) {
$avatarplease = '';
} else {
$avatarplease = 'and c.avatar IS NOT NULL';
}

// SQL LOAD's
switch ($modulename) {
    case 2 :
        $sql = "select u.id, u.username, u.name, c.avatar from #__users u, #__comprofiler c where u.id = c.user_id and c.approved = 1 and c.confirmed = 1 $imagenot $avatarplease and c.banned = 0 and u.block = 0 order by rand() desc limit " . $count;
    break;
    case 3 :
        $sql = "select u.id, u.username, u.name, c.avatar from #__users u,#__comprofiler c, #__ponygallery p where u.id = c.user_id and u.name = p.owner and p.published = 1 $imagenot $avatarplease and c.approved = 1 and u.block = 0 and c.confirmed = 1 and c.banned = 0 group by u.id order by p.imgdate desc limit " . $count;
    break;
    case 4 :
        $sql = "select u.id, u.username, u.name, c.avatar from #__users u,#__comprofiler c WHERE u.id = c.user_id and c.approved = 1 and c.confirmed = 1 and c.banned = 0 $imagenot $avatarplease and u.block = 0 GROUP BY u.id  ORDER BY u.lastvisitDate desc limit " . $count;
    break;
    case 5 :
        $sql = "SELECT u.id, u.username, u.name, c.avatar, count(*) as num FROM #__comprofiler_views v, #__comprofiler c, #__users u where v.profile_id = c.id and c.user_id = u.id  $imagenot $avatarplease and c.approved = 1 and c.confirmed = 1 and u.block = 0 and c.banned = 0 group by u.id order by num desc limit " . $count;
    break;
    case 6 :
        $sql = "select u.id, u.username, u.name, c.avatar from #__users u, #__comprofiler c where u.id = c.user_id and c.lastupdatedate > '0000-00-00 00:00:00' and c.approved = 1 $imagenot $avatarplease and c.confirmed = 1 and c.banned = 0 and u.block = 0 group by u.id order by c.lastupdatedate desc limit " . $count;
    break;
    case 7 :
        $sql = "select u.id, u.username, u.name, c.avatar from #__users u, #__comprofiler c, #__rsgallery2_files p where u.id = c.user_id and u.id = p.userid and p.published = 1 $imagenot $avatarplease and c.approved = 1 and c.confirmed = 1 and u.block = 0 and c.banned = 0 group by u.id order by p.date desc limit " . $count;
    break;
    case 8 :
        $sql = "select u.id, u.username, u.name, c.avatar FROM #__users u, #__comprofiler c, #__comprofiler_members a  WHERE u.id = c.user_id and c.user_id = a.memberid $imagenot $avatarplease and a.referenceid=".$my->id." AND a.accepted=1 AND a.pending=0 group by u.id limit " . $count;
    break;
    case 9 :
        $sql = "select u.id, u.username, u.name, c.avatar FROM #__users u, #__comprofiler c, #__comprofiler_members a, #__session AS s  WHERE u.id = c.user_id $imagenot $avatarplease and  c.user_id = a.memberid and u.username = s.username and c.approved = 1 and u.block = 0 and c.confirmed = 1 and c.banned = 0 group by u.id limit " . $count;
    break;
    case 10 :
        $sql = "SELECT u.id, u.username, u.name, c.avatar FROM #__users u, #__comprofiler c  WHERE u.id = c.user_id and c.approved = 1 and c.confirmed = 1 $imagenot  $avatarplease  and c.banned = 0 and u.block = 0 order by u.registerDate desc limit " . $count;
     break;
    default :
        $sql = "select u.id, u.username, u.name, c.avatar from #__users u, #__comprofiler c, #__comprofiler_plug_profilebook p where u.id = c.user_id and u.id = p.userid $imagenot $avatarplease and  p.published = 1 and c.approved = 1 and c.confirmed = 1 and u.block = 0 and c.banned = 0 group by u.id order by p.date desc limit " . $count;
}
$database->setQuery($sql);
//print($database->getQuery());
$data = $database->loadObjectList();



if (count($data) > 0) {
?>

<link href="modules/mod_cb_superthumb/cb_superthumb/style.css" rel="stylesheet" type="text/css" />


<?php // Move this CSS link into your index.php header to make this module valid XHTML 
echo '<!-- CB SuperThumb from http://www.templatePlazza.com -->';
?>
<div class="superthumb_wrapper">   
<?php
    $k = count($data);
    $i = 0;
    while ($i < $k) {

?>
<?php
            $dat = $data[$i];
$userid = $dat->id;
$usernames = $dat->username;




			if ($dat->avatar != NULL) {
                if (ereg("^gallery", $dat->avatar) == false) {
                    $dat->avatar = "tn" . $dat->avatar;
                }
                $img = "<img width=\"".$width_thumbcb."\" height=\"".$height_thumbcb."\"  src=\"images/comprofiler/" .$dat->avatar ."\" alt=\" ". $dat->name." \" border=\"0\"/>";
            } else {
                $img = "<img width=\"".$width_thumbcb."\" height=\"".$height_thumbcb."\" src=\"components/com_comprofiler/plugin/language/default_language/images/tnnophoto.jpg\" alt=\" ". $dat->name."\" border=\"0\"/>";
            }
                        
            $arr = Array();
            $sql = "SELECT s.id_group, g.name FROM #__gj_users s, #__gj_groups g where s.id_group = g.id and s.id_user = " . $dat->id;
            $database->setQuery($sql);
            $grp = $database->loadObjectList();        
            
            
            if (count($grp) > 0) {
                $arr[0] = $grp[0]->name;
                $arr[1] = $grp[0]->id_group;            
            } else {
                $arr[0] = NULL;
                $arr[1] = NULL;
            }
            
            $link_cb = sefRelToAbs("index.php?option=com_comprofiler&amp;task=userProfile&amp;user=$dat->id$itemid");
            $link_mail = sefRelToAbs("index.php?option=com_comprofiler&task=emailUser&uid=$dat->id");

           if  ($pmssystem == "mesjim") {
            $link_pms = sefRelToAbs("index.php?option=com_jim&page=new&id=$dat->username");
            }

             if ($pmssystem == "uddeim") {
            $link_pms = sefRelToAbs("index.php?option=com_uddeim&task=new&recip=$dat->id");
            }

            if  ($pmssystem == "pms") {
            $link_pms = sefRelToAbs("index.php?option=com_pms&page=new&id=$dat->username");
                  }

            if ($dat->id != $my->id && $dat->id > 0) {
             $loadfromsql = "select a.* FROM #__comprofiler_members a  WHERE
a.referenceid=".$my->id." and a.memberid=".$dat->id."";
            $database->setQuery($loadfromsql);
            $resultados = $database->loadObjectList();
            if (count($resultados) > 0) {
                  $resultado = $resultados[0];
                  if (($resultado->accepted == 1) && ($resultado->pending == 0)) {
             $link_conect = sefRelToAbs("index.php?option=com_comprofiler&amp;task=removeConnection&amp;act=connection&amp;connectionid=$dat->id");
             $link_conectim = "modules/cb_superthumb/remove.png";
             } else if (($resultado->accepted == 1) && ($resultado->pending == 1)) {
             $link_conect = sefRelToAbs("index.php?option=com_comprofiler&amp;task=removeConnection&amp;act=connection&amp;connectionid=$dat->id");
             $link_conectim = "modules/cb_superthumb/remove.png";
             } } else {
             $link_conect =  sefRelToAbs("index.php?option=com_comprofiler&task=addConnection&act=connection&connectionid=$dat->id");
             $link_conectim = "modules/cb_superthumb/adicionar.png";
             }
             }


            if ($arr[1] != NULL) {
                $tmp = sefRelToAbs("index.php?option=com_groupjive&amp;task=showgroup&amp;groupid=" . $arr[1]);
                $link_gjive = "<a href=\"" .$tmp. "\">" . $arr[0] . "</a>";
				$link_gjive2 = "" .$tmp. "" . $arr[0] . "";
            } else {
                $link_gjive = $arr[0];
            }
            
	// <!--  edited+added by ERW -->
	if ($viewname == 0) {
    $name = $dat->username;
    } else {
    $name = $dat->name;
    }
//	<!-- end edited and replaced ERW -->
?>
                <div class="superthumb_inner" style="float:left; width:<?php echo ($st_div_width) + 9; ?>px;">
                    <?php if ($imagelinked == 1) {?> <div style="padding-top:9px;height:77px;width:76px;background-repeat:no-repeat;background-image:url(modules/mod_cb_superthumb/cb_superthumb/avatarback.jpg);"><a  href="<?php echo $link_cb;?>"><?php } ?><?php echo $img;?><?php if ($imagelinked == 1) { ?></a></div><?php } ?>

                    <?php if ($shownamedetails == 1) { ?>
                    <a class="superthumb_uname" <?php if ($usernamelinked == 1) { ?>href="<?php echo $link_cb;?> <?php }?>">
                    	<!--  edited+added by ERW -->
                    	<?php echo $name; ?>
                    	<!-- end edited and replaced ERW -->
						<?php /*echo $dat->name;*/ ?>
                    <?php } else if ($shownamedetails == 0) {
                    ''; }?>
                    
                   <?php if ($usernamelinked == 1) { ?> </a> <?php } ?>

                   
      <?php if(($viewgroup == 1) && ($grouplink == 0)) { ?>
                <div class="superthumb_gjive"><?php echo $link_gjive; ?></div>
                       <?php } else { ?>
                       <?php } ?>
                 <?php
                  if ($toolbar == 1) { ?>
                  <div>
                  <?php
                  if ($profilelink == 1) {
                  ?>
                  <div class="superthumb_icon">
                  <a href="<?php echo $link_cb;?>">
                  <img src="modules/cb_superthumb/profile.png" />
                  </a></div>
                  <?php }
                    if ($arr[1] != NULL) {
                    if ($grouplink == 1) {   ?>
                  <div class="superthumb_icon">
                  <a href="<?php echo $link_gjive2;?>">
                  <img src="modules/cb_superthumb/group.png"/>
                  </a></div>
                  <?php } } ?>
                  <?php if (($sendpm == 1) && ($my->id != 0)) {   ?>
                  <div class="superthumb_icon">
                    <a href="<?php echo $link_pms;?>">
                  <img src="modules/cb_superthumb/pms.png" />
                  </a></div>
                  
                  <?php  }
                  if (($adddelete == 1) && ($my->id != 0)) { ?>
                  <div class="superthumb_icon">
                  <a href="<?php echo $link_conect ?>">
                  <img src="<?php echo $link_conectim ?>" />
                  </a></div>
                  <?php }

                  if ($sendmail == 1 && ($my->id != 0)) { ?>
                  <div class="superthumb_icon">
                  <a href="<?php echo $link_mail;?>">
                  <img src="modules/cb_superthumb/mail.png" />
                  </a></div>
                  <?php } ?>
                 </div>
                <?php } ?>
                </div>
<?php
        $i++;
?>
<?php
    }
?>
           </div><div style="clear:both"></div>
<?php
} else {
    if ($modulename == 8) {
        echo "<div>You don't have any friend connection.</div>";
    } 
    if ($modulename == 9) {
        echo "<div>No online user.</div>";
    } 	
}

if ($modulename == 8) {
    echo "<div><br/><a href=\"index.php?option=com_comprofiler&amp;task=manageConnections\">Manage connection</a>";
    if ($user != $my->id && $user > 0) {
        $sql = "select a.* FROM #__comprofiler_members a  WHERE
a.referenceid=".$my->id." and a.memberid=".$user."";
        $database->setQuery($sql);
        $rows = $database->loadObjectList();
        if (count($rows) > 0) {
            $row = $rows[0];
            if (($row->accepted == 1) && ($row->pending == 0)) {
                echo "&nbsp;|&nbsp;<img src=\"modules/cb_superthumb/delete.png\" alt=\"Revoke\"/><a
href=\"index.php?option=com_comprofiler&amp;task=removeConnection&amp;act=connection&amp;connectionid=".$user."\">Remove
Connection</a>";
            } else if (($row->accepted == 1) && ($row->pending == 1)) {
                echo "&nbsp;|&nbsp;<img src=\"modules/cb_superthumb/delete.png\" alt=\"Remove\"/><a
href=\"index.php?option=com_comprofiler&amp;task=removeConnection&amp;act=connections&amp;connectionid=".$user."\">Revoke
Connection</a>";
            }
        } else {
            echo "&nbsp;|&nbsp;<img src=\"modules/cb_superthumb/add.png\" alt=\"Add\"/><a
href=\"index.php?option=com_comprofiler&amp;task=addConnection&amp;act=connection&amp;connectionid=".$user."\">Request
Connection</a>";
        }
    }    
    echo "</div>";
}

?>

