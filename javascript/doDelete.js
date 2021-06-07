function doDelete(ContactID)
{
	document.getElementById("deleteResult").innerHTML = "";

	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "address" : "' + address + '", "city" : "' + city + '", "state" : "' + state + '", "zipCode" : "' + zipCode + '", "phoneNumber" : "' + phoneNumber + '", "email" : "' + email + '"}';

	//Need to edit the url based on the php files given to us
	var url = '../api/RemoveContact.php';

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
