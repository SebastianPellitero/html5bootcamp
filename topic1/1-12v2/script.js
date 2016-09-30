function searchMusic(){

    document.getElementById("information").innerHTML = ""; //erase
	var personObj = {};
	personObj.q = document.getElementById("Search").value;
	personObj.type = document.getElementById("typeSearch").value;
	var makeUrl = "https://api.spotify.com/v1/search?"+$.param(personObj);
	releaseSearch(makeUrl);
	};


function releaseSearch(makeUrl){ 
$(document).ready(function(){
$.ajax({
    url : makeUrl,
    type: 'GET',
    dataType: "json", 
    success : handleData
});

	function handleData (data){
	
		$.each(data.albums.items, function(i, v) {

	    	//add a article for each album and a paragraph for each piece of information
	    	var myArticle = document.createElement("article");
	    	var paragraph = document.createElement("p");   
	    	          

	    	//name, type, image, release_date, and a link to spotify for that album
	    	//------------------------------Name
			paragraph.appendChild(document.createTextNode("Album Name: " + v.name));
			myArticle.appendChild(paragraph);   

			//------------------------------Album
			var paragraphType = document.createElement("p"); 
			paragraphType.appendChild(document.createTextNode("Type : " + v.type));
			myArticle.appendChild(paragraphType); 

			//------------------------------Release Date
			var paragraphDate = document.createElement("p"); 
			paragraphDate.setAttribute("id",i+"releaseDate");
			searchReleaseDate(v,i,myArticle);
			myArticle.appendChild(paragraphDate);
			
			//------------------------------Link to the album
			document.getElementById("information").appendChild(myArticle);
			return;
		});

		function searchReleaseDate(v,i,myArticle){
			$.ajax({
			    url : v.href,
			    type: 'GET',
			    dataType: "json", 
			    success : get_date
				});
			function get_date (data){
				var paragraph = document.getElementById(i+"releaseDate");
				paragraph.appendChild(document.createTextNode("Release date: "+ v.release_date));

				var paragraphLink = document.createElement("a");
				paragraphLink.appendChild(document.createTextNode("Link to the music: "));
				paragraphLink.href = v.external_urls.spotify;
				myArticle.appendChild(paragraphLink);

				//------------------------------Image
				var paragraphImg = document.createElement("img");
				paragraphImg.src = v.images[1].url;
				myArticle.appendChild(paragraphImg);

				myArticle.setAttribute( "Class" ,"alignText");
				myArticle.setAttribute("id",v.name);
				return;
			};
		};
		};
	});
};
