"use strict"

const zeroErrors = () => {
	let inputs = $(":text");
	for(let input of inputs){
		$(input).next().text("*");
	}
}

const takePicture = (width, height, photos) => {
	const context = canvas.getContext("2d");
	if(width && height){
		//use js draw to create image in html canvas
		canvas.width = width;
		canvas.height = height;
		context.drawImage(video, 0, 0, width, height);
		//create the image from the drawing
		const image = canvas.toDataURL("image/jpg");
		const onlyImageString = image.split(",")[1];
		console.log(onlyImageString);
		$("#string").val(onlyImageString);

		const imageTag = document.createElement('img');
		$(imageTag).attr("src", image);
		photos.append(imageTag);
	
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
			//delete any pre-existing images
			let previousImages = $("#photo_container img");
			if(previousImages.length > 0){
				for(let image of previousImages){
					image.remove();
				}
			}

			//set up the video tag's source to be a user-provided stream
			navigator.mediaDevices.getUserMedia({video: true, audio: false})
				.then( (stream) => {
					video.srcObject = stream;
					video.play();
				})
				.catch( (error) => {
					console.log(error)
				})

			// Play when ready
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
		takePicture(width, height, photos);
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

		//Checking for empty fields
		for(let input of inputs){
			console.log(input);
			if($(input).val() == ""){
				$(input).next().text("You must fill this field");
				isValid = false;
			}
		}

		//Checking for no image
		if($("#formFile").get(0).files.length == 0 && $("#photo_container img").length < 1){
			isValid = false;
			alert("You have not selected an image!");
		}

		//Checking for invalid inputs
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


		//Final trigger for turning off submit
		if(!isValid){
			evt.preventDefault();
		}

		
	})
});