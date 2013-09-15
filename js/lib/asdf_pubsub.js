console.log("asdf_pubsub");

(function (window, undefined, ns ){
	var ns = {},
		topics = {},
		uid = 0,
		asdf = window.asdf;


	ns.addToTopics = function(data, callback){
		console.log("addToTopics");
		console.log(data);

		topics[data.name.toString()] = [];

		if(callback) { callback(); };
	}

	ns.publish = function(name, passedThis, passedValue){
		console.log("publish");

		subscribers = topics[name],
		subscribersLength = subscribers.length;

		for(var i = 0; i < subscribersLength; i ++){
			console.log(subscribers[i]);
			subscribers[i].func(subscribers[i].name, passedThis, passedValue);
		}
	}

	ns.subscribe = function(name, passedThis, passedValue, func){
		console.log("subscribe");
		var token = ++uid;

		topics[passedValue.metaID].push({
			token : token,
			func : func, 
			name : name
		});

		return token;
	}

	ns.unsubscribe = function(){
		
	}

	ns.updateSubscribers = function(name, passedThis, passedValue){
		console.log("updateSubscribers");
		console.log(name, passedThis, passedValue);

		passedThis.internal[name].metaValue = passedValue;
	}

	ns.getTopics = function(){
		return topics;
	}

	asdf.pubsub = ns;
})(window);