<?php

require 'DBH.php';
require 'functions.php';

$inData = getRequestInfo();

$Edit = $inData["Edit"];
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
    if (isset($FirstName)) {
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["FirstName"]);
    }
    if (isset($LastName)) {
        $stmt = $conn->prepare("UPDATE Contacts SET LastName=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["LastName"]);
    }
    if (isset($StreetAddress)) {
        $stmt = $conn->prepare("UPDATE Contacts SET StreetAddress=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["StreetAddress"]);
    }
    if (isset($City)) {
        $stmt = $conn->prepare("UPDATE Contacts SET City=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["City"]);
    }
    if (isset($State)) {
        $stmt = $conn->prepare("UPDATE Contacts SET State=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["State"]);
    }
    if (isset($ZipCode)) {
        $stmt = $conn->prepare("UPDATE Contacts SET ZipCode=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["ZipCode"]);
    }
    if (isset($PhoneNumber)) {
        $stmt = $conn->prepare("UPDATE Contacts SET PhoneNumber=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["PhoneNumber"]);
    }
    if (isset($Email)) {
        $stmt = $conn->prepare("UPDATE Contacts SET Email=? WHERE ID=? AND ContactID=?");
        $stmt->bind_param("iis", $ID, $ContactID, $inData["Email"]);
    }

    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
}

?>
