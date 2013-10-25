(function (window, undefined, ns){
	"use strict";
	var ns = {},
		asdf = window.asdf,
		ps = asdf.pubsub,
		asdfClass = asdf.classes;

		asdf.createDOMObject = function(){
			var bodyDOM = document.getElementsByTagName('body')[0].children,
				tempArr =[],
				obj = {
				internal : {},
				originalDOM : []
			};

			obj.originalDOM = ns.cleanDOMArr(bodyDOM);
			tempArr = ns.cleanDOMArr(bodyDOM);

			for(var i = 0; i < tempArr.length; i++){
				var tagName = tempArr[i].tagName;
				var id = tempArr[i].id;
				if(id){
					if(tagName === 'INPUT'){
						// add..
					} else if (tagName === 'DIV'){
						// working on this...
						obj.internal[id] = ns.createInternalDOMObj(bodyDOM[i]);
						obj = ns.addDivNodeProperty(obj, id);

						console.log(obj.internal[id]);

					} else {
						// add more type of elements, or maybe a generic type.
					};
				};
			};

			return obj;
		}
		/*cleaning out script tags right now*/
		ns.cleanDOMArr = function(data){
			var arr = [],
				dataLength = data.length;

			for(var i = 0; i < dataLength; i++){
				if(data[i].tagName !== "SCRIPT"){
					arr.push(data[i]);
				};
			};

			return arr;
		}

		ns.addDivNodeProperty = function(obj, passedId){
			Object.defineProperty(obj, passedId, {
				get: function(){
					// console.log("this", this.internal[passedId]);
					return this.internal[passedId];
				},
				set: function(val){
					console.log("new setter");
					console.log(passedId);
					console.log("val", val);
				}
			});

			// console.log("obj, ", obj);

			return obj;
		}

		ns.createInternalDOMObj = function(bodyDOM){
			// console.log("bodyDOM", bodyDOM.style);
			var obj = new asdfClass.InternalDOMObj(bodyDOM),
				keys = Object.keys(bodyDOM.style);

			/*Adding CSS properties*/
			keys.forEach(function (v, i, arr){

				Object.defineProperty(obj, v, {
					get: function(){
						console.log("InternalDOMObj get");
						return function(){ return bodyDOM.style[v]; };
					},
					set: function(val){
						console.log("InternalDOMObj set");
						bodyDOM.style[v] = val;
						
						//add handling of liveVariable objects here, so
						// you can update pubsub correctly. look at newVar
						// if you need help. 
					}
				});
			});

			/*Adding innerHTML property*/
			Object.defineProperty(obj, "innerHTML", {
				get: function(){
					console.log("getting from innerHTML");
					return bodyDOM.innerHTML;
				},
				set: function(val){
					console.log("setting innerHTML");
					bodyDOM.innerHTML = val;

				}
			});
			/*Adding innerText property*/
			Object.defineProperty(obj, "innerText", {
				get: function(){
					return bodyDOM.innerText;
				},
				set: function(val){
					bodyDOM.innerText = val;
				}
			});
			Object.defineProperty(obj, 'css', {
				get: function(){
					return bodyDOM.style; //maybe return someting cooler?
				},
				set: function(val){
					console.log("setting css properties with an object");
					for(var key in val){
						if(bodyDOM.style.hasOwnProperty(key)){
							bodyDOM.style[key] = val[key];
						}
					}
				}
			})

			return obj;

		}



})(window)