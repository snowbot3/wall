/** wall-func **/

import * as wall_func from '../js/func.mjs';

QUnit.module('func');

const json = obj=>JSON.stringify(obj);

QUnit.test('one', function(assert) {
	let count = 0;
	function fn1(res) {
		count += 1;
		return res;
	}
	const fn2 = wall_func.one(fn1);
	assert.equal(count, 0, 'before');
	assert.equal('Abc', fn2('Abc'), 'call 1');
	assert.equal(count, 1, 'after 1');
	assert.equal('Abc', fn2('Def'), 'call 2');
	assert.equal(count, 1, 'after 2');

	assert.equal('Ghi', fn1('Ghi'), 'original');
	assert.equal(count, 2, 'after 3');

});
