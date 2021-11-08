"use strict"

const zeroErrors = () => {
	$("#username").prev().children().first().text("*");
	$("#password").prev().children().first().text("*");
}


$(document).ready( () => {
	$("#login_button").click( () => {
		let isValid = true;
		let userName = $("#username").val();
		let userPassword = $("#password").val();
		zeroErrors();
		if(userName == ""){
			$("#username").prev().children().first().text("You must fill this field.");
			isValid = false;
		}
		if(userPassword == ""){
			$("#password").prev().children().first().text("You must fill this field.");
			isValid = false;
		}
	});
});