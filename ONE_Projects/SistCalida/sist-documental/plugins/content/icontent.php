<?php
/**
* iCoNtent - Create Stylish Icon on Specific Text
* @version 1.5
* @author DART Creations
* http://www.dart-creations.com
* Based on XTypo Plugin by templateplaza.com
* @license http://www.gnu.org/copyleft/gpl.html GNU/GPL
**/

/** ensure this file is being included by a parent file */
defined( '_JEXEC' ) or die( 'Go Away!' );


$mainframe->registerEvent( 'onPrepareContent', 'icontentclass' );

function icontentclass( &$row, &$params, $page=0 ) {

// add parameters
//global $mosConfig_absolute_path, $mosConfig_live_site, $mosConfig_session_type, $mainframe, $database;
//  $database =& JFactory::getDBO();
//  $query = "SELECT id FROM #__plugins WHERE element = 'icontent' AND folder = 'content'";
//  $database->setQuery( $query );
//  $id = $database->loadObjectList();
  $plugin =& JPluginHelper::getPlugin('content', 'icontent'); 
  //$mambot = new mosMambot( $database );
  //$param =& new mosParameters( $mambot->params );
//  $plugin->load( $id );
  $pluginParams = new JParameter( $plugin->params );
  
  
// end parameters
$regex = array(

"heart" => array("<span class=\"ic_heart\"><img src='plugins/content/icontent/icon/love.gif' height='40' width='40' align='middle' alt='love'/> ***code***</span>","#{heart}(.*?){/heart}#s") ,

"download" => array("<span class=\"ic_download\"><img src='plugins/content/icontent/icon/download.gif' height='40' width='40' align='middle' alt='download'/> ***code***</span>","#{download}(.*?){/download}#s") ,

"question" => array("<span class=\"ic_question\"><img src='plugins/content/icontent/icon/quest.gif' height='40' width='40' align='middle' alt='question'/> ***code***</span>","#{question}(.*?){/question}#s") ,

"alert" => array("<span class=\"ic_alert\"><img src='plugins/content/icontent/icon/alert.gif' height='40' width='40' align='middle' alt='alert'/> ***code***</span>","#{alert}(.*?){/alert}#s") ,

"cal" => array("<span class=\"ic_cal\"><img src='plugins/content/icontent/icon/cal.gif' height='36' width='37' align='middle' alt='calendar'/> ***code***</span>","#{cal}(.*?){/cal}#s") ,

"rssfeed" => array("<span class=\"ic_rss\"><img src='plugins/content/icontent/icon/rss.gif' height='36' width='37' align='middle' alt='rss'/> ***code***</span>","#{rssfeed}(.*?){/rssfeed}#s") ,

"doc" => array("<span class=\"ic_doc\"><img src='plugins/content/icontent/icon/doc.gif' height='40' width='40' align='middle' alt='document'/> ***code***</span>","#{doc}(.*?){/doc}#s") ,

"search" => array("<span class=\"ic_search\"><img src='plugins/content/icontent/icon/search.gif' height='40' width='40' align='middle' alt='search'/> ***code***</span>","#{search}(.*?){/search}#s") ,

"info" => array("<span class=\"ic_info\"><img src='plugins/content/icontent/icon/info.gif' height='40' width='40' align='middle' alt='info'/> ***code***</span>","#{info}(.*?){/info}#s") ,

"star" => array("<span class=\"ic_star\"><img src='plugins/content/icontent/icon/star.gif' height='40' width='40' align='middle' alt='star'/> ***code***</span>","#{star}(.*?){/star}#s") ,

"home" => array("<span class=\"ic_home\"><img src='plugins/content/icontent/icon/home.gif' height='40' width='40' align='middle' alt='home'/> ***code***</span>","#{home}(.*?){/home}#s") ,

"ref" => array("<span class=\"ic_ref\"><img src='plugins/content/icontent/icon/ref.gif' height='40' width='40' align='middle' alt='ref'/> ***code***</span>","#{ref}(.*?){/ref}#s") ,

"next" => array("<span class=\"ic_next\"><img src='plugins/content/icontent/icon/next.gif' height='40' width='40' align='middle' alt='next'/> ***code***</span>","#{next}(.*?){/next}#s") ,

"note" => array("<span class=\"ic_note\"><img src='plugins/content/icontent/icon/note.gif' height='40' width='40' align='middle' alt='note'/> ***code***</span>","#{note}(.*?){/note}#s") ,

"tips" => array("<span class=\"ic_tips\"><img src='plugins/content/icontent/icon/tips.gif' height='37' width='37' align='middle' alt='tips'/> ***code***</span>","#{tips}(.*?){/tips}#s") ,

);


	  
// prepend and append code
$startcode = "<!-- icontent 1.5 --><STYLE TYPE=\"text/css\"><!-- @import url('plugins/content/icontent/styles/icons.css'); --></STYLE>";
$endcode = "<!-- End icontent - Extra Typografi For Joomla Template by DART Creations http://www.dart-creations.com -->";
    
	    foreach ($regex as $key => $value) {  // searching for marks
	    	
	    	if (preg_match_all($regex[$key][1], $row->text, $matches, PREG_PATTERN_ORDER) > 0) {      			 
	    		
	    		foreach ($matches[1] as $match) {	
				  
				  $code = str_replace("***code***", $match, $regex[$key][0] );
				  $row->text = preg_replace("'{".preg_quote($key)."}".preg_quote($match)."{/".preg_quote($key)."}'s", $startcode.$code.$endcode , $row->text );
	    		}
	    	}	    	
	    }     
	 
}
?>