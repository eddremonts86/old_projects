<div id="s5_wrap" style="margin:0 auto;">
<!-- Start Header -->
		<div id="s5_headerleft"></div>
		<div id="s5_headerwrap">
		<?php if ($is_ie6 == "yes") { ?>
		<div style="position:relative;z-index:80;">
		<div style="height:112px;">
		<?php } ?>
			<div id="s5_logo" style="cursor:pointer;" onclick="window.document.location.href='index.php'"></div>
			<?php if($this->countModules('banner')) { ?>	
				<div id="s5_banner"><jdoc:include type="modules" name="banner" style="xhtml" /></div>	
			<?php } ?>	
		<div style="clear:both;"></div>
			<div id="s5_menu">
				 <?php if (($s5_menu  == "1") || ($s5_menu  == "2") || ($s5_menu  == "3")) { ?>	
						<?php if (($s5_menu  == "1") || ($s5_menu  == "3")) { ?>
								<div id='navv'>
										<?php mosShowListMenu($menu_name);	?>
									<?php if ($s5_menu  == "1") { ?>
									<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/s5_no_moo_menu.js"></script>																		
									<?php } ?>
									<?php if ($s5_menu  == "3") { ?>
										<script type="text/javascript" src="<?php echo $this->baseurl ?>/templates/commportal/js/s5_fading_no_moo_menu.js"></script>																		
									<?php } ?>	
								</div>
						<?php } ?>
									  
						<?php if ($s5_menu  == "2") { ?>
								<div id='navv'>
										<?php mosShowListMenu($menu_name);	?>
								</div>
						<?php } ?>	
				
				<?php } ?>
			</div>
			<?php if($this->countModules('top')) { ?>	
				<div id="s5_search"><jdoc:include type="modules" name="top" style="xhtml" /></div>
			<?php } ?>
		</div>
		<?php if ($is_ie6 == "yes") { ?>
		</div></div>
		<?php } ?>
		<div id="s5_headerright"></div>
<div style="clear:both;"></div>
<!-- End Header -->

<!-- S5 box tab -->
<?php if($this->countModules('toolbar')) { ?>
<div id="s5_boxwrap" style="cursor:pointer;margin-left:-65px;" onclick="<?php if ($is_ie6 == "yes") { ?>ie_popup_fix();<?php } ?>shiftOpacity1('popup_div');shiftOpacity2('popup_outer');show_popup()">
	<div class="s5_bleft"></div>
	<div class="s5_bmiddle">More Information</div>
	<div class="s5_bright"></div>
</div>
<?php } ?>
<!-- End S5 box tab -->


<!-- BreadC / Login -->
<div id="s5_breadlogin">
	<?php if($this->countModules('breadcrumb')) { ?>
	<div id="s5_breadcrumbs"><jdoc:include type="modules" name="breadcrumb" style="rawl" /></div>
	<?php } ?>

	<div id="s5_buttons">
	
	<?php if ($s5_boxonehide == "yes") { ?>
	<?php  $user =& JFactory::getUser();   
  $user_id = $user->get('id');   
  if ($user_id)   
  {     } else {?>

		<?php if($this->countModules('cpanel')) { ?>
		<div class="s5_bleft"></div>
		<div class="s5_bmiddle" onclick="shiftOpacity3('popup_outer2');show_popup2();"><?php echo $s5_boxonebut ;?></div>
		<div class="s5_bright"></div>
		<?php } ?>

	<?php } ?>	
	<?php } ?>
	
	<?php if ($s5_boxonehide == "no") { ?>
		<?php if($this->countModules('cpanel')) { ?>
		<div class="s5_bleft"></div>
		<div class="s5_bmiddle" onclick="shiftOpacity3('popup_outer2');show_popup2();"><?php echo $s5_boxonebut ;?></div>
		<div class="s5_bright"></div>
		<?php } ?>
	<?php } ?>

		<?php if($this->countModules('debug')) { ?>
		<div class="s5_bleft"></div>
		<div class="s5_bmiddle" onclick="s5boxtwo('popup_outer3');show_popup3();"><?php  $user =& JFactory::getUser();   
  $user_id = $user->get('id');   
  if ($user_id) { echo $s5_boxtwobutin ;} else { echo $s5_boxtwobut ; }?></div>
		<div class="s5_bright"></div>
		<?php } ?>

	</div>
