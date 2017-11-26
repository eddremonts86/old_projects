<?php 
		include 'clases/config/configFile1.php';	
		$result= mysql_query("SELECT * FROM rpa_theme WHERE active = '1'");  			
		while($row = mysql_fetch_array($result)){
		$name=$row ["theme"];
		if($name==blue)
		  {include'index1.php';}
			else if($name==grey)
			 {include 'index2.php';}	
			  else if($name==none)
			   {include 'index3.php';}	
		}
?>
