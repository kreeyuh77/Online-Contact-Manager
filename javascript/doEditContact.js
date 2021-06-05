function doEditContact()
{
	alert("editing");
	var jsonPayload = '';
	var iedit = "";
	document.getElementById("editResult").innerHTML = "";

	// create edit query
	var editText = document.getElementById('search');
	
	 
//  editType dicates what you want to edit
	switch (document.getElementById('editType')){
  case "firstName":
    iedit = "FirstName";
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "FirstName" : "' + editText + '"}';
    break;
  case "lastName":
    iedit = "LastName";
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "LastName" : "' + editText + '"}';
    break;
  case "address":
    iedit = "StreetAddress";
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "StreetAddress" : "' + editText + '"}';
    break;
  case "city":
    iedit = "City";		
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "City" : "' + editText + '"}';
    break;
  case "state":
    iedit = "State";
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "State" : "' + editText + '"}';
    break;
  case "zipcode":
    iedit = "ZipCode";		
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ZipCode" : "' + editText + '"}';
    break;
  case  "phonenumber":
    iedit = "PhoneNumber";
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "PhoneNumber" : "' + editText + '"}';
  case  "email":
    iedit = "Email";
    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "Email" : "' + editText + '"}';
}
  
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	
	xhr.send(jsonPayload);
}
