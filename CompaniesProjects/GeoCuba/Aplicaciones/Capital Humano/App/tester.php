<?PHP
	session_start();
	
	$_hour = intval(date('G')) + rand(1,5);
	$_min = intval(date('i')) + rand(10, 25);
	$_seg = strval(intval(date('s')) + rand(10, 45));
	
	$_rigth = $_seg[0];
	$_left = $_seg[1];
	
	if(isset($_SESSION['_AT']))
	{
		$_t = $_SESSION['_AT'];
		$_tt = intval($_t[ strlen($_t) - 2 ]);
		// The count of access times are between 1 and 5, no problem.
		if($_tt >= 1 && $_tt <= 5)
			$_seg = $_rigth . intval($_tt) + 1 . $_left;
		// If is 0 or bigger, then there are problem. Goto home
		else
		{
			$_k = strval(rand(6,10));
			$_l = $_k[ strlen($_k) - 1 ];
			$_seg = $_rigth . $_l . $_left;
		}
	}
	else
		$_seg = $_rigth . '1' . $_left;
	
	$_time = date('yn.j') . "$_hour.$_min.$_seg";
	$_SESSION['_AT'] = $_time;
	echo $_time;
?>