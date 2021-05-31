var urlBase = 'http://wownice.club/api';
var extension = 'php';

function doSignup()
{

	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("signupUsername").value;
	var password = document.getElementById("signupPassword").value;

//	var hash = md5( password );

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
		
				if(checkPswds(false))
				{		
					document.getElementById("signupResult").innerHTML = "Passwords do not match.";
					return;
				}
				
				document.getElementById("signupResult").innerHTML = "";
	
				window.location.href = "login.html";
				
			}
		};
		
	//	var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : hash});
		var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : password});
		xhr.send(jsonPayload);

	}
	catch(err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}
