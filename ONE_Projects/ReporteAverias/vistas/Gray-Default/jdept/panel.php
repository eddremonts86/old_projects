<?php
	if($_GET['data'] == 'users'){
		echo '<ul><li>Crysfel</li><li>Hazel</li><li>Jack</li><li>Sasha</li><li>John</li></ul>';
	}
	
	else if($_GET['data'] == 'report'){
		echo '<div style="text-align:center;"><img src="icons/pie.png" alt="Report" /></div>';
	}
	
	else if($_GET['data'] == 'documents'){
		echo '<ul><li>resume.doc</li><li>ext-js-tutorial.pdf</li><li>lost.S05E10.avi</li></ul>';
	}
	
	else{
		echo '<h2>The title</h2>';
		echo '<p>This was loaded with an Ajax call</p>';
	}

?>