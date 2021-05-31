var urlBase = 'http://wownice.club/api';
var extension = 'php';

function doSignup()
{

	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("signupUsername").value;
	var password = document.getElementById("signupPassword").value;

//	var hash = md5( password );
	
	document.getElementById("signupResult").innerHTML = "";

	//Need to edit the url based on the php files given to us
	var url = urlBase + '/RegisterUser.' + extension;

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
		
	//	var jsonPayload = '{"FirstName" : " + firstName + ", "LastName" : " + lastName + ", "Login" : " + login + ", "Password" : " + hash + "}';
		var jsonPayload = '{"FirstName" : " + firstName + ", "LastName" : " + lastName + ", "Login" : " + login + ", "Password" : " + password + "}';
		xhr.send(jsonPayload);

	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}
