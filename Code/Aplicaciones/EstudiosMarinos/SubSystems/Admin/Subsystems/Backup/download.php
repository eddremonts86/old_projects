<?PHP
	$_file_name = $_GET['file'];

	// We'll be outputting a file .'$_file_type'
	header('Content-type: application/zip');

	// It will be called '$_file_name'
	header('Content-Disposition: attachment; filename="'.$_file_name.'"');

	// Read the file
	readfile('ToExport/'.$_file_name);
?>
