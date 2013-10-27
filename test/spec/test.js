/*global describe, it */
'use strict';

var a = asdf.createDataBindObject();
var d = asdf.createDOMObject();

a.newVar('testString', "test string");
a.newVar('testNumber', 123);
a.newVar('testBoolean', true);

a.newVar('bindTestVar1', 'bindTestVar1');
a.newVar('bindTestVar2', 'bindTestVar2');

a.bindTestVar1 = a.bindTestVar2;

a.newVar('num1', 100);
a.newVar('num2', 50);
a.newVar('num3', function(){
	var totalNum = a.num1() + a.num2();
	return totalNum;
});

a.newVar('numToPx', function (value){
	return value + "px";
});

a.numToPx = 123;

d.testDiv1.innerText = "this is some innerText";
d.testDiv2.innerHTML = "<p>this is innerHTML</p>";


(function () {
	describe('Creation of starting objects', function() {
		describe('creation of liveVariable object', function(){
			it('should exist', function(){
				expect(a).to.exist;
			});
			it('should be an object', function(){
				expect(a).to.be.an('object');
			});
		});
		describe('creation of DOMobject', function(){
			it('should exist', function(){
				expect(d).to.exist;
				
			});
			it('should be an object', function(){
				expect(d).to.be.an('object');
			});
		});
	});

	describe('liveVariable tests', function(){
		describe('creation of liveVariables', function(){
			it('liveVariables should be created, and exist', function(){
				expect(a.testString).to.exist;
				expect(a.testNumber).to.exist;
				expect(a.testBoolean).to.exist;
			});
			it('liveVariables have correct types', function(){
				expect(a.testString()).to.be.a('string');
				expect(a.testNumber()).to.be.a('number');
				expect(a.testBoolean()).to.be.a('boolean');

				expect(a.testString()).to.equal('test string');
			});
			it('liveVariabless have correct values', function(){
				expect(a.testString()).to.equal('test string');
				expect(a.testNumber()).to.equal(123);
				expect(a.testBoolean()).to.equal(true);
			});
		});
	});

	describe('liveVariable Binding', function(){
		describe('binding two liveVariables', function(){
			it("bindTestVar1 has bindTestVar2's value", function(){
				expect(a.bindTestVar1()).to.equal('bindTestVar2');
				expect(a.bindTestVar1).to.be.a('function');
			});
		});
	});

	describe('Computed Properties', function(){
		describe('creation of a computed property', function(){
			it('computed property has correct value', function(){
				expect(a.num3()).to.equal(150);
				expect(a.numToPx()).to.equal('123px');
			});
			it('updating value changes computed property', function(){
				a.num1 = 200;
				expect(a.num3()).to.equal(250);
			});
		});
	});

	describe('DOMobject Tests', function(){
		describe('DOMobjects are created', function(){
			it('testDiv1 object exists', function(){
				expect(d.testDiv1).to.exist;
			});
		});
		describe('DOMobject innerText', function(){
			it('Setting innerText', function(){
				expect(d.testDiv1.innerText).to.equal("this is some innerText");
			});
		});
		describe('DOMobject innerHTML', function(){
			it('Setting innerHTML', function(){
				expect(d.testDiv2.innerHTML).to.equal("<p>this is innerHTML</p>");	
			});
		});
	});
})();

