<?php
// ensure this file is being included by a parent file
defined('_JEXEC') or die('Restricted access');
/**
 * MAIN FILE! (formerly known as index.php)
 * 
 * @version $Id: admin.joomlaxplorer.php 99 2008-04-20 15:10:20Z soeren $
 * 
 * @package joomlaXplorer
 * @copyright soeren 2007
 * @author The joomlaXplorer project (http://joomlacode.org/gf/project/joomlaxplorer/)
 * @author The  The QuiX project (http://quixplorer.sourceforge.net)
 * @license
 * The contents of this file are subject to the Mozilla Public License
 * Version 1.1 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 * 
 * Alternatively, the contents of this file may be used under the terms
 * of the GNU General Public License Version 2 or later (the "GPL"), in
 * which case the provisions of the GPL are applicable instead of
 * those above. If you wish to allow use of your version of this file only
 * under the terms of the GPL and not to allow others to use
 * your version of this file under the MPL, indicate your decision by
 * deleting  the provisions above and replace  them with the notice and
 * other provisions required by the GPL.  If you do not delete
 * the provisions above, a recipient may use your version of this file
 * under either the MPL or the GPL."
 * 
 *
 * This is a component with full access to the filesystem of your joomla Site
 * I wouldn't recommend to let in Managers
 * allowed: Superadministrator
**/
###################################################################
/* Ninja Xplorer
* By Richie Mortimer
* http://www.ninjoomla.com 
* Copyright (C) 2008 Richie Mortimer www.ninjoomla.com - Code so sharp, it hurts.
* email: Richie@ninjaforge.com
* date: April 2008
* Release: 1.0
* License : http://www.gnu.org/copyleft/gpl.html GNU/GPL 
*
* Changelog
* v1.0
* Joomla! 1.5 Native
*       
* 
*/
###################################################################
//Ninja Xplorer
//Copyright (C) 2007 Richie Mortimer. Ninjoomla.com. All rights reserved.
//
//This program is free software; you can redistribute it and/or
//modify it under the terms of the GNU General Public License
//as published by the Free Software Foundation; either version 2
//of the License, or (at your option) any later version.
//
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program; if not, write to the Free Software
//Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
###################################################################
global $mainframe;
$document =& JFactory::getDocument();
$user         = &JFactory::getUser();
$acl          = &JFactory::getACL();
$database     = &JFactory::getDBO();

/*if (!$acl->acl_check( 'administration', 'config', 'users', $user->usertype )) {
	$mainframe->redirect( 'index2.php', _NOT_AUTH );
}   */
//get the users ID
$myRealGid = intval( $acl->get_group_id( $user->usertype ) );
//check to see if there superadmin, if not redirect them.
if ($myRealGid != 25) {
    $mainframe->redirect( 'index2.php', _NOT_AUTH );
}
// The ninjaXplorer version number
$GLOBALS['nx_version'] = '1.0';
$GLOBALS['nx_home'] = 'http://ninjoomla.com';

/*
// Needed to keep the filelist in the XML installer file up-to-date
$path = $mosConfig_absolute_path.'/administrator/components/com_joomlaxplorer';
$filelist = mosReadDirectory( $path, '.', true, true );
$contents ='';
foreach($filelist as $file ) {
	if( is_dir( $file ) ) continue;
	$filepath = str_replace( $path.'/', '', $file );
	$contents .= '<filename>'.$filepath."</filename>\n";
}
file_put_contents( 'joomlaxplorer_filelist.txt', $contents );
*/

define ( "_QUIXPLORER_PATH", JPATH_SITE."/administrator/components/com_ninjaxplorer" );
define ( "_QUIXPLORER_FTPTMP_PATH", JPATH_SITE."/administrator/components/com_ninjaxplorer/ftp_tmp" );
define ( "_QUIXPLORER_URL", $mainframe->getSiteURL()."administrator/components/com_ninjaxplorer" );

//------------------------------------------------------------------------------
if( defined( 'E_STRICT' )) { 
	// Suppress Strict Standards Warnings (E_ALL doesn't include E_STRICT!)
	error_reporting( E_ALL);
}
//------------------------------------------------------------------------------
umask(0002); // Added to make created files/dirs group writable
//------------------------------------------------------------------------------
require _QUIXPLORER_PATH . "/include/init.php";	// Init
//------------------------------------------------------------------------------

$action = stripslashes(JRequest::getCmd('action'));
if( $action == "post" ) {
  $action = JRequest::getCmd( "do_action" );
} elseif( empty( $action ))
  $action = "list"; 

//if( is_callable( array( $mainframe, 'addcustomheadtag')) ) {
	$document->addScript( "components/com_ninjaxplorer/style/opacity.js" );
//	$document->addScript( "components/com_ninjaxplorer/scripts/mootools.ajax.js" );
/*} else {
	echo '<script type="text/javascript" src="components/com_ninjaxplorer/style/opacity.js"></script>'
		.'<script type="text/javascript" src="components/com_nijaxplorer/scripts/mootools.ajax.js"></script>';
} */

