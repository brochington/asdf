(function (window, undefined, ns){
	"use strict";
	var ns = {},
		asdf = window.asdf,
		functions = asdf.functions,
		ps = asdf.pubsub;


	/*
	TODO: Break out the Function()object into its own class, 
	with stopFollowing() and stopFollowingAll as prototype
	methods.
	*/

	ns.LiveVariable = function(varName, value, initVal){
		var tempFunction = new Function();
		tempFunction = function(){ return this.internal[varName].metaValue;}
		tempFunction.metaID = varName;
		tempFunction.metaValue = value;

		if(typeof value == 'function'){
			// console.log("value in newVar is a function", value);
			tempFunction.metaFunction = value;
			tempFunction.metaFunctionArgVal = initVal;
			// console.log(tempFunction.metaFunctionArgVal);
			
			functions.startMonitoringLiveVars();
			tempFunction.metaValue = value(initVal);
			asdf.monitorLiveVarArr.forEach(function (v, i, arr){
				ps.subscribe(v, {name: varName}, ps.updateSubscribers);
			});
			functions.stopMonitoringLiveVars();
		} else if(typeof value !== 'function'){
			// console.log("not being passed a function.");

			// keeping handling of computed properties with get/set separate for now. 
			if(value.hasOwnProperty('get') && value.hasOwnProperty('set')){
				console.log("looks like a get/set object...");
				tempFunction.metaGetSetObject = {};

				for(var key in value){
					if(key !== 'get' && key !== 'set'){
						tempFunction.metaGetSetObject[key] = value[key];
					}
				}
				tempFunction.metaGetFunction = value.get;
				tempFunction.metaSetFunction = value.set;
				tempFunction.metaFunctionArgVal = initVal;

				functions.startMonitoringLiveVars();
				tempFunction.metaValue = value.get(tempFunction.metaGetSetObject);
				asdf.monitorLiveVarArr.forEach(function (v, i, arr){
					ps.subscribe(v, {name: varName}, ps.updateSubscribers);
				});
				functions.stopMonitoringLiveVars();

			}
		};
		

		//You can add methods for liveVariables here.
		tempFunction.stopFollowing = function(varObj){
			var self = this,
				varName = varObj.metaID ? varObj.metaID : varObj;
			ps.unsubscribe(self, varName);
		};

		tempFunction.stopFollowingAll = function(){
			var self = this;

			ps.unsubscribeAll(self);

		}	

		return tempFunction;
	}

	ns.StyleObject = function(name, data){
		this.from = data.id;
		this.name = name;
	}

	ns.inputNodeObject = function(){
	}

	ns.InternalDOMObj = function(data){
		this.style = data.style;
		this.originDOM = data;
	}

	/*DivNode contructor*/
	ns.DivNodeObject = function(data){
		this.internal = {};
		this.id = data.id;
	}

	/*div node will no longer watch whatever liveVariable is passed 
	  This will be effective for every property the DivNodObject.*/
	ns.DivNodeObject.prototype.stopFollowing = function(val){
	
	}

	/*div node will no longer watch any liveVariables, including 
	  any css properties that have liveVariables associated with them.*/
	ns.DivNodeObject.prototype.stopFollowingAll = function(){
		var self = this;
		// finish..
	}
	/* Use a passed object of css properties and values to update node css.*/
	ns.DivNodeObject.prototype.css = function(cssObj){
		var self = this,
			keys = Object.keys(cssObj);

		keys.forEach(function (v,i,arr){
			self[v] = cssObj[v];
		});
	}

	ns.stdNodeObject = function(data){
	
	}

	asdf.classes = ns;
})(window);