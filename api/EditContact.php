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
    if ($edit == "FirstName") {
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["FirstName"]);
    }
    if ($edit == "LastName") {
        $stmt = $conn->prepare("UPDATE Contacts SET LastName=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["LastName"]);
    }
    if ($edit == "StreetAddress") {
        $stmt = $conn->prepare("UPDATE Contacts SET StreetAddress=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["StreetAddress"]);
    }
    if ($edit == "City") {
        $stmt = $conn->prepare("UPDATE Contacts SET City=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["City"]);
    }
    if ($edit == "State") {
        $stmt = $conn->prepare("UPDATE Contacts SET State=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["State"]);
    }
    if ($edit == "ZipCode") {
        $stmt = $conn->prepare("UPDATE Contacts SET ZipCode=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["ZipCode"]);
    }
    if ($edit == "PhoneNumber") {
        $stmt = $conn->prepare("UPDATE Contacts SET PhoneNumber=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["PhoneNumber"]);
    }
    if ($edit == "Email") {
        $stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID=?, ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["Email"]);
    }
    
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
}

?>
