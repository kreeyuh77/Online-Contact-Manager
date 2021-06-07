function doSearch()
{
	var jsonPayload = '';
	var isearch = "";
	// get search attritbute
	var searchText = document.getElementById('search');
	
	// the list will be put here
	var contactList = "";
	var url = '../api/SearchContact.php';
	
	document.getElementById('searchResult').innerHTML = "";

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	//  payload depending on searchBy
	
	var e = document.getElementById("searchType");
	var searchAtt = e.options[e.selectedIndex].text;
	console.log("This is the attribute to search by: " + searchAtt);
	switch (searchAtt)
{
  case "First Name":
    isearch = "FirstName";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "FirstName" : "' + searchText + '"}';
    break;
  case " Last Name":
    isearch = "LastName";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "LastName" : "' + searchText + '"}';
    break;
  case "Address":
    isearch = "StreetAddress";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "StreetAddress" : "' + searchText + '"}';
    break;
  case "City":
    isearch = "City";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "City" : "' + searchText + '"}';
    break;
  case "State":
    isearch = "State";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "State" : "' + searchText + '"}';
    break;
  case "Zip Code":
    isearch = "ZipCode";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "ZipCode" : "' + searchText + '"}';
    break;
  case  "Phone Number":
    isearch = "PhoneNumber";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "PhoneNumber" : "' + searchText + '"}';
    break;
  case  "Email":
    isearch = "Email";
    jsonPayload =  '{"search" : "' + isearch + '", "ID" : "' + userId  + '", "Email" : "' + searchText + '"}';
    break;
}
   try
   {
	  	console.log("This is the payload: " + jsonPayload);
		xhr.send(jsonPayload);
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var jsonObject = JSON.parse(xhr.responseText);
				 document.getElementById("searchResult").innerHTML = jsonPayload;
			}
		}

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
          array[i] = new Array(9);
        }

        for (var i = 0; i < jsonObject.results.length; i++)
        {
          for (var j = 0; j < 8; j++)
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
              array[i][j] = jsonObject.results[i].ZipCode;
            }
            if (j == 6)
            {
              array[i][j] = jsonObject.results[i].PhoneNumber;
            }
	    if (j == 7)
            {
              array[i][j] = jsonObject.results[i].Email;
            }
	    if (j == 8)
	    {
            array[i][j] = jsonObject.results[i].ContactID;
	    }
          }
        }
        createTable(array);		
   }	
   catch(err)
   {
	document.getElementById("searchResult").innerHTML = err.message;
   }
}


function createTable(array)
{
    var table = document.createElement('table');
    // string to create table in html
    var table = "<table><tr>";
    table += "<th>" + "First Name" + "</th>";
    table += "<th>" + "Last Name" + "</th>";
		table += "<th>" + "Street Adress" + "</th>";
		table += "<th>" + "City" + "</th>";
		table += "<th>" + "State" + "</th>";
		table += "<th>" + "Zip Code" + "</th>";
		table += "<th>" + "Phone Number" + "</th>";
    table += "<th>" + "Email" + "</th>";

    for (var i = 0; i < array.length; i++)
    {
      table+="<tr>";
      for (var j = 0; j < 8; j++)
      {
          table+= "<td>" + array[i][j] + "</td>";
      }
      table +="<td><input type='image' src='media/pencil.png' height='35px' class='editform' id='pencil' onclick='editContact(" + array[i][8] + ")';><input type='image' src='media/delete.png' height='35px' class='editform' id='trash' onclick='deleteContact(" + array[i][8] + ")';></td>";
		
      table+="</tr>";

    }

    table+="</table>";
    document.getElementById("searchList").innerHTML = table;
}
