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
							internalVal.metaValue = internalVal.metaGetFunction(internalVal.metaGetSetObject);
						}

						return internalVal;
					},
					set: function(val){
						var params = {name : name },
							internalVal = this.internal[name];
						if(typeof val == 'function' && val.metaID){
							// console.log("LiveVariable function");
							if(internalVal.metaFunction){
								internalVal.metaFunctionArgVal = val.metaValue;
								internalVal.metaValue = internalVal.metaFunction(val.metaValue);
							} else {
								internalVal.metaValue = val.metaValue;	
							}
							ps.subscribe(val, params, ps.updateSubscribers);
							ps.publish(name, this, val);
						} else if(typeof val == 'function' && !val.metaID){
							//TODO: figure out how we want to handle normal functions.
							// console.log("regular function");
							if(internalVal.metaFunction){

							} else {
								internalVal.metaValue = val;	
							}
							ps.publish(name, this, val);
						} else {
							if(internalVal.metaFunction){
								// console.log("set on var that has metaFunction");
								internalVal.metaFunctionArgVal = val;
								internalVal.metaValue = internalVal.metaFunction(val);
							} else if(internalVal.metaSetFunction){
								// console.log("set on var that has metaSetFunction");
								internalVal.metaFunctionArgVal = val;
								internalVal.metaValue = internalVal.metaSetFunction(val,internalVal.metaGetSetObject);
							} else {
								internalVal.metaValue = val;
							}
							ps.publish(name, this, val);
						}
						
					}
				});
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