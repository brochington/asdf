console.log("asdf_dom");

(function (window, undefined, ns){
	var ns = {},
		asdf = window.asdf,
		ps = asdf.pubsub,
		asdfClass = asdf.classes;

		asdf.createDOMObject = function(){
			var bodyDOM = document.getElementsByTagName('body')[0].children;
			var tempArr =[];
			var obj = {
				internal : {},
				originalDOM : []
			}

			obj.originalDOM = ns.cleanDOMArr(bodyDOM);
			tempArr = ns.cleanDOMArr(bodyDOM);

			for(var i = 0; i < tempArr.length; i++){
				var tagName = tempArr[i].tagName;
				var id = tempArr[i].id;
				if(id){
					if(tagName === 'INPUT'){
						obj[id] = asdfClass.inputNodeObject(bodyDOM[i]);
					} else if (tagName === 'DIV'){
						obj[id] = asdfClass.divNodeObject(bodyDOM[i]);
					} else {
						obj[id] = asdfClass.stdNodeObject(bodyDOM[i]);
					}

					obj.internal[id] = bodyDOM[i];
				}
			}

			return obj;
		}

		ns.cleanDOMArr = function(data){
			var arr = [];
			var dataLength = data.length;

			for(var i = 0; i < dataLength; i++){
				if(data[i].tagName !== "SCRIPT"){
					arr.push(data[i]);
				}
			}

			return arr
		}
})(window)