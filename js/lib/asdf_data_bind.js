// console.log("data bind is here");

(function (window, undefined, ns){
	"use strict";
	var ns = {},
		asdf = window.asdf,
		ps = asdf.pubsub,
		asdfClass = asdf.classes;

	asdf.createDataBindObject = function(data){
		var obj = {
			internal : {},
			newVar : function(name, value, initVal){
				var newFunctionObject = new asdfClass.LiveVariable(name, value, initVal);

				this.internal[name] = newFunctionObject;
				ps.addToTopics(name);

				Object.defineProperty(this, name, {
					get: function(){
						console.log("gettin'");
						var internalVal = this.internal[name];						

						// notify something that it is being "gotten",
						// needed for calculating and updating computed functions.
						if(asdf.monitorLiveVarFlag){
							asdf.monitorLiveVarArr.push(internalVal);
						}

						if(internalVal.hasOwnProperty('metaFunction')){

							if(internalVal.metaFunctionArgVal){

								if(internalVal.metaFunction){
									internalVal.metaValue = internalVal.metaFunction(internalVal.metaFunctionArgVal);
								} else if(internalVal.metaGetFunction){

									internalVal.metaValue = internalVal.metaGetFunction(internalVal.metaGetSetObject);
								}
							} else {

								internalVal.metaValue = internalVal.metaFunction();	
							}							
						}

						/*TODO: add special handling for accessor objects*/
						if(internalVal.metaGetSetObject){
							console.log("gettin' from a getter setter, dude.");
							internalVal.metaValue = internalVal.metaGetFunction(internalVal.metaGetSetObject);
						}

						return internalVal;
					},
					set: function(val){
						console.log("settin'");
						var params = {name : name };
						if(typeof val == 'function' && val.metaID){
							// console.log("LiveVariable function");
							if(this.internal[name].metaFunction){
								this.internal[name].metaFunctionArgVal = val.metaValue;
								this.internal[name].metaValue = this.internal[name].metaFunction(val.metaValue);
							} else {
								this.internal[name].metaValue = val.metaValue;	
							}
							ps.subscribe(val, params, ps.updateSubscribers);
							ps.publish(name, this, val);
						} else if(typeof val == 'function' && !val.metaID){
							//TODO: figure out how we want to handle normal functions.
							// console.log("regular function");
							if(this.internal[name].metaFunction){

							} else {
								this.internal[name].metaValue = val;	
							}
							ps.publish(name, this, val);
						} else {
							if(this.internal[name].metaFunction){
								// console.log("set on var that has metaFunction");
								this.internal[name].metaFunctionArgVal = val;
								this.internal[name].metaValue = this.internal[name].metaFunction(val);
							} else if(this.internal[name].metaSetFunction){
								// console.log("set on var that has metaSetFunction");
								this.internal[name].metaFunctionArgVal = val;
								this.internal[name].metaValue = this.internal[name].metaSetFunction(val,this.internal[name].metaGetSetObject);
							} else {
								this.internal[name].metaValue = val;
							}
							ps.publish(name, this, val);
						}
						
					}
				})
				return newFunctionObject;
			}
		}
		return obj;
	}

	/*  Function called when internal Property in dataBind object is changed
		Use this to update pubSub, or other listeners. Doens't seem to work 
		with the meta data on the function objects.*/
	ns.observeDataBindInternal = function(obj){

		obj.forEach(function(v, i, a){

			switch (v.type){
				case 'new':
					// console.log("new property in internal");
					break;
				case 'updated':
					// console.log("updated property in internal");
					ps.testPublish();
					break;

			}
		})
	}
	asdf.dataBind = ns;
})(window);