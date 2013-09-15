console.log("data bind");

(function (window, undefined, ns){
	var ns = {},
		asdf = window.asdf,
		ps = asdf.pubsub,
		asdfClass = asdf.classes;

	/* Contructor function for the data bindin object*/
	asdf.createDataBindObject = function(data){
		var obj = {
			internal : {}
		}

		// call function if dataBind object has properties added/modifed/etc.
		Object.observe(obj, ns.observeDataBindObject);

		// call function if values in dataBind internal object are changed.
		Object.observe(obj.internal, ns.observeDataBindInternal)

		return obj
	}

	/* Function call when dataBind object is modified*/
	ns.observeDataBindObject = function(obj){

		obj.forEach(function(v, i, a){
			var keys = Object.keys(v);

			switch (v.type){
				case 'new':
					console.log("adding a property to dataBind object");

					// passed function that lets the property being set know 
					// that it's recieving from a dataBind variable.
					var tempFunction = new Function();
					tempFunction = function(){ return this.internal[v.name].metaValue};
					tempFunction.metaID = v.name;
					tempFunction.metaValue = v.object[v.name];

					// setup the internal value in the dataBind object
					v.object.internal[v.name] = tempFunction;

					// add to the topics in pubsub so other variables can subscribe to it.
					ps.addToTopics(v);

					// create the getter/setter for the variable property on the 
					// dataBind object.
					Object.defineProperty(v.object,v.name, {
						get: function(){
							console.log("get");
							return this.internal[v.name];
						},
						set: function(value){

							// determine if value to set is asdf dataBind function.
							if(value.metaID){
								console.log("it's an asdf function object!");
								this.internal[v.name].metaValue = value.metaValue;
								ps.subscribe(v.name, this, value, ps.updateSubscribers);
								ps.publish(v.name, this, value);

							} else {
								console.log("just a regular value.");
								console.log(v.name);
								this.internal[v.name].metaValue = value;
								ps.publish(v.name, this, value);
							}
						}
					});
				case 'updated':
					console.log("updating a property on the dataBind object");
			}
		})
	}
	/*  Function called when internal Property in dataBind object is changed
		Use this to update pubSub, or other listeners. Doens't seem to work 
		with the meta data on the function objects.*/
	ns.observeDataBindInternal = function(obj){

		obj.forEach(function(v, i, a){

			switch (v.type){
				case 'new':
					console.log("new property in internal");
					break;
				case 'updated':
					console.log("updated property in internal");
					ps.testPublish();
					break;

			}
		})
	}
	asdf.dataBind = ns;
})(window);