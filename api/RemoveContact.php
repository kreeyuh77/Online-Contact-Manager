<?php

require_once 'DBH.php';
require_once 'functions.php';

$inData = getRequestInfo();

# Contact Book User registration information stored as variables.
$ID = $inData["ID"];
$ContactID = 0;
$FirstName = $inData["FirstName"];
$LastName = $inData["LastName"];

# establish connection to MySQL server to access database and handle failed
# connection error case
$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    $stmt = $conn->prepare("SELECT ContactID FROM Contacts WHERE ID =? AND FirstName =? AND LastName =?");
    $stmt->bind_param("iss", $ID, $FirstName, $LastName);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $ContactID = $row["ContactID"];
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM Contacts WHERE ContactID =?");
    $stmt->bind_param("i", $ContactID);
    $stmt->execute();
    $stmt->close();
    $conn->close();
    returnWithError("");
}

?>
