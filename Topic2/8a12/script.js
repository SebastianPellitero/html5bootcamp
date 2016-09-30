//Prototype Design Pattern
// 7-Refactor Movie class as a Module keeping your previous code for reference.
function Movie() {

	this.attr = new Map(),
	this.actors = [];
};

Movie.prototype = {
	set :  function (key, value){
    	this.attr.set(key, value);	    	
    },
	get : function(key){
		return(this.attr.get(key));
	},
    stop : function(){
    	console.log(this.get("title") + " Stopped");
	},
	play : function(){
		console.log("Playing " + this.get("title"));
	},
    showAttributes : function(){
		for (var [key, value] of this.attr) {
		  console.log(key + " = " + value);
		}
    },
    // 12- Show how you would add an array of actors to a Movie object.
    setActors : function(actors) {
	    for(i=0 ; i < actors.length ; i++){  
	    	this.actors.push(actors[i]);
	    	console.log(actors[i]);
	    }
	},
	addActor : function(actor){
 		this.actors.push(actor);
	},
	showActors: function(){
    	var list="Actors: ";
    	for(var i=0 ; i < this.actors.length ; i++){
        	list += this.actors[i] + ", " ;
      	}
    	console.log(list);
    }
};

// Inherit Function
function inheritPrototype(childObject, parentObject) {
	    var copyOfParent = Object.create(parentObject.prototype);
	    copyOfParent.constructor = childObject;
	   	childObject.prototype = copyOfParent;
};	

//------------------------------------------o---------------------------------------

// Mixin Function
var augment = function (receivingClass, givingClass) {
	for ( var methodName in givingClass.prototype ) {
		if ( !Object.hasOwnProperty.call(receivingClass.prototype, methodName) ) {
		    receivingClass.prototype[methodName] = givingClass.prototype[methodName];
		}
	}
}

//------------------------------------------o---------------------------------------
// 8- Create a DownloadableMovie that extends from Movie adding a download method. Here you will have to set the correct prototype to DownloadableMovie.
function DownloadableMovie() {
  	Movie.call(this);
};

// Call the function Inherit
inheritPrototype(DownloadableMovie, Movie);

DownloadableMovie.prototype.download = function(){
    console.log(this.get("title") + " is downloading ");
};

//------------------------------------------o---------------------------------------
// 9- Create a mixin object called Social with the methods: share(friendName) and like().
function Social() {}

Social.prototype = {
	share: function (friendName) {
		console.log("Sharing " + this.get("title") + " with " + friendName);
	  	},
	like: function () {
		console.log(this.get("title") + ' +1');
	}
};

// Call the function mixin
augment(Movie, Social);

//------------------------------------------o---------------------------------------
// 11- Create an Actor class and create some actors from one of your favorite movies.
function Actors() {
	this.actorsArray = [];
};

Actors.prototype = {
    addActor : function(actor){
	    this.actorsArray.push(actor);
	},
    showActors : function(){
    	var list = "Actors: ";
    	for(var i = 0 ; i < this.actorsArray.length ; i++){
        	list += this.actorsArray[i] + ", " ;
      	}
    	console.log(list);
    },
    exportActors : function(){
    	return(this.actorsArray);
    }
};

//------------------------------------------o---------------------------------------

var Ironman = new Movie();
Ironman.set("title","Ironman")
Ironman.set("Plot", "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.");
Ironman.set("Actor", "Robert Downey Jr as Movie");
Ironman.play();
Ironman.stop();
Ironman.showAttributes();

var Pirate = new DownloadableMovie();
Pirate.set("title","Pirate of the caribbean");
Pirate.set("Plot", "Blacksmith Will Turner teams up with eccentric pirate -Captain- Jack Sparrow to save his love, the governor's daughter, from Jack's former pirate allies, who are now undead. ");
Pirate.showAttributes();
Pirate.download();

//10- Apply the mixin to Movie object and play with the console output. You should be able to do something like this in the console:
var Ironman2 = new Movie();
Ironman2.set("title","Iron Man 2");
Ironman2.share("V. Rivas")
Ironman2.like();

var FullCast = new Actors();
FullCast.addActor("Jeff Bridges");
FullCast.addActor("Gwyneth Paltrow");
FullCast.addActor("Leslie Bibb");
FullCast.showActors();
Ironman.setActors(FullCast.exportActors());
Ironman.showActors();

