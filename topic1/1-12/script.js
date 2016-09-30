//$(document).ready(function(){
	function searchMusic(){

	    document.getElementById("information").innerHTML = ""; //erase
		var personObj = {};
		personObj.q = document.getElementById("Search").value;
		personObj.type = document.getElementById("typeSearch").value;
		var makeUrl = "https://api.spotify.com/v1/search?"+$.param(personObj);
		releaseSearch(makeUrl);
	};
		function releaseSearch(makeUrl){ 

		$.ajax({
		    url : makeUrl,
		    type: 'GET',
		    dataType: "json", 
		    success : handleData
		});

		function handleData (data){
			.
			$.each(data.albums.items, function(i, v) {

		    	//add a article for each album and a paragraph for each piece of information
		    	var myArticle = document.createElement("article");
		    	var paragraph = document.createElement("p");   
		    	          

		    	//name, type, image, release_date, and a link to spotify for that album
		    	//------------------------------Name
				paragraphName.appendChild(document.createTextNode("Album Name: " + v.name));
				myArticle.appendChild(paragraphName);   

				//------------------------------Album
				var paragraphType = document.createElement("P"); 
				paragraphType.appendChild(document.createTextNode("Type : " + v.type));
				myArticle.appendChild(paragraphType); 

				//------------------------------Release Date
				var paragraphDate = document.createElement("p"); 
				paragraphDate.setAttribute("id", i +"releaseDate");
				searchReleaseDate(v.href,i);
				myArticle.appendChild(paragraphDate);

				//------------------------------Link to the album
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
				document.getElementById("information").appendChild(myArticle);
		        return;
		});

		function searchReleaseDate(link,i){
			$.ajax({
			    url : link,
			    type: 'GET',
			    dataType: "json", 
			    success : getDate
			});
			function getDate (data){
				var paragraphDate = document.getElementById(i+"releaseDate");
				paragraphDate.appendChild(document.createTextNode("Release date: "+ data.release_date));
			};
		};

	};
	};
//}