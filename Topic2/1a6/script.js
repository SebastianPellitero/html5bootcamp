/* 1-Create a Movie object:
	Movie
	-attributes : hashmap
	+ play()
	+ stop()
	+ set(attr:string, value)
	+ get(attr:string)


 2-Instantiate some of your favorite movies and play with them in the console.
 3-Add a MovieObserver class that listens for "playing" and “stopped” events.
 4-Publish "playing" event on Movie.play(). You should be able to do something like this in the console:

var terminator = new Movie();
terminator.set('title', 'Terminator');
// ...
terminator.play(); // output: Playing Terminator...

 5-Publish "stopped" event on Movie.stop().

 6-Log to console when each event is fired.
*/

//Object Constructor
function ObserverList(){
 		this.observerList = [];
}

//Object function definition
ObserverList.prototype = {
	add : function(obj){
	  return this.observerList.push(obj);
	},
	count : function(){
	  return this.observerList.length;
	},
	get : function(i){
	  if(i > -1 && i < this.observerList.length){
	    return this.observerList[i];
		}
	},
	indexOf : function(obj,startIndex){
		var i = startIndex;
		while(i < this.observerList.length){
	    	if(this.observerList[i] === obj){
	     		return i;
	   		}
	    	i++;
		}
		return -1;
	}
}

// The Observer
function Observer(){
	this.update = function(message){
		console.log(message);
	};
}
	
function Movie (movietitle) {
    this.title = movietitle; 
    this.attr = new Map();
    //Observer
    this.observers = new ObserverList();
}

Movie.prototype = {
    constructor: Movie,
    set : function (key, value){
    	this.attr.set(key, value);	    	
    },
	subscribeObserver : function(observer) {
		this.observers.add(observer);
	},
	unsubscribeObserver : function(observer) {
		var index = this.observers.indexOf(observer);
		if(index > -1) {
			this.observers.splice(index, 1);
		}
	},
	notify : function(message){
		var observerCount = this.observers.count();
		for(var i = 0; i < observerCount; i++){
			this.observers.get(i).update(message);
		}
	},
    stop : function(){
    	var message = this.title + " Stopped";
		this.notify(message);
	},
	play : function(){
		var message = "Playing " + this.title;
		this.notify(message);
	},
	get : function(key){
		alert(this.attr.get(key));
		return(this.attr.get(key));
	},
    showAttributes : function(){
		for (var [key, value] of this.attr) {
		  console.log(key + " = " + value);
		}
		console.log(this.title);
    }
};

ironman = new Movie("Iron Man"); 
ironman.set("Plot", "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.");
ironman.set("Actor", "Robert Downey Jr as Ironman");
ironman.showAttributes();

var observer1 = new Observer();
var observer2 = new Observer();
var observer3 = new Observer();
ironman.subscribeObserver(observer1);
ironman.subscribeObserver(observer2);
ironman.subscribeObserver(observer3);
ironman.play();
ironman.stop();

