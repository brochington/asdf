console.log("asdf_classes");

(function (window, undefined, ns){
	var ns = {},
		asdf = window.asdf;


	ns.PassFunction = function(value){
		console.log("PassFunction Factory");
		console.log(value);
		var tempFunction = new Function();
		tempFunction = function(){return this.internal[value.name]};
		tempFunction.metaID = value.name;
		tempFunction.metaValue = value.object.internal[value.name];		

		return tempFunction();
	}

	asdf.classes = ns;
})(window);