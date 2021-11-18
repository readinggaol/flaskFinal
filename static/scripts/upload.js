"use strict"

const zeroErrors = () => {
	$("#title").next().text("*")
}

$(document).ready( () => {
	$("#submit").click( (evt) => {
		let isValid = true;
		let title = $("#title").val();
		let firstName = $("#first").val();
		let lastName = $("#last").val();
		let year = $("#year").val();
		let pages = $("#pages").val();
		let genre = $("#genre").val();

		if(title.length < 1){
			isValid = false;
			$("#title").next().text("You must fill this field.")
		}

		if(!isValid){
			evt.preventDefault();
		}

		$(":text").each( (index) => {
			let thing = $(this).val();
			console.log(thing);
			if(thing.length < 1){
				console.log("test");
				$(thing).next().text("You must fill this field.");
			}
		})
	})
});