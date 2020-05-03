/** wall-type **/

import * as wall_type from '../js/type.mjs'; 

QUnit.module('type');

function ExFn(){}
class ExCl{ constructor(){} }

QUnit.test('is', function(assert) {
	// Trying to figure out a way to turn this information into a table.
	function single(val, type, bool) {
		if (bool) {
			assert.ok( wall_type.is(type, val), `(${val})<${typeof val}> is ${type}` );
		} else {
			assert.notOk( wall_type.is(type, val), `(${val})<${typeof val}> is Not ${type}` );
		}
	}
	const objTypes = {
		'S': String,
		'N': Number,
		'B': Boolean,
		'O': Object,
		'F': Function,
		'A': Array,
		's': 'string',
		'n': 'number',
		'b': 'boolean',
		'o': 'object',
		'f': 'function',
		'X': ExCl,
		'x': ExFn,
		'z': 'simple' // like 'any' this is special for simple object
	};
	function check(value, types) {
		single(value, 'any', true); // should always be true
		for (let key in objTypes) {
			single(value, objTypes[key], (types.indexOf(key)>-1));
		}
	}
	check('a', 'Ss'); // assume all not listed should be false
	check(2, 'Nn');
	check(true, 'Bb');
	check([], 'AOo');
	check({}, 'Ooz'); // only 1 counts as simple
	check(ExFn, 'FOf');
	check(ExCl, 'FOf');
	check(new ExCl, 'XOo');
	check(new ExFn, 'xOo');
	check(undefined, '');
	check(null, 'o');

	assert.equal(assert.test.assertions.length, 11 * 15, 'final count');
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
