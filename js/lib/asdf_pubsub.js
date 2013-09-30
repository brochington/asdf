// console.log("asdf_pubsub");

(function (window, undefined, ns ){
	"use strict";
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
		console.log("publish");
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

	ns.unsubscribe = function(val, varToRemove){
		var tempTopicsArr = topics[varToRemove],
			tempArr = [];

		tempTopicsArr.forEach(function(v,i,arr){
			if(v.name !== val.metaID){
				tempArr.push(v);
			};
		});

		topics[varToRemove] = tempArr;
		console.log(tempTopicsArr);
	}

	ns.unsubscribeAll = function(val) {
		for(var key in topics){
			topics[key].forEach(function (v, i, arr){
				if(v.name == val.metaID){
					topics[key].splice([i], 1);
				}
			})
		}
	}

	ns.updateSubscribers = function(params, passedThis, passedValue){
		console.log("updateSubscribers");
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