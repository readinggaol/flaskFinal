"use strict"

const zeroErrors = () => {
	let inputs = $(":text");
	for(let input of inputs){
		$(input).next().text("*");
	}
}

$(document).ready( () => {
	$("#submit").click( (evt) => {
		zeroErrors();
		//Variables
		let isValid = true;
		let title = $("#title").val();
		let firstName = $("#first").val();
		let lastName = $("#last").val();
		let year = $("#year").val();
		let pages = $("#pages").val();
		let genre = $("#genre").val();
		let inputs = $(":text");
		let currentYear = new Date().getFullYear();

		//Checking for errors/bad input
		for(let input of inputs){
			if($(input).val() == ""){
				$(input).next().text("You must fill this field");
				isValid = false;
			}
		}

		if(isNaN(year)){
			$("#year").next().text("This value must be an integer between 1440 and " + currentYear);
			isValid = false;
		}else if(year < 1440 || year > currentYear || !Number.isInteger(parseFloat(year))){
			//1440 is chosen as the approximate date of the Gutenberg press invention
			$("#year").next().text("This value must be an integer between 1440 and " + currentYear);
			isValid = false;
		}

		if(isNaN(pages)){
			$("#pages").next().text("This value must be an integer greater than zero.");
			isValid = false;
		}else if(pages < 1 || pages > 5000 || !Number.isInteger(parseFloat(pages))){
			//Number of pages is restricted in case of unforeseen but anticipated errors
			$("#pages").next().text("This value must be an integer greater than zero.");
			isValid = false;
		}

		if(!isValid){
			evt.preventDefault();
		}

		
	})
});