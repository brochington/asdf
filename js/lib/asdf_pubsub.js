console.log("asdf_pubsub");

(function (window, undefined, ns ){
	var ns = {},
		topics = {},
		uid = 0,
		asdf = window.asdf;


	ns.addToTopics = function(name, callback){

		topics[name] = [];

		if(callback) { callback(); };
	}

	ns.publish = function(name, passedThis, passedVal){
		var subscribers = topics[name];
		var subLength = subscribers.length;

		for(var i = 0; i < subLength; i++){
			subscribers[i].func(subscribers[i].name, passedThis, passedVal);
		}
	}

	ns.subscribe = function(val, name, func){
		var token = ++uid;

		topics[val.metaID].push({
			token : token,
			func : func,
			name : name
		});

		return token;
	}

	ns.unsubscribe = function(){
		
	}

	ns.updateSubscribers = function(name, passedThis, passedValue){

		passedThis.internal[name].metaValue = passedValue;
	}

	ns.getTopics = function(){

		return topics;
	}

	asdf.pubsub = ns;
})(window);