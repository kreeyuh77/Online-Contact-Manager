<?php

require 'DBH.php';
require 'functions.php';

$inData = getRequestInfo();

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
    $sql = ("DELETE FROM Contacts WHERE ID =3 AND ContactID =1");
    if ($conn->query($sql) === TRUE) {
        returnWithError("");
    } else {
        returnWithError($conn->error);
    }
}

?>
