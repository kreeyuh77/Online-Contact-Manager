<?php

	require_once 'dbh-inc.php';

	$data = json_decode(file_get_contents('php://input'),true);
    $returnData = "";
    $numItems = 0;
	
	$FirstName = $data["FirstName"];

    $sql = "SELECT LastName FROM Users WHERE FirstName = ?;";
	$stmt = mysqli_stmt_init($conn);
	if (!mysqli_stmt_prepare($stmt, $sql)) {
		echo"sql stmt did not prepare";
		exit();
	}

	mysqli_stmt_bind_param($stmt, "i", $FirstName);
	mysqli_stmt_execute($stmt);

	$result_data = mysqli_stmt_get_result($stmt);

    
    while ($row = mysqli_fetch_assoc($result_data)) {
        if($numItems > 0){
            $returnData .= ", ";
        }
        $returnData .= '{"LastName":'. $row["LastName"] .'"}';
        $numItems++;
        
	}

    if($numItems < 1){
        returnWithError("No Users");
        exit();
    }else{
        $return  = '{"result":[ '. $returnData . ' ]}';
        sendResultInfoAsJson( $return ); 
    }
