<?php

require_once 'DBH.php';
require_once 'functions.php';

$ID = $inData["ID"];
$ContactID = $inData["ContactID"];

$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
if ($conn->connect_error)
{
    returnWithError( $conn->connect_error );
}
else
{
    # Swap out values for user-inputted values.
    $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID =? AND ContactID =?");
    $stmt->bind_param("ii", $ID, $ContactID);
    $stmt->execute();
	$stmt->close();
	$conn->close();
    returnWithError("");
}

?>
