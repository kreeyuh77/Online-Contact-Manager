<?php
	require_once 'DBH.php';
	require_once 'functions.php';

	$inData = getRequestInfo();

	$ID = $inData["ID"];
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
	$StreetAddress = "";
	$City = "";
	$State = "";
	$ZipCode = "";
	$PhoneNumber = "";
	$Email = "";

	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}
	else
	{
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND FirstName =? AND LastName =?";
		$stmt1 = $conn->prepare($query);
		$stmt1->bind_param("iss", $ID, $FirstName, $LastName);
		$stmt1->execute();
		$result = $stmt1->get_result();
		$ContactID = $result->fetch_row();
		$stmt1->close();
		
		$query = "SELECT * FROM Contacts WHERE ID =? AND ContactID =?";
		$stmt2 = $conn->prepare($query);
		$stmt2->bind_param("iiss", $ID, $ContactID);
		$stmt2->execute();
		$result = $stmt2->get_result();
		if($row = $result->fetch_assoc())
		{
			returnWithInfo($row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email'],);
		}
		else
		{
			returnWithError("No Records Found");
		}
		$stmt2->close();
		$conn->close();
	}

	function returnWithInfo($FirstName,$LastName,$StreetAddress,$City,$State,$ZipCode,$PhoneNumber,$Email)
	{
		$retValue = '{"FirstName":"'.$FirstName.'","LastName":"'.$LastName.'","StreetAddress":"'.$StreetAddress.'","City":"'.$City.'","State":"'.$State.'","ZipCode":"'.$ZipCode.'","PhoneNumber":"'.$PhoneNumber.'","Email":"'.$Email.'","error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
