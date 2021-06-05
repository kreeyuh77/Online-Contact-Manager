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
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND FIRSTNAME LIKE '%" . $inData["FirstName"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["FirstName"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	case "LastName":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND LastName LIKE '%" . $inData["LastName"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["LastName"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	case "StreetAddress":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND StreetAddress LIKE '%" . $inData["StreetAddress"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["StreetAddress"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	case "City":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND City LIKE '%" . $inData["City"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["City"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	case "State":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND State LIKE '%" . $inData["State"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["State"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	case "ZipCode":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND ZipCode LIKE '%" . $inData["ZipCode"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["ZipCode"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	case "PhoneNumber":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND PhoneNumber LIKE '%" . $inData["PhoneNumber"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["PhoneNumber"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	case "Email":
		$query = "SELECT ContactID FROM Contacts WHERE ID =? AND Email LIKE '%" . $inData["Email"] . "%';
		$stmt = $conn->prepare($query);
		$stmt->bind_param("is", $ID, $inData["Email"]);
		$stmt->execute();
		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$ContactID = $row["ContactID"];
		$stmt->close();
		break;
	}

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
