"use strict"

const zeroErrors = () => {
	let inputs = $(":text");
	for(let input of inputs){
		$(input).next().text("*");
	}
}

const takePicture = (width, height) => {
	const context = canvas.getContext("2d");
	if(width && height){
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);

	}
}

$(document).ready( () => {
	//GLOBAL VARIABLES
	let width = 500;
	let height = 0;
	let streaming = false;

	const video = document.getElementById("video");
	const canvas = document.getElementById("canvas");
	const photos = $("#photo_container");
	const photoButton = $("#video_button");

	//TURN CAMERA ON/OFF DEPENDING ON CHECKBOX
	$("#flexCheckDefault").change( (evt) => {
		if($("#flexCheckDefault").is(":checked")){
			//reset the file input
			$("#photo_button").attr("disabled", false);
			$("#formFile").attr("disabled", true);
			$("#formFile").val("");
			navigator.mediaDevices.getUserMedia({video: true, audio: false})
				.then( (stream) => {
					//link to video source
					video.srcObject = stream;
					//play the video
					video.play();
				})
				.catch( (error) => {
					console.log(error)
				})

				// // Play when ready
				video.addEventListener('canplay', function(e) {
				if(!streaming) {
					// Set video / canvas height --> use formula for aspect ratio
					height = video.videoHeight / (video.videoWidth / width);

					$(video).attr('width', width);
					$(video).attr('height', height);
					$(canvas).attr('width', width);
					$(canvas).attr('height', height);

					streaming = true;
					}
				}, false);
		}else{
			$("#formFile").attr("disabled", false);
			$("#photo_button").attr("disabled", true);
			//trying to properly turn the camera off (not quite working yet)
			$("#video").attr("src", "");
			video.srcObject = null;
		}	
	});

	$("#photo_button").click( (evt) => {
		console.log("test");
		takePicture(width, height);
		evt.preventDefault();
	});

	
	
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