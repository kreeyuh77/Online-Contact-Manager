<?php
	require_once 'DBH.php';
	require_once 'functions.php';
	
	$inData = getRequestInfo();
	
	$resultCount = 0;
	# contact information stored as variables
	$search = $inData["search"];
	$ID = $inData["ID"];
	$ContactID = "";
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
		switch ($search)
		{
			case "FirstName":
			$query = "SELECT * FROM Contacts WHERE ID =? AND FirstName LIKE '%" . $inData["FirstName"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
					
				if($resultCount > 0)
				{
				$retValue .= ","; 	
				}
				$resultCount++;
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

			case "LastName":
			$query = "SELECT * FROM Contacts WHERE ID =? AND LastName LIKE '%" . $inData["LastName"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
					if($resultCount > 0)
				{
				$retValue .= ","; 	
				}
				$resultCount++;
					returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

			case "StreetAddress":
			$query = "SELECT * FROM Contacts WHERE ID =? AND StreetAddress LIKE '%" . $inData["StreetAddress"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
					if($resultCount > 0)
				{
				$retValue .= ","; 	
				}
				$resultCount++;
					returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

			case "City":
			$query = "SELECT * FROM Contacts WHERE ID =? AND City LIKE '%" . $inData["City"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc()){

				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
			$resultCount++;
			while($row = $result->fetch_assoc())
			{
				if($resultCount > 0)
				{
				$retValue .= ","; 	
				}
				$resultCount++;
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
			}
			}
			else{
			returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

			case "State":
			$query = "SELECT * FROM Contacts WHERE ID =? AND State LIKE '%" . $inData["State"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
				if($resultCount > 0)
				{
				$retValue .= ","; 	
				}
				$resultCount++;
					returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

			case "ZipCode":
			$query = "SELECT * FROM Contacts WHERE ID =? AND ZipCode LIKE '%" . $inData["ZipCode"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
				if($resultCount > 0)
				{
				$retValue .= ","; 	
				}
				$resultCount++;
					returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

			case "PhoneNumber":
			$query = "SELECT * FROM Contacts WHERE ID =? AND PhoneNumber LIKE '%" . $inData["PhoneNumber"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
					returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

			case "Email":
			$query = "SELECT * FROM Contacts WHERE ID =? AND Email LIKE '%" . $inData["Email"] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
					returnWithInfo($row["ContactID"],$row['FirstName'],$row['LastName'],$row['StreetAddress'],$row['City'],$row['State'],$row['ZipCode'],$row['PhoneNumber'],$row['Email']);
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			sendResultInfoAsJson($retValue);
			$stmt->close();
			break;

		}
		$conn->close();
	}

	# obtain the login information based on the input parameters and send information
	# as JSON element.
	function returnWithInfo($ContactID,$FirstName,$LastName,$StreetAddress,$City,$State,$ZipCode,$PhoneNumber,$Email)
	{
		$retValue = '{"ContactID":"'.$ContactID.'","FirstName":"'.$FirstName.'","LastName":"'.$LastName.'","StreetAddress":"'.$StreetAddress.'","City":"'.$City.'","State":"'.$State.'","ZipCode":"'.$ZipCode.'","PhoneNumber":"'.$PhoneNumber.'","Email":"'.$Email.'","error":""}';
		
	}
?>
