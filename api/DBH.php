	<?php

	# server/database information
	$serverName = "192.3.62.202";
	$dBUsername = "API";
	$dBPassword = "I4m4robot!";
	$dBName = "cop4331_database";

	#establish connection to MySQL server
	$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

	# error message if script is not able to connect with the server
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}
	?>
