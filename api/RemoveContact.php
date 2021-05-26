<?php

require_once 'DBH.php';
require_once 'functions.php';

$inData = getRequestInfo();

# The json varaible is a placeholder for the value of ID stored on a cookie.
$ID = $inData["ID"]; # Replace with json_decode($json)
$ContactID = $inData["ContactID"]; # also temp

$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID =? AND ContactID =?");
    $stmt->bind_param("ii", $ID, $ContactID);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
}

?>
