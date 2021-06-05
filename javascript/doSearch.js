function doSearch()
{
	alert("we called do search!");
  var jsonPayload = '';
  var isearch = "";
	document.getElementById("searchResult").innerHTML = "";

	// get search attritbute
	var searchText = document.getElementById('search');

	// the list will be put here
	var contactList = "";

	//  payload depending on searchBy
	switch (document.getElementById('searchType')){
  case "firstName":
    isearch = "FirstName";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "FirstName" : "' + searchText +'"}';
    break;
  case "lastName":
    isearch = "LastName";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "LastName" : "' + searchText +'"}';
    break;
  case "address":
    isearch = "StreetAddress";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "StreetAddress" : "' + searchText +'"}';
    break;
  case "city":
    isearch = "City";		
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "City" : "' + searchText +'"}';
    break;
  case "state":
    isearch = "State";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "State" : "' + searchText +'"}';
    break;
  case "zipcode":
    isearch = "ZipCode";		
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "ZipCode" : "' + searchText +'"}';
    break;
  case  "phonenumber":
    isearch = "PhoneNumber";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "PhoneNumber" : "' + searchText +'"}';
  case  "email":
    isearch = "Email";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + ID + '", "Email" : "' + searchText +'"}';
}

	//Need to edit the url based on the php files given to us
	var url = '../api/SearchContact.php'

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	xhr.send(jsonPayload);
	var jsonObject = JSON.parse( xhr.responseText );
	document.getElementsById('searchList').innerHTML = jsonObject.FirstName;
	
// 	try
// 	{
		
// 		xhr.onreadystatechange = function()
// 		{
// 			if (this.readyState == 4 && this.status == 200)
// 			{
// 				alert("we sent to php");
// 				document.getElementById("searchResult").innerHTML = "Contact(s) has been retrieved";
// 				var jsonObject = JSON.parse( xhr.responseText );

// // 				for( var i=0; i<jsonObject.results.length; i++ )
// // 				{
// // 					contactList += jsonObject.results[i];
// // 					if( i < jsonObject.results.length - 1 )
// // 					{
// // 						contactList += "<br />\r\n";
// // 					}
// // 				}

// 				document.getElementsById('searchList').innerHTML = jsonObject.FirstName;
// 			}
// 		};
// 	}
// 	catch(err)
// 	{
// 		document.getElementById("searchResult").innerHTML = err.message;
// 	}

}
