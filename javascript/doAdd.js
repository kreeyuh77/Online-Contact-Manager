var urlBase = 'http://wownice.club/api';
var extension = 'php';

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

	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "address" : "' + address + '", "city" : "' + city + '", "state" : "' + state + '", "zipCode" : "' + zipCode + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';

	//Need to edit the url based on the php files given to us
	var url = urlBase + '/AddContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addContactButton").innerHTML = "User has been added!";
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
