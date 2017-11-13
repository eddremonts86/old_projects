<?php
/**
 * @package     Joomla.Site
 * @subpackage  Templates.edd
 * 
 * @copyright   Copyright (C) 2005 - 2015 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt

 * Created by PhpStorm.
 * User: edd
 * Date: 4/7/2015
 * Time: 2:57 PM
 */
// No direct access.
defined('_JEXEC') or die;
// Obtener los parametros de la plantilla
$params = JFactory::getApplication()->getTemplate(true)->params;
$app = JFactory::getApplication();
$doc = JFactory::getDocument();
$this->language = $doc->language;
$this->direction = $doc->direction;
// Detectar variables activas
$option = $app->input->getCmd('option', '');
$view = $app->input->getCmd('view', '');
$layout = $app->input->getCmd('layout', '');
$task = $app->input->getCmd('task', '');
$itemid = $app->input->getCmd('Itemid', '');
$sitename = $app->getCfg('sitename');

// Añadir archivos JavaScript
$doc->addScript('templates/'.$this->template.'/js/jquery.js');
JHtml::_('bootstrap.framework');
$doc->addScript('templates/'.$this->template.'/js/template.js');

// Añadir archivos CSS
JHtmlBootstrap::loadCss();
$doc->addStyleSheet('templates/'.$this->template.'/css/font-awesome.css');
$doc->addStyleSheet('templates/'.$this->template.'/css/leaf.css');
$doc->addStyleSheet('templates/'.$this->template.'/css/template.css');
$doc->addStyleSheet('templates/'.$this->template.'/css/response_template.css');
include "layout/basic.php";

?>

