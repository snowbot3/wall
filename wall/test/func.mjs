/** wall-func **/

import {
	argNames,
	argMap,
} from '../js/func.mjs';

function fnArg0() {}
function fnArg1(a) {}
function fnArg2( b/*lues*/, cd ) {}
function fnArgRest(...rest) {}
const fnLambda = (l,a,m,b)=>l+a+m+b;
const fnLamb = da=>da+da;

QUnit.module('func');

const json = obj=>JSON.stringify(obj);

QUnit.test('argNames', function(assert) {
	function check(func, names) {
		assert.deepEqual(argNames(func), names,
			`${func.name} args == ${json(names)}`);
	}
	check(fnArg0, []);
	check(fnArg1, ['a']);
	check(fnArg2, ['b','cd']);
	const altArg2 = fnArg2;
	check(altArg2, ['b','cd']);
	const anonArg2 = function(e,f) {};
	check(anonArg2, ['e','f']);
	check(fnArgRest, ['...rest']);
	check((l,a,m,b)=>l+a+m+b, ['l','a','m','b']);
});

// Concept 1:
// test(function(ok, eq, notEq) {});
// names = argNames(func); // ['ok','eq','notEq']
// args = argMap(names, objectWithAsserts); // [fnOk, fnEq, fnNotEq]
// Concept 2:
// dom(function(div, span, h1) {});
// names = argNames(func); // ['div','span','h1']
// args = argMap(names, {}, function(){
//   // fall back function...
// });
QUnit.test('argMap', function(assert) {
	function fnTest(val) {
		return val + (++fnTest.count);
	}
	fnTest.count = 0;
	const obj = {
		a: 'aaa',
		b: 222,
		c: ['cd','dc'],
		d: fnTest
	};
	const res1 = argMap(['a','b'], obj);
	assert.deepEqual( res1, [
		'aaa', 222
	], '[a,b]');
	
	const res2 = argMap(['c','d'], obj);
	assert.deepEqual(res2, [
		['cd','dc'],
		res2[1] // fnArg0.bind(...) not testable with equals
	], '[c,d]');
	assert.notEqual( res2[1], fnArg0 ); // res2[1] == obj.d.bind(obj)
	assert.equal( res2[1]('a'), 'a1' );
	assert.equal( fnTest('b'), 'b2' );
	assert.equal( res2[1]('c'), 'c3' );

	const res3 = argMap(['e','f'], obj, (name)=>name);
	assert.deepEqual(res3, [
		'e', 'f'
	], '');
});
