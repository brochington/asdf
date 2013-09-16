console.log("asdf_pubsub");

(function (window, undefined, ns ){
	var ns = {},
		topics = {},
		nodeTopics = {},
		uid = 0,
		asdf = window.asdf;

	/*pubsub functions for normal variables*/

	ns.addToTopics = function(name, callback){

		topics[name] = [];

		if(callback) { callback(); };
	}

	ns.publish = function(name, passedThis, passedVal){
		var subscribers = topics[name];
		var subLength = subscribers.length;

		for(var i = 0; i < subLength; i++){
			subscribers[i].func(subscribers[i], passedThis, passedVal);
		}
	}

	ns.subscribe = function(val, params, func){

		var token = ++uid;

		topics[val.metaID].push({
			token : token,
			func : func,
			name : params.name,
			elementID : params.id || '',
			prop : params.prop || ''
		});

		return token;
	}

	ns.unsubscribe = function(){
		
	}

	ns.updateSubscribers = function(params, passedThis, passedValue){
		var name = params.name;
		passedThis.internal[name].metaValue = passedValue;
	}

	ns.updateDivNodeCSS = function(params, passedThis, passedValue){
		console.log(params);
		console.log(passedThis);
		console.log(passedValue);
		// console.log(passedValue.metaValue);

		var el = document.getElementById(params.elementID);
		console.log(el);
		el.style[params.prop] = passedValue || passedValue.metaValue;
	}

	ns.getTopics = function(){

		return topics;
	}

	/* pubsub functions for DOM related variables*/



	asdf.pubsub = ns;
})(window);