$(document).ready(function(){
	// 5- When the page has finished loading the section must fade in.
	$("#quotes").hide();

	$("#quotes").fadeIn(3000);

    $("#hidden").hide();

// 6-Add a textbox with the class "alias", and put the cursor inside it right after the section fades in.
});

setTimeout(waitforfade,3000);

function waitforfade(){
	$(".alias").focus();
};

$.ajax({
    url : 'http://api.icndb.com/jokes/random',
    type: 'GET',
    dataType: "json", 
    success : handleData
});

function handleData (data){
	// 7-Attach an event to the created button which calls a function that gets a response from http://api.icndb.com/jokes/random
	$( "#getJoke" ).click(function() {
 		alert(data.value.joke);
	});

	// 8-Write the response to the section element.	
	$( "#joke" ).append("joke: " + data.value.joke );

	// 9-Show section content in red when a server error occurs.
	if ((data.type) != "success"){
		$( ".quotes" ).addClass("error");
	}

	// 10-Take some free air and then create a function to highlight your name in the server response content. Call it right after setting the response inside the div.
	var jokeStr = ("joke: " + data.value.joke);
	highlight = jokeStr.replace(/Chuck Norris/gi,"<mark>Chuck Norris</mark>");
	document.getElementById("joke").innerHTML = highlight;
};

