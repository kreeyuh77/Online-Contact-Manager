
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

function doSearch()
{

	document.getElementById("searchResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "address" : "' + address + '", "city" : "' + city + '", "state" : "' + state + '", "zipCode" : "' + zipCode + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';

	//Need to edit the url based on the php files given to us
	var url = urlBase + '/SearchContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if( userId < 1 )
				{		
					document.getElementById("searchResult").innerHTML = "No user found in the database.";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;
				address = jsonObject.address;
				city = jsonObject.city;
				state = jsonObject.state;
				zipCode = jsonObject.zipCode;
				phoneNumber = jsonObject.phoneNumber;
				email = jsonObject.email;

				saveCookie();
	
				window.location.href = "main.html";
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}
}