<?php

$inData = getRequestInfo();

$serverName = "192.3.62.202";
$dBUsername = "API";
$dBPassword = "I4m4robot!";
$dBName = "cop4331_database";

$ID = $inData["ID"];
$FirstName = $inData["FirstName"];
$LastName = $inData["LastName"];

$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("DELETE ID, FirstName, LastName FROM Contacts WHERE ID =? AND FirstName =? AND LastName =?");
    $stmt->bind_param("iss", $ID, $FirstName, $LastName);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError( $err )
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>
