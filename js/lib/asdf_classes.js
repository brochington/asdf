console.log("asdf_classes");

(function (window, undefined, ns){
	var ns = {},
		asdf = window.asdf;
		functions = asdf.functions;

	ns.LiveVariable = function(varName, value){
		var tempFunction = new Function();
		tempFunction = function(){ return this.internal[varName].metaValue;}
		tempFunction.metaID = varName;
		tempFunction.metaValue = value;
		return tempFunction;
	}

	ns.styleObject = function(name, data){
		var obj = {
			from : data.id,
			name : name
		}	

		// Object.observe(obj, functions.styleObjectChange);
		return obj
	}

	ns.inputNodeObject = function(){
		var obj = {

		}
		console.log(obj);
		return obj;
	}

	ns.divNodeObject = function(data){
		var obj = {
			internal : {},
			id : data.id

		}

		var styleKeys = Object.keys(data.style);
		var styleKeysLength = styleKeys.length;

		for(var i = 0; i < styleKeysLength; i++){
			obj[styleKeys[i]] = ns.styleObject(styleKeys[i], data);
		}

		Object.observe(obj, functions.divNodeObjectChange);

		return obj;
	}

	ns.stdNodeObject = function(data){
		var obj = {

		}

		return obj;
	}

	asdf.classes = ns;
})(window);