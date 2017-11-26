<?php
/**
 * Created by PhpStorm.
 * User: edd
 * Date: 4/7/2015
 * Time: 2:57 PM
 */
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php echo $this->language; ?>"
      lang="<?php echo $this->language; ?>" dir="<?php echo $this->direction; ?>">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <jdoc:include type="head"/>
</head>

<body class="site <?php echo $option
    . ' view-' . $view
    . ($layout ? ' layout-' . $layout : ' no-layout')
    . ($task ? ' task-' . $task : ' no-task')
    . ($itemid ? ' itemid-' . $itemid : '')
?>">

    <!-- Esta es la posicion de los herrores-->
    <?php if($this->countModules('message')) : ?>
    <div class=" error_edd" id="errors_edd">
            <div id="cerrar_edd" class="badge badge-info">x</div>
            <jdoc:include type="message"/>
    </div>
    <?php endif; ?>

    <!--Esta esla posicion de la seccion de Home o Principal del sitio(El index)-->
    <?php if($this->countModules('start_section')) : ?>
    <section class="home-section" id="edd_home_">
        <div class="home_internal">
        <jdoc:include type="modules" name="start_section"/>
        </div>
    </section>
    <?php endif; ?>

    <!--Esta es la posicion de el menu principal-->
    <?php if($this->countModules('topmenu_section')) : ?>
        <div class="container-fluid" id="edd_top_menu">
            <jdoc:include type="modules" name="topmenu_section"/>
        </div>
    <?php endif; ?>

    <!--Esta es la posicion de el menu principal{ aqui va la Informacion general o General Infomations}-->
   <?php if($this->countModules('home_section')) : ?>
       <section class="inicio-section fondo_seccion_home_black">
              <jdoc:include type="modules" name="home_section"/>
       </section>
   <?php endif; ?>

   <?php if($this->countModules('intro_section')) : ?>
       <section class="intro-section">
           <jdoc:include type="modules" name="intro_section"/>
       </section>
   <?php endif; ?>

   <?php if($this->countModules('line_section')) : ?>
       <section class="line-section">
           <jdoc:include type="modules" name="line_section"/>
       </section>
   <?php endif; ?>
   <?php if($this->countModules('studies_section')) : ?>
       <section class="studies-section">
           <jdoc:include type="modules" name="studies_section"/>
       </section>
   <?php endif; ?>

   <?php if($this->countModules('skills_section')) : ?>
       <section class="skills-section">
           <jdoc:include type="modules" name="skills_section"/>
       </section>
   <?php endif; ?>

   <?php if($this->countModules('award_section')) : ?>
       <section class="award-section fondo_seccion_awor__black">
       <jdoc:include type="modules" name="award_section"/>
   </section><?php endif; ?>

   <?php if($this->countModules('design_section')) : ?>
       <section class="design-section fondo_seccion_dising_black">
           <jdoc:include type="modules" name="design_section"/>
       </section>
   <?php endif; ?>

   <?php if($this->countModules('about_section')) : ?>
       <section class="about-section">
           <jdoc:include type="modules" name="about_section"/>
       </section>
   <?php endif; ?>

   <?php if($this->countModules('conf_section')) : ?>
       <section class="conf-section">
           <jdoc:include type="modules" name="conf_section"/>
       </section>
   <?php endif; ?>

   <?php if($this->component) : ?>
      <section class="component-section">
           <div class="container ">
                <jdoc:include type="component"/>
           </div>
       </section>
  <?php endif; ?>

<!--
<div style="width: 500px; margin-left: 100px; margin-top: 50px">
<?php
/*print_r($this)*/?>
</div>
-->




</body>
</html>