console.log("asdf_xhr");

(function (window, undefined, ns){
	"use strict";
	var ns = {},
		asdf = window.asdf;

	ns.testXHR = function(){
		console.log("testXHR");
	}


	asdf.xhr = ns;
})(window)