if( nx_isXHR() ) {
	error_reporting(0);
	while( @ob_end_clean() );
}

switch($action) {		// Execute action
//------------------------------------------------------------------------------
  // EDIT FILE
  case "edit":
	  require _QUIXPLORER_PATH . "/include/fun_edit.php";
	  edit_file($dir, $item);
	break; 
  
  // VIEW FILE
  case 'view':
  	require _QUIXPLORER_PATH . "/include/fun_view.php";
  	nx_show_file($dir, $item);
  	break;
//------------------------------------------------------------------------------
  // DELETE FILE(S)/DIR(S)
  case "delete":
	  require _QUIXPLORER_PATH . "/include/fun_del.php";
	  del_items($dir);
  break;
//------------------------------------------------------------------------------
  // COPY/MOVE FILE(S)/DIR(S)
  case "copy":	case "move":
	  require _QUIXPLORER_PATH ."/include/fun_copy_move.php";
	  copy_move_items($dir);
  break;
  // RENAME FILE(S)/DIR(S)
  case "rename":
	  require _QUIXPLORER_PATH ."/include/fun_rename.php";
	  rename_item($dir, $item);
  break;
//------------------------------------------------------------------------------
  // DOWNLOAD FILE
  case "download":
	  require _QUIXPLORER_PATH . "/include/fun_down.php";
	  @ob_end_clean(); // get rid of cached unwanted output
	  download_item($dir, $item);
	  ob_start(false); // prevent unwanted output
	  exit;
  break;
//------------------------------------------------------------------------------
  // UPLOAD FILE(S)
  case "upload":
	  require _QUIXPLORER_PATH . "/include/fun_up.php";
	  upload_items($dir);
  break;
//------------------------------------------------------------------------------
  // CREATE DIR/FILE
  case "mkitem":
	  require _QUIXPLORER_PATH ."/include/fun_mkitem.php";
	  make_item($dir);
  break;
//------------------------------------------------------------------------------
  // CHMOD FILE/DIR
  case "chmod":
	  require _QUIXPLORER_PATH ."/include/fun_chmod.php";
	  chmod_item($dir, $GLOBALS["item"]);
  break;
//------------------------------------------------------------------------------
  // SEARCH FOR FILE(S)/DIR(S)
  case "search":
	  require _QUIXPLORER_PATH ."/include/fun_search.php";
	  search_items($dir);
  break;
//------------------------------------------------------------------------------
  // CREATE ARCHIVE
  case "arch":
	  require _QUIXPLORER_PATH . "/include/fun_archive.php";
	  archive_items($dir);
  break;
//------------------------------------------------------------------------------
  // EXTRACT ARCHIVE
  case "extract":
	  require _QUIXPLORER_PATH . "/include/fun_archive.php";
	  extract_item($dir, $item);
  break;
//------------------------------------------------------------------------------
  // USER-ADMINISTRATION
  case "admin":
	  require _QUIXPLORER_PATH . "/include/fun_admin.php";
	  show_admin($dir);
  break;
//------------------------------------------------------------------------------
  //  System Info
  case 'sysinfo':
	  require _QUIXPLORER_PATH . "/include/fun_system_info.php";
  break;
//------------------------------------------------------------------------------
	// FTP LOGIN
  case 'ftp_authentication':
  	$ftp_login = JRequest::get( $_POST, 'ftp_login_name', '' );
  	$ftp_pass = JRequest::get( $_POST, 'ftp_login_pass', '' );
  	require( _QUIXPLORER_PATH.'/include/fun_ftpauthentication.php' );
  	ftp_authentication( $ftp_login, $ftp_pass );
  	break;
  case 'ftp_logout':
  	require( _QUIXPLORER_PATH.'/include/fun_ftpauthentication.php' );
  	ftp_logout();
  	break;
//------------------------------------------------------------------------------
	// BOOKMARKS
  case 'modify_bookmark':
  	$task = JArrayHelper::getValue( $_REQUEST, 'task' );
  	require( _QUIXPLORER_PATH.'/include/fun_bookmarks.php' );
  	modify_bookmark( $task, $dir );
  	
  	break;
  	
//------------------------------------------------------------------------------
  case 'show_error':
  	show_error('');
  	break;
//------------------------------------------------------------------------------
  // DEFAULT: LIST FILES & DIRS
  case "list":
  default:
	  require _QUIXPLORER_PATH . "/include/fun_list.php";
	  list_dir($dir);
//------------------------------------------------------------------------------
}				// end switch-statement
//------------------------------------------------------------------------------
show_footer();
// Disconnect from ftp server
if( nx_isFTPMode() ) {
	$GLOBALS['FTPCONNECTION']->disconnect();
}
// Empty the output buffer if this is a XMLHttpRequest
if( nx_isXHR() ) {
	nx_exit();
}
//------------------------------------------------------------------------------
?>
