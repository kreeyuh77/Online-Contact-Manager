function doDelete(ContactID)
{
	document.getElementById("deleteResult").innerHTML = "";

	var jsonPayload = '{"ContactID" : "' + ContactID + '"}';

	//Need to edit the url based on the php files given to us
	var url = '../api/RemoveContact.php';

	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{	
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("deleteResult").innerHTML = err.message;
	}
}
