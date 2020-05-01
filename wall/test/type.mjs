/** wall-type **/

import * as wall_type from '../js/type.mjs'; 

QUnit.module('type');

function ExFn(){}
class ExCl{ constructor(){} }

QUnit.test('is', function(assert) {
	function passIsType(val, ...types) {
		types.forEach(function(type) {
			assert.ok( wall_type.is(type, val), `(${val})<${typeof val}> is ${type}` );
		});
	}
	function failIsType(val, ...types) {
		types.forEach(function(type) {
			assert.notOk( wall_type.is(type, val), `(${val})<${typeof val}> is Not ${type}` );
		});
	}
	passIsType('a', String);
	failIsType('a', Number, Boolean, Object);
	passIsType(2, Number);
	failIsType(2, String, Boolean, Object);
	passIsType(true, Boolean);
	failIsType(true, String, Number, Object);
	
	passIsType([], Array, Object); // Do I want Array as Object?
	failIsType([], String, Number, Boolean, ExCl, ExFn);
	passIsType({}, Object);
	failIsType({}, String, Number, Boolean, Array, ExCl, ExFn);

	passIsType(ExFn, Function, Object); // Do I want Function as Object?
	failIsType(ExFn, String, Number, Boolean, Array, ExCl, ExFn);
	passIsType(ExCl, Function, Object);
	failIsType(ExCl, String, Number, Boolean, Array, ExCl, ExFn);
	
	const objCl = new ExCl();
	passIsType(objCl, ExCl, Object);
	failIsType(objCl, String, Number, Boolean, Array, ExFn);
	const objFn = new ExFn();
	passIsType(objFn, ExFn, Object);
	failIsType(objFn, String, Number, Boolean, Array, ExCl);
	
	failIsType(undefined, Object);
	failIsType(null, Object);

	assert.equal(assert.test.assertions.length, 58, 'final count');
});

QUnit.test('isSimpleObject', function(assert) {
	[ {}, new Object() ].forEach(function(arg){
		assert.ok( wall_type.isSimpleObject(arg), `(${arg})<${typeof arg}> is simple object` );
	});
	[ 'a', 2, true, [], new Array() ].forEach(function(arg){
		assert.notOk( wall_type.isSimpleObject(arg), `(${arg})<${typeof arg}> is Not simple object` );
	});
});

QUnit.test('name', function(assert) {
	function check(val, tName) {
		assert.equal( wall_type.name(val), tName, `(${val})<${typeof val}> type is "${tName}"` );
	}
	check('a','String');
	check(2,'Number');
	check(true,'Boolean');
	check([],'Array');
	check(new Array(),'Array');
	check({},'Object');
	check(new Object(),'Object');
	check(ExFn,'Function');
	check(ExCl,'Function');
	check(new ExFn(),'ExFn');
	check(new ExCl(),'ExCl');
});

QUnit.test('names', function(assert) {
	assert.deepEqual(wall_type.names(
		'a', 2, true, undefined, null,
		new Array(), new Object()
	), [
		'String',
		'Number',
		'Boolean',
		'undefined',
		'null',
		'Array',
		'Object'
	], 'all');
});

/**
 * concept: fnArgRun([callingArgs], [types], func, [types2], func2, ... , funcElse)
 */
QUnit.test('run', function(assert) {
	function mainIdea(...args) {
		return wall_type.run(args, [], () => mainIdea('default'),
			[String], (str)=>'1str:'+str,
			[String, Number], (str,num)=>'2strnum:'+str+num,
			(...args)=>'final:'+args.toString());
	}
	assert.equal( mainIdea(), '1str:default' );
	assert.equal( mainIdea('cats'), '1str:cats' );
	// does not catch on [String,Number]
	assert.equal( mainIdea('cats', 'dogs'), 'final:cats,dogs' );

	const obj = {
		count: 0
	};
	function secIdea(...args) {
		return wall_type.run(obj, args,
			[], () => secIdea('default'),
			[String], function(str) {
				return '1str:'+str+':'+(this.count++)
			},
			[String, Number], function(str,num) {
				return '2strnum:'+str+num+':'+(this.count++)
			},
			function(...args) {
				return 'final:'+args.toString()+':'+(this.count++)
			});
	}
	assert.equal( secIdea(), '1str:default:0' );
	assert.equal( secIdea('cats'), '1str:cats:1' );
	// does not catch on [String,Number]
	assert.equal( secIdea('cats', 'dogs'), 'final:cats,dogs:2' );
});
