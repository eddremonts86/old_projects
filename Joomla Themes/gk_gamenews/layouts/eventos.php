<?php

/**
 *
 * Default view
 *
 * @version             1.0.0
 * @package             Gavern Framework
 * @copyright			Copyright (C) 2010 - 2011 GavickPro. All rights reserved.
 *
 */

// No direct access.
defined('_JEXEC') or die;

//
$app = JFactory::getApplication();
$user = JFactory::getUser();
// getting User ID
$userID = $user->get('id');
// getting params
$option = JRequest::getCmd('option', '');
$view = JRequest::getCmd('view', '');
// defines if com_users
define('GK_COM_USERS', $option == 'com_users' && ($view == 'login' || $view == 'registration'));
// other variables
$btn_login_text = ($userID == 0) ? JText::_('TPL_GK_LANG_LOGIN') : JText::_('TPL_GK_LANG_LOGOUT');
$tpl_page_suffix = $this->page_suffix != '' ? ' class="'.$this->page_suffix.'"' : '';

?>
<!DOCTYPE html>
<html lang="<?php echo $this->APITPL->language; ?>" <?php echo $tpl_page_suffix; ?>>
<head>
    <?php $this->layout->addTouchIcon(); ?>
    <?php if(
        $this->browser->get('browser') == 'ie6' ||
        $this->browser->get('browser') == 'ie7' ||
        $this->browser->get('browser') == 'ie8' ||
        $this->browser->get('browser') == 'ie9'
    ) : ?>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
    <?php endif; ?>
    <?php if($this->API->get('rwd', 1)) : ?>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.0">
    <?php else : ?>
        <meta name="viewport" content="width=<?php echo $this->API->get('template_width', 1020)+80 ?>">
    <?php endif; ?>
    <jdoc:include type="head" />
    <?php $this->layout->loadBlock('head'); ?>
    <?php $this->layout->loadBlock('cookielaw'); ?>
    <link rel="stylesheet" href="<?php echo JURI::base(); ?>templates/gk_gamenews/css/bootstrap.min.css" type="text/css" />
</head>
<body class="body_face" <?php echo $tpl_page_suffix; ?><?php if($this->browser->get("tablet") == true) echo ' data-tablet="true"'; ?><?php if($this->browser->get("mobile") == true) echo ' data-mobile="true"'; ?><?php $this->layout->generateLayoutWidths(); ?> data-bg="<?php echo $this->API->get('template_bg', '1'); ?>">
<?php if ($this->browser->get('browser') == 'ie7' || $this->browser->get('browser') == 'ie6') : ?>
    <!--[if lte IE 7]>
    <div id="ieToolbar"><div><?php echo JText::_('TPL_GK_LANG_IE_TOOLBAR'); ?></div></div>
    <![endif]-->
