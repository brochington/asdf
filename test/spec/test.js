/*global describe, it */
'use strict';

var a = asdf.createDataBindObject();
var d = asdf.createDOMObject();

a.newVar('testString', "test string");
a.newVar('testNumber', 123);
a.newVar('testBoolean', true);

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
		})
	})
})();

