var array = '';
function doSearch()
{
	var jsonPayload = '';
	var isearch = "";
	// get search attritbute
	var searchText = document.getElementById('search').value;

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
  case "Last Name":
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
				console.log("This is the result: " + JSON.stringify(jsonObject));

	if (jsonObject.error == "")
        {
          document.getElementById("searchResult").innerHTML = "Contact(s) have been retrieved";
        }
        else
        {
          document.getElementById("searchResult").innerHTML = jsonObject.error;
	  document.getElementById("searchList").innerHTML = "";
	  return;
        }

       array = new Array(jsonObject.results.length);

       // array = localArray;

        for (var i = 0; i < array.length; i++)
        {
          array[i] = new Array(9);
        }

        for (var i = 0; i < jsonObject.results.length; i++)
        {
          for (var j = 0; j < 9; j++)
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
		}	;
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
		table += "<th>" + "Street Address" + "</th>";
		table += "<th>" + "City" + "</th>";
		table += "<th>" + "State" + "</th>";
		table += "<th>" + "Zip Code" + "</th>";
		table += "<th>" + "Phone Number" + "</th>";
    table += "<th>" + "Email" + "</th>";
	 table += "<th>" + "" + "</th>";

    for (var i = 0; i < array.length; i++)
    {
      table+="<tr>";
      for (var j = 0; j < 8; j++)
      {
          table+= "<td>" + array[i][j] + "</td>";
      }
       	table +="<td style='word-wrap:break-word;'><span id='editContactButton' style='width:auto;height:30px;padding:10px' onclick='doEdit(" + i + ")';><i class='fas fa-edit'></i></span><span id='deleteContactButton' style='width:auto;height:30px;padding:10px' onclick='doDelete(" + i + ")';><i class='fas fa-trash-alt'></i></span></td>";
      table+="</tr>";

    }

    table+="</table>";
    document.getElementById("searchList").innerHTML = table;
}


function doDelete(i)
{
	var contactID = array[i][8];
	var fname = array[i][0];
	var lname = array[i][1];
	document.getElementById('deleteContact').style.display='block';
	document.getElementById("deleteResult").innerHTML = "";
	document.getElementById("deleteName").innerHTML = "Are you sure you want to remove " + fname + " " + lname + " from your contact book?";

	document.getElementById("deleteButton").addEventListener("click", function() {
		var jsonPayload = '{"ContactID" : "' + contactID + '"}';

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
				document.getElementById("deleteResult").innerHTML = fname + " " + lname + " has been deleted!";

			}
		}
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("deleteResult").innerHTML = err.message;
	}
	});


}




function doEdit(i){
	var contactID = array[i][8];
	var fname = array[i][0];
	var lname = array[i][1];
	document.getElementById('editContact').style.display='block';
	document.getElementById("editResult").innerHTML = "";
	document.getElementById("editName").innerHTML = "Currently editing " + fname + " " + lname;

	document.getElementById("editButton").addEventListener("click", function() {
		var jsonPayload = '';
		var iedit = "";
		var newinfo = document.getElementById('newinfo').value;
		var url = '../api/EditContact.php';

		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

		var d = document.getElementById("editType");
		var editAtt = d.options[d.selectedIndex].text;
		console.log("This is the attribute to search by: " + editAtt);

			switch (editAtt)
	{
	  case "First Name":
	    iedit = "FirstName";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "FirstName" : "' + newinfo + '"}';
	    break;
	  case "Last Name":
	    iedit = "LastName";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "LastName" : "' + newinfo + '"}';
	    break;
	  case "Address":
	    iedit = "StreetAddress";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "StreetAddress" : "' + newinfo + '"}';
	    break;
	  case "City":
	    iedit = "City";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "City" : "' + newinfo + '"}';
	    break;
	  case "State":
	    iedit = "State";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "State" : "' + newinfo + '"}';
	    break;
	  case "Zip Code":
	    iedit = "ZipCode";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "ZipCode" : "' + newinfo + '"}';
	    break;
	  case  "Phone Number":
	    iedit = "PhoneNumber";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "PhoneNumber" : "' + newinfo + '"}';
	    break;
	  case  "Email":
	    iedit = "Email";
	    jsonPayload =  '{"edit" : "' + iedit + '", "ID" : "' + userId  + '", "ContactID" : "' + contactID  + '", "Email" : "' + newinfo + '"}';
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
					console.log("This is the result: " + JSON.stringify(jsonObject));

		if (jsonObject.error == "")
	        {
	          document.getElementById("editResult").innerHTML =  fname + " " + lname + " was succesfully edited!";
	        }
	        else
	        {
	          document.getElementById("editResult").innerHTML = jsonObject.error;
		  		return;
	        }
				}
			}

		}
		catch(err)
		{
			document.getElementById("editResult").innerHTML = err.message;
		}

});
}

// this is the new placeholder depending on dropdown
	function changePlaceholder(i){
	var e = document.getElementById("editType");
	var editAtt = e.options[e.selectedIndex].text;
	switch (editAtt)
{
  case "First Name":
    document.getElementById("newinfo").placeholder = "Enter New First Name";
		break;
  case "Last Name":
    document.getElementById("newinfo").placeholder = "Enter New Last Name";
		break;
  case "Address":
    document.getElementById("newinfo").placeholder = "Enter New Address";
		break;
  case "City":
    document.getElementById("newinfo").placeholder = "Enter New City";
		break;
  case "State":
    document.getElementById("newinfo").placeholder = "Enter New State";
		break;
  case "Zip Code":
    document.getElementById("newinfo").placeholder = "Enter New Zip Code";
		break;
  case  "Phone Number":
    document.getElementById("newinfo").placeholder = "Enter New Phone Number";
		break;
  case  "Email":
    document.getElementById("newinfo").placeholder = "Enter New Email";
		break;
}
	}
