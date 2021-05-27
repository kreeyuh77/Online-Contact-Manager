<?php
	require_once 'DBH.php';
	require_once 'functions.php';

	$inData = getRequestInfo();

	$ID = $inData["ID"];
	$ContactID = $inData["ContactID"];
	$FirstName = "";
	$LastName = "";
	$StreetAddress = "";
	$City = "";
	$State = "";
	$ZipCode = "";
	$PhoneNumber = "";
	$Email = "";

	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$query = "SELECT * FROM Contacts WHERE ID = ? AND ContactID = ?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("ii", $ID, $ContactID);
		$stmt->execute();
		$result = $stmt->get_result();
		if( $row = $result->fetch_assoc()  )
		{
			returnWithInfo($row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email'],);
		}
		else
		{
			returnWithError("No Records Found");
		}
		$stmt->close();
		$conn->close();
	}

	function returnWithInfo($FirstName,$LastName,$StreetAddress,$City,$State,$ZipCode,$PhoneNumber,$Email)
	{
		$retValue = '{"FirstName":"'.$FirstName.'","LastName":"'.$LastName.'","StreetAddress":"'.$StreetAddress.'","City":"'.$City.'","State":"'.$State.'","ZipCode":"'.$ZipCode.'","PhoneNumber":"'.$PhoneNumber.'","Email":"'.$Email.'","error":""}';
		sendResultInfoAsJson( $retValue );
	}
