var userId = 0;
var firstName = "";
var lastName = "";
var address = "";
var city = ""; 
var state = "";
var zipCode = 0;
var phoneNumber = 0;
var email = "";



function doAdd()
{

	document.getElementById("addResult").innerHTML = "";

	var jsonPayload = '{"userId" : "' + userId + '","FirstName" : "' + firstName + '", "LastName" : "' + lastName + '", "StreetAddress" : "' + address + '", "City" : "' + city + '", "State" : "' + state + '", "ZipCode" : "' + zipCode + '", "PhoneNumber" : "' + phoneNumber + '", "Email" : "' + email + '"}';

	//Need to edit the url based on the php files given to us
	var url = 'api/AddContact.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addResult").innerHTML = firstName + " " + lastName +  " has been added!";
				window.location.href = "main.html";
			} 			
		}		
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("addResult").innerHTML = err.message;
	}
}
