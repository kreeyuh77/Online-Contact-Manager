<?php

require_once 'DBH.php';
require_once 'functions.php';

$inData = getRequestInfo();

# The json varaible is a placeholder for the value of ID stored on a cookie.
$ID = $inData["ID"]; # Replace with json_decode($json);
$ContactID = 0;

$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt1 = $conn->prepare("SELECT ContactID FROM Contacts WHERE ID =? AND FirstName =? AND LastName =?");
    $stmt1->bind_param("iss", $ID, $inData["FirstName"], $inData["LastName"]);
    $stmt1->execute();
    $ContactID = $stmt1->get_result();
    $stmt1->close();
    
    $stmt2 = $conn->prepare("DELETE FROM Contacts WHERE ID =? AND ContactID =?");
    $stmt2->bind_param("ii", $ID, $ContactID);
    $stmt2->execute();
    $stmt2->close();
    
    $conn->close();
    returnWithError("");
}

?>
