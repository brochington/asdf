
	console.log("window is loaded");

	var beginTime = Date.now();
	var a = asdf.createDataBindObject();
	var d = asdf.createDOMObject();

	var asdfClass = asdf.classes;

	a.newVar("temp", "here I am");
	a.newVar("hello", "there");

	a.newVar("colorA", "solid blue 3px");
	a.newVar("color2", "solid black 6px");
	a.newVar("bgd1", "blue");
	a.newVar("bgd2", "green");



	d.test_div_1.width = "400px";
	d.test_div_1.height = "150px";
	d.test_div_1.border = a.color2;
	d.test_div_1.backgroundColor = a.bgd1;

	d.test_div_2.backgroundColor = a.bgd1;
	d.test_div_2.border = a.color2;

	window.setTimeout(function(){
		a.color2 = "solid yellow 6px";
	}, 1500);
	
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