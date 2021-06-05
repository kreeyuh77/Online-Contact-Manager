<?php
	require_once 'DBH.php';
	require_once 'functions.php';

	$inData = getRequestInfo();

	# contact information stored as variables
	$search = $inData["search"];
	$ID = $inData["ID"];
	$FirstName = "";
	$LastName = "";
	$StreetAddress = "";
	$City = "";
	$State = "";
	$ZipCode = "";
	$PhoneNumber = "";
	$Email = "";

	# establish connection to MySQL server to access database and handle failed
	# connection error case
	$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
	if($conn->connect_error)
	{
		returnWithError($conn->connect_error);
	}

	# select the contact ID of the contact with the specified ID and first/last name,
	# then using the contact ID, select all attributes of that contact and return
	# that information or else return an error
	else
	{
		switch ($search){
	case "FirstName":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND FirstName =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["FirstName"]);
		break;
	case "LastName":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND LastName =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["LastName"]);
		break;
	case "StreetAddress":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND StreetAddress =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["StreetAddress"]);
		break;
	case "City":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND City =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["City"]);
		break;
	case "State":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND State =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["State"]);
		break;	
	case "ZipCode":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND ZipCode =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["ZipCode"]);
		break;
	case "PhoneNumber":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND PhoneNumber =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["PhoneNumber"]);
		break;
	case "Email":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND Email =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["Email"]);
		break;
	}
		returnWithError("No Records Found");
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		returnWithError("No Records Found");
		$query = "SELECT * FROM Contacts WHERE ID =? AND ContactID =?";
		$stmt = $conn->prepare($query);
		$stmt->bind_param("ii", $ID, $ContactID);
		$stmt->execute();
		$result = $stmt->get_result();
		if($row = $result->fetch_assoc())
		{
			returnWithInfo($row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email'],);
		}
		else
		{
			returnWithError("No Records Found.");
		}
		$stmt->close();
		$conn->close();
	}
	
	# obtain the login information based on the input parameters and send information
	# as JSON element.
	function returnWithInfo($FirstName,$LastName,$StreetAddress,$City,$State,$ZipCode,$PhoneNumber,$Email)
	{
		$retValue = '{"FirstName":"'.$FirstName.'","LastName":"'.$LastName.'","StreetAddress":"'.$StreetAddress.'","City":"'.$City.'","State":"'.$State.'","ZipCode":"'.$ZipCode.'","PhoneNumber":"'.$PhoneNumber.'","Email":"'.$Email.'","error":""}';
		sendResultInfoAsJson($retValue);
	}
?>
