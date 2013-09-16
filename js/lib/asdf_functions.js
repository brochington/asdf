console.log("asdf functions");

(function (window, undefined, ns){
	var ns = {},
		asdf = window.asdf,
		ps = asdf.pubsub;

		/* Object.observe callback functions */
		ns.divNodeObjectChange = function(changeObj){

			for(var i = 0; i < changeObj.length; i++){
				var prop = changeObj[i].name;
				var elementID = changeObj[i].object.id;
				var value = changeObj[i].object[prop];

				// change css property manually for now.
				var el = document.getElementById(elementID);

				// if dataBind function passed in, subscribe
				if(value.metaID){
					var name = elementID + "!" + prop;
					ps.subscribe(value, { name: name, id : elementID, prop : prop}, ps.updateDivNodeCSS);
					el.style[prop] = value.metaValue;
				} else {
					el.style[prop] = value;	
				}
			}			
		}

		ns.styleObjectChange = function(changeObj){
			console.log("styleObjectChange");
			console.log(changeObj);
		}

		asdf.functions = ns;
})(window);