  <?php

  # returns error as JSON element
  function returnWithError( $err ) {
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
  }

  # prints result as JSON element
  function sendResultInfoAsJson( $obj ) {
    header('Content-type: application/json');
    echo $obj;
  }

  # receive JSON data as a PHP file and read the file into a string, then decode
  # the JSON string
  function getRequestInfo()
  {
    return json_decode(file_get_contents('php://input'), true);
  }
  ?>
