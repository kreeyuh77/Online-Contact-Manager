let urlBase = 'https://wownice.club/api';
let extension = 'php';

function doSignup()
{

	var firstName = document.getElementById("firstName")[0].value;
	var lastName = document.getElementById("lastName")[0].value;
	var login = document.getElementById("signupUsername")[0].value;
	var password = document.getElementById("signupPassword")[0].value;
	
	var signupResult = document.getElementById("signupResult");

//	var hash = md5( password );
	let xhr = new XMLHttpRequest();
	
	//Need to edit the url based on the php files given to us
	let url = 'RegisterUser.php';
	
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
