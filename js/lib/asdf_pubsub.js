(function (window, undefined, ns ){
	"use strict";
	var ns = {},
		topics = {},
		nodeTopics = {},
		uid = 0,
		asdf = window.asdf;

	ns.addToTopics = function(name, callback){
		topics[name] = [];

		if(callback) { callback(); };
	}

	ns.publish = function(name, passedThis, passedVal){
		var subscribers = topics[name],
			subLength = subscribers.length;

		for(var i = 0; i < subLength; i++){
			subscribers[i].func(subscribers[i], passedThis, passedVal);
		};
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
	}

	ns.unsubscribeAll = function(val) {
		for(var key in topics){
			topics[key].forEach(function (v, i, arr){
				if(v.name == val.metaID){
					topics[key].splice([i], 1);
				};
			});
		};
	}

	ns.updateSubscribers = function(params, passedThis, passedValue){
		var name = params.name,
			internal = passedThis.internal[name];

		internal.metaValue = passedValue;

		if(internal.metaFunctionArgVal){
			internal.metaFunctionArgVal = passedValue;
		};
		if(internal.metaFunction && !internal.metaFunctionArgVal){
			internal.metaFunction();
		} else if(internal.metaFunction && internal.metaFunctionArgVal){
			internal.metaFunction(internal.metaFunctionArgVal);
		}
	}

	ns.updateDivNodeInnerText = function(params, passedThis, passedValue){
		var el = document.getElementById(params.elementID);

		if(!passedValue.metaValue && el.innerText !== passedValue){
			el.innerText = passedValue;	
		} else if(passedValue.metaValue && el.innerText !== passedValue.metaValue){
			el.innerText = passedValue.metaValue;
		}
	}

	ns.updateDivNodeInnerHTML = function(params, passedThis, passedValue){
		console.log("here");
		var el = document.getElementById(params.elementID);

		if(!passedValue.metaValue && el.innerHTML !== passedValue){
			el.innerHTML = passedValue;	
		} else if(passedValue.metaValue && el.innerHTML !== passedValue.metaValue){
			el.innerHTML = passedValue.metaValue;
		}
	}

	ns.updateDivNodeCSS = function(params, passedThis, passedValue){
		var el = document.getElementById(params.elementID);

		el.style[params.prop] = passedValue || passedValue.metaValue;
	}

	ns.getTopics = function(){

		return topics;
	}

	asdf.pubsub = ns;
})(window);