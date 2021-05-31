var urlBase = 'http://wownice.club/api/';
var extension = '.php';

function doSignup()
{

	let firstName = document.getElementById("firstName").value;
	let lastName = document.getElementById("lastName").value;
	let login = document.getElementById("signupUsername").value;
	let password = document.getElementById("signupPassword").value;

//	var hash = md5( password );
	let xhr = new XMLHttpRequest();
	
	//Need to edit the url based on the php files given to us
	let url = new URL(urlBase + 'RegisterUser' + extension);
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json");
	//	var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : hash});
	//	var jsonPayload = JSON.stringify({"FirstName" : firstName, "LastName" : lastName, "Login" : login, "Password" : password});
		var jsonPayload = '{"FirstName" : "' + firstName + '", "LastName" : ' + lastName + ', "Login" : "' + login + '", "Password" : "' + password + '"}';
		
	try
	{
		xhr.send(jsonPayload);
		
		let jsonObject = JSON.parse( xhr.responseText );
	}
	catch (err)
	{
		document.getElementById("signupResult").innerHTML = err.message;
	}

}
