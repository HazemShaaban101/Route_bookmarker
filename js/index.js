// retrieve array of objects from localStorage and display the JSON if present
if (localStorage.getItem("bookmarks") != null) {
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	displayBookmarks();
	logJSON();
} else {
	var bookmarks = [];
	console.log(localStorage.getItem("bookmarks"));
	logJSON();
}

// create a bookmark
function createBookmark() {
	// get input from boxes
	var bookmark = {
		name: document.getElementById("website-name").value,
		url: document.getElementById("website-url").value,
	};

	// if input boxes have is-valid class
	if (
		document
			.getElementById("website-name")
			.classList.contains("is-valid") &&
		document.getElementById("website-url").classList.contains("is-valid")
	) {
		// make sure url starts with http:// so that it always does a web request instead of search for local file
		addHTTP(bookmark);

		// save input to array of bookmarks
		bookmarks.push(bookmark);

		// update localStorage
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

		// show latest list of bookmarks
		displayBookmarks();

		// clear input boxes
		clearInputs();

		// log the new JSON
		logJSON();
	}
	// if an input box has is-invalid class, display error message
	else {
		document.getElementById("error-layer").classList.remove("d-none");
	}
}

// function that displays list of bookmarks
function displayBookmarks() {
	// variable to hold the html code as a string
	var bookmarksHTML = "";
	for (var i = 0; i < bookmarks.length; i++) {
		// for each object in the JSON, add the following html code to the bookmarksHTML variable
		bookmarksHTML += `<tr>
        <th scope="row" class="text-center align-middle">${i + 1}</th>
        <td class="text-center align-middle">${bookmarks[i].name}</td>
        <td class="text-center"><a href="${
			bookmarks[i].url
		}" class="btn btn-visit"> <i class="fa-solid fa-eye"></i> Visit</a></td>
        <td class="text-center"><button class="btn btn-danger" onclick="deleteBookmark(${i})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
	}

	// display the list of bookmarks
	document.getElementById("bookmarks").innerHTML = bookmarksHTML;
}

// function that clears input boxes
function clearInputs() {
	document.getElementById("website-name").value = "";
	document.getElementById("website-url").value = "";
	document.getElementById("website-name").classList.remove("is-valid");
	document.getElementById("website-url").classList.remove("is-valid");
}

// function that takes an index and deletes it.
function deleteBookmark(index) {
	// splice the array at the index of deletion, removing one element
	bookmarks.splice(index, 1);

	// update bookmarks JSON in localStorage
	localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	// display the new list of bookmarks
	displayBookmarks();

	// log the new JSON
	logJSON();
}

// used to validate inputs and give the input boxes valid or invalid classes
function validateInput(element) {
	var regex = {
		"website-name": /[a-zA-Z0-9]{3,}/,
		"website-url":
			/^(http(s){0,1}:\/\/){0,1}(www\.){0,1}\w+(\.\w{1,}){0,}\.\w{2,}(\/\w{1,}){0,}$/i,
	};

	if (regex[element.id].test(element.value) === true) {
		element.classList.add("is-valid");
		element.classList.remove("is-invalid");
	} else {
		element.classList.add("is-invalid");
		element.classList.remove("is-valid");
	}
}

//  function that checks if the bookmark url value doesn't start with http:// and if not adds it
function addHTTP(element) {
	if (
		element.url.toLowerCase().startsWith("http://") ||
		element.url.toLowerCase().startsWith("https://")
	) {
		return;
	}

	element.url = "http://" + element.url;
}

// function used to close error message
function closeErrorMessage() {
	document.getElementById("error-layer").classList.add("d-none");
}

// function used to clear the console, and then log the bookmarks JSON
function logJSON() {
	console.clear();
	console.log(bookmarks);
}
