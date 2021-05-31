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

function doSignup()
{


	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("signupName").value;
	var password = document.getElementById("signupPassword").value;


//	var hash = md5( password );
	
	document.getElementById("signupResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';

	//Need to edit the url based on the php files given to us
	var url = urlBase + '/Signup.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
				if(checkPswds(false))
				{		
					document.getElementById("signupResult").innerHTML = "Passwords do not match.";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "login.html";
				
			}
		};
		xhr.send(jsonPayload);

	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}
