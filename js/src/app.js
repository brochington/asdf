

/*
Hi! 

Thanks for checking out the code for my experimental 
framework. It's very much in the beginning stages of
work, and I have many ideas for where I woould like
to take this project, but for the moment let me walk 
you through some of the methodology and abilities 
that exist right now. 

An experimental feature I'm playing with a bit is 
Mutation Observers. I think these will be really powerful
in the future, and will implement them in the monitoring
of DOM changes. 

Now, a bit about what the ASDF does, an how it works.

The first important part of ASDF is what I call DOM objects.
These are individual objects created to represent DOM elements,
or nodes, that have an id.

The second part of ASDF is what I'm calling liveVariables, at least
for now. These act in very similar fashion to stardard variables,
but are "aware" of other DOM objects, as well as other liveVariables.

The cool stuff happens when you start to assign DOM objects and 
liveVariables to each other.

Confused yet? I know I would be, so let me show you some code and 
hopefully it will start to make more sense. 
*/


/*
Right now I'm using a single global variable, which is asdf, 
and is located in asdf_init.js. I'm seriously considering 
moving ASDF over AMD style, with possibly require.js.

First thing I do is create the DOM objects, and then an object
that I'll use in creation of liveVariables. Oh, and don't worry,
I don't normally give my variables single letter names.
*/
var a = asdf.createDataBindObject();
var d = asdf.createDOMObject();

/*
Lets create a liveVariable. I'll use the method newVar()
on the 'a' object I just created earlier, with the first argument
being what I would like to name the variable, and the second being
the inital value of that variable.
*/
a.newVar("firstVar", "Value goes here");

/*
Now I have a property on the 'a' object that represents this variable.
Try going over to the console in the browser and typing in 'a.firstVar'.
Did it return a function? Good, that's what is supposed to happen. Try
typing in 'a.firstVar()'. It should return the inital value you gave it. 
If you have ever used knockout.js, this might make sense to you, but if
not, then let me explain a little. 'a.firstVar' style is used when you are 
connecting other liveVariables and DOM objects together. This is how 
they are contextually aware of each other, and know how to respond 
to one another. I've also made it so you can assign new values in this 
style as well, because I feel it more closely represents how you would 
normally do so. 'a.firstVar()' is how you can access the value stored within
the variable at any other time. So, to set a value in a liveVariable, it
should look something like this:
*/

a.firstVar = "What's up?";
console.log("This is how you get the value: ", a.firstVar());

/*
Let's start getting into some of the cool stuff. Let's create
a couple more liveVariables:
*/
a.newVar("test1", "Hello!!");
a.newVar("test2", "How Are you?");

/*
Now that they are created, let's assign one to the other, just like we
would with a standard assignment operator. Note that since we are 
connecting two liveVariables, we shouldn't use them as if we were
evaluating a function. This will effectively bind a.test1 to a.test2.
In other words, anytime that a.test2 changes, so will a.test1.
*/

a.test1 = a.test2;
console.log("What's in a.test1?: ", a.test1());

/*
I'll test the binding by updating a.test2, and we should see a.test1's
value change as well. 
*/

a.test2 = "testing the binding of liveVariables";
console.log("New a.test1 value: ", a.test1());


/*
We can use liveVariables as computed properties. An example would be:
*/

a.newVar("num1", 100);
a.newVar("num2", 50);
a.newVar("num3", function(){
	var totalNum = a.num1() + a.num2();
	return totalNum;
});

console.log("what is num 3?: ", a.num3());

/*
Notice how we are using liveVariables in the example above? we are
just using the value stored in them, but the function is smart enough
to know that it contains these liveVariables, and if either of them
are updated, then the computed property will reevaluate. If you would
like to see this in action, try putting a console.log() within the 
liveVariable function, and then updating either a.num1 or a.num2 
as explained above in the browser's console.
*/

/*
the Computed Property also will accept a value that is being set to
as the first argument, as well as an inital value as a third argument
in the newVar method. Example:
*/

a.newVar("numToPx", function (value){
	return value + "px";
}, 300);

console.log("What's in numToPx?: ", a.numToPx());

a.numToPx = 1234;

console.log("Updated numToPx value is: ", a.numToPx());

/*
  I'm messing around with getters/setters on liveVarables, though 
  this is an area that still might need some more design thought. 

  Some important notes on using liveVariables as getter/setter: 
	1) I have created an internal object that allows you to psuedo
	   scope some associated values to to the liveVariable. I've mainly
	   done this so you can get/set on a variable without having to 
	   have a variable elsewhere that is the target of said get/set.
	   I have named this internal object, creatively, 'internal', and 
	   is passed as an argument like in the example below. Any key/value
	   pair besides 'get' and 'set' will be added to this internal object.
	2) Variables on the internal object aren't private, Though I plan 
	   on looking into maybe holding the values stored in the 
	   internal object in some kind closure if not directly returned.
	   Haven't gotten this far yet. 
*/

a.newVar("testGetSet", {
	internalValue1 : 4321,
	get: function(internal){
		return internal.internalValue1;
	},
	set: function(setVal, internal){
		internal.internalValue1 = setVal;
	}
})

/*
Wondering what happened to that crazy DOM object thingy I was
talking about in the beginning? Let's break it out.

To start we can set innerHTML and innerText in a similar fashion
as one might normally do with a DOM node. I need to implement 
some sort of safe string system in innerHTML to prevent possible
malicious code. 
*/

d.test_div_1.innerHTML = "<i>This is some innerHTML within test_div_1!</i>";
d.test_div_2.innerText = "and here is some innerText in test_div_2!";


/*
You can also set specific css properties directly, like so:
Note that for now you have to use the name that the css
property is called in the DOM node, i.e borderRadius, not 
border-radius.
*/

d.test_div_1.border = "solid green 12px";
d.test_div_1.backgroundColor = "#123456";
d.test_div_1.color = "white";

/*
You may also pass an object of css key/value pairs to the 
css attribute on the DOM object, like so:
*/

d.test_div_2.css = {
	border: "dashed 5px blue",
	borderRadius: "20px",
	padding: "10px"
}

/*
The databinding to and from the DOM objects is not written yet, 
as this has been a bit of a weekend project that I started mid
September, but I plan to have it done very soon. I also am 
planning on adding some awesome templating, event handling
that is really simple to use, and anything else that I can 
dream up in the future. 

Thanks for reading!
*/
