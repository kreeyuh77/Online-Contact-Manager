<?php

require_once 'DBH.php';
require_once 'functions.php';

$inData = getRequestInfo();

# ID variables used to identify contact to be removed
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

# query the database to select the contact based on the specified variables above
# and delete that contact from the table. Return an error if encountered
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
