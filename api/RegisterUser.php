<?php
	require_once 'DBH.php';
	require_once 'functions.php';

	$inData = getRequestInfo();

	# Contact Book User registration information stored as variables.
	$DateCreated = date("Y/m/d");
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];

	# establish connection to MySQL server to access database and handle failed
	# connection error case
	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}

	# Query the database to insert the registered user into the Users table if
	# validation constraints are met or else return an error
	else
	{

		$stmt = $conn->prepare("INSERT INTO Users (DateCreated, FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss", $DateCreated, $FirstName, $LastName, $Login, $Password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("($FirstName, $LastName, $Login, $Password)");
	}

?>
