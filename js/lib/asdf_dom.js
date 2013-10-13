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
						// obj[id] = asdfClass.inputNodeObject(bodyDOM[i]);
					} else if (tagName === 'DIV'){
						// working on this...
						obj.internal[id] = ns.createInternalDOMObj(bodyDOM[i]);
						obj = ns.addDivNodeProperty(obj, id);
						// ns.addDivNodeProperty(obj, id);

					} else {
						// obj[id] = asdfClass.stdNodeObject(bodyDOM[i]);
					};

					// obj.internal[id] = bodyDOM[i];
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
					console.log("this", this.internal[passedId]);
					return this.internal[passedId];s
				},
				set: function(val){
					console.log("new setter");
					console.log(passedId);
					console.log("val", val);
				}
			});

			return obj;
		}

		ns.createInternalDOMObj = function(bodyDOM){
			// var obj = new asdfClass.InternalDOMObj();

		}



})(window)