"use strict"

$(document).ready( () => {
	$("#submit_button").click( (evt) => {
		let isValid = true;
		let selectedBook = $("#books_dropdown option:selected").text();
		
		console.log(selectedBook);
	});
});