<?php

    require_once 'DBH.php';
    require_once 'functions.php';

    $inData = getRequestInfo();

    # ID variables used to identify contact to be removed
    # $ID = $inData["ID"];
    $ContactID = $inData["ContactID"];


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
      $stmt = $conn->prepare("DELETE FROM Contacts WHERE ContactID =?");
      $stmt->bind_param("i", $ContactID);
      $stmt->execute();
      $stmt->close();
      $conn->close();
      returnWithError("");
    }

?>
