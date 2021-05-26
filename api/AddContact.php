  
<?php
require_once 'DBH.php';
require_once 'functions.php';

$ID = $inData["ID"];
$FirstName = $inData["FirstName"];
$LastName = $inData["LastName"];
$StreetAddress = $inData["StreetAddress"];
$City = $inData["City"];
$State = $inData["State"];
$ZipCode = $inData["ZipCode"];
$PhoneNumber= $inData["PhoneNumber"];
$Email = $inData["Email"];

$conn = new mysqli($serverName, $dBUsername, $dBPassword, $dBName);
if ($conn->connect_error)
{
	returnWithError( $conn->connect_error );
}
else
{
	# insert into Contacts (FirstName,LastName,StreetAddress,City,State,ZipCode,PhoneNumber,Email) VALUES ('Jessica', 'Jones','112 house avenue','',3);
	$stmt = $conn->prepare("INSERT into Contacts (ID,FirstName,LastName,StreetAddress,City,State,ZipCode,PhoneNumber,Email) VALUES(?,?,?,?,?,?,?,?,?)");
	$stmt->bind_param("issssssss", $ID, $FirstName, $LastName, $StreetAddress, $City, $State, $ZipCode, $PhoneNumber, $Email);
	$stmt->execute();
	$stmt->close();
	$conn->close();
	returnWithError("");
}
