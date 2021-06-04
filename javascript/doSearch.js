
function doSearch()
{
  var jsonPayload = '';
	document.getElementById("searchResult").innerHTML = "";

	// get search attritbute
	var searchText = document.getElementById('search');

	// the list will be put here
	var contactList = "";

	//  payload depending on searchBy
	switch (document.getElementById('searchType');) {
  case "firstName":
    jsonPayload =  '{"ID" : "' + ID + '", "FirstName" : "' + searchText +'"}';
    break;
  case "lastName":
    jsonPayload =  '{"ID" : "' + ID + '", "LastName" : "' + searchText +'"}';
    break;
  case "address":
    jsonPayload =  '{"ID" : "' + ID + '", "StreetAddress" : "' + searchText +'"}';
    break;
  case "city":
    jsonPayload =  '{"ID" : "' + ID + '", "City" : "' + searchText +'"}';
    break;
  case "state":
    jsonPayload =  '{"ID" : "' + ID + '", "State" : "' + searchText +'"}';
    break;
  case "zipcode":
    jsonPayload =  '{"ID" : "' + ID + '", "ZipCode" : "' + searchText +'"}';
    break;
  case  "phonenumber":
    jsonPayload =  '{"ID" : "' + ID + '", "PhoneNumber" : "' + searchText +'"}';
	case  "email":
		jsonPayload =  '{"ID" : "' + ID + '", "Email" : "' + searchText +'"}';
}

	//Need to edit the url based on the php files given to us
	var url = '../api/SearchContact.php'

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("searchResult").innerHTML = "Contact(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				for( var i=0; i<jsonObject.results.length; i++ )
				{
					contactList += jsonObject.results[i];
					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}

				document.getElementsById('searchList')[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}

}
