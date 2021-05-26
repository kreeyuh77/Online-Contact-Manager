<?php

require 'DBH.php';
require 'functions.php';

$edit = $inData["edit"];
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
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    switch ($edit) {
      case "FirstName":
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["FirstName"],$ID,$ContactID);
        break;
      case "LastName":
        $stmt = $conn->prepare("UPDATE Contacts SET LastName=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["LastName"],$ID,$ContactID);
        break;
      case "StreetAddress":
        $stmt = $conn->prepare("UPDATE Contacts SET StreetAddress=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["StreetAddress"],$ID,$ContactID);
        break;
      case "City":
        $stmt = $conn->prepare("UPDATE Contacts SET City=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["City"],$ID,$ContactID);
        break;
      case "State":
        $stmt = $conn->prepare("UPDATE Contacts SET State=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["State"],$ID,$ContactID);
        break;
      case "ZipCode":
        $stmt = $conn->prepare("UPDATE Contacts SET ZipCode=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["ZipCode"],$ID,$ContactID);
        break;
      case "PhoneNumber":
        $stmt = $conn->prepare("UPDATE Contacts SET PhoneNumber=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["PhoneNumber"],$ID,$ContactID);
        break;
      case "Email":
        $stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("sii", $inData["Email"],$ID,$ContactID);
        break;
      default:
        break;
    }
    $stmt->execute();
		$stmt->close();
		$conn->close();
    returnWithError("");
}

?>
