<?php
	require_once 'DBH.php';
	require_once 'functions.php';

	$date = date("m/d/Y");
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$Login = $inData["Login"];
	$Password = $inData["Password"];

	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$stmt = $conn->prepare("INSERT INTO Users (DateCreated, FirstName, LastName, Login, Password) VALUES ($date, ?, ?, ?, ?)");
		$stmt->bind_param("ssss", $FirstName, $LastName, $Login, $Password);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

?>
