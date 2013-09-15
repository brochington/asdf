
	console.log("window is loaded");

	var a = asdf.createDataBindObject();
	var asdfClass = asdf.classes;

	a.newVar("temp", "here I am");
	a.newVar("hello", "there");

	a.temp = a.hello;

	console.log(a.temp());

	a.hello = "you";

	console.log(a.temp());	

	var beginTime = Date.now();
	var endTime = 0;
	var num = 1;

	a.newVar("mine", "mine");


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