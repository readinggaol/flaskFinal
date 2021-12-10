"use strict"

//variables for connecting to the OpenLibrary API and whateverOrigin proxy
const searchURL = "https://openlibrary.org/search.json?title=";
const worksURL = "https://openlibrary.org/works/";
const whateverOriginBeginning = "http://www.whateverorigin.org/get?url="
const whateverOriginEnding = "&callback=?";
const corsAnywhere = "https://cors-anywhere.herokuapp.com/";
const HTMLDriven = "https://cors-proxy.htmldriven.com/?url=";

const getBookJSON = async title => {
	//create the search URL in order to get the work ID -- finalURL represents the CORS solution
	let titleString = title.split(" ");
	titleString = titleString.join("+");
	let url = searchURL + titleString;
	let finalURL = whateverOriginBeginning + encodeURIComponent(url) + whateverOriginEnding;
	console.log(finalURL);

	//retrive the work ID
	let response = await $.getJSON(url);
	let data = await response.json();
	let workString = data.docs[0].key;
	console.log(workString);
	
}

$(document).ready( () => {
	$("#submit_button").click( (evt) => {
		let isValid = true;
		let selectedBook = $("#books_dropdown option:selected").text();
		
		console.log(selectedBook);
	});

	$("#books_dropdown").change( () => {
		$("#book_info").html("");
		let html = "<p>";
		let testString = $("#books_dropdown").val();
		html += `${testString}</p>`;
		$("#book_info").html(html);
		getBookJSON(testString);
	});
});