<?php endif; ?>
    <div class="banner ">

        <!--===============================================================My new positions -- vta_Info ================================================-->
        <?php if($this->API->modules('vta_Info')) : ?>
            <nav id="" class="info">
                <jdoc:include type="modules" name="vta_Info"  style="<?php echo $this->module_styles['vta_Info']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
            </nav>
        <?php endif; ?>
        <!--===============================================================================================================================-->
        <!--===============================================================My new positions -- vta_time ================================================-->
        <?php if($this->API->modules('vta_time')) : ?>
            <nav id=" " class="pull-right search_font">
                <jdoc:include type="modules" name="vta_time"  style="<?php echo $this->module_styles['vta_time']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
            </nav>
        <?php endif; ?>
        <!--===============================================================================================================================-->
    </div>
    <div id="gkPage">
        <?php if(count($app->getMessageQueue())) : ?>
            <jdoc:include type="message" />
        <?php endif; ?>
        <section id="gkPageTop">
            <?php $this->layout->loadBlock('logo'); ?>

            <?php if($this->API->modules('vta_custom1') || $this->API->modules('vta_custom2') || $this->API->modules('vta_custom3') ) : ?>
                <div style="visible-lg">
                    <div style="float:right;width: 35% !important;height: 113px;padding: 2px;margin:4px;">
                        <div style="height: 57px;">
                            <!--===============================================================My new positions -- vta_custom1 ================================================-->
                            <?php if($this->API->modules('vta_custom1')) : ?>
                                <nav id="gkTopBarUsermenu" class="navbar-right ">
                                    <jdoc:include type="modules" name="vta_custom1"  style="<?php echo $this->module_styles['vta_custom1']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
                                </nav>
                            <?php endif; ?>
                            <!--===============================================================================================================================-->
                        </div>
                        <div style="height: 56px;">
                            <!--===============================================================My new positions -- vta_custom2 ================================================-->
                            <?php if($this->API->modules('vta_custom2')) : ?>
                                <nav id="gkTopBarUsermenu" class="navbar-right ">
                                    <jdoc:include type="modules" name="vta_custom2"  style="<?php echo $this->module_styles['vta_custom2']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
                                </nav>
                            <?php endif; ?>
                            <!--===============================================================================================================================-->

                        </div>
                    </div>
                    <div style="float:right;width: 40% !important;height: 113px;padding: 2px;margin:4px;">
                        <div style="height: 113px;">
                            <!--===============================================================My new positions -- vta_custom3 ================================================-->
                            <?php if($this->API->modules('vta_custom3')) : ?>
                                <nav id="gkTopBarUsermenu" class="navbar-right ">
                                    <jdoc:include type="modules" name="vta_custom3"  style="<?php echo $this->module_styles['vta_custom3']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
                                </nav>
                            <?php endif; ?>
                            <!--===============================================================================================================================-->

                        </div>
                    </div>
                </div>
            <?php endif; ?>
            <div id="gkMobileMenu">
                <?php echo JText::_('TPL_GK_LANG_MOBILE_MENU'); ?>
                <select onChange="window.location.href=this.value;">
                    <?php
                    $this->mobilemenu->loadMenu($this->API->get('menu_name','mainmenu'));
                    $this->mobilemenu->genMenu($this->API->get('startlevel', 0), $this->API->get('endlevel',-1));
                    ?>
                </select>
            </div>

            <?php if($this->API->modules('topbanner')) : ?>
                <div id="gkTopBanner">
                    <?php if($this->API->modules('topbanner')) : ?>
                        <jdoc:include type="modules" name="topbanner" style="<?php echo $this->module_styles['topbanner']; ?>"  modnum="<?php echo $this->API->modules('topbanner'); ?>" />
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div id="gkMainMenu">
                <?php
                $this->mainmenu->loadMenu($this->API->get('menu_name','mainmenu'));
                $this->mainmenu->genMenu($this->API->get('startlevel', 0), $this->API->get('endlevel',-1));
                ?>
            </div>

            <?php if($this->API->modules('topmenu')) : ?>
                <nav id="gkTopMenu">
                    <jdoc:include type="modules" name="topmenu" style="<?php echo $this->module_styles['topmenu']; ?>"  modnum="<?php echo $this->API->modules('topmenu'); ?>" />
                </nav>
            <?php endif; ?>
        </section>
        <!--===============================================================My new positions - vta_custom================================================-->
        <?php if($this->API->modules('vta_custom')) : ?>
            <div class="info">
                <jdoc:include type="modules" name="vta_custom"  style="<?php echo $this->module_styles['vta_custom']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
            </div>
        <?php endif; ?>
        <!--===============================================================================================================================-->
        <div id="gkPageContent">
            <?php if($this->API->modules('sidebar') && $this->API->get('sidebar_position', 'right') == 'left') : ?>
                <aside id="gkSidebar">
                    <jdoc:include type="modules" name="sidebar" style="<?php echo $this->module_styles['sidebar']; ?>" />
                </aside>
            <?php endif; ?>

            <section id="gkContent">
                <?php if($this->API->modules('top1')) : ?>
                    <section id="gkTop1" class="gkCols3">
                        <div>
                            <jdoc:include type="modules" name="top1" style="<?php echo $this->module_styles['top1']; ?>"  modnum="<?php echo $this->API->modules('top1'); ?>" modcol="3" />
                        </div>
                    </section>
                <?php endif; ?>

                <?php if($this->API->modules('top2')) : ?>
                    <section id="gkTop2" class="gkCols3">
                        <div>
                            <jdoc:include type="modules" name="top2" style="<?php echo $this->module_styles['top2']; ?>" modnum="<?php echo $this->API->modules('top2'); ?>" modcol="3" />
                        </div>
                    </section>
                <?php endif; ?>

                <?php if($this->API->modules('mainbody_top')) : ?>
                    <section id="gkMainbodyTop">
                        <jdoc:include type="modules" name="mainbody_top" style="<?php echo $this->module_styles['mainbody_top']; ?>" />
                    </section>
                <?php endif; ?>

                <?php if($this->API->modules('breadcrumb') || $this->getToolsOverride()) : ?>
                    <section id="gkBreadcrumb">
                        <?php if($this->API->modules('breadcrumb')) : ?>
                            <jdoc:include type="modules" name="breadcrumb" style="<?php echo $this->module_styles['breadcrumb']; ?>" />
                        <?php endif; ?>

                        <?php if($this->getToolsOverride()) : ?>
                            <?php $this->layout->loadBlock('tools/tools'); ?>
                        <?php endif; ?>
                    </section>
                <?php endif; ?>

                <section id="gkMainbody">
                    <?php if(($this->layout->isFrontpage() && !$this->API->modules('mainbody')) || !$this->layout->isFrontpage()) : ?>
                        <jdoc:include type="component" />
                    <?php else : ?>
                        <jdoc:include type="modules" name="mainbody" style="<?php echo $this->module_styles['mainbody']; ?>" />
                    <?php endif; ?>
                </section>

                <?php if($this->API->modules('mainbody_bottom')) : ?>
                    <section id="gkMainbodyBottom">
                        <jdoc:include type="modules" name="mainbody_bottom" style="<?php echo $this->module_styles['mainbody_bottom']; ?>" />
                    </section>
                <?php endif; ?>
            </section>

            <?php if($this->API->modules('sidebar') && $this->API->get('sidebar_position', 'right') == 'right') : ?>
                <aside id="gkSidebar">
                    <jdoc:include type="modules" name="sidebar" style="<?php echo $this->module_styles['sidebar']; ?>" />
                </aside>
            <?php endif; ?>
        </div>
        <?php if($this->API->modules('bottom1')) : ?>
            <section id="gkBottom1" class="gkCols6">
                <div>
                    <jdoc:include type="modules" name="bottom1" style="<?php echo $this->module_styles['bottom1']; ?>" modnum="<?php echo $this->API->modules('bottom1'); ?>" />
                </div>
            </section>
        <?php endif; ?>
    </div>
    <?php if($this->API->modules('bottom2')) : ?>
        <section id="gkBottom2" class="gkCols6">
            <div>
                <jdoc:include type="modules" name="bottom2" style="<?php echo $this->module_styles['bottom2']; ?>" modnum="<?php echo $this->API->modules('bottom2'); ?>" />
            </div>
        </section>
    <?php endif; ?>
    <?php $this->layout->loadBlock('footer'); ?>
    <?php if($this->API->modules('topnav + social')) : ?>
        <div id="gkTopBar_face">
            <div>
                <?php if($this->API->modules('social')) : ?>
                    <div class="social-icons">
                        <jdoc:include type="modules" name="social" style="<?php echo $this->module_styles['social']; ?>"  modnum="<?php echo $this->API->modules('social'); ?>" />
                    </div>
                <?php endif; ?>

                <?php if($this->API->modules('topnav')) : ?>
                    <nav>
                        <jdoc:include type="modules" name="topnav" style="<?php echo $this->module_styles['topnav']; ?>"  modnum="<?php echo $this->API->modules('topnav'); ?>" />
                    </nav>
                <?php endif; ?>

                <?php if($this->API->modules('usermenu')) : ?>
                    <nav id="gkTopBarUsermenu">
                        <jdoc:include type="modules" name="usermenu" style="<?php echo $this->module_styles['usermenu']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
                    </nav>
                <?php endif; ?>
                <!--===============================================================My new positions -- vta_login ================================================-->
                <div class="date">
                    <div id="fecha"> <div class="date">
			<span>Bienvenido, hoy es: <?php echo date("d"); ?> de
                <?php
                $m = date("m");
                $fecha = array
                ('Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre');
                $if = (int)$m;
                $o = $if -1;
                echo $fecha[$o];
                ?> de <?php echo date("Y"); ?>
                        </div>
                    </div>
                </div>
                <?php if($this->API->modules('vta_login')) : ?>
                    <nav id="gkTopBarUsermenu" class="navbar-right">
                        <jdoc:include type="modules" name="vta_login" style="<?php echo $this->module_styles['vta_login']; ?>" modnum="<?php echo $this->API->modules('usermenu'); ?>" />
                    </nav>
                <?php endif; ?>
                <!--===============================================================================================================================-->
            </div>
        </div>
    <?php endif; ?>
    <?php $this->layout->loadBlock('social'); ?>
    <jdoc:include type="modules" name="debug" />
</body>
</html>

<?php
/*   // the other positions ready to use...
 <jdoc:include type="modules" name="vta_time"  style="<?php echo $this->module_styles['vta_time']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
 <jdoc:include type="modules" name="vta_custom"  style="<?php echo $this->module_styles['vta_custom']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
 <jdoc:include type="modules" name="vta_custom1"  style="<?php echo $this->module_styles['vta_custom1']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
 <jdoc:include type="modules" name="vta_custom2"  style="<?php echo $this->module_styles['vta_custom2']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
 <jdoc:include type="modules" name="vta_custom3"  style="<?php echo $this->module_styles['vta_custom3']; ?>"  modnum="<?php echo $this->API->modules('usermenu'); ?>" />
*/

?>