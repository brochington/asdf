console.log("data bind");

(function (window, undefined, ns){
	var ns = {},
		asdf = window.asdf,
		ps = asdf.pubsub,
		asdfClass = asdf.classes;

	/* Contructor function for the data bindin object*/
	asdf.createDataBindObject = function(data){
		var obj = {
			internal : {},
			newVar : function(name, value){
				var newFunctionObject = new asdfClass.LiveVariable(name, value);
				this.internal[name] = newFunctionObject;
				ps.addToTopics(name);

				Object.defineProperty(this, name, {
					get: function(){
						return this.internal[name];
					},
					set: function(val){
						var params = {name : name };
						if(val.metaID){
							this.internal[name].metaValue = val.metaValue;
							
							ps.subscribe(val, params, ps.updateSubscribers);
							ps.publish(name, this, val);
						} else {
							this.internal[name].metaValue = val;
							
							ps.publish(name, this, val);

						}
						
					}
				})
				return newFunctionObject;
			}
		}
		Object.observe(obj.internal, ns.observeDataBindInternal);
		return obj
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