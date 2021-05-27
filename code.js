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

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
//	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";

//	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var url = urlBase + '/LoginApi.' + extension;

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
		
				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
		
				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				saveCookie();
	
				window.location.href = "main.html";
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

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

function doDelete()
{
	document.getElementById("deleteResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "address" : "' + address + '", "city" : "' + city + '", "state" : "' + state + '", "zipCode" : "' + zipCode + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';

	//Need to edit the url based on the php files given to us
	var url = urlBase + '/RemoveContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", url, true);
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
					document.getElementById("deleteResult").innerHTML = "User was not found. Unable to delete.";
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
		document.getElementById("deleteResult").innerHTML = err.message;
	}
}

function doDeleteSearch()
{
	document.getElementById("deleteResult").innerHTML = "";
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
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		url = urlBase + '/RemoveContact.' + extension;
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

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
				var jsonObject = JSON.parse( xhr.responseText );
				userId = jsonObject.id;
		
/* 				if( userId < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "Unable to add user";
					return;
				} */
		
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
		document.getElementById("addResult").innerHTML = err.message;
	}
}

function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userId + ";expires=" + date.toGMTString();
}



function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}
	
	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

function addColor()
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";
	
	var jsonPayload = '{"color" : "' + newColor + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddColor.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}
	
}

function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";
	
	var colorList = "";
	
	var jsonPayload = '{"search" : "' + srch + '","userId" : ' + userId + '}';
	var url = urlBase + '/SearchColors.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );
				
				for( var i=0; i<jsonObject.results.length; i++ )
				{
					colorList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						colorList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = colorList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}
	
}
