<?php

$serverName = "192.3.62.202";
$dBUsername = "API";
$dBPassword = "I4m4robot!";
$dBName = "cop4331_database";

$conn = mysqli_connect($serverName, $dBUsername, $dBPassword, $dBName);

if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}
