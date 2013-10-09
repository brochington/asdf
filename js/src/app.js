
	// console.log("window is loaded");

	var beginTime = Date.now();
	var a = asdf.createDataBindObject();
	var d = asdf.createDOMObject();
	var startTime = 0;
	var endTime = 0;
	var keysArr = [];

	var asdfClass = asdf.classes;

	a.newVar("temp", "here I am");
	a.newVar("hello", "there");

	a.newVar("colorA", "solid blue 3px");
	a.newVar("color2", "solid black 6px");
	a.newVar("bgd1", "blue");
	a.newVar("bgd2", "green");
	a.newVar("test1", "This is test1");
	a.newVar("test2", "this is test 2");
	a.newVar("test3", "This is your third test string");

	a.test1 = a.test2;
	a.test1 = a.test3;


	// computed properties.
	a.newVar("num1", 100);
	a.newVar("num2", 50);
	a.newVar("num3", function(){
		var totalNum = a.num1() + a.num2();
		return totalNum;
	});

	a.newVar("numToPx", function (value){
		return value + "px";
	}, 300);


	// if you want a value to stay with the object, then add it
	// as another property in the object that you feed the a.newVar().
	// i.e. internalValue1 in this case.
	// put a object.observe on the internal object, to be able to notify 
	// others of changes. 
	a.newVar("testGetSet", {
		internalValue1 : 4321,
		monitor: "internalValue1",
		get: function(internal){
			console.log("testGetSet get");
			console.log(internal);
			return internal.internalValue1;
		},
		set: function(setVal, internal){
			console.log("testGetSet set");
			console.log(setVal);
			internal.internalValue1 = setVal;
			// return internal;
		}
	})

	d.test_div_1.width = "400px";
	d.test_div_1.height = "150px";
	d.test_div_1.border = a.color2;
	// d.test_div_1.backgroundColor = a.bgd1;

	d.test_div_2.backgroundColor = a.bgd1;
	d.test_div_2.border = a.color2;

	//benchmark to test speed of for in vs object.keys and trad loop;

	// var testObject = {};
	// var testObject2 = {};
	// for(var i = 0; i < 1000000; i++){
	// 	testObject[i] = Math.floor((Math.random()*100000)+1);
	// }

	// console.log(testObject);

	// startTime = Date.now();
	// console.log(startTime);

	// // for(var key in testObject){
	// // 	testObject2[key] = testObject[key] + "asdasfa";
	// // 	// console.log(key);
	// // }



	// endTime = Date.now();
	// console.log(endTime);

	// console.log("difference: ", endTime - startTime);




	// window.setTimeout(function(){
	// 	a.color2 = "solid yellow 6px";
	// }, 1500);
	
	/*
	  Note: should be able to pass a live Var and have 
	  it bind automatically to that live Var
	  example: a.newVar("binded", a.bindMe)
	*/
	// var counter = 100;
	// var reverseSwitch = false;
	// window.setInterval(function(){
	// 	var count = reverseSwitch ? counter++ : counter--;
	// 	d.test_div_1.width = count + "px";
	// 	if(count > 300){
	// 		reverseSwitch = false;
	// 	}
	// 	if(count < 100){
	// 		reverseSwitch = true;
	// 	}

	// }, 1)

	// var endTime = 0;
	// var num = 1;

	// a.newVar("mine", "mine");


	/* Testing speed!*/
	// for(var i = 0; i < 1000; i++){
	// 	var tempI = i;
	// 	var tempString = "string" + i;
	// 	a.newVar(tempString, tempI );
	// 	a[tempString] = a.mine;

	// 	if(i >=99){
	// 		endTime = Date.now();
	// 	}
	// }
	// console.log(a.mine());
	// console.log(endTime - beginTime);