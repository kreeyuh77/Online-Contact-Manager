var urlBase = 'http://wownice.club/api/';
var extension = '.php';

function doSignup()
{

	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var login = document.getElementById("signupUsername").value;
	var password = document.getElementById("signupPassword").value;

//	var hash = md5( password );

	//Need to edit the url based on the php files given to us
	let url = urlBase + 'RegisterUser' + extension;

	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	//xhr.setRequestHeader("Content-type", "application/json");
	//	var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : hash});
	//	var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : password});
		var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : ' + lastName + ', "Login" : "' + login + '", "Password" : "' + password + '"}';
		
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
	}
	catch (err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}
