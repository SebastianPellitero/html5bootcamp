$.ajax({
    url : 'https://api.spotify.com/v1/search?q=Rolling+Stones&type=album',
    type: 'GET',
    dataType: "json", 
    success : handleData
});

function handleData (data){
	
	$.each(data.albums.items, function(i, v) {

    	//add a article for each album and a paragraph for each piece of information
    	var myArticle = document.createElement("ARTICLE");
    	var paragraph = document.createElement("P");   
    	          

    	//name, type, image, release_date, and a link to spotify for that album
    	//------------------------------Name
		paragraph.appendChild(document.createTextNode("Album Name: " + v.name));
		myArticle.appendChild(paragraph);   

		//------------------------------Album
		var paragraph = document.createElement("P"); 
		paragraph.appendChild(document.createTextNode("Type : " + v.type));
		myArticle.appendChild(paragraph); 

		//------------------------------Release Date
		var paragraph = document.createElement("P"); 
		paragraph.setAttribute("ID", i +"releaseDate");
		searchReleaseDate(v.href,i);
		myArticle.appendChild(paragraph);

		//------------------------------Link to the album
		var paragraph = document.createElement("a");
		paragraph.appendChild(document.createTextNode("Link to the music: "));
		paragraph.href = v.external_urls.spotify;
		myArticle.appendChild(paragraph);

		//------------------------------Image
		var paragraph = document.createElement("img");
		paragraph.src = v.images[1].url;
		myArticle.appendChild(paragraph);


		myArticle.setAttribute( "Class" ,"alignText");
		myArticle.setAttribute("ID",v.name);
		document.getElementById("information").appendChild(myArticle);
        return;
	});

	function searchReleaseDate(link,i){
		$.ajax({
		    url : link,
		    type: 'GET',
		    dataType: "json", 
		    success : handleData
			});
		function handleData (data){
			var paragraph = document.getElementById(i+"releaseDate");
			paragraph.appendChild(document.createTextNode("Release date: "+ data.release_date));
		};
	};
};
