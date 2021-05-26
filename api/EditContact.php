<?php

require 'DBH.php';
require 'functions.php';

$inData = getRequestInfo();

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
        $stmt->bind_param("iis", $ID, $ContactID, $inData["FirstName"]);
        break;
      case "LastName":
        $stmt = $conn->prepare("UPDATE Contacts SET LastName=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["LastName"]);
        break;
      case "StreetAddress":
        $stmt = $conn->prepare("UPDATE Contacts SET StreetAddress=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["StreetAddress"]);
        break;
      case "City":
        $stmt = $conn->prepare("UPDATE Contacts SET City=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["City"]);
        break;
      case "State":
        $stmt = $conn->prepare("UPDATE Contacts SET State=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["State"]);
        break;
      case "ZipCode":
        $stmt = $conn->prepare("UPDATE Contacts SET ZipCode=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["ZipCode"]);
        break;
      case "PhoneNumber":
        $stmt = $conn->prepare("UPDATE Contacts SET PhoneNumber=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["PhoneNumber"]);
        break;
      case "Email":
        $stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["Email"]);
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
