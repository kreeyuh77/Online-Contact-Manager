<?php
	require_once 'DBH.php';
	require_once 'functions.php';

	$inData = getRequestInfo();
	$searchResult = "";
	$resultCount = 0;
	$search = $inData["search"];

	# contact information stored as variables
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
		$searchResult .= '"results" : [';

			$query = "SELECT * FROM Contacts WHERE ID =? AND FirstName LIKE '%" . $inData[". $search ."] . "%' ";
			$stmt = $conn->prepare($query);
			$stmt->bind_param("i", $ID);
			$stmt->execute();
			$result = $stmt->get_result();
			if($row = $result->fetch_assoc())
			{
				$searchResult .= '{';
					$searchResult .= '"ContactID" : "' . $row["ContactID"] . '", ';
					$searchResult .= '"FirstName" : "' . $row["FirstName"] . '", ';
					$searchResult .= '"LastName" : "' . $row["LastName"] . '", ';
					$searchResult .= '"StreetAddress" : "' . $row["StreetAddress"] . '", ';
					$searchResult .= '"City" : "' . $row["City"] . '", ';
					$searchResult .= '"State" : "' . $row["State"] . '", ';
					$searchResult .= '"ZipCode" : "' . $row["ZipCode"] . '", ';
					$searchResult .= '"PhoneNumber" : "' . $row["PhoneNumber"] . '", ';
					$searchResult .= '"Email" : "' . $row["Email"] .  '"';
					$searchResult .= '}';
				$resultCount++;
				while($row = $result->fetch_assoc())
				{
					if($resultCount > 0)
					{
						$searchResult .= ",";
					}
					$resultCount++;
					$retValue .= '{';
					$searchResult .= '"ContactID" : "' . $row["ContactID"] . '", ';
					$searchResult .= '"FirstName" : "' . $row["FirstName"] . '", ';
					$searchResult .= '"LastName" : "' . $row["LastName"] . '", ';
					$searchResult .= '"StreetAddress" : "' . $row["StreetAddress"] . '", ';
					$searchResult .= '"City" : "' . $row["City"] . '", ';
					$searchResult .= '"State" : "' . $row["State"] . '", ';
					$searchResult .= '"ZipCode" : "' . $row["ZipCode"] . '", ';
					$searchResult .= '"PhoneNumber" : "' . $row["PhoneNumber"] . '", ';
					$searchResult .= '"Email" : "' . $row["Email"] .  '"';
					$searchResult .= '}';
				}
			}
			else
			{
				returnWithError("No Results Match");
			}
			returnWithInfo($searchResult);
			$stmt->close();
		$conn->close();
	# obtain the login information based on the input parameters and send information
	# as JSON element.
	function returnWithInfo($searchResult)
	{
		$retValue = '{'. $searchResult . ', "error" : ""}';
		sendResultInfoAsJson($retValue);
	}
?>
