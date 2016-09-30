// 7-Refactor Movie class as a Module keeping your previous code for reference.

//Revealing Module Pattern
var Movie = (function () {
	
	var movieTitle ="", 
	attr = new Map();

	var constructor = function(title) {
		movieTitle = title;
	};
	var get = function(key){
		alert(attr.get(key));
		return(attr.get(key));
	};
	var set =  function (key, value){
    	attr.set(key, value);	    	
    };
    var stop = function(){
    	console.log(movieTitle + "Stopped");
	};
	var play = function(){
		console.log("Playing" + movieTitle);
	};

    var showAttributes = function(){
		for (var [key, value] of attr) {
		  console.log(key + " = " + value);
		}
		console.log(movieTitle); 
    };
	
	return {
		constructor:constructor,
		set:set,
		play:play,
		stop:stop,
		get:get,
		showAttributes:showAttributes
	};

} )();

Ironman = Movie;
Ironman.constructor("Ironman");
Ironman.set("Plot", "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.");
Ironman.set("Actor", "Robert Downey Jr as Movie");
Ironman.showAttributes();
Ironman2 = Movie;
Ironman2.constructor("Ironman2");
Ironman2.set("Plot", "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution. ");
Ironman2.set("Actor", "Misis Pot");
Ironman2.showAttributes();