<?php
	$inData = getRequestInfo();

	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$StreetAddress = $inData["StreetAddress"];
	$City = $inData["City"];
	$State = $inData["State"];
	$ZipCode = $inData["ZipCode"];
	$PhoneNumber= $inData["PhoneNumber"];
	$Email = $inData["Email"];

	$conn = new mysqli("localhost", "API", "I4m4robot!", "cop4331_database");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		# insert into Contacts (FirstName,LastName,StreetAddress,City,State,ZipCode,PhoneNumber,Email) VALUES ('Jessica', 'Jones','112 house avenue','',3);
		$stmt = $conn->prepare("INSERT into Cards (FirstName,LastName,StreetAddress,City,State,ZipCode,PhoneNumber,Email) VALUES(?,?,?,?,?,?,?,?)");
		$stmt->bind_param("ssssssss", $FirstName, $LastName, $StreetAddress, $City, $State, $ZipCode, $PhoneNumber, $Email);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}

	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>
