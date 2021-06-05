function doEditContact()
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
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "FirstName" : "' + searchText + '"}';
    break;
  case "lastName":
    isearch = "LastName";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "LastName" : "' + searchText + '"}';
    break;
  case "address":
    isearch = "StreetAddress";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "StreetAddress" : "' + searchText + '"}';
    break;
  case "city":
    isearch = "City";		
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "City" : "' + searchText + '"}';
    break;
  case "state":
    isearch = "State";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "State" : "' + searchText + '"}';
    break;
  case "zipcode":
    isearch = "ZipCode";		
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "ZipCode" : "' + searchText + '"}';
    break;
  case  "phonenumber":
    isearch = "PhoneNumber";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "PhoneNumber" : "' + searchText + '"}';
  case  "email":
    isearch = "Email";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "Email" : "' + searchText + '"}';
}

	//Need to edit the url based on the php files given to us
	var url = '../api/SearchContact.php'

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	xhr.send(jsonPayload);
	
	// 5. DECLARE FUNCTIONS BASED ON EVENTS
	xhr.onload = (jsonPayload) => {
  	const data = xhr.response;
   	console.log(data);
	};

	xhr.onprogress = (event) => {
    	console.log(`Loaded ${event.loaded} of ${event.total}`);
	};

	xhr.onerror = () => {
    	console.log("Request failed!");
	};

	
	
	var jsonObject = JSON.parse( xhr.responseText );
    document.getElementById('searchList').innerHTML = jsonObject.FirstName;
  
  
  
  url = '../api/EditContact.php'

  //table functionality
  
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	xhr.send(jsonPayload);
	var jsonObject = JSON.parse( xhr.responseText );
    document.getElementById('searchList').innerHTML = jsonObject.FirstName;
}
