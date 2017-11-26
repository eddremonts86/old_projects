<?php
	header("Content-Type: text/plain"); 
	
	// Support for the PUT method
	$_PUT  = array();
	if($_SERVER['REQUEST_METHOD'] == 'PUT') {
	    parse_str(file_get_contents('php://input'), $_PUT);
	}
	
	$title = $_PUT['title'];
	$year =  $_PUT['year'];
	
	//save your data here
	//in your data base
	//or whatever you want ;)
	
	if(rand(0,1)===0){
		//header('HTTP/1.1 201 Created success');
		$info = array(
			'success' => true,
			'msg' => 'The record "'.$title.'" has been saved succesfully'
		);
	}else{
		//header('HTTP/1.1 501 Error saving the record');
		$info = array(
			'success' => false,
			'msg' => 'There was an error saving the record'
		);
	}
	echo json_encode($info);
?>