</div>
<!-- End BreadC / Login -->


<!-- Start Ticker -->
<?php if($this->countModules('ticker1')) { ?>	
<div style="clear:both;"></div>
<div class="s5_ticker">
	<div style="position:relative;">
	 <jdoc:include type="modules" name="ticker1" style="rounded" />	
	</div>
</div>
<?php } ?>
<!-- End Ticker  -->		
			
			
			

<!-- Start Three Modules  -->
<?php if($this->countModules('advert1') || $this->countModules('advert2') || $this->countModules('advert3')) { ?>	
<div class="s5_threemod_left"></div>
<div class="s5_threemod_middle">
						<?php if($this->countModules('advert1')) { ?>	
						<div id="s5_advert1_<?php echo $advert; ?>"  style="position:relative">
						<div class="s5_advertformat">
							<jdoc:include type="modules" name="advert1" style="rounded" />	
							</div>
						</div>
						<?php } ?>
						
						<?php if($this->countModules('advert2')) { ?>	
						<div id="s5_advert2_<?php echo $advert; ?>"  style="position:relative">	
						<div class="s5_advertformat">
							<jdoc:include type="modules" name="advert2" style="rounded" />
							</div>
						</div>
						<?php } ?>
						
						<?php if($this->countModules('advert3')) { ?>	
						<div id="s5_advert3_<?php echo $advert; ?>"  style="position:relative">
						<div class="s5_advertformat">
							<jdoc:include type="modules" name="advert3" style="rounded" />
							</div>
						</div>
						<?php } ?>
</div>
<div class="s5_threemod_right"></div>
<?php } ?>	
<!-- End Three Modules  -->

<div style="clear:both;"></div>
	
<!-- Start Main Body Output -->	
<div id="s5_mainbodywrapper">

<?php if($this->countModules('left')) { ?>	
	<div id="s5_leftcolumn" style="width:<?php echo ($s5_left_width) + 10;?>px;">
		<div class="s5_maintopleft"></div>	
		<div class="s5_lmaintopmiddle"></div>	
		<div class="s5_maintopright"></div>
		<div style="clear:both;"></div>
		<div class="s5_lmainmiddle" id="s5_modleft">
			<jdoc:include type="modules" name="left" style="rounded" />
		</div>
		<div class="s5_mainbottomleft"></div>	
		<div class="s5_lmainbottommiddle"></div>	
		<div class="s5_mainbottomright"></div>
	</div>
<?php } ?>
			

<div id="s5_mainbodywrap">		
	<div class="s5_maintopleft"></div>	
	<div class="s5_maintopmiddle"></div>	
	<div class="s5_maintopright"></div>
	<div style="clear:both;"></div>
	<div class="s5_mainmiddle" id="s5_modmiddle">
	
	<?php if($this->countModules('user1') || $this->countModules('user2')) { ?>	
		<div id="s5_positions">
					<?php if($this->countModules('user1')) { ?>	
					<div id="s5_user1_<?php echo $user23; ?>">
						<jdoc:include type="modules" name="user1" style="rounded" />
					</div>
					<?php } ?>
					<?php if($this->countModules('user2')) { ?>	
					<div id="s5_user2_<?php echo $user23; ?>">
						<jdoc:include type="modules" name="user2" style="rounded" />
					</div>
				<?php } ?>
		</div>
		<div style="clear:both;"></div>	
	<?php } ?>	
	
	
		<jdoc:include type="message" />
		<jdoc:include type="component" />
	</div>	
	<div class="s5_mainbottomleft"></div>	
	<div class="s5_mainbottommiddle"></div>	
	<div class="s5_mainbottomright"></div>
</div>
	

<?php if($this->countModules('right')) { ?>	
	<div id="s5_rightcolumn" style="width:<?php echo ($s5_right_width) + 10;?>px;">
		<div class="s5_maintopleft"></div>	
		<div class="s5_rmaintopmiddle"></div>	
		<div class="s5_maintopright"></div>
		<div style="clear:both;"></div>
		<div class="s5_rmainmiddle" id="s5_modright">
			<jdoc:include type="modules" name="right" style="rounded" />
		</div>
		<div class="s5_mainbottomleft"></div>	
		<div class="s5_rmainbottommiddle"></div>	
		<div class="s5_mainbottomright"></div>
	</div>	
<?php } ?>
</div>

