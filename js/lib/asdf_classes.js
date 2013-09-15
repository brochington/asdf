console.log("asdf_classes");

(function (window, undefined, ns){
	var ns = {},
		asdf = window.asdf;

	ns.LiveVariable = function(varName, value){
		
		var tempFunction = new Function();
		tempFunction = function(){ return this.internal[varName].metaValue;}
		tempFunction.metaID = varName;
		tempFunction.metaValue = value;
		return tempFunction;
	}

	asdf.classes = ns;
})(window);