function doSearch()
{
	var jsonPayload = '';
	var isearch = "";
	// get search attritbute
	var searchText = document.getElementById('search');
	// the list will be put here
	var contactList = "";
	var url = ../api/SearchContact.php;


	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
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


	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);

        var localArray = new Array(jsonObject.results.length);

        array = localArray;

        if (jsonObject.error == "")
        {
          document.getElementById("searchResult").innerHTML = "Account(s) have been retrieved";
        }
        else
        {
          document.getElementById("searchResult").innerHTML = jsonObject.error;
        }


        for (var i = 0; i < array.length; i++)
        {
          array[i] = new Array(7);
        }

        for (var i = 0; i < jsonObject.results.length; i++)
        {
          for (var j = 0; j < 7; j++)
          {
            if (j == 0)
            {
              array[i][j] = jsonObject.results[i].FirstName;
            }
            if (j == 1)
            {
              array[i][j] = jsonObject.results[i].LastName;
            }
            if (j == 2)
            {
              array[i][j] = jsonObject.results[i].StreetAddress;
            }
            if (j == 3)
            {
              array[i][j] = jsonObject.results[i].City;
            }
            if (j == 4)
            {
              array[i][j] = jsonObject.results[i].State;
            }
            if (j == 5)
            {
              array[i][j] = jsonObject.results[i].PhoneNumber;
            }
						if (j == 6)
            {
              array[i][j] = jsonObject.results[i].Email;
            }
          }
        }

        createTable(array);

			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}
}

function createTable(array){
	for (var i = 0; i <array.length; i++)
	{
		for (var j = 0; j < 7; j++)
		{
			if(j<6){
				document.getElementById('searchList').innerHTML += array[i][j] + ", ";
			}
			else {
				document.getElementById('searchList').innerHTML += "<br>";
			}

		}
	}
}