<?php if($this->countModules('ticker2')) { ?>	
<div style="width:100%;height:5px;clear:both;"></div>
<?php } else {?>
<div style="width:100%;height:23px;clear:both;"></div>
<?php } ?>
<!-- End Main Body  Output -->			
				
					
			

<!-- Start Ticker -->
<?php if($this->countModules('ticker2')) { ?>	
<div style="clear:both;"></div>
<div class="s5_ticker">
	<div style="position:relative;">
	 <jdoc:include type="modules" name="ticker2" style="rounded" />	
	</div>
</div>
<?php } ?>
<!-- End Ticker  -->		
			
			
			

<!-- Start Three Modules  -->
<?php if($this->countModules('advert4') || $this->countModules('advert5') || $this->countModules('advert6')) { ?>	
<div class="s5_threemod_left"></div>
<div class="s5_threemod_middle">
						<?php if($this->countModules('advert4')) { ?>	
						<div id="s5_advert1_<?php echo $advert2; ?>"  style="position:relative">
						<div class="s5_advertformat">
							<jdoc:include type="modules" name="advert4" style="rounded" />	
							</div>
						</div>
						<?php } ?>
						
						<?php if($this->countModules('advert5')) { ?>	
						<div id="s5_advert2_<?php echo $advert2; ?>"  style="position:relative">	
						<div class="s5_advertformat">
							<jdoc:include type="modules" name="advert5" style="rounded" />
							</div>
						</div>
						<?php } ?>
						
						<?php if($this->countModules('advert6')) { ?>	
						<div id="s5_advert3_<?php echo $advert2; ?>"  style="position:relative">
						<div class="s5_advertformat">
							<jdoc:include type="modules" name="advert6" style="rounded" />
							</div>
						</div>
						<?php } ?>
</div>
<div class="s5_threemod_right"></div>
<?php } ?>	
<!-- End Three Modules  -->




<?php if($this->countModules('user3') || $this->countModules('user4') || $this->countModules('user5') || $this->countModules('user6') || $this->countModules('user7')) { ?>
<!-- Start Footer  -->
<div style="width:100%;height:15px;clear:both;"></div>
<div id="s5_footerwrap">
	<div id="s5_footerleft"></div>
		<div id="s5_footercenter">
			<?php if ($is_ie6 == "yes") { ?>
			<div style="position:relative">
			<div style="position:absolute;">
			<?php } ?>
			<?php if($this->countModules('user3')) { ?>	
				<div id="s5_user3_<?php echo $bottom4; ?>">
				<jdoc:include type="modules" name="user3" style="rounded" />
				</div>
			<?php } ?>
			<?php if($this->countModules('user4')) { ?>	
				<div id="s5_user4_<?php echo $bottom4; ?>">
				<jdoc:include type="modules" name="user4" style="rounded" />
				</div>
			<?php } ?>
			<?php if($this->countModules('user5')) { ?>	
				<div id="s5_user5_<?php echo $bottom4; ?>">
				<jdoc:include type="modules" name="user5" style="rounded" />
				</div>
			<?php } ?>
			<?php if($this->countModules('user6')) { ?>	
				<div id="s5_user6_<?php echo $bottom4; ?>">
				<jdoc:include type="modules" name="user6" style="rounded" />
				</div>
			<?php } ?>
			<?php if($this->countModules('user7')) { ?>	
				<div id="s5_user7_<?php echo $bottom4; ?>">
				<jdoc:include type="modules" name="user7" style="rounded" />
				</div>
			<?php } ?>
			<?php if ($is_ie6 == "yes") { ?>
			</div>
			</div>
			<?php } ?>
			<div style="clear:both;"></div>	
		
		</div>
	<div id="s5_footerright"></div>
	
	<div id="s5_footerleft2"></div>
	<div id="s5_footerright2"></div>
</div>
<!-- End Footer  -->
<?php } else {?>
<div style="height:0px;clear:both;"></div>
<?php } ?>



