<?PHP
	$_file_name = $_GET['file'];
	$_file_type = $_GET['ext'];
	$_file = "../../Backup/ToExport/$_file_name";

	// We'll be outputting a file .'$_file_type'
	header('Content-type: application/' . $_file_type);

	// It will be called '$_file_name'
	header('Content-Disposition: attachment; filename="'.$_file_name.'"');

	// Read the file
	readfile($_file);
?>
